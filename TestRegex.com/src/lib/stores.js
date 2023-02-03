import { writable } from 'svelte/store';

export let expressionString = writable("");
export let testString = writable("");
export let flags = writable(["g", "m"]);
export let flavor = writable("PCRE");
export let delimiter = writable("/");
export let status = writable("");
export let editor_status = writable("");
export let information_message = writable("Detailed match information will be displayed here automatically.");
export let match_data_list = writable([]);
export let MatchAstTree = writable({});
export let matchTextColor = writable("base");
export let editorLockTimeout = writable(3000);