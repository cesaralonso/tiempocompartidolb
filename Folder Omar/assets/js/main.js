$(function(){
    $("#txt__StartDateVacations").datepicker();
    $("#txt__EndDateVacations").datepicker();
    $('.owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        dots: false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    })
    $(".modal-signin").on('click', openModal)
});

function openModal(e){
    e.preventDefault();
    $("#modal-launcher").load('views/modal-signin.html', function(){
        $("#modal-signin").modal({
            show : true,
            backdrop: 'static',
            keyboard: false
        })
    })
}