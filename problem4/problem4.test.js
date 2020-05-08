const { input1, input2 } = require('./input4');
const {
  addCheckSum,
  findRoom
} = require('./problem4');

describe('Problem 4', () => {
  describe('Part 1', () => {
    test('Find the sum of all the valid rooms', () => {
      expect(addCheckSum(input1)).toBe(245102);
    });
  });


  describe('Part 2', () => {
    test('Find the room id equal to northpole object storage', () => {
      expect(findRoom(input1)).toBe("324");
    });
  });
});

describe('Problem 4 with shorter input', () => {
  describe('Part 1', () => {
    test('Find the sum of all the valid rooms', () => {
      expect(addCheckSum(input2)).toBe(2565);
    });
  });


  describe('Part 2', () => {
    test('Find the room id equal to northpole object storage which shouldnt exist', () => {
      expect(findRoom(input2)).toBe(false);
    });
  });
});