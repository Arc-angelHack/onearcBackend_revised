const getDistance = (a, b) => {
  const R = 3959 // miles
  const φ1 = a.lat * (Math.PI / 180)
  const φ2 = b.lat * (Math.PI / 180)
  const Δφ = φ2 - φ1
  const Δλ = (b.long - a.long) * (Math.PI / 180)
  const α = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
  const c = 2 * Math.atan2(Math.sqrt(α), Math.sqrt(1 - α))
  const d = R * c
  return d
}

const filterByLocation = (requests, { lat, long, range }) => {
  return requests.filter(request => {
    const distance = getDistance({ lat: request.lat, long: request.long }, { lat: parseFloat(lat), long: parseFloat(long) })
    console.log('distance', distance)
    const selectedRange = range || 20
    if (distance < selectedRange) return true
  })
}


module.exports = {
  getDistance,
  filterByLocation
}