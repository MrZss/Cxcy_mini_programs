var dbOperator = require('../../utils/dbOperator.js');
Page({
  data: {
    firstscore: null,
    firstscore1: null,
    secondscore: null,
    secondscore1: null,
    thirdscore: null,
    thirdscore1: null,
    Answer_Score: null,//答题得分
    Attendance_Score: null,//签到得分
    signin: null,//签到状态
    ScoreSum: null,
    score: null,
    fouthscore: null,
    fouthscore1: null,
    length: null,
  },
  Attendance_Results: function (Array) {
    var that = this;
    that.setData({ Attendance_Score: Array[0] })
    that.setData({ signin: Array[1] })
  },

  Answer_Results: function (Array) {
    var that = this;
    that.setData({ Answer_Score: Array[0] })
    if (Array.length == 1) {
      that.setData({ firstscore1: "第一题　　　未做答 " })
      that.setData({ secondscore1: "第二题　　　未做答 " })
      that.setData({ thirdscore1: "第三题　　　未做答 " })
      that.setData({ fouthscore1: "第四题　　　未做答 " })
    }
    else if (Array.length == 2) {//答题信息只有一题的判定
      that.setData({ firstscore1: Array[1].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[1].get('Stu_Top_Answer') + '　　' + Array[1].get('Stu_Top_State') });
      that.setData({ secondscore1: "未做答 " })
      that.setData({ thirdscore1: "未做答 " })
      that.setData({ fouthscore1: "未做答 " })
    }
    else if (Array.length == 3) {//答题信息只有两题的判断
      that.setData({ firstscore1: Array[1].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[1].get('Stu_Top_Answer') + '　　' + Array[1].get('Stu_Top_State') });
      that.setData({ secondscore1: Array[2].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[2].get('Stu_Top_Answer') + '　　' + Array[2].get('Stu_Top_State') });
      that.setData({ thirdscore1: "未做答 " })
      that.setData({ fouthscore1: "未做答 " })
    }
    else if (Array.length == 4) {//答题信息只有三题
      that.setData({ firstscore1: Array[1].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[1].get('Stu_Top_Answer') + '　　' + Array[1].get('Stu_Top_State') });
      that.setData({ secondscore1: Array[2].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[2].get('Stu_Top_Answer') + '　　' + Array[2].get('Stu_Top_State') });
      that.setData({ thirdscore1: Array[3].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[3].get('Stu_Top_Answer') + '　　' + Array[3].get('Stu_Top_State') });
      that.setData({ fouthscore1: "未做答 " })
    }
    else if (Array.length == 5) {//答题信息只有三题
      that.setData({ firstscore1: Array[1].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[1].get('Stu_Top_Answer') + '　　' + Array[1].get('Stu_Top_State') });
      that.setData({ secondscore1: Array[2].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[2].get('Stu_Top_Answer') + '　　' + Array[2].get('Stu_Top_State') });
      that.setData({ thirdscore1: Array[3].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[3].get('Stu_Top_Answer') + '　　' + Array[3].get('Stu_Top_State') });
      that.setData({ fouthscore1: Array[4].get("Topic_objId").get('Topic_NO') + '你选择的是：' + '　' + Array[4].get('Stu_Top_Answer') + '　　' + Array[3].get('Stu_Top_State') });
    }
  },

  Right_Answer: function (Array) {
    var that = this;
    that.setData({ firstscore: Array[1] });
    that.setData({ secondscore: Array[2] });
    that.setData({ thirdscore: Array[3] });
    that.setData({ fouthscore: Array[4] });
  },
  rightanswer: function () {
    wx.showModal({
      title: '正确答案',
      content: this.data.firstscore + this.data.secondscore + this.data.thirdscore + this.data.fouthscore,
    })
  },

  onLoad: function (options) {
    var that = this;
    dbOperator.Attendance_Results(wx.getStorageSync('Student_objId'), wx.getStorageSync('Lesson_objId'), this.Attendance_Results);
    dbOperator.Answer_Results(wx.getStorageSync('Student_objId'), wx.getStorageSync('Lesson_objId'), this.Answer_Results);
    dbOperator.Right_Answer(this.Right_Answer);
  },
  bindViewCourselndex: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },

  onReady: function () {

  },
  onShow: function () {

    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})