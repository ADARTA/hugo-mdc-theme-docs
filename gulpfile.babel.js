import gulp from "gulp";
import cp from "child_process";
import gutil from "gulp-util";
import postcss from "gulp-postcss";
import cssImport from "postcss-import";
import cssnext from "postcss-cssnext";
import BrowserSync from "browser-sync";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";
import svgstore from "gulp-svgstore";
import svgmin from "gulp-svgmin";
import inject from "gulp-inject";
import cssnano from "cssnano";
import sass from "gulp-sass";
import pump from "pump";
import del from "del";
import cleanhtml from "gulp-cleanhtml";


const browserSync = BrowserSync.create();
const hugoBin = "hugo";
const defaultArgs = ["-d", "../public", "-s", "site"];
const SASS_INCLUDE_PATHS = [
  "node_modules/"
];

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;

  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload("notify:false");
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}

function gulpWatch(hugoCommand) {
  gulp.watch(["./src/js/**/*.js"], ["js"]);
  gulp.watch("./src/css/**/*.css", ["css"]);
  gulp.watch("./src/sass/**/*.scss", ["sass"]);
  gulp.watch("./site/static/images/icons/*.svg", ["svg"]);
  gulp.watch(["./site/content/**/*.md", "./site/layouts/**/*.md", "./site/themes/default/layouts/**/*.md"], [hugoCommand]);
  gulp.watch(["./site/content/**/*.html", "./site/layouts/**/*.html", "./site/themes/default/layouts/**/*.html"], [hugoCommand]);
  gulp.watch(["./site/themes/default/static/assets/theme/**/*.js", "./site/themes/default/static/assets/theme/**/*.css"], [hugoCommand]);
  gulp.watch(["./site/config.toml", "data/**/*"], [hugoCommand]);
  return true;
}

gulp.task("hugo", (cb) => buildSite(cb, ["-v"]));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));

gulp.task("build", ["css", "sass", "js", "hugo"]);
gulp.task("build-preview", ["css", "sass", "js", "hugo-preview"]);

gulp.task("css", () => (
  gulp.src("./src/css/*.css")
    .pipe(postcss([
      cssImport({from: "./src/css/main.css"}),
      cssnext(),
      cssnano(),
    ]))
    .pipe(gulp.dest("./public/assets/css"))
    .pipe(browserSync.stream())
));

gulp.task("sass", (callback) => {
  pump([
    gulp.src("./src/sass/**/*.scss"),
    sass({includePaths: SASS_INCLUDE_PATHS, outputStyle: "compressed"}).on("error", sass.logError),
    gulp.dest("./public/assets/css"),
    browserSync.stream()
  ],
  callback
  );
});

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

gulp.task("svg", () => {
  const svgs = gulp
    .src("site/static/img/icons/*.svg")
    .pipe(svgmin())
    .pipe(svgstore({inlineSvg: true}));

  function fileContents(filePath, file) {
    return file.contents.toString();
  }

  return gulp
    .src("site/layouts/partials/svg.html")
    .pipe(inject(svgs, {transform: fileContents}))
    .pipe(gulp.dest("site/layouts/partials/"));
});

gulp.task("cleanhtml", (callback) => {
  pump([
    gulp.src("./public/**/*.html"),
    cleanhtml(),
    gulp.dest("./public")
  ],
    callback
  );
});

gulp.task("clean:public", () => {
  return del([
    "./public/**/*"
  ]);
});
gulp.task("assets", ["css", "sass", "js", "svg"]);

gulp.task("server", ["css", "sass", "js", "svg", "hugo"], () => {
  browserSync.init({
    server: "./public"
  });
  return gulpWatch("hugo");
});

gulp.task("server-preview", ["css", "sass", "js", "svg", "hugo-preview"], () => {
  browserSync.init({
    server: "./public"
  });
  return gulpWatch("hugo-preview");
});

gulp.task("default", ["build"]);
