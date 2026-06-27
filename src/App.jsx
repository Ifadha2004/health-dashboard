import { useState } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg:      "#07080d",
  surface: "#0e1018",
  card:    "#13161f",
  cardHi:  "#181c27",
  border:  "#1e2235",
  borderHi:"#2a2f45",
  text:    "#eef0f6",
  sub:     "#9299b0",
  muted:   "#555e78",
  purple:  "#8B80F9",
  teal:    "#14B8A6",
  coral:   "#F43F5E",
  blue:    "#3B82F6",
  pink:    "#EC4899",
  amber:   "#F59E0B",
  red:     "#EF4444",
  orange:  "#F97316",
  green:   "#22c55e",
  gray:    "#6B7280",
};

// ─── Shared styles ─────────────────────────────────────────────────────────
const pill = (bg, color) => ({
  display:"inline-flex", alignItems:"center",
  background: bg, color, fontSize:10, fontWeight:700,
  padding:"3px 9px", borderRadius:20, letterSpacing:".05em",
  textTransform:"uppercase", whiteSpace:"nowrap",
});

// ─── Section data ─────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id:0, icon:"🏠", nav:"Overview", badge:"Overview",
    title:"Global Metabolic Health", accent:C.purple,
    badgeBg:"rgba(139,128,249,.15)", badgeColor:"#AFA9EC", tagClass:"purple",
  },
  {
    id:1, icon:"📈", nav:"Global Landscape", badge:"Section 01",
    title:"Global Health Landscape", accent:C.purple,
    badgeBg:"rgba(139,128,249,.15)", badgeColor:"#AFA9EC", tagClass:"purple",
    kpis:[
      { label:"Obesity growth",   value:"+143%",  delta:"Fastest rising indicator",   dc:C.teal,  icon:"⬆" },
      { label:"Diabetes growth",  value:"+90%",   delta:"Steady upward trend",        dc:C.amber, icon:"⬆" },
      { label:"Blood pressure",   value:"−18.8%", delta:"Overall decline 1980–2014",  dc:C.green, icon:"⬇" },
      { label:"Study period",     value:"35 yrs", delta:"1980 → 2014",               dc:C.sub,   icon:"📅" },
    ],
    interaction:{
      number:1, name:"Global Risk Shift Explorer",
      hint:"Click the legend to isolate an indicator. Drag a year range on the top chart to zoom the relative growth view below.",
      varName:"interaction_1_global_risk_shift", height:480,
    },
    charts:[
      { title:"Q1A — Absolute global trends",  sub:"Average prevalence (%) over time",      tag:"Line",  varName:"chart_q1a",  height:300 },
      { title:"Q1B — Relative growth index",   sub:"1980 = 100 baseline comparison",         tag:"Index", varName:"chart_q1b",  height:300 },
    ],
    finding:'Obesity was the <b>fastest-rising indicator</b>, increasing from 8.38% in 1980 to 20.34% in 2014 — a relative rise of 142.6%. Diabetes also increased substantially, while raised blood pressure declined overall, showing that global metabolic risk has shifted away from blood-pressure dominance toward obesity- and diabetes-linked burden.',
  },
  {
    id:2, icon:"🌍", nav:"Geographic Risk", badge:"Section 02",
    title:"Geographic Risk", accent:C.blue,
    badgeBg:"rgba(59,130,246,.15)", badgeColor:"#85B7EB", tagClass:"blue",
    kpis:[
      { label:"Highest burden",    value:"Pacific",  delta:"American Samoa, Nauru, Cook Is.", dc:C.red,    icon:"🏝" },
      { label:"Fastest growth",    value:"Pacific+", delta:"Tokelau, Solomon Is., PNG",       dc:C.amber,  icon:"📈" },
      { label:"Gulf states",       value:"Top 20",   delta:"Kuwait, Qatar, Saudi Arabia",     dc:C.orange, icon:"🌐" },
      { label:"Countries mapped",  value:"200",      delta:"Global coverage",                 dc:C.sub,    icon:"🗺" },
    ],
    interaction:{
      number:2, name:"Country Spotlight Dashboard",
      hint:"Click any country in the bar chart to update its indicator profile, long-term trend, and map highlight simultaneously.",
      varName:"interaction_2_country_spotlight", height:560,
    },
    charts:[
      { title:"Q2 — Highest burden countries",  sub:"Top 20 by combined risk score (2014)", tag:"Bar",          varName:"chart_q2", height:300 },
      { title:"Q4 — Change over time",          sub:"Biggest improvers and deteriorators",   tag:"Diverging bar", varName:"chart_q4", height:300 },
    ],
    extraChart:{ title:"Q3 — Global choropleth", sub:"Combined metabolic risk score by country (2014)", tag:"Map", varName:"chart_q3", height:340 },
    finding:'Pacific Island countries dominate the highest combined-risk ranking in 2014, with <b>American Samoa, Nauru, Cook Islands, Palau, and Niue</b> occupying the top positions. Gulf countries also appear within the wider high-risk group. The change analysis shows that several Pacific and developing contexts experienced rapid risk growth, while currently lower-risk countries require early prevention before burdens escalate further.',
  },
  {
    id:3, icon:"⚧", nav:"Gender Disparities", badge:"Section 03",
    title:"Gender Disparities", accent:C.pink,
    badgeBg:"rgba(236,72,153,.15)", badgeColor:"#ED93B1", tagClass:"pink",
    kpis:[
      { label:"Obesity gap",        value:"Women",  delta:"Higher globally",     dc:C.pink,  icon:"♀" },
      { label:"Blood pressure gap", value:"Men",    delta:"Higher globally",     dc:C.blue,  icon:"♂" },
      { label:"Diabetes gap",       value:"Mixed",  delta:"Varies by region",    dc:C.teal,  icon:"≈" },
      { label:"Countries analysed", value:"Top 20", delta:"Largest gender gaps", dc:C.sub,   icon:"📊" },
    ],
    interaction:{
      number:3, name:"Gender Disparity Explorer",
      hint:"Use the dropdown to switch health indicator. Click a country on the dumbbell chart to see its male vs female trend over time.",
      varName:"interaction_3_gender_disparity", height:560,
    },
    charts:[
      { title:"Q5 — Obesity trend by gender", sub:"Global average, men vs women 1980–2014",       tag:"Line",     varName:"chart_q5", height:280 },
      { title:"Q6 — Largest gender gaps",     sub:"Top 20 countries by male/female risk difference", tag:"Dumbbell", varName:"chart_q6", height:280 },
    ],
    finding:'Women show a <b>consistently higher global obesity burden</b>, while men show higher raised blood pressure prevalence. The largest combined-risk gender gaps are concentrated in countries such as Lesotho, South Africa, Swaziland, Botswana, and Zimbabwe, suggesting that <b>gender-sensitive health strategies</b> are needed rather than uniform national campaigns.',
  },
  {
    id:4, icon:"⚛", nav:"Indicator Relationships", badge:"Section 04",
    title:"Indicator Relationships", accent:C.teal,
    badgeBg:"rgba(20,184,166,.15)", badgeColor:"#5DCAA5", tagClass:"teal",
    kpis:[
      { label:"Obesity–diabetes", value:"r = 0.76",  delta:"Strong positive link",          dc:C.teal,  icon:"↗" },
      { label:"Obesity–BP",       value:"r = −0.34", delta:"Weak inverse relationship",     dc:C.blue,  icon:"↘" },
      { label:"Outlier nations",  value:"Pacific+",  delta:"Higher diabetes than expected",  dc:C.amber, icon:"⚠" },
      { label:"Deviation method", value:"Residuals", delta:"From regression line",          dc:C.sub,   icon:"📐" },
    ],
    interaction:{
      number:4, name:"Obesity–Diabetes Relationship Explorer",
      hint:"Drag a selection box over the scatter plot to filter which countries appear in the deviation bar chart on the right.",
      varName:"interaction_4_obesity_diabetes", height:500,
    },
    charts:[
      { title:"Q6.5 — Correlation matrix",   sub:"Pairwise strength between indicators",      tag:"Heatmap",  varName:"chart_q6_5", height:240 },
      { title:"Q7 — Obesity vs diabetes",    sub:"Scatter + regression line (2014)",           tag:"Scatter",  varName:"chart_q7",   height:240 },
      { title:"Q9 — Pattern deviations",     sub:"Countries above/below expected diabetes",    tag:"Residuals",varName:"chart_q9",   height:240 },
    ],
    finding:'Obesity and diabetes are <b>strongly positively correlated</b> globally (r ≈ 0.76), but the relationship is not uniform. Countries such as Tokelau, American Samoa, Niue, Afghanistan, Nauru, Pakistan, and Kuwait show <b>higher diabetes prevalence than expected</b> based on obesity alone — suggesting that dietary composition, genetic predisposition, and healthcare access are independent risk factors beyond BMI.',
  },
  {
    id:5, icon:"🔵", nav:"Country Segmentation", badge:"Section 05",
    title:"Country Segmentation", accent:C.amber,
    badgeBg:"rgba(245,158,11,.15)", badgeColor:"#EF9F27", tagClass:"amber",
    kpis:[
      { label:"Clusters identified", value:"4",     delta:"K-Means, k=4",                   dc:C.amber, icon:"🔲" },
      { label:"High-risk cluster",   value:"14",    delta:"Mostly Pacific countries",        dc:C.red,   icon:"⚠" },
      { label:"Low-risk cluster",    value:"90",    delta:"Lower current combined burden",   dc:C.teal,  icon:"✓" },
      { label:"Risk escalations",    value:"46.5%", delta:"Countries moved upward",          dc:C.blue,  icon:"📈" },
    ],
    interaction:null,
    charts:[
      { title:"Q10 — Country health clusters", sub:"K-Means + PCA projection (2014)",        tag:"Cluster",     varName:"chart_q10", height:340 },
      { title:"Q11 — Cluster profiles",        sub:"Average indicator values per cluster",   tag:"Grouped bar", varName:"chart_q11", height:340 },
    ],
    extraChart:{ title:"Q12 — Risk category transitions (1980 → 2014)", sub:"Countries moving between Low / Moderate / High / Critical risk", tag:"Heatmap", varName:"chart_q12", height:300 },
    finding:'Four distinct health profiles emerge. The <b>high combined-risk cluster</b> is dominated by Pacific Island countries, while the elevated mixed-risk cluster includes Gulf, North African, Caribbean, and high-burden middle-income contexts. The transition heatmap shows that <b>46.5% of countries escalated at least one risk category</b> between 1980 and 2014, while only 2.5% improved — risk progression was far more common than risk reduction.',
  },
  {
    id:6, icon:"🎯", nav:"Policy Prioritisation", badge:"Section 06",
    title:"Policy Prioritisation", accent:C.coral,
    badgeBg:"rgba(244,63,94,.15)", badgeColor:"#F0997B", tagClass:"coral",
    kpis:[
      { label:"Urgent intervention", value:"46", delta:"High risk + high growth",   dc:C.red,    icon:"🚨" },
      { label:"Maintain / control",  value:"54", delta:"High risk, slower growth",  dc:C.orange, icon:"⚙" },
      { label:"Early prevention",    value:"54", delta:"Low risk but accelerating", dc:C.blue,   icon:"🛡" },
      { label:"Monitoring",          value:"46", delta:"Low risk + low growth",     dc:C.gray,   icon:"👁" },
    ],
    interaction:{
      number:5, name:"Policy Priority Matrix",
      hint:"Use the sliders to adjust risk and growth thresholds. Click a priority category to filter the country list on the right.",
      varName:"interaction_5_policy_priority", height:580,
    },
    charts:[
      { title:"Q13 — Fastest deteriorating countries", sub:"Greatest % growth in risk score 1980–2014",      tag:"Bar", varName:"chart_q13", height:280 },
      { title:"Q15 — Future hotspot index",            sub:"Normalised priority index: current + growth",    tag:"Bar", varName:"chart_q15", height:280 },
    ],
    finding:'The priority matrix separates countries by current risk and historical growth. <b>Urgent-intervention</b> countries combine high present burden with rapid growth and are concentrated mainly among Pacific Island and selected Middle Eastern/North African contexts. <b>Early-prevention</b> countries have lower current burden but above-median growth — making them the highest-leverage opportunity for preventive policy before risk levels become harder to manage.',
    findingLabel:"Policy recommendation",
  },
];

// ─── Overview stats ────────────────────────────────────────────────────────────
const OVERVIEW_STATS = [
  { value:"200",    label:"Countries analysed",      accent:C.purple, icon:"🌐" },
  { value:"35 yrs", label:"Study period (1980–2014)",accent:C.blue,   icon:"📅" },
  { value:"3",      label:"Health indicators",       accent:C.teal,   icon:"📊" },
  { value:"+143%",  label:"Peak obesity growth",     accent:C.coral,  icon:"⬆" },
  { value:"46",     label:"Urgent-intervention countries", accent:C.red, icon:"🚨" },
  { value:"46.5%",  label:"Countries that escalated risk", accent:C.amber, icon:"📈" },
];

const OVERVIEW_SECTIONS = [
  { id:1, icon:"📈", label:"Global Landscape",       accent:C.purple, sub:"How did each indicator evolve 1980–2014?" },
  { id:2, icon:"🌍", label:"Geographic Risk",        accent:C.blue,   sub:"Where is burden highest — and growing fastest?" },
  { id:3, icon:"⚧",  label:"Gender Disparities",    accent:C.pink,   sub:"How does risk differ across men and women?" },
  { id:4, icon:"⚛",  label:"Indicator Relationships",accent:C.teal,  sub:"How do obesity, diabetes, and BP interact?" },
  { id:5, icon:"🔵", label:"Country Segmentation",   accent:C.amber,  sub:"What clusters of countries share similar profiles?" },
  { id:6, icon:"🎯", label:"Policy Prioritisation",  accent:C.coral,  sub:"Which countries need to act — and how urgently?" },
];

const TAG_STYLES = {
  purple:{ background:"rgba(139,128,249,.12)", color:"#b4acef" },
  blue:  { background:"rgba(59,130,246,.12)",  color:"#93c5fd" },
  teal:  { background:"rgba(20,184,166,.12)",  color:"#99f6e4" },
  pink:  { background:"rgba(236,72,153,.12)",  color:"#fbcfe8" },
  amber: { background:"rgba(245,158,11,.12)",  color:"#fde68a" },
  coral: { background:"rgba(244,63,94,.12)",   color:"#fecdd3" },
};

// ─── Fullscreen modal ─────────────────────────────────────────────────────────
function Modal({ varName, title, onClose }) {
  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:9999,
      background:"rgba(4,5,8,.92)",
      display:"flex",alignItems:"center",justifyContent:"center",
      backdropFilter:"blur(12px)",
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        width:"96vw",height:"93vh",background:C.card,
        border:`1px solid ${C.borderHi}`,borderRadius:16,
        display:"flex",flexDirection:"column",overflow:"hidden",
        boxShadow:"0 40px 80px rgba(0,0,0,.7)",
      }}>
        <div style={{
          padding:"14px 20px",borderBottom:`1px solid ${C.border}`,
          display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,
        }}>
          <span style={{fontSize:13,fontWeight:600,color:C.text}}>{title}</span>
          <button onClick={onClose} style={{
            background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,
            color:C.sub,fontSize:12,fontWeight:600,padding:"6px 16px",cursor:"pointer",
          }}>✕ Close</button>
        </div>
        <iframe src={`${process.env.PUBLIC_URL}/exports/${varName}.html`}
          width="100%" height="100%"
          style={{border:"none",display:"block",flex:1}} title={`${varName}-fs`} />
      </div>
    </div>
  );
}

// ─── Expand button ────────────────────────────────────────────────────────────
function ExpandBtn({ onClick }) {
  const [h,setH] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      title="Fullscreen"
      style={{
        background:h?"rgba(139,128,249,.15)":"rgba(14,16,24,.9)",
        border:`1px solid ${h?C.purple:C.border}`,borderRadius:8,
        color:h?C.purple:C.muted,width:32,height:32,cursor:"pointer",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:15,flexShrink:0,transition:"all .15s",
      }}>⤢</button>
  );
}

// ─── Tag chip ─────────────────────────────────────────────────────────────────
function Tag({ label, type }) {
  return (
    <span style={{
      ...TAG_STYLES[type],fontSize:11,fontWeight:500,
      padding:"3px 10px",borderRadius:20,whiteSpace:"nowrap",display:"inline-block",
    }}>{label}</span>
  );
}

// ─── KPI card ─────────────────────────────────────────────────────────────────
function KpiCard({ label, value, delta, dc, icon }) {
  return (
    <div style={{
      background:`linear-gradient(140deg,${C.card} 0%,${C.cardHi} 100%)`,
      border:`1px solid ${C.border}`,borderRadius:14,
      padding:"20px 20px 16px",position:"relative",overflow:"hidden",
      boxShadow:"0 4px 24px rgba(0,0,0,.2)",
    }}>
      <div style={{
        position:"absolute",top:0,right:0,
        width:64,height:64,
        background:`radial-gradient(circle at 80% 20%, ${dc}18 0%, transparent 70%)`,
        borderRadius:"0 14px 0 100%",
      }}/>
      <div style={{fontSize:20,marginBottom:10,lineHeight:1}}>{icon}</div>
      <div style={{fontSize:11,color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:".07em",marginBottom:8}}>{label}</div>
      <div style={{fontSize:28,fontWeight:800,color:C.text,letterSpacing:"-0.03em",lineHeight:1}}>{value}</div>
      <div style={{fontSize:12,marginTop:8,color:dc,fontWeight:500}}>{delta}</div>
    </div>
  );
}

// ─── Interaction banner ───────────────────────────────────────────────────────
function Banner({ interaction, accent }) {
  if (!interaction) return null;
  return (
    <div style={{
      background:`linear-gradient(90deg, ${accent}0d 0%, transparent 100%)`,
      border:`1px solid ${C.border}`,borderLeft:`3px solid ${accent}`,
      borderRadius:12,padding:"14px 20px",marginBottom:20,
      display:"flex",alignItems:"flex-start",gap:14,
    }}>
      <span style={{fontSize:18,flexShrink:0,marginTop:1}}>🖱️</span>
      <div style={{fontSize:13,color:C.sub,lineHeight:1.55}}>
        <span style={{color:C.text,fontWeight:600}}>
          Interaction {interaction.number} — {interaction.name}
        </span>
        {"  ·  "}
        {interaction.hint}
      </div>
    </div>
  );
}

// ─── Chart iframe ─────────────────────────────────────────────────────────────
function ChartFrame({ varName, height }) {
  return (
    <iframe src={`${process.env.PUBLIC_URL}/exports/${varName}.html`}
      width="100%" height={height}
      style={{border:"none",display:"block"}} title={varName} />
  );
}

// ─── Chart card ───────────────────────────────────────────────────────────────
function ChartCard({ title, sub, tag, tagType, varName, height, fullWidth, onExpand }) {
  return (
    <div style={{
      background:C.card,border:`1px solid ${C.border}`,borderRadius:14,
      overflow:"hidden",gridColumn:fullWidth?"1/-1":undefined,
      boxShadow:"0 6px 32px rgba(0,0,0,.25)",
    }}>
      <div style={{
        padding:"14px 18px",borderBottom:`1px solid ${C.border}`,
        display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,
      }}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:13,fontWeight:600,color:C.text,letterSpacing:"-0.01em"}}>{title}</div>
          {sub&&<div style={{fontSize:11,color:C.muted,marginTop:2}}>{sub}</div>}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          {tag&&<Tag label={tag} type={tagType}/>}
          <ExpandBtn onClick={()=>onExpand(varName,title)}/>
        </div>
      </div>
      <ChartFrame varName={varName} height={height}/>
    </div>
  );
}

// ─── Finding box ──────────────────────────────────────────────────────────────
function Finding({ text, label, accent }) {
  return (
    <div style={{
      background:`linear-gradient(160deg,${C.card} 0%,${C.cardHi} 100%)`,
      border:`1px solid ${C.border}`,borderLeft:`3px solid ${accent}`,
      borderRadius:14,padding:"20px 24px",marginTop:24,
      boxShadow:"0 4px 24px rgba(0,0,0,.2)",
    }}>
      <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".09em",color:accent,marginBottom:10}}>
        💡 {label||"Key finding"}
      </div>
      <div style={{fontSize:13,color:C.sub,lineHeight:1.75}}
        dangerouslySetInnerHTML={{__html:text
          .replace(/<b>/g,`<strong style="color:${C.text};font-weight:700">`)
          .replace(/<\/b>/g,"</strong>")}}/>
    </div>
  );
}

// ─── Overview page ────────────────────────────────────────────────────────────
function Overview({ onNavigate }) {
  return (
    <div>
      {/* Hero */}
      <div style={{
        background:`linear-gradient(135deg,${C.card} 0%,#0f1322 50%,${C.card} 100%)`,
        border:`1px solid ${C.border}`,borderRadius:20,
        padding:"40px 40px 36px",marginBottom:28,
        position:"relative",overflow:"hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position:"absolute",top:-60,right:-60,width:260,height:260,
          background:`radial-gradient(circle, ${C.purple}22 0%, transparent 70%)`,
          borderRadius:"50%",pointerEvents:"none",
        }}/>
        <div style={{
          position:"absolute",bottom:-80,left:100,width:200,height:200,
          background:`radial-gradient(circle, ${C.teal}18 0%, transparent 70%)`,
          borderRadius:"50%",pointerEvents:"none",
        }}/>

        <div style={{position:"relative"}}>
          <div style={{...pill("rgba(139,128,249,.15)","#AFA9EC"),marginBottom:16}}>
            CST4245 · Assessment 01 · MSc Data Science & AI
          </div>
          <h1 style={{
            fontSize:36,fontWeight:800,color:C.text,margin:"0 0 12px",
            letterSpacing:"-0.03em",lineHeight:1.1,
          }}>
            Global Metabolic<br/>
            <span style={{
              background:`linear-gradient(90deg,${C.purple},${C.teal})`,
              WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
            }}>Health Observatory</span>
          </h1>
          <p style={{fontSize:14,color:C.sub,margin:"0 0 28px",maxWidth:560,lineHeight:1.65}}>
            A visual analytics study of obesity, diabetes, and raised blood pressure
            across 200 countries from 1980 to 2014 — revealing how the global burden
            of metabolic disease has shifted, where it is concentrated, and which
            countries require the most urgent attention.
          </p>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {[
              {label:"6 sections",    accent:C.purple},
              {label:"5 interactive dashboards", accent:C.teal},
              {label:"15 supporting charts", accent:C.blue},
              {label:"Altair · Python", accent:C.amber},
            ].map(b=>(
              <div key={b.label} style={{
                background:`${b.accent}18`,border:`1px solid ${b.accent}44`,
                borderRadius:30,padding:"6px 14px",
                fontSize:12,color:b.accent,fontWeight:500,
              }}>{b.label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Global KPI strip */}
      <div style={{
        display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:12,marginBottom:28,
      }}>
        {OVERVIEW_STATS.map(s=>(
          <div key={s.label} style={{
            background:`linear-gradient(140deg,${C.card},${C.cardHi})`,
            border:`1px solid ${C.border}`,borderRadius:14,
            padding:"18px 16px",textAlign:"center",
            boxShadow:"0 4px 20px rgba(0,0,0,.2)",
            position:"relative",overflow:"hidden",
          }}>
            <div style={{
              position:"absolute",inset:0,
              background:`radial-gradient(circle at 50% 0%, ${s.accent}14 0%, transparent 70%)`,
              pointerEvents:"none",
            }}/>
            <div style={{fontSize:22,marginBottom:6}}>{s.icon}</div>
            <div style={{fontSize:22,fontWeight:800,color:C.text,letterSpacing:"-0.02em",lineHeight:1}}>{s.value}</div>
            <div style={{fontSize:10,color:C.muted,marginTop:6,lineHeight:1.4,fontWeight:500}}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section navigation cards */}
      <div style={{marginBottom:12}}>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:C.muted,marginBottom:16}}>
          Explore sections
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14}}>
          {OVERVIEW_SECTIONS.map((s,i)=>(
            <button key={s.id} onClick={()=>onNavigate(s.id)}
              style={{
                background:`linear-gradient(140deg,${C.card} 0%,${C.cardHi} 100%)`,
                border:`1px solid ${C.border}`,borderRadius:16,
                padding:"22px 22px 18px",cursor:"pointer",textAlign:"left",
                transition:"all .2s",position:"relative",overflow:"hidden",
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.borderColor=s.accent+"88";
                e.currentTarget.style.transform="translateY(-2px)";
                e.currentTarget.style.boxShadow=`0 12px 40px ${s.accent}18`;
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.borderColor=C.border;
                e.currentTarget.style.transform="translateY(0)";
                e.currentTarget.style.boxShadow="none";
              }}
            >
              <div style={{
                position:"absolute",top:0,right:0,
                width:80,height:80,
                background:`radial-gradient(circle at 80% 20%, ${s.accent}20 0%, transparent 70%)`,
                borderRadius:"0 16px 0 100%",
              }}/>
              <div style={{
                display:"inline-flex",alignItems:"center",justifyContent:"center",
                width:40,height:40,borderRadius:12,
                background:`${s.accent}18`,border:`1px solid ${s.accent}44`,
                fontSize:20,marginBottom:14,
              }}>{s.icon}</div>
              <div style={{
                fontSize:10,fontWeight:700,textTransform:"uppercase",
                letterSpacing:".07em",color:s.accent,marginBottom:6,
              }}>
                Section 0{i+1}
              </div>
              <div style={{fontSize:15,fontWeight:700,color:C.text,marginBottom:6,letterSpacing:"-0.01em"}}>
                {s.label}
              </div>
              <div style={{fontSize:12,color:C.muted,lineHeight:1.5}}>
                {s.sub}
              </div>
              <div style={{
                marginTop:14,fontSize:11,color:s.accent,fontWeight:600,
                display:"flex",alignItems:"center",gap:4,
              }}>
                Explore →
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Story arc */}
      <div style={{
        background:`linear-gradient(160deg,${C.card},${C.cardHi})`,
        border:`1px solid ${C.border}`,borderLeft:`3px solid ${C.purple}`,
        borderRadius:14,padding:"20px 24px",marginTop:14,
      }}>
        <div style={{fontSize:10,fontWeight:800,textTransform:"uppercase",letterSpacing:".09em",color:C.purple,marginBottom:10}}>
          📖 The story
        </div>
        <div style={{fontSize:13,color:C.sub,lineHeight:1.75}}>
          The world is experiencing a <strong style={{color:C.text}}>silent metabolic health crisis</strong>. Between 1980 and 2014, global obesity prevalence more than doubled, and diabetes rose substantially — while raised blood pressure, once the dominant concern, declined due to medication uptake. The burden is not evenly distributed: <strong style={{color:C.text}}>Pacific Island nations and Gulf states</strong> carry the highest combined risk, while Sub-Saharan Africa and South Asia — currently lower-burden — are growing fastest and represent the next wave. Gender matters too: women carry disproportionately higher obesity burden globally, while men show higher blood pressure. This dashboard presents the data across six sections, from global trends to country-level policy priorities.
        </div>
      </div>
    </div>
  );
}

// ─── Section panel ────────────────────────────────────────────────────────────
function SectionPanel({ section }) {
  const { accent, tagClass, kpis, interaction, charts, extraChart, finding, findingLabel } = section;
  const [modal, setModal] = useState(null);
  const threeCol = section.id === 4;
  const open = (v,t) => setModal({varName:v,title:t});

  return (
    <div>
      {modal && <Modal varName={modal.varName} title={modal.title} onClose={()=>setModal(null)}/>}

      {/* KPIs */}
      {kpis && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
          {kpis.map(k=>(
            <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} dc={k.dc} icon={k.icon}/>
          ))}
        </div>
      )}

      {/* Interaction banner */}
      <Banner interaction={interaction} accent={accent}/>

      {/* Main interaction chart */}
      {interaction && (
        <div style={{marginBottom:24}}>
          <div style={{
            background:C.card,border:`1px solid ${C.border}`,borderRadius:14,
            overflow:"hidden",boxShadow:"0 6px 32px rgba(0,0,0,.25)",
          }}>
            <div style={{
              padding:"14px 18px",borderBottom:`1px solid ${C.border}`,
              display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,
            }}>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:C.text,letterSpacing:"-0.01em"}}>
                  Interaction {interaction.number} — {interaction.name}
                </div>
                <div style={{fontSize:11,color:C.muted,marginTop:2}}>Linked interactive dashboard</div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                <Tag label="Interactive" type={tagClass}/>
                <ExpandBtn onClick={()=>open(interaction.varName,`Interaction ${interaction.number} — ${interaction.name}`)}/>
              </div>
            </div>
            <ChartFrame varName={interaction.varName} height={interaction.height}/>
          </div>
        </div>
      )}

      {/* Supporting charts */}
      {charts && (
        <div style={{
          display:"grid",
          gridTemplateColumns:threeCol?"repeat(3,1fr)":"repeat(2,1fr)",
          gap:16,marginBottom:16,
        }}>
          {charts.map(ch=>(
            <ChartCard key={ch.varName} title={ch.title} sub={ch.sub}
              tag={ch.tag} tagType={tagClass} varName={ch.varName}
              height={ch.height} onExpand={open}/>
          ))}
        </div>
      )}

      {/* Full-width extra chart */}
      {extraChart && (
        <div style={{marginBottom:16}}>
          <ChartCard title={extraChart.title} sub={extraChart.sub}
            tag={extraChart.tag} tagType={tagClass} varName={extraChart.varName}
            height={extraChart.height} fullWidth onExpand={open}/>
        </div>
      )}

      {finding && <Finding text={finding} label={findingLabel} accent={accent}/>}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(0);
  const sec = SECTIONS[active];
  const isOverview = active === 0;

  return (
    <div style={{
      display:"flex",height:"100vh",overflow:"hidden",
      background:C.bg,color:C.text,
      fontFamily:'"Inter",system-ui,-apple-system,sans-serif',
    }}>
      {/* ── Sidebar ── */}
      <div style={{
        width:240,minWidth:240,background:C.surface,
        borderRight:`1px solid ${C.border}`,
        display:"flex",flexDirection:"column",
      }}>
        {/* Logo */}
        <div style={{padding:"24px 20px 20px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{
            display:"inline-flex",alignItems:"center",justifyContent:"center",
            width:36,height:36,borderRadius:10,
            background:"linear-gradient(135deg,#8B80F9,#14B8A6)",
            fontSize:18,marginBottom:12,
          }}>🔬</div>
          <div style={{fontSize:12,fontWeight:700,color:C.text,letterSpacing:".05em",textTransform:"uppercase",lineHeight:1.4}}>
            Global Metabolic<br/>Health Observatory
          </div>
          <div style={{fontSize:10,color:C.muted,marginTop:5,fontWeight:500}}>CST4245 · Assessment 01</div>
        </div>

        {/* Nav */}
        <div style={{flex:1,padding:"14px 10px",overflowY:"auto"}}>
          {/* Overview */}
          <button onClick={()=>setActive(0)} style={{
            display:"flex",alignItems:"center",gap:10,
            padding:"10px 12px",borderRadius:10,cursor:"pointer",
            fontSize:13,width:"100%",textAlign:"left",marginBottom:2,
            color:active===0?"#fff":C.muted,
            background:active===0?`${C.purple}20`:"transparent",
            border:active===0?`1px solid ${C.purple}44`:"1px solid transparent",
            fontWeight:active===0?600:400,transition:"all .15s",
          }}>
            <span style={{fontSize:15,opacity:active===0?1:.6}}>🏠</span>
            <span>Overview</span>
          </button>

          <div style={{fontSize:9,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.muted,padding:"12px 12px 6px"}}>
            Analysis sections
          </div>

          {SECTIONS.slice(1).map(s=>(
            <button key={s.id} onClick={()=>setActive(s.id)} style={{
              display:"flex",alignItems:"center",gap:10,
              padding:"10px 12px",borderRadius:10,cursor:"pointer",
              fontSize:13,width:"100%",textAlign:"left",marginBottom:2,
              color:active===s.id?"#fff":C.muted,
              background:active===s.id?`${s.accent}20`:"transparent",
              border:active===s.id?`1px solid ${s.accent}44`:"1px solid transparent",
              fontWeight:active===s.id?600:400,transition:"all .15s",
            }}
            onMouseEnter={e=>{if(active!==s.id){e.currentTarget.style.background=`${s.accent}0d`;e.currentTarget.style.color=C.text;}}}
            onMouseLeave={e=>{if(active!==s.id){e.currentTarget.style.background="transparent";e.currentTarget.style.color=C.muted;}}}
            >
              <span style={{fontSize:15,opacity:active===s.id?1:.6}}>{s.icon}</span>
              <span>{s.nav}</span>
              {active===s.id&&(
                <div style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:s.accent,flexShrink:0}}/>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          padding:"14px 20px",borderTop:`1px solid ${C.border}`,
          fontSize:10,color:C.muted,fontWeight:500,lineHeight:1.6,
        }}>
          200 countries · 1980–2014<br/>Altair · Python
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

        {/* Topbar */}
        <div style={{
          background:C.surface,borderBottom:`1px solid ${C.border}`,
          padding:"0 32px",height:64,
          display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,
        }}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <span style={{
              fontSize:9,fontWeight:800,letterSpacing:".07em",textTransform:"uppercase",
              padding:"5px 12px",borderRadius:6,
              color:sec.badgeColor,background:sec.badgeBg,
            }}>{sec.badge}</span>
            <span style={{fontSize:17,fontWeight:800,color:C.text,letterSpacing:"-0.02em"}}>{sec.title}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            {[["200","countries"],["1980–2014","period"],["3","indicators"]].map(([v,l])=>(
              <div key={l} style={{
                background:"rgba(14,16,24,.7)",border:`1px solid ${C.border}`,
                borderRadius:30,padding:"5px 14px",fontSize:11,color:C.muted,
              }}>
                <span style={{color:C.text,fontWeight:700}}>{v}</span> {l}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:"28px 32px",background:C.bg}}>
          {isOverview
            ? <Overview onNavigate={setActive}/>
            : <SectionPanel section={sec}/>
          }
        </div>
      </div>
    </div>
  );
}
