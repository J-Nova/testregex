import { writable } from 'svelte/store';

const match_codes = {
    0: "No match",
    1: "Match found",
    2: "Error",
    3: "-",
    4: "Working.."
};

const color_codes = {
    0: "--no-match-status-color",
    1: "--match-status-color",
    2: "--error-status-color",
    3: "--base-status-color",
}

class Editor {
    constructor(){
        this.editorLockTimeout = 2000;
        this.explain_timeout = 2000;
        this.match_timeout = 2000;
        this.showToolTips = true;
        this.visualizeSpecialCharacters = false;

        this.editor_lock = true;
        this.test_lock = true;

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
}


class Test {
    constructor(){
        this.expression = "";
        this.test_string = "";
        this.flavor = "PCRE";
        this.flags = ["g", "m"];
        this.delimiter = "/";
    }

    getFlags(){
        return this.flags.join("");
    }
}


class MatchData {
    constructor(){
        this.ast_tree = {};
        this.test_highlight = [];
        this.expression_highlight = [];
        this.information = "Detailed match information will be displayed here automatically.";
    }

    clear(){
        this.ast_tree = {};
        this.test_highlight = [];
        this.expression_highlight = []; 
        this.information = "Detailed match information will be displayed here automatically.";
    }
}


export let editor = writable(new Editor());
export let test = writable(new Test());
export let match_data = writable(new MatchData());