import { MagnifyingGlass } from "phosphor-react";
import { Input, SearchInputContainer } from "./style";

export function SearchInput() {
  return (
    <SearchInputContainer>
      <MagnifyingGlass size={24} color="#b3b3b3" weight="fill" />
      <Input placeholder="Enter a term to search..." />
    </SearchInputContainer>
  );
}