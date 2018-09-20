(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var app = {};

// assign variables for the API URL and key
app.apiURL = 'https://openapi.etsy.com/v2/listings/active.js';
app.api_key = '8zdq9j960j81dpfuohsa0pnm';

var teacherCategory = void 0;

// a function for making the ajax request that takes two parameters, gender & category
app.getUserResult = function (category) {
    console.log(category);
    $.ajax({
        url: app.apiURL,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            api_key: app.api_key,
            format: 'jsonp',
            tags: category + ' teacher gift',
            includes: 'Images(url_fullxfull)'
        }
    }).then(function (res) {
        console.log(res);
        // after the results are returned, create a new variable for the resulting array
        var resultArray = res.results;

        // create an empty array for the three random items from Etsy
        app.numberGenerator(resultArray);
        app.globalList = resultArray;
    });
};

// generate three different random numbers to select three items from the resulting array that we will display on the page

app.globalList = [];

app.numberGenerator = function (firstArray) {

    var finalResult = [];

    // we splice the item so that it does not repeat in our results; we used (item1, item1) because it is the required syntax and just (item1) didn't give us the results we wanted
    var randomNumber1 = Math.floor(Math.random() * firstArray.length);
    var item1 = firstArray.splice(randomNumber1, 1)[0];

    var randomNumber2 = Math.floor(Math.random() * firstArray.length);
    var item2 = firstArray.splice(randomNumber2, 1)[0];

    var randomNumber3 = Math.floor(Math.random() * firstArray.length);
    var item3 = firstArray.splice(randomNumber3, 1)[0];

    // after we have three random items, we push them into our new array finalResult
    finalResult.push(item1, item2, item3);

    app.showResults(finalResult);
};

app.showResults = function (array) {
    // use the forEach method to display item info on page
    $('.giftContainer').empty();
    $('.submitChange').empty();

    var i = 1;

    array.forEach(function (item) {

        var giftPiece = $('<div>').addClass('giftResult' + i).addClass('giftResult');
        var longTitle = item.title.substr(0, 80);
        var title = $('<h2>').addClass('itemTitle' + i).html('Gift Idea .' + i);
        var imageDiv = $('<div class="giftImage' + i + '">');
        var image = $('<img>').attr('src', item.Images[0].url_fullxfull).addClass('image' + i);
        imageDiv.append(image);
        var price = $('<h3>').addClass('itemPrice' + i).html('$' + item.price + ' USD');
        var linkDiv = $('<div>').addClass('linkChange' + i);
        var change = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem' + i);
        // link item button here instead of input
        var linkToItem = $('<a>').attr('href', item.url).attr('id', "linkItem" + i).attr('target', '_blank').html('<i class="fas fa-link"></i>');
        linkDiv.append(change, linkToItem);

        i++;

        giftPiece.append(title, imageDiv, price, linkDiv);
        $('.giftContainer').append(giftPiece);
    });

    var changeButton = $('<div>').addClass('submitChange').append($('<h2 class="teacherHeading">These are some things your teacher may love, but if not:</h2>')).append($('<input type="submit" id="submitChange" value="All New Gifts!">'));
    $('.giftIdeas').append(changeButton);
};

// form submit
$('form').on('submit', function (e) {
    e.preventDefault();
    teacherCategory = $('input[name=category]:checked').val();
    app.getUserResult(teacherCategory);
});

// generate one random number to change one item
app.changeGenerator = function (array) {
    var newItemNumber = Math.floor(Math.random() * array.length);
    var newItem = array[newItemNumber];
    return newItem;
};

//change single items as opposed to all three
$('.giftContainer').on('click', '.changeItem1', function (e) {
    e.preventDefault();

    var updatedItem = app.changeGenerator(app.globalList);

    $('.giftResult1').empty();

    var updatedImageDiv1 = $('<div class="giftImage1">');
    var updatedImage1 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image1');
    updatedImageDiv1.append(updatedImage1);
    var updatedLongTitle1 = 'Gift Idea .1';
    var updatedTitle1 = $('<h2>').addClass('itemTitle1').html('' + updatedLongTitle1);
    var updatedPrice1 = $('<h3>').addClass('itemPrice1').html('$' + updatedItem.price + ' USD');
    var linkDiv1 = $('<div>').addClass('linkChange1');
    var updatedChange1 = $('<input type="submit" id="changeItem" value="Different Gift">').addClass('changeItem1');
    var linkToItem1 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem1").attr('target', '_blank').html('<i class="fas fa-link"></i>');
    linkDiv1.append(updatedChange1, linkToItem1);

    $('.giftResult1').append(updatedTitle1, updatedImageDiv1, updatedPrice1, linkDiv1);
});

$('.giftContainer').on('click', '.changeItem2', function (e) {
    e.preventDefault();
    var updatedItem = app.changeGenerator(app.globalList);

    $('.giftResult2').empty();

    var updatedImageDiv2 = $('<div class="giftImage2">');
    var updatedImage2 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image2');
    updatedImageDiv2.append(updatedImage2);
    var updatedLongTitle2 = 'Gift Idea .2';
    var updatedTitle2 = $('<h2>').addClass('itemTitle2').html('' + updatedLongTitle2);
    var updatedPrice2 = $('<h3>').addClass('itemPrice2').html('$' + updatedItem.price + ' USD');
    var linkDiv2 = $('<div>').addClass('linkChange2');
    var updatedChange2 = $('<input type="submit" id="changeItem" value="Different Gift">').addClass('changeItem2');
    var linkToItem2 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem2").attr('target', '_blank').html('<i class="fas fa-link"></i>');
    linkDiv2.append(updatedChange2, linkToItem2);

    $('.giftResult2').append(updatedTitle2, updatedImageDiv2, updatedPrice2, linkDiv2);
});

$('.giftContainer').on('click', '.changeItem3', function (e) {
    e.preventDefault();

    var updatedItem = app.changeGenerator(app.globalList);
    $('.giftResult3').empty();

    var updatedImageDiv3 = $('<div class="giftImage3">');
    var updatedImage3 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image3');
    updatedImageDiv3.append(updatedImage3);
    var updatedLongTitle3 = 'Gift Idea .3';
    var updatedTitle3 = $('<h2>').addClass('itemTitle3').html('' + updatedLongTitle3);
    var updatedPrice3 = $('<h3>').addClass('itemPrice3').html('$' + updatedItem.price + ' USD');
    var linkDiv3 = $('<div>').addClass('linkChange3');
    var updatedChange3 = $('<input type="submit" id="changeItem" value="Different Gift">').addClass('changeItem3');
    var linkToItem3 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem3").attr('target', '_blank').html('<i class="fas fa-link"></i>');
    linkDiv3.append(updatedChange3, linkToItem3);

    $('.giftResult3').append(updatedTitle3, updatedImageDiv3, updatedPrice3, linkDiv3);
});

// REFRESH ALL

$('.gifts').on('click', '#submitChange', function (e) {
    e.preventDefault();
    app.getUserResult(teacherCategory);
});

$('a').smoothScroll({
    offset: -1,
    speed: 700
});

app.init = function () {
    console.log('it is working');
};

$(function () {
    app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxJQUFNLE1BQU0sRUFBWjs7QUFFQTtBQUNBLElBQUksTUFBSixHQUFhLGdEQUFiO0FBQ0EsSUFBSSxPQUFKLEdBQWMsMEJBQWQ7O0FBR0EsSUFBSSx3QkFBSjs7QUFFQTtBQUNBLElBQUksYUFBSixHQUFvQixVQUFDLFFBQUQsRUFBYztBQUM5QixZQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsTUFBRSxJQUFGLENBQU87QUFDSCxhQUFLLElBQUksTUFETjtBQUVILGdCQUFRLEtBRkw7QUFHSCxrQkFBVSxPQUhQO0FBSUgsY0FBTTtBQUNGLHFCQUFTLElBQUksT0FEWDtBQUVGLG9CQUFRLE9BRk47QUFHRixrQkFBUyxRQUFULGtCQUhFO0FBSUYsc0JBQVU7QUFKUjtBQUpILEtBQVAsRUFXSyxJQVhMLENBV1UsVUFBQyxHQUFELEVBQVM7QUFDWCxnQkFBUSxHQUFSLENBQVksR0FBWjtBQUNBO0FBQ0EsWUFBTSxjQUFjLElBQUksT0FBeEI7O0FBRUE7QUFDQSxZQUFJLGVBQUosQ0FBb0IsV0FBcEI7QUFDQSxZQUFJLFVBQUosR0FBaUIsV0FBakI7QUFDSCxLQW5CTDtBQW9CQyxDQXRCTDs7QUF3Qkk7O0FBRUosSUFBSSxVQUFKLEdBQWlCLEVBQWpCOztBQUVBLElBQUksZUFBSixHQUFzQixVQUFVLFVBQVYsRUFBc0I7O0FBRXhDLFFBQU0sY0FBYyxFQUFwQjs7QUFFQTtBQUNBLFFBQU0sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixXQUFXLE1BQXRDLENBQXRCO0FBQ0EsUUFBTSxRQUFRLFdBQVcsTUFBWCxDQUFrQixhQUFsQixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxDQUFkOztBQUdBLFFBQU0sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixXQUFXLE1BQXRDLENBQXRCO0FBQ0EsUUFBTSxRQUFRLFdBQVcsTUFBWCxDQUFrQixhQUFsQixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxDQUFkOztBQUVBLFFBQU0sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixXQUFXLE1BQXRDLENBQXRCO0FBQ0EsUUFBTSxRQUFRLFdBQVcsTUFBWCxDQUFrQixhQUFsQixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxDQUFkOztBQUdBO0FBQ0EsZ0JBQVksSUFBWixDQUFpQixLQUFqQixFQUF3QixLQUF4QixFQUErQixLQUEvQjs7QUFFQSxRQUFJLFdBQUosQ0FBZ0IsV0FBaEI7QUFDSCxDQXBCRDs7QUFzQkEsSUFBSSxXQUFKLEdBQWtCLFVBQVMsS0FBVCxFQUFlO0FBQzdCO0FBQ0EsTUFBRSxnQkFBRixFQUFvQixLQUFwQjtBQUNBLE1BQUUsZUFBRixFQUFtQixLQUFuQjs7QUFFQSxRQUFJLElBQUksQ0FBUjs7QUFFQSxVQUFNLE9BQU4sQ0FBYyxVQUFDLElBQUQsRUFBVTs7QUFFcEIsWUFBTSxZQUFZLEVBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IsZUFBZSxDQUFuQyxFQUFzQyxRQUF0QyxDQUErQyxZQUEvQyxDQUFsQjtBQUNBLFlBQU0sWUFBYSxLQUFLLEtBQU4sQ0FBYSxNQUFiLENBQW9CLENBQXBCLEVBQXNCLEVBQXRCLENBQWxCO0FBQ0EsWUFBTSxRQUFRLEVBQUUsTUFBRixFQUFVLFFBQVYsQ0FBbUIsY0FBYyxDQUFqQyxFQUFvQyxJQUFwQyxDQUF5QyxnQkFBZ0IsQ0FBekQsQ0FBZDtBQUNBLFlBQU0sV0FBVyw0QkFBMEIsQ0FBMUIsUUFBakI7QUFDQSxZQUFNLFFBQVEsRUFBRSxPQUFGLEVBQVcsSUFBWCxDQUFnQixLQUFoQixFQUF1QixLQUFLLE1BQUwsQ0FBWSxDQUFaLEVBQWUsYUFBdEMsRUFBcUQsUUFBckQsQ0FBOEQsVUFBVSxDQUF4RSxDQUFkO0FBQ0EsaUJBQVMsTUFBVCxDQUFnQixLQUFoQjtBQUNBLFlBQU0sUUFBUSxFQUFFLE1BQUYsRUFBVSxRQUFWLENBQW1CLGNBQWMsQ0FBakMsRUFBb0MsSUFBcEMsT0FBNkMsS0FBSyxLQUFsRCxVQUFkO0FBQ0EsWUFBTSxVQUFVLEVBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IsZUFBZSxDQUFuQyxDQUFoQjtBQUNBLFlBQU0sU0FBUyxFQUFFLDJEQUFGLEVBQStELFFBQS9ELENBQXdFLGVBQWUsQ0FBdkYsQ0FBZjtBQUNBO0FBQ0EsWUFBTSxhQUFhLEVBQUUsS0FBRixFQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLEtBQUssR0FBM0IsRUFBZ0MsSUFBaEMsQ0FBcUMsSUFBckMsRUFBMkMsYUFBYSxDQUF4RCxFQUEyRCxJQUEzRCxDQUFnRSxRQUFoRSxFQUEwRSxRQUExRSxFQUFvRixJQUFwRixDQUF5Riw2QkFBekYsQ0FBbkI7QUFDQSxnQkFBUSxNQUFSLENBQWUsTUFBZixFQUF1QixVQUF2Qjs7QUFFQTs7QUFFQSxrQkFBVSxNQUFWLENBQWlCLEtBQWpCLEVBQXdCLFFBQXhCLEVBQW1DLEtBQW5DLEVBQTBDLE9BQTFDO0FBQ0EsVUFBRSxnQkFBRixFQUFvQixNQUFwQixDQUEyQixTQUEzQjtBQUNILEtBbkJEOztBQXFCQSxRQUFNLGVBQWUsRUFBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQixjQUFwQixFQUFvQyxNQUFwQyxDQUEyQyxFQUFFLDBGQUFGLENBQTNDLEVBQTBJLE1BQTFJLENBQWlKLEVBQUUsZ0VBQUYsQ0FBakosQ0FBckI7QUFDQSxNQUFFLFlBQUYsRUFBZ0IsTUFBaEIsQ0FBdUIsWUFBdkI7QUFDQyxDQTlCTDs7QUFnQ0E7QUFDQSxFQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUF1QixVQUFTLENBQVQsRUFBVztBQUM5QixNQUFFLGNBQUY7QUFDQSxzQkFBa0IsRUFBRSw4QkFBRixFQUFrQyxHQUFsQyxFQUFsQjtBQUNBLFFBQUksYUFBSixDQUFrQixlQUFsQjtBQUNILENBSkQ7O0FBTUE7QUFDQSxJQUFJLGVBQUosR0FBc0IsVUFBVSxLQUFWLEVBQWdCO0FBQ2xDLFFBQU0sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixNQUFNLE1BQWpDLENBQXRCO0FBQ0EsUUFBTSxVQUFVLE1BQU0sYUFBTixDQUFoQjtBQUNBLFdBQU8sT0FBUDtBQUNILENBSkQ7O0FBTUE7QUFDQSxFQUFFLGdCQUFGLEVBQW9CLEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDLGNBQWhDLEVBQWdELFVBQVUsQ0FBVixFQUFhO0FBQ3pELE1BQUUsY0FBRjs7QUFFQSxRQUFNLGNBQWMsSUFBSSxlQUFKLENBQW9CLElBQUksVUFBeEIsQ0FBcEI7O0FBRUEsTUFBRSxjQUFGLEVBQWtCLEtBQWxCOztBQUVBLFFBQU0sbUJBQW1CLDZCQUF6QjtBQUNBLFFBQU0sZ0JBQWdCLEVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsS0FBaEIsRUFBdUIsWUFBWSxNQUFaLENBQW1CLENBQW5CLEVBQXNCLGFBQTdDLEVBQTRELFFBQTVELENBQXFFLFFBQXJFLENBQXRCO0FBQ0EscUJBQWlCLE1BQWpCLENBQXdCLGFBQXhCO0FBQ0EsUUFBTSxrQ0FBTjtBQUNBLFFBQU0sZ0JBQWdCLEVBQUUsTUFBRixFQUFVLFFBQVYsQ0FBbUIsWUFBbkIsRUFBaUMsSUFBakMsTUFBeUMsaUJBQXpDLENBQXRCO0FBQ0EsUUFBTSxnQkFBZ0IsRUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixZQUFuQixFQUFpQyxJQUFqQyxPQUEwQyxZQUFZLEtBQXRELFVBQXRCO0FBQ0EsUUFBTSxXQUFXLEVBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IsYUFBcEIsQ0FBakI7QUFDQSxRQUFNLGlCQUFpQixFQUFFLDhEQUFGLEVBQWtFLFFBQWxFLENBQTJFLGFBQTNFLENBQXZCO0FBQ0EsUUFBTSxjQUFjLEVBQUUsS0FBRixFQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLFlBQVksR0FBbEMsRUFBdUMsSUFBdkMsQ0FBNEMsSUFBNUMsRUFBa0QsV0FBbEQsRUFBK0QsSUFBL0QsQ0FBb0UsUUFBcEUsRUFBOEUsUUFBOUUsRUFBd0YsSUFBeEYsQ0FBNkYsNkJBQTdGLENBQXBCO0FBQ0EsYUFBUyxNQUFULENBQWdCLGNBQWhCLEVBQWdDLFdBQWhDOztBQUVBLE1BQUUsY0FBRixFQUFrQixNQUFsQixDQUF5QixhQUF6QixFQUF3QyxnQkFBeEMsRUFBMEQsYUFBMUQsRUFBeUUsUUFBekU7QUFDSCxDQW5CRDs7QUFzQkEsRUFBRSxnQkFBRixFQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxjQUFoQyxFQUFnRCxVQUFVLENBQVYsRUFBYTtBQUN6RCxNQUFFLGNBQUY7QUFDQSxRQUFNLGNBQWMsSUFBSSxlQUFKLENBQW9CLElBQUksVUFBeEIsQ0FBcEI7O0FBRUEsTUFBRSxjQUFGLEVBQWtCLEtBQWxCOztBQUVBLFFBQU0sbUJBQW1CLDZCQUF6QjtBQUNBLFFBQU0sZ0JBQWdCLEVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsS0FBaEIsRUFBdUIsWUFBWSxNQUFaLENBQW1CLENBQW5CLEVBQXNCLGFBQTdDLEVBQTRELFFBQTVELENBQXFFLFFBQXJFLENBQXRCO0FBQ0EscUJBQWlCLE1BQWpCLENBQXdCLGFBQXhCO0FBQ0EsUUFBTSxrQ0FBTjtBQUNBLFFBQU0sZ0JBQWdCLEVBQUUsTUFBRixFQUFVLFFBQVYsQ0FBbUIsWUFBbkIsRUFBaUMsSUFBakMsTUFBeUMsaUJBQXpDLENBQXRCO0FBQ0EsUUFBTSxnQkFBZ0IsRUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixZQUFuQixFQUFpQyxJQUFqQyxPQUEwQyxZQUFZLEtBQXRELFVBQXRCO0FBQ0EsUUFBTSxXQUFXLEVBQUUsT0FBRixFQUFXLFFBQVgsQ0FBb0IsYUFBcEIsQ0FBakI7QUFDQSxRQUFNLGlCQUFpQixFQUFFLDhEQUFGLEVBQWtFLFFBQWxFLENBQTJFLGFBQTNFLENBQXZCO0FBQ0EsUUFBTSxjQUFjLEVBQUUsS0FBRixFQUFTLElBQVQsQ0FBYyxNQUFkLEVBQXNCLFlBQVksR0FBbEMsRUFBdUMsSUFBdkMsQ0FBNEMsSUFBNUMsRUFBa0QsV0FBbEQsRUFBK0QsSUFBL0QsQ0FBb0UsUUFBcEUsRUFBOEUsUUFBOUUsRUFBd0YsSUFBeEYsQ0FBNkYsNkJBQTdGLENBQXBCO0FBQ0EsYUFBUyxNQUFULENBQWdCLGNBQWhCLEVBQWdDLFdBQWhDOztBQUVBLE1BQUUsY0FBRixFQUFrQixNQUFsQixDQUF5QixhQUF6QixFQUF3QyxnQkFBeEMsRUFBMEQsYUFBMUQsRUFBeUUsUUFBekU7QUFDSCxDQWxCRDs7QUFxQkEsRUFBRSxnQkFBRixFQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxjQUFoQyxFQUFnRCxVQUFVLENBQVYsRUFBYTtBQUN6RCxNQUFFLGNBQUY7O0FBRUEsUUFBTSxjQUFjLElBQUksZUFBSixDQUFvQixJQUFJLFVBQXhCLENBQXBCO0FBQ0EsTUFBRSxjQUFGLEVBQWtCLEtBQWxCOztBQUVBLFFBQU0sbUJBQW1CLDZCQUF6QjtBQUNBLFFBQU0sZ0JBQWUsRUFBRSxPQUFGLEVBQVcsSUFBWCxDQUFnQixLQUFoQixFQUF1QixZQUFZLE1BQVosQ0FBbUIsQ0FBbkIsRUFBc0IsYUFBN0MsRUFBNEQsUUFBNUQsQ0FBcUUsUUFBckUsQ0FBckI7QUFDQSxxQkFBaUIsTUFBakIsQ0FBd0IsYUFBeEI7QUFDQSxRQUFNLGtDQUFOO0FBQ0EsUUFBTSxnQkFBZ0IsRUFBRSxNQUFGLEVBQVUsUUFBVixDQUFtQixZQUFuQixFQUFpQyxJQUFqQyxNQUF5QyxpQkFBekMsQ0FBdEI7QUFDQSxRQUFNLGdCQUFnQixFQUFFLE1BQUYsRUFBVSxRQUFWLENBQW1CLFlBQW5CLEVBQWlDLElBQWpDLE9BQTBDLFlBQVksS0FBdEQsVUFBdEI7QUFDQSxRQUFNLFdBQVcsRUFBRSxPQUFGLEVBQVcsUUFBWCxDQUFvQixhQUFwQixDQUFqQjtBQUNBLFFBQU0saUJBQWlCLEVBQUUsOERBQUYsRUFBa0UsUUFBbEUsQ0FBMkUsYUFBM0UsQ0FBdkI7QUFDQSxRQUFNLGNBQWMsRUFBRSxLQUFGLEVBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsWUFBWSxHQUFsQyxFQUF1QyxJQUF2QyxDQUE0QyxJQUE1QyxFQUFrRCxXQUFsRCxFQUErRCxJQUEvRCxDQUFvRSxRQUFwRSxFQUE4RSxRQUE5RSxFQUF3RixJQUF4RixDQUE2Riw2QkFBN0YsQ0FBcEI7QUFDQSxhQUFTLE1BQVQsQ0FBZ0IsY0FBaEIsRUFBZ0MsV0FBaEM7O0FBRUEsTUFBRSxjQUFGLEVBQWtCLE1BQWxCLENBQXlCLGFBQXpCLEVBQXdDLGdCQUF4QyxFQUEwRCxhQUExRCxFQUF5RSxRQUF6RTtBQUNILENBbEJEOztBQXFCQTs7QUFFSSxFQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixlQUF4QixFQUF5QyxVQUFTLENBQVQsRUFBVztBQUNoRCxNQUFFLGNBQUY7QUFDQSxRQUFJLGFBQUosQ0FBa0IsZUFBbEI7QUFDSCxDQUhEOztBQU9GLEVBQUUsR0FBRixFQUFPLFlBQVAsQ0FBb0I7QUFDbEIsWUFBUSxDQUFDLENBRFM7QUFFbEIsV0FBTztBQUZXLENBQXBCOztBQU1GLElBQUksSUFBSixHQUFXLFlBQVU7QUFDbkIsWUFBUSxHQUFSLENBQVksZUFBWjtBQUNELENBRkQ7O0FBS0EsRUFBRSxZQUFZO0FBQ1YsUUFBSSxJQUFKO0FBQ0gsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxuY29uc3QgYXBwID0ge307XG5cbi8vIGFzc2lnbiB2YXJpYWJsZXMgZm9yIHRoZSBBUEkgVVJMIGFuZCBrZXlcbmFwcC5hcGlVUkwgPSAnaHR0cHM6Ly9vcGVuYXBpLmV0c3kuY29tL3YyL2xpc3RpbmdzL2FjdGl2ZS5qcyc7XG5hcHAuYXBpX2tleSA9ICc4emRxOWo5NjBqODFkcGZ1b2hzYTBwbm0nO1xuXG5cbmxldCB0ZWFjaGVyQ2F0ZWdvcnk7XG5cbi8vIGEgZnVuY3Rpb24gZm9yIG1ha2luZyB0aGUgYWpheCByZXF1ZXN0IHRoYXQgdGFrZXMgdHdvIHBhcmFtZXRlcnMsIGdlbmRlciAmIGNhdGVnb3J5XG5hcHAuZ2V0VXNlclJlc3VsdCA9IChjYXRlZ29yeSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGNhdGVnb3J5KTtcbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFwcC5hcGlVUkwsXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbnAnLFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBhcGlfa2V5OiBhcHAuYXBpX2tleSxcbiAgICAgICAgICAgIGZvcm1hdDogJ2pzb25wJyxcbiAgICAgICAgICAgIHRhZ3M6IGAke2NhdGVnb3J5fSB0ZWFjaGVyIGdpZnRgLFxuICAgICAgICAgICAgaW5jbHVkZXM6ICdJbWFnZXModXJsX2Z1bGx4ZnVsbCknXG4gICAgICAgIH1cbiAgICB9KVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpXG4gICAgICAgICAgICAvLyBhZnRlciB0aGUgcmVzdWx0cyBhcmUgcmV0dXJuZWQsIGNyZWF0ZSBhIG5ldyB2YXJpYWJsZSBmb3IgdGhlIHJlc3VsdGluZyBhcnJheVxuICAgICAgICAgICAgY29uc3QgcmVzdWx0QXJyYXkgPSByZXMucmVzdWx0cztcblxuICAgICAgICAgICAgLy8gY3JlYXRlIGFuIGVtcHR5IGFycmF5IGZvciB0aGUgdGhyZWUgcmFuZG9tIGl0ZW1zIGZyb20gRXRzeVxuICAgICAgICAgICAgYXBwLm51bWJlckdlbmVyYXRvcihyZXN1bHRBcnJheSk7XG4gICAgICAgICAgICBhcHAuZ2xvYmFsTGlzdCA9IHJlc3VsdEFycmF5O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gZ2VuZXJhdGUgdGhyZWUgZGlmZmVyZW50IHJhbmRvbSBudW1iZXJzIHRvIHNlbGVjdCB0aHJlZSBpdGVtcyBmcm9tIHRoZSByZXN1bHRpbmcgYXJyYXkgdGhhdCB3ZSB3aWxsIGRpc3BsYXkgb24gdGhlIHBhZ2VcblxuYXBwLmdsb2JhbExpc3QgPSBbXTsgICAgIFxuXG5hcHAubnVtYmVyR2VuZXJhdG9yID0gZnVuY3Rpb24gKGZpcnN0QXJyYXkpIHtcblxuICAgIGNvbnN0IGZpbmFsUmVzdWx0ID0gW107XG5cbiAgICAvLyB3ZSBzcGxpY2UgdGhlIGl0ZW0gc28gdGhhdCBpdCBkb2VzIG5vdCByZXBlYXQgaW4gb3VyIHJlc3VsdHM7IHdlIHVzZWQgKGl0ZW0xLCBpdGVtMSkgYmVjYXVzZSBpdCBpcyB0aGUgcmVxdWlyZWQgc3ludGF4IGFuZCBqdXN0IChpdGVtMSkgZGlkbid0IGdpdmUgdXMgdGhlIHJlc3VsdHMgd2Ugd2FudGVkXG4gICAgY29uc3QgcmFuZG9tTnVtYmVyMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZpcnN0QXJyYXkubGVuZ3RoKVxuICAgIGNvbnN0IGl0ZW0xID0gZmlyc3RBcnJheS5zcGxpY2UocmFuZG9tTnVtYmVyMSwgMSlbMF07XG4gICAgXG5cbiAgICBjb25zdCByYW5kb21OdW1iZXIyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmlyc3RBcnJheS5sZW5ndGgpXG4gICAgY29uc3QgaXRlbTIgPSBmaXJzdEFycmF5LnNwbGljZShyYW5kb21OdW1iZXIyLCAxKVswXTtcbiAgICBcbiAgICBjb25zdCByYW5kb21OdW1iZXIzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmlyc3RBcnJheS5sZW5ndGgpXG4gICAgY29uc3QgaXRlbTMgPSBmaXJzdEFycmF5LnNwbGljZShyYW5kb21OdW1iZXIzLCAxKVswXTtcbiAgICBcblxuICAgIC8vIGFmdGVyIHdlIGhhdmUgdGhyZWUgcmFuZG9tIGl0ZW1zLCB3ZSBwdXNoIHRoZW0gaW50byBvdXIgbmV3IGFycmF5IGZpbmFsUmVzdWx0XG4gICAgZmluYWxSZXN1bHQucHVzaChpdGVtMSwgaXRlbTIsIGl0ZW0zKTtcblxuICAgIGFwcC5zaG93UmVzdWx0cyhmaW5hbFJlc3VsdCk7XG59O1xuXG5hcHAuc2hvd1Jlc3VsdHMgPSBmdW5jdGlvbihhcnJheSl7XG4gICAgLy8gdXNlIHRoZSBmb3JFYWNoIG1ldGhvZCB0byBkaXNwbGF5IGl0ZW0gaW5mbyBvbiBwYWdlXG4gICAgJCgnLmdpZnRDb250YWluZXInKS5lbXB0eSgpO1xuICAgICQoJy5zdWJtaXRDaGFuZ2UnKS5lbXB0eSgpO1xuXG4gICAgbGV0IGkgPSAxXG5cbiAgICBhcnJheS5mb3JFYWNoKChpdGVtKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZ2lmdFBpZWNlID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnZ2lmdFJlc3VsdCcgKyBpKS5hZGRDbGFzcygnZ2lmdFJlc3VsdCcpO1xuICAgICAgICBjb25zdCBsb25nVGl0bGUgPSAoaXRlbS50aXRsZSkuc3Vic3RyKDAsODApO1xuICAgICAgICBjb25zdCB0aXRsZSA9ICQoJzxoMj4nKS5hZGRDbGFzcygnaXRlbVRpdGxlJyArIGkpLmh0bWwoYEdpZnQgSWRlYSAuYCArIGkpO1xuICAgICAgICBjb25zdCBpbWFnZURpdiA9ICQoYDxkaXYgY2xhc3M9XCJnaWZ0SW1hZ2Uke2l9XCI+YCk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gJCgnPGltZz4nKS5hdHRyKCdzcmMnLCBpdGVtLkltYWdlc1swXS51cmxfZnVsbHhmdWxsKS5hZGRDbGFzcygnaW1hZ2UnICsgaSk7XG4gICAgICAgIGltYWdlRGl2LmFwcGVuZChpbWFnZSk7XG4gICAgICAgIGNvbnN0IHByaWNlID0gJCgnPGgzPicpLmFkZENsYXNzKCdpdGVtUHJpY2UnICsgaSkuaHRtbChgJCR7aXRlbS5wcmljZX0gVVNEYCk7XG4gICAgICAgIGNvbnN0IGxpbmtEaXYgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdsaW5rQ2hhbmdlJyArIGkpO1xuICAgICAgICBjb25zdCBjaGFuZ2UgPSAkKCc8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGlkPVwiY2hhbmdlSXRlbVwiIHZhbHVlPVwiQ2hhbmdlIEl0ZW1cIj4nKS5hZGRDbGFzcygnY2hhbmdlSXRlbScgKyBpKTtcbiAgICAgICAgLy8gbGluayBpdGVtIGJ1dHRvbiBoZXJlIGluc3RlYWQgb2YgaW5wdXRcbiAgICAgICAgY29uc3QgbGlua1RvSXRlbSA9ICQoJzxhPicpLmF0dHIoJ2hyZWYnLCBpdGVtLnVybCkuYXR0cignaWQnLCBcImxpbmtJdGVtXCIgKyBpKS5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJykuaHRtbCgnPGkgY2xhc3M9XCJmYXMgZmEtbGlua1wiPjwvaT4nKTtcbiAgICAgICAgbGlua0Rpdi5hcHBlbmQoY2hhbmdlLCBsaW5rVG9JdGVtKTtcblxuICAgICAgICBpKytcblxuICAgICAgICBnaWZ0UGllY2UuYXBwZW5kKHRpdGxlLCBpbWFnZURpdiwgIHByaWNlLCBsaW5rRGl2KTtcbiAgICAgICAgJCgnLmdpZnRDb250YWluZXInKS5hcHBlbmQoZ2lmdFBpZWNlKTtcbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCBjaGFuZ2VCdXR0b24gPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdzdWJtaXRDaGFuZ2UnKS5hcHBlbmQoJCgnPGgyIGNsYXNzPVwidGVhY2hlckhlYWRpbmdcIj5UaGVzZSBhcmUgc29tZSB0aGluZ3MgeW91ciB0ZWFjaGVyIG1heSBsb3ZlLCBidXQgaWYgbm90OjwvaDI+JykpLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGlkPVwic3VibWl0Q2hhbmdlXCIgdmFsdWU9XCJBbGwgTmV3IEdpZnRzIVwiPicpKTtcbiAgICAkKCcuZ2lmdElkZWFzJykuYXBwZW5kKGNoYW5nZUJ1dHRvbik7XG4gICAgfTtcblxuLy8gZm9ybSBzdWJtaXRcbiQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRlYWNoZXJDYXRlZ29yeSA9ICQoJ2lucHV0W25hbWU9Y2F0ZWdvcnldOmNoZWNrZWQnKS52YWwoKTtcbiAgICBhcHAuZ2V0VXNlclJlc3VsdCh0ZWFjaGVyQ2F0ZWdvcnkpO1xufSk7XG5cbi8vIGdlbmVyYXRlIG9uZSByYW5kb20gbnVtYmVyIHRvIGNoYW5nZSBvbmUgaXRlbVxuYXBwLmNoYW5nZUdlbmVyYXRvciA9IGZ1bmN0aW9uIChhcnJheSl7XG4gICAgY29uc3QgbmV3SXRlbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aClcbiAgICBjb25zdCBuZXdJdGVtID0gYXJyYXlbbmV3SXRlbU51bWJlcl07XG4gICAgcmV0dXJuIG5ld0l0ZW07XG59XG5cbi8vY2hhbmdlIHNpbmdsZSBpdGVtcyBhcyBvcHBvc2VkIHRvIGFsbCB0aHJlZVxuJCgnLmdpZnRDb250YWluZXInKS5vbignY2xpY2snLCAnLmNoYW5nZUl0ZW0xJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSXRlbSA9IGFwcC5jaGFuZ2VHZW5lcmF0b3IoYXBwLmdsb2JhbExpc3QpO1xuXG4gICAgJCgnLmdpZnRSZXN1bHQxJykuZW1wdHkoKTtcblxuICAgIGNvbnN0IHVwZGF0ZWRJbWFnZURpdjEgPSAkKGA8ZGl2IGNsYXNzPVwiZ2lmdEltYWdlMVwiPmApO1xuICAgIGNvbnN0IHVwZGF0ZWRJbWFnZTEgPSAkKCc8aW1nPicpLmF0dHIoJ3NyYycsIHVwZGF0ZWRJdGVtLkltYWdlc1swXS51cmxfZnVsbHhmdWxsKS5hZGRDbGFzcygnaW1hZ2UxJyk7XG4gICAgdXBkYXRlZEltYWdlRGl2MS5hcHBlbmQodXBkYXRlZEltYWdlMSk7XG4gICAgY29uc3QgdXBkYXRlZExvbmdUaXRsZTEgPSAoYEdpZnQgSWRlYSAuMWApO1xuICAgIGNvbnN0IHVwZGF0ZWRUaXRsZTEgPSAkKCc8aDI+JykuYWRkQ2xhc3MoJ2l0ZW1UaXRsZTEnKS5odG1sKGAke3VwZGF0ZWRMb25nVGl0bGUxfWApO1xuICAgIGNvbnN0IHVwZGF0ZWRQcmljZTEgPSAkKCc8aDM+JykuYWRkQ2xhc3MoJ2l0ZW1QcmljZTEnKS5odG1sKGAkJHt1cGRhdGVkSXRlbS5wcmljZX0gVVNEYCk7XG4gICAgY29uc3QgbGlua0RpdjEgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdsaW5rQ2hhbmdlMScpO1xuICAgIGNvbnN0IHVwZGF0ZWRDaGFuZ2UxID0gJCgnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cImNoYW5nZUl0ZW1cIiB2YWx1ZT1cIkRpZmZlcmVudCBHaWZ0XCI+JykuYWRkQ2xhc3MoJ2NoYW5nZUl0ZW0xJyk7XG4gICAgY29uc3QgbGlua1RvSXRlbTEgPSAkKCc8YT4nKS5hdHRyKCdocmVmJywgdXBkYXRlZEl0ZW0udXJsKS5hdHRyKCdpZCcsIFwibGlua0l0ZW0xXCIpLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKS5odG1sKCc8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPicpO1xuICAgIGxpbmtEaXYxLmFwcGVuZCh1cGRhdGVkQ2hhbmdlMSwgbGlua1RvSXRlbTEpO1xuXG4gICAgJCgnLmdpZnRSZXN1bHQxJykuYXBwZW5kKHVwZGF0ZWRUaXRsZTEsIHVwZGF0ZWRJbWFnZURpdjEsIHVwZGF0ZWRQcmljZTEsIGxpbmtEaXYxKTtcbn0pXG5cblxuJCgnLmdpZnRDb250YWluZXInKS5vbignY2xpY2snLCAnLmNoYW5nZUl0ZW0yJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdXBkYXRlZEl0ZW0gPSBhcHAuY2hhbmdlR2VuZXJhdG9yKGFwcC5nbG9iYWxMaXN0KTtcblxuICAgICQoJy5naWZ0UmVzdWx0MicpLmVtcHR5KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSW1hZ2VEaXYyID0gJChgPGRpdiBjbGFzcz1cImdpZnRJbWFnZTJcIj5gKTtcbiAgICBjb25zdCB1cGRhdGVkSW1hZ2UyID0gJCgnPGltZz4nKS5hdHRyKCdzcmMnLCB1cGRhdGVkSXRlbS5JbWFnZXNbMF0udXJsX2Z1bGx4ZnVsbCkuYWRkQ2xhc3MoJ2ltYWdlMicpO1xuICAgIHVwZGF0ZWRJbWFnZURpdjIuYXBwZW5kKHVwZGF0ZWRJbWFnZTIpO1xuICAgIGNvbnN0IHVwZGF0ZWRMb25nVGl0bGUyID0gKGBHaWZ0IElkZWEgLjJgKVxuICAgIGNvbnN0IHVwZGF0ZWRUaXRsZTIgPSAkKCc8aDI+JykuYWRkQ2xhc3MoJ2l0ZW1UaXRsZTInKS5odG1sKGAke3VwZGF0ZWRMb25nVGl0bGUyfWApO1xuICAgIGNvbnN0IHVwZGF0ZWRQcmljZTIgPSAkKCc8aDM+JykuYWRkQ2xhc3MoJ2l0ZW1QcmljZTInKS5odG1sKGAkJHt1cGRhdGVkSXRlbS5wcmljZX0gVVNEYCk7XG4gICAgY29uc3QgbGlua0RpdjIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdsaW5rQ2hhbmdlMicpO1xuICAgIGNvbnN0IHVwZGF0ZWRDaGFuZ2UyID0gJCgnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cImNoYW5nZUl0ZW1cIiB2YWx1ZT1cIkRpZmZlcmVudCBHaWZ0XCI+JykuYWRkQ2xhc3MoJ2NoYW5nZUl0ZW0yJyk7XG4gICAgY29uc3QgbGlua1RvSXRlbTIgPSAkKCc8YT4nKS5hdHRyKCdocmVmJywgdXBkYXRlZEl0ZW0udXJsKS5hdHRyKCdpZCcsIFwibGlua0l0ZW0yXCIpLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKS5odG1sKCc8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPicpO1xuICAgIGxpbmtEaXYyLmFwcGVuZCh1cGRhdGVkQ2hhbmdlMiwgbGlua1RvSXRlbTIpO1xuXG4gICAgJCgnLmdpZnRSZXN1bHQyJykuYXBwZW5kKHVwZGF0ZWRUaXRsZTIsIHVwZGF0ZWRJbWFnZURpdjIsIHVwZGF0ZWRQcmljZTIsIGxpbmtEaXYyKTtcbn0pXG5cblxuJCgnLmdpZnRDb250YWluZXInKS5vbignY2xpY2snLCAnLmNoYW5nZUl0ZW0zJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSXRlbSA9IGFwcC5jaGFuZ2VHZW5lcmF0b3IoYXBwLmdsb2JhbExpc3QpO1xuICAgICQoJy5naWZ0UmVzdWx0MycpLmVtcHR5KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSW1hZ2VEaXYzID0gJChgPGRpdiBjbGFzcz1cImdpZnRJbWFnZTNcIj5gKTtcbiAgICBjb25zdCB1cGRhdGVkSW1hZ2UzID0kKCc8aW1nPicpLmF0dHIoJ3NyYycsIHVwZGF0ZWRJdGVtLkltYWdlc1swXS51cmxfZnVsbHhmdWxsKS5hZGRDbGFzcygnaW1hZ2UzJyk7XG4gICAgdXBkYXRlZEltYWdlRGl2My5hcHBlbmQodXBkYXRlZEltYWdlMyk7XG4gICAgY29uc3QgdXBkYXRlZExvbmdUaXRsZTMgPSAoYEdpZnQgSWRlYSAuM2ApO1xuICAgIGNvbnN0IHVwZGF0ZWRUaXRsZTMgPSAkKCc8aDI+JykuYWRkQ2xhc3MoJ2l0ZW1UaXRsZTMnKS5odG1sKGAke3VwZGF0ZWRMb25nVGl0bGUzfWApO1xuICAgIGNvbnN0IHVwZGF0ZWRQcmljZTMgPSAkKCc8aDM+JykuYWRkQ2xhc3MoJ2l0ZW1QcmljZTMnKS5odG1sKGAkJHt1cGRhdGVkSXRlbS5wcmljZX0gVVNEYCk7XG4gICAgY29uc3QgbGlua0RpdjMgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdsaW5rQ2hhbmdlMycpO1xuICAgIGNvbnN0IHVwZGF0ZWRDaGFuZ2UzID0gJCgnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cImNoYW5nZUl0ZW1cIiB2YWx1ZT1cIkRpZmZlcmVudCBHaWZ0XCI+JykuYWRkQ2xhc3MoJ2NoYW5nZUl0ZW0zJyk7XG4gICAgY29uc3QgbGlua1RvSXRlbTMgPSAkKCc8YT4nKS5hdHRyKCdocmVmJywgdXBkYXRlZEl0ZW0udXJsKS5hdHRyKCdpZCcsIFwibGlua0l0ZW0zXCIpLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKS5odG1sKCc8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPicpO1xuICAgIGxpbmtEaXYzLmFwcGVuZCh1cGRhdGVkQ2hhbmdlMywgbGlua1RvSXRlbTMpO1xuXG4gICAgJCgnLmdpZnRSZXN1bHQzJykuYXBwZW5kKHVwZGF0ZWRUaXRsZTMsIHVwZGF0ZWRJbWFnZURpdjMsIHVwZGF0ZWRQcmljZTMsIGxpbmtEaXYzKTtcbn0pXG5cblxuLy8gUkVGUkVTSCBBTExcblxuICAgICQoJy5naWZ0cycpLm9uKCdjbGljaycsICcjc3VibWl0Q2hhbmdlJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYXBwLmdldFVzZXJSZXN1bHQodGVhY2hlckNhdGVnb3J5KTtcbiAgICB9KTtcblxuXG5cbiAgJCgnYScpLnNtb290aFNjcm9sbCh7XG4gICAgb2Zmc2V0OiAtMSxcbiAgICBzcGVlZDogNzAwXG4gICAgfSk7XG5cblxuYXBwLmluaXQgPSBmdW5jdGlvbigpe1xuICBjb25zb2xlLmxvZygnaXQgaXMgd29ya2luZycpO1xufTtcblxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgICBhcHAuaW5pdCgpO1xufSk7IFxuIl19
