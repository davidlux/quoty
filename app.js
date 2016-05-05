// code by David Lux (twitter: @itsdavelux)


//********** Setting up variables
var	backgrounds = [
	'rgb(254, 238, 125)',
	'rgb(239, 82, 133)',
	'rgb(96, 197, 186)',
	'rgb(165, 223, 249)',
	'rgb(246, 234, 140)',
	'rgb(242, 109, 91)',
	'rgb(192, 53, 70)',
	'rgb(73, 37, 64)'
];

var randomColor;
var bgColor;
var currentBgColor;
var quote;
var xhr;



//********** Getting quote and setting up share link
var getQuote = function() {
	xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies', false);
	xhr.setRequestHeader("X-Mashape-Key", "mgRIUohxg9mshWdZJxOetLvXNNLDp1oW9CxjsncWq3246Zsz0f");
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("Accept", "application/json");
	xhr.send();

	quote = JSON.parse(xhr.responseText);

	$('.twitter').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote.quote + '" ' + ' - ' + quote.author));

	return quote;
}



//********* Setting up functions
var getRandomBG = function() {

	currentBgColor = $('body').css('background-color');
	bgColor = backgrounds[Math.floor(Math.random()*backgrounds.length)];

	while(currentBgColor === bgColor) {
		bgColor = backgrounds[Math.floor(Math.random()*backgrounds.length)];
	}

	return bgColor;
};

var getQuoteContent = function(quote) {
	return quote.quote;
};

var getAuthor = function(quote) {
	return quote.author;
};



//********** Let the magic happen
$('.next-button').on('click', function(){

	//********** Get and set random color for background and button
	randomColor = getRandomBG();
	$('body').css('background', randomColor);
	$('.next-quote').css('background', randomColor);

	//********** Rotate quote container
	$('.quote-container').toggleClass('rotate');

	//********** Get new quote/author and replace the existing one
	quote = getQuote();
	$('.quote').html(getQuoteContent(quote));
	$('.author').html(getAuthor(quote));

});



//********** IIFE to get a random quote on load
(function(){

	//********** Get new quote/author and replace the existing one
	quote = getQuote();
	$('.quote').html(getQuoteContent(quote));
	$('.author').html(getAuthor(quote));

})();
