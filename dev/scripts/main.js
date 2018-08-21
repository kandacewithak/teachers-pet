const hey = "hello"
const test = "test"
console.log(test);
console.log(hey);


const app = {};

app.apiURL = 'https://openapi.etsy.com/v2/listings/active.js';
app.api_key = '8zdq9j960j81dpfuohsa0pnm';

app.getCategory = () => {
    $.ajax({
        url: app.apiURL,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            api_key: app.api_key,
            format: 'jsonp',
            category_path: 'men', 
            tags:'floral'
        }
    })
        .then((res) => {
            console.log(res);

            /* app.display(res.artObjects); */
        });
};


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


app.getCategory();




/* 
$(function () {
    app();
}); */
