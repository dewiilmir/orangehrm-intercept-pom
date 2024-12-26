export default class LoginPage {
    static visit() {
        return cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    static InputUsername(username) {
        return cy.get('[name="username"]');
    }

    static InputPassword(password) {
        return cy.get('[name="password"]');
    }

    static submit() {
        return cy.get('button[type="submit"]');
    }

    static invalidcredentials(){
        return cy.get('[class="oxd-text oxd-text--p oxd-alert-content-text"]');
    }

    static verifyDashboardTitle() {
        return cy.get('[class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-module"]');
    }

    static verifyRequiredMessage(index) {
        return cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').eq(index);
     }

    static TextLogin() {
        return cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]');
    }
}