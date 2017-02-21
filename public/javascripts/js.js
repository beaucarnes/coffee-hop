function updateCount(placeID) {
  console.log("updateCount called")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log("request sent")
    if (this.readyState == 4 && this.status == 200) {
     document.getElementById(placeID).innerHTML = this.responseText;
    }
  };
  
  xhttp.open('GET', '/updatecount?id=" + placeID', true);
  xhttp.send(null);
}