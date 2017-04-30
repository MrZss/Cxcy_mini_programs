var total_second = 9 * 100;
var dbOperator = require('../../utils/dbOperator.js');

Page({ ////上传选择了什么  做对做错
  data: {
    clock: null,
    Topic_NO: null,
    problem: null,
    answer: null,
    first: null,
    second: null,
    third: null,
    fourth: null,
    getresult: null,
    Answer: null,
    State: null,
    items: [
      { name: 'A' },
      { name: 'B' },
      { name: 'C' },
      { name: 'D' },
    ],
    result: null,//正确答案  
  },

  radioChange: function (e) {
    var that = this;
    console.log('radio发生change事件，携带value值为：', e.detail.value)//返回值给按钮
    var that = this;
    that.setData({ getresult: e.detail.value })
    console.log("用户选项：" + this.data.getresult)
  },

  Topic: function (topic) {
    var that = this;
    console.log(topic);
    that.setData({ clock: topic.attributes.Topic_EndTime })
    console.log(topic.attributes.Topic_Options[0])
    that.setData({ Topic_NO: topic.attributes.Topic_NO });
    that.setData({ problem: topic.attributes.Topic_Title });
    that.setData({ answer: topic.attributes.Topic_Options });
    console.log(this.data.answer[0]);

    that.setData({
      first: this.data.answer[0],
      second: this.data.answer[1],
      third: this.data.answer[2],
      fourth: this.data.answer[3],
    });
    that.setData({ result: topic.attributes.Topic_Answer });
    console.log(this.data.result);
    wx.hideLoading();
  },

  btnup: function () {
    var that = this;
    if (this.data.result == this.data.getresult) {
      that.setData({ State: "正确" })
      console.log("1");
    }
    else if (this.data.getresult != null && this.data.result != this.data.getresult) {
      that.setData({ State: "错误" })
      console.log("2");
    }
    else if (this.data.getresult == null) {
      that.setData({ State: "未回答" })
      console.log("3");
    }

    that.setData({ Answer: this.data.getresult });
    console.log("state为" + this.data.State)
    console.log("答题状态为" + this.data.getresult)
    if (this.data.State == "未回答") {
      wx.showModal({
        title: '警告',
        content: '选项不能为空',
      })
      console

    }
    else {
      dbOperator.Student_Answer(this.data.Answer, this.data.State)
      var backupdata = 1;
      wx.navigateTo({
        url: './topicSubSuc'
      })

    }
  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var that = this;
    dbOperator.Topic(this.Topic);
  }
  
})