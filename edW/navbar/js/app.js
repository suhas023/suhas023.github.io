$( document ).ready(function() {

	let dropDownLinks = $(".drop-down-links");
	let dropDownButton = $(".drop-down");
	let dropDownShown = false;
	let nonNavNames = $("li").not("#name");   //objects that are not name of the nav bar, to hide
	let navTrigger = $("#nav-trigger i");
	let navItemsShown = false;


	//when nav-trigger is pressed (when screen size is small)
	navTrigger.on("click", event => {
		if(navItemsShown) {
			nonNavNames.hide();
			navItemsShown = false;
		} else {
			nonNavNames.show();
			navItemsShown = true;
		}
	});
	
	//When drop down button is clicked on
	dropDownButton.on("click", event => {
		dropDownLinks.toggleClass("hidden");
		dropDownShown = (dropDownShown)? false : true;
		event.stopPropagation();
	});
	
	//when one of the item is pressed
	$(".drop-down-links .link-item").on("click", event => {
		dropDownLinks.toggleClass("hidden");
		dropDownShown = false;
		event.stopPropagation();
	});

	//If there's a click any where else hide the dropdown
	$("body").on("click", event => {
		if($(event.target) !== dropDownButton && dropDownShown === true) {
			dropDownLinks.toggleClass("hidden");
			dropDownShown = (dropDownShown)? false : true;
		}
	});

	//Added to reset the functionality while changing the browser width while evaluating.
	$( window ).resize(function() {
		if($( window ).width() > 870) {
			nonNavNames.css("display", "");
			navItemsShown = false;
		} 
	});
});
