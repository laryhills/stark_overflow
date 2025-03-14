import { HeaderContainer } from "./style";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <HeaderContainer>
      {children ? (
        <>
          {children}
        </>
      ) : (
        <>
          {title && <h1>{title}</h1>}
          {subtitle && <h2>{subtitle}</h2>}
        </>
      )}
    </HeaderContainer>
  )
}