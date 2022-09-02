import "./App.css";

import Header from "./components/Header";
import CartMenu from "./components/CartMenu";
import Favorites from "./pages/Favorites";
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import BlankClothes from "./pages/BlankClothes";

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
  const [favorites, setFavorites] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    setIsReady(false)
    // fetch("https://630927d6722029d9dddf3c35.mockapi.io/blank_clothes")
    //   .then((response) => response.json())
    //   .then((clothes) => setClothes(clothes));
    const fetchData = async () => {
      const cartResponse = await axios.get(
        "https://630927d6722029d9dddf3c35.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://630927d6722029d9dddf3c35.mockapi.io/favorites"
      );
      const clothesResponse = await axios.get(
        "https://630927d6722029d9dddf3c35.mockapi.io/blank_clothes"
      );

      setIsReady(true)
      
      setCartClothes(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setClothes(clothesResponse.data);
    };
    fetchData()
  }, []);

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  // КОРЗИНА
  const onAddToCart = (props) => {
    console.log(props);
    try {
      if (cartClothes.find((item) => item.id == props.id)) {
        axios.delete(
          `https://630927d6722029d9dddf3c35.mockapi.io/cart/${props.id}`
        );
        setCartClothes((prev) => prev.filter((item) => item.id != props.id));
      } else {
        axios.post("https://630927d6722029d9dddf3c35.mockapi.io/cart/", props);
        setCartClothes((prev) => [...prev, props]);
      }
    } catch (error) {
      alert("ПОМИЛКА");
    }
  };

  const onRemoveInCart = (id) => {
    console.log(id);
    axios.delete(`https://630927d6722029d9dddf3c35.mockapi.io//cart/${id}`);
    setCartClothes((prev) => prev.filter((i) => i.id !== id));
  };

  // ЗАКЛАДКИ
  const onAddToFavorite = async (props) => {
    console.log(props.id);
    try {
      if (favorites.find((item) => item.id == props.id)) {
        console.log(props.id);
        axios.delete(
          `https://630927d6722029d9dddf3c35.mockapi.io/favorites/${props.id}`
        );
        setFavorites((prev) => prev.filter((i) => i.id != props.id)); // можно убрать чтоб не обновлялась на сайте закладки, а лишь после обновления
      } else {
        const { data } = await axios.post(
          "https://630927d6722029d9dddf3c35.mockapi.io/favorites/",
          props
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не було додано в закладки!!");
    }
  };

  const onRemoveOfFavorite = (id) => {
    setFavorites((prev) => prev.filter((i) => i.id !== id));
    axios.delete(`https://630927d6722029d9dddf3c35.mockapi.io/favorites/${id}`);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <CartMenu
          items={cartClothes}
          onClose={() => setCartOpened(!cartOpened)}
          onDelete={onRemoveInCart}
        />
      )}
      <Header
        onClickCart={() => {
          setCartOpened(true);
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <BlankClothes
              cartClothes={cartClothes}
              clothes={clothes}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
              loading={isReady}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites clothes={favorites} onAddToFavorite={onAddToFavorite} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
