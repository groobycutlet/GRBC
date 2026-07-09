/*==============================================================
    G.R.B.C. CENTRAL ARCHIVE
==============================================================*/

let archiveData = null;
let documents = [];
let filteredDocuments = [];
let currentCollection = "";

/*==============================================================
    COLLECTIONS
==============================================================*/

const collections = {

    stag: "data/stag.json",

    radio: "data/radio.json",

    aar: "data/aar.json",

    personnel: "data/personnel.json",

    timeline: "data/timeline.json",

    declassified: "data/declassified.json"

};

/*==============================================================
    STARTUP
==============================================================*/

document.addEventListener("DOMContentLoaded", initArchive);

/*==============================================================
    INITIALISE
==============================================================*/

async function initArchive(){

    const params = new URLSearchParams(window.location.search);

    currentCollection = params.get("collection") || "stag";

    if(!(currentCollection in collections)){

        currentCollection = "stag";

    }

    await loadCollection();

    setupSearch();

}

/*==============================================================
    LOAD COLLECTION
==============================================================*/

async function loadCollection(){

    try{

        const response = await fetch(collections[currentCollection]);

        archiveData = await response.json();

        documents = archiveData.documents;

        filteredDocuments = [...documents];

        document.getElementById("collectionTitle").textContent =
            archiveData.collection;

        renderResults();

        showWelcomeScreen();

    }

    catch(error){

        console.error(error);

        document.getElementById("viewer").innerHTML =

        `
        <h2>Archive Error</h2>

        <p>Unable to load collection.</p>
        `;

    }

}

/*==============================================================
    SEARCH
==============================================================*/

function setupSearch(){

    const search = document.getElementById("searchBox");

    search.addEventListener("input", function(){

        performSearch(this.value);

    });

}

/*==============================================================
    SEARCH ENGINE
==============================================================*/

function performSearch(query){

    query = query.toLowerCase().trim();

    if(query === ""){

        filteredDocuments = [...documents];

    }
    else{

        filteredDocuments = documents.filter(doc =>{

            const body =
                Array.isArray(doc.body)
                ? doc.body.join(" ").toLowerCase()
                : "";

            const tags =
                Array.isArray(doc.tags)
                ? doc.tags.join(" ").toLowerCase()
                : "";

            return(

                doc.id.toLowerCase().includes(query) ||

                doc.title.toLowerCase().includes(query) ||

                body.includes(query) ||

                tags.includes(query)

            );

        });

    }

    renderResults();

}

/*==============================================================
    RESULTS
==============================================================*/

function renderResults(){

    const container = document.getElementById("results");

    container.innerHTML = "";

    if(filteredDocuments.length === 0){

        container.innerHTML =

        `
        <div class="archive-result">

            No documents found.

        </div>
        `;

        return;

    }

    filteredDocuments.forEach(doc => {

        const card = createResultCard(doc);

        container.appendChild(card);

    });
}

/*==============================================================
    RESULT CARD
==============================================================*/

function createResultCard(doc){

    const div = document.createElement("div");

    div.className = "archive-result";

    div.innerHTML =

    `
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

    div.addEventListener("click", () =>{

        document
            .querySelectorAll(".archive-result")
            .forEach(card =>{

                card.classList.remove("active");

            });

        div.classList.add("active");

        renderDocument(doc);

    });

    return div;

}

/*==============================================================
    DOCUMENT VIEWER
==============================================================*/

function renderDocument(doc){

    const viewer = document.getElementById("viewer");

    let body = "";

    if(Array.isArray(doc.body)){

        body = doc.body.join("<br><br>");

    }

    let related = "";

    if(Array.isArray(doc.related) && doc.related.length){

        related =

        `
        <div class="archive-related">

            <h3>Related Documents</h3>

            ${doc.related.map(id =>

                `<a href="#" onclick="openRelated('${id}'); return false;">${id}</a>`

            ).join("")}

        </div>
        `;

    }

    viewer.innerHTML =

    `
    <h2>${doc.id}</h2>

    <h3>${doc.title}</h3>

    <div class="archive-meta">

        <div class="archive-label">Classification</div>
        <div class="archive-value">${doc.classification}</div>

        <div class="archive-label">Era</div>
        <div class="archive-value">${doc.era}</div>

        <div class="archive-label">Author</div>
        <div class="archive-value">${doc.author}</div>

        <div class="archive-label">Location</div>
        <div class="archive-value">${doc.location}</div>

    </div>

    <div class="archive-body">

        ${body}

    </div>

    ${related}
    `;

}

/*==============================================================
    RELATED DOCUMENTS
==============================================================*/

function openRelated(id){

    const doc = documents.find(d => d.id === id);

    if(!doc){

        return;

    }

    renderDocument(doc);

    document
        .querySelectorAll(".archive-result")
        .forEach(card=>{

            card.classList.remove("active");

        });

    document
        .querySelectorAll(".archive-result")
        .forEach(card=>{

            if(card.querySelector(".archive-result-id").textContent.trim()===id){

                card.classList.add("active");

                card.scrollIntoView({

                    behavior:"smooth",

                    block:"center"

                });

            }

        });

}
