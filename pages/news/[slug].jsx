import Head from "next/head";
import { marked } from "marked";

async function loadNews() {
  const mod = await import("../../data/news.json");
  const data = mod.default ?? mod;
  return Array.isArray(data) ? data : (Array.isArray(data?.news) ? data.news : []);
}

export async function getStaticPaths() {
  const list = await loadNews();
  const paths = list
    .filter(n => n && typeof n.slug === "string" && n.slug.trim())
    .map(n => ({ params: { slug: n.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const list = await loadNews();
  const item = list.find(n => n.slug === params.slug) || null;
  if (!item) return { notFound: true };

  let html = "";
  try { html = item.content ? marked.parse(String(item.content)) : ""; }
  catch { html = String(item.content || ""); }

  return { props: { item: { ...item, __html: html } } };
}

export default function NewsPage({ item }) {
  const { title, date, text, image, __html } = item;
  const C1 = "#7da8ba", C2 = "#7fafae";

  return (
    <main className="min-h-screen text-slate-800" style={{ background: `linear-gradient(180deg, ${C1}14, #fff 55%)` }}>
      <Head>
        <title>{title} — ECHOS Move</title>
        <meta name="description" content={text || title} />
        {image && <meta property="og:image" content={image} />}
      </Head>

      {image && <img src={image} alt={title} className="w-full h-[40vh] object-cover" />}

      <section className="py-10 mx-auto w-full max-w-5xl px-6">
        <h1 className="text-3xl md:text-4xl font-extrabold" style={{ color: C1 }}>{title}</h1>
        {date && <p className="mt-2 text-slate-600">{new Date(date).toLocaleDateString("pt-PT", { day:"2-digit", month:"long", year:"numeric" })}</p>}
        {text && <p className="mt-6 text-lg leading-relaxed text-slate-700">{text}</p>}
        {__html && <div className="mt-8 leading-relaxed text-slate-700" dangerouslySetInnerHTML={{ __html: __html }} />}
        <div className="mt-10">
          <a href="/" className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white shadow hover:opacity-90"
             style={{ background: `linear-gradient(135deg, ${C2}, ${C1})` }}>
            ← Voltar à página inicial
          </a>
        </div>
      </section>
    </main>
  );
}
