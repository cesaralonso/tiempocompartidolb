'use strict';

var _ = require('lodash');

module.exports = function(Localidad) {
    
    Localidad.beforeRemote('find', function(ctx, instance, next) {
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "paisProcedencia" ];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        ctx.args.filter.where = _.merge(ctx.args.filter.where, { idPais: { exists : true }});
        ctx.args.filter.order = "created DESC"
        next();
    });

    Localidad.findLocalidades = function(paisId, cb) {
        cb(null, paisId);
    };

    Localidad.remoteMethod('findLocalidades', {
        accepts: {arg: 'paisId', type: 'string'},
        returns: {arg: 'localidades', type: 'object'},
        http:    {path: '/findLocalidades/:paisId', verb: 'get'}
    });

    Localidad.afterRemote('findLocalidades', function(ctx, instance, next) {
        var paisId = ctx.args.paisId;
        console.log(paisId);
        Localidad.find({ where: { idPais: {like : paisId} }}, function(error, localidades) {
            if (error)  
                return next(error);
            ctx.result = localidades;
            next();
        })
    });

};
