import Head from "next/head";
import eventsData from "../../data/events.json"; // <- alias claro

// garante que temos mesmo um array de eventos
const list = Array.isArray(eventsData) ? eventsData : (eventsData?.events ?? []);

export async function getStaticPaths() {
  // só aceita itens com slug string não vazia
  const paths = list
    .filter(e => e && typeof e.slug === "string" && e.slug.trim().length > 0)
    .map(e => ({ params: { slug: e.slug } }));

  if (paths.length === 0) {
    throw new Error('Nenhum slug válido em data/events.json');
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const event = list.find(e => e && e.slug === params.slug) || null;
  if (!event) return { notFound: true };
  return { props: { event } };
}

export default function EventPage({ event }) {
  const { title, date, text, image, location, registrationUrl } = event;
  const C1 = "#7da8ba";
  const C2 = "#7fafae";

  return (
    <main className="min-h-screen text-slate-800" style={{ background: `linear-gradient(180deg, ${C1}14, #ffffff 55%)` }}>
      <Head>
        <title>{title} — ECHOS Move</title>
        <meta name="description" content={text} />
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

        {registrationUrl && (
          <div className="mt-8">
            <a href={registrationUrl} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white shadow"
               style={{ background: `linear-gradient(135deg, ${C1}, ${C2})` }}>
              Inscrever-me
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
