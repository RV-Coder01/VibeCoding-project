import { useState } from 'react'
import '../styles/Header.css'

function Header({ onRefresh, lastUpdated }) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await onRefresh()
    setIsRefreshing(false)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="logo">💰 CryptoHub</h1>
          <p className="subtitle">Real-time Cryptocurrency Dashboard</p>
        </div>
        
        <div className="header-actions">
          <div className="last-updated">
            <span>Last updated: {formatTime(lastUpdated)}</span>
          </div>
          <button 
            className={`refresh-btn ${isRefreshing ? 'spinning' : ''}`}
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <span className="refresh-icon">🔄</span>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
