function courseTimeStart(params) {
    const num = parseInt(params);
    const Time = ["08:00", "08:50", "09:40", "10:30", "11:20", "14:30", "15:20", "16:10", "17:00", "19:30", "20:20"];
    switch (num) {
        case 1:
            return Time[0];
        case 2:
            return Time[1];
        case 3:
            return Time[2];
        case 4:
            return Time[3];
        case 5:
            return Time[4];
        case 6:
            return Time[5];
        case 7:
            return Time[6];
        case 8:
            return Time[7];
        case 9:
            return Time[8];
        case 10:
            return Time[9];
        case 11:
            return Time[10];
    };
}

function courseTimeEnd(params) {
    const num = parseInt(params);
    const Time = ["08:40", "09:30", "10:20", "11:10", "12:00", "15:10", "16:00", "16:50", "17:40", "20:10", "21:00"];
    switch (num) {
        case 1:
            return Time[0];
        case 2:
            return Time[1];
        case 3:
            return Time[2];
        case 4:
            return Time[3];
        case 5:
            return Time[4];
        case 6:
            return Time[5];
        case 7:
            return Time[6];
        case 8:
            return Time[7];
        case 9:
            return Time[8];
        case 10:
            return Time[9];
        case 11:
            return Time[10];
    };
}

module.exports = {
    courseTimeStart,
    courseTimeEnd
}