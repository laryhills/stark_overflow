import { createContext, useContext } from 'react'
import { useContract as useStarknetContract } from "@starknet-react/core"

interface ContractContextType {
  contract: ReturnType<typeof useStarknetContract>['contract']
  contractReady: boolean
  isConnected: boolean
  address: string | undefined
}

export const ContractContext = createContext<ContractContextType | undefined>(undefined)

export function useContractContext() {
  const context = useContext(ContractContext)
  if (context === undefined) {
    throw new Error('useContractContext must be used within a ContractProvider')
  }
  return context
} 