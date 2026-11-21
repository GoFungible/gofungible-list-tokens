export interface TokenNetwork {
  chainId: number
  chainName: string
  address: string
  symbol: string
  decimals: number
  explorerUrl?: string
  logoUri?: string
}

export interface TokenData {
  name: string
  symbol: string
  description?: string
  logoUri?: string
  coingeckoId?: string
  networks: TokenNetwork[]
}