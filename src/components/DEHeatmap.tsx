import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";

type DERow = {
  cell_type: string;
  category: string; // gene
  mean_AD: number;
  mean_Control: number;
  log2FC: number;
  pval: number;
  qval: number;
};

type Props = {
  csvUrl: string; // e.g. "/data/rq3_celltype_DE.csv"
  height?: number;
  maxGenes?: number;
};

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}

/**
 * Map log2FC to a red/blue color on a dark background.
 * Negative => blue-ish, positive => red-ish, near 0 => dark slate.
 */
function colorForLog2FC(v: number, vmax: number) {
  const x = clamp(v / vmax, -1, 1); // -1..1
  // Interpolate between blue and red via slate.
  // We’ll blend into a dark base so it matches the site.
  const base = { r: 15, g: 23, b: 42 }; // slate-ish (#0f172a)
  const neg = { r: 59, g: 130, b: 246 }; // blue-500
  const pos = { r: 239, g: 68, b: 68 };  // red-500

  const t = Math.abs(x);
  const target = x < 0 ? neg : pos;

  const r = Math.round(base.r + (target.r - base.r) * t);
  const g = Math.round(base.g + (target.g - base.g) * t);
  const b = Math.round(base.b + (target.b - base.b) * t);

  return `rgb(${r}, ${g}, ${b})`;
}

export function DEHeatmap({ csvUrl, height = 520, maxGenes = 20 }: Props) {
  const [rows, setRows] = useState<DERow[]>([]);
  const [loading, setLoading] = useState(true);

  const resolvedCsvUrl = useMemo(() => {
    // Respect absolute URLs. For site-relative paths, prepend the Vite base so GH Pages works.
    if (/^https?:\/\//i.test(csvUrl)) return csvUrl;

    const normalized = csvUrl.startsWith("/") ? csvUrl.slice(1) : csvUrl;

    const base = import.meta.env.BASE_URL || "/";
    const absoluteBase = base.startsWith("http")
      ? base
      : `${window.location.origin}${base}`;

    try {
      return new URL(normalized, absoluteBase).toString();
    } catch {
      return `${base}${normalized}`;
    }
  }, [csvUrl]);

  // Controls
  const [onlySignificant, setOnlySignificant] = useState(true);
  const [rankingMode, setRankingMode] = useState<"qval" | "abslog2FC">("qval");

  // Tooltip state
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    row: DERow;
  } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(resolvedCsvUrl)
      .then((r) => r.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true, dynamicTyping: true });
        const data = (parsed.data as any[])
          .filter((d) => d && d.cell_type && d.category)
          .map((d) => ({
            cell_type: String(d.cell_type),
            category: String(d.category),
            mean_AD: Number(d.mean_AD),
            mean_Control: Number(d.mean_Control),
            log2FC: Number(d.log2FC),
            pval: Number(d.pval),
            qval: Number(d.qval),
          })) as DERow[];
        setRows(data);
      })
      .finally(() => setLoading(false));
  }, [resolvedCsvUrl]);

  const cellTypes = useMemo(() => {
    // Keep a stable order
    const unique = Array.from(new Set(rows.map((r) => r.cell_type)));
    const preferred = ["Neuron", "Astrocyte", "Microglia", "Oligodendrocyte"];
    unique.sort((a, b) => {
      const ia = preferred.indexOf(a);
      const ib = preferred.indexOf(b);
      if (ia === -1 && ib === -1) return a.localeCompare(b);
      if (ia === -1) return 1;
      if (ib === -1) return -1;
      return ia - ib;
    });
    return unique;
  }, [rows]);

  const filtered = useMemo(() => {
    return onlySignificant ? rows.filter((r) => r.qval < 0.05) : rows;
  }, [rows, onlySignificant]);

  const topGenes = useMemo(() => {
    // Score each gene across cell types and pick top N
    const byGene = new Map<string, { bestQ: number; bestAbsFC: number }>();

    for (const r of filtered) {
      const cur = byGene.get(r.category) ?? { bestQ: Number.POSITIVE_INFINITY, bestAbsFC: 0 };
      cur.bestQ = Math.min(cur.bestQ, r.qval);
      cur.bestAbsFC = Math.max(cur.bestAbsFC, Math.abs(r.log2FC));
      byGene.set(r.category, cur);
    }

    const genes = Array.from(byGene.entries()).map(([gene, s]) => ({ gene, ...s }));

    genes.sort((a, b) => {
      if (rankingMode === "qval") return a.bestQ - b.bestQ;
      return b.bestAbsFC - a.bestAbsFC;
    });

    return genes.slice(0, maxGenes).map((g) => g.gene);
  }, [filtered, rankingMode, maxGenes]);

  const matrix = useMemo(() => {
    // Build (gene -> cell_type -> row)
    const map = new Map<string, Map<string, DERow>>();
    for (const r of filtered) {
      if (!topGenes.includes(r.category)) continue;
      if (!map.has(r.category)) map.set(r.category, new Map());
      map.get(r.category)!.set(r.cell_type, r);
    }
    return map;
  }, [filtered, topGenes]);

  const vmax = useMemo(() => {
    // Color scale max: take max abs log2FC among shown cells
    let m = 0.5;
    for (const gene of topGenes) {
      const rowMap = matrix.get(gene);
      if (!rowMap) continue;
      for (const ct of cellTypes) {
        const r = rowMap.get(ct);
        if (!r) continue;
        m = Math.max(m, Math.abs(r.log2FC));
      }
    }
    return m;
  }, [matrix, topGenes, cellTypes]);

  if (loading) {
    return (
      <div className="text-slate-400">Loading differential expression heatmap…</div>
    );
  }

  if (!rows.length) {
    return (
      <div className="text-slate-400">
        No DE data found. Check that <code className="text-slate-300">{resolvedCsvUrl}</code> exists.
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Title */}
      

      {/* Heatmap grid */}
      <div
        className="overflow-x-auto rounded-lg border border-slate-700/50 mb-12"
      >
        <div className="min-w-[760px]">
          {/* Header row */}
          <div className="grid" style={{ gridTemplateColumns: `180px repeat(${cellTypes.length}, 1fr)` }}>
            <div className="sticky top-0 z-10 bg-slate-800 px-2 py-2 text-slate-200 text-sm font-bold border-b border-slate-600">
              Gene
            </div>
            {cellTypes.map((ct) => (
              <div
                key={ct}
                className="sticky top-0 z-10 bg-slate-800 px-2 py-2 text-slate-100 text-sm font-bold border-b border-slate-600 text-center"
              >
                {ct}
              </div>
            ))}
          </div>

          {/* Rows */}
          {topGenes.map((gene) => {
            const rowMap = matrix.get(gene) ?? new Map<string, DERow>();
            return (
              <div
                key={gene}
                className="grid"
                style={{ gridTemplateColumns: `180px repeat(${cellTypes.length}, 1fr)` }}
              >
                <div className="px-2 py-1 text-slate-200 text-xs border-b border-slate-800">
                  {gene}
                </div>

                {cellTypes.map((ct) => {
                  const r = rowMap.get(ct);
                  const bg = r ? colorForLog2FC(r.log2FC, vmax) : "rgba(15, 23, 42, 0.6)";
                  const label = r ? (r.log2FC >= 0 ? `+${Math.pow(2, r.log2FC).toFixed(1)}x` : `−${Math.pow(2, -r.log2FC).toFixed(1)}x`) : "—";
                  const isHovered = hover?.row === r;

                  return (
                    <div
                      key={`${gene}-${ct}`}
                      className="border-b border-slate-800 border-l border-slate-800 h-4 flex items-center justify-center text-xs cursor-default"
                      style={{ backgroundColor: bg }}
                      onMouseEnter={(e) => {
                        if (!r) return;
                        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                        setHover({
                          x: rect.left + rect.width / 2,
                          y: rect.top,
                          row: r,
                        });
                      }}
                      onMouseLeave={() => setHover(null)}
                    >
                      <span className={`transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'} text-slate-100`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tooltip */}
      {hover && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: hover.x + 12, top: hover.y - 10 }}
        >
          <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 shadow-lg max-w-xs">
            <div className="text-slate-200 text-sm font-semibold">
              {hover.row.category} — {hover.row.cell_type}
            </div>
            <div className="text-slate-300 text-xs mt-2">
              {hover.row.log2FC >= 0 ? (
                <>
                  <span className="text-red-400">Upregulated</span>
                  <p className="text-slate-400 mt-1">This gene is expressed {Math.pow(2, hover.row.log2FC).toFixed(1)}x more in Alzheimer's disease cells than in control cells.</p>
                </>
              ) : (
                <>
                  <span className="text-blue-400">Downregulated</span>
                  <p className="text-slate-400 mt-1">This gene is expressed {Math.pow(2, -hover.row.log2FC).toFixed(1)}x less in Alzheimer's disease cells than in control cells.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Color Legend */}
      <div className="mt-12 flex justify-center">
        <div style={{ width: '70%' }}>
          <div
            className="h-8 rounded border border-slate-700"
            style={{
              background: `linear-gradient(to right, rgb(59, 130, 246), rgb(15, 23, 42), rgb(239, 68, 68))`,
            }}
          />
          <div className="flex justify-between text-slate-400 text-xs mt-2 px-2">
            <span>−{Math.pow(2, vmax).toFixed(0)}x</span>
            <span>1x</span>
            <span>+{Math.pow(2, vmax).toFixed(0)}x</span>
          </div>
          <div className="flex justify-between text-xs mt-3 px-2">
            <span className="text-blue-400">Downregulated</span>
            <span className="text-red-400">Upregulated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
