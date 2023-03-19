export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        const profile = document.querySelector('.profile');
        this._nameProfile = profile.querySelector(nameSelector);
        this._aboutProfile = profile.querySelector(aboutSelector);
        this._imageProfile =profile.querySelector(avatarSelector);
    }

    _setUserInfoInProfile() {
        this._nameProfile.textContent = this._name;
        this._aboutProfile.textContent = this._about;
        this._imageProfile.src = this._image;
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
        this._setUserInfoInProfile();
    }
}

