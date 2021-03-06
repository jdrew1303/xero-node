var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    TrackingCategory = require('../entities/trackingcategory'),
    TrackingOption = require('../entities/trackingoption.js'),
    p = require('../misc/promise'),
    util = require('util')

var TrackingCategories = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, _.extend({ entityName: 'TrackingCategory', entityPlural: 'TrackingCategories' }, options));
    },
    newTrackingCategory: function(data, options) {
        return new TrackingCategory(this.application, data, options)
    },
    newTrackingOption: function(data, options) {
        return new TrackingOption(this.application, data, options)
    },
    getTrackingCategory: function(id, where, order, includeArchived) {
        return this.getTrackingCategories({ id: id, other: { includeArchived: includeArchived }, where: where, order: order })
            .then(function(trackingCategories) {
                return _.first(trackingCategories);
            })
    },
    getTrackingCategories: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'TrackingCategories.TrackingCategory';
        clonedOptions.entityConstructor = function(data) { return self.newTrackingCategory(data) };
        return this.getEntities(clonedOptions);
    },
    deleteTrackingCategory: function(id) {
        var options = {
            id: id
        };
        return this.deleteEntities(options);
    }
})

module.exports = TrackingCategories;