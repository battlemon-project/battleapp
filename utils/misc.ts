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