'use strict';

const Service = require('egg').Service;

class ScoreService extends Service {
    async index(host, session, year, term) {
        // 校验
        if (!parseInt(year) || parseInt(year) > (new Date().getFullYear())) {
            return {
                success: false,
                message: "请求年份出错"
            }
        };
        const ctx = this.ctx;
        const { score_url } = ctx.app.config.api;
        const termMap = { "": "3", "1": "3", "2": "12", "3": "16", "all": '' };
        term = termMap[term];
        let url = host + score_url;
        let data = {
            '_search': 'false',
            'nd': Math.floor(Date.now() / 1000),
            'queryModel.currentPage': '1',
            'queryModel.showCount': '15',
            'queryModel.sortName': '',
            'queryModel.sortOrder': 'asc',
            'time': '0',
            'xnm': year,
            'xqm': term
        };
        let headers = {
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
        let options = {
            method: 'POST',
            headers,
            data,
            rejectUnauthorized: false
        };
        let result = await ctx.curl(url, options);
        let response_data = JSON.parse(result.data.toString());
        let scoreList = response_data.items;
        let score = scoreList.map(currentValue => {
            return {
                name: currentValue.kcmc,
                score: currentValue.cj,
                teacher: currentValue.jsxm,
                credit: currentValue.xf
            }
        });
        return {
            success: true,
            message: "学生成绩查询成功",
            grade: score
        };
    }
}

module.exports = ScoreService;
