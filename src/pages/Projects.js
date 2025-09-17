import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [view, setView] = useState("list"); // "list" | "grid"

  const filtered = useMemo(() => {
    if (active === "All projects") return all;
    return all.filter((p) => p.categories.includes(active));
  }, [active]);

  return (
    <section className="mx-auto max-w-7xl px-8">
      {/* Heading + intro */}
      <div className="pt-16 md:pt-24 pb-10 md:pb-12 grid md:grid-cols-12 md:gap-6 items-start">
        <h1 className="font-sans font-semibold tracking-[-0.08em] col-span-6 text-[8rem] md:text-[12rem] leading-[1]">
          Projects<span className="align-top text-pink-600">.</span>
        </h1>
        <div className="col-span-6 flex flex-col md:items-end">
          <p className="mt-4 md:mt-3 max-w-md md:max-w-sm  md:text-lg tracking-tighter text-ink/60 text-left font-semibold md:text-right">
            A curated selection of projects that reflect our commitment to
            simplicity and purposeful design.
          </p>
        </div>
      </div>

      {/* Filters + Toggle in same row */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm md:text-base text-ink/70">
        {/* Filters */}
        <div className="filters flex flex-wrap items-center gap-x-6 gap-y-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="group relative h-6 overflow-hidden flex items-center gap-2"
            >
              <div className="relative h-6 overflow-hidden">
                <span
                  className={`block transition-transform duration-300 ease-in-out group-hover:-translate-y-full ${
                    active === c ? "font-semibold text-ink" : "text-ink/70"
                  }`}
                >
                  {c}
                </span>
                <span
                  className={`block absolute left-0 top-full transition-transform duration-300 ease-in-out group-hover:-translate-y-full ${
                    active === c ? "font-semibold text-ink" : "text-ink/70"
                  }`}
                >
                  {c}
                </span>
              </div>

              {/* Badge for project count */}
              {c === "All projects" && (
                <span className="ml-1 text-xs bg-pink-600 text-white rounded-full px-2 py-0.5">
                  {all.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Modern toggle */}
        {/* <div className="flex rounded-full border border-neutral-300 overflow-hidden text-sm">
          {/* <button
            onClick={() => setView("list")}
            className={`px-5 py-2 transition ${
              view === "list"
                ? "bg-pink-600 text-white font-medium"
                : "bg-white text-ink/70 hover:text-ink"
            }`}
          >
            List
          </button> */}
        {/* <button
            onClick={() => setView("grid")}
            className={`px-5 py-2 transition ${
              view === "grid"
                ? "bg-pink-600 text-white font-medium"
                : "bg-white text-ink/70 hover:text-ink"
            }`}
          >
            Grid
          </button>
        </div> */}
      </div>

      {/* List/Grid */}
      {/* List */}
      {view === "list" ? (
        <motion.div
          className="mt-10 md:mt-14 divide-y divide-neutral-200 border-t border-b"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <motion.a
                href="#"
                key={proj.id}
                variants={item}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10 }}
                className="group relative block cursor-none"
                onMouseMove={(e) => {
                  const circle = e.currentTarget.querySelector(".hover-circle");
                  if (circle) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    circle.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
                  }
                }}
                onMouseEnter={(e) => {
                  const circle = e.currentTarget.querySelector(".hover-circle");
                  if (circle) circle.style.opacity = 1;
                }}
                onMouseLeave={(e) => {
                  const circle = e.currentTarget.querySelector(".hover-circle");
                  if (circle) circle.style.opacity = 0;
                }}
              >
                <div className="grid grid-cols-12 items-center py-6 md:py-8 transition">
                  {/* Title */}
                  <div className="col-span-8 md:col-span-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl md:text-3xl">{proj.title}</span>
                      <span className="text-xs md:text-sm text-ink/40 border border-neutral-300 rounded-full px-2 py-0.5">
                        {proj.type}
                      </span>
                    </div>
                  </div>

                  {/* Year */}
                  <div className="col-span-4 md:col-span-3 md:justify-self-center text-right md:text-left">
                    <span className="tracking-wider text-sm text-ink/60">
                      {proj.year}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="hidden md:flex col-span-3 justify-end items-center gap-2">
                    <span className="text-sm text-ink/60 transition group-hover:text-pink-600">
                      Case Study
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
                </div>
                <div className="h-px bg-neutral-200 -mt-px group-hover:bg-neutral-300 transition-colors"></div>

                {/* Hover image preview with animation */}
                {/* Hover image preview with animation */}
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
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((proj) => (
              <motion.a
                href="#"
                key={proj.id}
                variants={item}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, y: -10 }}
                className="group block border border-neutral-200 rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <div className="aspect-video bg-neutral-100 flex items-center justify-center text-ink/40">
                  Image
                </div>
                <div className="p-4">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-semibold">{proj.title}</h3>
                    <span className="text-xs text-ink/40 border border-neutral-300 rounded-full px-2 py-0.5">
                      {proj.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-ink/60">{proj.year}</p>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Footer */}
      <div className="py-16 md:py-24 text-center">
        <p className="text-sm text-ink/60">© D's Studio</p>
      </div>
    </section>
  );
}
