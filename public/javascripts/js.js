function updateCount(placeID, logged) {
  if (logged) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (document.getElementById(placeID).innerHTML > this.responseText) {
          document.getElementById(placeID).classList.remove("btn-success");
          document.getElementById(placeID).classList.add("btn-info");
        } else {
          document.getElementById(placeID).classList.remove("btn-info");
          document.getElementById(placeID).classList.add("btn-success");
        };
        document.getElementById(placeID).innerHTML = this.responseText;
      }
    };
    
    xhttp.open('GET', '/updatecount?id=' + placeID, true);
    xhttp.send(null);
  } else {
    window.location.href = '/auth/twitter';
  }
}