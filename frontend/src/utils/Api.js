class Api {
  constructor(setting) {
    this._url = setting.url;
    this._headers = setting.headers;
  }

  // проверка запросов
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  };
  
  // загрузка информации о пользователе
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkResponse);
  };

  // загрузка карточек
  getItemInfo() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkResponse);
  };

  // замена данных пользователя
  patchUserInfo(userInfo) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      })
    })
    .then(this._checkResponse);
  };

  // добавление новой карточки
  postNewCard(item) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        link: item.link,
        name: item.name,
      })
    })
    .then(this._checkResponse);
  };

   // работа с лайками
  _putLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  _deleteLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  };

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this._putLikeCard(cardId);
    } else {
        return this._deleteLikeCard(cardId);
    }
  };


  // удаление карточки
  deleteItemCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._checkResponse);
  };

  // аватар
  patchUserAvatar(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: item.avatar
      })
    }).then(this._checkResponse);
  };
};

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '3e20d3f6-0c12-4cc8-983e-21b8af59f059',
    'Content-Type': 'application/json'
  }
});

export default api;
