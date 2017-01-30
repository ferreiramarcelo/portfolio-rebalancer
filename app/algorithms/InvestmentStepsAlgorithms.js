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
	var valueDifferencePerSecurity = getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal);
	valueDifferencePerSecurity.sort(sortDiffValuePerSecurityAscending);
	
	var cashRemainingToSpend = investmentAmount;
	var valueAdditionPerSecurity = [];
	for (var i = 0; i < valueDifferencePerSecurity.length; i++) {
		valueAdditionPerSecurity.push(0);
	}
	while (cashRemainingToSpend > 0 && additonPerSecurity != 0) {
		var lastSecurityToAddToIndex = 0;
		var additonPerSecurity = 0;
		while (valueDifferencePerSecurity[lastSecurityToAddToIndex + 1] != null && valueDifferencePerSecurity[lastSecurityToAddToIndex][1] == valueDifferencePerSecurity[lastSecurityToAddToIndex + 1][1]) {
			lastSecurityToAddToIndex++;
		}
		if (valueDifferencePerSecurity[lastSecurityToAddToIndex + 1] != null) {
			var valueDifference = Math.abs(valueDifferencePerSecurity[lastSecurityToAddToIndex][1] - valueDifferencePerSecurity[lastSecurityToAddToIndex + 1][1]);
			additonPerSecurity = Math.min(cashRemainingToSpend / (lastSecurityToAddToIndex + 1), valueDifference);
		} else {
			additonPerSecurity = cashRemainingToSpend / (lastSecurityToAddToIndex + 1);
		}
		for (var currentSecurityToAddTo = 0; currentSecurityToAddTo <= lastSecurityToAddToIndex; currentSecurityToAddTo++) {
			valueDifferencePerSecurity[currentSecurityToAddTo][1] += additonPerSecurity;
			valueAdditionPerSecurity[valueDifferencePerSecurity[currentSecurityToAddTo][0]] += additonPerSecurity;
			cashRemainingToSpend -= additonPerSecurity;
		}
	}
	return valueAdditionPerSecurity;
};

export function getValuesForDisvesting(investmentAmount, valuePerSecurityCurrent, valuePerSecurityTotal) {
	var valueDifferencePerSecurity = getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal);
	valueDifferencePerSecurity.sort(sortDiffValuePerSecurityDescending);
	
	var cashRemainingToGet = -1 * investmentAmount;
	var valueReductionPerSecurity = [];
	for (var i = 0; i < valueDifferencePerSecurity.length; i++) {
		valueReductionPerSecurity.push(0);
	}
	while (cashRemainingToGet > 0 && reductionPerSecurity != 0) {
		var lastSecurityToRemoveFromIndex = 0;
		var reductionPerSecurity = 0;
		while (valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1] != null && valueDifferencePerSecurity[lastSecurityToRemoveFromIndex][1] == valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1][1]) {
			lastSecurityToRemoveFromIndex++;
		}
		if (valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1] != null) {
			var valueDifference = Math.abs(valueDifferencePerSecurity[lastSecurityToRemoveFromIndex][1] - valueDifferencePerSecurity[lastSecurityToRemoveFromIndex + 1][1]);
			reductionPerSecurity = Math.min(cashRemainingToGet / (lastSecurityToRemoveFromIndex + 1), valueDifference);
		} else {
			reductionPerSecurity = cashRemainingToGet / (lastSecurityToRemoveFromIndex + 1);
		}
		for (var currentSecurityToAddTo = 0; currentSecurityToAddTo <= lastSecurityToRemoveFromIndex; currentSecurityToAddTo++) {
			valueDifferencePerSecurity[currentSecurityToAddTo][1] -= reductionPerSecurity;
			valueReductionPerSecurity[valueDifferencePerSecurity[currentSecurityToAddTo][0]]-= reductionPerSecurity;
			cashRemainingToGet -= reductionPerSecurity;
		}
	}
	return valueReductionPerSecurity;
};

export function getUpdatedValuePerSecurityArray(valuePerSecurityCurrent, valueDifferencePerSecurity) {
	var updatedValuePerSecurityArray = valuePerSecurityCurrent.slice(0);
	for (var i = 0; i < updatedValuePerSecurityArray.length; i++) {
		updatedValuePerSecurityArray[i] += valueDifferencePerSecurity[i];
	}
	return updatedValuePerSecurityArray;
};

export function getValueDifferencePerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal) {
	var valueDifferencePerSecurity = [];
	for (var i = 0; i < valuePerSecurityCurrent.length; i++) {
		valueDifferencePerSecurity.push(valuePerSecurityCurrent[i] - valuePerSecurityTotal[i]);
	}
	return valueDifferencePerSecurity;
};

export function getValueAdjustmentsNeededPerSecurity(valuePerSecurityCurrent, valuePerSecurityTotal) {
	var valueDifferencePerSecurity = [];
	for (var i = 0; i < valuePerSecurityCurrent.length; i++) {
		valueDifferencePerSecurity.push(valuePerSecurityTotal[i] - valuePerSecurityCurrent[i]);
	}
	return valueDifferencePerSecurity;
};

export function getValueDifferencePerSecurityWithIndex(valuePerSecurityCurrent, valuePerSecurityTotal) {
	var valueDifferencePerSecurity = [];
	for (var i = 0; i < valuePerSecurityTotal.length; i++) {
		valueDifferencePerSecurity.push([i, valuePerSecurityCurrent[i] - valuePerSecurityTotal[i]]);
	}
	return valueDifferencePerSecurity;
};

export function getUnitsForValuePerSecurity(valuePerSecurity, portfolio) {
	var unitsForValuePerSecurity = [];
	for (var i = 0; i < valuePerSecurity.length; i++) {
		unitsForValuePerSecurity.push(valuePerSecurity[i] / portfolio[i].price.number);
	}
	return unitsForValuePerSecurity;
}
