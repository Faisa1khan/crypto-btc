import React, { useEffect, useReducer } from "react";
import PriceCard from "./PriceCard";
import { LiveChart } from "./LiveChart";
import { Reducer, INITIAL_STATE, actionTypes } from "../state";
const BASE_URL = "wss://streamer.cryptocompare.com/v2";

const Hero = () => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    const ccStreamer = new WebSocket(
      `${BASE_URL}?api_key=${process.env.REACT_APP_CRYPTO_COMPARE_SECRET}`
    );
    ccStreamer.onopen = function onStreamOpen() {
      const subRequest = {
        action: "SubAdd",
        subs: ["2~Coinbase~BTC~USD"],
      };
      ccStreamer.send(JSON.stringify(subRequest));
    };

    ccStreamer.onmessage = function onStreamMessage(event) {
      const data = JSON.parse(event.data);
      if (data.PRICE) {
        dispatch({ type: actionTypes.stream, payload: data });
      }
    };
    return () => {
      ccStreamer.close();
    };
  }, []);
  return (
    <div className="row mt-5 mt-xs-4">
      <div className="col-12 mb-3">
        <div className="card-deck custom-card-deck">
          <PriceCard
            header="Bitcoin(BTC)"
            src={"/bitcoin.png"}
            alt="fireSpot"
            label="(Price in USD)"
            value={100}
          />
          <PriceCard
            header="Litecoin(LTC)"
            src={"/litecoin.png"}
            alt="fireSpot"
            label="(Price in USD)"
            value={100}
          />
          <PriceCard
            header="Ethereum(ETH)"
            src={"/ethereum.png"}
            alt="fireSpot"
            label="(Price in USD)"
            value={100}
          />
        </div>
      </div>
      <div className="col-12">
        <div className="card custom-card mb-5 mb-xs-4">
          <div className="card-body">
            <LiveChart
              categories={state.categories}
              dataset={state.dataset}
              showChart={state.showChart}
              yAxisMaxValue={state.yAxisMaxValue}
              yAxisMinValue={state.yAxisMinValue}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
