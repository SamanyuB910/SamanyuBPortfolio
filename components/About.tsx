'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { GraduationCap, Code, Brain, Heart } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const highlights = [
    {
      icon: GraduationCap,
      title: 'Georgia Tech Student',
      description: 'Computer Engineering with focus on AI & Robotics'
    },
    {
      icon: Brain,
      title: 'Research Focus',
      description: 'Intelligent systems and autonomous robotics'
    },
    {
      icon: Code,
      title: 'Full-Stack Developer',
      description: 'Modern web and mobile applications'
    },
    {
      icon: Heart,
      title: 'Problem Solver',
      description: 'Passionate about real-world impact'
    }
  ]

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About Me
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300">
                <p className="text-xl leading-relaxed mb-6">
                  I'm a <span className="font-semibold gradient-text">Computer Engineering student at Georgia Tech</span> with 
                  a passion for building intelligent systems that solve real-world problems. My interests span across 
                  <span className="font-semibold text-blue-600 dark:text-blue-400"> AI systems</span>, 
                  <span className="font-semibold text-purple-600 dark:text-purple-400"> robotics</span>, and 
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400"> full-stack development</span>.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  I thrive on contributing to cutting-edge research while developing practical software solutions. 
                  Whether implementing complex algorithms, designing intuitive user interfaces, or working with 
                  robotic systems, I'm driven by the challenge of turning innovative ideas into working code.
                </p>
                
                <p className="text-lg leading-relaxed">
                  When I'm not coding, you can find me exploring the latest developments in AI, contributing to 
                  open-source projects, or brainstorming the next big idea that could make a meaningful difference in the world.
                </p>
              </div>
            </motion.div>

            {/* Highlights grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl card-hover"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <item.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '25+', label: 'Hardware Platforms' },
                { number: '3+', label: 'Years Experience' },
                { number: '10+', label: 'Projects Completed' },
                { number: '1', label: 'Hackathon Finalist' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                >
                  <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
