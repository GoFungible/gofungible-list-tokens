import { NetworkCard } from './NetworkCard'
import type { TokenData } from '../types/token'

interface NetworkCardLayoutProps {
  token: TokenData
}

export function NetworkCardLayout({ token }: NetworkCardLayoutProps) {
  if (!token.networks || token.networks.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="text-gray-500 dark:text-gray-400">
          No network deployments found for {token.name}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {token.name} ({token.symbol}) Deployments
        </h2>
        <span className="px-3 py-1 text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full">
          {token.networks.length} Networks
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {token.networks.map((network) => (
          <NetworkCard key={`${network.chainId}-${network.address}`} network={network} />
        ))}
      </div>
    </div>
  )
}