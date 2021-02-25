function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
  let maxPairs = 0;
  const clean = [...cleanPile];
  const dirty = [...dirtyPile];
  clean.sort((a, b) => a - b);
  dirty.sort((a, b) => a - b);

  maxPairs += getPairs(clean)[0];
  cleanSingle = getPairs(clean)[1];

  for (let i = 0; i < cleanSingle.length && noOfWashes > 0; i++) {
    for (let j = 0; j < dirty.length; j++) {
      if (cleanSingle[i] === dirty[j]) {
        dirty.splice(j, 1);
        maxPairs++;
        noOfWashes--;
        break;
      }
    }
  }

  let dirtyPairs = getPairs(dirty)[0];
  if (Math.floor(noOfWashes / 2) < dirtyPairs) {
    maxPairs += Math.floor(noOfWashes / 2)
  } else {
    maxPairs += dirtyPairs;
  }
  return maxPairs;
}

// /**
//  *
//  *
//  * @param {*} noOfWashes
//  * @param {*} cleanPile
//  * @param {*} dirtyPile
//  * @returns
//  */
// function getMaxPairs(noOfWashes, cleanPile, dirtyPile) {
//   let maxPairs = 0;
//   const clean = [...cleanPile];
//   const dirty = [...dirtyPile];
//   clean.sort((a, b) => a - b);
//   dirty.sort((a, b) => a - b);

//   maxPairs += getPairs(clean)[0];
//   cleanSingle = getPairs(clean)[1];

//   const dirtyLegs = {};

//   for (let j = 0; j < dirtyPile.length; j++) {
//     if(dirtyLegs[j]){
//       dirtyLegs[j].push(dirtyPile[j]);
//     } else {
//       dirtyLegs[j] = [dirtyPile[j]];
//     }
//   }


//   for (let k = 0; k < cleanSingle.length; k++) {
//     if (noOfWashes === 0) break;
//     if(dirtyLegs[cleanSingle[k]]) {
//       dirtyLegs[cleanSingle[k]].pop();
//       noOfWashes--;
//       maxPairs++;
//     }
//   }


//   const dirtyValues = Object.values(dirtyLegs);
//   let dirtyArr = [];

//   for (let l = 0; l < dirtyValues.length; l++) {
//         dirtyArr.concat(dirtyValues[l]);
//   }


//   let dirtyPairs = getPairs(dirtyArr)[0];
//   if (Math.floor(noOfWashes / 2) < dirtyPairs) {
//     maxPairs += Math.floor(noOfWashes / 2)
//   } else {
//     maxPairs += dirtyPairs;
//   }
//   return maxPairs;
// }

function getPairs(array) {
  let socks = [...array]
  socks.sort((a, b) => a - b);
  let pairs = 0, unpaired = [];
  for (let i = 0; i < socks.length; i++) {
    if (socks[i] === socks[i + 1]) {
      pairs++;
      i++;
    } else {
      unpaired.push(socks[i])
    }
  }
  return [pairs, unpaired];
}

module.exports = getMaxPairs;