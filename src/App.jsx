import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X, Check, CalendarDays, Bell, Clock, ListTodo } from 'lucide-react';
const features = [
  { label: 'Todo List', icon: ListTodo, cls: 'todo' },
  { label: 'Calendar', icon: CalendarDays, cls: 'calendar' },
  { label: 'Reminders', icon: Bell, cls: 'reminders' },
  { label: 'Planning', icon: Clock, cls: 'planning' },
];
const company = ['History', 'Our Team', 'Blog'];
function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navRef = useRef(null);
  useEffect(() => {
    const outside = e => { if (navRef.current && !navRef.current.contains(e.target)) setActiveDropdown(null); };
    const escape = e => { if (e.key === 'Escape') { setActiveDropdown(null); setMobileOpen(false); } };
    document.addEventListener('mousedown', outside); document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('mousedown', outside); document.removeEventListener('keydown', escape); };
  }, []);
  useEffect(() => { document.body.classList.toggle('menu-is-open', mobileOpen); return () => document.body.classList.remove('menu-is-open'); }, [mobileOpen]);
  const closeMenus = () => { setActiveDropdown(null); setMobileOpen(false); };
  const toggleDropdown = name => setActiveDropdown(current => current === name ? null : name);
  return <div className="app">
    <header className="site-header">
      <a className="logo" href="#" aria-label="Snap home" onClick={closeMenus}><img src="./assets/images/logo.svg" alt="snap's logo" /></a>
      <button type="button" className="open-menu" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}><Menu size={34}/></button>
      <div className={`overlay ${mobileOpen ? 'visible' : ''}`} aria-hidden={!mobileOpen} onClick={closeMenus}></div>
      <nav ref={navRef} className={`nav ${mobileOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        <div className="mobile-nav-top"><button type="button" className="close-menu" aria-label="Close menu" onClick={closeMenus}><X size={32}/></button></div>
        <div className="nav-links">
          <div className={`nav-item dropdown-item ${activeDropdown === 'features' ? 'dropdown-active' : ''}`}>
            <button type="button" className="nav-link" aria-expanded={activeDropdown === 'features'} onClick={() => toggleDropdown('features')}>Features <ChevronDown className="chevron" size={14}/></button>
            {activeDropdown === 'features' && <div className="dropdown-list features-dropdown">{features.map(({label, icon: Icon, cls}) => <a className="dropdown-link" href="#" key={label} aria-label={label === 'Todo List' ? 'todo-list' : undefined} onClick={e => {e.preventDefault(); closeMenus();}}><span className={`feature-icon ${cls}`}><Icon size={15}/></span><span>{label}</span></a>)}</div>}
          </div>
          <div className={`nav-item dropdown-item ${activeDropdown === 'company' ? 'dropdown-active' : ''}`}>
            <button type="button" className="nav-link" aria-expanded={activeDropdown === 'company'} onClick={() => toggleDropdown('company')}>Company <ChevronDown className="chevron" size={14}/></button>
            {activeDropdown === 'company' && <div className="dropdown-list company-dropdown">{company.map(item => <a className="dropdown-link" href="#" key={item} onClick={e => {e.preventDefault(); closeMenus();}}>{item}</a>)}</div>}
          </div>
          <a className="nav-link simple-link" href="#careers" onClick={closeMenus}>Careers</a>
          <a className="nav-link simple-link" href="#about" onClick={closeMenus}>About</a>
        </div>
        <div className="registration"><button type="button" className="login-button" onClick={closeMenus}>Login</button><button type="button" className="register-button" onClick={closeMenus}>Register</button></div>
      </nav>
    </header>
    <main className="hero">
      <div className="hero-copy"><div className="text-content"><h1>Make remote<br className="desktop-break"/> work</h1><p>Get your team in sync, no matter your location. Streamline processes, create team rituals, and watch productivity soar.</p><button type="button" className="learn-more" onClick={() => document.getElementById('about')?.scrollIntoView({behavior:'smooth'})}>Learn more</button></div>
        <div className="clients" aria-label="Our clients"><img src="./assets/images/client-databiz.svg" alt="Databiz"/><img src="./assets/images/client-audiophile.svg" alt="Audiophile"/><img src="./assets/images/client-meet.svg" alt="Meet"/><img src="./assets/images/client-maker.svg" alt="Maker"/></div>
      </div>
      <picture className="main-picture"><source media="(min-width: 701px)" srcSet="./assets/images/image-hero-desktop.png"/><img src="./assets/images/image-hero-mobile.png" alt="A person planning and organizing tasks at a desk"/></picture>
    </main>
    <footer className="attribution" id="about">Challenge by <a href="https://crio.do" target="_blank" rel="noreferrer">Crio.Do</a>. Coded with care.</footer>
  </div>;
}
export default App;
