import {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, buttonText}) {

  const avatarInput = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarInput.current.value
    });
  };

  useEffect(() => {avatarInput.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
    <input
      id= "avatar"
      name="avatar"
      className="popup__input popup__input_ava"
      type="url"
      placeholder="Ссылка на аватар"
      ref ={avatarInput}       
      required/>
    <span className="popup__span avatar-error" ></span>
    </PopupWithForm>
  )
};

export default EditAvatarPopup
