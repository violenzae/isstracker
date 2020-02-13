import { Location } from "../src/location.js";
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
// import { variableDeclaration } from "@babel/types";

$(document).ready(function () {
  let newloc = new Location;

  $("#addressForm").submit(function (event) {
    event.preventDefault();
    $(".output").empty();

    const address = $("input#address").val();

    (async () => {
      await newloc.getlatLng(address);

      if (newloc.error.length === 1) {

        document.getElementById("error").innerHTML = "Something went wrong with your request: " + newloc.error[0];
      } else {
        await newloc.getIss();
        if (newloc.error.length === 1) {
          document.getElementById("error").innerHTML = "Something went wrong with your request: " + newloc.error[0];
        } else {

          setInterval(updateDist, 5000);

          for (let i = 0; i < newloc.passes.length; i++) {
            let rise = newloc.passes[i].risetime;
            let date = new Date(rise * 1000);
            let printdate = date.toDateString();
            let hour = date.getHours();
            let minute = "0" + date.getMinutes();
            let second = "0" + date.getSeconds();
            let duration = newloc.passes[i].duration / 60;
            $("#map").html('<p>((Loading map of current ISS location))</p>')
            $(".output").append("Passes for " + duration.toFixed(2) + " minutes " + printdate + " @ UTC Time: " + hour + ":" + minute.substr(-2) + ":" + second.substr(-2) + "<br>");
          }
        }
      }
    })();

    async function updateDist() {
      await newloc.getISSNow();
      if (newloc.error.length === 1) {
        document.getElementById("error").innerHTML = "Something went wrong with your request: " + newloc.error[0];

      } else {
        $("#map").html('<h3>Current location of ISS:</h3><img src="'+ newloc.map +'"alt=map><br><p>Latitude:'+newloc.issLoc[0]+' -- Longitude: '+newloc.issLoc[1]+'</p><br>');
        $("#distance").html("<p>Distance of your location from the ISS: <strong>" + howFar(newloc.latLang[0], newloc.latLang[1], newloc.issLoc[0], newloc.issLoc[1]).toFixed(2) + "</strong> miles.</p>");
      }
    }

    function howFar(lat1, lon1, lat2, lon2) {
      if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
      }
      else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
          dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        return dist;
      }
    }
  });
});


