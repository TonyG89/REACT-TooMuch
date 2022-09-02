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
              key={index}
              favorited={true}
              onFavorite={(i)=>onAddToFavorite(i)} // можно и без колбека делать
              // onClickLike
              // onClickPlus={(i) => onAddToCart(i)}
              {...item}
            />
          ))}
      </div>
    </div>

  )
}
