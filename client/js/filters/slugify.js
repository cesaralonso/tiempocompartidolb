angular.module('app')
  .filter('slugify', function(){
      return function(input){
        if(input!==undefined) {
            var tittles = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç %$";
            var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc-pc";
            for (var i = 0; i < tittles.length; i++) {
                input = input.replace(tittles.charAt(i), original.charAt(i)).toLowerCase();
            };
            return input;
        }
    };
  })