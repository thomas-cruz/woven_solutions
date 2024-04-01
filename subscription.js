/**
 * Computes the monthly charge for a given subscription.
 *
 * @returns {number} The total monthly bill for the customer in cents, rounded
 * to the nearest cent. For example, a bill of $20.00 should return 2000.
 * If there are no active users or the subscription is null, returns 0.
 *
 * @param {string} month - Always present
 *   Has the following structure:
 *   "2022-04"  // April 2022 in YYYY-MM format
 *
 * @param {object} subscription - May be null
 *   If present, has the following structure:
 *   {
 *     'id': 763,
 *     'customerId': 328,
 *     'monthlyPriceInCents': 359  // price per active user per month
 *   }
 *
 * @param {array} users - May be empty, but not null
 *   Has the following structure:
 *   [
 *     {
 *       'id': 1,
 *       'name': "Employee #1",
 *       'customerId': 1,
 *   
 *       // when this user started
 *       'activatedOn': new Date("2021-11-04"),
 *   
 *       // last day to bill for user
 *       // should bill up to and including this date
 *       // since user had some access on this date
 *       'deactivatedOn': new Date("2022-04-10")
 *     },
 *     {
 *       'id': 2,
 *       'name': "Employee #2",
 *       'customerId': 1,
 *   
 *       // when this user started
 *       'activatedOn': new Date("2021-12-04"),
 *   
 *       // hasn't been deactivated yet
 *       'deactivatedOn': null
 *     },
 *   ]
 */
function monthlyCharge(month, subscription, users) {
  // your code here!
  if (users.length === 0 || !subscription) { //no users or no subscription
    return 0;
  }
  
  console.log({month})
  const [year, mon] = month.split('-');
  console.log({year, mon});
  const monthNum = parseInt(mon);
  const date = new Date(year, monthNum - 1);
  const firstDay = firstDayOfMonth(date);
  const lastDay = lastDayOfMonth(date);
  console.log({firstDay, lastDay})
  
  const diff = dateDiffInDays(firstDay, lastDay);
  const dailyRate = subscription.monthlyPriceInCents / diff;
  console.log({diff, dailyRate})
  console.log({users})
  const activeUsers = users.filter(user => {
    const activatedDate = new Date(user.activatedOn);
    const deactivatedDate = user.deactivatedOn ? new Date(user.deactivatedOn) : null;
    if (activatedDate <= lastDay) {
      if (deactivatedDate) {
        if (deactivatedDate >= firstDay && deactivatedDate <= lastDay) {
           return true;
        }
        return false;
      }
      return true;
    }
  });
  console.log(Math.round(activeUsers.length * subscription.monthlyPriceInCents))
  return Math.round(activeUsers.length * subscription.monthlyPriceInCents);
}

/*******************
* Helper functions *
*******************/

/**
 * Takes a Date instance and returns a Date which is the first day
 * of that month. For example:
 *
 * firstDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 1)
 *
 * Input type: Date
 * Output type: Date
**/
function firstDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

/**
 * Takes a Date object and returns a Date which is the last day of that month.
 *
 * lastDayOfMonth(new Date(2022, 3, 17)) // => new Date(2022, 3, 31)
 *
 * Input type: Date
 * Output type: Date
**/
function lastDayOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

/**
 * Takes a Date object and returns a Date which is the next day.
 * For example:
 *
 * nextDay(new Date(2022, 3, 17))  // => new Date(2022, 3, 18)
 * nextDay(new Date(2022, 3, 31))  // => new Date(2022, 4, 1)
 *
 * Input type: Date
 * Output type: Date
**/
function nextDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
}

function dateDiffInDays(a, b) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY) + 1;
}
