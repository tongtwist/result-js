const {Bundler} = require("@theloop/sheldon-node-module")

async function main() {
	const bundler = Bundler.create()
		.on(Bundler.ExecutionStart, () => console.log(`Bundler: Execution started.`))
		.on(Bundler.ExecutionEnd, (duration) => console.log(`Bundler: Execution Terminated in ${duration} ms`))
		.on(Bundler.ExecutionError, (err) => console.error("Bundler: Execution Error", err))
		.on(Bundler.ModuleGenerationStart, (module) => console.log(`Bundler: Module generation of "${module}" started`))
		.on(Bundler.ModuleGenerationEnd, (res) =>
			console.log(`Bundler: Module generation of "${res[0]}" terminated in ${res[1]} ms`),
		)
		.on(Bundler.ModuleGenerationError, (err) => console.error("Bundler: Module generation error", err))
		.on(Bundler.TSTypesGenerationStart, () => console.log(`Bundler: TS types generation started`))
		.on(Bundler.TSTypesGenerationEnd, (duration) =>
			console.log(`Bundler: TS types generation terminated in ${duration} ms`),
		)
		.on(Bundler.TSTypesGenerationError, (err) => console.error("Bundler: TS types generation error", err))
		.on(Bundler.DocsGenerationStart, () => console.log(`Bundler: Documentation generation started`))
		.on(Bundler.DocsGenerationEnd, (duration) =>
			console.log(`Bundler: Documentation generation terminated in ${duration} ms`),
		)
		.on(Bundler.DocsGenerationError, (err) => console.error("Bundler: Documentation generation error", err))
		.on(Bundler.CleanDirStart, (dir) => console.log(`Bundler: Directory cleaning started on "${dir}"`))
		.on(Bundler.CleanDirEnd, (res) =>
			console.log(`Bundler: Directory cleaning on "${res[0]}" terminated in ${res[1]} ms`),
		)
		.on(Bundler.CleanDirError, (err) => console.error("Bundler: Directory cleaning error", err))

	await bundler
		.doGenerateModule({nodeFile: "index.js", minify: true})
		.doGenerateTSTypes()
		.doGenerateDocs()
		.executeAndContinue()
		.doCleanDir({dir: "./lib", fileExceptions: ["index.js", "index.d.ts"]})
		.execute()
}

main().catch(console.error)
