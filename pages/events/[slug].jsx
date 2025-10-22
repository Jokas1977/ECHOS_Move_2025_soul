import Head from "next/head";
import { motion } from "framer-motion";
import events from "../../data/events.json";

// --- helpers ---
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-5xl px-6 ${className}`}>{children}</div>
);

function normalizeEvents(raw) {
  // aceita tanto array direto quanto objeto { events: [...] }
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.events)) return raw.events;
  return [];
}

function validateAndFilter(list) {
  const valid = [];
  const invalid = [];
  list.forEach((item, idx) => {
    const ok = item && typeof item.slug === "string" && item.slug.trim().length > 0;
    if (ok) valid.push(item);
    else invalid.push({ idx, item });
  });
  if (invalid.length > 0) {
    console.error("⚠ Eventos inválidos (sem slug string):", invalid);
  }
  return valid;
}

// --- SSG ---
export async function getStaticPaths() {
  const list = validateAndFilter(normalizeEvents(events));
  const paths = list.map(e => ({ params: { slug: e.slug } }));

  if (paths.length === 0) {
    throw new Error(
      "Nenhum slug válido encontrado. Verifica data/events.json — precisa de ser um array de objetos, cada um com { slug: '...' }."
    );
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const list = validateAndFilter(normalizeEvents(events));
  const event = list.find(e => e.slug === params.slug) || null;

  if (!event) return { notFound: true };
  return { props: { event } };
}

// --- Página ---
export default function EventPage({ event }) {
  const { title, date, text, image, location, registrationUrl } = event;
  const C1 = "#7da8ba";
  const C2 = "#7fafae";

  return (
    <main className="min-h-screen text-slate-800" style={{ background: `linear-gradient(180deg, ${C1}14, #ffffff 55%)` }}>
      <Head>
        <title>{title} — ECHOS Move</title>
        <meta name="description" content={text} />
        <meta property="og:title" content={`${title} — ECHOS Move`} />
        <meta property="og:description" content={text} />
        {image && <meta property="og:image" content={image} />}
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {image && (
          <img src={image} alt={title} className="w-full h-[36vh] md:h-[48vh] object-cover opacity-95" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
      </section>

      {/* Conteúdo */}
      <section className="py-10 md:py-14">
        <Container>
          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: C1 }}>
            {title}
          </motion.h1>

          <div className="mt-3 text-slate-600">
            {date && <p><span className="font-medium">Data:</span> {date}</p>}
            {location && <p><span className="font-medium">Local:</span> {location}</p>}
          </div>

          {text && <p className="mt-6 text-lg leading-relaxed text-slate-700">{text}</p>}

          {registrationUrl && (
            <div className="mt-8">
              <a href={registrationUrl} className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white shadow"
                 style={{ background: `linear-gradient(135deg, ${C1}, ${C2})` }} target="_blank" rel="noopener noreferrer">
                Inscrever-me
              </a>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
