import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, buttonText}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  //загрузка текущего пользователя
  const currentUser = useContext(CurrentUserContext)
  
  // монтируем данные пользователя в страницу
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser,isOpen]); 

  function handleNameChange(e) {setName(e.target.value)};

  function handleDescriptionChange(e) {setDescription(e.target.value)};

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isOpen}
        onClose={onClose}
        buttonText="Сохранить"
        onSubmit={handleSubmit}
    >
      <input 
        id="name"
        name="name"
        className="popup__input popup__input_form_name"
        type="text"
        placeholder="Имя"        
        minLength="2"
        maxLength="40"
        value= {name || ""}
        onChange={handleNameChange}
        required/>          
      <span className="popup__span name-error" ></span>
      <input 
        id="job"
        name="job"
        className="popup__input popup__input_form_job"
        type="text"
        placeholder="Проффесия"         
        minLength="2"
        maxLength="200"
        value= {description || ""}
        onChange={handleDescriptionChange}
        required/>
      <span className="popup__span job-error" ></span> 
    </PopupWithForm>
  )
};

export default EditProfilePopup;
