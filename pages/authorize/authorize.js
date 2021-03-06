Page({
    data: {
        logged: false
    },
    onLoad: function() {
        // 监听页面加载的生命周期函数
        this.setData({logged: swan.getStorageSync('logged')});
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    },
    onGetUserInfo: function(event) {
        console.log('onGetUserInfo.event', event)
        if (!event.detail) {
            swan.showToast({
                title: '无法获取用户',
                icon: 'none'
            });
        } else {
            this.tryGetUserId()
        }
    },
    tryGetUserId: function() {

        // 调用云函数
        swan.cloud.callFunction({
          name: 'mblogin',
          data: {},
          success: res => {
            console.log('[云函数] [login] user userid: ', res.result.userid, res.result);
            swan.setStorageSync("userId", res.result.userid);
            swan.setStorageSync("logged", true);
            swan.navigateBack({
                url: '../home/home?_='+Math.random
            });
          },
          fail: err => {
            console.error('[云函数] [login] 调用失败', err)
            swan.navigateTo({
              url: '../deployFunctions/deployFunctions',
            })
          }
        })
    }
});