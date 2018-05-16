import { Selector } from 'testcafe';

export default class LoginModel {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.usernameField = Selector("#spree_user_email");
        this.passwordField = Selector("#spree_user_password");
        this.loginButton = Selector('[name="commit"]');
    }

    async login(t) {
        return t
            .typeText(this.usernameField, this.username)
            .typeText(this.passwordField, this.password)
            .click(this.loginButton)
    }

    updateUsername(username) {
        return new LoginModel(username, this.password)
    }

    updatePassword(password) {
        return new LoginModel(this.username, password)
    }
}