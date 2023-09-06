import HandleEscClose from "../hooks/handleEscClose";


function PopupWithForm(
  {
    name,
    title,
    buttonText,
    children,
    isOpen,
    onClose,
    onSubmit,
  }
) {
  
  HandleEscClose({ isOpen, onClose });
  
  return (
  // <div className="popup" id="popup__profile">
  <div className={`popup ${isOpen ? "popup_opened" : ""}`} id={`popup_${name}`}>
    <div className="popup__container">
      <button className="popup__close-button" type="button" aria-label="Close" onClick={onClose}></button>
      <form className="popup__form" id="profile_form" name={name} onSubmit={onSubmit} noValidate>
        <h2 className="popup__head" id="profile_head">{title}</h2>
        {children}
        <button className="popup__button-save" type="submit" aria-label="Save">{buttonText}</button>
      </form>
    </div>
  </div>
  )
};

export default PopupWithForm;
