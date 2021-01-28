const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {
    constructor(field) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.gameOn = true;
        // Set home position before game starts
        this.field[0][0] = pathCharacter;
    }

    // Conditions for game to work plus starting view
    playGame() {
        while (this.gameOn === true) {
            this.print();
            this.promptUser();
        }
    }

    promptUser() {
        if(this.gameOn === true) {
            const input = prompt('Which way?');
            if (input === 'u') {
                this.locationY -= 1;
            } else if (input === 'd') {
                this.locationY += 1;
            } else if (input === 'l') {
                this.locationX -= 1;
            } else if (input === 'r') {
                this.locationX += 1;
            } else {
                console.log('You must enter U, D, L or R');
            }
            this.movePosition();
            this.print();
            this.promptUser();
        }
        
    }

    // Update position and set valid moves
    movePosition() {
        if (this.gameOn === true) {

            if (this.field[this.locationY][this.locationX] === fieldCharacter) {
                this.field[this.locationY][this.locationX] = pathCharacter;
            } else if (this.field[this.locationY][this.locationX] === hole) {
                console.log('Oops, you fell down a hole!');
                this.gameOn = false;
            } else if (this.field[this.locationY][this.locationX] === hat) {
                //this.field[this.locationY][this.locationX] = hat;
                console.log('Congrats, you found your hat!');
                this.gameOn = false;
            } else if (!this.isInBounds()) {
                console.log('Oops, you left the field!');
                this.gameOn = false;
            }
        }
        
    }

    
    isInBounds() {
        this.field[this.locationY][this.locationX];
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }

    print() {
        if (this.gameOn === true) {
            const fieldPrint = this.field.map(row => row.join('')).join('\n');
            console.log(fieldPrint);
        } 
    }


    static generateField(height, width, percentage) {
        const field = new Array(height).fill(0).map(element => new Array(width));
        for (let i = 0; i < field.length; i++) {
            for (let j = 0; j < field[i].length; j++) {
                field[i][j] = fieldCharacter;
            }
        }

        // Fill some spaces with holes
        let fieldSize = height * width;
        const numHoles = Math.floor(fieldSize * (percentage/100));
        let holeCount = 0;
        
        
        while (holeCount <= numHoles) {
            const randomRow = Math.floor(Math.random() * height);
            const randomCol = Math.floor(Math.random() * width);
            if (field[randomRow][randomCol] === fieldCharacter) {
                field[randomRow][randomCol] = hole;
            }
            holeCount++;
        }

        // Create random space for hat
        let hatCount = 0;
        while (hatCount < 1) {
            const randomRow = Math.floor(Math.random() * height);
            const randomCol = Math.floor(Math.random() * width);
            if (field[randomRow][randomCol] !== field[0][0]) {
                if (field[randomRow][randomCol] === fieldCharacter || field[randomRow][randomCol] === hole) {
                    field[randomRow][randomCol] = hat;
                }
                hatCount++;
            }
        }
        
        field[0][0] = pathCharacter;
        return field;
    }
}

const randomField = Field.generateField(10, 10, 20);

const myField = new Field(randomField);
myField.playGame();

/*
Have the character start on a random location that’s not the upper-left corner.
Create a “hard mode” where one or more holes are added after certain turns.
Improve your game’s graphics and interactivity in the terminal. There are many helpful packages to assist with this, and you can really get creative with how you approach terminal games. (Terminal pack)
Create a field validator to ensure that the field generated by Field.generateField() can actually be solved. This might be pretty difficult! You’ll essentially be creating a version of a maze solver. (Maze solver)
*/