import { writable } from 'svelte/store';

const match_codes = {
    0: "No match",
    1: "Match found",
    2: "Error",
    3: "-"
};

const editor_codes = {
    0: "View mode",
    1: "Edit mode",
    2: "-"
}

const color_codes = {
    0: "--no-match-status-color",
    1: "--match-status-color",
    2: "--error-status-color",
    3: "--base-status-color",
}

class Editor {
    constructor(){
        this.editorLockTimeout = 500;
        this.showToolTips = true;
        this.visualizeSpecialCharacters = false;
        this.explain_timeout = 2000;
        this.match_timeout = 2000;

        this.editor_status = 2;
        this.test_status = 2;

        this.status_color = "--base-status-color";
        this.match_status = 3;
    }
    getMatchStatus(){
        return match_codes[this.match_status];
    }

    updateMatchStatus(status){
        this.match_status = status;
        this.status_color = color_codes[this.match_status];
    }

    getEditorStatus(){
        return editor_codes[this.editor_status];
    }
}


class Test {
    constructor(){
        this.expression = "";
        this.test_string = "";
        this.flavor = "PCRE";
        this.flags = ["g", "m"];
        this.delimiter = "/";
    }
}


class MatchData {
    constructor(){
        this.content = [];
        this.ast_tree = {};
        this.test_highlight = {};
        this.expression_highlight = {};
        this.information = "Detailed match information will be displayed here automatically.";
    }
}


export let editor = writable(new Editor());
export let test = writable(new Test());
export let match_data = writable(new MatchData());
