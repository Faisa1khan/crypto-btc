import React from "react";
import { actionTypes } from "../state";

const PriceCard = ({
  value,
  src,
  header,
  label,
  dispatch,
  currency,
  active,
}) => {
  value =
    typeof parseInt(value) === "number" && !isNaN(parseInt(value))
      ? Math.round(parseInt(value))
      : value;

  const handleChangeCurrency = (currency) => {
    dispatch({ type: actionTypes.changeCurrency, payload: { currency } });
  };

  return (
    <div
      className={`card mr-0 custom-card  ${
        active ? "active-background-color" : ""
      } `}
      onClick={() => handleChangeCurrency(currency)}
    >
      <div className="card-body">
        <img src={src} alt={src} className="img-responsive float-right" />
        <h6 className="card-title mb-4 ">{header} </h6>

        <h2 className="mb-1 text-primary">${value}</h2>
        <p className="card-text">
          <small className="text-muted">{label}</small>
        </p>
      </div>
    </div>
  );
};

export default PriceCard;
