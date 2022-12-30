import React from "react";
import AppContext from "../context";
const Info = ({ title, img, description }) => {
  const { setCartOpened } = React.useContext(AppContext);
  return (
    <div className="cartEmpty">
      <img src={`./img/${img}.jpg`} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        Повернутися назад
      </button>
    </div>
  );
};
export default Info;
