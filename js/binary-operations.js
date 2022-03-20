export function binaryToDecimal(binNum) {
  const operands = [];

  for (let i = 0; i <= 7; i++) {
    const term = 2**i;
    const isBitOn = binNum & term;

    if (isBitOn) {
      operands.push(term)
    }
  }

  return operands.length > 1 ? `${operands.join(' + ')} = ${binNum}` : binNum;
}