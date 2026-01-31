
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const sortCustomersByProximity = (startLat: number, startLng: number, customers: any[]) => {
  const sorted = [...customers];
  let currentLat = startLat;
  let currentLng = startLng;
  const result = [];

  while (sorted.length > 0) {
    let nearestIdx = 0;
    let minDist = calculateDistance(currentLat, currentLng, sorted[0].lat, sorted[0].lng);

    for (let i = 1; i < sorted.length; i++) {
      const dist = calculateDistance(currentLat, currentLng, sorted[i].lat, sorted[i].lng);
      if (dist < minDist) {
        minDist = dist;
        nearestIdx = i;
      }
    }

    const nearest = sorted.splice(nearestIdx, 1)[0];
    result.push(nearest);
    currentLat = nearest.lat;
    currentLng = nearest.lng;
  }
  return result;
};
