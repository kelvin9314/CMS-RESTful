import sum from '../../components/sum';

describe('sum', () => {
  it('should be add two numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
