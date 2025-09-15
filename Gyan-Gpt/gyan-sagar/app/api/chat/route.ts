import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: convertToModelMessages(messages),
  });
  return result.toUIMessageStreamResponse();
}
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({ apiKey: "AIzaSyD4ZfWOZM9R5VQbnTrhv44pyy_QHWUxWow" });

  const prompt =
    "Create a photorealistic image of an orange cat with a green eyes, sitting on a couch.";

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("cat.png", buffer);
    }
  }
}

main();
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

  const imageData = fs.readFileSync("cat.png");
  const base64Image = imageData.toString("base64");

  const prompt = [
    { text:   `Using the image of the cat, create a photorealistic,
street-level view of the cat walking along a sidewalk in a
New York City neighborhood, with the blurred legs of pedestrians
and yellow cabs passing by in the background.` },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("cat2.png", buffer);
    }
  }
}

main();
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

  const imageData = fs.readFileSync("lunch.jpg"); // "Lunch atop a Skyscraper, 1932"
  const base64Image = imageData.toString("base64");

  const prompt = [
    { text: "Restore and colorize this image from 1932" },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("lunch-restored.png", buffer);
    }
  }
}

main();
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

  const imageData1 = fs.readFileSync("girl.png");
  const base64Image1 = imageData1.toString("base64");
  
  const imageData2 = fs.readFileSync("tshirt.png");
  const base64Image2 = imageData2.toString("base64");

  const prompt = [
    { text: "Make the girl wear this t-shirt. Leave the background unchanged." },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image1,
      },
    },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image2,
      },
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image-preview",
    contents: prompt,
  });
  for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      const buffer = Buffer.from(imageData, "base64");
      fs.writeFileSync("girl-with-tshirt.png", buffer);
    }
  }
}

main();
import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

async function main() {

  const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

  const chat = ai.chats.create({model: "gemini-2.5-flash-image-preview"});
  
  const imageData = fs.readFileSync("cat.png");
  const base64Image = imageData.toString("base64");

  const response1 = await chat.sendMessage({
    message: [
      { text: "Change the cat to a bengal cat, leave everything else the same." },
      {
        inlineData: {
          mimeType: "image/png",
          data: base64Image,
        },
      },
    ]
  });
  // display / save image...

  const response2 = await chat.sendMessage({
    message: "The cat should wear a funny party hat"
  });
  // display / save image...

}

main();