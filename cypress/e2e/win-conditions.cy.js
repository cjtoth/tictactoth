import gamePage from '../support/page-objects/game-page';
import gameBoard from '../support/page-objects/game-board';

describe('Win Conditions', () => {
    const page = new gamePage();
    const board = new gameBoard();

    beforeEach(() => {
        page.visit();
    });

    it('Plays a game where X wins horizonally', () => {
        let input = '11'
        cy.quickStart(input);
        board.xWinHorizontally(parseInt(input));
        page.assertWinModal('X');
    });

    it('Plays a game where X wins vertically', () => {
        let input = '9';
        cy.quickStart(input);
        board.xWinVertically(parseInt(input))
        page.assertWinModal('X');
    });

    it('Plays a game where X wins diagonally, left to right', () => {
        let input = '6'
        cy.quickStart(input);
        board.xWinLeftToRight(parseInt(input))
        page.assertWinModal('X');
    });

    it('Plays a game where X wins diagonally, right to left', () => {
        let input = '9'
        cy.quickStart(input);
        board.xWinRightToLeft(parseInt(input));
        page.assertWinModal('X');
    });

    it('Plays a game where O wins horizonally', () => {
        let input = '7'
        cy.quickStart(input);
        board.oWinHorizontally(parseInt(input))
        page.assertWinModal('O');
    });

    it('Plays a game where O wins vertically', () => {
        let input = '7'
        cy.quickStart(input);
        board.oWinVertically(parseInt(input))
        page.assertWinModal('O');
    });

    it('Plays a game where O wins diagonally, left to right', () => {
        let input = '12'
        cy.quickStart(input);
        board.oWinLeftToRight(parseInt(input))
        page.assertWinModal('O');
    });

    it('Plays a game where O wins diagonally, right to left', () => {
        let input = '12'
        cy.quickStart(input);
        board.oWinRightToLeft(parseInt(input))
        page.assertWinModal('O');
    });

    it('Plays a game that results in a tie', () => {
        let input = '3'
        cy.quickStart(input);
        // Play a tie game
        // TODO make this a parameterized function
        board.clickAndAssertCell(0,0,'X')
        board.clickAndAssertCell(2,0,'O')
        board.clickAndAssertCell(0,2,'X')
        board.clickAndAssertCell(2,2,'O')
        board.clickAndAssertCell(1,1,'X')
        board.clickAndAssertCell(0,1,'O')
        board.clickAndAssertCell(1,0,'X')
        board.clickAndAssertCell(1,2,'O')
        board.clickAndAssertCell(2,1,'X')
        page.assertTieModal();
    });
});
