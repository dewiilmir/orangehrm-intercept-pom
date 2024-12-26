///<reference types="cypress"/>

describe('Login Feature',() =>{
    const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    });

    it('TC-011: Login with Forgot Password', () => {
        // Step 1: Klik link "Forgot your password?"
    cy.contains('Forgot your password?').click();
    // Step 2: Verifikasi navigasi ke halaman reset password
    cy.url('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode').should('include', '/auth/requestPasswordResetCode');
    // Verifikasi bahwa halaman "Forgot Password" ditampilkan
    cy.get('h6').should('contain', 'Reset Password');
    // Step 3: Masukkan username
    cy.get('input[name="username"]').type('Admin');
    // Step 4: Klik tombol Reset Password
    cy.get('[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset"]').click();
    // Step 5: Verifikasi pesan sukses dan ikuti instruksi reset password
    cy.get('[class="oxd-text oxd-text--h6 orangehrm-forgot-password-title"]').should('be.visible');
    })
});