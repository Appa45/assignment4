
import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  CalendarDays,
  Bell,
  Clock,
  ListTodo,
} from "lucide-react";

const features = [
  { label: "Todo List", icon: ListTodo, cls: "todo", href: "#todo-list" },
  { label: "Calendar", icon: CalendarDays, cls: "calendar", href: "#calendar" },
  { label: "Reminders", icon: Bell, cls: "reminders", href: "#reminders" },
  { label: "Planning", icon: Clock, cls: "planning", href: "#planning" },
];

const company = [
  { label: "History", href: "#history" },
  { label: "Our Team", href: "#team" },
  { label: "Blog", href: "#blog" },
];

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    }

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

  function closeMenus() {
    setActiveDropdown(null);
    setMobileOpen(false);
  }

  function toggleDropdown(name) {
    setActiveDropdown((current) => (current === name ? null : name));
  }

  return (
    <div className="app">
      <header className="site-header">
        <a
          className="logo"
          href="#"
          aria-label="Snap home"
          alt="snap's logo"
          onClick={closeMenus}
        >
          <img
            src="./assets/images/logo.svg"
            alt="snap's logo"
          />
        </a>

        <button
          type="button"
          className="open-menu"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={34} />
        </button>

        <div
          className={`overlay ${mobileOpen ? "visible" : ""}`}
          aria-hidden={!mobileOpen}
          onClick={closeMenus}
        />

        <nav
          ref={navRef}
          className={`nav ${mobileOpen ? "nav-open" : ""}`}
          aria-label="Main navigation"
        >
          <div className="mobile-nav-top">
            <button
              type="button"
              className="close-menu"
              aria-label="Close menu"
              onClick={closeMenus}
            >
              <X size={32} />
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
                  className="chevron"
                  size={14}
                />
              </button>

              {activeDropdown === "features" && (
                <div className="dropdown-list features-dropdown">
                  {features.map(({ label, icon: Icon, cls, href }) => (
                    <div className="dropdown-link" key={label}>
                      <a
                        href={href}
                        aria-label={
                          label === "Todo List" ? "todo-list" : undefined
                        }
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
              )}
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
                  className="chevron"
                  size={14}
                />
              </button>

              {activeDropdown === "company" && (
                <div className="dropdown-list company-dropdown">
                  {company.map(({ label, href }) => (
                    <div className="dropdown-link" key={label}>
                      <a href={href} onClick={closeMenus}>
                        {label}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <a
              className="nav-link simple-link"
              href="#careers"
              onClick={closeMenus}
            >
              Careers
            </a>

            <a
              className="nav-link simple-link"
              href="#about"
              onClick={closeMenus}
            >
              About
            </a>
          </div>

          <div className="registration">
            <button
              type="button"
              className="login-button"
              onClick={closeMenus}
            >
              Login
            </button>

            <button
              type="button"
              className="register-button"
              onClick={closeMenus}
            >
              Register
            </button>
          </div>
        </nav>
      </header>

      <main className="hero">
        <div className="hero-copy">
          <div className="text-content">
            <h1>
              Make remote
              <br className="desktop-break" /> work
            </h1>

            <p>
              Get your team in sync, no matter your location. Streamline
              processes, create team rituals, and watch productivity soar.
            </p>

            <button
              type="button"
              className="learn-more"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn more
            </button>
          </div>

          <div className="clients" aria-label="Our clients">
            <img
              src="./assets/images/client-databiz.svg"
              alt="Databiz"
            />
            <img
              src="./assets/images/client-audiophile.svg"
              alt="Audiophile"
            />
            <img
              src="./assets/images/client-meet.svg"
              alt="Meet"
            />
            <img
              src="./assets/images/client-maker.svg"
              alt="Maker"
            />
          </div>
        </div>

        <picture className="main-picture">
          <source
            media="(min-width: 701px)"
            srcSet="./assets/images/image-hero-desktop.png"
          />
          <img
            src="./assets/images/image-hero-mobile.png"
            alt="A person planning and organizing tasks at a desk"
          />
        </picture>
      </main>

      <footer className="attribution" id="about">
        Challenge by{" "}
        <a
          href="https://crio.do"
          target="_blank"
          rel="noreferrer"
        >
          Crio.Do
        </a>
        . Coded with care.
      </footer>
    </div>
  );
}

export default App;
