import '../styles/CryptoCard.css'

function CryptoCard({ crypto }) {
  const isPositive = crypto.change24h >= 0

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price)
  }

  const formatLargeNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
    return num.toFixed(0)
  }

  return (
    <div className="crypto-card">
      <div className="card-header">
        <div className="crypto-info">
          <div className="crypto-logo">{crypto.logo}</div>
          <div>
            <h3 className="crypto-name">{crypto.name}</h3>
            <p className="crypto-symbol">{crypto.symbol}</p>
          </div>
        </div>
        <div className={`change-badge ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(crypto.change24h).toFixed(2)}%
        </div>
      </div>

      <div className="card-body">
        <div className="price-section">
          <p className="label">Price</p>
          <p className="price">{formatPrice(crypto.price)}</p>
        </div>

        <div className="stats-grid">
          <div className="stat">
            <p className="label">Market Cap</p>
            <p className="value">${formatLargeNumber(crypto.marketCap)}</p>
          </div>
          <div className="stat">
            <p className="label">24h Volume</p>
            <p className="value">${formatLargeNumber(crypto.volume24h)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoCard
