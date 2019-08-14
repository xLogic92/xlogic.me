const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const workbox = require('workbox-build');

gulp.task('minify', () => {
  return gulp
    .src('public/**/*.html')
    .pipe(
      htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true //压缩HTML
        // collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        // removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        // removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        // removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        // minifyJS: true,//压缩页面JS
        // minifyCSS: true//压缩页面CSS
      })
    )
    .pipe(gulp.dest('public'));
});


gulp.task('generate-service-worker', () => {
  return workbox
    .generateSW({
      // cacheId: '', // 设置前缀
      globDirectory: './public', //匹配根目录
      globPatterns: ['**/*.{woff2,woff,js,css,png.jpg}'], // 匹配的文件
      globIgnores: ['sw.js'], // 忽略的文件
      swDest: `./public/sw.js`, // 输出 Service worker 文件
      clientsClaim: true, // Service Worker 被激活后使其立即获得页面控制权
      skipWaiting: true, // 强制等待中的 Service Worker 被激活
      runtimeCaching: [
        // 配置路由请求缓存 对应 workbox.routing.registerRoute
        {
          urlPattern: /.*\.js/, // 匹配文件
          handler: 'networkFirst' // 网络优先
        },
        {
          urlPattern: /.*\.css/,
          handler: 'staleWhileRevalidate', // 缓存优先同时后台更新
          options: {
            // 这里可以设置 cacheName 和添加插件
            plugins: [
              {
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            ]
          }
        },
        {
          urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
          handler: 'cacheFirst', // 缓存优先
          options: {
            plugins: [
              {
                expiration: {
                  // maxAgeSeconds: 360, // 最长缓存时间,
                  maxEntries: 50 // 最大缓存图片数量
                }
              }
            ]
          }
        },
        {
          urlPattern: /.*\.html/,
          handler: 'networkFirst'
        }
      ]
    })
    .then(() => {
      console.info('Service worker generation completed.');
    })
    .catch((error) => {
      console.warn('Service worker generation failed: ' + error);
    });
});

gulp.task('default', ['generate-service-worker', 'minify']);
