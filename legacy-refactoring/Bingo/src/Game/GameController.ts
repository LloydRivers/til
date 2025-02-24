import readline from "node:readline";
import { BingoCard } from "../Card/BingoCard";

export class GameController {
  private bingoCard: BingoCard;

  constructor() {
    this.bingoCard = new BingoCard(5, 5);
  }

  startGame(): void {
    console.log("Starting game");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      "What type of bingo would you like to play? (1 for UK bingo) ",
      (answer) => {
        if (answer === "1") {
          console.log("Starting UK Bingo!");
          this.bingoCard.startGame();
        }
        rl.close();
      }
    );
  }
}
