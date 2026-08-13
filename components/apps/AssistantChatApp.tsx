"use client";

import { Send, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { CharacterId, characters } from "@/lib/characters";

type Message = { role: "assistant" | "user"; text: string };

export default function AssistantChatApp({ character }: { character: CharacterId }) {
  const profile = characters[character];
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", text: profile.greeting }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [model, setModel] = useState("Gemini 3.6 Flash");
  const messageEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ role: "assistant", text: profile.greeting }]);
    setInput("");
    fetch("/api/assistant").then((response) => response.json()).then((data) => {
      setConfigured(Boolean(data.configured));
      if (data.model) setModel(data.model);
    }).catch(() => setConfigured(false));
  }, [profile]);

  useEffect(() => { messageEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, sending]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const text = input.trim();
    if (!text || sending) return;
    const nextMessages = [...messages, { role: "user" as const, text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ character, messages: nextMessages }),
      });
      const data = await response.json();
      if (!response.ok || !data.text) throw new Error(data.error || "No response");
      setConfigured(true);
      setMessages((items) => [...items, { role: "assistant", text: data.text }]);
    } catch {
      setConfigured(false);
      setMessages((items) => [...items, { role: "assistant", text: profile.fallback }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`assistant-chat assistant-${character}`} style={{ "--assistant-accent": profile.accent } as React.CSSProperties}>
      <aside>
        <div className="assistant-portrait" style={{ backgroundImage: `linear-gradient(180deg, rgba(8,7,12,.05), rgba(8,7,12,.52)), url(${profile.wallpaper})` }}>
          {profile.mediaType === "video" ? <video src={profile.media} autoPlay loop muted playsInline /> : <img src={profile.media} alt={`${profile.name} animated portrait`} />}
        </div>
        <div className="assistant-presence"><span className="online-dot" /> {configured ? "GEMINI ONLINE" : "LOCAL MODE"}</div>
        <strong>{profile.name}</strong>
        <small>{profile.title}</small>
        <p>{configured ? `${model} is connected through a protected server channel.` : "Add GEMINI_API_KEY to the deployment to enable live AI. The character guide remains available locally."}</p>
      </aside>
      <main>
        <header><div><Sparkles size={16} /><span><strong>{profile.name} Intelligence</strong><small>{profile.channel}</small></span></div><em>{sending ? "THINKING" : configured ? "LIVE AI" : "READY"}</em></header>
        <div className="chat-messages">
          {messages.map((message, index) => <article className={message.role} key={`${message.role}-${index}`}>{message.role === "assistant" && <span>{profile.shortName}</span>}<p>{message.text}</p></article>)}
          {sending && <article className="assistant is-typing"><span>{profile.shortName}</span><p><i /><i /><i /></p></article>}
          <div ref={messageEnd} />
        </div>
        <div className="chat-prompts">{profile.suggestions.map((prompt) => <button key={prompt} onClick={() => setInput(prompt)}>{prompt}</button>)}</div>
        <form onSubmit={submit}><input aria-label={`Message ${profile.name}`} value={input} onChange={(event) => setInput(event.target.value)} placeholder={`Ask ${profile.name} anything…`} maxLength={1500} /><button aria-label="Send message" disabled={sending}><Send size={16} /></button></form>
      </main>
    </div>
  );
}
