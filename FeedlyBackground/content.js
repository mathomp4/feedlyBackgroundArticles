var hotkey;
chrome.storage.sync.get({ hotkey: ';' }, function (items) {
    hotkey = items.hotkey;
    window.addEventListener('keydown', keyListener, false);
});

var keyListener = function (e) {
    if (!e.repeat && e.key === hotkey) {
        // Try different approaches to find the article link
        var targetURL = null;

        // Attempt to find the article link in different known structures
        var inlinedArticle = $("a.ArticleTitle--inlined-article");
        var generalArticle = $("a.ArticleTitle");  // More general class match
        var selectedEntry = $(".entry--selected a.entry__title");
        var openArticle = $("[aria-label='Opened Article'] a.entryTitle");

        // Try different options in order of priority
        if (inlinedArticle.length > 0) {
            targetURL = inlinedArticle.attr('href');
        } else if (generalArticle.length > 0) {
            targetURL = generalArticle.attr('href');
        } else if (selectedEntry.length > 0) {
            targetURL = selectedEntry.attr('href');
        } else if (openArticle.length > 0) {
            targetURL = openArticle.attr('href');
        } else {
            console.log("No target URLs found");
        }

        // Open the link if found
        if (targetURL) {
            console.log("Opening URL:", targetURL);
            chrome.runtime.sendMessage({ url: targetURL });
        }
    }
};

