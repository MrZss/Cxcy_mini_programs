// pages/attIndex/attSuc.js
var Bmob = require('../../utils/bmob.js');
var dbOperator = require('../../utils/dbOperator.js');
var app = getApp()
Page({
  data: {
    state: null,
  },
  onPullDownRefresh: function (e) {
    // Do something when pull down.
    console.log("下拉刷新....");
    this.onLoad();
    wx.stopPullDownRefresh();
  },
  back3: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  Attendance_Results: function (Array) {
    var that = this;
    console.log("Array是:" + Array[1])
    that.setData({ state: Array[1] });
    console.log("state11是:" + this.data.state)
  },
  onLoad: function (options) {
    var that = this;
    dbOperator.Attendance_Results(wx.getStorageSync('Student_objId'), wx.getStorageSync('Lesson_objId'), this.Attendance_Results);
    console.log("state是:" + this.data.state)
  }
})