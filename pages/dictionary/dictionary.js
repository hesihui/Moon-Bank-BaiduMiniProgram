import {historyInfo} from '../../utils/history_mock';
const order = ['one', 'two', 'three'];

Page({
    data: {
        scrollIntoView: 'one',
        scrollTop: 0,
        scrollLeft: 0,
        historyList: [],
    },

    onLoad() {
        console.log('Dictionary onLoad BEGIN');
        // 调用云函数
        const db = swan.cloud.database();
        db.collection("moods").where({
            userId: swan.getStorageSync('userId')
        })
        .get({
            success: res => {
                console.log('save success', res)
                this.setData({historyList: res.data})
            },
            fail: e => {
                swan.showToast({
                    icon: 'none',
                    title: '云端获取失败，请重试！'
                });
            }
        });
        console.log('Dictionary onLoad END');
    },
    upper() {
        swan.showToast({
            title: '到顶了',
            icon: 'none'
        });
    },

    lower() {
        swan.showToast({
            title: '到底了',
            icon: 'none'
        });
    },

    scroll(e) {
        console.log('获取滚动事件的详细信息e.detail：', e.detail);
        this.setData({
            scrollTop: e.detail.scrollTop
        })
    },

    scrollToTop(e) {
        console.log(e);
        this.setData({
            scrollTop: 0,
        });
    },
    tap(e) {
        for (let i = 0; i < order.length; ++i) {
            if (order[i] === this.data.scrollIntoView) {
                const next = (i + 1) % order.length;
                this.setData({
                    scrollIntoView: order[next],
                    scrollTop: next * 500,
                });
                break;
            }
        }
    },
    tapMove() {
        this.setData({
            scrollTop: this.data.scrollTop + 10,
        });
    }
});