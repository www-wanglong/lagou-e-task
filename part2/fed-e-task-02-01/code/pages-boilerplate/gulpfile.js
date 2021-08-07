// 实现这个项目的构建任务
const { src, dest, series, parallel, watch } = require('gulp')
const del  = require('del')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins() // 自动加载所有插件
const browserSync = require('browser-sync')

const bs = browserSync.create()

const config = {
  data: {
    pkg: {
      name: 'long'
    }
  }
}
// 清除文件
const clean = () => {
  return del(['temp', 'dist'])
}

// 压缩样式文件
const style = () => {
  return src('assets/styles/*.scss', { cwd: 'src', base: 'src' })
    .pipe(plugins.sass({ outputStyle: 'expanded' }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const script = () => {
  return src('assets/scripts/*.js', { cwd: 'src', base: 'src' })
  .pipe(plugins.eslint())
  .pipe(plugins.eslint.format())
  .pipe(plugins.eslint.failAfterError())
  .pipe(plugins.babel({ presets: [require('@babel/preset-env')] }))
  .pipe(dest('temp'))
  .pipe(bs.reload({ stream: true }))
}

const page = () => {
  return src('*.html', { cwd: 'src' })
    .pipe(plugins.swig({ data: config.data }))
    .pipe(dest('temp'))
    .pipe(bs.reload({ stream: true }))
}

const image = () => {
  return src('assets/images/**', { cwd: 'src', base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const font = () => {
  return src('assets/fonts/**', { cwd: 'src', base: 'src' })
    .pipe(plugins.imagemin())
    .pipe(dest('dist'))
}

const extra = () => {
  return src('**',  { cwd: 'public' , base: 'public' })
    .pipe(dest('dist'))
}

const serve = () => {
  watch('src/assets/styles/*.scss', style )
  watch('src/scripts/*.scss', script)
  watch('src/*.html', page)
  watch([
    'assets/images/**',
    'assets/fonts/**'
  ], { cwd: 'src' }, bs.reload)

  watch([
    '**'
  ], { cwd: 'public' }, bs.reload)


  bs.init({
    notify: false,
    port: 30002,
    open: false,
    // files: 'src/**',
    server: {
      baseDir: ['temp', 'dist', 'public'],
      routes: {
        '/node_modules': 'node_modules'
      }
    }

  })
}

const useref = () => {
  return src('*.html', { base: 'temp', cwd: 'temp' })
      .pipe(plugins.useref({ searchPath: ['temp', '..', '.'] })) // 需要指定转换参数
      // html css js 压缩
      .pipe(plugins.if(/\.js$/, plugins.uglify())) // 会根据给定的条件执行对应的转换
      .pipe(plugins.if(/\.css$/, plugins.cleanCss())) // 会根据给定的条件执行对应的转换
      .pipe(plugins.if(/\.html$/, plugins.htmlmin({
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
      }))) // 会根据给定的条件执行对应的转换
      .pipe(dest('dist')) // 换个目录
}

const compile = parallel(style, script, page)

const build = series(
  clean,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const develop = series(compile, serve)

module.exports = {
  page,
  clean,
  build,
  develop,
  serve,
  script,
}