"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import ProjectDetailModal from "./project-detail-modal";
import { getAllProjects } from "@/api/enpoints/projects";

const categories = [
  "Todos",
  "Desarrollo Web",
  "Software Empresarial",
  "Aplicaciones Móviles",
];

// Datos de proyectos ampliados con información detallada

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Filtrar proyectos según la categoría seleccionada o mostrar todos si showAllProjects es true
  const filteredProjects = showAllProjects
    ? projects
    : activeCategory === "Todos"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Variantes para la animación de transición entre categorías
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  // Función para abrir el modal con los detalles del proyecto
  const openProjectDetails = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para alternar entre mostrar proyectos filtrados o todos
  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);
    if (!showAllProjects) {
      setActiveCategory("Todos");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response as any);
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="projects" className="py-20 bg-white dark:bg-[#0a0a0a]">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold tracking-tight dark:text-white"
          >
            Proyectos Destacados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explora algunos de nuestros proyectos más recientes y descubre cómo
            hemos ayudado a nuestros clientes a alcanzar sus objetivos.
          </motion.p>
        </div>

        {/* Barra de categorías mejorada - solo visible si no se están mostrando todos los proyectos */}
        {!showAllProjects && (
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-1 bg-gray-100 dark:bg-[#111] rounded-full mx-auto max-w-3xl">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "text-white shadow-md dark:text-gray-900"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-black dark:bg-white rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        duration: 0.5,
                        bounce: 0.2,
                      }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Contenedor de proyectos con animación mejorada */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + (showAllProjects ? "-all" : "")}
            ref={ref}
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                className="h-full"
              >
                <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-[#1a1a1a] dark:border-[#333]">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="dark:text-white">
                      {project.title}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag: any, index: any) => (
                        <Badge
                          variant={"secondary"}
                          key={index}
                          className="dark:bg-[#333] dark:text-gray-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300 text-base">
                      {project.description}...
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant={"outline"}
                      className="w-full dark:border-[#444] dark:text-white dark:hover:bg-[#222]"
                      onClick={() => openProjectDetails(project)}
                    >
                      Ver Detalles <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-12">
          <Button
            onClick={toggleShowAllProjects}
            className="bg-black text-white hover:bg-gray-800 font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 px-8 py-6 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            {showAllProjects ? "Mostrar Destacados" : "Ver Todos los Proyectos"}
          </Button>
        </div>
      </div>

      {/* Modal de detalles del proyecto */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
