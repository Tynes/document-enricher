# Document Enricher

## Overview
Provide a gist for how to run your pipeline.

## Environmental Variables
Create a .env file in the root of the project that looks like this:
```
BLUEMIX_API_KEY = 'FILL_ME_IN'
```
You can get the Bluemix API Key by creating an account 
[here](http://www.ibm.com/cloud-computing/bluemix/).

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

You can only have 2000 API calls for free per day, so I recommend building
only a sample of data. To do so, run the script:  
```
$ npm run build:pre-enriched-dev
```
This will build a file called ```data/formatted/pre_enriched_sample.json```.
It will have 5 documents in it. In the future, it can be possible to have
__n__ documents using [npm script arguments](https://docs.npmjs.com/cli/run-script).

Next, the JSON objects must be enriched.  
Run the script:  
```
$ npm run build:enriched-dev
```
This will enrich the five documents from ```data/formatted/pre_enriched_sample.json```
and write them into a file called ```data/formatted/enriched_sample.json```.
To enrich all of the documents, you can edit the ```package.json``` file and change the
script ```build:enriched``` to ```node scripts/enricher/index.js```.
Running a combined call on that many documents is a lot of API calls...  

So now it is time to put the data into elasticsearch

## Technologies
- Node.js
- AlchemyAPI combined call
- Elasticsearch

## Queries
Example queries:
What are the top entities of type "Person" mentioned in the corpus?
What is the document count by day?
What is the average doc sentiment by day?

## Dataset
http://mlg.ucd.ie/datasets/bbc.html

## Testing
```
$ npm test
```