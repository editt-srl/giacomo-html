(function ($) {
    "use strict";
    /*==============================
     Is mobile
     ==============================*/
    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }
    $(document).ready(function () {


        var WindowWidth = $(window).width();

        Placeholder();

        BarsMenu();

        MenuResize();

        DropDown();

        SelectTag();

        FocusBlurInput();

        Calendar();

        OwlMagazine();

        PriceSlider();

        TimeSlider();

        DetailSlide();

        ScrollTable();

        CalendarChart();

        MemberReview();

        PostSlide();

        PageSlide();

        SelectTable();

        GoogleMapHotel();

        HotelLocationMap();

        GoogleMapContact();

        ajaxContactForm();

        PopupRoom();

        $(window).load(function (event) {
            $('#preloader').fadeOut(1000);
            MenuResponsive();
            HeaderScroll();
            BannerSlide();
            BannerVideoBackground();
            MenuArrow();
            SubMenuClick();
            parallaxInit();
        });

        $(window).resize(function (event) {
            MenuResponsive();
            MenuResize();
        });

        $(window).scroll(function (event) {
            HeaderScroll();
            ScrollSiderBar();
        });

        $(window).on('load resize', function () {
            var windowHeight = $(window).height();
            $('.page-not-found, .page-comingsoon').css('min-height', windowHeight);


            var menuType = $('.navigation').data('menu-type'),
                    windowWidth = window.innerWidth,
                    windown_top = $(window).scrollTop();
            if (windowWidth < menuType && windown_top < 100) {
                $('.header')
                        .css('background-color', 'transparent')
                        .find('.logo')
                        .css({
                            'opacity': '0',
                            'visibility': 'hidden'
                        });
            }
        });

        /*===== Bars Click Menu =====*/
        function BarsMenu() {
            $('#bars').on('click', function () {
                if ($('.navigation').hasClass('nav-active') == false) {
                    $('.navigation').addClass('nav-active');
                }
                $('body').css({
                    'overflow': 'hidden'
                });
                return false;
            });

            $('#bars-close').on('click', function () {
                if ($('.navigation').hasClass('nav-active')) {
                    $('.navigation').removeClass('nav-active');
                }
                $('body').css({
                    'overflow': 'visible'
                });
                return false;
            });
            $('.nav-l')
                    .closest('body')
                    .find('.bars')
                    .css({
                        'left': '15px',
                        'right': 'auto'
                    });
            $('.nav-l')
                    .closest('body')
                    .find('#header .logo')
                    .css('margin-left', '50px');
        }

        /*===== Placeholder =====*/
        function Placeholder() {
            var $ph = $('input[type="search"], input[type="text"], input[type="url"], input[type="number"], input[type="email"], textarea');
            $ph.each(function () {
                var value = $(this).val();
                $(this).focus(function () {
                    if ($(this).val() === value) {
                        $(this).val('');
                    }
                });
                $(this).blur(function () {
                    if ($(this).val() === '') {
                        $(this).val(value);
                    }
                });
            });
        }

        /*===== Menu Arrow =====*/
        function MenuArrow() {

            $('#menu > li').each(function () {
                if ($(this).find('> ul').length) {

                    $(this).append('<span><i class="fa fa-angle-down"></i></span>');

                    $(this).find('li').each(function () {

                        if ($(this).find('ul').length) {

                            $(this).append('<span><i class="fa fa-angle-right"></i></span>');

                        }
                    });
                }
            });

            $('.navigation ul li').each(function () {
                if ($(this).find('ul').length) {
                    $(this).addClass('menu-parent');
                }
            });

        }

        function MenuResponsive() {
            var menuType = $('.navigation').data('menu-type'),
                    windowWidth = window.innerWidth,
                    _Navigation = $('.navigation'),
                    _Header = $('.header');
            if (windowWidth < menuType) {
                _Navigation
                        .addClass('nav')
                        .removeClass('nav-desktop')
                        .closest('.header');
                _Header.next().css('margin-top', 0);
                $('.bars, .bars-close, .logo-banner').show();

                $('.navigation .sub-menu').each(function () {
                    $(this)
                            .removeClass('left right');
                });
            } else {
                _Navigation
                        .removeClass('nav')
                        .addClass('nav-desktop')
                        .closest('.header');
                _Header
                        .css('background-color', '#fff')
                        .find('.logo')
                        .css({
                            'opacity': '1',
                            'visibility': 'visible'
                        });
                _Header.next().css('margin-top', $('.header').height());
                $('.bars, .bars-close, .logo-banner').hide();

                $('.navigation .sub-menu').each(function () {
                    var offsetLeft = $(this).offset().left,
                            width = $(this).width(),
                            offsetRight = (WindowWidth - (offsetLeft + width));
                    if (offsetRight < 60) {
                        $(this)
                                .removeClass('left')
                                .addClass('right');
                    } else {
                        $(this)
                                .removeClass('right');
                    }
                    if (offsetLeft < 60) {
                        $(this)
                                .removeClass('right')
                                .addClass('left');
                    } else {
                        $(this)
                                .removeClass('left');
                    }
                });
            }
        }

        /*===== ResizeMenu =====*/
        function MenuResize() {

            var $menu = $('#menu'),
                    value = parseInt($menu.attr('data-responsive'), 10),
                    resize_w = WindowWidth,
                    $header = $('.header');

            if ($menu.length) {

                if (value > 0) {

                    if (value >= resize_w) {

                        if ($header.length && $header.hasClass('header-responsive') == false) {
                            $header.addClass('header-responsive');
                        }

                    } else {

                        if ($header.length && $header.hasClass('header-responsive') == true) {
                            $('.header').removeClass('header-responsive');
                        }

                        $('.menu-active').removeClass('menu-active');
                    }
                } else {
                    alert('false');
                }
            }
        }

        /*===== Sub Menu Click =====*/
        function SubMenuClick() {
            $('.navigation.nav .menu-parent').on('click', ' > a', function () {
                var $this = $(this);
                if ($this.parent().hasClass('active') == false) {
                    $this.parent('li').addClass('active');
                    $this.parent().find('>ul').slideDown();
                } else {
                    $this.parent('li').removeClass('active');
                    $this.parent('li').find('>ul').slideUp();
                }
                return false;
            });
        }

        /*===== DropDown =====*/
        function DropDown() {
            var _dropdown = $('.dropdown-cn');
            _dropdown.each(function (index, value) {
                var $this = $(this);
                var text = $this.find('.current > a').text();
                $this.find('.dropdown-head').prepend(text);
            });

            _dropdown.on('click', function (event) {
                $(this).toggleClass('open');
                event.stopPropagation();
            });

            $(document).click(function () {
                _dropdown.removeClass('open');
            });
        }

        /*===== Tag Select =====*/
        function SelectTag() {
            $('.select select').change(function () {
                var $this = $(this),
                        $span = $this.parent('.select').find('span'),
                        textchange = $this.find('option:selected').text();

                $span.text(textchange);
            })

        }

        /*===== Link offerte =====*/
        if ($('.offer-link').length) {
            if ($(window).width() < 1000) {
                $(document).on("click", ".offer-link", function () {
                    var thisLink = $(this).find('a').attr('href');
                    window.location.href = thisLink;
                })
            }
        }

        /*===== Focus and Blur Input Form Search =====*/
        function FocusBlurInput() {

            $('.form-field .field-input').on('keydown', function () {

                var $label = $(this).parent('.form-field').find('label');

                if ($label.hasClass('forcus') == false) {
                    $label.addClass('focus');
                }

            }).on('keyup', function () {
                var $this = $(this);

                var $label = $this.parent('.form-field').find('label')

                if ($this.val() != '') {

                    if ($label.hasClass('forcus') == false) {
                        $label.addClass('focus');
                    }
                } else {
                    $label.removeClass('focus');
                }
            });

        }

        /*===== Calendar =====*/
        function Calendar() {
            $('.calendar-input,.caneldar').datepicker({
                showOtherMonths: true,
                selectOtherMonths: true
            });
        }
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
        $(".arrivocal").change(function () {
            //Aggiungo 7gg alla data selezionata
            var currentDate = $(this).datepicker('getDate');
            currentDate.setDate(currentDate.getDate());
            $(".partenzacal").datepicker('setDate', currentDate);
            $(".partenzacal").datepicker("destroy"); //distruggo
            $(".partenzacal").datepicker({minDate: currentDate, dateFormat: "dd/mm/yy", showButtonPanel: false, "firstDay": 1});//reinizializzo
        });

        $('.calendar-data-nascita').datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            changeMonth: true,
            changeYear: true,
            yearRange: "-100:+0"
        });

        /*===== BANNER SLIDE =====*/
        function BannerSlide() {
            if ($('#banner-slide').length > 0) {
                $('#banner-slide').owlCarousel({
                    autoPlay: 3500,
                    navigation: false,
                    pagination: false,
                    singleItem: true,
                    mouseDrag: false,
                    touchDrag: false,
                    transitionStyle: 'fade',
                    afterInit: function (el) {
                        var banner_h = el.closest('.banner').innerHeight();
                        el.find('.owl-item').each(function (index, el) {
                            var url = $(this).find('.banner-slide-item').data('src');
                            $(this).css({
                                'background-image': 'url(' + url + ')',
                                'height': banner_h
                            });
                        });
                    },
                    beforeUpdate: function (el) {
                        var banner_h = el.closest('.banner').innerHeight();
                        el.find('.owl-item').css('height', banner_h);
                    }
                });
            }
        }

        /*===== BANNER VIDEO BACKGROUND =====*/
        function BannerVideoBackground() {
            if ($("#banner-player").length) {
                $("#banner-player").YTPlayer({
                    containment: '#banner-video',
                    showControls: false,
                    autoPlay: false,
                    mute: true,
                    startAt: 0,
                    opacity: 1
                });

                $('.icon-play').click(function (event) {
                    if ($(this).hasClass('fa-play')) {
                        $('#banner-player').YTPPlay();
                        $(this).removeClass('fa-play').addClass('fa-pause');
                    } else {
                        $('#banner-player').YTPPause();
                        $(this).removeClass('fa-pause').addClass('fa-play');
                    }
                });
            }
        }

        /*===== Owl Magazine=====*/
        function OwlMagazine() {
            if ($('#owl-magazine-ds').length) {
                $("#owl-magazine-ds").owlCarousel({
                    autoPlay: false,
                    slideSpeed: 500,
                    navigation: false,
                    pagination: false,
                    mouseDrag: false,
                    addClassActive: true,
                    singleItem: true,
                    afterAction: function () {
                        var $parent = $('#magazine-thum');
                        $parent.find('.active').removeClass('active');
                        $parent.find('.thumnail-item').eq(this.currentItem).addClass('active');
                    }
                });

                var owl_magazine_data = $("#owl-magazine-ds").data('owlCarousel');

                $('#magazine-thum').on('click', '.thumnail-item', function () {
                    var $this = $(this);
                    if ($this.hasClass('active') == false) {
                        var index = $(this).index();
                        $this.parent('#magazine-thum').find('.active').removeClass('active');
                        $this.addClass('active');
                        owl_magazine_data.goTo(index);
                    }
                });
            }
        }

        /*===== Header Scroll =====*/
        function HeaderScroll() {
            var windown_top = $(window).scrollTop();
            if (windown_top > 100) {
                if ($('#header').hasClass('header-stick') == false) {
                    $('#header').addClass('header-stick');
                    $('.navigation.nav')
                            .closest('body')
                            .find('#header')
                            .find('.logo')
                            .css({
                                'opacity': '1',
                                'visibility': 'visible'
                            });
                }
            } else {
                $('#header').removeClass('header-stick');
                $('.navigation.nav')
                        .closest('body')
                        .find('#header')
                        .css('background-color', 'transparent')
                        .find('.logo')
                        .css({
                            'opacity': '0',
                            'visibility': 'hidden'
                        });
            }

        }

        /*=====  Cecked Fattura =====*/
        $('#fatturazione').click(function () {
            if ($(this).is(':checked')) {
                $('.dati-fatturazione').slideToggle();
            } else {
                $('.dati-fatturazione').slideToggle();
            }
        });

        /*=====  Payment Methods Change  =====*/
        $('ul.pay-li li input[type=radio]').click(function () {
            var typePay = $(this).attr('data-trigger-box');

            switch (typePay) {
                case "carta":
                    $('div#bonifico').slideUp();
                    $('div#carta').slideDown();
                    break;
                case "bonifico":
                    $('div#carta').slideUp();
                    $('div#bonifico').slideDown();
                    break;
                default:
                    $('div#carta').slideUp();
                    $('div#bonifico').slideUp();
            }
        });

        /*=====  Price Slider =====*/
        function PriceSlider() {
            if ($('.price-slider').length) {
                $(".price-slider").slider({
                    min: 0,
                    max: 9000,
                    step: 1,
                    range: true,
                    create: function (event, ui) {

                        var $this = $(this),
                                values = $(this).find('.range').attr('value').split(',');

                        $this.slider("values", values);

                        $this.prepend("<label class='label-min'>€" + values[0] + "</label>");

                        $this.append("<label class='label-max'>€" + values[1] + "</label>");

                    },
                    slide: function (event, ui) {

                        var $this = $(this),
                                values = ui.values;

                        $this.find('.label-min').text("€" + values[0] + "");

                        $this.find('.label-max').text("€" + values[1] + "");

                        $this.find('.range').attr('value', values);

                    }
                });
            }
        }

        /*=====  Time Slider =====*/
        function TimeSlider() {
            if ($('.time-slider').length) {

                $(".time-slider").slider({
                    min: 0,
                    max: 1440,
                    step: 1,
                    create: function (event, ui) {
                        var $this = $(this),
                                start = parseInt($this.attr('data-start'), 10),
                                end = parseInt($this.attr('data-end'), 10),
                                hours_start = Math.floor(start / 60);

                        if (isNaN(end) == false) {

                            $this.slider("option", "range", true);

                            $this.slider("values", [start, end]);

                            var hours_end = Math.floor(end / 60),
                                    time_end = TimeSlide(hours_end, end - (hours_end * 60), true),
                                    time_start = TimeSlide(hours_start, start - (hours_start * 60), true);

                            $this.prepend("<label class='label-min'>" + time_start + "</label>");

                            $this.append("<label class='label-max'>" + time_end + "</label>");

                            $this.find('.range').attr('value', time_start + ',' + time_end);

                        } else {
                            var time_start = TimeSlide(hours_start, start - (hours_start * 60), false);

                            $this.slider("value", start);

                            $this.slider("option", "range", "min");

                            $this.append("<label class='label-max'>" + time_start + "</label>");

                            $this.find('.range').attr('value', time_start);

                        }


                    },
                    slide: function (event, ui) {

                        var $this = $(this),
                                rager = $this.slider("option", "range"),
                                values, hours_start, hours_end, time_start, time_end;

                        if (rager == true) {

                            values = ui.values;

                            hours_start = Math.floor(values[0] / 60);

                            hours_end = Math.floor(values[1] / 60);

                            time_start = TimeSlide(hours_start, values[0] - (hours_start * 60), true);

                            time_end = TimeSlide(hours_end, values[1] - (hours_end * 60), true);

                            $this.find('.label-min').text(time_start);

                            $this.find('.label-max').text(time_end);

                            $this.find('.range').attr('value', time_start + ',' + time_end);

                        } else {

                            values = ui.value;

                            hours_start = Math.floor(values / 60);

                            time_start = TimeSlide(hours_start, values - (hours_start * 60), false);

                            $this.find('.label-max').text(time_start);

                            $this.find('.range').attr('value', time_start);
                        }
                    }
                });
            }
        }

        function TimeSlide(h, m, e) {

            var hours = h,
                    minutes = m,
                    t = '',
                    time;
            if (e == true) {
                if (hours.length == 1)
                    hours = '0' + hours;

                if (minutes < 10)
                    minutes = '0' + minutes;

                if (minutes == 0)
                    minutes = '00';

                if (hours >= 12) {
                    if (hours == 12) {
                        hours = hours;
                        minutes = minutes;
                        t = ' PM';
                    } else {
                        hours = hours - 12;
                        minutes = minutes;
                        t = ' PM';
                        if (hours == 12 && minutes == 0) {
                            hours = 11
                            minutes = 59;
                        }
                    }
                } else {
                    hours = hours;
                    minutes = minutes;
                    t = ' AM';
                }
                if (hours == 0) {
                    hours = 12;
                    minutes = minutes;
                    t = ' AM';
                }
                time = hours + ":" + minutes + t;
            } else {

                if (hours == 24)
                {
                    if (minutes == 0) {
                        hours = 23;
                        minutes = '59';
                    }
                }
                if (minutes < 10)
                    minutes = '0' + minutes;

                t = 'm';

                time = hours + 'h ' + minutes + t;
            }

            return time;
        }

        /*===== Detail Slide =====*/
        function DetailSlide() {
            var slidelager = $("#slide-room-lg");
            var slidethumnail = $("#slide-room-sm");

            slidelager.owlCarousel({
                singleItem: true,
                autoPlay: false,
                navigation: false,
                pagination: false,
            });

            slidethumnail.owlCarousel({
                mouseDrag: false,
                navigation: true,
                navigationText: ["<span class='prev-next-room prev-room'></span>", "<span class='prev-next-room next-room'></span>"],
                itemsCustom: [[320, 3], [480, 5], [768, 6], [992, 7], [1200, 8]],
                pagination: false
            });

            $("#slide-room-sm").on("click", ".owl-item", function (e) {
                e.preventDefault();
                if ($(this).hasClass('synced')) {
                    return false;
                } else {
                    $('.synced').removeClass('synced')
                    $(this).addClass('synced')
                    var number = $(this).data("owlItem");
                    slidelager.data('owlCarousel').goTo(number);
                }
            });
        }

        /*===== Member Review =====*/
        function MemberReview() {
            $('.progress-rv').each(function (index, value) {
                var datavalue = $(this).attr('data-value'),
                        point = datavalue * 10;
                $(this).append("<div style='width:" + point + "%'><span>" + datavalue + "</span></div>")
            })
        }

        /*===== Post Slide =====*/
        function PostSlide() {
            if ($('.post-slide').length > 0) {
                $('.post-slide').owlCarousel({
                    autoPlay: 8000,
                    slideSpeed: 1000,
                    navigation: true,
                    pagination: false,
                    singleItem: true,
                    autoHeight: true,
                    transitionStyle: 'fade',
                    navigationText: ["<i class='fa  fa-angle-left'></i>", "<i class='fa  fa-angle-right'></i>"]
                });
            }
        }

        /*===== Page Slide =====*/
        function PageSlide() {
            if ($('.page-slide').length > 0) {
                $('.page-slide').owlCarousel({
                    autoPlay: 10000,
                    slideSpeed: 1000,
                    navigation: false,
                    pagination: true,
                    singleItem: true,
                    autoHeight: true,
                    navigationText: ["<i class='fa  fa-angle-left'></i>", "<i class='fa  fa-angle-right'></i>"]
                });
            }
        }

        function SelectTable() {
            $(".table-radio tbody tr").on('click', function () {
                var $this = $(this);
                if ($this.hasClass('warning') == false) {
                    $this.parents('.table-radio').find('.warning').removeClass('warning');
                    $this.addClass('warning')
                    $this.find('.radio').prop('checked', true);
                }
            });
        }

        /*===== ScrollTable =====*/
        function ScrollTable() {

            if ($('.scroll-table').length) {
                if (isMobile.any()) {
                } else {
                    $(".scroll-table").niceScroll({
                        touchbehavior: false,
                        background: "#e2e2e2",
                        cursoropacitymin: 1,
                        cursorcolor: "#141414",
                        ursoropacitymax: 0.6,
                        cursorwidth: 5,
                        cursorborder: '0px solid #fff',
                        railalign: "right"
                    });
                }
            }
        }

        /*===== Scroll SiderBar Fixed =====*/
        function ScrollSiderBar() {
            if (WindowWidth >= 1200) {
                var scroll = $(window).scrollTop(),
                        top = $("#header").outerHeight();

                $('.detail-cn').each(function (index, value) {

                    var $this = $(this),
                            offset = $this.offset().top,
                            height = $this.outerHeight(),
                            $taget = $this.find('.scroll-heading'),
                            eheight = $taget.outerHeight(),
                            scroll_top = scroll - offset + top;

                    if (scroll_top > 0) {
                        if (height - scroll_top >= 0 && (height - eheight) > scroll_top) {
                            $taget.css({
                                'position': 'fixed',
                                'top': +top + 'px'
                            });
                        } else {
                            $taget.css({'position': 'static'});
                        }
                    } else {
                        $taget.css({'position': 'static'});
                    }
                });

                $('.scroll-heading a').on('click', function () {
                    var id = $(this).attr('href');
                    $('html, body').stop().animate({
                        scrollTop: $(id).offset().top - 70
                    }, 1000);

                    return false;
                });
            }
        }

        /* Calendar Chart*/
        function CalendarChart() {
            $('.bar-cl .fill').each(function () {
                var $this = $(this),
                        price = $this.attr('data-price'),
                        percent = (price / 600) * 100;
                $this.css({
                    'height': percent + '%'
                });
            });
            $('.ul-bar li').on('click', '.bar-cl', function () {
                $(this).parents('.ul-bar').find('.active').removeClass('active');
                $(this).parents('li').addClass('active');
            })
        }

        /*===== Parallax=====*/
        function parallaxInit() {
            if (WindowWidth > 1199) {
                if ($('.bg-parallax').length) {
                    $('.bg-parallax').each(function () {
                        $(this).parallax("50%", 0.1);
                    });
                }
            }
        }

        /*===== Get Ajax =====*/
        function GetAjax(url, data) {
            $.ajax({
                type: "GET",
                url: url,
                data: data,
                dataType: "html"
            })
                    .done(function (msg) {
                        return msg;
                    });
            return '';
        }

        /*===== Hotel Maps =====*/
        function GoogleMapHotel() {
            if ($('#hotel-maps').length) {
                var map;
                var bounds = new google.maps.LatLngBounds();

                var mapOptions = {
                    zoom: 16,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                // Display a map on the page
                map = new google.maps.Map(document.getElementById("hotel-maps"), mapOptions);

                // Multiple Markers
                var markers = [
                    ['Aquilia Resort', 38.5881288, 16.5635858],
                    ['Le Rosette Resort', 38.6897462, 15.9357737],
                    ['Baia Dei Gigli', 38.914939, 17.0766723]
                ];

                var infoWindowContent = [["\
                                        <div class='maps-item'>\
                                            <a href='#' class='maps-image'>\
                                                <img src='images/hotel/img-10.jpg' alt=''>\
                                            </a>\
                                            <div class='maps-text'>\
                                                <h2><a href='#'>Aquilia Resort</a></h2>\
                                                <span>\
                                                    <i class='glyphicon glyphicon-star'></i>\
                                                    <i class='glyphicon glyphicon-star'></i>\
                                                    <i class='glyphicon glyphicon-star'></i>\
                                                    <i class='glyphicon glyphicon-star'></i>\
                                                    <i class='glyphicon glyphicon-star'></i>\
                                                </span>\
                                                <address>Via Aquilia, Badolato - Calabria</address>\
                                                <p>Prova di testo da aggiungere sotto, prova ancora ecc...</a>\
                                                </p>\
                                                <hr class='hr'>\
                                                <span class='price'>Da-<ins>€345</ins>/persona</span>\
                                            </div>\
                                        </div>\
                                    "]];

                var infoWindow = new google.maps.InfoWindow({maxWidth: 600}),
                        marker, i,
                        image = 'images/icon-maker.png';

                for (i = 0; i < markers.length; i++) {
                    var beach = markers[i];
                    var position = new google.maps.LatLng(beach[1], beach[2]);
                    bounds.extend(position);
                    marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        icon: image,
                        title: beach[0]
                    });

                    // Allow each marker to have an info window
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            infoWindow.setContent(infoWindowContent[0][0]);
                            infoWindow.open(map, marker);
                        }
                    })(marker, i));

                    // Automatically center the map fitting all markers on the screen
                    map.fitBounds(bounds);
                }
            }
        }

        /*====== Google Maps Contact ======*/
        function GoogleMapContact() {

            if ($('#contact-maps').length) {
                var $map = $('#contact-maps'),
                        mapZoom = $map.data('map-zoom'),
                        lat = $map.data('map-latlng').split(',')[0],
                        lng = $map.data('map-latlng').split(',')[1],
                        mapContent = $map.data('map-content'),
                        myCenter = new google.maps.LatLng(lat, lng);
                var mapProp = {
                    center: myCenter,
                    zoom: mapZoom,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("contact-maps"), mapProp);

                var marker = new google.maps.Marker({
                    position: myCenter
                });

                marker.setMap(map);

                var infowindow = new google.maps.InfoWindow({
                    content: mapContent,
                    maxWidth: 200
                });

                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.open(map, marker);
                });


            }
        }

        /*====== Hotel Location Map ======*/
        function HotelLocationMap() {

            if ($('#hotel-detail-map').length) {
                var $map = $('#hotel-detail-map'),
                        lat = $map.data('latlng').split(',')[0],
                        lng = $map.data('latlng').split(',')[1],
                        myCenter = new google.maps.LatLng(lat, lng);
                var mapProp = {
                    center: myCenter,
                    zoom: 15,
                    scrollwheel: false,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                var map = new google.maps.Map(document.getElementById("hotel-detail-map"), mapProp);


            }
        }

        /*==============================
         Ajax contact form
         ==============================*/
        function ajaxContactForm() {
            if ($("#contact-form").length > 0) {
                // Validate the contact form
                $('#contact-form').validate({
                    // Add requirements to each of the fields
                    rules: {
                        name: {
                            required: true,
                            minlength: 2
                        },
                        email: {
                            required: true,
                            email: true
                        },
                        message: {
                            required: true,
                            minlength: 10
                        }
                    },

                    // Specify what error messages to display
                    // when the user does something horrid
                    messages: {
                        name: {
                            required: "Inserisci il tuo nome.",
                            minlength: $.format("Sono richiesti almeno {0} caratteri.")
                        },
                        email: {
                            required: "Inserisci una mail.",
                            email: "Inserisci un indirizzo mail valido."
                        },
                        message: {
                            required: "Inserisci qui il tuo messaggio.",
                            minlength: $.format("Sono richiesti almeno {0} caratteri.")
                        }
                    },

                    // Use Ajax to send everything to processForm.php
                    submitHandler: function (form) {
                        $("#submit-contact").html("Invio in corso...");
                        $(form).ajaxSubmit({
                            success: function (responseText, statusText, xhr, $form) {
                                $("#contact-content").slideUp(600, function () {
                                    $("#contact-content").html(responseText).slideDown(600);
                                    $(".submit-contact").html("Submit");
                                });
                            }
                        });
                        return false;
                    }
                });
            }
        }

        /*===== Popup Room =====*/
        function PopupRoom() {

            if ($('.a-popup-room').length) {
                $('.a-popup-room').magnificPopup({
                    type: 'ajax',
                    mainClass: 'mfp-fade'
                });
            }
        }

        /*===== Carousel =====*/
        $('.owl-carousel-collection').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            navigation: true,
            navigationText: ['<div class="prev-collection"><i class="fa fa-chevron-left"></i></div>', '<div class="next-collection"><i class="fa fa-chevron-right"></i></div>'],
            itemsCustom: [[320, 1], [480, 1], [768, 3], [992, 3], [1200, 4], [1600, 5]]
        });

        /*===== Carousel Recensioni =====*/
        $('.owl-carousel-recensioni').owlCarousel({
            loop: true,
            margin: 10,
            autoplay: true,
            autoplayTimeout: 1000,
            autoplayHoverPause: true,
            navigation: true,
            navigationText: ['<div class="prev"><i class="fa fa-chevron-left"></i></div>', '<div class="next"><i class="fa fa-chevron-right"></i></div>'],
            itemsCustom: [[320, 1], [480, 1], [768, 3], [992, 3], [1200, 4], [1600, 5]]
        });

        /*===== Tagliare testo anteprima =====*/
        function anteprima(elems, length) {
            $.each($(elems), function () {
                var item_html = $(this).html(); // salvo in una variabile il contenuto dell'elemento
                item_html = item_html.replace(/<\/?[^>]+>/gi, ''); // tolgo eventuali tags HTML
                item_html = jQuery.trim(item_html);  // elimino eventuali spazi bianchi prima e dopo
                $(this).html(item_html.substring(0, length) + '...');
            });
            return this;
        }

        // elenco anteprime
        anteprima('.text-review', 278);
        anteprima('.desc-cut', 278);
        anteprima('.desc-cut', 278);
        anteprima('.magazine-body', 1000);
        anteprima('.post .post-text p', 180);



        /*===== Random persone connesse 1 - 10 =====*/
        setInterval(function () {
            $(".person-on-page").html(Math.floor(Math.random() * 4) + 1);
        }, 35000);

        /*===== Social Share =====*/
        $('.home-sales-bar-bg-share').on("click", function () {
            $(this).animate({width: "100%"}, 200);
            $(this).closest("div.home-sales-bar-bg").children(".home-sales-bar-bg-button").animate({width: "0%"}, 200);
        });

        /*===== Tagliare testo anteprima =====*/
        $("h4.title-sidebar").click(function () {
            $(this).next().slideToggle();
            $(this).toggleClass('title-sidebar2');
        });

        /*===== Altezza automatica slider =====*/
        jQuery(document).ready(function ($) {
            var cut = ($('.logo').outerHeight()) + ($('#first-offer').outerHeight());
            var win = $(window).height();
            var total = win - cut;
            $('#slider-banner').css({minHeight: total, marginTop: cut});
            $(window).resize(function () {
                $('#slider-banner').css({minHeight: total, marginTop: cut});
            });
        });

        /*===== Fix Payment dx =====*/
        $(window).scroll(function () {
            if ($('#fix-vert').length) {
                if ($(window).width() > 1199) {
                    var elem = $('#fix-vert');
                    var container = $('#measure');
                    var header = $('#header');

                    var headerHeight = header.height();

                    var elemOffset = elem.offset().top;
                    var elemheight = elem.height();

                    var containerheight = container.height();
                    var containerOffset = container.offset().top;

                    var appari = (containerOffset - headerHeight);
                    var scompari = (((containerOffset + containerheight) - headerHeight) - elemheight);
                    // var scompariFix = (((containerOffset + containerheight) - headerHeight) - elemheight);

                    if (window.pageYOffset >= appari && window.pageYOffset <= scompari) {
                        elem.addClass("my-sticky");
                    } else {
                        elem.removeClass("my-sticky");
                    }

                    if (window.pageYOffset > scompari && containerheight > elemheight) {
                        $('.price-big').addClass("price-big-block");
                        $('.spacing-camere').addClass("spacing-camere-relative");
                    } else {
                        $('.price-big').removeClass("price-big-block");
                        $('.spacing-camere').removeClass("spacing-camere-relative");
                    }
                }
            }
        });

        /*===== Price box =====*/
        if ($(window).width() > 768) {
            $(".drag-point").draggable({axis: "x"});
        }

        /*===== Tab =====*/
        $('.tabbing').mTab({
            navigation: ".tabNav"
            , container: ".tabContainer"
            , activeTab: 1
            , activeClass: "active"
            , scrollOffset: true
            , accordScreen: 768
            , toggleClose: true
            , animation: false
            , openWithUrl: true
            , callbackonclick: function () { }
            , callback: function () { }
        });

        /*===== Anno attuale in footer =====*/
        var dd = new Date();
        var nn = dd.getFullYear();
        $(".anno-attuale").html(nn);

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

        /*===== Slide camere =====*/
        $(".result-go-to-pay").on("click", function () {
            var itembox = $(this).closest('.hotel-list-item');
            itembox.children('.camere-container').slideToggle();
        });

        $("a.img-single-hotel").hover(function () {
            $(this).append('<i class="fa fa-camera icon"></i>');
        }, function () {
            $(this).find('i.icon').remove();
        });

        /*===== Slide payment =====*/
        $(document).on("click", "div.supplementi, div.assicurazione, div.servizi, div.tipocamera", function () {
            var classeSel = $(this).attr("class");
            var selector = 'div.' + classeSel + '-box';
            $(this).closest('div.row').find(selector).slideToggle();
            $(this).closest('div.row').find('div.' + classeSel + ' i').toggleClass('fa-chevron-down').toggleClass("fa-chevron-up");
        });

        $("div.struttura-selezionata, div.dettagli-volo").on("click", function () {
            var classeSel = $(this).attr("class");
            var selector = 'div.' + classeSel + '-box';
            $(selector).slideToggle();
            $(this).find("i[class*='-square-o']").toggleClass('fa-plus-square-o').toggleClass('fa-minus-square-o');
        });

        $(document).on("click", ".camera-edit", function () {
            $(this).closest('div.row').find('div.box-personalizza').slideToggle();
            $(this).closest('div.row').find(".camera-edit i[class*='-square-o']").toggleClass('fa-plus-square-o').toggleClass('fa-minus-square-o');
        });

        /*===== Slide ospiti camera =====*/
        $(document).on("click", "div.ospiti-camera-singola", function () {
            $(this).closest('div.camere-list').find('div.ospiti-list').slideToggle();
        });

        $(document).on("click", "div.singolo-ospite-trigger-data", function () {
            $(this).closest('div.singoli-ospiti-container').find('div.dati-ospite').slideToggle();
            $(this).closest('div.singoli-ospiti-container').find("i[class*='fa-chevron-']").toggleClass('fa-chevron-down').toggleClass("fa-chevron-up");
        });

        /*===== Info box =====*/
        $(document).on("click", ".box-info span", function () {
            $(this).closest('div.box-info').find('div.box-info-inner').slideToggle();
        });
        $(document).on("click", ".camera-details", function () {
            $('.camera-details-inner').slideToggle();
        });



        /*===== Tooltip =====*/
        $('.right-info').tooltip({
            trigger: "click",
            html: true,
            placement: "left"
        });
        $('.right-info').on("click", function () {
            $(this).toggleClass('fa-info-circle').toggleClass('fa-times-circle');
            $(this).toggleClass('color-gray');
        });


        /*===== Star Rate =====*/
        /* 1. Visualizing things on Hover - See next part for action on click */
        $('#stars li').on('mouseover', function () {
            var onStar = parseInt($(this).data('value'), 10); // The star currently mouse on

            // Now highlight all the stars that's not after the current hovered star
            $(this).parent().children('li.star').each(function (e) {
                if (e < onStar) {
                    $(this).addClass('hover');
                } else {
                    $(this).removeClass('hover');
                }
            });

        }).on('mouseout', function () {
            $(this).parent().children('li.star').each(function (e) {
                $(this).removeClass('hover');
            });
        });


        /* 2. Action to perform on click */
        $('#stars li').on('click', function () {
            var onStar = parseInt($(this).data('value'), 10); // The star currently selected
            var stars = $(this).parent().children('li.star');

            for (var i = 0; i < stars.length; i++) {
                $(stars[i]).removeClass('selected');
            }

            for (var i = 0; i < onStar; i++) {
                $(stars[i]).addClass('selected');
            }

            // pubblico il value
            var ratingValue = parseInt($('#stars li.selected').last().data('value'), 10);
            console.log(ratingValue);
        });


        /*===== Upload files video foto =====*/
        var inputs = document.querySelectorAll('.inputfile');
        Array.prototype.forEach.call(inputs, function (input)
        {
            var label = input.nextElementSibling,
                    labelVal = label.innerHTML;

            input.addEventListener('change', function (e)
            {
                var fileName = '';
                if (this.files && this.files.length > 1)
                    fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
                else
                    fileName = e.target.value.split('\\').pop();

                if (fileName)
                    label.querySelector('span').innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });
        });

        /*===== Recensioni div =====*/
        var recensioniDivLap = '<div class="box-sospeso">Scrivi la tua recensione, condividi la tua esperianza.<br><textarea>Scrivi qui..</textarea></div>';
        var recensioniDivMobile = '<div class="box-sospeso-mobile">Scrivi la tua recensione, condividi la tua esperianza.<br><textarea>Scrivi qui..</textarea></div>';
        if ($(window).width() > 992) {
            $("div.scrivi-recensione").append(recensioniDivLap);
            $('label.scrivi-recensione-label').on('click resize', function () {
                $('div.box-sospeso').toggleClass("arrow-top-rec");
                $('div.box-sospeso').slideToggle();
            });
        } else {
            $("div.rec-mobile-container").append(recensioniDivMobile);
            $('label.scrivi-recensione-label').on('click resize', function () {
                $('div.rec-mobile-container').slideToggle();
            });
        }

        /*===== Modal lista =====*/
        $(".lista-modal-button").click(function () {
            $("#lista-modal").modal();
        });
        $("#lista-modal .modal-content .modal-body ol li").click(function () {
            $(this).children('div.cont-child-li').slideToggle();
            $(this).children('i').toggleClass('fa-caret-down').toggleClass('fa-caret-up');
        });

    });
})(jQuery);

/* OUT OF document.ready */

/*===== Fancy box control =====*/
$("[data-fancybox]").fancybox({
    buttons: [
        'zoom',
        'share',
        'slideShow',
        'fullScreen',
        'download',
        'thumbs',
        'close'
    ],
    thumbs: {
        autoStart: false
    }
});
if ($(window).width() > 768) {
    $("[data-fancybox^='map']").fancybox({
        iframe: {
            css: {
                width: '60%'
            }
        }
    });
}


/*===== Deferring video =====*/
$(window).load(function () {
    var vidDefer = document.getElementsByTagName('iframe');
    for (var i = 0; i < vidDefer.length; i++) {
        if (vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
        }
    }
});
