export const historyInfo = {
    msg: 'success',
    username: 'luxx',
    data: [{
            mood:"好心情",
            impact:"很多",
            change:"不想",
             notes:"今天太开心啦",
             timestamp: "2020-10-12"
        },
        {
            mood:"好心情",
            impact:"较少",
            change:"我想",
            notes:"心情不错但没什么事想做",
            timestamp: "2020-10-10"
        },
        {
            mood:"坏心情",
            impact:"很多",
            change:"我想",
            notes:"今天心情不好",
            timestamp: "2020-10-9"
        },
        {
            mood:"一般心情",
            impact:"没有",
            change:"不知道",
            notes:"今天心情还可以",
            timestamp: "2020-10-6"
        },
        {
            mood:"一般心情",
            impact:"没有",
            change:"不知道",
            notes:"今天心情还可以",
            timestamp: "2020-10-6"
        },
        {
            mood:"一般心情",
            impact:"没有",
            change:"不知道",
            notes:"今天心情还可以",
            timestamp: "2020-10-6"
        },
        {
            mood:"一般心情",
            impact:"没有",
            change:"不知道",
            notes:"今天心情还可以",
            timestamp: "2020-10-6"
        }
    ]
}

var data = historyInfo.data;
export var goodMood = 0;
export var badMood = 0;
export var noramlMood = 0;

for (var i = 0; i < data.length; i++) {
    if (data[i].mood === "坏心情") {
        badMood++;
    } else if (data[i].mood === "好心情") {
        goodMood++;
    } else if (data[i].mood === "一般心情"){
        noramlMood++;
    }

}