const { getTrips, getDriver } = require('api');

/**
 * This function should return the trip data analysis
 *
 * Question 3
 * @returns {any} Trip data analysis
 */


async function analysis() {
  const trips = await getTrips();
  return Promise.all([data1Function(trips), data2Function(trips)]).then((data) => {
    return { ...data[0], ...data[1] }
  });
}

const data1Function = async (trips) => {

  const data1 = trips.reduce((acc, value) => {
    const amount = parseFloat(`${value.billedAmount}`.replace(/,/g, ""));
    if (value.isCash === true) {
      acc.noOfCashTrips++;
      acc.cashBilledTotal += amount;
    }
    if (value.isCash === false) {
      acc.noOfNonCashTrips++;
      acc.nonCashBilledTotal += amount
    }
    acc.billedTotal += amount;

    return acc
  }, {
    noOfCashTrips: 0,
    noOfNonCashTrips: 0,
    billedTotal: 0,
    cashBilledTotal: 0,
    nonCashBilledTotal: 0,
  });
  data1.billedTotal = (Math.floor(data1.billedTotal * 100)) / 100;
  data1.cashBilledTotal = (Math.floor(data1.cashBilledTotal * 100)) / 100;
  data1.nonCashBilledTotal = (Math.floor(data1.nonCashBilledTotal * 100)) / 100;

  return data1;
}

const data2Function = async (trips) => {
  const drivers = Array.from(new Set(trips.reduce((acc, value) => {
    acc.push(value.driverID);
    return acc
  }, [])))


  let driversVehicle = drivers.map((driver) => {
    return getDriver(driver).then((data) => data.vehicleID.length).catch(() => 0);
  })

  let noOfDriversWithMoreThanOneVehicle = await Promise.all(driversVehicle).then((data) => data.reduce((acc, val) => {
    return val > 1 ? acc += 1 : acc
  }, 0))

  const driversTrips = {}
  drivers.map((value) => {
    driversTrips[value] = trips.filter((trip) => value == trip.driverID).length
  })

  const highestTripsDriver = Object.keys(driversTrips).reduce((a, b) => driversTrips[a] >= driversTrips[b] ? a : b)

  const earnings = trips.reduce((acc, value) => {
    if (!acc[value.driverID]) {
      acc[value.driverID] = parseFloat(`${value.billedAmount}`.replace(/,/g, ""));
    } else {
      acc[value.driverID] += parseFloat(`${value.billedAmount}`.replace(/,/g, ""));
    }
    return acc;
  }, {});


  const highestEarning = Object.keys(earnings).reduce((a, b) => earnings[a] > earnings[b] ? a : b)

  const { name, email, phone } = { ...await getDriver(highestTripsDriver) };
  const mostTripsByDriver = { name, email, phone, noOfTrips: driversTrips[highestTripsDriver], totalAmountEarned: earnings[highestTripsDriver] };
  const hED = { ...await getDriver(highestEarning) };
  const highestEarningDriver = { name: hED.name, email: hED.email, phone: hED.phone, noOfTrips: driversTrips[highestEarning], totalAmountEarned: earnings[highestEarning] }
  const data2 = { noOfDriversWithMoreThanOneVehicle, mostTripsByDriver, highestEarningDriver };

  return data2;

}

module.exports = analysis;