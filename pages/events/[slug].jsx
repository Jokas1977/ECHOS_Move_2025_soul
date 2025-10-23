import Head from "next/head";
import { marked } from "marked";

// LÊ O JSON DENTRO DAS FUNÇÕES (evita caches estranhos do bundler)
async function loadEvents() {
  const mod = await import("../../data/events.json");
  const data = mod.default ?? mod;
  return Array.isArray(data) ? data : (Array.isArray(data?.events) ? data.events : []);
}

export async function getStaticPaths() {
  const list = await loadEvents();
  const paths = list
    .filter(e => e && typeof e.slug === "string" && e.slug.trim().length > 0)
    .map(e => ({ params: { slug: e.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const list = await loadEvents();
  const event = list.find(e => e && e.slug === params.slug) || null;

  if (!event) return { notFound: true };

  // Prepara HTML do markdown aqui (para não depender do cliente)
  let html = "";
  try { html = event.content ? marked.parse(String(event.content)) : ""; } catch { html = String(event.content || ""); }

  return {
    props: {
      event: {
        ...event,
        __htmlContent: html,                 // passa HTML pronto
        __debugHasContent: Boolean(event.content),
        __debugContentLength: event.content ? String(event.content).length : 0
      }
    }
  };
}

export default function EventPage({ event }) {
  const { title, date, text, image, location, registrationUrl, __htmlContent } = event;
  const C1 = "#7da8ba";
  const C2 = "#7fafae";

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

        {/* RENDER DO MARKDOWN (HTML já vindo do getStaticProps) */}
        {__htmlContent && (
          <div
            className="mt-8 space-y-4 leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{ __html: __htmlContent }}
          />
        )}

        {!__htmlContent && (
          <p className="mt-8 text-slate-500">
            Mais detalhes brevemente. Para inscrições, usa o botão acima.
          </p>
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

        {/* DEBUG — remove quando quiseres */}
        <pre className="mt-10 text-xs bg-slate-50 p-3 rounded overflow-auto">
{JSON.stringify({slug: event.slug, hasContent: event.__debugHasContent, length: event.__debugContentLength}, null, 2)}
        </pre>
      </section>
    </main>
  );
}
