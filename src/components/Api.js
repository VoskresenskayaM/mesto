export default class Api {
    constructor(bathPath, token) {
        this._basePath = bathPath;
        this._token = token;
    }

    _getHeaders() {
        return {
            authorization: this._token,
            'Content-Type': 'application/json'
        }
    }

    _getJson(res) {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._getJson);
    }

    getCards() {
        return this._request(`${this._basePath}/cards`, {
            headers: this._getHeaders()
        });
    }

    deleteCard(id) {
        return this._request(`${this._basePath}/cards/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        });
    }

    getUserInfo() {
        return this._request(`${this._basePath}/users/me`, {
            headers: this._getHeaders()
        });
    }

    getAllCardWhithUser() {
        return Promise.all([this.getCards(), this.getUserInfo()]);
    }

    editUserInfo({ item }) {
        return this._request(`${this._basePath}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: item.name,
                about: item.about
            })
        });
    }

    addNewCard({ item }) {
        return this._request(`${this._basePath}/cards`, {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify({
                link: item.link,
                name: item.name
            })
        });
    }

    likeCard(id) {
        return this._request(`${this._basePath}/cards/${id}/likes`, {
            method: "PUT",
            headers: this._getHeaders(),
        });
    }

    deleteLike(id) {
        return this._request(`${this._basePath}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this._getHeaders(),
        });
    }

    editAvatar({ item }) {
        return this._request(`${this._basePath}/users/me/avatar`, {
            method: "PATCH",
            headers: this._getHeaders(),
            body: JSON.stringify({ avatar: item.link })
        });
    }
}

