import React, { useState } from "react";

export default function Card(props) {
  const {
    id,
    name,
    color,
    price,
    size,
    link,
    onPlus,
    onFavorite,
    favorited = false,
  } = props;

  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    !isAdded && onPlus(props);
    setIsAdded(!isAdded);
  };

  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickFavorite = () => {
    onFavorite(props);
    setIsFavorite(!isFavorite);
  };

  const url = `./img/clothes/${link}.jpg`;

  const svgPlus = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.6653 5.13128H7.20219V1.66827C7.20219 0.332907 5.13118 0.332907 5.13118 1.66827V5.13128H1.66805C0.332981 5.13128 0.332981 7.20221 1.66805 7.20221H5.13118V10.6652C5.13118 12.0006 7.20219 12.0006 7.20219 10.6652V7.20221H10.6653C12.0006 7.20221 12.0006 5.13128 10.6653 5.13128Z"
        fill="#D3D3D3"
      />
    </svg>
  );
  const svgChecked = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="url(#paint0_linear)" />
      <g clip-path="url(#clip0)">
        <g filter="url(#filter0_d)">
          <path
            d="M19.6567 11.6207C19.8394 11.4363 20.0876 11.3318 20.3471 11.3299C20.6066 11.3279 20.8563 11.4288 21.0416 11.6105C21.227 11.7921 21.3329 12.0398 21.3362 12.2993C21.3395 12.5588 21.24 12.809 21.0594 12.9954L15.8327 19.5294C15.7429 19.626 15.6346 19.7036 15.5141 19.7575C15.3937 19.8114 15.2636 19.8404 15.1317 19.8429C14.9998 19.8454 14.8687 19.8213 14.7463 19.772C14.6239 19.7227 14.5127 19.6492 14.4194 19.556L10.954 16.092C10.7699 15.9078 10.6665 15.6579 10.6665 15.3975C10.6666 15.137 10.7701 14.8872 10.9544 14.703C11.1386 14.5189 11.3885 14.4155 11.6489 14.4155C11.9094 14.4156 12.1592 14.5191 12.3434 14.7034L15.084 17.4447L19.6307 11.6514C19.639 11.6408 19.6479 11.6308 19.6574 11.6214L19.6567 11.6207Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="10.6665"
          y="11.3298"
          width="10.6698"
          height="10.5132"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear"
          x1="16"
          y1="0"
          x2="16"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#89F09C" />
          <stop offset="1" stop-color="#3CC755" />
        </linearGradient>
        <clipPath id="clip0">
          <rect
            width="10.6667"
            height="10.6667"
            fill="white"
            transform="translate(10.6667 10.6667)"
          />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="card">
      <img
        alt="favorites"
        onClick={onClickFavorite}
        className="favorite"
        src={!isFavorite ? "./img/unliked.svg" : "./img/liked.svg"}
      />
      <img width={210} src={url} alt="одяг" />
      <p>
        {name}({color})
      </p>
      <p>{size}</p>
      <div className="card-bottom">
        <div className="price">
          <span>Ціна:</span>
          <b>{price} грн</b>
        </div>
        <div className="Added" onClick={onClickPlus}>
          {!isAdded ? svgPlus : svgChecked}
        </div>
      </div>
    </div>
  );
}
