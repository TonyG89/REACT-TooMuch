import "./App.css";
import Header from "./components/Header";
import CartMenu from "./components/CartMenu";
import Favorites from "./pages/Favorites";
import Clothes from "./pages/Clothes";
import React from "react";
import { Route, Routes } from "react-router-dom";

import axios from "axios";

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
  const [cartOpened, setCartOpened] = React.useState(false);
  const [cartClothes, setCartClothes] = React.useState([]);
  const [clothes, setClothes] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://630927d6722029d9dddf3c35.mockapi.io/cart")
      .then((response) => setCartClothes(response.data));

    axios
      .get("https://630927d6722029d9dddf3c35.mockapi.io/blank_clothes")
      .then((response) => setClothes(response.data));
  }, []);

  const onRemoveInCart = (id) => {
    setCartClothes((prev) => prev.filter((i) => i.id !== id));
    axios.delete(`https://630927d6722029d9dddf3c35.mockapi.io//cart/${id}`);
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
        <Route path="/" element={<Clothes clothes={clothes} />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
