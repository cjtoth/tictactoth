import gamePage from '../support/page-objects/game-page';
import gameBoard from '../support/page-objects/game-board';

describe('Board Rules', () => {
    const page = new gamePage();
    const board = new gameBoard();

    beforeEach(() => {
        page.visit();
    })

    it("A traditional 3x3 board is validly generated", () => {
        cy.quickStart();
    })

    it("Clicking 'Play' multiple times does not generate multiple boards", () => {
        let input = '3'
        cy.quickStart(input)
        // TODO update this once play button supports a disabled state
        // page.getPlayButton().should('be.disabled')
        page.clickPlayButton();
        board.assertTableStructure(parseInt(input));
    })

    it("Clicking on an already filled cell does not change the value", () => {
        let input = '3'
        cy.quickStart(input)
        board.clickAndAssertCell(0,0,'X')
        // O's turn
        board.clickCell(0,0)
        board.getCellValue(0,0).should('equal', 'X')
        // still 0's turn
        board.clickAndAssertCell(0,1,'O')
        // X's turn
        board.clickCell(0,1)
        board.getCellValue(0,1).should('equal', 'O')
    })

    it("After a winner is declared, cells are no longer able to be filled in", () => {
        let input = '4'
        cy.quickStart(input)
        board.xWinHorizontally(parseInt(input));
        // TODO enable once modal accurately declares winner
        // page.assertWinModal('X')
        board.clickCell(3,3)
        board.getCellValue(3,3).should('equal', '');
    }
    )

});