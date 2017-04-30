// pages/courseIndex/courseIndex.js
var dbOperator = require('../../utils/dbOperator.js');
var util = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js');

Page({
  data: {
    Lesson_NO: null,
    answertime: null,
    time: null,
    date: null,
    thirdbtn: null,//第三个按钮执行状态 1可以进入 0不能进入
    Topic_NO: null,
    seconddbtn: null,//第二个按钮执行状态 1可以进入 0不能进入
    windowHeigh: null,

  },
  onPullDownRefresh: function (e) {
    console.log("下拉刷新获取题目....")
    this.onShow();
    wx.stopPullDownRefresh();

  },

  bindViewTapAtt: function () {//第一个按钮
    wx.navigateTo({
      url: '../attIndex/attIndex'
    })
  },
  bindViewTapLesson: function () {///////核对第三题结束时间然后判定是否能进入查询成绩 //第三个按扭功能
    var week = null;
    Bmob.Cloud.run('Week', {}, {
      success: function (result) {
        
         if (result==1) {//星期天上午12点以后能看，
              wx.navigateTo({
                url: '../lessonIndex/lessonIndex'
              })
            }
            else {
              wx.showModal({
                title: '警告',
                content: '课程还未结束，不能查看（如已到时间，请下拉刷新）',
              })
            }
      },
      error: function (error) {
      }
    })
  },
  Topic: function (topic) {
    var that = this;
    if (topic == '现在不是答题时间，请注意答题提示') {
      that.setData({ answertime: topic })
      that.setData({ Topic_NO: '0' });
      dbOperator.Attendance_Results(wx.getStorageSync('Student_objId'), wx.getStorageSync('Lesson_objId'), this.Attendance_Results);
    } else {
      that.setData({ answertime: topic })
      that.setData({ Topic_NO: topic.attributes.Topic_NO });
      dbOperator.Attendance_Results(wx.getStorageSync('Student_objId'), wx.getStorageSync('Lesson_objId'), this.Attendance_Results);
    }
  },
  Answer_Results: function (Array) {/////bug:一次能进一次不能进

    var that = this;
    if ((this.data.signinstate == '旷课') || (this.data.signinstate == '请假')) {
      that.setData({ seconddbtn: '3' });
    }

    else if (this.data.answertime == '现在不是答题时间，请注意答题提示') {
      that.setData({ seconddbtn: '0' });

    }
    else if (this.data.answertime == '404 /(ㄒoㄒ)/~~' || Array == '404 /(ㄒoㄒ)/~~') {
      that.setData({ seconddbtn: '4' });

    }
    else if ((this.data.answertime != '现在不是答题时间，请注意答题提示' && Array == '题目还未录入，请稍后再试') || (this.data.answertime != '现在不是答题时间，请注意答题提示' && Array == '未查到数据，请稍后再试')) {
      that.setData({ seconddbtn: '1' });

    }
    else if (((this.data.answertime != '现在不是答题时间，请注意答题提示' && Array != '题目还未录入，请稍后再试') || (this.data.answertime != '现在不是答题时间，请注意答题提示' && Array != '未查到数据，请稍后再试'))) {
      that.setData({ seconddbtn: '1' })
      that.setData({ a: Array.length - 1 });
      for (var i = 1; i <= this.data.a; i++) {
        if (Array[i].get("Topic_objId").get('Topic_NO') == this.data.Topic_NO) {
          that.setData({ seconddbtn: '5' });
        }
      }
    }
    if (this.data.seconddbtn == 3) {
      wx.showModal({
        title: '警告',
        content: '旷课或数据还未录入请稍等或下拉刷新',
      })
    }
    else if (this.data.seconddbtn == 4) {
      wx.showModal({
        title: '警告',
        content: '请检查网络，再下拉刷新',
      })
    }
    else if (this.data.seconddbtn == 0) {
      wx.showModal({
        title: '警告',
        content: '现在不是答题时间，请注意助教的答题提示。（下拉刷新，获取新题目）',
      })

    }
    else if (this.data.seconddbtn == 1) {//直接进不需要判断
      wx.navigateTo({
        url: '../topicIndex/topicIndex'
      })
    }
    else if (this.data.seconddbtn == 5) {
      wx.showModal({
        title: '警告',
        content: '已答题（如已到下一题时间，请下拉刷新获取新题目）',
      })
    }
  },
  Lesson_NO: function (NO) {
    var that = this;
    that.setData({ Lesson_NO: NO });
  },
  Attendance_Results: function (Array) {
    var that = this;
    that.setData({ signinstate: Array[1] })
    dbOperator.Answer_Results(wx.getStorageSync('Student_objId'), wx.getStorageSync('Lesson_objId'), this.Answer_Results);
  },
  bindViewTapTopic: function () {///第二个按钮
    var that = this;
    dbOperator.Topic(this.Topic);
  },

  onLoad: function () {
    var that = this;
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {

    // 页面显示
    var that = this;
    dbOperator.Lesson_NO(this.Lesson_NO);
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          Height: res.windowHeight + 15,
          Width: res.windowWidth,
        })
      }
    })
  }
})