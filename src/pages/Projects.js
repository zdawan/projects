// Projects.js — STRICT MODE + FULL FOREGROUND PARALLAX (P4)
import React, { useMemo, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { categories, projects as all } from "../data/projects";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  const [active, setActive] = useState("All projects");
  const [view, setView] = useState("list");

  const filtered = useMemo(() => {
    if (active === "All projects") return all;
    return all.filter((p) => p.categories.includes(active));
  }, [active]);

  // ------------------------------
  // PARALLAX DEPTH LAYERS (P4)
  // ------------------------------
  const { scrollY } = useScroll();

  // Background
  const bgY = useTransform(scrollY, [0, 1000], [0, -220]);

  // Glow layer
  const glowY = useTransform(scrollY, [0, 1000], [0, -330]);

  // Foreground blocks
  const titleY = useTransform(scrollY, [0, 600], [0, -140]);
  const subtitleY = useTransform(scrollY, [0, 600], [0, -90]);
  const filterY = useTransform(scrollY, [0, 600], [0, -60]);
  const listY = useTransform(scrollY, [0, 600], [0, -40]);
  const footerY = useTransform(scrollY, [0, 600], [0, -70]);

  return (
    <>
      {/* --------------------------------------------- */}
      {/* BACKGROUND LAYER (Light Minimal Cinematic)     */}
      {/* --------------------------------------------- */}
      <motion.div
        style={{ y: bgY }}
        className="fixed top-0 left-0 w-full h-full -z-40 bg-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,1),rgba(240,240,240,1))]"></div>
      </motion.div>

      {/* --------------------------------------------- */}
      {/* LIGHT PASTEL GLOWS (OPTION D)                  */}
      {/* --------------------------------------------- */}
      <motion.div
        style={{ y: glowY }}
        className="fixed top-0 left-0 w-full h-full -z-30 opacity-60 pointer-events-none"
      >
        <div className="absolute top-[20%] left-[20%] w-[380px] h-[380px] bg-pink-300/40 blur-[110px] rounded-full"></div>
        <div className="absolute top-[60%] left-[60%] w-[450px] h-[450px] bg-purple-300/40 blur-[130px] rounded-full"></div>
        <div className="absolute top-[40%] left-[35%] w-[340px] h-[340px] bg-blue-300/30 blur-[120px] rounded-full"></div>
      </motion.div>

      {/* --------------------------------------------- */}
      {/* FOREGROUND CONTENT (ALL YOUR ORIGINAL CODE)    */}
      {/* --------------------------------------------- */}

      <section className="mx-auto max-w-7xl px-8">
        {/* ------------------ */}
        {/* HEADING BLOCK WRAP */}
        {/* ------------------ */}
        <motion.div style={{ y: titleY }}>
          <div className="pt-16 md:pt-24 pb-10 md:pb-12 grid md:grid-cols-12 md:gap-6 items-start">
            {/* Your ORIGINAL h1 untouched */}
            <h1 className="font-sans font-semibold tracking-[-0.08em] col-span-6 text-[8rem] md:text-[12rem] leading-[1]">
              Projects<span className="align-top text-pink-600">.</span>
            </h1>

            {/* SUBTITLE gets its own parallax */}
            <motion.div
              style={{ y: subtitleY }}
              className="col-span-6 flex flex-col md:items-end"
            >
              <p className="mt-4 md:mt-3 max-w-md md:max-w-sm md:text-lg tracking-tighter text-ink/60 text-left font-semibold md:text-right">
                A curated selection of projects that reflect our commitment to
                simplicity and purposeful design.
              </p>
            </motion.div>
          </div>
        </motion.div>
        {/* ------------------ */}
        {/* FILTERS BLOCK WRAP */}
        {/* ------------------ */}
        <motion.div style={{ y: filterY }}>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm md:text-base text-ink/70">
            {/* ORIGINAL FILTERS CODE BELOW */}
            <div className="filters flex flex-wrap items-center gap-x-6 gap-y-2">
              {categories.map((c) => {
                const isComingSoon = c === "/Coming soon";
                const isAll = c === "All projects";

                const count = isAll
                  ? all.length
                  : isComingSoon
                  ? all.filter((p) => p.categories?.includes(c)).length
                  : null;

                return (
                  <button
                    key={c}
                    onClick={() => setActive(c)}
                    className="group relative h-6 cursor-pointer overflow-hidden flex items-center gap-2"
                  >
                    <div className="relative h-6 overflow-hidden">
                      <span
                        className={`block transition-transform duration-300 ease-in-out group-hover:-translate-y-full
                          ${
                            isComingSoon
                              ? "font-semibold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient"
                              : active === c
                              ? "font-semibold text-ink"
                              : "text-ink/70"
                          }`}
                      >
                        {c}
                      </span>
                      <span
                        className={`block absolute left-0 top-full transition-transform duration-300 ease-in-out group-hover:-translate-y-full
                          ${
                            isComingSoon
                              ? "font-semibold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient"
                              : active === c
                              ? "font-semibold text-ink"
                              : "text-ink/70"
                          }`}
                      >
                        {c}
                      </span>
                    </div>

                    {count !== null && count > 0 && (
                      <span
                        className={`ml-1 text-xs rounded-full px-2 py-0.5 bg-pink-600 text-white`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
        {""}
        {/* ------------------ */}
        {/* LIST BLOCK WRAP    */}
        {/* ------------------ */}
        <motion.div style={{ y: listY }}>
          {view === "list" ? (
            <motion.div
              className="mt-10 md:mt-14 divide-y divide-neutral-200 border-t border-b"
              variants={container}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((proj) => {
                  const isComingSoon = proj.categories.includes("/Coming soon");
                  const Wrapper = isComingSoon ? "div" : "a";

                  return (
                    <motion.div
                      key={proj.id}
                      variants={item}
                      initial="hidden"
                      animate="show"
                      exit={{ opacity: 0, y: -10 }}
                    >
                      {/* EVERYTHING INSIDE THIS WRAPPER IS UNCHANGED */}
                      <Wrapper
                        href={isComingSoon ? undefined : proj.link}
                        target={isComingSoon ? undefined : "_blank"}
                        rel={isComingSoon ? undefined : "noopener noreferrer"}
                        className={`group relative block ${
                          isComingSoon
                            ? "cursor-not-allowed opacity-70"
                            : "cursor-pointer"
                        }`}
                        onMouseMove={(e) => {
                          const circle =
                            e.currentTarget.querySelector(".hover-circle");
                          if (circle) {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            circle.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
                          }
                        }}
                        onMouseEnter={(e) => {
                          const circle =
                            e.currentTarget.querySelector(".hover-circle");
                          if (circle) circle.style.opacity = 1;
                        }}
                        onMouseLeave={(e) => {
                          const circle =
                            e.currentTarget.querySelector(".hover-circle");
                          if (circle) circle.style.opacity = 0;
                        }}
                      >
                        <div className="grid grid-cols-12 items-center py-6 md:py-8 transition">
                          <div className="col-span-8 md:col-span-6">
                            <div className="flex items-baseline gap-3">
                              <span className="text-2xl md:text-3xl">
                                {proj.title}
                              </span>
                              <span className="text-xs md:text-sm text-ink/40 border border-neutral-300 rounded-full px-2 py-0.5">
                                {proj.type}
                              </span>
                            </div>
                          </div>

                          <div className="col-span-4 md:col-span-3 md:justify-self-center text-right md:text-left">
                            <span className="tracking-wider text-sm text-ink/60">
                              {proj.year}
                            </span>
                          </div>

                          {!isComingSoon && (
                            <div className="hidden md:flex col-span-3 justify-end items-center gap-2">
                              <span className="text-sm text-ink/60 transition group-hover:text-pink-600">
                                View Project
                              </span>
                              <svg
                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <path
                                  d="M5 12h14M13 5l7 7-7 7"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        <div className="h-px bg-neutral-200 -mt-px group-hover:bg-neutral-300 transition-colors"></div>

                        <div className="hover-circle pointer-events-none absolute top-0 left-0 w-100 h-80 rounded-lg overflow-hidden shadow-xl opacity-0 transition-opacity duration-200 z-50">
                          <div className="relative h-full overflow-hidden">
                            <img
                              src={proj.image || "/placeholder.png"}
                              alt={proj.title}
                              className="block w-full h-full object-cover transition-transform duration-300 ease-in-out hover:-translate-y-full"
                            />
                            <img
                              src={proj.image || "/placeholder.png"}
                              alt={proj.title}
                              className="block absolute left-0 top-full w-full h-full object-cover transition-transform duration-300 ease-in-out hover:-translate-y-full"
                            />
                          </div>
                        </div>
                      </Wrapper>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : null}
        </motion.div>
        {""}
        {/* ------------------ */}
        {/* FOOTER WRAP        */}
        {/* ------------------ */}
        <motion.div style={{ y: footerY }}>
          <footer className="mt-20 text-gray-400 py-16">
            <div className="max-w-6xl mx-auto px-6 space-y-10">
              <div className="group flex justify-center cursor-pointer">
                <h2 className="relative inline-block text-6xl md:text-7xl font-semibold text-black text-center overflow-hidden">
                  <span className="block transition-all duration-500 ease-in-out group-hover:opacity-0 group-hover:-translate-y-3">
                    D’s Studi<span className="text-pink-600">o</span>
                  </span>

                  <span className="absolute inset-0 block opacity-0 translate-y-3 transition-all duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                    D<span className="text-pink-600">.</span>com
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-10 text-sm">
                <div className="space-y-2 pt-40">
                  <a
                    href="mailto:jdharshankumar22@gmail.com"
                    className="block relative group overflow-hidden"
                  >
                    <span className="transition-colors group-hover:text-pink-500">
                      jdharshankumar22@gmail.com
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>

                  <a href="tel:+918248744641" className="block relative group">
                    <span className="transition-colors group-hover:text-pink-500">
                      +91 82487 44641
                    </span>
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </div>

                <div className="flex justify-center gap-8">
                  {[
                    {
                      name: "GitHub",
                      url: "https://zdawan.github.io/dharshan.github.io/",
                    },
                    {
                      name: "LinkedIn",
                      url: "https://www.linkedin.com/in/dharshan-kumar-j-897a41252/",
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="relative group inline-block"
                    >
                      <span className="relative text-gray-400 transition-colors group-hover:text-pink-500">
                        {social.name}
                        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-pink-500 transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  ))}
                </div>

                <div className="text-right space-y-1 pt-40">
                  <p>© {new Date().getFullYear()} All Rights Reserved</p>
                  <p className="text-xs">
                    Design & Developed by{" "}
                    <span className="hover:text-pink-500 transition-colors">
                      Dharshan Kumar J
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      </section>
    </>
  );
}
