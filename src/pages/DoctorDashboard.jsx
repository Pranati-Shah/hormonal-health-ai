import React, { useEffect, useMemo, useState } from "react";

const API = "http://localhost:5000/api";
const BERRY_BG = "/@fs/C:/Users/BHARAT S SHAH/.cursor/projects/c-Users-BHARAT-S-SHAH-herspace-frontend/assets/c__Users_BHARAT_S_SHAH_AppData_Roaming_Cursor_User_workspaceStorage_b863f0322bfffd5a39f017174614a988_images_WhatsApp_Image_2026-04-16_at_21.03.30-24281b9f-47e2-42be-abad-1bae861e30f1.png";

function buildPatientSummary(patient) {
  const tracker = patient?.tracker || {};
  const current = tracker?.current || {};
  const plan = tracker?.actionPlan || {};
  const history = tracker?.history || [];

  return {
    zone: current?.zone || "mild",
    score: current?.finalScore ?? 0,
    maxScore: current?.maxScore ?? 120,
    symptoms: current?.detectedSymptoms || [],
    pattern: history.length > 0 ? `${history.length + 1} assessments recorded` : "Single assessment available",
    actionPlan: {
      diet: plan?.diet || [],
      movement: plan?.movement || [],
      selfCare: plan?.selfCare || [],
      stability: plan?.stabilityScore || "Stable",
    },
  };
}

export default function DoctorDashboard({ onBack, fallbackPatient }) {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalRequests: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [reqRes, statsRes] = await Promise.allSettled([
          fetch(`${API}/doctor/requests`, { credentials: "include" }),
          fetch(`${API}/doctor/stats`, { credentials: "include" }),
        ]);

        let fetchedPatients = [];
        if (reqRes.status === "fulfilled" && reqRes.value.ok) {
          const data = await reqRes.value.json();
          fetchedPatients = data?.patients || [];
        }

        let fetchedStats = { totalUsers: 0, totalRequests: 0 };
        if (statsRes.status === "fulfilled" && statsRes.value.ok) {
          const data = await statsRes.value.json();
          fetchedStats = {
            totalUsers: data?.totalUsers ?? 0,
            totalRequests: data?.totalRequests ?? 0,
          };
        }

        if (!fetchedPatients.length && fallbackPatient) {
          fetchedPatients = [fallbackPatient];
        }

        if (!fetchedStats.totalUsers && fetchedPatients.length) {
          fetchedStats = {
            totalUsers: fetchedPatients.length,
            totalRequests: fetchedPatients.length,
          };
        }

        setPatients(fetchedPatients);
        setStats(fetchedStats);
      } catch (err) {
        if (fallbackPatient) {
          setPatients([fallbackPatient]);
          setStats({ totalUsers: 1, totalRequests: 1 });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [fallbackPatient]);

  const patientCards = useMemo(
    () =>
      patients.map((patient, idx) => {
        const summary = buildPatientSummary(patient);
        return { patient, summary, idx };
      }),
    [patients]
  );

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5eefa", fontFamily: "'Nunito', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "10px" }}>👩‍⚕️</div>
          <div style={{ fontWeight: "800", color: "#6d46a2" }}>Loading doctor dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", padding: "28px 20px", fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: `url(${BERRY_BG})`, backgroundSize: "cover", backgroundPosition: "center", filter: "blur(16px) brightness(1.08) saturate(0.95)", transform: "scale(1.08)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, background: "linear-gradient(160deg,rgba(255,236,240,0.83),rgba(255,245,250,0.8),rgba(255,240,236,0.82))", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "fixed", top: "8%", left: "8%", width: "340px", height: "340px", background: "rgba(245,120,150,0.18)", filter: "blur(85px)", borderRadius: "50%", zIndex: 1, pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: "8%", right: "8%", width: "300px", height: "300px", background: "rgba(196,94,138,0.15)", filter: "blur(75px)", borderRadius: "50%", zIndex: 1, pointerEvents: "none" }} />

      <style>{`
        @keyframes fadeUpDoctor{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        .doctor-fade{animation:fadeUpDoctor 0.45s cubic-bezier(0.22,1,0.36,1) both;}
      `}</style>

      <div style={{ position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div className="doctor-fade" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px", gap: "12px", flexWrap: "wrap" }}>
          <button onClick={onBack} style={{ border: "none", borderRadius: "12px", padding: "9px 14px", fontWeight: "800", cursor: "pointer", color: "#7a2b53", background: "rgba(255,255,255,0.7)" }}>
            ← Back
          </button>
          <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.42)", fontWeight: "900", letterSpacing: "2.5px" }}>DOCTOR DASHBOARD</div>
        </div>

        <div className="doctor-fade" style={{ background: "rgba(255,255,255,0.62)", backdropFilter: "blur(24px)", borderRadius: "22px", border: "1px solid rgba(255,255,255,0.88)", padding: "24px 26px", marginBottom: "16px", boxShadow: "0 8px 34px rgba(181,101,167,0.12)" }}>
          <div style={{ fontSize: "10px", color: "rgba(0,0,0,0.34)", fontWeight: "900", letterSpacing: "2.4px", marginBottom: "6px" }}>AI-ASSISTED CONSULTATION PREP</div>
          <h1 style={{ margin: "0 0 6px", fontFamily: "'Playfair Display', serif", fontSize: "30px", color: "#2b1536" }}>
            Doctor <span style={{ color: "#b04d78" }}>Review Center</span>
          </h1>
          <p style={{ margin: 0, fontSize: "13px", color: "rgba(0,0,0,0.57)", lineHeight: 1.7 }}>
            This dashboard supports real doctors by summarizing patient wellness history. AI helps with structure, not diagnosis.
          </p>
        </div>

        <div className="doctor-fade" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
          <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: "16px", padding: "16px", border: "1px solid rgba(255,255,255,0.92)", boxShadow: "0 4px 18px rgba(176,77,120,0.1)" }}>
            <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.42)", fontWeight: "800" }}>TOTAL USERS</div>
            <div style={{ fontSize: "30px", fontWeight: "900", color: "#8f2f5f" }}>{stats.totalUsers}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: "16px", padding: "16px", border: "1px solid rgba(255,255,255,0.92)", boxShadow: "0 4px 18px rgba(176,77,120,0.1)" }}>
            <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.42)", fontWeight: "800" }}>REQUESTED CONSULTS</div>
            <div style={{ fontSize: "30px", fontWeight: "900", color: "#2f8f73" }}>{stats.totalRequests}</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: "16px", padding: "16px", border: "1px solid rgba(255,255,255,0.92)", boxShadow: "0 4px 18px rgba(176,77,120,0.1)" }}>
            <div style={{ fontSize: "11px", color: "rgba(0,0,0,0.42)", fontWeight: "800" }}>AI ROLE</div>
            <div style={{ fontSize: "13px", fontWeight: "700", color: "rgba(0,0,0,0.63)", marginTop: "6px" }}>Structured summary, pattern extraction, no diagnosis</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {patientCards.length === 0 && (
            <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: "14px", padding: "18px", color: "rgba(0,0,0,0.55)", border: "1px solid rgba(255,255,255,0.9)" }}>
              No consultation requests yet.
            </div>
          )}

          {patientCards.map(({ patient, summary, idx }) => (
            <div key={idx} className="doctor-fade" style={{ background: "rgba(255,255,255,0.8)", borderRadius: "18px", padding: "18px", border: "1px solid rgba(255,255,255,0.96)", boxShadow: "0 6px 24px rgba(176,77,120,0.09)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "10px" }}>
                <div style={{ fontSize: "17px", fontWeight: "900", color: "#3e1d35" }}>{patient?.name || patient?.email || `Patient ${idx + 1}`}</div>
                <div style={{ fontSize: "12px", fontWeight: "800", color: "#8f2f5f", background: "rgba(176,77,120,0.08)", border: "1px solid rgba(176,77,120,0.18)", borderRadius: "16px", padding: "4px 10px" }}>Zone: {summary.zone}</div>
              </div>
              <div style={{ fontSize: "13px", color: "rgba(0,0,0,0.65)", lineHeight: 1.7 }}>
                <strong>Risk score:</strong> {summary.score}/{summary.maxScore} | <strong>Pattern detected:</strong> {summary.pattern}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(0,0,0,0.65)", marginTop: "6px", lineHeight: 1.7 }}>
                <strong>Detected symptoms:</strong> {summary.symptoms.length ? summary.symptoms.join(", ") : "No major symptoms reported"}
              </div>
              <div style={{ marginTop: "8px", fontSize: "13px", color: "rgba(0,0,0,0.65)", lineHeight: 1.7 }}>
                <strong>Action plan stability:</strong> {summary.actionPlan.stability}
              </div>
              <div style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {[
                  { title: "Diet", items: summary.actionPlan.diet },
                  { title: "Movement", items: summary.actionPlan.movement },
                  { title: "Self-care", items: summary.actionPlan.selfCare },
                ].map((block) => (
                  <div key={block.title} style={{ background: "rgba(176,77,120,0.06)", border: "1px solid rgba(176,77,120,0.14)", borderRadius: "10px", padding: "10px" }}>
                    <div style={{ fontSize: "11px", fontWeight: "900", color: "#8f2f5f", marginBottom: "6px" }}>{block.title}</div>
                    <div style={{ fontSize: "12px", color: "rgba(0,0,0,0.6)", lineHeight: 1.55 }}>
                      {block.items?.length ? block.items.slice(0, 3).join(" | ") : "No suggestions available"}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "10px", fontSize: "11px", color: "rgba(0,0,0,0.45)" }}>
                AI-generated consultation prep summary. Final clinical decision remains with doctor.
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

