import React, { useState } from "react";
import logo from "./assets/logo.png";
import bg from "./assets/bg.jpg";

function HomePage() {
  return (
    <section style={S.hero}>
      <div style={S.badge}>✨ Your PCOD Lifestyle Companion</div>
      <h1 style={S.h1}>
        Your Safe Space for <span style={S.pink}>Mental Wellness</span>
      </h1>
      <p style={S.subtext}>
        Track your emotions, understand your mood, and get personalized AI
        guidance — all in one place.
      </p>
      <div style={S.heroBtns}>
        <button style={S.primaryBtn}>🚀 Start Assessment</button>
        <button style={S.secondaryBtn}>Learn More</button>
      </div>
    </section>
  );
}

function FeaturesPage() {
  const features = [
    { icon: "😊", title: "Mood Tracking", text: "Log your daily emotions and spot patterns over time." },
    { icon: "🤖", title: "AI Guidance", text: "Get personalized lifestyle advice powered by AI." },
    { icon: "📊", title: "Progress Insights", text: "Beautiful visual charts to track your wellness journey." },
    { icon: "🔒", title: "Safe & Private", text: "Your data is encrypted and never shared." },
    { icon: "🌙", title: "Sleep Analysis", text: "Understand how sleep affects your mental health." },
    { icon: "🧘", title: "Mindfulness", text: "Guided breathing and meditation exercises." },
  ];
  return (
    <section style={S.page}>
      <h2 style={S.pageTitle}>What <span style={S.pink}>HerSpace</span> Offers</h2>
      <p style={S.pageSubtext}>Everything you need for your wellness journey.</p>
      <div style={S.grid}>
        {features.map((f) => (
          <div key={f.title} style={S.card}>
            <div style={S.cardIcon}>{f.icon}</div>
            <div style={S.cardTitle}>{f.title}</div>
            <div style={S.cardText}>{f.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorksPage() {
  const steps = [
    { num: "01", icon: "📝", title: "Take Assessment", text: "Answer simple questions about your lifestyle, sleep, stress, and emotions." },
    { num: "02", icon: "🧠", title: "Get Your Analysis", text: "See your wellness radar chart and personalized score breakdown." },
    { num: "03", icon: "💡", title: "Receive Guidance", text: "Get AI-powered suggestions tailored to your unique profile." },
    { num: "04", icon: "📈", title: "Track Progress", text: "Log daily moods and watch your wellness improve over time." },
  ];
  return (
    <section style={S.page}>
      <h2 style={S.pageTitle}>How It <span style={S.pink}>Works</span></h2>
      <p style={S.pageSubtext}>Simple steps to start your wellness journey today.</p>
      <div style={S.stepsGrid}>
        {steps.map((s) => (
          <div key={s.num} style={S.stepCard}>
            <div style={S.stepNum}>{s.num}</div>
            <div style={S.cardIcon}>{s.icon}</div>
            <div style={S.cardTitle}>{s.title}</div>
            <div style={S.cardText}>{s.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <section style={{ ...S.page, maxWidth: "660px", margin: "0 auto" }}>
      <h2 style={S.pageTitle}>About <span style={S.pink}>HerSpace</span></h2>
      <p style={{ ...S.pageSubtext, marginBottom: "24px" }}>
        A safe, judgment-free wellness platform built for women with PCOD.
      </p>
      <div style={S.aboutCard}>
        <p style={S.aboutText}>
          We believe every woman deserves access to tools that help her understand her emotions,
          manage stress, and build healthier habits — without stigma or complexity.
        </p>
        <p style={{ ...S.aboutText, marginTop: "16px" }}>
          Our AI-driven assessments and mood tracking tools give you real, actionable insights
          about your mental and emotional health, so you can take control of your wellbeing.
        </p>
        <div style={S.stats}>
          <div style={S.stat}><div style={S.statNum}>10K+</div><div style={S.statLabel}>Women Helped</div></div>
          <div style={S.stat}><div style={S.statNum}>95%</div><div style={S.statLabel}>Feel Better</div></div>
          <div style={S.stat}><div style={S.statNum}>24/7</div><div style={S.statLabel}>AI Support</div></div>
        </div>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section style={{ ...S.page, maxWidth: "500px", margin: "0 auto" }}>
      <h2 style={S.pageTitle}>Get In <span style={S.pink}>Touch</span></h2>
      <p style={S.pageSubtext}>We'd love to hear from you.</p>
      <div style={S.contactCard}>
        {[
          { label: "Your Name", placeholder: "e.g. Priya Sharma", type: "text" },
          { label: "Email Address", placeholder: "you@example.com", type: "email" },
        ].map((f) => (
          <div key={f.label} style={{ marginBottom: "16px" }}>
            <label style={S.label}>{f.label}</label>
            <input style={S.input} type={f.type} placeholder={f.placeholder} />
          </div>
        ))}
        <div style={{ marginBottom: "20px" }}>
          <label style={S.label}>Message</label>
          <textarea
            style={{ ...S.input, height: "100px", resize: "vertical" }}
            placeholder="Your message..."
          />
        </div>
        <button style={S.primaryBtn}>Send Message 💌</button>
      </div>
    </section>
  );
}

const TABS = [
  { id: "home",       label: "Home",         component: <HomePage /> },
  { id: "features",   label: "Features",     component: <FeaturesPage /> },
  { id: "howitworks", label: "How It Works", component: <HowItWorksPage /> },
  { id: "about",      label: "About",        component: <AboutPage /> },
  { id: "contact",    label: "Contact",      component: <ContactPage /> },
];

export default function App() {
  const [active, setActive] = useState("home");
  const current = TABS.find((t) => t.id === active);

  return (
    <div style={S.root}>

      {/* Blurred background overlay */}
      <div style={S.overlay}></div>

      {/* NAVBAR */}
      <header style={S.header}>
        <div style={S.headerInner}>
          <div style={S.logoBox}>
            <img src={logo} alt="HerSpace" style={S.logoImg} />
          </div>
          <nav style={S.tabBar}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                style={{ ...S.tab, ...(active === tab.id ? S.tabActive : {}) }}
              >
                {tab.label}
                {active === tab.id && <div style={S.tabUnderline} />}
              </button>
            ))}
          </nav>
          <div style={S.authBtns}>
            <button style={S.loginBtn}>Login</button>
            <button style={S.signupBtn}>Sign Up</button>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main style={S.main}>{current.component}</main>

      {/* FOOTER */}
      <footer style={S.footer}>
        © 2026 HerSpace · "Your mental health is a priority." 🌸
      </footer>

    </div>
  );
}

const S = {
  // Root with background image
  root: {
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },

  // Blur overlay on top of bg image
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(255, 220, 220, 0.6)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    zIndex: 0,
  },

  // Header
  header: {
    background: "rgba(255,255,255,0.92)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(205,44,88,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  headerInner: {
    display: "flex",
    alignItems: "center",
    padding: "0 32px",
    gap: "8px",
    height: "64px",
  },
  logoBox: {
    marginRight: "16px",
    display: "flex",
    alignItems: "center",
  },
  logoImg: {
    height: "48px",
    objectFit: "contain",
  },

  // Tabs
  tabBar: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    gap: "2px",
    height: "100%",
  },
  tab: {
    position: "relative",
    background: "none",
    border: "none",
    padding: "0 16px",
    height: "64px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#666",
    cursor: "pointer",
    transition: "color 0.2s",
    whiteSpace: "nowrap",
  },
  tabActive: {
    color: "#CD2C58",
    fontWeight: "700",
  },
  tabUnderline: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "70%",
    height: "3px",
    borderRadius: "3px 3px 0 0",
    background: "linear-gradient(90deg, #CD2C58, #E06C9F)",
  },

  // Auth buttons
  authBtns: { display: "flex", gap: "10px", marginLeft: "auto" },
  loginBtn: {
    padding: "8px 20px",
    border: "2px solid #CD2C58",
    borderRadius: "25px",
    background: "transparent",
    color: "#CD2C58",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
  },
  signupBtn: {
    padding: "8px 20px",
    border: "none",
    borderRadius: "25px",
    background: "linear-gradient(135deg, #E06C9F, #CD2C58)",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "13px",
    boxShadow: "0 4px 14px rgba(205,44,88,0.35)",
  },

  // Main & Footer
  main: {
    flex: 1,
    padding: "40px 20px",
    position: "relative",
    zIndex: 1,
  },
  footer: {
    textAlign: "center",
    padding: "16px",
    fontSize: "12px",
    color: "#CD2C58",
    borderTop: "1px solid rgba(205,44,88,0.15)",
    background: "rgba(255,255,255,0.5)",
    position: "relative",
    zIndex: 1,
  },

  // Hero
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    paddingTop: "30px",
  },
  badge: {
    background: "rgba(255,220,220,0.7)",
    color: "#CD2C58",
    padding: "6px 18px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "18px",
    border: "1px solid rgba(205,44,88,0.25)",
  },
  h1: {
    fontSize: "clamp(30px, 5vw, 56px)",
    fontWeight: "900",
    color: "#1a1a2e",
    lineHeight: 1.15,
    marginBottom: "16px",
    maxWidth: "720px",
  },
  pink: { color: "#CD2C58" },
  subtext: {
    fontSize: "16px",
    color: "#444",
    maxWidth: "520px",
    lineHeight: 1.7,
    marginBottom: "30px",
  },
  heroBtns: { display: "flex", gap: "14px" },
  primaryBtn: {
    padding: "13px 32px",
    border: "none",
    borderRadius: "30px",
    background: "linear-gradient(135deg, #E06C9F, #CD2C58)",
    color: "white",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(205,44,88,0.4)",
  },
  secondaryBtn: {
    padding: "13px 32px",
    border: "2px solid #CD2C58",
    borderRadius: "30px",
    background: "white",
    color: "#CD2C58",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },

  // Page layout
  page: { textAlign: "center" },
  pageTitle: {
    fontSize: "clamp(24px, 3.5vw, 40px)",
    fontWeight: "900",
    color: "#1a1a2e",
    marginBottom: "10px",
  },
  pageSubtext: { fontSize: "15px", color: "#555", marginBottom: "36px" },

  // Feature grid
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "16px",
    justifyContent: "center",
    maxWidth: "860px",
    margin: "0 auto",
  },
  card: {
    background: "#FFDCDC",
    borderRadius: "18px",
    padding: "24px 20px",
    width: "220px",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(205,44,88,0.12)",
    border: "1px solid rgba(255,255,255,0.8)",
  },
  cardIcon: { fontSize: "30px", marginBottom: "10px" },
  cardTitle: { fontWeight: "700", fontSize: "15px", color: "#1a1a2e", marginBottom: "6px" },
  cardText: { fontSize: "13px", color: "#555", lineHeight: 1.5 },

  // Steps
  stepsGrid: {
    display: "flex",
    flexWrap: "nowrap",
    gap: "20px",
    justifyContent: "center",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  stepCard: {
    background: "#FFDCDC",
    borderRadius: "18px",
    padding: "28px 20px",
    width: "220px",
    minWidth: "180px",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(205,44,88,0.12)",
    border: "1px solid rgba(255,255,255,0.8)",
  },
  stepNum: {
    fontSize: "36px",
    fontWeight: "900",
    color: "rgba(205,44,88,0.2)",
    lineHeight: 1,
    marginBottom: "8px",
  },

  // About
  aboutCard: {
    background: "#FFDCDC",
    borderRadius: "20px",
    padding: "32px",
    textAlign: "left",
    boxShadow: "0 4px 24px rgba(205,44,88,0.12)",
  },
  aboutText: { fontSize: "15px", color: "#333", lineHeight: 1.7 },
  stats: { display: "flex", gap: "24px", marginTop: "28px", justifyContent: "center" },
  stat: { textAlign: "center" },
  statNum: { fontSize: "28px", fontWeight: "900", color: "#CD2C58" },
  statLabel: { fontSize: "12px", color: "#888", marginTop: "4px" },

  // Contact
  contactCard: {
    background: "#FFDCDC",
    borderRadius: "20px",
    padding: "32px",
    textAlign: "left",
    boxShadow: "0 4px 24px rgba(205,44,88,0.12)",
  },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#333", marginBottom: "6px" },
  input: {
    width: "100%",
    padding: "11px 14px",
    border: "1.5px solid rgba(205,44,88,0.2)",
    borderRadius: "10px",
    fontSize: "14px",
    outline: "none",
    background: "rgba(255,255,255,0.8)",
    boxSizing: "border-box",
  },
};