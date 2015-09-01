
module.exports = [

  // curl -H "Content-Type: application/json" -X POST -d '{"some": "data"}' http://localhost:3000/test
  {
    url: '/test',
    lambda: {
      FunctionName: 'some-lambda',
      InvocationType: 'RequestResponse', // Wait for execution
      LogType: 'None'
    }
  },

  // curl -H "Content-Type: application/json" -X POST -d '{"some": "data"}' http://localhost:3000/sample/123456789
  {
    url: '/sample/:tasktoken',
    lambda: {
      FunctionName: 'echo',
      InvocationType: 'Event', // Don't wait
      LogType: 'None'
    }
  }

];
