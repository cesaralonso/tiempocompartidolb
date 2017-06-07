'use strict';

module.exports = function(Person) {
    Person.beforeRemote('*.__create__messages', function(ctx, instance, next) {
       var body = ctx.args.data;
       var now = new Date();
       var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
       body.created = now_utc;
       console.log(body)
       next(); 
    });

    Person.beforeRemote('*.__create__favoritos', function(ctx, instance, next) {
       var body = ctx.args.data;
       var now = new Date();
       var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
       body.created = now_utc;
       console.log(body)
       next(); 
    });

    Person.beforeRemote('*.__findById__membresias', function(ctx, instance, next) {
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "creador", "disponibilidades", "amenidades", "paisOrigen", "estadoOrigen", "localidadOrigen", "afiliaciones", "destacado", "imagenes", "ubicacion"  ];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        ctx.args.filter.where = _.merge(ctx.args.filter.where, { idPerson: { exists : true }});
        ctx.args.filter.order = "created DESC"
        next();
    });

    Person.beforeRemote('*.__find__membresias', function(ctx, instance, next) {
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "creador", "disponibilidades", "amenidades", "paisOrigen", "estadoOrigen", "localidadOrigen", "afiliaciones", "destacado", "imagenes", "ubicacion" ];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        ctx.args.filter.where = _.merge(ctx.args.filter.where, { idPerson: { exists : true }});
        ctx.args.filter.order = "created DESC"
        next();
    });
    
    Person.whoami = function(callback) {
        callback();
    }
    
    function getAuthenticationError() {
      var error = new Error();
      error.statusCode = 401;
      error.message = 'Authorization Required';
      error.code = 'AUTHORIZATION_REQUIRED';
      return error;        
    }
    
    Person.afterRemote('whoami', function(context, model, next) {
        var userId = context.req.accessToken.userId;
        if (!userId) {
            return next(getAuthenticationError());
        }
        Person.findOne({ where: { id: userId}}, function(error, user) {
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
    
    Person.disableRemoteMethod('__create__accessTokens', false);
    Person.disableRemoteMethod('__delete__accessTokens', false);
    Person.disableRemoteMethod('__destroyById__accessTokens', false);
    Person.disableRemoteMethod('__updateById__accessTokens', false);
    Person.disableRemoteMethod('__count__accessTokens', false);
    Person.disableRemoteMethod('__findById__accessTokens', false);
    Person.disableRemoteMethod('__get__accessTokens', false);
    Person.disableRemoteMethod('createChangeStream', true);
};
