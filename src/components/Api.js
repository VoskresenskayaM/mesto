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
            return res.json();
        }
        return Promise.reject(`Ошибка: ${respons.status}`);
    }

    getCards() {
        return fetch(`${this._basePath}/cards`, {
            headers: this._getHeaders()
        }).then(this._getJson)
    }


    deleteCard(id) {
         return fetch(`${this._basePath}/cards/${id}`, {
            method: 'DELETE',
             headers: this._getHeaders()
         }).then(this._getJson)
        
     }

    getUserInfo() {
        return fetch(`${this._basePath}/users/me`, {
            headers: this._getHeaders()
        }).then(this._getJson)
    }

    editUserInfo({item}) {
        return fetch(`${this._basePath}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: item.name,
                about: item.about
            })
        }).then(this._getJson)

    }

   /* addCard({item}) {
        return fetch(`${this._basePath}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({ 
                link: item.link,
                name: item.name
            })
        }).then(this._getJson)
    }*/
    
    addNewCard({item}){
        return fetch(`${this._basePath}/cards`, {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify({ 
                link: item.link,
                name: item.name
            })
        }).then(this._getJson)
    }


}

