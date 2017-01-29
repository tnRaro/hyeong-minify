import program from "commander";

import { minify } from "./minify";

program
	.version("0.0.1")
	.option("-m,--minify <value> [option]", "hyeong....", minify)
	.option("-v,--verbose", "verbose")
	.parse(process.argv);

console.log(program.minify.result);

if(program.verbose){
	console.log(`${program.minify.original.length}moji -> ${program.minify.result.length}moji`);
}
