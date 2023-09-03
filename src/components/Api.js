export default class Api {
  constructor({ baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }

  _handleResponse(response) {
    if(response.ok) {
      return response.json();
    }
    
    return Promise.reject(`Что-то пошло не так: ${response.status}`);
  }

  getUserInfo() {
    return fetch(this._url + '/users/me', {
        method: 'GET',
        headers: this._headers    
      })
      .then((res) => {
        return res.json();
      })
  }

  updateUserInfo(name, about) {
    return fetch(this._url + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      }) 
    })
    .then((res) => {
      return this._handleResponse(res);
    })
  }

  getInitialCards() {
    return fetch(this._url + '/cards', {
      method: 'GET',
      headers: this._headers    
    })
    .then((res) => {
      return res.json();
    })
  }

  addNewCard({link, name}) {
    return fetch(this._url + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      return this._handleResponse(res);
    })
  }

  removeCard(cardId) {
    return fetch(this._url + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._handleResponse(res);
    })
  }

  addLikeCard(cardId) {
    return fetch(this._url + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => {
      return this._handleResponse(res);
    })
  }

  removeLikeCard(cardId) {
    return fetch(this._url + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => {
      return this._handleResponse(res);
    })
  }
}