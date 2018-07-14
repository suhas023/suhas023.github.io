$( document ).ready(function() {  

	let modalContainer = $(".modal-container");
	let modal = $(".modal");

	//Show the modal
	$(".trigger").on("click", (event) => {
		modalContainer.css("display", "flex");
		modal.fadeIn(1000);
		event.stopPropagation();
	});

	//Hide the modal
	$(".quit, .close, .accept").on("click", (event) => {
			modal.fadeOut(500);
			modalContainer.fadeOut(500);
	});

	//Prevent selection of text on double click
	$("body").mousedown((event) => { 
		event.preventDefault(); 
	});
});