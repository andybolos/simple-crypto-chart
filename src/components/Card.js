import React, {Suspense, useState} from 'react'

const Sparkline = React.lazy(() => import('./Sparkline'))

const Card = (props) => {
  const { coin, market } = props;

  const [expanded, setExpanded] = useState(false)

  const handleToggleExpanded = () => {
    setExpanded(!expanded)
  }

  return (
    <div className="w-2/3 mx-auto cursor-pointer" onClick={handleToggleExpanded}>
      <div className={`rounded-md p-6 flex justify-between text-gray-50 ${expanded ? 'bg-gray-700' : 'bg-gray-800'}`}>
        <div className="w-12">
          <img src={coin.image} alt="coin img" />
        </div>
        <div className="">
          <span className="uppercase font-bold">
            {coin.symbol} - {market}
          </span>
          <div className="font-light text-gray-200 text-xs">{coin.name}</div>
        </div>
        <div>{coin.sparkline_in_7d && <Suspense fallback={<div>Loading</div>}><Sparkline data={coin.sparkline_in_7d} height="50px" width="100px" /></Suspense>}</div>
        <div className="uppercase text-right">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(coin.total_volume)}{" "}
          {coin.symbol}
          <div className="font-light text-gray-200 text-xs text-right lowercase">
            24hr volume
          </div>
        </div>
        <div className="text-right">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(coin.current_price)}
          <div
            className={`font-light text-xs ${
              coin.price_change_percentage_24h >= 0
                ? "text-green-300"
                : "text-red-500"
            }`}
          >
            {coin.price_change_percentage_24h}%
          </div>
        </div>
      </div>
      {
        expanded && <Suspense fallback={<div>Loading</div>}><Sparkline data={coin.sparkline_in_7d} width="100%"  /></Suspense>
      }
  
    </div>
  );
};

export default Card;
