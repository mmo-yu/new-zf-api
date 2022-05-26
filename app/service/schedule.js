'use strict';

const Service = require('egg').Service;
const courseTime = require('../utils/courseTime');

class ScheduleService extends Service {
    async index(host, session, year, term) {
        const ctx = this.ctx;
        const { schedule_url } = ctx.app.config.api;
        let data = {
            'xnm': year,
            'xqm': term == 2 ? 12 : 3
        }
        let url = host + schedule_url;
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
        }
        let options = {
            method: 'POST',
            headers,
            data,
            rejectUnauthorized: false
        }
        let result = await ctx.curl(url, options);
        let response_data = JSON.parse(result.data.toString());
        let practiceCourseList = response_data.sjkList;
        let courseList = response_data.kbList;
        let parcticeCourse = practiceCourseList.map(currentValue => {
            return {
                info: currentValue.sjkcgs
            }
        })
        let course = courseList.map(currentValue => {
            return {
                name: currentValue.kcmc,
                address: currentValue.cdmc,
                week: currentValue.zcd,
                day: currentValue.xqj,
                period: currentValue.jcs,
                teacher: currentValue.xm,
                courseSection: currentValue.jc
            }
        })
        //  循环所有课表
        for (let i = 0; i < course.length; i++) {
            let item = course[i];
            // 定义上课周数组
            let weeks = [];
            // 定义上课节次数组
            let sections = [];
            // 分割上课周次
            let course_week = item.week.split(',');
            // 分割上课节次
            let course_section = item.period.split('-');
            let startTime = courseTime.courseTimeStart(course_section[0]);
            let endTime = courseTime.courseTimeEnd(course_section[1]);
            //  循环上课周
            for (let j = 0; j < course_week.length; j++) {
                let str = course_week[j];
                // 去掉中文
                let course_arr = str.match(/[0-9]+/g);
                if (str.length <= 3) {
                    weeks.push(parseInt(course_arr));
                } else {
                    let course_start = parseInt(course_arr[0]);
                    let course_end = parseInt(course_arr[1]) + 1;
                    for (let w = course_start; w < course_end; w++) {
                        weeks.push(w);
                    }
                }
            }
            // 循环上课节次
            for (let s = 0; s < course_section.length; s++) {
                sections.push(parseInt(course_section[s]));
            }
            item.weeks = weeks;
            item.sections = sections;
            item.startTime = startTime;
            item.endTime = endTime;
            delete item.week;
            delete item.period;
        }
        return {
            success: true,
            message: "学生课表查询成功",
            parcticeCourse,
            course
        };
    }
}

module.exports = ScheduleService;
