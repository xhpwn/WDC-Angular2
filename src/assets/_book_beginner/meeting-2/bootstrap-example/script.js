function toggleDescription(id) {
    var element = document.getElementById(id);
    var visibility = element.style.visibility;
    console.log(visibility);
    if(visibility === 'hidden') {
        element.style.visibility = 'visible';
    } else {
        element.style.visibility = 'hidden';
    }
}
