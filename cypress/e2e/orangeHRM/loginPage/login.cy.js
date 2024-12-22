///<reference types="cypress"/>

describe('Login Feature',() =>{
    const baseUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get('[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('have.text','Login');
    });

    it('TC-001: Login with Valid Credentials',() =>{
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.contains('Dashboard').should('be.visible');
    })
    it('TC-002: Login with Invalid Username',() =>{
        cy.get('[name="username"]').type('Dewi');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.contains('Invalid credentials').should('be.visible');
    })
    it('TC-003: Login with Invalid Password',() =>{
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('dewi123');
        cy.get('button[type="submit"]').click();
        
        cy.contains('Invalid credentials').should('be.visible');
    })
    it('TC-004: Login with Blank Username and Password', () => {
        cy.get('button[type="submit"]').click();
    
        cy.contains('Required').should('be.visible');
    })
    it('TC-005: Login with Empty Username', () => {
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
    
        //cy.get('[name="username"]').siblings('span').should('have.text', 'Required');//
        cy.get('.oxd-input-group > .oxd-text').should('contain.text', 'Required');
    })
    it('TC-006: Login with Empty Password', () => {
        cy.get('[name="username"]').type('Admin');
        cy.get('button[type="submit"]').click();
        
        //cy.get('[name="password"]').siblings('span').should('have.text', 'Required');
        cy.get('.oxd-input-group > .oxd-text').should('contain.text', 'Required');
    })
    it('TC-007: Login with Special Characters', () => {
        cy.get('[name="username"]').type('Admin@!');
        cy.get('[name="password"]').type('admin@123');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Invalid credentials').should('be.visible');
    });
    it('TC-008: Login with Space at the beginning/end Input', () => {
        cy.get('[name="username"]').type(' Admin ');
        cy.get('[name="password"]').type(' admin123 ');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Invalid credentials').should('be.visible');
    });
    it('TC-009: Login with Case Sensitive Username', () => {
        cy.get('[name="username"]').type('admin'); // lowercase
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Dashboard').should('be.visible');
    });
    it('TC-010: Login with Case Sensitive Password', () => {
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('Admin123');
        cy.get('button[type="submit"]').click();
    
        cy.contains('Invalid credentials').should('be.visible');
    });
});