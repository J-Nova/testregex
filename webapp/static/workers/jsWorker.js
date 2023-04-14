function jsMatch(data) {
    for (var expression_results, 
        expression = new RegExp(data.regex, data.options), 
        result = [], 
        group_number = 0,
        match_number = 0;
        expression_results = expression.exec(data.regexText);
        ) {
            expression_results.index == expression.lastIndex && expression.lastIndex++;
            
            for (var result_data = [], index = 0; index < expression_results.length; index++){
                result_data[index]  = {
                    content: expression_results[index],
                    start: expression_results.index+index,
                    end: index > 0 ? (expression_results.index + expression_results[index].length)+1 : (expression_results.index + expression_results[index].length),
                };
                
                // found expressions is greater than one meaning there are groups.
                if (index > 0){
                    result_data[index].name = Object.keys(expression_results.groups)[index-1];
                    group_number += 1;
                    result_data[index].group_number = group_number;
                }
        }
        
        result[match_number++] = result_data; 
    }
    return { catastrophic: false, highlighter: result }
}

var debug = true;

self.onmessage = function (test_data) {
    self.postMessage("onload");
    let result = jsMatch(test_data.data);
    debug && console.log(result, "result")
    self.postMessage(result)
};
