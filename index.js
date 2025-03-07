////////////////////////////////
////////////////////////////////
//         FUNCTIONS
////////////////////////////////
////////////////////////////////

//Set copyright
function setCopyright() {
  $("#copyright").html(
    `Copyright ©${new Date().getFullYear()} ${$("#copyright").html()}`
  );
}

//Generate cards
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
      randomIndex = currentCheckpoint[currentCheckpoint.length - 1];
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
        const sourceLanguage = $("#sourceLanguage").html().trim();
        if (property.includes(sourceLanguage)) {
          //|| property.includes("MAIN_")
          MAIN_CARD = `<div class="col-sm" id="mainCardCol">
                  <div class="card bg-dark text-white">
                       <div class="card-body">
                          <span class="langInitials">${
                            property.includes("MAIN_")
                              ? property.replace("MAIN_", "")
                              : property
                          } •</span> 
                          <span>${SENTENCES[randomIndex][property]}</span>
                      </div>
                  </div>
              </div>`;
        } else {
          SECONDARY_CARDS.push(`
              <div class="card bg-dark text-white">
                  <div class="card-body">
                      <span class="langInitials">${
                        property.includes("MAIN_")
                          ? property.replace("MAIN_", "")
                          : property
                      } •</span> 
                      <span class="hiddenSentences">${
                        SENTENCES[randomIndex][property]
                      }</span>
                  </div>
              </div>`);
        }
      }
    }

    $("#progressInfo").text(
      `PROGRESS: ${currentCheckpoint.length}/${SENTENCES.length}`
    );
    $("#cardId").text(`CARD ID: ${SENTENCES[randomIndex].ID}`);
    //$("#cardGame").prepend(`<div class="row" id="cardsSection">${MAIN_CARD}<div class="col-sm">${SECONDARY_CARDS.join("")}</div></div>`);
    $(
      `<div class="row" id="cardsSection">${MAIN_CARD}<div class="col-sm">${SECONDARY_CARDS.join(
        ""
      )}</div></div>`
    ).insertAfter("#controlBtn");
  }
}

function newSentencesTables(sentences) {
  if (typeof sentences === "object") {
    let sentencesArray = [];
    let cardHeader = [];
    let cardBodyUl = [];
    for (let index = 0; index < sentences.length; index++) {
      for (const property in sentences[index]) {
        if (property === "ID") {
          cardHeader.push(
            `<div class="card-header">CARD .${sentences[index][property]}</div>`
          );
        } else {
          let language;
          if (property.includes("MAIN_")) {
            language = property.replace("MAIN_", "");
          } else {
            language = property;
          }
          cardBodyUl.push(
            `<li class="list-group-item"><span class="langInitials">${language} •</span> <span class="sentence">${sentences[index][property]}</span></li>`
          );
        }
      }

      sentencesArray.push(
        `<div class="card bg-dark cardSentence">${cardHeader}<ul class="list-group list-group-flush bg-dark">${cardBodyUl.join(
          ""
        )}</ul></div>`
      );

      cardHeader = [];
      cardBodyUl = [];
    }
    $("#sentencesTable").html(sentencesArray);
  } else {
    alert("The input for the sentences page is not an object!");
  }
}

function countKeysOccurrences(objArray) {
  let keysOccurrences = [];
  objArray.forEach((obj) => {
    Object.keys(obj).forEach((element) => {
      keysOccurrences.push(element);
    });
  });

  let keysOccurrencesCount = {};
  keysOccurrences.forEach((element) => {
    keysOccurrencesCount[element] = (keysOccurrencesCount[element] || 0) + 1;
  });

  let langButtons = "";

  Object.keys(keysOccurrencesCount).forEach((key) => {
    if (key !== "ID") {
      let langCode = key.includes("MAIN_") ? key.replace("MAIN_", "") : key;
      let btnActive = key.includes("MAIN_") ? "active" : "";
      let btnDisabled =
        objArray.length !== Number(keysOccurrencesCount[key]) ||
        key.includes("MAIN_")
          ? "disabled"
          : "";
      langButtons += `<button class='btn btn-outline-light ${btnActive}' ${btnDisabled}>${langCode}</button>`;
    }
  });

  return langButtons;
}

////////////////////////////////
////////////////////////////////
//         SCRIPT
////////////////////////////////
////////////////////////////////
window.onload = (event) => {
  console.log("Page is fully loaded");
  setCopyright();

  $("#sourceLanguage").html(
    SENTENCES && typeof SENTENCES === "object"
      ? Object.keys(SENTENCES[0]).find((element) => element.includes("MAIN_"))
      : ""
  );

  $("#darkmode").on("click", function () {
    $("body").removeClass("lightmode").addClass("darkmode");
    $("#lightmode").removeClass("active");
    $("#darkmode").addClass("active");
    $(".card").addClass("bg-dark text-white");
    $(".card").removeClass("border-dark");
    $(".card-body").removeClass("text-dark");
    $("#langButtons .btn").removeClass("btn-outline-dark");
    $("#langButtons .btn").addClass("btn-outline-light");
  });

  $("#lightmode").on("click", function () {
    $("body").removeClass("darkmode").addClass("lightmode");
    $("#darkmode").removeClass("active");
    $("#lightmode").addClass("active");
    $(".card").removeClass("bg-dark text-white");
    $(".card").addClass("border-dark");
    $(".card-body").addClass("text-dark");
    $("#langButtons .btn").removeClass("btn-outline-light");
    $("#langButtons .btn").addClass("btn-outline-dark");
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
    $("#revealBtn").text("REVEAL");
  });

  //Previous button
  $("#previousBtn").on("click", function () {
    createCards("previous");
  });

  $(document).on("click", ".langInitials", function () {
    let langInitials = $(this).text().split(" ")[0].trim();
    console.log(`Language initials: ${langInitials}`);

    if ($(this).next().is(":visible")) {
      responsiveVoice.speak($(this).next().text(), TTS_VOICES[langInitials], {
        rate: 0.8,
      });
    }
  });

  newSentencesTables(SENTENCES);

  //Filters sentences depending on search input
  $("#searchInput").on("input", function () {
    let searchInput = $(this).val().toLowerCase();

    $(".cardSentence").filter(function () {
      $(this).toggle($(this).html().toLowerCase().includes(searchInput));
    });
  });

  //Highlight sentences depending on search input
  $("#searchInput").on("input", function () {
    let searchInput = $(this).val();
    $(".searchHighlight").removeClass("searchHighlight");
    $(".sentence").each(function () {
      if (
        searchInput != "" &&
        $(this).text().search(new RegExp(searchInput, "gi")) != -1
      ) {
        $(this).addClass("searchHighlight");
      }
    });
  });

  $("#langButtons").append(countKeysOccurrences(SENTENCES));

  $(document).on("click", "#langButtons .btn", function () {
    $("#sourceLanguage").html($(this).text());
    $("#langButtons .btn").removeAttr("disabled");
    $("#langButtons .btn").removeClass("active");
    $(this).addClass("active");
  });
};

////////////////////////////////
////////////////////////////////
//         SENTENCES
////////////////////////////////
////////////////////////////////

const TTS_VOICES = {
  EN: "UK English Female",
  DE: "Deutsch Female",
  NL: "Dutch Female",
  FR: "French Female",
  IT: "Italian Female",
  PT: "Portuguese Female",
  ES: "Spanish Female",
};

const SENTENCES = [
  {
    ID: 1,
    MAIN_EN: "She was excited to visit her grandmother after so many months.",
    DE: "Sie freute sich darauf, ihre Großmutter nach so vielen Monaten zu besuchen.",
    NL: "Ze was opgewonden om na zoveel maanden haar oma te bezoeken.",
    PT: "Ela estava entusiasmada por visitar a avó ao fim de tantos meses.",
    FR: "Elle était ravie de rendre visite à sa grand-mère après tant de mois.",
    ES: "Estaba emocionada por visitar a su abuela después de tantos meses.",
    IT: "Era entusiasta di andare a trovare la nonna dopo tanti mesi.",
  },
  {
    ID: 2,
    MAIN_EN: "I forgot my umbrella, so I got wet in the rain.",
    DE: "Ich habe meinen Regenschirm vergessen und bin im Regen nass geworden.",
    NL: "Ik was mijn paraplu vergeten, dus ik werd nat in de regen.",
    PT: "Esqueci-me do meu guarda-chuva e molhei-me com a chuva.",
    FR: "J'ai oublié mon parapluie et je me suis mouillé sous la pluie.",
    ES: "Olvidé mi paraguas y me mojé bajo la lluvia.",
    IT: "Ho dimenticato l'ombrello e mi sono bagnata sotto la pioggia.",
  },
  {
    ID: 3,
    MAIN_EN: "He didn’t understand the instructions, so he asked for help.",
    DE: "Er verstand die Anweisungen nicht, also bat er um Hilfe.",
    NL: "Hij begreep de instructies niet, dus vroeg hij om hulp.",
    PT: "Ele não percebeu as instruções, por isso pediu ajuda.",
    FR: "Il n'a pas compris les instructions, alors il a demandé de l'aide.",
    ES: "Como no entendía las instrucciones, pidió ayuda.",
    IT: "Non capendo le istruzioni, chiese aiuto.",
  },
  {
    ID: 4,
    MAIN_EN: "We have been waiting for the bus for over twenty minutes.",
    DE: "Wir warten schon seit über zwanzig Minuten auf den Bus.",
    NL: "We wachten al meer dan twintig minuten op de bus.",
    PT: "Estamos à espera do autocarro há mais de vinte minutos.",
    FR: "Nous attendons le bus depuis plus de vingt minutes.",
    ES: "Llevamos más de veinte minutos esperando el autobús.",
    IT: "Stiamo aspettando l'autobus da più di venti minuti.",
  },
  {
    ID: 5,
    MAIN_EN: "If you study hard, you will pass the exam easily.",
    DE: "Wenn du fleißig lernst, wirst du die Prüfung leicht bestehen.",
    NL: "Als je hard studeert, zul je het examen gemakkelijk halen.",
    PT: "Se estudares muito, passarás facilmente no exame.",
    FR: "Si vous étudiez bien, vous réussirez facilement l'examen.",
    ES: "Si estudias mucho, aprobarás el examen fácilmente.",
    IT: "Se studiate duramente, supererete facilmente l'esame.",
  },
  {
    ID: 6,
    MAIN_EN: "The weather was perfect for a picnic in the park.",
    DE: "Das Wetter war perfekt für ein Picknick im Park.",
    NL: "Het weer was perfect voor een picknick in het park.",
    PT: "O tempo estava perfeito para um piquenique no parque.",
    FR: "Le temps était parfait pour un pique-nique dans le parc.",
    ES: "Hacía un tiempo perfecto para ir de picnic al parque.",
    IT: "Il tempo era perfetto per un picnic nel parco.",
  },
  {
    ID: 7,
    MAIN_EN: "She has never traveled outside her country before.",
    DE: "Sie ist noch nie außerhalb ihres Landes gereist.",
    NL: "Ze heeft nog nooit buiten haar land gereisd.",
    PT: "Ela nunca tinha viajado para fora do seu país.",
    FR: "Elle n'a jamais voyagé en dehors de son pays.",
    ES: "Nunca había viajado fuera de su país.",
    IT: "Non aveva mai viaggiato fuori dal suo paese.",
  },
  {
    ID: 8,
    MAIN_EN: "My phone battery died because I forgot to charge it.",
    DE: "Der Akku meines Handys war leer, weil ich vergessen hatte, es aufzuladen.",
    NL: "De batterij van mijn telefoon was leeg omdat ik vergeten was hem op te laden.",
    PT: "A bateria do meu telemóvel acabou porque me esqueci de o carregar.",
    FR: "La batterie de mon téléphone est morte parce que j'ai oublié de la charger.",
    ES: "La batería de mi teléfono se agotó porque olvidé cargarla.",
    IT: "La batteria del mio telefono si è scaricata perché ho dimenticato di caricarla.",
  },
  {
    ID: 9,
    MAIN_EN: "The hotel had a beautiful view of the ocean.",
    DE: "Das Hotel hatte einen schönen Blick auf den Ozean.",
    NL: "Het hotel had een prachtig uitzicht op de oceaan.",
    PT: "O hotel tinha uma bela vista para o mar.",
    FR: "L'hôtel avait une vue magnifique sur l'océan.",
    ES: "El hotel tenía unas vistas preciosas del océano.",
    IT: "L'hotel aveva una bellissima vista sull'oceano.",
  },
  {
    ID: 10,
    MAIN_EN: "He apologized for being late to the meeting.",
    DE: "Er hat sich entschuldigt, dass er zu spät zum Treffen gekommen ist.",
    NL: "Hij verontschuldigde zich omdat hij te laat was voor de vergadering.",
    PT: "Ele pediu desculpa por ter chegado atrasado à reunião.",
    FR: "Il s'est excusé d'être en retard à la réunion.",
    ES: "Se disculpó por llegar tarde a la reunión.",
    IT: "Si scusò per essere arrivato in ritardo alla riunione.",
  },
  {
    ID: 11,
    MAIN_EN: "This restaurant serves the best pasta in town.",
    DE: "In diesem Restaurant gibt es die beste Pasta der Stadt.",
    NL: "Dit restaurant serveert de beste pasta van de stad.",
    PT: "Este restaurante serve a melhor massa da cidade.",
    FR: "Ce restaurant sert les meilleures pâtes de la ville.",
    ES: "En este restaurante sirven la mejor pasta de la ciudad.",
    IT: "Questo ristorante serve la migliore pasta della città.",
  },
  {
    ID: 12,
    MAIN_EN: "They moved to a new apartment last weekend.",
    DE: "Sie sind letztes Wochenende in eine neue Wohnung gezogen.",
    NL: "Ze zijn afgelopen weekend verhuisd naar een nieuw appartement.",
    PT: "Mudaram-se para um apartamento novo no fim de semana passado.",
    FR: "Ils ont emménagé dans un nouvel appartement le week-end dernier.",
    ES: "El fin de semana pasado se mudaron a un piso nuevo.",
    IT: "Lo scorso fine settimana si sono trasferiti in un nuovo appartamento.",
  },
  {
    ID: 13,
    MAIN_EN: "She is learning French because she wants to work in Paris.",
    DE: "Sie lernt Französisch, weil sie in Paris arbeiten möchte.",
    NL: "Ze leert Frans omdat ze in Parijs wil werken.",
    PT: "Ela está a aprender francês porque quer trabalhar em Paris.",
    FR: "Elle apprend le français parce qu'elle veut travailler à Paris.",
    ES: "Está aprendiendo francés porque quiere trabajar en París.",
    IT: "Sta imparando il francese perché vuole lavorare a Parigi.",
  },
  {
    ID: 14,
    MAIN_EN: "The movie was interesting, but the ending was disappointing.",
    DE: "Der Film war interessant, aber das Ende war enttäuschend.",
    NL: "De film was interessant, maar het einde was teleurstellend.",
    PT: "O filme era interessante, mas o final foi dececionante.",
    FR: "Le film était intéressant, mais la fin était décevante.",
    ES: "La película era interesante, pero el final fue decepcionante.",
    IT: "Il film era interessante, ma il finale è stato deludente.",
  },
  {
    ID: 15,
    MAIN_EN: "I usually go for a walk after dinner to relax.",
    DE: "Normalerweise mache ich nach dem Essen einen Spaziergang, um mich zu entspannen.",
    NL: "Meestal ga ik na het eten wandelen om te ontspannen.",
    PT: "Normalmente vou dar um passeio depois do jantar para descontrair.",
    FR: "J'ai l'habitude de me promener après le dîner pour me détendre.",
    ES: "Suelo dar un paseo después de cenar para relajarme.",
    IT: "Di solito vado a fare una passeggiata dopo cena per rilassarmi.",
  },
  {
    ID: 16,
    MAIN_EN: "He was too tired to continue driving, so he stopped for a break.",
    DE: "Er war zu müde, um weiterzufahren, also hat er eine Pause eingelegt.",
    NL: "Hij was te moe om verder te rijden, dus stopte hij voor een pauze.",
    PT: "Ele estava demasiado cansado para continuar a conduzir, por isso parou para fazer uma pausa.",
    FR: "Il était trop fatigué pour continuer à conduire, alors il s'est arrêté pour faire une pause.",
    ES: "Estaba demasiado cansado para seguir conduciendo, así que paró para descansar.",
    IT: "Era troppo stanco per continuare a guidare, così si è fermato per una pausa.",
  },
  {
    ID: 17,
    MAIN_EN: "We need to buy some vegetables for tonight’s dinner.",
    DE: "Wir müssen etwas Gemüse für das Abendessen kaufen.",
    NL: "We moeten wat groenten kopen voor het avondeten.",
    PT: "Precisamos de comprar alguns legumes para o jantar de hoje.",
    FR: "Nous devons acheter des légumes pour le dîner de ce soir.",
    ES: "Tenemos que comprar verduras para la cena de esta noche.",
    IT: "Dobbiamo comprare delle verdure per la cena di stasera.",
  },
  {
    ID: 18,
    MAIN_EN: "She was surprised when she received a letter from an old friend.",
    DE: "Sie war überrascht, als sie einen Brief von einem alten Freund erhielt.",
    NL: "Ze was verrast toen ze een brief kreeg van een oude vriend.",
    PT: "Ela ficou surpreendida quando recebeu uma carta de um velho amigo.",
    FR: "Elle a été surprise de recevoir une lettre d'un vieil ami.",
    ES: "Se sorprendió cuando recibió una carta de un viejo amigo.",
    IT: "Fu sorpresa quando ricevette una lettera da un vecchio amico.",
  },
  {
    ID: 19,
    MAIN_EN: "The teacher asked us to complete the assignment by Friday.",
    DE: "Der Lehrer hat uns gebeten, die Aufgabe bis Freitag zu erledigen.",
    NL: "De leraar vroeg ons om de opdracht vrijdag af te hebben.",
    PT: "O professor pediu-nos para completar o trabalho até sexta-feira.",
    FR: "Le professeur nous a demandé de terminer le travail pour vendredi.",
    ES: "El profesor nos ha pedido que terminemos la tarea antes del viernes.",
    IT: "L'insegnante ci ha chiesto di completare il compito entro venerdì.",
  },
  {
    ID: 20,
    MAIN_EN:
      "They decided to go hiking even though the weather forecast was bad.",
    DE: "Sie beschlossen, wandern zu gehen, obwohl die Wettervorhersage schlecht war.",
    NL: "Ze besloten te gaan wandelen, ook al waren de weersvoorspellingen slecht.",
    PT: "Decidiram fazer uma caminhada, apesar de as previsões meteorológicas serem más.",
    FR: "Ils ont décidé de partir en randonnée même si les prévisions météorologiques étaient mauvaises.",
    ES: "Decidieron ir de excursión aunque las previsiones meteorológicas eran malas.",
    IT: "Decisero di fare un'escursione anche se le previsioni del tempo erano pessime.",
  },
  {
    ID: 21,
    MAIN_EN: "I woke up early this morning to go for a run.",
    DE: "Ich bin heute Morgen früh aufgestanden, um laufen zu gehen.",
    NL: "Ik ben vanochtend vroeg opgestaan om te gaan hardlopen.",
    PT: "Acordei cedo esta manhã para ir dar uma corrida.",
    FR: "Je me suis levée tôt ce matin pour aller courir.",
    ES: "Esta mañana me he levantado temprano para salir a correr.",
    IT: "Stamattina mi sono svegliato presto per andare a correre.",
  },
  {
    ID: 22,
    MAIN_EN: "She was nervous before her job interview but tried to stay calm.",
    DE: "Sie war nervös vor ihrem Vorstellungsgespräch, versuchte aber, ruhig zu bleiben.",
    NL: "Ze was zenuwachtig voor haar sollicitatiegesprek, maar probeerde kalm te blijven.",
    PT: "Ela estava nervosa antes da entrevista de emprego, mas tentou manter-se calma.",
    FR: "Elle était nerveuse avant son entretien d'embauche, mais elle a essayé de rester calme.",
    ES: "Estaba nerviosa antes de la entrevista de trabajo, pero intentó mantener la calma.",
    IT: "Era nervosa prima del colloquio di lavoro, ma ha cercato di mantenere la calma.",
  },
  {
    ID: 23,
    MAIN_EN: "The train was delayed, so we had to wait at the station.",
    DE: "Der Zug hatte Verspätung, so dass wir am Bahnhof warten mussten.",
    NL: "De trein had vertraging, dus moesten we wachten op het station.",
    PT: "O comboio atrasou-se, por isso tivemos de esperar na estação.",
    FR: "Le train a été retardé et nous avons dû attendre à la gare.",
    ES: "El tren se retrasó, así que tuvimos que esperar en la estación.",
    IT: "Il treno era in ritardo, quindi abbiamo dovuto aspettare alla stazione.",
  },
  {
    ID: 24,
    MAIN_EN: "He has been working at the same company for five years.",
    DE: "Er arbeitet seit fünf Jahren in der gleichen Firma.",
    NL: "Hij werkt al vijf jaar bij hetzelfde bedrijf.",
    PT: "Ele trabalha na mesma empresa há cinco anos.",
    FR: "Il travaille dans la même entreprise depuis cinq ans.",
    ES: "Lleva cinco años trabajando en la misma empresa.",
    IT: "Lavora nella stessa azienda da cinque anni.",
  },
  {
    ID: 25,
    MAIN_EN: "They decided to spend their summer holiday in Spain.",
    DE: "Sie haben beschlossen, ihren Sommerurlaub in Spanien zu verbringen.",
    NL: "Ze besloten hun zomervakantie in Spanje door te brengen.",
    PT: "Decidiram passar as férias de verão em Espanha.",
    FR: "Ils ont décidé de passer leurs vacances d'été en Espagne.",
    ES: "Han decidido pasar las vacaciones de verano en España.",
    IT: "Hanno deciso di trascorrere le vacanze estive in Spagna.",
  },
  {
    ID: 26,
    MAIN_EN: "I don’t like coffee, but I love the smell of it.",
    DE: "Ich mag keinen Kaffee, aber ich liebe den Geruch von Kaffee.",
    NL: "Ik hou niet van koffie, maar ik hou van de geur ervan.",
    PT: "Não gosto de café, mas adoro o seu cheiro.",
    FR: "Je n'aime pas le café, mais j'adore son odeur.",
    ES: "No me gusta el café, pero me encanta su olor.",
    IT: "Non mi piace il caffè, ma mi piace il suo profumo.",
  },
  {
    ID: 27,
    MAIN_EN:
      "She borrowed a book from the library and promised to return it on time.",
    DE: "Sie lieh sich ein Buch aus der Bibliothek aus und versprach, es pünktlich zurückzugeben.",
    NL: "Ze leende een boek uit de bibliotheek en beloofde het op tijd terug te brengen.",
    PT: "Ela pediu um livro emprestado na biblioteca e prometeu devolvê-lo a tempo.",
    FR: "Elle a emprunté un livre à la bibliothèque et a promis de le rendre à temps.",
    ES: "Tomó prestado un libro de la biblioteca y prometió devolverlo a tiempo.",
    IT: "Prese in prestito un libro dalla biblioteca e promise di restituirlo in tempo.",
  },
  {
    ID: 28,
    MAIN_EN: "He was so hungry that he ordered two large pizzas.",
    DE: "Er war so hungrig, dass er zwei große Pizzen bestellte.",
    NL: "Hij had zo'n honger dat hij twee grote pizza's bestelde.",
    PT: "Ele tinha tanta fome que pediu duas pizzas grandes.",
    FR: "Il avait tellement faim qu'il a commandé deux grandes pizzas.",
    ES: "Tenía tanta hambre que pidió dos pizzas grandes.",
    IT: "Era così affamato che ordinò due pizze grandi.",
  },
  {
    ID: 29,
    MAIN_EN:
      "The teacher explained the topic again because some students didn’t understand it.",
    DE: "Der Lehrer hat das Thema noch einmal erklärt, weil einige Schüler es nicht verstanden haben.",
    NL: "De leerkracht legde het onderwerp nog eens uit omdat sommige leerlingen het niet begrepen.",
    PT: "O professor voltou a explicar o tema porque alguns alunos não o compreenderam.",
    FR: "Le professeur a réexpliqué le sujet car certains élèves ne l'avaient pas compris.",
    ES: "El profesor volvió a explicar el tema porque algunos alumnos no lo entendían.",
    IT: "L'insegnante ha spiegato di nuovo l'argomento perché alcuni studenti non l'avevano capito.",
  },
  {
    ID: 30,
    MAIN_EN: "We went to the supermarket to buy some ingredients for dinner.",
    DE: "Wir sind in den Supermarkt gegangen, um einige Zutaten für das Abendessen zu kaufen.",
    NL: "We gingen naar de supermarkt om wat ingrediënten voor het avondeten te kopen.",
    PT: "Fomos ao supermercado comprar alguns ingredientes para o jantar.",
    FR: "Nous sommes allés au supermarché pour acheter des ingrédients pour le dîner.",
    ES: "Fuimos al supermercado a comprar algunos ingredientes para la cena.",
    IT: "Siamo andati al supermercato per comprare alcuni ingredienti per la cena.",
  },
  {
    ID: 31,
    MAIN_EN: "I have never seen such a beautiful sunset before.",
    DE: "Ich habe noch nie einen so schönen Sonnenuntergang gesehen.",
    NL: "Ik heb nog nooit zo'n mooie zonsondergang gezien.",
    PT: "Nunca tinha visto um pôr do sol tão bonito.",
    FR: "Je n'ai jamais vu un aussi beau coucher de soleil.",
    ES: "Nunca había visto una puesta de sol tan bonita.",
    IT: "Non ho mai visto un tramonto così bello.",
  },
  {
    ID: 32,
    MAIN_EN: "She is saving money because she wants to buy a new laptop.",
    DE: "Sie spart Geld, weil sie sich einen neuen Laptop kaufen will.",
    NL: "Ze spaart geld omdat ze een nieuwe laptop wil kopen.",
    PT: "Ela está a poupar dinheiro porque quer comprar um portátil novo.",
    FR: "Elle économise de l'argent parce qu'elle veut acheter un nouvel ordinateur portable.",
    ES: "Está ahorrando dinero porque quiere comprarse un portátil nuevo.",
    IT: "Sta risparmiando perché vuole comprare un nuovo computer portatile.",
  },
  {
    ID: 33,
    MAIN_EN:
      "The concert was amazing, and the band played all of their best songs.",
    DE: "Das Konzert war toll, und die Band hat alle ihre besten Songs gespielt.",
    NL: "Het concert was geweldig en de band speelde al hun beste nummers.",
    PT: "O concerto foi espetacular e a banda tocou todas as suas melhores canções.",
    FR: "Le concert était incroyable et le groupe a joué toutes ses meilleures chansons.",
    ES: "El concierto fue increíble, y el grupo tocó todas sus mejores canciones.",
    IT: "Il concerto è stato fantastico e il gruppo ha suonato tutte le sue canzoni migliori.",
  },
  {
    ID: 34,
    MAIN_EN: "He forgot his keys at home and had to wait for his roommate.",
    DE: "Er hat seine Schlüssel zu Hause vergessen und musste auf seinen Mitbewohner warten.",
    NL: "Hij was zijn sleutels thuis vergeten en moest op zijn kamergenoot wachten.",
    PT: "Ele esqueceu-se das chaves em casa e teve de esperar pelo colega de quarto.",
    FR: "Il a oublié ses clés à la maison et a dû attendre son colocataire.",
    ES: "Se olvidó las llaves en casa y tuvo que esperar a su compañero de piso.",
    IT: "Ha dimenticato le chiavi a casa e ha dovuto aspettare il suo compagno di stanza.",
  },
  {
    ID: 35,
    MAIN_EN: "My sister loves painting, and she is really talented.",
    DE: "Meine Schwester liebt die Malerei, und sie ist wirklich talentiert.",
    NL: "Mijn zus houdt van schilderen en ze is echt getalenteerd.",
    PT: "A minha irmã adora pintar e tem muito talento.",
    FR: "Ma sœur adore peindre et elle est très douée.",
    ES: "A mi hermana le encanta pintar y tiene mucho talento.",
    IT: "Mia sorella ama dipingere e ha molto talento.",
  },
  {
    ID: 36,
    MAIN_EN: "We need to leave early to avoid the traffic.",
    DE: "Wir müssen früh los, um den Verkehr zu vermeiden.",
    NL: "We moeten vroeg vertrekken om het verkeer te vermijden.",
    PT: "Temos de sair cedo para evitar o trânsito.",
    FR: "Nous devons partir tôt pour éviter les embouteillages.",
    ES: "Tenemos que salir temprano para evitar el tráfico.",
    IT: "Dobbiamo partire presto per evitare il traffico.",
  },
  {
    ID: 37,
    MAIN_EN: "He didn’t like the movie, but I thought it was really good.",
    DE: "Ihm hat der Film nicht gefallen, aber ich fand ihn wirklich gut.",
    NL: "Hij vond de film niet leuk, maar ik vond hem echt goed.",
    PT: "Ele não gostou do filme, mas eu achei-o muito bom.",
    FR: "Il n'a pas aimé le film, mais je l'ai trouvé très bon.",
    ES: "A él no le gustó la película, pero a mí me pareció muy buena.",
    IT: "A lui non è piaciuto il film, ma io l'ho trovato molto bello.",
  },
  {
    ID: 38,
    MAIN_EN: "She always listens to music while studying.",
    DE: "Sie hört immer Musik, wenn sie lernt.",
    NL: "Ze luistert altijd naar muziek tijdens het studeren.",
    PT: "Ela ouve sempre música enquanto estuda.",
    FR: "Elle écoute toujours de la musique en étudiant.",
    ES: "Siempre escucha música mientras estudia.",
    IT: "Ascolta sempre la musica mentre studia.",
  },
  {
    ID: 39,
    MAIN_EN: "We spent the whole afternoon at the beach, enjoying the sun.",
    DE: "Wir haben den ganzen Nachmittag am Strand verbracht und die Sonne genossen.",
    NL: "We hebben de hele namiddag op het strand van de zon genoten.",
    PT: "Passámos a tarde toda na praia, a aproveitar o sol.",
    FR: "Nous avons passé tout l'après-midi à la plage, à profiter du soleil.",
    ES: "Pasamos toda la tarde en la playa, disfrutando del sol.",
    IT: "Abbiamo trascorso l'intero pomeriggio in spiaggia, godendoci il sole.",
  },
  {
    ID: 40,
    MAIN_EN: "I was surprised to receive a message from an old friend.",
    DE: "Ich war überrascht, als ich eine Nachricht von einem alten Freund erhielt.",
    NL: "Ik was verrast toen ik een bericht kreeg van een oude vriend.",
    PT: "Fiquei surpreendido ao receber uma mensagem de um velho amigo.",
    FR: "J'ai été surpris de recevoir un message d'un vieil ami.",
    ES: "Me sorprendió recibir un mensaje de un viejo amigo.",
    IT: "Sono rimasto sorpreso nel ricevere un messaggio da un vecchio amico.",
  },
  {
    ID: 41,
    MAIN_EN: "He wants to learn how to play the guitar.",
    DE: "Er möchte Gitarre spielen lernen.",
    NL: "Hij wil gitaar leren spelen.",
    PT: "Ele quer aprender a tocar guitarra.",
    FR: "Il veut apprendre à jouer de la guitare.",
    ES: "Quiere aprender a tocar la guitarra.",
    IT: "Vuole imparare a suonare la chitarra.",
  },
  {
    ID: 42,
    MAIN_EN:
      "The restaurant was too crowded, so we decided to eat somewhere else.",
    DE: "Das Restaurant war zu voll, also haben wir beschlossen, woanders zu essen.",
    NL: "Het restaurant was te druk, dus besloten we ergens anders te gaan eten.",
    PT: "O restaurante estava demasiado cheio, por isso decidimos comer noutro sítio.",
    FR: "Le restaurant était trop bondé, nous avons donc décidé d'aller manger ailleurs.",
    ES: "El restaurante estaba demasiado lleno, así que decidimos comer en otro sitio.",
    IT: "Il ristorante era troppo affollato, così abbiamo deciso di mangiare da un'altra parte.",
  },
  {
    ID: 43,
    MAIN_EN: "She was tired, but she kept working until she finished.",
    DE: "Sie war müde, aber sie arbeitete weiter, bis sie fertig war.",
    NL: "Ze was moe, maar ze bleef werken tot ze klaar was.",
    PT: "Ela estava cansada, mas continuou a trabalhar até acabar.",
    FR: "Elle était fatiguée, mais elle a continué à travailler jusqu'à ce qu'elle ait fini.",
    ES: "Estaba cansada, pero siguió trabajando hasta que terminó.",
    IT: "Era stanca, ma ha continuato a lavorare finché non ha finito.",
  },
  {
    ID: 44,
    MAIN_EN:
      "I have to finish my homework before I can go out with my friends.",
    DE: "Ich muss erst meine Hausaufgaben fertig machen, bevor ich mit meinen Freunden ausgehen kann.",
    NL: "Ik moet mijn huiswerk afmaken voordat ik met mijn vrienden uit kan gaan.",
    PT: "Tenho de acabar os meus trabalhos de casa antes de poder sair com os meus amigos.",
    FR: "Je dois finir mes devoirs avant de pouvoir sortir avec mes amis.",
    ES: "Tengo que terminar los deberes antes de salir con mis amigos.",
    IT: "Devo finire i compiti prima di poter uscire con i miei amici.",
  },
  {
    ID: 45,
    MAIN_EN: "They were excited to visit the new museum in the city.",
    DE: "Sie freuten sich darauf, das neue Museum in der Stadt zu besuchen.",
    NL: "Ze waren enthousiast om het nieuwe museum in de stad te bezoeken.",
    PT: "Eles estavam entusiasmados por visitar o novo museu da cidade.",
    FR: "Ils étaient ravis de visiter le nouveau musée de la ville.",
    ES: "Estaban entusiasmados por visitar el nuevo museo de la ciudad.",
    IT: "Erano entusiasti di visitare il nuovo museo della città.",
  },
  {
    ID: 46,
    MAIN_EN: "It started to rain just as we were leaving the house.",
    DE: "Es begann zu regnen, als wir gerade das Haus verließen.",
    NL: "Het begon te regenen net toen we het huis verlieten.",
    PT: "Começou a chover quando estávamos a sair de casa.",
    FR: "Il s'est mis à pleuvoir juste au moment où nous quittions la maison.",
    ES: "Empezó a llover justo cuando salíamos de casa.",
    IT: "Ha iniziato a piovere proprio mentre stavamo uscendo di casa.",
  },
  {
    ID: 47,
    MAIN_EN: "He took a lot of pictures during his trip to Italy.",
    DE: "Er hat während seiner Reise nach Italien viele Fotos gemacht.",
    NL: "Hij nam veel foto's tijdens zijn reis naar Italië.",
    PT: "Ele tirou muitas fotografias durante a sua viagem a Itália.",
    FR: "Il a pris beaucoup de photos pendant son voyage en Italie.",
    ES: "Hizo muchas fotos durante su viaje a Italia.",
    IT: "Ha scattato molte foto durante il suo viaggio in Italia.",
  },
  {
    ID: 48,
    MAIN_EN: "The bus was so full that we had to wait for the next one.",
    DE: "Der Bus war so voll, dass wir auf den nächsten warten mussten.",
    NL: "De bus was zo vol dat we op de volgende moesten wachten.",
    PT: "O autocarro estava tão cheio que tivemos de esperar pelo próximo.",
    FR: "Le bus était tellement plein que nous avons dû attendre le suivant.",
    ES: "El autobús iba tan lleno que tuvimos que esperar al siguiente.",
    IT: "L'autobus era così pieno che abbiamo dovuto aspettare il successivo.",
  },
  {
    ID: 49,
    MAIN_EN: "She is looking for a new apartment closer to her office.",
    DE: "Sie sucht nach einer neuen Wohnung in der Nähe ihres Büros.",
    NL: "Ze is op zoek naar een nieuw appartement dichter bij haar kantoor.",
    PT: "Ela está à procura de um novo apartamento mais perto do seu escritório.",
    FR: "Elle cherche un nouvel appartement plus proche de son bureau.",
    ES: "Está buscando un nuevo apartamento más cerca de su oficina.",
    IT: "Sta cercando un nuovo appartamento più vicino al suo ufficio.",
  },
  {
    ID: 50,
    MAIN_EN: "I couldn’t sleep last night because it was too noisy outside.",
    DE: "Ich konnte letzte Nacht nicht schlafen, weil es draußen zu laut war.",
    NL: "Ik kon vannacht niet slapen omdat het buiten te lawaaierig was.",
    PT: "Não consegui dormir ontem à noite porque estava muito barulho lá fora.",
    FR: "Je n'ai pas pu dormir la nuit dernière parce qu'il y avait trop de bruit dehors.",
    ES: "Anoche no pude dormir porque había mucho ruido fuera.",
    IT: "Stanotte non sono riuscito a dormire perché fuori c'era troppo rumore.",
  },
  {
    ID: 51,
    MAIN_EN:
      "I'm trying to improve my cooking skills by following online recipes.",
    DE: "Ich versuche, meine Kochkünste zu verbessern, indem ich Online-Rezepten folge.",
    NL: "Ik probeer mijn kookkunsten te verbeteren door online recepten te volgen.",
    PT: "Estou a tentar melhorar as minhas capacidades culinárias seguindo receitas online.",
    FR: "J'essaie d'améliorer mes compétences culinaires en suivant des recettes en ligne.",
    ES: "Intento mejorar mis habilidades culinarias siguiendo recetas online.",
    IT: "Sto cercando di migliorare le mie capacità culinarie seguendo le ricette online.",
  },
  {
    ID: 52,
    MAIN_EN: "She decided to take a break from social media to reduce stress.",
    DE: "Sie beschloss, eine Pause von den sozialen Medien einzulegen, um Stress abzubauen.",
    NL: "Ze besloot een pauze te nemen van sociale media om stress te verminderen.",
    PT: "Ela decidiu fazer uma pausa nas redes sociais para reduzir o stress.",
    FR: "Elle a décidé de faire une pause dans les médias sociaux pour réduire son stress.",
    ES: "Decidió tomarse un descanso de las redes sociales para reducir el estrés.",
    IT: "Ha deciso di prendersi una pausa dai social media per ridurre lo stress.",
  },
  {
    ID: 53,
    MAIN_EN:
      "Even though it was raining, we still went for a walk in the park.",
    DE: "Obwohl es geregnet hat, sind wir im Park spazieren gegangen.",
    NL: "Ook al regende het, we gingen toch wandelen in het park.",
    PT: "Apesar de estar a chover, fomos dar um passeio no parque.",
    FR: "Même s'il pleuvait, nous sommes allés nous promener dans le parc.",
    ES: "Aunque estaba lloviendo, salimos a pasear por el parque.",
    IT: "Anche se pioveva, siamo andati a fare una passeggiata nel parco.",
  },
  {
    ID: 54,
    MAIN_EN: "If you need help with your project, don't hesitate to ask me.",
    DE: "Wenn du Hilfe bei deinem Projekt brauchst, zögere nicht, mich zu fragen.",
    NL: "Als je hulp nodig hebt met je project, aarzel dan niet om het me te vragen.",
    PT: "Se precisares de ajuda com o teu projeto, não hesites em pedir-me.",
    FR: "Si tu as besoin d'aide pour ton projet, n'hésite pas à me demander.",
    ES: "Si necesitas ayuda con tu proyecto, no dudes en pedírmela.",
    IT: "Se avete bisogno di aiuto per il vostro progetto, non esitate a chiedermelo.",
  },
  {
    ID: 55,
    MAIN_EN:
      "They're planning to visit their grandparents during the summer holidays.",
    DE: "Sie planen, in den Sommerferien ihre Großeltern zu besuchen.",
    NL: "Ze zijn van plan om hun grootouders te bezoeken tijdens de zomervakantie.",
    PT: "Eles estão a planear visitar os avós durante as férias de verão.",
    FR: "Ils ont prévu de rendre visite à leurs grands-parents pendant les vacances d'été.",
    ES: "Planean visitar a sus abuelos durante las vacaciones de verano.",
    IT: "Hanno intenzione di andare a trovare i nonni durante le vacanze estive.",
  },
  {
    ID: 56,
    MAIN_EN: "I've been learning a new language for the past six months.",
    DE: "Ich habe in den letzten sechs Monaten eine neue Sprache gelernt.",
    NL: "Ik heb de afgelopen zes maanden een nieuwe taal geleerd.",
    PT: "Há seis meses que estou a aprender uma nova língua.",
    FR: "Cela fait six mois que j'apprends une nouvelle langue.",
    ES: "Llevo seis meses aprendiendo un nuevo idioma.",
    IT: "Negli ultimi sei mesi ho imparato una nuova lingua.",
  },
  {
    ID: 57,
    MAIN_EN: "He explained the situation clearly, so everyone understood.",
    DE: "Er hat die Situation klar und deutlich erklärt, so dass es jeder verstanden hat.",
    NL: "Hij legde de situatie duidelijk uit, zodat iedereen het begreep.",
    PT: "Ele explicou a situação de forma clara, para que todos percebessem.",
    FR: "Il a expliqué la situation clairement, pour que tout le monde comprenne.",
    ES: "Explicó la situación con claridad, para que todo el mundo lo entendiera.",
    IT: "Spiegò chiaramente la situazione, in modo che tutti capissero.",
  },
  {
    ID: 58,
    MAIN_EN:
      "It's important to recycle paper and plastic to protect the environment.",
    DE: "Es ist wichtig, Papier und Plastik zu recyceln, um die Umwelt zu schützen.",
    NL: "Het is belangrijk om papier en plastic te recycleren om het milieu te beschermen.",
    PT: "É importante reciclar o papel e o plástico para proteger o ambiente.",
    FR: "Il est important de recycler le papier et le plastique pour protéger l'environnement.",
    ES: "Es importante reciclar el papel y el plástico para proteger el medio ambiente.",
    IT: "È importante riciclare la carta e la plastica per proteggere l'ambiente.",
  },
  {
    ID: 59,
    MAIN_EN:
      "We're looking forward to seeing the new art exhibition at the museum.",
    DE: "Wir freuen uns schon darauf, die neue Kunstausstellung im Museum zu sehen.",
    NL: "We kijken ernaar uit om de nieuwe kunsttentoonstelling in het museum te zien.",
    PT: "Estamos ansiosos por ver a nova exposição de arte no museu.",
    FR: "Nous avons hâte de voir la nouvelle exposition d'art au musée.",
    ES: "Estamos deseando ver la nueva exposición de arte del museo.",
    IT: "Non vediamo l'ora di vedere la nuova mostra d'arte al museo.",
  },
  {
    ID: 60,
    MAIN_EN: "I often listen to podcasts while commuting to work.",
    DE: "Ich höre oft Podcasts, wenn ich zur Arbeit fahre.",
    NL: "Ik luister vaak naar podcasts terwijl ik naar mijn werk pendel.",
    PT: "Costumo ouvir podcasts enquanto me desloco para o trabalho.",
    FR: "J'écoute souvent des podcasts en me rendant au travail.",
    ES: "Suelo escuchar podcasts mientras voy al trabajo.",
    IT: "Ascolto spesso i podcast mentre vado al lavoro.",
  },
  {
    ID: 61,
    MAIN_EN:
      "In my opinion, reading books is more enjoyable than watching television.",
    DE: "Meiner Meinung nach macht es mehr Spaß, Bücher zu lesen, als fernzusehen.",
    NL: "Ik vind boeken lezen leuker dan televisie kijken.",
    PT: "Na minha opinião, ler livros é mais agradável do que ver televisão.",
    FR: "À mon avis, il est plus agréable de lire des livres que de regarder la télévision.",
    ES: "En mi opinión, leer libros es más agradable que ver la televisión.",
    IT: "Secondo me, leggere libri è più piacevole che guardare la televisione.",
  },
  {
    ID: 62,
    MAIN_EN: "I prefer coffee to tea, especially in the morning.",
    DE: "Ich trinke lieber Kaffee als Tee, besonders am Morgen.",
    NL: "Ik drink liever koffie dan thee, vooral 's ochtends.",
    PT: "Prefiro café a chá, especialmente de manhã.",
    FR: "Je préfère le café au thé, surtout le matin.",
    ES: "Prefiero el café al té, sobre todo por la mañana.",
    IT: "Preferisco il caffè al tè, soprattutto al mattino.",
  },
  {
    ID: 63,
    MAIN_EN:
      "She thinks that learning a musical instrument is a valuable skill.",
    DE: "Sie glaubt, dass das Erlernen eines Musikinstruments eine wertvolle Fähigkeit ist.",
    NL: "Ze denkt dat het leren van een muziekinstrument een waardevolle vaardigheid is.",
    PT: "Ela acha que aprender um instrumento musical é uma habilidade valiosa.",
    FR: "Elle pense que l'apprentissage d'un instrument de musique est une compétence précieuse.",
    ES: "Piensa que aprender un instrumento musical es una habilidad valiosa.",
    IT: "Lei pensa che imparare uno strumento musicale sia un'abilità preziosa.",
  },
  {
    ID: 64,
    MAIN_EN: "He believes that travelling broadens your perspective.",
    DE: "Er glaubt, dass Reisen den Blickwinkel erweitert.",
    NL: "Hij gelooft dat reizen je perspectief verbreedt.",
    PT: "Ele acha que viajar alarga a nossa perspetiva.",
    FR: "Il pense que les voyages élargissent les perspectives.",
    ES: "Cree que viajar amplía la perspectiva.",
    IT: "Crede che viaggiare allarghi le prospettive.",
  },
  {
    ID: 65,
    MAIN_EN: "I find it difficult to concentrate when there's a lot of noise.",
    DE: "Es fällt mir schwer, mich zu konzentrieren, wenn es laut ist.",
    NL: "Ik vind het moeilijk om me te concentreren als er veel lawaai is.",
    PT: "Tenho dificuldade em concentrar-me quando há muito barulho.",
    FR: "J'ai du mal à me concentrer lorsqu'il y a beaucoup de bruit.",
    ES: "Me cuesta concentrarme cuando hay mucho ruido.",
    IT: "Trovo difficile concentrarmi quando c'è molto rumore.",
  },
  {
    ID: 66,
    MAIN_EN: "They consider it essential to maintain a healthy lifestyle.",
    DE: "Sie halten es für wichtig, einen gesunden Lebensstil zu pflegen.",
    NL: "Ze vinden het essentieel om er een gezonde levensstijl op na te houden.",
    PT: "Consideram que é essencial manter um estilo de vida saudável.",
    FR: "Ils considèrent qu'il est essentiel de maintenir un mode de vie sain.",
    ES: "Considera esencial mantener un estilo de vida saludable.",
    IT: "Ritengono che sia essenziale mantenere uno stile di vita sano.",
  },
  {
    ID: 67,
    MAIN_EN:
      "It seems to me that the weather is becoming increasingly unpredictable.",
    DE: "Ich habe den Eindruck, dass das Wetter immer unberechenbarer wird.",
    NL: "Ik heb de indruk dat het weer steeds onvoorspelbaarder wordt.",
    PT: "Parece-me que o tempo está a tornar-se cada vez mais imprevisível.",
    FR: "Il me semble que le temps devient de plus en plus imprévisible.",
    ES: "Me parece que el tiempo es cada vez más imprevisible.",
    IT: "Mi sembra che il tempo stia diventando sempre più imprevedibile.",
  },
  {
    ID: 68,
    MAIN_EN:
      "I'm convinced that technology has both advantages and disadvantages.",
    DE: "Ich bin davon überzeugt, dass die Technologie sowohl Vor- als auch Nachteile hat.",
    NL: "Ik ben ervan overtuigd dat technologie zowel voor- als nadelen heeft.",
    PT: "Estou convencido de que a tecnologia tem vantagens e desvantagens.",
    FR: "Je suis convaincu que la technologie a des avantages et des inconvénients.",
    ES: "Estoy convencido de que la tecnología tiene ventajas e inconvenientes.",
    IT: "Sono convinto che la tecnologia abbia sia vantaggi che svantaggi.",
  },
  {
    ID: 69,
    MAIN_EN:
      "She's of the opinion that volunteering is a rewarding experience.",
    DE: "Sie ist der Meinung, dass Freiwilligenarbeit eine lohnende Erfahrung ist.",
    NL: "Ze is van mening dat vrijwilligerswerk een lonende ervaring is.",
    PT: "Ela é da opinião de que o voluntariado é uma experiência gratificante.",
    FR: "Elle est d'avis que le bénévolat est une expérience enrichissante.",
    ES: "Ella opina que el voluntariado es una experiencia gratificante.",
    IT: "È convinta che il volontariato sia un'esperienza gratificante.",
  },
  {
    ID: 70,
    MAIN_EN: "I tend to agree with the idea that practice makes perfect.",
    DE: "Ich neige dazu, dem Gedanken zuzustimmen, dass Übung den Meister macht.",
    NL: "Ik ben het eens met het idee dat oefening baart kunst.",
    PT: "Concordo com a ideia de que a prática leva à perfeição.",
    FR: "Je suis plutôt d'accord avec l'idée que c'est en forgeant qu'on devient forgeron.",
    ES: "Suelo estar de acuerdo con la idea de que la práctica hace al maestro.",
    IT: "Sono d'accordo con l'idea che la pratica renda perfetti.",
  },
  {
    ID: 71,
    MAIN_EN: "If I had more time, I would learn to play the guitar.",
    DE: "Wenn ich mehr Zeit hätte, würde ich lernen, Gitarre zu spielen.",
    NL: "Als ik meer tijd had, zou ik gitaar leren spelen.",
    PT: "Se tivesse mais tempo, aprenderia a tocar guitarra.",
    FR: "Si j'avais plus de temps, j'apprendrais à jouer de la guitare.",
    ES: "Si tuviera más tiempo, aprendería a tocar la guitarra.",
    IT: "Se avessi più tempo, imparerei a suonare la chitarra.",
  },
  {
    ID: 72,
    MAIN_EN: "She would travel around the world if she won the lottery.",
    DE: "Sie würde um die Welt reisen, wenn sie im Lotto gewinnen würde.",
    NL: "Ze zou de wereld rondreizen als ze de loterij zou winnen.",
    PT: "Ela viajaria à volta do mundo se ganhasse a lotaria.",
    FR: "Elle ferait le tour du monde si elle gagnait à la loterie.",
    ES: "Viajaría por todo el mundo si le tocara la lotería.",
    IT: "Se vincesse alla lotteria farebbe il giro del mondo.",
  },
  {
    ID: 73,
    MAIN_EN: "Had they known about the traffic, they would have left earlier.",
    DE: "Hätten sie von dem Verkehr gewusst, wären sie früher losgefahren.",
    NL: "Als ze van het verkeer hadden geweten, waren ze vroeger vertrokken.",
    PT: "Se soubessem do trânsito, teriam saído mais cedo.",
    FR: "S'ils avaient su qu'il y avait du trafic, ils seraient partis plus tôt.",
    ES: "Si hubieran sabido lo del tráfico, habrían salido antes.",
    IT: "Se avessero saputo del traffico, sarebbero partiti prima.",
  },
  {
    ID: 74,
    MAIN_EN: "Unless it rains, we'll have a picnic in the garden.",
    DE: "Wenn es nicht regnet, machen wir ein Picknick im Garten.",
    NL: "Als het niet regent, gaan we picknicken in de tuin.",
    PT: "Se não chover, faremos um piquenique no jardim.",
    FR: "S'il ne pleut pas, nous ferons un pique-nique dans le jardin.",
    ES: "Si no llueve, haremos un picnic en el jardín.",
    IT: "Se non piove, faremo un picnic in giardino.",
  },
  {
    ID: 75,
    MAIN_EN: "Provided that you finish your homework, you can watch a movie.",
    DE: "Wenn du deine Hausaufgaben gemacht hast, kannst du dir einen Film ansehen.",
    NL: "Als je je huiswerk af hebt, kun je een film kijken.",
    PT: "Desde que acabes os trabalhos de casa, podes ver um filme.",
    FR: "Si tu as fini tes devoirs, tu pourras regarder un film.",
    ES: "Si terminas los deberes, puedes ver una película.",
    IT: "Se avete finito i compiti, potete guardare un film.",
  },
  {
    ID: 76,
    MAIN_EN: "If you were to choose, which career would you pursue?",
    DE: "Wenn Sie die Wahl hätten, welchen Beruf würden Sie ergreifen?",
    NL: "Als je mocht kiezen, welke carrière zou je dan kiezen?",
    PT: "Se tivesses de escolher, que carreira seguirias?",
    FR: "Si vous deviez choisir, quel métier embrasseriez-vous ?",
    ES: "Si tuvieras que elegir, ¿qué carrera seguirías?",
    IT: "Se dovessi scegliere, quale carriera intraprenderesti?",
  },
  {
    ID: 77,
    MAIN_EN: "Should you need any assistance, please contact our office.",
    DE: "Sollten Sie Hilfe benötigen, wenden Sie sich bitte an unser Büro.",
    NL: "Als je hulp nodig hebt, neem dan contact op met ons kantoor.",
    PT: "Se precisar de ajuda, contacte o nosso escritório.",
    FR: "Si vous avez besoin d'aide, n'hésitez pas à contacter notre bureau.",
    ES: "Si necesitas ayuda, ponte en contacto con nuestra oficina.",
    IT: "Se avete bisogno di assistenza, contattate il nostro ufficio.",
  },
  {
    ID: 78,
    MAIN_EN: "I wouldn't have made that mistake if I had paid more attention.",
    DE: "Ich hätte diesen Fehler nicht gemacht, wenn ich besser aufgepasst hätte.",
    NL: "Ik zou die fout niet hebben gemaakt als ik beter had opgelet.",
    PT: "Não teria cometido esse erro se tivesse prestado mais atenção.",
    FR: "Je n'aurais pas fait cette erreur si j'avais été plus attentif.",
    ES: "No habría cometido ese error si hubiera prestado más atención.",
    IT: "Non avrei commesso quell'errore se avessi prestato più attenzione.",
  },
  {
    ID: 79,
    MAIN_EN: "If he had studied harder, he might have passed the exam.",
    DE: "Wenn er sich mehr Mühe gegeben hätte, hätte er die Prüfung vielleicht bestanden.",
    NL: "Als hij harder had gestudeerd, was hij misschien geslaagd voor het examen.",
    PT: "Se ele tivesse estudado mais, talvez tivesse passado no exame.",
    FR: "S'il avait étudié davantage, il aurait peut-être réussi l'examen.",
    ES: "Si hubiera estudiado más, habría aprobado el examen.",
    IT: "Se avesse studiato di più, avrebbe potuto superare l'esame.",
  },
  {
    ID: 80,
    MAIN_EN:
      "Were it not for the heavy traffic, we would have arrived on time.",
    DE: "Wäre der dichte Verkehr nicht gewesen, wären wir pünktlich angekommen.",
    NL: "Als het verkeer niet zo druk was geweest, waren we op tijd gekomen.",
    PT: "Se não fosse o trânsito intenso, teríamos chegado a tempo.",
    FR: "Si la circulation n'était pas trop dense, nous serions arrivés à temps.",
    ES: "Si no fuera por el tráfico, habríamos llegado a tiempo.",
    IT: "Se non fosse stato per il traffico intenso, saremmo arrivati in tempo.",
  },
  {
    ID: 81,
    MAIN_EN:
      "The old house, which is located on the hill, has a beautiful view.",
    DE: "Das alte Haus, das auf einem Hügel liegt, hat eine schöne Aussicht.",
    NL: "Het oude huis, dat op de heuvel ligt, heeft een prachtig uitzicht.",
    PT: "A casa antiga, que está situada na colina, tem uma bela vista.",
    FR: "La vieille maison, qui est située sur la colline, a une vue magnifique.",
    ES: "La vieja casa, situada en la colina, tiene unas vistas preciosas.",
    IT: "La vecchia casa, che si trova sulla collina, ha una bellissima vista.",
  },
  {
    ID: 82,
    MAIN_EN: "The reason why he was late was due to the train delay.",
    DE: "Der Grund für seine Verspätung war die Zugverspätung.",
    NL: "De reden waarom hij te laat was, was de treinvertraging.",
    PT: "A razão do seu atraso foi o atraso do comboio.",
    FR: "La raison de son retard est due au retard du train.",
    ES: "Llegó tarde debido al retraso del tren.",
    IT: "Il motivo del suo ritardo è dovuto al ritardo del treno.",
  },
  {
    ID: 83,
    MAIN_EN:
      "The book, which I borrowed from the library, is very interesting.",
    DE: "Das Buch, das ich in der Bibliothek ausgeliehen habe, ist sehr interessant.",
    NL: "Het boek dat ik geleend heb van de bibliotheek is erg interessant.",
    PT: "O livro, que me emprestaram da biblioteca, é muito interessante.",
    FR: "Le livre que j'ai emprunté à la bibliothèque est très intéressant.",
    ES: "El libro, que tomé prestado de la biblioteca, es muy interesante.",
    IT: "Il libro che ho preso in prestito dalla biblioteca è molto interessante.",
  },
  {
    ID: 84,
    MAIN_EN:
      "She described the incident in detail, so we understood what happened.",
    DE: "Sie hat den Vorfall ausführlich beschrieben, so dass wir verstanden haben, was passiert ist.",
    NL: "Ze beschreef het incident in detail, zodat we begrepen wat er was gebeurd.",
    PT: "Ela descreveu o incidente em pormenor, por isso compreendemos o que aconteceu.",
    FR: "Elle a décrit l'incident en détail, de sorte que nous avons compris ce qui s'est passé.",
    ES: "Describe el incidente con todo detalle, para que entendamos lo que pasó.",
    IT: "Ha descritto l'incidente in modo dettagliato, così abbiamo capito cosa è successo.",
  },
  {
    ID: 85,
    MAIN_EN:
      "The city, known for its historical buildings, attracts many tourists.",
    DE: "Die Stadt, die für ihre historischen Gebäude bekannt ist, zieht viele Touristen an.",
    NL: "De stad, bekend om zijn historische gebouwen, trekt veel toeristen.",
    PT: "A cidade, conhecida pelos seus edifícios históricos, atrai muitos turistas.",
    FR: "La ville, connue pour ses bâtiments historiques, attire de nombreux touristes.",
    ES: "La ciudad, conocida por sus edificios históricos, atrae a muchos turistas.",
    IT: "La città, nota per i suoi edifici storici, attira molti turisti.",
  },
  {
    ID: 86,
    MAIN_EN: "He explained the process step by step, making it easy to follow.",
    DE: "Er erklärte den Vorgang Schritt für Schritt, so dass man ihn leicht nachvollziehen konnte.",
    NL: "Hij legde het proces stap voor stap uit, zodat het makkelijk te volgen was.",
    PT: "Ele explicou o processo passo a passo, tornando-o fácil de seguir.",
    FR: "Il a expliqué le processus étape par étape, le rendant facile à suivre.",
    ES: "Explicó el proceso paso a paso, haciéndolo fácil de seguir.",
    IT: "Ha spiegato il processo passo dopo passo, rendendolo facile da seguire.",
  },
  {
    ID: 87,
    MAIN_EN:
      "The problem, which had been overlooked, caused further complications.",
    DE: "Das Problem, das übersehen worden war, führte zu weiteren Komplikationen.",
    NL: "Het probleem, dat over het hoofd was gezien, veroorzaakte verdere complicaties.",
    PT: "O problema, que tinha sido negligenciado, causou mais complicações.",
    FR: "Le problème, qui avait été négligé, a entraîné d'autres complications.",
    ES: "El problema, que se había pasado por alto, causó más complicaciones.",
    IT: "Il problema, che era stato trascurato, ha causato ulteriori complicazioni.",
  },
  {
    ID: 88,
    MAIN_EN: "The restaurant, famous for its seafood, is always crowded.",
    DE: "Das Restaurant, das für seine Meeresfrüchte berühmt ist, ist immer überfüllt.",
    NL: "Het restaurant, beroemd om zijn visgerechten, is altijd druk bezocht.",
    PT: "O restaurante, famoso pelo seu marisco, está sempre cheio.",
    FR: "Le restaurant, réputé pour ses fruits de mer, est toujours bondé.",
    ES: "El restaurante, famoso por su marisco, siempre está lleno.",
    IT: "Il ristorante, famoso per i suoi frutti di mare, è sempre affollato.",
  },
  {
    ID: 89,
    MAIN_EN: "She outlined the plan, highlighting the key points.",
    DE: "Sie erläuterte den Plan und hob dabei die wichtigsten Punkte hervor.",
    NL: "Ze schetste het plan en benadrukte de belangrijkste punten.",
    PT: "Ela expôs o plano, destacando os pontos-chave.",
    FR: "Elle a exposé le plan en soulignant les points essentiels.",
    ES: "Esbozó el plan, destacando los puntos clave.",
    IT: "Ha illustrato il piano, evidenziando i punti chiave.",
  },
  {
    ID: 90,
    MAIN_EN: "The film, which won several awards, is highly recommended.",
    DE: "Der mehrfach preisgekrönte Film ist sehr zu empfehlen.",
    NL: "De film, die verschillende prijzen heeft gewonnen, is een echte aanrader.",
    PT: "O filme, que ganhou vários prémios, é altamente recomendado.",
    FR: "Le film, qui a remporté plusieurs prix, est fortement recommandé.",
    ES: "La película, galardonada con varios premios, es muy recomendable.",
    IT: "Il film, che ha vinto diversi premi, è altamente raccomandato.",
  },
  {
    ID: 91,
    MAIN_EN: "It's possible that the meeting will be postponed.",
    DE: "Es ist möglich, dass das Treffen verschoben wird.",
    NL: "Het is mogelijk dat de vergadering wordt uitgesteld.",
    PT: "É possível que a reunião seja adiada.",
    FR: "Il est possible que la réunion soit reportée.",
    ES: "Es posible que se aplace la reunión.",
    IT: "È possibile che la riunione venga rinviata.",
  },
  {
    ID: 92,
    MAIN_EN: "He might have forgotten to bring his keys.",
    DE: "Er könnte vergessen haben, seine Schlüssel mitzunehmen.",
    NL: "Misschien is hij zijn sleutels vergeten.",
    PT: "Ele pode ter-se esquecido de trazer as chaves.",
    FR: "Il a peut-être oublié ses clés.",
    ES: "Puede que se haya olvidado de traer las llaves.",
    IT: "Potrebbe aver dimenticato di portare le chiavi.",
  },
  {
    ID: 93,
    MAIN_EN: "There's a chance that the weather will improve later today.",
    DE: "Es besteht die Chance, dass sich das Wetter im Laufe des Tages bessert.",
    NL: "Er is een kans dat het weer later vandaag beter wordt.",
    PT: "É possível que o tempo melhore ainda hoje.",
    FR: "Il est possible que le temps s'améliore plus tard dans la journée.",
    ES: "Es posible que el tiempo mejore hoy.",
    IT: "C'è la possibilità che il tempo migliori in giornata.",
  },
  {
    ID: 94,
    MAIN_EN: "She could be working late at the office.",
    DE: "Es könnte sein, dass sie länger im Büro arbeitet.",
    NL: "Misschien werkt ze nog laat op kantoor.",
    PT: "Ela pode estar a trabalhar até tarde no escritório.",
    FR: "Il est possible qu'elle travaille tard au bureau.",
    ES: "Puede que trabaje hasta tarde en la oficina.",
    IT: "Potrebbe lavorare fino a tardi in ufficio.",
  },
  {
    ID: 95,
    MAIN_EN: "It's likely that they will arrive before us.",
    DE: "Es ist wahrscheinlich, dass sie vor uns ankommen werden.",
    NL: "Ze zullen waarschijnlijk eerder aankomen dan wij.",
    PT: "É provável que eles cheguem antes de nós.",
    FR: "Il est probable qu'ils arrivent avant nous.",
    ES: "Es probable que lleguen antes que nosotros.",
    IT: "È probabile che arrivino prima di noi.",
  },
  {
    ID: 96,
    MAIN_EN: "They may have already left for the airport.",
    DE: "Vielleicht sind sie schon zum Flughafen gefahren.",
    NL: "Misschien zijn ze al vertrokken naar het vliegveld.",
    PT: "Talvez já tenham partido para o aeroporto.",
    FR: "Ils sont peut-être déjà partis pour l'aéroport.",
    ES: "Puede que ya se hayan ido al aeropuerto.",
    IT: "Potrebbero essere già partiti per l'aeroporto.",
  },
  {
    ID: 97,
    MAIN_EN: "It's uncertain whether the project will be completed on time.",
    DE: "Es ist ungewiss, ob das Projekt pünktlich fertig wird.",
    NL: "Het is onzeker of het project op tijd klaar zal zijn.",
    PT: "É incerto se o projeto será concluído a tempo.",
    FR: "Il n'est pas certain que le projet soit achevé à temps.",
    ES: "No se sabe si el proyecto se terminará a tiempo.",
    IT: "Non si sa se il progetto sarà completato in tempo.",
  },
  {
    ID: 98,
    MAIN_EN: "He could have taken the wrong train.",
    DE: "Er könnte den falschen Zug genommen haben.",
    NL: "Hij kan de verkeerde trein genomen hebben.",
    PT: "Ele pode ter apanhado o comboio errado.",
    FR: "Il a pu se tromper de train.",
    ES: "Podría haberse equivocado de tren.",
    IT: "Potrebbe aver preso il treno sbagliato.",
  },
  {
    ID: 99,
    MAIN_EN: "It's probable that she will accept the invitation.",
    DE: "Es ist wahrscheinlich, dass sie die Einladung annehmen wird.",
    NL: "Waarschijnlijk zal ze de uitnodiging accepteren.",
    PT: "É provável que ela aceite o convite.",
    FR: "Il est probable qu'elle accepte l'invitation.",
    ES: "Es probable que acepte la invitación.",
    IT: "È probabile che accetti l'invito.",
  },
  {
    ID: 100,
    MAIN_EN: "There's a possibility of rain tomorrow afternoon.",
    DE: "Morgen Nachmittag besteht die Möglichkeit, dass es regnet.",
    NL: "Er is kans op regen morgenmiddag.",
    PT: "Há a possibilidade de chover amanhã à tarde.",
    FR: "Il est possible qu'il pleuve demain après-midi.",
    ES: "Es posible que llueva mañana por la tarde.",
    IT: "È possibile che domani pomeriggio piova.",
  },
];
