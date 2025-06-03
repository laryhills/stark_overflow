import { StatusEnum } from "services/contract";


export const formatters = {
  // Convert BigInt to hex address format
  bigIntToAddress: (bigInt: bigint) => {
    if (!bigInt) return '';
    const hex = bigInt.toString(16);
    return `0x${hex.padStart(64, '0')}`;
  },

  // Truncate address for display
  truncateAddress: (address: string, startChars = 6, endChars = 4) => {
    if (!address || address.length <= startChars + endChars) return address;
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
  },

  // Format BigInt as regular number (if it's meant to be a number)
  bigIntToNumber: (bigInt: bigint) => {
    if (!bigInt) return 0;
    return Number(bigInt);
  },

  // Keep BigInt as string for very large numbers
  bigIntToString: (bigInt: bigint) => {
    if (!bigInt) return '0';
    return bigInt.toString();
  },

  numberToBigInt: (number: number) => {
    return BigInt(number);
  },

  formatStatus: (statusEnum: StatusEnum): string => {
    if (!statusEnum || !statusEnum.variant) {
      return 'Unknown';
    }

    const statusName = Object.keys(statusEnum.variant)[0];
    return statusName;
  }
};