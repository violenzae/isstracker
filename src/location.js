import { MapService } from "../src/map-service.js";
import { IssService } from "../src/iss-service.js";
import { IssServiceNow } from "../src/issnow-service"

export class Location {
  constructor() {
    this.latLang = [];
    this.passes = [];
    this.map = "";
    this.issLoc = []
  }

  async getlatLng(address) {
    let newMapService = new MapService;
    let answer = await newMapService.getAddressLocation(address);
    this.latLang = [answer[0], answer[1]];
    this.map = answer[2];
    let newIssServiceNow = new IssServiceNow
    let issLocArr = await newIssServiceNow.getISSActualLocation();
    this.issLoc = [issLocArr[0],issLocArr[1]]

  }
  
  async getIss() {
    this.passes = [];
    let spaceloc = new IssService;
    let response =  await spaceloc.getISSLocation(this.latLang[0], this.latLang[1]) 
    for (let i =0; i < response.response.length; i++) {
      this.passes.push(response.response[i]);
    }
  }

}