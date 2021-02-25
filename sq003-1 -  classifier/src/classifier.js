/**
 * This is the entry point to the program
 *
 * @param {any} input Array of student objects
 */
function classifier(input) {
  if (typeof(input) == 'string') throw "Strings not allowed"

  if (input.length == 0 || (input.length && typeof(input) == 'object')) {

    let input2 = [];
    for (let i = 0; i < input.length; i++) {
      input2.push(input[i]);
    }

    const today = new Date().getFullYear();
    let x;
    for (student in input2) {
      x = new Date(input2[student].dob).getFullYear();
      age = today - x;
      input2[student].age = age;
    }


    input2.sort(function (a, b) {
      return a.age - b.age;
    });

    let result = {};
    let count = 0;

    while (input2.length) {
      count++;
      members = [];
      sum = 0;
      regNos = [];
      for (let i = 0; i <= 3; i++) {
        if (i === input2.length) {
          input2 = input2.slice(i, input2.length);
          break;
        }

        if (i === 0) {
          members.push(input2[i]);
          sum += input2[i].age;
          regNos.push(parseInt(input2[i].regNo));
        } else if (input2[i].age <= members[0].age + 5 && members.length < 3)
        {
          members.push(input2[i]);
          sum += input2[i].age;
          regNos.push(parseInt(input2[i].regNo));
        } else {
          input2 = input2.slice(i, input2.length);
          break;
        }
      }

      regNos.sort(function (a, b) {
        return a - b;
      });

      result[`group${count}`] = {
        members: members,
        oldest: members[members.length - 1].age,
        sum: sum,
        regNos: regNos,
      };
    }

    result.noOfGroups = count;

    return result;
  } else {
    throw 'Enter valid input';
  }
}

module.exports = classifier;
