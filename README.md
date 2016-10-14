# Document Enricher

## Overview
Provide a gist for how to run your pipeline.

## Technologies
- Node.js
- AlchemyAPI combined call
- Elasticsearch

## Queries
Example queries:
What are the top entities of type "Person" mentioned in the corpus?
What is the document count by day?
What is the average doc sentiment by day?

## Environmental Variables
Create a .env file in the root of the project that looks like this:
```
BLUEMIX_ACCOUNT = 'example'
BLUEMIX_PW = 'example'
```

## Dataset
http://mlg.ucd.ie/datasets/bbc.html

## Testing
```
$ npm test
```