
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

/**
 * 為指定的時態生成高品質的練習題
 * @param tenseName 英文時態名稱 (如: "Present Perfect Continuous")
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

    請嚴格依照 JSON 格式回傳，不要包含任何額外解釋文字。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentence: {
              type: Type.STRING,
              description: '包含空白處的英文句子，例如: "By next year, I _____ here for ten years."'
            },
            correctAnswer: {
              type: Type.STRING,
              description: '正確的動詞形式'
            },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '包含正確答案在內的四個選項'
            },
            translation: {
              type: Type.STRING,
              description: '句子的繁體中文翻譯'
            }
          },
          required: ["sentence", "correctAnswer", "options", "translation"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Quiz Generation Error:", error);
    return null;
  }
};

/**
 * 獲取特定時態的詳細解析（Markdown 格式）
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
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "無法獲取解釋。";
  } catch (error) {
    console.error("Gemini Explanation Error:", error);
    return "獲取解析時發生錯誤，請稍後再試。";
  }
};
