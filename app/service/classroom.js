'use strict';

const Service = require('egg').Service;

class ClassroomService extends Service {
    /**
     * 教学楼查询
     * @param {String} host 地址
     * @param {String} year 学年
     * @param {String} term 学期
     * @param {String} campus 校区ID
     * @param {String} session Cookie
     */
    async built(host, year, term, campus, session) {
        const campusMap = { "": "1", "1": "1", "2": "C31EC193405E2B10E055000000000001" };
        campus = campusMap[campus];
        const ctx = this.ctx;
        const { built_url } = ctx.app.config.api;
        const url = host + built_url;
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
            xqh_id: campus,
            xnm: year,
            xqm: term,
            gnmkdm: 'N2155'
        };
        const options = {
            method: 'GET',
            headers,
            data,
            rejectUnauthorized: false
        };
        const result = await ctx.curl(url, options);
        const response_data = JSON.parse(result.data.toString());
        return {
            success: true,
            message: "教学楼查询成功",
            built: response_data.lhList
        };
    }

    /**
     * 教室查询
     * @param {*} host 地址
     * @param {*} year 学年
     * @param {*} term 学期
     * @param {*} campus 校区
     * @param {*} built 教学楼
     * @param {*} weeks 周次
     * @param {*} day 星期
     * @param {*} periods 节次
     * @param {*} seatsmin 最小座位
     * @param {*} seatsmax 最大座位
     * @param {*} session Cookie
     * @returns 
     */
    async classroom(host, year, term, campus, built, weeks, day, periods, seatsmin, seatsmax, session) {
        const campusMap = { "": "1", "1": "1", "2": "C31EC193405E2B10E055000000000001" };
        const termMap = { "": "3", "1": "3", "2": "12", "3": "16", "all": '' };
        campus = campusMap[campus];
        term = termMap[term];
        let zcd = 0;
        let jcd = 0;
        // 傻逼正方 周次还要转换
        for (let i = 0; i < weeks.length; i++) {
            zcd += Math.pow(2, weeks[i] - 1);
        };
        for (let i = 0; i < periods.length; i++) {
            jcd += Math.pow(2, periods[i] - 1);
        };
        const ctx = this.ctx;
        const { classRoom_url } = ctx.app.config.api;
        const url = host + classRoom_url;
        const data = {
            'fwzt': 'cx',
            'xqh_id': campus,   // 校区id 本部 [ 1 ] 罗文 [ C31EC193405E2B10E055000000000001 ]
            'xnm': year,        // 学年
            'xqm': term,        // 学期
            'cdlb_id': '',      // 场地类型
            'lh': built,        // 楼号
            'qszws': seatsmin,  // 最小座位
            'jszws': seatsmax,  // 最大座位
            'jyfs': '0',
            'zcd': zcd,         // 周次
            'xqj': day,         // 星期
            'jcd': jcd,         // 节次
            '_search': false,
            'nd': Math.floor(Date.now() / 1000),
            'queryModel.showCount': '55',
            'queryModel.currentPage': '1',
            'queryModel.sortName': 'cdbh',
            'queryModel.sortOrder': 'asc',
            'time': '1'
        };
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
        const options = {
            method: 'POST',
            headers,
            data,
            rejectUnauthorized: false
        };
        const result = await ctx.curl(url, options);
        const response_data = JSON.parse(result.data.toString());
        const emptySchoolroomcourseitems = response_data.items;
        const classRoom = emptySchoolroomcourseitems.map(currentValue => {
            return {
                name: currentValue.cdmc,
                type: currentValue.cdlbmc,
                seats: currentValue.zws
            }
        });
        return {
            success: true,
            message: "教室查询成功",
            classRoom
        };
    }
}

module.exports = ClassroomService;
