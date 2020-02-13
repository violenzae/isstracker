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

    (async ()=>{
      await newloc.getlatLng(address);
      await newloc.getIss();

      

      console.log(newloc.map);
      $("#map").html(`<img src=`+newloc.map+` alt=map>`);
      $(".output").append("<p>Distance of your location from the ISS: "+howFar(newloc.latLang[0], newloc.latLang[1], newloc.issLoc[0], newloc.issLoc[1]).toFixed(2)+" miles.</p>");
      for(let i = 0; i < newloc.passes.length; i++){
        let rise = newloc.passes[i].risetime;
        let date = new Date(rise*1000);
        let printdate = date.toDateString();
        let hour = date.getHours();
        let minute = "0" + date.getMinutes();
        let second = "0" + date.getSeconds();
        let duration = newloc.passes[i].duration/60;
        $(".output").append("For " + duration.toFixed(2) + " minutes " + printdate + " UTC Time: " + hour +":"+ minute.substr(-2) +":"+ second.substr(-2) +"<br>");
      }
    })();
    
      function howFar(lat1, lon1, lat2, lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
          return 0;
        }
        else {
          var radlat1 = Math.PI * lat1/180;
          var radlat2 = Math.PI * lat2/180;
          var theta = lon1-lon2;
          var radtheta = Math.PI * theta/180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = dist * 180/Math.PI;
          dist = dist * 60 * 1.1515;
          return dist;
        }
      }        
    //   var R = 6371e3; // metres
    //   var φ1 = newloc.latLang[0].toRadians();
    //   var φ2 = newloc.issLoc[0].toRadians();
    //   var Δφ = (newloc.issLoc[0]-newloc.latLang[0]).toRadians();
    //   var Δλ = (newloc.issLoc[1]-newloc.latLang[1]).toRadians();

    //   var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    //           Math.cos(φ1) * Math.cos(φ2) *
    //           Math.sin(Δλ/2) * Math.sin(Δλ/2);
    //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    //   var d = R * c;

    //   return d;
    // }



  });
});


