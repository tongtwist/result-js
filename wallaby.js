module.exports = () => ({
	name: "result-js",
	localProjectDir: "workspaces/result-js/",
	autoDetect: true,
	files: ["src/**/*.ts", {pattern: "src/**/*.spec.ts", ignore: true}],
	tests: ["src/**/*.spec.ts"],
	env: {
		type: "node",
		runner: "node",
	},
	testFramework: "jest",
	runMode: "onsave",
})
