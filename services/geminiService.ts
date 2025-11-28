import { GoogleGenAI } from "@google/genai";
import { OutbreakEvent } from "../types";

// Note: In a real production app, ensure your API key is secure.
// This code assumes process.env.API_KEY is available.
const apiKey = process.env.API_KEY || ''; 
// Fallback for demo purposes if no key is present to prevent crashing
const isApiConfigured = !!apiKey;

let ai: GoogleGenAI | null = null;
if (isApiConfigured) {
  ai = new GoogleGenAI({ apiKey });
}

export const analyzeRisk = async (events: OutbreakEvent[]): Promise<string> => {
  if (!ai || !isApiConfigured) {
    return "API Key 未配置。使用模拟 AI 响应：当前的全球流行病学形势显示热带地区的虫媒疾病风险升高。建议加强南亚和南美洲的监测。";
  }

  try {
    const prompt = `
      分析以下近期疫情爆发事件并提供简要的风险评估摘要（中文，最多100字）。
      重点关注全球趋势和高优先级预警。
      
      Events Data:
      ${JSON.stringify(events.map(e => ({ country: e.country, disease: e.disease, cases: e.cases, summary: e.summary })))}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "未生成分析。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "暂时无法生成 AI 分析。";
  }
};

export const getDiseaseKnowledge = async (diseaseName: string): Promise<string> => {
    if (!ai || !isApiConfigured) {
        return `模拟 Gemini 知识库 (${diseaseName}): ${diseaseName} 是一种通过受感染蚊子叮咬传播给人类的病毒性感染。传播该疾病的主要媒介是埃及伊蚊。症状包括高烧、头痛、皮疹和肌肉疼痛。`;
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `提供关于疾病 "${diseaseName}" 的简要技术摘要（中文），包括传播途径、潜伏期和关键症状。最多80字。`,
        });
        return response.text || "暂无详细信息。";
    } catch (error) {
        return "获取疾病详情失败。";
    }
}