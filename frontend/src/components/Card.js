import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardDelete, onCardLike}) {

  // контекст
  const user = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === user._id;
  // Определяем, есть-ли наш лайк
  const isLiked = card.likes.some(i => i._id === user._id);
  // переменная отвечающая за смену цвета кнопки лайка
  const cardLikeButtonClass = (`gallery__like ${isLiked && 'gallery__like_on'}`);

  const handleClick = () => {onCardClick(card)};
  const handleDeleteClick = () => {onCardDelete(card)};
  const handleLikeClick = () => {onCardLike(card)};

  return (
    <li className="gallery__item">
      <img className="gallery__pic" src={card.link} alt={card.name} onClick={handleClick}/>
      {isOwn && (
        <button className="gallery__remove" 
        type="button" 
        onClick={handleDeleteClick} 
      />)} 
      <div className="gallery__discrable">
        <h2 className="gallery__name">{card.name}</h2>
        <div className="gallery__like_container">
          <button className={cardLikeButtonClass} type="button" aria-label="Like" onClick={handleLikeClick}></button>
          <p className="gallery__like-sum">{card.likes.length}</p>
        </div>  
      </div>
    </li>
  )
};

export default Card;
