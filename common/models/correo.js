'use strict';
var _ = require('lodash');

module.exports = function(Correo) {
    Correo.beforeRemote('find', function(ctx, instance, next) {
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "destinatario","remitente", "membresia" ];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        next();
    });

    Correo.beforeRemote('create', function(ctx, instance, next) {
        var body = ctx.args.data;
        var now = new Date();
        var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
        body.fechaHora = now_utc;
        next();
    })
};
