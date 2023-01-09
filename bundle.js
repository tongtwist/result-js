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
		.doGenerateBundle({browserFile: "index.esm.js"})
		.doGenerateTSTypes({packageJson: [".", "package.json"], esModuleInterop: true, skipLibCheck: true})
		.doGenerateDocs()
		.execute()
}

main().catch(console.error)
