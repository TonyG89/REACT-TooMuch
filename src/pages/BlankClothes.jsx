import React from "react";
import Card from "../components/Card";

export default function BlankClothes(props) {
  const {
    clothes,
    cartClothes,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
  } = props;

  return (
    <div className="content">
      <div className="content-top">
        <h1>
          {searchValue ? `Пошук по "${searchValue}"` : "Усі бланкові речі"}
        </h1>
        <div className="search-block">
          <img src="./img/search.svg" alt="search-icon" />
          <input
            type="text"
            value={searchValue}
            placeholder="Пошук"
            onChange={onChangeSearchInput}
          />
          {searchValue && (
            <img
              class="clear"
              src="img/btn-remove.svg"
              alt="прибрати"
              onClick={() => setSearchValue("")}
            />
          )}
        </div>
      </div>
      <div className="clothes">
        {clothes
          .filter(
            (item) =>
              item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.color.toLowerCase().includes(searchValue.toLowerCase()) ||
              item.size.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <Card
              key={index}
              added={cartClothes.some(obj=>obj.id==item.id)}
              onPlus={(i) => onAddToCart(i)}
              onFavorite={(i) => onAddToFavorite(i)}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}
