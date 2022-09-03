import React from "react";
import Card from "../components/Card";
import AppContext from '../context'

export default function BlankClothes(props) {
  const {
    clothes,
    cartClothes,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorite,
    onAddToCart,
    isReady,
  } = props;

  const {isItemAdded}= React.useContext(AppContext)

  const renderClothes = () => {
    const filterClothes = clothes.filter(
      (item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.color.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.size.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isReady ? filterClothes : [...Array(6)]).map((item, index) => (
      <Card
        key={index}
        onFavorite={(i) => onAddToFavorite(i)}
        onPlus={(i) => onAddToCart(i)}
        loading={!isReady}
        {...item}
      />
    ));
  };

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
      <div className="clothes">{renderClothes()}</div>
    </div>
  );
}
