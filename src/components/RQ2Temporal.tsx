
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, TrendingUp, AlertTriangle } from "lucide-react";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type HeatmapJSON = { xLabels: string[]; yLabels: string[]; values: number[][] };
type PCARecord = {
  sample_id: string;
  genotype: "WT" | "AD" | string;
  time: string | number;
  PC1: number;
  PC2: number;
};
type ClusterWideRecord = { genotype: "WT" | "AD" | string; time: string | number; [k: string]: any };
type CoefRecord = { name: string; coef: number };

async function fetchJSON<T>(url: string): Promise<T> {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${r.status} ${r.statusText} – ${url}`);
  return r.json();
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PillButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800/60 transition"
    >
      {children}
    </button>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-4xl mb-4 gradient-text">{title}</h2>
      {subtitle && <p className="text-slate-400 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}

function Notes({
  observation,
  interpretation,
}: {
  observation?: React.ReactNode;
  interpretation?: React.ReactNode;
}) {
  return (
    <div className="mt-6 space-y-6">
      <div>
        <div className="text-xl text-purple-300 mb-2">Observation</div>
        <div className="text-slate-300 leading-relaxed">
          {observation ?? (
            <span className="text-slate-500">
              
          </span>
          )}
        </div>
      </div>

      <div>
        <div className="text-xl text-purple-300 mb-2">Interpretation</div>
        <div className="text-slate-300 leading-relaxed">
          {interpretation ?? (
            <span className="text-slate-500">
              
            </span>
          )}
        </div>
      </div>
    </div>
  );
}




function Card({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-xl text-slate-100">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

/* --------------------------
   Heatmap rendering (shared controls per 3-up panel)
--------------------------- */
function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function heatColor(value: number, vmin: number, vmax: number) {
  const t = (value - vmin) / (vmax - vmin + 1e-9);
  const x = clamp(t, 0, 1);
  const neg = { r: 59, g: 130, b: 246 };
  const mid = { r: 15, g: 23, b: 42 };
  const pos = { r: 236, g: 72, b: 153 };

  if (x < 0.5) {
    const a = x / 0.5;
    const r = Math.round(lerp(neg.r, mid.r, a));
    const g = Math.round(lerp(neg.g, mid.g, a));
    const b = Math.round(lerp(neg.b, mid.b, a));
    return `rgb(${r},${g},${b})`;
  } else {
    const a = (x - 0.5) / 0.5;
    const r = Math.round(lerp(mid.r, pos.r, a));
    const g = Math.round(lerp(mid.g, pos.g, a));
    const b = Math.round(lerp(mid.b, pos.b, a));
    return `rgb(${r},${g},${b})`;
  }
}

function HeatmapLegend({ vmin, vmax }: { vmin: number; vmax: number }) {
  const steps = 9;
  const vals = Array.from({ length: steps }, (_, i) => lerp(vmin, vmax, i / (steps - 1)));
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="text-xs text-slate-400 w-16 text-right">{vmin.toFixed(2)}</div>
      <div className="flex rounded-lg overflow-hidden border border-slate-700/60">
        {vals.map((v, i) => (
          <div key={i} style={{ width: 18, height: 10, background: heatColor(v, vmin, vmax) }} />
        ))}
      </div>
      <div className="text-xs text-slate-400 w-16">{vmax.toFixed(2)}</div>

      <span className="text-xs text-slate-400">Hover to inspect • scroll both directions</span>
    </div>
  );
}

function HeatmapControls({
  rowLimit,
  setRowLimit,
  cell,
  setCell,
  safeRowOptions,
  xCount,
  yCount,
  cellMin = 14,
  cellMax = 42,
}: {
  rowLimit: number;
  setRowLimit: (n: number) => void;
  cell: number;
  setCell: (n: number) => void;
  safeRowOptions: number[];
  xCount: number;
  yCount: number;
  cellMin?: number;
  cellMax?: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-200">
        Rows shown:&nbsp;
        <select
          className="bg-transparent outline-none"
          value={rowLimit}
          onChange={(e) => setRowLimit(parseInt(e.target.value, 10))}
        >
          {safeRowOptions.map((n) => (
            <option key={n} value={n} className="bg-slate-900">
              {n}
            </option>
          ))}
        </select>
      </span>

      <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-200">
        Cell size:&nbsp;
        <input
          type="range"
          min={cellMin}
          max={cellMax}
          value={cell}
          onChange={(e) => setCell(parseInt(e.target.value, 10))}
        />
        <span className="ml-2 text-slate-300">{cell}px</span>
      </span>

      <span className="inline-flex items-center rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-200">
        X: {xCount} • Y: {yCount}
      </span>
    </div>
  );
}

function HeatmapGrid({
  data,
  title,
  valueLabel,
  rowLabel,
  cell,
  rowLimit,
  vmin,
  vmax,
  labelColWidth = 320,
}: {
  data: HeatmapJSON;
  title: React.ReactNode;
  valueLabel: string;
  rowLabel: string;
  cell: number;
  rowLimit: number;
  vmin: number;
  vmax: number;
  labelColWidth?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const xLabels = data.xLabels;
  const yLabelsAll = data.yLabels;
  const valuesAll = data.values;

  const effectiveRowLimit = clamp(rowLimit, 1, yLabelsAll.length);
  const yLabels = yLabelsAll.slice(0, effectiveRowLimit);
  const values = valuesAll.slice(0, effectiveRowLimit);

  const minGridWidth = labelColWidth + xLabels.length * cell;

  const [hover, setHover] = useState<{
    x: number;
    y: number;
    r: number;
    c: number;
    v: number;
  } | null>(null);

  return (
    <div className="max-w-full">
      <div className="text-sm text-slate-300 mb-3">{title}</div>

      {hover && (
        <div className="absolute z-20 pointer-events-none" style={{ left: hover.x + 14, top: hover.y + 14 }}>
          <div className="bg-slate-950/95 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
            <div className="text-xs text-slate-200 space-y-1">
              <div>
                <span className="text-slate-400">Y:</span>{" "}
                <span className="text-slate-100">{yLabels[hover.r]}</span>
              </div>
              <div>
                <span className="text-slate-400">X:</span>{" "}
                <span className="text-slate-100">{xLabels[hover.c]}</span>
              </div>
              <div className="pt-1">
                <span className="text-slate-400">{valueLabel}:</span>{" "}
                <span className="text-slate-100 font-semibold">{hover.v.toFixed(3)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={wrapperRef} className="relative overflow-auto border border-slate-700/50 rounded-2xl bg-black/20">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `${labelColWidth}px repeat(${xLabels.length}, ${cell}px)`,
            minWidth: minGridWidth,
          }}
        >
          <div className="sticky left-0 z-[2] bg-slate-900/70 border-b border-slate-700/50 p-3 text-xs text-slate-300">
            {rowLabel}
          </div>

          {xLabels.map((xl) => (
            <div
              key={xl}
              className="border-b border-slate-700/50 p-3 text-[11px] text-slate-300 text-center bg-slate-900/40"
              style={{ width: cell }}
              title={xl}
            >
              {xl}
            </div>
          ))}

          {yLabels.map((yl, r) => (
            <Fragment key={`row-${yl}-${r}`}>
              <div
                className="sticky left-0 z-[1] bg-slate-900/50 border-b border-slate-800/60 p-3 text-sm text-slate-200"
                style={{ width: labelColWidth }}
                title={yl}
              >
                {yl}
              </div>

              {values[r].map((v, c) => (
                <div
                  key={`${r}-${c}`}
                  className="border-b border-slate-800/60 border-r border-slate-800/60 cursor-crosshair"
                  style={{ width: cell, height: cell, background: heatColor(v, vmin, vmax) }}
                  onMouseMove={(e) => {
                    const base = wrapperRef.current?.getBoundingClientRect();
                    if (!base) return;
                    setHover({
                      x: e.clientX - base.left,
                      y: e.clientY - base.top,
                      r,
                      c,
                      v,
                    });
                  }}
                  onMouseLeave={() => setHover(null)}
                  title={`${xLabels[c]} • ${yl} = ${v.toFixed(3)}`}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeatmapTrio({
  wt,
  ad,
  delta,
  titles,
  rowLabel,
  valueLabels,
  labelColWidth = 320,
  initialCell,
  initialRowsShown,
  rowOptions,
  cellMin,
  cellMax,
}: {
  wt: HeatmapJSON;
  ad: HeatmapJSON;
  delta: HeatmapJSON;
  titles: { wt: React.ReactNode; ad: React.ReactNode; delta: React.ReactNode };
  rowLabel: string;
  valueLabels: { wt: string; ad: string; delta: string };
  labelColWidth?: number;
  initialCell: number;
  initialRowsShown: number;
  rowOptions: number[];
  cellMin?: number;
  cellMax?: number;
}) {
  // We clamp row-limit to the minimum available rows among the 3 panels
  const availableRows = Math.min(wt.yLabels.length, ad.yLabels.length, delta.yLabels.length);
  const [cell, setCell] = useState(initialCell);
  const [rowLimitRaw, setRowLimitRaw] = useState(initialRowsShown);

  const rowLimit = clamp(rowLimitRaw, 1, availableRows);

  const safeRowOptions = useMemo(() => {
    const base = rowOptions
      .filter((n) => n >= 1)
      .filter((n) => n <= availableRows)
      .sort((a, b) => a - b);
    const set = new Set<number>(base);
    set.add(rowLimit);
    return Array.from(set).sort((a, b) => a - b);
  }, [rowOptions, availableRows, rowLimit]);

  const { vmin, vmax } = useMemo(() => {
    const slice = (hm: HeatmapJSON) => hm.values.slice(0, rowLimit).flat();
    const flat = [...slice(wt), ...slice(ad), ...slice(delta)];
    return { vmin: Math.min(...flat), vmax: Math.max(...flat) };
  }, [wt, ad, delta, rowLimit]);

  // Force “side-by-side always”: on small screens we allow horizontal scroll instead of stacking.
  return (
    <div>
      <HeatmapControls
        rowLimit={rowLimit}
        setRowLimit={setRowLimitRaw}
        cell={cell}
        setCell={setCell}
        safeRowOptions={safeRowOptions}
        xCount={wt.xLabels.length}
        yCount={availableRows}
        cellMin={cellMin}
        cellMax={cellMax}
      />

      <div className="overflow-x-auto">
        <div className="grid grid-cols-3 gap-6 min-w-[1100px]">
          <HeatmapGrid
            data={wt}
            title={titles.wt}
            valueLabel={valueLabels.wt}
            rowLabel={rowLabel}
            cell={cell}
            rowLimit={rowLimit}
            vmin={vmin}
            vmax={vmax}
            labelColWidth={labelColWidth}
          />
          <HeatmapGrid
            data={ad}
            title={titles.ad}
            valueLabel={valueLabels.ad}
            rowLabel={rowLabel}
            cell={cell}
            rowLimit={rowLimit}
            vmin={vmin}
            vmax={vmax}
            labelColWidth={labelColWidth}
          />
          <HeatmapGrid
            data={delta}
            title={titles.delta}
            valueLabel={valueLabels.delta}
            rowLabel={rowLabel}
            cell={cell}
            rowLimit={rowLimit}
            vmin={vmin}
            vmax={vmax}
            labelColWidth={labelColWidth}
          />
        </div>
      </div>

      <HeatmapLegend vmin={vmin} vmax={vmax} />
    </div>
  );
}

/* --------------------------
   PCA tooltip
--------------------------- */
function PCATooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null;
  const p = payload[0].payload as PCARecord;

  return (
    <div className="bg-slate-950/95 border border-slate-700 rounded-xl px-3 py-2 shadow-xl">
      <div className="text-xs text-slate-200 space-y-1">
        <div className="text-slate-100 font-semibold">
          {p.genotype} • time {p.time}
        </div>
        <div className="text-slate-300">{p.sample_id}</div>
        <div className="pt-1">
          <span className="text-slate-400">PC1:</span>{" "}
          <span className="text-slate-100">{Number(p.PC1).toFixed(3)}</span>
        </div>
        <div>
          <span className="text-slate-400">PC2:</span>{" "}
          <span className="text-slate-100">{Number(p.PC2).toFixed(3)}</span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------
   Main component
--------------------------- */
export function RQ2Temporal() {
 const base = `${import.meta.env.BASE_URL}data/website_rq2_temporal`;


  // Helpers MUST live here (not between JSX)
  const dashForCluster = (clusterId: number) => (clusterId % 2 === 0 ? "0" : "6 6");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // Pathway heatmaps
  const [pathWT, setPathWT] = useState<HeatmapJSON | null>(null);
  const [pathAD, setPathAD] = useState<HeatmapJSON | null>(null);
  const [pathDelta, setPathDelta] = useState<HeatmapJSON | null>(null);

  // Gene heatmaps
  const [genesWT, setGenesWT] = useState<HeatmapJSON | null>(null);
  const [genesAD, setGenesAD] = useState<HeatmapJSON | null>(null);
  const [genesDelta, setGenesDelta] = useState<HeatmapJSON | null>(null);

  // PCA
  const [pcaPoints, setPcaPoints] = useState<PCARecord[] | null>(null);
  const [pcaMeta, setPcaMeta] = useState<{ explained_variance_ratio: number[] } | null>(null);

  // Clusters
  const [clusterWide, setClusterWide] = useState<ClusterWideRecord[] | null>(null);

  // Predictive
  const [logGenes, setLogGenes] = useState<CoefRecord[] | null>(null);
  const [logFuncs, setLogFuncs] = useState<CoefRecord[] | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const [wt, ad, dlt, gwt, gad, gdlt, pcaPts, pMeta, clWide, lg, lf] = await Promise.all([
          fetchJSON<HeatmapJSON>(`${base}/pathways_wt.json`),
          fetchJSON<HeatmapJSON>(`${base}/pathways_ad.json`),
          fetchJSON<HeatmapJSON>(`${base}/pathways_delta_ad_minus_wt.json`),

          fetchJSON<HeatmapJSON>(`${base}/genes_wt.json`),
          fetchJSON<HeatmapJSON>(`${base}/genes_ad.json`),
          fetchJSON<HeatmapJSON>(`${base}/genes_delta_ad_minus_wt.json`),

          fetchJSON<PCARecord[]>(`${base}/pca_points.json`),
          fetchJSON<{ explained_variance_ratio: number[] }>(`${base}/pca_meta.json`),

          fetchJSON<ClusterWideRecord[]>(`${base}/cluster_means_wide.json`),

          fetchJSON<CoefRecord[]>(`${base}/logreg_top_genes.json`),
          fetchJSON<CoefRecord[]>(`${base}/logreg_top_functions.json`),
        ]);

        if (!alive) return;

        setPathWT(wt);
        setPathAD(ad);
        setPathDelta(dlt);

        setGenesWT(gwt);
        setGenesAD(gad);
        setGenesDelta(gdlt);

        setPcaPoints(pcaPts);
        setPcaMeta(pMeta);

        setClusterWide(clWide);

        setLogGenes(lg);
        setLogFuncs(lf);
      } catch (e: any) {
        if (!alive) return;
        setErr(e?.message ?? String(e));
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // PCA split
  const pcaWT = useMemo(() => (pcaPoints ?? []).filter((d) => String(d.genotype) === "WT"), [pcaPoints]);
  const pcaAD = useMemo(() => (pcaPoints ?? []).filter((d) => String(d.genotype) === "AD"), [pcaPoints]);

  const evr = pcaMeta?.explained_variance_ratio ?? [];
  const evr1 = ((evr[0] ?? 0) * 100).toFixed(1);
  const evr2 = ((evr[1] ?? 0) * 100).toFixed(1);

  // ---- CLUSTERS: merged data WT/AD on same time points
  const mergedClusters = useMemo(() => {
    if (!clusterWide) return [];
    const wt = clusterWide.filter((d) => String(d.genotype) === "WT");
    const ad = clusterWide.filter((d) => String(d.genotype) === "AD");

    const byTimeWT = new Map<string, ClusterWideRecord>();
    wt.forEach((r) => byTimeWT.set(String(r.time), r));

    const byTimeAD = new Map<string, ClusterWideRecord>();
    ad.forEach((r) => byTimeAD.set(String(r.time), r));

    const times = Array.from(new Set([...wt.map((r) => String(r.time)), ...ad.map((r) => String(r.time))])).sort(
      (a, b) => Number(a) - Number(b)
    );

    return times.map((t) => {
      const row: any = { time: t };
      const rWT = byTimeWT.get(t);
      const rAD = byTimeAD.get(t);

      ["0", "1", "2", "3"].forEach((k) => {
        row[`WT_${k}`] = rWT ? Number((rWT as any)[k]) : null;
        row[`AD_${k}`] = rAD ? Number((rAD as any)[k]) : null;
      });

      return row;
    });
  }, [clusterWide]);

  // Predictive shorten
  const genesTop4 = useMemo(() => {
    if (!logGenes) return [];
    return [...logGenes].sort((a, b) => Math.abs(b.coef) - Math.abs(a.coef)).slice(0, 4);
  }, [logGenes]);

  const funcsTop3 = useMemo(() => {
    if (!logFuncs) return [];
    return [...logFuncs].sort((a, b) => Math.abs(b.coef) - Math.abs(a.coef)).slice(0, 3);
  }, [logFuncs]);

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1698913197660-cf8720ede320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600"
            alt="Science background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 group">
            <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-green-500 flex items-center justify-center">
                <Clock className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl gradient-text">Temporal Analysis</h1>
              </div>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl">
              A time-lapse of energy pathways: from normal aging to AD divergence.                
            </p>
          </motion.div>
        </div>
      </section>

      

      {/* Status */}
      <section className="py-8 bg-[#050814]">
        <div className="container mx-auto px-6">
          {loading && (
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 text-slate-300">
              Loading JSON files from <span className="text-slate-100">{base}</span>…
            </div>
          )}
          {err && (
            <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-6 text-slate-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="size-6 text-red-400 mt-0.5" />
                <div>
                  <div className="font-semibold text-red-300">Could not load JSON files</div>
                  <div className="text-sm text-slate-300 mt-2 break-all">{err}</div>
                  <div className="text-sm text-slate-400 mt-3">
                    Check these exist in <span className="text-slate-200">{base}</span>:
                    <br />
                    pathways_wt.json, pathways_ad.json, pathways_delta_ad_minus_wt.json
                    <br />
                    genes_wt.json, genes_ad.json, genes_delta_ad_minus_wt.json
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Key finding with scroll chips */}
      <section className="py-14 bg-[#050814]">
        
           <div className="container mx-auto px-6">
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8 max-w-6xl mx-auto">
            <div className="flex items-start gap-4">
              <TrendingUp className="size-12 text-purple-300 flex-shrink-0" />
              <div className="space-y-3">
                <h3 className="text-2xl text-purple-200">Key finding</h3>
                <p className="text-slate-300">
                  Time is the dominant organizer of energy-related expression programs, but AD is not a simple constant shift. Instead, it reshapes the temporal trajectory: AD samples move strongly along a progression axis (PC1) driven by immune/lysosomal/redox programs, while the “normal aging” axis seen in WT (PC2) becomes disrupted. Across heatmaps, clustering, and sparse predictive models, the consistent pattern is trajectory remodeling rather than a stable genotype fingerprint (and all classification results should be read as exploratory given the very small sample size).
                </p>

                <div className="flex flex-wrap gap-2">
                  <PillButton onClick={() => scrollToId("sec-heatmaps")}>Heatmaps</PillButton>
                  <PillButton onClick={() => scrollToId("sec-pca")}>PCA</PillButton>
                  <PillButton onClick={() => scrollToId("sec-clusters")}>Clusters</PillButton>
                  <PillButton onClick={() => scrollToId("sec-predictive")}>Predictive</PillButton>
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </section>

      <section className="py-12 bg-[#050814]">
  <div className="container mx-auto px-6">
    <div className="max-w-5xl mx-auto text-slate-300 leading-relaxed space-y-4">
      <h3 className="text-2xl text-slate-100">Analytical strategy</h3>

      <p>
        The goal of this temporal analysis is to determine whether Alzheimer’s disease (AD)
        primarily induces a <span className="font-semibold text-slate-200">constant shift</span> in
        energy-related expression programs, or instead
        <span className="font-semibold text-slate-200">reshapes their temporal trajectories</span>
        across disease progression.
      </p>

      <p>
        To address this question, we analyze energy-associated genes and pathways across three
        time points in WT and AD mice using complementary approaches:
      </p>

      <ul className="list-disc pl-6 space-y-1">
        <li>heatmaps to visualize temporal structure and genotype differences,</li>
        <li>PCA to assess dominant axes of temporal versus disease-related variation,</li>
        <li>clustering to identify recurrent temporal programs,</li>
        <li>sparse predictive models to probe which features carry the strongest genotype signal.</li>
      </ul>

      <p>
        Importantly, given the very small sample size (n = 6), all results are interpreted as
        <span className="font-semibold text-slate-200"> exploratory and hypothesis-generating</span>,
        with emphasis on consistency across methods rather than isolated statistical significance.
      </p>
    </div>
  </div>
</section>


      {/* Heatmaps */}
      <section id="sec-heatmaps" className="py-16 bg-[#050814] scroll-mt-28">
       
       
           <div className="container mx-auto px-6">
          <SectionTitle
            title="Heatmaps"
            subtitle="WT, AD, and Δ (AD − WT) are shown for direct comparison. Controls and legend appear once per panel."
          />

          <div className="space-y-8">
            {/* Pathways */}
            {pathWT && pathAD && pathDelta && (
              <Card title="Pathway programs over time" subtitle="WT vs AD vs Δ (AD − WT), side-by-side">
                <HeatmapTrio
                  wt={pathWT}
                  ad={pathAD}
                  delta={pathDelta}
                  titles={{
                    wt: (
                      <>
                        <span className="font-semibold text-slate-100">WT</span>
                        <span className="text-slate-500"> • pathways</span>
                      </>
                    ),
                    ad: (
                      <>
                        <span className="font-semibold text-slate-100">AD</span>
                        <span className="text-slate-500"> • pathways</span>
                      </>
                    ),
                    delta: (
                      <>
                        <span className="font-semibold text-slate-100">Δ</span>
                        <span className="text-slate-500"> (AD − WT)</span>
                      </>
                    ),
                  }}
                  rowLabel="Pathway"
                  valueLabels={{ wt: "score", ad: "score", delta: "Δ score" }}
                  labelColWidth={320}
                  initialCell={34}
                  initialRowsShown={50}
                  rowOptions={[15, 25, 50, 100, 200]}
                />

                <Notes
                  observation={
                    <ul className="list-disc pl-5 space-y-1">
                      Across pathways, signal changes are time-structured: many modules rise or fall consistently across the WT timepoints, while AD shows different timing and relative ordering of pathway activity. In the Δ (AD − WT) view, differences appear as localized “hotspots” rather than a uniform offset, suggesting that divergence is concentrated in specific time windows.
                    </ul>
                  }
                  interpretation={
                    <ul className="list-disc pl-5 space-y-1">
                      This supports the idea that AD primarily acts by remodeling when energy programs activate (and how strongly), not by shifting everything up/down equally. Time-localized Δ patterns are what we expect from stage-dependent pathology (early compensation, later breakdown), rather than a static disease signature.
                    </ul>
                  }
                />
              </Card>
            )}

            {/* Genes */}
            {genesWT && genesAD && genesDelta && (
              <Card title="Gene-level patterns" subtitle="Rows are 'function | gene' • WT vs AD vs Δ, side-by-side">
                <HeatmapTrio
                  wt={genesWT}
                  ad={genesAD}
                  delta={genesDelta}
                  titles={{
                    wt: (
                      <>
                        <span className="font-semibold text-slate-100">WT</span>
                        <span className="text-slate-500"> • genes</span>
                      </>
                    ),
                    ad: (
                      <>
                        <span className="font-semibold text-slate-100">AD</span>
                        <span className="text-slate-500"> • genes</span>
                      </>
                    ),
                    delta: (
                      <>
                        <span className="font-semibold text-slate-100">Δ</span>
                        <span className="text-slate-500"> (AD − WT)</span>
                      </>
                    ),
                  }}
                  rowLabel="Function | gene"
                  valueLabels={{ wt: "score", ad: "score", delta: "Δ" }}
                  labelColWidth={360}
                  initialCell={22}
                  initialRowsShown={50}
                  // ✅ Restrict to 15–50 only
                  rowOptions={[15, 25, 50]}
                  cellMin={14}
                  cellMax={34}
                />

                <Notes
                  observation={
                    <ul className="list-disc pl-5 space-y-1">
                      At the gene level, temporal patterns look burst-like and heterogeneous: some genes peak early, others late, and Δ often highlights directional changes that depend on timepoint. With this sample size, only a small number of individual genes look consistently strong under strict correction, but Δ still highlights a coherent energy/immune–lysosomal signal emerging over time.
                    </ul>
                  }
                  interpretation={
                    <ul className="list-disc pl-5 space-y-1">
                      Single genes are noisy at n=6, so the stable story lives more at the program/module level than at the “one key biomarker gene” level. The gene heatmaps are best read as a candidate generator: they propose which genes participate in the broader temporal reprogramming, not definitive biomarkers.
                    </ul>
                  }
                />
              </Card>
            )}
          </div>
        
        </div>
      </section>

      {/* PCA */}
      <section id="sec-pca" className="py-16 bg-gradient-to-b from-[#050814] to-[#0a0e27] scroll-mt-28">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="PCA pseudobulk (energy genes)"
            subtitle="Hover points to see genotype, time, and coordinates. If AD were only a constant shift, trajectories would overlap."
          />

          <div className="max-w-5xl mx-auto text-slate-300 mb-8 leading-relaxed text-center">
  <p>
    Principal Component Analysis (PCA) is used here to test a central hypothesis:
    if AD were merely a constant perturbation of WT aging, then WT and AD samples would follow
    similar temporal trajectories in low-dimensional space.
  </p>

  <p className="mt-3">
    Conversely, a separation of trajectories or a reorientation of principal axes would indicate
    that AD introduces a distinct temporal geometry, potentially corresponding to disease
    progression or compensatory responses.
  </p>
</div>


          <Card title="PCA (PC1 vs PC2)" subtitle={`Explained variance: PC1 ${evr1}% • PC2 ${evr2}%`}>
            <div className="w-full" style={{ height: 520, minHeight: 360 }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis type="number" dataKey="PC1" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                  <YAxis type="number" dataKey="PC2" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                  <Tooltip content={<PCATooltip />} />
                  <Legend />
                  <Scatter name="WT" data={pcaWT} fill="#10b981" />
                  <Scatter name="AD" data={pcaAD} fill="#ef4444" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <Notes
              observation="PCA reveals a clear temporal trajectory: PC1 increases almost monotonically with time in AD (very strong correlation reported in the notebook), while WT follows this axis more moderately. In contrast, WT shows a clean time trend on PC2, whereas AD does not track PC2 strongly, indicating a different temporal geometry."
              interpretation="PC1 behaves like an AD progression / energy-pathology axis dominated by immune/lysosomal/redox programs (e.g., the Immune–Metabolic Crosstalk / Redox–Lysosomal signal noted in the notebook). PC2 looks more like a normal aging/maturation axis that WT follows reliably, and AD partially breaks away from. So PCA suggests: WT = aging trajectory, AD = aging + amplified pathology trajectory."
            />
          </Card>
        </div>
      </section>

      {/* Cluster trajectories */}
      <section id="sec-clusters" className="py-16 bg-[#0a0e27] scroll-mt-28">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Cluster trajectories"
            subtitle="Two plots: clusters 0–1 and 2–3. WT vs AD shown with different colors; cluster identity uses solid vs dashed."
          />
          <div className="max-w-5xl mx-auto text-slate-300 mb-8 leading-relaxed text-center">
  <p>
    While PCA captures global structure, it does not directly describe which expression programs
    follow similar temporal patterns. To address this, we cluster energy-related features based
    on their temporal profiles.
  </p>

  <p className="mt-3">
    This allows us to identify recurring temporal motifs such as early activation, late activation,
    or WT-specific aging patterns, and to assess how these motifs are altered or preserved in AD.
  </p>
</div>



          <div className="grid lg:grid-cols-2 gap-6 pb-10">
            <Card title="Clusters 0–1" subtitle="Color = genotype • Line style = cluster">
              <div className="w-full" style={{ height: 420, minHeight: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mergedClusters}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#e2e8f0",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="WT_0"
                      name="WT • cluster 0 (solid)"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(0)}
                    />
                    <Line
                      type="monotone"
                      dataKey="AD_0"
                      name="AD • cluster 0 (solid)"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      connectNulls
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(0)}
                    />
                    <Line
                      type="monotone"
                      dataKey="WT_1"
                      name="WT • cluster 1 (dashed)"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(1)}
                    />
                    <Line
                      type="monotone"
                      dataKey="AD_1"
                      name="AD • cluster 1 (dashed)"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      connectNulls
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(1)}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card title="Clusters 2–3" subtitle="Color = genotype • Line style = cluster">
              <div className="w-full" style={{ height: 420, minHeight: 320 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mergedClusters}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="time" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#e2e8f0",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="WT_2"
                      name="WT • cluster 2 (solid)"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(0)}
                    />
                    <Line
                      type="monotone"
                      dataKey="AD_2"
                      name="AD • cluster 2 (solid)"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      connectNulls
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(0)}
                    />
                    <Line
                      type="monotone"
                      dataKey="WT_3"
                      name="WT • cluster 3 (dashed)"
                      stroke="#34d399"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(1)}
                    />
                    <Line
                      type="monotone"
                      dataKey="AD_3"
                      name="AD • cluster 3 (dashed)"
                      stroke="#fb7185"
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      connectNulls
                      activeDot={{ r: 5 }}
                      strokeDasharray={dashForCluster(1)}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <div className="bg-slate-800/20 border border-slate-700/40 rounded-2xl p-6">
            <Notes
              observation="Cluster 0 shows a WT aging-related rise that becomes disrupted in AD (depressed in early/mid AD with partial recovery later). Cluster 1 shows a WT decrease with age that is comparatively flattened in AD (small cluster, weaker signal). Cluster 2 is characterized by a late AD increase (low early, rising strongly in late AD). Cluster 3 shows a delayed activation: low in young WT, higher in older WT, and then sustained in AD."
              interpretation=" Cluster 0 fits a “normal metabolic maturation → AD disruption” pattern: a program that should ramp with age in WT but gets perturbed during disease progression. Cluster 1 likely captures a narrow or noisy program, so it should be treated cautiously, useful as a hypothesis, not a headline. These look like stage-dependent activation programs: Cluster 2 is consistent with late compensatory/stress responses (often immune/oxidative/lysosomal-adjacent), while Cluster 3 resembles a slower “aging-onset” program that becomes maintained or amplified in disease. Together they reinforce the central theme: AD modifies the timing and persistence of metabolic programs."
            />
          </div>
        </div>
      </section>

      {/* Predictive */}
      <section id="sec-predictive" className="py-16 mt-10 bg-gradient-to-b from-[#0a0e27] to-[#050814] scroll-mt-28">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Predictive shortlist"
          />

          <div className="max-w-5xl mx-auto text-slate-300 mb-8 leading-relaxed text-center">
  <p>
    Finally, we use sparse logistic regression not as a definitive classifier, but as a
    diagnostic tool to probe which genes or functional categories carry the strongest genotype
    signal under strong regularization.
  </p>

  <p className="mt-3">
    Given the limited sample size, predictive performance is expected to be low. The value of
    this analysis lies instead in identifying a compact, interpretable shortlist of features
    that may warrant further investigation in larger cohorts.
  </p>
</div>


          <div className="grid lg:grid-cols-2 gap-6">
            <Card title="Top genes (top 4)" subtitle="+coef → AD • −coef → WT">
              <div className="w-full" style={{ height: 360, minHeight: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={genesTop4} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} width={110} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#e2e8f0",
                      }}
                      formatter={(v: any) => [Number(v).toFixed(4), "coef"]}
                    />
                    <Bar dataKey="coef" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Notes
                observation="Sparse logistic regression selects a tiny shortlist (most coefficients shrink to ~0). Genotype prediction accuracy is low (near chance) in the notebook, meaning the selected genes can change between runs/splits. Still, the same type of signal appears: a few genes lean AD-associated while others lean WT-associated."
                interpretation={
                  <div className="space-y-3">
                    <p>
                      Positive coefficients indicate features pushing the model toward AD, negative toward WT. With an L1
                      penalty, most coefficients shrink to ~0; what survives is a compact shortlist that’s easy to
                      interpret and justify.
                    </p>
                    <p>
                      Practically, these few surviving genes are the highest-leverage candidates for follow-up (they’re
                      not “the whole story”, but they are the most predictive in this modeling setup). With n=6, these gene coefficients are not robust biomarkers, they’re a “where to look next” list. The model essentially tells us that genotype is harder to classify than time, and any apparent gene-level signature should be validated on larger cohorts.
                    </p>
                  </div>
                }
              />
            </Card>

            <Card title="Top functions (top 3)" subtitle="Headline biology: what changes, not just which genes">
              <div className="w-full" style={{ height: 360, minHeight: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={funcsTop3} layout="vertical" margin={{ left: 40, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8" }} width={190} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0b1220",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#e2e8f0",
                      }}
                      formatter={(v: any) => [Number(v).toFixed(4), "coef"]}
                    />
                    <Bar dataKey="coef" fill="#a855f7" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <Notes
                observation="At the function level, genotype accuracy remains weak, but the model highlights a small number of non-zero pathways (others are ~0), indicating that a few programs concentrate most of the separable signal."
                interpretation="Function-level summaries are often more interpretable and less noisy than single genes, even if classification is still unstable here. The shortlisted functions point toward mechanisms like proteostasis/autophagy, astrocyte metabolic support, and redox/lysosomal biology as likely contributors to AD-related trajectory changes, best framed as mechanistic hypotheses rather than confirmed diagnostic markers."
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8">
            <h3 className="text-2xl text-slate-100 mb-3">Conclusion</h3>
            <p className="text-slate-300 leading-relaxed">
               Overall, the temporal analysis suggests that energy-related expression programs are organized primarily by stage/time, while AD acts by reshaping trajectories rather than producing a stable constant offset. PCA separates a strong AD progression axis (PC1) from a WT-like aging/maturation axis (PC2), and clustering recovers multiple temporal patterns including late AD activation and WT-to-AD disruption profiles. Predictive models reinforce the same message: time bins are easier to predict than genotype, and any “top genes/functions” should be treated as exploratory shortlists until validated on larger sample sizes.
            </p>
          </div>
        </div>
      </section>
    </div>
    
  );
}

