import { darkTheme } from "./dark"
import { lightTheme } from "./light"

// Extend the default theme to include textSecondary
export type Theme = typeof defaultTheme

const defaultTheme = {
  ...darkTheme,
  textSecondary: "#71717a",
}

export { defaultTheme, lightTheme, darkTheme }

export default defaultTheme
