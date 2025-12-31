import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Layers } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import homepagefig from '../assets/homepage.png';

export function HomePage() {
  const features = [
    {
      id: 'rq1',
      title: 'Spatial Analysis',
      description: 'Does metabolic dysfunction in Alzheimer\'s follow a spatial gradient around amyloid plaques?',
      icon: MapPin,
      link: '/rq1-spatial',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      id: 'rq2',
      title: 'Temporal Evolution',
      description: 'How does metabolic dysfunction evolve with disease progression?',
      icon: Clock,
      link: '/rq2-temporal',
      gradient: 'from-purple-500 to-green-500',
    },
    {
      id: 'rq3',
      title: 'Cell-Type Vulnerability',
      description: ' Do different cell types exhibit distinct metabolic responses to Alzheimer\'s pathology?',
      icon: Layers,
      link: '/rq3-celltypes',
      gradient: 'from-green-500 to-yellow-500',
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1716833322990-acbeae5cc3eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXVyb25zJTIwYnJhaW4lMjB0aXNzdWUlMjBtaWNyb3Njb3B5fGVufDF8fHx8MTc2NTMxNTM0MXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Brain tissue microscopy"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e27]/50 via-[#0a0e27]/80 to-[#0a0e27]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl mb-6 gradient-text">
              Energy Crisis in Alzheimer's Mouse Brain
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              A spatial transcriptomics investigation of metabolic dysfunction in amyloid pathology
            </p>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
              EPFL – Applied Data Analysis Project
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all glow-hover group"
              >
                <span>Explore the Data Story</span>
                <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex items-start justify-center p-2">
            <motion.div
              className="w-1 h-2 bg-blue-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Feature Cards */}
      <section id="features" className="py-24 bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4 gradient-text">Research Questions</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Exploring three key dimensions of metabolic dysfunction in Alzheimer's disease
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Link to={feature.link}>
                    <div className="group relative h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 glow-hover overflow-hidden">
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                      <div className="relative z-10">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6`}>
                          <Icon className="size-8 text-white" />
                        </div>
                        <h3 className="text-2xl mb-3 text-white">{feature.title}</h3>
                        <p className="text-slate-400 mb-6">{feature.description}</p>
                        <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300">
                          <span>Explore analysis</span>
                          <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Project Overview */}
<section className="py-24 bg-[#050814]">
  <div className="container mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Texte à gauche */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl mb-6 gradient-text">Project Overview</h2>
        <div className="space-y-4 text-slate-300">
          <p>
            Alzheimer's disease is characterized by metabolic dysfunction in the brain caused by the accumulation of toxic proteins, forming microscopic lesions called amyloid plaques.
            This project leverages spatial transcriptomics data to investigate how energy metabolism is affected in mouse models of Alzheimer's disease.
          </p>
          <p>
            We analyze three critical aspects: the spatial relationship between metabolic dysfunction and amyloid plaques,
            temporal changes across disease progression, and cell-type-specific vulnerabilities to metabolic decline.
          </p>
          <p>
            By integrating advanced data analysis techniques with biological insights, we aim to uncover patterns that could inform
            therapeutic strategies targeting metabolic dysfunction in Alzheimer's disease.
          </p>
        </div>
      </motion.div>

      {/* Image à droite */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="w-full h-[350px] overflow-hidden rounded-2xl shadow-2xl glow relative">
          <ImageWithFallback
            src={homepagefig}
            alt="Scientific visualization"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  </div>
</section>



      {/* Dataset & Methods */}
      <section className="py-24 bg-gradient-to-b from-[#050814] to-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6 gradient-text">Dataset {'&'} Methods</h2>
            <p className="text-slate-400 max-w-3xl mx-auto">
              Our analysis uses cutting-edge spatial transcriptomics to map gene expression with spatial resolution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
            >
              <h3 className="text-2xl mb-4 text-blue-400">Dataset</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Spatial transcriptomics from 5xFAD mouse model</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Multiple time points: 2, 5, and 13+ months</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>High-resolution spatial coordinates for each cell</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Gene expression profiles for metabolic pathways</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8"
            >
              <h3 className="text-2xl mb-4 text-purple-400">Methods</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Spatial proximity analysis to amyloid plaques</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Temporal trajectory modeling across age groups</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Cell-type deconvolution and annotation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">•</span>
                  <span>Statistical testing with multiple comparison correction</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
