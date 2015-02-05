export default Ember.Component.extend({
    layout : Ember.Handlebars.compile('<div>{{input type="text" value=defaultDate}}</div>'),

    attributeBindings : ['minDate', 'maxDate'],

    bound: undefined,

    // position of the datepicker, relative to the field (default to bottom & left)
    // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
    position: 'bottom left',

    // automatically fit in the viewport even if it means repositioning from the position option
    reposition: true,

    // the default output format for `.toString()` and `field` value
    format: 'YYYY-MM-DD',

    // the initial date to view when first opened
    defaultDate: null,

    // make the `defaultDate` the initial selected value
    setDefaultDate: false,

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
            opts = this.getProperties(['defaultDate', 'setDefaultDate', 'bound', 'position', 'reposition', 'format',
                'firstDay', 'minDate', 'maxDate', 'yearRange', 'showWeekNumber', 'yearSuffix', 'numberOfMonths',
                'showTime', 'showSeconds', 'hours24format', 'minutesStep', 'secondsStep', 'mainCalendar']),
            i18n = this.get('i18n');

        this._super();

        console.log(typeof i18n)

        if (typeof i18n === 'object') {
            opts.i18n = i18n;
        }

        opts.field = this.$().find('input')[0]

        console.log(opts)

        this._picker = new Pikaday(opts);
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
