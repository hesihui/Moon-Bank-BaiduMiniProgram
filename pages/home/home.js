// miniprogram/pages/home/home.js
import {badMood, goodMood, noramlMood} from '../../utils/history_mock';
var total = badMood + goodMood + noramlMood
var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: "",
    totalNum: 0,
    goodMoodSum: 0,
    badMoodSum: 0,
    normalMoodSum: 0,
    bookInfo: {},
    progressType: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    console.log('Home onLoad BEGIN');
    // 调用云函数
    const db = swan.cloud.database();
    db.collection("moods").where({
        userId: swan.getStorageSync('userId'),
        mood: '开心'
    })
    .count({
        success: res => {
            console.log('好心情 success', res)
            this.setData({goodMoodSum: res.total})
            this._updateTotal();
        },
        fail: e => {
            swan.showToast({
                icon: 'none',
                title: '云端获取失败，请重试！'
            });
        }
    });
    db.collection("moods").where({
        userId: swan.getStorageSync('userId'),
        mood: '不开心'
    })
    .count({
        success: res => {
            console.log('坏心情 success', res)
            this.setData({badMoodSum: res.total})
            this._updateTotal();
        },
        fail: e => {
            swan.showToast({
                icon: 'none',
                title: '云端获取失败，请重试！'
            });
        }
    });
    db.collection("moods").where({
        userId: swan.getStorageSync('userId'),
        mood: '一般'
    })
    .count({
        success: res => {
            console.log('一般心情 success', res)
            this.setData({normalMoodSum: res.total})
            this._updateTotal();
        },
        fail: e => {
            swan.showToast({
                icon: 'none',
                title: '云端获取失败，请重试！'
            });
        }
    });
    console.log('Home onLoad END');
  },
  _updateTotal() {
      this.setData({totalNum: this.data.normalMoodSum + this.data.goodMoodSum + this.data.badMoodSum});
  },
//   setTaskInfo: function () {
//     var newWordsProgress = swan.getStorageSync('newWordsProgress');
//     var oldWordsProgress = swan.getStorageSync('oldWordsProgress');
//     var newWordsNum = newWordsProgress.totalNum;
//     var oldWordsNum = oldWordsProgress.totalNum;
//     var newWordsUnstudyNum = newWordsProgress.unstudyWords.length + newWordsProgress.studingWords.length;
//     var oldWordsUnstudyNum = oldWordsProgress.studingWords.length + oldWordsProgress.unstudyWords.length;
//     var unstudyWordsNum = newWordsUnstudyNum + oldWordsUnstudyNum;
//     var complete = false;

//     if (newWordsProgress.complete && oldWordsProgress.complete) {
//       complete = true;
//     }

//     that.setData({
//       newWordsNum: newWordsNum,
//       oldWordsNum: oldWordsNum,
//       unstudyWordsNum: unstudyWordsNum,
//       complete: complete
//     });
//   },
//   setSignedNum: function () {
//     var signedNum = 12;
//     that.setData({
//       signedNum: signedNum
//     });
//   },
//   setBookInfo: function () {
//     var bookInfo = {
//       totalNum: 2340,
//       studiedNum: 242,
//       name: "六级考纲词汇(2019版)",
//       percentage: 12
//     };
//     that.setData({
//       bookInfo: bookInfo
//     });
//   },
//   searchInput: function (e) {
//     this.setData({
//       searchText: e.detail.value
//     });
//   },
//   search: function () {
//     console.log(this.data.searchText);
//     this.setData({
//       searchText: ""
//     });
//   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.setTaskInfo();
    // this.setSignedNum();
    // this.setBookInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  startMain: function () {
    swan.navigateTo({
      url: '../main/main'
    });
  },
  toCalendarPage: function () {
    swan.navigateTo({
      url: '../calendar/calendar'
    });
  },
  toDictionary: function (e) {
    swan.navigateTo({
      url: '../dictionary/dictionary?type=' + e.currentTarget.dataset.type
    });
  }
});

Page.after({
  url: /home\/home/,
  methods: {
    onLoad() {
      console.log('PAGE LOAD');
      const logged = swan.getStorageSync("logged");
      console.log('logged = ' + logged);
      if (!logged) {
        console.log('IN');
        swan.navigateTo({
          url: '../authorize/authorize'
        })
        // swan.navigateTo({
        //   url: '../../pages/authorize/authorize'
        // });
      }
    }
  }
});