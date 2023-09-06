import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main ( 
  {
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardDelete,
  onCardLike,
  }
) {
  // Подписаться на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);
 
  return (
    <main>
      <section className="profile">
        <div className="profile__card">
          <div 
            className="profile__avatar-btn"
            onClick={onEditAvatar}
          >
            <img src={currentUser.avatar} alt="фото" className="profile__photo"/>
          </div>        
          <div className="profile__info">
            <div className="profile__name">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button 
                className="profile__edit"
                type="button"
                aria-label="Редактирование"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__describle">{currentUser.about}</p>
          </div>      
        </div>
        <button 
          className="profile__add"
          type="button"
          aria-label="Добавление"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card card={card} 
              key={card._id} 
              onCardClick={onCardClick} 
              onCardDelete= {onCardDelete}
              onCardLike= {onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>    
  )
};

export default Main;
