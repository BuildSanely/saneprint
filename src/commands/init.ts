import * as p from "@clack/prompts";
import chalk from "chalk";
import path from "path";
import { CLIOptions, EnterpriseTheme } from "../types/index.js";
import { promptProjectConfig, promptEnterpriseTheme } from "../prompts/init.js";
import {
	injectPackageMetadata,
	injectLayoutMetadata,
	injectEnterpriseTheme,
} from "../utils/injection.js";
import { scaffoldProjectTemplate } from "../utils/template-source.js";
import { getDefaultTheme } from "../utils/theme.js";

export async function initCommand(options: CLIOptions) {
	console.log(chalk.cyan("\n🚀 Welcome to saneprint\n"));

	// 1. Get Project Configuration
	const project = await promptProjectConfig(options);

	// 2. Handle Enterprise Level 2 Design System
	let enterpriseTheme: EnterpriseTheme = getDefaultTheme();
	if (project.designSystem === "custom") {
		enterpriseTheme = await promptEnterpriseTheme(options);
	}

	// 3. Scaffolding
	const s = p.spinner();
	s.start(`Setting up your ${project.type} project...`);

	const targetPath = path.resolve(process.cwd(), project.path);

	try {
		await scaffoldProjectTemplate(project.type, targetPath);

		// 4. Injection
		await injectPackageMetadata(targetPath, project.websiteName);
		await injectLayoutMetadata(targetPath, project.websiteName);

		await injectEnterpriseTheme(targetPath, enterpriseTheme);

		s.stop("Scaffolding complete!");

		p.note(
			`Next steps:\n  cd ${project.path}\n  pnpm install\n  pnpm dev`,
			"Success!",
		);
		p.outro(chalk.green("Happy coding!"));
	} catch (err: any) {
		s.stop("Scaffolding failed.");
		p.log.error(chalk.red(err.message || String(err)));
		process.exit(1);
	}
}
