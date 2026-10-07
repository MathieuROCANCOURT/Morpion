import { Case } from "./Case.js";

class Morpion {
	private readonly grid: Case[][];
	private currentPlayer: Case.CIRCLE | Case.CROSS = Case.CIRCLE;

	constructor() {
		this.grid = Array.from({ length: 3 }, () => new Array(3).fill(Case.VOID));
	}

	createButtonGrid(): void {
		let container = document.getElementById("root");

		if (!container) {
			console.error("Container #root not found");
			return;
		}

		container.innerHTML = "";
		container.className = "grid grid-cols-3 w-fit mx-auto mt-8";

		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				const button = document.createElement("button");
				button.className = "w-24 h-24 border border-gray-500 text-3xl font-bold bg-white hover:bg-gray-100";

				button.addEventListener("click", () => {
					const currentRow = this.grid[row];

					if (currentRow?.[col] !== Case.VOID) {
						return;
					}

					currentRow[col] = this.currentPlayer;
					button.textContent = this.currentPlayer;

					this.currentPlayer = this.currentPlayer === Case.CIRCLE ? Case.CROSS : Case.CIRCLE;

					console.table(this.grid);
				});

				container.appendChild(button);
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("Morpion loaded");

	const morpion = new Morpion();
	morpion.createButtonGrid();
});
