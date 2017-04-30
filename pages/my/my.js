// pages/my/my.js
var app = getApp();
var Bmob = require('../../utils/bmob.js');
var dbOperator = require('../../utils/dbOperator.js');
Page({
  data: {
    userInfo: {},
    stu_id: '',
    stu_name: '',
    stu_class: '',
    fenshu: '',
    you: false,
    score: [],
  },

  onPullDownRefresh: function (e) {
    // Do something when pull down.
    console.log("下拉刷新....");
    this.onLoad();
    this.onReady();
    wx.stopPullDownRefresh();
  },

  onLoad: function (options) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var value = wx.getStorageSync('Student_Id')
    this.setData({
      stu_id: value
    })
    var Student = Bmob.Object.extend("Student");
    var query = new Bmob.Query(Student);
    var stuId = this.data.stu_id
    query.equalTo("Student_Id", stuId);
    // 查询所有数据
    query.find({
      success: function (results) {
        var object = results[0];
        that.setData({
          stu_name: object.get('Student_Name'),
          stu_class: object.get('Student_Class'),
          fenshu: object.get('Grade_TotalScore')
        })
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
  },

  Lesson_ScoreSum: function (Array) {
    var xiaofenshu = [];
    if (Array == "未查到本次课程总成绩")
      console.log(Array);
    else {
      for (var i = 1; i < Array.length; i++) {
        var object = Array[i];
        console.log("第" + i + "节课:" + object.get("Stu_Les_ScoreSum") + "分");
        xiaofenshu[i - 1] = object.get("Stu_Les_ScoreSum");
        this.setData({ score: xiaofenshu });
        if (i == 25) {
          this.setData({ you: true })
        }
      }
    }
  },

  onReady: function () {
    dbOperator.Student_Lesson_Read(wx.getStorageSync('Student_objId'), this.Lesson_ScoreSum);
  },
})