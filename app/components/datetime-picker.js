export default Ember.Component.extend({
    layout : Ember.Handlebars.compile('{{input type="text"}}'),

    classNames : ['datetime-picker'],

    date : null,

    attributeBindings : ['date', 'minDate', 'maxDate'],

    // the default output format for `.toString()` and `field` value
    format: 'YYYY-MM-DD',

    // the initial date to view when first opened
    defaultDate: null,

    // make the `defaultDate` the initial selected value
    setDefaultDate: true,

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
    mainCalendar: 'left',

    // i18n : {},

    didInsertElement : function() {
        var self = this,
            elem = this.$(),
            input = elem.find('input'),
            conf = ['date',
                'format', 'firstDay', 'minDate', 'maxDate', 'yearRange',
                'showWeekNumber', 'yearSuffix', 'numberOfMonths', 'showTime',
                'showSeconds', 'hours24format', 'minutesStep', 'secondsStep', 'mainCalendar'],
            i    = conf.length,
            opts = {
                field          : input[0],
                container      : elem[0],
                setDefaultDate : true
            },
            i18n = this.get('i18n'),
            position = this.getWithDefault('position', ''),
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
        console.log('i18n', i18n)
        opts.defaultDate = opts.date;
        // console.log(opts)
        opts.onSelect = function(date) {
            self.set('date', date);
            self.sendAction('onSelect', date);
        }
        opts.onOpen = function() {
            self.sendAction('onOpen');
        },
        opts.onClose = function() {
            self.sendAction('onClose');
        }
        opts.onDraw = function() {
            self.sendAction('onDraw');
        }

        this._picker = new Pikaday(opts);

        input.val(this._picker.toString())

        // console.log(position);
        elem.addClass('picker-pos-' + (position.indexOf('right') !== -1 ? 'right' : 'left'))
            .addClass('picker-pos-' + (position.indexOf('bottom') !== -1 ? 'bottom' : 'top'));


    },

    willDestroyElement : function() {
        this._picker.destroy();
    },

    _minDateDidChange : function() {
        this._picker.setMinDate(this.get('minDate'));
    }.observes('minDate'),

    _maxDateDidChange : function() {
        this._picker.setMaxDate(this.get('maxDate'));
    }.observes('maxDate'),


});
