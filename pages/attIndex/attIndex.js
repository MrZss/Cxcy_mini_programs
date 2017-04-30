var Bmob = require('../../utils/bmob.js');
var dbOperator = require('../../utils/dbOperator.js');
var app = getApp()
Page({
  data: {
    state: '',
  },
  //线上签到
  online: function () {
    wx.navigateTo({
      url: '../attIndex/attOnline',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //线下签到
  reality: function () {
    wx.navigateTo({
      url: '../attIndex/attOffline',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  //查询签到结果
  check: function () {
    wx.navigateTo({
      url: '../attIndex/attSuc'
    })
  },

  back: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },
  
})