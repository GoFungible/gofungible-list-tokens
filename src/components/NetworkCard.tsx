import { ExternalLink, Copy, CheckCircle } from 'lucide-react'
import type { TokenNetwork } from '../types/token'

interface NetworkCardProps {
  network: TokenNetwork
}

const chainLogos: Record<number, string> = {
  1: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  137: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
  42161: 'https://cryptologos.cc/logos/arbitrum-arb-logo.png',
  10: 'https://cryptologos.cc/logos/optimism-op-logo.png',
  8453: 'https://cryptologos.cc/logos/base-base-logo.png',
  11155111: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
}

const chainColors: Record<number, string> = {
  1: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  137: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  42161: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  10: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  8453: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  11155111: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
}

export function NetworkCard({ network }: NetworkCardProps) {
  const chainLogo = chainLogos[network.chainId] || 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
  const chainColorClass = chainColors[network.chainId] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
  const shortAddress = `${network.address.slice(0, 6)}...${network.address.slice(-4)}`

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(network.address)
  }

  const openExplorer = () => {
    if (network.explorerUrl) {
      window.open(network.explorerUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="relative w-12 h-12 flex-shrink-0">
            <img
              src={chainLogo}
              alt={network.chainName}
              className="w-full h-full rounded-lg object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">#{network.chainId}</span>
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{network.chainName}</h3>
              <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${chainColorClass}`}>
                {network.chainName}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-mono break-all">
              {shortAddress}
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                {network.decimals} decimals
              </span>
              <span className="flex items-center gap-1">
                Symbol: {network.symbol}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Copy contract address"
            title="Copy address"
          >
            <Copy className="w-5 h-5" />
          </button>
          {network.explorerUrl && (
            <button
              onClick={openExplorer}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="View on explorer"
              title="View on explorer"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}