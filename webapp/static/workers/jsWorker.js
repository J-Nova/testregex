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
            let match_data = {
                content: match[index],
                group_number: index,
                name: groupName,
                start: start_index,
                end: end_index
            };
            sub_result.push(match_data)
        }
        result.push(sub_result)
        if (!global) break; 
    }
    return {
        highlighter: result
    }
}

function jsMatch(test_data) {
    try {
        let start_time = performance.now();
        let result = executeExpression(test_data.data.regex, test_data.data.options, test_data.data.regexText);
        result.time = performance.now() - start_time;
        return result;
    } catch (e) {
        return{error: e.message}
    }
}

var debug = true;
self.onmessage = function(test_data) {
    self.postMessage("onload")
    let result = jsMatch(test_data);
    debug && console.log(result, "result")
    self.postMessage(result);
}
