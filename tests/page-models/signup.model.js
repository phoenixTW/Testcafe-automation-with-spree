import { Selector } from 'testcafe';

export default class SignUpModel {
    constructor(email, password) {
        this.username = email;
        this.password = password;
        this.usernameField = Selector("#spree_user_email");
        this.passwordField = Selector("#spree_user_password");
        this.passwordConfirmField = Selector("#spree_user_password_confirmation");
        this.createButton = Selector('[name="commit"]');
    }

    async signup(t) {
        return t
            .typeText(this.usernameField, this.username)
            .typeText(this.passwordField, this.password)
            .typeText(this.passwordConfirmField, this.password)
            .click(this.createButton);
    }

}