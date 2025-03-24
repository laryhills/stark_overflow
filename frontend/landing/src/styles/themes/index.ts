import { darkTheme } from "./dark";
import { lightTheme } from "./light";

export type Theme = typeof defaultTheme;

const defaultTheme = {
  ...darkTheme
}

export { defaultTheme, lightTheme, darkTheme };

export default defaultTheme;
