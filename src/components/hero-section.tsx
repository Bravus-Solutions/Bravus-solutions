"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Globe } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      heroRef.current.style.setProperty("--mouse-x", `${x}px`);
      heroRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const element = heroRef.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black dark:bg-black text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(50, 50, 50, 0.5) 0%, rgba(0, 0, 0, 1) 50%)",
      }}
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[280px] md:max-w-[320px] mb-6"
          >
            <Image
              src="/images/logo.png"
              alt="Bravus Solutions"
              width={320}
              height={120}
              className="w-full h-auto"
              priority
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            Soluciones Tecnológicas <br className="hidden md:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Para El Futuro
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-[700px] text-gray-400 md:text-xl"
          >
            Desarrollamos software a medida que transforma ideas en soluciones
            digitales innovadoras para impulsar el crecimiento de tu negocio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button
              asChild
              className="bg-white text-black hover:bg-gray-200 font-bold shadow-lg shadow-white/20 transition-all duration-300 hover:shadow-white/30 hover:scale-105 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              onClick={() => {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Link href="#contact">
                Agendar Reunión <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-bold shadow-lg shadow-white/10 hover:shadow-white/20 hover:scale-105 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
              onClick={() => {
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Link href="#projects">Ver Proyectos</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-8 py-8 text-white/80">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center"
        >
          <Code className="mr-2 h-5 w-5" />
          <span>Desarrollo Web</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center"
        >
          <Database className="mr-2 h-5 w-5" />
          <span>Software Empresarial</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex items-center"
        >
          <Globe className="mr-2 h-5 w-5" />
          <span>Soluciones Cloud</span>
        </motion.div>
      </div>
    </section>
  );
}
