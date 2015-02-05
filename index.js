
Ember.onLoad('Ember.Application', function(Application) {
    var Picker = require('ember-datetimepicker/components/datetime-picker');

    // Application.DatetimePickerComponent = Picker.default;

    Application.initializer({
        name : 'datetime-picker',
        initialize : function(container, application) {
            application.register('component:datetime-picker', Picker.default);
        }
    });
    // var initializer = require("ember-dialog/initializers/dialog-manager")['default'];
    // Application.initializer(initializer);
});
