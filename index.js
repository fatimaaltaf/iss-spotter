// // index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


// FETCH MY IP
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

// FETCH MY COORDS
fetchCoordsByIp('66.207.199.230', (error, data) => {
  if (error) {
    console.log("Cannot fetch coordinates by IP address");
  }

  console.log('It worked! Returned coordinates:', data);
});

// FETCH ISS FLYOVER TIMES
const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("Cannot fetch flytimes for ISS by geo coordinates");
  }

  console.log('It worked! Returned flytimes:', passTimes);
});

// NEXT ISS TIMES FOR MY LOCATION

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});