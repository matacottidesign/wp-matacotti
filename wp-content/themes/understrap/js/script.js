var checkbox = document.querySelector('input[name=theme]');

checkbox.addEventListener('change', function myFunction() {
  if(this.checked){
    document.getElementsByTagName("BODY")[0].setAttribute('class', 'democlass')
  }else{
    document.getElementsByTagName("BODY")[0].setAttribute('class', 'light')
  }
})