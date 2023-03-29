import { writable } from 'svelte/store';

export let expressionString = writable("");
export let testString = writable("");

export let match_status = writable(3);
export let editor_status = writable(2);
export let status_color = writable("--base-status-color");
export let information_message = writable("Detailed match information will be displayed here automatically.");
export let match_data_list = writable([]);
export let MatchAstTree = writable({});

export let editorLockTimeout = writable(500);
export let showToolTips = writable(true);
export let visualizeSpecialCharacters = writable(false);

export let flavor = writable("PCRE");
export let flags = writable(["g", "m"]);
export let delimiter = writable("/");

export const match_codes = {
    0: "No match",
    1: "Match found",
    2: "Error",
    3: "-"
};

export const editor_codes = {
    0: "View mode",
    1: "Edit mode",
    2: "-"
}