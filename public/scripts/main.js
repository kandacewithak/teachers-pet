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
        var imageDiv = $('<div class="giftImage' + i + '">');
        var image = $('<img>').attr('src', item.Images[0].url_fullxfull).addClass('image' + i);
        imageDiv.append(image);
        var longTitle = item.title.substr(0, 70);
        var title = $('<h2>').addClass('itemTitle' + i).html(longTitle + '...');
        var price = $('<h3>').addClass('itemPrice' + i).html('$' + item.price + ' USD');
        var linkDiv = $('<div>').addClass('linkChange' + i);
        var change = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem' + i);
        // link item button here instead of input
        var linkToItem = $('<a>').attr('href', item.url).attr('id', "linkItem" + i).attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
        linkDiv.append(change, linkToItem);

        i++;

        giftPiece.append(imageDiv, title, price, linkDiv);
        $('.giftContainer').append(giftPiece);
    });

    var changeButton = $('<div>').addClass('submitChange').append($('<h2 class="giftifyHeading">Here are some things your teacher will love!</h2>')).append($('<input type="submit" id="submitChange" value="Change All Items">'));
    $('.gifts').append(changeButton);
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
    var updatedLongTitle1 = updatedItem.title.substr(0, 70);
    var updatedTitle1 = $('<h2>').addClass('itemTitle1').html(updatedLongTitle1 + '...');
    var updatedPrice1 = $('<h3>').addClass('itemPrice1').html('$' + updatedItem.price + ' USD');
    var linkDiv1 = $('<div>').addClass('linkChange1');
    var updatedChange1 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem1');
    var linkToItem1 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem1").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv1.append(updatedChange1, linkToItem1);

    $('.giftResult1').append(updatedImageDiv1, updatedTitle1, updatedPrice1, linkDiv1);
});

$('.giftContainer').on('click', '.changeItem2', function (e) {
    e.preventDefault();
    var updatedItem = app.changeGenerator(app.globalList);

    $('.giftResult2').empty();

    var updatedImageDiv2 = $('<div class="giftImage2">');
    var updatedImage2 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image2');
    updatedImageDiv2.append(updatedImage2);
    var updatedLongTitle2 = updatedItem.title.substr(0, 70);
    var updatedTitle2 = $('<h2>').addClass('itemTitle2').html(updatedLongTitle2 + '...');
    var updatedPrice2 = $('<h3>').addClass('itemPrice2').html('$' + updatedItem.price + ' USD');
    var linkDiv2 = $('<div>').addClass('linkChange2');
    var updatedChange2 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem2');
    var linkToItem2 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem2").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv2.append(updatedChange2, linkToItem2);

    $('.giftResult2').append(updatedImageDiv2, updatedTitle2, updatedPrice2, linkDiv2);
});

$('.giftContainer').on('click', '.changeItem3', function (e) {
    e.preventDefault();

    var updatedItem = app.changeGenerator(app.globalList);
    $('.giftResult3').empty();

    var updatedImageDiv3 = $('<div class="giftImage3">');
    var updatedImage3 = $('<img>').attr('src', updatedItem.Images[0].url_fullxfull).addClass('image3');
    updatedImageDiv3.append(updatedImage3);
    var updatedLongTitle3 = updatedItem.title.substr(0, 70);
    var updatedTitle3 = $('<h2>').addClass('itemTitle3').html(updatedLongTitle3 + '...');
    var updatedPrice3 = $('<h3>').addClass('itemPrice3').html('$' + updatedItem.price + ' USD');
    var linkDiv3 = $('<div>').addClass('linkChange3');
    var updatedChange3 = $('<input type="submit" id="changeItem" value="Change Item">').addClass('changeItem3');
    var linkToItem3 = $('<a>').attr('href', updatedItem.url).attr('id', "linkItem3").attr('target', '_blank').html('<i class="fas fa-external-link-alt">');
    linkDiv3.append(updatedChange3, linkToItem3);

    $('.giftResult3').append(updatedImageDiv3, updatedTitle3, updatedPrice3, linkDiv3);
});

// REFRESH ALL

$('.gifts').on('click', '#submitChange', function (e) {
    e.preventDefault();
    app.getUserResult(teacherCategory);
});

//flickity jQuery
$(function () {
    $('.main-carousel').flickity({
        wrapAround: true,
        pageDots: false
    });
});

// $(function () {
//     console.log("hello");
//   });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNDQSxJQUFNLE1BQU0sRUFBWjs7QUFFQTtBQUNBLElBQUksTUFBSixHQUFhLGdEQUFiO0FBQ0EsSUFBSSxPQUFKLEdBQWMsMEJBQWQ7O0FBR0EsSUFBSSx3QkFBSjs7QUFFQTtBQUNBLElBQUksYUFBSixHQUFvQixVQUFDLFFBQUQsRUFBYztBQUM5QixZQUFRLEdBQVIsQ0FBWSxRQUFaO0FBQ0EsTUFBRSxJQUFGLENBQU87QUFDSCxhQUFLLElBQUksTUFETjtBQUVILGdCQUFRLEtBRkw7QUFHSCxrQkFBVSxPQUhQO0FBSUgsY0FBTTtBQUNGLHFCQUFTLElBQUksT0FEWDtBQUVGLG9CQUFRLE9BRk47QUFHRixrQkFBUyxRQUFULGtCQUhFO0FBSUYsc0JBQVU7QUFKUjtBQUpILEtBQVAsRUFXSyxJQVhMLENBV1UsVUFBQyxHQUFELEVBQVM7QUFDWCxnQkFBUSxHQUFSLENBQVksR0FBWjtBQUNBO0FBQ0EsWUFBTSxjQUFjLElBQUksT0FBeEI7O0FBRUE7QUFDQSxZQUFJLGVBQUosQ0FBb0IsV0FBcEI7QUFDQSxZQUFJLFVBQUosR0FBaUIsV0FBakI7QUFDSCxLQW5CTDtBQW9CQyxDQXRCTDs7QUF3Qkk7O0FBRUosSUFBSSxVQUFKLEdBQWlCLEVBQWpCOztBQUVBLElBQUksZUFBSixHQUFzQixVQUFVLFVBQVYsRUFBc0I7O0FBRXhDLFFBQU0sY0FBYyxFQUFwQjs7QUFFQTtBQUNBLFFBQU0sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixXQUFXLE1BQXRDLENBQXRCO0FBQ0EsUUFBTSxRQUFRLFdBQVcsTUFBWCxDQUFrQixhQUFsQixFQUFpQyxDQUFqQyxFQUFvQyxDQUFwQyxDQUFkOztBQUdBLFFBQU0sZ0JBQWdCLEtBQUssS0FBTCxDQUFXLEtBQUssTUFBTCxLQUFnQixX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LFFBQU0saUJBQWlCLEVBQUUsMkRBQUYsRUFBK0QsUUFBL0QsQ0FBd0UsYUFBeEUsQ0FBdkI7QUFDQSxRQUFNLGNBQWMsRUFBRSxLQUFGLEVBQVMsSUFBVCxDQUFjLE1BQWQsRUFBc0IsWUFBWSxHQUFsQyxFQUF1QyxJQUF2QyxDQUE0QyxJQUE1QyxFQUFrRCxXQUFsRCxFQUErRCxJQUEvRCxDQUFvRSxRQUFwRSxFQUE4RSxRQUE5RSxFQUF3RixJQUF4RixDQUE2RixzQ0FBN0YsQ0FBcEI7QUFDQSxhQUFTLE1BQVQsQ0FBZ0IsY0FBaEIsRUFBZ0MsV0FBaEM7O0FBRUEsTUFBRSxjQUFGLEVBQWtCLE1BQWxCLENBQXlCLGdCQUF6QixFQUEyQyxhQUEzQyxFQUEwRCxhQUExRCxFQUF5RSxRQUF6RTtBQUNILENBbEJEOztBQXFCQTs7QUFFSSxFQUFFLFFBQUYsRUFBWSxFQUFaLENBQWUsT0FBZixFQUF3QixlQUF4QixFQUF5QyxVQUFTLENBQVQsRUFBVztBQUNoRCxNQUFFLGNBQUY7QUFDQSxRQUFJLGFBQUosQ0FBa0IsZUFBbEI7QUFDSCxDQUhEOztBQUtKO0FBQ0EsRUFBRSxZQUFXO0FBQ1QsTUFBRSxnQkFBRixFQUFvQixRQUFwQixDQUE2QjtBQUN6QixvQkFBWSxJQURhO0FBRXpCLGtCQUFVO0FBRmUsS0FBN0I7QUFJSCxDQUxEOztBQU9BO0FBQ0E7QUFDQTs7QUFFRSxFQUFFLEdBQUYsRUFBTyxZQUFQLENBQW9CO0FBQ2xCLFlBQVEsQ0FBQyxDQURTO0FBRWxCLFdBQU87QUFGVyxDQUFwQjs7QUFNRixJQUFJLElBQUosR0FBVyxZQUFVO0FBQ25CLFlBQVEsR0FBUixDQUFZLGVBQVo7QUFDRCxDQUZEOztBQUtBLEVBQUUsWUFBWTtBQUNWLFFBQUksSUFBSjtBQUNILENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJcbmNvbnN0IGFwcCA9IHt9O1xuXG4vLyBhc3NpZ24gdmFyaWFibGVzIGZvciB0aGUgQVBJIFVSTCBhbmQga2V5XG5hcHAuYXBpVVJMID0gJ2h0dHBzOi8vb3BlbmFwaS5ldHN5LmNvbS92Mi9saXN0aW5ncy9hY3RpdmUuanMnO1xuYXBwLmFwaV9rZXkgPSAnOHpkcTlqOTYwajgxZHBmdW9oc2EwcG5tJztcblxuXG5sZXQgdGVhY2hlckNhdGVnb3J5O1xuXG4vLyBhIGZ1bmN0aW9uIGZvciBtYWtpbmcgdGhlIGFqYXggcmVxdWVzdCB0aGF0IHRha2VzIHR3byBwYXJhbWV0ZXJzLCBnZW5kZXIgJiBjYXRlZ29yeVxuYXBwLmdldFVzZXJSZXN1bHQgPSAoY2F0ZWdvcnkpID0+IHtcbiAgICBjb25zb2xlLmxvZyhjYXRlZ29yeSk7XG4gICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhcHAuYXBpVVJMLFxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBkYXRhVHlwZTogJ2pzb25wJyxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgYXBpX2tleTogYXBwLmFwaV9rZXksXG4gICAgICAgICAgICBmb3JtYXQ6ICdqc29ucCcsXG4gICAgICAgICAgICB0YWdzOiBgJHtjYXRlZ29yeX0gdGVhY2hlciBnaWZ0YCxcbiAgICAgICAgICAgIGluY2x1ZGVzOiAnSW1hZ2VzKHVybF9mdWxseGZ1bGwpJ1xuICAgICAgICB9XG4gICAgfSlcbiAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzKVxuICAgICAgICAgICAgLy8gYWZ0ZXIgdGhlIHJlc3VsdHMgYXJlIHJldHVybmVkLCBjcmVhdGUgYSBuZXcgdmFyaWFibGUgZm9yIHRoZSByZXN1bHRpbmcgYXJyYXlcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdEFycmF5ID0gcmVzLnJlc3VsdHM7XG5cbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBlbXB0eSBhcnJheSBmb3IgdGhlIHRocmVlIHJhbmRvbSBpdGVtcyBmcm9tIEV0c3lcbiAgICAgICAgICAgIGFwcC5udW1iZXJHZW5lcmF0b3IocmVzdWx0QXJyYXkpO1xuICAgICAgICAgICAgYXBwLmdsb2JhbExpc3QgPSByZXN1bHRBcnJheTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8vIGdlbmVyYXRlIHRocmVlIGRpZmZlcmVudCByYW5kb20gbnVtYmVycyB0byBzZWxlY3QgdGhyZWUgaXRlbXMgZnJvbSB0aGUgcmVzdWx0aW5nIGFycmF5IHRoYXQgd2Ugd2lsbCBkaXNwbGF5IG9uIHRoZSBwYWdlXG5cbmFwcC5nbG9iYWxMaXN0ID0gW107ICAgICBcblxuYXBwLm51bWJlckdlbmVyYXRvciA9IGZ1bmN0aW9uIChmaXJzdEFycmF5KSB7XG5cbiAgICBjb25zdCBmaW5hbFJlc3VsdCA9IFtdO1xuXG4gICAgLy8gd2Ugc3BsaWNlIHRoZSBpdGVtIHNvIHRoYXQgaXQgZG9lcyBub3QgcmVwZWF0IGluIG91ciByZXN1bHRzOyB3ZSB1c2VkIChpdGVtMSwgaXRlbTEpIGJlY2F1c2UgaXQgaXMgdGhlIHJlcXVpcmVkIHN5bnRheCBhbmQganVzdCAoaXRlbTEpIGRpZG4ndCBnaXZlIHVzIHRoZSByZXN1bHRzIHdlIHdhbnRlZFxuICAgIGNvbnN0IHJhbmRvbU51bWJlcjEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmaXJzdEFycmF5Lmxlbmd0aClcbiAgICBjb25zdCBpdGVtMSA9IGZpcnN0QXJyYXkuc3BsaWNlKHJhbmRvbU51bWJlcjEsIDEpWzBdO1xuICAgIFxuXG4gICAgY29uc3QgcmFuZG9tTnVtYmVyMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZpcnN0QXJyYXkubGVuZ3RoKVxuICAgIGNvbnN0IGl0ZW0yID0gZmlyc3RBcnJheS5zcGxpY2UocmFuZG9tTnVtYmVyMiwgMSlbMF07XG4gICAgXG4gICAgY29uc3QgcmFuZG9tTnVtYmVyMyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGZpcnN0QXJyYXkubGVuZ3RoKVxuICAgIGNvbnN0IGl0ZW0zID0gZmlyc3RBcnJheS5zcGxpY2UocmFuZG9tTnVtYmVyMywgMSlbMF07XG4gICAgXG5cbiAgICAvLyBhZnRlciB3ZSBoYXZlIHRocmVlIHJhbmRvbSBpdGVtcywgd2UgcHVzaCB0aGVtIGludG8gb3VyIG5ldyBhcnJheSBmaW5hbFJlc3VsdFxuICAgIGZpbmFsUmVzdWx0LnB1c2goaXRlbTEsIGl0ZW0yLCBpdGVtMyk7XG5cbiAgICBhcHAuc2hvd1Jlc3VsdHMoZmluYWxSZXN1bHQpO1xufTtcblxuYXBwLnNob3dSZXN1bHRzID0gZnVuY3Rpb24oYXJyYXkpe1xuICAgIC8vIHVzZSB0aGUgZm9yRWFjaCBtZXRob2QgdG8gZGlzcGxheSBpdGVtIGluZm8gb24gcGFnZVxuICAgICQoJy5naWZ0Q29udGFpbmVyJykuZW1wdHkoKTtcbiAgICAkKCcuc3VibWl0Q2hhbmdlJykuZW1wdHkoKTtcblxuICAgIGxldCBpID0gMVxuXG4gICAgYXJyYXkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGdpZnRQaWVjZSA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ2dpZnRSZXN1bHQnICsgaSkuYWRkQ2xhc3MoJ2dpZnRSZXN1bHQnKVxuICAgICAgICBjb25zdCBpbWFnZURpdiA9ICQoYDxkaXYgY2xhc3M9XCJnaWZ0SW1hZ2Uke2l9XCI+YCk7XG4gICAgICAgIGNvbnN0IGltYWdlID0gJCgnPGltZz4nKS5hdHRyKCdzcmMnLCBpdGVtLkltYWdlc1swXS51cmxfZnVsbHhmdWxsKS5hZGRDbGFzcygnaW1hZ2UnICsgaSk7XG4gICAgICAgIGltYWdlRGl2LmFwcGVuZChpbWFnZSk7XG4gICAgICAgIGNvbnN0IGxvbmdUaXRsZSA9IChpdGVtLnRpdGxlKS5zdWJzdHIoMCw3MCk7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gJCgnPGgyPicpLmFkZENsYXNzKCdpdGVtVGl0bGUnICsgaSkuaHRtbChgJHtsb25nVGl0bGV9Li4uYCk7XG4gICAgICAgIGNvbnN0IHByaWNlID0gJCgnPGgzPicpLmFkZENsYXNzKCdpdGVtUHJpY2UnICsgaSkuaHRtbChgJCR7aXRlbS5wcmljZX0gVVNEYCk7XG4gICAgICAgIGNvbnN0IGxpbmtEaXYgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdsaW5rQ2hhbmdlJyArIGkpO1xuICAgICAgICBjb25zdCBjaGFuZ2UgPSAkKCc8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIGlkPVwiY2hhbmdlSXRlbVwiIHZhbHVlPVwiQ2hhbmdlIEl0ZW1cIj4nKS5hZGRDbGFzcygnY2hhbmdlSXRlbScgKyBpKTtcbiAgICAgICAgLy8gbGluayBpdGVtIGJ1dHRvbiBoZXJlIGluc3RlYWQgb2YgaW5wdXRcbiAgICAgICAgY29uc3QgbGlua1RvSXRlbSA9ICQoJzxhPicpLmF0dHIoJ2hyZWYnLCBpdGVtLnVybCkuYXR0cignaWQnLCBcImxpbmtJdGVtXCIgKyBpKS5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJykuaHRtbCgnPGkgY2xhc3M9XCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcIj4nKTtcbiAgICAgICAgbGlua0Rpdi5hcHBlbmQoY2hhbmdlLCBsaW5rVG9JdGVtKTtcblxuICAgICAgICBpKytcblxuICAgICAgICBnaWZ0UGllY2UuYXBwZW5kKGltYWdlRGl2LCB0aXRsZSwgcHJpY2UsIGxpbmtEaXYpO1xuICAgICAgICAkKCcuZ2lmdENvbnRhaW5lcicpLmFwcGVuZChnaWZ0UGllY2UpO1xuICAgIH0pO1xuICAgIFxuICAgIGNvbnN0IGNoYW5nZUJ1dHRvbiA9ICQoJzxkaXY+JykuYWRkQ2xhc3MoJ3N1Ym1pdENoYW5nZScpLmFwcGVuZCgkKCc8aDIgY2xhc3M9XCJnaWZ0aWZ5SGVhZGluZ1wiPkhlcmUgYXJlIHNvbWUgdGhpbmdzIHlvdXIgdGVhY2hlciB3aWxsIGxvdmUhPC9oMj4nKSkuYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJzdWJtaXRDaGFuZ2VcIiB2YWx1ZT1cIkNoYW5nZSBBbGwgSXRlbXNcIj4nKSk7XG4gICAgJCgnLmdpZnRzJykuYXBwZW5kKGNoYW5nZUJ1dHRvbik7XG4gICAgfTtcblxuLy8gZm9ybSBzdWJtaXRcbiQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRlYWNoZXJDYXRlZ29yeSA9ICQoJ2lucHV0W25hbWU9Y2F0ZWdvcnldOmNoZWNrZWQnKS52YWwoKTtcbiAgICBhcHAuZ2V0VXNlclJlc3VsdCh0ZWFjaGVyQ2F0ZWdvcnkpO1xufSk7XG5cbi8vIGdlbmVyYXRlIG9uZSByYW5kb20gbnVtYmVyIHRvIGNoYW5nZSBvbmUgaXRlbVxuYXBwLmNoYW5nZUdlbmVyYXRvciA9IGZ1bmN0aW9uIChhcnJheSl7XG4gICAgY29uc3QgbmV3SXRlbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFycmF5Lmxlbmd0aClcbiAgICBjb25zdCBuZXdJdGVtID0gYXJyYXlbbmV3SXRlbU51bWJlcl07XG4gICAgcmV0dXJuIG5ld0l0ZW07XG59XG5cbi8vY2hhbmdlIHNpbmdsZSBpdGVtcyBhcyBvcHBvc2VkIHRvIGFsbCB0aHJlZVxuJCgnLmdpZnRDb250YWluZXInKS5vbignY2xpY2snLCAnLmNoYW5nZUl0ZW0xJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSXRlbSA9IGFwcC5jaGFuZ2VHZW5lcmF0b3IoYXBwLmdsb2JhbExpc3QpO1xuXG4gICAgJCgnLmdpZnRSZXN1bHQxJykuZW1wdHkoKTtcblxuICAgIGNvbnN0IHVwZGF0ZWRJbWFnZURpdjEgPSAkKGA8ZGl2IGNsYXNzPVwiZ2lmdEltYWdlMVwiPmApO1xuICAgIGNvbnN0IHVwZGF0ZWRJbWFnZTEgPSAkKCc8aW1nPicpLmF0dHIoJ3NyYycsIHVwZGF0ZWRJdGVtLkltYWdlc1swXS51cmxfZnVsbHhmdWxsKS5hZGRDbGFzcygnaW1hZ2UxJyk7XG4gICAgdXBkYXRlZEltYWdlRGl2MS5hcHBlbmQodXBkYXRlZEltYWdlMSk7XG4gICAgY29uc3QgdXBkYXRlZExvbmdUaXRsZTEgPSAodXBkYXRlZEl0ZW0udGl0bGUpLnN1YnN0cigwLDcwKTtcbiAgICBjb25zdCB1cGRhdGVkVGl0bGUxID0gJCgnPGgyPicpLmFkZENsYXNzKCdpdGVtVGl0bGUxJykuaHRtbChgJHt1cGRhdGVkTG9uZ1RpdGxlMX0uLi5gKTtcbiAgICBjb25zdCB1cGRhdGVkUHJpY2UxID0gJCgnPGgzPicpLmFkZENsYXNzKCdpdGVtUHJpY2UxJykuaHRtbChgJCR7dXBkYXRlZEl0ZW0ucHJpY2V9IFVTRGApO1xuICAgIGNvbnN0IGxpbmtEaXYxID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnbGlua0NoYW5nZTEnKTtcbiAgICBjb25zdCB1cGRhdGVkQ2hhbmdlMSA9ICQoJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJjaGFuZ2VJdGVtXCIgdmFsdWU9XCJDaGFuZ2UgSXRlbVwiPicpLmFkZENsYXNzKCdjaGFuZ2VJdGVtMScpO1xuICAgIGNvbnN0IGxpbmtUb0l0ZW0xID0gJCgnPGE+JykuYXR0cignaHJlZicsIHVwZGF0ZWRJdGVtLnVybCkuYXR0cignaWQnLCBcImxpbmtJdGVtMVwiKS5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJykuaHRtbCgnPGkgY2xhc3M9XCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcIj4nKTtcbiAgICBsaW5rRGl2MS5hcHBlbmQodXBkYXRlZENoYW5nZTEsIGxpbmtUb0l0ZW0xKTtcblxuICAgICQoJy5naWZ0UmVzdWx0MScpLmFwcGVuZCh1cGRhdGVkSW1hZ2VEaXYxLCB1cGRhdGVkVGl0bGUxLCB1cGRhdGVkUHJpY2UxLCBsaW5rRGl2MSk7XG59KVxuXG5cbiQoJy5naWZ0Q29udGFpbmVyJykub24oJ2NsaWNrJywgJy5jaGFuZ2VJdGVtMicsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVwZGF0ZWRJdGVtID0gYXBwLmNoYW5nZUdlbmVyYXRvcihhcHAuZ2xvYmFsTGlzdCk7XG5cbiAgICAkKCcuZ2lmdFJlc3VsdDInKS5lbXB0eSgpO1xuXG4gICAgY29uc3QgdXBkYXRlZEltYWdlRGl2MiA9ICQoYDxkaXYgY2xhc3M9XCJnaWZ0SW1hZ2UyXCI+YCk7XG4gICAgY29uc3QgdXBkYXRlZEltYWdlMiA9ICQoJzxpbWc+JykuYXR0cignc3JjJywgdXBkYXRlZEl0ZW0uSW1hZ2VzWzBdLnVybF9mdWxseGZ1bGwpLmFkZENsYXNzKCdpbWFnZTInKTtcbiAgICB1cGRhdGVkSW1hZ2VEaXYyLmFwcGVuZCh1cGRhdGVkSW1hZ2UyKTtcbiAgICBjb25zdCB1cGRhdGVkTG9uZ1RpdGxlMiA9ICh1cGRhdGVkSXRlbS50aXRsZSkuc3Vic3RyKDAsNzApO1xuICAgIGNvbnN0IHVwZGF0ZWRUaXRsZTIgPSAkKCc8aDI+JykuYWRkQ2xhc3MoJ2l0ZW1UaXRsZTInKS5odG1sKGAke3VwZGF0ZWRMb25nVGl0bGUyfS4uLmApO1xuICAgIGNvbnN0IHVwZGF0ZWRQcmljZTIgPSAkKCc8aDM+JykuYWRkQ2xhc3MoJ2l0ZW1QcmljZTInKS5odG1sKGAkJHt1cGRhdGVkSXRlbS5wcmljZX0gVVNEYCk7XG4gICAgY29uc3QgbGlua0RpdjIgPSAkKCc8ZGl2PicpLmFkZENsYXNzKCdsaW5rQ2hhbmdlMicpO1xuICAgIGNvbnN0IHVwZGF0ZWRDaGFuZ2UyID0gJCgnPGlucHV0IHR5cGU9XCJzdWJtaXRcIiBpZD1cImNoYW5nZUl0ZW1cIiB2YWx1ZT1cIkNoYW5nZSBJdGVtXCI+JykuYWRkQ2xhc3MoJ2NoYW5nZUl0ZW0yJyk7XG4gICAgY29uc3QgbGlua1RvSXRlbTIgPSAkKCc8YT4nKS5hdHRyKCdocmVmJywgdXBkYXRlZEl0ZW0udXJsKS5hdHRyKCdpZCcsIFwibGlua0l0ZW0yXCIpLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKS5odG1sKCc8aSBjbGFzcz1cImZhcyBmYS1leHRlcm5hbC1saW5rLWFsdFwiPicpO1xuICAgIGxpbmtEaXYyLmFwcGVuZCh1cGRhdGVkQ2hhbmdlMiwgbGlua1RvSXRlbTIpO1xuXG4gICAgJCgnLmdpZnRSZXN1bHQyJykuYXBwZW5kKHVwZGF0ZWRJbWFnZURpdjIsIHVwZGF0ZWRUaXRsZTIsIHVwZGF0ZWRQcmljZTIsIGxpbmtEaXYyKTtcbn0pXG5cblxuJCgnLmdpZnRDb250YWluZXInKS5vbignY2xpY2snLCAnLmNoYW5nZUl0ZW0zJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSXRlbSA9IGFwcC5jaGFuZ2VHZW5lcmF0b3IoYXBwLmdsb2JhbExpc3QpO1xuICAgICQoJy5naWZ0UmVzdWx0MycpLmVtcHR5KCk7XG5cbiAgICBjb25zdCB1cGRhdGVkSW1hZ2VEaXYzID0gJChgPGRpdiBjbGFzcz1cImdpZnRJbWFnZTNcIj5gKTtcbiAgICBjb25zdCB1cGRhdGVkSW1hZ2UzID0kKCc8aW1nPicpLmF0dHIoJ3NyYycsIHVwZGF0ZWRJdGVtLkltYWdlc1swXS51cmxfZnVsbHhmdWxsKS5hZGRDbGFzcygnaW1hZ2UzJyk7XG4gICAgdXBkYXRlZEltYWdlRGl2My5hcHBlbmQodXBkYXRlZEltYWdlMyk7XG4gICAgY29uc3QgdXBkYXRlZExvbmdUaXRsZTMgPSAodXBkYXRlZEl0ZW0udGl0bGUpLnN1YnN0cigwLDcwKTtcbiAgICBjb25zdCB1cGRhdGVkVGl0bGUzID0gJCgnPGgyPicpLmFkZENsYXNzKCdpdGVtVGl0bGUzJykuaHRtbChgJHt1cGRhdGVkTG9uZ1RpdGxlM30uLi5gKTtcbiAgICBjb25zdCB1cGRhdGVkUHJpY2UzID0gJCgnPGgzPicpLmFkZENsYXNzKCdpdGVtUHJpY2UzJykuaHRtbChgJCR7dXBkYXRlZEl0ZW0ucHJpY2V9IFVTRGApO1xuICAgIGNvbnN0IGxpbmtEaXYzID0gJCgnPGRpdj4nKS5hZGRDbGFzcygnbGlua0NoYW5nZTMnKTtcbiAgICBjb25zdCB1cGRhdGVkQ2hhbmdlMyA9ICQoJzxpbnB1dCB0eXBlPVwic3VibWl0XCIgaWQ9XCJjaGFuZ2VJdGVtXCIgdmFsdWU9XCJDaGFuZ2UgSXRlbVwiPicpLmFkZENsYXNzKCdjaGFuZ2VJdGVtMycpO1xuICAgIGNvbnN0IGxpbmtUb0l0ZW0zID0gJCgnPGE+JykuYXR0cignaHJlZicsIHVwZGF0ZWRJdGVtLnVybCkuYXR0cignaWQnLCBcImxpbmtJdGVtM1wiKS5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJykuaHRtbCgnPGkgY2xhc3M9XCJmYXMgZmEtZXh0ZXJuYWwtbGluay1hbHRcIj4nKTtcbiAgICBsaW5rRGl2My5hcHBlbmQodXBkYXRlZENoYW5nZTMsIGxpbmtUb0l0ZW0zKTtcblxuICAgICQoJy5naWZ0UmVzdWx0MycpLmFwcGVuZCh1cGRhdGVkSW1hZ2VEaXYzLCB1cGRhdGVkVGl0bGUzLCB1cGRhdGVkUHJpY2UzLCBsaW5rRGl2Myk7XG59KVxuXG5cbi8vIFJFRlJFU0ggQUxMXG5cbiAgICAkKCcuZ2lmdHMnKS5vbignY2xpY2snLCAnI3N1Ym1pdENoYW5nZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFwcC5nZXRVc2VyUmVzdWx0KHRlYWNoZXJDYXRlZ29yeSk7XG4gICAgfSk7XG5cbi8vZmxpY2tpdHkgalF1ZXJ5XG4kKGZ1bmN0aW9uKCkge1xuICAgICQoJy5tYWluLWNhcm91c2VsJykuZmxpY2tpdHkoe1xuICAgICAgICB3cmFwQXJvdW5kOiB0cnVlLFxuICAgICAgICBwYWdlRG90czogZmFsc2VcbiAgICB9KTtcbn0pO1xuXG4vLyAkKGZ1bmN0aW9uICgpIHtcbi8vICAgICBjb25zb2xlLmxvZyhcImhlbGxvXCIpO1xuLy8gICB9KTtcblxuICAkKCdhJykuc21vb3RoU2Nyb2xsKHtcbiAgICBvZmZzZXQ6IC0xLFxuICAgIHNwZWVkOiA3MDBcbiAgICB9KTtcblxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKCdpdCBpcyB3b3JraW5nJyk7XG59O1xuXG5cbiQoZnVuY3Rpb24gKCkge1xuICAgIGFwcC5pbml0KCk7XG59KTsgXG4iXX0=
