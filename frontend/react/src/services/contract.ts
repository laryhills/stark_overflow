// Contract address on Sepolia
export const CONTRACT_ADDRESS = "0x228432fe63e8808fd694c8c80f6266a735c340760812f64fe20b015d2b2700e"


export type StatusVariant = {
  Open: Record<string, never>;
} | {
  Resolved: Record<string, never>;
};

export type StatusEnum = {
  variant: StatusVariant;
};

// Contract struct types based on Cairo contract
export interface ContractQuestion {
  id: bigint
  author: bigint
  description: string
  value: bigint
  status: StatusEnum
}

export interface ContractAnswer {
  id: bigint
  author: bigint
  description: string
  question_id: bigint
}
