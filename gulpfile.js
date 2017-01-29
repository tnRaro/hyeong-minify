const gulp = require("gulp");
const babel = require("gulp-babel");

gulp.task("js", () =>
	gulp.src("src/**.js")
	.pipe(babel())
	.pipe(gulp.dest("dist"))
);

gulp.task("default", [ "js" ]);
