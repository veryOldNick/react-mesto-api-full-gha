import HandleEscClose from "../hooks/handleEscClose";


function ImagePopup (
  {
    card,
    onClose,
    isOpen, 
  }){

    HandleEscClose({ isOpen, onClose });

    return (
      <div className={`popup ${card ? "popup_opened" : " "}`} id="popup__img">
        <figure className="popup__card">
          <button 
            className="popup__close-button" 
            id="close__button-img" 
            type="button" 
            aria-label="Close" 
            onClick= {onClose}
          ></button>
          <img 
            className="popup__image" 
            src={card ? card.link : ' '}
            alt={card ? card.name : ' '}
          />
          <figcaption className="popup__caption">{card ? card.name : ' '}</figcaption>
        </figure>
      </div>    
    )
};

export default ImagePopup;
