import gamePage from './page-objects/game-page';
import gameBoard from './page-objects/game-board';

const page = new gamePage();

Cypress.Commands.add('quickStart', (inputText = '3') => {
    let gridSizeInt = parseInt(inputText)
    const board = new gameBoard();
    page.assertInitialPageState();
    page.inputBoardField(inputText);
    page.getBoardInputFieldValue().should('equal', inputText);
    page.getPlayButton().should('be.enabled').click();
    // we're going fast, so assume we're entering a number
    board.assertTableStructure(gridSizeInt);
});