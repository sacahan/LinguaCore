import OpenAI from 'openai';

// Initialize OpenAI Client pointing to LiteLLM Proxy
const aiClient = new OpenAI({
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
  baseURL: import.meta.env.VITE_AI_BASE_URL || 'https://litellm.brianhan.cc',
  dangerouslyAllowBrowser: true // Allowed since this is a client-side app accessing a public proxy
});

const MODEL_NAME = import.meta.env.VITE_AI_MODEL || 'github_copilot/gpt-4.1';

/**
 * Generates a high-quality quiz question for a specific tense
 * @param tenseName English tense name (e.g., "Present Perfect Continuous")
 */
export const generateQuizQuestion = async (tenseName: string): Promise<any> => {
  const prompt = `
    你是一位專業的英語語法老師。請為「${tenseName}」這個時態設計一道高品質的單選練習題。

    任務要求：
    1. 句子內容：設計一個具有真實生活情境（如職場、旅行、社交）的英文句子。
    2. 空白標記：將動詞部分挖空，使用 "_____" 表示。
    3. 選項設計：
       - 提供 4 個選項。
       - 1 個正確答案（必須嚴格符合 ${tenseName} 的語法規則）。
       - 3 個具有干擾性的錯誤選項。干擾項應包括：該動詞的其他時態形式、常見的拼寫錯誤或主詞動詞不一致的情況。
    4. 翻譯：提供該正確句子的精準繁體中文翻譯。
    5. 難度：適中，適合中級英語學習者。

    請嚴格依照 JSON 格式回傳，格式如下：
    {
      "sentence": "包含空白處的英文句子",
      "correctAnswer": "正確的動詞形式",
      "options": ["選項1", "選項2", "選項3", "選項4"],
      "translation": "句子的繁體中文翻譯"
    }
  `;

  try {
    const response = await aiClient.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'system', content: 'You are a helpful assistant that outputs JSON.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content || '{}';
    return JSON.parse(content);
  } catch (error) {
    console.error("LiteLLM Quiz Generation Error:", error);
    return null;
  }
};

/**
 * Gets a detailed explanation for a specific tense (Markdown format)
 */
export const getTenseExplanation = async (tenseName: string): Promise<string> => {
  const prompt = `
    請用繁體中文詳細解釋英語時態：「${tenseName}」。
    內容必須包含：
    1. 核心定義（什麼時候使用這個時態）。
    2. 句型公式（肯定句、否定句、疑問句）。
    3. 常見的時間副詞關鍵字（例如: already, since, yet...）。
    4. 2個實用的例句與翻譯。
    請使用 Markdown 格式輸出，讓層級清晰易讀。
  `;

  try {
    const response = await aiClient.chat.completions.create({
      model: MODEL_NAME,
      messages: [
        { role: 'user', content: prompt }
      ]
    });

    return response.choices[0].message.content || "無法獲取解釋。";
  } catch (error) {
    console.error("LiteLLM Explanation Error:", error);
    return "獲取解析時發生錯誤，請稍後再試。";
  }
};
