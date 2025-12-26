import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import logoKDS from "./assets/logo-kds.png";

function CountUp({ to = 100, duration = 900, suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = Math.round(from + (to - from) * eased);
      setVal(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

const BRAND = {
  name: "Kelensi Digital Solutions",
  tagline_fr: "Solutions IA mesurables pour automatiser, optimiser, décider.",
  tagline_en: "Measurable AI solutions to automate, optimize, decide.",
  primaryCta_fr: "Réserver un appel",
  primaryCta_en: "Book a call",
  secondaryCta_fr: "Voir les services",
  secondaryCta_en: "Explore services",
  email: "contact@kelensidigitalsolutions.com",
  phone: "+1 (000) 000-0000",
  website: "https://kelensidigitalsolutions.com",
};

const COPY = {
  fr: {
    nav: { services: "Services", solutions: "Solutions", preuves: "Preuves", process: "Méthode", tarifs: "Offres", contact: "Contact" },
    hero: {
      kicker: "IA, automatisation, systèmes",
      h1a: "Transforme tes opérations",
      h1b: "avec une IA utile.",
      sub: "Nous construisons des solutions d’automatisation et des expériences web premium qui augmentent la productivité, réduisent les frictions, et améliorent les décisions.",
      trust: ["Bilingue FR/EN", "Déploiement cloud", "Sécurité et performance", "Livrables pro"],
    },
    metrics: [
      { k: "+30%", v: "gain de productivité", s: "sur workflows ciblés" },
      { k: "2 à 6", v: "semaines", s: "pour livrer un MVP" },
      { k: "1", v: "stack moderne", s: "déploiement stable" },
      { k: "FR/EN", v: "expérience", s: "optimisée conversion" },
    ],
    servicesTitle: "Services",
    servicesSub: "Des solutions concrètes, orientées impact, avec des livrables propres.",
    services: [
      { t: "Automatisation IA", d: "Workflows, agents, intégrations, réduction des tâches répétitives, contrôle et suivi." },
      { t: "Sites premium & landing pages", d: "Bilingue, rapide, optimisé SEO, design haut niveau, conversion." },
      { t: "Systèmes et outils métiers", d: "Portails, dashboards, formulaires, CRM léger, bases de connaissances." },
      { t: "Déploiement et fiabilité", d: "VPS, Docker, monitoring, sécurité, backups, mise en production propre." },
    ],
    solutionsTitle: "Solutions phares",
    solutionsSub: "Choisis un point d’entrée, on construit une solution adaptée à ton business.",
    solutions: [
      { t: "Moteur d’automatisation", d: "Automatiser de bout en bout, avec métriques, alertes, logs, qualité." },
      { t: "Agent de support intelligent", d: "Répond, classe, priorise, documente, et escalade proprement." },
      { t: "Site de conversion", d: "Structure claire, copywriting, preuve sociale, CTA, analytics." },
    ],
    preuvesTitle: "Preuves",
    preuvesSub: "Des résultats et une exécution propre, visibles dans le produit final.",
    preuves: [
      { t: "Qualité d’exécution", d: "Architecture claire, performance, SEO, responsive, accessibilité." },
      { t: "Orientation business", d: "Objectifs, KPI, conversion, simplification du parcours client." },
      { t: "Sécurité et stabilité", d: "Bonnes pratiques, backups, durcissement, gestion des secrets." },
    ],
    testimonialsTitle: "Ils aiment la clarté et la vitesse d’exécution",
    testimonials: [
      { q: "Livraison rapide, propre, et orientée résultat. On a gagné du temps dès la première semaine.", a: "Client, Services" },
      { q: "Le site est premium et le parcours est clair. Les demandes entrent plus facilement.", a: "Client, Conseil" },
      { q: "L’automatisation a réduit les tâches manuelles. On suit tout avec des indicateurs.", a: "Client, Opérations" },
    ],
    processTitle: "Méthode",
    processSub: "Simple, structurée, et orientée livrables.",
    steps: [
      { n: "01", t: "Diagnostic", d: "Objectifs, contraintes, parcours client, données, risques." },
      { n: "02", t: "Design et prototype", d: "Maquettes, architecture, copy, validation rapide." },
      { n: "03", t: "Build", d: "Développement, intégrations, contenus, automatisations." },
      { n: "04", t: "Déploiement", d: "Sécurité, performance, SEO, monitoring, sauvegardes." },
      { n: "05", t: "Optimisation", d: "Tests, analytics, itérations, amélioration continue." },
    ],
    pricingTitle: "Offres",
    pricingSub: "Trois options, avec un périmètre clair. On ajuste selon ton besoin.",
    pricing: [
      { t: "Starter", p: "À partir de 750$", b: ["Landing page bilingue", "Design premium", "SEO base", "Formulaire + email"], cta: "Demander un devis" },
      { t: "Growth", p: "À partir de 1 900$", b: ["Site 4 à 7 pages", "Animations avancées", "Analytics", "Optimisation conversion"], cta: "Planifier un appel" },
      { t: "Automation", p: "À partir de 2 900$", b: ["Workflows IA", "Intégrations", "Dashboard suivi", "Déploiement + backups"], cta: "Discuter du projet" },
    ],
    contactTitle: "Contact",
    contactSub: "Dis-moi ton objectif, je te propose un plan simple et un périmètre clair.",
    form: { name: "Nom", email: "Email", company: "Entreprise", goal: "Objectif", send: "Envoyer" },
    footer: "© " + new Date().getFullYear() + " Kelensi Digital Solutions. Tous droits réservés.",
  },
  en: {
    nav: { services: "Services", solutions: "Solutions", preuves: "Proof", process: "Process", tarifs: "Packages", contact: "Contact" },
    hero: {
      kicker: "AI, automation, systems",
      h1a: "Upgrade your operations",
      h1b: "with useful AI.",
      sub: "We build automation systems and premium web experiences that increase productivity, reduce friction, and improve decision-making.",
      trust: ["FR/EN bilingual", "Cloud-ready deployment", "Security and performance", "Professional deliverables"],
    },
    metrics: [
      { k: "+30%", v: "productivity lift", s: "on targeted workflows" },
      { k: "2 to 6", v: "weeks", s: "to ship an MVP" },
      { k: "1", v: "modern stack", s: "stable deployment" },
      { k: "FR/EN", v: "experience", s: "conversion-first" },
    ],
    servicesTitle: "Services",
    servicesSub: "Practical solutions, impact-driven, with clean deliverables.",
    services: [
      { t: "AI automation", d: "Workflows, agents, integrations, less repetitive work, full visibility." },
      { t: "Premium sites and landing pages", d: "Bilingual, fast, SEO-ready, high-end design, conversion." },
      { t: "Business tools", d: "Portals, dashboards, forms, lightweight CRM, knowledge base." },
      { t: "Deployment and reliability", d: "VPS, Docker, monitoring, security, backups, clean go-live." },
    ],
    solutionsTitle: "Featured solutions",
    solutionsSub: "Pick a starting point, we build the right system for your business.",
    solutions: [
      { t: "Automation engine", d: "End-to-end automation with metrics, alerts, logs, quality controls." },
      { t: "Smart support agent", d: "Answers, tags, prioritizes, documents, and escalates properly." },
      { t: "Conversion website", d: "Clear structure, strong copy, social proof, CTA, analytics." },
    ],
    preuvesTitle: "Proof",
    preuvesSub: "Results and clean execution, visible in the final product.",
    preuves: [
      { t: "Execution quality", d: "Clear architecture, performance, SEO, responsive, accessibility." },
      { t: "Business focus", d: "Goals, KPIs, conversion, simplified customer journey." },
      { t: "Security and stability", d: "Best practices, backups, hardening, secrets management." },
    ],
    testimonialsTitle: "Clients value clarity and delivery speed",
    testimonials: [
      { q: "Fast delivery, clean build, outcome-focused. We saved time in the first week.", a: "Client, Services" },
      { q: "Premium site and clear journey. Leads come in more consistently.", a: "Client, Consulting" },
      { q: "Automation reduced manual tasks. We track everything with metrics.", a: "Client, Operations" },
    ],
    processTitle: "Process",
    processSub: "Simple, structured, deliverable-first.",
    steps: [
      { n: "01", t: "Discovery", d: "Goals, constraints, customer journey, data, risks." },
      { n: "02", t: "Design and prototype", d: "Wireframes, architecture, copy, quick validation." },
      { n: "03", t: "Build", d: "Development, integrations, content, automation." },
      { n: "04", t: "Deploy", d: "Security, performance, SEO, monitoring, backups." },
      { n: "05", t: "Optimize", d: "Testing, analytics, iterations, continuous improvement." },
    ],
    pricingTitle: "Packages",
    pricingSub: "Three options with clear scope. We tailor to your needs.",
    pricing: [
      { t: "Starter", p: "From $750", b: ["Bilingual landing page", "Premium design", "Basic SEO", "Form + email"], cta: "Request a quote" },
      { t: "Growth", p: "From $1,900", b: ["4 to 7 pages site", "Advanced animations", "Analytics", "Conversion tuning"], cta: "Book a call" },
      { t: "Automation", p: "From $2,900", b: ["AI workflows", "Integrations", "Tracking dashboard", "Deploy + backups"], cta: "Discuss project" },
    ],
    contactTitle: "Contact",
    contactSub: "Share your goal, I will propose a simple plan and a clear scope.",
    form: { name: "Name", email: "Email", company: "Company", goal: "Goal", send: "Send" },
    footer: "© " + new Date().getFullYear() + " Kelensi Digital Solutions. All rights reserved.",
  },
};

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

function useLang() {
  const [lang, setLang] = useState(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("kds_lang") : null;
    return saved === "en" ? "en" : "fr";
  });
  useEffect(() => {
    window.localStorage.setItem("kds_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);
  return { lang, setLang, t: COPY[lang] };
}

function useMagnetic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 240, damping: 18, mass: 0.2 });
  const sy = useSpring(y, { stiffness: 240, damping: 18, mass: 0.2 });

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * 0.12);
    y.set(dy * 0.12);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { sx, sy, onMove, onLeave };
}

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
    <div className="mb-10">
      {eyebrow ? (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span className="h-2 w-2 rounded-full bg-white/40" />
          <span>{eyebrow}</span>
        </div>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      {subtitle ? <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70 sm:text-base">{subtitle}</p> : null}
    </div>
    {children}
  </section>
);

const Card = ({ children, className }) => (
  <motion.div
    whileHover={{ y: -4 }}
    transition={{ type: "spring", stiffness: 260, damping: 18 }}
    className={
      "rounded-3xl border border-white/10 bg-[#122A44]/45 p-6 " +
      "shadow-[0_0_0_1px_rgba(255,255,255,0.03)] " +
      "hover:border-[#D4A84F]/35 hover:shadow-[0_0_0_1px_rgba(212,168,79,0.20)] " +
      (className || "")
    }
  >
    {children}
  </motion.div>
);

const Glow = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute inset-0"
      animate={{ opacity: [0.55, 0.85, 0.55] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(212,168,79,0.10), transparent 45%)," +
          "radial-gradient(circle at 80% 30%, rgba(255,255,255,0.07), transparent 48%)," +
          "radial-gradient(circle at 50% 90%, rgba(212,168,79,0.06), transparent 55%)",
      }}
    />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_55%)]" />
  </div>
);

const GridLines = () => (
  <div aria-hidden className="pointer-events-none absolute inset-0">
    <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:42px_42px]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_70%)]" />
  </div>
);

const LogoBlock = () => (
  <div className="flex items-center gap-3">
    <img
      src={logoKDS}
      alt="Kelensi Digital Solutions"
      className="h-10 w-10 object-contain"
    />
    <div className="leading-tight">
      <div className="text-sm font-semibold text-white">{BRAND.name}</div>
      <div className="text-xs text-white/60">AI Automation • Web • Systems</div>
    </div>
  </div>
);

function Nav({ lang, setLang, t }) {
  const [open, setOpen] = React.useState(false);

  const links = useMemo(
    () => [
      { id: "services", label: t.nav.services },
      { id: "solutions", label: t.nav.solutions },
      { id: "proof", label: t.nav.preuves },
      { id: "process", label: t.nav.process },
      { id: "pricing", label: t.nav.tarifs },
      { id: "contact", label: t.nav.contact },
    ],
    [t]
  );

  const go = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0B1A2B]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
        <a href="#" className="flex min-w-0 items-center">
          <LogoBlock />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.id} href={"#" + l.id} className="text-sm text-white/70 hover:text-white">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/10"
            aria-label="Toggle language"
          >
            {lang === "fr" ? "EN" : "FR"}
          </button>

          <a
            href="#contact"
            className="hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15 sm:inline-flex"
          >
            {lang === "fr" ? BRAND.primaryCta_fr : BRAND.primaryCta_en}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10 md:hidden"
            aria-label="Open menu"
          >
            Menu
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
              <div className="rounded-3xl border border-white/10 bg-[#122A44]/70 backdrop-blur-xl p-3">
                <div className="grid gap-1">
                  {links.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => go(l.id)}
                      className="w-full rounded-2xl px-4 py-3 text-left text-sm text-white/85 hover:bg-white/10"
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                <div className="mt-2">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 bg-[#D4A84F] px-4 py-3 text-sm font-semibold text-[#0B1A2B] hover:bg-[#E0B86A]"
                  >
                    {lang === "fr" ? BRAND.primaryCta_fr : BRAND.primaryCta_en}
                  </a>
                </div>

                <div className="mt-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}



function Hero({ lang, t }) {
  const mag = useMagnetic();
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 40]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.92]);

  return (
    <header className="relative">
      <Glow />
      <GridLines />

      <motion.div
        className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pt-20"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
            >
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span>{t.hero.kicker}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl"
            >
              {t.hero.h1a} <span className="text-white/80">{t.hero.h1b}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-5 max-w-xl text-sm leading-6 text-white/70 sm:text-base"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="#contact"
                onMouseMove={mag.onMove}
                onMouseLeave={mag.onLeave}
                style={{ x: mag.sx, y: mag.sy }}
                className="rounded-full border border-white/10 bg-[#D4A84F] px-5 py-3 text-sm font-semibold text-[#0B1A2B] hover:bg-[#E0B86A]"
              >
                {lang === "fr" ? BRAND.primaryCta_fr : BRAND.primaryCta_en}
              </motion.a>
              <a
                href="#services"
                className="rounded-full border border-[#D4A84F]/35 bg-[#122A44]/35 px-5 py-3 text-sm font-semibold text-white hover:bg-[#122A44]/55"
              >
                {lang === "fr" ? BRAND.secondaryCta_fr : BRAND.secondaryCta_en}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {t.hero.trust.map((x) => (
                <span key={x} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {x}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ y: [0, -10, 0], rotate: [0, -0.6, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6">
              <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.25),transparent_55%)]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white/90">{lang === "fr" ? "Aperçu" : "Preview"}</div>
                  <div className="flex gap-2">
                    <span className="h-2 w-2 rounded-full bg-white/30" />
                    <span className="h-2 w-2 rounded-full bg-white/30" />
                    <span className="h-2 w-2 rounded-full bg-white/30" />
                  </div>
                </div>

                <div className="mt-5 grid gap-4">
                  <Card className="p-5">
                    <div className="text-xs text-white/60">{lang === "fr" ? "Automatisation" : "Automation"}</div>
                    <div className="mt-2 text-lg font-semibold text-white">
                      {lang === "fr" ? "Réduire les tâches manuelles" : "Reduce manual tasks"}
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      {lang === "fr"
                        ? "Workflows, alertes, logs, et indicateurs de performance."
                        : "Workflows, alerts, logs, and performance metrics."}
                    </div>
                  </Card>

                  <Card className="p-5">
                    <div className="text-xs text-white/60">{lang === "fr" ? "Web premium" : "Premium web"}</div>
                    <div className="mt-2 text-lg font-semibold text-white">
                      {lang === "fr" ? "Convertir plus de visiteurs" : "Convert more visitors"}
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      {lang === "fr"
                        ? "Structure claire, preuve sociale, CTA, analytics."
                        : "Clear structure, social proof, CTA, analytics."}
                    </div>
                  </Card>

                  <Card className="p-5">
                    <div className="text-xs text-white/60">{lang === "fr" ? "Systèmes" : "Systems"}</div>
                    <div className="mt-2 text-lg font-semibold text-white">
                      {lang === "fr" ? "Suivre et décider" : "Track and decide"}
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      {lang === "fr"
                        ? "Dashboards, reporting, automatisation de routines."
                        : "Dashboards, reporting, automated routines."}
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            <motion.div
              aria-hidden
              className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.metrics.map((m, i) => (
            <motion.div
              key={m.k}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-3xl border border-white/10 bg-[#122A44]/45 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
            >
              <div className="text-2xl font-semibold text-white">
                {m.k === "+30%" ? <CountUp to={30} suffix="%" /> : m.k}
              </div>
              <div className="mt-1 text-sm font-medium text-white/85">{m.v}</div>
              <div className="mt-1 text-xs text-white/60">{m.s}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </header>
  );
}

function Services({ t }) {
  return (
    <Section id="services" eyebrow={t.servicesTitle} title={t.servicesTitle} subtitle={t.servicesSub}>
      <div className="grid gap-4 md:grid-cols-2">
        {t.services.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          >
            <Card className="h-full">
              <div className="text-lg font-semibold text-white">{s.t}</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{s.d}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Solutions({ t }) {
  return (
    <Section id="solutions" eyebrow={t.solutionsTitle} title={t.solutionsTitle} subtitle={t.solutionsSub}>
      <div className="grid gap-4 md:grid-cols-3">
        {t.solutions.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          >
            <Card className="h-full">
              <div className="text-lg font-semibold text-white">{s.t}</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{s.d}</div>
              <div className="mt-5">
                <a href="#contact" className="text-sm font-semibold text-white hover:text-white/80">
                  {t.contactTitle} →
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Proof({ t }) {
  return (
    <Section id="proof" eyebrow={t.preuvesTitle} title={t.preuvesTitle} subtitle={t.preuvesSub}>
      <div className="grid gap-4 md:grid-cols-3">
        {t.preuves.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          >
            <Card className="h-full">
              <div className="text-lg font-semibold text-white">{p.t}</div>
              <div className="mt-2 text-sm leading-6 text-white/70">{p.d}</div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {t.testimonials.map((x, i) => (
          <motion.div
            key={x.q}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          >
            <Card className="h-full">
              <div className="text-sm leading-6 text-white/80">“{x.q}”</div>
              <div className="mt-4 text-xs text-white/60">{x.a}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Process({ t }) {
  return (
    <Section id="process" eyebrow={t.processTitle} title={t.processTitle} subtitle={t.processSub}>
      <div className="grid gap-4 md:grid-cols-5">
        {t.steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          >
            <Card className="h-full p-5">
              <div className="text-xs text-white/60">{s.n}</div>
              <div className="mt-2 text-sm font-semibold text-white">{s.t}</div>
              <div className="mt-2 text-xs leading-5 text-white/70">{s.d}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Pricing({ t }) {
  return (
    <Section id="pricing" eyebrow={t.pricingTitle} title={t.pricingTitle} subtitle={t.pricingSub}>
      <div className="grid gap-4 md:grid-cols-3">
        {t.pricing.map((p, i) => (
          <motion.div
            key={p.t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
          >
            <Card className={cx("h-full", i === 1 ? "bg-white/8" : "")}>
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-lg font-semibold text-white">{p.t}</div>
                <div className="text-sm font-semibold text-white/80">{p.p}</div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {p.b.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-[#D4A84F] px-5 py-3 text-sm font-semibold text-[#0B1A2B] hover:bg-[#E0B86A]"
                >
                  {p.cta}
                </a>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Contact({ lang, t }) {
  const [status, setStatus] = useState("idle");

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 2500);
  };

  return (
    <Section id="contact" eyebrow={t.contactTitle} title={t.contactTitle} subtitle={t.contactSub}>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <div className="text-sm text-white/70">
            Email:{" "}
            <a className="text-white hover:text-white/80" href={"mailto:" + BRAND.email}>
              {BRAND.email}
            </a>
          </div>

          <div className="mt-2 text-sm text-white/70">
            {lang === "fr" ? "Téléphone" : "Phone"}:{" "}
            <a className="text-white hover:text-white/80" href={"tel:" + BRAND.phone.replace(/[^0-9+]/g, "")}>
              {BRAND.phone}
            </a>
          </div>

          <div className="mt-2 text-sm text-white/70">
            {lang === "fr" ? "Site" : "Website"}:{" "}
            <a className="text-white hover:text-white/80" href={BRAND.website} target="_blank" rel="noreferrer">
              {BRAND.website}
            </a>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-sm font-semibold text-white">{lang === "fr" ? "Promesse" : "Promise"}</div>
            <div className="mt-2 text-sm leading-6 text-white/70">{lang === "fr" ? BRAND.tagline_fr : BRAND.tagline_en}</div>
          </div>
        </Card>

        <Card>
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-white/60">{t.form.name}</label>
              <input
                required
                className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder={lang === "fr" ? "Ton nom" : "Your name"}
              />
            </div>

            <div>
              <label className="text-xs text-white/60">{t.form.email}</label>
              <input
                required
                type="email"
                className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder={lang === "fr" ? "Ton email" : "Your email"}
              />
            </div>

            <div>
              <label className="text-xs text-white/60">{t.form.company}</label>
              <input
                className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder={lang === "fr" ? "Entreprise (optionnel)" : "Company (optional)"}
              />
            </div>

            <div>
              <label className="text-xs text-white/60">{t.form.goal}</label>
              <textarea
                required
                rows={4}
                className="mt-1 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
                placeholder={
                  lang === "fr"
                    ? "Exemple: automatiser les demandes clients, créer un site premium, déployer un agent IA..."
                    : "Example: automate client requests, build a premium site, deploy an AI agent..."
                }
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-[#D4A84F] px-5 py-3 text-sm font-semibold text-[#0B1A2B] hover:bg-[#E0B86A]"
              >
                {t.form.send}
              </button>
            </div>

            <AnimatePresence>
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                >
                  {lang === "fr"
                    ? "Message prêt. Relie le formulaire à ton email ou CRM."
                    : "Message ready. Connect the form to your email or CRM."}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </form>
        </Card>
      </div>
    </Section>
  );
}

function Footer({ t }) {
  return (
    <footer className="border-t border-white/10 bg-[#0B1A2B]/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-10 text-sm text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>{t.footer}</div>
        <div className="flex flex-wrap gap-4">
          <a className="hover:text-white/80" href="#services">Services</a>
          <a className="hover:text-white/80" href="#contact">Contact</a>
          <a className="hover:text-white/80" href={BRAND.website} target="_blank" rel="noreferrer">Site</a>
        </div>
      </div>
    </footer>
  );
}

function SmartAssistant({ lang = "fr" }) {
  const UI = {
    fr: {
      title: "Assistant IA",
      hint: "Pose une question sur nos services. Mode démo pour le moment.",
      input: "Écris ton message…",
      send: "Envoyer",
      open: "Assistant",
      close: "Fermer",
      demoReply: "Mode démo. Décris ton besoin, automatisation, site web, agents IA, et je te propose un plan simple.",
    },
    en: {
      title: "AI Assistant",
      hint: "Ask about our services. Demo mode for now.",
      input: "Type your message…",
      send: "Send",
      open: "Assistant",
      close: "Close",
      demoReply: "Demo mode. Share your goal, automation, website, AI agents, and I will propose a simple plan.",
    },
  }[lang];

  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [msgs, setMsgs] = React.useState([{ role: "assistant", content: UI.demoReply }]);

  const send = async () => {
    const value = text.trim();
    if (!value) return;
    setMsgs((m) => [...m, { role: "user", content: value }]);
    setText("");

    setTimeout(() => {
      setMsgs((m) => [...m, { role: "assistant", content: UI.demoReply }]);
    }, 450);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-white/10 bg-[#D4A84F] px-4 py-3 text-sm font-semibold text-[#0B1A2B] hover:bg-[#E0B86A]"
        >
          {UI.open}
        </button>
      ) : (
        <div className="w-[340px] overflow-hidden rounded-3xl border border-white/10 bg-[#122A44]/70 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-white">{UI.title}</div>
              <div className="text-xs text-white/60">{UI.hint}</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              {UI.close}
            </button>
          </div>

          <div className="max-h-[320px] space-y-2 overflow-auto px-4 py-3">
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto w-fit max-w-[85%] rounded-2xl bg-white/10 px-3 py-2 text-sm text-white"
                    : "mr-auto w-fit max-w-[85%] rounded-2xl bg-[#0B1A2B]/60 px-3 py-2 text-sm text-white/90"
                }
              >
                {m.content}
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-3">
            <div className="flex gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => (e.key === "Enter" ? send() : null)}
                placeholder={UI.input}
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-3 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <button
                onClick={send}
                className="rounded-2xl border border-white/10 bg-[#D4A84F] px-4 text-sm font-semibold text-[#0B1A2B] hover:bg-[#E0B86A]"
              >
                {UI.send}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    document.body.className = "bg-[#0B1A2B]";
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1A2B] text-white">
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero lang={lang} t={t} />
      <Services t={t} />
      <Solutions t={t} />
      <Proof t={t} />
      <Process t={t} />
      <Pricing t={t} />
      <Contact lang={lang} t={t} />
      <Footer t={t} />
      <SmartAssistant lang={lang} />
    </div>
  );
}
