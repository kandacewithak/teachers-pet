
const app = {};

// assign variables for the API URL and key
app.apiURL = 'https://openapi.etsy.com/v2/listings/active.js';
app.api_key = '8zdq9j960j81dpfuohsa0pnm';

// let userGender;
// let userCategory;

// a function for making the ajax request that takes two parameters, gender & category
app.getUserResult = (gender, category) => {
    console.log(gender, category);
    $.ajax({
        url: app.apiURL,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            api_key: app.api_key,
            format: 'jsonp',
            tags: gender,
            category: category,
            includes: 'Images(url_fullxfull)'
        }
    })
        .then((res) => {
            // after the results are returned, create a new variable for the resulting array

            const resultArray = res.results;
            console.log(resultArray);

            // create an empty array for the three random items from Etsy
            const finalResult = [];

            const numberGenerator = function(){
                // generate three different random numbers to select three items from the resulting array that we will display on the page
                const randomNumber1 = Math.floor(Math.random() * resultArray.length)
                const item1 = resultArray[randomNumber1];
                // we splice the item so that it does not repeat in our results; we used (item1, item1) because it is the required syntax and just (item1) didn't give us the results we wanted
                resultArray.splice(item1, 1);

                const randomNumber2 = Math.floor(Math.random() * resultArray.length)
                const item2 = resultArray[randomNumber2];
                resultArray.splice(item2, 1);

                const randomNumber3 = Math.floor(Math.random() * resultArray.length)
                const item3 = resultArray[randomNumber3];
                resultArray.splice(item3, 1);

                // after we have three random items, we push them into our new array finalResult
                finalResult.push(item1, item2, item3);
                console.log(finalResult); 
            };

            numberGenerator();

        

            const refreshOne = function(){
                const randomNumber = Math.floor(Math.random() * resultArray.length)
                const newItem = resultArray[randomNumber];
                // we splice the item so that it does not repeat in our results; we used (item1, item1) because it is the required syntax and just (item1) didn't give us the results we wanted
                finalResult.push(newItem);

                console.log(newItem);
            };

            $('.giftContainer').on('click', '#changeItem', function(e){
                e.preventDefault();
                refreshOne();
            });
        });
    };

app.showResults = function(){
    // use the forEach method to display item info on page
    $('.giftContainer').empty();
    finalResult.forEach((item) => {
        const giftPiece = $('<div>').addClass('giftResult');
        const imageDiv = $('<div class="giftImage">');
        const image = $('<img>').attr('src', item.Images[0].url_fullxfull);
        imageDiv.append(image);
        const title = $('<h2>').html(item.title);
        const price = $('<h3>').html(`$${item.price} USD`);
        const change = $('<input type="submit" id="changeItem" value="Change Item">');
        /* console.log(image); */
        giftPiece.append(imageDiv, title, price, change);
        $('.giftContainer').append(giftPiece);
    });
};

$('form').on('submit', function(e){
    e.preventDefault();
    let userGender = $('input[name=gender]:checked').val();
    let userCategory = $('input[name=category]:checked').val();
    app.getUserResult(userGender, userCategory);
});


// REFRSH ALL
// $('.giftContainer').on('click', '#changeItem', function(e){
//     e.preventDefault();
//     console.log('it clicked');
//     app.getUserResult();
// });





//User comes to site, starts off with option to select a category (that we have predetermined and given as choices)
//Men, Women, Unisex
//Clothing, art, jewellry, toys, home

//submit ajax request based on the search parameters
//get category

//Etsy API only allows 25 results back
//from here we will use a function to grab 3 of the 25 results then display on the page for the user to see.

//the display will have an image, the title with limited to showing only first 20 letters. Also have a link to the etsy item

//The user will have 2 options
//1  is to refresh the results >> which generates 3 more random from the same category user selected.

//2 If the user is happy they can select Get these gifts.

//*Extra. The prices will be added together to produce a sum total to let the user know the total price of the 3 gift combo pack.

//When user selects Get these gifts >> 3 pages will be generated, each of the gift items (from the url array)


app.init = function(){
  console.log('it is working');
};


$(function () {
    app.init();
}); 
