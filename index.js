

window.addEventListener("DOMContentLoaded", function() {
  
  
    

    var container = document.querySelector(".container");
    var header = document.querySelector("#quote-text");
    var quoteContent = document.querySelector("#quote-content");
    var innerQuoteContent = document.querySelector("#inner-quote-content");

    var randomQuoteMachine = {
        previousQuotes:[],
        currentQuote:{},
        url:"http://quotesondesign.com/wp-json/posts?filter[orderby]=rand",
        handleQuote: function(response) {
            header.innerHTML = ''
            if (this.currentQuote) {
                this.previousQuotes.push(this.currentQuote);
            }
            this.currentQuote = response;
        
            if (quoteContent.childElementCount > 0) {
                var nextButton = document.querySelector("#next");
                quoteContent.removeChild(innerQuoteContent);
                document.querySelector("#nxt").className ="fas fa-arrow-right";
                nextButton.style.gridColumn = '2/-1';
                document.querySelector("#previous").style.display = "block";
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
                }
            } else if (request.state === XMLHttpRequest.DONE && request.status != 200) {
                console.log(request.responseText);
            }
        };
        // Get request with caching disabled
           request.open("GET",randomQuoteMachine.url + ((/\?/).test(randomQuoteMachine.url) ? "&" : "?") + (new Date()).getTime()),true;
           request.send();
      },
      showPreviousQuote: function() {
        var currentQuote = this.previousQuotes.pop();
      },
      share: function(platform) {
          if (platform === "facebook") {
            FB.ui({
               method: "share",
               href: this.currentQuote["link"],
            }, function(response){
                if (response && response.post_id) {
                    alert('success');
                } else {
                    alert('error');
                }
            });
          } else if (platform === "twitter") {

          }
        
      }
    }
   
    
    var getQuoteButton = document.querySelector("#next");
    getQuoteButton.addEventListener("click", randomQuoteMachine.getRandomQuote);

    document.querySelector(".fa-facebook-f").addEventListener("click",randomQuoteMachine.share("facebook"));

});
