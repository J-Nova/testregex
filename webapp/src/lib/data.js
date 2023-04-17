export const FLAVORS = {
    "PCRE": {
        "start": ":",
        "flags": [
            {"g": {full:"global", desc: "Don't return after the first match"}},
            {"m": {full:"multi line", desc: "^ and $ match start/end of file"}},
            {"i": {full:"insensitive", desc:"Case insensitive match"}},
            {"x": {full:"extended", desc:"Ignore whitespace"}},
            {"s": {full:"single line", desc: "Dot matches newline"}},
            {"u": {full:"unicode", desc: "Match with full unicode"}},
            {"U": {full:"ungreedy", desc: "Make quantifiers lazy"}}, 
            {"A": {full:"anchored", desc: "Anchor to the start of pattern or at the end of most recent match"}},
            {"J": {full:"jchanged", desc: "Allow duplicate subpattern names"}},
            {"D": {full:"dollar end only", desc: "$ matches only end of pattern"}}
        ],
        "delimiters": ["/", "~", "@", ";", "%", "`", "#"]

    },
    "JAVASCRIPT": {
        "start": "",
        "flags":[
        {"g": {full:"global", desc: "Don't return after the first match"}},
        {"m": {full:"multi line", desc:"^ and $ match start/end of file"}},
        {"i": {full:"insensitive", desc:"Case insensitive match"}},
        {"y": {full:"sticky", desc:"Anchor to the start of pattern or at the end of most recent match"}},
        {"u": {full:"unicode", desc:"Match with full unicode"}},
        {"d": {full:"indices", desc:"Returns match indices"}},
        {"s": {full:"single line", desc:"Dot matches newline"}}
        ],
        "delimiters": ["/", "`", '"', "'"]
    },
    "PYTHON": {
        "start": "r",
        "flags": [
        {"g": {full:"global", desc: "Don't return after the first match"}},
        {"m": {full:"multi line", desc: "^ and $ match start/end of file"}},
        {"i": {full:"insensitive", desc: "Case insensitive match"}},
        {"u": {full:"unicode", desc: "Match with full unicode"}},
        {"s": {full:"single line", desc: "Dot matches newline"}},
        {"x": {full:"extended", desc: "Ignore whitespace"}},
        {"a": {full:"ascii", desc: "Make escape sequences perform ASCII only matching"}}
        ],
        "delimiters": ['"', "'", '"""', "'''"]
    },
    "JAVA": {
        "start": "",
        "flags":[
        {"g": {full:"global", desc: "Don't return after the first match"}},
        {"m": {full:"multi line", desc: "^ and $ match start/end of file"}},
        {"i": {full:"insensitive", desc: "Case insensitive match"}},
        {"s": {full:"single line", desc: "Dot matches newline"}},
        {"u": {full:"unicode case", desc: "Case insensitive matching, affects unicode characters aswell"}},
        {"x": {full:"extended", desc: "Ignore whitespace"}},
        {"U": {full:"Unicode matching", desc: "Enabled unicode support for predefined classes"}},
        ],
        "delimiters": ['"']
    }
}