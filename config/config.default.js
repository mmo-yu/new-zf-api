/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1650611618793_7552';

  // add your middleware config here
  config.middleware = [
    'params',
  ];

  // Security
  config.security = {
    csrf: false
  }
  // add your user config here
  const userConfig = {
    // 学年默认配置
    edu: {
      year: '2021', // 学年
      term: '2', // 学期
    },
    // API接口配置
    api: {
      // 请求PublicKey
      public_key: '/jwglxt/xtgl/login_getPublicKey.html?time=' + Math.floor(Date.now() / 1000),
      // 教务系统登录
      login_url: '/jwglxt/xtgl/login_slogin.html?time=' + Math.floor(Date.now() / 1000),
      // 学生信息查询
      stuinfo_url: '/jwglxt/xsxxxggl/xsxxwh_cxCkDgxsxx.html?gnmkdm=N100801',
      // 课表查询
      schedule_url: '/jwglxt/kbcx/xskbcx_cxXsKb.html?gnmkdm=N2151',
      // 成绩查询
      score_url: '/jwglxt/cjcx/cjcx_cxDgXscj.html?doType=query&gnmkdm=N305005',
    }
  };
  // add http_proxy to httpclient
  if (process.env.http_proxy) {
    config.httpclient = {
      request: {
        enableProxy: true,
        rejectUnauthorized: false,
        // 默认 request 超时时间
        timeout: 3000,
        proxy: process.env.http_proxy,
      },
      enableDNSCache: false,
      // 对同一个域名进行 DNS 查询的最小间隔时间
      dnsCacheLookupInterval: 10000,
      // DNS 同时缓存的最大域名数量，默认 1000
      dnsCacheMaxLength: 1000,
      httpAgent: {
        // 默认开启 http KeepAlive 功能
        keepAlive: true,
        // 空闲的 KeepAlive socket 最长可以存活 4 秒
        freeSocketTimeout: 4000,
        // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
        timeout: 30000,
        // 允许创建的最大 socket 数
        maxSockets: Number.MAX_SAFE_INTEGER,
        // 最大空闲 socket 数
        maxFreeSockets: 256,
      },

      httpsAgent: {
        // 默认开启 https KeepAlive 功能
        keepAlive: true,
        // 空闲的 KeepAlive socket 最长可以存活 4 秒
        freeSocketTimeout: 4000,
        // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
        timeout: 30000,
        // 允许创建的最大 socket 数
        maxSockets: Number.MAX_SAFE_INTEGER,
        // 最大空闲 socket 数
        maxFreeSockets: 256,
      }
    };
  }


  return {
    ...config,
    ...userConfig,
  };
};
