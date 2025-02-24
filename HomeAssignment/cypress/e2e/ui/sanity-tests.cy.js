import { expect } from "chai";

// Selectors
const navbarSelector = '#main-navbar';
const searchInputSelector = '[data-name="main search"]';
const searchIconSelector = 'img[alt="Search Icon"]';
const openSearchButtonSelector = 'button:last-of-type';
const searchResultsSelector = '[id^="section-0-item-"]';
const firstSearchResultSelector = '[id="section-0-item-0"]';
const hamburgerMenuIconSelector = '[data-name="hamburger menu"]';
const menuSelector = '[data-name="Menu"]'
const menuItemText = 'News';

const url = 'https://fxempire.com/api/v1/en/articles/latest/top-articles-homepage'

const openNavbarMenu = () => {
    cy.get(hamburgerMenuIconSelector).click();
    cy.get(menuSelector).should('be.visible');
};

describe('Home Assignment', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    // Search Component
    it('Search bar rendering', () => {
        cy.get(navbarSelector).within(() => {
            cy.get(searchIconSelector).should('be.visible');
            cy.get(searchInputSelector).should('be.visible');
            cy.get(openSearchButtonSelector).should('be.visible');
        });
    });

    it('Search bar functionality', () => {
        const searchQuery = 'Super Micro Computer';

        cy.intercept('GET', '*search*').as('searchRequest');

        cy.get(navbarSelector).within(() => {
            cy.get(searchInputSelector).type(searchQuery);
            cy.wait('@searchRequest');
            cy.get(searchResultsSelector).should('have.length.greaterThan', 0);
            cy.get(firstSearchResultSelector).should('contain.text', searchQuery);
            cy.get(firstSearchResultSelector).click();
        });

        cy.url().should('contain', 'stocks/smci');
    });

    // Navbar Component
    it('Navbar rendering', () => {
        cy.get(hamburgerMenuIconSelector).should('be.visible');
        cy.get(menuSelector).should('not.be.visible');
    });

    it('Navbar functionality', () => {
        openNavbarMenu();
        cy.get(`${menuSelector} li`).contains(menuItemText).click();
        cy.url().should('include', `/${menuItemText.toLowerCase()}`);
    });

    // API Test
    it('GET Top Articles', () => {
        const topArticleSelector = 'hp_article_';
        cy.request('GET', url).then(response => {
            const articles = response.body;
            expect(response.status).to.eq(200);
            expect(articles).to.be.an('array');
            // Will fail since actual body length is 4
            expect(articles.length).to.be.at.least(5);

            for (let i = 0; i < articles.length; i++) {
                const articleTitle = articles[i].title;
                cy.get(`[data-name="${topArticleSelector}${i + 1}"]`).find('span').last()
                .should('be.visible').and('have.text', articleTitle);
                // Will fail since 'url', and 'publishedAt' are not in object keys
                expect(articles[i]).to.include.keys(['id', 'title', 'url', 'publishedAt']);
            }
        });
    });
});