
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Check,
  CalendarDays,
  Bell,
  Clock,
  ListTodo,
} from "lucide-react";
import "./style.css";

const features = [
  {
    label: "Todo List",
    icon: ListTodo,
    cls: "purple",
    href: "#todo-list",
  },
  {
    label: "Calendar",
    icon: CalendarDays,
    cls: "blue",
    href: "#calendar",
  },
  {
    label: "Reminders",
    icon: Bell,
    cls: "yellow",
    href: "#reminders",
  },
  {
    label: "Planning",
    icon: Clock,
    cls: "green",
    href: "#planning",
  },
];

const companyLinks = [
  { label: "History", href: "#history" },
  { label: "Our Team", href: "#team" },
  { label: "Blog", href: "#blog" },
];

const clients = [
  {
    name: "databiz",
    className: "databiz",
    src: "./assets/images/client-databiz.svg",
  },
  {
    name: "audiophile",
    className: "audiophile",
    src: "./assets/images/client-audiophile.svg",
  },
  {
    name: "meet",
    className: "meet",
    src: "./assets/images/client-meet.svg",
  },
  {
    name: "maker",
    className: "maker",
    src: "./assets/images/client-maker.svg",
  },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  const closeMenus = () => {
    setMobileOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown((current) => (current === name ? null : name));
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-is-open", mobileOpen);

    return () => {
      document.body.classList.remove("menu-is-open");
    };
  }, [mobileOpen]);

  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="#" aria-label="Snap home" alt="snap's logo">
          <img
            src="./assets/images/logo.svg"
            alt="snap's logo"
          />
        </a>

        <button
          className="open-menu"
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={30} strokeWidth={2} />
        </button>

        <div
          className={`overlay ${mobileOpen ? "visible" : ""}`}
          onClick={closeMenus}
          aria-hidden={!mobileOpen}
        />

        <nav
          ref={navRef}
          className={`nav ${mobileOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <div className="mobile-nav-top">
            <button
              className="close-menu"
              type="button"
              aria-label="Close menu"
              onClick={closeMenus}
            >
              <X size={30} />
            </button>
          </div>

          <div className="nav-links">
            <div
              className={`nav-item dropdown-item ${
                activeDropdown === "features" ? "dropdown-active" : ""
              }`}
            >
              <button
                type="button"
                className={`nav-link ${
                  activeDropdown === "features" ? "link-open" : ""
                }`}
                aria-expanded={activeDropdown === "features"}
                onClick={() => toggleDropdown("features")}
              >
                Features
                <ChevronDown
                  className={`chevron ${
                    activeDropdown === "features" ? "rotated" : ""
                  }`}
                  size={15}
                />
              </button>

              <div
                className="dropdown-list features-dropdown"
                aria-hidden={activeDropdown !== "features"}
              >
                {features.map(({ label, icon: Icon, cls, href }) => (
                  <div className="dropdown-link" key={label}>
                    <a
                      href={href}
                      aria-label={
                        label === "Todo List" ? "todo-list" : undefined
                      }
                      tabIndex={activeDropdown === "features" ? 0 : -1}
                      onClick={closeMenus}
                    >
                      <span className={`feature-icon ${cls}`}>
                        <Icon size={15} />
                      </span>
                      <span>{label}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`nav-item dropdown-item ${
                activeDropdown === "company" ? "dropdown-active" : ""
              }`}
            >
              <button
                type="button"
                className={`nav-link ${
                  activeDropdown === "company" ? "link-open" : ""
                }`}
                aria-expanded={activeDropdown === "company"}
                onClick={() => toggleDropdown("company")}
              >
                Company
                <ChevronDown
                  className={`chevron ${
                    activeDropdown === "company" ? "rotated" : ""
                  }`}
                  size={15}
                />
              </button>

              <div
                className="dropdown-list company-dropdown"
                aria-hidden={activeDropdown !== "company"}
              >
                {companyLinks.map(({ label, href }) => (
                  <div className="dropdown-link" key={label}>
                    <a
                      href={href}
                      tabIndex={activeDropdown === "company" ? 0 : -1}
                      onClick={closeMenus}
                    >
                      {label}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <a className="nav-link simple-link" href="#careers" onClick={closeMenus}>
              Careers
            </a>
            <a className="nav-link simple-link" href="#about" onClick={closeMenus}>
              About
            </a>
          </div>

          <div className="auth-links">
            <a className="login-link" href="#login" onClick={closeMenus}>
              Login
            </a>
            <a className="register-link" href="#register" onClick={closeMenus}>
              Register
            </a>
          </div>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-copy">
              <h1>
                Make
                <br />
                remote work
              </h1>

              <p>
                Get your team in sync, no matter your location.
                Streamline processes, create team rituals, and watch
                productivity soar.
              </p>

              <a className="learn-more" href="#learn-more">
                Learn more
              </a>

              <div className="client-logos" aria-label="Our clients">
                {clients.map((client) => (
                  <div
                    className={`client-logo ${client.className}`}
                    key={client.name}
                  >
                    <img src={client.src} alt={client.name} />
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-image">
              <picture>
                <source
                  media="(max-width: 700px)"
                  srcSet="./assets/images/image-hero-mobile.png"
                />
                <img
                  src="./assets/images/image-hero-desktop.png"
                  alt="A person working remotely at a desk"
                />
              </picture>
            </div>
          </div>
        </section>
      </main>

      <footer className="attribution">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a href="https://github.com/" target="_blank" rel="noreferrer">
          Your Name
        </a>
        .
      </footer>
    </div>
  );
}
