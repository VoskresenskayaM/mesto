
export default class UserInfo {

    setUserInfoInProfile(nameSelector, aboutSelector, imageSelector) {
        nameSelector.textContent = this._name;
        aboutSelector.textContent = this._about;
        imageSelector.src = this._image;
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

    editUserInfo({ data }) {
        if (data.name !== this._name)
            this._name = data.name;
        if (data.about !== this._about)
            this._about = data.about;
        if (data.image !== this._image)
            this._image = data.avatar;
    }

}


