import React, { useState, useEffect, ReactNode } from 'react'
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
  
  const { contract } = useStarknetContract({ abi, address: CONTRACT_ADDRESS })

  // Fetch ABI once when address is available
  useEffect(() => {
    let isMounted = true

    async function getAbi() {
      if (!provider || !address) return
      
      console.log("Fetching ABI...")
      try {
        const classInfo = await provider.getClassAt(CONTRACT_ADDRESS)
        if (isMounted) {
          setAbi(classInfo.abi as Abi)
          console.log("ABI fetched successfully")
        }
      } catch (error) {
        console.error("Error fetching ABI:", error)
      }
    }

    if (address && provider) {
      getAbi()
    }

    return () => {
      isMounted = false
    }
  }, [address, provider])

  const contextValue = {
    contract,
    contractReady: !!contract,
    isConnected: !!isConnected,
    address
  }

  return (
    <ContractContext.Provider value={contextValue}>
      {children}
    </ContractContext.Provider>
  )
} 