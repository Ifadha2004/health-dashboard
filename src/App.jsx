import { useState } from "react";

// ─── Colour tokens ───────────────────────────────────────────────────────────
const C = {
  bg:       "#0d0f14",
  surface:  "#13161e",
  card:     "#1a1e28",
  border:   "#2a2e3d",
  text:     "#e8eaf0",
  muted:    "#6b7280",
  subtle:   "#3a3f52",
  purple:   "#7F77DD",
  teal:     "#1D9E75",
  coral:    "#D85A30",
  blue:     "#378ADD",
  pink:     "#D4537E",
  amber:    "#BA7517",
  red:      "#d62728",
  orange:   "#ff7f0e",
  gray:     "#7f7f7f",
};

// ─── Section metadata ────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 0,
    icon: "📈",
    nav: "Global Landscape",
    badge: "Section 01",
    title: "Global Health Landscape",
    accent: C.purple,
    badgeBg: "#26215C",
    badgeColor: "#AFA9EC",
    tagClass: "purple",
    kpis: [
      { label: "Obesity growth",    value: "+180%", delta: "Fastest rising indicator",  dc: C.teal   },
      { label: "Diabetes growth",   value: "+90%",  delta: "Steady upward trend",       dc: C.amber  },
      { label: "Blood pressure",    value: "−12%",  delta: "Declined post-2000",        dc: C.red    },
      { label: "Study period",      value: "35 yrs",delta: "1980 → 2014",              dc: C.muted  },
    ],
    interaction: {
      number: 1,
      name: "Global Risk Shift Explorer",
      hint: "Click the legend to isolate an indicator. Drag a year range on the top chart to zoom the relative growth view below.",
      varName: "interaction_1_global_risk_shift",
      icon: "🖱️",
      height: 460,
    },
    charts: [
      {
        title: "Q1A — Absolute global trends",
        sub: "Average prevalence (%) over time",
        tag: "Line",
        varName: "chart_q1a",
        icon: "📉",
        height: 260,
      },
      {
        title: "Q1B — Relative growth index",
        sub: "1980 = 100 baseline comparison",
        tag: "Index",
        varName: "chart_q1b",
        icon: "📈",
        height: 260,
      },
    ],
    finding: "Obesity grew approximately <b>3× faster</b> than any other indicator between 1980 and 2014. Raised blood pressure, by contrast, declined after 2000 — suggesting that antihypertensive medication and public health campaigns had measurable population-level impact, while the obesity epidemic remained largely unchecked.",
  },
  {
    id: 1,
    icon: "🌍",
    nav: "Geographic Risk",
    badge: "Section 02",
    title: "Geographic Risk",
    accent: C.blue,
    badgeBg: "#042C53",
    badgeColor: "#85B7EB",
    tagClass: "blue",
    kpis: [
      { label: "Highest burden",  value: "Pacific",  delta: "Nauru, Cook Is., Palau", dc: C.red    },
      { label: "Fastest growth",  value: "Africa",   delta: "Sub-Saharan region",     dc: C.amber  },
      { label: "Gulf states",     value: "Top 5",    delta: "In risk ranking (2014)",  dc: C.orange },
      { label: "Countries mapped",value: "200",      delta: "Global coverage",         dc: C.muted  },
    ],
    interaction: {
      number: 2,
      name: "Country Spotlight Dashboard",
      hint: "Click any country in the ranking bar chart to update its indicator profile, long-term trend, and map highlight simultaneously.",
      varName: "interaction_2_country_spotlight",
      icon: "🖱️",
      height: 540,
    },
    charts: [
      {
        title: "Q2 — Highest burden countries",
        sub: "Top 20 by combined risk score (2014)",
        tag: "Bar",
        varName: "chart_q2",
        icon: "📊",
        height: 280,
      },
      {
        title: "Q4 — Change over time",
        sub: "Biggest improvers and deteriorators",
        tag: "Diverging bar",
        varName: "chart_q4",
        icon: "↔️",
        height: 280,
      },
    ],
    extraChart: {
      title: "Q3 — Global choropleth",
      sub: "Combined metabolic risk score by country (2014)",
      tag: "Map",
      varName: "chart_q3",
      icon: "🗺️",
      height: 320,
    },
    finding: "Pacific Island nations (Nauru, Cook Islands, Palau) and Gulf states consistently top the combined risk ranking, driven by dietary transition and sedentary lifestyles. Sub-Saharan Africa shows the lowest current burden but the highest growth trajectory — making it a critical region for early prevention investment.",
  },
  {
    id: 2,
    icon: "⚧",
    nav: "Gender Disparities",
    badge: "Section 03",
    title: "Gender Disparities",
    accent: C.pink,
    badgeBg: "#4B1528",
    badgeColor: "#ED93B1",
    tagClass: "pink",
    kpis: [
      { label: "Obesity gap",       value: "Women",  delta: "Higher globally",        dc: C.pink   },
      { label: "Blood pressure gap",value: "Men",    delta: "Higher globally",        dc: C.blue   },
      { label: "Diabetes gap",      value: "Mixed",  delta: "Varies by region",       dc: C.teal   },
      { label: "Countries analysed",value: "Top 20", delta: "Largest gender gaps",    dc: C.muted  },
    ],
    interaction: {
      number: 3,
      name: "Gender Disparity Explorer",
      hint: "Use the dropdown to switch health indicator. Click a country on the dumbbell chart to see its male vs female trend over time.",
      varName: "interaction_3_gender_disparity",
      icon: "🖱️",
      height: 540,
    },
    charts: [
      {
        title: "Q5 — Obesity trend by gender",
        sub: "Global average, men vs women 1980–2014",
        tag: "Line",
        varName: "chart_q5",
        icon: "📉",
        height: 260,
      },
      {
        title: "Q6 — Largest gender gaps",
        sub: "Top 20 countries by male/female risk difference",
        tag: "Dumbbell",
        varName: "chart_q6",
        icon: "⚫",
        height: 260,
      },
    ],
    finding: "Women carry a <b>consistently higher obesity burden</b> across nearly all countries, while men show higher raised blood pressure prevalence. The gender gap in obesity has <b>widened since 2000</b>, particularly in Middle Eastern and North African countries, suggesting that public health campaigns need explicit gender-differentiated strategies.",
  },
  {
    id: 3,
    icon: "⚛",
    nav: "Indicator Relationships",
    badge: "Section 04",
    title: "Indicator Relationships",
    accent: C.teal,
    badgeBg: "#04342C",
    badgeColor: "#5DCAA5",
    tagClass: "teal",
    kpis: [
      { label: "Obesity–diabetes",   value: "r ≈ 0.6",  delta: "Moderate positive link",    dc: C.teal   },
      { label: "Obesity–BP",         value: "Weak –ve", delta: "Inverse relationship",       dc: C.blue   },
      { label: "Outlier nations",    value: "Gulf",     delta: "High diabetes vs low obesity",dc: C.amber  },
      { label: "Deviation method",   value: "Residuals",delta: "From regression line",       dc: C.muted  },
    ],
    interaction: {
      number: 4,
      name: "Obesity–Diabetes Relationship Explorer",
      hint: "Drag a selection box over the scatter plot to filter which countries appear in the deviation bar chart on the right.",
      varName: "interaction_4_obesity_diabetes",
      icon: "🖱️",
      height: 480,
    },
    charts: [
      {
        title: "Q6.5 — Correlation matrix",
        sub: "Pairwise strength between indicators",
        tag: "Heatmap",
        varName: "chart_q6_5",
        icon: "🔲",
        height: 220,
      },
      {
        title: "Q7 — Obesity vs diabetes",
        sub: "Scatter + regression line (2014)",
        tag: "Scatter",
        varName: "chart_q7",
        icon: "⚬",
        height: 220,
      },
      {
        title: "Q9 — Pattern deviations",
        sub: "Countries above/below expected diabetes",
        tag: "Residuals",
        varName: "chart_q9",
        icon: "⚬",
        height: 220,
      },
    ],
    finding: "Obesity and diabetes are <b>positively correlated</b> globally, but the relationship is far from uniform. Several Gulf and Pacific Island nations show <b>disproportionately high diabetes</b> relative to their obesity levels — pointing to genetic predisposition and dietary composition (high refined carbohydrate intake) as independent risk factors beyond BMI alone.",
  },
  {
    id: 4,
    icon: "🔵",
    nav: "Country Segmentation",
    badge: "Section 05",
    title: "Country Segmentation",
    accent: C.amber,
    badgeBg: "#412402",
    badgeColor: "#EF9F27",
    tagClass: "amber",
    kpis: [
      { label: "Clusters identified", value: "4",       delta: "K-Means, k=4",            dc: C.amber  },
      { label: "High-risk cluster",   value: "Pacific", delta: "Highest combined burden",  dc: C.red    },
      { label: "Low-risk cluster",    value: "Africa",  delta: "But fastest growing",      dc: C.teal   },
      { label: "Risk transitions",    value: "80%+",    delta: "Countries moved upward",   dc: C.blue   },
    ],
    interaction: null,
    charts: [
      {
        title: "Q10 — Country health clusters",
        sub: "K-Means + PCA projection (2014)",
        tag: "Cluster",
        varName: "chart_q10",
        icon: "🔵",
        height: 320,
      },
      {
        title: "Q11 — Cluster profiles",
        sub: "Average indicator values per cluster",
        tag: "Grouped bar",
        varName: "chart_q11",
        icon: "📊",
        height: 320,
      },
    ],
    extraChart: {
      title: "Q12 — Risk category transitions (1980 → 2014)",
      sub: "How many countries moved between Low / Moderate / High / Critical risk categories",
      tag: "Heatmap",
      varName: "chart_q12",
      icon: "🔲",
      height: 280,
    },
    finding: "Four distinct health profiles emerge: <b>high combined burden</b> (Pacific Islands, Gulf states), <b>elevated mixed risk</b> (high-income Western nations), <b>moderate</b> (Latin America, Eastern Europe), and <b>low current risk</b> (Sub-Saharan Africa, South/Southeast Asia). The transition heatmap shows that <b>over 80% of countries escalated at least one risk category</b> between 1980 and 2014.",
  },
  {
    id: 5,
    icon: "🎯",
    nav: "Policy Prioritisation",
    badge: "Section 06",
    title: "Policy Prioritisation",
    accent: C.coral,
    badgeBg: "#4A1B0C",
    badgeColor: "#F0997B",
    tagClass: "coral",
    kpis: [
      { label: "Urgent intervention", value: "~50", delta: "High risk + high growth",   dc: C.red    },
      { label: "Maintain / control",  value: "~50", delta: "High risk, slower growth",  dc: C.orange },
      { label: "Early prevention",    value: "~50", delta: "Low risk but accelerating", dc: C.blue   },
      { label: "Monitoring",          value: "~50", delta: "Low risk + low growth",     dc: C.gray   },
    ],
    interaction: {
      number: 5,
      name: "Policy Priority Matrix",
      hint: "Use the sliders to adjust the risk and growth thresholds. Click a priority category to filter the country list on the right.",
      varName: "interaction_5_policy_priority",
      icon: "🖱️",
      height: 560,
    },
    charts: [
      {
        title: "Q13 — Fastest deteriorating countries",
        sub: "Greatest % growth in risk score 1980–2014",
        tag: "Bar",
        varName: "chart_q13",
        icon: "📊",
        height: 260,
      },
      {
        title: "Q15 — Future hotspot index",
        sub: "Normalised priority index: current burden + growth",
        tag: "Bar",
        varName: "chart_q15",
        icon: "🔥",
        height: 260,
      },
    ],
    finding: "The priority matrix reveals that countries requiring <b>urgent intervention</b> (high current burden + high growth) are concentrated in the Pacific and Gulf regions. Countries in the <b>early prevention</b> quadrant — particularly in Sub-Saharan Africa — represent the highest-leverage opportunity: acting now, before burdens escalate, is dramatically more cost-effective than managing chronic disease at scale.",
    findingLabel: "Policy recommendation",
  },
];

// ─── Tag colours ─────────────────────────────────────────────────────────────
const TAG_STYLES = {
  purple: { background: "#26215C", color: "#AFA9EC" },
  blue:   { background: "#042C53", color: "#85B7EB" },
  teal:   { background: "#04342C", color: "#5DCAA5" },
  pink:   { background: "#4B1528", color: "#ED93B1" },
  amber:  { background: "#412402", color: "#EF9F27" },
  coral:  { background: "#4A1B0C", color: "#F0997B" },
};

// ─── Fullscreen Modal ────────────────────────────────────────────────────────
function FullscreenModal({ varName, title, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "95vw", height: "92vh",
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{
          padding: "12px 16px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: C.subtle, border: "none", borderRadius: 6,
              color: C.text, fontSize: 13, fontWeight: 500,
              padding: "5px 14px", cursor: "pointer",
            }}
          >
            ✕ Close
          </button>
        </div>
        <iframe
          src={`${process.env.PUBLIC_URL}/exports/${varName}.html`}
          width="100%"
          height="100%"
          style={{ border: "none", display: "block", flex: 1 }}
          title={`${varName}-fullscreen`}
        />
      </div>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
function Tag({ label, type }) {
  return (
    <span style={{
      ...TAG_STYLES[type],
      display: "inline-block",
      fontSize: 10,
      fontWeight: 600,
      padding: "3px 8px",
      borderRadius: 12,
      letterSpacing: ".04em",
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function KpiCard({ label, value, delta, deltaColor }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "14px 16px",
    }}>
      <div style={{ fontSize: 10, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>{value}</div>
      <div style={{ fontSize: 11, marginTop: 4, color: deltaColor || C.muted }}>{delta}</div>
    </div>
  );
}

function InteractionBanner({ interaction, accent }) {
  if (!interaction) return null;
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: 10,
      padding: "12px 16px",
      marginBottom: 16,
      display: "flex",
      alignItems: "flex-start",
      gap: 12,
    }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>{interaction.icon}</span>
      <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
        <span style={{ color: C.text, fontWeight: 500 }}>
          Interaction {interaction.number} — {interaction.name}
        </span>
        <br />{interaction.hint}
      </div>
    </div>
  );
}

function ChartPlaceholder({ varName, height }) {
  return (
    <iframe
      src={`${process.env.PUBLIC_URL}/exports/${varName}.html`}
      width="100%"
      height={height}
      style={{ border: "none", display: "block" }}
      title={varName}
    />
  );
}

function ExpandBtn({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      title="View fullscreen"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? C.subtle : "rgba(13,15,20,0.8)",
        border: `1px solid ${hov ? C.subtle : C.border}`,
        borderRadius: 6, color: hov ? C.text : C.muted,
        width: 28, height: 28, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, flexShrink: 0, transition: "all .15s",
      }}
    >⤢</button>
  );
}

function ChartCard({ title, sub, tag, tagType, varName, icon, height, fullWidth, onExpand }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      overflow: "hidden",
      gridColumn: fullWidth ? "1 / -1" : undefined,
    }}>
      <div style={{
        padding: "14px 16px 10px",
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 12,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{title}</div>
          {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{sub}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {tag && <Tag label={tag} type={tagType} />}
          <ExpandBtn onClick={() => onExpand(varName, title)} />
        </div>
      </div>
      <ChartPlaceholder varName={varName} height={height} />
    </div>
  );
}

function FindingBox({ text, label, accent }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: 10,
      padding: "14px 16px",
      marginTop: 16,
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: ".06em",
        color: accent,
        marginBottom: 8,
      }}>
        💡 {label || "Key finding"}
      </div>
      <div
        style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: text.replace(/<b>/g, `<strong style="color:${C.text};font-weight:500">`).replace(/<\/b>/g, "</strong>") }}
      />
    </div>
  );
}

// ─── Section panels ───────────────────────────────────────────────────────────
function SectionPanel({ section }) {
  const { accent, tagClass, kpis, interaction, charts, extraChart, finding, findingLabel } = section;
  const [modal, setModal] = useState(null); // { varName, title }
  const threeColCharts = section.id === 3;
  const openModal = (varName, title) => setModal({ varName, title });
  const closeModal = () => setModal(null);

  return (
    <div>
      {/* Fullscreen modal */}
      {modal && <FullscreenModal varName={modal.varName} title={modal.title} onClose={closeModal} />}

      {/* KPIs */}
      {kpis && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
          {kpis.map((k) => (
            <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} deltaColor={k.dc} />
          ))}
        </div>
      )}

      {/* Interaction banner */}
      <InteractionBanner interaction={interaction} accent={accent} />

      {/* Main interaction chart */}
      {interaction && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{
              padding: "14px 16px 10px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>
                  Interaction {interaction.number} — {interaction.name}
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>
                  Linked interactive dashboard
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <Tag label="Interactive" type={tagClass} />
                <ExpandBtn onClick={() => openModal(interaction.varName, `Interaction ${interaction.number} — ${interaction.name}`)} />
              </div>
            </div>
            <ChartPlaceholder varName={interaction.varName} height={interaction.height} />
          </div>
        </div>
      )}

      {/* Supporting charts */}
      {charts && (
        <div style={{
          display: "grid",
          gridTemplateColumns: threeColCharts ? "repeat(3,1fr)" : "repeat(2,1fr)",
          gap: 16,
          marginBottom: 16,
        }}>
          {charts.map((ch) => (
            <ChartCard
              key={ch.varName}
              title={ch.title}
              sub={ch.sub}
              tag={ch.tag}
              tagType={tagClass}
              varName={ch.varName}
              icon={ch.icon}
              height={ch.height}
              onExpand={openModal}
            />
          ))}
        </div>
      )}

      {/* Extra full-width chart (geographic + segmentation) */}
      {extraChart && (
        <div style={{ marginBottom: 16 }}>
          <ChartCard
            title={extraChart.title}
            sub={extraChart.sub}
            tag={extraChart.tag}
            tagType={tagClass}
            varName={extraChart.varName}
            icon={extraChart.icon}
            height={extraChart.height}
            fullWidth
            onExpand={openModal}
          />
        </div>
      )}

      {/* Key finding */}
      {finding && (
        <FindingBox text={finding} label={findingLabel} accent={accent} />
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState(0);
  const sec = SECTIONS[active];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg, color: C.text, fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: 220,
        minWidth: 220,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px 16px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text, letterSpacing: ".04em", textTransform: "uppercase", lineHeight: 1.4 }}>
            Global Metabolic<br />Health Observatory
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>CST4245 · Assessment 01</div>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: C.muted, padding: "8px 8px 4px" }}>
            Sections
          </div>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 10px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 13,
                color: active === s.id ? "#fff" : C.muted,
                background: active === s.id ? s.accent + "22" : "transparent",
                border: active === s.id ? `1px solid ${s.accent}44` : "1px solid transparent",
                width: "100%",
                textAlign: "left",
                marginBottom: 2,
                fontWeight: active === s.id ? 500 : 400,
                transition: "all .15s",
              }}
            >
              <span style={{ fontSize: 15, flexShrink: 0 }}>{s.icon}</span>
              <span>{s.nav}</span>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted }}>
          200 countries · 1980–2014 · Altair / Python
        </div>
      </div>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <div style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase",
              padding: "4px 10px", borderRadius: 20, color: sec.badgeColor, background: sec.badgeBg,
            }}>
              {sec.badge}
            </span>
            <span style={{ fontSize: 15, fontWeight: 500, color: C.text }}>{sec.title}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {[["200", "countries"], ["1980–2014", "period"], ["3", "indicators"]].map(([val, lbl]) => (
              <div key={lbl} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 20, padding: "5px 12px", fontSize: 12, color: C.muted,
              }}>
                <span style={{ color: C.text, fontWeight: 500 }}>{val}</span> {lbl}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px", background: C.bg }}>
          <SectionPanel section={sec} />
        </div>
      </div>
    </div>
  );
}
