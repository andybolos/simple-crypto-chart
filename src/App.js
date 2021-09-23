import React, {useState, useEffect, Suspense, useRef, useCallback} from 'react'
import axios from 'axios';
// import Card from "./components/Card";
import "./App.css";

const Card = React.lazy(() => import('./components/Card'))

const market = {
  usd: "usd",
};


function App() {
  const [coins, setCoins] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [page, setPage] = useState(1)

  
  const fetchCoins = async (page) => {
    console.log(page);
    setIsFetching(true)
    await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${page}&sparkline=true`)
    .then(res => {
      setCoins([...coins, ...res.data])
      setIsFetching(false)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchCoins(page)
  }, [page])

  let bottomBoundaryRef = useRef(null)
  const scrollObserver = useCallback(
    (node) => {
      new IntersectionObserver(entries => {
        entries.forEach(en => {
          console.log(en.intersectionRatio);
          if(en.intersectionRatio > 0) {
            const currentCoin = en.target;
            console.log(currentCoin);
            if (coins.length > 0 ) {
              setPage(p => p+1)
            }
          }
        })
      }).observe(node)
    },
    [setPage, coins],
  )

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current)
    }
  }, [scrollObserver, bottomBoundaryRef])
 
 


  return (
    <div className="container mx-auto">
      {/* row */}
      {coins && coins.length > 0 && coins.map((coin) => (
        <Suspense fallback='Something went wrong'>
          <Card key={coins.id} coin={coin} market={market.usd} />
        </Suspense>
      ))}
      {isFetching && <div>Grabbing more coins</div>}
      <div ref={bottomBoundaryRef} style={{border: '1px solid red'}}></div>
    </div>
  );
}

export default App;
