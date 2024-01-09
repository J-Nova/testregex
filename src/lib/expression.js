// @ts-nocheck
export function generateTooltips(expressions, expression_string) {
	let tooltips = [];

	expressions.forEach(expression => {
		// Go over each found expression.
		if (expression) {
			if (expression.expressions || expression.expression) {
				// If current expression has sub expressions, go over them.
				if (expression.type == "Repetition") {
					tooltips.push(
						...generateTooltips(
							expression.expressions || [expression.expression],
							expression_string
						)
					);
					if (expression.quantifier.kind == "Range") {
						tooltips.push(new Explanation(expression.explanation, "{", expression.type));
						tooltips.push(
							new Explanation(
								expression.quantifier.explanation,
								expression.quantifier.loc.source.slice(1, -1),
								expression.quantifier.kind
							)
						);
						tooltips.push(new Explanation(expression.explanation, "}", expression.type));
					} else {
						tooltips.push(
							new Explanation(
								expression.quantifier.explanation,
								expression.quantifier.loc.source,
								expression.quantifier.type
							)
						);
					}
				} else {
					tooltips.push(
						new Explanation(
							expression.explanation,
							expression.loc.source[0],
							expression.type
						)
					);
					tooltips.push(
						...generateTooltips(
							expression.expressions || [expression.expression],
							expression_string
						)
					);
					tooltips.push(
						new Explanation(
							expression.explanation,
							expression.loc.source.slice(-1),
							expression.type
						)
					);
				}
			} else {
				let tooltip = new Explanation(
					expression.explanation,
					expression.loc.source,
					expression.type
				);
				tooltips.push(tooltip);
			}
		}
	});
	return tooltips;
}

class Explanation {
	constructor(explanation, content, type) {
		this.explanation = explanation;
		this.content = content;
		this.type = type;
	}
}
