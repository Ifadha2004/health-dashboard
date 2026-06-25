import { useState } from "react";

// ─── Premium Colour Tokens ───────────────────────────────────────────────────
const C = {
  bg:       "#0a0c10",
  surface:  "#111319",
  card:     "#171a23",
  border:   "#222735",
  text:     "#f1f3f9",
  muted:    "#8a93a6",
  subtle:   "#2c3142",
  purple:   "#8B80F9",
  teal:     "#14B8A6",
  coral:    "#F43F5E",
  blue:     "#3B82F6",
  pink:     "#EC4899",
  amber:    "#F59E0B",
  red:      "#EF4444",
  orange:   "#F97316",
  gray:     "#6B7280",
};

// ─── Section Metadata ────────────────────────────────────────────────────────
const SECTIONS = [
  {
    id: 0,
    icon: "📈",
    nav: "Global Landscape",
    badge: "Section 01",
    title: "Global Health Landscape",
    accent: C.purple,
    badgeBg: "rgba(139, 128, 249, 0.15)",
    badgeColor: "#AFA9EC",
    tagClass: "purple",
    kpis: [
      { label: "Obesity growth",    value: "+143%",  delta: "Fastest rising indicator",   dc: C.teal  },
      { label: "Diabetes growth",   value: "+90%",   delta: "Steady upward trend",        dc: C.amber },
      { label: "Blood pressure",    value: "−18.8%", delta: "Overall decline, 1980–2014", dc: C.red   },
      { label: "Study period",      value: "35 yrs", delta: "1980 → 2014",               dc: C.muted },
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
    finding: "Obesity was the <b>fastest-rising indicator</b>, increasing from 8.38% in 1980 to 20.34% in 2014, a relative rise of 142.6%. Diabetes also increased substantially, while raised blood pressure declined overall, showing that global metabolic risk has shifted away from blood-pressure dominance toward obesity- and diabetes-linked burden.",
  },
  {
    id: 1,
    icon: "🌍",
    nav: "Geographic Risk",
    badge: "Section 02",
    title: "Geographic Risk",
    accent: C.blue,
    badgeBg: "rgba(59, 130, 246, 0.15)",
    badgeColor: "#85B7EB",
    tagClass: "blue",
    kpis: [
      { label: "Highest burden",   value: "Pacific",  delta: "American Samoa, Nauru, Cook Is.", dc: C.red    },
      { label: "Fastest growth",   value: "Pacific+", delta: "Tokelau, Solomon Is., PNG",       dc: C.amber  },
      { label: "Gulf states",      value: "Top 20",   delta: "Kuwait, Qatar, Saudi Arabia",     dc: C.orange },
      { label: "Countries mapped", value: "200",      delta: "Global coverage",                 dc: C.muted  },
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
    finding: "Pacific Island countries dominate the highest combined-risk ranking in 2014, with <b>American Samoa, Nauru, Cook Islands, Palau, and Niue</b> occupying the top positions. Gulf countries also appear within the wider high-risk group, but not the top five. The change analysis shows that several Pacific and other developing contexts experienced rapid risk growth, while currently lower-risk countries require early prevention before burdens escalate further.",
  },
  {
    id: 2,
    icon: "⚧",
    nav: "Gender Disparities",
    badge: "Section 03",
    title: "Gender Disparities",
    accent: C.pink,
    badgeBg: "rgba(236, 72, 153, 0.15)",
    badgeColor: "#ED93B1",
    tagClass: "pink",
    kpis: [
      { label: "Obesity gap",        value: "Women",  delta: "Higher globally",     dc: C.pink  },
      { label: "Blood pressure gap", value: "Men",    delta: "Higher globally",     dc: C.blue  },
      { label: "Diabetes gap",       value: "Mixed",  delta: "Varies by region",    dc: C.teal  },
      { label: "Countries analysed", value: "Top 20", delta: "Largest gender gaps", dc: C.muted },
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
    finding: "Women show a <b>consistently higher global obesity burden</b>, while men show higher raised blood pressure prevalence. The largest combined-risk gender gaps are concentrated in countries such as Lesotho, South Africa, Swaziland, Botswana, and Zimbabwe, suggesting that gender-sensitive health strategies are needed rather than uniform national campaigns.",
  },
  {
    id: 3,
    icon: "⚛",
    nav: "Indicator Relationships",
    badge: "Section 04",
    title: "Indicator Relationships",
    accent: C.teal,
    badgeBg: "rgba(20, 184, 166, 0.15)",
    badgeColor: "#5DCAA5",
    tagClass: "teal",
    kpis: [
      { label: "Obesity–diabetes", value: "r ≈ 0.76",  delta: "Strong positive link",           dc: C.teal  },
      { label: "Obesity–BP",       value: "r ≈ −0.34", delta: "Weak inverse relationship",      dc: C.blue  },
      { label: "Outlier nations",  value: "Pacific+",  delta: "Higher diabetes than expected", dc: C.amber },
      { label: "Deviation method", value: "Residuals", delta: "From regression line",          dc: C.muted },
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
    finding: "Obesity and diabetes are <b>strongly positively correlated</b> globally, with r ≈ 0.76, but the relationship is not uniform. Countries such as Tokelau, American Samoa, Niue, Afghanistan, Nauru, Pakistan, and Kuwait show higher diabetes prevalence than expected based on obesity alone. This suggests that BMI is an important but incomplete explanation, and that additional demographic, dietary, genetic, healthcare, or socioeconomic factors may influence diabetes burden.",
  },
  {
    id: 4,
    icon: "🔵",
    nav: "Country Segmentation",
    badge: "Section 05",
    title: "Country Segmentation",
    accent: C.amber,
    badgeBg: "rgba(245, 158, 11, 0.15)",
    badgeColor: "#EF9F27",
    tagClass: "amber",
    kpis: [
      { label: "Clusters identified", value: "4",     delta: "K-Means, k=4",                  dc: C.amber },
      { label: "High-risk cluster",   value: "14",    delta: "Mostly Pacific countries",      dc: C.red   },
      { label: "Low-risk cluster",    value: "90",    delta: "Lower current combined burden", dc: C.teal  },
      { label: "Risk transitions",    value: "46.5%", delta: "Countries moved upward",        dc: C.blue  },
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
    finding: "Four distinct health profiles emerge from the clustering analysis. The <b>high combined-risk cluster</b> is dominated by Pacific Island countries, while the elevated mixed-risk cluster includes several Gulf, North African, Caribbean, and high-burden middle-income contexts. The transition heatmap shows that <b>46.5% of countries moved into a higher risk category</b> between 1980 and 2014, while only 2.5% improved, indicating that risk progression was far more common than risk reduction.",
  },
  {
    id: 5,
    icon: "🎯",
    nav: "Policy Prioritisation",
    badge: "Section 06",
    title: "Policy Prioritisation",
    accent: C.coral,
    badgeBg: "rgba(244, 63, 94, 0.15)",
    badgeColor: "#F0997B",
    tagClass: "coral",
    kpis: [
      { label: "Urgent intervention", value: "46", delta: "High risk + high growth",   dc: C.red    },
      { label: "Maintain / control",  value: "54", delta: "High risk, slower growth",  dc: C.orange },
      { label: "Early prevention",    value: "54", delta: "Low risk but accelerating", dc: C.blue   },
      { label: "Monitoring",          value: "46", delta: "Low risk + low growth",     dc: C.gray   },
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
    finding: "The priority matrix separates countries by current risk and historical growth. <b>Urgent-intervention</b> countries combine high present burden with rapid growth and are concentrated mainly among Pacific Island and selected Middle Eastern/North African contexts. Early-prevention countries have lower current burden but above-median growth, making them important candidates for preventive policy before risk levels become harder to manage.",
    findingLabel: "Policy recommendation",
  },
];

// ─── Tag colours ─────────────────────────────────────────────────────────────
const TAG_STYLES = {
  purple: { background: "rgba(139, 128, 249, 0.12)", color: "#b4acef" },
  blue:   { background: "rgba(59, 130, 246, 0.12)", color: "#93c5fd" },
  teal:   { background: "rgba(20, 184, 166, 0.12)", color: "#99f6e4" },
  pink:   { background: "rgba(236, 72, 153, 0.12)", color: "#fbcfe8" },
  amber:  { background: "rgba(245, 158, 11, 0.12)", color: "#fde68a" },
  coral:  { background: "rgba(244, 63, 94, 0.12)", color: "#fecdd3" },
};

// ─── Fullscreen Modal ────────────────────────────────────────────────────────
function FullscreenModal({ varName, title, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(5, 7, 10, 0.85)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)",
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
          boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "-0.01em" }}>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: C.subtle, border: "none", borderRadius: 8,
              color: C.text, fontSize: 12, fontWeight: 500,
              padding: "6px 14px", cursor: "pointer", transition: "all 0.15s",
            }}
          >
            ✕ Close
          </button>
        </div>
        <iframe
          src={`${process.env.PUBLIC_URL}/exports/${varName}.html`}
          width="100%"
          height="100%"
          style={{ border: "none", display: "block", flex: 1, background: "#ffffff" }}
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
      fontSize: 11,
      fontWeight: 500,
      padding: "3px 10px",
      borderRadius: 20,
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function KpiCard({ label, value, delta, deltaColor }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.card} 0%, #1a1e29 100%)`,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: "18px 20px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    }}>
      <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 12, marginTop: 6, color: deltaColor || C.muted, fontWeight: 500 }}>{delta}</div>
    </div>
  );
}

function InteractionBanner({ interaction, accent }) {
  if (!interaction) return null;
  return (
    <div style={{
      background: "rgba(23, 26, 35, 0.6)",
      border: `1px solid ${C.border}`,
      borderLeft: `4px solid ${accent}`,
      borderRadius: 12,
      padding: "14px 20px",
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      gap: 14,
    }}>
      <span style={{ fontSize: 20, flexShrink: 0 }}>{interaction.icon}</span>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>
        <span style={{ color: C.text, fontWeight: 600, letterSpacing: "-0.01em" }}>
          Interaction {interaction.number} — {interaction.name}
        </span>
        <span style={{ margin: "0 8px", color: C.border }}>|</span>
        {interaction.hint}
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
      style={{ border: "none", display: "block", background: "#ffffff", borderRadius: "0 0 12px 12px" }}
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
        background: hov ? C.subtle : "rgba(25, 29, 38, 0.8)",
        border: `1px solid ${hov ? "#444c66" : C.border}`,
        borderRadius: 8, color: hov ? C.text : C.muted,
        width: 32, height: 32, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 16, flexShrink: 0, transition: "all .15s ease",
      }}
    >⤢</button>
  );
}

function ChartCard({ title, sub, tag, tagType, varName, height, fullWidth, onExpand }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      overflow: "hidden",
      gridColumn: fullWidth ? "1 / -1" : undefined,
      boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
    }}>
      <div style={{
        padding: "16px 20px",
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "-0.01em" }}>{title}</div>
          {sub && <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{sub}</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
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
      background: `linear-gradient(160deg, ${C.card} 0%, #151821 100%)`,
      border: `1px solid ${C.border}`,
      borderLeft: `4px solid ${accent}`,
      borderRadius: 12,
      padding: "20px",
      marginTop: 24,
      boxShadow: "0 4px 25px rgba(0,0,0,0.15)",
    }}>
      <div style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: accent,
        marginBottom: 10,
      }}>
        💡 {label || "Key finding"}
      </div>
      <div
        style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}
        dangerouslySetInnerHTML={{ __html: text.replace(/<b>/g, `<strong style="color:${C.text};font-weight:600">`).replace(/<\/b>/g, "</strong>") }}
      />
    </div>
  );
}

// ─── Section panels ───────────────────────────────────────────────────────────
function SectionPanel({ section }) {
  const { accent, tagClass, kpis, interaction, charts, extraChart, finding, findingLabel } = section;
  const [modal, setModal] = useState(null);
  const threeColCharts = section.id === 3;
  const openModal = (varName, title) => setModal({ varName, title });
  const closeModal = () => setModal(null);

  return (
    <div>
      {modal && <FullscreenModal varName={modal.varName} title={modal.title} onClose={closeModal} />}

      {kpis && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {kpis.map((k) => (
            <KpiCard key={k.label} label={k.label} value={k.value} delta={k.delta} deltaColor={k.dc} />
          ))}
        </div>
      )}

      <InteractionBanner interaction={interaction} accent={accent} />

      {interaction && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.2)" }}>
            <div style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text, letterSpacing: "-0.01em" }}>
                  Interaction {interaction.number} — {interaction.name}
                </div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
                  Linked interactive dashboard
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                <Tag label="Interactive" type={tagClass} />
                <ExpandBtn onClick={() => openModal(interaction.varName, `Interaction ${interaction.number} — ${interaction.name}`)} />
              </div>
            </div>
            <ChartPlaceholder varName={interaction.varName} height={interaction.height} />
          </div>
        </div>
      )}

      {charts && (
        <div style={{
          display: "grid",
          gridTemplateColumns: threeColCharts ? "repeat(3,1fr)" : "repeat(2,1fr)",
          gap: 20,
          marginBottom: 24,
        }}>
          {charts.map((ch) => (
            <ChartCard
              key={ch.varName}
              title={ch.title}
              sub={ch.sub}
              tag={ch.tag}
              tagType={tagClass}
              varName={ch.varName}
              height={ch.height}
              onExpand={openModal}
            />
          ))}
        </div>
      )}

      {extraChart && (
        <div style={{ marginBottom: 24 }}>
          <ChartCard
            title={extraChart.title}
            sub={extraChart.sub}
            tag={extraChart.tag}
            tagType={tagClass}
            varName={extraChart.varName}
            height={extraChart.height}
            fullWidth
            onExpand={openModal}
          />
        </div>
      )}

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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: C.bg, color: C.text, fontFamily: '"Inter", system-ui, -apple-system, sans-serif' }}>
      <div style={{
        width: 250,
        minWidth: 250,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{ padding: "26px 20px", borderBottom: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, letterSpacing: "0.06em", textTransform: "uppercase", lineHeight: 1.5 }}>
            Global Metabolic<br />Health Observatory
          </div>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 6, fontWeight: 500, letterSpacing: "0.02em" }}>CST4245 · Assessment 01</div>
        </div>

        <div style={{ flex: 1, padding: "16px 12px", overflowY: "auto" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: C.muted, padding: "0 12px 10px" }}>
            Sections
          </div>
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 12px",
                borderRadius: 10,
                cursor: "pointer",
                fontSize: 13,
                color: active === s.id ? "#ffffff" : C.muted,
                background: active === s.id ? s.accent + "18" : "transparent",
                border: "none",
                width: "100%",
                textAlign: "left",
                marginBottom: 4,
                fontWeight: active === s.id ? 600 : 400,
                transition: "all .2s ease",
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0, opacity: active === s.id ? 1 : 0.7 }}>{s.icon}</span>
              <span>{s.nav}</span>
            </button>
          ))}
        </div>

        <div style={{ padding: "16px 20px", borderTop: `1px solid ${C.border}`, fontSize: 11, color: C.muted, fontWeight: 500, letterSpacing: "0.01em" }}>
          200 countries · 1980–2014 · Altair
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "0 32px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "5px 12px",
              borderRadius: 6,
              color: sec.badgeColor,
              background: sec.badgeBg,
            }}>
              {sec.badge}
            </span>
            <span style={{ fontSize: 17, fontWeight: 700, color: C.text, letterSpacing: "-0.02em" }}>{sec.title}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {[["200", "countries"], ["1980–2014", "period"], ["3", "indicators"]].map(([val, lbl]) => (
              <div key={lbl} style={{
                background: "rgba(23, 26, 35, 0.5)",
                border: `1px solid ${C.border}`,
                borderRadius: 30,
                padding: "6px 14px",
                fontSize: 12,
                color: C.muted,
              }}>
                <span style={{ color: C.text, fontWeight: 600 }}>{val}</span> {lbl}
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px", background: C.bg }}>
          <SectionPanel section={sec} />
        </div>
      </div>
    </div>
  );
}