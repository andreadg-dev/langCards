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

function setCopyright() {
  $("#copyright").text(`Copyright ©${new Date().getFullYear()}`);
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
    let randomIndex = Math.floor(Math.random() * SENTENCES.length);
    $("#startScreen").addClass("hidden");
    $("#cardGame").removeClass("hidden");

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
      `<div class="row">${MAIN_CARD}<div class="col-sm">${SECONDARY_CARDS.join(
        ""
      )}</div></div>`
    );
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
};
