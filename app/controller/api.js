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
            const scheduleInfo = await ctx.service.schedule.index(host, userInfo.session, year, term);
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
            const score = await ctx.service.score.index(host, userInfo.session, year, term);
            ctx.body = score
        } else {
            ctx.body = {
                success: false,
                message: userInfo.message
            }
        }
    }

    // 课程通知
    async getNotice() {
        const { ctx } = this;
        const { host, username, password } = ctx.params;
        const userInfo = await ctx.service.login.login(host, username, password);
        if (userInfo.success) {
            const notice = await ctx.service.notice.index(host, loginInfo.session);
            ctx.body = notice;
        } else {
            ctx.body = {
                success: false,
                message: userInfo.message
            }
        }
    }
    // 教学楼查询
    async getBuilt() {
        const { ctx } = this;
        const { host, username, password, campus } = ctx.params;
        const { year, term } = ctx.app.config.edu;
        const userInfo = await ctx.service.login.login(host, username, password);
        if (userInfo.success) {
            const built = await ctx.service.classroom.built(host, year, term, campus, userInfo.session);
            ctx.body = built
        } else {
            ctx.body = {
                success: false,
                message: userInfo.message
            }
        }
    }

    // 教室查询
    async getClassRoom() {
        const { ctx } = this;
        const { host, username, password } = ctx.params;
        const { year, term } = ctx.app.config.edu;
        const userInfo = await ctx.service.login.login(host, username, password);
        if (userInfo.success) {
            const roomInfo = await ctx.service.classroom.classroom(host, year, term, campus, built, weeks, day, periods, seatsmin, seatsmax, userInfo.session);
            ctx.body = roomInfo
        } else {
            ctx.body = {
                success: false,
                message: userInfo.message
            }
        }
    }
}

module.exports = ApiController;