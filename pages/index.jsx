import React from "react";
import { motion } from "framer-motion";

// ECHOS Move — Landing Page com logotipo personalizado
// Paleta
const C1 = "#7da8ba";
const C2 = "#7fafae";
const C3 = "#9ec0be";
const C4 = "#9ec0be";

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`w-full py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>
);

const PillarCard = ({ title, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-white/70 backdrop-blur rounded-2xl p-6 shadow-sm border border-white/40"
  >
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-600 leading-relaxed">{text}</p>
    </div>
  </motion.div>
);

const EventCard = ({ date, title, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl p-6 border bg-white/70 backdrop-blur shadow-sm border-white/40"
  >
    <p className="text-sm font-medium" style={{ color: C1 }}>{date}</p>
    <h4 className="mt-1 text-xl font-semibold text-slate-900">{title}</h4>
    <p className="mt-2 text-slate-600">{text}</p>
    <div className="mt-4">
      <a
        href="#join"
        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white"
        style={{ background: C2 }}
      >
        Inscrever
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  </motion.div>
);

const Testimonial = ({ quote, author }) => (
  <motion.blockquote
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="rounded-2xl p-6 border bg-white/70 backdrop-blur shadow-sm border-white/40"
  >
    <p className="text-slate-700 leading-relaxed">“{quote}”</p>
    <footer className="mt-3 text-sm text-slate-500">— {author}</footer>
  </motion.blockquote>
);

export default function ECHOSMoveLanding() {
  return (
    <main className="min-h-screen text-slate-800" style={{ background: `linear-gradient(180deg, ${C1}0F, ${C3}0A 35%, #ffffff 65%)` }}>
      <header className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur">
        <Container className="flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-3">
            <LogoMark />
            <span className="sr-only">ECHOS Move</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#vision" className="hover:opacity-80">Visão</a>
            <a href="#pillars" className="hover:opacity-80">Pilares</a>
            <a href="#programs" className="hover:opacity-80">Programas</a>
            <a href="#events" className="hover:opacity-80">Eventos</a>
            <a href="#join" className="hover:opacity-80">Participar</a>
          </nav>
          <a href="#join" className="hidden md:inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold text-white shadow" style={{ background: `linear-gradient(135deg, ${C2}, ${C1})` }}>Juntar‑me</a>
        </Container>
      </header>

      <Section id="top" className="relative overflow-hidden pt-16">
        <DecorBackdrop />
        <Container className="relative">
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold tracking-tight" style={{ color: C1 }}>ECHOS Move</motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05 }} className="mt-4 max-w-2xl text-lg md:text-xl text-slate-700">
            Ressonância que transforma. Um movimento para integrar conhecimento, ação, criação e comunidade — com leveza, arte e propósito.
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#join" className="inline-flex items-center rounded-xl px-5 py-3 text-sm md:text-base font-semibold text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${C1}, ${C2})` }}>Participar agora</a>
            <a href="#programs" className="inline-flex items-center rounded-xl px-5 py-3 text-sm md:text-base font-semibold" style={{ color: C1, background: `${C1}1A` }}>Explorar programas</a>
          </div>
        </Container>
      </Section>

      <Section id="vision">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C2 }}>Visão</h2>
          <p className="mt-4 max-w-3xl text-slate-700">Acreditamos no poder da palavra, do corpo em movimento e da criação colaborativa para cultivar uma humanidade mais consciente e solidária. O progresso real nasce quando o indivíduo encontra o seu ritmo interior e o partilha com o mundo.</p>
        </Container>
      </Section>

      <Section id="pillars" className="bg-gradient-to-b from-white to-[rgba(255,255,255,0.6)]">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C2 }}>Pilares</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PillarCard title="Conhecimento" text="Pensamento crítico e curiosidade aberta: aprender para libertar." />
            <PillarCard title="Ação" text="Responsabilidade social, impacto local e cooperação prática." />
            <PillarCard title="Criação" text="Expressão artística e inovação como linguagens do humano." />
            <PillarCard title="Comunidade" text="Cuidar de pessoas, ambientes e relações que dão sentido." />
          </div>
        </Container>
      </Section>

      <Section id="programs">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C2 }}>Programas</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <EventCard date="Mensal" title="Laboratório de Voz & Palavra" text="Explorar a ressonância da palavra como vetor de presença, criação e ligação." />
            <EventCard date="Trimestral" title="Residência Criativa" text="Imersões curtas para cocriação entre artes, reflexão e ação comunitária." />
            <EventCard date="Contínuo" title="Círculos ECHOS" text="Grupos locais para prática, partilha e apoio mútuo — Aveiro e online." />
          </div>
        </Container>
      </Section>

      <Section id="testimonials" className="bg-[rgba(255,255,255,0.7)]">
        <Container>
          <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C2 }}>Vozes</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial quote="Senti a minha voz ganhar corpo — e o corpo, voz." author="Maria, participante" />
            <Testimonial quote="Saí com ferramentas simples que mudaram a minha forma de estar no dia a dia." author="Rui, residente" />
            <Testimonial quote="Há beleza, rigor e humanidade em tudo o que fazem." author="Teresa, parceira" />
          </div>
        </Container>
      </Section>

      <Section id="join">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold" style={{ color: C2 }}>Junta‑te ao movimento</h2>
              <p className="mt-3 text-slate-700">Recebe novidades, eventos e oportunidades de participação. Sem spam — só o essencial.</p>
              <form className="mt-6 flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input type="email" required placeholder="o.teu@email.com" className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2" style={{ borderColor: `${C1}55`, caretColor: C1 }} />
                <button type="submit" className="rounded-xl px-5 py-3 font-semibold text-white shadow" style={{ background: `linear-gradient(135deg, ${C1}, ${C2})` }}>Subscrever</button>
              </form>
              <div className="mt-6 text-sm text-slate-500">Ao subscrever, aceitas a nossa política de privacidade.</div>
            </div>
            <div className="rounded-2xl p-6 border bg-white/70 backdrop-blur shadow-sm border-white/40">
              <h3 className="text-lg font-semibold text-slate-900">Contactos</h3>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li><span className="font-medium">Email:</span> hello@echosmove.org (exemplo)</li>
                <li><span className="font-medium">Sede:</span> Aveiro, Portugal</li>
                <li><span className="font-medium">Redes:</span> Instagram · YouTube · Substack</li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <footer className="border-t">
        <Container className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LogoMark small />
            <p className="text-sm text-slate-600">© {new Date().getFullYear()} ECHOS Move. Todos os direitos reservados.</p>
          </div>
          <div className="text-sm text-slate-500 flex gap-4">
            <a href="#" className="hover:opacity-80">Privacidade</a>
            <a href="#" className="hover:opacity-80">Termos</a>
          </div>
        </Container>
      </footer>
    </main>
  );
}

function LogoMark({ small = false }) {
  const size = small ? 40 : 80;
  return (
    <div className="flex items-center gap-3">
      <img
        src="/logo-echo.png"
        alt="ECHOS Move logo"
        width={size}
        height={size}
        style={{ objectFit: "contain" }}
      />
      {!small && (
        <span className="font-semibold tracking-tight text-slate-900">
          ECHOS <span className="opacity-70">Move</span>
        </span>
      )}
    </div>
  );
}

function DecorBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg className="absolute -top-24 -right-24 w-[600px] opacity-30" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 300) rotate(90) scale(300)">
            <stop offset="0%" stopColor={C2} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={C1} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="300" fill="url(#rg)" />
      </svg>
      <svg className="absolute -bottom-40 -left-40 w-[520px] opacity-30" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="rg2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 300) rotate(90) scale(300)">
            <stop offset="0%" stopColor={C3} stopOpacity="0.55"/>
            <stop offset="100%" stopColor={C1} stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="300" cy="300" r="300" fill="url(#rg2)" />
      </svg>
    </div>
  );
}
