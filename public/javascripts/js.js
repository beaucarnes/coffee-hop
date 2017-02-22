function updateCount(placeID) {
  console.log("updateCount called")
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    console.log("request sent")
    console.log(this.responseText)
    if (this.readyState == 4 && this.status == 200) {
      if (document.getElementById(placeID).innerHTML > this.responseText)
        document.getElementById(placeID).classList.remove("btn-success");
        document.getElementById(placeID).classList.add("btn-info");
      } else {
        document.getElementById(placeID).classList.remove("btn-info");
        document.getElementById(placeID).classList.add("btn-success");
      }
      document.getElementById(placeID).innerHTML = this.responseText;
    }
  };
  
  xhttp.open('GET', '/updatecount?id=' + placeID, true);
  xhttp.send(null);
}