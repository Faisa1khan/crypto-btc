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

    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}
