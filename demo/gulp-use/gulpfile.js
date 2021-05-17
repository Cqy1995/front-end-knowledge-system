const {
    src,
    dest,
    series,
    watch
} = require('gulp')//内置模块

const browserSync = require('browser-sync').create()//初始化服务组件
const reload = browserSync.reload
const plugins = require('gulp-load-plugins')()

const del = require('del')

//压缩js  uplifyjs
function js(cb) {
    src('js/*.js')
        //下一个处理环节
        .pipe(plugins.uglify())
        .pipe(dest('./dist/js'))
        .pipe(reload({
            stream: true
        }))
    cb()
}
//对scss/less编译，压缩，输出css文件
function css(cb) {
    src('scss/*.scss')
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        }))
        .pipe(plugins.autoprefixer({
            cascade: false,
            remove: false
        }))
        .pipe(dest('./dist/scss'))
        .pipe(reload({
            stream: true
        }))
    cb()
}
//监听这些文件的变化
function watcher() {
    watch('js/*.js', js)
    watch('scss/*.scss', css)
}
//删除
function clean(cb) {
    del('./dist')
    cb()

}

function serve(cb) {
    browserSync.init({
        server:{
            baseDir:'./'
        }
    })
    cb()
}
exports.scripts = js
exports.styles = css
exports.clean = clean
exports.default = series([
    clean,
    js,
    css,
    serve,
    watcher
])