import React from 'react'

export default function Header(props) {

  return (
    <header>
    <div className="headerLeft">
      <img width={40} height={40} src="./img/logo.png" alt="" />
      <div className="headerInfo">
        <h3>Too Much Plain clothes</h3>
        <p>Найкращий магазин бланкової одежі</p>
      </div>
    </div>
    <div className="headerRight">
      <div className="cart" onClick={props.onClickCart}>
        <img width={20} height={20} src="./img/cart.svg" alt="" />
        <span>0 грн</span>
      </div>
      <div className="user">
        <img width={20} height={20} src="./img/user.svg" alt="" />
      </div>
    </div>
  </header>
  )
}

