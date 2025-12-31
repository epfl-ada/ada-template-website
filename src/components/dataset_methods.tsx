import { ArrowLeft, Beaker, Database, FileText, GitBranch } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ResponsiveContainer,
    Treemap
} from 'recharts';
import tinycolor from 'tinycolor2';
import '../styles/globals.css';
import { ImageWithFallback } from './figma/ImageWithFallback';
import corrAlzFig from '/src/assets/corr_alzheimer.svg';
import corrCtrlFig from '/src/assets/corr_control.svg';
import corrDiffFig from '/src/assets/corr_difference.svg';

import { useEffect } from "react";

type FigureProps = {
    src: string;
    title: string;
    caption?: string;
    wide?: boolean;
};

export function Figure({ src, title, caption, wide }: FigureProps) {
    const [zoomSrc, setZoomSrc] = useState<string | null>(null);

    // ESC to close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setZoomSrc(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <>
            <figure className={wide ? "max-w-4xl mx-auto" : "max-w-2xl mx-auto"}>
                <img
                    src={src}
                    alt={title}
                    className="
            w-full h-auto cursor-zoom-in
            rounded-xl
            shadow-md
            transition-transform duration-300 ease-out
            hover:scale-[1.02]
          "
                    onClick={() => setZoomSrc(src)}
                />

                <figcaption className="mt-4 text-sm text-gray-700 text-justify">
                    <strong>{title}.</strong> {caption}
                </figcaption>

                <p className="mt-1 text-xs text-gray-400 text-center">
                    Click to enlarge
                </p>
            </figure>

            {/* Zoom overlay */}
            {zoomSrc && (
                <div
                    className="
            fixed inset-0 z-50
            bg-black/70
            backdrop-blur-sm
            flex items-center justify-center
            transition-opacity duration-300
          "
                    onClick={() => setZoomSrc(null)}
                >
                    <img
                        src={zoomSrc}
                        className="
              max-w-[92vw] max-h-[92vh]
              rounded-2xl
              shadow-2xl
              bg-white
              p-4
              animate-zoomIn
            "
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </>
    );
}



type TreemapContentProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    name: string;
    fill?: string;
};

function getSubColor(parentColor: string, currentValue: number, maxValue: number) {
    // If we only have one gene or max is 0, just return the parent color
    if (maxValue <= 0) return parentColor;

    const ratio = currentValue / maxValue;

    // Logic: Larger values get a slightly deeper/saturated version of the parent
    // Smaller values get a significantly lighter/washed-out version.
    // Adjust '20' and '10' to change the contrast range.
    return ratio > 0.8
        ? tinycolor(parentColor).darken(5).toString()
        : tinycolor(parentColor).lighten(30 - (ratio * 25)).toString();
}

function CustomTreemapContent(props: TreemapContentProps & {
    activeCategory: string | null;
    setActiveCategory: (v: string | null) => void;
    activeCategoryColor?: string;
    setActiveCategoryColor?: (color: string | null) => void;
}) {
    const { x, y, width, height, name, fill, activeCategory, setActiveCategory, activeCategoryColor, setActiveCategoryColor } = props;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={fill || activeCategoryColor || '#334155'} // subcategories inherit color
                stroke="#020617"
                onClick={() => {
                    if (!activeCategory) {
                        setActiveCategory(name);
                        if (setActiveCategoryColor) {
                            setActiveCategoryColor(fill || '#334155'); // store parent color
                        }
                    }
                }}
                style={{ cursor: activeCategory ? 'default' : 'pointer' }}
            />
            {width > 80 && height > 30 && (
                <text
                    x={x + 6}
                    y={y + 20}
                    fill="#e5e7eb" // your text color (can be changed to gradient or category-based)
                    fontSize={14}
                >
                    {name}
                </text>
            )}
        </g>
    );
}



export function DatasetMethods() {

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [activeCategoryColor, setActiveCategoryColor] = useState<string | null>(null);

    // Sample information (replace with computed values later)
    const sampleData = [
        { mouse: 'TgCRND8', timepoint: '2.5 months', cells: '~54,900' },
        { mouse: 'TgCRND8', timepoint: '5.7 months', cells: '~58,700' },
        { mouse: 'TgCRND8', timepoint: '17.9 months', cells: '~60,900' },
        { mouse: 'wildtype', timepoint: '2.5 months', cells: '~58,200' },
        { mouse: 'wildtype', timepoint: '5.7 months', cells: '~58,700' },
        { mouse: 'wildtype', timepoint: '13.4 months', cells: '~59,900' },
    ];

    // Gene categories distribution
    const geneCategories = [
        { category: 'Mitochondrial', count: 600899, color: '#0ea5e9' },
        { category: 'Oxidative stress', count: 2058303, color: '#fb7185' },
        { category: 'Lipid Metabolism Transport', count: 4276854, color: '#34d399' },
        { category: 'AminoAcid Creatine OneCarbon', count: 4746738, color: '#fbbf24' },
        { category: 'Astrocyte Metabolic Support', count: 1835859, color: '#2dd4bf' },
        { category: 'Vascular Nutrient Coupling', count: 2884413, color: '#38bdf8' },
        { category: 'GrowthFactor Metabolic Signaling', count: 12014625, color: '#a78bfa' },
        { category: 'Redox Lysosomal Metabolism', count: 12014625, color: '#fda4af' },
        { category: 'Ion Signaling EnergyCoupling', count: 12014625, color: '#60a5fa' },
        { category: 'Immune Metabolic Crosstalk', count: 12014625, color: '#f472b6' },
        { category: 'Autophagy Proteostasis', count: 12014625, color: '#fb923c' },
        { category: 'Glucose Nutrient Transport', count: 12014625, color: '#4ade80' },
        { category: 'Synaptic Energy Demand', count: 12014625, color: '#818cf8' },
    ];

    const energyGenes: Record<string, string[]> = {
        Mitochondrial: ["Gatm"],
        "Oxidative stress": ["Gpx4", "Prdx6", "Cyba"],
        "Lipid Metabolism Transport": ["Acsbg1", "Apoe", "Apod", "Lcn2", "Cyp1b1", "Sorl1", "Stard5", "Slco2b1"],
        "AminoAcid Creatine OneCarbon": ["Gatm", "Aldh1a2", "Aldh1l1", "Aspg", "Gns", "Nme8", "Man2b1", "Hexa", "Hexb"],
        "Astrocyte Metabolic Support": ["Aldh1l1", "Apoe", "Gfap", "Lcn2", "Mertk", "Sorl1", "Wfs1"],
        "Vascular Nutrient Coupling": ["Angpt1", "Kdr", "Pecam1", "Emcn", "Tgfbr1"],
        "GrowthFactor Metabolic Signaling": ["Igf1", "Igf2", "Igfbp4", "Igfbp5", "Igfbp6", "Deptor", "Stat3", "Tnf", "Fos", "Id2"],
        "Redox Lysosomal Metabolism": ["Cyba", "Ctsb", "Ctsd", "Ctsh", "Ctss", "Ctsz", "Gns", "Prdx6", "Gpx4"],
        "Ion Signaling EnergyCoupling": ["Orai2", "Gucy1a1", "Gja1", "Gjb2", "Gjc3"],
        "Immune Metabolic Crosstalk": ["C1qa", "C1qb", "C1qc", "C3", "Cd68", "Trem2", "Tyrobp", "Csf1r", "Lyz2", "Itgam", "Itgax"],
        "Autophagy Proteostasis": ["Ctsb", "Ctsd", "Ctss", "Ctsz", "Lamp5", "Laptm5", "Gns"],
        "Glucose Nutrient Transport": ["Slc13a4", "Slc17a6", "Slc17a7", "Slc39a12", "Slco2b1", "Slc6a3"],
        "Synaptic Energy Demand": ["Syt2", "Syt6", "Rab3b", "Syngr1", "Grik3", "Ppp1r1b", "Nts", "Ntsr2"]
    };

    const geneCounts: Record<string, number> = {
        'Gatm': 187825,
        'Prdx6': 291825,
        'Gpx4': 298815,
        'Cyba': 10259,
        'Stard5': 26586,
        'Cyp1b1': 8400,
        'Lcn2': 1370,
        'Slco2b1': 34551,
        'Sorl1': 201806,
        'Acsbg1': 158680,
        'Apoe': 324763,
        'Apod': 146491,
        'Aldh1a2': 15081,
        'Gns': 170376,
        'Man2b1': 107495,
        'Aspg': 29048,
        'Hexb': 143284,
        'Nme8': 1463,
        'Aldh1l1': 107337,
        'Hexa': 147259,
        'Gfap': 139527,
        'Mertk': 87991,
        'Wfs1': 116928,
        'Pecam1': 36752,
        'Angpt1': 31147,
        'Tgfbr1': 34348,
        'Emcn': 24493,
        'Kdr': 29956,
        'Igfbp4': 67771,
        'Igfbp5': 149617,
        'Deptor': 39080,
        'Stat3': 126400,
        'Fos': 34313,
        'Igf2': 37284,
        'Id2': 166307,
        'Igf1': 27265,
        'Igfbp6': 52166,
        'Tnf': 732,
        'Ctsh': 32717,
        'Ctsb': 262120,
        'Ctsz': 73110,
        'Ctsd': 281983,
        'Ctss': 85052,
        'Orai2': 78367,
        'Gjc3': 86352,
        'Gucy1a1': 100639,
        'Gja1': 190505,
        'Gjb2': 13470,
        'Tyrobp': 26774,
        'C1qa': 64856,
        'Csf1r': 61157,
        'C1qc': 51548,
        'Cd68': 33444,
        'C3': 6263,
        'Itgam': 27649,
        'Lyz2': 34323,
        'C1qb': 61103,
        'Itgax': 1555,
        'Trem2': 25416,
        'Lamp5': 86726,
        'Laptm5': 47947,
        'Slc17a6': 93024,
        'Slc13a4': 17082,
        'Slc39a12': 79957,
        'Slc17a7': 172306,
        'Slc6a3': 867,
        'Syt6': 45165,
        'Ntsr2': 184022,
        'Rab3b': 66928,
        'Nts': 16927,
        'Grik3': 87767,
        'Ppp1r1b': 95373,
        'Syngr1': 239906,
        'Syt2': 76809
    };
    const categoryTotals = Object.fromEntries(
        Object.entries(energyGenes).map(([category, genes]) => [
            category,
            genes.reduce(
                (sum, gene) => sum + (geneCounts[gene] ?? 0),
                0
            )
        ])
    );

    const categoryColors: Record<string, string> = {
        "Mitochondrial": "#1f77b4",                 // deep blue
        "Oxidative stress": "#9467bd",              // purple
        "Lipid Metabolism Transport": "#2ca02c",    // green
        "AminoAcid Creatine OneCarbon": "#ff7f0e",  // orange
        "Astrocyte Metabolic Support": "#17becf",   // cyan
        "Vascular Nutrient Coupling": "#4e79a7",    // steel blue
        "GrowthFactor Metabolic Signaling": "#e15759", // soft red
        "Redox Lysosomal Metabolism": "#b07aa1",    // mauve
        "Ion Signaling EnergyCoupling": "#edc949",  // yellow
        "Immune Metabolic Crosstalk": "#d62728",    // strong red
        "Autophagy Proteostasis": "#8c564b",        // brown
        "Glucose Nutrient Transport": "#59a14f",    // fresh green
        "Synaptic Energy Demand": "#f28e2b"         // amber
    };

    const categoryTreemapData = Object.entries(categoryTotals).map(
        ([name, size]) => ({
            name,
            size,
            fill: categoryColors[name] ?? "#334155",
        })
    );
    const geneTreemapData = activeCategory
        ? (() => {
            const genes = energyGenes[activeCategory] || [];
            // Find the maximum count in this specific category for scaling
            const maxCount = Math.max(...genes.map(g => geneCounts[g] ?? 0));

            return genes.map((gene) => ({
                name: gene,
                size: geneCounts[gene] ?? 0,
                // Pass the actual count and the max count for shading
                fill: getSubColor(
                    categoryColors[activeCategory],
                    geneCounts[gene] ?? 0,
                    maxCount
                )
            }));
        })()
        : categoryTreemapData;

    // Keep your sorting logic
    const sortedGeneTreemapData = [...geneTreemapData].sort((a, b) => b.size - a.size);
    const sortedCategoryTreemapData = categoryTreemapData.sort((a, b) => b.size - a.size);
    // Quality metrics (placeholder)
    const qualityMetrics = [
        { metric: 'Total Gene Types Detected', value: 541 },
        { metric: 'Median UMI/Cell', value: 203 },
        { metric: 'Median Genes/Cell', value: 71 },
        { metric: 'Mitochondrial %', value: 0.24 },
    ];

    const preprocessingSteps = [
        {
            step: 'Quality Control',
            description: 'Transcripts are filtered based on their Quality Value (Phred Score). The acdeptable lower limit was chosen as 15.',
            icon: Beaker,
        },
        {
            step: 'Normalization',
            description: 'Log-normalization and scaling to account for sequencing depth',
            icon: GitBranch,
        },
        {
            step: 'Cell Type Annotation',
            description: 'Marker-based annotation and semi-supervised clustering',
            icon: FileText,
        },
        {
            step: 'Spatial Registration',
            description: 'Alignment of spatial coordinates and plaque segmentation',
            icon: Database,
        },
    ];

    const [zoomSrc, setZoomSrc] = useState<string | null>(null);

    return (
        <div className="pt-20 min-h-screen">

            {/* HEADER SECTION */}
            <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
                <div className="absolute inset-0 z-0">
                    <ImageWithFallback
                        src="https://images.unsplash.com/photo-1711409664431-4e7914ac2370"
                        alt="Spatial transcriptomics"
                        className="w-full h-full object-cover opacity-10"
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 group"
                    >
                        <ArrowLeft className="size-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl">
                                <Database className="size-10 text-white" />
                            </div>
                            <h1 className="text-5xl md:text-6xl gradient-text">Dataset & Methods</h1>
                        </div>

                        <p className="text-xl text-slate-300 max-w-3xl">
                            High-resolution spatial transcriptomics from the TgCRND8 Alzheimer’s mouse model,
                            enabling metabolic, glial, synaptic, and spatial profiling across pathology progression.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* DATASET OVERVIEW SECTION */}
            <section className="py-16 bg-[#050814]">
                <div className="container mx-auto px-6">

                    {/* Dataset Overview introduction */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl mb-4 gradient-text">Dataset Overview</h2>

                        <p className="text-slate-400 max-w-3xl">
                            We analyze spatial transcriptomics data generated using the <strong>10x Xenium</strong> platform.
                            The dataset covers multiple ages (2.5 to 17.9 months) in <strong>TgCRND8</strong> and
                            <strong> wild-type</strong> mice, including:
                            <br /><br />
                            • High-resolution <strong>cell and nucleus coordinates (x/y)</strong><br />
                            • A curated <strong>panel of metabolic, glial, immune, and synaptic genes</strong><br />
                            • Segmented <strong>amyloid plaques</strong> with spatial distance annotation<br />
                            • Multiple biological replicates per age and genotype<br />
                            <br></br>
                            Generated data is available as uncleaned .csv format which provides data on coordinates among other things.
                            As part of the analysis the transcripts file will be cleaned. The cleaned output can be
                            helpful for spatial analysis, as it provides the location of cells in the mouse brain.
                            In addition, <strong>10x Xenium</strong> platform generates cleaned datasets in the .h5ad format
                            which can provide the number of each gene type per cell.

                        </p>
                    </motion.div>

                    {/* Sample information + Quality metrics */}
                    <div className="grid md:grid-cols-2 gap-8 mb-12">

                        {/* Sample Information block */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
                        >
                            <h3 className="text-2xl mb-6 text-blue-400">Sample Information</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-center" >
                                    <thead>
                                        <tr className="border-b border-slate-700">
                                            <th className="py-3 px-4 text-slate-300">Mouse</th>
                                            <th className="py-3 px-4 text-slate-300">Timepoint</th>
                                            <th className="py-3 px-4 text-slate-300">Cells</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sampleData.map((row, idx) => (
                                            <motion.tr
                                                key={row.timepoint}
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors"
                                            >
                                                <td className="py-3 px-4 text-slate-300">{row.mouse}</td>
                                                <td className="py-3 px-4 text-slate-300">{row.timepoint}</td>
                                                <td className="py-3 px-4 text-slate-300">{row.cells}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>

                        {/* Quality Metrics */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
                        >
                            <h3 className="text-2xl mb-6 text-purple-400">Quality Metrics</h3>
                            <p className="text-slate-400 mb-4">
                                Summary of per-cell quality statistics after QC and preprocessing.
                            </p>

                            <div className="space-y-4">
                                {qualityMetrics.map((metric, idx) => (
                                    <motion.div
                                        key={metric.metric}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex justify-between items-center p-4 bg-slate-900/50 rounded-lg"
                                    >
                                        <span className="text-slate-300">{metric.metric}</span>
                                        <span className="text-2xl gradient-text">{metric.value.toLocaleString()}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Gene categories pie chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 mb-12"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-semibold text-slate-100">
                                Energy metabolism gene categories
                            </h2>

                            {activeCategory && (
                                <button
                                    onClick={() => setActiveCategory(null)}
                                    className="text-sm text-blue-400 hover:text-blue-300"
                                >
                                    ← Back to categories
                                </button>
                            )}
                        </div>

                        {/* Gene categories description */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-z text-slate-400 text-sm md:text-base"
                        >
                            <p className="text-slate-400 mt-4 text-sm text-justify leading-relaxed max-w-4xl">
                                Genes included in this analysis were carefully selected from the Xenium mouse brain dataset, based on their documented roles in cellular energy metabolism and metabolic regulation, using well-established annotations from KEGG and Gene Ontology (GO).

                                The selected genes were then grouped into functional categories representing complementary
                                aspects of neuronal and glial energetics. These categories are designed to capture both
                                core metabolic processes and supporting regulatory mechanisms.
                            </p>
                            <br></br>
                        </motion.div>
                        <ResponsiveContainer width="100%" height={600}>
                            <Treemap
                                // Use the sorted data here
                                data={activeCategory ? sortedGeneTreemapData : sortedCategoryTreemapData}
                                dataKey="size"
                                nameKey="name"
                                stroke="transparent"
                                animationDuration={600}
                                content={(props: any) => {
                                    const { x, y, width, height, name, fill } = props;
                                    if (width < 25 || height < 25) return null;

                                    return (
                                        <g>
                                            <motion.rect
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                x={x}
                                                y={y}
                                                width={width}
                                                height={height}
                                                fill={fill} // This fill is now calculated via getSubColor
                                                fillOpacity={0.9}
                                                rx={4}
                                                ry={4}
                                                stroke="#050814" // Match background for clean gaps
                                                strokeWidth={1}
                                                className="transition-all duration-300 hover:brightness-110"
                                                onClick={() => {
                                                    if (!activeCategory) setActiveCategory(name);
                                                }}
                                                style={{ cursor: activeCategory ? 'default' : 'pointer' }}
                                            />
                                            {width > 40 && height > 20 && (
                                                <text
                                                    x={x + width / 2}
                                                    y={y + height / 2}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fill="#ffffff"
                                                    style={{
                                                        fontSize: Math.min(12, width / 6),
                                                        fontWeight: "600",
                                                        pointerEvents: "none",
                                                        textShadow: '0px 1px 2px rgba(0,0,0,0.6)'
                                                    }}
                                                >
                                                    {name}
                                                </text>
                                            )}
                                        </g>
                                    );
                                }}
                            />
                        </ResponsiveContainer>

                        <p className="text-slate-400 mt-4 text-sm">
                            {activeCategory
                                ? 'Each tile represents a gene within this metabolic category.'
                                : 'Click a category to show individual genes.'}
                        </p>
                        <br></br>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-z text-slate-400 text-sm md:text-base"
                        >
                            <div className="text-slate-400 mt-4 text-sm leading-relaxed max-w-4xl mx-auto">
  <ul className="list-disc list-inside space-y-2 text-justify">
    <li>
      <span className="font-semibold text-slate-300">Mitochondrial function</span> – central pathways for cellular energy production, including oxidative phosphorylation
    </li>
    <li>
      <span className="font-semibold text-slate-300">Oxidative Stress / Antioxidant Defense</span> – pathways managing reactive oxygen species and cellular redox balance
    </li>
    <li>
      <span className="font-semibold text-slate-300">Lipid Metabolism and Transport</span> – regulation of lipid synthesis, breakdown, and intercellular transport
    </li>
    <li>
      <span className="font-semibold text-slate-300">Amino-Acid and One-Carbon Metabolism</span> – critical for biosynthesis, methylation reactions, and energy support
    </li>
    <li>
      <span className="font-semibold text-slate-300">Astrocyte Metabolic Support</span> – genes involved in energy support provided by glial cells
    </li>
    <li>
      <span className="font-semibold text-slate-300">Vascular–Nutrient Coupling</span> – genes linking blood flow to metabolic supply
    </li>
    <li>
      <span className="font-semibold text-slate-300">Growth-Factor and Metabolic Signaling</span> – pathways coordinating energy demand with cellular growth and signaling
    </li>
    <li>
      <span className="font-semibold text-slate-300">Redox and Lysosomal Metabolism</span> – regulation of reactive species and degradation pathways
    </li>
    <li>
      <span className="font-semibold text-slate-300">Ion Signaling and Energy Coupling</span> – pathways linking ion transport to energy consumption
    </li>
    <li>
      <span className="font-semibold text-slate-300">Immune–Metabolic Crosstalk</span> – interactions between immune responses and metabolic activity
    </li>
    <li>
      <span className="font-semibold text-slate-300">Autophagy and Proteostasis</span> – maintenance of protein homeostasis and energy recycling
    </li>
    <li>
      <span className="font-semibold text-slate-300">Glucose and Nutrient Transport</span> – transporters and pathways mediating nutrient uptake
    </li>
    <li>
      <span className="font-semibold text-slate-300">Synaptic Energy Demand</span> – genes supporting the high energy requirements of neuronal communication
    </li>
  </ul>

  <p className="mt-6 text-justify">
    This systematic classification resulted in 74 unique genes, representing roughly 21%
    of the analyzed gene panel. By organizing genes into these biologically meaningful categories,
    this framework enables the investigation of both primary energy dysfunction and secondary
    regulatory responses across disease stages and spatial contexts within the mouse brain.
    This approach facilitates a comprehensive understanding of metabolic alterations,
    highlighting how neurons and glial cells adapt to disease-related stressors.
  </p>
</div>

                            <br></br>
                        </motion.div>
                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-z text-slate-400 text-sm md:text-base"
                    >
                        <p className="text-slate-400 mt-4 text-sm text-justify leading-relaxed max-w-4xl mx-auto">
                            The following plots display correlation heatmaps of metabolic categories in single cells from
                            Control and Alzheimer groups. They reveal how different metabolic pathways fluctuate together,
                            highlighting patterns of coordinated activity under normal conditions and potential disruptions
                            in Alzheimer’s disease. A differential heatmap is also provided to directly visualize changes
                            in co-regulation between the two groups.
                        </p>
                        <br></br>
                        {/* Row 1 */}
                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <Figure
                                    src={corrCtrlFig}
                                    title="Category–category correlations (Control)"
                                    caption="Pearson correlations between metabolic categories in control samples."
                                />

                                <Figure
                                    src={corrAlzFig}
                                    title="Category–category correlations (Alzheimer)"
                                    caption="Same correlations computed for Alzheimer samples."
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="flex justify-center mt-12">
                            <Figure
                                src={corrDiffFig}
                                title="Δ Correlation (Alzheimer − Control)"
                                caption="Difference in correlations between Alzheimer and control groups."
                                wide
                            />
                        </div>
                        <p className="text-slate-400 mt-4 text-sm text-justify leading-relaxed max-w-4xl mx-auto">
                            <p>
                                <br></br>
                                Both Control and Alzheimer groups show mostly positive
                                correlations among metabolic categories, indicating
                                coordinated regulation across energy and cellular pathways. <br></br>
                                •	Control: Strong, widespread correlations highlight
                                tightly co-regulated systems, including mitochondrial
                                energy production, redox balance, lipid metabolism,
                                and synaptic energy support.<br></br>
                                •	Alzheimer: Correlations are generally weaker and less structured.
                                Some pathways, like ion signaling and vascular–nutrient coupling,
                                lose coordination, while core mitochondrial–oxidative–lipid interactions remain. <br></br>
                                •	Δ-Correlation (Alzheimer − Control): Shows areas
                                where coordination weakens (blue) or strengthens (red),
                                suggesting emerging metabolic fragmentation alongside
                                compensatory responses. <br></br>

                                Overall, Alzheimer’s tissue exhibits partial disruption
                                of coordinated metabolism, with some energy systems remaining
                                intact while others lose synchronization. <br></br>
                            </p>
                        </p>
                        <br></br>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {preprocessingSteps.map((item, idx) => {
                            const IconComponent = item.icon;
                            return (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-blue-500/10 rounded-lg">
                                            <IconComponent className="size-6 text-blue-400" />
                                        </div>
                                        <h3 className="text-xl text-slate-100">{item.step}</h3>
                                    </div>
                                    <p className="text-slate-400">{item.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section >
        </div >
    );
}