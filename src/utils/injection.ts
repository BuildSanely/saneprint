import fs from "fs-extra";
import path from "path";
import { EnterpriseTheme } from "../types/index.js";
import { generateThemeCss, replaceThemeBlock } from "./theme.js";

export async function injectPackageMetadata(
	targetPath: string,
	websiteName: string,
) {
	const packagePath = path.join(targetPath, "package.json");
	if (!fs.existsSync(packagePath)) {
		return;
	}

	const packageJson = await fs.readJSON(packagePath);
	packageJson.name = websiteName.toLowerCase().replace(/\s+/g, "-");
	await fs.writeJSON(packagePath, packageJson, { spaces: 2 });
}

export async function injectLayoutMetadata(
	targetPath: string,
	websiteName: string,
) {
	const layoutPath = path.join(targetPath, "src/app/layout.tsx");
	if (!fs.existsSync(layoutPath)) {
		return;
	}

	const currentContent = await fs.readFile(layoutPath, "utf-8");
	const nextContent = currentContent.replace(
		/const siteName = ".*";/,
		`const siteName = "${websiteName}";`,
	);
	await fs.writeFile(layoutPath, nextContent);
}

export async function injectEnterpriseTheme(
	targetPath: string,
	theme: EnterpriseTheme,
) {
	const cssPath = path.join(targetPath, "src/app/globals.css");
	if (!fs.existsSync(cssPath)) {
		return;
	}

	const currentContent = await fs.readFile(cssPath, "utf-8");
	const nextContent = replaceThemeBlock(currentContent, generateThemeCss(theme));
	await fs.writeFile(cssPath, nextContent);
}
