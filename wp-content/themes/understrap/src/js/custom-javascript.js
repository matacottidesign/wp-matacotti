//Test
console.log("Hello");

//Dark-mode
var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function myFunction() {
  if(this.checked){
    document.getElementsByTagName("BODY")[0].setAttribute('class', 'democlass')
  }else{
    document.getElementsByTagName("BODY")[0].setAttribute('class', 'light')
  }
})

//Hide footer on Y scroll
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
	var currentScrollpos = window.pageYOffset;

	if (prevScrollpos > currentScrollpos) {
		document.getElementById('telefono').style.opacity = '1';
		document.getElementById('darkmode').style.opacity = '1';
	} else {
		document.getElementById('telefono').style.opacity = '0';
		document.getElementById('darkmode').style.opacity = '0';
	}

	prevScrollpos = currentScrollpos;
};