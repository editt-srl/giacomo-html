"use strict";
jQuery(document).ready(function ($) {

//for Preloader

    $(window).load(function () {
        $("#loading").fadeOut(500);
    });


    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
    $('#navbar-menu').find('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: (target.offset().top - 70)
                }, 1000);
                if ($('.navbar-toggle').css('display') != 'none') {
                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
                }
                return false;
            }
        }
    });



    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();

// magnificPopup

    $('.popup-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    $('.video-link').magnificPopup({
        type: 'iframe'
    });



// slick slider active Home Page Tow
//    $(".hello_slid").slick({
//        dots: true,
//        infinite: false,
//        slidesToShow: 1,
//        slidesToScroll: 1,
//        arrows: true,
//        prevArrow: "<i class='icon icon-chevron-left nextprevleft'></i>",
//        nextArrow: "<i class='icon icon-chevron-right nextprevright'></i>",
//        autoplay: true,
//        autoplaySpeed: 2000
//    });




//---------------------------------------------
// Scroll Up
//---------------------------------------------

    $('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false
    });





//Team Skillbar active js

    jQuery('.teamskillbar').each(function () {
        jQuery(this).find('.teamskillbar-bar').animate({
            width: jQuery(this).attr('data-percent')
        }, 6000);
    });

    /*===== Call to Action =====*/
    $("#calltoaction").click(function () {
        $('.what').slideToggle();
    });

    /*===== Carousel =====*/
    $('.owl-carousel-landing').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        navigation: true,
        navigationText: ['<div class="prev-collection"><i class="fa fa-chevron-left"></i></div>', '<div class="next-collection"><i class="fa fa-chevron-right"></i></div>'],
        itemsCustom: [[320, 1], [480, 1], [768, 3], [992, 3], [1200, 3], [1600, 3]],
    });

    /*===== Calendar =====*/
    $("#arrivo, #partenza").datepicker({
        "dateFormat": "dd/mm/yy",
        "showAnim": "slideDown",
        "showButtonPanel": false,
        "firstDay": 1,
        "defaultDate": 0,
        "minDate": 0
    });

    $.datepicker.regional['it'] = {
        clearText: 'Svuota', clearStatus: 'Annulla',
        closeText: 'Chiudi', closeStatus: 'Chiudere senza modificare',
        prevText: '&#x3c;Prec', prevStatus: 'Mese precedente',
        prevBigText: '&#x3c;&#x3c;', prevBigStatus: 'Mostra l\'anno precedente',
        nextText: 'Succ&#x3e;', nextStatus: 'Mese successivo',
        nextBigText: '&#x3e;&#x3e;', nextBigStatus: 'Mostra l\'anno successivo',
        currentText: 'Oggi', currentStatus: 'Mese corrente',
        monthNames: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
            'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
        monthNamesShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu',
            'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
        monthStatus: 'Seleziona un altro mese', yearStatus: 'Seleziona un altro anno',
        weekHeader: 'Sm', weekStatus: 'Settimana dell\'anno',
        dayNames: ['Domenica', 'Luned&#236', 'Marted&#236', 'Mercoled&#236', 'Gioved&#236', 'Venerd&#236', 'Sabato'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Me', 'Gio', 'Ve', 'Sa'],
        dayStatus: 'Usa DD come primo giorno della settimana', dateStatus: '\'Seleziona\' D, M d',
        dateFormat: 'dd/mm/yy', firstDay: 1,
        initStatus: 'Scegliere una data', isRTL: false};
    $.datepicker.setDefaults($.datepicker.regional['it']);

    /* Vincolo data secondo caleedario */
    $("#arrivo").change(function () {
        //Aggiungo 7gg alla data selezionata
        var currentDate = $(this).datepicker('getDate');
        currentDate.setDate(currentDate.getDate());
        $("#partenza").datepicker('setDate', currentDate);
        $("#partenza").datepicker("destroy"); //distruggo
        $("#partenza").datepicker({minDate: currentDate, dateFormat: "dd/mm/yy", showButtonPanel: false, "firstDay": 1});//reinizializzo
    });

    /*===== Action bar =====*/
    $(window).scroll(function () {
        clearTimeout($.data(this, 'scrollTimer'));
        var somma = $(".action-bar").height() + 1200;
        if (($(this).scrollTop() >= somma) && ($(window).width() <= 468)) {
            $.data(this, 'scrollTimer', setTimeout(function () {
                $("div.action-bar").hide();
            }, 1));
            $.data(this, 'scrollTimer', setTimeout(function () {
                $("div.action-bar").fadeIn("slow");
            }, 500));
        } else {
            $("div.action-bar").hide();
        }
    });

//End
});



