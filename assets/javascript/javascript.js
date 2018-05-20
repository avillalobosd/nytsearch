
var startYear = "";
var endYear = "";
console.log(startYear);

var APIkey = "8066e48ee7f14bd4a877966c12f2b41d";


$(".search").click(function () {


    var searchTerm = $("#term").val();
    console.log(searchTerm);

    var numberRecords = $("#numRec").val();
    console.log(numberRecords);

    startYear = $("#startY").val();
    endYear = $("#endY").val();


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
        'api-key': APIkey,
        'q': searchTerm,
    });

    if (startYear != "") {
        startYear = $("#startY").val() + "0101";
        url += "?" + $.param({
            "begin_date": startYear
        });

    }
    if (endYear != "") {
        endYear = $("#endY").val() + "1231";
        url += "?" + $.param({
            "end_date": endYear
        })

    }

    $.ajax({
        url: url,
        method: "GET"
    }).then(function (response) {
        var results = response.response.docs;
        console.log(results);
        console.log(results[0].hasOwnProperty("byline"));
        for (var i = 0; i < numberRecords; i++) {
            newsIndex = i + 1;
            var newsDiv = $("<div>");
            newsDiv.addClass("newsSection");
            var headline = $("<h3>");
            headline.text(newsIndex + ". " + results[i].headline.main);
            newsDiv.append(headline);
            var datePublish = $("<p>");
            datePublish.text("Date Publish: " + results[i].pub_date);
            newsDiv.append(datePublish);

            if (results[i].hasOwnProperty("byline") == true) {
                var author = $("<p>");
                author.text("Author: " + results[i].byline.original);
                newsDiv.append(author);

            }

            var link = $("<a>")
            link.attr("href", results[i].web_url);
            link.text(results[i].web_url);
            newsDiv.append(link);

            $(".noticiasAqui").append(newsDiv);

            console.log(results[i].headline.main);
            //console.log(results[i].byline.original);
            console.log(results[i].pub_date);
            console.log(results[i].web_url);

        }
    });

});


$(".clear").on("click", function () {
    $("#term").val("");
    $("#numRec").val("");
    $("#startY").val("");
    $("#endY").val("");
    $(".noticiasAqui").empty();
})


