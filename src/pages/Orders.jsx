import React from "react";
import axios from "axios";
import Card from "../components/Card";

export default function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        setIsReady(false);
        const { data } = await axios.get(
          "https://630927d6722029d9dddf3c35.mockapi.io/orders"
        );
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.goods], []));
        console.log(data);
        console.log(data.map((obj) => obj.goods));
        console.log(data.map((obj) => obj.goods).flat());
        setIsReady(true);
      } catch (error) {
        alert("что-то пошло не так");
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="content">
      <div className="content-top">
        <h1>Мої замовлення</h1>
      </div>
      <div className="clothes">
        {(isReady ? orders : [...Array(6)]).map((item, index) => (
          <Card key={index} loading={!isReady} {...item} />
        ))}
      </div>
    </div>
  );
}
