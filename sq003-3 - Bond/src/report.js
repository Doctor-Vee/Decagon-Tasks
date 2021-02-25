const { getTrips, getDriver, getVehicle } = require('api');
const { normalizeAmount, to2Decimals } = require('./utils');

/**
 * This function should return the data for drivers in the specified format
 * Don't forget to write tests
 *
 * @returns {any} Driver report data
 */
async function driverReport() {
  const trips = await getTrips();

  const drivers = new Map();
  for (trip of trips) {
    const {
      isCash,
      billedAmount,
      driverID,
      created,
      user: { name: user },
      pickup: { address: pickup },
      destination: { address: destination }
    } = trip;

    const billed = normalizeAmount(billedAmount);

    const driver = drivers.get(driverID) || {};

    drivers.set(driverID, {
      noOfTrips: (driver.noOfTrips || 0) + 1,
      totalAmountEarned: (driver.totalAmountEarned || 0) + billed,
      noOfCashTrips: (driver.noOfCashTrips || 0) + (isCash ? 1 : 0),
      noOfNonCashTrips: (driver.noOfCashTrips || 0) + (isCash ? 0 : 1),
      totalCashAmount: (driver.totalCashAmount || 0) + (isCash ? billed : 0),
      totalNonCashAmount:
        (driver.totalNonCashAmount || 0) + (isCash ? 0 : billed),
      trips: (driver.trips || []).concat({
        user,
        created,
        pickup,
        destination,
        billed,
        isCash
      })
    });
  }

  const driverIDs = [...drivers.keys()];

  const driverBioInfoPromises = driverIDs.map(driverID => {
    return getDriver(driverID)
      .then(driver => {
        const { vehicleID, name: fullName, phone } = driver;

        return { vehicleID, fullName, phone, id: driverID };
      })
      .catch(() => {
        return { vehicleID: [], id: driverID };
      })
      .then(data => {
        const { vehicleID, ...rest } = data;

        const vehiclePromises = vehicleID.map(id => {
          return getVehicle(id).then(vehicle => {
            const { plate, manufacturer } = vehicle;

            return {
              plate,
              manufacturer
            };
          });
        });

        return Promise.all(vehiclePromises).then(vehicles => {
          return {
            ...rest,
            vehicles
          };
        });
      });
  });

  const driverBioInfo = await Promise.all(driverBioInfoPromises);

  return driverBioInfo.map(driverBio => {
    const {
      totalAmountEarned,
      totalCashAmount,
      totalNonCashAmount,
      ...driverTripInfo
    } = drivers.get(driverBio.id);

    return {
      ...driverBio,
      ...driverTripInfo,
      totalAmountEarned: to2Decimals(totalAmountEarned),
      totalCashAmount: to2Decimals(totalCashAmount),
      totalNonCashAmount: to2Decimals(totalNonCashAmount)
    };
  });
}

module.exports = driverReport;
