$(document).ready(function () {
    var searchTerm = "Tesla";
    var numberRecords = "5";
    var startYear;
    var endYear;

    var APIkey = "8066e48ee7f14bd4a877966c12f2b41d";

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    console.log($("#test"));
    url += '?' + $.param({
        'api-key': APIkey,
        'q': searchTerm
    });

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        var results=response.response.docs;
        console.log(results);
        for (var i=0;i<results.length;i++){
            console.log(results[i].headline.main);
            //console.log(results[i].byline.original);
            console.log(results[i].pub_date);
            console.log(results[i].web_url);
          
        }
    });

});