import { supabase } from './supabaseClient';
import { TenseInfo, TenseStatus } from './types';
import { INITIAL_TENSES } from './constants';

const STORAGE_KEY = 'lingua_core_progress';

export const syncService = {
  /**
   * Get progress from local storage
   */
  getLocalProgress(): TenseInfo[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_TENSES;
  },

  /**
   * Save progress to local storage
   */
  saveLocalProgress(progress: TenseInfo[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  },

  /**
   * Sync progress with Supabase
   */
  async syncWithCloud(userId: string): Promise<TenseInfo[]> {
    const localData = this.getLocalProgress();

    // 1. Fetch from Supabase
    const { data: cloudData, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching cloud progress:', error);
      return localData;
    }

    // 2. Merge logic using updated_at
    const mergedData = [...localData].map(localItem => {
      const cloudItem = cloudData?.find(c => c.tense_id === localItem.id);

      if (!cloudItem) return localItem;

      const cloudDate = new Date(cloudItem.updated_at).getTime();
      const localDate = localItem.updated_at ? new Date(localItem.updated_at).getTime() : 0;

      if (cloudDate > localDate) {
        // Cloud is newer
        return {
          ...localItem,
          progress: cloudItem.progress,
          status: cloudItem.status as TenseStatus,
          updated_at: cloudItem.updated_at
        };
      }
      return localItem;
    });

    // 3. Update local storage with merged data
    this.saveLocalProgress(mergedData);

    // 4. Push local-only or newer local data back to cloud
    const toUpload = mergedData
      .filter(localItem => {
        const cloudItem = cloudData?.find(c => c.tense_id === localItem.id);
        if (!cloudItem) return localItem.progress > 0 || localItem.status !== INITIAL_TENSES.find(t => t.id === localItem.id)?.status;

        const cloudDate = new Date(cloudItem.updated_at).getTime();
        const localDate = localItem.updated_at ? new Date(localItem.updated_at).getTime() : 0;
        return localDate > cloudDate;
      })
      .map(item => ({
        user_id: userId,
        tense_id: item.id,
        progress: item.progress,
        status: item.status,
        updated_at: item.updated_at || new Date().toISOString()
      }));

    if (toUpload.length > 0) {
      const { error: upsertError } = await supabase
        .from('user_progress')
        .upsert(toUpload, { onConflict: 'user_id,tense_id' });

      if (upsertError) {
        console.error('Error upserting progress to cloud:', upsertError);
      }
    }

    return mergedData;
  },

  /**
   * Update progress for a specific tense
   */
  async updateTenseProgress(userId: string | undefined, tenseId: string, progress: number, status: TenseStatus) {
    const tenses = this.getLocalProgress();
    const now = new Date().toISOString();

    const updatedTenses = tenses.map(t => {
      if (t.id === tenseId) {
        return { ...t, progress, status, updated_at: now };
      }
      return t;
    });

    this.saveLocalProgress(updatedTenses);

    if (userId) {
      await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          tense_id: tenseId,
          progress,
          status,
          updated_at: now
        }, { onConflict: 'user_id,tense_id' });
    }
  }
};
