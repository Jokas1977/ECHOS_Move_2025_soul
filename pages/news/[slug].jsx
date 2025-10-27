import Head from "next/head";
import { marked } from "marked";

// Lê as notícias do JSON
async function loadNews() {
  const mod = await import("../../data/news.json");
  const data = mod.default ?? mod;
  return Array.isArray(data) ? data : (Array.isArray(data?.news) ? data.news : []);
}

export async function getStaticPaths() {
  const list = await loadNews();
  const paths = list
    .filter((n) => n && typeof n.slug === "string" && n.slug.trim().length > 0)
    .map((n) => ({ params: { slug: n.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const list = await loadNews();
  const newsItem = list.find((n) => n && n.slug === params.slug) || null;
  if (!newsItem) return { notFound: true };

  let html = "";
  try {
    html = newsItem.content ? marked.parse(String(newsItem.content)) : "";
  } catch {
    html = String(newsItem.content || "");
  }

  return { props: { newsItem: { ...newsItem, __htmlContent: html } } };
}

export default function NewsPage({ newsItem }) {
  const { title, date, text, image, __htmlContent } = newsItem;
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
        <p className="mt-2 text-slate-600">{new Date(date).toLocaleDateString("pt-PT", { day: '2-digit', month: 'long', year: 'numeric' })}</p>

        {text && <p className="mt-6 text-lg leading-relaxed text-slate-700">{text}</p>}

        {__htmlContent && (
          <div
            className="mt-8 space-y-4 leading-relaxed text-slate-700"
            dangerouslySetInnerHTML={{ __html: __htmlContent }}
          />
        )}

        {/* Botão para voltar à home */}
        <div className="mt-10">
          <a
            href="/"
            className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white shadow transition hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${C2}, ${C1})` }}
          >
            ← Voltar à página inicial
          </a>
        </div>
      </section>
    </main>
  );
}
