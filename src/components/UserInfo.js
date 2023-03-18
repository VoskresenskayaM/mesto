export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
        this._avatarSelector = avatarSelector;
    }

    setUserInfoInProfile() {
        this._nameSelector.textContent = this._name;
        this._aboutSelector.textContent = this._about;
        this._avatarSelector.src = this._image;
    }

    getUserInfo() {
        return {
            name: this._name,
            about: this._about,
            image: this._image,
            _id: this._id,
            cohort: this._cohort
        }
    }

    setUserInfo({ data }) {
        this._name = data.name;
        this._about = data.about;
        this._image = data.avatar;
        this._id = data._id;
        this._cohort = data.cohort;
    }
}


