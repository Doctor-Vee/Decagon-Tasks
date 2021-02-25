const { getTrips, getDriver } = require('api');
const { normalizeAmount, to2Decimals } = require('./utils');

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */
async function analysis() {
  const trips = await getTrips();

  const analysisReport = {
    noOfCashTrips: 0,
    noOfNonCashTrips: 0,
    billedTotal: 0,
    cashBilledTotal: 0,
    nonCashBilledTotal: 0,
  };

  const drivers = new Map();

  for (const trip of trips) {
    const amount = normalizeAmount(trip.billedAmount);

    analysisReport.billedTotal += amount;

    if (trip.isCash) {
      analysisReport.noOfCashTrips += 1;
      analysisReport.cashBilledTotal += amount;
    }

    if (!trip.isCash) {
      analysisReport.noOfNonCashTrips += 1;
      analysisReport.nonCashBilledTotal += amount;
    }

    const driverData = drivers.get(trip.driverID);

    if (driverData) {
      drivers.set(trip.driverID, {
        ...driverData,
        noOfTrips: driverData.noOfTrips + 1,
        totalAmountEarned: driverData.totalAmountEarned + amount,
      });
    }

    if (!driverData) {
      drivers.set(trip.driverID, {
        noOfTrips: 1,
        totalAmountEarned: amount,
        driverID: trip.driverID,
      });
    }
  }

  const driverIDs = [...drivers.keys()];

  const driverDataPromises = driverIDs.map(async driverID => {
    try {
      const data = await getDriver(driverID);

      return {
        ...data,
        driverID,
      };
    } catch {
      return;
    }
  });

  const driversData = await Promise.all(driverDataPromises);

  const noOfDriversWithMoreThanOneVehicle = driversData.filter(driver => {
    return driver && driver.vehicleID.length > 1;
  }).length;

  const driverValues = [...drivers.values()];

  const mostTripsByDriverInfo = driverValues.sort((a, b) => {
    return b.noOfTrips - a.noOfTrips;
  })[0];

  const mostTripsByDriverData = driversData.find(
    driver => driver.driverID === mostTripsByDriverInfo.driverID,
  );

  const highestEarningDriverInfo = driverValues.sort((a, b) => {
    return b.totalAmountEarned - a.totalAmountEarned;
  })[0];

  const highestEarningDriverData = driversData.find(
    driver => driver.driverID === highestEarningDriverInfo.driverID,
  );

  const mostTripsByDriver = {
    name: mostTripsByDriverData.name,
    email: mostTripsByDriverData.email,
    phone: mostTripsByDriverData.phone,
    noOfTrips: mostTripsByDriverInfo.noOfTrips,
    totalAmountEarned: mostTripsByDriverInfo.totalAmountEarned,
  };

  const highestEarningDriver = {
    name: highestEarningDriverData.name,
    email: highestEarningDriverData.email,
    phone: highestEarningDriverData.phone,
    noOfTrips: highestEarningDriverInfo.noOfTrips,
    totalAmountEarned: highestEarningDriverInfo.totalAmountEarned,
  };

  return {
    ...analysisReport,
    mostTripsByDriver,
    highestEarningDriver,
    noOfDriversWithMoreThanOneVehicle,
    nonCashBilledTotal: to2Decimals(analysisReport.nonCashBilledTotal),
    billedTotal: to2Decimals(analysisReport.billedTotal),
  };
}

module.exports = analysis;
