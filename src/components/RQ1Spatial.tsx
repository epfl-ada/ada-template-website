import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';
import globalSpatialMap from '../assets/newplot.png';
import spatial25 from '../assets/spatial_distance_to_plaque_2_5.png';
import spatial57 from '../assets/spatial_distance_to_plaque_5_7.png';
import spatial179 from '../assets/spatial_distance_to_plaque_17_9.png';
import mouseBrainRegions from '../assets/brain_map.jpg'; 
import Plot from "react-plotly.js";
import figData from "../assets/spatial_plot_data_2.json";

export default function SpatialPlot() {
  const fig = JSON.parse(JSON.stringify(figData)); // convert JSON en objet JS

  return (
    <Plot
      data={fig.data}
      layout={fig.layout}
      config={{ responsive: true, displayModeBar: true }}
      style={{ width: "100%", height: "700px" }}
    />
  );
}


export function RQ1Spatial() {
  // Mock data for spatial analysis
  const distanceData = [
    { distance: '0-50', metabolicScore: 0.59, count: 869 },
    { distance: '50-100', metabolicScore: 0.98, count: 887 },
    { distance: '100-150', metabolicScore: 0.95, count: 1966 },
    { distance: '150-200', metabolicScore: 0.93, count: 3284 },
    { distance: '200-500', metabolicScore: 0.99, count: 48746 },
    { distance: '500+', metabolicScore: 1.05, count: 294551 },
  ];

  const geneExpressionData = [
    { gene: 'Gatm', nearPlaque: 0.97, farPlaque: 1.37, category: 'Mitochondrial' },
    { gene: 'Apoe', nearPlaque: 6.06, farPlaque: 7.97, category: 'Lipid metabolism transport ' },
    { gene: 'Gpx4', nearPlaque: 1.93, farPlaque: 3.61, category: 'Oxidative stress' },
    { gene: 'Igf1', nearPlaque: 0.13, farPlaque: 0.12, category: 'Growth factor' },
    { gene: 'Ctsd', nearPlaque: 2.13, farPlaque: 2.95, category: 'Redox lysosomal metabolism' },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1762279388957-c6ed514d3353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhdGElMjB2aXN1YWxpemF0aW9ufGVufDF8fHx8MTc2NTI1NDIyOXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Data visualization"
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
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <MapPin className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl gradient-text">Spatial Analysis</h1>

              </div>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl">
              Does metabolic dysfunction in Alzheimer's follow a spatial gradient around amyloid plaques ?
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Finding */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-2xl p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-start gap-4">
              <TrendingDown className="size-12 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl mb-3 text-purple-300">Key Finding</h3>
                <p className="text-slate-300">
                  We investigate whether metabolic and stress-related transcriptional 
                  programs vary as a function of distance to amyloid plaques in AD mouse models. 
                  Moreover, we focus on certain gene expression between mice of different age 
                  and across brian area.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Brain Regions Overview */}
<section className="py-16" style={{ backgroundColor: '#050814' }}>
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl mb-4 text-center" style={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        Mouse Brain Regions Overview
      </h2>

      <p className="text-center mb-12 max-w-3xl mx-auto leading-relaxed" style={{ color: '#94a3b8' }}>
        Anatomical map of a mouse brain sagittal section, highlighting key regions
        relevant to Alzheimer’s disease research.
      </p>

      {/* Image du cerveau */}
      <div className="flex justify-center mb-12">
        <figure className="max-w-5xl">
          <img
            src={mouseBrainRegions}
            alt="Sagittal section of a mouse brain with annotated regions"
            className="rounded-xl border shadow-lg"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          />
          <figcaption className="mt-6 text-sm leading-relaxed text-center" style={{ color: '#cbd5e1' }}>
            Sagittal section of a mouse brain showing major anatomical regions.
            Colors indicate distinct brain areas, referenced in the legend below.
          </figcaption>
        </figure>
      </div>

      {/* Brain Regions Legend */}
      <div className="max-w-4xl mx-auto mt-16">
        <h3 className="text-2xl text-center mb-10" style={{ color: '#c084fc' }}>
          Brain Regions Legend
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Cortex */}
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: '#166534' }}></div>
            <div>
              <h4 className="text-lg font-medium" style={{ color: '#15803d' }}>
                Cortex 
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                Outer layer involved in sensory perception, cognition,
                and voluntary movement.
              </p>
            </div>
          </div>

          {/* Hippocampus */}
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: '#6ee7b7' }}></div>
            <div>
              <h4 className="text-lg font-medium" style={{ color: '#6ee7b7' }}>
                Hippocampus 
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                Critical for memory formation and spatial navigation.
              </p>
            </div>
          </div>

          {/* Thalamus */}
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: '#ef4444' }}></div>
            <div>
              <h4 className="text-lg font-medium" style={{ color: '#fca5a5' }}>
                Thalamus
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                Sensory relay station involved in consciousness and alertness.
              </p>
            </div>
          </div>

          {/* Hypothalamus */}
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: '#991b1b' }}></div>
            <div>
              <h4 className="text-lg font-medium" style={{ color: '#f87171' }}>
                Hypothalamus 
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                Regulates homeostasis: hunger, thirst, sleep,
                and hormonal responses.
              </p>
            </div>
          </div>

          {/* Striatum */}
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: '#9ca3af' }}></div>
            <div>
              <h4 className="text-lg font-medium" style={{ color: '#4b5563' }}>
                Striatum
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                Involved in motor control, reward, and executive functions.
              </p>
            </div>
          </div>

          {/* Amygdala */}
          <div className="flex items-start gap-3">
            <div className="w-4 h-4 rounded-full mt-1 flex-shrink-0" style={{ backgroundColor: '#cbd5e1' }}></div>
            <div>
              <h4 className="text-lg font-medium" style={{ color: '#3b82f6' }}>
                Amygdala
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                Key for emotion processing, especially fear and aggression.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Description générale */}
      <div className="mt-20">
        <p className="text-slate-400 text-center mt-8 max-w-3xl mx-auto leading-relaxed">
          This sagittal section highlights the spatial organization of mouse brain
          regions.
        </p>

        <p className="text-center mt-4 max-w-3xl mx-auto leading-relaxed" style={{ color: '#94a3b8' }}>
          The <span style={{ color: '#15803d', fontWeight: '500' }}>cortex</span>,{" "}
          <span style={{ color: '#6ee7b7', fontWeight: '500' }}>hippocampus</span>, and{" "}
          <span style={{ color: '#fca5a5', fontWeight: '500' }}>thalamus</span> are particularly
          relevant in Alzheimer’s disease research, as they are affected by amyloid
          plaque accumulation and metabolic dysfunction.
        </p>
      </div>

    </motion.div>
  </div>
</section>

    {/* Global spatial map */}
<section className="py-16 bg-[#050814]">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
        Global spatial organization of brain cells
      </h2>

      <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
        Let’s first take a look at the overall spatial distribution of cells across mouse brain samples.
      </p>


      {/* Interactive spatial plot using Plotly */}
      <div className="flex justify-center">
        <figure className="w-full max-w-5xl">
          <div className="w-full rounded-xl border border-white/10 shadow-lg overflow-hidden">
            <SpatialPlot /> 
          </div>
          <figcaption className="mt-4 text-sm text-gray-300 leading-relaxed text-center">
            Interactive spatial distribution of brain cell types in TgCRND8 mice (2.5 months).
            Each point represents a single cell positioned by its spatial centroid.
            This visualization provides an overview of tissue geometry and spatial coverage, 
            forming the basis for subsequent plaque-centered distance analyses.
          </figcaption>
        </figure>
      </div>

    </motion.div>
  </div>
</section>





        {/* Spatial distance to amyloid plaques */}
<section className="py-16 bg-[#0a0e27]">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
        Spatial distance to amyloid plaques
      </h2>

      <p className="text-slate-300 text-center mb-8 italic">
        Now let’s see where are located those famous amyloid plaques.
      </p>

      {/* Methodological description */}
      <p className="text-slate-400 text-center mb-16 max-w-3xl mx-auto">
        To investigate whether Alzheimer’s pathology induces spatial gradients in cellular metabolism,
        we quantified the distance between individual cells and amyloid plaques in three TgCRND8
        Alzheimer’s mice (2.5, 5.7 and 17.9 months). Amyloid plaques were first localized by identifying
        plaque-associated marker genes (e.g. <em>App</em>, <em>Apoe</em>, <em>Trem2</em>, <em>Cst3</em>, <em>Gfap</em>).
        For each mouse, plaque centroids were computed either from transcript clustering or, when
        necessary, using marker-based scores as a fallback. Each cell’s spatial coordinates (X, Y)
        were then used to compute the Euclidean distance to the nearest plaque centroid, providing
        a continuous measure of proximity to plaques at single-cell resolution.
      </p>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* Mouse 2.5 months */}
        <figure className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
          <img
            src={spatial25}
            alt="Spatial distance to plaques – TgCRND8 2.5 months"
            className="w-full h-64 object-cover"
          />
          <figcaption className="p-4 text-sm text-gray-300">
            <span className="font-semibold text-gray-200">Figure A.</span>{" "}
            Spatial distance to the nearest amyloid plaque in TgCRND8 mice at 2.5 months.
          </figcaption>
        </figure>

        {/* Mouse 5–7 months */}
        <figure className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
          <img
            src={spatial57}
            alt="Spatial distance to plaques – TgCRND8 5–7 months"
            className="w-full h-64 object-cover"
          />
          <figcaption className="p-4 text-sm text-gray-300">
            <span className="font-semibold text-gray-200">Figure B.</span>{" "}
            Spatial distance to the nearest amyloid plaque in TgCRND8 mice at 5.7 months.
          </figcaption>
        </figure>

        {/* Mouse 17–9 months */}
        <figure className="bg-slate-800/30 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg">
          <img
            src={spatial179}
            alt="Spatial distance to plaques – TgCRND8 17–9 months"
            className="w-full h-64 object-cover"
          />
          <figcaption className="p-4 text-sm text-gray-300">
            <span className="font-semibold text-gray-200">Figure C.</span>{" "}
            Spatial distance to the nearest amyloid plaque in TgCRND8 mice at 17.9 months.
          </figcaption>
        </figure>
      </div>

      {/* Interpretation of color scale */}
<div className="text-slate-300 text-center mt-16 max-w-3xl mx-auto space-y-6">
  <p className="text-lg font-medium">
    The resulting maps display cells color-coded by their distance to the closest plaque:
  </p>

  <div className="flex justify-center">
    <ul className="list-none space-y-3 text-left">
      <li className="flex items-start gap-2">
        <span className="font-semibold text-blue-300">•</span>
        <span><span className="font-semibold">Blue / purple</span> colors indicate cells located close to plaques</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="font-semibold text-yellow-300">•</span>
        <span><span className="font-semibold">Yellow / green</span> colors indicate cells farther away from plaques</span>
      </li>
    </ul>
  </div>

  <p className="text-slate-300 mt-4">
    This representation allows a direct visualization of plaque-centered spatial gradients.
    Cells in close proximity to plaques are expected to be more strongly affected by
    plaque-associated processes such as metabolic dysfunction, oxidative stress, or
    inflammation. These distance measurements were subsequently used to analyze how energy
    and stress-related gene expression profiles vary as a function of distance from amyloid
    plaques.
  </p>
</div>


    </motion.div>
  </div>
</section>


      
      {/* Distance vs Metabolic Score */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Metabolic Activity vs. Distance from Plaques
            </h2>

            <p className="text-slate-300 text-center mb-8 italic">
              We can now compute and calculate the energy level of cells at different distances from amyloid plaques. 
              It will allow us to immediately see the effect of plaques on cellular metabolism.
            </p>

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={distanceData}>
                  <defs>
                    <linearGradient id="metabolicGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis 
                    dataKey="distance"
                    stroke="#94a3b8"
                    tick={{ fill: '#94a3b8' }}
                    label={{
                      value: 'Distance from Plaque (μm)',
                      position: 'insideBottom',
                      dy: 10,   // décale besides tip haul
                      fill: '#94a3b8',
                      style: { fontSize: '14px', textAnchor: 'middle'}
                    }}
                  />
                  <YAxis 
                    stroke="#94a3b8"
                    domain={[0.5, 1.1]}
                    ticks={[0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1]}
                    tick={{ fill: '#94a3b8' }}
                    label={{
                      value: 'Metabolic Score',
                      angle: -90,
                      position: 'insideLeft',
                      offset: 0,   // éloigne le label => évite le chevauchement
                      fill: '#94a3b8',
                      style: { fontSize: '14px', textAnchor: 'middle' }
                    }}  
                    />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                    labelStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend 
                    verticalAlign='bottom'
                    wrapperStyle={{ bottom: -5}}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="metabolicScore" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fill="url(#metabolicGradient)"
                    name="Energy Score"
                    dot={{ fill: '#3b82f6', r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-slate-300 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
              To quantify cellular energy levels, we calculated a composite <strong>EnergyScore</strong> for each cell.
              This score integrates the average expression of genes involved in critical metabolic pathways : 
              mitochondrial function, lipid metabolism, glucose transport, and synaptic energy demand.
            </p>

            <p className="text-slate-300 text-center mb-8 max-w-3xl mx-auto leading-relaxed">
              The resulting spatial profile reveals a <strong>sharp energy deficit</strong> in cells located within 50 µm of amyloid plaques,
              followed by a <strong>gradual recovery</strong> as distance increases.
              This pattern underscores how plaques disrupt local energy balance, a key feature of Alzheimer's disease progression.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gene Expression Comparison */}
<section className="py-16 bg-gradient-to-b from-[#050814] to-[#0a0e27]">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
        Gene Expression : Near vs. Far from Plaques
      </h2>
      <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
        After comparing cells energy scores, we can now look at specific gene expression changes.
        Here is a comparison of key metabolic genes in cells near {'(<100 μm)'} and far {'(>200 μm)'} from plaques
      </p>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 md:p-8">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={geneExpressionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="gene" stroke="#94a3b8" />
            <YAxis
              stroke="#94a3b8"
              label={{ value: 'Expression Level', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
              labelStyle={{ color: '#e2e8f0' }}
            />
            <Legend />
            <Bar dataKey="nearPlaque" fill="#ef4444" name="Near Plaque" />
            <Bar dataKey="farPlaque" fill="#10b981" name="Far from Plaque" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-400 mb-2">Mitochondrial Gene</h4>
          <p className="text-slate-300">
            Mitochondrial dysfunction is an early marker of Alzheimer's disease.
            <strong> Gatm</strong> is involved in creatine metabolism, essential for energy production in neuronal cells.
            Its expression shows a <strong>30% decrease</strong> near plaques, highlighting a significant reduction in energy capacity.
          </p>
        </div>
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <h4 className="text-purple-400 mb-2">Lipid metabolism</h4>
          <p className="text-slate-300">
            <strong>ApoE</strong> is the main genetic risk factor for Alzheimer’s disease.
            It is involved in lipid transport in the brain.
            ApoE shows a <strong>24% reduction</strong> in expression near plaques, indicating impaired lipid metabolism in these regions.
          </p>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-400 mb-2">Redox lysosomal metabolism</h4>
          <p className="text-slate-300">
            <strong>Gpx4 decreases by 47%</strong> near plaques, indicating increased oxidative stress.
            <strong> Igf1</strong> remains stable, suggesting growth factor signaling is less affected.
            <strong> Ctsd</strong>, involved in lysosomal function, <strong>decreases by 28%</strong> near plaques.
          </p>
        </div>
      </div>
      <p className="text-slate-300 mt-2 italic">
        Overall, we can say that most genes show <strong>reduced expression</strong> near amyloid plaques, 
        except for growth factor genes like Igf1, which appear unaffected. 
        This suggests that amyloid plaques <strong>disrupt cellular homeostasis and energy balance</strong>.
      </p>
    </motion.div>
  </div>
</section>


      {/* Conclusions */}
        <section className="py-16 bg-gradient-to-b from-[#0a0e27] to-[#050814]">
          <div className="container mx-auto px-6">
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl mb-8 text-center gradient-text">
                Conclusions
              </h2>

            <div className="space-y-6">

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-blue-400 mb-3">
                  Plaque-centered spatial gradients
                </h3>
                <p className="text-slate-300">
                  By explicitly quantifying the Euclidean distance between individual cells and amyloid plaques,
                  we demonstrate that Alzheimer’s pathology is organized around plaques in a spatially structured manner.
                  Cells located in close proximity to plaques consistently exhibit altered metabolic and stress-related
                  transcriptional profiles, supporting the existence of plaque-centered microenvironments.
                </p>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl text-purple-400 mb-3">
            Local metabolic vulnerability
          </h3>
          <p className="text-slate-300">
            The sharp decrease in energy-related scores and the downregulation of mitochondrial and redox genes
            within the first tens of micrometers from plaques indicate a strong local impairment of cellular
            energy homeostasis. This effect progressively attenuates with distance, suggesting that metabolic
            dysfunction is not uniform across the tissue but spatially constrained.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl text-green-400 mb-3">
            Disease progression and regional context
          </h3>
          <p className="text-slate-300">
            Comparing mice at different ages further reveals that these spatial gradients intensify with disease
            progression, consistent with increasing plaque burden. Moreover, the anatomical context of affected
            cells suggests that vulnerable brain regions such as cortex and hippocampus may experience distinct
            metabolic stresses depending on their spatial relationship to plaques.
          </p>
        </div>

        <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-xl text-yellow-400 mb-3">
            Implications for Alzheimer’s pathology
          </h3>
          <p className="text-slate-300">
            Together, these results support a model in which amyloid plaques act as localized hubs of metabolic
            and oxidative stress, reshaping the surrounding cellular landscape. This spatial framework provides
            a mechanistic basis for linking plaque accumulation to downstream cellular dysfunction and motivates
            distance-aware analyses when investigating neurodegenerative processes and potential therapeutic
            interventions.
          </p>
        </div>

      </div>
    </motion.div>
  </div>
</section>

    </div>
  );
}