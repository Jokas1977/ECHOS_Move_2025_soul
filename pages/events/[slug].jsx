import React, { useEffect, useState } from "react";
import Head from "next/head";
import { marked } from "marked";

// ---- Lê os eventos no build (SSR) ----
async function loadEvents() {
  const mod = await import("../../data/events.json");
  const data = mod.default ?? mod;
  return Array.isArray(data) ? data : (Array.isArray(data?.events) ? data.events : []);
}

export async function getStaticPaths() {
  const list = await loadEvents();
  const paths = list
    .filter((e) => e && typeof e.slug === "string" && e.slug.trim().length > 0)
    .map((e) => ({ params: { slug: e.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const list = await loadEvents();
  const event = list.find((e) => e && e.slug === params.slug) || null;
  if (!event) return { notFound: true };

  // Pré-renderiza o markdown no build (se existir)
  let html = "";
  try {
    html = event.content ? marked.parse(String(event.content)) : "";
  } catch {
    html = String(event.content || "");
  }

  return { props: { event: { ...event, __htmlContent: html } } };
}

export default function EventPage({ event }) {
  const { slug, title, date, text, image, location, registrationUrl, __htmlContent, content } = event;
  const C1 = "#7da8ba";
  const C2 = "#7fafae";

  // Estado do HTML a mostrar (usa SSR se existir; senão, busca em runtime)
  const [html, setHtml] = useState(__htmlContent || "");

  // Fallback em runtime: se não veio content no build, ler via API /api/events
  useEffect(() => {
    if (html) return; // já temos HTML do SSR
    async function fetchContent() {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        const all = await res.json();
        const current = Array.isArray(all) ? all.find((e) => e.slug === slug) : null;
        const md = current?.content ? String(current.content) : "";
        if (md) {
          try { setHtml(marked.parse(md)); } catch { setHtml(md); }
        }
      } catch (e) {
        console.error("Falha a obter conteúdo do evento:", e);
      }
    }
    // só tenta se o prop "content" também não veio
    if (!content) fetchContent();
  }, [slug, html, content]);

  return (
    <main className="min-h-screen text-slate-800" style={{ background: `linear-gradient(180deg, ${C1}14, #ffffff 55%)` }}>
      <Head>
        <title>{title} — ECHOS Move</title>
        <meta name="description" content={text || title} />
        {image && <meta property="og:image" content={image} />}
      </Head>

      {/* Hero */}
      {image && (
        <section className="relative overflow-hidden">
          <img src={image} alt={title} className="w-full h-[38vh] md:h-[52vh] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
        </section>
      )}

      {/* Conteúdo */}
      <section className="py-10 md:py-14 mx-auto w-full max-w-5xl px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: C1 }}>{title}</h1>

        <div className="mt-3 text-slate-600">
          {date && <p><span className="font-medium">Data:</span> {date}</p>}
          {location && <p><span className="font-medium">Local:</span> {location}</p>}
        </div>

        {text && <p className="mt-6 text-lg leading-relaxed text-slate-700">{text}</p>}

        {/* Corpo em Markdown (do SSR ou carregado via API) */}
        {html ? (
          <div
            className="mt-8 space-y-4 leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="mt-8 text-slate-500">Mais detalhes brevemente. Para inscrições, usa o botão acima.</p>
        )}

        {registrationUrl && (
          <div className="mt-8">
            <a
              href={registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white shadow"
              style={{ background: `linear-gradient(135deg, ${C1}, ${C2})` }}
            >
              Inscrever-me
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
