"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

interface ImageLightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({
  src,
  alt,
  isOpen,
  onClose,
}: ImageLightboxProps) {
  const [scale, setScale] = useState(1);

  // Restablecer el zoom cuando se abre una nueva imagen
  useEffect(() => {
    if (isOpen) {
      setScale(1);
    }
  }, [isOpen]);

  // Prevenir scroll del body cuando el lightbox está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Cerrar el lightbox al hacer clic fuera de la imagen
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Funciones para zoom
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.5, 0.5));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={handleBackdropClick}
        >
          {/* Controles */}
          <div className="absolute top-4 right-4 flex items-center space-x-4 z-10">
            <button
              onClick={zoomOut}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Reducir zoom"
            >
              <ZoomOut className="h-5 w-5" />
            </button>
            <button
              onClick={zoomIn}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Aumentar zoom"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Contenedor de la imagen con zoom */}
          <motion.div
            className="relative w-full h-full overflow-auto flex items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <div
              className="relative cursor-move transition-transform duration-200"
              style={{
                transform: `scale(${scale})`,
                maxWidth: "90vw",
                maxHeight: "90vh",
              }}
            >
              {/* Usamos una imagen normal en lugar de Next/Image para mejor control */}
              <img
                src={src || "/placeholder.svg"}
                alt={alt}
                className="max-w-full max-h-[90vh] object-contain"
                draggable="false"
              />
            </div>
          </motion.div>

          {/* Instrucciones */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/70 text-sm bg-black/50 px-4 py-2 rounded-full">
            Haz clic fuera de la imagen para cerrar
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
