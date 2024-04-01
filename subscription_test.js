let assert = require('chai').assert;

const users = [
  {
    id: 1,
    name: 'Employee #1',
    activatedOn: new Date('2019-01-01'),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 2,
    name: 'Employee #2',
    activatedOn: new Date('2019-01-01'),
    deactivatedOn: null,
    customerId: 1,
  },
  {
    id: 2,
    name: 'Employee #3',
    activatedOn: new Date('2019-01-01'),
    deactivatedOn: new Date('2019-01-31'),
    customerId: 1,
  },
];

const plan = {
  id: 1,
  customerId: 1,
  monthlyPriceInCents: 5000,
};

describe('monthlyCharge', function() {
  it('works when no users are active', function () {
    assert.equal(monthlyCharge('2018-10', plan, users), 0);
  });

  it('works when the active users are active the entire month', function() {
    const expectedUserCount = 2;
    assert.closeTo(monthlyCharge('2020-12', plan, users), expectedUserCount * 5000, 1);
  });
});
