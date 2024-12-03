import bun from "bun";

console.time("total");

const MATCHER = /(?:mul\(\d+,\d+\))/gm;
const DOS_DONTS_MATCHER = /(do\(\))|(don't\(\))|(mul\(\d+,\d+\))/gm;

const lines = await bun.file("dayThree/input.txt").text();

async function multiplyByMatch() {
	console.time("multiplyByMatch");

	const matched = lines.match(MATCHER);

	if (!matched) {
		console.error("No matches found");
		return;
	}

	let total = 0;

	for (const match of matched) {
		const [a, b] = match.slice(4, -1).split(",").map(Number);
		total += a * b;
	}

	console.log(total);

	console.timeEnd("multiplyByMatch");
}

async function removeDosAndDonts() {
	console.time("removeDosAndDonts");
	const matched = lines.matchAll(DOS_DONTS_MATCHER);

	let mulEnabled = true;
	let sum = 0;

	for (const match of matched) {
		const [_fullMatch, doInstr, dontInstr, mulInstr] = match;

		if (doInstr) {
			mulEnabled = true;
		} else if (dontInstr) {
			mulEnabled = false;
		} else if (mulInstr && mulEnabled) {
			const [a, b] = mulInstr.slice(4, -1).split(",").map(Number);
			sum += a * b;
		}
	}

	console.log(sum);
	console.timeEnd("removeDosAndDonts");
}

multiplyByMatch().catch(console.error);
removeDosAndDonts().catch(console.error);

console.timeEnd("total");
