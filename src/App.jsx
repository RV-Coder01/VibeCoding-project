
import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import CryptoList from './components/CryptoList'
import './App.css'

function App() {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const isInitialLoad = useRef(true)

  const fetchCryptoData = async (isInitial = false) => {
    try {
      // Only show loading spinner on initial load
      if (isInitial) {
        setLoading(true)
      }
      
      const ids = 'bitcoin,ethereum,binancecoin,ripple,cardano,solana,polkadot,dogecoin,polygon,litecoin'
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true`
      )
      const data = await response.json()
      
      const cryptoArray = [
        { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', logo: '₿' },
        { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', logo: '⟠' },
        { id: 'binancecoin', name: 'Binance Coin', symbol: 'BNB', logo: '⬜' },
        { id: 'ripple', name: 'Ripple', symbol: 'XRP', logo: '✕' },
        { id: 'cardano', name: 'Cardano', symbol: 'ADA', logo: '◆' },
        { id: 'solana', name: 'Solana', symbol: 'SOL', logo: '◎' },
        { id: 'polkadot', name: 'Polkadot', symbol: 'DOT', logo: '●' },
        { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', logo: '🐕' },
        { id: 'polygon', name: 'Polygon', symbol: 'MATIC', logo: '◈' },
        { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', logo: '◊' },
      ].map(crypto => ({
        ...crypto,
        price: data[crypto.id]?.usd || 0,
        marketCap: data[crypto.id]?.usd_market_cap || 0,
        volume24h: data[crypto.id]?.usd_24h_vol || 0,
        change24h: data[crypto.id]?.usd_24h_change || 0,
      }))
      
      setCryptos(cryptoArray)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching crypto data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch on component mount
  useEffect(() => {
    fetchCryptoData(true)
    isInitialLoad.current = false
  }, [])

  // Auto-refresh every 10 seconds (without showing loading state)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCryptoData(false)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <Header onRefresh={() => fetchCryptoData(false)} lastUpdated={lastUpdated} />
      <CryptoList cryptos={cryptos} loading={loading} />
    </div>
  )
}

export default App
