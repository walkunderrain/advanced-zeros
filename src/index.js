module.exports = function getZerosCount(number, base) {
  const makePrimesTo = num => {
    const makeNumbersTo = num => {
      let numbers = [];
      for (let i = 2; i <= num; i++) {
        numbers.push(i);
      }
      return numbers;
    }

    const removeMultiple = (numbers, p) => {
  for (let i = 0; i < numbers.length; i++) {
    if ((numbers[i] !== p) && (numbers[i] % p === 0)) {
      numbers.splice(i, 1);
    }
  }
  return numbers;
  }

    let numbers = makeNumbersTo(num);
    for (let i = 0; i < numbers.length; i++) {
      while (numbers[i]**2 <= num) {
        removeMultiple(numbers, numbers[i]);
        i++;
      }
    }
    return numbers;
  }

  const rlog = (num, base) => {
    if (num == 0) return NaN;
    if (num == 1) return 0;
    let power = 0;
    while (num % base === 0) {
      power++;
      num /= base;
    }
    return power;
  }


  const factorize = num => {
    let powers = {};
    const primes = makePrimesTo(num);
      primes.forEach(prime => {
        let power = rlog(num, prime);
        if (power > 0) {
          powers[prime] = power;
        }
        num = num / (prime ** power);
      });
    return powers;
  }

  const countNumberSeries = (number, base) => {
    let power = 1;
    let sum = 0;
    while (Math.floor(number / (base ** power) > 0)) {
      sum += Math.floor(number / (base ** power));
      power++;
    }
    return sum;
  }

  let factorizedBase = factorize(base);
  let maxDivider = parseInt(Object.keys(factorizedBase).pop());
  let powerOfMaxDivider = factorizedBase[maxDivider];
  let sumOfNumberSeries = countNumberSeries(number, maxDivider);
  let zeros = Math.floor(sumOfNumberSeries / powerOfMaxDivider);
  return zeros;
}
