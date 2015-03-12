export var Controller = Ember.Controller.extend({
    defaultConf : {defaultText : 'Select date'},

    dateTimeConf : {
        date        : new Date(),
        showTime    : true,
        position    : 'right',

    },

    dateTime12HoursConf : {
        date          : new Date(),
        showTime      : true,
        hours24format : false,
        position      : 'bottom'
    },

    minmaxDateConf : {
        date          : new Date(),
        showTime      : true,
        showSeconds   : true,
        position      : 'bottom right',
        minDate       : new Date('2012-06-12 14:00'),
        maxDate       : new Date('2016-06-12 14:00')
    },

    i18nRuConf : {
        date          : new Date(),
        showTime      : true,
        splitTimeView : true,
        position      : 'bottom',
        firstDay      : 1,
        showWeekNumber : true,
        i18n : {
            previousMonth : 'Предыдущий месяц',
            nextMonth     : 'Следующий месяц',
            months        : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            weekdays      : ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
            weekdaysShort : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
        }
    },

    i18nJpConf : {
        date          : new Date(),
        showTime      : true,
        showSeconds   : true,
        minutesStep   : 5,
        position      : 'bottom right',
        firstDay      : 1,

        i18n : {
            previousMonth : '先月',
            nextMonth     : '来月',
            months        : ['１月','２月','３月','４月','５月','６月','７月','８月','９月','１０月','１１月','１２月'],
            weekdays      : ['日曜日', '月曜日','火曜日',　'水曜日', '木曜日','金曜日','土曜日'],
            weekdaysShort : ['日', '月','火',　'水', '木','金','土']
        }
    },

    months2Conf : {
        date        : new Date('2014-01-01'),
        showTime    : true,
        position    : 'bottom',
        numberOfMonths : 2,
        clearButton : true,
        defaultText : 'No date'
    },

    customConf : {
        date          : new Date(),
        showTime      : true,
        position      : 'right bottom',
        showWeekNumber : true
    },

    loggerConf : {
        date          : new Date(),
        showTime      : true,
        position      : 'bottom'
    },

    inlinePickerConf : {
        date       : new Date(),
        showTime   : true,
        inlineMode : true
    },



    init: function() {
        // console.log('wtf', App.__container__.lookup('component:datetime-picker'))
    },

    logs : [],

    actions : {
        onSelect : function(date) {
            this.get('logs').pushObject('"select" event fired'+date)
        },

        onOpen : function() {
            this.get('logs').pushObject('"open"  event fired');
        },

        onDraw : function() {
            this.get('logs').pushObject('"draw"  event fired');
        },
        onClose : function() {
            this.get('logs').pushObject('"close"  event fired');
        },

    }

});
