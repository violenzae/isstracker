export class IssService {
  async getISSLocation(latitude, longitude) {
    let response = await fetch(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
    const jsonified = await response.json();
    return jsonified;
  }
}