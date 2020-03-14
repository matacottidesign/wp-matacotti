//Test
console.log("Hello");





//Dark-mode
var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function myFunction() {
  if(this.checked){

    var cards = document.getElementsByClassName("card");
    var len =  cards.length;

    for(var i=0 ; i<len; i++){
        cards[i].style.backgroundColor="#343a40";
    }

    document.getElementsByTagName("BODY")[0].setAttribute('class', 'democlass');
	document.getElementsByClassName("widget-card")[0].style.backgroundColor="#343a40";
  }else{

    var cards = document.getElementsByClassName("card");
    var len =  cards.length;

    for(var i=0 ; i<len; i++){
        cards[i].style.backgroundColor="#f8f9fa";
    }

    document.getElementsByTagName("BODY")[0].setAttribute('class', 'light');
	document.getElementsByClassName("widget-card")[0].style.backgroundColor="#f8f9fa";
  }
})





//Hide footer on Y scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollpos = window.pageYOffset;

	if (prevScrollpos > currentScrollpos) {
		document.getElementById('telefono').style.opacity = '1';
        document.getElementById('darkmode').style.opacity = '1';
        document.getElementsByTagName("NAV")[0].style.opacity = '1';
	} else {
		document.getElementById('telefono').style.opacity = '0';
        document.getElementById('darkmode').style.opacity = '0';
        document.getElementsByTagName("NAV")[0].style.opacity = '0';
	}

	prevScrollpos = currentScrollpos;
};