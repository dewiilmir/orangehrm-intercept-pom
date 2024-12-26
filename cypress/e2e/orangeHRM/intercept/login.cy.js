///<reference types="cypress"/>

import LoginPage from "../../../pom/orangeHRM/login/login";

describe('Login Feature',() =>{
  const validUsername = 'Admin';
  const validPassword = 'admin123';
  const invalidUsername = 'InvalidUser ';
  const invalidPassword = 'invalidPassword';

    beforeEach(() => {
        LoginPage.visit();
        LoginPage.TextLogin().should('have.text','Login')
    });

    it('TC-001: Login with Valid Credentials', () => {
        LoginPage.InputUsername(validUsername);
        LoginPage.InputPassword(validPassword);
        cy.intercept("GET", "**/employees/action-summary").as("actionsummary");
        LoginPage.submit().click();
        cy.wait("@actionsummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });
        LoginPage.verifyDashboardTitle().should('have.text','Dashboard');
    });

    it('TC-002: Login with Invalid Username', () => {
        LoginPage.InputUsername(invalidUsername);
        LoginPage.InputPassword(validPassword);
        cy.intercept("GET", "**/i18n/messages").as("messages");
        LoginPage.submit().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(304);
        });
        LoginPage.invalidcredentials().should('have.text','Invalid credentials');
    });

    it('TC-003: Login with Invalid Password', () => {
        LoginPage.InputUsername(validUsername);
        LoginPage.InputPassword(invalidPassword);
        cy.intercept("GET", "**/i18n/messages").as("messages");
        LoginPage.submit().click();
        cy.wait("@messages").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(304);
        });
        LoginPage.invalidcredentials().should('have.text','Invalid credentials');
    });

    it('TC-004: Login with Blank Username and Password', () => {
        LoginPage.submit().click();
        LoginPage.verifyRequiredMessage(0).should('be.visible').and('contain.text', 'Required');
    });

    it('TC-005: Login with Empty Username', () => {
        LoginPage.InputPassword(validPassword);
        LoginPage.submit().click();
        LoginPage.verifyRequiredMessage(0).should('have.text','Required');
    });

    it('TC-006: Login with Empty Password', () => {
        LoginPage.InputUsername(validUsername);
        LoginPage.submit().click();
        LoginPage.verifyRequiredMessage(0).should('have.text','Required');
    });

    it('TC-007: Login with Special Characters', () => {
        LoginPage.InputUsername(invalidUsername);
        LoginPage.InputPassword(invalidPassword);
        cy.intercept("POST", "**/auth/validate").as("validate");
        LoginPage.submit().click();
        cy.wait("@validate").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(302);
        });
        LoginPage.invalidcredentials().should('have.text','Invalid credentials');
    });

    it('TC-008: Login with Space at the beginning/end Input', () => {
        LoginPage.InputUsername(invalidUsername);
        LoginPage.InputPassword(invalidPassword);
        LoginPage.submit().click();
        LoginPage.invalidcredentials().should('have.text','Invalid credentials');
    });

    it('TC-009: Login with Case Sensitive Username', () => {
        LoginPage.InputUsername(invalidUsername);
        LoginPage.InputPassword(validPassword);
        cy.intercept("GET", "**/employees/action-summary").as("actionsummary");
        LoginPage.submit().click();
        cy.wait("@actionsummary").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(200);
        });
        LoginPage.invalidcredentials().should('have.text','Invalid credentials');
    });

    it('TC-010: Login with Case Sensitive Password', () => {
        LoginPage.InputUsername(validUsername);
        LoginPage.InputPassword(invalidPassword);
        cy.intercept("POST", "**/auth/validate").as("validate");
        LoginPage.submit().click();
        cy.wait("@validate").then((intercept) => {
            expect(intercept.response.statusCode).to.equal(302);
        });
        LoginPage.invalidcredentials().should('have.text','Invalid credentials');
    });
});
