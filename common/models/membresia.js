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

        
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "creador", "disponibilidades", "amenidades", "paisOrigen", "estadoOrigen", "localidadOrigen", "afiliaciones", "destacado", "imagenes", "ubicacion", "messages" ];
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        // ctx.args.filter.where = _.merge(ctx.args.filter.where, { idPerson: { exists : true }});
        ctx.args.filter.order = "created DESC"

        next();
    });
    
    Membresia.afterRemote('findTipoInmueble', function(context, model, next) {
        var inmueble = context.args.tipoInmueble;
        Membresia.find({ where: {  tipoInmueble: inmueble }}, function(error, membresias) {
            if (error)  
                return next(error);
            context.result = membresias;
            next();
        })
    });

    Membresia.busqueda = function(pais, ciudad, rentaventa, huespedes, cb) {
        cb(null, pais, ciudad, rentaventa, huespedes);
    };

    Membresia.remoteMethod('busqueda', {
        accepts: [
            {arg: 'pais', type: 'string'},
            {arg: 'ciudad', type: 'string'},
            {arg: 'rentaventa', type: 'string'},
            {arg: 'huespedes', type: 'number'},
        ],        
        returns: {arg: 'membresias', type: 'object'},
        http:    {path: '/busqueda/:pais/:ciudad/:rentaventa/:huespedes', verb: 'get'}
    });

    Membresia.beforeRemote('busqueda', function(ctx, instance, next) {
        if (!ctx.args.filter) {
            ctx.args.filter = {};
        }
        ctx.args.filter.include = [ "creador" ];
        
        if (!ctx.args.filter.where) {
            ctx.args.filter.where = {};
        }
        ctx.args.filter.where = _.merge(ctx.args.filter.where, { idPerson: { exists: true} });
        // ctx.args.filter.order = "created DESC"
        next();
    });

    Membresia.afterRemote('busqueda', function(ctx, instance, next) {
        var pais = ctx.args.pais;
        var ciudad = ctx.args.ciudad;
        var rentaventa = ctx.args.rentaventa;
        var huespedes = ctx.args.huespedes;

        var ventaVal = (rentaventa == 'VENTA') ? true : false;
        var rentaVal = (rentaventa == 'RENTA') ? true : false;

        Membresia.find({ where: { 
            and:[ 
                { localidadNombre: { like: ciudad } }, 
                { venta: ventaVal }, 
                { renta: rentaVal }, 
                { localidadNombre: { like: ciudad } },
                { maxOcupantes: { gte: huespedes } },
            ]}
        }, function(error, membresias) {
            if (error)  
                return next(error);
            ctx.result = membresias;
            next();
        })
    });


};
