import { parseEther } from 'viem';

export function truncate(str: string | undefined, num: number) {
  if (!str) return;
  return `${str.substring(0,num)}...${str.slice(-1 * num)}`
}

export function parsePrice(string: string) {
  if (process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true') {
    return parseEther(string, "gwei")
  } else {
    return parseEther(string)
  }
}

export const blockExplorer: Record<number,string> = {
  80001: 'https://mumbai.polygonscan.com', // mumbai
  137: 'https://polygonscan.com', // polygon mainnet
  59140: 'https://goerli.lineascan.build', // linea goerli
  59144: 'https://lineascan.build', // linea mainnet
}

export const chainToLayerZero: {[key: number]: number} = {
  80001: 40109, // mumbai
  137: 30109, // polygon mainnet
  59140: 40157, // linea goerli
  59144: 30183, // linea mainnet
  56: 40102, // bnb testnet
  97: 30102, // bnb mainnet,
  168587773: 40243, // blast testnet, 
  81457: 30243, // blast mainnet, 
}

export const chainUniversalNames: {[key: number]: string} = {
  80001: 'polygon', // mumbai
  137: 'polygon', // polygon mainnet
  59140: 'linea', // linea goerli
  59144: 'linea', // linea mainnet
  56: 'bnb', // bnb testnet
  97: 'bnb', // bnb mainnet,
  168587773: 'blast', // blast testnet, 
  81457: 'blast', // blast mainnet, 
}