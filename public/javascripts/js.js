function updateCount(placeID, visiting) {
  console.log("updateCount called")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log("request sent")
    console.log(this.responseText)
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(placeID).innerHTML = this.responseText;
      if (visiting) {
        document.getElementById(placeID).classList.remove("btn-success");
        document.getElementById(placeID).classList.add("btn-info");
      } else {
        document.getElementById(placeID).classList.remove("btn-info");
        document.getElementById(placeID).classList.add("btn-success");
      }
    }
  };
  
  xhttp.open('GET', '/updatecount?id=' + placeID, true);
  xhttp.send(null);
}