'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Github, ExternalLink, Award, Star, TrendingUp } from 'lucide-react'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const projects = [
    {
      title: 'Origami Robotics',
      description: 'Modular robotics skills framework integrating MoveIt, vision, and behavior trees for task execution across 25+ hardware platforms.',
      tech: ['Python', 'ROS', 'MoveIt', 'Computer Vision', 'Behavior Trees'],
      outcomes: ['25+ hardware platforms supported', 'Modular architecture', 'Research publication'],
      github: 'https://github.com/samanyubadam/origami-robotics',
      demo: '#',
      featured: true,
      category: 'Robotics',
      impact: 'High',
      status: 'Active Development'
    },
    {
      title: 'Ecoroute',
      description: 'iOS + Flask app optimizing network traffic for fuel efficiency with AI-powered recommendations. Uber Hackathon finalist.',
      tech: ['Swift', 'SwiftUI', 'Flask', 'Python', 'AI/ML'],
      outcomes: ['Uber Hackathon Finalist', '21% reduction in fuel usage', 'AI-powered optimization'],
      github: 'https://github.com/samanyubadam/ecoroute',
      demo: '#',
      award: 'Uber Hackathon Finalist',
      category: 'Mobile App',
      impact: 'High',
      status: 'Completed'
    },
    {
      title: 'TSP Solver Complexity Modeling',
      description: 'Research on symbolic regression (PySR) to predict solver runtime bounds using MST heuristics.',
      tech: ['Python', 'PySR', 'Symbolic Regression', 'Algorithm Analysis'],
      outcomes: ['Novel runtime prediction model', 'MST heuristic integration', 'Research insights'],
      github: 'https://github.com/samanyubadam/tsp-complexity',
      demo: '#',
      category: 'Research',
      impact: 'Medium',
      status: 'Completed'
    },
    {
      title: 'iOS Finance Tracker',
      description: 'SwiftUI app with expense visualization and ML-based category suggestions for personal finance management.',
      tech: ['Swift', 'SwiftUI', 'Core ML', 'Core Data'],
      outcomes: ['ML-powered categorization', 'Intuitive visualizations', 'Personal finance insights'],
      github: 'https://github.com/samanyubadam/finance-tracker',
      demo: '#',
      category: 'Mobile App',
      impact: 'Medium',
      status: 'Completed'
    }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30'
      default: return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active Development': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30'
      case 'Completed': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30'
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30'
    }
  }

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Featured Projects
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A collection of projects showcasing my expertise in robotics, AI, and full-stack development
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mt-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className={`group relative bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg card-hover overflow-hidden ${
                  project.featured ? 'ring-2 ring-blue-500/50' : ''
                }`}
              >
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-medium">
                      <Star size={12} fill="currentColor" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(project.impact)}`}>
                          <TrendingUp size={10} className="inline mr-1" />
                          {project.impact} Impact
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:gradient-text transition-all duration-300">
                        {project.title}
                      </h3>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {project.category}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:scale-110 transform"
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:scale-110 transform"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                  </div>
                  
                  {/* Award badge */}
                  {project.award && (
                    <div className="flex items-center mb-4 text-yellow-600 dark:text-yellow-400">
                      <Award size={16} className="mr-2" />
                      <span className="text-sm font-medium">{project.award}</span>
                    </div>
                  )}
                  
                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Key Outcomes */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Key Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {project.outcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                          <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Projects */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/samanyubadam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={20} />
              <span>View More on GitHub</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
