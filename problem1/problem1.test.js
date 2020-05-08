const { input1, input2 } = require('./input1');
const {
  findDistance,
  findVisitedDistance
} = require('./problem1');

describe('Problem 1', () => {
  describe('Part 1', () => {
    test('Find the distance away from start', () => {
      expect(findDistance(input1)).toBe(307);
    });
  });


  describe('Part 2', () => {
    test('Find the distance away from the first point visited twice', () => {
      expect(findVisitedDistance(input1)).toBe(165);
    });
  });
});


describe('Problem 1 with second input test', () => {
  describe('Part 1', () => {
    test('Find the distance away from start', () => {
      expect(findDistance(input2)).toBe(4);
    });
  });


  describe('Part 2', () => {
    test('Find the distance away from the first point visited twice', () => {
      expect(findVisitedDistance(input2)).toBe(0);
    });
  });
});