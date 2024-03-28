class gamePage {
    visit() {
        cy.visit('/');
    }

    getBoardInputField() {
        return cy.get('#number');
    }

    getBoardInputFieldValue() {
        return this.getBoardInputField().invoke('val');
    }

    assertBoardInputPlaceholder() {
        this.getBoardInputField()
            .invoke('attr', 'placeholder')
            .should('equal', "Enter a number to generate a tic tac toe board");
    }

    assertInitialPageState() {
        this.assertBoardInputPlaceholder();
        this.getBoardInputFieldValue().should('equal', '')
        // TODO enable this once field is only enabled on a valid state
        // this.getPlayButton().should('be.disabled');
    }

    inputBoardField(text) {
        return this.getBoardInputField()
            .click({force: true}) // sometimes element is covered by another element
            .clear()
            .type(text);
    }

    getPlayButton() {
        return cy.get('#start');
    }

    clickPlayButton() {
        return this.getPlayButton().click();
    }

    getDisplayModal() {
        return cy.get('#endgame');
    }

    getDisplayModalText() {
        return this.getDisplayModal().invoke('text');
    }

    assertWinModal(winningPlayer) {
        let formatWinText = `Congratulations player ${winningPlayer}! You've won. Refresh to play again!`
        this.getDisplayModalText().should('equal',formatWinText)
    }

    assertTieModal() {
        let formatWinText = `Tie game!. Refresh to play again!`
        this.getDisplayModalText().should('equal',formatWinText)
    }

    restartGame() {
        // TODO update when restart is implemented
        cy.visit('/');
    }
}

export default gamePage;
