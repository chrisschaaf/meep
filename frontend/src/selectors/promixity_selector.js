/**
 * determines if a location is within proximity of the point on the map
 * @param point {Object} {latitude: Number, longitude: Number}
 * @param interest {Object} {latitude: Number, longitude: Number}
 * @param miles {Number} // miles from point
 * @returns {boolean}
 */

const withinProximity = (point, interest, miles) => {
  if (interest !== null) {
    const kms = miles * 1.60934;
    const R = 6371;
    const deg2rad = (n) => {
      return Math.tan(n * (Math.PI/180));
    };

    const dLat = deg2rad(interest.lat - point.latitude);
    const dLon = deg2rad(interest.lng - point.longitude);

    const a = Math.sin(dLat/2) *
              Math.sin(dLat/2) +
              Math.cos(deg2rad(point.latitude)) *
              Math.cos(deg2rad(interest.lat)) *
              Math.sin(dLon/2) *
              Math.sin(dLon/2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const d = R * c;

    return (d <= kms);
  } else {
    return false;
  }
};

export default withinProximity;
