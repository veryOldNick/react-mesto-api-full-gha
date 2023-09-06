import api from "../utils/Api.js";
import Footer from './Footer.js'
import Header from './Header.js'
import Main from './Main.js'
import ImagePopup from "./ImagePopup.js";
import DeleteCardPopup from './DeleteCardPopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom"; 
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from "./../utils/Auth.js";


function App() {
  // Стейты, отвечающие за видимость попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isSightPopupOpen, setIsSightPopupOpen] = useState(false);

  // Стейт, отвечающий за данные карточек
  const [selectedCard, setSelectedCard] = useState(null);

  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null)

  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Стейт, отвечающий за данные карточек
  const [cards, setCards] = useState([]);

  // Стейт, отвечающий за статус пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  
  // попапы
  const handleEditAvatarClick = () => {setIsEditAvatarPopupOpen(true)};
  const handleEditProfileClick = () => {setIsEditProfilePopupOpen(true)};
  const handleAddPlaceClick = () => {setIsAddPlacePopupOpen(true)};
  const handleDeleteCardClick = (card) => {setSelectedDeleteCard(card)};
  const handleInfoTooltipClick = () => {setIsInfoTooltipPopupOpen(true)};
  const handleShowSightClick = () => {setIsSightPopupOpen(true)};

  // большая карточка
  const handleCardClick = (card) => {
    setSelectedCard(card);
    handleShowSightClick();
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setSelectedDeleteCard(null);
    setIsInfoTooltipPopupOpen(false);
    setIsSightPopupOpen(false);
  };

  const showError = (err) => console.log(err);

  // Получение данных пользователя с сервера
  useEffect(()=> {
    api.getUserInfo()
        .then((res) => {setCurrentUser(res);})
        .catch(showError);
  },[]);

  // Получение карточек с сервера
  useEffect(() =>{
    api.getItemInfo()
      .then((res) => {setCards(res)})
      .catch(showError);
  },[]);

    // Проверка токена
    useEffect(() => {handleCheckToken()}, []);

  //Обработчик удаления своей карточки
  function handleCardDelete() {    
    api.deleteItemCard(selectedDeleteCard._id)
      .then(() => {
        setCards(cards => cards.filter((item) => item._id !== selectedDeleteCard._id));
        closeAllPopups();
      }).catch(showError);
  };

  function handleCardLike(card) {
    // проверка лайка от себя    
    const isLike = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLike)
      .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      }).catch(showError);
  };

  // сохранение данных пользователя
  function handleUpdateUser(data) {  
    api.patchUserInfo(data)
       .then((res) => {
         setCurrentUser(res);
         closeAllPopups();
        }).catch(showError);
    };
  
     // Сохранение смены аватара
    function handleUpdateAvatar(data) {
      api.patchUserAvatar(data)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        }).catch(showError);
    };

  // Добавления новой карточки на сервер
  function handleAddPlaceSubmit(item) {
    api.postNewCard(item)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(showError);
  };

   /** обработчик авторизации пользователя */
   function handleLogin(data) {
    return auth
      .login(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setUserEmail(data.email);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

   /** обработчик регистрации пользователя */
   function handleRegister(data) {
    console.log("test handleRegister", data);
    return auth
      .register(data)
      .then((res) => {
        setIsSuccessInfoTooltipStatus(true);
        handleInfoTooltipClick();
        navigate('/sign-in');
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessInfoTooltipStatus(false);
        handleInfoTooltipClick(false);
      })
  };

   // обработчик проверки наличчия токена в localStorage
   function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then(({ data }) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  };

  function handleLogout() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    navigate('/sign-in');
  };
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          email={userEmail}
          onLogout={handleLogout}
        />  

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              element={Main}
              loggedIn={isLoggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick = {handleCardClick}
              onCardDelete ={handleDeleteCardClick}
              onCardLike= {handleCardLike}
              cards={cards}              
            />}/>
          
          <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}/> 
          <Route path="/sign-up" element={<Register handleRegister={handleRegister}/>}/>

          <Route path='*' element={isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />} />
          
        </Routes>

        <Footer />        

        {/* Попап профиля */}
        <EditProfilePopup 
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        /> 

        {/* Попап добавления карточки */}
        <AddPlacePopup 
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* Попап редактирования аватара */}
        <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
        />
        
        {/* Попап большой карточки */}
        <ImagePopup 
          isOpen= {isSightPopupOpen}
          onClose={closeAllPopups}
          card = {selectedCard}
        />

        <DeleteCardPopup
          onDeleteCard ={handleCardDelete}
          isOpen= {selectedDeleteCard}
          onClose={closeAllPopups}
          buttonText = {'Удаление'}
        />

        <InfoTooltip 
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isConfirmStatus={isSuccessInfoTooltipStatus} 
        />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
