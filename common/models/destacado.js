'use strict';

var _ = require('lodash');

module.exports = function(Destacado) {
    
    Destacado.beforeRemote('find', function(ctx, instance, next) {
        console.log('Entró a destacado get membresias');
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "membresia"];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        ctx.args.filter.where = _.merge(ctx.args.filter.where, {});
        ctx.args.filter.order = "entrada DESC"
        next();
    });

};
