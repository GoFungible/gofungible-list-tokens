import usdt from './usdt.json'
import usdc from './usdc.json'
import weth from './weth.json'
import type { TokenData } from '../../types/token'

export type { TokenData } from '../../types/token'

export const tokens: Record<string, TokenData> = {
  usdt,
  usdc,
  weth,
}

export const tokenList = Object.values(tokens)

export function getToken(symbol: string): TokenData | undefined {
  return tokens[symbol.toLowerCase()]
}

export function getTokenBySymbol(symbol: string): TokenData | undefined {
  return Object.values(tokens).find(t => t.symbol.toLowerCase() === symbol.toLowerCase())
}