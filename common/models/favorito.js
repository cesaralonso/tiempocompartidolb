'use strict';

var _ = require('lodash');

module.exports = function(Favorito) {
    Favorito.beforeRemote('create', function(ctx, instance, next) {
       var body = ctx.args.data;
       var now = new Date();
       var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
       body.created = now_utc;
       console.log(body)
       next(); 
    });


    Favorito.beforeRemote('find', function(ctx, instance, next) {
        console.log("__find__favoritos Favorito ctx ", ctx.args.filter);
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "membresia", "persona"];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        ctx.args.filter.where = _.merge(ctx.args.filter.where, { idMembresia: { exists : true }});
        ctx.args.filter.order = "created DESC"
        next();
    });

    Favorito.deleteFavorito = function(callback) {
        callback();
    }
    
    Favorito.afterRemote('deleteFavorito', function(context, model, next) {
        var userId = context.req.idMembresia;
        if (!userId) {
            return next(getAuthenticationError());
        }
        // Falta saber como obtener el idPerson que se esta mandando por la URL
        Favorito.delete({ where: { idPerson: idperson, idMembresia: idMembresia}}, function(error, user) {
            if (error) {
                return next(error);
            }
            if (!user) {
                return next(getAuthenticationError());
            }
            context.result = user;
            next();
        })
    });




};
