'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
    // 学生信息查询
    async getStudentInfo() {
        const { ctx } = this;
        const { host, username, password } = ctx.params;
        const userInfo = await ctx.service.login.login(host, username, password);
        if (userInfo.success) {
            const studentInfo = await ctx.service.student.info(host, userInfo.session);
            ctx.body = studentInfo;
        } else {
            ctx.body = {
                success: false,
                message: userInfo.message
            };
        }
    }

    // 课表查询
    async getSchedule() {
        const { ctx } = this;
        const { host, username, password } = ctx.params;
        const { year, term } = ctx.app.config.edu;
        const userInfo = await ctx.service.login.login(host, username, password);
        if (userInfo.success) {
            const scheduleInfo = await this.service.schedule.index(host, userInfo.session, year, term);
            ctx.body = scheduleInfo
        } else {
            ctx.body = {
                success: false,
                message: userInfo.message
            }
        }
    }

    // 成绩查询
    async getScore() {
        const { ctx } = this;
        const { host, username, password, year, term } = ctx.params;
        const userInfo = await ctx.service.login.login(host, username, password);
        if (userInfo.success) {
            const score = await this.service.score.index(host, userInfo.session, year, term);
            ctx.body = score
        } else {
            ctx.body = {
                success: false,
                message: userInfo.message
            }
        }
    }
}

module.exports = ApiController;