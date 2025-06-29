"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    // Función para manejar clics en enlaces internos
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link) return

      const href = link.getAttribute("href")

      // Solo procesar enlaces internos que comienzan con #
      if (href && href.startsWith("#")) {
        e.preventDefault()

        const targetElement = document.getElementById(href.substring(1))

        if (targetElement) {
          // Desplazamiento suave a la sección
          targetElement.scrollIntoView({
            behavior: "smooth",
          })

          // Actualizar la URL sin recargar la página
          window.history.pushState(null, "", href)
        }
      }
    }

    // Agregar el event listener al documento
    document.addEventListener("click", handleLinkClick)

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener("click", handleLinkClick)
    }
  }, [])

  return null
}

