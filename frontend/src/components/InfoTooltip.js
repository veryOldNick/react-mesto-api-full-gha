import HandleEscClose from "../hooks/handleEscClose";
import success from "../images/success.svg";
import fail from "../images/failing.svg";


function InfoTooltip(
  {
    isOpen,
    onClose,
    isConfirmStatus,
  }
  ) {

    HandleEscClose({ isOpen, onClose });

  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`} id="popup_InfoTooltip">

      <div className="popup__container">
        <button 
          className="popup__close-button" 
          type="button"
          aria-label="Close"
          onClick={onClose}
        ></button>

        <img 
          className="popup__user-status"
          src={isConfirmStatus ? success : fail}
          alt={isConfirmStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз"}
        />

        <p className="popup__message">
          {isConfirmStatus
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте еще раз."}
        </p>

      </div>
    </section>
  );
};

export default InfoTooltip;
