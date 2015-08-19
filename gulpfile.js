var gulp = require("gulp");
var bower = require("gulp-bower");
var shell = require('gulp-shell');
var del = require('del');

gulp.task("clean:jsdoc", function() {
    return del(["./doc/**/*"]);
});

gulp.task("clean:libs", function() {
    return del(["bower_components/**/*"]);
});


gulp.task("doc:jsdoc", shell.task([
    "node ./node_modules/jsdoc/jsdoc -c ./jsdoc.json"
]));

gulp.task("install:libs", function() {
    return bower({
        cmd: "update"
    });
});

gulp.task("clean", ["clean:jsdoc", "clean:libs"]);
gulp.task("install", ["install:libs"]);
gulp.task("jsdoc", ["clean:jsdoc", "doc:jsdoc"]);
