function putPrefix(e, n, t) {
    e[n] || (e[n] = ""),
        e[n] = t + e[n]
}
function putSuffix(e, n, t) {
    e[n] || (e[n] = ""),
        e[n] += t
}
function jsMatch(data) {
    console.log(data);
    for (var expression_results, 
        expression = new RegExp(data.regex, data.options), 
        s = [], 
        a = !0, 
        i = -1 === data.options.indexOf("g"), 
        f = 0, 
        x = []; 
        expression_results = expression.exec(data.regexText);
        ) {
        console.log(expression_results, "n");
        console.log(s, "s")
        console.log(a, "a")
        console.log(i, "i")
        console.log(f, "f")
        console.log(x, "x")
        console.log(expression_results, "n")

        expression_results.index == expression.lastIndex && expression.lastIndex++;
        for (var o = [], p = 0; p < expression_results.length; p++)
            o.push({ content: expression_results[p] });



        if (s[f++] = o, "" === expression_results[0])
            putPrefix(x, expression_results.index, '<span class="match_99">&nbsp;</span>');
        else {
            var l = (a = !a) ? "match0_2" : "match0",
                r = s.length - 1 + ";" + expression_results.index + ";" + (
                    expression_results.index + expression_results[0].length
                ) + ";0;";
            putSuffix(x, expression_results.index, '<span data-tooltip="' + r + '" class="' + l + '">'),
                putPrefix(x, expression_results.index + expression_results[0].length, "</span>")
        }
        if (i)
            break





    }
    return { result: s, hl: x }
}
self.onmessage = function (test_data) {
    self.postMessage("onload");
    let result = jsMatch(test_data.data);
    console.log(result, "result")
    self.postMessage(result)
};
