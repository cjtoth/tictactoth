class gameBoard {

    getCell(row, col) {
        return cy.get(`[data-column="${col}"][data-row="${row}"]`);
    }

    getCellValue(row, col) {
        return this.getCell(row, col).invoke('text');
    }

    clickCell(row, col) {
        return this.getCell(row, col).click();
    }

    clickAndAssertCell(row, col, player) {
        this.clickCell(row, col).then(() => {
            this.getCellValue(row, col).should('equal', player)
        })
    }

    getTable() {
        return cy.get('#table');
    }

    getTableRows() {
        return this.getTable().find('tr');
    }

    assertTableStructure(gridSize) {
        this.getTableRows()
            .should('have.length', gridSize)
            .each(($row) => {
                cy.wrap($row).find('td').should('have.length', gridSize);
            });
    }

    // win functions assume board size > 2, otherwise what are we doing here
    xWinHorizontally(boardSize) {
        for (let col = 0; col <= boardSize; col++) {
            this.clickAndAssertCell(0, col, 'X');
            if (col === boardSize - 1) {
                cy.log(`Expecting X to have won in ${col + 1} turns horizontally`);
                break;
            }
            // play O next to X
            this.clickAndAssertCell(1, col, 'O');
        }
    }

    oWinHorizontally(boardSize) {
        for (let col = 0; col <= boardSize; col++) {
            if (col === boardSize - 1) {
                this.clickAndAssertCell(2, col, 'X'); // X gets out of the way for O to win
                this.clickAndAssertCell(1, col, 'O');
                cy.log(`Expecting 0 to have won in ${col + 1} turns horizontally`);
                break;
            }
            this.clickAndAssertCell(0, col, 'X');
            this.clickAndAssertCell(1, col, 'O');
        }
    }

    xWinVertically(boardSize) {
        for (let row = 0; row <= boardSize; row++) {
            this.clickAndAssertCell(row, 0, 'X');
            if (row === boardSize - 1) {
                cy.log(`Expecting X to have won in ${row + 1} turns vertically`);
                break;
            }
            this.clickAndAssertCell(row, 1, 'O');
        }
    }

    oWinVertically(boardSize) {
        for (let row = 0; row <= boardSize; row++) {
            if (row === boardSize - 1) {
                this.clickAndAssertCell(row, 2, 'X'); // X gets out of way for O to win
                this.clickAndAssertCell(row, 1, 'O');
                cy.log(`Expecting O to have won in ${row + 1} turns vertically`);
                break;
            }
            this.clickAndAssertCell(row, 0, 'X');
            this.clickAndAssertCell(row, 1, 'O');
        }
    }

    xWinLeftToRight(boardSize) {
        for (let i = 0; i <= boardSize; i++) {
            this.clickAndAssertCell(i, i, 'X');
            if (i === boardSize - 1) {
                cy.log(`Expecting X to have won diagonally in ${i + 1} turns from top left to bottom right`);
                break;
            }
            this.clickAndAssertCell(i, i + 1, 'O');
        }
    }

    oWinLeftToRight(boardSize) {
        for (let i = 0; i <= boardSize; i++) {
            if (i === boardSize - 1) {
                this.clickAndAssertCell(i - 2, i, 'X'); // on last turn X moves 1 up
                this.clickAndAssertCell(i, i, 'O');
                cy.log(`Expecting O to have won diagonally in ${i + 1} turns from top left to bottom right`);
                break;
            }
            this.clickAndAssertCell(i, i +1, 'X');
            this.clickAndAssertCell(i, i, 'O');
        }
    }

    xWinRightToLeft(boardSize) {
        for (let i = 0; i <= boardSize; i++) {
            this.clickAndAssertCell(i, (boardSize - 1 - i), 'X');
            if (i === boardSize - 1) {
                cy.log(`Expecting X to have won diagonally in ${i + 1} turns from top right to bottom left`);
                break;
            }
            this.clickAndAssertCell(i, (boardSize - 2 - i), 'O');
        }
    }

        oWinRightToLeft(boardSize) {
            for (let i = 0; i <= boardSize; i++) {
                if (i === boardSize - 1) { // on last turn X moves 1 up from before
                    this.clickAndAssertCell(i - 2, boardSize - 1 - i, 'X');
                    this.clickAndAssertCell(i, (boardSize - 1 - i), 'O');
                    cy.log(`Expecting O to have won diagonally in ${i + 1} turns from top right to bottom left`);
                    break;
                }
                this.clickAndAssertCell(i, (boardSize - 2 - i), 'X');
                this.clickAndAssertCell(i, (boardSize - 1 - i), 'O');
            }
        }

}


export default gameBoard;