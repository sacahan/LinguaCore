-- 建立使用者進度表
CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id UUID REFERENCES auth.users NOT NULL,
  tense_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  status TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (user_id, tense_id)
);

-- 開啟 RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- 設定安全政策：使用者只能操作自己的資料
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'user_progress' AND policyname = 'Users can manage their own progress'
    ) THEN
        CREATE POLICY "Users can manage their own progress"
        ON public.user_progress
        FOR ALL
        USING (auth.uid() = user_id)
        WITH CHECK (auth.uid() = user_id);
    END IF;
END
$$;

-- 建立自動更新 updated_at 的 Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 建立 Trigger
DROP TRIGGER IF EXISTS update_user_progress_updated_at ON public.user_progress;
CREATE TRIGGER update_user_progress_updated_at
BEFORE UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();
