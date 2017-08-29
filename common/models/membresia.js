'use strict';

var _ = require('lodash');

module.exports = function(Membresia) {
    Membresia.beforeRemote('create', function(ctx, instance, next) {
       var body = ctx.args.data;

       console.log("body", body);

       var now = new Date();
       var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());

       function slugify(input){
            if(input!==undefined) {
                var tittles = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç %$!¡?¿";
                var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc-";
                for (var i = 0; i < tittles.length; i++) {
                    input = input.replace(tittles.charAt(i), original.charAt(i)).toLowerCase();
                };
                return input;
            }
       }

       var renta = (body.renta) ? 'renta': '';
       var venta = (body.venta) ? 'venta': '';
       var renta_venta = (body.renta) ? 'renta' : '';
       var renta_venta = (renta_venta === 'renta' && body.venta) ? 'renta-y-venta' : 'venta';

       var localidadNombre = slugify(body.localidadNombre);
       var paisNombre = slugify(body.paisNombre);
       var clubNombre = slugify(body.clubNombre);

       var enlace_url = "tiempo-compartido-en-" + renta_venta + "-en-" + clubNombre + "-" + localidadNombre + "-" + paisNombre;
       var enlace_des = "Tiempo compartido en " + renta + " " + venta + " en " + clubNombre + " " + localidadNombre + ", " + paisNombre;

       body.enlace_url = enlace_url;
       body.enlace_des = enlace_des;
       body.created = now_utc;
       next(); 
    });

    Membresia.beforeRemote('update', function(ctx, instance, next) {
       var body = ctx.args.data;
       var now = new Date();
       var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
       body.updated = now_utc;
       next(); 
    });

    Membresia.beforeRemote('find', function(ctx, instance, next) {
        console.log("instance find", instance);

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

    Membresia.beforeRemote('findOne', function(ctx, instance, next) {
        console.log("instance findOne", instance);

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

    Membresia.beforeRemote('findById', function(ctx, instance, next) {
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

    Membresia.findTipoInmueble = function(tipoInmueble, callback) {
        callback(null, tipoInmueble);
    }
    
    Membresia.beforeRemote('findTipoInmueble', function(ctx, instance, next) {
        console.log(ctx);
        console.log(instance);
        
        if (!ctx.args.filter) {
            ctx.args.filter = {};
            console.log('1.5');
        }
        ctx.args.filter.include = [ "creador", "disponibilidades", "amenidades", "paisOrigen", "estadoOrigen", "localidadOrigen", "afiliaciones", "destacado", "imagenes", "ubicacion", "messages" ];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        // ctx.args.filter.where = _.merge(ctx.args.filter.where, { idPerson: { exists : true }});
        ctx.args.filter.order = "created DESC"

        console.log(2);
        next();
    });
    
    Membresia.afterRemote('findTipoInmueble', function(context, model, next) {
        var inmueble = context.args.tipoInmueble;
        console.log(inmueble);
        Membresia.find({ where: {  tipoInmueble: inmueble }}, function(error, membresias) {
            if (error)  
                return next(error);
            context.result = membresias;
            next();
        })
    });


};
