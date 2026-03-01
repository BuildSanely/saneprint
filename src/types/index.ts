export type ProjectType = "next" | "mobile";
export type DesignSystemType = "default" | "custom";

export interface ProjectConfig {
	path: string;
	type: ProjectType;
	websiteName: string;
	designSystem: DesignSystemType;
}

export interface CLIOptions {
	path?: string;
	type?: string;
	name?: string;
	designSystem?: string;
	primary?: string;
	secondary?: string;
}

export interface EnterpriseTheme {
	version: string;
	colors: ThemeColors;
	typography: ThemeTypography;
	themes: {
		light: ThemeRoles;
	};
}

export interface ThemeColors {
	primary: ThemePaletteScale;
	secondary: ThemePaletteScale;
	tertiary: ThemePaletteScale;
	neutral: ThemeNeutralScale;
	danger: ThemeIntentScale;
	success: ThemeIntentScale;
	warning: ThemeIntentScale;
	info: ThemeIntentScale;
}

export interface ThemeTypography {
	fontFamily: {
		sans: string;
		mono: string;
	};
	styles: {
		heading1: TypographyStyle;
		heading2: TypographyStyle;
		heading3: TypographyStyle;
		heading4: TypographyStyle;
		heading5: TypographyStyle;
		heading6: TypographyStyle;
		body: TypographyStyle;
		bodySm: TypographyStyle;
		label: TypographyStyle;
		labelSm: TypographyStyle;
		caption: TypographyStyle;
	};
}

export interface TypographyStyle {
	size: string;
	weight: string;
	lineHeight: string;
	letterSpacing: string;
}

export interface ThemeRoles {
	background: string;
	surface: string;
	text: string;
	textMuted: string;
	border: string;
	primary: string;
	primaryHover: string;
	secondary: string;
	secondaryHover: string;
	tertiary: string;
	tertiaryHover: string;
	danger: string;
	dangerHover: string;
	onPrimary: string;
	onSecondary: string;
	onTertiary: string;
	onDanger: string;
	inputBackground: string;
	inputBorder: string;
	inputFocusRing: string;
}

export interface ThemePaletteScale {
	"50": string;
	"100": string;
	"200": string;
	"300": string;
	"400": string;
	"500": string;
	"600": string;
	"700": string;
	"800": string;
	"900": string;
}

export interface ThemeNeutralScale {
	"0": string;
	"50": string;
	"100": string;
	"200": string;
	"300": string;
	"400": string;
	"500": string;
	"600": string;
	"700": string;
	"800": string;
	"900": string;
	"1000": string;
}

export interface ThemeIntentScale {
	"500": string;
	"600": string;
}
