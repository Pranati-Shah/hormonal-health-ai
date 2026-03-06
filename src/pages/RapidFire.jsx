import React, { useState } from "react";
import dashBg from "../assets/dashboard.png";

// ── QUESTIONS PER AGE GROUP ────────────────────────────────────────────────────
const QUESTIONS = {
  teen: [
    {
      id: 1, q: "How do you usually feel after school?", emoji: "🎒",
      options: [
        { label: "Completely drained, need to lie down", emoji: "😩", color: "red" },
        { label: "Tired but still able to do things",    emoji: "😐", color: "green" },
        { label: "Fine but emotionally sensitive",       emoji: "💜", color: "purple" },
        { label: "Still energetic",                      emoji: "⚡", color: "blue" },
      ],
    },
    {
      id: 2, q: "How regular is your sleep schedule?", emoji: "🌙",
      options: [
        { label: "Very irregular (late nights, scrolling)", emoji: "😵",  color: "red" },
        { label: "I try but it's inconsistent",             emoji: "🤷‍♀️", color: "green" },
        { label: "I sleep but wake easily or unrested",     emoji: "😟",  color: "purple" },
        { label: "Mostly consistent and refreshing",        emoji: "😴",  color: "blue" },
      ],
    },
    {
      id: 3, q: "How does academic pressure affect you?", emoji: "📚",
      options: [
        { label: "I feel overwhelmed or shut down",  emoji: "🥺", color: "red" },
        { label: "I procrastinate or lose routine",  emoji: "😓", color: "green" },
        { label: "I become emotionally sensitive",   emoji: "💔", color: "purple" },
        { label: "I handle it fairly well",          emoji: "💪", color: "blue" },
      ],
    },
    {
      id: 4, q: "How does your body feel around your period?", emoji: "🌸",
      options: [
        { label: "Very painful or exhausting",           emoji: "😣", color: "red" },
        { label: "Uncomfortable but manageable",         emoji: "😌", color: "green" },
        { label: "Mood swings or emotional sensitivity", emoji: "🌊", color: "purple" },
        { label: "Mostly normal",                        emoji: "✅", color: "blue" },
      ],
    },
    {
      id: 5, q: "What do you feel you need most right now?", emoji: "💭",
      options: [
        { label: "More rest and calm",      emoji: "🛌", color: "red" },
        { label: "Better daily habits",     emoji: "📅", color: "green" },
        { label: "Emotional balance",       emoji: "💞", color: "purple" },
        { label: "Growth and improvement",  emoji: "🚀", color: "blue" },
      ],
    },
  ],

  young: [
    {
      id: 1, q: "How are your energy levels most days?", emoji: "🔋",
      options: [
        { label: "Constantly exhausted", emoji: "😩", color: "red" },
        { label: "Up and down",          emoji: "📉", color: "green" },
        { label: "Low around periods",   emoji: "🌊", color: "purple" },
        { label: "Stable",               emoji: "⚡", color: "blue" },
      ],
    },
    {
      id: 2, q: "How structured is your daily routine?", emoji: "📋",
      options: [
        { label: "No real routine",                       emoji: "🌀",  color: "red" },
        { label: "I try but it's inconsistent",           emoji: "🤷‍♀️", color: "green" },
        { label: "Mostly consistent but stress disrupts", emoji: "😓",  color: "purple" },
        { label: "Very structured",                       emoji: "✅",  color: "blue" },
      ],
    },
    {
      id: 3, q: "How does stress affect your body?", emoji: "😰",
      options: [
        { label: "I crash physically or mentally",     emoji: "💢",  color: "red" },
        { label: "I lose discipline in habits",        emoji: "😞",  color: "green" },
        { label: "I notice PMS, acne or mood changes", emoji: "🌸",  color: "purple" },
        { label: "I manage stress well",               emoji: "🧘‍♀️", color: "blue" },
      ],
    },
    {
      id: 4, q: "How balanced is your lifestyle right now?", emoji: "⚖️",
      options: [
        { label: "Very unhealthy habits",           emoji: "🍔", color: "red" },
        { label: "Trying but inconsistent",         emoji: "🤞", color: "green" },
        { label: "Healthy but sensitive to stress", emoji: "😌", color: "purple" },
        { label: "Balanced and stable",             emoji: "💫", color: "blue" },
      ],
    },
    {
      id: 5, q: "What is your biggest wellness goal?", emoji: "🎯",
      options: [
        { label: "Recover balance",             emoji: "🌺", color: "red" },
        { label: "Build consistent habits",     emoji: "📅", color: "green" },
        { label: "Reduce hormonal sensitivity", emoji: "💜", color: "purple" },
        { label: "Optimize health",             emoji: "🚀", color: "blue" },
      ],
    },
  ],

  adult: [
    {
      id: 1, q: "How do you usually feel by the end of the day?", emoji: "🌆",
      options: [
        { label: "Completely drained",    emoji: "😮‍💨", color: "red" },
        { label: "Tired but manageable",  emoji: "😐",   color: "green" },
        { label: "Emotionally sensitive", emoji: "💜",   color: "purple" },
        { label: "Still productive",      emoji: "⚡",   color: "blue" },
      ],
    },
    {
      id: 2, q: "How consistent are your wellness habits?", emoji: "🏃‍♀️",
      options: [
        { label: "Very inconsistent",                     emoji: "🌀",  color: "red" },
        { label: "I try but struggle to maintain",        emoji: "😓",  color: "green" },
        { label: "Mostly consistent but stress disrupts", emoji: "🤷‍♀️", color: "purple" },
        { label: "Very consistent",                       emoji: "✅",  color: "blue" },
      ],
    },
    {
      id: 3, q: "How does stress affect your health?", emoji: "🧠",
      options: [
        { label: "I feel burned out quickly",            emoji: "🔥", color: "red" },
        { label: "It disrupts my routine",               emoji: "📉", color: "green" },
        { label: "It triggers PMS or hormonal symptoms", emoji: "🌸", color: "purple" },
        { label: "I handle it well",                     emoji: "💪", color: "blue" },
      ],
    },
    {
      id: 4, q: "How is your sleep quality?", emoji: "🛌",
      options: [
        { label: "Poor and irregular", emoji: "😵", color: "red" },
        { label: "Inconsistent",       emoji: "😟", color: "green" },
        { label: "Light or sensitive", emoji: "😌", color: "purple" },
        { label: "Deep and stable",    emoji: "😴", color: "blue" },
      ],
    },
    {
      id: 5, q: "What feels most true for you now?", emoji: "💭",
      options: [
        { label: "I need recovery",              emoji: "🌺", color: "red" },
        { label: "I need better rhythm",         emoji: "📅", color: "green" },
        { label: "I need hormonal balance",      emoji: "💜", color: "purple" },
        { label: "I want to optimize my health", emoji: "🚀", color: "blue" },
      ],
    },
  ],

  hormonal: [
    {
      id: 1, q: "How are your energy levels throughout the day?", emoji: "🔋",
      options: [
        { label: "Low most of the day",             emoji: "😩", color: "red" },
        { label: "Good morning but drop later",     emoji: "📉", color: "green" },
        { label: "Okay but emotionally sensitive",  emoji: "💜", color: "purple" },
        { label: "Stable and energetic",            emoji: "⚡", color: "blue" },
      ],
    },
    {
      id: 2, q: "How has your sleep been recently?", emoji: "🌙",
      options: [
        { label: "Poor sleep or frequent waking", emoji: "😵", color: "red" },
        { label: "Sleep but wake feeling tired",  emoji: "😟", color: "green" },
        { label: "Light or sensitive sleep",      emoji: "😌", color: "purple" },
        { label: "Deep and refreshing sleep",     emoji: "😴", color: "blue" },
      ],
    },
    {
      id: 3, q: "How does stress affect you now?", emoji: "🌊",
      options: [
        { label: "I feel physically exhausted",      emoji: "💢",  color: "red" },
        { label: "It disrupts my routine or habits", emoji: "📉",  color: "green" },
        { label: "It affects my mood or hormones",   emoji: "🌸",  color: "purple" },
        { label: "I manage stress quite well",       emoji: "🧘‍♀️", color: "blue" },
      ],
    },
    {
      id: 4, q: "How would you describe your body changes recently?", emoji: "🌺",
      options: [
        { label: "More fatigue and low stamina",  emoji: "😮‍💨", color: "red" },
        { label: "Weight or metabolism changes",  emoji: "⚖️",  color: "green" },
        { label: "Hormonal or mood fluctuations", emoji: "🌊",  color: "purple" },
        { label: "No major changes",              emoji: "✅",  color: "blue" },
      ],
    },
    {
      id: 5, q: "What feels most important for your wellness right now?", emoji: "💭",
      options: [
        { label: "Rest and recovery",    emoji: "🛌", color: "red" },
        { label: "Better daily balance", emoji: "📅", color: "green" },
        { label: "Hormonal stability",   emoji: "💜", color: "purple" },
        { label: "Long-term vitality",   emoji: "🚀", color: "blue" },
      ],
    },
  ],
};

// ── COLOR MAP ─────────────────────────────────────────────────────────────────
const COLOR_STYLES = {
  red:    { bg:"rgba(220,60,100,0.1)",  border:"rgba(220,60,100,0.3)",  sel:"linear-gradient(135deg,#dc3c64,#c45e8a)", dot:"#dc3c64", flood:"rgba(220,60,100,0.18)" },
  green:  { bg:"rgba(91,158,138,0.1)", border:"rgba(91,158,138,0.3)", sel:"linear-gradient(135deg,#5b9e8a,#4a8fa8)", dot:"#5b9e8a", flood:"rgba(91,158,138,0.18)" },
  purple: { bg:"rgba(124,92,191,0.1)", border:"rgba(124,92,191,0.3)", sel:"linear-gradient(135deg,#7c5cbf,#b565a7)", dot:"#7c5cbf", flood:"rgba(124,92,191,0.18)" },
  blue:   { bg:"rgba(74,127,193,0.1)", border:"rgba(74,127,193,0.3)", sel:"linear-gradient(135deg,#4a7fc1,#5b8fd4)", dot:"#4a7fc1", flood:"rgba(74,127,193,0.18)" },
};

// ── RESULT LOGIC ──────────────────────────────────────────────────────────────
function getResult(picks) {
  const counts = { red:0, green:0, purple:0, blue:0 };
  picks.forEach(c => { counts[c] = (counts[c] || 0) + 1; });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const MAP = {
    red: {
      zone: "Stabilize & Recover 🌸", color: "#dc3c64",
      bg: "linear-gradient(135deg,rgba(220,60,100,0.15),rgba(196,94,138,0.15))",
      border: "rgba(220,60,100,0.35)", floodColor: "rgba(220,60,100,0.12)",
      msg: "Your body is asking for deep rest and recovery. Focus on gentle movement, nourishing food, and stress relief to restore your hormonal balance.",
      actions: ["😴 Prioritize 8+ hrs sleep", "🥗 Anti-inflammatory meals", "🧘‍♀️ Daily 10-min meditation"],
    },
    green: {
      zone: "Build Consistency 💎", color: "#5b9e8a",
      bg: "linear-gradient(135deg,rgba(91,158,138,0.15),rgba(74,127,193,0.15))",
      border: "rgba(91,158,138,0.35)", floodColor: "rgba(91,158,138,0.12)",
      msg: "You're on the right track but need stronger habits. Consistency in sleep, meals and movement will make a huge difference.",
      actions: ["🏋️ Exercise 3x per week", "🥙 Meal prep on Sundays", "📅 Track your cycle"],
    },
    purple: {
      zone: "Support Sensitivity 🌺", color: "#7c5cbf",
      bg: "linear-gradient(135deg,rgba(124,92,191,0.15),rgba(181,101,167,0.15))",
      border: "rgba(124,92,191,0.35)", floodColor: "rgba(124,92,191,0.12)",
      msg: "Your system is hormonally sensitive right now. Embrace calming routines, mindful eating and gentle stress management.",
      actions: ["☀️ Morning sunlight daily", "🥜 Magnesium-rich foods", "📓 Daily journaling"],
    },
    blue: {
      zone: "Maintain & Optimize ✨", color: "#4a7fc1",
      bg: "linear-gradient(135deg,rgba(74,127,193,0.15),rgba(91,158,138,0.15))",
      border: "rgba(74,127,193,0.35)", floodColor: "rgba(74,127,193,0.12)",
      msg: "You're thriving! Keep your excellent habits going and explore advanced wellness practices like cycle syncing.",
      actions: ["✅ Continue current habits", "🌀 Try cycle syncing", "🩺 Schedule annual checkup"],
    },
  };
  return { ...MAP[top], topColor: top };
}

// ── AGE LABEL MAP ─────────────────────────────────────────────────────────────
const AGE_LABEL = {
  teen:     { label: "Teens (13–17)",               emoji: "🌱" },
  young:    { label: "Young Adults (18–25)",         emoji: "✨" },
  adult:    { label: "Adults (26–35)",               emoji: "💎" },
  hormonal: { label: "Hormone Balance Stage (35+)",  emoji: "🌸" },
};

// ── CONFETTI ──────────────────────────────────────────────────────────────────
function Confetti() {
  const pieces = Array.from({ length: 38 }, (_, i) => ({
    id: i,
    left: `${(i * 7.3) % 100}%`,
    delay: `${(i * 0.08) % 1.2}s`,
    duration: `${1.2 + (i * 0.07) % 1}s`,
    size: `${6 + (i * 2) % 8}px`,
    rotate: `${(i * 37) % 360}deg`,
    colors: ["#b565a7","#7c5cbf","#4a7fc1","#5b9e8a","#dc3c64","#f5c842","#e88ab8","#7ab3e8"],
    shape: i % 3,
  }));

  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:100, overflow:"hidden" }}>
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        @keyframes confettiSway {
          0%,100% { margin-left: 0px; }
          25%     { margin-left: 18px; }
          75%     { margin-left: -18px; }
        }
      `}</style>
      {pieces.map(p => (
        <div key={p.id} style={{
          position:"absolute", top:"-20px", left: p.left,
          width: p.size, height: p.size,
          background: p.colors[p.id % p.colors.length],
          borderRadius: p.shape === 0 ? "50%" : p.shape === 1 ? "2px" : "0",
          animation: `confettiFall ${p.duration} ${p.delay} ease-in forwards, confettiSway ${p.duration} ${p.delay} ease-in-out infinite`,
          transform: `rotate(${p.rotate})`,
          opacity: 0,
        }} />
      ))}
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function RapidFire({ userData, onFinish }) {
  const ageKey    = userData?.ageGroup?.value || "young";
  const userName  = userData?.name || "you";
  const questions = QUESTIONS[ageKey] || QUESTIONS.young;
  const ageInfo   = AGE_LABEL[ageKey] || AGE_LABEL.young;

  const [stage,      setStage]      = useState("intro");
  const [qIndex,     setQIndex]     = useState(0);
  const [picks,      setPicks]      = useState([]);       // color string per Q
  const [selected,   setSelected]   = useState(null);
  const [direction,  setDirection]  = useState("next");
  const [animKey,    setAnimKey]    = useState(0);
  const [result,     setResult]     = useState(null);
  const [flooding,   setFlooding]   = useState(false);
  const [floodColor, setFloodColor] = useState("transparent");
  const [showConfetti, setShowConfetti] = useState(false);

  const current  = questions[qIndex];
  const total    = questions.length;
  const progressPct = Math.round((qIndex / total) * 100);

  // ── SELECT ANSWER ──
  const handleSelect = (opt) => {
    if (selected !== null) return;
    setSelected(opt.color);

    setTimeout(() => {
      const newPicks = [...picks, opt.color];
      if (qIndex + 1 < total) {
        setPicks(newPicks);
        setSelected(null);
        setDirection("next");
        setAnimKey(k => k + 1);
        setQIndex(q => q + 1);
      } else {
        // last Q → compute result → flood animation → reveal
        const res = getResult(newPicks);
        setResult(res);
        setStage("flooding");
        setFloodColor(res.floodColor);
        setFlooding(true);
        setTimeout(() => {
          setStage("result");
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3200);
        }, 1400);
      }
    }, 500);
  };

  // ── PREV ──
  const handlePrev = () => {
    if (qIndex === 0) { setStage("intro"); return; }
    const newPicks = picks.slice(0, -1);
    setPicks(newPicks);
    setSelected(null);
    setDirection("prev");
    setAnimKey(k => k + 1);
    setQIndex(q => q - 1);
  };

  return (
    <div style={{
      ...S.root,
      background: flooding ? floodColor : "#ede0f7",
      transition: "background 1.2s ease",
    }}>
      <div style={S.bgImage} />
      <div style={S.bgOverlay} />

      {/* confetti */}
      {showConfetti && result && <Confetti />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=Nunito:wght@600;700;800;900&display=swap');
        @keyframes slideInNext { from{opacity:0;transform:translateX(52px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes slideInPrev { from{opacity:0;transform:translateX(-52px)} to{opacity:1;transform:translateX(0)} }
        @keyframes popIn       { from{opacity:0;transform:scale(0.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes starTwinkle { 0%,100%{opacity:0;transform:scale(0.3)} 50%{opacity:1;transform:scale(1.2)} }
        @keyframes bigSparkle  { 0%,100%{opacity:0;transform:scale(0) rotate(0deg)} 40%{opacity:0.9;transform:scale(1.3) rotate(45deg)} }
        @keyframes floodPulse  { 0%{opacity:0.6} 50%{opacity:1} 100%{opacity:0.8} }
        @keyframes zoneReveal  { 0%{opacity:0;transform:scale(0.7) translateY(30px)} 60%{transform:scale(1.05) translateY(-4px)} 100%{opacity:1;transform:scale(1) translateY(0)} }

        .intro-anim  { animation: popIn        0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .q-next      { animation: slideInNext  0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .q-prev      { animation: slideInPrev  0.38s cubic-bezier(0.22,1,0.36,1) both; }
        .res-pop     { animation: zoneReveal   0.7s cubic-bezier(0.34,1.56,0.64,1) both; }
        .opt-card    { transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1); border: none; }
        .opt-card:hover { transform: translateY(-4px) scale(1.03) !important; }
        .start-btn:hover  { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(148,108,210,0.5) !important; }
        .finish-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(148,108,210,0.5) !important; }
        .prev-btn:hover   { background: rgba(181,101,167,0.18) !important; }
      `}</style>

      {/* sparkles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position:"fixed", pointerEvents:"none", zIndex:2,
          top:`${(i*17.3)%95}%`, left:`${(i*13.7)%95}%`,
          fontSize:`${10+(i*3)%10}px`,
          animation:`${i%2===0?"bigSparkle":"starTwinkle"} ${3+(i*0.6)%4}s ${(i*0.5)%7}s ease-in-out infinite`,
          opacity:0,
        }}>{i%3===0?"✨":i%3===1?"⭐":"💫"}</div>
      ))}

      <div style={S.page}>
        <div style={S.card}>

          {/* ══ INTRO SCREEN ══ */}
          {stage === "intro" && (
            <div className="intro-anim" style={{ textAlign:"center", padding:"10px 0" }}>
              <div style={{ fontSize:"52px", marginBottom:"14px" }}>🔥</div>
              <div style={S.badge}>⚡ Rapid Fire Check-in</div>
              <h1 style={S.introTitle}>Quick check-in, {userName}!</h1>
              <p style={S.introSub}>
                Answer these rapid-fire questions so we can understand your wellness needs and guide you to the right zone. ✨
              </p>
              <div style={S.agePill}>
                <span style={{ fontSize:"20px" }}>{ageInfo.emoji}</span>
                <span style={{ fontSize:"13px", fontWeight:"800", color:"#7c5cbf", fontFamily:"'Nunito',sans-serif" }}>
                  {ageInfo.label}
                </span>
              </div>
              <div style={S.statsRow}>
                {[
                  { emoji:"❓", val:"5",      label:"Questions" },
                  { emoji:"⏱️", val:"~2 min", label:"Duration" },
                  { emoji:"🎯", val:"4",      label:"Zones" },
                ].map((s, i) => (
                  <div key={i} style={S.statBox}>
                    <div style={{ fontSize:"22px" }}>{s.emoji}</div>
                    <div style={{ fontSize:"16px", fontWeight:"900", color:"#2d1a4a", fontFamily:"'Nunito',sans-serif" }}>{s.val}</div>
                    <div style={{ fontSize:"11px", color:"#9b7cc0", fontWeight:"700" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <button className="start-btn" onClick={() => setStage("quiz")} style={S.startBtn}>
                Let's Go 🚀
              </button>
            </div>
          )}

          {/* ══ FLOODING SCREEN ══ */}
          {stage === "flooding" && (
            <div style={{ textAlign:"center", padding:"40px 0", animation:"floodPulse 1.2s ease infinite" }}>
              <div style={{ fontSize:"60px", marginBottom:"16px" }}>⏳</div>
              <p style={{ fontFamily:"'Nunito',sans-serif", fontSize:"18px", fontWeight:"900", color:"#2d1a4a" }}>
                Calculating your zone…
              </p>
            </div>
          )}

          {/* ══ QUIZ SCREEN ══ */}
          {stage === "quiz" && (
            <>
              {/* top bar: prev + progress % + badge */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"14px" }}>
                <button className="prev-btn" onClick={handlePrev} style={S.prevBtn}>
                  ← Prev
                </button>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"2px" }}>
                  <div style={{ fontSize:"11px", fontWeight:"800", color:"#b565a7", fontFamily:"'Nunito',sans-serif" }}>
                    {qIndex + 1} / {total}
                  </div>
                  <div style={{ fontSize:"11px", fontWeight:"700", color:"#9b7cc0", fontFamily:"'Nunito',sans-serif" }}>
                    {progressPct}% done
                  </div>
                </div>
                <div style={S.badge}>🔥 Rapid Fire</div>
              </div>

              {/* progress bar */}
              <div style={{ height:"6px", background:"rgba(181,101,167,0.15)", borderRadius:"10px", marginBottom:"22px", overflow:"hidden" }}>
                <div style={{
                  height:"100%", borderRadius:"10px",
                  background:"linear-gradient(90deg,#b565a7,#7c5cbf,#4a7fc1)",
                  width:`${progressPct}%`, transition:"width 0.4s ease",
                }} />
              </div>

              {/* question with slide direction */}
              <div key={animKey} className={direction === "next" ? "q-next" : "q-prev"}>
                <div style={{ textAlign:"center", marginBottom:"20px" }}>
                  <div style={{ fontSize:"36px", marginBottom:"10px" }}>{current.emoji}</div>
                  <h2 style={{ fontFamily:"'Nunito',sans-serif", fontSize:"clamp(14px,2.5vw,17px)", fontWeight:"900", color:"#2d1a4a", margin:0, lineHeight:1.45 }}>
                    {current.q}
                  </h2>
                </div>

                {/* 2×2 grid */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"11px" }}>
                  {current.options.map((opt, i) => {
                    const cs       = COLOR_STYLES[opt.color];
                    const isPicked = selected !== null && opt.color === selected;
                    const isDimmed = selected !== null && opt.color !== selected;
                    // if we went back and this Q already has an answer, highlight it
                    const prevPick = selected === null && picks[qIndex] === opt.color;
                    return (
                      <button
                        key={i}
                        className="opt-card"
                        onClick={() => handleSelect(opt)}
                        style={{
                          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                          gap:"7px", padding:"16px 10px", borderRadius:"18px",
                          background: (isPicked || prevPick) ? cs.sel : cs.bg,
                          border:`1.5px solid ${isDimmed ? "rgba(181,101,167,0.08)" : cs.border}`,
                          boxShadow: (isPicked || prevPick) ? `0 6px 24px ${cs.border}` : "0 2px 10px rgba(181,101,167,0.07)",
                          opacity: isDimmed ? 0.38 : 1,
                          transform: (isPicked || prevPick) ? "scale(1.04)" : "scale(1)",
                          transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                          backdropFilter:"blur(8px)",
                          cursor: selected !== null ? "default" : "pointer",
                        }}
                      >
                        <span style={{ fontSize:"26px" }}>{opt.emoji}</span>
                        <span style={{
                          fontSize:"11.5px", fontWeight:"800",
                          color: (isPicked || prevPick) ? "#fff" : "#3d2060",
                          fontFamily:"'Nunito',sans-serif",
                          textAlign:"center", lineHeight:1.35,
                        }}>{opt.label}</span>
                        <div style={{ width:"7px", height:"7px", borderRadius:"50%", background: (isPicked || prevPick) ? "rgba(255,255,255,0.65)" : cs.dot, marginTop:"2px" }} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ textAlign:"center", marginTop:"16px", fontSize:"12px", color:"#9b7cc0", fontWeight:"700", fontFamily:"'Nunito',sans-serif" }}>
                You're doing amazing, {userName}! ✨
              </div>
            </>
          )}

          {/* ══ RESULT SCREEN ══ */}
          {stage === "result" && result && (
            <div className="res-pop" style={{ textAlign:"center", padding:"8px 0" }}>
              <div style={{ fontSize:"54px", marginBottom:"10px" }}>🎉</div>
              <div style={{ fontSize:"12px", fontWeight:"800", color:"#9b7cc0", fontFamily:"'Nunito',sans-serif", letterSpacing:"1px", marginBottom:"6px" }}>
                YOUR WELLNESS ZONE
              </div>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(18px,3vw,24px)", fontWeight:"900", color:"#2d1a4a", margin:"0 0 6px", lineHeight:1.3 }}>
                {result.zone}
              </h2>

              {/* zone color flood badge */}
              <div style={{
                display:"inline-block", padding:"5px 16px", borderRadius:"20px", marginBottom:"16px",
                background: result.bg, border:`1.5px solid ${result.border}`,
                fontSize:"12px", fontWeight:"800", color: result.color, fontFamily:"'Nunito',sans-serif",
              }}>
                ✨ Personalized just for you, {userName}
              </div>

              <div style={{ background:result.bg, border:`1.5px solid ${result.border}`, borderRadius:"20px", padding:"18px 20px", marginBottom:"20px", textAlign:"left" }}>
                <p style={{ fontSize:"13.5px", color:"#3d2060", lineHeight:1.75, margin:"0 0 14px", fontWeight:"600" }}>
                  {result.msg}
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                  {result.actions.map((a, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:"8px", background:"rgba(255,255,255,0.6)", borderRadius:"10px", padding:"9px 12px", fontSize:"13px", fontWeight:"700", color:"#3d2060", backdropFilter:"blur(6px)" }}>
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              <button className="finish-btn" onClick={onFinish} style={S.finishBtn}>
                Go to Dashboard 🌸
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const S = {
  root:      { minHeight:"100vh", fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden", transition:"background 1.2s ease" },
  bgImage:   { position:"fixed", inset:0, zIndex:0, backgroundImage:`url(${dashBg})`, backgroundSize:"cover", backgroundPosition:"center", filter:"blur(14px) brightness(0.82) saturate(1.3)", transform:"scale(1.08)", pointerEvents:"none" },
  bgOverlay: { position:"fixed", inset:0, zIndex:1, background:"linear-gradient(160deg,rgba(240,225,255,0.45) 0%,rgba(220,200,255,0.35) 40%,rgba(200,220,255,0.4) 100%)", pointerEvents:"none" },
  page:      { position:"relative", zIndex:3, maxWidth:"560px", margin:"0 auto", padding:"40px 24px 60px", display:"flex", alignItems:"center", minHeight:"100vh", boxSizing:"border-box" },
  card:      { width:"100%", background:"rgba(255,255,255,0.68)", backdropFilter:"blur(28px)", WebkitBackdropFilter:"blur(28px)", borderRadius:"32px", padding:"36px 36px", boxShadow:"0 16px 56px rgba(181,101,167,0.2), inset 0 1px 0 rgba(255,255,255,0.95)", border:"1px solid rgba(255,255,255,0.85)" },

  badge:     { display:"inline-block", background:"linear-gradient(135deg,rgba(181,101,167,0.18),rgba(148,108,210,0.18))", color:"#7c5cbf", fontWeight:"800", fontSize:"12px", padding:"5px 14px", borderRadius:"20px", border:"1px solid rgba(181,101,167,0.25)", fontFamily:"'Nunito',sans-serif" },
  prevBtn:   { background:"rgba(181,101,167,0.1)", border:"1px solid rgba(181,101,167,0.2)", borderRadius:"12px", padding:"6px 14px", fontSize:"12px", fontWeight:"800", color:"#7c5cbf", cursor:"pointer", fontFamily:"'Nunito',sans-serif", transition:"all 0.18s ease" },

  introTitle:{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(22px,3vw,28px)", fontWeight:"900", color:"#2d1a4a", margin:"0 0 10px", lineHeight:1.2 },
  introSub:  { fontSize:"14px", color:"#5a4070", lineHeight:1.75, margin:"0 0 20px", maxWidth:"380px", marginLeft:"auto", marginRight:"auto" },
  agePill:   { display:"inline-flex", alignItems:"center", gap:"8px", background:"linear-gradient(135deg,rgba(181,101,167,0.12),rgba(124,92,191,0.12))", border:"1.5px solid rgba(181,101,167,0.25)", borderRadius:"30px", padding:"8px 18px", marginBottom:"22px" },
  statsRow:  { display:"flex", justifyContent:"center", gap:"14px", marginBottom:"26px" },
  statBox:   { display:"flex", flexDirection:"column", alignItems:"center", gap:"4px", background:"rgba(255,255,255,0.6)", border:"1px solid rgba(181,101,167,0.18)", borderRadius:"16px", padding:"14px 18px", backdropFilter:"blur(8px)", minWidth:"80px" },
  startBtn:  { width:"100%", padding:"15px", border:"none", borderRadius:"22px", background:"linear-gradient(135deg,#b565a7,#7c5cbf,#4a7fc1)", color:"#fff", fontWeight:"800", fontSize:"15px", cursor:"pointer", fontFamily:"'Nunito',sans-serif", boxShadow:"0 6px 24px rgba(148,108,210,0.4)", transition:"all 0.2s ease" },
  finishBtn: { width:"100%", padding:"15px", border:"none", borderRadius:"22px", background:"linear-gradient(135deg,#b565a7,#7c5cbf,#4a7fc1)", color:"#fff", fontWeight:"800", fontSize:"15px", cursor:"pointer", fontFamily:"'Nunito',sans-serif", boxShadow:"0 6px 24px rgba(148,108,210,0.4)", transition:"all 0.2s ease" },
};