/*==============================================================
    G.R.B.C. CENTRAL INTELLIGENCE ARCHIVE

    loader.js

    Responsible ONLY for loading JSON collections.

==============================================================*/

"use strict";

const ArchiveLoader = {

    /*==========================================================
        LOAD COLLECTION
    ==========================================================*/

    async load(path){

        try{

            const response = await fetch(path);

            if(!response.ok){

                throw new Error(

                    "Unable to load " + path

                );

            }

            const json = await response.json();

            Archive.collectionName = json.collection;

            Archive.documents = json.documents;

            Archive.filtered = [];

            document.getElementById(

                "collectionTitle"

            ).textContent = json.collection;

            ArchiveUI.showWelcome();
            /* Initialise the search controls */
            ArchiveSearch.initialise();

        }

        catch(error){

            console.error(error);

            ArchiveUI.showError(

                "Unable to load archive collection."

            );

        }

    }

};
