// @ts-nocheck
import regexpTree from 'regexp-tree';

export function explain_regex(test_data, explain_callback){
    explain_timer && clearTimeout(explain_timer),
    explain_timer = setTimeout(function () {
        let explanation = explainRegex(test_data);
        if (explanation) explain_callback(explanation);
    }, maxExplainTimeout)
}

export function explainRegex(test_data, include_locations){
    try {
        let regex = new RegExp(test_data.regex, test_data.options);
    
        let astTree = regexpTree.parse(regex, {allowGroupNameDuplicates: true, captureLocations: include_locations});
        regexpTree.traverse(astTree, {
            
            Char: { // Adds explanations to Chars
                post({node}) {
                    if (node.kind === "meta") {
                        if (node.value === "\\w") node.explanation = "Matches any word character [a-zA-Z0-9]"
                        if (node.value === "\\W") node.explanation = "Matches any non-word character [^a-zA-Z0-9_]"
                        if (node.value === "\\d") node.explanation = "Matches any digit [0-9]"
                        if (node.value === "\\D") node.explanation = "Matches any non-digit [^0-9]"
                        if (node.value === "\\s") node.explanation = "Matches any whitespace [\r\n\t\f\v \u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]"
                        if (node.value === "\\S") node.explanation = "Matches any non-whitespace [^\r\n\t\f\v \u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]"
                        if (node.value === ".") node.explanation = "Any character (except new line \n)"
                    } else if (node.kind === "simple"){
                        node.explanation = `Matches the character with Ascii code: ${node.codePoint} literally (Case-Sensitive)`
                    } 
                    else if (node.kind === "control") node.explanation = "Matches the control sequence CTRL+undefined"
                    else if (node.kind === "hex") node.explanation = `Matches the hex symbol ${node.symbol} literally (Case-Sensitive)`
                    else if (node.kind === "decimal") node.explanation = `Matches the decimal symbol ${node.symbol}`
                    else node.explanation = "No explanation available for this token. Please report your expression"
            }},
    
            Quantifier: { // Add explanations to Quantifiers
                post({node}) {
                    let greedy = node.greedy ? "Greedy" : "Non-greedy";
                    if (node.kind === "*") node.explanation = `Matches 0 or more of the previous token (${greedy})`
                    else if (node.kind === "+") node.explanation = `Matches 1 or more of the previous token (${greedy})`
                    else if (node.kind === "?") node.explanation = `Matches 0 or 1 of the previous token (${greedy})`
                    else if (node.kind === "Range") {
                        if (!node.hasOwnProperty("from")) node.from = "unlimited"
                        if (node.from == node.to) node.explanation = `Matches the previous tokens exactly ${node.to} times (${greedy})` 
                        else node.explanation = `Matches the previous tokens between ${node.from} - ${node.to} times (${greedy})` 
                    } else node.explanation = "No explanation available for this token. Please report your expression"
            }},
    
            CharacterClass: { // Adds explanations to CharacterClasses
                post({node}){
                    if (node.negative) node.explanation = "Matches a single character not present from the expressions list"
                    else node.explanation = "Matches a single character present from the expressions list"
                    let filters = node.expressions;
                    for (let i = 0; i < filters.length; i++){
                        if (filters[i].type === "ClassRange") filters[i].explanation = `Matches a single character in the range between ${filters[i].from.symbol} (index ${filters[i].from.codePoint}) and ${filters[i].to.symbol} (index ${filters[i].to.codePoint}) (case sensitive)`
                    }
            }},
    
            Disjunction: { // Adds an explanation to Disjunctions
                post({node}){
                    node.explanation = "Matches one of the alternatives";
            }},
    
            Group: { // Adds an explanation to Groups
                post({node}){
                    if (!node.capturing) {
                        node.explanation = "Non-capture group"
                    } else {
                        if (node.name) node.explanation = "Named capture group";
                        else node.explanation = "Capture group";
                    }
                    if (node.expression === null) node.explanation = node.explanation + " - Finds a zero-length match"
            }},
    
            Assertion: { // Adds explanation to Assertions
                post({node}){
                    // Check if positive or negative assertion
                    if (node.negative === true) node.explanation = "Negative";
                    else node.explanation = "Positive";
    
                    if (node.assertion){ // There are expressions supplied
                        if (node.kind === "Lookahead") node.explanation = node.explanation + " lookahead assertion that matches the regex below" 
                        else if (node.kind === "Lookbehind") node.explanation = node.explanation + " lookbehind assertion that matches the regex below"
                    } else { // No expressions are supplied
                        if (node.kind === "Lookahead") node.explanation = node.explanation + " lookahead assertion that finds a zero-length match" 
                        else if (node.kind === "Lookbehind") node.explanation = node.explanation + " lookbehind assertion that finds a zero-length match"
                    }
            }},
    
            Backreference: { //  Adds explanations to Backreferences
                post({node}){
                    node.explanation  = `Matches the same data most recently matched by capture group ${node.reference}`
            }},
    
            Repetition: { // Adds explanations to Repetitions
                post({node}){
                    node.explanation = "Matches repeated data by the expressions list"
            }},
    
            Alternative: { // Adds explanations to Alternatives (Multiple expressions)
                post({node}){
                    node.explanation = "Matches data by expressions above"
            }}
        })
        astTree.success = true;
        return astTree
    } catch (err) {
        return {error: err, success: false}
    }
}


export function generateInformation(match_content){
    let match_data = [];
    for (let i=0; i<match_content.length; i++){
        let match = match_content[i];
        for (let j=0; j<match.length; j++){
            if (match[j]){
                let match_num = i + 1;
                let group_num = match[j].group_number;
                let group_name = match[j].name !== undefined ? match[j].name : "";
                let content = match[j].content;
                let start = match[j].start;
                let end = match[j].end;
                let match_info = {
                    match_num: match_num,
                    group_num: group_num,
                    group_name: group_name,
                    start: start,
                    end: end,
                    content: content
                }
                match_data.push(match_info);
            }
        }
    }
    return match_data;
}

export function optimizeRegex(expression){
    let optimizedExpression = regexpTree.optimize(expression).toRegExp();
    return optimizedExpression
}

export function transpileExpression(expression){
    let transpiledExpression = regexpTree.compatTranspile(expression).toRegExp();
    return transpiledExpression
}

function randomColor(){
    let r = getRandomInt(85, 170);
    let g = getRandomInt(85, 170);
    let b = getRandomInt(85, 170);
    return `background-color: rgb(${r}, ${g}, ${b});`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


export function highlighter(matches, testString){
    // First loop over the whole test string. Create an object for it to contain match data for each character.
    let match_html = {};
    for (let i=0; i<testString.length; i++){
        match_html[i] = {content:testString[i], class_name:"no-match", color:""};
    }

    // Loop over all the matches.
    for (let i=0; i<matches.length; i++){
        let match = matches[i];
        for (let j=0; j<match.length; j++){
            if (match[j]){
                let current_match = match[j];
                let match_num = i + 1;
                let group_num = match[j].group_number;
                let group_name = match[j].name !== undefined ? match[j].name : "";
                let start = match[j].start;
                let end = match[j].end;
                let color = randomColor();
                // Loop over start and end range of the match to edit the data in the match_html object.
                for (let k=current_match.start; k<current_match.end; k++){
                    match_html[k].class_name = "match";
                    match_html[k].match_num = match_num;
                    match_html[k].group_num = group_num; 
                    match_html[k].group_name= group_name; 
                    match_html[k].start = start; 
                    match_html[k].end = end; 
                    match_html[k].color = color;
                }
            }
        }
    }
    return match_html
}

var maxExplainTimeout = 2000,
explain_timer