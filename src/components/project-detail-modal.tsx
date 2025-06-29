"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Calendar, Users, Code, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ImageLightbox from "./image-lightbox";

interface ProjectDetailModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
    tags: string[];
    fullDescription?: string;
    client?: string;
    completionDate?: string;
    teamSize?: number;
    technologies?: string[];
    challenges?: string[];
    solutions?: string[];
    results?: string[];
    link?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Evitar que el scroll de fondo se mueva cuando el modal está abierto
  if (typeof window !== "undefined") {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Cerrar el modal al hacer clic fuera de él
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Abrir el lightbox al hacer clic en la imagen
  const openLightbox = () => {
    setLightboxOpen(true);
  };

  // Cerrar el lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header con imagen de fondo */}
            <div
              className="relative h-64 md:h-80 overflow-hidden rounded-t-xl group cursor-pointer"
              onClick={openLightbox}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              {/* Indicador de zoom */}
              <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="h-4 w-4 mr-1" />
                <span className="text-sm">Ver imagen completa</span>
              </div>

              {/* Botón de cerrar */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Título del proyecto */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      className="bg-white/20 text-white hover:bg-white/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Contenido del modal */}
            <div className="p-6 md:p-8">
              {/* Información general */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {project.client && (
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cliente
                      </p>
                      <p className="font-medium dark:text-white">
                        {project.client}
                      </p>
                    </div>
                  </div>
                )}

                {project.completionDate && (
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Fecha de finalización
                      </p>
                      <p className="font-medium dark:text-white">
                        {project.completionDate}
                      </p>
                    </div>
                  </div>
                )}

                {project.teamSize && (
                  <div className="flex items-center">
                    <Code className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tamaño del equipo
                      </p>
                      <p className="font-medium dark:text-white">
                        {project.teamSize} desarrolladores
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Descripción completa */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">
                  Descripción del Proyecto
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {project.fullDescription || project.description}
                </p>
              </div>

              {/* Tecnologías */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">
                    Tecnologías Utilizadas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="px-3 py-1 dark:border-[#444] dark:text-gray-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Desafíos y Soluciones */}
              {project.challenges && project.challenges.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">
                    Desafíos y Soluciones
                  </h3>
                  <div className="space-y-4">
                    {project.challenges.map((challenge, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 dark:bg-[#222] p-4 rounded-lg"
                      >
                        <p className="font-medium mb-2 dark:text-white">
                          Desafío:
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {challenge}
                        </p>
                        {project.solutions && project.solutions[index] && (
                          <>
                            <p className="font-medium mb-2 dark:text-white">
                              Solución:
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              {project.solutions[index]}
                            </p>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resultados */}
              {project.results && project.results.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">
                    Resultados
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    {project.results.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 dark:border-[#444] dark:text-white dark:hover:bg-[#222]"
                >
                  Cerrar
                </Button>

                {project.link && (
                  <Button
                    className="flex-1 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    Visitar Proyecto <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Lightbox para ver la imagen completa */}
      {project && (
        <ImageLightbox
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
        />
      )}
    </AnimatePresence>
  );
}
