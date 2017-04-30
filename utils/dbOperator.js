var Bmob = require('./bmob.js')

// 查询
//显示本次为第几次课
function Lesson_NO(callback) {
    wx.request({
        url: 'https://api.bmob.cn/1/timestamp',
        data: {},
        header: {
            'X-Bmob-Application-Id': '707047c0bccf2b8f22189aa5f1a7d83c',
            'X-Bmob-REST-API-Key': '333e288e2f55eaab65804572567e74d4'
        },
        success: function (res) {
            var str = res.data.datetime;  //获取服务器时间
            str = str.substring(0, str.length - 9)
            str = str.replace(/-/g, "/");
            var date = new Date(str);
            var Lesson = Bmob.Object.extend("Lesson");
            var query = new Bmob.Query(Lesson);
            query.equalTo("Lesson_Date", date);
            // 查询所有数据
            query.find({
                success: function (results) {
                    // 循环处理查询到的数据
                    if (results.length > 0) {
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];
                        }
                        wx.setStorageSync('Lesson_objId', object.id);
                        callback("本次课程为" + object.get('Lesson_NO') + "程");  //上课日期返回值
                    } else {
                        console.log("今日非本门课程上课日期");
                        callback("今日非本门课程上课日期");  //非上课日期返回值
                    }
                },
                error: function (error) {
                    console.log("查询失败: " + error.code + " " + error.message);
                    callback("404 /(ㄒoㄒ)/~~");  //数据库查询失败返回值 
                }
            });
        }
    })
}


//查询签到信息
function Attendance_Results(Student_objId, Lesson_objId, callback) {
    //根据Leeson_NO签到结果查询
    var Attendance = Bmob.Object.extend("Attendance");
    var query = new Bmob.Query(Attendance);
    query.equalTo("Student_objId", Student_objId);
    query.equalTo("Lesson_objId", Lesson_objId);
    // 查询所有数据
    query.find({
        success: function (results) {
            // 循环处理查询到的数据
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get('Attendance_Type') + ' - ' + object.get('Attendance_Points'));
                }
                var Attendance_Results = new Array(object.get('Attendance_Points'), object.get('Attendance_Type'));
                callback(Attendance_Results);  //返回值
            } else {
                console.log("未查到数据，请稍后再试");
                callback("未查到数据，请稍后再试");  //返回值
            }
        },
        error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
            callback("404 /(ㄒoㄒ)/~~");  //数据库查询失败返回值
        }
    });
}


//查询课堂答题信息
function Answer_Results(Student_objId, Lesson_objId, callback) {
    var Student_Topic = Bmob.Object.extend("Student_Topic");
    var query = new Bmob.Query(Student_Topic);
    var sum = 0;
    var Answer_Results = [];
    var Topic;
    var Topic_NO;
    query.equalTo("Student_objId", Student_objId);
    query.equalTo("Lesson_objId", Lesson_objId);
    query.ascending("createdAt");
    query.include("Topic_objId");
    // 查询所有数据
    query.find({
        success: function (results) {
            // 循环处理查询到的数据
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    sum = sum + object.get('Stu_Top_Points');
                    Answer_Results[i + 1] = object;
                }
                console.log("本次课答题总得分为：" + sum);
                Answer_Results[0] = sum;
                callback(Answer_Results);  //返回值
            } else {
                console.log("未查到数据，请稍后再试");
                callback("未查到数据，请稍后再试")  //返回值
            }
        },
        error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
            callback("404 /(ㄒoㄒ)/~~");  //数据库查询失败返回值
        }
    });
}


//题目正确答案
function Right_Answer(callback) {
    wx.request({
        url: 'https://api.bmob.cn/1/timestamp',
        data: {},
        header: {
            'X-Bmob-Application-Id': '707047c0bccf2b8f22189aa5f1a7d83c',
            'X-Bmob-REST-API-Key': '333e288e2f55eaab65804572567e74d4'
        },
        success: function (res) {
            var str = res.data.datetime;  //获取服务器时间
            str = str.substring(0, str.length - 9)
            str = str.replace(/-/g, "/");
            var date = new Date(str);
            var Topic = Bmob.Object.extend("Topic");
            var query = new Bmob.Query(Topic);
            var Right_Answer = [];
            query.equalTo("Topic_Date", date);
            // 查询所有数据
            query.find({
                success: function (results) {
                    // 循环处理查询到的数据
                    if (results.length > 0) {
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];
                            Right_Answer[1 + i] = object.get('Topic_NO') + "正确答案：" + object.get('Topic_Answer');
                        }
                        callback(Right_Answer);  //上课日期返回值
                    } else {
                        console.log("题目还未录入，请稍后再试");
                        callback("题目还未录入，请稍后再试");  //非上课日期返回值
                    }
                },
                error: function (error) {
                    console.log("查询失败: " + error.code + " " + error.message);
                    callback("404 /(ㄒoㄒ)/~~");  //数据库查询失败返回值 
                }
            });
        }
    })
}


//题目
function Topic(callback) {
    //获取服务器时间
    wx.request({
        url: 'https://api.bmob.cn/1/timestamp',
        data: {},
        header: {
            'X-Bmob-Application-Id': '707047c0bccf2b8f22189aa5f1a7d83c',
            'X-Bmob-REST-API-Key': '333e288e2f55eaab65804572567e74d4'
        },
        success: function (res) {
            console.log(res.data)
            var str = res.data.datetime;
            str = str.replace(/-/g, "/");
            var date = new Date(str);
            var Topic = Bmob.Object.extend("Topic");
            var query = new Bmob.Query(Topic);
            query.lessThanOrEqualTo("Topic_StartTime", date);
            query.greaterThanOrEqualTo("Topic_EndTime", date);
            // 查询所有数据
            query.find({
                success: function (results) {
                    // 循环处理查询到的数据
                    wx.removeStorageSync('Topic_objId');
                    if (results.length > 0) {
                        for (var i = 0; i < results.length; i++) {
                            var object = results[i];
                        }
                        wx.setStorageSync('Topic_objId', object.id);
                        callback(object);  //上课日期返回值
                    } else {
                        callback("现在不是答题时间，请注意答题提示");  //非上课日期返回值
                    }
                },
                error: function (error) {
                    console.log("查询失败: " + error.code + " " + error.message);
                    callback("404 /(ㄒoㄒ)/~~");  //数据库查询失败返回值 
                }
            });
        }
    })
}


//查询课堂总得分
function Student_Lesson_Read(Student_objId, callback) {
    var Student_Lesson = Bmob.Object.extend("Student_Lesson");
    var query = new Bmob.Query(Student_Lesson);
    var ScoreSum = [];
    query.equalTo("Student_objId", Student_objId);
    // 查询所有数据
    query.find({
        success: function (results) {
            if (results.length > 0) {
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    ScoreSum[1 + i] = object;
                }
                callback(ScoreSum);
            } else {
                console.log("未查到本次课程总成绩");
                callback("未查到本次课程总成绩");
            }
        },
        error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
        }
    });
}


// 写入
//学生答题答案&结果写入数据库
function Student_Answer(Answer, State) {
    var Student_Topic = Bmob.Object.extend("Student_Topic");
    var Student_Topic = new Student_Topic();
    var Student = Bmob.Object.extend("Student");  //现有表
    var Student = new Student();
    var Lesson = Bmob.Object.extend("Lesson"); //现有表
    var Lesson = new Lesson();
    var Topic = Bmob.Object.extend("Topic"); //现有表
    var Topic = new Topic();
    Student.id = wx.getStorageSync('Student_objId');  //现有表中已有行的objectId
    Student_Topic.set("Student_objId", Student);
    Lesson.id = wx.getStorageSync('Lesson_objId');
    Student_Topic.set("Lesson_objId", Lesson);
    Topic.id = wx.getStorageSync('Topic_objId');
    Student_Topic.set("Topic_objId", Topic);
    Student_Topic.set("Stu_Top_Answer", Answer);
    Student_Topic.set("Stu_Top_State", State);
    switch (State) {
        case "正确":
            Student_Topic.set("Stu_Top_Points", 5);
            break;
        case "错误":
            Student_Topic.set("Stu_Top_Points", 0);
            break;
    }
    //添加数据，第一个入口参数是null
    Student_Topic.save(null, {
        success: function (result) {
            // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
            console.log("学生答题记录创建成功, objectId:" + result.id);
        },
        error: function (result, error) {
            // 添加失败
            console.log('学生答题记录创建失败');

        }
    });
}


//每节课总得分写入
function Student_Lesson_Write(ScoreSum) {
    var Student_Lesson = Bmob.Object.extend("Student_Lesson");
    var Student_Lesson = new Student_Lesson();
    var Student = Bmob.Object.extend("Student");  //现有表
    var Student = new Student();
    var Lesson = Bmob.Object.extend("Lesson"); //现有表
    var Lesson = new Lesson();
    Student_Lesson.set("Stu_Les_ScoreSum", ScoreSum);
    Student.id = wx.getStorageSync('Student_objId');
    Student_Lesson.set("Student_objId", Student);
    Lesson.id = wx.getStorageSync('Lesson_objId');
    Student_Lesson.set("Lesson_objId", Lesson);
    //添加数据，第一个入口参数是null
    Student_Lesson.save(null, {
        success: function (result) {
            // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
            console.log("学生课堂总得分创建成功, objectId:" + result.id);
        },
        error: function (result, error) {
            // 添加失败
            console.log('学生课堂总得分创建日记失败');
        }
    });
}


module.exports = {
    Lesson_NO: Lesson_NO,  //显示本次为第几次课
    Attendance_Results: Attendance_Results,  //签到信息（返回数组。[0]：签到得分、[1]：签到状态）
    Answer_Results: Answer_Results,  //课堂答题信息（返回数组。[0]:答题分数总和、[1-?]:答题详情(child)（Stu_Top_State、Stu_Top_Points等）
    Right_Answer: Right_Answer,  //题目正确答案（返回数组。[1-?]:题目正确答案）
    Topic: Topic,  //题干&选项...（返回单一项：object）
    Student_Answer: Student_Answer,  //学生答题答案&结果写入 （参数:State：正确、错误。Answer：A、B、C、D）
    Student_Lesson_Write: Student_Lesson_Write,  //学生课堂总分写入（ 参数：ScoreSum）
    Student_Lesson_Read: Student_Lesson_Read,  //查询课堂总得分(返回已上过的每节课的总得分 返回object)
};