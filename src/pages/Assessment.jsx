import React, { useState, useEffect } from "react";
import bg from "../assets/bg.jpg";
import Signup from "./Signup";
import Login from "./Login";

const QUESTIONS = [
  {
    id: 1, emoji: "🌙", category: "Sleep",
    question: "It's 11:30 PM. What are you doing?",
    options: [
      { text: "Scrolling Instagram",     emoji: "📱", score: 1, tip: "Try a digital detox before bed! 📵" },
      { text: "Watching Netflix",        emoji: "🍿", score: 2, tip: "Set a sleep timer for shows! ⏰" },
      { text: "Meditation / Journaling", emoji: "🧘", score: 4, tip: "Amazing for hormonal balance! ✨" },
      { text: "Already sleeping",        emoji: "😴", score: 3, tip: "Early sleep = happy hormones! 💤" },
    ],
  },
  {
    id: 2, emoji: "😰", category: "Stress",
    question: "You had a stressful day. What do you do?",
    options: [
      { text: "Eat something sweet", emoji: "🍫", score: 1, tip: "Try dark chocolate instead! 🍫" },
      { text: "Scroll social media",  emoji: "📱", score: 1, tip: "Consider a walk instead! 🚶‍♀️" },
      { text: "Yoga / Breathing",     emoji: "🧘", score: 4, tip: "Perfect stress-buster! 🌟" },
      { text: "Talk to a friend",     emoji: "💬", score: 3, tip: "Social support is powerful! 💕" },
    ],
  },
  {
    id: 3, emoji: "🥗", category: "Nutrition",
    question: "Your breakfast usually looks like…",
    options: [
      { text: "Coffee only",         emoji: "☕", score: 1, tip: "Try adding a fruit! 🍎" },
      { text: "Bread / quick snack", emoji: "🍞", score: 2, tip: "Add protein for energy! 💪" },
      { text: "Healthy meal",        emoji: "🥣", score: 4, tip: "You're fueling right! 🌟" },
      { text: "I skip breakfast",    emoji: "❌", score: 1, tip: "Even a smoothie helps! 🥤" },
    ],
  },
  {
    id: 4, emoji: "⚡", category: "Energy",
    question: "How do you usually feel during the day?",
    options: [
      { text: "Low energy most of time", emoji: "😴", score: 1, tip: "Small walks boost energy! 🚶" },
      { text: "Tired by evening",        emoji: "😐", score: 2, tip: "Try power naps! ⚡" },
      { text: "Mostly energetic",        emoji: "😊", score: 3, tip: "Keep up the great work! 🌸" },
      { text: "Very active all day",     emoji: "💪", score: 4, tip: "You're a powerhouse! 🔥" },
    ],
  },
  {
    id: 5, emoji: "🧠", category: "Mood",
    question: "How often do you feel mood swings?",
    options: [
      { text: "Very often",   emoji: "😣", score: 1, tip: "Journaling can help! 📝" },
      { text: "Sometimes",    emoji: "😕", score: 2, tip: "Mindfulness reduces swings! 🧘" },
      { text: "Rarely",       emoji: "🙂", score: 3, tip: "Great emotional balance! 💚" },
      { text: "Almost never", emoji: "✨", score: 4, tip: "Incredible self-awareness! 🌟" },
    ],
  },
];

const MAX_SCORE = 20;

function getZone(pct) {
  if (pct >= 80) return { label: "Thriving 🌟",   color: "#22c55e", bg: "rgba(34,197,94,0.1)",  advice: "Amazing! Your lifestyle strongly supports hormonal balance. Keep it up! You're an inspiration 💚" };
  if (pct >= 60) return { label: "Balanced 🌸",   color: "#f59e0b", bg: "rgba(245,158,11,0.1)", advice: "You're doing well! A few small tweaks to sleep and stress can elevate your wellness even more 🌸" };
  if (pct >= 40) return { label: "Needs Care 💛", color: "#f97316", bg: "rgba(249,115,22,0.1)", advice: "Your body is asking for attention. Focus on sleep, nutrition and stress management 💛" };
  return           { label: "Critical Zone 🆘",   color: "#ef4444", bg: "rgba(239,68,68,0.1)",  advice: "Your lifestyle needs significant changes. Let HerSpace guide you step by step — you've got this 💕" };
}

// ── ANALYZING SCREEN ──────────────────────────────────────────────────────────
function AnalyzingScreen() {
  const [msgIndex, setMsgIndex] = useState(0);
  const msgs = [
    "✨ Analyzing your lifestyle...",
    "🧬 Checking hormonal balance...",
    "💡 Generating wellness insights...",
    "🌸 Almost ready...",
  ];

  useEffect(() => {
    const t = setInterval(() => setMsgIndex((p) => (p + 1) % msgs.length), 600);
    return () => clearInterval(t);
  }, [msgs.length]);

  return (
    <div style={G.page}>
      <div style={G.overlay} />
      <style>{`
        @keyframes load    { 0%{width:0%} 100%{width:100%} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes fadeMsg { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
      <div style={{ ...G.card, textAlign: "center", zIndex: 2, position: "relative" }}>
        <div style={G.spinnerWrap}>
          <div style={G.spinner} />
          <div style={G.spinnerEmoji}>🔮</div>
        </div>
        <h2 style={{ ...G.cardTitle, marginBottom: "8px" }}>AI Analysis in Progress</h2>
        <p key={msgIndex} style={G.analyzeMsg}>{msgs[msgIndex]}</p>
        <div style={G.loaderBar}><div style={G.loaderFill} /></div>
        <div style={G.floatingEmojis}>
          {["🌸","💊","🧘","💧","🥗","⚡"].map((e, i) => (
            <span key={i} style={{ ...G.floatEmoji, animationDelay: `${i * 0.3}s` }}>{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BACKGROUND PARTICLES ──────────────────────────────────────────────────────
const PARTICLE_DATA = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  size: 6 + (i * 2.3) % 12,
  left: (i * 7.1) % 100,
  top: (i * 13.7) % 100,
  delay: (i * 0.7) % 8,
  duration: 4 + (i * 0.9) % 6,
  emoji: ["💗", "✨", "🌸", "💫", "🦋"][i % 5],
}));

function AssessmentParticles() {
  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      <style>{`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.5; }
          25% { transform: translateY(-20px) translateX(10px) scale(1.1); opacity: 0.7; }
          50% { transform: translateY(-10px) translateX(-15px) scale(0.9); opacity: 0.4; }
          75% { transform: translateY(-25px) translateX(5px) scale(1.05); opacity: 0.6; }
        }
        @keyframes glowOrb {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.3); opacity: 0.25; }
        }
      `}</style>
      {PARTICLE_DATA.map((p) => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.left}%`,
          top: `${p.top}%`,
          fontSize: `${p.size}px`,
          animation: `floatParticle ${p.duration}s ${p.delay}s ease-in-out infinite`,
          pointerEvents: "none",
        }}>
          {p.emoji}
        </div>
      ))}
      {[
        { left: "10%", top: "20%", size: 120, color: "rgba(224,108,159,0.15)", delay: 0 },
        { left: "80%", top: "60%", size: 100, color: "rgba(205,44,88,0.1)", delay: 2 },
        { left: "50%", top: "80%", size: 140, color: "rgba(248,187,208,0.2)", delay: 4 },
      ].map((orb, i) => (
        <div key={`orb-${i}`} style={{
          position: "absolute",
          left: orb.left,
          top: orb.top,
          width: `${orb.size}px`,
          height: `${orb.size}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orb.color}, transparent)`,
          animation: `glowOrb ${3 + i}s ${orb.delay}s ease-in-out infinite`,
          filter: "blur(20px)",
        }} />
      ))}
    </div>
  );
}

// ── ASSESSMENT GAME ───────────────────────────────────────────────────────────
function AssessmentGame({ userName, onFinish }) {
  const [current, setCurrent]       = useState(0);
  const [answers, setAnswers]       = useState([]);
  const [selected, setSelected]     = useState(null);
  const [analyzing, setAnalyzing]   = useState(false);
  const [sliding, setSliding]       = useState(false);
  const [flippedIdx, setFlippedIdx] = useState(null);

  const q        = QUESTIONS[current];
  const progress = (current / QUESTIONS.length) * 100;

  const encouragements = [
    "Let's get started! 🚀",
    "Nice choice! 🌟",
    "You're doing great! 💪",
    "Almost there! 🎯",
    "Last one! 🏁",
  ];

  function handleSelect(option, idx) {
    if (selected) return;
    setSelected(option);
    setFlippedIdx(idx);

    setTimeout(() => {
      const newAnswers = [...answers, option.score];
      if (current + 1 < QUESTIONS.length) {
        setSliding(true);
        setTimeout(() => {
          setAnswers(newAnswers);
          setCurrent(current + 1);
          setSelected(null);
          setFlippedIdx(null);
          setSliding(false);
        }, 400);
      } else {
        setAnalyzing(true);
        setTimeout(() => {
          const total = newAnswers.reduce((a, b) => a + b, 0);
          onFinish(total);
        }, 3000);
      }
    }, 900);
  }

  if (analyzing) return <AnalyzingScreen />;

  return (
    <div style={G.page}>
      <div style={G.overlay} />
      <AssessmentParticles />
      <style>{`
        @keyframes slideIn      { from{opacity:0;transform:translateX(60px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideOut     { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(-60px)} }
        @keyframes flipCardIn   { 0%{transform:perspective(600px) rotateY(-30deg);opacity:0} 100%{transform:perspective(600px) rotateY(0);opacity:1} }
        @keyframes bounceEmoji  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer      { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes fadeInBounce  { 0%{opacity:0;transform:translateY(10px)} 60%{transform:translateY(-3px)} 100%{opacity:1;transform:translateY(0)} }
        .slide-in  { animation: slideIn  0.35s ease forwards; }
        .slide-out { animation: slideOut 0.35s ease forwards; }
        .flip-hover:hover .flip-front {
          border-color: #CD2C58 !important;
          background: linear-gradient(135deg,#fce4ec,#f8bbd0) !important;
          box-shadow: 0 8px 24px rgba(205,44,88,0.2) !important;
        }
        .flip-hover:hover {
          transform: translateY(-3px) !important;
        }
      `}</style>

      <div style={{ ...G.card, zIndex: 2, position: "relative" }}>

        {/* Top bar */}
        <div style={G.topBar}>
          <div style={G.categoryBadge}>{q.emoji} {q.category}</div>
          <div style={G.questionCount}>
            {Array.from({ length: QUESTIONS.length }).map((_, i) => (
              <div key={i} style={{
                ...G.dot,
                background: i < current ? "#CD2C58" : i === current ? "#E06C9F" : "rgba(205,44,88,0.2)",
                transform: i === current ? "scale(1.3)" : "scale(1)",
              }} />
            ))}
          </div>
        </div>

        {/* Shimmer progress bar */}
        <div style={G.progressTrack}>
          <div style={{
            ...G.progressFill,
            width: `${progress}%`,
            background: "linear-gradient(90deg, #E06C9F, #CD2C58, #E06C9F, #CD2C58)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }} />
        </div>
        <div style={G.progressLabel}>
          Question {current + 1} of {QUESTIONS.length} &nbsp;·&nbsp; {Math.round(progress)}% complete
        </div>

        {/* Encouragement */}
        <div style={G.encouragementWrap}>
          <span key={current} style={G.encouragement}>{encouragements[current]}</span>
        </div>

        {/* Question */}
        <div className={sliding ? "slide-out" : "slide-in"} style={G.questionWrap}>
          <div style={{ ...G.questionEmoji, animation: "bounceEmoji 2s ease-in-out infinite" }}>{q.emoji}</div>
          <p style={G.question}>{q.question}</p>
        </div>

        {/* Options as flip cards */}
        <div className={sliding ? "slide-out" : "slide-in"} style={G.optionsGrid}>
          {q.options.map((opt, i) => {
            const isFlipped = flippedIdx === i;
            return (
              <div
                key={i}
                className={!isFlipped && !selected ? "flip-hover" : ""}
                onClick={() => handleSelect(opt, i)}
                style={{
                  ...G.flipCardWrapper,
                  animation: `flipCardIn 0.4s ${i * 0.1}s ease both`,
                }}
              >
                <div style={{
                  ...G.flipCardInner,
                  transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
                }}>
                  {/* Front */}
                  <div className="flip-front" style={G.flipCardFront}>
                    <div style={{
                      ...G.optionEmojiBubble,
                      background: "rgba(255,220,230,0.5)",
                    }}>
                      {opt.emoji}
                    </div>
                    <span style={G.optionText}>{opt.text}</span>
                  </div>
                  {/* Back */}
                  <div style={G.flipCardBack}>
                    <div style={G.flipCheckmark}>✓</div>
                    <span style={G.flipTip}>{opt.tip}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={G.footer}>
          <span style={G.footerText}>Hey {userName}! 🌸 Take your time</span>
          <span style={G.footerHint}>Tap any card to answer</span>
        </div>

      </div>
    </div>
  );
}

// ── RESULTS PAGE ──────────────────────────────────────────────────────────────
function ResultsPage({ score, userName, onRetake }) {
  const [show, setShow] = useState(false);
  const pct  = Math.round((score / MAX_SCORE) * 100);
  const zone = getZone(pct);

  useEffect(() => {
    setTimeout(() => setShow(true), 300);
  }, []);

  return (
    <div style={G.page}>
      <div style={G.overlay} />
      <style>{`
        @keyframes fadeUp   { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes barGrow  { from{width:0%} to{width:var(--w)} }
        @keyframes confetti { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100px) rotate(720deg);opacity:0} }
        @keyframes scoreIn  { from{transform:scale(0.5);opacity:0} to{transform:scale(1);opacity:1} }
        .fade-up { animation: fadeUp 0.6s ease forwards; }
      `}</style>

      {/* Confetti */}
      <div style={G.confettiWrap}>
        {["🌸","✨","💕","🌟","🎊","💮","🌺"].map((e, i) => (
          <span key={i} style={{
            position: "absolute",
            left: `${10 + i * 13}%`,
            top: "-20px",
            fontSize: "20px",
            animation: `confetti ${1.5 + i * 0.2}s ease ${i * 0.1}s forwards`,
          }}>{e}</span>
        ))}
      </div>

      <div style={{ ...G.card, textAlign: "center", zIndex: 2, position: "relative", maxWidth: "520px" }}>

        {/* Header */}
        <div className="fade-up" style={{ animationDelay: "0s" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>🎉</div>
          <h2 style={G.cardTitle}>Your Wellness Results</h2>
          <p style={{ color: "#888", marginBottom: "24px", fontSize: "14px" }}>
            Great job, <strong style={{ color: "#CD2C58" }}>{userName}</strong>! Here's your PCOD wellness analysis 💕
          </p>
        </div>

        {/* Score circle */}
        <div className="fade-up" style={{ animationDelay: "0.2s" }}>
          <div style={{ ...G.scoreCircle, borderColor: zone.color, animation: show ? "scoreIn 0.6s ease 0.3s both" : "none" }}>
            <div style={{ fontSize: "36px", fontWeight: "900", color: zone.color }}>{pct}%</div>
            <div style={{ fontSize: "11px", color: "#aaa", marginTop: "2px" }}>Health Score</div>
          </div>
          <div style={{ ...G.zoneBadge, background: `linear-gradient(135deg, ${zone.color}, ${zone.color}cc)` }}>
            {zone.label}
          </div>
        </div>

        {/* Category bars */}
        <div className="fade-up" style={{ textAlign: "left", marginBottom: "20px", animationDelay: "0.4s" }}>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "#CD2C58", marginBottom: "12px" }}>📊 Wellness Breakdown</p>
          {QUESTIONS.map((q, i) => {
            const barW = show ? `${pct}%` : "0%";
            return (
              <div key={i} style={G.barRow}>
                <span style={G.barLabel}>{q.emoji} {q.category}</span>
                <div style={G.barTrack}>
                  <div style={{
                    ...G.barFill,
                    background: zone.color,
                    width: barW,
                    transition: `width 1s ease ${0.5 + i * 0.15}s`,
                  }} />
                </div>
                <span style={{ ...G.barPct, color: zone.color }}>{pct}%</span>
              </div>
            );
          })}
        </div>

        {/* Advice card */}
        <div className="fade-up" style={{ ...G.adviceCard, background: zone.bg, borderColor: zone.color, animationDelay: "0.6s" }}>
          <div style={{ fontSize: "24px", marginBottom: "8px" }}>💡</div>
          <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.7, margin: 0 }}>{zone.advice}</p>
        </div>

        {/* Tips */}
        <div className="fade-up" style={{ ...G.tipsBox, animationDelay: "0.7s" }}>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "#CD2C58", marginBottom: "10px" }}>🌸 Your Action Plan</p>
          {pct < 60 && <p style={G.tip}>💧 Drink 8 glasses of water daily</p>}
          {pct < 70 && <p style={G.tip}>🌙 Sleep by 10:30 PM for hormone balance</p>}
          {pct < 80 && <p style={G.tip}>🧘 Try 5 min breathing exercise daily</p>}
          <p style={G.tip}>🥗 Add more whole foods to your diet</p>
        </div>

        {/* Buttons */}
        <div className="fade-up" style={{ display: "flex", gap: "12px", animationDelay: "0.8s" }}>
          <button onClick={onRetake} style={G.retakeBtn}>🔄 Retake</button>
          <button style={G.primaryBtn}>📊 View Dashboard</button>
        </div>

      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function Assessment() {
  const [screen, setScreen] = useState("signup");
  const [user, setUser]     = useState(null);
  const [score, setScore]   = useState(0);

  return (
    <>
      {screen === "signup" && (
        <Signup
          onSignUp={(f) => { setUser(f); setScreen("game"); }}
          onGoLogin={() => setScreen("login")}
        />
      )}
      {screen === "login" && (
        <Login
          onLogin={(f) => { setUser({ name: f.email.split("@")[0], ...f }); setScreen("game"); }}
          onGoSignup={() => setScreen("signup")}
        />
      )}
      {screen === "game" && (
        <AssessmentGame
          userName={user?.name || "Beautiful"}
          onFinish={(t) => { setScore(t); setScreen("results"); }}
        />
      )}
      {screen === "results" && (
        <ResultsPage
          score={score}
          userName={user?.name || "Beautiful"}
          onRetake={() => setScreen("game")}
        />
      )}
    </>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const G = {
  page: {
    minHeight: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover", backgroundPosition: "center",
    backgroundAttachment: "fixed", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif", position: "relative",
    padding: "40px 20px",
  },
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(255,220,220,0.55)",
    backdropFilter: "blur(10px)", zIndex: 0,
  },
  card: {
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(24px)",
    borderRadius: "32px", padding: "40px 36px",
    maxWidth: "480px", width: "100%",
    boxShadow: "0 24px 64px rgba(205,44,88,0.2)",
    border: "1px solid rgba(255,255,255,0.95)",
  },
  cardTitle: { fontSize: "24px", fontWeight: "900", color: "#1a1a2e", margin: "0 0 6px" },

  // Top bar
  topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" },
  categoryBadge: {
    background: "linear-gradient(135deg,#fce4ec,#f8bbd0)",
    color: "#CD2C58", fontWeight: "800", fontSize: "13px",
    padding: "6px 14px", borderRadius: "20px",
    border: "1px solid rgba(205,44,88,0.2)",
  },
  questionCount: { display: "flex", gap: "6px", alignItems: "center" },
  dot: { width: "8px", height: "8px", borderRadius: "50%", transition: "all 0.3s ease" },

  // Progress
  progressTrack: { height: "10px", background: "rgba(205,44,88,0.1)", borderRadius: "10px", overflow: "hidden", marginBottom: "6px" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#E06C9F,#CD2C58)", borderRadius: "10px", transition: "width 0.5s ease" },
  progressLabel: { fontSize: "12px", color: "#aaa", textAlign: "right", marginBottom: "24px" },

  // Question
  questionWrap: { marginBottom: "20px" },
  questionEmoji: { fontSize: "40px", marginBottom: "10px" },
  question: { fontSize: "20px", fontWeight: "800", color: "#1a1a2e", lineHeight: 1.4, margin: 0 },

  // Options
  optionsGrid: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" },
  flipCardWrapper: {
    perspective: "800px", cursor: "pointer", height: "72px",
    transition: "transform 0.25s ease",
  },
  flipCardInner: {
    position: "relative", width: "100%", height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
  },
  flipCardFront: {
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", gap: "14px",
    padding: "14px 16px",
    border: "2px solid rgba(205,44,88,0.15)",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.7)",
    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
    boxShadow: "0 2px 8px rgba(205,44,88,0.06)",
    transition: "all 0.25s ease",
  },
  flipCardBack: {
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center", gap: "12px",
    padding: "14px 16px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, #E06C9F, #CD2C58)",
    backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
    transform: "rotateX(180deg)",
    boxShadow: "0 6px 20px rgba(205,44,88,0.3)",
  },
  flipCheckmark: {
    width: "32px", height: "32px", borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px", color: "white", fontWeight: "900", flexShrink: 0,
  },
  flipTip: { fontSize: "14px", color: "white", fontWeight: "600" },
  optionEmojiBubble: {
    width: "44px", height: "44px", borderRadius: "14px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "22px", flexShrink: 0, transition: "background 0.2s",
  },
  optionText: { fontSize: "14px", fontWeight: "600", flex: 1, color: "#333" },
  encouragementWrap: { textAlign: "center", marginBottom: "8px" },
  encouragement: {
    display: "inline-block", fontSize: "13px", color: "#CD2C58", fontWeight: "700",
    padding: "5px 16px", borderRadius: "20px",
    background: "linear-gradient(135deg, rgba(252,228,236,0.6), rgba(248,187,208,0.4))",
    animation: "fadeInBounce 0.5s ease forwards",
  },

  // Footer
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  footerText: { fontSize: "13px", color: "#aaa" },
  footerHint: { fontSize: "11px", color: "rgba(205,44,88,0.5)", fontStyle: "italic" },

  // Analyzing
  spinnerWrap: { position: "relative", width: "80px", height: "80px", margin: "0 auto 20px" },
  spinner: {
    width: "80px", height: "80px", borderRadius: "50%",
    border: "4px solid rgba(205,44,88,0.15)",
    borderTop: "4px solid #CD2C58",
    animation: "spin 1s linear infinite",
    position: "absolute",
  },
  spinnerEmoji: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" },
  analyzeMsg: { fontSize: "15px", color: "#CD2C58", fontWeight: "600", marginBottom: "20px", animation: "fadeMsg 0.4s ease forwards" },
  loaderBar: { height: "8px", background: "rgba(205,44,88,0.12)", borderRadius: "10px", overflow: "hidden", marginBottom: "24px" },
  loaderFill: { height: "100%", background: "linear-gradient(90deg,#E06C9F,#CD2C58)", borderRadius: "10px", animation: "load 3s ease forwards" },
  floatingEmojis: { display: "flex", justifyContent: "center", gap: "12px" },
  floatEmoji: { fontSize: "20px", animation: "float 2s ease-in-out infinite" },

  // Results
  confettiWrap: { position: "fixed", top: 0, left: 0, width: "100%", pointerEvents: "none", zIndex: 10 },
  scoreCircle: {
    width: "140px", height: "140px", borderRadius: "50%",
    border: "6px solid", margin: "0 auto 16px",
    display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    background: "rgba(255,255,255,0.8)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  },
  zoneBadge: {
    display: "inline-block", padding: "10px 28px",
    borderRadius: "30px", color: "white",
    fontWeight: "800", fontSize: "15px", marginBottom: "24px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  },
  barRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" },
  barLabel: { fontSize: "12px", color: "#666", width: "85px", flexShrink: 0 },
  barTrack: { flex: 1, height: "10px", background: "rgba(205,44,88,0.08)", borderRadius: "10px", overflow: "hidden" },
  barFill: { height: "100%", borderRadius: "10px", width: "0%", transition: "width 1s ease" },
  barPct: { fontSize: "11px", fontWeight: "700", width: "32px", textAlign: "right", flexShrink: 0 },

  adviceCard: {
    borderRadius: "20px", padding: "20px",
    marginBottom: "16px", border: "1px solid",
    textAlign: "center",
  },
  tipsBox: {
    background: "rgba(255,220,230,0.3)",
    borderRadius: "16px", padding: "16px 20px",
    marginBottom: "20px", textAlign: "left",
    border: "1px solid rgba(205,44,88,0.1)",
  },
  tip: { fontSize: "13px", color: "#555", marginBottom: "6px", lineHeight: 1.5 },

  primaryBtn: {
    flex: 1, padding: "13px", border: "none",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#E06C9F,#CD2C58)",
    color: "white", fontWeight: "700", fontSize: "14px",
    cursor: "pointer", boxShadow: "0 6px 20px rgba(205,44,88,0.35)",
  },
  retakeBtn: {
    flex: 1, padding: "13px",
    border: "2px solid #CD2C58", borderRadius: "16px",
    background: "transparent", color: "#CD2C58",
    fontWeight: "700", fontSize: "14px", cursor: "pointer",
  },
};