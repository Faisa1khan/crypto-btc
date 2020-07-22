import React, { useEffect, useReducer } from "react";
import PriceCard from "./PriceCard";
import { LiveChart } from "./LiveChart";
import { Reducer, INITIAL_STATE, actionTypes } from "../state";
const BASE_URL = "wss://streamer.cryptocompare.com/v2";

const Hero = () => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const {
    BTC,
    LTC,
    ETH,
    categories,
    dataset,
    showChart,
    yAxisMaxValue,
    yAxisMinValue,
    selected,
  } = state;

  useEffect(() => {
    const ccStreamer = new WebSocket(
      `${BASE_URL}?api_key=${process.env.REACT_APP_CRYPTO_COMPARE_SECRET}`
    );
    ccStreamer.onopen = function onStreamOpen() {
      ccStreamer.send(
        JSON.stringify({
          action: "SubAdd",
          subs: [`2~Coinbase~${selected}~USD`],
        })
      );
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
  }, [selected]);

  useEffect(() => {
    const fetchPrice = async () => {
      let url =
        "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD";
      let response = await fetch(url);
      let data = await response.json();
      dispatch({ type: actionTypes.setPrice, payload: data });
    };
    fetchPrice();
  }, []);

  return (
    <div className="row mt-5 mt-xs-4">
      <div className="col-12 mb-3">
        <div className="card-deck custom-card-deck">
          <PriceCard
            currency="BTC"
            header="Bitcoin(BTC)"
            src={"/bitcoin.png"}
            alt="fireSpot"
            label="(Price in USD)"
            value={BTC}
            dispatch={dispatch}
            active={selected === "BTC"}
          />
          <PriceCard
            currency="LTC"
            header="Litecoin(LTC)"
            src={"/litecoin.png"}
            alt="fireSpot"
            label="(Price in USD)"
            value={LTC}
            dispatch={dispatch}
            active={selected === "LTC"}
          />
          <PriceCard
            currency="ETH"
            header="Ethereum(ETH)"
            src={"/ethereum.png"}
            alt="fireSpot"
            label="(Price in USD)"
            value={ETH}
            dispatch={dispatch}
            active={selected === "ETH"}
          />
        </div>
      </div>
      <div className="col-12">
        <div className="card custom-card mb-5 mb-xs-4">
          <div className="card-body">
            <LiveChart
              categories={categories}
              dataset={dataset}
              showChart={showChart}
              yAxisMaxValue={yAxisMaxValue}
              yAxisMinValue={yAxisMinValue}
              name={selected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
