export function getPortfolioWithNormalizedAllocations(portfolio) {
  let totalAllocation = 0;
  for (const security of portfolio) {
    totalAllocation += security.allocation;
  }
  if (totalAllocation !== 100) {
    const normalizationScore = 100 / totalAllocation;
    for (const security of portfolio) {
      security.allocation *= normalizationScore;
    }
  }
  return portfolio;
}

function sortValuePerSecurityAscending(security1, security2) {
  if (security1[1] === security2[1]) {
    return 0;
  }
  return (security1[1] > security2[1]) ? 1 : -1;
}


function sortValuePerSecurityDescending(security1, security2) {
  if (security1[1] === security2[1]) {
    return 0;
  }
  return (security1[1] < security2[1]) ? 1 : -1;
}

export function getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal) {
  const valueDifferencePerSecurity = [];
  for (let i = 0; i < valuePerSecurityTotal.length; i++) {
    valueDifferencePerSecurity.push([
      i,
      valuePerSecurityCurrent[i] - valuePerSecurityTotal[i]
    ]);
  }
  return valueDifferencePerSecurity;
}

export function getValuesForInvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal) {
  const valueDifferencePerSecurity = getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal);
  valueDifferencePerSecurity.sort(sortValuePerSecurityAscending);

  let cashRemainingToSpend = investmentAmount;
  const valueAdditionPerSecurity = [];
  for (let i = 0; i < valueDifferencePerSecurity.length; i++) {
    valueAdditionPerSecurity.push(0);
  }
  let additionPerSecurity;
  while (cashRemainingToSpend > 0 && additionPerSecurity !== 0) {
    let lastSecurityToAddToIndex = 0;
    additionPerSecurity = 0;
    while (valueDifferencePerSecurity[lastSecurityToAddToIndex + 1] && valueDifferencePerSecurity[lastSecurityToAddToIndex][1] === valueDifferencePerSecurity[lastSecurityToAddToIndex + 1][1]) {
      lastSecurityToAddToIndex++;
    }
    if (valueDifferencePerSecurity[lastSecurityToAddToIndex + 1]) {
      const valueDifference = Math.abs(valueDifferencePerSecurity[lastSecurityToAddToIndex][1] - valueDifferencePerSecurity[lastSecurityToAddToIndex + 1][1]);
      additionPerSecurity = Math.min(cashRemainingToSpend / (lastSecurityToAddToIndex + 1), valueDifference);
    } else {
      additionPerSecurity = cashRemainingToSpend / (lastSecurityToAddToIndex + 1);
    }
    for (let currentSecurityToAddTo = 0; currentSecurityToAddTo <= lastSecurityToAddToIndex; currentSecurityToAddTo++) {
      valueDifferencePerSecurity[currentSecurityToAddTo][1] += additionPerSecurity;
      valueAdditionPerSecurity[valueDifferencePerSecurity[currentSecurityToAddTo][0]] += additionPerSecurity;
      cashRemainingToSpend -= additionPerSecurity;
    }
  }
  return valueAdditionPerSecurity;
}


export function getValuesForDisvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal) {
  const valueDifferencePerSecurity = getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal);
  valueDifferencePerSecurity.sort(sortValuePerSecurityDescending);

  let cashRemainingToGet = -1 * investmentAmount;
  const valueReductionPerSecurity = [];
  for (let i = 0; i < valueDifferencePerSecurity.length; i++) {
    valueReductionPerSecurity.push(0);
  }
  let reductionPerSecurity;
  while (cashRemainingToGet > 0 && reductionPerSecurity !== 0) {
    let lastSecurityToRemoveFromIndex = 0;
    reductionPerSecurity = 0;
    while (valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1] && valueDifferencePerSecurity[lastSecurityToRemoveFromIndex][1] === valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1][1]) {
      lastSecurityToRemoveFromIndex++;
    }
    if (valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1]) {
      const valueDifference = Math.abs(valueDifferencePerSecurity[lastSecurityToRemoveFromIndex][1] - valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1][1]);
      reductionPerSecurity = Math.min(cashRemainingToGet / (lastSecurityToRemoveFromIndex + 1), valueDifference);
    } else {
      reductionPerSecurity = cashRemainingToGet / (lastSecurityToRemoveFromIndex + 1);
    }
    for (let currentSecurityToAddTo = 0; currentSecurityToAddTo <= lastSecurityToRemoveFromIndex; currentSecurityToAddTo++) {
      valueDifferencePerSecurity[currentSecurityToAddTo][1] -= reductionPerSecurity;
      valueReductionPerSecurity[valueDifferencePerSecurity[currentSecurityToAddTo][0]] -= reductionPerSecurity;
      cashRemainingToGet -= reductionPerSecurity;
    }
  }
  return valueReductionPerSecurity;
}


export function getUpdatedValuePerSecurityForAdditions(valuePerSecurityCurrent, unitsAdditionPerSecurity, portfolio) {
  const updatedValuePerSecurityArray = valuePerSecurityCurrent.slice(0);
  for (let i = 0; i < updatedValuePerSecurityArray.length; i++) {
    updatedValuePerSecurityArray[i] += unitsAdditionPerSecurity[i] * portfolio[i].price;
  }
  return updatedValuePerSecurityArray;
}


export function getUpdatedValuePerSecurityForReductions(valuePerSecurityCurrent, unitsReductionPerSecurity, portfolio) {
  const updatedValuePerSecurityArray = valuePerSecurityCurrent.slice(0);
  for (let i = 0; i < updatedValuePerSecurityArray.length; i++) {
    updatedValuePerSecurityArray[i] -= unitsReductionPerSecurity[i] * portfolio[i].price;
  }
  return updatedValuePerSecurityArray;
}


export function getValueDifferencePerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal) {
  const valueDifferencePerSecurity = [];
  for (let i = 0; i < valuePerSecurityCurrent.length; i++) {
    valueDifferencePerSecurity.push(valuePerSecurityCurrent[i] - valuePerSecurityTotal[i]);
  }
  return valueDifferencePerSecurity;
}


export function getValueAdjustmentsPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal) {
  const valueDifferencePerSecurity = [];
  for (let i = 0; i < valuePerSecurityCurrent.length; i++) {
    valueDifferencePerSecurity.push(valuePerSecurityTotal[i] - valuePerSecurityCurrent[i]);
  }
  return valueDifferencePerSecurity;
}


function getValuePerSecurityWithIndex(valuePerSecurity) {
  const valuePerSecurityWithInde = [];
  for (let i = 0; i < valuePerSecurity.length; i++) {
    valuePerSecurityWithInde.push([
      i,
      valuePerSecurity[i]
    ]);
  }
  return valuePerSecurityWithInde;
}

export function getUnitsForValuePerSecurityAndExtraCash(valuePerSecurity, portfolio) {
  const unitsForValuePerSecurity = [];
  let units = 0;
  let wholeUnits = 0;
  let extraCash = 0;
  for (let i = 0; i < valuePerSecurity.length; i++) {
    units = valuePerSecurity[i] / portfolio[i].price;
    if (units >= 0) {
      wholeUnits = Math.floor(valuePerSecurity[i] / portfolio[i].price);
    } else {
      wholeUnits = Math.ceil(valuePerSecurity[i] / portfolio[i].price);
    }
    unitsForValuePerSecurity.push(wholeUnits);
    extraCash += (units - wholeUnits) * portfolio[i].price;
  }
  return {
    unitsForValuePerSecurity,
    extraCash
  };
}

export function getUnitsForInvesting(valueAdditionPerSecurity, portfolio, investmentAmount) {
  const unitsAdditionPerSecurity = [];
  let currentCash = investmentAmount;
  let index = 0;
  while (index < valueAdditionPerSecurity.length && currentCash > 0) {
    const wholeUnits = Math.floor(valueAdditionPerSecurity[index] / portfolio[index].price);
    const maxPurchaseableUnits = Math.floor(currentCash / portfolio[index].price);
    const purchasedUnits = Math.min(wholeUnits, maxPurchaseableUnits);
    currentCash -= purchasedUnits * portfolio[index].price;
    unitsAdditionPerSecurity[index] = purchasedUnits;
    index++;
  }
  return {
    unitsAdditionPerSecurity,
    extraCash: currentCash
  };
}

export function getUnitsForDisvesting(valueReductionPerSecurity, portfolio, disvestmentAmount) {
  const unitsReductionPerSecurity = [];
  let currentCash = disvestmentAmount;
  let index = 0;
  while (index < valueReductionPerSecurity.length && currentCash < 0) {
    const wholeUnits = Math.abs(Math.floor(valueReductionPerSecurity[index] / portfolio[index].price));
    const maxSellableUnits = Math.abs(Math.floor(currentCash / portfolio[index].price));
    const soldUnits = Math.min(wholeUnits, maxSellableUnits);
    currentCash += soldUnits * portfolio[index].price;
    unitsReductionPerSecurity[index] = soldUnits;
    index++;
  }
  return {
    unitsReductionPerSecurity,
    extraCash: currentCash
  };
}


export function getUnitsForAdjusting(valuePerSecurity, portfolio) {
  const valuePerSecurityWithIndex = getValuePerSecurityWithIndex(valuePerSecurity);
  valuePerSecurityWithIndex.sort(sortValuePerSecurityAscending);

  const unitsAdjustmentsPerSecurity = [];
  let currentCash = 0;
  for (let i = 0; i < valuePerSecurityWithIndex.length; i++) {
    if (valuePerSecurityWithIndex[i][1] < 0) {
      const soldUnits = Math.ceil(valuePerSecurityWithIndex[i][1] / portfolio[ valuePerSecurityWithIndex[i][0] ].price);
      currentCash += soldUnits * - portfolio[ valuePerSecurityWithIndex[i][0] ].price;
      unitsAdjustmentsPerSecurity[valuePerSecurityWithIndex[i][0]] = soldUnits;
    } else if (valuePerSecurityWithIndex[i][1] > 0) {
      if (currentCash < 0) {
        break;
      }
      const wholeUnits = Math.floor(valuePerSecurityWithIndex[i][1] / portfolio[ valuePerSecurityWithIndex[i][0] ].price);
      const maxPurchaseableUnits = Math.floor(currentCash / portfolio[i].price);
      const purchasedUnits = Math.floor(wholeUnits, maxPurchaseableUnits);
      currentCash -= purchasedUnits * portfolio[ valuePerSecurityWithIndex[i][0] ].price;
      unitsAdjustmentsPerSecurity[valuePerSecurityWithIndex[i][0]] = purchasedUnits;
    }
  }
  return {
    unitsAdjustmentsPerSecurity,
    extraCash: currentCash
  };
}
