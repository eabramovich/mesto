export default class UserInfo {
    constructor({userNameSelector, userInfoSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfoSelector = document.querySelector(userInfoSelector);
    }

    getUserInfo() {
        this._userInfo = {
            name: this._userName.textContent,
            personalInfo: this._userInfoSelector.textContent
        }

        return this._userInfo;
    }

    setUserInfo(userName, personalInfo) {
        this._userName.textContent = userName;
        this._userInfoSelector.textContent = personalInfo;
    }
}