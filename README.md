# Document Enricher
Note: Requires Node v6+

## Overview
There are a series of npm scripts that will set up the pipeline.
The first script turns the text files found in ```data/raw/text_data``` into JSON files.
The second script will send the JSON files to AlchemyAPI for enrichment.
The third script will populate elasticsearch with the enriched data.
The fourth script can be used to query elasticsearch.

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
It will have 250 documents in it. In the future, it can be possible to have
__n__ documents using [npm script arguments](https://docs.npmjs.com/cli/run-script).

Next, the JSON objects must be enriched.  
Run the script:  
```
$ npm run build:enriched-dev
```
This will enrich the documents from ```data/formatted/pre_enriched_sample.json```
and write them into a file called ```data/formatted/enriched_sample.json```.
To enrich all of the documents, you can edit the ```package.json``` file and change the
script ```build:enriched``` to ```node scripts/enricher/index.js```.
Running a combined call on that many documents is a lot of API calls...  

So now it is time to put the data into elasticsearch. Make sure to have elasticsearch
installed and and running. The default URI is ```localhost:9200```. It is currently
hard coded into ```scripts/db/connection.js``` but it could also be placed in the
```.env``` file as an environmental variable.  

To bulk add data to elasticsearch, run the script:  
```
$ npm run build:db
```

This will read the file ```data/formatted/enriched_sample.json``` and bulk add it to
elasticsearch.

To query elasticsearch, there is a query script.
It currently only supports simple searching through
the types of entities in an article. More functionality planned
for the future. To search, run the script:  
```
$ npm run query -- QUERY_HERE
```

It is important to place the query at the end of the script.
The script will print the docs that match.

It would also be possible to write the results of the query to a file.

## Technologies
- Node.js
- AlchemyAPI combined call
- Elasticsearch

## Queries
Example queries:
- What are the top entities of type "Person" mentioned in the corpus?
Run the command:
```$ npm run query -- Person```  
This will print the full documents that are about people.

## Dataset
http://mlg.ucd.ie/datasets/bbc.html

## Testing
```
$ npm test
```

## Issues
- Sometimes a query will return too many documents