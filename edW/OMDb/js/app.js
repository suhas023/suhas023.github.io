//API http://www.omdbapi.com/?t=better+call+saul&y=2015&apikey=1debd9

$(document).ready(function() {

	//DOM elements to handle events
	let searchInput = $("#search-input");			//Search input form
	let yearInput = $("#year-input");				//Year input form
	let searchButton = $("#search-btn");			//Search Button
	let toggleTitleYear = $("#title-year-btn");		//Toggle to change to title-year mode
	let toggleId = $("#id-btn");					//Toggle to change to IMDb ID mode
	let resultSection = $("#result"); 				//Result element where response is inserted
	let errorField = $("#error");					//error element, for when any error occur

	//Set basic conditions
	let activeTitleYear = true;						//Which mode is active
	let activeId = false;
	let api = "https://www.omdbapi.com/?";
	let apiKey = "&apikey=1debd9";
	let searchString = "";							//Search made in the forms is stored as a URL

	//clear the fields
	searchInput.val("");
	yearInput.val("");

	//Change to Title-Year search mode
	toggleTitleYear.on("click", () => {
		if(!activeTitleYear) {
			toggleTitleYear.toggleClass("active inactive");				//Toggle from active to inactive state and vica-versa
			toggleId.toggleClass("active inactive");
			activeTitleYear = true;
			activeId = false;

			searchInput.val("");
			yearInput.val("");
			searchInput.attr("placeholder", "Title (required)");
			yearInput.slideDown();
		}
	});

	//Change to IMDB ID search mode
	toggleId.on("click", () => {
		if(!activeId) {
			toggleTitleYear.toggleClass("active inactive");
			toggleId.toggleClass("active inactive");
			activeTitleYear = false;
			activeId = true;

			searchInput.val("");
			searchInput.attr("placeholder", "IMDB ID (required)");
			yearInput.slideUp();

		}
	});

	//When search button is clicked on
	searchButton.on("click", () => {
		if(searchInput.val().length) {							//If input from has been filled
			if(activeTitleYear) {								//Check the mode
				searchString = "t=" + searchInput.val();		//append title
				if(yearInput.val().length && validYear()) {		//check if year is entered
					searchString += "&y=" + yearInput.val(); 	//append if entered
				}
			} else {											//If mode is IMDb mode
				searchString = "i=" + searchInput.val();		//append IMDb ID
			}
			resultSection.fadeOut();							//Fade out the results(useful for multiple searches)
			$.ajax({											//Make the request
				url: api + searchString + apiKey,
				type: 'GET',
				dataType: 'JSON',
				success: (data) => {
					if(data.Response === "True") {							//If title if found
						resultSection.html(getResult(data));	//Get the HTML to append from a function
						resultSection.fadeIn(2000);				//Display the section
						resultSection.css("display", "flex");

						//scroll down
						window.scrollTo({
							top: 200,
    						behavior: "smooth"
						});
					} else {														//If title is not found
						resultSection.html(getError(data.Error));					//Show the error banner
						resultSection.fadeIn(2000);									//Display the section
						resultSection.css("display", "flex");

						window.scrollTo({
							top: 200,
    						behavior: "smooth"
						});

					}
				},
				error: (request, error, message ) => {
					console.log(error, request, message);
					resultSection.html(getError(message));						//Show the error banner
					resultSection.fadeIn(2000);									//Display the section
					resultSection.css("display", "flex");

					window.scrollTo({
						top: 200,
    					behavior: "smooth"
					});
				}
			});
		}
	});


	//check weather the year is valid or not.
	function validYear() {
		return yearInput.val().split("").every(value => !isNaN(parseInt(value)));
	}
});

//Apply received data to HTML and return to append
function getResult(data) {
		let result = `
			<div class="block">
				<div class="meta box">
					<h3 class="title highlight"><span>${(data.Title !== undefined)? data.Title: "N/A"}</span> <small>(${(data.Year !== undefined)? data.Year: "N/A"})</small></h3>
					<p class="info-bar">
						<span class="info-item">${(data.Type !== undefined)? data.Type: "N/A"}</span>
						<span class="filler">|</span>
						<span class="info-item">${(data.Rated !== undefined)? data.Rated: "N/A"}</span>
						<span class="filler">|</span>
						<span class="info-item">${(data.Runtime !== undefined)? data.Runtime: "N/A"}</span>
						<span class="filler">|</span>
						<span class="info-item">${(data.Genre !== undefined)? data.Genre: "N/A"}</span>
						${(data.totalSeasons !== undefined)?`<span class="filler">|</span><span class="info-item">${data.totalSeasons} Seasons</span>`:``}
					</p>
				</div>
				<div class="poster">
					<img src="${((data.Poster === undefined) || (data.Poster === "N/A"))? "images/NA.jpg": data.Poster}">
				</div>
			</div>
			<div class="block">
				<div class="plot box">
					<p>${(data.Plot !== undefined)? data.Plot: "N/A"}</p>
				</div>
				<div class="cast-crew box">
					<p><span class="highlight">Actors: </span> ${(data.Actors !== undefined)? data.Actors: "N/A"}</p>
					<p><span class="highlight">Director: </span> ${(data.Director !== undefined)? data.Director: "N/A"}</p>
					<p><span class="highlight">Production: </span> ${(data.Production !== undefined)? data.Production: "N/A"}</p>
					${((data.Website !== undefined) && (data.Website !== "N/A"))?`<p class="link"><span class="highlight"><a href="${data.Website}" target="_blank">Website</a></span></p>`:``}
				</div>
				<div class="other-details box">
					<p><span class="highlight">imdbID:</span>${(data.imdbID !== undefined)? data.imdbID: "N/A"}</p>
					<p><span class="highlight">Language: </span> ${(data.Language !== undefined)? data.Language: "N/A"}</p>
					<p><span class="highlight">Awards: </span> ${(data.Awards !== undefined)? data.Awards: "N/A"}</p>
					<p class="rating"><span class="highlight">IMDB rating:</span> ${((data.Ratings !== undefined) && (data.Ratings[0] !== undefined))? data.Ratings[0].Value: "N/A"}</p>
					<p class="rating"><span class="highlight">METASCORE:</span> ${((data.Ratings !== undefined) && (data.Ratings[2] !== undefined))? data.Ratings[2].Value: "N/A"}</p>
					<p class="rating"><span class="highlight">TOMATOMETER:</span> ${((data.Ratings !== undefined) && (data.Ratings[1] !== undefined))? data.Ratings[1].Value: "N/A"}</p>
				</div>
			</div>
		`;

		return result;
}

function getError(message) {
	let error = `<div class="block error"><h2>${message}</h2><h2>(^-^*)</h2></div>`;
	return error;
}
