import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

export default function Favorites() {

  const {favorites, onAddToFavorite} = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="content-top">
        <h1>Мої вподобання</h1>
      </div>
      <div className="clothes">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={(i) => onAddToFavorite(i)} // можно и без колбека делать
            // onClickLike
            // onClickPlus={(i) => onAddToCart(i)}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}
