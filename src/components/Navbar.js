import React from "react";

const NavLink = ({ children }) => (
  <a href="#" className="link-underline text-sm md:text-base text-ink/80 hover:text-ink transition">
    {children}
  </a>
);

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-neutral-200/70">
      <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-10 bg-ink"></div>
        </div>
        <nav className="flex items-center gap-6">
          <NavLink>About</NavLink>
          <NavLink>Projects</NavLink>
          <NavLink>Blog</NavLink>
          <a href="#" className="text-sm md:text-base px-3 py-1 border border-neutral-300 rounded-full hover:border-ink transition">
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}
