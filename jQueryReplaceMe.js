(function ($) {
    "use strict";
    $.fn.replaceMe = function (options) {
        var contents = $(this).contents(),
            contentIndex,
            text,
            excludedTags,
            node,
            index,
            settings = $.extend({
                textToReplace: "any text",
                replaceWithText: "<span>othertext</span>",
                globally: true,
                excludedParentTags: [
                    "HEAD",
                    "TITLE",
                    "LINK",
                    "SCRIPT",
                    "STYLE"
                ],
                excludedTags: [
                    "img"
                ],
                excludedSelectors: []
            }, options),
            checkExCludedSelectors = function (el) {
                var _el = el,
                    excludeIndex,
                    childIndex,
                    entry,
                    childEntry,
                    element;
                for (excludeIndex = 0; excludeIndex < settings.excludedSelectors.length; excludeIndex += 1) {
                    entry = settings.excludedSelectors[excludeIndex];
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
            settings.excludedTags.push("title");
        }
        for (contentIndex = 0; contentIndex < contents.length; contentIndex += 1) {
            node = contents[contentIndex];
            index = contentIndex;
            text = $(node).text();
            text = (text === undefined) ? "" : text;
            excludedTags = (node.localName === null || node.localName === undefined) ? node.nodeName : node.localName;
            checkExCludedSelectors(excludedTags);
            if (text.match(new RegExp(settings.textToReplace, "g")) && !excludedTags.match(new RegExp(settings.excludedTags.join("|"))) && $.inArray(node.parentElement.nodeName, settings.excludedParentTags) === -1) {
                if (settings.globally) {
                    $(node).replaceWith(text.replaceAll(settings.textToReplace, settings.replaceWithText));
                } else {
                    $(node).replaceWith(text.replace(settings.textToReplace, settings.replaceWithText));
                }
            }
        }
    };
    String.prototype.replaceAll = function (search, replace) {
        var string = this,
            index;
        while ((index = string.indexOf(search)) !== -1) {
            string = string.replace(search, replace);
        }
        return string;
    };
}(jQuery));
