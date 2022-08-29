import "./App.css";
import Card from "./components/Card";
import Header from "./components/Header";
import CartMenu from "./components/CartMenu";
import React from "react";
import axios from "axios"; // не найден аксиос

const svgRemove = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z"
      fill="#B5B5B5"
    />
  </svg>
);

function App() {
  const [clothes, setClothes] = React.useState([]);
  const [cartClothes, setCartClothes] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    // fetch("https://630927d6722029d9dddf3c35.mockapi.io/blank_clothes")
    //   .then((response) => response.json())
    //   .then((clothes) => setClothes(clothes));
    axios
      .get("https://630927d6722029d9dddf3c35.mockapi.io/blank_clothes")
      .then((response) => setClothes(response.data));
  }, []);

  const onAddToCart = (props) => {
    axios.post("https://630927d6722029d9dddf3c35.mockapi.io/cart", props);
    setCartClothes((prev) => [...prev, props]);
  };

  const onChangeSearchInput = (e) => {
    console.log(searchValue);
    setSearchValue(e.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <CartMenu
          items={cartClothes}
          onClose={() => setCartOpened(!cartOpened)}
        />
      )}
      <Header
        onClickCart={() => {
          setCartOpened(true);
        }}
      />
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
                name={item.name}
                price={item.price}
                size={item.size}
                color={item.color}
                link={item.link}
                onClickPlus={() => onAddToCart(item)}
                onClickFavorite={() => console.log("like")}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
