import { GoogleGenAI, type Content } from "@google/genai";
import { env } from "../config/env";

interface ImageGenerationInput {
  originalImageBase64: string;
  originalMimeType: string;
  templateInternalPrompt: string;
  businessType: string;
  platformTarget: string;
  notes?: string;
  quantity: number;
  aspectRatio?: string;
}

const BASE_PROMPT = `You are an expert commercial food photographer specializing in high-end restaurant and delivery app photography. Your task is to transform the provided food image into a stunning, professional photograph while maintaining 100% accuracy to the original dish.

CRITICAL REQUIREMENTS:
- The food must remain EXACTLY as shown - same dish, same ingredients, same presentation
- Only enhance: lighting, background, composition, color vibrancy, and overall appeal
- Output must be PHOTOREALISTIC - indistinguishable from a real professional photo
- No artificial or CGI appearance whatsoever
- The food must look fresh, appetizing, and craveable

TECHNICAL STANDARDS:
- Sharp focus on the food with appropriate depth of field
- Professional color grading suitable for commercial use
- Clean, distraction-free composition
- Appropriate shadows that add dimension without being harsh`;

const aspectRatioMap: Record<string, string> = {
  "1:1": "1:1",
  "4:5": "4:5",
  "5:4": "5:4",
  "3:4": "3:4",
  "4:3": "4:3",
  "9:16": "9:16",
  "16:9": "16:9"
};

export async function imageGenerationService(input: ImageGenerationInput) {
  const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
  const aspectRatio = input.aspectRatio ? aspectRatioMap[input.aspectRatio] || "1:1" : "1:1";

  const prompt = `${BASE_PROMPT}

--- TEMPLATE STYLE ---
${input.templateInternalPrompt}

--- BUSINESS CONTEXT ---
This is food from a ${input.businessType}. Ensure the styling matches this type of establishment.

--- PLATFORM TARGET ---
This image will be used on ${input.platformTarget}. Optimize composition and aspect ratio accordingly.

--- REQUESTED ASPECT RATIO ---
${aspectRatio}
${input.notes && input.notes.trim()
  ? `\n--- ADDITIONAL INSTRUCTIONS ---\n${input.notes.trim()}\n`
  : ""}`;

  const contents: Content[] = [
    {
      role: "user",
      parts: [
        { text: prompt },
        {
          inlineData: {
            mimeType: input.originalMimeType,
            data: input.originalImageBase64
          }
        }
      ]
    }
  ];

  const results: string[] = [];

  for (let i = 0; i < input.quantity; i += 1) {
    const response = await ai.models.generateContent({
      model: env.GEMINI_IMAGE_MODEL,
      contents,
      config: {
        responseModalities: ["IMAGE", "TEXT"]
      }
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((part) => part.inlineData?.data);

    if (!imagePart?.inlineData?.data) {
      throw new Error("Nenhuma imagem foi gerada pela API");
    }

    results.push(imagePart.inlineData.data);
  }

  return results;
}
