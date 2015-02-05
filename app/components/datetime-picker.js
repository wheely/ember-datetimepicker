export default Ember.Component.extend({
    layout : Ember.Handlebars.compile('<div>{{input type="text" value=defaultDate}}</div>'),

    attributeBindings : [],

    didInsertElement : function() {
        var self = this;

        this._super();



        self._input = this.$().find('input')

        console.log(this._input)

        this._picker = new Pikaday({
            field : this.$().find('input')[0]
        })
    },

    willDestroyElement : function() {

    }
});
