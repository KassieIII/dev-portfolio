import { CharacterId, characters, portfolioContext } from "@/lib/characters";

export const runtime = "nodejs";

const MODEL = process.env.GEMINI_MODEL?.trim() || "gemini-3.6-flash";
const limitWindow = new Map<string, { count: number; resetAt: number }>();

type IncomingMessage = { role: "user" | "assistant"; text: string };

function getApiKey() {
  return (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY)?.trim();
}

function isCharacter(value: unknown): value is CharacterId {
  return typeof value === "string" && value in characters;
}

function allowRequest(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = limitWindow.get(ip);
  if (!current || current.resetAt < now) {
    limitWindow.set(ip, { count: 1, resetAt: now + 5 * 60_000 });
    return true;
  }
  if (current.count >= 24) return false;
  current.count += 1;
  return true;
}

export async function GET() {
  return Response.json({ configured: Boolean(getApiKey()), model: MODEL });
}

export async function POST(request: Request) {
  if (!allowRequest(request)) return Response.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  const apiKey = getApiKey();
  if (!apiKey) return Response.json({ error: "Gemini is not configured on this deployment." }, { status: 503 });

  let body: { character?: unknown; messages?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const character = isCharacter(body.character) ? body.character : "lanaya";
  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const messages = rawMessages
    .filter((item): item is IncomingMessage => item && typeof item === "object" && ((item as IncomingMessage).role === "user" || (item as IncomingMessage).role === "assistant") && typeof (item as IncomingMessage).text === "string")
    .slice(-20)
    .map((item) => ({ ...item, text: item.text.trim().slice(0, 1_500) }))
    .filter((item) => item.text);

  if (!messages.length || messages[messages.length - 1].role !== "user") {
    return Response.json({ error: "A user message is required." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 35_000);
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: `${characters[character].systemPrompt}\n\nPORTFOLIO CONTEXT:\n${portfolioContext}` }] },
        contents: messages.map((message) => ({ role: message.role === "assistant" ? "model" : "user", parts: [{ text: message.text }] })),
        generationConfig: { maxOutputTokens: 1_000, temperature: 0.85, topP: 0.95, thinkingConfig: { thinkingLevel: "low" } },
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      const reason = data?.error?.message || "Gemini could not answer this request.";
      return Response.json({ error: reason }, { status: response.status >= 500 ? 502 : 400 });
    }
    const text = data?.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || "").join("").trim();
    if (!text) return Response.json({ error: "Gemini returned an empty response." }, { status: 502 });
    return Response.json({ text, model: MODEL });
  } catch (error) {
    const message = error instanceof Error && error.name === "AbortError" ? "Gemini took too long to respond." : "The AI channel is temporarily unavailable.";
    return Response.json({ error: message }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
