
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
    className: "purple",
    href: "#todo-list",
  },
  {
    label: "Calendar",
    icon: CalendarDays,
    className: "blue",
    href: "#calendar",
  },
  {
    label: "Reminders",
    icon: Bell,
    className: "yellow",
    href: "#reminders",
  },
  {
    label: "Planning",
    icon: Clock,
    className: "green",
    href: "#planning",
  },
];

const companyLinks = [
  { label: "History", href: "#history" },
  { label: "Our Team", href: "#team" },
  { label: "Blog", href: "#blog" },
];

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 700px)").matches
  );

  const navRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");

    const handleViewportChange = (event) => {
      setIsMobile(event.matches);
      setMobileOpen(false);
      setActiveDropdown(null);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

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
        <a className="logo" href="#" alt="snap's logo">
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
          <Menu size={30} />
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
                {features.map(({ label, icon: Icon, className, href }) => (
                  <div className="dropdown-link" key={label}>
                    <a
                      href={href}
                      aria-label={
                        label === "Todo List" ? "todo-list" : undefined
                      }
                      tabIndex={activeDropdown === "features" ? 0 : -1}
                      onClick={closeMenus}
                    >
                      <span className={`feature-icon ${className}`}>
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
            <div className="login">
              <button type="button" onClick={closeMenus}>
                Login
              </button>
            </div>

            <div className="registration">
              <button type="button" onClick={closeMenus}>
                Register
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="main">
        <section className="hero">
          <div className="hero-content">
            <div className="text-content">
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

              <div className="clients">
                <img
                  src="./assets/images/client-databiz.svg"
                  alt="databiz"
                />
                <img
                  src="./assets/images/client-audiophile.svg"
                  alt="audiophile"
                />
                <img
                  src="./assets/images/client-meet.svg"
                  alt="meet"
                />
                <img
                  src="./assets/images/client-maker.svg"
                  alt="maker"
                />
              </div>
            </div>

            <div className="hero-image">
              <img
                src={
                  isMobile
                    ? "./assets/images/image-hero-mobile.png"
                    : "./assets/images/image-hero-desktop.png"
                }
                alt="Person working remotely"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="attribution">
        Challenge by{" "}
        <a href="https://crio.do" target="_blank" rel="noreferrer">
          Crio
        </a>
        . Coded by{" "}
        <a href="https://crio.do" target="_blank" rel="noreferrer">
          Crio
        </a>
        .
      </footer>
    </div>
  );
}
