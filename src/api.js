import agent from 'superagent';

export async function transactionsAPI() {
  
  let data = await agent('GET', 'http://private-5d708-interviewfront.apiary-mock.com/transactions');
  return JSON.parse(data.text);
  
}

export function euroToGbp(euro) {

  return parseInt(euro * 0.89 * 100) / 100

}