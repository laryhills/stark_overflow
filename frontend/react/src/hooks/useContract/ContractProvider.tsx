import { useState, useEffect, ReactNode, useMemo } from 'react'
import { useProvider, useAccount, useContract as useStarknetContract } from "@starknet-react/core"
import { CONTRACT_ADDRESS } from "../../services/contract"
import type { Abi } from "starknet"
import { ContractContext } from './contractContext'

interface ContractProviderProps {
  children: ReactNode
}

export function ContractProvider({ children }: ContractProviderProps) {
  const { provider } = useProvider()
  const { isConnected, address } = useAccount()
  const [abi, setAbi] = useState<Abi | undefined>(undefined)
  const [abiError, setAbiError] = useState("")

  const { contract } = useStarknetContract({ abi, address: CONTRACT_ADDRESS })

  // Fetch ABI once when address is available
  useEffect(() => {
    let isMounted = true

    async function getAbi() {
      if (!provider) return

      console.log("Fetching ABI...")
      try {
        if (!CONTRACT_ADDRESS) {
          setAbiError("CONTRACT_ADDRESS is not defined")
          return
        }
        const classInfo = await provider.getClassAt(CONTRACT_ADDRESS)
        if (isMounted) {
          setAbi(classInfo.abi as Abi)
          console.log("ABI fetched successfully")
        }
      } catch (error) {
        console.error("Error fetching ABI:", error)
        setAbiError(error instanceof Error ? error.message : "Unknown abi error")
      }
    }

    getAbi()

    return () => {
      isMounted = false
    }
  }, [provider])

  const contextValue = useMemo(() => ({
    contract,
    contractReady: !!contract,
    isConnected,
    address,
    abiError
  }), [contract, isConnected, address, abiError])

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  )
} 