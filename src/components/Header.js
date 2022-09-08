import React from "react";
import { Link } from "react-router-dom";
import {useTotalSum} from '../hooks/useTotalSum'

export default function Header(props) {
  const {totalPrice} = useTotalSum()
  const { onClickCart, onClickFavorites, CartClothes} = props;

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
          {/* если корзина пуста, убираем цену */}
          {totalPrice!=0 && <span>{totalPrice} грн</span>}
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
        <Link to="/orders">
        <div className="user">
          <img width={20} height={20} src="./img/user.svg" alt="user" />
        </div>
        </Link>
      </div>
    </header>
  );
}
