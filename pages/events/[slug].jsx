import Head from "next/head";
import { motion } from "framer-motion";
import events from "../../data/events.json";

// helpers locais simples (iguais ao estilo da landing)
const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-5xl px-6 ${className}`}>{children}</div>
);

// SSG – gera páginas estáticas para cada evento
export async function getStaticPaths() {
  // filtra só eventos com slug string não vazia
  const valid = (Array.isArray(events) ? events : [])
    .filter(e => e && typeof e.slug === "string" && e.slug.trim() !== "");

  const paths = valid.map(e => ({ params: { slug: e.slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const list = Array.isArray(events) ? events : [];
  const event = list.find(e => e && e.slug === params.slug) || null;

  if (!event) {
    return { notFound: true };
  }

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
        <meta property="og:title" content={`${title} — ECHOS Move`} />
        <meta property="og:description" content={text} />
        {image && <meta property="og:image" content={image} />}
      </Head>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-[36vh] md:h-[48vh] object-cover opacity-95"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
      </section>

      {/* Conteúdo */}
      <section className="py-10 md:py-14">
        <Container>
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: C1 }}
          >
            {title}
          </motion.h1>

          <div className="mt-3 text-slate-600">
            <p><span className="font-medium">Data:</span> {date}</p>
            {location && <p><span className="font-medium">Local:</span> {location}</p>}
          </div>

          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            {text}
          </p>

          {registrationUrl && (
            <div className="mt-8">
              <a
                href={registrationUrl}
                className="inline-flex items-center rounded-xl px-5 py-3 font-semibold text-white shadow"
                style={{ background: `linear-gradient(135deg, ${C1}, ${C2})` }}
                target="_blank" rel="noopener noreferrer"
              >
                Inscrever-me
              </a>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
