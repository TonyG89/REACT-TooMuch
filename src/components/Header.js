import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const { onClickCart, onClickFavorites, sum } = props;

  return (
    <header>
      <div className="headerLeft">
        <Link to="/">
          <img width={40} height={40} src="./img/logo.png" alt="logo tmpc" />
        </Link>
        <div className="headerInfo">
          <h3>Too Much Plain clothes</h3>
          <p>Найкращий магазин бланкової одежі</p>
        </div>
      </div>
      <div className="headerRight">
        <div className="cart" onClick={onClickCart}>
          <img width={20} height={20} src="./img/cart.svg" alt="cart" />
          <span>{sum} грн</span>
        </div>
        <Link to="/favorites">
          <div className="favorites">
            <img
              width={20}
              height={20}
              onClick={onClickFavorites}
              src="./img/heart.svg"
              alt="favorites"
            />
          </div>
        </Link>
        <div className="user">
          <img width={20} height={20} src="./img/user.svg" alt="user" />
        </div>
      </div>
    </header>
  );
}
