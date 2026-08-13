"use client";

import { Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
type Note = { id: number; title: string; body: string; updated: number };
const starter: Note[] = [{ id: 1, title: "Ideas for useful software", body: "• Build products around real operational friction\n• Measure before automating\n• Keep the interface calm\n• Ship the smallest complete system", updated: Date.now() }];
export default function NotebookApp() {
  const [notes, setNotes] = useState<Note[]>(starter); const [active,setActive]=useState(1); const [query,setQuery]=useState("");
  useEffect(() => { try { const saved=localStorage.getItem("ky-notebook"); if(saved){const parsed=JSON.parse(saved);setNotes(parsed);setActive(parsed[0]?.id ?? 0);} } catch {} },[]);
  useEffect(() => { localStorage.setItem("ky-notebook",JSON.stringify(notes)); },[notes]);
  const visible=useMemo(()=>notes.filter(note=>(note.title+note.body).toLowerCase().includes(query.toLowerCase())),[notes,query]); const note=notes.find(item=>item.id===active);
  function add(){const id=Date.now();setNotes(items=>[{id,title:"New note",body:"",updated:id},...items]);setActive(id);} function update(patch:Partial<Note>){setNotes(items=>items.map(item=>item.id===active?{...item,...patch,updated:Date.now()}:item));} function remove(){setNotes(items=>items.filter(item=>item.id!==active));setActive(notes.find(item=>item.id!==active)?.id??0);}
  return <div className="notebook-app"><aside><header><strong>Notebook</strong><button onClick={add}><Plus size={15}/></button></header><label><Search size={13}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search"/></label>{visible.map(item=><button className={active===item.id?"active":""} onClick={()=>setActive(item.id)} key={item.id}><strong>{item.title||"Untitled"}</strong><small>{item.body.slice(0,52)||"Empty note"}</small></button>)}</aside><main>{note?<><div className="note-meta"><span>{new Date(note.updated).toLocaleString()}</span><button onClick={remove}><Trash2 size={15}/></button></div><input className="note-title" value={note.title} onChange={e=>update({title:e.target.value})}/><textarea value={note.body} onChange={e=>update({body:e.target.value})} placeholder="Start writing…"/></>:<button className="empty-note" onClick={add}>Create your first note</button>}</main></div>;
}
