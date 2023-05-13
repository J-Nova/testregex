export function generation(expression, testString, flavor) {
	if (flavor === "PYTHON") {
		return `
import re

regex = r"${expression}"

test_string = ${testString}

matches = re.finditer(regex, test_str, re.MULTILINE)

for matchNum, match in enumerate(matches, start=1):
    
    print ("Match {matchNum} was found at {start}-{end}: {match}".format(matchNum = matchNum, start = match.start(), end = match.end(), match = match.group()))
    
    for groupNum in range(0, len(match.groups())):
        groupNum = groupNum + 1
        
        print ("Group {groupNum} found at {start}-{end}: {group}".format(groupNum = groupNum, start = match.start(groupNum), end = match.end(groupNum), group = match.group(groupNum)))
        `;
	} else if (flavor === "JAVASCRIPT") {
		return `
let regex = new RegExp('${expression}', 'gm');
let test_string = '${testString}';
let match;

while ((match = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (match.index === regex.lastIndex) {
        regex.lastIndex++;
    }
    
    // The result can be accessed through the match -variable.
    match.forEach((match, groupIndex) => {
        console.log(\`Found match, group \${groupIndex}: \${match}\`);
    });
}`;
	} else if (flavor === "PCRE") {
		return `
$regex = '/${expression}/gm';
$test_string = '${testString}';

preg_match_all($regex, $test_string, $matches, PREG_SET_ORDER, 0);

// Print the entire match result
var_dump($matches);`;
	} else if (flavor === "JAVA") {
		return `
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Example {
    public static void main(String[] args) {
        final String regex = "${expression}";
        final String test_string = "${testString}";
        
        final Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);
        final Matcher matcher = pattern.matcher(test_string);
        
        while (matcher.find()) {
            System.out.println("Full match: " + matcher.group(0));
            
            for (int i = 1; i <= matcher.groupCount(); i++) {
                System.out.println("Group " + i + ": " + matcher.group(i));
            }
        }
    }
}
        `;
	}
}
