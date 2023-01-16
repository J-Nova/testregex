// @ts-nocheck
import regexpTree from 'regexp-tree';

export function explainRegex(test_data){
    try {
        let regex = new RegExp(test_data.regex, test_data.options);
    
        let astTree = regexpTree.parse(regex, {allowGroupNameDuplicates: true});
        regexpTree.traverse(astTree, {
            
            Char: { // Adds explanations to Chars
                post({node}) {
                    if (node.kind === "meta") {
                        if (node.value === "\\w") node.explanation = "Matches any word character [a-zA-Z0-9_]"
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
                    let greedy;
                    if (node.greedy) greedy = "Greedy"
                    else greedy = "Non-greedy";
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
                    console.log(node)
                    node.explanation = "Matches repeated data by the expressions list"
            }},
    
            Alternative: { // Adds explanations to Alternatives (Multiple expressions)
                post({node}){
                    node.explanation = "Matches data by expressions below"
            }}
        })
        return astTree
    } catch (err) {
        return false
    }
}

export function optimizeRegex(expression){
    let optimizedExpression = regexpTree.optimize(expression).toRegExp();
    return optimizedExpression
}

export function transpileExpression(expression){
    let transpiledExpression = regexpTree.compatTranspile(expression).toRegExp();
    return transpiledExpression
}

// function explainExpression(regexExpression) {
//     // Go over all characters in the expression

//     for (var index = 0; index < regexExpression.length;){
//         var currentCharacter = regexExpression.charAt(index);
        
//         switch(currentCharacter){
//             case "\\": {
//                 let result;
//                 result = anchors()
//                 result = classes()
//                 result = characters()
//                 // Check anchors
//                 // Check classes
//                 // Check Special characters
//             }
//         }
//     }

//     function nextCharacter(){
//         let nextIndex = index +1;
//         return regexExpression.charAt(nextIndex)
//     }

//     function anchors(){
//         // explain anchors and boundaries
//         // https://www.rexegg.com/regex-quickstart.html#anchors
//         if (currentCharacter === "\\") {
//             let next = nextCharacter();
//             if (next === "A") return "Start of string";
//             else if (next === "Z") return "End of string";
//             else if (next === "b") return "Word boundary";
//             else if (next === "B") return "Not word boundary";
//             else if (next === "G") return "End of the previous match";
//             else if (next === "<") return "Start of word";
//             else if (next === ">") return "End of word";
//         } else {
//             if (currentCharacter === "^") return "Start of string, or start of line in multi-line pattern";
//             else if (currentCharacter === "$") return "End of string, or end of line in multi-line pattern";
//         }
//     }

//     function characters(){
//         // Explain character things
//         // https://www.rexegg.com/regex-quickstart.html#chars
//         // https://www.rexegg.com/regex-quickstart.html#morechars
//         if (currentCharacter === "\\"){
//             let next = nextCharacter();
//             if (next === "w") return "Word - [a-zA-­Z0-9_]";
//             else if (next === "W") return "Non-word - [^a-zA­-Z0-9_]";
//             else if (next === "d") return "Digit - [0-9]";
//             else if (next === "D") return "Non-digit - [^0-9]";
//             else if (next === "s") return "Whitespace - [\/f\/t/­\/x0b\/n\/r]";
//             else if (next === "S") return "Non-whitespace - [^\/f\/t/­\/x0b\/n\/r]";
//             else if (next === "x") return "Hexadecimal";
//             else if (next === "O") return "Octal digit";
//         } else if (currentCharacter === ".") {
//             return "Any character (except new line \/n)";
//         }
//     }
    
//     function quantifiers(){
//         // Explain quantifiers
//         // https://www.rexegg.com/regex-quickstart.html#quantifiers
//         // https://www.rexegg.com/regex-quickstart.html#morequants
//     }
    
//     function logic(){
//         // Explain logic operators
//         // https://www.rexegg.com/regex-quickstart.html#logic
//     }
    
//     function whitespace(){
//         // explain whitespace
//         // https://www.rexegg.com/regex-quickstart.html#whitespace
//     }
    
//     function classes(){
//         // Explain classes
//         // https://www.rexegg.com/regex-quickstart.html#classes
//     }
    
    
//     function posix(){
//         // Explain posix classes
//         // https://www.rexegg.com/regex-quickstart.html#anchors
//     }
    
//     function modifiers(){
//         // explain modifiers
//         // https://www.rexegg.com/regex-quickstart.html#modifiers
//     }
    
//     function lookArounds(){
//         // Explain lookarounds
//         // https://www.rexegg.com/regex-quickstart.html#lookarounds
//     }
    
//     function classOperations(){
//         // explain classoperations
//         // https://www.rexegg.com/regex-quickstart.html#classoperations
//     }
    
//     function otherSyntax(){
//         // explain otherSyntax
//         // https://www.rexegg.com/regex-quickstart.html#other
//     }
    
//     function backreference(){
//         // explain a backreference
//     }
// }
