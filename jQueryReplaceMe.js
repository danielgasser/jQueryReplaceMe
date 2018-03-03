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
            excludedParentTags: [
                'HEAD',
                'TITLE',
                'LINK',
                'SCRIPT',
                'STYLE',
                'footer'
            ], excludedTags: [
                'img'
            ], excludedSelectors: [
            ]
        }, options),
            checkExCludedSelectors = function (el) {
                var counter = 0,
                    _el = el;
                $.each(settings.excludedSelectors, function (i, n) {
                    if (($(_el).hasClass(n) || $(_el).is(n)) && $.inArray(n, settings.excludedTags) === -1) {
                        settings.excludedTags.push(_el);
                        $.each($(_el).children(), function (j, m) {
                            if ($.inArray(m, settings.excludedTags) === -1) {
                                settings.excludedTags.push(m.localName);
                            }
                        })
                    }
                });
            };
        if (settings.excludedTags.length === 0) {
            settings.excludedTags.push('title')
        }
        $(this).contents().each(function (index, node) {
            var text,
                excludedTags;
            if(node.innerHTML !== undefined) {
                text = node.innerHTML;
            } else {
                text = node.nodeValue;
            }
            excludedTags = (node.localName === null || node.localName === undefined) ? node.nodeName : node.localName;
            //checkExCludedSelectors(excludedTags);
            if (text.match(new RegExp(settings.textToReplace, 'g')) && node.nodeType === 3 && !excludedTags.match(new RegExp(settings.excludedTags.join('|'))) && $.inArray(node.parentElement.nodeName, settings.excludedParentTags) === -1) {
                if(settings.globally) {
                    $(node).replaceWith(text.replaceAll(settings.textToReplace, settings.replaceWithText));
                } else {
                    $(node).replaceWith(text.replace(settings.textToReplace, settings.replaceWithText));
                }
            }
        });
    }
    String.prototype.replaceAll = function(search, replace){
        var string = this,
            index;
        while ((index = string.indexOf(search)) !== -1) {
            string = string.replace(search, replace);
        }
        return string;
    }
}(jQuery));
