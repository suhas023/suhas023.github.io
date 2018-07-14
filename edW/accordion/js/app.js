//Run once DOM is ready
$( document ).ready(function() {
	let currentAcvtive = null;
	let currentShow = false;

	$(".heading").on("click", function(event) {
		//Check if same box is clicked
		if (currentAcvtive == this) {
			$(this).next().toggleClass("hidden");
			//store if box is shown or not
			currentShow = (currentShow ? false : true);
		} else {
			//check if previous box is active
			if(currentShow) {
				//Hide the previous box
				$(currentAcvtive).next().toggleClass("hidden");
			}
			//display the clicked box
			$(this).next().toggleClass("hidden");
			currentAcvtive = this;
			currentShow = true;
		}
	});
});
