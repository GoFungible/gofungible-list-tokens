import { Search, ChevronDown, X } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { tokenList, type TokenData } from '../data/tokens'

interface TokenSelectorProps {
  onSelect: (token: TokenData) => void
  selectedToken: TokenData | null
}

export function TokenSelector({ onSelect, selectedToken }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredTokens = tokenList.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
        setHighlightedIndex(0)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => Math.min(prev + 1, filteredTokens.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => Math.max(prev - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (filteredTokens[highlightedIndex]) {
          onSelect(filteredTokens[highlightedIndex])
          setIsOpen(false)
          setSearchQuery('')
          setHighlightedIndex(0)
          inputRef.current?.blur()
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchQuery('')
        setHighlightedIndex(0)
        inputRef.current?.blur()
        break
      default:
        break
    }
  }

  const handleTokenClick = (token: TokenData) => {
    onSelect(token)
    setIsOpen(false)
    setSearchQuery('')
    setHighlightedIndex(0)
  }

  const handleClear = () => {
    onSelect(null as any)
    setSearchQuery('')
    setHighlightedIndex(0)
  }

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery || (selectedToken ? `${selectedToken.name} (${selectedToken.symbol})` : '')}
            onChange={(e) => {
              if (!selectedToken || e.target.value !== `${selectedToken.name} (${selectedToken.symbol})`) {
                setSearchQuery(e.target.value)
                setIsOpen(true)
                setHighlightedIndex(0)
              }
            }}
            onFocus={() => { setIsOpen(true); setHighlightedIndex(0) }}
            onKeyDown={handleKeyDown}
            placeholder={selectedToken ? '' : 'Search tokens...'}
            className={`
              w-full pl-10 pr-10 py-3 text-base border rounded-lg bg-white dark:bg-gray-800
              text-gray-900 dark:text-gray-100 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
              transition-all duration-200
              ${selectedToken ? 'bg-gray-50 dark:bg-gray-700' : ''}
            `}
            readOnly={!!selectedToken && !searchQuery}
          />
          {selectedToken && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Clear selection"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
            {filteredTokens.length === 0 ? (
              <div className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                No tokens found
              </div>
            ) : (
              filteredTokens.map((token, index) => (
                <button
                  key={`${token.symbol}-${token.name}`}
                  onClick={() => handleTokenClick(token)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`
                    w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-gray-700
                    transition-colors ${index === highlightedIndex ? 'bg-gray-100 dark:bg-gray-700' : ''}
                  `}
                >
                  {token.logoUri && (
                    <img
                      src={token.logoUri}
                      alt={token.symbol}
                      className="w-6 h-6 rounded-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {token.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {token.symbol} • {token.networks.length} networks
                    </div>
                  </div>
                  {selectedToken?.symbol === token.symbol && (
                    <svg className="w-5 h-5 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}