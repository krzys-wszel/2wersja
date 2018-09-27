/*
jQuery(function(e) {
    e(window).scroll(function(t) {
        var s = 150,
            i = e("navbar").height();
        e(this).scrollTop() > i ? (e(".navbar-default").css({
                "background-color": "rgba(16, 79, 156, 0.7)"
            }),
            e(".navbar-brand, .navbar-header").css({
                "height": "50px"
            }),
            e(".btn--menu").css({
                "transform": "scale(0.71)"
            }),
            e("#header h1").css({
                "transform": "scale(.7)",
                "transform-origin": "left"
            })) : e(this).scrollTop() < i && (e(".navbar-default").css({
                "background-color": "transparent"
            }),
            e(".navbar-brand, .navbar-header").css({
                "height": "70px"
            }),
            e(".btn--menu").css({
                "transform": "scale(1)"
            }),
            e("#header h1").css({
                "transform": "scale(1)"
            }))
    })
})
*/
$(window).scroll(function() {
    if ($('.navbar').offset().top >= $('.navbar').height()) {
        $(".navbar-default").css({
            "background-color": "rgba(16, 79, 156, 0.7)"
        });
        $(".navbar-brand, .navbar-header").css({
            "height": "50px"
        });
        $(".btn--menu").css({
            "transform": "scale(0.71)"
        });
        $("#header h1").css({
            "transform": "scale(.7)",
            "transform-origin": "left"
        });
    } else {
        $(".navbar-default").css({
            "background-color": "transparent"
        });
        $(".navbar-brand, .navbar-header").css({
            "height": "70px"
        });
        $(".btn--menu").css({
            "transform": "scale(1)"
        });
        $("#header h1").css({
            "transform": "scale(1)"
        });
    }
});

$(function() {
    $('.auto-height').css({
        'max-height': $(window).innerHeight()
    });
    $(window).resize(function() {
        $('.auto-height').css({
            'max-height': $(window).innerHeight()
        });
    });
});

// SVG styling
// jQuery(document).ready(function($) {
//     $('img[src$=".svg"]').each(function() {
//         var $img = jQuery(this);
//         var imgURL = $img.attr('src');
//         var attributes = $img.prop("attributes");
//         $.get(imgURL, function(data) {
//             var $svg = jQuery(data).find('svg');
//             $svg = $svg.removeAttr('xmlns:a');
//             $.each(attributes, function() {
//                 $svg.attr(this.name, this.value);
//             });
//             $img.replaceWith($svg);
//         }, 'xml');
//     });
// });

//refresh yt iframe

jQuery(".modal-backdrop, #ytModal .yt-close, #ytModal").on("click", function() {
    jQuery("#ytModal iframe").attr("src", jQuery("#ytModal iframe").attr("src"));
});

// Sending contact form

// Sending contact form
var form = $('#contact');
var formMessages = $('#contact-messages');

$(form).submit(function(event) {
    var formData = $(form).serialize();

    $.ajax({
        type: 'POST',
        url: $(form).attr('action'),
        data: formData
    })

    .done(function(response) {
        $(formMessages).show();
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');
        $(formMessages).text(response);

        $('#contact-name').val('');
        $('#contact-email').val('');
        $('#contact-phone').val('');
        $('#contact-message').val('');
    })

    .fail(function(data) {
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        if (data.responseText !== '') {
            $(formMessages).text(data.responseText);
        } else {
            $(formMessages).text('Wiadomość nie została wysłana.');
        }
    });
    event.preventDefault();
});

// Stop googlemap scrolling
jQuery(document).ready(function($) {
    $('.map').click(function() {
        $('.map > iframe').css("pointer-events", "auto");
    });
});

jQuery(document).ready(function($) {
    $(".map").mouseleave(function() {
        $('.map > iframe').css("pointer-events", "none");
    });
});

$(function() {
    $(".btn--menu").on("click", function() {
        $(this).toggleClass("active");
        $(".menu").toggleClass("active");
        $(".block-revealer__element").toggleClass("opened");
        if ($(".block-revealer__element").hasClass("opened")) {
            $(".block-revealer__element").removeClass("closed");

        } else {
            $(".block-revealer__element").addClass("closed");
        }
    });
});
// Sending contact form
$(document).ready(function($) {
    var form2 = $('#orderForm');
    var formMessages2 = $('#order-messages');
    $(form2).submit(function(event) {
        $(formMessages2).show();
        $(formMessages2).removeClass('error');
        $(formMessages2).removeClass('success');
        $(formMessages2).text("Trwa przetwarzanie zamówienia...");
        var formData = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: $(form2).attr('action'),
            data: formData
        })

        .done(function(response) {
            $(formMessages2).show();
            $(formMessages2).removeClass('error');
            $(formMessages2).addClass('success');
            $(formMessages2).text(response);
            $(form2)[0].reset();
        })

        .fail(function(data) {
            $(formMessages2).show();
            $(formMessages2).removeClass('success');
            $(formMessages2).addClass('error');

            if (data.responseText !== '') {
                $(formMessages2).text(data.responseText);
            } else {
                $(formMessages2).text('Bład! Zamówienie nie mogło zostać wysłane.');
            }
        });

        event.preventDefault();
    });
});

// Managing order form
jQuery(document).ready(function() {
    $('.add').click(function() {
        if (($('.order-list').length) < 5) {
            $('.order-list').eq(0).clone().appendTo('.orders');
            $('.item-name').last().val("- Brak");
        }
    });
    $('.remove').click(function() {
        if (($('.order-list').length) > 1) {
            $('.order-list:last-child').remove();
        }
    });
});

$(document).on("change", 'select', function() {
    // Clear price
    var totalval = 0;
    $('#value').html(totalval);
    // Clear names
    $('.item-name').each(function(index) {
        $(this).val(" ");
    });
    // Set new values
    $('.order-list select').each(function(index) {
        totalval += Number($(this).val());
        $(this).parent().find('.item-name').val($(this).find('option:selected').text().split(' -')[0]);
    });
    $('#value').html(totalval);
});

jQuery(document).ready(function() {
    $('.close').click(function() {
        $(this).parent().parent().slideUp('easeInCubic').parent().slideUp('easeInCubic');
        $("#order-name").blur();
        $('#order select').val("0");
        $('#value').html("0");
    });
    $('.order-popup').click(function(e) {
        dataVal = $(this).data("popup");
        //console.log(dataVal);
        e.preventDefault();
        // $('#order').parent().show().parent().css('display', 'flex');
        //console.log(dataVal);
        $('#order select').val(dataVal);
        $('#value').html(dataVal);
        $(".order-list select").parent().find('.item-name').val($(".order-list select").find('option:selected').text().split(' -')[0]);
        $('#order').parent().show().parent().slideDown("easeInCubic").css("display", "flex");
        setTimeout(function() {
            $("#order-name").focus();
        }, 600);
    });
});
