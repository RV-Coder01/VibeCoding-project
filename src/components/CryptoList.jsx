import CryptoCard from './CryptoCard'
import '../styles/CryptoList.css'

function CryptoList({ cryptos, loading }) {
  if (loading) {
    return (
      <div className="crypto-list">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="crypto-list">
      <div className="grid-container">
        {cryptos.map(crypto => (
          <CryptoCard key={crypto.id} crypto={crypto} />
        ))}
      </div>
    </div>
  )
}

export default CryptoList
