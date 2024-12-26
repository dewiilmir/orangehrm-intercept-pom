export default class LoginPage {
    static visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    static InputUsername(username) {
        return cy.get('input[name="username"]');
    }

    static buttonResetPassword() {
        return cy.get('[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset"]');
    }

    static navigateToForgotPassword() {
        return cy.contains('Forgot your password?');
    }

    static url() {
        return cy.url();
    }

    static h6 () {
        return cy.get('h6');
    }

    static TextLogin() {
        return cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]');
    }

    static resetSuccessfully() {
        return cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]');
    }
}