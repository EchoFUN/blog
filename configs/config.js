/**
 * 网站配置文件。
 * 
 * @author xukai.ken@gmail.com
 * @date 2014-07-27 星期日
 * 
 */

module.exports = {
  site : {

    // 网站名称
    SITE_NAME : '音韵码工',

    // 网站最基本的URL地址
    // SITE_BASE_URL : 'http://botobe.net',
    SITE_BASE_URL : 'http://127.0.0.1:3000',

    // 站点静态网址
    // SITE_STATIC_URL : 'http://melodycoder.duapp.com/dist/v17',
    SITE_STATIC_URL : 'http://127.0.0.1:3000',

    // 文章上传接口
    ARTICLE_PUBLISH_URL : '/publish',

    // 每页显示的文章数目
    PAGE_COUNT : 10
  }, 
 
  SESSION_SECRET : '音韵码工'
}; 
