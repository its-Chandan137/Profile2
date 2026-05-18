"use client";

import dynamic from "next/dynamic";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Blocks,
  CheckCircle2,
  Download,
  FolderGit2,
  GitBranch,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Menu,
  PanelsTopLeft,
  Phone,
  Radio,
  Wrench,
  X,
} from "lucide-react";
import { motion, useScroll } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => (
    <div className="h-full min-h-[320px] w-full animate-pulse rounded-[2rem] bg-white/5" />
  ),
});

const SkillsScene = dynamic(() => import("@/components/skills-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-[2rem] bg-white/5" />,
});

const sectionIds = ["hero", "skills", "experience", "projects", "education", "contact"];

const navItems = [
  { label: "Intro", href: "#hero", id: "hero" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Education", href: "#education", id: "education" },
  { label: "Contact", href: "#contact", id: "contact" },
];

const skills = [
  {
    title: "Frontend",
    icon: PanelsTopLeft,
    items: ["JavaScript", "React", "HTML", "CSS", "SCSS", "Bootstrap", "Tailwind"],
  },
  {
    title: "Frameworks",
    icon: Blocks,
    items: ["Angular"],
  },
  {
    title: "State Management",
    icon: GitBranch,
    items: ["Redux", "NgRx"],
  },
  {
    title: "Real-Time",
    icon: Radio,
    items: ["Socket.io", "WebSocket"],
  },
  {
    title: "Tools & Others",
    icon: Wrench,
    items: ["Git", "Vite", "REST APIs", "Google APIs", "Razorpay"],
  },
];

const experience = [
  {
    company: "Vedhas Technology Solutions Pvt. Ltd",
    role: "Frontend Developer",
    period: "Dec 2023 - Present",
    highlights: [
      "Delivered full-scale frontend modules across 8+ production projects spanning React and Angular.",
      "Built and maintained complex UI architectures including dynamic multi-role forms, real-time chat, design systems, and dashboard interfaces.",
      "Worked extensively on Angular + NgRx for a large government-facing NOC management system in Dubai, handling store management, bug resolution, and API integration.",
      "Mentored a junior developer for ~2 months, assigning tasks and reviewing work.",
    ],
  },
];

const projects = [
  {
    title: "RTA e-NOC System (Dubai Government)",
    subtitle: "Dubai Infrastructure Clearance Platform",
    description:
      "Owned ~1 year of frontend on a Dubai govt internal app, engineering NgRx store management, API integration, and backend data syncing for NOC infrastructure applications. Single-handedly resolved all frontend bugs for 4+ months after team reduction, independently maintaining majority of the frontend.",
    tags: ["Angular", "NgRx", "REST APIs"],
  },
  {
    title: "Fretbox / Internbox",
    subtitle: "Hostel Management SaaS",
    description:
      "Engineered a full real-time chat system from scratch - Socket.io frontend + backend, file uploads, online/offline status, read receipts, and student-to-management flows. Identified and resolved numerous pre-existing bugs across the platform alongside active feature development.",
    tags: ["React", "Socket.io", "Redux", "SCSS"],
  },
  {
    title: "Thrivent / Rightwise Prep",
    subtitle: "US Ed-Tech Portal",
    description:
      "Architected a comprehensive design system covering colors, typography, forms, modals, dashboards, sidebars, and more; delivered all frontend pages including auth flows. Spearheaded frontend alongside a senior lead and onboarded a junior intern into the workflow.",
    tags: ["React", "Vite", "SCSS"],
  },
  {
    title: "Smart Health Assist",
    subtitle: "Healthcare Platform",
    description:
      "Developed almost all UI pages - appointment booking, medicine purchase, and real-time patient monitoring with partner/nurse data entry and per-patient report storage. Implemented tracking where patients are monitored via devices or manually by partners, nurses, or closed ones.",
    tags: ["React", "REST APIs"],
  },
  {
    title: "Amplify Infra",
    subtitle: "Construction Management App",
    description:
      "Delivered GPS-based attendance verification, travel allowance tracking, and floor-wise portion planning features using Google APIs. Architected complex multi-role dynamic forms across a heavily legacy codebase.",
    tags: ["React", "Redux", "Google APIs", "Bootstrap"],
  },
  {
    title: "Meal O'Clock",
    subtitle: "Tiffin Subscription Service",
    description:
      "Built end-to-end as one of two developers - meal plan selection, subscription management (monthly/3/6-month), pause/resume logic, and Razorpay payment integration. Complete flow from landing page to payment with zero frameworks used.",
    tags: ["Vanilla JS", "HTML", "CSS", "Razorpay"],
  },
  {
    title: "Vibhu",
    subtitle: "Internal Enterprise App",
    description:
      "First production React project - built the complete authentication system and OTP-based secure folder structure for sensitive documents. Established a scalable 3-layer folder architecture adopted by the whole team.",
    tags: ["React", "Redux", "SCSS", "Bootstrap"],
  },
];

const contactLinks = [
  {
    label: "Email",
    href: "mailto:itschandan137@gmail.com",
    icon: Mail,
    value: "itschandan137@gmail.com",
  },
  {
    label: "Phone",
    href: "tel:+917327020994",
    icon: Phone,
    value: "+91 7327020994",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/chandanswarnakar",
    icon: Linkedin,
    value: "linkedin.com/in/chandanswarnakar",
  },
];

const education = {
  period: "2019 - 2021",
  degree: "B.Tech",
  school: "Biju Patnaik University of Technology",
  cgpa: "8.2",
  secondary: [
    {
      period: "2017",
      degree: "Class XII",
      school: "GHVM Jharsuguda, Odisha",
      cgpa: "6.4",
    },
    {
      period: "2015",
      degree: "Class XI",
      school: "Prabhujee EM School, Odisha",
      cgpa: "8.6",
    },
  ],
};

function SectionHeading({
  kicker,
  title,
  copy,
}: {
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{kicker}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
    </div>
  );
}

export function PortfolioShell() {
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 45%"],
  });

  useEffect(() => {
    if (sessionStorage.getItem("contact_sent") === "true") {
      setStatus("sent");
    }
  }, []);

  useEffect(() => {
    function updateActiveSection() {
      const marker = window.scrollY + window.innerHeight * 0.32;
      let currentSection = sectionIds[0];

      sectionIds.forEach((sectionId) => {
        const element = document.getElementById(sectionId);

        if (element && marker >= element.offsetTop) {
          currentSection = sectionId;
        }
      });

      setActiveSection(currentSection);
    }

    function updateFromHash() {
      const hashSection = window.location.hash.replace("#", "");

      if (sectionIds.includes(hashSection)) {
        setActiveSection(hashSection);
      }
    }

    updateActiveSection();
    updateFromHash();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
      window.removeEventListener("hashchange", updateFromHash);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(
        `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            message: form.message,
          }),
        },
      );

      if (res.ok) {
        setStatus("sent");
        sessionStorage.setItem("contact_sent", "true");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="relative overflow-hidden">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div className="section-shell pt-4">
          <div className="panel flex items-center justify-between rounded-full px-4 py-3 shadow-glow">
            <a
              href="#hero"
              className="font-heading text-sm uppercase tracking-[0.4em] text-white transition hover:text-ember"
            >
              C.SWARNAKAR
            </a>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/10 p-2 text-white md:hidden"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <nav
              className={`${
                menuOpen ? "flex" : "hidden"
              } absolute left-5 right-5 top-[calc(100%+0.75rem)] rounded-3xl border border-white/10 bg-[#111215]/95 p-4 md:static md:flex md:w-auto md:items-center md:gap-2 md:rounded-full md:border-0 md:bg-transparent md:p-0`}
            >
              <div className="flex w-full flex-col gap-2 md:flex-row md:items-center">
                {navItems.map((item) => {
                  const active = activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveSection(item.id);
                      }}
                      className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.3em] transition ${
                        active
                          ? "bg-ember text-charcoal"
                          : "text-slatecool hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </motion.header>

      <section id="hero" className="section-shell flex min-h-screen items-center pt-28 pb-16">
        <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="max-w-3xl"
          >
            <motion.p
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="section-kicker"
            >
              Hyderabad, India
            </motion.p>
            <motion.h1
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-5 max-w-4xl font-heading text-5xl uppercase leading-[0.88] tracking-[0.12em] text-white sm:text-6xl lg:text-7xl"
            >
              Chandan Swarnakar
            </motion.h1>
            <motion.div
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-5 flex flex-wrap items-center gap-3"
            >
              <span className="rounded-full border border-ember/30 bg-ember/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-amber-100">
                Frontend Developer
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slatecool">
                React · Angular · JavaScript · Socket.io
              </span>
            </motion.div>
            <motion.p
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-8 max-w-2xl text-base leading-8 text-slatecool sm:text-lg"
            >
              Building responsive, real-time web applications end-to-end. 2+ years across
              government, healthcare, ed-tech, and SaaS domains.
            </motion.p>
            <motion.div
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:-translate-y-0.5 hover:bg-amber-300"
              >
                View My Work
                <ArrowRight size={16} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:border-ember/60 hover:bg-white/5"
              >
                Download Resume
                <Download size={16} />
              </a>
            </motion.div>
            <motion.div
              variants={{
                hidden: { y: 18, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 grid gap-3 border-t border-white/10 pt-6 text-sm text-slatecool sm:grid-cols-2"
            >
              <a
                href="mailto:itschandan137@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 transition hover:border-ember/30 hover:bg-white/[0.06]"
              >
                <Mail size={16} className="text-ember" />
                itschandan137@gmail.com
              </a>
              <a
                href="tel:+917327020994"
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 transition hover:border-ember/30 hover:bg-white/[0.06]"
              >
                <Phone size={16} className="text-ember" />
                +91 7327020994
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3">
                <MapPin size={16} className="text-ember" />
                Hyderabad, India
              </div>
              <a
                href="https://linkedin.com/in/chandanswarnakar"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 transition hover:border-ember/30 hover:bg-white/[0.06]"
              >
                <Linkedin size={16} className="text-ember" />
                LinkedIn
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-ember/20 via-transparent to-slatecool/10 blur-3xl" />
            <div className="panel relative h-[360px] overflow-hidden rounded-[2rem] border-amber-500/10 shadow-glow sm:h-[440px] lg:h-[520px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08),transparent_55%)]" />
              <HeroScene />
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-[15%] rounded-full border border-ember/15" />
                <div className="absolute inset-[29%] rounded-full border border-white/10" />
                <div className="absolute inset-y-[22%] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ember/20 to-transparent" />
                <div className="absolute inset-x-[22%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-slatecool/20 to-transparent" />
                <div className="absolute left-7 top-7 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-slatecool">
                  React
                </div>
                <div className="absolute left-1/2 top-[18%] -translate-x-1/2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-slatecool">
                  ThreeJS
                </div>
                <div className="absolute right-8 top-1/4 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-amber-100/70">
                  Angular
                </div>
                <div className="absolute right-10 top-[56%] rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-slatecool">
                  Socket.io
                </div>
                <div className="absolute bottom-20 left-8 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-slatecool">
                  NgRx
                </div>
                <div className="absolute bottom-7 right-7 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[10px] uppercase tracking-[0.35em] text-slatecool">
                  Redux
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="relative py-24">
        <div className="absolute inset-x-0 top-16 h-[360px] opacity-70">
          <SkillsScene />
        </div>
        <div className="section-shell">
          <SectionHeading
            kicker="SKILLS"
            title="TOOLS I REACH FOR"
            copy="From component architecture and state management to real-time systems and design implementation, this stack is organized around building fast, reliable, and scalable frontend applications."
          />
          <div className="relative mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {skills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.article
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.42, delay: index * 0.04, ease: "easeOut" }}
                  className="panel group relative overflow-hidden rounded-[1.75rem] p-6 transition hover:-translate-y-1 hover:border-ember/30 hover:shadow-glow"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/70 to-transparent opacity-0 transition group-hover:opacity-100" />
                  <div className="flex items-center gap-4">
                    <div className="rounded-2xl border border-ember/25 bg-ember/10 p-3 text-ember">
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="font-heading text-xl uppercase tracking-[0.18em] text-white">
                        {skill.title}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.25em] text-slatecool">
                        Category {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs leading-5 text-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="py-24">
        <div className="section-shell">
          <SectionHeading
            kicker="EXPERIENCE"
            title="WORK TIMELINE"
            copy="Frontend development role at a product company, delivering production-grade web applications across multiple domains and tech stacks."
          />
          <div ref={timelineRef} className="relative mt-16 grid gap-10 lg:grid-cols-[140px_1fr]">
            <div className="hidden lg:block">
              <p className="sticky top-28 font-heading text-6xl uppercase tracking-[0.2em] text-white/10">
                Dev
              </p>
            </div>
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute bottom-0 left-[8px] top-0 w-px bg-white/10 sm:left-3" />
              <motion.div
                style={{ scaleY: scrollYProgress, originY: 0 }}
                className="absolute bottom-0 left-[8px] top-0 w-px bg-gradient-to-b from-ember via-amber-300 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.65)] sm:left-3"
              />
              <div className="space-y-10">
                {experience.map((item, index) => (
                  <motion.article
                    key={`${item.company}-${item.period}`}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                    className="panel relative rounded-[1.75rem] p-6 sm:p-8"
                  >
                    <div className="absolute left-[-27px] top-8 h-4 w-4 rounded-full border-2 border-charcoal bg-ember shadow-[0_0_18px_rgba(245,158,11,0.9)] sm:left-[-31px]" />
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <p className="section-kicker">{item.period}</p>
                        <h3 className="mt-3 font-heading text-2xl uppercase tracking-[0.14em] text-white">
                          {item.company}
                        </h3>
                        <p className="mt-2 text-sm uppercase tracking-[0.22em] text-ember">
                          {item.role}
                        </p>
                      </div>
                      <div className="grid max-w-2xl gap-3">
                        {item.highlights.map((highlight) => (
                          <div key={highlight} className="flex gap-3 text-sm leading-7 text-slatecool">
                            <span className="mt-3 h-1.5 w-1.5 flex-none rounded-full bg-ember" />
                            <p>{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-24">
        <div className="section-shell">
          <SectionHeading
            kicker="PROJECTS"
            title="SELECTED WORK"
            copy="Production projects across government, healthcare, ed-tech, construction, and SaaS domains."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.42, delay: index * 0.06, ease: "easeOut" }}
                className="group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-7 transition hover:-translate-y-1 hover:border-ember/35 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.18),transparent_36%)] opacity-0 transition group-hover:opacity-100" />
                <div className="relative">
                  <p className="section-kicker">Case Study {String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 font-heading text-3xl uppercase tracking-[0.14em] text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-ember">
                    {project.subtitle}
                  </p>
                  <p className="mt-6 max-w-2xl text-sm leading-7 text-slatecool">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-xs uppercase tracking-[0.16em] text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="education" className="py-24">
        <div className="section-shell">
          <SectionHeading
            kicker="EDUCATION"
            title="ACADEMIC FOUNDATION"
            copy="A strong computer science foundation supporting practical frontend development, system design, and modern web engineering."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            className="panel mt-14 flex flex-col gap-6 rounded-[1.9rem] p-7 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <p className="section-kicker">{education.period}</p>
              <h3 className="mt-3 font-heading text-3xl uppercase tracking-[0.15em] text-white">
                {education.degree}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.22em] text-ember">{education.school}</p>
              <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                {education.secondary.map((item) => (
                  <div
                    key={`${item.degree}-${item.period}`}
                    className="flex flex-col gap-1 text-sm text-slatecool sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-white/70">{item.period}</p>
                      <p className="mt-1 uppercase tracking-[0.16em] text-white">{item.degree}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-ember">
                        {item.school}
                      </p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.22em] text-slatecool">
                      CGPA: <span className="text-white">{item.cgpa}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-black/20 px-6 py-4 text-left sm:text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-slatecool">CGPA</p>
              <p className="mt-2 font-heading text-4xl uppercase tracking-[0.18em] text-white">
                {education.cgpa}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="pb-24 pt-24">
        <div className="section-shell">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <SectionHeading
                kicker="CONTACT"
                title="LET'S BUILD SOMETHING GREAT"
                copy="Open to frontend developer roles. If you need someone who can own modules end-to-end, let's talk."
              />
              <div className="mt-8 space-y-3">
                {contactLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.label === "LinkedIn" ? "_blank" : undefined}
                      rel={item.label === "LinkedIn" ? "noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-ember/35 hover:bg-white/[0.08]"
                    >
                      <span className="rounded-2xl border border-ember/25 bg-ember/10 p-3 text-ember">
                        <Icon size={18} />
                      </span>
                      <span>
                        <span className="block text-xs uppercase tracking-[0.28em] text-slatecool">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-sm text-white">{item.value}</span>
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="panel rounded-[2rem] p-8"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <CheckCircle2 size={48} className="text-ember" />
                  <h3 className="mt-5 text-xl font-semibold text-white">Message Received</h3>
                  <p className="mt-3 text-slatecool">
                    Thanks for reaching out - I&apos;ll get back to you soon.
                  </p>
                  <p className="mt-4 text-xs text-white/30">
                    You can send another message in a new browser session.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                onSubmit={handleSubmit}
                className="panel rounded-[2rem] p-6 sm:p-8"
              >
                <div className="grid gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs uppercase tracking-[0.28em] text-slatecool"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      value={form.name}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          name: event.target.value,
                        }))
                      }
                      required
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-ember/40 focus:bg-black/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs uppercase tracking-[0.28em] text-slatecool"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                      required
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-ember/40 focus:bg-black/30"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="text-xs uppercase tracking-[0.28em] text-slatecool"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={form.message}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          message: event.target.value,
                        }))
                      }
                      required
                      rows={6}
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-ember/40 focus:bg-black/30"
                      placeholder="Tell me about your project, role, or product needs."
                    />
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-charcoal transition hover:-translate-y-0.5 hover:bg-amber-300"
                    >
                      {status === "sending" ? (
                        <>
                          Sending...
                          <Loader2 size={16} className="animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                  {status === "error" ? (
                    <p className="mt-2 text-xs text-red-400">
                      Something went wrong. Try emailing directly at{" "}
                      itschandan137@gmail.com
                    </p>
                  ) : null}
                </div>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      <footer className="section-shell pb-10">
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-slatecool sm:flex-row sm:items-center sm:justify-between">
          <p>Chandan Swarnakar</p>
          <p>Cloud-native infrastructure → Frontend Development · Real-time Systems · Angular · React</p>
          <p className="inline-flex items-center gap-2">
            <FolderGit2 size={14} />
            Next.js 14 + Three.js + Framer Motion
          </p>
        </div>
      </footer>
    </main>
  );
}
