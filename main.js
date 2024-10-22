#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
    fuelIncrease() {
        this.fuel = 100;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    fuelDecrease() {
        this.fuel -= 25;
    }
}
let player = await inquirer.prompt([
    {
        name: "name",
        type: "input",
        message: chalk.green("Please enter your name: \n"),
    },
]);
let opponent = await inquirer.prompt([
    {
        name: "select",
        type: "list",
        message: chalk.green("Select your Opponent:\n"),
        choices: ["Vampire", "Werewolf", "Zombie"],
    },
]);
let P1 = new Player(player.name);
let o1 = new Opponent(opponent.select);
do {
    let ask = await inquirer.prompt([
        {
            name: "opt",
            type: "list",
            message: chalk.green("What would you like to do?"),
            choices: ["Attack", "Drink Potion", "Run for your life..."],
        },
    ]);
    if (ask.opt == "Attack") {
        let num = Math.floor(Math.random() * 2);
        if (num > 0) {
            P1.fuelDecrease();
            console.log(chalk.red(`${P1.name}'s fuel is ${P1.fuel}`));
            console.log(chalk.green(`${o1.name}'s fuel is ${o1.fuel}`));
            if (P1.fuel <= 0) {
                console.log(chalk.blue("You lose, Better luck next time.."));
                process.exit();
            }
        }
        else {
            o1.fuelDecrease();
            console.log(chalk.blueBright(`${P1.name}'s fuel is ${P1.fuel}`));
            console.log(chalk.gray(`${o1.name}'s fuel is ${o1.fuel}`));
            if (o1.fuel <= 0) {
                console.log(chalk.magenta("Congratulations you won!"));
                process.exit();
            }
        }
    }
    else if (ask.opt == "Drink Potion") {
        P1.fuelIncrease();
        console.log(chalk.red(`You drank a health potion. Your fuel is ${P1.fuel}`));
    }
    else if (ask.opt == "Run for your life...") {
        console.log(chalk.redBright("You lose, Better luck next time.."));
        process.exit();
    }
} while (true);
