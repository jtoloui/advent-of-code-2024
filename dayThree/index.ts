import bun from "bun";

console.time("total");

const MATCHER = /(?:mul\(\d+,\d+\))/gm;
const DOS_DONTS_MATCHER = /(do\(\))|(don't\(\))|(mul\(\d+,\d+\))/gm;

const data = await bun.file("dayThree/input.txt").text();
const lines = data.trim();

async function multiplyByMatch() {
	console.time("multiplyByMatch");

	const matched = lines.match(MATCHER);

	if (!matched) {
		console.error("No matches found");
		return;
	}

	let total = 0;

	for (const match of matched) {
		const [a, b] = match.slice(4, -1).split(",");
		const result = Number(a) * Number(b);

		total += result;
	}

	console.log(total);

	console.timeEnd("multiplyByMatch");
}

async function removeDosAndDonts() {
	console.time("removeDosAndDonts");
	const matched = lines.matchAll(DOS_DONTS_MATCHER);

	if (!matched) {
		console.error("No matches found");
		return;
	}

	let mulEnabled = true;
	const validInstructions = [];

	let sum = 0;

	for (const match of matched) {
		const [fullMatch, doInstr, dontInstr, mulInstr] = match;

		if (doInstr) {
			mulEnabled = true;
		} else if (dontInstr) {
			mulEnabled = false;
		} else if (mulInstr && mulEnabled) {
			validInstructions.push(mulInstr);
		}

		for (const instr of validInstructions) {
			const [a, b] = instr.slice(4, -1).split(",");
			const result = Number(a) * Number(b);

			sum += result;
		}
	}
	console.log(sum);

	console.timeEnd("removeDosAndDonts");
}

multiplyByMatch().catch(console.error);
removeDosAndDonts().catch(console.error);

console.timeEnd("total");
