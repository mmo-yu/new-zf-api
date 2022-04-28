'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
    async login(host, username, password) {
        const ctx = this.ctx;
        const { login_url } = ctx.app.config.api;
        let { modulus, exponent, session } = await this.service.common.get_public_key(host);
        let { token } = await this.service.common.get_csrf_token(host, session);
        let enpassword = await this.service.common.process_public(password, modulus, exponent);
        let url = host + login_url;
        let headers = {
            'Host': host.split('/')[2],
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'Accept': 'text/html, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Referer': url,
            'Origin': host,
            'Upgrade-Insecure-Requests': '1',
            'Cookie': session,
            'Connection': 'keep-alive',
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        };
        let data = {
            'csrftoken': token,
            'mm': enpassword,
            'yhm': username
        };
        let options = {
            method: 'POST',
            headers,
            data,
            rejectUnauthorized:false
        };
        let result = await ctx.curl(url, options);
        let regValue = '用户名或密码不正确';
        if (result.data.toString().indexOf(regValue) > 0) {
            return {
                success: false,
                message: regValue
            }
        }
        return {
            success: true,
            message: '登录成功',
            session: result.headers['set-cookie']
        }
    }
}

module.exports = LoginService;
