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
        "minDate": 0,
        onClose: function () {
            $("#partenza").datepicker("show");
        }
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

    /* Vincolo data secondo caleedario con 7 giorni di selezione in più*/
    $("#arrivo").change(function () {
        //Aggiungo 7gg alla data selezionata
        var currentDate = $(this).datepicker('getDate');
        currentDate.setDate(currentDate.getDate());

        var date2 = $('#arrivo').datepicker('getDate', '+7d');
        date2.setDate(date2.getDate() + 7);
        $('#partenza').datepicker('setDate', date2);

        $("#partenza").datepicker("destroy"); //distruggo
        $("#partenza").datepicker({minDate: currentDate, dateFormat: "dd/mm/yy", showButtonPanel: false, firstDay: 1});//reinizializzo
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

    $('.tabbing').mTab({
        navigation: ".tabNav",
        container: ".tabContainer",
        activeTab: 1,
        activeClass: "active",
        scrollOffset: true,
        accordScreen: 768,
        toggleClose: true,
        animation: false,
        openWithUrl: true,
        callbackonclick: function () {
        },
        callback: function () {
        }
    });

    /*===== Form cons =====*/
    $(document).on("focus", "#dove-andare", function () {
        $("#form-when").slideDown('slow');
    });
    $(document).on("change", "#arrivo", function () {
        $("#form-who").slideDown('slow');
    });
    $(document).on("change", "#ncamere", function () {
        if ($("#ncamere").val() > 0) {
            $("#form-user").slideDown('slow');
        }
    });

    /* SISTEMAZIONI */

    $("#ncamere").on('change', function () {

        $("div.sistemazione-cont").empty();
        var camereadd = $(this).val();

        if (camereadd < 1) {
            $("div.sistemazione-cont").empty();
        } else {
            for (var i = 0; i < camereadd; i++) {
                $("div.sistemazione-cont").append('<fieldset class="sistemazione-inner"> <legend>Sistemazione ' + (i + 1) + ':</legend> <div class="row"> <div class="col-md-6 col-sm-6 col-xs-12"> <div class="form-group"> <label class="sr-only" for="form-first-adulti">* Numero adulti..</label> <select class="form-control rounded-sx rounded-dx" id="nadulti' + (i + 1) + '" required> <option value="x" disabled selected hidden>N. Adulti</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> </select> </div></div><div class="col-md-6 col-sm-6 col-xs-12"> <div class="form-group"> <label class="sr-only" for="form-last-bambini">* Numero bambini..</label> <select class="form-control rounded-sx rounded-dx nbambini-change" id="nbambini' + (i + 1) + '"> <option value="x" disabled selected hidden>N. Bambini</option> <option value="0">0</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> </select> </div></div></div><div class="row bimbishow"> <div class="eta-bambini-box eta' + (i + 1) + ' col-md-12 col-sm-12 col-xs-12"></div></div></fieldset>');
            }
        }
    });

    /* Modulo Sezione bambini EventListener */

    $(document).on('change', 'select.nbambini-change', function () {

        var selected = $(this);
        var selectedval = selected.val();

        selected.closest("fieldset").find("div.eta-bambini-box").empty();

        if (selectedval >= 1) {
            selected.closest("fieldset").find("div.eta-bambini-box").append('<div class="small-text">Seleziona l\'età  dei bambini.</div>');
            for (var i = 0; i < selectedval; i++) {
                selected.closest("fieldset").find("div.eta-bambini-box").append('<select class="eta-bamb"><option value="0">0</option><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option></select>');
            }
            selected.closest("fieldset").find("div.bimbishow").slideDown("slow");
        } else {
            selected.closest("fieldset").find("div.bimbishow").slideUp("slow");
            selected.closest("fieldset").find("div.eta-bambini-box").empty();
        }
    });

//End
});



