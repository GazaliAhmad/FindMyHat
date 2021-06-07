const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldBlock = "░";
const hero = "*";

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.x = 0;
    this.y = 0;
    this.gameOver = false;
    this.field[0][0] = hero;
  }

  isInBounds() {
    return (
      this.x >= 0 &&
      this.y >= 0 &&
      this.x < this.field.length &&
      this.y < this.field[0].length
    );
  }

  gameStatus() {
    let myArr = this.field;
    let status = "";

    if (this.isInBounds()) {
      let currChar = myArr[this.x][this.y];

      if (currChar === hat) {
        // Win - got the hat
        status = "You win!!! You found the hat!";
        this.gameOver = true;
      } else if (currChar === hole) {
        // Loss - Either hole or outside field
        status = "You lose!!! You fell down a hole.";
        this.gameOver = true;
      }
    } else {
      status = "Out of playing field!";
      this.gameOver = true;
    }

    console.log(status);
  }

  gameLoop() {
    // Run game until won or lost
  }

  play() {
    // move the player to any direction

    while (!this.gameOver) {
      this.print();

      let direction = prompt("Which way? w (up), s (down), a (left) or d (right) ?");
      // First letter of - Up Left Right Down
      direction = direction.toLowerCase();

      switch (direction) {
        case "d":
          this.y += 1;
          break;
        case "a":
          this.y -= 1;
          break;
        case "s":
          this.x += 1;
          break;
        case "w":
          this.x -= 1;
          break;
        default:
          console.log("Enter a valid value");
          continue;
      }

      this.gameStatus();
    }
  }

  print() {
    const myArr = this.field;
    myArr[this.x][this.y] = hero;
    for (let x of myArr) {
      console.log(x.join(""));
    }
    // console.log(myArr[1]);
  }

  static generateField(width, height, percentage = 0.1) {
    // Generate 2-dimensional array
    const field = new Array(height).fill(0).map((el) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldBlock : hole;
      }
    }

    // Setting the "hat" location
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };
    // Check if the "hat" is not at the starting point
    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;

    return field;
  }
}

const myField = new Field(Field.generateField(10, 10));
myField.play();
