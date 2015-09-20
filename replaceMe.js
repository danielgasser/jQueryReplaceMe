/**
 * Created by daniel on 9/20/15.
 */
(function ($) {
    "use strict";
    $.fn.replaceMe = function (options) {
        var settings = $.extend({
            textToReplace: 'text',
            replaceWithText: '<span>othertext</span>',
            globally: true,
            excludedTags: [
                'img',
                'span'
            ]
        }, options);
        $(this).html(function (index, text) {
            if (!text.match(new RegExp(settings.excludedTags.join('|')))) {
                if(settings.globally) {
                    return text.replace(new RegExp(settings.textToReplace, 'g'), settings.replaceWithText);
                }
                return text.replace(new RegExp(settings.textToReplace), settings.replaceWithText);
            }
        });
    }
}(jQuery));