"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path) => pathname === path;

  const NavLink = ({ href, label, mobile }) => (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className={
        mobile
          ? styles.mobileLink
          : `${styles.link} ${isActive(href) ? styles.active : ""}`
      }
    >
      {label}
    </Link>
  );

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Shivam Roy
        </Link>

        {/* Desktop navigation */}
        <div className={styles.links}>
          <NavLink href="/" label="Home" />
          <NavLink href="/project" label="Project" />
          <NavLink href="/gallery" label="Gallery" />
          <NavLink href="/contact" label="Contact Me" />
        </div>

        {/* Hamburger menu */}
        <button
          className={`${styles.menuBtn} ${open ? styles.menuOpen : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className={styles.mobileMenu}>
          <NavLink href="/" label="Home" mobile />
          <NavLink href="/project" label="Project" mobile />
          <NavLink href="/gallery" label="Gallery" mobile />
          <NavLink href="/contact" label="Contact Me" mobile />
        </div>
      )}
    </nav>
  );
}
