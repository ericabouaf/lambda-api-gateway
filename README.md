# Lambda API Gateway

Simple HTTP Gateway to call AWS lambda functions

## Why ?

While AWS API Gateway is awesome, and can start lambdas, it still has some issues :

 * Does not have a programmatic API
 * Has an issue parsing 'Content-Type: application/json; charset=UTF-8'

## Usage

Download locally, then launch :

    node index.js sample-jobs.js

## Job example

````js
{
  url: '/test',
  lambda: {
    FunctionName: 'some-lambda',
    InvocationType: 'RequestResponse', // Wait for execution
    LogType: 'None'
  }
}
````

````js
{
  url: '/resource/:someurl',
  lambda: {
    FunctionName: 'some-lambda',
    InvocationType: 'RequestResponse', // Wait for execution
    LogType: 'None'
  }
}
````

## Calling lambdas through HTTP

    curl -H "Content-Type: application/json" -X POST -d '{"some": "data"}' http://localhost:3000/test

Will run the lambda with input: {"some": "data"}

In the case you use URL parameters, they will get merged into the body. Ex :

    curl -H "Content-Type: application/json" -X POST -d '{"some": "data"}' http://localhost:3000/resource/1234

Will run the lambda with input: {"some": "data", "someurl": "1234"}


# License

(The MIT License)

Copyright (c) 2015 Eric Abouaf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
