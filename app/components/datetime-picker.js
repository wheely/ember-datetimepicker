var Picker =

Ember.DatetimepickerComponent = Ember.Component.extend({
    layout : Ember.Handlebars.compile('{{input type="text"}}<i {{action "clear"}}></i>'),

    classNames : ['datetime-picker'],

    classNameBindings : ['clearButton:datetime-picker-clear-allowed'],


    attributeBindings : ['date', 'minDate', 'maxDate'],

    // the default output format for `.toString()` and `field` value
    format: 'YYYY-MM-DD',

    // the initial date to view when first opened
    defaultDate: null,

    // make the `defaultDate` the initial selected value
    setDefaultDate: true,

    defaultText : '',

    // first day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,

    // the minimum/earliest date that can be selected
    minDate: null,
    // the maximum/latest date that can be selected
    maxDate: null,

    // number of years either side, or array of upper/lower range
    yearRange: 10,

    // show week numbers at head of row
    showWeekNumber: false,

    isRTL: false,

    // Additional text to append to the year in the calendar title
    yearSuffix: '',

    // Render the month after year in the calendar title
    showMonthAfterYear: false,

    // how many months are visible
    numberOfMonths: 1,

    //time
    showTime      : false,
    showSeconds   : false,
    hours24format : true,
    minutesStep   : 1,
    secondsStep   : 1,

    // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
    // only used for the first display or when a selected date is not visible
    // in ember datetime-picker `left` means `top` and `right` means `bottom`
    // maybe I'll fix it some day :)
    mainCalendar: 'left',

    cleanButton : false,

    didInsertElement : function() {
        var self = this,
            elem = this.$(),
            input = elem.find('input'),
            ignoreContainer = this.get('ignoreContainer'),
            conf = ['date', 'defaultText',
                'format', 'firstDay', 'minDate', 'maxDate', 'yearRange',
                'showWeekNumber', 'yearSuffix', 'numberOfMonths', 'showTime', 'splitTimeView',
                'showSeconds', 'hours24format', 'minutesStep', 'secondsStep', 'mainCalendar'],
            i    = conf.length,
            opts = {
                field          : input[0],
                container      : ignoreContainer ? void 0 : elem[0],
                setDefaultDate : true
            },
            i18n = this.get('i18n'),
            position = this.getWithDefault('position', ''),
            inputClass = this.get('inputClass'),
            name, value;

        this._super();

        while (i--) {
            name = conf[i];
            value = this.get(name);
            if (value !== void 0) {
                opts[name] = value;
            }
        }

        if (typeof i18n === 'object' && i18n.months && i18n.weekdays && i18n.weekdaysShort) {
            opts.i18n = i18n;
        }

        opts.defaultDate = opts.date;

        opts.onSelect = function(date) {
            self.set('date', date)._onSelect();
            self.sendAction('onSelect', date);
        }
        opts.onOpen = function() {
            self._onSelect();
            self.sendAction('onOpen')
        },
        opts.onClose = function() {
            self._onSelect();
            self.sendAction('onClose');
        }
        opts.onDraw = function() {
            self.sendAction('onDraw');
            self._onDraw(this);
        }

        this._picker = new Pikaday(opts);

        if (inputClass) {
            this.$().find('input').addClass(inputClass);
        }

        elem.addClass('picker-pos-' + (position.indexOf('right') !== -1 ? 'right' : 'left'))
            .addClass('picker-pos-' + (position.indexOf('bottom') !== -1 ? 'bottom' : 'top'));

        if (ignoreContainer) {
            this._resize = this._resize.bind(this);
            $(window).on('resize', this._resize);
        }

    },



    willDestroyElement : function() {
        this._picker.destroy();
        $(window).off('resize', this._resize);
    },

    actions : {
        clear : function() {
            this.set('date', null);
            this._picker.setDate(null);
        }
    },

    isDate : function(obj) {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    },

    _dateDidChange : function() {
        var date       = this.get('date'),
            pickerDate = this._picker.getDate();

        if (this.isDate(date) && this.isDate(pickerDate) && date.getTime() === pickerDate.getTime()) {
            return;
        }
        this._picker.setDate(date, true);
    }.observes('date'),

    _minDateDidChange : function() {
        this._picker.setMinDate(this.get('minDate'));
    }.observes('minDate'),

    _maxDateDidChange : function() {
        this._picker.setMaxDate(this.get('maxDate'));
    }.observes('maxDate'),

    _onSelect : function() {

    },

    _onOpen : function() {

    },

    _onClose : function() {

    },

    _onDraw : function() {

    },

    _resize : function() {
        if (this._picker) {
            this._picker.adjustPosition();
        }
    }

});


Ember.onLoad('Ember.Application', function(Application) {
    Application.initializer({
        name : 'datetime-picker',
        initialize : function(container, application) {
            application.register('component:datetime-picker', Picker);
        }
    });
});

export default Picker;

