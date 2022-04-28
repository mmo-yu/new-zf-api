'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  // 学生信息查询
  router.all('/stuinfo', controller.api.getStudentInfo);
  // 学生课表查询
  router.all('/course', controller.api.getSchedule);
  // 学生成绩查询
  router.all('/score', controller.api.getScore);
  // 课程通知查询
  router.all('/notice', controller.api.getNotice);
  // 教学楼查询
  router.all('/built', controller.api.getBuilt);
  // 教室查询
  router.all('/classroom', controller.api.getClassRoom);
};
