'use strict';

var _ = require('lodash');
var config = require('../../server/config.json');

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


    Person.beforeRemote('*.__findOne__membresias', function(ctx, instance, next) {
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

    Person.beforeRemote('*.__get__membresias', function(ctx, instance, next) {
        console.log('Entró');
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "creador", "disponibilidades", "amenidades", "paisOrigen", "estadoOrigen", "localidadOrigen", "afiliaciones", "destacado", "imagenes", "ubicacion", "messages" ];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        ctx.args.filter.where = _.merge(ctx.args.filter.where, { idPerson: { exists : true }});
        ctx.args.filter.order = "created DESC"
        next();
    });

    Person.beforeRemote('*.__get__favoritos', function(ctx, instance, next) {
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "membresia" ];
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

    Person.verifyEmail = function(id, cb) {
        cb(null, id);
    };

    Person.remoteMethod('verifyEmail', {
        accepts: { arg: 'id', type: 'string' },        
        returns: { arg: 'reponse', type: 'object' },
        http:    { path: '/verifyEmail/:id', verb: 'post' }
    });

    Person.afterRemote('verifyEmail', function(context, person, next) {
        var personId = context.req.params.id;
        if (!personId) {
            return next(emailNotVerifiedError());
        }

        Person.findById(personId, function(error, person) {
            if (error) 
                return next(error);
            if (!person) 
                return next(emailNotVerifiedError());
            
            // Sets emailVerified as true
            person.emailVerified = true;
            Person.replaceById(person.id, person, function(err, person) {
                if(err) 
                    return next(err);

                context.result = person;
                next();
            });
        });
    });

    function emailNotVerifiedError() {
        var error = new Error();
        error.statusCode = 401;
        error.message = 'Email has not been verified correctly';
        error.code = 'VERIFY_AUTHENTICATION';
        return error; 
    }

    // Sends the email to reset password
    Person.on('resetPasswordRequest', function(info) {
        var url = 'http://' + config.host_laravel + ':' + config.port_laravel + '/reset-password/';
        var html = 'Click <a href="' + url +
            info.accessToken.id + '">here</a> to reset your password';

        console.log(url);
        console.log(html);

        Person.app.models.Email.send({
          to: info.email,
          from: info.email,
          subject: 'Password reset',
          html: html
        }, function(err) {
          if (err) return console.log(err);
          console.log('> sending password reset email to:', info.email);
        });
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
