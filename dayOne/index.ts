import bun from "bun";

console.profile("total");
console.time("total");

const data = await bun.file("dayOne/input.txt").text();
const lines = data.trim().split("\n");
const [array1, array2] = parseLinesToArrays(lines);

async function sumOfDifferenceSmallToLarge() {
	console.time("sumOfDifferenceSmallToLarge");

	const sortedArray1 = sortArray(array1);
	const sortedArray2 = sortArray(array2);

	const diffArray = calculateDifferences(sortedArray1, sortedArray2);
	const addedArray = sumArray(diffArray);

	console.log(addedArray);
	console.timeEnd("sumOfDifferenceSmallToLarge");
}

async function sumOfOccurrence() {
	console.time("sumOfOccurrence");

	const freqMap = new Map();

	/**
	 * e.g array1 = [1, 2, 3, 4, 5, 6]
	 * e.g array2 = [3, 4, 3, 2, 1, 4]
	 *
	 * freqMap = {
	 * 	1: 1,
	 * 	2: 1,
	 * 	3: 2,
	 * 	4: 2,
	 * 	5: 1,
	 * 	6: 1,
	 * }
	 */
	for (const num of array2) {
		freqMap.set(num, (freqMap.get(num) || 0) + 1);
	}

	/**
	 * e.g array1 = [1, 2, 3, 4, 5, 6]
	 * freqMap = {
	 * 	1: 1,
	 * 	2: 1,
	 * 	3: 2,
	 * 	4: 2,
	 * 	5: 1,
	 * 	6: 1,
	 * }
	 *  1*1 + 2*1 + 3*2 + 4*2 + 5*1 + 6*1 = 1 + 2 + 6 + 8 + 5 + 6 = 28
	 */
	let sumOfAll = 0;
	for (const num of array1) {
		const count = freqMap.get(num) || 0;
		sumOfAll += num * count;
	}

	console.log(sumOfAll);
	console.timeEnd("sumOfOccurrence");
}

function parseLinesToArrays(lines: string[]): [number[], number[]] {
	const array1: number[] = [];
	const array2: number[] = [];

	for (const line of lines) {
		const [num1, num2] = line.split("  ").map(Number);
		array1.push(num1);
		array2.push(num2);
	}

	return [array1, array2];
}
function sortArray(array: number[]): number[] {
	return array.sort((a, b) => a - b);
}

function calculateDifferences(array1: number[], array2: number[]): number[] {
	return array1.map((num, index) => Math.abs(num - array2[index]));
}

function sumArray(array: number[]): number {
	return array.reduce((acc, curr) => acc + curr, 0);
}

await Promise.all([sumOfDifferenceSmallToLarge(), sumOfOccurrence()]);

console.timeEnd("total");
console.profileEnd("total");
