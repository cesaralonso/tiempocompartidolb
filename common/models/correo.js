'use strict';
var _ = require('lodash');

module.exports = function(Correo) {
    Correo.beforeRemote('find', function(ctx, instance, next) {
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "destinatario","remitente" ];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        // ctx.args.filter.where = _.merge(ctx.args.filter.where, { destinatarioId: { exists : true }});
        // ctx.args.filter.order = "created DESC"
        next();
    });
};
