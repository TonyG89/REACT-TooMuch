import React from "react";

export default function CartMenu(props) {
  const { items, onClose, onDelete } = props;

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

  return (
    <div className="overlay">
      <div className="cart-menu">
        <div className="cart-menu-top">
          <h1>Кошик</h1>
          <div className="close" onClick={onClose}>
            <img src="img/btn-remove.svg" alt="прибрати" />
          </div>

          {items.length > 0 ? (
            <>
              <div className="items">
                {items.map((item) => (
                  <div key={item.id} className="card">
                    <img
                      maxWidth={210}
                      src={`./img/clothes/${item.link}.jpg`}
                      alt="одяг"
                    />
                    <div className="card-body">
                      <div className="card-info">
                        <p>
                          {item.name} {item.color} розмір{item.size}
                        </p>
                        <b>{item.price} грн</b>
                      </div>
                      <div>
                        <button onClick={() => onDelete(item.id)}>
                          {svgRemove}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-menu-bottom">
                <ul>
                  <li>
                    <span>Всього:</span>
                    <div className="dashed" />
                    <b>0грн</b>
                  </li>
                  <li>
                    <span>Податок:</span>
                    <div className="dashed" />
                    <b>0грн</b>
                  </li>
                </ul>
                <button className="greenButton"> Замовити!</button>
              </div>
            </>
          ) : (
            <div class="cartEmpty">
              <img src="/img/empty-cart.jpg" alt="Empty" />
              <h2>Кошик пустий</h2>
              <p class="opacity-6">
                Додайте щось у кошик, щоб зробити замовлення.
              </p>
              <button onClick={onClose} class="greenButton">
                Повернутися назад
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
