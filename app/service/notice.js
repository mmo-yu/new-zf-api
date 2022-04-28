'use strict';

const Service = require('egg').Service;

class NoticeService extends Service {
    /**
     * 课程通知
     * @param {*} session Cookie
     */
    async index(host, session) {
        const ctx = this.ctx;
        const { notice_url } = ctx.app.config.api;
        const url = host + notice_url;
        let headers = {
            'Host': host.split('/')[2],
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36',
            'Accept': 'text/html, */*; q=0.01',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Referer': url,
            'Upgrade-Insecure-Requests': '1',
            'Cookie': session,
            'Connection': 'keep-alive',
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        };
        const data = {
            'sfyy': '1',
            'flag': '1',
            '_search': 'false',
            'nd': Math.floor(Date.now() / 1000),
            'queryModel.showCount': '15',  // 每页最多条数
            'queryModel.currentPage': '1',
            'queryModel.sortName': 'cjsj',
            'queryModel.sortOrder': 'desc',
            'time': '2'
        };
        const options = {
            method: 'POST',
            headers,
            data,
            rejectUnauthorized: false
        };
        const result = await ctx.curl(url, options);
        const response_data = JSON.parse(result.data.toString());
        const noticeitems = response_data.items;
        const notice = noticeitems.map(noticeValue => {
            return {
                date: noticeValue.cjsj.substring(5, 10),
                time: noticeValue.cjsj.substring(11, 16),
                news: noticeValue.xxbt
            }
        });
        return {
            success: true,
            message: "通知查询成功",
            notice
        };
    }
}

module.exports = NoticeService;
