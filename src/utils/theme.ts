import { DEFAULT_THEME } from "../constants/default-theme.js";
import {
	EnterpriseTheme,
	ThemeRoles,
	TypographyStyle,
} from "../types/index.js";

const THEME_START = "/* theme start */";
const THEME_END = "/* theme end */";

const THEME_ROLE_VARIABLES = {
	background: "background",
	surface: "surface",
	text: "foreground",
	textMuted: "muted",
	border: "border",
	primary: "brand",
	primaryHover: "brand-hover",
	secondary: "accent",
	secondaryHover: "accent-hover",
	danger: "danger",
	dangerHover: "danger-hover",
	onPrimary: "on-brand",
	onSecondary: "on-accent",
	onDanger: "on-danger",
	inputBackground: "input",
	inputBorder: "input-border",
	inputFocusRing: "focus-ring",
} satisfies Record<keyof ThemeRoles, string>;

const BUTTON_INTENTS = [
	{
		name: "primary",
		baseColor: "var(--color-brand)",
		hoverColor: "var(--color-brand-hover)",
		foregroundColor: "var(--color-on-brand)",
	},
	{
		name: "secondary",
		baseColor: "var(--color-accent)",
		hoverColor: "var(--color-accent-hover)",
		foregroundColor: "var(--color-on-accent)",
	},
	{
		name: "danger",
		baseColor: "var(--color-danger)",
		hoverColor: "var(--color-danger-hover)",
		foregroundColor: "var(--color-on-danger)",
	},
] as const;

const TYPOGRAPHY_CLASS_NAMES = {
	heading1: "heading-1",
	heading2: "heading-2",
	heading3: "heading-3",
	heading4: "heading-4",
	heading5: "heading-5",
	heading6: "heading-6",
	body: "body",
	bodySm: "body-sm",
	label: "label",
	labelSm: "label-sm",
	caption: "caption",
} as const;

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function cloneValue<T>(value: T): T {
	return JSON.parse(JSON.stringify(value)) as T;
}

function formatNumber(value: number): string {
	return Number.parseFloat(value.toFixed(4)).toString();
}

function pxToRem(value: string): string {
	return value.replace(/(-?\d*\.?\d+)px\b/g, (_, rawNumber) => {
		const remValue = Number.parseFloat(rawNumber) / 16;
		return `${formatNumber(remValue)}rem`;
	});
}

function normalizeValue(value: string): string {
	return pxToRem(value);
}

function assertObjectShape(
	value: unknown,
	schema: unknown,
	currentPath: string,
): void {
	if (schema === null || typeof schema !== "object" || Array.isArray(schema)) {
		if (typeof value !== typeof schema) {
			throw new Error(
				`Invalid value at ${currentPath}. Expected ${typeof schema}.`,
			);
		}
		return;
	}

	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`Invalid value at ${currentPath}. Expected an object.`);
	}

	const schemaObject = schema as Record<string, unknown>;
	const valueObject = value as Record<string, unknown>;
	const schemaKeys = Object.keys(schemaObject).sort();
	const valueKeys = Object.keys(valueObject).sort();

	if (
		schemaKeys.length !== valueKeys.length ||
		schemaKeys.some((key, index) => key !== valueKeys[index])
	) {
		throw new Error(
			`Theme schema mismatch at ${currentPath}. Edit values only; do not add or remove keys.`,
		);
	}

	for (const key of schemaKeys) {
		const nextPath =
			currentPath === "theme" ? `theme.${key}` : `${currentPath}.${key}`;
		assertObjectShape(valueObject[key], schemaObject[key], nextPath);
	}
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return value !== null && typeof value === "object" && !Array.isArray(value);
}

function assertStringRecord(value: unknown, currentPath: string): void {
	if (!isRecord(value)) {
		throw new Error(`Invalid value at ${currentPath}. Expected an object.`);
	}

	for (const [key, entry] of Object.entries(value)) {
		if (typeof entry !== "string") {
			throw new Error(
				`Invalid value at ${currentPath}.${key}. Expected a string.`,
			);
		}
	}
}

function assertThemeColorScales(colors: unknown): void {
	if (!isRecord(colors)) {
		throw new Error("Invalid value at theme.colors. Expected an object.");
	}

	for (const [familyName, scale] of Object.entries(colors)) {
		assertStringRecord(scale, `theme.colors.${familyName}`);
	}
}

function themeLine(name: string, value: string): string {
	return `  ${name}: ${value};`;
}

function cssRuleLines(selector: string, declarations: string[]): string[] {
	return [
		selector,
		...declarations.map((declaration) => `  ${declaration}`),
		"}",
	];
}

function componentRuleLines(
	selector: string,
	declarations: string[],
): string[] {
	return [
		`  ${selector}`,
		...declarations.map((declaration) => `    ${declaration}`),
		"  }",
	];
}

function resolvePath(pathString: string, theme: EnterpriseTheme): string {
	const keys = pathString.split(".");
	let current: unknown = theme;

	for (const key of keys) {
		if (
			current === null ||
			typeof current !== "object" ||
			!(key in (current as Record<string, unknown>))
		) {
			throw new Error(`Could not resolve token reference {${pathString}}.`);
		}

		current = (current as Record<string, unknown>)[key];
	}

	if (typeof current !== "string") {
		throw new Error(
			`Token reference {${pathString}} did not resolve to a string value.`,
		);
	}

	return current;
}

export function resolveToken(value: string, theme: EnterpriseTheme): string {
	return value.replace(/\{([^}]+)\}/g, (_, pathString) => {
		return resolveToken(resolvePath(pathString, theme), theme);
	});
}

function resolveAndNormalize(value: string, theme: EnterpriseTheme): string {
	return normalizeValue(resolveToken(value, theme));
}

function getRoleCssVariable(pathString: string): string | null {
	const parts = pathString.split(".");
	if (parts[0] !== "themes" || parts.length !== 3) {
		return null;
	}

	const roleName = parts[2] as keyof ThemeRoles;
	const cssName = THEME_ROLE_VARIABLES[roleName];
	return cssName ? `var(--color-${cssName})` : null;
}

function getPaletteCssVariable(pathString: string): string | null {
	const parts = pathString.split(".");
	if (parts[0] !== "colors" || parts.length !== 3) {
		return null;
	}

	return `var(--color-${parts[1]}-${parts[2]})`;
}

function resolveCssValue(value: string, theme: EnterpriseTheme): string {
	return normalizeValue(
		value.replace(/\{([^}]+)\}/g, (_, pathString) => {
			return (
				getRoleCssVariable(pathString) ??
				getPaletteCssVariable(pathString) ??
				resolveToken(`{${pathString}}`, theme)
			);
		}),
	);
}

function pushPaletteVariables(lines: string[], theme: EnterpriseTheme): void {
	for (const [familyName, scale] of Object.entries(theme.colors)) {
		for (const [tokenName, tokenValue] of Object.entries(
			scale as Record<string, string>,
		)) {
			lines.push(
				themeLine(
					`--color-${familyName}-${tokenName}`,
					resolveAndNormalize(tokenValue, theme),
				),
			);
		}
	}
}

function pushRoleVariables(
	lines: string[],
	roles: ThemeRoles,
	theme: EnterpriseTheme,
): void {
	for (const [roleName, cssName] of Object.entries(THEME_ROLE_VARIABLES)) {
		lines.push(
			themeLine(
				`--color-${cssName}`,
				resolveAndNormalize(roles[roleName as keyof ThemeRoles], theme),
			),
		);
	}
}

function pushTypographyVariables(
	lines: string[],
	theme: EnterpriseTheme,
): void {
	lines.push(
		themeLine(
			"--font-sans",
			resolveAndNormalize(theme.typography.fontFamily.sans, theme),
		),
	);
	lines.push(
		themeLine(
			"--font-mono",
			resolveAndNormalize(theme.typography.fontFamily.mono, theme),
		),
	);

	for (const [tokenName, style] of Object.entries(theme.typography.styles)) {
		const typedStyle = style as TypographyStyle;
		lines.push(
			themeLine(
				`--text-${tokenName}`,
				resolveAndNormalize(typedStyle.size, theme),
			),
		);
		lines.push(
			themeLine(
				`--text-${tokenName}--line-height`,
				resolveAndNormalize(typedStyle.lineHeight, theme),
			),
		);
		lines.push(
			themeLine(
				`--tracking-${tokenName}`,
				resolveAndNormalize(typedStyle.letterSpacing, theme),
			),
		);
		lines.push(
			themeLine(
				`--font-weight-${tokenName}`,
				resolveAndNormalize(typedStyle.weight, theme),
			),
		);
	}
}

function buildThemeInlineLines(theme: EnterpriseTheme): string[] {
	const lines = ["@theme inline {"];
	pushPaletteVariables(lines, theme);
	pushRoleVariables(lines, theme.themes.light, theme);
	pushTypographyVariables(lines, theme);
	lines.push("}");
	return lines;
}

function buildTypographyUtilities(theme: EnterpriseTheme): string[] {
	const lines: string[] = [];

	for (const tokenName of Object.keys(theme.typography.styles) as Array<
		keyof typeof TYPOGRAPHY_CLASS_NAMES
	>) {
		const className = TYPOGRAPHY_CLASS_NAMES[tokenName];
		lines.push(
			`@utility ${className} {`,
			`  font-size: var(--text-${tokenName});`,
			`  font-weight: var(--font-weight-${tokenName});`,
			`  line-height: var(--text-${tokenName}--line-height);`,
			`  letter-spacing: var(--tracking-${tokenName});`,
			"}",
		);
	}

	return lines;
}

function buildButtonVariantLines(): string[] {
	const lines: string[] = ["@layer components {"];

	lines.push(
		...componentRuleLines(".btn {", [
			"display: inline-flex;",
			"align-items: center;",
			"justify-content: center;",
			"gap: 0.5rem;",
			"border-radius: 0.75rem;",
			"border: 1px solid transparent;",
			"font-size: var(--text-label);",
			"font-weight: var(--font-weight-label);",
			"line-height: var(--text-label--line-height);",
			"letter-spacing: var(--tracking-label);",
			"transition-property: background-color, border-color, color, box-shadow, opacity;",
			"transition-duration: 150ms;",
			"transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);",
			"cursor: pointer;",
		]),
	);
	lines.push(
		...componentRuleLines(".btn:focus-visible {", [
			"outline: none;",
			"box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-focus-ring) 35%, transparent);",
		]),
	);
	lines.push(
		...componentRuleLines(".btn:disabled {", [
			"cursor: not-allowed;",
			"opacity: 0.55;",
		]),
	);

	for (const intent of BUTTON_INTENTS) {
		lines.push(
			...componentRuleLines(`.btn-${intent.name}-filled {`, [
				`background-color: ${intent.baseColor};`,
				`border-color: ${intent.baseColor};`,
				`color: ${intent.foregroundColor};`,
			]),
		);
		lines.push(
			...componentRuleLines(`.btn-${intent.name}-filled:hover {`, [
				`background-color: ${intent.hoverColor};`,
				`border-color: ${intent.hoverColor};`,
			]),
		);
		lines.push(
			...componentRuleLines(`.btn-${intent.name}-outlined {`, [
				"background-color: transparent;",
				`border-color: ${intent.baseColor};`,
				`color: ${intent.baseColor};`,
			]),
		);
		lines.push(
			...componentRuleLines(`.btn-${intent.name}-outlined:hover {`, [
				`background-color: color-mix(in srgb, ${intent.baseColor} 10%, transparent);`,
				`border-color: ${intent.hoverColor};`,
				`color: ${intent.hoverColor};`,
			]),
		);
		lines.push(
			...componentRuleLines(`.btn-${intent.name}-ghost {`, [
				"background-color: transparent;",
				"border-color: transparent;",
				`color: ${intent.baseColor};`,
			]),
		);
		lines.push(
			...componentRuleLines(`.btn-${intent.name}-ghost:hover {`, [
				`background-color: color-mix(in srgb, ${intent.baseColor} 12%, transparent);`,
				`color: ${intent.hoverColor};`,
			]),
		);
	}

	lines.push(
		...componentRuleLines(".input {", [
			"width: 100%;",
			"border-radius: 0.75rem;",
			"border: 1px solid var(--color-input-border);",
			"background-color: var(--color-input);",
			"font-size: var(--text-body);",
			"font-weight: var(--font-weight-body);",
			"line-height: var(--text-body--line-height);",
			"letter-spacing: var(--tracking-body);",
			"color: var(--color-foreground);",
			"transition-property: border-color, box-shadow, background-color;",
			"transition-duration: 150ms;",
			"transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);",
			"outline: none;",
		]),
	);
	lines.push(
		...componentRuleLines(".input::placeholder {", [
			"color: var(--color-muted);",
		]),
	);
	lines.push(
		...componentRuleLines(".input:focus-visible {", [
			"border-color: var(--color-focus-ring);",
			"box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-focus-ring) 25%, transparent);",
		]),
	);

	lines.push("}");
	return lines;
}

export function getDefaultTheme(): EnterpriseTheme {
	return cloneValue(DEFAULT_THEME);
}

export function validateTheme(theme: unknown): EnterpriseTheme {
	if (!isRecord(theme)) {
		throw new Error("Invalid value at theme. Expected an object.");
	}

	if (typeof theme.version !== "string") {
		throw new Error("Invalid value at theme.version. Expected a string.");
	}

	assertThemeColorScales(theme.colors);
	assertObjectShape(
		theme.typography,
		DEFAULT_THEME.typography,
		"theme.typography",
	);
	assertObjectShape(theme.themes, DEFAULT_THEME.themes, "theme.themes");

	return theme as EnterpriseTheme;
}

export function generateThemeCss(theme: EnterpriseTheme): string {
	return [
		THEME_START,
		...buildThemeInlineLines(theme),
		"",
		...buildTypographyUtilities(theme),
		"",
		...buildButtonVariantLines(),
		THEME_END,
	].join("\n");
}

export function replaceThemeBlock(content: string, themeCss: string): string {
	const pattern = new RegExp(
		`${escapeRegExp(THEME_START)}[\\s\\S]*?${escapeRegExp(THEME_END)}`,
		"m",
	);

	if (!pattern.test(content)) {
		throw new Error("Could not find theme block in globals.css.");
	}

	return content.replace(pattern, themeCss.trim());
}
