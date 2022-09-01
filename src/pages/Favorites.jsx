import React from 'react'
import Card from '../components/Card'



export default function Favorites(props) {
  const {clothes, favorites,onAddToFavorite}=props
  console.log(clothes);
  return (

    <div className="content">
      <div className="content-top">
        <h1>Мої вподобання</h1>
      </div>
      <div className="clothes">
        {clothes.map((item,index) => (
            <Card
              key={item.id}
              id={index}
              name={item.name}
              price={item.price}
              size={item.size}
              color={item.color}
              link={item.link}
              favorited={true}
              onFavorite={onAddToFavorite}
              // onClickLike
              // onClickPlus={(i) => onAddToCart(i)}
              // {...item}
            />
          ))}
      </div>
    </div>

  )
}
