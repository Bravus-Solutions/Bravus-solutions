"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button className="bg-transparent hover:bg-white/10">
        <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
        <span className="sr-only">Cambiar tema</span>
      </Button>
    );
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  return (
    <Button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="bg-transparent hover:bg-white/10"
    >
      {currentTheme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
      )}
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}
