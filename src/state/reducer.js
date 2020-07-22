import { actionTypes } from "./action";
import { clientDateTime } from "../utility";
export function Reducer(state, action) {
  switch (action.type) {
    case actionTypes.stream: {
      return {
        ...state,
        categories: [
          ...state.categories,
          { label: clientDateTime(action.payload.LASTUPDATE) },
        ],
        dataset: [...state.dataset, { value: action.payload.PRICE }],
        showChart: true,
        yAxisMinValue: parseInt(action.payload.PRICE) - 100,
        yAxisMaxValue: parseInt(action.payload.PRICE) + 100,
      };
    }

    case actionTypes.setPrice: {
      return {
        ...state,
        BTC: action.payload.BTC.USD,
        LTC: action.payload.LTC.USD,
        ETH: action.payload.ETH.USD,
      };
    }

    case actionTypes.changeCurrency: {
      console.log(action);
      return {
        ...state,
        selected: action.payload.currency,
        categories: [],
        dataset: [],
      };
    }

    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}
