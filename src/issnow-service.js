export class IssServiceNow {
  async getISSActualLocation() {
    try {
      let response = await fetch('http://api.open-notify.org/iss-now.json');
      const jsonified = await response.json();
      const latitude = jsonified.iss_position.latitude;
      const longitude = jsonified.iss_position.longitude;
      let map = await fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=${process.env.map}&location=${latitude},${longitude}`);
      let jsonmap = await map.json();
      console.log(jsonmap);
      console.log(jsonmap.results[0].locations[0].mapUrl);
      const issLocArr = [latitude, longitude, jsonmap.results[0].locations[0].mapUrl];
      return issLocArr;
    } catch (error) {
      return error.message;
    }
  }
}