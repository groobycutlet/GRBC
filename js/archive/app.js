/*==============================================================
    G.R.B.C. CENTRAL INTELLIGENCE ARCHIVE

    app.js

    Main application entry point.

==============================================================*/

"use strict";

/*==============================================================
    GLOBAL ARCHIVE STATE
==============================================================*/

window.Archive = {

    collectionName: "",

    documents: [],

    filtered: [],

    currentDocument: null

};

/*==============================================================
    COLLECTION MAP
==============================================================*/

const COLLECTIONS = {

    stag: "data/stag.json",

    radio: "data/radio.json",

    aar: "data/aar.json",

    personnel: "data/personnel.json",

    timeline: "data/timeline.json",

    declassified: "data/declassified.json"

};

/*==============================================================
    GET URL COLLECTION
==============================================================*/

function getCollectionName(){

    const params = new URLSearchParams(window.location.search);

    const collection = params.get("collection");

    if(!collection){

        return "stag";

    }

    if(!(collection in COLLECTIONS)){

        return "stag";

    }

    return collection;

}

/*==============================================================
    START APPLICATION
==============================================================*/

document.addEventListener("DOMContentLoaded", initialiseArchive);

async function initialiseArchive(){

    const collection = getCollectionName();

    await ArchiveLoader.load(

        COLLECTIONS[collection]

    );

}
