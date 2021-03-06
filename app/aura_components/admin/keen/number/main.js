/**
 *
 *
 */

Hull.component({

  type: 'Hull',

  require:["//dc8na2hxrj29i.cloudfront.net/code/keen-2.1.0-min.js"],

  templates: ['main'],

  options:{
    eventCollection:'testing',
    analysisType:'sum',
    targetProperty:'value',
    timeFrame: 'this_week',
    interval: 'daily',
    timezone:'3600'
  },

  initialize: function(){
  },

  beforeRender: function(data){
  },

  afterRender: function(data){
    var self = this;
    var _ = this.sandbox.util._;
    var filters = {
      analysisType: data.options.analysisType,
      targetProperty: data.options.targetProperty
    };
    if (data.options.filter) {
      var splitFilter = data.options.filter.split(' ');
      var reduced = _.reduce(_.pluck(splitFilter, 'length'), function (a, b) {
        return a && b;
      });
      if (reduced) {
        filters.filters = [{
          property_name: splitFilter[0],
          operator: splitFilter[1],
          property_value: splitFilter[2]
        }];
      }
    }
    Keen.onChartsReady(function() {
      var metric = new Keen.Metric(data.options.eventCollection, filters);
      var conf = {};
      if (data.options.label) {
        conf.label = data.options.label;
      }
      metric.draw(self.$el[0], conf);
    });
  },

  actions: {
  }

});
