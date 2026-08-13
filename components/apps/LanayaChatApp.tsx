"use client";

import { Send, Sparkles } from "lucide-react";
import { FormEvent, useState } from "react";

type Message = { role: "lanaya" | "user"; text: string };
const knowledge = [
  { keys: ["кто", "who", "имя"], answer: "Я Lanaya, Templar Assassin. Здесь я охраняю архив проектов Касыма — и иногда раскрываю секреты, если вопрос достаточно точный." },
  { keys: ["kassym", "касым", "портфолио", "работ"], answer: "Касым — Full-Stack & AI Product Engineer из Астаны. Его сильная сторона — превращать сложные процессы в ясные продуктовые системы." },
  { keys: ["проект", "project"], answer: "Начни с Seven Hills Visual CMS, LLM Gateway и citation-grounded RAG. Открой Projects в Dock — там есть технические детали и ссылки." },
  { keys: ["skill", "стек", "технолог"], answer: "TypeScript, React, Next.js, Python, FastAPI, Go, PostgreSQL, Redis, AWS, Docker и production-shaped RAG." },
  { keys: ["dota", "дота", "templar"], answer: "The Hidden Temple has many layers. Meld, Refraction, Psionic Trap — а хорошие продукты тоже выигрывают за счёт точного тайминга и информации." },
  { keys: ["contact", "контакт", "связ"], answer: "Открой Contacts или напиши на honormorethangold@gmail.com. Ссылки на GitHub, LinkedIn и Hugging Face тоже находятся там." },
];

export default function LanayaChatApp() {
  const [messages, setMessages] = useState<Message[]>([{ role: "lanaya", text: "The secrets I keep are mine to reveal. Спроси меня о Касыме, его проектах, технологиях или о Dota 2." }]);
  const [input, setInput] = useState("");
  function submit(event: FormEvent) { event.preventDefault(); const text = input.trim(); if (!text) return; const lower = text.toLowerCase(); const match = knowledge.find((item) => item.keys.some((key) => lower.includes(key))); const answer = match?.answer ?? "Этот секрет пока скрыт. Попробуй спросить о проектах, стеке, контактах или обо мне — Templar Assassin."; setMessages((items) => [...items, { role: "user", text }, { role: "lanaya", text: answer }]); setInput(""); }
  return <div className="lanaya-chat"><aside><video src="/lanaya-ai.mp4" autoPlay loop muted playsInline /><div><span className="online-dot" /> ONLINE</div><strong>Lanaya</strong><small>Templar Assassin · Portfolio intelligence</small><p>Local interactive character. No messages leave your browser.</p></aside><main><header><div><Sparkles size={16} /><span><strong>Lanaya Intelligence</strong><small>Hidden Temple secure channel</small></span></div></header><div className="chat-messages">{messages.map((message, index) => <article className={message.role} key={index}>{message.role === "lanaya" && <span>L</span>}<p>{message.text}</p></article>)}</div><div className="chat-prompts">{["Какие проекты?", "Расскажи про стек", "Кто ты в Dota 2?"].map((prompt) => <button key={prompt} onClick={() => setInput(prompt)}>{prompt}</button>)}</div><form onSubmit={submit}><input aria-label="Message Lanaya" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask Lanaya anything…" /><button aria-label="Send message"><Send size={16} /></button></form></main></div>;
}
