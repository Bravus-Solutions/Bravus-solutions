"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Mail, MapPin, Phone, Calendar } from "lucide-react";

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // URL de Google Calendar para agendar reuniones
  // En una implementación real, este sería un enlace a tu calendario de Google con parámetros preconfigurados
  const googleCalendarUrl =
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ0Ndo6zPHWlns76rRh_C8PJlMl-ZNLBxBu8vZNsYWHQ5pNOFg8AwA9p5O5GUhyt4pFIJynCdTJK";

  return (
    <section id="contact" className="py-24 bg-black text-white dark:bg-black">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Agenda una reunión con nuestro equipo y conversemos sobre tu
            proyecto
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Sección principal - Agendar reunión */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-10 border border-white/10 shadow-xl"
            >
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-white/20 p-3 rounded-full">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Coordina una reunión</h3>
                    <p className="text-gray-400">
                      Selecciona el día y horario que prefieras
                    </p>
                  </div>
                </div>

                <div className="bg-black/40 rounded-xl p-6">
                  <h4 className="font-medium text-white mb-4">
                    Horarios disponibles:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span>Lunes a Viernes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Mañana:</span>
                      <span>9:00 - 12:00</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span>Lunes a Jueves</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Tarde:</span>
                      <span>14:00 - 17:00</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      <span>Viernes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-500">Tarde:</span>
                      <span>14:00 - 16:00</span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-white text-black hover:bg-gray-100 font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-white/10 py-7 rounded-xl dark:bg-white dark:text-black dark:hover:bg-gray-100"
                  onClick={() => window.open(googleCalendarUrl, "_blank")}
                >
                  Agendar Reunión
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <p className="text-sm text-center text-gray-500">
                  Serás redirigido a nuestro calendario para seleccionar el
                  horario específico
                </p>
              </div>
            </motion.div>

            {/* Información de contacto - secundaria */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Ubicación</h4>
                    <p className="text-gray-400 mt-1">
                      Av. Tecnológica 123, Ciudad Innovación
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-gray-400 mt-1">
                      contacto@bravussolutions.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Teléfono</h4>
                    <p className="text-gray-400 mt-1">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-4 text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">
                      Horario de Oficina
                    </h4>
                    <p className="text-gray-400 mt-1">
                      Lunes a Viernes: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
