import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Github, Linkedin, Mail, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About() {
  const teamMembers = [
    {
      name: 'Flavie Arod',
      role: 'Spatial analysis, Visualization and Web Development',
      github: 'https://github.com/flav602',
      linkedin: 'https://linkedin.com/in/flaviearod',
      email: 'flavie.arod@epfl.ch',
    },
    {
      name: 'Clara Gentile',
      role: 'Gene selection, Cell-type specificity',
      github: 'https://github.com/claragentile11',
      email: 'clara.gentile@epfl.ch',
    },
    {
      name: 'Nour Ben Jaafar',
      role: 'Temporal analysis',
      github: 'https://github.com/nourbj-web',
      linkedin: 'https://linkedin.com',
      email: 'member3@epfl.ch',
    },
    {
      name: 'Antonio Del Priore Antunes',
      role: 'Data cleaning & preprocessing',
      github: 'https://github.com/blichub',
      linkedin: 'https://linkedin.com',
      email: 'member4@epfl.ch',
    },
    {
      name: 'Ali Shenaskhosh',
      role: 'Data cleaning & preprocessing',
      github: 'https://github.com/Ali-sh80',
      linkedin: 'https://linkedin.com',
      email: 'member4@epfl.ch',
    },
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1729886696814-7ed201f433c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxETkElMjBzdHJ1Y3R1cmUlMjBzY2llbmNlJTIwYmx1ZXxlbnwxfHx8fDE3NjUzMTUzNDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Science background"
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
                <Users className="size-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl md:text-6xl gradient-text">About the Project</h1>
                <p className="text-slate-400 mt-2">Meet the Team</p>
              </div>
            </div>
            <p className="text-xl text-slate-300 max-w-3xl">
              A collaborative effort to understand metabolic dysfunction in Alzheimer's disease
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-16 bg-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl mb-6 text-center gradient-text">
              Project Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-blue-400 mb-4">Course</h3>
                <p className="text-slate-300 mb-2">Applied Data Analysis (CS-401)</p>
                <p className="text-slate-400">École Polytechnique Fédérale de Lausanne (EPFL)</p>
                <p className="text-slate-400">Fall 2025</p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-purple-400 mb-4">Objective</h3>
                <p className="text-slate-300">
                  To investigate spatial, temporal, and cell-type-specific patterns of metabolic dysfunction 
                  in Alzheimer's disease using spatial transcriptomics data.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-8">
              <h3 className="text-2xl text-blue-400 mb-4">Research Motivation</h3>
              <p className="text-slate-300 mb-4">
                Alzheimer's disease affects millions worldwide, yet the molecular mechanisms remain incompletely understood. 
                Emerging evidence suggests that metabolic dysfunction, particularly in energy production pathways, plays a critical 
                role in disease pathogenesis.
              </p>
              <p className="text-slate-300 mb-4">
                Traditional bulk RNA sequencing loses spatial context, making it difficult to understand how proximity to 
                pathological features like amyloid plaques affects cellular function. Spatial transcriptomics overcomes this 
                limitation by preserving the spatial organization of gene expression.
              </p>
              <p className="text-slate-300">
                By analyzing energy metabolism genes in a spatially-resolved manner across disease progression and different 
                cell types, we aim to identify targetable mechanisms and vulnerable cell populations that could inform 
                therapeutic development.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-gradient-to-b from-[#050814] to-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-4 text-center gradient-text">
              Our Team
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl text-white">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-1">{member.name}</h3>
                      <p className="text-blue-400">{member.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="size-5" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="size-5" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="text-slate-400 hover:text-blue-400 transition-colors"
                      aria-label="Email"
                    >
                      <Mail className="size-5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Methodology Overview */}
      <section className="py-16 bg-[#0a0e27]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl mb-8 text-center gradient-text">
              Methodology
            </h2>

            <div className="space-y-6">
              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-blue-400 mb-3">Data Acquisition</h3>
                <p className="text-slate-300">
                  Spatial transcriptomics data from 5xFAD mouse model at 4, 8, and 12 months of age. 
                  Data includes spatial coordinates for each cell and gene expression profiles for thousands of genes.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-purple-400 mb-3">Spatial Analysis</h3>
                <p className="text-slate-300">
                  Computed distance from each cell to nearest amyloid plaque using spatial coordinates. 
                  Analyzed metabolic gene expression as a function of plaque proximity using binned distance categories 
                  and statistical testing.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-green-400 mb-3">Temporal Analysis</h3>
                <p className="text-slate-300">
                  Compared metabolic pathway activity across three time points (4, 8, 12 months). 
                  Applied trajectory analysis to model disease progression and identify critical transition points.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-yellow-400 mb-3">Cell-Type Deconvolution</h3>
                <p className="text-slate-300">
                  Used reference-based cell-type annotation to identify neurons, astrocytes, microglia, oligodendrocytes, 
                  and other cell types. Analyzed metabolic vulnerability for each cell type and neuronal subtype.
                </p>
              </div>

              <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
                <h3 className="text-xl text-red-400 mb-3">Statistical Testing</h3>
                <p className="text-slate-300">
                  Applied appropriate statistical tests (t-tests, ANOVA, multiple comparison correction) to ensure 
                  robustness of findings. Controlled for confounding factors including cell density and tissue quality.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Acknowledgments */}
      <section className="py-16 bg-gradient-to-b from-[#0a0e27] to-[#050814]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl mb-6 gradient-text">
              Acknowledgments
            </h2>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-8">
              <p className="text-slate-300 mb-4">
                We would like to thank the EPFL Applied Data Analysis course instructors and teaching assistants 
                for their guidance throughout this project.
              </p>
              <p className="text-slate-300 mb-4">
                Special thanks to the researchers who generated and shared the spatial transcriptomics dataset 
                that made this analysis possible.
              </p>
              <p className="text-slate-300">
                This project is for educational purposes as part of the CS-401 Applied Data Analysis course at EPFL.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#050814] border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400">
            © 2025 EPFL Applied Data Analysis Project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
