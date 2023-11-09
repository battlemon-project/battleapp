export function truncate(str: string, num: number) {
  return `${str.substring(0,num)}...${str.slice(-1 * num)}`
}