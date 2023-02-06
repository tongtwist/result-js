const {readFile, writeFile} = require("node:fs/promises")
const {Steward} = require("@theloop/sheldon-node-module")

async function main() {
	const steward = Steward.create()
		.on(Steward.ExecutionStart, () => console.log(`Steward: Execution started.`))
		.on(Steward.ExecutionEnd, (duration) => console.log(`Steward: Execution Terminated in ${duration} ms`))
		.on(Steward.ExecutionError, (err) => console.error("Steward: Execution Error", err))
		.on(Steward.ModuleGenerationStart, (module) => console.log(`Steward: Module generation of "${module}" started`))
		.on(Steward.ModuleGenerationEnd, (res) =>
			console.log(`Steward: Module generation of "${res[0]}" terminated in ${res[1]} ms`),
		)
		.on(Steward.ModuleGenerationError, (err) => console.error("Steward: Module generation error", err))
		.on(Steward.TSTypesGenerationStart, () => console.log(`Steward: TS types generation started`))
		.on(Steward.TSTypesGenerationEnd, (duration) =>
			console.log(`Steward: TS types generation terminated in ${duration} ms`),
		)
		.on(Steward.TSTypesGenerationError, (err) => console.error("Steward: TS types generation error", err))
		.on(Steward.NpmRunStart, () => console.log(`Steward: Npm script started`))
		.on(Steward.NpmRunEnd, (res) =>
			console.log(`Steward: Npm script terminated in ${JSON.stringify(res.duration)} ms`),
		)
		.on(Steward.NpmRunError, (err) => console.error("Steward: Npm script error", err))
		.on(Steward.FunctionStart, () => console.log(`Steward: Function started`))
		.on(Steward.FunctionEnd, (res) =>
			console.log(
				`Steward: Function terminated in ${JSON.stringify(res.duration)} ms. Result is ${JSON.stringify(
					res.result,
				)}`,
			),
		)
		.on(Steward.FunctionError, (err) => console.error("Steward: Function error", err))
		.on(Steward.DocsGenerationStart, () => console.log(`Steward: Documentation generation started`))
		.on(Steward.DocsGenerationEnd, (duration) =>
			console.log(`Steward: Documentation generation terminated in ${duration} ms`),
		)
		.on(Steward.DocsGenerationError, (err) => console.error("Steward: Documentation generation error", err))
		.on(Steward.CleanDirStart, (dir) => console.log(`Steward: Directory cleaning started on "${dir}"`))
		.on(Steward.CleanDirEnd, (res) =>
			console.log(`Steward: Directory cleaning on "${res[0]}" terminated in ${res[1]} ms`),
		)
		.on(Steward.CleanDirError, (err) => console.error("Steward: Directory cleaning error", err))

	await steward
		.doNpm({action: "run", args: ["build"]})
		.doNpm({action: "run", args: ["test:publish"]})
		.executeAndContinue()
		.doGenerateBundle({browserFile: "index.esm.js", tsconfig: "./tsconfig.lib.json"})
		.doGenerateTSTypes({
			packageJson: [".", "package.json"],
			esModuleInterop: true,
			skipLibCheck: true,
			experimentalDecorators: true,
		})
		.doGenerateDocs()
		.executeAndContinue()
		.doNpm({action: "run", args: ["moveCoverage"]})
		.doNpm({action: "run", args: ["clean:spec-js"]})
		.executeAndContinue()
		.doFunction({
			f: async () => {
				const covJson = await readFile("coverage.json", {encoding: "utf8"})
				const cov = JSON.parse(covJson)
				const nbTests = cov.numTotalTests
				const nbPassed = cov.numPassedTests
				const testRate = Math.ceil((nbPassed * 100) / nbTests)
				const testColor = testRate < 80 ? "critical" : testRate === 100 ? "success" : "important"
				const testUrl = encodeURI(
					`https://img.shields.io/badge/Tests-${testRate}%: ${nbPassed} passed / ${nbTests}-${testColor}`,
				)
				const covHtml = await readFile("docs/coverage/index.html", {encoding: "utf8"})
				const matches = Array.from(
					covHtml.matchAll(
						/<div class='fl .+\n.+strong">([0-9]+).+\n.+quiet">([A-Za-z0-9 ]+).+\n.+fraction'>([0-9]+)\/([0-9]+)/g,
					),
				)
					.filter((m) => m.length >= 5)
					.map((m) => m.slice(1))
					.map((m) => ({
						label: m[1],
						rate: parseInt(m[0]),
						num: parseInt(m[2]),
						tot: parseInt(m[3]),
					}))
				const nbCovElt = matches.reduce((acc, v) => acc + v.tot, 0)
				const nbPassedCovElt = matches.reduce((acc, v) => acc + v.num, 0)
				const covRate = Math.ceil((nbPassedCovElt * 100) / nbCovElt)
				const covColor = covRate < 80 ? "critical" : covRate === 100 ? "success" : "important"
				const covUrl = encodeURI(
					`https://img.shields.io/badge/Code coverage-${covRate}%: ${matches
						.map((m) => `${m.label} ${m.rate}%(${m.num}/${m.tot})`)
						.join(", ")}-${covColor}`,
				)
				const readmeHead = `# sheldon-extension-catalog\n\n![Tests state](${testUrl})\n![Code coverage](${covUrl})\n\n## Description\n`
				const readme = await readFile("README.md", {encoding: "utf8"})
				const readmeParts = readme.split(`## Description\n\n`)
				readmeParts[0] = readmeHead
				await writeFile("README.md", readmeParts.join("\n"), {encoding: "utf8"})
			},
		})
		.execute()
}

main().catch(console.error)
