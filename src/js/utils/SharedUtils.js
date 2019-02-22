export function probabilityCalc(type, valueA, valueB) {
	// returns a probability calculation based on one of two types, or false if invalid params
	const validTypes = ['combine', 'either'];

	// check the passed values are in range and the type is valid
	if (!validProbability(valueA) ||
		!validProbability(valueB) ||
		!validTypes.includes(type)) return false;

	// parseFloats to ensure maths works correctly
	valueA = parseFloat(valueA);
	valueB = parseFloat(valueB);

	if ('combine' === type) return valueA * valueB;
	if ('either' === type) return valueA + valueB - (valueA * valueB);
}

export function validProbability(value) {
	// check is passed value is a valid probability (>=0 and <=1)
	
	// null returned to prevent initial invalid flag on text values
	if (!value) return null;

	// check number is in range
	if ((value > 1) || (value < 0)) return false;

	return true;
}
