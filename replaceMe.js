/**
 * Created by https://toesslab.ch on 9/20/15.
 */
(function ($) {
    "use strict";
    $.fn.replaceMe = function (options) {
        var settings = $.extend({
            textToReplace: 'any_text',
            replaceWithText: '<span>othertext</span>',
            globally: true,
            excludedTags: [
                'img',
                'span'
            ]
        }, options);
        $(this).contents().each(function (index, node) {
            var text;
            if(node.innerHTML !== undefined) {
                text = node.innerHTML;
            } else {
                text = node.nodeValue
            }
            console.log(text)
            console.log(node.localName)
            if (text.match(new RegExp(settings.textToReplace, 'g')) && node.nodeType === 3) {
                if(settings.globally) {
                    $(node).replaceWith(text.replace(new RegExp(settings.textToReplace, 'g'), settings.replaceWithText));
                } else {
                    $(node).replaceWith(text.replace(new RegExp(settings.textToReplace), settings.replaceWithText));
                }
            }
        });
    }
}(jQuery));