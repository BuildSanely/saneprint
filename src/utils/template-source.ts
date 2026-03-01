import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import { downloadTemplate } from "giget";
import { ProjectType } from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATE_DIRECTORIES: Record<ProjectType, string> = {
	next: "next-template",
	mobile: "mobile-template",
};

const DEFAULT_REMOTE_TEMPLATE_SOURCES: Record<ProjectType, string> = {
	next: "github:BuildSanely/saneprint-templates/next-template",
	mobile: "github:BuildSanely/saneprint-templates/mobile-template",
};

function getLocalTemplatePath(projectType: ProjectType) {
	return path.resolve(
		__dirname,
		"../../../templates",
		TEMPLATE_DIRECTORIES[projectType],
	);
}

function getRemoteTemplateSource(projectType: ProjectType) {
	const envKey =
		projectType === "next"
			? "PIX_TEMPLATE_SOURCE_NEXT"
			: "PIX_TEMPLATE_SOURCE_MOBILE";

	return (
		process.env[envKey]?.trim() || DEFAULT_REMOTE_TEMPLATE_SOURCES[projectType]
	);
}

export async function scaffoldProjectTemplate(
	projectType: ProjectType,
	targetPath: string,
) {
	if (process.env.PIX_DEV === "true") {
		const sourcePath = getLocalTemplatePath(projectType);

		if (!fs.existsSync(sourcePath)) {
			throw new Error(`Template not found at ${sourcePath}`);
		}

		await fs.copy(sourcePath, targetPath, {
			filter: (src) => {
				const basename = path.basename(src);
				return !["node_modules", ".next", "dist", ".turbo"].includes(basename);
			},
		});
		return;
	}

	const source = getRemoteTemplateSource(projectType);
	await downloadTemplate(source, { dir: targetPath, force: true });
}
