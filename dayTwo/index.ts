import bun from "bun";

console.time("total");

const data = await bun.file("dayTwo/input.txt").text();
const lines = data.trim().split("\n");
const array = parseLinesToArrays(lines);

async function safeReadings() {
	console.time("safeReadings");

	let safeReportsCount = 0;
	let safeReportsWithRemovalCount = 0;

	for (const report of array) {
		if (isSafe(report, false)) {
			safeReportsCount++;
			safeReportsWithRemovalCount++;
		} else if (isSafe(report, true)) {
			safeReportsWithRemovalCount++;
		}
	}

	console.log(safeReportsCount, safeReportsWithRemovalCount);

	console.timeEnd("safeReadings");
}
function isSafe(report: number[], allowSingleRemoval = false): boolean {
	// Helper function to check if a report is strictly increasing or decreasing
	function checkStrictly(report: number[]): boolean {
		let isIncreasing = true;
		let isDecreasing = true;

		for (let i = 0; i < report.length - 1; i++) {
			const diff = report[i + 1] - report[i];

			if (diff < -3 || diff > 3 || diff === 0) {
				return false;
			}

			if (diff > 0) isDecreasing = false;
			if (diff < 0) isIncreasing = false;
		}

		return isIncreasing || isDecreasing;
	}

	if (checkStrictly(report)) {
		return true;
	}

	// If single removal is allowed, try removing each level one at a time
	if (allowSingleRemoval) {
		for (let i = 0; i < report.length; i++) {
			const modifiedReport = [...report.slice(0, i), ...report.slice(i + 1)];
			if (checkStrictly(modifiedReport)) {
				return true;
			}
		}
	}

	return false;
}

function parseLinesToArrays(lines: string[]): number[][] {
	const readings: number[][] = [];

	for (const line of lines) {
		const numbers = line.split(" ").map(Number);
		readings.push(numbers);
	}

	return readings;
}

safeReadings().catch(console.error);

console.timeEnd("total");
