/**
 * @file index.js
 * @author swan
 */
const app = getApp()

// var uerData = require("../../utils/data.js");

Page({
    data: {
        // userInfo: uerData,
        buttonGroupDisplay: 'none',
        cardDisplay: 'inline-block',
        screenWidth: 300,
        screenHeight: 600,
        moodShow: "show",
        impactShow: "hide",
        changeShow: "hide",
        canvasShow: "hide",
        textShow: "hide",
        buttonGroupShow: "hide",
        buttonGroupHeight: '0',
        cardShow: "show",
        focusText: false,
        saveForm: false
    },
    onLoad(options) {
        console.log('Main.onload', arguments)
        this.canvasContext = swan.createCanvasContext('mycanvas');
        const sys = swan.getSystemInfoSync();
        this.setData({
            screenWidth: sys.screenWidth,
            screenHeight: sys.screenHeight
        })
    },
    onShow() {
        console.log('Main.onShow', arguments)
        // if (this.data.saveForm) {
        //     this.saveToCloud()
        // } else {
        //     console.log('NO SAVE')
        // }
    },
    onHide() {
        // app.globalData.openParams = '';
    },

    /**
     * 得到各个百分比对应的结果
     *
     * @param {number=} completePercent 百分比数据
     */
    getResultComment(completePercent) {
        const cp = completePercent;
        this.setData({
            resultComment: cp < 80 ? (cp < 60 ? '不及格' : '中等') : (cp < 90 ? '良好' : '优秀')
        });
    },

    // touchstart(e) {
    //     console.log('touchstart', e);
    // },
    // touchmove(e) {
    //     console.log('touchmove', e);
    // },
    // touchend(e) {
    //     console.log('touchend', e);
    // },
    // touchcancel(e) {
    //     console.log('touchcancel', e);
    // },
    // longtap(e) {
    //     console.log('longtap', e);
    // },
    error(e) {
        console.log('error', e.detail.errMsg);
    },
    download() {
        swan.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 300,
            height: 600,
            destWidth: 300,
            destHeight: 600,
            canvasId: 'mycanvas',
            fileType: 'jpg',
            quality: 1,
            success: res => {
                this.setData('src', res.tempFilePath);
                // swan.showModal({
                //     title: '图片路径',
                //     content: JSON.stringify(res.tempFilePath)
                // })
                swan.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: res => {
                        swan.showModal({
                            title: '成功',
                            content: '图片保存到相册'
                        })
                    },
                    fail: err => {
                        console.log("failed");
                    }
                });
            }
        })
    },
    moodChange(e) {
        const mood = e.detail.value;
        this.setData({"formData.mood": mood});
        const ctx = this.canvasContext;
        ctx.clearRect(0, 0, 10000, 10000);
        ctx.beginPath();
        ctx.arc(0.5*(this.data.screenWidth-20), 0.3*this.data.screenHeight, 50, 0, 2 * Math.PI);
        if (mood == "开心") {
            ctx.setFillStyle('#ff9a55');
        } else if (mood == "不开心") {
            ctx.setFillStyle('#6e7c5e');
        } else if (mood == "一般") {
            ctx.setFillStyle('#c9aa88');
        }
        ctx.fill();


        var that = this;
        setTimeout(function() {
            const query = swan.createSelectorQuery();
            query
                .select('.mood-selector')
                .boundingClientRect(function (res) {
                    // console.log(res);
                })
                .exec(function(rect){
                    that.setData({
                        moodShow: 'hide',
                        impactShow: 'show'
                    })
                })
        }, 500);

    },
    impactChange(e) {
        const impact = e.detail.value;
        this.setData({"formData.impact": impact});
        var that = this;
        setTimeout(function() {
            const query = swan.createSelectorQuery();
            query
                .select('.mood-selector')
                .boundingClientRect(function (res) {
                    // console.log(res);
                })
                .exec(function(rect){
                    that.setData({
                        changeShow: 'show',
                        impactShow: 'hide',
                    })
                })
        }, 500);
    },
    changeChange(e) {
        const change = e.detail.value;
        this.setData({"formData.change": change});
        var that = this;
        setTimeout(function() {
            const query = swan.createSelectorQuery();
            query
                .select('.mood-selector')
                .boundingClientRect(function (res) {
                    // console.log(res);
                })
                .exec(function(rect){
                    console.log('CHANGE');
                    that.setData({
                        changeShow: 'hide',
                        textShow: 'show',
                        focusText: true
                    })
                })
        }, 500);
    },
    onTextBlur() {
      console.log('ON BLUR');
      this.setData({focusText: false});
    },
    tryFocusText() {
      console.log('FOCUS=' + this.data.focusText);
      this.setData({focusText: true});
    },
    textConfirm(e) {
        console.log('textConfirm');
        const text = e.detail.value;
        const ctx = this.canvasContext;
        ctx.setFontSize(20);
        ctx.setTextAlign('center');
        ctx.setFillStyle('#555');
        ctx.fillText(text, 0.5*(this.data.screenWidth-20), 0.3*this.data.screenHeight+80);
        ctx.draw(true)

        var that = this;
        setTimeout(function() {
            const query = swan.createSelectorQuery();
            query
                .select('.mood-selector')
                .boundingClientRect(function (res) {
                    // console.log(res);
                })
                .exec(function(rect){
                    that.setData({
                        textShow: 'show',
                        buttonGroupShow: 'show',
                        buttonGroupHeight: '15%',
                        canvasShow: 'show',
                        cardShow: 'hide'
                    });
                })
        }, 0);
    },
    resetview() {
        const ctx = this.canvasContext;
        ctx.clearRect(0, 0, this.data.screenWidth, this.data.screenHeight);
        ctx.draw();
        this.setData({
            buttonGroupShow: 'hide',
            buttonGroupHeight: '0',
            moodShow: 'show',
            cardShow: 'show',
            canvasShow: 'hide'
        })
    },
    saveToCloud() {
        console.log('saveToCloud BEGIN');
        const userId = swan.getStorageSync('userId');
        const date = new Date().toLocaleDateString().replace(/\//g, '-');
        // 调用云函数
        const db = swan.cloud.database();
        const id = `${userId}_${date}`
        const data = {
            ...this.data.formData,
            userId: userId,
            timestamp: date,
            notes: this.data.textConfirm
        };
        db.collection("moods").add({
            data: {
                _id: id,
                ...data
            },
            success: res => {
                console.log('save success', res)
                swan.switchTab({
                    url: '../home/home'
                });
            },
            fail: res => {
                if (res.errCode !== '400635') {
                    swan.showToast({
                        icon: 'none',
                        title: `云端新增记录(id=${id})失败，请重试！`
                    });
                } else {
                  swan.showToast({
                    icon: 'none',
                    title: `您今天的心情已存放过了，不能重复存放心情哟！`
                  });
                    // console.log(`记录(id=${id})已存在，准备更新...`);
                    // db.collection("moods").doc(id).update({
                    //     data,
                    //     success: res => {
                    //         console.log(`记录(id=${id})已更新!`, res)
                    //         swan.switchTab({
                    //             url: '../home/home'
                    //         });
                    //     },
                    //     fail: res => {
                    //         console.log('error', res);
                    //         swan.showToast({
                    //             icon: 'none',
                    //             title: '记录(id=${id})更新失败！'
                    //         });
                    //     }
                    // });
                }
            }
        });
        this.setData({ saveForm: false });
        console.log('saveToCloud END');
    },
    saveMood(e) {
        this.setData({'saveForm': true});
        const logged = swan.getStorageSync('logged');
        if (!logged)  {
            swan.navigateTo({
                url: '../authorize/authorize'
            });
        } else {
            this.saveToCloud();
        }

        // swan.getUserInfo({
        //     success: res => {
        //         const userInfo = res.userInfo;


        //         const obj = {
        //             userInput: e.detail.value,
        //             userInfo: userInfo,
        //             date: new Date().toUTCString()
        //         }

        //         swan.showModal({
        //             title: '存心情成功',
        //             content: JSON.stringify(obj)
        //         })

        //     },
        //     fail: err => {
        //         const obj = {
        //             userInput: e.detail.value,
        //             userInfo: "NA",
        //             date: new Date().toUTCString()
        //         }
        //         swan.showModal({
        //             title: '存心情成功',
        //             content: JSON.stringify(obj)
        //         })
        //     }
        // })
    },
    getUserInfo(e){
        var userInfo = JSON.stringify(e.detail.userInfo);
        console.log(userInfo);
    }
});
