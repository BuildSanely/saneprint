import { EnterpriseTheme } from "../types/index.js";

export const DEFAULT_THEME: EnterpriseTheme = {
	version: "1.0.0",
	colors: {
		primary: {
			"50": "oklch(0.985 0.015 180)", // #f0fdfa
			"100": "oklch(0.97 0.04 180)", // #ccfbf1
			"200": "oklch(0.94 0.07 180)", // #99f6e4
			"300": "oklch(0.89 0.1 180)", // #5eead4
			"400": "oklch(0.79 0.13 180)", // #2dd4bf
			"500": "oklch(0.7 0.14 180)", // #14b8a6 - Teal primary
			"600": "oklch(0.59 0.13 185)", // #0d9488
			"700": "oklch(0.5 0.11 190)", // #0f766e
			"800": "oklch(0.41 0.09 190)", // #115e59
			"900": "oklch(0.35 0.07 195)", // #134e4a
		},
		secondary: {
			"50": "oklch(0.98 0.01 200)",
			"100": "oklch(0.95 0.02 200)",
			"200": "oklch(0.88 0.04 200)",
			"300": "oklch(0.8 0.06 200)",
			"400": "oklch(0.7 0.08 200)",
			"500": "oklch(0.6 0.09 200)",
			"600": "oklch(0.5 0.08 200)",
			"700": "oklch(0.4 0.07 200)",
			"800": "oklch(0.3 0.06 200)",
			"900": "oklch(0.2 0.05 200)",
		},
		tertiary: {
			"50": "oklch(0.97 0.02 310)",
			"100": "oklch(0.93 0.04 310)",
			"200": "oklch(0.87 0.08 310)",
			"300": "oklch(0.79 0.13 310)",
			"400": "oklch(0.7 0.18 310)",
			"500": "oklch(0.62 0.22 310)",
			"600": "oklch(0.54 0.2 310)",
			"700": "oklch(0.46 0.17 310)",
			"800": "oklch(0.38 0.14 310)",
			"900": "oklch(0.3 0.1 310)",
		},
		neutral: {
			"0": "#ffffff",
			"50": "oklch(0.99 0 0)", // #fafafa
			"100": "oklch(0.97 0 0)", // #f5f5f5
			"200": "oklch(0.92 0 0)", // #e5e5e5
			"300": "oklch(0.86 0 0)", // #d4d4d4
			"400": "oklch(0.68 0 0)", // #a3a3a3
			"500": "oklch(0.52 0 0)", // #737373
			"600": "oklch(0.38 0 0)", // #525252
			"700": "oklch(0.3 0 0)", // #404040
			"800": "oklch(0.19 0 0)", // #262626
			"900": "oklch(0.13 0 0)", // #171717
			"1000": "#000000",
		},
		danger: {
			"500": "oklch(0.628 0.218 29)", // #ef4444
			"600": "oklch(0.55 0.2 29)",
		},
		success: {
			"500": "oklch(0.698 0.176 142)", // #22c55e
			"600": "oklch(0.6 0.16 142)",
		},
		warning: {
			"500": "oklch(0.705 0.15 65)", // #f59e0b
			"600": "oklch(0.62 0.14 65)",
		},
		info: {
			"500": "oklch(0.596 0.182 255)", // #3b82f6
			"600": "oklch(0.52 0.17 255)",
		},
	},
	typography: {
		fontFamily: {
			sans: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
			mono: "var(--font-geist-mono), ui-monospace, monospace",
		},
		styles: {
			heading1: {
				size: "48px",
				weight: "700",
				lineHeight: "1.1",
				letterSpacing: "-0.02em",
			},
			heading2: {
				size: "36px",
				weight: "700",
				lineHeight: "1.2",
				letterSpacing: "-0.01em",
			},
			heading3: {
				size: "30px",
				weight: "700",
				lineHeight: "1.25",
				letterSpacing: "-0.01em",
			},
			heading4: {
				size: "24px",
				weight: "600",
				lineHeight: "1.3",
				letterSpacing: "-0.005em",
			},
			heading5: {
				size: "20px",
				weight: "600",
				lineHeight: "1.35",
				letterSpacing: "0",
			},
			heading6: {
				size: "18px",
				weight: "600",
				lineHeight: "1.4",
				letterSpacing: "0",
			},
			body: {
				size: "16px",
				weight: "400",
				lineHeight: "1.5",
				letterSpacing: "0",
			},
			bodySm: {
				size: "14px",
				weight: "400",
				lineHeight: "1.5",
				letterSpacing: "0",
			},
			label: {
				size: "14px",
				weight: "600",
				lineHeight: "1.4",
				letterSpacing: "0.01em",
			},
			labelSm: {
				size: "12px",
				weight: "600",
				lineHeight: "1.35",
				letterSpacing: "0.01em",
			},
			caption: {
				size: "12px",
				weight: "400",
				lineHeight: "1.4",
				letterSpacing: "0",
			},
		},
	},
	themes: {
		light: {
			background: "{colors.neutral.50}",
			surface: "{colors.neutral.0}",
			text: "{colors.neutral.900}",
			textMuted: "{colors.neutral.600}",
			border: "{colors.neutral.200}",
			primary: "{colors.primary.500}",
			primaryHover: "{colors.primary.600}",
			secondary: "{colors.secondary.500}",
			secondaryHover: "{colors.secondary.600}",
			tertiary: "{colors.tertiary.500}",
			tertiaryHover: "{colors.tertiary.600}",
			danger: "{colors.danger.500}",
			dangerHover: "{colors.danger.600}",
			onPrimary: "{colors.neutral.0}",
			onSecondary: "{colors.neutral.0}",
			onTertiary: "{colors.neutral.0}",
			onDanger: "{colors.neutral.0}",
			inputBackground: "{colors.neutral.0}",
			inputBorder: "{colors.neutral.300}",
			inputFocusRing: "{colors.primary.500}",
		},
	},
};
