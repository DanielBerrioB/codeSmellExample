export class Game {
    private _lastSymbol: string = ' ';
    private _board: Board = new Board();

    /**
     * This functions allows to play for two players,
     * if any invalid movement has ocurred it throws an exception
     * otherwise it updates the game state.
     * @param symbol New symbol for the player
     * @param x x postion
     * @param y y position
     */
    public Play(symbol: string, x: number, y: number): void {
        if (this._lastSymbol == ' ') {
            if (symbol == 'O') {
                throw new Error("Invalid first player");
            }
        } else if (symbol == this._lastSymbol) {
            throw new Error("Invalid next player");
        } else if (this._board.TileAt(x, y).Symbol != ' ') {
            throw new Error("Invalid position");
        }

        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, x, y);
    }

    public Winner(): string {
        const checkIfAnyIsEmpty = (row: number): boolean => {
            for (let i = 0; i < 3; i++) {
                if (this._board.TileAt(row, i)!.Symbol === ' ') {
                    return false;
                }
            }
            return true;
        }

        const checkIfAnyIsEqual = (): string => {
            for (let i = 0; i < 3; i++) {
                if (checkIfAnyIsEmpty(i)) {
                    const firstColumn = this._board.TileAt(i, 0)!.Symbol == this._board.TileAt(i, 1)!.Symbol;
                    const secondColumn = this._board.TileAt(i, 2)!.Symbol == this._board.TileAt(i, 1)!.Symbol
                    if (firstColumn && secondColumn) {
                        return this._board.TileAt(i, 0)!.Symbol;
                    }
                }
            }
            return ' ';
        }

        return checkIfAnyIsEqual();
    }
}

interface Tile {
    X: number;
    Y: number;
    Symbol: string;
}

class Board {
    private _plays: Tile[] = [];

    constructor() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const tile: Tile = { X: i, Y: j, Symbol: " " };
                this._plays.push(tile);
            }
        }
    }

    public TileAt(x: number, y: number): Tile {
        return this._plays.find((t: Tile) => t.X == x && t.Y == y)!
    }

    public AddTileAt(symbol: string, x: number, y: number): void {
        this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
    }
}