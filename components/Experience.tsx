'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, MapPin } from 'lucide-react'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const experiences = [
    {
      title: 'Research Assistant',
      company: 'Georgia Institute of Technology',
      location: 'Atlanta, GA',
      period: '2023 - Present',
      description: 'Developing modular robotics frameworks and conducting research on autonomous systems.',
      achievements: [
        'Built Origami Robotics framework supporting 25+ hardware platforms',
        'Integrated computer vision and behavior trees for task execution',
        'Collaborated with PhD students on robotics research publications'
      ]
    },
    {
      title: 'Software Engineering Intern',
      company: 'Tech Startup',
      location: 'Remote',
      period: 'Summer 2023',
      description: 'Full-stack development of web applications using modern technologies.',
      achievements: [
        'Developed responsive web applications using React and Node.js',
        'Implemented RESTful APIs and database optimization',
        'Participated in agile development processes'
      ]
    },
    {
      title: 'Hackathon Participant',
      company: 'Uber Hackathon',
      location: 'Atlanta, GA',
      period: '2023',
      description: 'Built Ecoroute app for fuel-efficient navigation.',
      achievements: [
        'Reached finalist stage in competitive hackathon',
        'Developed iOS app with AI-powered recommendations',
        'Achieved 21% reduction in user-reported fuel usage'
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="section-container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
            Experience
          </h2>
          
          <div className="max-w-4xl mx-auto">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 w-px h-full bg-blue-500"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1"></div>
                
                <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg ml-4">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg text-blue-600 dark:text-blue-400 mb-2">
                        {exp.company}
                      </h4>
                    </div>
                    <div className="flex flex-col md:text-right text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center md:justify-end mb-1">
                        <Calendar size={14} className="mr-1" />
                        {exp.period}
                      </div>
                      <div className="flex items-center md:justify-end">
                        <MapPin size={14} className="mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {exp.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start text-gray-600 dark:text-gray-300">
                        <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
