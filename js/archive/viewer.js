/*==============================================================
    G.R.B.C. CENTRAL INTELLIGENCE ARCHIVE

    viewer.js

    Responsible ONLY for displaying documents.

==============================================================*/

"use strict";

const ArchiveViewer = {

    /*==========================================================
        DISPLAY DOCUMENT
    ==========================================================*/

    show(doc){

        Archive.currentDocument = doc;

        this.highlight(doc.id);

        const viewer = document.getElementById("viewer");

        let body = "";

        if(Array.isArray(doc.body)){

            body = doc.body
                .map(line => `<p>${line}</p>`)
                .join("");

        }

        let related = "";

        if(Array.isArray(doc.related) && doc.related.length){

            related = `

                <div class="archive-related">

                    <h3>Related Documents</h3>

                    ${doc.related.map(id =>

                        `<a href="#" data-id="${id}">${id}</a>`

                    ).join("")}

                </div>

            `;

        }

        viewer.innerHTML = `

            <h2>${doc.id}</h2>

            <h3>${doc.title}</h3>

            <div class="archive-meta">

                <div class="archive-label">Classification</div>
                <div>${doc.classification}</div>

                <div class="archive-label">Era</div>
                <div>${doc.era}</div>

                <div class="archive-label">Author</div>
                <div>${doc.author}</div>

                <div class="archive-label">Location</div>
                <div>${doc.location}</div>

            </div>

            <div class="archive-body">

                ${body}

            </div>

            ${related}

        `;

        this.bindRelated();

    },

    /*==========================================================
        HIGHLIGHT RESULT
    ==========================================================*/

    highlight(id){

        document
            .querySelectorAll(".archive-result")
            .forEach(card=>{

                card.classList.remove("active");

                const ref =
                    card.querySelector(".archive-result-id");

                if(ref && ref.textContent.trim()===id){

                    card.classList.add("active");

                }

            });

    },

    /*==========================================================
        RELATED LINKS
    ==========================================================*/

    bindRelated(){

        document
            .querySelectorAll(".archive-related a")
            .forEach(link=>{

                link.addEventListener("click",(e)=>{

                    e.preventDefault();

                    const id =
                        link.dataset.id;

                    const doc =
                        Archive.documents.find(

                            d=>d.id===id

                        );

                    if(doc){

                        ArchiveViewer.show(doc);

                    }

                });

            });

    }

};
