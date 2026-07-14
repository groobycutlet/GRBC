/*==============================================================
    G.R.B.C. CENTRAL INTELLIGENCE ARCHIVE

    search.js

    Handles searching only.

==============================================================*/

"use strict";

const ArchiveSearch = {

    /*==========================================================
        INITIALISE
    ==========================================================*/

    initialise(){

        const input =
            document.getElementById("searchBox");

        const button =
            document.getElementById("searchButton");

        button.addEventListener("click", () => {

            this.search();

        });

        input.addEventListener("keydown", (event) => {

            if(event.key === "Enter"){

                this.search();

            }

        });

    },

    /*==========================================================
        SEARCH
    ==========================================================*/

    search(){

        const query =
            document
                .getElementById("searchBox")
                .value
                .trim()
                .toLowerCase();

        if(query === ""){

            Archive.filtered = [];

            ArchiveUI.showWelcome();

            return;

        }

        Archive.filtered =
            Archive.documents.filter(doc =>{

                const body =
                    Array.isArray(doc.body)
                        ? doc.body.join(" ").toLowerCase()
                        : "";

                const tags =
                    Array.isArray(doc.tags)
                        ? doc.tags.join(" ").toLowerCase()
                        : "";

                return(

                    doc.id.toLowerCase().includes(query)

                    ||

                    doc.title.toLowerCase().includes(query)

                    ||

                    body.includes(query)

                    ||

                    tags.includes(query)

                );

            });

        if(Archive.filtered.length === 0){

            ArchiveUI.showNoResults();

            return;

        }

        ArchiveUI.showResults(

            Archive.filtered

        );

    }

};
