import { Moon, Sun } from "phosphor-react";
import { HeaderContainer, ToggleThemeButton } from "./style";
import { lightTheme } from "../../styles/themes/light";

interface HeaderProps {
  theme: any;
  toggleTheme: () => void;
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <HeaderContainer>
      <h1>StarkOverflow</h1>
      <ToggleThemeButton onClick={toggleTheme}>
        {theme === lightTheme ? <Moon size={24} /> : <Sun size={24} />}
      </ToggleThemeButton>
    </HeaderContainer>
  )
}
