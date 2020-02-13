export class IssService {
  async getISSLocation(latitude, longitude) {
    try {
      let response = await fetch(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
      const jsonified = await response.json();
      return jsonified;
    } catch(error) {
      return error.message;
    }
  }
}