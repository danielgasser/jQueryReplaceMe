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
                'img',

            ], excludedSelectors: [
            ]
        }, options),
            checkExCludedSelectors = function (el) {
                var _el = el,
                    index,
                    childIndex,
                    entry,
                    childEntry,
                    element;
                for (index = 0; index < settings.excludedSelectors.length; index += 1) {
                    entry = settings.excludedSelectors[index];
                    if (($(_el).hasClass(entry) || $(_el).is(entry)) && $.inArray(entry, settings.excludedTags) === -1) {
                        settings.excludedTags.push(_el);
                        element = $(_el).children();
                        for (childIndex = 0; childIndex < element.length; childIndex += 1) {
                            childEntry = element[childIndex];
                            if ($.inArray(childEntry, settings.excludedTags) === -1) {
                                settings.excludedTags.push(childEntry.localName);
                            }
                        }
                    }
                }
            };
        if (settings.excludedTags.length === 0) {
            settings.excludedTags.push('title')
        }
        $(this).contents().each(function (index, node) {
            var text,
                excludedTags;
            console.log(node)
            switch (node) {
                case node.innerHTML !== undefined:
                    text = node.innerHTML;
                    break;
                case node.wholeText !== undefined:
                    text = node.wholeText;
                    break;
                case node.textContent !== undefined:
                    text = node.textContent;
                    break;
            }
            text = (text === undefined) ? '' : text;
            excludedTags = (node.localName === null || node.localName === undefined) ? node.nodeName : node.localName;
            checkExCludedSelectors(excludedTags);
            console.log(text)
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
