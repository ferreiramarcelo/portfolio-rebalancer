export function getPortfolioWithNormalizedAllocations(portfolio) {
	let totalAllocation = 0;
	for (let security of portfolio) {
		totalAllocation += security.allocation.number;
	}
	if (totalAllocation !== 100) {
		let normalizationScore = 100 / totalAllocation;
		for (let security of portfolio) {
			security.allocation.number *= normalizationScore;
		}
	}
	return portfolio;
}

function sortDiffValuePerSecurityAscending(security1, security2) {
	if (security1[1] === security2[1]) {
		return 0;
	} else {
		return (security1[1] > security2[1]) ? 1 : -1;
	}
};

function sortDiffValuePerSecurityDescending(security1, security2) {
	if (security1[1] === security2[1]) {
		return 0;
	} else {
		return (security1[1] < security2[1]) ? 1 : -1;
	}
};

export function getValuesForInvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal) {
	let valueDifferencePerSecurity = getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal);
	valueDifferencePerSecurity.sort(sortDiffValuePerSecurityAscending);

	let cashRemainingToSpend = investmentAmount;
	let valueAdditionPerSecurity = [];
	for (let i = 0; i < valueDifferencePerSecurity.length; i++) {
		valueAdditionPerSecurity.push(0);
	}
	let additionPerSecurity;
	while (cashRemainingToSpend > 0 && additionPerSecurity != 0) {
		let lastSecurityToAddToIndex = 0;
		let additionPerSecurity = 0;
		while (valueDifferencePerSecurity[lastSecurityToAddToIndex + 1] != null && valueDifferencePerSecurity[lastSecurityToAddToIndex][1] == valueDifferencePerSecurity[lastSecurityToAddToIndex + 1][1]) {
			lastSecurityToAddToIndex++;
		}
		if (valueDifferencePerSecurity[lastSecurityToAddToIndex + 1] != null) {
			let valueDifference = Math.abs(valueDifferencePerSecurity[lastSecurityToAddToIndex][1] - valueDifferencePerSecurity[lastSecurityToAddToIndex + 1][1]);
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
};

export function getValuesForDisvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal) {
	let valueDifferencePerSecurity = getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal);
	valueDifferencePerSecurity.sort(sortDiffValuePerSecurityDescending);

	let cashRemainingToGet = -1 * investmentAmount;
	let valueReductionPerSecurity = [];
	for (let i = 0; i < valueDifferencePerSecurity.length; i++) {
		valueReductionPerSecurity.push(0);
	}
	let reductionPerSecurity;
	while (cashRemainingToGet > 0 && reductionPerSecurity != 0) {
		let lastSecurityToRemoveFromIndex = 0;
		let reductionPerSecurity = 0;
		while (valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1] != null && valueDifferencePerSecurity[lastSecurityToRemoveFromIndex][1] == valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1][1]) {
			lastSecurityToRemoveFromIndex++;
		}
		if (valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1] != null) {
			let valueDifference = Math.abs(valueDifferencePerSecurity[lastSecurityToRemoveFromIndex][1] - valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1][1]);
			reductionPerSecurity = Math.min(cashRemainingToGet / (lastSecurityToRemoveFromIndex + 1), valueDifference);
		} else {
			reductionPerSecurity = cashRemainingToGet / (lastSecurityToRemoveFromIndex + 1);
		}
		for (let currentSecurityToAddTo = 0; currentSecurityToAddTo <= lastSecurityToRemoveFromIndex; currentSecurityToAddTo++) {
			valueDifferencePerSecurity[currentSecurityToAddTo][1] -= reductionPerSecurity;
			valueReductionPerSecurity[valueDifferencePerSecurity[currentSecurityToAddTo][0]]-= reductionPerSecurity;
			cashRemainingToGet -= reductionPerSecurity;
		}
	}
	return valueReductionPerSecurity;
};

export function getUpdatedValuePerSecurityArray(valuePerSecurityCurrent, valueDifferencePerSecurity) {
	let updatedValuePerSecurityArray = valuePerSecurityCurrent.slice(0);
	for (let i = 0; i < updatedValuePerSecurityArray.length; i++) {
		updatedValuePerSecurityArray[i] += valueDifferencePerSecurity[i];
	}
	return updatedValuePerSecurityArray;
};

export function getValueDifferencePerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal) {
	let valueDifferencePerSecurity = [];
	for (let i = 0; i < valuePerSecurityCurrent.length; i++) {
		valueDifferencePerSecurity.push(valuePerSecurityCurrent[i] - valuePerSecurityTotal[i]);
	}
	return valueDifferencePerSecurity;
};

export function getValueAdjustmentsNeededPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal) {
	let valueDifferencePerSecurity = [];
	for (let i = 0; i < valuePerSecurityCurrent.length; i++) {
		valueDifferencePerSecurity.push(valuePerSecurityTotal[i] - valuePerSecurityCurrent[i]);
	}
	return valueDifferencePerSecurity;
};

export function getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal) {
	let valueDifferencePerSecurity = [];
	for (let i = 0; i < valuePerSecurityTotal.length; i++) {
		valueDifferencePerSecurity.push([i, valuePerSecurityCurrent[i] - valuePerSecurityTotal[i]]);
	}
	return valueDifferencePerSecurity;
};

export function getUnitsForValuePerSecurityAndExtraCash(valuePerSecurity, portfolio) {
	let unitsForValuePerSecurity = [];
	let units = 0;
	let wholeUnits = 0;
	let extraCash = 0;
	for (let i = 0; i < valuePerSecurity.length; i++) {
			units = valuePerSecurity[i] / portfolio[i].price.number;
			if (units >= 0) {
				wholeUnits = Math.floor(valuePerSecurity[i] / portfolio[i].price.number);
			}
		  else {
				wholeUnits = Math.ceil(valuePerSecurity[i] / portfolio[i].price.number);
		}
		unitsForValuePerSecurity.push(wholeUnits)
		extraCash += (units - wholeUnits) * portfolio[i].price.number;
	}
	return {unitsForValuePerSecurity, extraCash};
}
