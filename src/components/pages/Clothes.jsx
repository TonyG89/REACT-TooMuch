import React from 'react'

export default function Clothes() {
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
          {/* <Card name="hood" size="s,m,l,x" color="black" link="1" price={300} /> */}
          {lothes
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.color.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.size.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item) => (
              <Card
                key={item.id}
                name={item.name}
                price={item.price}
                size={item.size}
                color={item.color}
                link={item.link}
                onClickPlus={(i) => onAddToCart(i)}
                onClickFavorite={(i) => onAddToFavorite(i)}
              />
            ))}
        </div>
      </div>
  )
}
