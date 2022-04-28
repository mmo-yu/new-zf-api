'use strict';

const Service = require('egg').Service;

class StudentService extends Service {
    async info(host, session) {
        const ctx = this.ctx
        const { stuinfo_url } = ctx.app.config.api;
        const url = host + stuinfo_url;
        const headers = {
            'Host': host.split('/')[2],
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
            'Accept': 'text/html, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Referer': url,
            'Upgrade-Insecure-Requests': '1',
            'Cookie': session,
            'Connection': 'keep-alive',
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        };
        const options = {
            method: 'POST',
            headers,
            rejectUnauthorized: false
        };
        const result = await ctx.curl(url, options);
        const response_data = JSON.parse(result.data.toString());
        const studentInfo = {
            name: response_data.xm,
            class: response_data.bh_id,
            college: response_data.jg_id
        };
        return {
            success: true,
            message: "学生信息查询成功",
            studentInfo
        };
    }
}

module.exports = StudentService;
