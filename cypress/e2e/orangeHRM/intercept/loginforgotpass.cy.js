///<reference types="cypress"/>

import LoginPage from "../../../pom/orangeHRM/login/loginforgotpass";

describe('Login Feature',() =>{
    const validUsername = 'Admin';

    beforeEach(() => {
        // Kunjungi halaman login sebelum setiap pengujian
        LoginPage.visit();
        LoginPage.TextLogin().should('have.text','Login')
    });

    it('TC-011: Login with Forgot Password', () => {
        LoginPage.navigateToForgotPassword().click();
        LoginPage.url().should('include', '/auth/requestPasswordResetCode'); 
        LoginPage.h6().should('contain.text', 'Reset Password');
        LoginPage.InputUsername(validUsername);
        cy.intercept("POST","**/auth/requestResetPassword").as("requestResetPassword");
        LoginPage.buttonResetPassword().click();
        cy.wait('@requestResetPassword').then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });
        
        LoginPage.resetSuccessfully().should('be.visible');
    });
});