import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, AnimatePresence } from "motion/react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Circus of Love — A Letter to the Bizarre Enthusiasts" },
      {
        name: "description",
        content:
          "A cinematic literary editorial. An epistolary essay on love, pride, and the courage of ordinary hearts.",
      },
      { property: "og:title", content: "Circus of Love" },
      {
        property: "og:description",
        content: "An immersive editorial letter on love, pride, and the quiet revolution of the heart.",
      },
      { property: "og:type", content: "article" },
    ],
  }),
  component: CircusOfLove,
});

/* ------------------------------------------------------------------ */
/*  Cinematic primitives                                              */
/* ------------------------------------------------------------------ */

const ease = [0.22, 1, 0.36, 1] as const;

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] bg-[color:var(--gold)]/70"
    />
  );
}

function ActMarker({ index, title }: { index: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 1.2, ease }}
      className="mb-12 flex items-center gap-6 text-[color:var(--bronze)]"
    >
      <span className="font-[family-name:var(--font-display)] italic text-sm tracking-[0.4em] uppercase">
        {index}
      </span>
      <span className="h-px w-16 bg-[color:var(--bronze)]/40" />
      <span className="font-[family-name:var(--font-letter)] italic text-base tracking-wider">
        {title}
      </span>
    </motion.div>
  );
}

function FadeUp({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word stagger reveal — slow, cinematic. */
function RevealLine({
  text,
  className = "",
  stagger = 0.045,
  delay = 0,
}: {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-baseline">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.9, ease, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Floating dust motes — quiet, atmospheric. */
function Particles({ count = 28 }: { count?: number }) {
  const reduce = useReducedMotion();
  const [seeds] = useState(() =>
    Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 8 + Math.random() * 18,
      s: 1 + Math.random() * 2.5,
      o: 0.15 + Math.random() * 0.35,
    })),
  );
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[color:var(--gold)]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            opacity: p.o,
            filter: "blur(0.4px)",
          }}
          animate={{ y: [0, -30, 0], x: [0, 12, 0], opacity: [p.o, p.o * 1.6, p.o] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

function CircusOfLove() {
  return (
    <main className="relative bg-[color:var(--parchment)] text-[color:var(--ink)] paper-grain">
      <ScrollProgress />
      <Masthead />
      <ActI_Letter />
      <ActII_Entrance />
      <ActIII_Performance />
      <ActIV_Reflection />
      <ActV_Revelation />
      <ActVI_FinalLetter />
      <Colophon />
    </main>
  );
}

/* ---------- Masthead / Hero ---------- */

function Masthead() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] min-h-[680px] w-full items-center justify-center overflow-hidden"
    >
      {/* Theatrical backdrop */}
      <motion.div
        aria-hidden
        style={{ scale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,var(--gold)_18%,transparent)_0%,_transparent_55%),_radial-gradient(ellipse_at_bottom,_color-mix(in_oklab,var(--burgundy)_28%,transparent)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[color:var(--parchment)]/40 mix-blend-multiply" />
        <div className="absolute inset-0 vignette" />
      </motion.div>

      <Particles count={36} />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          animate={{ opacity: 1, letterSpacing: "0.55em" }}
          transition={{ duration: 2.4, ease }}
          className="mb-10 font-[family-name:var(--font-letter)] text-[11px] uppercase text-[color:var(--bronze)]"
        >
          An Editorial Letter · MMXXVI
        </motion.p>

        <h1 className="font-[family-name:var(--font-display)] font-normal leading-[0.92] tracking-[-0.01em] text-[clamp(3.2rem,11vw,9.5rem)]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.4, ease, delay: 0.2 }}
              className="inline-block italic text-[color:var(--ink)]"
            >
              Circus
            </motion.span>
          </span>
          <span className="block overflow-hidden -mt-2 md:-mt-4">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.4, ease, delay: 0.45 }}
              className="inline-block font-[family-name:var(--font-letter)] italic font-light text-[color:var(--burgundy)]"
            >
              of&nbsp;
            </motion.span>
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.4, ease, delay: 0.6 }}
              className="inline-block"
            >
              Love
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.6, ease, delay: 1.1 }}
          style={{ transformOrigin: "50% 50%" }}
          className="mx-auto mt-12 h-px w-40 bg-[color:var(--bronze)]/60"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 1.4 }}
          className="mx-auto mt-10 max-w-xl font-[family-name:var(--font-letter)] italic text-lg md:text-xl text-[color:var(--ink-soft)]"
        >
          A letter, found backstage after the lights had gone out.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.2 }}
          className="mt-20 flex flex-col items-center gap-3 text-[color:var(--bronze)]"
        >
          <span className="font-[family-name:var(--font-letter)] text-xs uppercase tracking-[0.5em]">
            Enter
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-px bg-[color:var(--bronze)]/60"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- Reusable layout for an act ---------- */

function Act({
  id,
  index,
  title,
  children,
  tone = "light",
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
  tone?: "light" | "dim" | "dark";
}) {
  const bg =
    tone === "dark"
      ? "bg-[color:var(--ink)] text-[color:var(--parchment)]"
      : tone === "dim"
        ? "bg-[color:var(--ivory)]"
        : "bg-[color:var(--parchment)]";
  return (
    <section id={id} className={`relative ${bg} px-6 py-24 sm:py-32 md:py-40`}>
      <div className="mx-auto max-w-[68ch] space-y-7 md:space-y-8">
        <ActMarker index={index} title={title} />
        {children}
      </div>
    </section>
  );
}

/* ---------- Act I — The Letter ---------- */

function ActI_Letter() {
  return (
    <Act id="act-i" index="Act I" title="The Letter">
      <FadeUp>
        <p className="mb-8 font-[family-name:var(--font-letter)] italic text-2xl md:text-3xl text-[color:var(--burgundy)]">
          Dear my bizarre enthusiasts,
        </p>
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="drop-cap font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.9] text-[color:var(--ink)]">
          It took me a while to write this. I sat before a plain white sheet of paper, a pen
          resting quietly between my fingers. I am now more confident than I ever did. I am
          motivated. The words are piling up in my head and yet this paper remains clean.
        </p>
      </FadeUp>

      <FadeUp delay={0.15}>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.9]">
          I’ve never felt this certain of what I wanted to say.
        </p>
      </FadeUp>

      <FadeUp delay={0.2}>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.9]">
          You know what they usually say when your heart has already written every sentence. It
          already knew the truth of every ache and yet your hands remained still.{" "}
          <em className="font-[family-name:var(--font-letter)] text-[color:var(--burgundy)]">
            It is shaking{" "}
            <span className="underline decoration-[color:var(--gold)] decoration-1 underline-offset-4">
              not because it’s afraid.
            </span>
          </em>
        </p>
      </FadeUp>

      <FadeUp delay={0.25}>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.9]">
          It is simply <em className="font-[family-name:var(--font-letter)]">waiting</em> as my
          lips are trembling.
        </p>
      </FadeUp>

      <FadeUp delay={0.3}>
        <p className="mt-12 font-[family-name:var(--font-letter)] italic text-2xl md:text-3xl text-[color:var(--ink-soft)] leading-snug">
          How do you even begin writing about something the world has spent decades trying to
          erase?
        </p>
      </FadeUp>

      <FadeUp delay={0.35}>
        <p className="mt-10 font-[family-name:var(--font-serif)] text-xl leading-relaxed">
          Maybe like this.
        </p>
        <p className="mt-3 font-[family-name:var(--font-letter)] italic text-2xl text-[color:var(--burgundy)]">
          To you. <span className="not-italic font-[family-name:var(--font-letter)] italic">For you.</span>
        </p>
      </FadeUp>
    </Act>
  );
}

/* ---------- Act II — Entering the Circus ---------- */

function ActII_Entrance() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const leftX = useTransform(scrollYProgress, [0, 0.5], ["0%", "-55%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], ["0%", "55%"]);
  const glow = useTransform(scrollYProgress, [0.1, 0.55], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden bg-[color:var(--ink)] text-[color:var(--parchment)]"
    >
      {/* Spotlight */}
      <motion.div
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,var(--gold)_22%,transparent)_0%,_transparent_55%)]"
      />
      <Particles count={24} />

      <div className="sticky top-0 flex h-[100svh] items-center justify-center px-6">
        <div className="relative w-full max-w-6xl text-center">
          {/* Curtains */}
          <motion.div
            aria-hidden
            style={{ x: leftX }}
            className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,_color-mix(in_oklab,var(--burgundy)_92%,black)_0%,_color-mix(in_oklab,var(--burgundy)_70%,black)_60%,_color-mix(in_oklab,var(--burgundy)_45%,black)_100%)]"
          />
          <motion.div
            aria-hidden
            style={{ x: rightX }}
            className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(270deg,_color-mix(in_oklab,var(--burgundy)_92%,black)_0%,_color-mix(in_oklab,var(--burgundy)_70%,black)_60%,_color-mix(in_oklab,var(--burgundy)_45%,black)_100%)]"
          />

          <div className="relative z-10">
            <p className="mb-6 font-[family-name:var(--font-letter)] italic tracking-[0.4em] text-sm text-[color:var(--gold)] uppercase">
              The Ringmaster Announces
            </p>
            <h2 className="font-[family-name:var(--font-display)] italic leading-[0.95] text-[clamp(2.5rem,9vw,7rem)]">
              <RevealLine text="Let me welcome you" />
              <br />
              <span className="text-[color:var(--gold)]">
                <RevealLine text="to the circus." delay={0.4} />
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.2 }}
              className="mx-auto mt-10 max-w-xl font-[family-name:var(--font-letter)] italic text-lg text-[color:var(--parchment)]/70"
            >
              “This is our circus.”
            </motion.p>
          </div>
        </div>
      </div>

      {/* Post-reveal narrative */}
      <div className="relative mx-auto max-w-[64ch] px-6 pb-40 pt-10 md:pt-24">
        <FadeUp>
          <p className="font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95] text-[color:var(--parchment)]/90">
            A grand arena of applause. Big seats surrounding a stage of rainbows with golden
            lights dancing across the air. The seats are crowded, every face turned toward the
            center stage, eager to witness this evening’s showcase.
          </p>
        </FadeUp>

        <div className="mt-12 space-y-4 font-[family-name:var(--font-letter)] italic text-xl md:text-2xl text-[color:var(--parchment)]/85">
          {[
            "The ones who speak and dress differently.",
            "Those individuals whose lives don’t fit into the limited spaces that the world has set up for them.",
            "The soul that defies the labels that people are determined to assign.",
            "The woman who loves another woman.",
            "The man whose heart belongs to another man.",
          ].map((line, i) => (
            <FadeUp key={i} delay={i * 0.08} y={18}>
              <p className="border-l border-[color:var(--gold)]/40 pl-6">{line}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Act III — The Performance ---------- */

function ActIII_Performance() {
  return (
    <Act id="act-iii" index="Act III" title="The Performance" tone="dim">
      <FadeUp>
        <p className="font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
          But the audience continues to laugh. Some whispers into the air and some stares.
        </p>
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
          It’s funny how easily people misinterpret differences for amusement and how easily
          uniqueness turns into something to mock rather than embrace.
        </p>
      </FadeUp>

      <FadeUp delay={0.15}>
        <h3 className="mt-20 font-[family-name:var(--font-display)] italic text-4xl md:text-6xl leading-tight text-[color:var(--ink)]">
          And they call them{" "}
          <span className="text-[color:var(--burgundy)] underline decoration-[color:var(--gold)] decoration-1 underline-offset-[10px]">
            performers.
          </span>
        </h3>
      </FadeUp>

      <FadeUp delay={0.2}>
        <p className="mt-12 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
          But between the praise and laughter, something more bizarre took place. Because this
          time, the performers never lower their heads. Instead,{" "}
          <em className="font-[family-name:var(--font-letter)] text-[color:var(--burgundy)] not-italic">
            <em>they smile</em>
          </em>
          . Not because the audience has accepted them.{" "}
          <strong className="font-[family-name:var(--font-letter)] italic font-medium text-[color:var(--burgundy)]">
            But because they have finally accepted themselves.
          </strong>
        </p>
      </FadeUp>

      <FadeUp delay={0.25}>
        <p className="mt-10 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
          And suddenly, the spotlight begins to change. It no longer exposes the performances,
          but{" "}
          <span className="underline decoration-[color:var(--gold)] decoration-1 underline-offset-4">
            reveals everyone watching.
          </span>
        </p>
      </FadeUp>

      <FadeUp delay={0.3}>
        <blockquote className="mt-16 border-l-2 border-[color:var(--burgundy)]/60 pl-8 font-[family-name:var(--font-letter)] italic text-2xl md:text-3xl leading-snug text-[color:var(--ink-soft)]">
          And for once, as I stare a bit too deep, the thought crosses my mind. That maybe,
          just maybe, the circus was never built for those standing on the stage.
        </blockquote>
      </FadeUp>

      <FadeUp delay={0.35}>
        <p className="mt-10 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
          That perhaps the purpose of this show is not the performance but rather reveal the
          hearts of the people behind the laughter.
        </p>
      </FadeUp>

      <FadeUp delay={0.4}>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
          Because don’t you see? We spent long decades putting labels on it, built rules to
          control, and contain love in a jar of judgment. But no definition has ever been enough
          to describe it. No name has ever been able to hold all that it is.
        </p>
      </FadeUp>

      <FadeUp delay={0.45}>
        <p className="mt-8 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
          There is no other way to name it. But the question lingers, since when has humanity
          forgotten where love truly comes from?
        </p>
      </FadeUp>
    </Act>
  );
}

/* ---------- Act IV — The Reflection ---------- */

function ActIV_Reflection() {
  return (
    <section className="relative bg-[color:var(--parchment)] px-6 py-32 md:py-48">
      <div className="mx-auto max-w-[70ch]">
        <ActMarker index="Act IV" title="The Reflection" />

        <FadeUp>
          <h3 className="font-[family-name:var(--font-display)] italic text-[clamp(2.4rem,6vw,4.6rem)] leading-[1.05] text-[color:var(--burgundy)]">
            <RevealLine text="Love was never meant" stagger={0.06} />
            <br />
            <RevealLine text="to be measured." stagger={0.06} delay={0.3} />
          </h3>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-14 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2]">
            It carries no ruler. It recognizes no borders. It asks no permission before choosing
            where to bloom. Society has built enough walls to cage the love that grows — the love
            that blossoms. To anyone. To you.{" "}
            <em className="font-[family-name:var(--font-letter)] text-[color:var(--burgundy)]">
              For you.
            </em>
          </p>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="mt-10 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2]">
            But can the heart truly be swept away so easily?
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-8 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2]">
            Maybe it can. After all, the heart is where love lives, and sometimes love is too big
            for the heart to hold without shaking it. There is no promise in this world that
            cannot be broken, and no person who is guaranteed to stay forever. Yet love remains
            what it has always been.
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <p className="mt-12 font-[family-name:var(--font-letter)] italic text-2xl md:text-3xl leading-snug text-[color:var(--ink-soft)]">
            Because love heals even more deeply than it wounds.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="mt-10 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2]">
            It breathes life into souls that believed they had already disappeared. It offers
            hope where darkness once settled. It teaches us that surviving is not the same as
            living, and that living begins the moment we stop apologizing for who we are.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------- Act V — The Revelation ---------- */

function ActV_Revelation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-[color:var(--ink)] text-[color:var(--parchment)]">
      <motion.div
        aria-hidden
        style={{ opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,_color-mix(in_oklab,var(--gold)_18%,transparent)_0%,_transparent_55%)]"
      />
      <Particles count={20} />

      <div className="relative mx-auto max-w-[70ch] px-6 py-32 md:py-48">
        <ActMarker index="Act V" title="The Revelation" />

        <FadeUp>
          <h3 className="font-[family-name:var(--font-display)] italic text-[clamp(2.2rem,5.5vw,4.2rem)] leading-[1.1] text-[color:var(--gold)]">
            <RevealLine
              text="So let this world be filled with a love that is never measured —"
              stagger={0.04}
            />
          </h3>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-10 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2] text-[color:var(--parchment)]/85">
            not by gender, by color, by origin, or by the names society created to separate us.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-14 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2] text-[color:var(--parchment)]/90">
            Because perhaps the circus is not about the performers.{" "}
            <em className="font-[family-name:var(--font-letter)] text-[color:var(--gold)]">
              It is about how well we carry ourselves.
            </em>
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <p className="mt-10 font-[family-name:var(--font-letter)] italic text-2xl md:text-3xl leading-snug text-[color:var(--parchment)]">
            Not acrobatics. Not illusions.
          </p>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="mt-6 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2] text-[color:var(--parchment)]/90">
            But the extraordinary courage of ordinary people choosing authenticity over
            acceptance.
          </p>
        </FadeUp>

        <FadeUp delay={0.45}>
          <p className="mt-10 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2] text-[color:var(--parchment)]/85">
            And my dear, perhaps that is the greatest performance this circus has ever
            witnessed. The person who spent years hiding finally stepped into the light and
            realized they were never the problem, and watched the trembling hand reaching for
            another without fear.
          </p>
        </FadeUp>

        <FadeUp delay={0.5}>
          <p className="mt-10 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2] text-[color:var(--parchment)]/85">
            Because pride is not a prize, pride is not a thing we could buy. Pride was never
            about asking the world to celebrate difference. It was about refusing to be ashamed
            of it.
          </p>
        </FadeUp>

        <FadeUp delay={0.55}>
          <p className="mt-14 font-[family-name:var(--font-letter)] italic text-3xl md:text-4xl leading-snug text-[color:var(--gold)]">
            It is the quiet child finally finding their voice.
          </p>
        </FadeUp>

        <FadeUp delay={0.6}>
          <p className="mt-12 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[2] text-[color:var(--parchment)]/85">
            And as the audience grows silent and laughter disappears. They begin to see what
            had always been standing before them. There were never any performers,{" "}
            <span className="underline decoration-[color:var(--gold)] decoration-1 underline-offset-4">
              only people brave enough to love.
            </span>
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------- Act VI — The Final Letter ---------- */

function ActVI_FinalLetter() {
  return (
    <section className="relative bg-[color:var(--ivory)] px-6 py-32 md:py-48">
      <div className="mx-auto max-w-[64ch]">
        <ActMarker index="Act VI" title="The Final Letter" />

        <FadeUp>
          <p className="font-[family-name:var(--font-letter)] italic text-2xl md:text-3xl text-[color:var(--burgundy)]">
            My dear,
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-6 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
            the laughter goes silent like nighttime. The curtains slowly close as they step back
            with smiles.
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <p className="mt-8 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
            Yet the applause echoes through the tent — not for a spectacle, but for every soul
            that dared to exist exactly as they wanted to be. And maybe, just maybe, when
            everyone leaves this circus tonight, they will finally understand that the greatest
            act was never performed on the stage.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="mt-10 font-[family-name:var(--font-letter)] italic text-2xl md:text-3xl leading-snug text-[color:var(--ink-soft)]">
            It was performed by every heart that chose love over fear.
          </p>
          <p className="mt-4 font-[family-name:var(--font-letter)] italic text-xl md:text-2xl text-[color:var(--burgundy)]">
            Because there is no shame in loving. There never was.
          </p>
        </FadeUp>

        <FadeUp delay={0.25}>
          <p className="mt-12 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
            But darling, as I close this letter, like how I was able to hold this pen as tight, I
            hope soon deep in your eyes I’d get to hold your heart.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="mt-10 font-[family-name:var(--font-serif)] text-xl md:text-[1.35rem] leading-[1.95]">
            <em className="font-[family-name:var(--font-letter)]">To my dearest bizarre enthusiast</em>,
            pride is never meant to be caged. After all, one thing is for sure. For all the
            things we spent decades fighting and fearing, it is love that we shouldn’t be hiding
            from. It is love that we shouldn’t be afraid to show.
          </p>
        </FadeUp>

        <FadeUp delay={0.35}>
          <div className="mt-16 space-y-4 font-[family-name:var(--font-display)] italic text-3xl md:text-5xl leading-tight text-[color:var(--ink)]">
            <p>And remember,</p>
            <p className="text-[color:var(--burgundy)]">pride is a fight.</p>
            <p>Pride is where the heart rests.</p>
            <p className="text-[color:var(--burgundy)]">Pride is freedom.</p>
          </div>
        </FadeUp>

        <FadeUp delay={0.5}>
          <p className="mt-14 font-[family-name:var(--font-letter)] italic text-2xl md:text-3xl text-[color:var(--ink-soft)]">
            And love?
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[color:var(--burgundy)]">
            That’s what keeps the pride alive.
          </p>
        </FadeUp>

        <FadeUp delay={0.7}>
          <div className="mt-24 flex flex-col items-start gap-3 text-[color:var(--bronze)]">
            <span className="h-px w-24 bg-[color:var(--bronze)]/50" />
            <span className="font-[family-name:var(--font-letter)] italic text-lg">
              Yours, behind the curtain —
            </span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ---------- Colophon ---------- */

function Colophon() {
  return (
    <footer className="relative bg-[color:var(--ink)] px-6 py-20 text-[color:var(--parchment)]/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <p className="font-[family-name:var(--font-display)] italic text-2xl text-[color:var(--gold)]">
          Circus of Love
        </p>
        <p className="font-[family-name:var(--font-letter)] italic text-sm tracking-[0.35em] uppercase">
          An Editorial Letter · Composed in Six Acts
        </p>
        <p className="max-w-md font-[family-name:var(--font-serif)] text-sm leading-relaxed text-[color:var(--parchment)]/55">
          Set in Bodoni Moda, EB Garamond, and Cormorant Garamond. Printed in parchment, lit by
          faded gold.
        </p>
      </div>
    </footer>
  );
}

