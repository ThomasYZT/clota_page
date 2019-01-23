import setLang from 'iview/src/locale/lang';

const lang = {
    i : {
        locale : 'en-US',
        select : {
            placeholder : 'select',
            noMatch : 'no matching data',
            loading : 'loading'
        },
        table : {
            noDataText : 'no data',
            noFilteredDataText : 'no filter data',
            confirmFilter : 'confirm',
            resetFilter : 'reset',
            clearFilter : 'all'
        },
        datepicker : {
            selectDate : 'select date',
            selectTime : 'select time',
            startTime : 'start time',
            endTime : 'end time',
            clear : 'clear',
            ok : 'ok',
            datePanelLabel : '[mmmm] [yyyy]',
            month : 'month',
            month1 : 'january',
            month2 : 'february',
            month3 : 'march',
            month4 : 'april',
            month5 : 'may',
            month6 : 'june',
            month7 : 'july',
            month8 : 'august',
            month9 : 'september',
            month10 : 'october',
            month11 : 'november',
            month12 : 'december',
            year : 'year',
            weekStartDay : '0',
            weeks : {
                sun : 'sun',
                mon : 'mon',
                tue : 'tue',
                wed : 'wed',
                thu : 'thu',
                fri : 'fri',
                sat : 'sat'
            },
            months : {
                m1 : 'jan',
                m2 : 'feb',
                m3 : 'mar',
                m4 : 'apr',
                m5 : 'may',
                m6 : 'jun',
                m7 : 'jul',
                m8 : 'aug',
                m9 : 'sep',
                m10 : 'oct',
                m11 : 'nov',
                m12 : 'dec'
            }
        },
        transfer : {
            titles : {
                source : 'source',
                target : 'target'
            },
            filterPlaceholder : 'search here',
            notFoundText : 'not found'
        },
        modal : {
            okText : 'ok',
            cancelText : 'cancel'
        },
        poptip : {
            okText : 'ok',
            cancelText : 'cancel'
        },
        page : {
            prev : 'previous page',
            next : 'next page',
            total : 'total',
            item : 'item',
            items : 'items',
            prev5 : 'previous 5 pages',
            next5 : 'next 5 pages',
            page : '/page',
            goto : 'goto',
            p : ''
        },
        rate : {
            star : 'star',
            stars : 'stars'
        },
        tree : {
            emptyText : 'no data'
        }
    }
};

setLang(lang);

export default lang;
