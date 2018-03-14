

window.addEventListener("DOMContentLoaded", function() {
  
    var container = document.querySelector(".container");
    var header = document.querySelector("#quote-text");
    var quoteContent = document.querySelector("#quote-content");

    var randomQuoteMachine = {
        currentQuote: {},
        url:"http://quotesondesign.com/wp-json/posts?filter[orderby]=rand",
        handleQuote: function(response) {
            header.innerHTML = '';
            this.currentQuote = response;
            if (quoteContent.childElementCount > 0) {
                var innerQuoteContent = document.querySelector("#inner-quote-content");
                quoteContent.removeChild(innerQuoteContent);
            } 
            var quoteHtml = `
            <div id="inner-quote-content">
            ${response["content"]}
                <h1> - ${response["title"]} </h1>
            </div>`;
            quoteContent.insertAdjacentHTML("afterbegin",quoteHtml);
        },
        getRandomQuote: function() {
           var request = new XMLHttpRequest();
           request.onreadystatechange =  function handlerRequest() {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    var response = JSON.parse(request.responseText)[0];
                    randomQuoteMachine.handleQuote(response);
                    request.abort();
                }
            } else if (request.state === XMLHttpRequest.DONE && request.status != 200) {
                console.log(request.responseText);
            }
        };
        // Get request with caching disabled
           request.open("GET",randomQuoteMachine.url + ((/\?/).test(randomQuoteMachine.url) ? "&" : "?") + (new Date()).getTime()),true;
           request.send();
    },
        share: function(platform) {
            var currentQuoteText = ""
            var author = ""
            if (document.querySelector("#inner-quote-content")) {
                currentQuoteText = document.querySelector("#inner-quote-content").querySelector("p").innerHTML;
                author = document.querySelector("#inner-quote-content").querySelector("h1").innerHTML;
            }
            if (platform == "facebook" )  {
                var shareUrl = "//www.facebook.com/dialog/share?app_id=1790769074308211&href=" + currentQuoteText +  "-" +  author;
                window.open(shareUrl);
            } else if (platform == "twitter") {
                var shareUrl = 'https://twitter.com/intent/tweet?text=' + currentQuoteText +  "-" +  author; 
                window.open(shareUrl);
        }
    }
}
   
    document.querySelector("#next").addEventListener("click", randomQuoteMachine.getRandomQuote);
    document.querySelector(".fa-facebook-f").addEventListener("click",randomQuoteMachine.share("facebook"));
    document.querySelector(".fa-twitter").addEventListener("click",randomQuoteMachine.share("twitter"));
});
