import Header from "./components/Header";
import CartMenu from "./components/CartMenu";
import Favorites from "./pages/Favorites";
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import BlankClothes from "./pages/BlankClothes";
import Orders from "./pages/Orders";
import AppContext from "./context";

function App() {
  const [clothes, setClothes] = React.useState([]);
  const [cartClothes, setCartClothes] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState(false);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    //лоадер скелетон
    setIsReady(false);

    const fetchData = async () => {
      try {
        const [
          cartResponse,
          favoritesResponse,
          clothesResponse,
        ] = await Promise.all([
          await axios.get("https://630927d6722029d9dddf3c35.mockapi.io/cart"),
          await axios.get(
            "https://630927d6722029d9dddf3c35.mockapi.io/favorites"
          ),
          await axios.get(
            "https://630927d6722029d9dddf3c35.mockapi.io/blank_clothes"
          ),
        ]);
        // без Promise all
        // const cartResponse = await axios.get(
        //   "https://630927d6722029d9dddf3c35.mockapi.io/cart"
        // );
        // const favoritesResponse = await axios.get(
        //   "https://630927d6722029d9dddf3c35.mockapi.io/favorites"
        // );
        // const clothesResponse = await axios.get(
        //   "https://630927d6722029d9dddf3c35.mockapi.io/blank_clothes"
        // );

        setIsReady(true);

        setCartClothes(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setClothes(clothesResponse.data);
      } catch (error) {
        alert("Щось пішло не так");
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onChangeSearchInput = (e) => {
    setSearchValue(e.target.value);
  };

  // КОРЗИНА
  const onAddToCart = async (props) => {
    const findItem = cartClothes.find(
      (item) => Number(item.parentId) === Number(props.id)
    );
    try {
      if (findItem) {
        await axios.delete(
          `https://630927d6722029d9dddf3c35.mockapi.io/cart/${findItem.id}`
        );
        setCartClothes((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(props.id))
        );
      } else {
        await axios.post(
          "https://630927d6722029d9dddf3c35.mockapi.io/cart/",
          props
        );
        setCartClothes((prev) => [...prev, props]);
      }
    } catch (error) {
      alert("Щось пішло не так");
      console.error(error);
    }
  };

  const onRemoveInCart = (id) => {
    try {
      axios.delete(`https://630927d6722029d9dddf3c35.mockapi.io//cart/${id}`);
      setCartClothes((prev) => prev.filter((i) => i.id !== id));
    } catch (error) {
      alert("Щось пішло не так");
      console.error(error);
    }
  };

  // ЗАКЛАДКИ
  const onAddToFavorite = async (props) => {
    console.log(props.id);
    try {
      if (favorites.find((item) => Number(item.id) === Number(props.id))) {
        console.log(props.id);
        axios.delete(
          `https://630927d6722029d9dddf3c35.mockapi.io/favorites/${props.id}`
        );
        setFavorites((prev) =>
          prev.filter((i) => Number(i.id) !== Number(props.id))
        ); // можно убрать чтоб не обновлялась на сайте закладки, а лишь после обновления
      } else {
        const { data } = await axios.post(
          "https://630927d6722029d9dddf3c35.mockapi.io/favorites/",
          props
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Не було додано в закладки!!");
      console.error(error);
    }
  };

  const isItemAdded = (id) =>
    cartClothes.some((obj) => Number(obj.parentId) === Number(id));

  return (
    <AppContext.Provider
      value={{
        clothes,
        cartClothes,
        favorites,
        onAddToFavorite,
        isItemAdded,
        setCartOpened,
        setCartClothes,
      }}
    >
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
            path={["/", "/REACT-TooMuch"]}
            element={
              <BlankClothes
                clothes={clothes}
                cartClothes={cartClothes}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isReady={isReady}
              />
            }
          />

          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
