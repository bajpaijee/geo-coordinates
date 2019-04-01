import { route } from "./";
import * as buildResponse from "../lib/buildResponse.js";
import _ from "lodash";
import {
  getGoogleMapCoordinates,
  filterCoordinatesWithName,
  searchForAddressPoint
} from "../lib/googlemap";
import { outletsWithCoordinates } from "../lib/honestFoodsKml";

import { GOOGLE_MAP_API_URL, GOOGLE_MAP_API_KEY } from "../constants";
const googleAPILinkUrl = `${GOOGLE_MAP_API_URL}${GOOGLE_MAP_API_KEY}`;

export const getNearestStore = route(async (req, res) => {
  try {
    let { address } = req.query;
    if (address) {
      let googleAPILink = `${googleAPILinkUrl}&address=${encodeURIComponent(
        address
      )}`;
      let respondedLatLng = await getGoogleMapCoordinates(googleAPILink);
      if (!_.isEmpty(respondedLatLng)) {
        let latitude = respondedLatLng.lat;
        let longitude = respondedLatLng.lng;
        let frameCoordinatesPolygon = await filterCoordinatesWithName(
          outletsWithCoordinates
        );
        let searcForNearesCoordinate = await searchForAddressPoint(
          frameCoordinatesPolygon,
          latitude,
          longitude
        );
        res.send(buildResponse.success(200, searcForNearesCoordinate));
      } else {
        res.send(buildResponse.failure({ message: respondedLatLng }));
      }
    } else {
      throw new Error("Please provide the valid address");
    }
  } catch (error) {
    res.send(buildResponse.failure(error));
  }
});
