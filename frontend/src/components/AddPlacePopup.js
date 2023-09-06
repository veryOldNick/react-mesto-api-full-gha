import PopupWithForm from "./PopupWithForm.js";
import {useState, useEffect} from "react";
// import useFormAndValidation from "../hooks/useFormAndValidation.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  const handleNameChange = (e) => {setName(e.target.value)};
  const handleLinkChange = (e) => {setLink(e.target.value)};

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name: name, link: link,});
  };
    
  return (
    <PopupWithForm       
      name="sight"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
    <input
      id="sight"
      name="sight"
      className="popup__input popup__input_form_place"
      type="text" 
      placeholder="Название"        
      minLength="2"
      maxLength="30"
      value={name || ''}
      onChange={handleNameChange}
      required/>
    <span className="popup__span name-error" ></span>
    <input
      id= "link"
      name="link"
      className="popup__input popup__input_form_link"
      type="url"
      placeholder="Ссылка на картинку"
      value={link || ''}
      onChange={handleLinkChange}        
      required/>
    <span className="popup__span link-error" ></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
