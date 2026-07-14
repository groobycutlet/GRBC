/*==============================================================
    G.R.B.C. CENTRAL INTELLIGENCE ARCHIVE

    ui.js

    Handles ONLY user interface states.

==============================================================*/

"use strict";

const ArchiveUI = {

    /*==========================================================
        WELCOME
    ==========================================================*/

    showWelcome(){

        const results =
            document.getElementById("results");

        const viewer =
            document.getElementById("viewer");

        results.innerHTML = `

            <div class="archive-placeholder">

                Awaiting query...

            </div>

        `;

        viewer.innerHTML = `

            <div class="archive-placeholder">

                <h2>No Document Selected</h2>

                <p>

                    Enter an archive reference or keyword
                    above, then press SEARCH.

                </p>

            </div>

        `;

    },

    /*==========================================================
        ERROR
    ==========================================================*/

    showError(message){

        document.getElementById("results").innerHTML = "";

        document.getElementById("viewer").innerHTML = `

            <div class="archive-placeholder">

                <h2>Archive Error</h2>

                <p>

                    ${message}

                </p>

            </div>

        `;

    },

    /*==========================================================
        NO RESULTS
    ==========================================================*/

    showNoResults(){

        document.getElementById("results").innerHTML = `

            <div class="archive-placeholder">

                No matching documents found.

            </div>

        `;

    },

    /*==========================================================
        SHOW RESULTS
    ==========================================================*/

    showResults(list){

        const container =
            document.getElementById("results");

        container.innerHTML = "";

        list.forEach(doc=>{

            const card =
                document.createElement("div");

            card.className = "archive-result";

            card.innerHTML = `

                <div class="archive-result-id">

                    ${doc.id}

                </div>

                <div class="archive-result-title">

                    ${doc.title}

                </div>

                <div class="archive-result-meta">

                    ${doc.classification}

                    •

                    ${doc.location}

                </div>

            `;

            card.addEventListener("click",()=>{

                ArchiveViewer.show(doc);

            });

            container.appendChild(card);

        });

    }

};
