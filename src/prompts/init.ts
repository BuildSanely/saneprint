import * as p from "@clack/prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { ProjectConfig, EnterpriseTheme, CLIOptions } from "../types/index.js";
import { getDefaultTheme, validateTheme } from "../utils/theme.js";

/**
 * Main project configuration prompts
 */
export async function promptProjectConfig(
	options: CLIOptions,
): Promise<ProjectConfig> {
	if (options.path && options.type && options.name && options.designSystem) {
		return {
			path: options.path,
			type: options.type as any,
			websiteName: options.name,
			designSystem: options.designSystem as any,
		};
	}

	const group = (await p.group<Omit<ProjectConfig, "type">>(
		{
			path: () =>
				p.text({
					message: "Where should we create your project?",
					placeholder: "./my-app",
					initialValue: options.path,
				}) as any,
			websiteName: () =>
				p.text({
					message: "What is your website name?",
					placeholder: "Studio",
					initialValue: options.name,
				}) as any,
			/*
			type: () =>
				p.select({
					message: "What are you building today?",
					initialValue: options.type,
					options: [
						{
							value: "next",
							label: "Next.js (Web)",
							hint: "Production-grade App Router",
						},
						{
							value: "mobile",
							label: "React Native (Mobile)",
							hint: "Expo Managed Workflow",
						},
					],
				}) as any,
			*/
			designSystem: () =>
				p.select({
					message: "Choose your Design System",
					initialValue: options.designSystem,
					options: [
						{
							value: "default",
							label: "saneprint Default",
							hint: "Ready-to-go premium tokens",
						},
						{
							value: "custom",
							label: "Custom (Enterprise Level 2)",
							hint: "Generate canonical theme.json",
						},
					],
				}) as any,
		},
		{
			onCancel: () => {
				p.cancel("Operation cancelled.");
				process.exit(0);
			},
		},
	)) as any;

	return { ...group, type: "next" };
}

/**
 * Creates the canonical theme.json and waits for the user to edit it.
 */
export async function promptEnterpriseTheme(
	options: CLIOptions,
): Promise<EnterpriseTheme> {
	const themePath = path.resolve(process.cwd(), "theme.json");
	const defaultTheme = getDefaultTheme();

	if (fs.existsSync(themePath)) {
		try {
			return validateTheme(await fs.readJSON(themePath));
		} catch {
			// Fall through to overwrite with the canonical schema.
		}
	}

	if (options.primary) {
		defaultTheme.colors.primary["500"] = options.primary;
		defaultTheme.colors.primary["600"] = options.primary;
		defaultTheme.themes.light.primary = options.primary;
		defaultTheme.themes.light.primaryHover = options.primary;
	}

	if (options.secondary) {
		defaultTheme.colors.secondary["500"] = options.secondary;
		defaultTheme.colors.secondary["600"] = options.secondary;
		defaultTheme.themes.light.secondary = options.secondary;
		defaultTheme.themes.light.secondaryHover = options.secondary;
	}

	await fs.writeJSON(themePath, defaultTheme, { spaces: 2 });

	p.note(
		`I've created a canonical ${chalk.hex("#106D7C")("theme.json")} in your current directory.\n\n` +
			`Edit values only. Do not add, delete, or rename keys.\n` +
			`This schema drives the generated Tailwind tokens, color roles, and button/input variants.`,
		chalk.hex("#106D7C")("Custom Theme"),
	);

	while (true) {
		const ready = await p.confirm({
			message: "Done filling theme.json? Click continue to proceed.",
		});
		if (ready !== true) {
			p.cancel("Operation cancelled.");
			process.exit(0);
		}

		try {
			return validateTheme(await fs.readJSON(themePath));
		} catch (err: any) {
			p.log.error(chalk.red(`Error: ${err.message || "Invalid JSON"}`));
		}
	}
}
