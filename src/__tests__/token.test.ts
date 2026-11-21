import { describe, it, expect } from 'vitest'
import { tokenList, getToken, getTokenBySymbol } from '../data/tokens'

describe('Token Data', () => {
  it('should have token list with expected tokens', () => {
    expect(tokenList.length).toBeGreaterThan(0)
    const symbols = tokenList.map(t => t.symbol)
    expect(symbols).toContain('USDT')
    expect(symbols).toContain('USDC')
    expect(symbols).toContain('WETH')
  })

  it('should get token by key', () => {
    const usdt = getToken('usdt')
    expect(usdt).toBeDefined()
    expect(usdt?.symbol).toBe('USDT')
  })

  it('should get token by symbol', () => {
    const usdc = getTokenBySymbol('USDC')
    expect(usdc).toBeDefined()
    expect(usdc?.symbol).toBe('USDC')
  })

  it('should return undefined for unknown token', () => {
    const unknown = getToken('unknown')
    expect(unknown).toBeUndefined()
  })

  it('should have networks for each token', () => {
    tokenList.forEach(token => {
      expect(token.networks.length).toBeGreaterThan(0)
      token.networks.forEach(network => {
        expect(network.chainId).toBeDefined()
        expect(network.chainName).toBeDefined()
        expect(network.address).toBeDefined()
        expect(network.symbol).toBeDefined()
        expect(network.decimals).toBeDefined()
      })
    })
  })
})