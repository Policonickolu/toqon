import agent from 'superagent';
//agent(require('superagent'), Promise);

export default async function transactionsAPI() {
  
  let data = await agent('GET', 'http://private-5d708-interviewfront.apiary-mock.com/transactions');
  return JSON.parse(data.text);
  
}