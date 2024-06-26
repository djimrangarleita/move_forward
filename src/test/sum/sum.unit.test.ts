import { sum } from '../../sum';

describe('Test sum module', () => {
  test('test that 3 + 5 returns 8', () => {
    expect(sum(3, 5)).toBe(8);
  });
});
