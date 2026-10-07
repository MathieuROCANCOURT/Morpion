import { Case } from "./Case.js";

class Morpion {
	private readonly grid: Case[][] = Array.from({ length: 3 }, () => new Array(3).fill(Case.VOID));
	private currentPlayer: Case.CIRCLE | Case.CROSS = Case.CIRCLE;
	private isWinner: boolean = false;

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

					if (this.isWinner) {
						alert(`🎉 Player ${this.checkWinner()} wins!`);
						return;
					}

					currentRow[col] = this.currentPlayer;
					button.textContent = this.currentPlayer;

					const winner = this.checkWinner();

					if (winner) {
						this.isWinner = true;
						alert(`🎉 Player ${winner} wins!`);
						return;
					}

					this.currentPlayer = this.currentPlayer === Case.CIRCLE ? Case.CROSS : Case.CIRCLE;
				});

				container.appendChild(button);
			}
		}
	}

	checkWinner(): Case | null {
		for (let row = 0; row < 3; row++) {
			if (
				this.grid[row]![0] !== Case.VOID &&
				this.grid[row]![0] === this.grid[row]![1] &&
				this.grid[row]![1] === this.grid[row]![2]
			) {
				return this.grid[row]![0] ?? null;
			}
		}

		for (let col = 0; col < 3; col++) {
			if (
				this.grid[0]![col] !== Case.VOID &&
				this.grid[0]![col] === this.grid[1]![col] &&
				this.grid[1]![col] === this.grid[2]![col]
			) {
				return this.grid[0]![col] ?? null;
			}
		}

		if (
			this.grid[0]![0] !== Case.VOID &&
			this.grid[0]![0] === this.grid[1]![1] &&
			this.grid[1]![1] === this.grid[2]![2]
		) {
			return this.grid[0]![0] ?? null;
		}

		if (
			this.grid[0]![2] !== Case.VOID &&
			this.grid[0]![2] === this.grid[1]![1] &&
			this.grid[1]![1] === this.grid[2]![0]
		) {
			return this.grid[0]![2] ?? null;
		}

		return null;
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const morpion = new Morpion();
	morpion.createButtonGrid();
});
