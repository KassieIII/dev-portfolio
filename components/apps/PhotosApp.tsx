"use client";

import Image from "next/image";
import { useState } from "react";

const photos = [
  { src: "/profile-kassym.png", label: "Kassym" },
  { src: "/wallpapers/lanaya.webp", label: "Lanaya" },
  { src: "/wallpapers/hiyuki.jpeg", label: "Hiyuki" },
  { src: "/project-previews/seven-hills.png", label: "Seven Hills" },
  { src: "/project-previews/proposalflow.png", label: "ProposalFlow" },
  { src: "/project-previews/rag-docs.png", label: "RAG Docs" },
  { src: "/project-previews/geotracker.png", label: "GeoTracker" },
  { src: "/project-previews/olzhas-stroy.png", label: "Olzhas Stroy" },
];

export default function PhotosApp() {
  const [active, setActive] = useState(0);
  return <div className="photos-app"><div className="photo-stage"><Image src={photos[active].src} alt={photos[active].label} fill sizes="80vw" /></div><div className="photo-strip">{photos.map((photo, index) => <button className={index === active ? "active" : ""} key={photo.src} onClick={() => setActive(index)} aria-label={`View ${photo.label}`}><Image src={photo.src} alt="" fill sizes="100px" /><span>{photo.label}</span></button>)}</div></div>;
}
