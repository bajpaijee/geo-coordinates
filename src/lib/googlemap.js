var request = require("request");
import _ from "lodash";

export async function getGoogleMapCoordinates(urlLink) {
  return new Promise(resolve => {
    request(urlLink, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        if (
          body.status === "OK" &&
          body.results &&
          body.results[0].geometry &&
          body.results[0].geometry.location
        ) {
          resolve(body.results[0].geometry.location);
        } else {
          resolve([]);
        }
      } else {
        resolve([]);
      }
    });
  });
}

export async function searchForNearestStore(
  points,
  addressLatitude,
  addressLongitude,
  placeName
) {
  var inPoly = false;
  var j = points.length - 1;
  for (var i = 0; i < points.length; i++) {
    points[i].Longitude = points[j][0];
    points[i].Latitude = points[j][1];
    if (
      (points[i].Longitude < addressLongitude &&
        points[j].Longitude >= addressLongitude) ||
      (points[j].Longitude < addressLongitude &&
        points[i].Longitude >= addressLongitude)
    ) {
      if (
        points[i].Latitude +
          ((addressLongitude - points[i].Longitude) /
            (points[j].Longitude - points[i].Longitude)) *
            (points[j].Latitude - points[i].Latitude) <
        addressLatitude
      ) {
        inPoly = !inPoly;
      }
    }
    j = i;
  }
  if (inPoly) {
    return await placeName;
  } else {
    return false;
  }
}

export async function searchForAddressPoint(
  coordinates,
  addressLatitude,
  addressLongitude
) {
  let place = "Not Found";
  let letAllSkills = await _.forEach(coordinates, async coordinate => {
    let fetchNearestStoreName = await searchForNearestStore(
      coordinate.points,
      addressLatitude,
      addressLongitude,
      coordinate.name
    );
    if (
      !_.isUndefined(fetchNearestStoreName) &&
      fetchNearestStoreName !== false
    ) {
      place = fetchNearestStoreName;
    }
  });
  await Promise.all(letAllSkills);
  return await place;
}

export async function filterCoordinatesWithName(kmlFeatures) {
  let allCoordinates = [];
  await _.forEach(kmlFeatures.features, feature => {
    if (feature.geometry.type !== "Point") {
      allCoordinates.push({
        name: feature.properties.Name,
        points: feature.geometry.coordinates[0]
      });
    }
  });
  return await allCoordinates;
}
