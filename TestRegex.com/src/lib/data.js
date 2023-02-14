// Reexport your entry components here
export const match_status = {
    0: "No match",
    1: "Match found",
    2: "Error",
};
export const FLAVORS = {
    "PCRE": {
        "start": ":",
        "flags": [
            {"g": {"global": "Don't return after the first match"}},
            {"m": {"multi line": "^ and $ match start/end of file"}},
            {"i": {"insensitive":"Case insensitive match"}},
            {"x": {"extended":"Ignore whitespace"}},
            {"s": {"single line": "Dot matches newline"}},
            {"u": {"unicode": "Match with full unicode"}},
            {"U": {"ungreedy": "Make quantifiers lazy"}}, 
            {"A": {"anchored": "Anchor to the start of pattern or at the end of most recent match"}},{"J": {"jchanged": "Allow duplicate subpattern names"}},
            {"D": {"dollar end only": "$ matches only end of pattern"}},
            {"J": {"jchanged": "Allow duplicate subpattern names"}}
        ],
        "delimiters": ["/", "~", "@", ";", "%", "`", "#"]

    },
    "JS": {
        "start": "",
        "flags":[
        {"g": {"global": "Don't return after the first match"}},
        {"m": {"multi line": "^ and $ match start/end of file"}},
        {"i": {"insensitive":"Case insensitive match"}},
        {"y": {"sticky": "Anchor to the start of pattern or at the end of most recent match"}},
        {"u": {"unicode": "Match with full unicode"}},
        {"d": {"indices": "Returns match indices"}},
        {"s": {"single line": "Dot matches newline"}}
        ],
        "delimiters": ["/", "`", '"', "'"]
    },
    "PYTHON": {
        "start": "r",
        "flags": [
        {"g": {"global": "Don't return after the first match"}},
        {"m": {"multi line": "^ and $ match start/end of file"}},
        {"i": {"insensitive":"Case insensitive match"}},
        {"u": {"unicode": "Match with full unicode"}},
        {"s": {"single line": "Dot matches newline"}},
        {"x": {"extended":"Ignore whitespace"}},
        {"a": {"ascii": "Make escape sequences perform ASCII only matching"}}
        ],
        "delimiters": ['"', "'", '"""', "'''"]
    },
    "GO": {
        "start": "",
        "flags": [
        {"g": {"global": "Don't return after the first match"}},
        {"m": {"multi line": "^ and $ match start/end of file"}},
        {"i": {"insensitive":"Case insensitive match"}},
        {"s": {"single line": "Dot matches newline"}},
        {"U": {"ungreedy": "Make quantifiers lazy"}}
        ],
        "delimiters": ["`"]
    },
    "JAVA": {
        "start": "",
        "flags":[
        {"g": {"global": "Don't return after the first match"}},
        {"m": {"multi line": "^ and $ match start/end of file"}},
        {"i": {"insensitive":"Case insensitive match"}},
        {"s": {"single line": "Dot matches newline"}},
        {"u": {"unicode case": "Case insensitive matching, affects unicode characters aswell"}},
        {"x": {"extended":"Ignore whitespace"}},
        {"U": {"Unicode matching": "Enabled unicode support for predefined classes"}},
        ],
        "delimiters": ['"']
    },
    "C#": {
        "start": "@",
        "flags":[
        {"g": {"global": "Don't return after the first match"}},
        {"m": {"multi line": "^ and $ match start/end of file"}},
        {"i": {"insensitive":"Case insensitive match"}},
        {"s": {"single line": "Dot matches newline"}},
        {"n": {"non-capturing": "Groups are not implicitly capturing"}},
        {"R": {"Right to left": "Perform matching from right to left"}},
        {"N": {"No backtracing": "Disable backtracing when matching"}},
        {"x": {"extended":"Ignore whitespace"}}
        ],
        "delimiters": ['"']
    }
}