export default class PageFactory {

    constructor(address) {
        this.appAddress = address;
    }

    login() {
        return this.appAddress + 'login'
    }

    signup() {
        return this.appAddress + 'signup'
    }
}