import { writable } from 'svelte/store';
// Reexport your entry components here
export const match_status = {
    0: "No match",
    1: "Match found",
    2: "Error",
};

export const FLAVORS = ["PCRE"]

export let storeFE = writable({});