import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Menu } from 'lucide-react'
import { TokenSelector, NetworkCardLayout } from './components'
import { LeftSidebar, type SidebarTab } from './components/LeftSidebar'
import type { TokenData } from './types/token'

function App() {
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<SidebarTab>('networks')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'networks':
        return (
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedToken ? `${selectedToken.name} ({selectedToken.symbol})` : 'Select a Token'}
              </h2>
              {selectedToken && selectedToken.description && (
                <p className="text-gray-600 dark:text-gray-400">{selectedToken.description}</p>
              )}
            </div>

            {selectedToken ? (
              <NetworkCardLayout token={selectedToken} />
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
                  <svg className="w-10 h-10 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No token selected
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Use the search box in the header to select a token and view its network deployments.
                </p>
              </div>
            )}
          </div>
        )
      case 'settings':
        return (
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Settings</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Settings panel - coming soon</p>
            </div>
          </div>
        )
      case 'help':
        return (
          <div className="px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Help & Documentation</h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <p className="text-gray-600 dark:text-gray-400">Help content - coming soon</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <LeftSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="flex-1 lg:ml-64 min-w-0 flex flex-col">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Open sidebar"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Token Networks
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block w-72">
                  <TokenSelector
                    onSelect={setSelectedToken}
                    selectedToken={selectedToken}
                  />
                </div>
                <ConnectButton />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {renderTabContent()}
        </main>

        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
          <div className="px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Token data sourced from public blockchain explorers
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App