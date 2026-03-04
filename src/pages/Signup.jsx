import React, { useState } from "react";
import bg from "../assets/bg.jpg";

export default function Signup({ onSignUp, onGoLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={S.root}>
      <div style={S.overlay} />
      <div style={S.card}>
        <div style={S.header}>
          <div style={S.emoji}>🌸</div>
          <h2 style={S.title}>Join HerSpace</h2>
          <p style={S.sub}>Your wellness journey starts here 💕</p>
        </div>
        <div style={S.field}>
          <label style={S.label}>Your Name</label>
          <input name="name" value={form.name} onChange={handle}
            placeholder="e.g. Priya Sharma" style={S.input} />
        </div>
        <div style={S.field}>
          <label style={S.label}>Email Address</label>
          <input name="email" value={form.email} onChange={handle}
            placeholder="you@example.com" type="email" style={S.input} />
        </div>
        <div style={S.field}>
          <label style={S.label}>Password</label>
          <input name="password" value={form.password} onChange={handle}
            placeholder="Create a password" type="password" style={S.input} />
        </div>
        <button onClick={() => onSignUp(form)} style={S.primaryBtn}>
          Create Account 🚀
        </button>
        <p style={S.switchText}>
          Already have an account?{" "}
          <span onClick={onGoLogin} style={S.link}>Login here</span>
        </p>
      </div>
    </div>
  );
}

const S = {
  root: {
    minHeight: "100vh", backgroundImage: `url(${bg})`,
    backgroundSize: "cover", backgroundPosition: "center",
    backgroundAttachment: "fixed", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif", position: "relative",
  },
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(255,220,220,0.55)",
    backdropFilter: "blur(10px)", zIndex: 0,
  },
  card: {
    position: "relative", zIndex: 2,
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(20px)", borderRadius: "32px",
    padding: "40px 36px", maxWidth: "440px", width: "90%",
    boxShadow: "0 20px 60px rgba(205,44,88,0.2)",
    border: "1px solid rgba(255,255,255,0.9)",
  },
  header: { textAlign: "center", marginBottom: "28px" },
  emoji: { fontSize: "48px", marginBottom: "8px" },
  title: { fontSize: "26px", fontWeight: "900", color: "#1a1a2e", margin: "0 0 6px" },
  sub: { fontSize: "14px", color: "#888", margin: 0 },
  field: { marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", fontWeight: "600", color: "#555", marginBottom: "6px" },
  input: {
    width: "100%", padding: "12px 16px",
    border: "1.5px solid rgba(205,44,88,0.2)", borderRadius: "12px",
    fontSize: "14px", outline: "none",
    background: "rgba(255,255,255,0.7)", boxSizing: "border-box",
  },
  primaryBtn: {
    width: "100%", padding: "14px", border: "none",
    borderRadius: "16px", marginTop: "8px",
    background: "linear-gradient(135deg, #E06C9F, #CD2C58)",
    color: "white", fontWeight: "700", fontSize: "15px",
    cursor: "pointer", boxShadow: "0 6px 20px rgba(205,44,88,0.35)",
  },
  switchText: { textAlign: "center", fontSize: "13px", color: "#888", marginTop: "16px" },
  link: { color: "#CD2C58", fontWeight: "700", cursor: "pointer" },
};