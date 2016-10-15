# Document Enricher

## Overview
Provide a gist for how to run your pipeline.

## Installation
Start by cloning the repository and then install the dependencies with:  
```
$ npm i
```
The formatted data is in the ```.gitignore```, so you must build it yourself.
To build the pre-enriched data, run the command:  
```
$ npm run build:pre-enriched
```
There will now be a file ```data/formatted/pre_enriched.json```.
The data key contains an array of JSON objects, one for each text file
in ```data/raw/text_data```. There are over 2000 of them.  

Next, the JSON objects must be enriched.

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