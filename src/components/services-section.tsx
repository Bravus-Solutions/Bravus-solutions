"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Code, Database, Globe, Smartphone, Shield, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: <Code className="h-10 w-10" />,
    title: "Desarrollo Web",
    description:
      "Creamos sitios web y aplicaciones web personalizadas con las últimas tecnologías para ofrecer experiencias digitales excepcionales.",
  },
  {
    icon: <Database className="h-10 w-10" />,
    title: "Software Empresarial",
    description:
      "Desarrollamos soluciones de software a medida para optimizar procesos y aumentar la eficiencia de tu negocio.",
  },
  {
    icon: <Globe className="h-10 w-10" />,
    title: "Soluciones Cloud",
    description:
      "Implementamos y gestionamos infraestructuras en la nube para garantizar escalabilidad, seguridad y rendimiento.",
  },
  {
    icon: <Smartphone className="h-10 w-10" />,
    title: "Aplicaciones Móviles",
    description: "Diseñamos y desarrollamos aplicaciones móviles nativas y multiplataforma para iOS y Android.",
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Ciberseguridad",
    description:
      "Protegemos tu negocio con soluciones de seguridad informática avanzadas para prevenir amenazas y vulnerabilidades.",
  },
  {
    icon: <BarChart className="h-10 w-10" />,
    title: "Análisis de Datos",
    description:
      "Transformamos datos en información valiosa para la toma de decisiones estratégicas mediante herramientas de análisis avanzadas.",
  },
]

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-[#111]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white"
          >
            Nuestros Servicios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Ofrecemos una amplia gama de servicios tecnológicos para ayudar a tu empresa a crecer y destacar en el mundo
            digital.
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-[#1a1a1a] dark:border-[#333]">
                <CardHeader>
                  <div className="text-black dark:text-white mb-4">{service.icon}</div>
                  <CardTitle className="dark:text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

