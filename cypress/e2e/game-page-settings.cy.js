import gamePage from '../support/page-objects/game-page';

describe('Game Page Settings', () => {
    const page = new gamePage();

    const expectedRequests = {
        "css": "https://roomy-fire-houseboat.glitch.me/style.css",
        "script": "https://roomy-fire-houseboat.glitch.me/script.js",
        "jquery": "https://code.jquery.com/jquery-2.2.1.min.js",
//        "client": "https://roomy-fire-houseboat.glitch.me/client.js", // TODO: enable once endpoint is available
      };

    beforeEach(() => {
        // clear so intercepts don't get cached
        cy.wrap(Cypress.automation('remote:debugger:protocol', {
            command: 'Network.clearBrowserCache',
          }))
        // set up intercepts for expected requests
        Object.keys(expectedRequests).forEach((key) => {
            cy.intercept(expectedRequests[key]).as(key);
          });
        page.visit();
    })

    it("On load, elements are in expected initial state", () => {
        page.assertInitialPageState();
        Object.keys(expectedRequests).forEach((key) => {
            cy.wait(`@${key}`).then(interception => {
                expect(interception.response.statusCode).to.be.oneOf([200, 304]);
            })
    })
});

    it('Input field allows numbers to be typed', () => {
        let input = '12'
        page.assertInitialPageState();
        page.inputBoardField(input);
        page.getBoardInputFieldValue().should('equal', input)
        page.getPlayButton().should('be.enabled');
    });

    it('Input field does not allow alphabetic characters to be typed', () => {
        let input = 'asdf'
        page.assertInitialPageState();
        page.inputBoardField(input);
        page.getBoardInputFieldValue().should('equal', '')
        page.getPlayButton().should('be.disabled');
    });

    it('Input field does not allow special characters to be typed', () => {
        let input = '@!&'
        page.assertInitialPageState();
        page.inputBoardField(input);
        page.getBoardInputFieldValue().should('equal', '')
        page.getPlayButton().should('be.disabled');
    });

    it('Input field does not allow whitespace characters to be typed', () => {
        let input = '1  3'
        let strippedInput = input.replace(/\s/g, "");
        page.assertInitialPageState();
        page.inputBoardField(input);
        page.getBoardInputFieldValue().should('equal', strippedInput);
        page.getPlayButton().should('be.disabled');
    });

    it('Does not support a board size less than 3', () => {
        let input = '2'
        page.assertInitialPageState();
        page.inputBoardField(input);
        page.getBoardInputFieldValue().should('equal', input);
        page.getPlayButton().should('be.disabled');
        // TODO enable once error messaging is created
        //cy.get('.error-message').should('be.visible')
        //  .and('contain', 'Tic Tac Toe boards must be 3x3 or larger');
    });

    it('Does not support a board size greater than the supported limit', () => {
        let input = '31'
        page.assertInitialPageState();
        page.inputBoardField(input);
        page.getBoardInputFieldValue().should('equal', input);
        page.getPlayButton().should('be.disabled');
        // TODO enable once error messaging is created
        //cy.get('.error-message').should('be.visible')
        //  .and('contain', 'Tic Tac Toe boards must be 30x30 or smaller');
    });

    it('Does not support a negative board size', () => {
        let input = '-3'
        page.assertInitialPageState();
        page.inputBoardField(input);
        page.getBoardInputFieldValue().should('equal', '3');
        page.getPlayButton().should('be.enabled');
    });
})