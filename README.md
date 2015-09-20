# jQueryReplaceMe
Replace any Text in the DOM with other text or HTML

###How to use
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
    
###Options:

`textToReplace` (string) The text to look for. No HTML

`replaceWithText` (string or HTML) The text or HTML being placed

`globally` (boolean) Set to true, if all occurrence of `textToReplace` should be searched

`excludedTags` (array) The tags which should be ignored

