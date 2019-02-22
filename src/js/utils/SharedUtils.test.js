import { probabilityCalc, validProbability } from './SharedUtils';

test('empty probability value returns null', () => {
	expect(validProbability()).toBe(null);
})

test('none number values returns false', () => {
	expect(validProbability('string')).toBe(false);
})

test('probabilities outside of acceptable range return false', () => {
	expect(validProbability(1.1)).toBe(false);
	expect(validProbability(-0.5)).toBe(false);
})

test('valid probability value returns true', () => {
	expect(validProbability(0.5)).toBe(true);
})

test('invalid type returns false', () => {
	expect(probabilityCalc('wrong', 0.5, 0.5)).toBe(false);
})

test('invalid number ranges returns false', () => {
	expect(probabilityCalc('combine', -0.5, 0.5)).toBe(false);
	expect(probabilityCalc('combine', 0.5, -0.5)).toBe(false);
	expect(probabilityCalc('combine', 1.5, 0.5)).toBe(false);
	expect(probabilityCalc('combine', 0.5, 1.5)).toBe(false);
	expect(probabilityCalc('combine', -0.5, 1.5)).toBe(false);
})

test('valid values returns result based on formula type', () => {
	expect(probabilityCalc('combine', 0.5, 0.5)).toBe(0.25);
	expect(probabilityCalc('either', 0.5, 0.5)).toBe(0.75);
})