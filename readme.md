# Terribly Tiny Tales Demo App

Takes an integer N, to get the N most frequently occuring words from a [text file](http://terriblytinytales.com/test.txt). Output displayed in a tabular format using pagination.

## Links

* [Project Url](https://terribly-tiny-tales-demo-app.herokuapp.com/)
* [Github Repo](https://github.com/jroratorio/tttDemo)

## Libraries and plugins

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [EJS](http://ejs.co/)
* [AngularJS](https://angularjs.org/)
* [Bootstrap 3](https://www.bootstrapcdn.com/)
* [dirPagination](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination)

## Working

Node.js is used as the server, serving the homepage route and the api routes. Any invalid url redirects to 404 error page or JSON error for xhr request. Any attempt for invalid api parameters results in error 500 JSON response.

Frontend uses AngularJS and bootstrap/css-animations for basic styling. UI contains a form which takes a positive integer N. Appropriate error message is flashed if invalid input is attempted.

On submission, xhr request is fired at /api/N route where N is a positive integer.

Node fetches the text file from the url, does all the math, computes the word frequency for each words, sorts them in descending order, and truncates the array and returns top N entries (the words and their counts) in JSON, with a status 200 if all goes okay.

Results are displayed in a tabular layout with pagination using [dirPagination](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination) module. 

## Testing

### Testing framework

* [Mocha](https://mochajs.org/) - for the test bed.
* [ShouldJS](https://shouldjs.github.io/) - assertion library.
* [Supertest](https://www.npmjs.com/package/supertest) - HTTP assertions made easier.

### Test Cases

Test cases are put in /test directory for better isolation. Subsequent test js files can be added to this directory as required.

Three test case suites have been used.

* URL Tests
    * Should get status 200 for home url.
    * Should get status 404 for any invalid url.
* API Tests for valid requests
    * Should return JSON array with 1 object with response 200 for /api/1.
    * Should return JSON array with 2 objects with response 200 for /api/2.
    * Should return JSON array with 3 objects with response 200 for /api/3.
* API Tests for invalid requests
    * Should return JSON error 500 for /api/0 route.
    * Should return JSON error 500 for negative value in route params like /api/-1.
    * Should return JSON error 500 for non-integer value in route params like /api/abc.

### Running the tests script

Test script is run using
```
npm test
```
### Test results

The following output is taken from Netbeans console.

```
1..8
ok 1 URL Test suite should get status 200 for home url
ok 2 URL Test suite should get status 404 for invalid url
ok 3 API Test suite for valid responses should return 1 objects in JSON response
ok 4 API Test suite for valid responses should return 2 objects in JSON response
ok 5 API Test suite for valid responses should return 3 objects in JSON response
ok 6 API Test suite for invalid responses should error JSON for /api/0 route
ok 7 API Test suite for invalid responses should error JSON for negative values in api route. example /api/-1
ok 8 API Test suite for invalid responses should error JSON for non-integer values in api route. example /api/abc
```

## Deployment

The application has been deployed on Heroku, which is set to automatically track the ```master``` branch of the [github repo](https://github.com/jroratorio/tttDemo) for automatic deployment. The url is [here](https://terribly-tiny-tales-demo-app.herokuapp.com/).


## Authors

* **Sayan Chakraborty** - [Github](https://github.com/jroratorio)
Email: jroratorio@gmail.com
Ph: +918981555352


