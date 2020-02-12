export class MapService {
  async getAddressLocation(address) {
      let response = await fetch(`http://open.mapquestapi.com/geocoding/v1/address?key=${process.env.map}&location=${address}`);
      const jsonified = await response.json();
      const latitude = jsonified.results[0].locations[0].latLng.lat;
      const longitude = jsonified.results[0].locations[0].latLng.lng;
      const locationArr = [latitude, longitude];
      return locationArr;
  }
}