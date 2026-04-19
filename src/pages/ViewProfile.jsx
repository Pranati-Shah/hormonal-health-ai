import React, { useState } from "react";
import floralBg from "../assets/viewprofile.png";

const WEEKLY = [
  { week:"W1", sleep:42, stress:72, energy:38, mood:45 },
  { week:"W2", sleep:55, stress:65, energy:50, mood:52 },
  { week:"W3", sleep:63, stress:55, energy:62, mood:65 },
  { week:"W4", sleep:70, stress:45, energy:72, mood:74 },
  { week:"W5", sleep:75, stress:38, energy:80, mood:80 },
  { week:"W6", sleep:82, stress:30, energy:85, mood:87 },
];

const ASSESSMENTS = [
  { name:"About You",       date:"Mar 01, 2026", done:true,  icon:"📋", back:"Your personal details, life stage and wellness support preferences were captured here." },
  { name:"Rapid Fire Quiz", date:"Mar 01, 2026", done:true,  icon:"⚡", back:"Quick lifestyle questions helped us assign your wellness zone accurately." },
  { name:"Period Tracker",  date:"Mar 05, 2026", done:true,  icon:"🗓️", back:"Cycle data, symptoms and reminders were configured for personalised tracking." },
  { name:"Lifestyle Check", date:"Coming Soon",  done:false, icon:"🌿", back:"Deep dive into nutrition, movement and sleep habits. Coming soon!" },
];

const HISTORY = [
  { date:"Mar 01, 2026", event:"Completed About You assessment", icon:"📋" },
  { date:"Mar 01, 2026", event:"Completed Rapid Fire Quiz",      icon:"⚡" },
  { date:"Mar 01, 2026", event:"Wellness Zone assigned",         icon:"🌸" },
  { date:"Mar 05, 2026", event:"Period Tracker setup complete",  icon:"🗓️" },
  { date:"Mar 09, 2026", event:"Week 1 check-in completed",      icon:"✅" },
];

// ── FLIP CARD ─────────────────────────────────────────────────────────────────
function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}
      style={{ perspective:"800px", cursor:"pointer", height:"100%", minHeight:"160px" }}>
      <div style={{
        position:"relative", width:"100%", height:"100%", minHeight:"160px",
        transformStyle:"preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition:"transform 0.5s cubic-bezier(0.4,0.2,0.2,1)",
      }}>
        {/* FRONT */}
        <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          background:"rgba(255,255,255,0.72)", borderRadius:"18px", padding:"18px 20px",
          border:"1px solid rgba(100,160,240,0.2)", boxShadow:"0 3px 16px rgba(80,120,200,0.1)",
          display:"flex", flexDirection:"column", justifyContent:"center" }}>
          {front}
        </div>
        {/* BACK */}
        <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          transform:"rotateY(180deg)",
          background:"linear-gradient(135deg,rgba(180,210,255,0.85),rgba(200,225,255,0.9))",
          borderRadius:"18px", padding:"18px 20px",
          border:"1px solid rgba(100,160,240,0.3)", boxShadow:"0 3px 16px rgba(80,120,200,0.15)",
          display:"flex", flexDirection:"column", justifyContent:"center" }}>
          {back}
        </div>
      </div>
    </div>
  );
}

// ── STAT FLIP CARD ────────────────────────────────────────────────────────────
function StatFlip({ emoji, label, val, ch, c, backText }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)} style={{ perspective:"800px", cursor:"pointer" }}>
      <div style={{
        position:"relative", width:"100%", minHeight:"140px",
        transformStyle:"preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition:"transform 0.5s cubic-bezier(0.4,0.2,0.2,1)",
      }}>
        <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          background:"rgba(255,255,255,0.72)", borderRadius:"20px", padding:"22px 12px",
          border:"1px solid rgba(100,160,240,0.2)", boxShadow:"0 3px 16px rgba(80,120,200,0.1)",
          textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <div style={{fontSize:"30px",marginBottom:"8px"}}>{emoji}</div>
          <div style={{fontSize:"28px",fontWeight:"900",color:c,fontFamily:"'Nunito',sans-serif",lineHeight:1}}>{val}</div>
          <div style={{fontSize:"11px",color:"#1a2a4a",fontWeight:"700",marginTop:"5px",opacity:0.7}}>{label}</div>
          <div style={{marginTop:"8px",fontSize:"11px",fontWeight:"800",color:c,background:`${c}18`,padding:"3px 10px",borderRadius:"20px",border:`1px solid ${c}33`}}>{ch}</div>
        </div>
        <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          transform:"rotateY(180deg)",
          background:"linear-gradient(135deg,rgba(180,210,255,0.88),rgba(205,228,255,0.92))",
          borderRadius:"20px", padding:"18px 14px",
          border:"1px solid rgba(100,160,240,0.3)", boxShadow:"0 3px 16px rgba(80,120,200,0.12)",
          textAlign:"center", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"6px" }}>
          <div style={{fontSize:"22px"}}>{emoji}</div>
          <div style={{fontSize:"13px",fontWeight:"900",color:"#0d2050",fontFamily:"'Nunito',sans-serif"}}>{label} Trend</div>
          <div style={{fontSize:"12px",color:"#1a3060",lineHeight:1.6,fontWeight:"600"}}>{backText}</div>
        </div>
      </div>
    </div>
  );
}

// ── BAR CHART ─────────────────────────────────────────────────────────────────
function BarChart({ data, dataKey, color, label }) {
  const max = Math.max(...data.map(d => d[dataKey]));
  return (
    <div>
      <div style={{fontSize:"11px",fontWeight:"800",color:"#1a2a4a",fontFamily:"'Nunito',sans-serif",marginBottom:"7px",opacity:0.75}}>{label}</div>
      <div style={{display:"flex",alignItems:"flex-end",gap:"5px",height:"60px"}}>
        {data.map((d,i)=>(
          <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"3px"}}>
            <div style={{width:"100%",borderRadius:"4px 4px 2px 2px",height:`${(d[dataKey]/max)*52}px`,background:color,minHeight:"4px"}}/>
            <span style={{fontSize:"9px",color:"#1a2a4a",fontWeight:"700",opacity:0.5}}>{d.week}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SPARKLINE ─────────────────────────────────────────────────────────────────
function Sparkline({ data, dataKey, color }) {
  const w=130, h=44;
  const vals = data.map(d=>d[dataKey]);
  const mn=Math.min(...vals), mx=Math.max(...vals);
  const pts = vals.map((v,i)=>`${(i/(vals.length-1))*(w-10)+5},${h-5-((v-mn)/(mx-mn||1))*(h-10)}`).join(" ");
  const last = pts.split(" ").pop().split(",");
  return (
    <svg width={w} height={h} style={{overflow:"visible"}}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={last[0]} cy={last[1]} r="3" fill={color}/>
    </svg>
  );
}

// ── FLOATING PETALS ───────────────────────────────────────────────────────────
function Petals() {
  const items = [
    {top:"4%",  left:"4%",  size:32, rot:10,  op:0.22, delay:"0s",   dur:"6s",  type:"flower"},
    {top:"12%", left:"87%", size:26, rot:-18, op:0.18, delay:"1.2s", dur:"8s",  type:"petal"},
    {top:"28%", left:"2%",  size:20, rot:25,  op:0.16, delay:"2s",   dur:"7s",  type:"flower"},
    {top:"42%", left:"93%", size:28, rot:-30, op:0.2,  delay:"0.6s", dur:"9s",  type:"petal"},
    {top:"60%", left:"6%",  size:22, rot:15,  op:0.17, delay:"3s",   dur:"7s",  type:"flower"},
    {top:"74%", left:"88%", size:30, rot:-12, op:0.21, delay:"1.8s", dur:"8s",  type:"petal"},
    {top:"86%", left:"18%", size:18, rot:38,  op:0.15, delay:"2.8s", dur:"7s",  type:"flower"},
    {top:"18%", left:"48%", size:16, rot:-22, op:0.12, delay:"4.2s", dur:"10s", type:"petal"},
    {top:"52%", left:"44%", size:20, rot:18,  op:0.13, delay:"0.9s", dur:"8s",  type:"flower"},
    {top:"92%", left:"68%", size:24, rot:-8,  op:0.17, delay:"3.8s", dur:"7s",  type:"petal"},
    {top:"35%", left:"72%", size:14, rot:45,  op:0.1,  delay:"5s",   dur:"9s",  type:"petal"},
    {top:"68%", left:"28%", size:18, rot:-35, op:0.13, delay:"1.5s", dur:"8s",  type:"flower"},
  ];
  return (
    <>
      {items.map((p,i) => (
        <div key={i} style={{
          position:"fixed", top:p.top, left:p.left, zIndex:2, pointerEvents:"none",
          fontSize:`${p.size}px`, opacity:p.op,
          animation:`petalFloat ${p.dur} ${p.delay} ease-in-out infinite alternate`,
          filter:"hue-rotate(180deg) saturate(1.8)",
        }}>{p.type==="flower" ? "🌸" : "🌺"}</div>
      ))}
    </>
  );
}


// ── ZONE FLIP CARD ────────────────────────────────────────────────────────────
function ZoneFlipCard({ zone }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}
      style={{ perspective:"900px", cursor:"pointer", minHeight:"160px" }}>
      <div style={{
        position:"relative", width:"100%", height:"100%", minHeight:"160px",
        transformStyle:"preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition:"transform 0.55s cubic-bezier(0.4,0.2,0.2,1)",
      }}>
        {/* FRONT */}
        <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          background:"linear-gradient(135deg,rgba(160,200,255,0.45),rgba(190,220,255,0.38))",
          borderRadius:"20px", padding:"20px 22px",
          border:"1.5px solid rgba(100,155,230,0.3)", boxShadow:"0 3px 16px rgba(80,130,220,0.12)",
          display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{fontSize:"12px",fontWeight:"900",color:"#0d2050",fontFamily:"'Nunito',sans-serif",marginBottom:"14px",letterSpacing:"0.2px"}}>🌸 Allocated Wellness Zone <span style={{fontSize:"10px",color:"#4a6aaa",fontWeight:"600",marginLeft:"6px",fontStyle:"italic"}}>↔ hover to flip</span></div>
          <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
            <div style={{fontSize:"44px",filter:"drop-shadow(0 4px 8px rgba(100,150,230,0.3))"}}>🌸</div>
            <div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"20px",fontWeight:"900",color:"#0d2050",marginBottom:"6px"}}>{zone}</div>
              <p style={{fontSize:"12.5px",color:"#1a3060",lineHeight:1.7,margin:0,fontWeight:"500",opacity:0.85}}>Every recommendation in HerSpace is tailored to this personalised wellness zone.</p>
            </div>
          </div>
        </div>
        {/* BACK */}
        <div style={{ position:"absolute", inset:0, backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden",
          transform:"rotateY(180deg)",
          background:"linear-gradient(135deg,rgba(100,155,240,0.5),rgba(140,190,255,0.45))",
          borderRadius:"20px", padding:"20px 24px",
          border:"1.5px solid rgba(80,140,230,0.35)", boxShadow:"0 3px 16px rgba(60,120,220,0.18)",
          display:"flex", flexDirection:"column", justifyContent:"center", gap:"12px" }}>
          <div style={{fontSize:"14px",fontWeight:"900",color:"#0a1e40",fontFamily:"'Nunito',sans-serif"}}>💡 What this means for you</div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {["🎯 Personalised goals aligned to your zone","💊 Hormone-friendly lifestyle tips","📅 Cycle-aware weekly recommendations","🌿 Nutrition & movement plans tailored to you"].map((tip,i)=>(
              <div key={i} style={{fontSize:"12.5px",color:"#0d2a50",fontWeight:"700",lineHeight:1.5,display:"flex",alignItems:"flex-start",gap:"6px"}}>{tip}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function ViewProfile({ onBack, userData }) {
  const [tab, setTab] = useState("profile");
  const name     = userData?.name     || "Wellness User";
  const ageGroup = userData?.ageGroup || { label:"Young Adult", range:"18–25" };
  const zone     = userData?.zone     || "Build Consistency 💎";

  return (
    <div style={S.root}>
      <div style={S.bg} />
      {/* exact background color from screenshot — muted periwinkle/lavender-grey */}
      <div style={S.overlay} />
      <Petals />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@400;500;600;700&family=Nunito:wght@600;700;800;900&display=swap');
        @keyframes up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes petalFloat { 0%{transform:translateY(0px) scale(1) rotate(0deg)} 50%{transform:translateY(-14px) scale(1.08) rotate(8deg)} 100%{transform:translateY(-22px) scale(0.95) rotate(-6deg)} }
        .aup { animation: up 0.4s cubic-bezier(0.22,1,0.36,1) both; }
        .thov:hover { background:rgba(100,140,220,0.15)!important; }
        .bbtn:hover { opacity:0.75; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:rgba(100,140,220,0.25); border-radius:10px; }
      `}</style>

      <div style={S.page}>

        {/* ── SIDEBAR ── */}
        <div style={S.sidebar}>
          <button onClick={onBack} className="bbtn" style={S.back}>← Back</button>

          <div style={{textAlign:"center", padding:"24px 0 20px"}}>
            <div style={S.av}>{name[0].toUpperCase()}</div>
            <div style={S.sname}>{name}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:"11.5px",color:"#2a3a5a",opacity:0.55,marginTop:"3px"}}>Your Wellness Space</div>
          </div>

          <div style={{display:"flex",flexDirection:"column",gap:"9px",padding:"0 2px"}}>
            <div style={S.sbox}>
              <div style={S.slabel}>Age Group</div>
              <div style={S.sval}>{ageGroup.label}</div>
              <div style={{fontSize:"11px",color:"#2a3a5a",fontWeight:"600",opacity:0.55}}>{ageGroup.range}</div>
            </div>
            <div style={{...S.sbox,background:"rgba(180,210,255,0.45)",border:"1.5px solid rgba(100,155,230,0.3)"}}>
              <div style={S.slabel}>Wellness Zone</div>
              <div style={{...S.sval,fontSize:"12.5px"}}>{zone}</div>
            </div>
          </div>

          <div style={{marginTop:"22px",display:"flex",flexDirection:"column",gap:"4px"}}>
            {[{id:"profile",e:"👤",l:"Profile"},{id:"progress",e:"📈",l:"View Progress"}].map(t=>(
              <button key={t.id} className="thov" onClick={()=>setTab(t.id)} style={{
                display:"flex",alignItems:"center",gap:"10px",padding:"11px 13px",
                borderRadius:"13px",border:"none",cursor:"pointer",
                fontFamily:"'Nunito',sans-serif",fontSize:"13px",textAlign:"left",
                transition:"all 0.18s ease",
                background:   tab===t.id?"rgba(100,145,230,0.2)":"transparent",
                borderLeft:   tab===t.id?"3px solid #5a8ee0":"3px solid transparent",
                color:        tab===t.id?"#0d1e40":"#2a3a5a",
                fontWeight:   tab===t.id?"900":"700",
                opacity:      tab===t.id?1:0.6,
              }}>
                <span style={{fontSize:"17px"}}>{t.e}</span> {t.l}
              </button>
            ))}
          </div>

          <div style={{marginTop:"auto",paddingTop:"24px"}}>
            <div style={{fontSize:"10px",fontWeight:"900",color:"#2a3a5a",opacity:0.45,fontFamily:"'Nunito',sans-serif",textTransform:"uppercase",letterSpacing:"0.7px",marginBottom:"10px"}}>Quick Stats</div>
            {[
              {l:"Sleep", v:"82%",c:"#1a6a40"},
              {l:"Energy",v:"85%",c:"#5a4a10"},
              {l:"Mood",  v:"87%",c:"#6a1a4a"},
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 0",borderBottom:"1px solid rgba(100,140,220,0.12)"}}>
                <span style={{fontSize:"12px",fontWeight:"700",color:"#2a3a5a",opacity:0.65}}>{s.l}</span>
                <span style={{fontSize:"13px",fontWeight:"900",color:s.c,fontFamily:"'Nunito',sans-serif"}}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN ── */}
        <div style={S.main}>
          <div style={S.topstrip}>
            <div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"22px",fontWeight:"900",color:"#0a1830",margin:0}}>
                {tab==="profile"?"👤 My Profile":"📈 Progress Overview"}
              </h2>
              <p style={{fontSize:"12px",color:"#2a3a5a",margin:"3px 0 0",fontWeight:"600",opacity:0.6}}>
                {tab==="profile"?"Your personal wellness history":"Tracking improvement over 6 weeks"}
              </p>
            </div>
            <div style={S.avSm}>{name[0].toUpperCase()}</div>
          </div>

          <div key={tab} className="aup" style={S.scroll}>

            {/* ════ PROFILE ════ */}
            {tab==="profile" && (
              <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>

                {/* Personal Info */}
                <div style={S.card}>
                  <div style={S.ctitle}>👤 Personal Info</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"12px",marginTop:"14px"}}>
                    {[
                      {l:"Name",         v:name},
                      {l:"Age Group",    v:`${ageGroup.label} (${ageGroup.range})`},
                      {l:"Wellness Zone",v:zone},
                    ].map((x,i)=>(
                      <div key={i} style={S.ibox}>
                        <div style={S.ilabel}>{x.l}</div>
                        <div style={S.ival}>{x.v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assessments — flip cards */}
                <div style={S.card}>
                  <div style={S.ctitle}>📊 Assessments Taken <span style={{fontSize:"11px",color:"#4a6aaa",fontWeight:"600",marginLeft:"8px",fontStyle:"italic"}}>↔ hover to flip</span></div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"12px",marginTop:"14px"}}>
                    {ASSESSMENTS.map((a,i)=>(
                      <FlipCard key={i}
                        front={
                          <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"12px",padding:"6px 0"}}>
                            <span style={{fontSize:"32px",lineHeight:1}}>{a.icon}</span>
                            <div>
                              <div style={{fontSize:"15px",fontWeight:"900",color:"#0a1830",fontFamily:"'Nunito',sans-serif",marginBottom:"4px"}}>{a.name}</div>
                              <div style={{fontSize:"11.5px",color:"#2a3a5a",opacity:0.6,fontWeight:"600"}}>{a.date}</div>
                            </div>
                            <span style={{fontSize:"12px",fontWeight:"800",fontFamily:"'Nunito',sans-serif",color:a.done?"#186040":"#2a3a8a",background:a.done?"rgba(40,160,100,0.12)":"rgba(100,130,220,0.1)",padding:"5px 14px",borderRadius:"20px",border:`1px solid ${a.done?"rgba(40,160,100,0.25)":"rgba(100,130,220,0.2)"}`}}>{a.done?"✅ Done":"🔜 Soon"}</span>
                          </div>
                        }
                        back={
                          <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"10px",padding:"6px 0"}}>
                            <div style={{fontSize:"28px"}}>{a.icon}</div>
                            <div style={{fontSize:"14px",fontWeight:"900",color:"#0d2050",fontFamily:"'Nunito',sans-serif"}}>{a.name}</div>
                            <div style={{fontSize:"12.5px",color:"#1a3060",lineHeight:1.75,fontWeight:"600"}}>{a.back}</div>
                          </div>
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Zone + History row */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
                  <ZoneFlipCard zone={zone} />

                  <div style={S.card}>
                    <div style={S.ctitle}>🕐 Progress History</div>
                    <div style={{position:"relative",marginTop:"16px"}}>
                      <div style={{position:"absolute",left:"15px",top:0,bottom:0,width:"2px",background:"linear-gradient(180deg,rgba(90,130,220,0.45),rgba(90,130,220,0.03))",borderRadius:"2px"}}/>
                      {HISTORY.map((h,i)=>(
                        <div key={i} style={{display:"flex",gap:"13px",paddingBottom:"14px",position:"relative"}}>
                          <div style={{width:"30px",height:"30px",borderRadius:"50%",background:"rgba(100,145,230,0.12)",border:"2px solid rgba(100,145,230,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0,zIndex:1}}>{h.icon}</div>
                          <div style={{paddingTop:"4px"}}>
                            <div style={{fontSize:"12.5px",fontWeight:"800",color:"#0a1830",fontFamily:"'Nunito',sans-serif"}}>{h.event}</div>
                            <div style={{fontSize:"10px",color:"#2a3a5a",opacity:0.5,fontWeight:"600",marginTop:"1px"}}>{h.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ════ PROGRESS ════ */}
            {tab==="progress" && (
              <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>

                {/* Stat flip cards */}
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px"}}>
                  {[
                    {emoji:"😴",label:"Sleep",  val:"82%",ch:"+40%",c:"#1a6a40",back:"Improved from 42% to 82% — 6 weeks of consistent wind-down routines made the difference."},
                    {emoji:"⚡",label:"Energy", val:"85%",ch:"+47%",c:"#5a4a10",back:"Energy surged 47% as sleep quality improved and stress reduced week over week."},
                    {emoji:"😌",label:"Stress", val:"70%",ch:"−42%",c:"#3a2a80",back:"Stress dropped 42% through daily breathing exercises and consistent sleep patterns."},
                    {emoji:"😊",label:"Mood",   val:"87%",ch:"+42%",c:"#6a1a4a",back:"Mood index rose steadily — linked to better sleep, lower stress and daily check-ins."},
                  ].map((s,i)=>(
                    <StatFlip key={i} {...s}/>
                  ))}
                </div>

                {/* Bar charts */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"16px"}}>
                  <div style={S.card}>
                    <div style={S.ctitle}>📈 Sleep & Energy — 6 Weeks</div>
                    <div style={{marginTop:"18px",display:"flex",flexDirection:"column",gap:"20px"}}>
                      <BarChart data={WEEKLY} dataKey="sleep"  color="rgba(60,150,100,0.7)"  label="😴 Sleep Quality"/>
                      <BarChart data={WEEKLY} dataKey="energy" color="rgba(160,145,40,0.7)"  label="⚡ Energy Level"/>
                    </div>
                  </div>
                  <div style={S.card}>
                    <div style={S.ctitle}>📉 Mood & Stress — 6 Weeks</div>
                    <div style={{marginTop:"18px",display:"flex",flexDirection:"column",gap:"20px"}}>
                      <BarChart data={WEEKLY} dataKey="mood"   color="rgba(160,70,130,0.7)"  label="😊 Mood Index"/>
                      <BarChart data={WEEKLY} dataKey="stress" color="rgba(100,80,200,0.7)"  label="😰 Stress (lower = better)"/>
                    </div>
                  </div>
                </div>

                {/* Sparklines */}
                <div style={S.card}>
                  <div style={S.ctitle}>✨ 6-Week Trend Overview</div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"14px",marginTop:"18px"}}>
                    {[
                      {key:"sleep", c:"#2a9060",e:"😴",l:"Sleep"},
                      {key:"energy",c:"#8a7820",e:"⚡",l:"Energy"},
                      {key:"mood",  c:"#8a3070",e:"😊",l:"Mood"},
                      {key:"stress",c:"#5030b0",e:"😌",l:"Stress"},
                    ].map((s,i)=>(
                      <div key={i} style={{textAlign:"center",background:"rgba(180,210,255,0.3)",borderRadius:"16px",padding:"14px 10px",border:"1px solid rgba(100,150,230,0.18)"}}>
                        <div style={{fontSize:"12px",color:"#0a1830",fontWeight:"800",fontFamily:"'Nunito',sans-serif",marginBottom:"10px",opacity:0.75}}>{s.e} {s.l}</div>
                        <div style={{display:"flex",justifyContent:"center"}}>
                          <Sparkline data={WEEKLY} dataKey={s.key} color={s.c}/>
                        </div>
                        <div style={{fontSize:"10px",color:"#2a3a5a",marginTop:"6px",fontWeight:"600",opacity:0.45}}>W1 → W6</div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

const S = {
  root:     { height:"100vh", fontFamily:"'DM Sans',sans-serif", position:"relative", overflow:"hidden" },
  // painting blurred dark
  bg:       { position:"fixed", inset:0, zIndex:0, backgroundImage:`url(${floralBg})`, backgroundSize:"cover", backgroundPosition:"center", filter:"blur(24px) brightness(0.25) saturate(0.8)", transform:"scale(1.1)", pointerEvents:"none" },
  // exact periwinkle/slate-blue from screenshot: rgb ~185,195,225 → rgba overlay
  overlay:  { position:"fixed", inset:0, zIndex:1, background:"linear-gradient(155deg,rgba(185,200,235,0.88) 0%,rgba(175,195,230,0.86) 50%,rgba(190,205,240,0.88) 100%)", pointerEvents:"none" },

  page:     { position:"relative", zIndex:3, height:"100vh", display:"flex" },

  sidebar:  { width:"255px", flexShrink:0, height:"100vh", padding:"22px 16px", boxSizing:"border-box",
               background:"rgba(210,225,250,0.55)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
               borderRight:"1px solid rgba(130,165,230,0.2)", display:"flex", flexDirection:"column", overflowY:"auto" },
  back:     { background:"rgba(255,255,255,0.45)", border:"1px solid rgba(130,165,230,0.3)", color:"#0a1830",
               fontSize:"12px", fontWeight:"700", padding:"8px 14px", borderRadius:"10px", cursor:"pointer",
               fontFamily:"'Nunito',sans-serif", transition:"opacity 0.18s", display:"inline-block" },
  av:       { width:"70px", height:"70px", borderRadius:"50%", background:"linear-gradient(135deg,#5a80d8,#7aa0f0,#4a70c8)",
               display:"flex", alignItems:"center", justifyContent:"center", fontSize:"30px", fontWeight:"900",
               color:"#fff", margin:"0 auto 12px", fontFamily:"'Nunito',sans-serif",
               boxShadow:"0 6px 22px rgba(80,110,200,0.35)", border:"3px solid rgba(160,185,240,0.5)" },
  sname:    { fontFamily:"'Playfair Display',serif", fontSize:"16px", fontWeight:"900", color:"#0a1830", textAlign:"center" },
  sbox:     { background:"rgba(255,255,255,0.5)", borderRadius:"13px", padding:"11px 13px", border:"1px solid rgba(130,165,230,0.2)" },
  slabel:   { fontSize:"10px", fontWeight:"700", color:"#2a3a5a", opacity:0.5, textTransform:"uppercase", letterSpacing:"0.6px", fontFamily:"'Nunito',sans-serif", marginBottom:"4px" },
  sval:     { fontSize:"14px", fontWeight:"900", color:"#0a1830", fontFamily:"'Nunito',sans-serif" },

  main:     { flex:1, display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" },
  topstrip: { padding:"16px 28px", background:"rgba(200,218,248,0.5)", backdropFilter:"blur(12px)",
               borderBottom:"1px solid rgba(130,165,230,0.2)", display:"flex", justifyContent:"space-between",
               alignItems:"center", flexShrink:0 },
  avSm:     { width:"36px", height:"36px", borderRadius:"50%", background:"linear-gradient(135deg,#5a80d8,#7aa0f0)",
               display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", fontWeight:"900",
               color:"#fff", fontFamily:"'Nunito',sans-serif", boxShadow:"0 3px 12px rgba(80,110,200,0.3)" },
  scroll:   { flex:1, overflowY:"auto", padding:"22px 28px 40px" },

  card:     { background:"rgba(255,255,255,0.62)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
               borderRadius:"20px", padding:"20px 22px", border:"1px solid rgba(130,165,230,0.22)",
               boxShadow:"0 3px 18px rgba(80,110,200,0.1)" },
  ctitle:   { fontSize:"14px", fontWeight:"900", color:"#0d2050", fontFamily:"'Nunito',sans-serif" },
  ibox:     { background:"rgba(180,210,255,0.38)", borderRadius:"12px", padding:"12px 14px", border:"1px solid rgba(130,165,230,0.2)" },
  ilabel:   { fontSize:"10px", color:"#2a3a5a", fontWeight:"700", textTransform:"uppercase", letterSpacing:"0.6px", fontFamily:"'Nunito',sans-serif", marginBottom:"4px", opacity:0.58 },
  ival:     { fontSize:"15px", fontWeight:"800", color:"#0a1830", fontFamily:"'Nunito',sans-serif", lineHeight:1.3 },
};