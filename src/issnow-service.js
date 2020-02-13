export class IssServiceNow {
    async getISSActualLocation() {
      let response = await fetch('http://api.open-notify.org/iss-now.json');
      const jsonified = await response.json();
      const latitude = jsonified.iss_position.latitude;
    const longitude = jsonified.iss_position.longitude;
    const issLocArr = [latitude, longitude]
      return issLocArr;
    }
}