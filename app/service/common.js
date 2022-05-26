'use strict';

const Service = require('egg').Service;
const cheerio = require('cheerio');
const getenPassword = require('nwezf-rsa');

class CommonService extends Service {

    async get_public_key(host) {
        const { ctx } = this;
        const { public_key } = ctx.app.config.api;
        let headers = {
            'Accept': '*/*',
            'Host': host.split('/')[2],
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
        };
        let options = {
            headers,
            rejectUnauthorized:false
        }
        let url = host + public_key;
        let res = await ctx.curl(url, options);
        let result = JSON.parse(res.data);
        let session = res.headers['set-cookie'];
        session = session[0].split(';')[0];
        return {
            modulus: result.modulus,
            exponent: result.exponent,
            session: session
        }
    }

    async get_csrf_token(host, session) {
        const { ctx } = this;
        const { login_url } = ctx.app.config.api;
        let headers = {
            'Accept': '*/*',
            'Host': host.split('/')[2],
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'Cookie': session
        };
        let options = {
            headers,
            rejectUnauthorized:false
        }
        let url = host + login_url;
        let res = await ctx.curl(url, options);
        let resultHtml = (res.data.toString());
        let cheerioModel = cheerio.load(resultHtml);
        let csrf_token = cheerioModel('#csrftoken')[0].attribs.value;
        return { token: csrf_token }
    }

    async process_public(password, modulus, exponent) {
        const enPassword = getenPassword(password, modulus, exponent);
        return enPassword
    }
}

module.exports = CommonService;