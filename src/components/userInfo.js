
export default class UserInfo {
    constructor({name, profession}) {
        this._name = name;
        this._profession = profession;

    }
    getUserInfo() {
        return {name: this._name,
            profession: this._profession
        }
    }

    setUserInfo({data}) {
      this._name = data.name;
      this._profession = data.profession;
    }
}