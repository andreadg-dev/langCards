////////////////////////////////
////////////////////////////////
//         SENTENCES
////////////////////////////////
////////////////////////////////
const SENTENCES = [
  {
    ID: 1,
    MAIN_EN: "Stay in your room until you've tidied up!",
    DE: "Bleib in deinem Zimmer, bis du aufgeräumt hast!",
    NL: "Blijf in je kamer tot je hebt opgeruimd!",
  },
  {
    ID: 2,
    MAIN_EN: "The ethics teacher has recommended a good book.",
    DE: "Der Ethiklehrer hat ein gutes Buch empfohlen.",
    NL: "De leraar ethiek heeft een goed boek aanbevolen.",
  },
  {
    ID: 3,
    MAIN_EN: "You can't see him, he's already gone!",
    DE: "Du kannst ihn nicht sehen, er ist schon gegangen!",
    NL: "Je kunt hem niet zien, hij is al weg!",
  },
  {
    ID: 4,
    MAIN_EN: "She's been on the phone to her sister-in-law all day.",
    DE: "Sie hat den ganzen Tag mit ihrer Schwägerin telefoniert.",
    NL: "Ze belt al de hele dag met haar schoonzus.",
  },
  {
    ID: 5,
    MAIN_EN: "He hasn't decided what he's going to have for breakfast.",
    DE: "Er hat sich nicht entschieden, was er frühstücken wird.",
    NL: "Hij heeft nog niet besloten wat hij als ontbijt gaat nemen.",
  },
  {
    ID: 6,
    MAIN_EN: "This notebook used to be mine.",
    DE: "Dieses Heft hat früher einmal mir gehört.",
  },
  {
    ID: 7,
    MAIN_EN: "The glass has fallen off the table.",
    DE: "Das Glas ist vom Tisch gefallen.",
  },
];

////////////////////////////////
////////////////////////////////
//         FUNCTIONS
////////////////////////////////
////////////////////////////////

//Set copyright
function setCopyright() {
  $("#copyright").text(`Copyright ©${new Date().getFullYear()}`);
}

//Generate cards
/* function createCards(previousIndex) {
  if ($("#cardsSection")) {
    $("#cardsSection").remove();
  }

  let randomIndex;
  let currentCheckpoint;
  if (!previousIndex) {
    if ($("#checkPoint").text() === "") {
      currentCheckpoint = [];
    } else {
      currentCheckpoint = JSON.parse($("#checkPoint").text());
    }
    do {
      randomIndex = Math.floor(Math.random() * SENTENCES.length);
    } while (currentCheckpoint.includes(randomIndex));

    currentCheckpoint.push(randomIndex);
    console.log(currentCheckpoint);
    $("#checkPoint").text(JSON.stringify(currentCheckpoint));
  } else {
    randomIndex = previousIndex;
  }

  let MAIN_CARD;
  const SECONDARY_CARDS = [];
  for (const property in SENTENCES[randomIndex]) {
    //console.log(`${property}: ${SENTENCES[randomIndex][property]}`);
    if (property !== "ID") {
      if (property.includes("MAIN_")) {
        MAIN_CARD = `<div class="col-sm" id="mainCardCol">
                <div class="card bg-dark text-white">
                     <div class="card-body">
                        <span class="langInitials">${property.replace(
                          "MAIN_",
                          ""
                        )} •</span> 
                        <span>${SENTENCES[randomIndex][property]}</span>
                    </div>
                </div>
            </div>`;
      } else {
        SECONDARY_CARDS.push(`
            <div class="card bg-dark text-white">
                <div class="card-body">
                    <span class="langInitials">${property} •</span> 
                    <span class="hiddenSentences">${SENTENCES[randomIndex][property]}</span>
                </div>
            </div>`);
      }
    }
  }

  $("#cardGame").prepend(
    `<div class="row" id="cardsSection">${MAIN_CARD}<div class="col-sm">${SECONDARY_CARDS.join(
      ""
    )}</div></div>`
  );
} */

function createCards(button) {
  if ($("#cardsSection")) {
    $("#cardsSection").remove();
  }

  let randomIndex;
  let currentCheckpoint = JSON.parse($("#checkPoint").text());

  if (button === "next") {
    if (currentCheckpoint.length === SENTENCES.length) {
      alert("All sentences have been used!");
      return; // Stop execution if all sentences have been shown
    }

    randomIndex = Math.floor(Math.random() * SENTENCES.length);
    if (currentCheckpoint === "[]") {
      $("#checkPoint").text(JSON.stringify(`[${randomIndex}]`));
    } else {
      do {
        randomIndex = Math.floor(Math.random() * SENTENCES.length);
      } while (currentCheckpoint.includes(randomIndex));
      currentCheckpoint.push(randomIndex);
      console.log(`Current checkpoint: ${currentCheckpoint}`);
      $("#checkPoint").text(JSON.stringify(currentCheckpoint));
    }
  }
  if (button === "previous") {
    if (currentCheckpoint.length >= 2) {
      currentCheckpoint.pop();
      randomIndex = currentCheckpoint.length - 1;
      $("#checkPoint").text(JSON.stringify(currentCheckpoint));
      console.log(`Current checkpoint: ${$("#checkPoint").text()}`);
    } else {
      alert("No previous sentences found!");
      return;
    }
  }

  console.log(`Random Index: ${randomIndex}`);
  console.log(SENTENCES[randomIndex]);
  if (
    randomIndex !== null &&
    randomIndex !== undefined &&
    randomIndex !== "[]"
  ) {
    let MAIN_CARD;
    const SECONDARY_CARDS = [];
    for (const property in SENTENCES[randomIndex]) {
      //console.log(`${property}: ${SENTENCES[randomIndex][property]}`);
      if (property !== "ID") {
        if (property.includes("MAIN_")) {
          MAIN_CARD = `<div class="col-sm" id="mainCardCol">
                  <div class="card bg-dark text-white">
                       <div class="card-body">
                          <span class="langInitials">${property.replace(
                            "MAIN_",
                            ""
                          )} •</span> 
                          <span>${SENTENCES[randomIndex][property]}</span>
                      </div>
                  </div>
              </div>`;
        } else {
          SECONDARY_CARDS.push(`
              <div class="card bg-dark text-white">
                  <div class="card-body">
                      <span class="langInitials">${property} •</span> 
                      <span class="hiddenSentences">${SENTENCES[randomIndex][property]}</span>
                  </div>
              </div>`);
        }
      }
    }

    $("#progressInfo").text(
      `Progress: ${currentCheckpoint.length}/${SENTENCES.length}`
    );
    $("#cardId").text(`Card Id: ${SENTENCES[randomIndex].ID}`);
    //$("#cardGame").prepend(`<div class="row" id="cardsSection">${MAIN_CARD}<div class="col-sm">${SECONDARY_CARDS.join("")}</div></div>`);
    $(
      `<div class="row" id="cardsSection">${MAIN_CARD}<div class="col-sm">${SECONDARY_CARDS.join(
        ""
      )}</div></div>`
    ).insertAfter("#controlBtn");
  }
}

////////////////////////////////
////////////////////////////////
//         SCRIPT
////////////////////////////////
////////////////////////////////
window.onload = (event) => {
  console.log("Page is fully loaded");
  setCopyright();

  $("#darkmode").on("click", function () {
    $("body").removeClass("lightmode").addClass("darkmode");
    $("#lightmode").removeClass("active");
    $("#darkmode").addClass("active");
    $(".card").addClass("bg-dark text-white");
    $(".card").removeClass("border-dark");
    $(".card-body").removeClass("text-dark");
  });

  $("#lightmode").on("click", function () {
    $("body").removeClass("darkmode").addClass("lightmode");
    $("#darkmode").removeClass("active");
    $("#lightmode").addClass("active");
    $(".card").removeClass("bg-dark text-white");
    $(".card").addClass("border-dark");
    $(".card-body").addClass("text-dark");
  });

  //Behaviour when pressing the startBtn
  $("#startBtn").on("click", function () {
    $("#startScreen").addClass("hidden");
    $("#cardGame").removeClass("hidden");
    $("#previousBtn").attr("disabled", "disabled");
    createCards("next");
  });

  //Reveal sentences when pressing on the revealBtn
  $("#revealBtn").on("click", function () {
    let sentences = $(".hiddenSentences");
    let button = $(this);
    sentences.slideToggle({
      complete: function () {
        if (sentences.is(":visible")) {
          button.text("HIDE");
        } else {
          button.text("REVEAL");
        }
      },
    });
  });

  //Next button
  $("#nextBtn").on("click", function () {
    createCards("next");
    $("#previousBtn").removeAttr("disabled");
  });

  //Previous button
  $("#previousBtn").on("click", function () {
    createCards("previous");
  });
};

///////TO CHECK
