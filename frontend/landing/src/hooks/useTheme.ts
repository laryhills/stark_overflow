import { useState, useEffect } from "react"

type ThemeType = "light" | "dark"

export const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>("dark")

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return { theme, toggleTheme }
}

