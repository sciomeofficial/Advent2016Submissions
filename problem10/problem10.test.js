const { input1, input2 } = require('./input10');
const botGraph = require('./problem10');


describe('Problem 10 with input 2', () => {
  describe('Part 1', () => {
    test('Find the bot with the two values 17 and 63', () => {
      expect(botGraph(input2).foundBot).toBe(null);
    });
  });


  describe('Part 2', () => {
    test('Find the multiplication of output 0,1,2 when there is nothing there', () => {
      expect(botGraph(input2).total).toBe(0);
    });
  });
});

describe('Problem 10', () => {
  describe('Part 1', () => {
    test('Find the bot with the two values 17 and 63', () => {
      expect(botGraph(input1).foundBot).toBe('bot 93');
    });
  });


  describe('Part 2', () => {
    test('Find the multiplication of output 0,1,2', () => {
      expect(botGraph(input1).total).toBe(47101);
    });
  });
});

