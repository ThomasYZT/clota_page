import { calendar } from '@/utils/solar2lunar';

/**
 * 获取日期组件每页显示的日期信息
 * @param dateInfo
 */
export const getDate = function (dateInfo) {
    let date = dateInfo.split('-');
    //选中的年
    let year = date[0];
    //选中的月
    let month = date[1];
    //下个月
    let nextMonth = parseInt(month) + 1;
    //上个月
    let prevMonth = (parseInt(month) - 1) > 0 ? (parseInt(month) - 1) : 12;
    //选中的月份对应的天数
    let monthDays = calendar.solarDays(year,month);
    //下个月对应的天数
    let nextMonthDays = calendar.solarDays(year,nextMonth);
    //上个月对应的天数
    let prevMonthDays = calendar.solarDays(year,prevMonth);
    //选中月份的第一天对应星期几
    let weekIndex = calendar.solar2lunar(year,month,'1').nWeek;
    //上个月份在当前视图显示的个数
    let beforeMonthLeft = weekIndex % 7;
    let tmpDate = [];
    //格式化后的日期信息
    let returnDate = [];
    //获取上个月的月数据
    for (let i = 0,j = beforeMonthLeft; i < j; i++) {
        let day = parseInt(prevMonthDays - beforeMonthLeft + i + 1);
        tmpDate.push({
            label : false,
            val : day,
            nl : calendar.solar2lunar(year,prevMonth,prevMonthDays - beforeMonthLeft + i + 1).IDayCn,
            // completeVal : year + '-' + parseInt(month - 1) + '-' + new Date(year , (month - 1) , (prevMonthDays - beforeMonthLeft + i + 1)).format('dd')
            completeVal : year + '-' + parseInt(month - 1) + '-' + ((day >= 10) ? day : ('0' + day))
        });
    }
    //获取当月的月数据
    for (let i = 0,j = monthDays; i < j; i++) {
        let day = parseInt(i + 1);
        tmpDate.push({
            label : true,
            val : day,
            nl : calendar.solar2lunar(year,month,i + 1).IDayCn,
            // completeVal : year + '-' + month + '-' + new Date(year , month , (i + 1)).format('dd')
            completeVal : year + '-' + month + '-' + ((day >= 10) ? day : ('0' + day))
        });
    }
    //获取下个月的月数据
    for (let i = 0,j = 42 - beforeMonthLeft - monthDays; i < j; i++) {
        let day = parseInt(i + 1);
        tmpDate.push({
            label : false,
            val : day,
            nl : calendar.solar2lunar(year,month,i + 1).IDayCn,
            // completeVal : year + '-' + parseInt(month + 1) + '-' + new Date(year , (month + 1) , (i + 1)).format('dd')
            completeVal : year + '-' + parseInt(month + 1) + '-' + ((day >= 10) ? day : ('0' + day))
        });
    }
    //将数据整合成一个6 * 7的二维数组
    for (let i = 0,j = tmpDate.length; i < j; i += 7) {
        returnDate.push(tmpDate.slice(i,i + 7));
    }
    return returnDate;
};

/**
 * 获取一个月的天数
 * @param dateInfo
 * @returns {*|Number}
 */
export const getMonthDays = function (dateInfo) {
    let date = dateInfo.split('-');
    //选中的年
    let year = date[0];
    //选中的月
    let month = date[1];
    //选中的月份对应的天数
    return calendar.solarDays(year,month);
};
