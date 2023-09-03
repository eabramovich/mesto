export default class UserInfo {
    constructor({userNameSelector, userInfoSelector, userImageSelector}) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfoSelector = document.querySelector(userInfoSelector);
        this._userImage = document.querySelector(userImageSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            personalInfo: this._userInfoSelector.textContent
        }
    }

    setUserInfo(userName, personalInfo) {
        this._userName.textContent = userName;
        this._userInfoSelector.textContent = personalInfo;
    }

    setUserImage(imageLink) {
        this._userImage.src = imageLink;
    }
}