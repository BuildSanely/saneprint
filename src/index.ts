#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { CLIOptions } from "./types/index.js";

const program = new Command();

program
	.name("saneprint")
	.description("Opinionated scaffolding for Next.js")
	.version("0.0.1")
	.option("-p, --path <path>", "Path to create the project")
	.option("-t, --type <type>", "Project type (next, mobile)")
	.option("-n, --name <name>", "Website name")
	.option("-ds, --design-system <system>", "Design system (default, custom)")
	.option("-pr, --primary <color>", "Primary color")
	.option("-sc, --secondary <color>", "Secondary color")
	.action((options: CLIOptions) => {
		initCommand(options);
	});

program.parse();
