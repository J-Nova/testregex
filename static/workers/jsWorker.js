importScripts('./classes.js');

function executeExpression(regex, flags, testString) {
    !flags.includes("d") && (flags += "d");

    let expression = new RegExp(regex, flags)
        , result = []
        , global = flags.includes("g");
    let match;
    while ((match = expression.exec(testString)) !== null) {
        match.index === expression.lastIndex && expression.lastIndex++;
        let subResult = [];
        for (let index = 0; index < match.length; index++) {
            let startIndex, endIndex, groupName;
            // Check if there are groups and group names.
            if (match.groups && Object.keys(match.groups).length > 0) {
                groupName = Object.keys(match.groups).find(key => match.groups[key] === match[index]);
            }
            // Make sure there are match indices
            match.indices !== null && match.indices[index] !== null  ? (startIndex = match.indices[index][0],
            endIndex = match.indices[index][1]) : 0 === index && (startIndex = match.index,
            endIndex = match.index + match[0].length);
            let content = match[index];
            let matchData = new Match(content, index, groupName, startIndex, endIndex);
            subResult.push(matchData)
        }
        result.push(subResult)
        if (!global) break; 
    }
    return result;
}

function jsMatch(testData) {
    try {
        let startTime = performance.now();
        let result = executeExpression(testData.data.regex, testData.data.options, testData.data.regexText);
        let endTime = performance.now() - startTime;
        return new Result(result, endTime, undefined, undefined);
    } catch (e) {
        let error = new MatchError(e.message);
        return error
    }
}

self.onmessage = function(testData) {
    self.postMessage("onload")
    let result = jsMatch(testData);
    debug && console.log(result, "result")
    self.postMessage(result);
}
