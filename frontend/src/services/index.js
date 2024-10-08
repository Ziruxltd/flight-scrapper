export function getDestinations() {
  return fetch(`http://localhost:3005/destinations`)
    .then((response) => response.json())
    .then((data) => data);
}
