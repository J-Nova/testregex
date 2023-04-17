importScripts('./classes.js');

function executeExpression(regex, flags, test_string) {
    !flags.includes("d") && (flags += "d");

    let expression = new RegExp(regex,flags)
        , result = []
        , global = flags.includes("g");
    let match;
    while ((match = expression.exec(test_string)) !== null) {
        match.index === expression.lastIndex && expression.lastIndex++;
        let sub_result = [];
        for (let index = 0; index < match.length; index++) {
            let start_index, end_index, groupName;
            // Check if there are groups and group names.
            if (match.groups && Object.keys(match.groups).length > 0) {
                groupName = Object.keys(match.groups).find(key => match.groups[key] === match[index]);
            }
            // Make sure there are match indices
            null != match.indices && null != match.indices[index] ? (start_index = match.indices[index][0],
            end_index = match.indices[index][1]) : 0 === index && (start_index = match.index,
            end_index = match.index + match[0].length);

            let match_data = new Match(match[index], index, groupName, start_index, end_index);
            sub_result.push(match_data)
        }
        result.push(sub_result)
        if (!global) break; 
    }
    return result;
}

function jsMatch(test_data) {
    try {
        let start_time = performance.now();
        let result = executeExpression(test_data.data.regex, test_data.data.options, test_data.data.regexText);
        return new Result(result, performance.now() - start_time, undefined, undefined);
    } catch (e) {
        let error = new MatchError(e.message);
        return error
    }
}

self.onmessage = function(test_data) {
    self.postMessage("onload")
    let result = jsMatch(test_data);
    debug && console.log(result, "result")
    self.postMessage(result);
}
