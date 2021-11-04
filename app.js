//app.js
// var data = require("./utils/data.js");

App({
  currentUser: {
      logged: false,
      userId: String
  },
  onLaunch() {
    try {
      this.onLaunch2();
    } catch (e) {
      console.log("ONLO", e);
    }
  },
  onLaunch2: function () {
    if (!swan.cloud) {
        console.error('请使用 3.105.2 或以上的基础库以使用云能力')
    } else {
        swan.cloud.init({
            traceUser: true,
            env: 'cloud-env-7txn25k9'
        })
    }



    // if (!swan.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    // } else {
    //   swan.cloud.init({
    //     traceUser: true
    //   });
    // }

//     this.initTask();
//     this.globalData = {
//         //mo ban li fu zhi de docWeb, ke yi bei ti huan
//         openParams: 'docWeb'
//     };
  }
//   initTask: function () {
//     var lastLoginDate;
//     if(lastLoginDate = wx.getStorageSync('lastLoginDate')){
//       if(this.isToday(lastLoginDate)){
//         return;
//       }
//     }

//     this.setNewDate();
//     this.setNewTask();
//   },
//   isToday: function (dateCmp) {
//     var today = new Date();

//     if (today.getFullYear() == dateCmp.year) {
//       if (today.getMonth() == dateCmp.month) {
//         if (today.getDay() == dateCmp.day) {
//           return true;
//         }
//       }
//     }

//     return false;
//   },
//   setNewDate: function () {
//     var today = new Date();
//     var date = {
//       year: today.getFullYear(),
//       month: today.getMonth(),
//       day: today.getDay()
//     };
//     swan.setStorageSync('lastLoginDate', date);
//   },
//   setNewTask: function () {
//     swan.cloud.callFunction({
//       name: 'getDailyTask',
//       data: {},
//       success: res => {
//         console.log(res);
//         swan.setStorageSync('task', res.result.task);
//         this.resetProgress(res.result.task);
//       },
//       fail: err => {
//         console.log(err);
//         swan.showToast({
//           title: '获取任务失败',
//           icon: 'none',
//           duration: 2000
//         });
//       }
//     });
//   },
//   resetProgress: function (task) {
//     var progress = {
//       globalTimeCount: 0,
//       localTimeCount: 0,
//       complete: false,
//       totalNum: 0,
//       unstudyWords: [],
//       studingWords: [],
//       studiedWords: [],
//       easyWords: [],
//       startTime: new Date().getTime()
//     };
//     progress.totalNum = task.newWords.length;
//     progress.unstudyWords = task.newWords;
//     swan.setStorageSync('newWordsProgress', progress);
//     progress.totalNum = task.oldWords.length;
//     progress.unstudyWords = task.oldWords;
//     swan.setStorageSync('oldWordsProgress', progress);
//   }
});
