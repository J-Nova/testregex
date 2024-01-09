import { L as L$2, B as B$1, z as z$2, X } from './chunks/ssr-w-EXHMF7.js';
import { m as m$1, U as U$1, T, P as P$1, b, y, O as O$2, j, S } from './chunks/exports-BeBMO8FV.js';
import { l, h as h$1 } from './chunks/index-r3l1I-iv.js';

let c="",m=c;const h={base:c,assets:m};function L$1(t){c=t.base,m=t.assets;}function O$1(){c=h.base,m=h.assets;}let x={},k={};function D$1(t){x=t;}function G(t){k=t;}const R=L$2((t,e,n,p)=>{let{stores:s}=e,{page:f}=e,{constructors:o}=e,{components:a=[]}=e,{form:l}=e,{data_0:d=null}=e,{data_1:g=null}=e;B$1("__svelte__",s),s.page.notify,e.stores===void 0&&n.stores&&s!==void 0&&n.stores(s),e.page===void 0&&n.page&&f!==void 0&&n.page(f),e.constructors===void 0&&n.constructors&&o!==void 0&&n.constructors(o),e.components===void 0&&n.components&&a!==void 0&&n.components(a),e.form===void 0&&n.form&&l!==void 0&&n.form(l),e.data_0===void 0&&n.data_0&&d!==void 0&&n.data_0(d),e.data_1===void 0&&n.data_1&&g!==void 0&&n.data_1(g);let i,_,y=t.head;do i=!0,t.head=y,s.page.set(f),_=`  ${o[1]?`${z$2(o[0]||X,"svelte:component").$$render(t,{data:d,this:a[0]},{this:r=>{a[0]=r,i=!1;}},{default:()=>`${z$2(o[1]||X,"svelte:component").$$render(t,{data:g,form:l,this:a[1]},{this:r=>{a[1]=r,i=!1;}},{})}`})}`:`${z$2(o[0]||X,"svelte:component").$$render(t,{data:d,form:l,this:a[0]},{this:r=>{a[0]=r,i=!1;}},{})}`} `;while(!i);return _}),q={app_dir:"_app",app_template_contains_nonce:!1,csp:{mode:"auto",directives:{"upgrade-insecure-requests":!1,"block-all-mixed-content":!1},reportOnly:{"upgrade-insecure-requests":!1,"block-all-mixed-content":!1}},csrf_check_origin:!0,embedded:!1,env_public_prefix:"PUBLIC_",env_private_prefix:"",hooks:null,preload_strategy:"modulepreload",root:R,service_worker:!0,templates:{app:({head:t,body:e,assets:n,nonce:p,env:s})=>`<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="theme-color" content="#2D2F40" />
		<meta
			name="description"
			content="TestRegex.com. Quickly test, build and debug regex expressions"
		/>
		<title>TestRegex: test, build and debug regex</title>
		<link rel="icon" href="`+n+`/images/site_icon.ico" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="manifest" href="`+n+`/manifest.json" />
		<!-- Google tag (gtag.js) -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=G-6W8V7X5RX0"><\/script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag("js", new Date());

			gtag("config", "G-6W8V7X5RX0");
		<\/script>
		`+t+`
	</head>

	<body>
		<div style="display: contents">`+e+`</div>
	</body>
</html>
`,error:({status:t,message:e})=>`<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>`+e+`</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">`+t+`</span>
			<div class="message">
				<h1>`+e+`</h1>
			</div>
		</div>
	</body>
</html>
`},version_hash:"n7tl79"};function z$1(){return {}}

/** @type {Record<string, string>} */
const escaped = {
	'<': '\\u003C',
	'\\': '\\\\',
	'\b': '\\b',
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t',
	'\u2028': '\\u2028',
	'\u2029': '\\u2029'
};

class DevalueError extends Error {
	/**
	 * @param {string} message
	 * @param {string[]} keys
	 */
	constructor(message, keys) {
		super(message);
		this.name = 'DevalueError';
		this.path = keys.join('');
	}
}

/** @param {any} thing */
function is_primitive(thing) {
	return Object(thing) !== thing;
}

const object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
	Object.prototype
)
	.sort()
	.join('\0');

/** @param {any} thing */
function is_plain_object(thing) {
	const proto = Object.getPrototypeOf(thing);

	return (
		proto === Object.prototype ||
		proto === null ||
		Object.getOwnPropertyNames(proto).sort().join('\0') === object_proto_names
	);
}

/** @param {any} thing */
function get_type(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}

/** @param {string} char */
function get_escaped_char(char) {
	switch (char) {
		case '"':
			return '\\"';
		case '<':
			return '\\u003C';
		case '\\':
			return '\\\\';
		case '\n':
			return '\\n';
		case '\r':
			return '\\r';
		case '\t':
			return '\\t';
		case '\b':
			return '\\b';
		case '\f':
			return '\\f';
		case '\u2028':
			return '\\u2028';
		case '\u2029':
			return '\\u2029';
		default:
			return char < ' '
				? `\\u${char.charCodeAt(0).toString(16).padStart(4, '0')}`
				: '';
	}
}

/** @param {string} str */
function stringify_string(str) {
	let result = '';
	let last_pos = 0;
	const len = str.length;

	for (let i = 0; i < len; i += 1) {
		const char = str[i];
		const replacement = get_escaped_char(char);
		if (replacement) {
			result += str.slice(last_pos, i) + replacement;
			last_pos = i + 1;
		}
	}

	return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
const unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
const reserved =
	/^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;

/**
 * Turn a value into the JavaScript that creates an equivalent value
 * @param {any} value
 * @param {(value: any) => string | void} [replacer]
 */
function uneval(value, replacer) {
	const counts = new Map();

	/** @type {string[]} */
	const keys = [];

	const custom = new Map();

	/** @param {any} thing */
	function walk(thing) {
		if (typeof thing === 'function') {
			throw new DevalueError(`Cannot stringify a function`, keys);
		}

		if (!is_primitive(thing)) {
			if (counts.has(thing)) {
				counts.set(thing, counts.get(thing) + 1);
				return;
			}

			counts.set(thing, 1);

			if (replacer) {
				const str = replacer(thing);

				if (typeof str === 'string') {
					custom.set(thing, str);
					return;
				}
			}

			const type = get_type(thing);

			switch (type) {
				case 'Number':
				case 'BigInt':
				case 'String':
				case 'Boolean':
				case 'Date':
				case 'RegExp':
					return;

				case 'Array':
					/** @type {any[]} */ (thing).forEach((value, i) => {
						keys.push(`[${i}]`);
						walk(value);
						keys.pop();
					});
					break;

				case 'Set':
					Array.from(thing).forEach(walk);
					break;

				case 'Map':
					for (const [key, value] of thing) {
						keys.push(
							`.get(${is_primitive(key) ? stringify_primitive$1(key) : '...'})`
						);
						walk(value);
						keys.pop();
					}
					break;

				default:
					if (!is_plain_object(thing)) {
						throw new DevalueError(
							`Cannot stringify arbitrary non-POJOs`,
							keys
						);
					}

					if (Object.getOwnPropertySymbols(thing).length > 0) {
						throw new DevalueError(
							`Cannot stringify POJOs with symbolic keys`,
							keys
						);
					}

					for (const key in thing) {
						keys.push(`.${key}`);
						walk(thing[key]);
						keys.pop();
					}
			}
		}
	}

	walk(value);

	const names = new Map();

	Array.from(counts)
		.filter((entry) => entry[1] > 1)
		.sort((a, b) => b[1] - a[1])
		.forEach((entry, i) => {
			names.set(entry[0], get_name(i));
		});

	/**
	 * @param {any} thing
	 * @returns {string}
	 */
	function stringify(thing) {
		if (names.has(thing)) {
			return names.get(thing);
		}

		if (is_primitive(thing)) {
			return stringify_primitive$1(thing);
		}

		if (custom.has(thing)) {
			return custom.get(thing);
		}

		const type = get_type(thing);

		switch (type) {
			case 'Number':
			case 'String':
			case 'Boolean':
				return `Object(${stringify(thing.valueOf())})`;

			case 'RegExp':
				return `new RegExp(${stringify_string(thing.source)}, "${
					thing.flags
				}")`;

			case 'Date':
				return `new Date(${thing.getTime()})`;

			case 'Array':
				const members = /** @type {any[]} */ (thing).map((v, i) =>
					i in thing ? stringify(v) : ''
				);
				const tail = thing.length === 0 || thing.length - 1 in thing ? '' : ',';
				return `[${members.join(',')}${tail}]`;

			case 'Set':
			case 'Map':
				return `new ${type}([${Array.from(thing).map(stringify).join(',')}])`;

			default:
				const obj = `{${Object.keys(thing)
					.map((key) => `${safe_key(key)}:${stringify(thing[key])}`)
					.join(',')}}`;
				const proto = Object.getPrototypeOf(thing);
				if (proto === null) {
					return Object.keys(thing).length > 0
						? `Object.assign(Object.create(null),${obj})`
						: `Object.create(null)`;
				}

				return obj;
		}
	}

	const str = stringify(value);

	if (names.size) {
		/** @type {string[]} */
		const params = [];

		/** @type {string[]} */
		const statements = [];

		/** @type {string[]} */
		const values = [];

		names.forEach((name, thing) => {
			params.push(name);

			if (custom.has(thing)) {
				values.push(/** @type {string} */ (custom.get(thing)));
				return;
			}

			if (is_primitive(thing)) {
				values.push(stringify_primitive$1(thing));
				return;
			}

			const type = get_type(thing);

			switch (type) {
				case 'Number':
				case 'String':
				case 'Boolean':
					values.push(`Object(${stringify(thing.valueOf())})`);
					break;

				case 'RegExp':
					values.push(thing.toString());
					break;

				case 'Date':
					values.push(`new Date(${thing.getTime()})`);
					break;

				case 'Array':
					values.push(`Array(${thing.length})`);
					/** @type {any[]} */ (thing).forEach((v, i) => {
						statements.push(`${name}[${i}]=${stringify(v)}`);
					});
					break;

				case 'Set':
					values.push(`new Set`);
					statements.push(
						`${name}.${Array.from(thing)
							.map((v) => `add(${stringify(v)})`)
							.join('.')}`
					);
					break;

				case 'Map':
					values.push(`new Map`);
					statements.push(
						`${name}.${Array.from(thing)
							.map(([k, v]) => `set(${stringify(k)}, ${stringify(v)})`)
							.join('.')}`
					);
					break;

				default:
					values.push(
						Object.getPrototypeOf(thing) === null ? 'Object.create(null)' : '{}'
					);
					Object.keys(thing).forEach((key) => {
						statements.push(
							`${name}${safe_prop(key)}=${stringify(thing[key])}`
						);
					});
			}
		});

		statements.push(`return ${str}`);

		return `(function(${params.join(',')}){${statements.join(
			';'
		)}}(${values.join(',')}))`;
	} else {
		return str;
	}
}

/** @param {number} num */
function get_name(num) {
	let name = '';

	do {
		name = chars[num % chars.length] + name;
		num = ~~(num / chars.length) - 1;
	} while (num >= 0);

	return reserved.test(name) ? `${name}0` : name;
}

/** @param {string} c */
function escape_unsafe_char(c) {
	return escaped[c] || c;
}

/** @param {string} str */
function escape_unsafe_chars(str) {
	return str.replace(unsafe_chars, escape_unsafe_char);
}

/** @param {string} key */
function safe_key(key) {
	return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
		? key
		: escape_unsafe_chars(JSON.stringify(key));
}

/** @param {string} key */
function safe_prop(key) {
	return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key)
		? `.${key}`
		: `[${escape_unsafe_chars(JSON.stringify(key))}]`;
}

/** @param {any} thing */
function stringify_primitive$1(thing) {
	if (typeof thing === 'string') return stringify_string(thing);
	if (thing === void 0) return 'void 0';
	if (thing === 0 && 1 / thing < 0) return '-0';
	const str = String(thing);
	if (typeof thing === 'number') return str.replace(/^(-)?0\./, '$1.');
	if (typeof thing === 'bigint') return thing + 'n';
	return str;
}

const UNDEFINED = -1;
const HOLE = -2;
const NAN = -3;
const POSITIVE_INFINITY = -4;
const NEGATIVE_INFINITY = -5;
const NEGATIVE_ZERO = -6;

/**
 * Turn a value into a JSON string that can be parsed with `devalue.parse`
 * @param {any} value
 * @param {Record<string, (value: any) => any>} [reducers]
 */
function stringify(value, reducers) {
	/** @type {any[]} */
	const stringified = [];

	/** @type {Map<any, number>} */
	const indexes = new Map();

	/** @type {Array<{ key: string, fn: (value: any) => any }>} */
	const custom = [];
	for (const key in reducers) {
		custom.push({ key, fn: reducers[key] });
	}

	/** @type {string[]} */
	const keys = [];

	let p = 0;

	/** @param {any} thing */
	function flatten(thing) {
		if (typeof thing === 'function') {
			throw new DevalueError(`Cannot stringify a function`, keys);
		}

		if (indexes.has(thing)) return indexes.get(thing);

		if (thing === undefined) return UNDEFINED;
		if (Number.isNaN(thing)) return NAN;
		if (thing === Infinity) return POSITIVE_INFINITY;
		if (thing === -Infinity) return NEGATIVE_INFINITY;
		if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO;

		const index = p++;
		indexes.set(thing, index);

		for (const { key, fn } of custom) {
			const value = fn(thing);
			if (value) {
				stringified[index] = `["${key}",${flatten(value)}]`;
				return index;
			}
		}

		let str = '';

		if (is_primitive(thing)) {
			str = stringify_primitive(thing);
		} else {
			const type = get_type(thing);

			switch (type) {
				case 'Number':
				case 'String':
				case 'Boolean':
					str = `["Object",${stringify_primitive(thing)}]`;
					break;

				case 'BigInt':
					str = `["BigInt",${thing}]`;
					break;

				case 'Date':
					str = `["Date","${thing.toISOString()}"]`;
					break;

				case 'RegExp':
					const { source, flags } = thing;
					str = flags
						? `["RegExp",${stringify_string(source)},"${flags}"]`
						: `["RegExp",${stringify_string(source)}]`;
					break;

				case 'Array':
					str = '[';

					for (let i = 0; i < thing.length; i += 1) {
						if (i > 0) str += ',';

						if (i in thing) {
							keys.push(`[${i}]`);
							str += flatten(thing[i]);
							keys.pop();
						} else {
							str += HOLE;
						}
					}

					str += ']';

					break;

				case 'Set':
					str = '["Set"';

					for (const value of thing) {
						str += `,${flatten(value)}`;
					}

					str += ']';
					break;

				case 'Map':
					str = '["Map"';

					for (const [key, value] of thing) {
						keys.push(
							`.get(${is_primitive(key) ? stringify_primitive(key) : '...'})`
						);
						str += `,${flatten(key)},${flatten(value)}`;
					}

					str += ']';
					break;

				default:
					if (!is_plain_object(thing)) {
						throw new DevalueError(
							`Cannot stringify arbitrary non-POJOs`,
							keys
						);
					}

					if (Object.getOwnPropertySymbols(thing).length > 0) {
						throw new DevalueError(
							`Cannot stringify POJOs with symbolic keys`,
							keys
						);
					}

					if (Object.getPrototypeOf(thing) === null) {
						str = '["null"';
						for (const key in thing) {
							keys.push(`.${key}`);
							str += `,${stringify_string(key)},${flatten(thing[key])}`;
							keys.pop();
						}
						str += ']';
					} else {
						str = '{';
						let started = false;
						for (const key in thing) {
							if (started) str += ',';
							started = true;
							keys.push(`.${key}`);
							str += `${stringify_string(key)}:${flatten(thing[key])}`;
							keys.pop();
						}
						str += '}';
					}
			}
		}

		stringified[index] = str;
		return index;
	}

	const index = flatten(value);

	// special case — value is represented as a negative index
	if (index < 0) return `${index}`;

	return `[${stringified.join(',')}]`;
}

/**
 * @param {any} thing
 * @returns {string}
 */
function stringify_primitive(thing) {
	const type = typeof thing;
	if (type === 'string') return stringify_string(thing);
	if (thing instanceof String) return stringify_string(thing.toString());
	if (thing === void 0) return UNDEFINED.toString();
	if (thing === 0 && 1 / thing < 0) return NEGATIVE_ZERO.toString();
	if (type === 'bigint') return `["BigInt","${thing}"]`;
	return String(thing);
}

var cookie = {};

/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */

var hasRequiredCookie;

function requireCookie () {
	if (hasRequiredCookie) return cookie;
	hasRequiredCookie = 1;

	/**
	 * Module exports.
	 * @public
	 */

	cookie.parse = parse;
	cookie.serialize = serialize;

	/**
	 * Module variables.
	 * @private
	 */

	var __toString = Object.prototype.toString;

	/**
	 * RegExp to match field-content in RFC 7230 sec 3.2
	 *
	 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
	 * field-vchar   = VCHAR / obs-text
	 * obs-text      = %x80-FF
	 */

	var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

	/**
	 * Parse a cookie header.
	 *
	 * Parse the given cookie header string into an object
	 * The object has the various cookies as keys(names) => values
	 *
	 * @param {string} str
	 * @param {object} [options]
	 * @return {object}
	 * @public
	 */

	function parse(str, options) {
	  if (typeof str !== 'string') {
	    throw new TypeError('argument str must be a string');
	  }

	  var obj = {};
	  var opt = options || {};
	  var dec = opt.decode || decode;

	  var index = 0;
	  while (index < str.length) {
	    var eqIdx = str.indexOf('=', index);

	    // no more cookie pairs
	    if (eqIdx === -1) {
	      break
	    }

	    var endIdx = str.indexOf(';', index);

	    if (endIdx === -1) {
	      endIdx = str.length;
	    } else if (endIdx < eqIdx) {
	      // backtrack on prior semicolon
	      index = str.lastIndexOf(';', eqIdx - 1) + 1;
	      continue
	    }

	    var key = str.slice(index, eqIdx).trim();

	    // only assign once
	    if (undefined === obj[key]) {
	      var val = str.slice(eqIdx + 1, endIdx).trim();

	      // quoted values
	      if (val.charCodeAt(0) === 0x22) {
	        val = val.slice(1, -1);
	      }

	      obj[key] = tryDecode(val, dec);
	    }

	    index = endIdx + 1;
	  }

	  return obj;
	}

	/**
	 * Serialize data into a cookie header.
	 *
	 * Serialize the a name value pair into a cookie string suitable for
	 * http headers. An optional options object specified cookie parameters.
	 *
	 * serialize('foo', 'bar', { httpOnly: true })
	 *   => "foo=bar; httpOnly"
	 *
	 * @param {string} name
	 * @param {string} val
	 * @param {object} [options]
	 * @return {string}
	 * @public
	 */

	function serialize(name, val, options) {
	  var opt = options || {};
	  var enc = opt.encode || encode;

	  if (typeof enc !== 'function') {
	    throw new TypeError('option encode is invalid');
	  }

	  if (!fieldContentRegExp.test(name)) {
	    throw new TypeError('argument name is invalid');
	  }

	  var value = enc(val);

	  if (value && !fieldContentRegExp.test(value)) {
	    throw new TypeError('argument val is invalid');
	  }

	  var str = name + '=' + value;

	  if (null != opt.maxAge) {
	    var maxAge = opt.maxAge - 0;

	    if (isNaN(maxAge) || !isFinite(maxAge)) {
	      throw new TypeError('option maxAge is invalid')
	    }

	    str += '; Max-Age=' + Math.floor(maxAge);
	  }

	  if (opt.domain) {
	    if (!fieldContentRegExp.test(opt.domain)) {
	      throw new TypeError('option domain is invalid');
	    }

	    str += '; Domain=' + opt.domain;
	  }

	  if (opt.path) {
	    if (!fieldContentRegExp.test(opt.path)) {
	      throw new TypeError('option path is invalid');
	    }

	    str += '; Path=' + opt.path;
	  }

	  if (opt.expires) {
	    var expires = opt.expires;

	    if (!isDate(expires) || isNaN(expires.valueOf())) {
	      throw new TypeError('option expires is invalid');
	    }

	    str += '; Expires=' + expires.toUTCString();
	  }

	  if (opt.httpOnly) {
	    str += '; HttpOnly';
	  }

	  if (opt.secure) {
	    str += '; Secure';
	  }

	  if (opt.partitioned) {
	    str += '; Partitioned';
	  }

	  if (opt.priority) {
	    var priority = typeof opt.priority === 'string'
	      ? opt.priority.toLowerCase()
	      : opt.priority;

	    switch (priority) {
	      case 'low':
	        str += '; Priority=Low';
	        break
	      case 'medium':
	        str += '; Priority=Medium';
	        break
	      case 'high':
	        str += '; Priority=High';
	        break
	      default:
	        throw new TypeError('option priority is invalid')
	    }
	  }

	  if (opt.sameSite) {
	    var sameSite = typeof opt.sameSite === 'string'
	      ? opt.sameSite.toLowerCase() : opt.sameSite;

	    switch (sameSite) {
	      case true:
	        str += '; SameSite=Strict';
	        break;
	      case 'lax':
	        str += '; SameSite=Lax';
	        break;
	      case 'strict':
	        str += '; SameSite=Strict';
	        break;
	      case 'none':
	        str += '; SameSite=None';
	        break;
	      default:
	        throw new TypeError('option sameSite is invalid');
	    }
	  }

	  return str;
	}

	/**
	 * URL-decode string value. Optimized to skip native call when no %.
	 *
	 * @param {string} str
	 * @returns {string}
	 */

	function decode (str) {
	  return str.indexOf('%') !== -1
	    ? decodeURIComponent(str)
	    : str
	}

	/**
	 * URL-encode value.
	 *
	 * @param {string} val
	 * @returns {string}
	 */

	function encode (val) {
	  return encodeURIComponent(val)
	}

	/**
	 * Determine if value is a Date.
	 *
	 * @param {*} val
	 * @private
	 */

	function isDate (val) {
	  return __toString.call(val) === '[object Date]' ||
	    val instanceof Date
	}

	/**
	 * Try decoding a string using a decoding function.
	 *
	 * @param {string} str
	 * @param {function} decode
	 * @private
	 */

	function tryDecode(str, decode) {
	  try {
	    return decode(str);
	  } catch (e) {
	    return str;
	  }
	}
	return cookie;
}

var cookieExports = requireCookie();

var setCookie = {exports: {}};

var hasRequiredSetCookie;

function requireSetCookie () {
	if (hasRequiredSetCookie) return setCookie.exports;
	hasRequiredSetCookie = 1;

	var defaultParseOptions = {
	  decodeValues: true,
	  map: false,
	  silent: false,
	};

	function isNonEmptyString(str) {
	  return typeof str === "string" && !!str.trim();
	}

	function parseString(setCookieValue, options) {
	  var parts = setCookieValue.split(";").filter(isNonEmptyString);

	  var nameValuePairStr = parts.shift();
	  var parsed = parseNameValuePair(nameValuePairStr);
	  var name = parsed.name;
	  var value = parsed.value;

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  try {
	    value = options.decodeValues ? decodeURIComponent(value) : value; // decode cookie value
	  } catch (e) {
	    console.error(
	      "set-cookie-parser encountered an error while decoding a cookie with value '" +
	        value +
	        "'. Set options.decodeValues to false to disable this feature.",
	      e
	    );
	  }

	  var cookie = {
	    name: name,
	    value: value,
	  };

	  parts.forEach(function (part) {
	    var sides = part.split("=");
	    var key = sides.shift().trimLeft().toLowerCase();
	    var value = sides.join("=");
	    if (key === "expires") {
	      cookie.expires = new Date(value);
	    } else if (key === "max-age") {
	      cookie.maxAge = parseInt(value, 10);
	    } else if (key === "secure") {
	      cookie.secure = true;
	    } else if (key === "httponly") {
	      cookie.httpOnly = true;
	    } else if (key === "samesite") {
	      cookie.sameSite = value;
	    } else {
	      cookie[key] = value;
	    }
	  });

	  return cookie;
	}

	function parseNameValuePair(nameValuePairStr) {
	  // Parses name-value-pair according to rfc6265bis draft

	  var name = "";
	  var value = "";
	  var nameValueArr = nameValuePairStr.split("=");
	  if (nameValueArr.length > 1) {
	    name = nameValueArr.shift();
	    value = nameValueArr.join("="); // everything after the first =, joined by a "=" if there was more than one part
	  } else {
	    value = nameValuePairStr;
	  }

	  return { name: name, value: value };
	}

	function parse(input, options) {
	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!input) {
	    if (!options.map) {
	      return [];
	    } else {
	      return {};
	    }
	  }

	  if (input.headers) {
	    if (typeof input.headers.getSetCookie === "function") {
	      // for fetch responses - they combine headers of the same type in the headers array,
	      // but getSetCookie returns an uncombined array
	      input = input.headers.getSetCookie();
	    } else if (input.headers["set-cookie"]) {
	      // fast-path for node.js (which automatically normalizes header names to lower-case
	      input = input.headers["set-cookie"];
	    } else {
	      // slow-path for other environments - see #25
	      var sch =
	        input.headers[
	          Object.keys(input.headers).find(function (key) {
	            return key.toLowerCase() === "set-cookie";
	          })
	        ];
	      // warn if called on a request-like object with a cookie header rather than a set-cookie header - see #34, 36
	      if (!sch && input.headers.cookie && !options.silent) {
	        console.warn(
	          "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
	        );
	      }
	      input = sch;
	    }
	  }
	  if (!Array.isArray(input)) {
	    input = [input];
	  }

	  options = options
	    ? Object.assign({}, defaultParseOptions, options)
	    : defaultParseOptions;

	  if (!options.map) {
	    return input.filter(isNonEmptyString).map(function (str) {
	      return parseString(str, options);
	    });
	  } else {
	    var cookies = {};
	    return input.filter(isNonEmptyString).reduce(function (cookies, str) {
	      var cookie = parseString(str, options);
	      cookies[cookie.name] = cookie;
	      return cookies;
	    }, cookies);
	  }
	}

	/*
	  Set-Cookie header field-values are sometimes comma joined in one string. This splits them without choking on commas
	  that are within a single set-cookie field-value, such as in the Expires portion.

	  This is uncommon, but explicitly allowed - see https://tools.ietf.org/html/rfc2616#section-4.2
	  Node.js does this for every header *except* set-cookie - see https://github.com/nodejs/node/blob/d5e363b77ebaf1caf67cd7528224b651c86815c1/lib/_http_incoming.js#L128
	  React Native's fetch does this for *every* header, including set-cookie.

	  Based on: https://github.com/google/j2objc/commit/16820fdbc8f76ca0c33472810ce0cb03d20efe25
	  Credits to: https://github.com/tomball for original and https://github.com/chrusart for JavaScript implementation
	*/
	function splitCookiesString(cookiesString) {
	  if (Array.isArray(cookiesString)) {
	    return cookiesString;
	  }
	  if (typeof cookiesString !== "string") {
	    return [];
	  }

	  var cookiesStrings = [];
	  var pos = 0;
	  var start;
	  var ch;
	  var lastComma;
	  var nextStart;
	  var cookiesSeparatorFound;

	  function skipWhitespace() {
	    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
	      pos += 1;
	    }
	    return pos < cookiesString.length;
	  }

	  function notSpecialChar() {
	    ch = cookiesString.charAt(pos);

	    return ch !== "=" && ch !== ";" && ch !== ",";
	  }

	  while (pos < cookiesString.length) {
	    start = pos;
	    cookiesSeparatorFound = false;

	    while (skipWhitespace()) {
	      ch = cookiesString.charAt(pos);
	      if (ch === ",") {
	        // ',' is a cookie separator if we have later first '=', not ';' or ','
	        lastComma = pos;
	        pos += 1;

	        skipWhitespace();
	        nextStart = pos;

	        while (pos < cookiesString.length && notSpecialChar()) {
	          pos += 1;
	        }

	        // currently special character
	        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
	          // we found cookies separator
	          cookiesSeparatorFound = true;
	          // pos is inside the next cookie, so back up and return it.
	          pos = nextStart;
	          cookiesStrings.push(cookiesString.substring(start, lastComma));
	          start = pos;
	        } else {
	          // in param ',' or param separator ';',
	          // we continue from that comma
	          pos = lastComma + 1;
	        }
	      } else {
	        pos += 1;
	      }
	    }

	    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
	      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
	    }
	  }

	  return cookiesStrings;
	}

	setCookie.exports = parse;
	setCookie.exports.parse = parse;
	setCookie.exports.parseString = parseString;
	setCookie.exports.splitCookiesString = splitCookiesString;
	return setCookie.exports;
}

var setCookieExports = requireSetCookie();

const St="/_svelte_kit_assets",Le=["GET","POST","PUT","PATCH","DELETE","OPTIONS","HEAD"],Rt=["GET","POST","HEAD"];function de(e,t){const r=[];e.split(",").forEach((o,a)=>{const u=/([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(o);if(u){const[,c,l,i="1"]=u;r.push({type:c,subtype:l,q:+i,i:a});}}),r.sort((o,a)=>o.q!==a.q?a.q-o.q:o.subtype==="*"!=(a.subtype==="*")?o.subtype==="*"?1:-1:o.type==="*"!=(a.type==="*")?o.type==="*"?1:-1:o.i-a.i);let s,n=1/0;for(const o of t){const[a,u]=o.split("/"),c=r.findIndex(l=>(l.type===a||l.type==="*")&&(l.subtype===u||l.subtype==="*"));c!==-1&&c<n&&(s=o,n=c);}return s}function Tt(e,...t){const r=e.headers.get("content-type")?.split(";",1)[0].trim()??"";return t.includes(r.toLowerCase())}function We(e){return Tt(e,"application/x-www-form-urlencoded","multipart/form-data","text/plain")}class V{constructor(t,r){this.status=t,typeof r=="string"?this.body={message:r}:r?this.body=r:this.body={message:`Error: ${t}`};}toString(){return JSON.stringify(this.body)}}class D{constructor(t,r){this.status=t,this.location=r;}}class I extends Error{constructor(t,r,s){super(s),this.status=t,this.text=r;}}class fe{constructor(t,r){this.status=t,this.data=r;}}function he(e,t){const r=JSON.stringify(e),s=new Headers(t?.headers);return s.has("content-length")||s.set("content-length",Je.encode(r).byteLength.toString()),s.has("content-type")||s.set("content-type","application/json"),new Response(r,{...t,headers:s})}const Je=new TextEncoder;function O(e,t){const r=new Headers(t?.headers);if(!r.has("content-length")){const s=Je.encode(e);return r.set("content-length",s.byteLength.toString()),new Response(s,{...t,headers:r})}return new Response(e,{...t,headers:r})}function At(e){return e instanceof Error||e&&e.name&&e.message?e:new Error(JSON.stringify(e))}function M(e){return e instanceof V||e instanceof I?e.status:500}function Ot(e){return e instanceof I?e.text:"Internal Error"}function Me(e,t){return O(`${t} method not allowed`,{status:405,headers:{allow:Pt(e).join(", ")}})}function Pt(e){const t=Le.filter(r=>r in e);return ("GET"in e||"HEAD"in e)&&t.push("HEAD"),t}function Y(e,t,r){let s=e.templates.error({status:t,message:r});return O(s,{headers:{"content-type":"text/html; charset=utf-8"},status:t})}async function be(e,t,r){r=r instanceof V?r:At(r);const s=M(r),n=await P(e,t,r),o=de(e.request.headers.get("accept")||"text/html",["application/json","text/html"]);return e.isDataRequest||o==="application/json"?he(n,{status:s}):Y(t,s,n.message)}async function P(e,t,r){if(r instanceof V)return r.body;const s=M(r),n=Ot(r);return await t.hooks.handleError({error:r,event:e,status:s,message:n})??{message:n}}function Q(e,t){return new Response(void 0,{status:e,headers:{location:t}})}function Ge(e,t){return t.path?`Data returned from \`load\` while rendering ${e.route.id} is not serializable: ${t.message} (data${t.path})`:t.path===""?`Data returned from \`load\` while rendering ${e.route.id} is not a plain object`:t.message}function Fe(e){const t=[];return e.uses&&e.uses.dependencies.size>0&&t.push(`"dependencies":${JSON.stringify(Array.from(e.uses.dependencies))}`),e.uses&&e.uses.search_params.size>0&&t.push(`"search_params":${JSON.stringify(Array.from(e.uses.search_params))}`),e.uses&&e.uses.params.size>0&&t.push(`"params":${JSON.stringify(Array.from(e.uses.params))}`),e.uses?.parent&&t.push('"parent":1'),e.uses?.route&&t.push('"route":1'),e.uses?.url&&t.push('"url":1'),`"uses":{${t.join(",")}}`}async function qt(e,t,r){const s=e.request.method;let n=t[s]||t.fallback;if(s==="HEAD"&&t.GET&&!t.HEAD&&(n=t.GET),!n)return Me(t,s);const o=t.prerender??r.prerender_default;if(o&&(t.POST||t.PATCH||t.PUT||t.DELETE))throw new Error("Cannot prerender endpoints that have mutative methods");if(r.prerendering&&!o){if(r.depth>0)throw new Error(`${e.route.id} is not prerenderable`);return new Response(void 0,{status:204})}try{let a=await n(e);if(!(a instanceof Response))throw new Error(`Invalid response from route ${e.url.pathname}: handler should return a Response object`);return r.prerendering&&(a=new Response(a.body,{status:a.status,statusText:a.statusText,headers:new Headers(a.headers)}),a.headers.set("x-sveltekit-prerender",String(o))),a}catch(a){if(a instanceof D)return new Response(void 0,{status:a.status,headers:{location:a.location}});throw a}}function Ct(e){const{method:t,headers:r}=e.request;if(Le.includes(t)&&!Rt.includes(t))return !0;if(t==="POST"&&r.get("x-sveltekit-action")==="true")return !1;const s=e.request.headers.get("accept")??"*/*";return de(s,["*","text/html"])!=="text/html"}function ke(e){return e.filter(t=>t!=null)}function Be(e){return de(e.request.headers.get("accept")??"*/*",["application/json","text/html"])==="application/json"&&e.request.method==="POST"}async function Ht(e,t,r){const s=r?.actions;if(!s){const n=new I(405,"Method Not Allowed","POST method not allowed. No actions exist for this page");return F({type:"error",error:await P(e,t,n)},{status:n.status,headers:{allow:"GET"}})}Xe(s);try{const n=await Ye(e,s);return n instanceof fe?F({type:"failure",status:n.status,data:ve(n.data,e.route.id)}):F({type:"success",status:n?200:204,data:ve(n,e.route.id)})}catch(n){const o=n;return o instanceof D?Ke(o):F({type:"error",error:await P(e,t,Ve(o))},{status:M(o)})}}function Ve(e){return e instanceof fe?new Error('Cannot "throw fail()". Use "return fail()"'):e}function Ke(e){return F({type:"redirect",status:e.status,location:e.location})}function F(e,t){return he(e,t)}function Nt(e){return e.request.method==="POST"}async function Ut(e,t){const r=t?.actions;if(!r)return e.setHeaders({allow:"GET"}),{type:"error",error:new I(405,"Method Not Allowed","POST method not allowed. No actions exist for this page")};Xe(r);try{const s=await Ye(e,r);return s instanceof fe?{type:"failure",status:s.status,data:s.data}:{type:"success",status:200,data:s}}catch(s){const n=s;return n instanceof D?{type:"redirect",status:n.status,location:n.location}:{type:"error",error:Ve(n)}}}function Xe(e){if(e.default&&Object.keys(e).length>1)throw new Error("When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions")}async function Ye(e,t){const r=new URL(e.request.url);let s="default";for(const o of r.searchParams)if(o[0].startsWith("/")){if(s=o[0].slice(1),s==="default")throw new Error('Cannot use reserved action name "default"');break}const n=t[s];if(!n)throw new I(404,"Not Found",`No action with name '${s}' found`);if(!We(e.request))throw new I(415,"Unsupported Media Type",`Form actions expect form-encoded data — received ${e.request.headers.get("content-type")}`);return n(e)}function zt(e,t){return Qe(e,uneval,t)}function ve(e,t){return Qe(e,stringify,t)}function Qe(e,t,r){try{return t(e)}catch(s){const n=s;if("path"in n){let o=`Data returned from action inside ${r} is not serializable: ${n.message}`;throw n.path!==""&&(o+=` (data.${n.path})`),new Error(o)}throw n}}const xe="x-sveltekit-invalidated",Ee="x-sveltekit-trailing-slash";async function pe({event:e,state:t,node:r,parent:s}){if(!r?.server)return null;let n=!0;const o={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},a=j(e.url,()=>{n&&(o.url=!0);},c=>{n&&o.search_params.add(c);});return t.prerendering&&y(a),{type:"data",data:await r.server.load?.call(null,{...e,fetch:(c,l)=>(new URL(c instanceof Request?c.url:c,e.url),e.fetch(c,l)),depends:(...c)=>{for(const l of c){const{href:i}=new URL(l,e.url);o.dependencies.add(i);}},params:new Proxy(e.params,{get:(c,l)=>(n&&o.params.add(l),c[l])}),parent:async()=>(n&&(o.parent=!0),s()),route:new Proxy(e.route,{get:(c,l)=>(n&&(o.route=!0),c[l])}),url:a,untrack(c){n=!1;try{return c()}finally{n=!0;}}})??null,uses:o,slash:r.server.trailingSlash}}async function Ze({event:e,fetched:t,node:r,parent:s,server_data_promise:n,state:o,resolve_opts:a,csr:u}){const c=await n;return r?.universal?.load?await r.universal.load.call(null,{url:e.url,params:e.params,data:c?.data??null,route:e.route,fetch:It(e,o,t,u,a),setHeaders:e.setHeaders,depends:()=>{},parent:s,untrack:i=>i()})??null:c?.data??null}function Dt(e){if(globalThis.Buffer)return Buffer.from(e).toString("base64");const t=new Uint8Array(new Uint16Array([1]).buffer)[0]>0;return btoa(new TextDecoder(t?"utf-16le":"utf-16be").decode(new Uint16Array(new Uint8Array(e))))}function It(e,t,r,s,n){const o=async(a,u)=>{const c=a instanceof Request&&a.body?a.clone().body:null,l=a instanceof Request&&[...a.headers].length?new Headers(a.headers):u?.headers;let i=await e.fetch(a,u);const d=new URL(a instanceof Request?a.url:a,e.url),y=d.origin===e.url.origin;let h;if(y)t.prerendering&&(h={response:i,body:null},t.prerendering.dependencies.set(d.pathname,h));else if((a instanceof Request?a.mode:u?.mode??"cors")==="no-cors")i=new Response("",{status:i.status,statusText:i.statusText,headers:i.headers});else {const _=i.headers.get("access-control-allow-origin");if(!_||_!==e.url.origin&&_!=="*")throw new Error(`CORS error: ${_?"Incorrect":"No"} 'Access-Control-Allow-Origin' header is present on the requested resource`)}const p=new Proxy(i,{get(m,_,g){async function w(f,k){const $=Number(m.status);if(isNaN($))throw new Error(`response.status is not a number. value: "${m.status}" type: ${typeof m.status}`);r.push({url:y?d.href.slice(e.url.origin.length):d.href,method:e.request.method,request_body:a instanceof Request&&c?await Lt(c):u?.body,request_headers:l,response_body:f,response:m,is_b64:k});}if(_==="arrayBuffer")return async()=>{const f=await m.arrayBuffer();return h&&(h.body=new Uint8Array(f)),f instanceof ArrayBuffer&&await w(Dt(f),!0),f};async function b(){const f=await m.text();return (!f||typeof f=="string")&&await w(f,!1),h&&(h.body=f),f}return _==="text"?b:_==="json"?async()=>JSON.parse(await b()):Reflect.get(m,_,m)}});if(s){const m=i.headers.get;i.headers.get=_=>{const g=_.toLowerCase(),w=m.call(i.headers,g);if(w&&!g.startsWith("x-sveltekit-")&&!n.filterSerializedResponseHeaders(g,w))throw new Error(`Failed to get response header "${g}" — it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${e.route.id})`);return w};}return p};return (a,u)=>{const c=o(a,u);return c.catch(()=>{}),c}}async function Lt(e){let t="";const r=e.getReader(),s=new TextDecoder;for(;;){const{done:n,value:o}=await r.read();if(n)break;t+=s.decode(o);}return t}function et(...e){let t=5381;for(const r of e)if(typeof r=="string"){let s=r.length;for(;s;)t=t*33^r.charCodeAt(--s);}else if(ArrayBuffer.isView(r)){const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);let n=s.length;for(;n;)t=t*33^s[--n];}else throw new TypeError("value must be a string or TypedArray");return (t>>>0).toString(36)}const tt={"&":"&amp;",'"':"&quot;"},Wt=new RegExp(`[${Object.keys(tt).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,"g");function rt(e){return `"${e.replace(Wt,r=>r.length===2?r:tt[r]??`&#${r.charCodeAt(0)};`)}"`}const st={"<":"\\u003C","\u2028":"\\u2028","\u2029":"\\u2029"},Jt=new RegExp(`[${Object.keys(st).join("")}]`,"g");function Mt(e,t,r=!1){const s={};let n=null,o=null,a=!1;for(const[i,d]of e.response.headers)t(i,d)&&(s[i]=d),i==="cache-control"?n=d:i==="age"?o=d:i==="vary"&&d.trim()==="*"&&(a=!0);const u={status:e.response.status,statusText:e.response.statusText,headers:s,body:e.response_body},c=JSON.stringify(u).replace(Jt,i=>st[i]),l=['type="application/json"',"data-sveltekit-fetched",`data-url=${rt(e.url)}`];if(e.is_b64&&l.push("data-b64"),e.request_headers||e.request_body){const i=[];e.request_headers&&i.push([...new Headers(e.request_headers)].join(",")),e.request_body&&i.push(e.request_body),l.push(`data-hash="${et(...i)}"`);}if(!r&&e.method==="GET"&&n&&!a){const i=/s-maxage=(\d+)/g.exec(n)??/max-age=(\d+)/g.exec(n);if(i){const d=+i[1]-+(o??"0");l.push(`data-ttl="${d}"`);}}return `<script ${l.join(" ")}>${c}<\/script>`}const L=JSON.stringify,Gt=new TextEncoder;function je(e){ie[0]||Ft();const t=nt.slice(0),r=Bt(e);for(let n=0;n<r.length;n+=16){const o=r.subarray(n,n+16);let a,u,c,l=t[0],i=t[1],d=t[2],y=t[3],h=t[4],p=t[5],m=t[6],_=t[7];for(let g=0;g<64;g++)g<16?a=o[g]:(u=o[g+1&15],c=o[g+14&15],a=o[g&15]=(u>>>7^u>>>18^u>>>3^u<<25^u<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+o[g&15]+o[g+9&15]|0),a=a+_+(h>>>6^h>>>11^h>>>25^h<<26^h<<21^h<<7)+(m^h&(p^m))+ie[g],_=m,m=p,p=h,h=y+a|0,y=d,d=i,i=l,l=a+(i&d^y&(i^d))+(i>>>2^i>>>13^i>>>22^i<<30^i<<19^i<<10)|0;t[0]=t[0]+l|0,t[1]=t[1]+i|0,t[2]=t[2]+d|0,t[3]=t[3]+y|0,t[4]=t[4]+h|0,t[5]=t[5]+p|0,t[6]=t[6]+m|0,t[7]=t[7]+_|0;}const s=new Uint8Array(t.buffer);return at(s),ot(s)}const nt=new Uint32Array(8),ie=new Uint32Array(64);function Ft(){function e(r){return (r-Math.floor(r))*4294967296}let t=2;for(let r=0;r<64;t++){let s=!0;for(let n=2;n*n<=t;n++)if(t%n===0){s=!1;break}s&&(r<8&&(nt[r]=e(t**(1/2))),ie[r]=e(t**(1/3)),r++);}}function at(e){for(let t=0;t<e.length;t+=4){const r=e[t+0],s=e[t+1],n=e[t+2],o=e[t+3];e[t+0]=o,e[t+1]=n,e[t+2]=s,e[t+3]=r;}}function Bt(e){const t=Gt.encode(e),r=t.length*8,s=512*Math.ceil((r+65)/512),n=new Uint8Array(s/8);n.set(t),n[t.length]=128,at(n);const o=new Uint32Array(n.buffer);return o[o.length-2]=Math.floor(r/4294967296),o[o.length-1]=r,o}const U="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");function ot(e){const t=e.length;let r="",s;for(s=2;s<t;s+=3)r+=U[e[s-2]>>2],r+=U[(e[s-2]&3)<<4|e[s-1]>>4],r+=U[(e[s-1]&15)<<2|e[s]>>6],r+=U[e[s]&63];return s===t+1&&(r+=U[e[s-2]>>2],r+=U[(e[s-2]&3)<<4],r+="=="),s===t&&(r+=U[e[s-2]>>2],r+=U[(e[s-2]&3)<<4|e[s-1]>>4],r+=U[(e[s-1]&15)<<2],r+="="),r}const Se=new Uint8Array(16);function Vt(){return crypto.getRandomValues(Se),ot(Se)}const Kt=new Set(["self","unsafe-eval","unsafe-hashes","unsafe-inline","none","strict-dynamic","report-sample","wasm-unsafe-eval","script"]),Xt=/^(nonce|sha\d\d\d)-/;class it{#e;#t;#l;#a;#r;#o;#s;#i;#c;#n;constructor(t,r,s){this.#e=t,this.#a=r;const n=this.#a;this.#r=[],this.#o=[],this.#s=[],this.#i=[],this.#c=[];const o=n["script-src"]||n["default-src"],a=n["script-src-elem"],u=n["style-src"]||n["default-src"],c=n["style-src-attr"],l=n["style-src-elem"];this.#t=!!o&&o.filter(i=>i!=="unsafe-inline").length>0||!!a&&a.filter(i=>i!=="unsafe-inline").length>0,this.#l=!!u&&u.filter(i=>i!=="unsafe-inline").length>0||!!c&&c.filter(i=>i!=="unsafe-inline").length>0||!!l&&l.filter(i=>i!=="unsafe-inline").length>0,this.script_needs_nonce=this.#t&&!this.#e,this.style_needs_nonce=this.#l&&!this.#e,this.#n=s;}add_script(t){if(this.#t){const r=this.#a;if(this.#e){const s=je(t);this.#r.push(`sha256-${s}`),r["script-src-elem"]?.length&&this.#o.push(`sha256-${s}`);}else this.#r.length===0&&this.#r.push(`nonce-${this.#n}`),r["script-src-elem"]?.length&&this.#o.push(`nonce-${this.#n}`);}}add_style(t){if(this.#l){const r=this.#a;if(this.#e){const s=je(t);this.#s.push(`sha256-${s}`),r["style-src-attr"]?.length&&this.#i.push(`sha256-${s}`),r["style-src-elem"]?.length&&this.#c.push(`sha256-${s}`);}else this.#s.length===0&&this.#s.push(`nonce-${this.#n}`),r["style-src-attr"]?.length&&this.#i.push(`nonce-${this.#n}`),r["style-src-elem"]?.length&&this.#c.push(`nonce-${this.#n}`);}}get_header(t=!1){const r=[],s={...this.#a};this.#s.length>0&&(s["style-src"]=[...s["style-src"]||s["default-src"]||[],...this.#s]),this.#i.length>0&&(s["style-src-attr"]=[...s["style-src-attr"]||[],...this.#i]),this.#c.length>0&&(s["style-src-elem"]=[...s["style-src-elem"]||[],...this.#c]),this.#r.length>0&&(s["script-src"]=[...s["script-src"]||s["default-src"]||[],...this.#r]),this.#o.length>0&&(s["script-src-elem"]=[...s["script-src-elem"]||[],...this.#o]);for(const n in s){if(t&&(n==="frame-ancestors"||n==="report-uri"||n==="sandbox"))continue;const o=s[n];if(!o)continue;const a=[n];Array.isArray(o)&&o.forEach(u=>{Kt.has(u)||Xt.test(u)?a.push(`'${u}'`):a.push(u);}),r.push(a.join(" "));}return r.join("; ")}}class Yt extends it{get_meta(){const t=this.get_header(!0);if(t)return `<meta http-equiv="content-security-policy" content=${rt(t)}>`}}class Qt extends it{constructor(t,r,s){if(super(t,r,s),Object.values(r).filter(n=>!!n).length>0){const n=r["report-to"]?.length??0>0,o=r["report-uri"]?.length??0>0;if(!n&&!o)throw Error("`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both")}}}class Zt{nonce=Vt();csp_provider;report_only_provider;constructor({mode:t,directives:r,reportOnly:s},{prerender:n}){const o=t==="hash"||t==="auto"&&n;this.csp_provider=new Yt(o,r,this.nonce),this.report_only_provider=new Qt(o,s,this.nonce);}get script_needs_nonce(){return this.csp_provider.script_needs_nonce||this.report_only_provider.script_needs_nonce}get style_needs_nonce(){return this.csp_provider.style_needs_nonce||this.report_only_provider.style_needs_nonce}add_script(t){this.csp_provider.add_script(t),this.report_only_provider.add_script(t);}add_style(t){this.csp_provider.add_style(t),this.report_only_provider.add_style(t);}}function Re(){let e,t;return {promise:new Promise((s,n)=>{e=s,t=n;}),fulfil:e,reject:t}}function ct(){const e=[Re()];return {iterator:{[Symbol.asyncIterator](){return {next:async()=>{const t=await e[0].promise;return t.done||e.shift(),t}}}},push:t=>{e[e.length-1].fulfil({value:t,done:!1}),e.push(Re());},done:()=>{e[e.length-1].fulfil({done:!0});}}}const er={...h$1(!1),check:()=>!1},Te=new TextEncoder;async function B({branch:e,fetched:t,options:r,manifest:s,state:n,page_config:o,status:a,error:u=null,event:c$1,resolve_opts:l$1,action_result:i}){if(n.prerendering){if(r.csp.mode==="nonce")throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');if(r.app_template_contains_nonce)throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%")}const{client:d}=s._,y=new Set(d.imports),h=new Set(d.stylesheets),p=new Set(d.fonts),m$1=new Set,_=new Map;let g;const w=i?.type==="success"||i?.type==="failure"?i.data??null:null;let b=c,f=m,k$1=L(c);if(n.prerendering?.fallback||(b=c$1.url.pathname.slice(c.length).split("/").slice(2).map(()=>"..").join("/")||".",k$1=`new URL(${L(b)}, location).pathname.slice(0, -1)`,(!m||m[0]==="/"&&m!==St)&&(f=b)),o.ssr){const x={stores:{page:l(null),navigating:l(null),updated:er},constructors:await Promise.all(e.map(({node:R})=>R.component())),form:w};let j={};for(let R=0;R<e.length;R+=1)j={...j,...e[R].data},x[`data_${R}`]=j;x.page={error:u,params:c$1.params,route:c$1.route,status:a,url:c$1.url,data:j,form:w,state:{}},L$1({base:b,assets:f});try{g=r.root.render(x);}finally{O$1();}for(const{node:R}of e){for(const T of R.imports)y.add(T);for(const T of R.stylesheets)h.add(T);for(const T of R.fonts)p.add(T);R.inline_styles&&Object.entries(await R.inline_styles()).forEach(([T,K])=>_.set(T,K));}}else g={head:"",html:"",css:{code:"",map:null}};let $="",v=g.html;const E=new Zt(r.csp,{prerender:!!n.prerendering}),S=x=>x.startsWith("/")?c+x:`${f}/${x}`;if(_.size>0){const x=Array.from(_.values()).join(`
`),j=[];E.style_needs_nonce&&j.push(` nonce="${E.nonce}"`),E.add_style(x),$+=`
	<style${j.join("")}>${x}</style>`;}for(const x of h){const j=S(x),R=['rel="stylesheet"'];if(_.has(x))R.push("disabled",'media="(max-width: 0)"');else if(l$1.preload({type:"css",path:j})){const T=['rel="preload"','as="style"'];m$1.add(`<${encodeURI(j)}>; ${T.join(";")}; nopush`);}$+=`
		<link href="${j}" ${R.join(" ")}>`;}for(const x of p){const j=S(x);if(l$1.preload({type:"font",path:j})){const T=['rel="preload"','as="font"',`type="font/${x.slice(x.lastIndexOf(".")+1)}"`,`href="${j}"`,"crossorigin"];$+=`
		<link ${T.join(" ")}>`;}}const N=`__sveltekit_${r.version_hash}`,{data:J,chunks:q}=tr(c$1,r,e.map(x=>x.server_data),N);if(o.ssr&&o.csr&&(v+=`
			${t.map(x=>Mt(x,l$1.filterSerializedResponseHeaders,!!n.prerendering)).join(`
			`)}`),o.csr){d.uses_env_dynamic_public&&n.prerendering&&y.add(`${r.app_dir}/env.js`);const x$1=Array.from(y,A=>S(A)).filter(A=>l$1.preload({type:"js",path:A}));for(const A of x$1)m$1.add(`<${encodeURI(A)}>; rel="modulepreload"; nopush`),r.preload_strategy!=="modulepreload"?$+=`
		<link rel="preload" as="script" crossorigin="anonymous" href="${A}">`:n.prerendering&&($+=`
		<link rel="modulepreload" href="${A}">`);const j=[],R=[m&&`assets: ${L(m)}`,`base: ${k$1}`,`env: ${!d.uses_env_dynamic_public||n.prerendering?null:L(x)}`].filter(Boolean);q&&(j.push("const deferred = new Map();"),R.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`),R.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`)),j.push(`${N} = {
						${R.join(`,
						`)}
					};`);const T=["app","element"];if(j.push("const element = document.currentScript.parentElement;"),o.ssr){const A={form:"null",error:"null"};j.push(`const data = ${J};`),w&&(A.form=zt(w,c$1.route.id)),u&&(A.error=uneval(u));const ee=[`node_ids: [${e.map(({node:ht})=>ht.index).join(", ")}]`,"data",`form: ${A.form}`,`error: ${A.error}`];a!==200&&ee.push(`status: ${a}`),r.embedded&&ee.push(`params: ${uneval(c$1.params)}`,`route: ${L(c$1.route)}`),T.push(`{
							${ee.join(`,
							`)}
						}`);}j.push(`Promise.all([
						import(${L(S(d.start))}),
						import(${L(S(d.app))})
					]).then(([kit, app]) => {
						kit.start(${T.join(", ")});
					});`),r.service_worker&&j.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${S("service-worker.js")}');
						});
					}`);const K=`
				{
					${j.join(`

					`)}
				}
			`;E.add_script(K),v+=`
			<script${E.script_needs_nonce?` nonce="${E.nonce}"`:""}>${K}<\/script>
		`;}const G=new Headers({"x-sveltekit-page":"true","content-type":"text/html"});if(n.prerendering){const x=[],j=E.csp_provider.get_meta();j&&x.push(j),n.prerendering.cache&&x.push(`<meta http-equiv="cache-control" content="${n.prerendering.cache}">`),x.length>0&&($=x.join(`
`)+$);}else {const x=E.csp_provider.get_header();x&&G.set("content-security-policy",x);const j=E.report_only_provider.get_header();j&&G.set("content-security-policy-report-only",j),m$1.size&&G.set("link",Array.from(m$1).join(", "));}$+=g.head;const ft=r.templates.app({head:$,body:v,assets:f,nonce:E.nonce,env:k}),Z=await l$1.transformPageChunk({html:ft,done:!0})||"";return q||G.set("etag",`"${et(Z)}"`),q?new Response(new ReadableStream({async start(x){x.enqueue(Te.encode(Z+`
`));for await(const j of q)x.enqueue(Te.encode(j));x.close();},type:"bytes"}),{headers:{"content-type":"text/html"}}):O(Z,{status:a,headers:G})}function tr(e,t,r,s){let n=1,o=0;const{iterator:a,push:u,done:c}=ct();function l(i){if(typeof i?.then=="function"){const d=n++;return o+=1,i.then(y=>({data:y})).catch(async y=>({error:await P(e,t,y)})).then(async({data:y,error:h})=>{o-=1;let p;try{p=uneval({id:d,data:y,error:h},l);}catch{h=await P(e,t,new Error(`Failed to serialize promise while rendering ${e.route.id}`)),y=void 0,p=uneval({id:d,data:y,error:h},l);}u(`<script>${s}.resolve(${p})<\/script>
`),o===0&&c();}),`${s}.defer(${d})`}}try{return {data:`[${r.map(d=>d?`{"type":"data","data":${uneval(d.data,l)},${Fe(d)}${d.slash?`,"slash":${JSON.stringify(d.slash)}`:""}}`:"null").join(",")}]`,chunks:o>0?a:null}}catch(i){throw new Error(Ge(e,i))}}function z(e,t){return e.reduce((r,s)=>s?.universal?.[t]??s?.server?.[t]??r,void 0)}async function lt({event:e,options:t,manifest:r,state:s,status:n,error:o,resolve_opts:a}){if(e.request.headers.get("x-sveltekit-error"))return Y(t,n,o.message);const u=[];try{const c=[],l=await r._.nodes[0](),i=z([l],"ssr")??!0,d=z([l],"csr")??!0;if(i){s.error=!0;const y=pe({event:e,state:s,node:l,parent:async()=>({})}),h=await y,p=await Ze({event:e,fetched:u,node:l,parent:async()=>({}),resolve_opts:a,server_data_promise:y,state:s,csr:d});c.push({node:l,server_data:h,data:p},{node:await r._.nodes[1](),data:null,server_data:null});}return await B({options:t,manifest:r,state:s,page_config:{ssr:i,csr:d},status:n,error:await P(e,t,o),branch:c,fetched:u,event:e,resolve_opts:a})}catch(c){return c instanceof D?Q(c.status,c.location):Y(t,M(c),(await P(e,t,c)).message)}}function rr(e){let t=!1,r;return ()=>t?r:(t=!0,r=e())}const Ae=new TextEncoder;async function sr(e,t,r,s,n,o,a){if(!t.page)return new Response(void 0,{status:404});try{const u=[...t.page.layouts,t.page.leaf],c=o??u.map(()=>!0);let l=!1;const i=new URL(e.url);i.pathname=b(i.pathname,a);const d={...e,url:i},y=u.map((w,b)=>rr(async()=>{try{if(l)return {type:"skip"};const f=w==null?w:await s._.nodes[w]();return pe({event:d,state:n,node:f,parent:async()=>{const k={};for(let $=0;$<b;$+=1){const v=await y[$]();v&&Object.assign(k,v.data);}return k}})}catch(f){throw l=!0,f}})),h=y.map(async(w,b)=>c[b]?w():{type:"skip"});let p=h.length;const m=await Promise.all(h.map((w,b)=>w.catch(async f=>{if(f instanceof D)throw f;return p=Math.min(p,b+1),{type:"error",error:await P(e,r,f),status:f instanceof V||f instanceof I?f.status:void 0}}))),{data:_,chunks:g}=ut(e,r,m);return g?new Response(new ReadableStream({async start(w){w.enqueue(Ae.encode(_));for await(const b of g)w.enqueue(Ae.encode(b));w.close();},type:"bytes"}),{headers:{"content-type":"text/sveltekit-data","cache-control":"private, no-store"}}):ce(_)}catch(u){const c=u;return c instanceof D?le(c):ce(await P(e,r,c),500)}}function ce(e,t=200){return O(typeof e=="string"?e:JSON.stringify(e),{status:t,headers:{"content-type":"application/json","cache-control":"private, no-store"}})}function le(e){return ce({type:"redirect",location:e.location})}function ut(e,t,r){let s=1,n=0;const{iterator:o,push:a,done:u}=ct(),c={Promise:l=>{if(typeof l?.then=="function"){const i=s++;n+=1;let d="data";return l.catch(async y=>(d="error",P(e,t,y))).then(async y=>{let h;try{h=stringify(y,c);}catch{const m=await P(e,t,new Error(`Failed to serialize promise while rendering ${e.route.id}`));d="error",h=stringify(m,c);}n-=1,a(`{"type":"chunk","id":${i},"${d}":${h}}
`),n===0&&u();}),i}}};try{return {data:`{"type":"data","nodes":[${r.map(i=>i?i.type==="error"||i.type==="skip"?JSON.stringify(i):`{"type":"data","data":${stringify(i.data,c)},${Fe(i)}${i.slash?`,"slash":${JSON.stringify(i.slash)}`:""}}`:"null").join(",")}]}
`,chunks:n>0?o:null}}catch(l){throw new Error(Ge(e,l))}}const nr=10;async function ar(e,t,r,s,n,o){if(n.depth>nr)return O(`Not found: ${e.url.pathname}`,{status:404});if(Be(e)){const a=await s._.nodes[t.leaf]();return Ht(e,r,a?.server)}try{const a=await Promise.all([...t.layouts.map(f=>f==null?f:s._.nodes[f]()),s._.nodes[t.leaf]()]),u=a.at(-1);let c=200,l;if(Nt(e)){if(l=await Ut(e,u.server),l?.type==="redirect")return Q(l.status,l.location);l?.type==="error"&&(c=M(l.error)),l?.type==="failure"&&(c=l.status);}const i=a.some(f=>f?.server?.load),d=O$2(e.url.pathname),y=z(a,"prerender")??!1;if(y){if(u.server?.actions)throw new Error("Cannot prerender pages with actions")}else if(n.prerendering)return new Response(void 0,{status:204});n.prerender_default=y;const h=[];if(z(a,"ssr")===!1&&!(n.prerendering&&i))return await B({branch:[],fetched:h,page_config:{ssr:!1,csr:z(a,"csr")??!0},status:c,error:null,event:e,options:r,manifest:s,state:n,resolve_opts:o});const p=[];let m=null;const _=a.map((f,k)=>{if(m)throw m;return Promise.resolve().then(async()=>{try{if(f===u&&l?.type==="error")throw l.error;return await pe({event:e,state:n,node:f,parent:async()=>{const $={};for(let v=0;v<k;v+=1){const E=await _[v];E&&Object.assign($,await E.data);}return $}})}catch($){throw m=$,m}})}),g=z(a,"csr")??!0,w=a.map((f,k)=>{if(m)throw m;return Promise.resolve().then(async()=>{try{return await Ze({event:e,fetched:h,node:f,parent:async()=>{const $={};for(let v=0;v<k;v+=1)Object.assign($,await w[v]);return $},resolve_opts:o,server_data_promise:_[k],state:n,csr:g})}catch($){throw m=$,m}})});for(const f of _)f.catch(()=>{});for(const f of w)f.catch(()=>{});for(let f=0;f<a.length;f+=1){const k=a[f];if(k)try{const $=await _[f],v=await w[f];p.push({node:k,server_data:$,data:v});}catch($){const v=$;if(v instanceof D){if(n.prerendering&&i){const N=JSON.stringify({type:"redirect",location:v.location});n.prerendering.dependencies.set(d,{response:O(N),body:N});}return Q(v.status,v.location)}const E=M(v),S=await P(e,r,v);for(;f--;)if(t.errors[f]){const N=t.errors[f],J=await s._.nodes[N]();let q=f;for(;!p[q];)q-=1;return await B({event:e,options:r,manifest:s,state:n,resolve_opts:o,page_config:{ssr:!0,csr:!0},status:E,error:S,branch:ke(p.slice(0,q+1)).concat({node:J,data:null,server_data:null}),fetched:h})}return Y(r,E,S.message)}else p.push(null);}if(n.prerendering&&i){let{data:f,chunks:k}=ut(e,r,p.map($=>$?.server_data));if(k)for await(const $ of k)f+=$;n.prerendering.dependencies.set(d,{response:O(f),body:f});}const b=z(a,"ssr")??!0;return await B({event:e,options:r,manifest:s,state:n,resolve_opts:o,page_config:{csr:z(a,"csr")??!0,ssr:b},status:c,error:null,branch:b===!1?[]:ke(p),action_result:l,fetched:h})}catch(a){return await lt({event:e,options:r,manifest:s,state:n,status:500,error:a,resolve_opts:o})}}function or(e,t,r){const s={},n=e.slice(1),o=n.filter(u=>u!==void 0);let a=0;for(let u=0;u<t.length;u+=1){const c=t[u];let l=n[u-a];if(c.chained&&c.rest&&a&&(l=n.slice(u-a,u+1).filter(i=>i).join("/"),a=0),l===void 0){c.rest&&(s[c.name]="");continue}if(!c.matcher||r[c.matcher](l)){s[c.name]=l;const i=t[u+1],d=n[u+1];i&&!i.rest&&i.optional&&d&&c.chained&&(a=0),!i&&!d&&Object.keys(s).length===o.length&&(a=0);continue}if(c.optional&&c.chained){a++;continue}return}if(!a)return s}function te(e){if(e?.path===void 0)throw new Error("You must specify a `path` when setting, deleting or serializing cookies")}function ir(e,t,r){const s=e.headers.get("cookie")??"",n=cookieExports.parse(s,{decode:d=>d}),o=b(t.pathname,r),a={},u={httpOnly:!0,sameSite:"lax",secure:!(t.hostname==="localhost"&&t.protocol==="http:")},c={get(d,y){const h=a[d];if(h&&re(t.hostname,h.options.domain)&&se(t.pathname,h.options.path))return h.value;const p=y?.decode||decodeURIComponent;return cookieExports.parse(s,{decode:p})[d]},getAll(d){const y=d?.decode||decodeURIComponent,h=cookieExports.parse(s,{decode:y});for(const p of Object.values(a))re(t.hostname,p.options.domain)&&se(t.pathname,p.options.path)&&(h[p.name]=p.value);return Object.entries(h).map(([p,m])=>({name:p,value:m}))},set(d,y,h){te(h),i(d,y,{...u,...h});},delete(d,y){te(y),c.set(d,"",{...y,maxAge:0});},serialize(d,y,h){te(h);let p=h.path;return (!h.domain||h.domain===t.hostname)&&(p=S(o,p)),cookieExports.serialize(d,y,{...u,...h,path:p})}};function l(d,y){const h={...n};for(const p in a){const m=a[p];if(!re(d.hostname,m.options.domain)||!se(d.pathname,m.options.path))continue;const _=m.options.encode||encodeURIComponent;h[m.name]=_(m.value);}if(y){const p=cookieExports.parse(y,{decode:m=>m});for(const m in p)h[m]=p[m];}return Object.entries(h).map(([p,m])=>`${p}=${m}`).join("; ")}function i(d,y,h){let p=h.path;(!h.domain||h.domain===t.hostname)&&(p=S(o,p)),a[d]={name:d,value:y,options:{...h,path:p}};}return {cookies:c,new_cookies:a,get_cookie_header:l,set_internal:i}}function re(e,t){if(!t)return !0;const r=t[0]==="."?t.slice(1):t;return e===r?!0:e.endsWith("."+r)}function se(e,t){if(!t)return !0;const r=t.endsWith("/")?t.slice(0,-1):t;return e===r?!0:e.startsWith(r+"/")}function Oe(e,t){for(const r of t){const{name:s,value:n,options:o}=r;if(e.append("set-cookie",cookieExports.serialize(s,n,o)),o.path.endsWith(".html")){const a=O$2(o.path);e.append("set-cookie",cookieExports.serialize(s,n,{...o,path:a}));}}}function cr({event:e,options:t,manifest:r,state:s,get_cookie_header:n,set_internal:o}){const a=async(u,c$1)=>{const l=Pe(u,c$1,e.url);let i=(u instanceof Request?u.mode:c$1?.mode)??"cors",d=(u instanceof Request?u.credentials:c$1?.credentials)??"same-origin";return t.hooks.handleFetch({event:e,request:l,fetch:async(y,h)=>{const p=Pe(y,h,e.url),m$1=new URL(p.url);if(p.headers.has("origin")||p.headers.set("origin",e.url.origin),y!==l&&(i=(y instanceof Request?y.mode:h?.mode)??"cors",d=(y instanceof Request?y.credentials:h?.credentials)??"same-origin"),(p.method==="GET"||p.method==="HEAD")&&(i==="no-cors"&&m$1.origin!==e.url.origin||m$1.origin===e.url.origin)&&p.headers.delete("origin"),m$1.origin!==e.url.origin){if(`.${m$1.hostname}`.endsWith(`.${e.url.hostname}`)&&d!=="omit"){const E=n(m$1,p.headers.get("cookie"));E&&p.headers.set("cookie",E);}return fetch(p)}const _=m||c,g=decodeURIComponent(m$1.pathname),w=(g.startsWith(_)?g.slice(_.length):g).slice(1),b=`${w}/index.html`,f=r.assets.has(w),k=r.assets.has(b);if(f||k){const E=f?w:b;if(s.read){const S=f?r.mimeTypes[w.slice(w.lastIndexOf("."))]:"text/html";return new Response(s.read(E),{headers:S?{"content-type":S}:{}})}return await fetch(p)}if(d!=="omit"){const E=n(m$1,p.headers.get("cookie"));E&&p.headers.set("cookie",E);const S=e.request.headers.get("authorization");S&&!p.headers.has("authorization")&&p.headers.set("authorization",S);}p.headers.has("accept")||p.headers.set("accept","*/*"),p.headers.has("accept-language")||p.headers.set("accept-language",e.request.headers.get("accept-language"));const $=await dt(p,t,r,{...s,depth:s.depth+1}),v=$.headers.get("set-cookie");if(v)for(const E of setCookieExports.splitCookiesString(v)){const{name:S,value:N,...J}=setCookieExports.parseString(E),q=J.path??(m$1.pathname.split("/").slice(0,-1).join("/")||"/");o(S,N,{path:q,...J});}return $}})};return (u,c)=>{const l=a(u,c);return l.catch(()=>{}),l}}function Pe(e,t,r){return e instanceof Request?e:new Request(typeof e=="string"?new URL(e,r):e,t)}let qe,ne,ae;function lr(e){return qe??=`export const env=${JSON.stringify(x)}`,ne??=`W/${Date.now()}`,ae??=new Headers({"content-type":"application/javascript; charset=utf-8",etag:ne}),e.headers.get("if-none-match")===ne?new Response(void 0,{status:304,headers:ae}):new Response(qe,{headers:ae})}const Ce=({html:e})=>e,He=()=>!1,Ne=({type:e})=>e==="js"||e==="css",ur=new Set(["GET","HEAD","POST"]),dr=new Set(["GET","HEAD","OPTIONS"]);async function dt(e,t,r,s){const n=new URL(e.url);if(t.csrf_check_origin&&We(e)&&(e.method==="POST"||e.method==="PUT"||e.method==="PATCH"||e.method==="DELETE")&&e.headers.get("origin")!==n.origin){const g=new V(403,`Cross-site ${e.method} form submissions are forbidden`);return e.headers.get("accept")==="application/json"?he(g.body,{status:g.status}):O(g.body.message,{status:g.status})}let o;try{o=m$1(n.pathname);}catch{return O("Malformed URI",{status:400})}let a=null,u={};if(c&&!s.prerendering?.fallback){if(!o.startsWith(c))return O("Not found",{status:404});o=o.slice(c.length)||"/";}if(o===`/${t.app_dir}/env.js`)return lr(e);const c$1=U$1(o);let l;if(c$1&&(o=T(o)||"/",n.pathname=T(n.pathname)+(n.searchParams.get(Ee)==="1"?"/":"")||"/",n.searchParams.delete(Ee),l=n.searchParams.get(xe)?.split("").map(_=>_==="1"),n.searchParams.delete(xe)),!s.prerendering?.fallback){const _=await r._.matchers();for(const g of r._.routes){const w=g.pattern.exec(o);if(!w)continue;const b=or(w,g.params,_);if(b){a=g,u=P$1(b);break}}}let i;const d={};let y$1={};const h={cookies:null,fetch:null,getClientAddress:s.getClientAddress||(()=>{throw new Error("@sveltejs/adapter-node does not specify getClientAddress. Please raise an issue")}),locals:{},params:u,platform:s.platform,request:e,route:{id:a?.id??null},setHeaders:_=>{for(const g in _){const w=g.toLowerCase(),b=_[g];if(w==="set-cookie")throw new Error("Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies");if(w in d)throw new Error(`"${g}" header is already set`);d[w]=b,s.prerendering&&w==="cache-control"&&(s.prerendering.cache=b);}},url:n,isDataRequest:c$1,isSubRequest:s.depth>0};let p={transformPageChunk:Ce,filterSerializedResponseHeaders:He,preload:Ne};try{if(a){if(n.pathname===c||n.pathname===c+"/")i="always";else if(a.page){const k=await Promise.all([...a.page.layouts.map($=>$==null?$:r._.nodes[$]()),r._.nodes[a.page.leaf]()]);i=z(k,"trailingSlash");}else a.endpoint&&(i=(await a.endpoint()).trailingSlash);if(!c$1){const k=b(n.pathname,i??"never");if(k!==n.pathname&&!s.prerendering?.fallback)return new Response(void 0,{status:308,headers:{"x-sveltekit-normalize":"1",location:(k.startsWith("//")?n.origin+k:k)+(n.search==="?"?"":n.search)}})}}const{cookies:_,new_cookies:g,get_cookie_header:w,set_internal:b$1}=ir(e,n,i??"never");y$1=g,h.cookies=_,h.fetch=cr({event:h,options:t,manifest:r,state:s,get_cookie_header:w,set_internal:b$1}),s.prerendering&&!s.prerendering.fallback&&y(n);const f=await t.hooks.handle({event:h,resolve:(k,$)=>m(k,$).then(v=>{for(const E in d){const S=d[E];v.headers.set(E,S);}return Oe(v.headers,Object.values(y$1)),s.prerendering&&k.route.id!==null&&v.headers.set("x-sveltekit-routeid",encodeURI(k.route.id)),v})});if(f.status===200&&f.headers.has("etag")){let k=e.headers.get("if-none-match");k?.startsWith('W/"')&&(k=k.substring(2));const $=f.headers.get("etag");if(k===$){const v=new Headers({etag:$});for(const E of ["cache-control","content-location","date","expires","vary","set-cookie"]){const S=f.headers.get(E);S&&v.set(E,S);}return new Response(void 0,{status:304,headers:v})}}if(c$1&&f.status>=300&&f.status<=308){const k=f.headers.get("location");if(k)return le(new D(f.status,k))}return f}catch(_){if(_ instanceof D){const g=c$1?le(_):a?.page&&Be(h)?Ke(_):Q(_.status,_.location);return Oe(g.headers,Object.values(y$1)),g}return await be(h,t,_)}async function m(_,g){try{if(g&&(p={transformPageChunk:g.transformPageChunk||Ce,filterSerializedResponseHeaders:g.filterSerializedResponseHeaders||He,preload:g.preload||Ne}),s.prerendering?.fallback)return await B({event:_,options:t,manifest:r,state:s,page_config:{ssr:!1,csr:!0},status:200,error:null,branch:[],fetched:[],resolve_opts:p});if(a){const w=_.request.method;let b;if(c$1)b=await sr(_,a,t,r,s,l,i??"never");else if(a.endpoint&&(!a.page||Ct(_)))b=await qt(_,await a.endpoint(),s);else if(a.page)if(ur.has(w))b=await ar(_,a.page,t,r,s,p);else {const f=new Set(dr);if((await r._.nodes[a.page.leaf]())?.server?.actions&&f.add("POST"),w==="OPTIONS")b=new Response(null,{status:204,headers:{allow:Array.from(f.values()).join(", ")}});else {const $=[...f].reduce((v,E)=>(v[E]=!0,v),{});b=Me($,w);}}else throw new Error("This should never happen");if(e.method==="GET"&&a.page&&a.endpoint){const f=b.headers.get("vary")?.split(",")?.map(k=>k.trim().toLowerCase());f?.includes("accept")||f?.includes("*")||(b=new Response(b.body,{status:b.status,statusText:b.statusText,headers:new Headers(b.headers)}),b.headers.append("Vary","Accept"));}return b}return s.error&&_.isSubRequest?await fetch(e,{headers:{"x-sveltekit-error":"true"}}):s.error?O("Internal Server Error",{status:500}):s.depth===0?await lt({event:_,options:t,manifest:r,state:s,status:404,error:new I(404,"Not Found",`Not found: ${_.url.pathname}`),resolve_opts:p}):s.prerendering?O("not found",{status:404}):await fetch(e)}catch(w){return await be(_,t,w)}finally{_.cookies.set=()=>{throw new Error("Cannot use `cookies.set(...)` after the response has been generated")},_.setHeaders=()=>{throw new Error("Cannot use `setHeaders(...)` after the response has been generated")};}}}function fr(e,{public_prefix:t,private_prefix:r}){return Object.fromEntries(Object.entries(e).filter(([s])=>s.startsWith(r)&&(t===""||!s.startsWith(t))))}function hr(e,{public_prefix:t,private_prefix:r}){return Object.fromEntries(Object.entries(e).filter(([s])=>s.startsWith(t)&&(r===""||!s.startsWith(r))))}class vr{#e;#t;constructor(t){this.#e=q,this.#t=t;}async init({env:t}){const r={public_prefix:this.#e.env_public_prefix,private_prefix:this.#e.env_private_prefix};fr(t,r);const n=hr(t,r);if(D$1(n),G(n),!this.#e.hooks)try{const o=await z$1();this.#e.hooks={handle:o.handle||(({event:a,resolve:u})=>u(a)),handleError:o.handleError||(({error:a})=>console.error(a)),handleFetch:o.handleFetch||(({request:a,fetch:u})=>u(a))};}catch(o){throw o}}async respond(t,r){return dt(t,this.#e,this.#t,{...r,error:!1,depth:0})}}

export { vr as Server };
//# sourceMappingURL=index.js.map
