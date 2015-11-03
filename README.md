# jQueryReplaceMe
Replace any Text in the DOM with other text or HTML

###How to use:
Include the latest jQuery library & then the script:

    <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script src="/your-js-folder/replaceMe/replaceMe.js"></script>
    </head>
    <body>
        $(document).ready(function () {
            $('p').replaceMe();
        });
    </body>
    
In the example above the `p` tag is used. You may use any valid HTML-tag.
###Options:

**textToReplace** (string) The text to look for. No HTML allowed

**replaceWithText** (string or HTML) The text or HTML being replaced

**globally** (boolean) If set to true all occurrence of **textToReplace** should be searched

**excludedTags** (array) HTML-tags which should be ignored

Options are added like this:

    $(document).ready(function () {
        $('p').replaceMe({
            textToReplace: 'any_text',
            replaceWithText: '<span>othertext</span>',
            globally: true,
            excludedTags: [
                'img',
                'span'
            ]
        });
    });


