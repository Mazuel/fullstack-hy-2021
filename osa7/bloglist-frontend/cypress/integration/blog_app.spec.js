// blog_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Masse Mainio',
      username: 'Mazuel',
      password: 'test123',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
    cy.contains('username');
    cy.contains('password');
  });

  describe('Login', function () {
    it('fails with wrong credentials', function () {
      cy.get('input:first').type('Maz Kaz');
      cy.get('input:last').type('test123');
      cy.contains('login').click();
      cy.contains('wrong credentials');
    });

    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('Mazuel');
      cy.get('input:last').type('test123');
      cy.contains('login').click();
      cy.contains('Masse Mainio logged in');
      cy.contains('Add new blog');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('Mazuel');
      cy.get('input:last').type('test123');
      cy.contains('login').click();
    });

    it('A blog can be created', function () {
      cy.contains('Add new blog').click();
      cy.get('#title').type('Programming for dummies');
      cy.get('#author').type('Maz Kaz');
      cy.get('#url').type('www.helowelrld.com');
      cy.contains('create').click();
      cy.contains(
        'a new blog Programming for dummies by Maz Kaz has been added'
      );
    });

    it('A blog can be liked', function () {
      cy.contains('Add new blog').click();
      cy.get('#title').type('Programming for dummies');
      cy.get('#author').type('Maz Kaz');
      cy.get('#url').type('www.helowelrld.com');
      cy.contains('create').click();
      cy.contains('view').click();
      cy.contains('like').click();
      cy.contains('likes: 1');
    });

    it('A blog can be removed', function () {
      cy.contains('Add new blog').click();
      cy.get('#title').type('Programming for dummies');
      cy.get('#author').type('Maz Kaz');
      cy.get('#url').type('www.helowelrld.com');
      cy.contains('create').click();
      cy.contains('view').click();
      cy.contains('remove').click();
      cy.contains('view').should('not.exist');
    });

    it('A blogs are ordered by likes', function () {
      cy.contains('Add new blog').click();
      cy.get('#title').type('Programming for dummies');
      cy.get('#author').type('Maz Kaz');
      cy.get('#url').type('www.helowelrld.com');
      cy.contains('create').click();
      cy.get('div.blog').last().as('firstBlog');

      cy.get('#title').type('Programming for monsters');
      cy.get('#author').type('Maz Maz');
      cy.get('#url').type('www.helowelrld.com');
      cy.contains('create').click();
      cy.wait(200);
      cy.get('div.blog').last().as('secondBlog');

      cy.get('@secondBlog').contains('view').click();
      cy.get('@secondBlog').contains('like').click();
      cy.wait(200);
      cy.get('div.blog').first().contains('Programming for monsters');
      cy.get('@firstBlog').contains('view').click();
      cy.get('@firstBlog').contains('like').click();
      cy.wait(200);
      cy.get('@firstBlog').contains('like').click();
      cy.wait(200);
      cy.get('div.blog').first().contains('Programming for dummies');
    });
  });
});
