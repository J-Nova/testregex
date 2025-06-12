import { writable } from "svelte/store";

const matchCodes = {
	0: "No match",
	1: "Match found",
	2: "Error",
	3: "-",
	4: "Working..",
};

const colorCodes = {
	0: "--no-match-status-color",
	1: "--match-status-color",
	2: "--error-status-color",
	3: "--base-status-color",
};

class Editor {
	constructor() {
		this.explainTimeout = 2000;
		this.matchTimeout = 2000;
		this.showToolTips = true;
		this.visualizeSpecialCharacters = true;

		this.statusColor = "--base-status-color";
		this.matchStatus = 3;
	}

	getMatchStatus() {
		return matchCodes[this.matchStatus];
	}

	updateMatchStatus(status) {
		this.matchStatus = status;
		this.statusColor = colorCodes[this.matchStatus];
	}
}

class Test {
	constructor() {
		this.expression = "";
		this.testString = "";
		this.flavor = "PCRE";
		this.flags = ["g", "m"];
		this.delimiter = "/";
	}

	getFlags() {
		return this.flags.sort().join("");
	}
}

class MatchData {
	constructor() {
		this.astTree = {};
		this.testHighlight = [];
		this.expressionHighlight = [];
		this.information = "Detailed match information will be displayed here automatically.";
		this.result = {};
	}

	clear() {
		this.astTree = {};
		this.testHighlight = [];
		this.expressionHighlight = [];
		this.information = "Detailed match information will be displayed here automatically.";
		this.result = {};
	}
}

export let editor = writable(new Editor());
export let test = writable(new Test());
export let match = writable(new MatchData());

class Theme {
	constructor() {
		this.darkMode = false;
	}

	clear() {
		this.darkMode = false;
	}

	// Add this method
	toggleDarkMode() {
		this.darkMode = !this.darkMode;
	}
}

export let theme = writable(new Theme())