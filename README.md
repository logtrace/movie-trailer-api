# movie-trailer-api

## Setup

* Execute the following command to get the repo from github.
```
git clone https://github.com/logtrace/movie-trailer-api.git
```
* Navigate to movie-trailer-api directory
```
cd movie-trailer-api

```
* To install dependencies execute;
```
npm install
```

## Configuration

* Replace `tmdb.queryParams.api_key` in `src/config.js` with a production key at the production deployment.
* `cacheTimeout` can be changed according to the requirements at the production time. The default value is `1 day` which is a good compromise for a content driven service.

## Running

### Executing tests
Tests are written using `mocha`, `chai` and `chai-as-promised`. Instead of calling the actual API endpoints during tests, `nock` is used to simulate the api responses when tests are run.

```
npm run testonly
```

### Tryout the service
Following command will transpile the code and copy them into `/dist` directory. The service is run from this directory.

```
npm start
```
* Use curl or postman to send requests
```
http://localhost:3000/trailer?resourceLink=https://content.viaplay.se/pc-se/film/arrival-2016
```
Sample response;

```
{
    "resource": "https://content.viaplay.se/pc-se/film/arrival-2016",
    "trailers": [
        {
            "iso_639_1": "en",
            "iso_3166_1": "US",
            "key": "gwqSi_ToNPs",
            "name": "\"Global War\" Spot",
            "site": "YouTube",
            "size": 1080,
            "type": "Teaser",
            "url": "https://www.youtube.com/watch?v=gwqSi_ToNPs"
        },
        {
            "iso_639_1": "en",
            "iso_3166_1": "US",
            "key": "tFMo3UJ4B4g",
            "name": "Official Trailer",
            "site": "YouTube",
            "size": 1080,
            "type": "Trailer",
            "url": "https://www.youtube.com/watch?v=tFMo3UJ4B4g"
        },
        {
            "iso_639_1": "en",
            "iso_3166_1": "US",
            "key": "WH9F4WkvhRk",
            "name": "Official Tailer 2",
            "site": "YouTube",
            "size": 720,
            "type": "Trailer",
            "url": "https://www.youtube.com/watch?v=WH9F4WkvhRk"
        }
    ]
}
```
## Design & implementation

* Implementation is modularized carefully so that each functionality can be easily tested and versioned.
* If the service should be run in a serverless environment similar to AWS lambda, the only modification this should do is to provide a handler function to handle the event and pass the resource link to the existing implementation, given the parameter is the same.
* Promise based implementation is used since this is more maintainable than the callback based alternative.
* Implementation is done using ES6 features. Babel transpiler is used to transpile the code into standard pre ES6 javascript, so that the implementation will run from node 6.x.x upwords. Supporting the node 6.x.x is important if decision is made to deploy this as a AWS lambda or in an environment which still uses node 6, which is a popular version todate.
* Response was designed to contain both the requested resource url, trailer video url and related meta data all associated. Metadata is important when the trailers were displayed in a user interface. Resource link is associated with the trailer data, so that if this service is extended to return trailers related to multiple resource links, the same object template can be used for all the content in an array format response.
```
[
    {
        "resource": "https://content.viaplay.se/pc-se/film/arrival-2016",
        "trailers": [
            {...},
            {...},
            {...}
        ]
    },
    {
        "resource": "https://content.viaplay.se/pc-se/film/avengers-2017",
        "trailers": [
            {...},
            {...},
            {...}
        ]
    }
]
```
* Caching is implemented to cache the endpoint response. Which is more sensible, for the service is content driven. For the same resource link it should return the same content, in this case trailer urls and metadata. Caching is implemented to a minimal level by giving a sensible default as `1 day`. This would make things work for both ways. For a certain resource the current content would cached for 1 day. If a new trailer content is added today. It would be available by tomorrow and will be cached. Caching can be improved using an external caching solution or a popular nosql db like `Redis`.

## Left out
* Logging is implemented only in `server.js` to show the approach but other source code was left out. Logging level change according to the environment is not implemented but can be easily achieved by extending the current implementation. This is intentionally left out since these are various aspects of an implementation which is important but not necessarily the focus of this assignment.

* API versioning is not added but should be and important part. This was left out since there are no functionlity to add as a different version.