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
    PT: "Fica no teu quarto até teres arrumado tudo!",
    FR: "Reste dans ta chambre jusqu'à ce que tu aies fait le ménage !",
  },
  {
    ID: 2,
    MAIN_EN: "The ethics teacher has recommended a good book.",
    DE: "Der Ethiklehrer hat ein gutes Buch empfohlen.",
    NL: "De leraar ethiek heeft een goed boek aanbevolen.",
    PT: "O professor de ética recomendou um bom livro.",
    FR: "Le professeur d'éthique a recommandé un bon livre.",
  },
  {
    ID: 3,
    MAIN_EN: "You can't see him, he's already gone!",
    DE: "Du kannst ihn nicht sehen, er ist schon gegangen!",
    NL: "Je kunt hem niet zien, hij is al weg!",
    PT: "Não o podes ver, ele já se foi embora!",
    FR: "Tu ne peux pas le voir, il est déjà parti !",
  },
  {
    ID: 4,
    MAIN_EN: "She's been on the phone to her sister-in-law all day.",
    DE: "Sie hat den ganzen Tag mit ihrer Schwägerin telefoniert.",
    NL: "Ze belt al de hele dag met haar schoonzus.",
    PT: "Ela tem estado ao telefone com a cunhada o dia todo.",
    FR: "Elle a passé la journée au téléphone avec sa belle-sœur.",
  },
  {
    ID: 5,
    MAIN_EN: "He hasn't decided what he's going to have for breakfast.",
    DE: "Er hat sich nicht entschieden, was er frühstücken wird.",
    NL: "Hij heeft nog niet besloten wat hij als ontbijt gaat nemen.",
    PT: "Ele ainda não decidiu o que vai comer ao pequeno-almoço.",
    FR: "Il n'a pas décidé de ce qu'il allait prendre au petit-déjeuner.",
  },
  {
    ID: 6,
    MAIN_EN: "This notebook used to be mine.",
    DE: "Dieses Heft hat früher einmal mir gehört.",
    NL: "Dit notitieboekje was vroeger van mij.",
    PT: "Este caderno era meu.",
    FR: "Ce cahier m'appartenait autrefois.",
  },
  {
    ID: 7,
    MAIN_EN: "The glass has fallen off the table.",
    DE: "Das Glas ist vom Tisch gefallen.",
    NL: "Het glas viel van de tafel.",
    PT: "O copo caiu da mesa.",
    FR: "Le verre est tombé de la table.",
  },
  {
    ID: 8,
    MAIN_EN: "The shop sold a lot of things today.",
    DE: "Das Geschäft hat heute sehr viel Sachen verkauft.",
    NL: "De winkel verkocht vandaag van alles.",
    PT: "A loja vendeu muitas coisas hoje.",
    FR: "Le magasin a vendu beaucoup de choses aujourd'hui.",
  },
  {
    ID: 9,
    MAIN_EN: "They took my granddaughter to the theatre.",
    DE: "Sie haben meine Enkeltochter ins Theater mitgenommen.",
    NL: "Ze namen mijn kleindochter mee naar het theater.",
    PT: "Levaram a minha neta ao teatro.",
    FR: "Ils ont emmené ma petite-fille au théâtre.",
  },
  {
    ID: 10,
    MAIN_EN: "His sister has finally moved out of home.",
    DE: "Seine Schwester ist endlich von zu Hause ausgezogen.",
    NL: "Zijn zus is eindelijk verhuisd.",
    PT: "A irmã dele acabou por sair de casa.",
    FR: "Sa sœur a finalement déménagé de la maison.",
  },
  {
    ID: 11,
    MAIN_EN: "Have you visited your future university yet?",
    DE: "Hast du schon deine zukünftige Universität besucht?",
    NL: "Heb je je toekomstige universiteit al bezocht?",
    PT: "Já visitaste a tua futura universidade?",
    FR: "Tu as déjà visité ta future université ?",
  },
  {
    ID: 12,
    MAIN_EN: "He only ate savoury things as a child.",
    DE: "Er hat als Kind nur salzige Sachen gegessen.",
    NL: "Als kind at hij alleen maar hartige dingen.",
    PT: "Em criança, só comia coisas saborosas.",
    FR: "Quand il était petit, il ne mangeait que des choses salées.",
  },
  {
    ID: 13,
    MAIN_EN: "Didn't anyone organise Petra's surprise party?",
    DE: "Hat niemand Petras Überraschungsparty organisiert?",
    NL: "Heeft niemand Petra's verrassingsfeestje georganiseerd?",
    PT: "Ninguém organizou a festa surpresa da Petra?",
    FR: "Personne n'a organisé la fête surprise de Petra ?",
  },
  {
    ID: 14,
    MAIN_EN: "We went jogging for an hour yesterday.",
    DE: "Wir sind gestern eine Stunde lang gejoggt.",
    NL: "We zijn gisteren een uur gaan joggen.",
    PT: "Ontem fomos correr durante uma hora.",
    FR: "Nous avons fait une heure de jogging hier.",
  },
  {
    ID: 15,
    MAIN_EN: "Why didn't they get married earlier?",
    DE: "Wieso haben sie nicht früher geheiratet?",
    NL: "Waarom zijn ze niet eerder getrouwd?",
    PT: "Porque é que eles não se casaram mais cedo?",
    FR: "Pourquoi ne se sont-ils pas mariés plus tôt ?",
  },
  {
    ID: 16,
    MAIN_EN: "I studied philosophy a long time ago.",
    DE: "Ich habe vor langer Zeit Philosophie studiert.",
    NL: "Ik heb lang geleden filosofie gestudeerd.",
    PT: "Estudei filosofia há muito tempo.",
    FR: "J'ai étudié la philosophie il y a longtemps.",
  },
  {
    ID: 17,
    MAIN_EN: "The brothers never got on well.",
    DE: "Die Brüder haben sich nie gut verstanden.",
    NL: "De broers konden nooit goed met elkaar opschieten.",
    PT: "Os irmãos nunca se deram bem.",
    FR: "Les frères ne se sont jamais bien entendus.",
  },
  {
    ID: 18,
    MAIN_EN: "She can't cook. Yesterday she destroyed the cooker.",
    DE: "Sie kann nicht kochen. Gestern hat sie den Herd zerstört.",
    NL: "Ze kan niet koken. Gisteren heeft ze het fornuis vernield.",
    PT: "Ela não sabe cozinhar. Ontem ela destruiu o fogão.",
    FR: "Elle ne sait pas cuisiner. Hier, elle a détruit la cuisinière.",
  },
  {
    ID: 19,
    MAIN_EN: "Have you tasted the sweet apples?",
    DE: "Hast du schon die süßen Äpfel probiert.",
    NL: "Heb je de zoete appels geproefd?",
    PT: "Já provaste as maçãs doces?",
    FR: "Tu as déjà goûté les pommes sucrées.",
  },
  {
    ID: 20,
    MAIN_EN: "She still lives with her parents.",
    DE: "Sie wohnt noch immer bei ihren Eltern.",
    NL: "Ze woont nog steeds bij haar ouders.",
    PT: "Ela ainda vive com os pais.",
    FR: "Elle vit toujours chez ses parents.",
  },
  {
    ID: 21,
    MAIN_EN: "Spend the night with me!",
    DE: "Übernachte bei mir!",
    NL: "Blijf vannacht bij mij!",
    PT: "Passa a noite comigo!",
    FR: "Passe la nuit chez moi !",
  },
  {
    ID: 22,
    MAIN_EN: "I was sick all the time when I was 10.",
    DE: "Mit 10 Jahren war ich ständig krank.",
    NL: "Ik was de hele tijd ziek toen ik 10 was.",
    PT: "Eu estava sempre doente quando tinha 10 anos.",
    FR: "A dix ans, j'étais tout le temps malade.",
  },
  {
    ID: 23,
    MAIN_EN: "He lives in France with his wife.",
    DE: "Er lebt mit seiner Frau in Frankreich.",
    NL: "Hij woont in Frankrijk met zijn vrouw.",
    PT: "Ele vive em França com a mulher.",
    FR: "Il vit en France avec sa femme.",
  },
  {
    ID: 24,
    MAIN_EN: "I live in Berlin with my two flatmates.",
    DE: "Ich wohne in Berlin mit meinen zwei Mitbewohnern.",
    NL: "Ik woon in Berlijn met mijn twee huisgenoten.",
    PT: "Eu vivo em Berlim com os meus dois colegas de casa.",
    FR: "J'habite à Berlin avec mes deux colocataires.",
  },
  {
    ID: 25,
    MAIN_EN: "The present is from me.",
    DE: "Das Geschenk ist von mir.",
    NL: "Het cadeautje is van mij.",
    PT: "O presente é da minha parte.",
    FR: "Le cadeau est de moi.",
  },
  {
    ID: 26,
    MAIN_EN: "Are you coming to Petra's surprise party tomorrow?",
    DE: "Kommst du morgen zu Petras Überraschungsparty?",
    NL: "Kom je morgen naar Petra's verrassingsfeestje?",
    PT: "Vens amanhã à festa surpresa da Petra?",
    FR: "Tu viendras à la fête surprise de Petra demain ?",
  },
  {
    ID: 27,
    MAIN_EN: "She's thinking about Felix's advice.",
    DE: "Sie denkt über Felix’ Ratschlag nach.",
    NL: "Ze denkt na over Felix' advies.",
    PT: "Ela está a pensar no conselho do Félix.",
    FR: "Elle réfléchit au conseil de Felix.",
  },
  {
    ID: 28,
    MAIN_EN: "Jana's accountant is rude.",
    DE: "Janas Buchhalter ist unhöflich.",
    NL: "Jana's accountant is onbeleefd.",
    PT: "O contabilista da Jana é mal-educado.",
    FR: "Le comptable de Jana est impoli.",
  },
  {
    ID: 29,
    MAIN_EN: "Unfortunately, no one has seen Hans' wallet.",
    DE: "Leider hat niemand Hans’ Geldbeutel gesehen.",
    NL: "Helaas heeft niemand de portemonnee van Hans gezien.",
    PT: "Infelizmente, ninguém viu a carteira do Hans.",
    FR: "Malheureusement, personne n'a vu le porte-monnaie de Hans.",
  },
  {
    ID: 30,
    MAIN_EN: "Someone is always doing Joachim's homework.",
    DE: "Jemand macht immer Joachims Hausaufgaben.",
    NL: "Er is altijd iemand die Joachims huiswerk maakt.",
    PT: "Alguém está sempre a fazer os trabalhos de casa do Joaquim.",
    FR: "Quelqu'un fait toujours les devoirs de Joachim.",
  },
  {
    ID: 31,
    MAIN_EN: "Kim's favourite subject is maths.",
    DE: "Kims Lieblingsfach ist Mathe.",
    NL: "Kim's favoriete vak is wiskunde.",
    PT: "A disciplina preferida da Kim é a matemática.",
    FR: "La matière préférée de Kim est les maths.",
  },
  {
    ID: 32,
    MAIN_EN: "What colour is the picture hanging on the wall?",
    DE: "Welche Farbe hat das Bild, das an der Wand hängt?",
    NL: "Welke kleur heeft de foto die aan de muur hangt?",
    PT: "De que cor é o quadro que está pendurado na parede?",
    FR: "De quelle couleur est le tableau accroché au mur ?",
  },
  {
    ID: 33,
    MAIN_EN: "Take a look! We're flying over the sea now!",
    DE: "Schau mal! Wir fliegen jetzt über das Meer!",
    NL: "Kijk! We vliegen nu over de zee!",
    PT: "Olha! Estamos a sobrevoar o mar!",
    FR: "Regarde ! Nous survolons maintenant la mer !",
  },
  {
    ID: 34,
    MAIN_EN: "Hanna's here before me again!",
    DE: "Hanna ist schon wieder vor mir hier!",
    NL: "Hanna is me weer voor!",
    PT: "A Hanna está aqui outra vez antes de mim!",
    FR: "Hanna est encore arrivée avant moi !",
  },
  {
    ID: 35,
    MAIN_EN: "There's only sweets on the shelves in the shop!",
    DE: "Im Geschäft gibt es nur Süßigkeiten in den Regalen!",
    NL: "Er liggen alleen maar snoepjes op de planken in de winkel!",
    PT: "Só há rebuçados nas prateleiras da loja!",
    FR: "Dans le magasin, il n'y a que des bonbons sur les étagères !",
  },
  {
    ID: 36,
    MAIN_EN: "Why aren't the dishes on the table yet?",
    DE: "Wieso ist das Geschirr noch nicht auf dem Tisch?",
    NL: "Waarom staat de afwas nog niet op tafel?",
    PT: "Porque é que os pratos ainda não estão na mesa?",
    FR: "Pourquoi la vaisselle n'est-elle pas encore sur la table ?",
  },
  {
    ID: 37,
    MAIN_EN: "The worst is behind us now.",
    DE: "Das Schlimmste ist jetzt hinter uns.",
    NL: "Het ergste is nu achter de rug.",
    PT: "O pior já passou.",
    FR: "Le pire est maintenant derrière nous.",
  },
  {
    ID: 38,
    MAIN_EN: "She's always thinking about her daughter.",
    DE: "Sie denkt ständig an ihre Tochter.",
    NL: "Ze denkt altijd aan haar dochter.",
    PT: "Ela está sempre a pensar na filha.",
    FR: "Elle pense sans cesse à sa fille.",
  },
  {
    ID: 39,
    MAIN_EN: "My neighbours often talk about politics.",
    DE: "Meine Nachbarn reden oft über die Politik.",
    NL: "Mijn buren praten vaak over politiek.",
    PT: "Os meus vizinhos falam muitas vezes de política.",
    FR: "Mes voisins parlent souvent de politique.",
  },
  {
    ID: 40,
    MAIN_EN: "Why is the lamp in front of the TV?",
    DE: "Wieso steht die Lampe vor dem Fernseher?",
    NL: "Waarom staat de lamp voor de tv?",
    PT: "Porque é que o candeeiro está em frente à televisão?",
    FR: "Pourquoi la lampe est-elle placée devant la télévision ?",
  },
  {
    ID: 41,
    MAIN_EN: "Quickly! Stand under my umbrella!",
    DE: "Schnell! Stell dich unter meinen Regenschirm!",
    NL: "Snel! Ga onder mijn paraplu staan!",
    PT: "Rápido! Põe-te debaixo do meu guarda-chuva!",
    FR: "Vite ! Mets-toi sous mon parapluie !",
  },
  {
    ID: 42,
    MAIN_EN: "I rarely go into town.",
    DE: "Ich fahre nur selten in die Stadt.",
    NL: "Ik ga zelden de stad in.",
    PT: "Raramente vou à cidade.",
    FR: "Je vais rarement en ville.",
  },
  {
    ID: 43,
    MAIN_EN: "There's a park between the houses.",
    DE: "Zwischen den Häusern befindet sich ein Park.",
    NL: "Er is een park tussen de huizen.",
    PT: "Há um parque entre as casas.",
    FR: "Entre les maisons, il y a un parc.",
  },
  {
    ID: 44,
    MAIN_EN: "I'm standing next to my colleague in the photo.",
    DE: "Ich stehe im Foto neben meinem Mitarbeiter.",
    NL: "Ik sta naast mijn collega op de foto.",
    PT: "Na fotografia, estou ao lado do meu colega.",
    FR: "Sur la photo, je me tiens à côté de mon collaborateur.",
  },
  {
    ID: 45,
    MAIN_EN: "Can I stand next to you?",
    DE: "Kann ich mich neben dich stellen?",
    NL: "Mag ik naast u staan?",
    PT: "Posso ficar ao teu lado?",
    FR: "Je peux me mettre à côté de toi ?",
  },
  {
    ID: 46,
    MAIN_EN: "Could you put the cup of tea on the table, please?",
    DE: "Stellst du die Tasse Tee bitte auf den Tisch?",
    NL: "Kun je het kopje thee op tafel zetten, alsjeblieft?",
    PT: "Pode pôr a chávena de chá em cima da mesa, por favor?",
    FR: "Tu peux poser la tasse de thé sur la table ?",
  },
  {
    ID: 47,
    MAIN_EN: "The cat is sleeping under my bed.",
    DE: "Die Katze schläft unter meinem Bett.",
    NL: "De kat slaapt onder mijn bed.",
    PT: "O gato está a dormir debaixo da minha cama.",
    FR: "Le chat dort sous mon lit.",
  },
  {
    ID: 48,
    MAIN_EN: "Put the workbook behind you on the shelf.",
    DE: "Leg das Arbeitsbuch hinter dich in das Regal.",
    NL: "Leg het werkboek achter je op de plank.",
    PT: "Põe o caderno de exercícios atrás de ti na prateleira.",
    FR: "Mets le cahier d'exercices derrière toi sur l'étagère.",
  },
  {
    ID: 49,
    MAIN_EN: "Hans' exercise book is on the table in front of the teacher.",
    DE: "Hans’ Heft liegt vor dem Lehrer auf dem Tisch.",
    NL: "Het schriftenboek van Hans ligt op de tafel voor de leraar.",
    PT: "O caderno de exercícios do Hans está em cima da mesa em frente ao professor.",
    FR: "Le cahier de Hans est sur la table devant le professeur.",
  },
  {
    ID: 50,
    MAIN_EN: "Are you sure you want to try the spicy sausage?",
    DE: "Willst du das scharfe Würstchen wirklich probieren?",
    NL: "Weet je zeker dat je de pittige worst wilt proberen?",
    PT: "Tens a certeza que queres provar a salsicha picante?",
    FR: "Tu veux vraiment goûter à la saucisse épicée ?",
  },
  {
    ID: 51,
    MAIN_EN: "Let's pick up the oven ourselves!",
    DE: "Lass uns den Backofen selbst abholen!",
    NL: "Laten we zelf de oven pakken!",
    PT: "Vamos nós buscar o forno!",
    FR: "Allons chercher le four nous-mêmes !",
  },
  {
    ID: 52,
    MAIN_EN: "Do you want to visit my university tomorrow?",
    DE: "Wollt ihr morgen meine Universität besuchen?",
    NL: "Wil je morgen mijn universiteit bezoeken?",
    PT: "Queres visitar a minha universidade amanhã?",
    FR: "Vous voulez visiter mon université demain ?",
  },
  {
    ID: 53,
    MAIN_EN: "Let's go to the canteen.",
    DE: "Lass uns in die Kantine gehen.",
    NL: "Laten we naar de kantine gaan.",
    PT: "Vamos à cantina.",
    FR: "Allons à la cantine.",
  },
  {
    ID: 54,
    MAIN_EN: "Do you want to come into my flat?",
    DE: "Willst du rein in meine Wohnung kommen?",
    NL: "Wil je in mijn flat komen?",
    PT: "Queres entrar no meu apartamento?",
    FR: "Tu veux entrer dans mon appartement ?",
  },
  {
    ID: 55,
    MAIN_EN: "Let's have fish for lunch every now and then.",
    DE: "Lass uns zum Mittagessen ab und zu Fisch essen.",
    NL: "Laten we af en toe vis eten als lunch.",
    PT: "Vamos comer peixe ao almoço de vez em quando.",
    FR: "Mangeons du poisson de temps en temps pour le déjeuner.",
  },
  {
    ID: 56,
    MAIN_EN: "He had to wait because we were still having breakfast.",
    DE: "Er musste warten, weil wir noch gefrühstückt haben.",
    NL: "Hij moest wachten omdat we nog aan het ontbijten waren.",
    PT: "Ele teve de esperar porque ainda estávamos a tomar o pequeno-almoço.",
    FR: "Il a dû attendre parce que nous avons encore pris le petit déjeuner.",
  },
  {
    ID: 57,
    MAIN_EN: "Take the green dress because that's the colour she likes best.",
    DE: "Nimm das grüne Kleid, weil diese Farbe ihr am besten gefällt.",
    NL: "Neem de groene jurk want dat is de kleur die ze het mooist vindt.",
    PT: "Leva o vestido verde porque é a cor de que ela mais gosta.",
    FR: "Prends la robe verte parce que c'est la couleur qui lui plaît le plus.",
  },
  {
    ID: 58,
    MAIN_EN: "They argued because he didn't want to have a barbecue.",
    DE: "Sie haben gestritten, weil er nicht grillen wollte.",
    NL: "Ze hadden ruzie omdat hij niet wilde barbecueën.",
    PT: "Discutiram porque ele não queria fazer um churrasco.",
    FR: "Ils se sont disputés parce qu'il ne voulait pas faire de barbecue.",
  },
  {
    ID: 59,
    MAIN_EN:
      "He hated his time at school because the teachers were too strict.",
    DE: "Er hat seine Schulzeit gehasst, weil die Lehrer zu streng waren.",
    NL: "Hij haatte zijn tijd op school omdat de leraren te streng waren.",
    PT: "Ele detestava o tempo que passava na escola porque os professores eram demasiado rígidos.",
    FR: "Il a détesté ses années d'école parce que les professeurs étaient trop sévères.",
  },
  {
    ID: 60,
    MAIN_EN: "I'm worried because she hasn't called at all.",
    DE: "Ich mache mir Sorgen, weil sie überhaupt nicht angerufen hat.",
    NL: "Ik maak me zorgen omdat ze helemaal niet heeft gebeld.",
    PT: "Estou preocupado porque ela não me ligou.",
    FR: "Je m'inquiète parce qu'elle n'a pas appelé du tout.",
  },
  {
    ID: 61,
    MAIN_EN: "Don't be angry with him because he's not responsible.",
    DE: "Sei nicht böse auf ihn, weil er nicht verantwortlich dafür ist.",
    NL: "Wees niet boos op hem omdat hij niet verantwoordelijk is.",
    PT: "Não te zangues com ele porque ele não é responsável.",
    FR: "Ne lui en veux pas parce qu'il n'est pas responsable.",
  },
  {
    ID: 62,
    MAIN_EN:
      "She couldn't go to university because she didn't do her A-levels.",
    DE: "Sie konnte keine Universität besuchen, weil sie das Abitur nicht gemacht hat.",
    NL: "Ze kon niet naar de universiteit omdat ze haar A-niveau niet haalde.",
    PT: "Ela não pôde ir para a universidade porque não fez os seus A-levels.",
    FR: "Elle n'a pas pu aller à l'université parce qu'elle n'a pas eu son baccalauréat.",
  },
  {
    ID: 63,
    MAIN_EN: "I drink tea before I sleep because it helps me fall asleep.",
    DE: "Ich trinke vor dem Schlafen Tee, weil ich dann besser einschlafe.",
    NL: "Ik drink thee voor ik ga slapen omdat ik dan beter in slaap val.",
    PT: "Eu bebo chá antes de dormir porque me ajuda a adormecer.",
    FR: "Je bois du thé avant de dormir parce que ça m'aide à m'endormir.",
  },
  {
    ID: 64,
    MAIN_EN:
      "He doesn't give her any advice because he doesn't know anything about it.",
    DE: "Er gibt ihr keinen Ratschlag, weil er davon keine Ahnung hat.",
    NL: "Hij geeft haar geen advies omdat hij er niets vanaf weet.",
    PT: "Ele não lhe dá nenhum conselho porque não sabe nada sobre o assunto.",
    FR: "Il ne lui donne pas de conseils parce qu'il n'y connaît rien.",
  },
  {
    ID: 65,
    MAIN_EN:
      "You should cut them into cubes because otherwise you can't enjoy them.",
    DE: "Du solltest sie in Würfel schneiden, weil du sie ansonsten nicht genießen kannst.",
    NL: "Je moet ze in blokjes snijden, anders kun je er niet van genieten.",
    PT: "É melhor cortá-los em cubos porque, caso contrário, não se consegue saboreá-los.",
    FR: "Tu devrais les couper en cubes, sinon tu ne pourras pas les apprécier.",
  },
  {
    ID: 66,
    MAIN_EN: "He showers every morning before work",
    DE: "Er duscht sich jeden Morgen vor der Arbeit",
    NL: "Hij doucht elke ochtend voor het werk",
    PT: "Ele toma banho todas as manhãs antes de ir trabalhar",
    FR: "Il se douche tous les matins avant d'aller travailler",
  },
  {
    ID: 67,
    MAIN_EN: "She puts her make-up on every day.",
    DE: "Sie schminkt sich jeden Tag.",
    NL: "Ze brengt elke dag haar make-up aan.",
    PT: "Ela maquilha-se todos os dias.",
    FR: "Elle se maquille tous les jours.",
  },
  {
    ID: 68,
    MAIN_EN: "Get dressed quickly!",
    DE: "Zieh dich schnell an!",
    NL: "Kleed je snel aan!",
    PT: "Veste-te depressa!",
    FR: "Habille-toi vite !",
  },
  {
    ID: 69,
    MAIN_EN: "We always relax at the weekend.",
    DE: "Am Wochenende ruhen wir uns immer aus.",
    NL: "In het weekend rusten we altijd uit.",
    PT: "Descansamos sempre ao fim de semana.",
    FR: "Le week-end, nous nous reposons toujours.",
  },
  {
    ID: 70,
    MAIN_EN: "Did you relax on Saturday?",
    DE: "Hast du dich am Samstag entspannt?",
    NL: "Heb je zaterdag ontspannen?",
    PT: "Relaxou no sábado?",
    FR: "Tu t'es détendu samedi ?",
  },
  {
    ID: 71,
    MAIN_EN: "Do you feel comfortable in your flat?",
    DE: "Fühlst du dich wohl in deiner Wohnung?",
    NL: "Voel je je op je gemak in je flat?",
    PT: "Sentes-te confortável no teu apartamento?",
    FR: "Te sens-tu bien dans ton appartement ?",
  },
  {
    ID: 72,
    MAIN_EN: "What sport are you interested in?",
    DE: "Für welche Sportart interessierst du dich?",
    NL: "In welke sport ben je geïnteresseerd?",
    PT: "Em que desporto está interessado?",
    FR: "Quel sport t'intéresse ?",
  },
  {
    ID: 73,
    MAIN_EN: "He should/should eat better!",
    DE: "Er soll/sollte sich besser ernähren!",
    NL: "Hij zou beter moeten eten!",
    PT: "Ele devia/deveria comer melhor!",
    FR: "Il devrait/aurait dû mieux s'alimenter !",
  },
  {
    ID: 74,
    MAIN_EN: "She changes her clothes before every meal.",
    DE: "Sie zieht sich vor jeder Mahlzeit um.",
    NL: "Ze kleedt zich voor elke maaltijd om.",
    PT: "Ela muda de roupa antes de cada refeição.",
    FR: "Se changer avant chaque repas.",
  },
  {
    ID: 75,
    MAIN_EN: "He should take sick leave.",
    DE: "Er sollte sich krankschreiben lassen.",
    NL: "Hij zou met ziekteverlof moeten gaan.",
    PT: "Ele deve meter baixa por doença.",
    FR: "Il devrait se faire porter pâle.",
  },
  {
    ID: 76,
    MAIN_EN: "Please hurry! / Please hurry up!",
    DE: "Bitte beeile dich! / Beeile dich bitte!",
    NL: "Schiet alsjeblieft op! / Schiet alsjeblieft op!",
    PT: "Please hurry! / Por favor despacha-te!",
    FR: "S'il te plaît, dépêche-toi ! / Dépêche-toi, s'il te plaît !",
  },
  {
    ID: 77,
    MAIN_EN: "He is constantly annoyed by his cousin.",
    DE: "Er ärgert sich ständig über seine Cousine.",
    NL: "Hij ergert zich voortdurend aan zijn neef.",
    PT: "Ele está constantemente a ser incomodado pelo primo.",
    FR: "Il s'énerve constamment contre sa cousine.",
  },
  {
    ID: 78,
    MAIN_EN: "Concentrate on your homework!",
    DE: "Konzentriere dich auf deine Hausaufgaben!",
    NL: "Concentreer je op je huiswerk!",
    PT: "Concentra-te nos teus trabalhos de casa!",
    FR: "Concentre-toi sur tes devoirs !",
  },
  {
    ID: 79,
    MAIN_EN: "Why are the dishes on the table?",
    DE: "Wieso ist das Geschirr auf dem Tisch?",
    NL: "Waarom staat de afwas op tafel?",
    PT: "Porque é que os pratos estão em cima da mesa?",
    FR: "Pourquoi la vaisselle est-elle sur la table ?",
  },
  {
    ID: 80,
    MAIN_EN: "Put the lamp next to the door.",
    DE: "Stell die Lampe neben die Tür.",
    NL: "Zet de lamp naast de deur.",
    PT: "Põe o candeeiro ao lado da porta.",
    FR: "Mets la lampe à côté de la porte.",
  },
  {
    ID: 81,
    MAIN_EN: "The armchair is already next to the door.",
    DE: "Neben der Tür steht schon der Sessel.",
    NL: "De fauteuil staat al naast de deur.",
    PT: "A poltrona já está ao lado da porta.",
    FR: "A côté de la porte, il y a déjà le fauteuil.",
  },
  {
    ID: 82,
    MAIN_EN: "He's sleeping in the room.",
    DE: "Er schläft in dem Zimmer.",
    NL: "Hij slaapt in de kamer.",
    PT: "Ele está a dormir no quarto.",
    FR: "Il dort dans la chambre.",
  },
  {
    ID: 83,
    MAIN_EN: "We're going into town tomorrow.",
    DE: "Wir gehen morgen in die Stadt.",
    NL: "We gaan morgen naar de stad.",
    PT: "Amanhã vamos à cidade.",
    FR: "Demain, nous irons en ville.",
  },
  {
    ID: 84,
    MAIN_EN: "The supermarket is right behind you!",
    DE: "Der Supermarkt ist gleich hinter dir!",
    NL: "De supermarkt is vlak achter je!",
    PT: "O supermercado está mesmo atrás de ti!",
    FR: "Le supermarché est juste derrière toi !",
  },
  {
    ID: 85,
    MAIN_EN: "Put the shelf behind the bed.",
    DE: "Stell das Regal hinter das Bett.",
    NL: "Zet de plank achter het bed.",
    PT: "Coloca a prateleira atrás da cama.",
    FR: "Mets l'étagère derrière le lit.",
  },
  {
    ID: 86,
    MAIN_EN: "Please hang the poster on the wall.",
    DE: "Bitte häng das Poster an die Wand.",
    NL: "Hang de poster alsjeblieft aan de muur.",
    PT: "Por favor, pendura o poster na parede.",
    FR: "Accroche le poster au mur, s'il te plaît.",
  },
  {
    ID: 87,
    MAIN_EN: "The big picture is on the wall.",
    DE: "Das große Bild hängt an der Wand.",
    NL: "De grote foto hangt aan de muur.",
    PT: "O quadro grande está na parede.",
    FR: "Le grand tableau est accroché au mur.",
  },
  {
    ID: 88,
    MAIN_EN: "The dog is at the door in the morning.",
    DE: "Der Hund steht morgens vor der Tür.",
    NL: "De hond staat 's ochtends voor de deur.",
    PT: "O cão está à porta de manhã.",
    FR: "Le chien est devant la porte le matin.",
  },
  {
    ID: 89,
    MAIN_EN: "She puts the blanket in front of the window.",
    DE: "Sie legt die Decke vor das Fenster.",
    NL: "Ze legt de deken voor het raam.",
    PT: "Ela põe a manta em frente à janela.",
    FR: "Elle met la couverture devant la fenêtre.",
  },
  {
    ID: 90,
    MAIN_EN: "Why did we always have to tidy the house as children?",
    DE: "Wieso mussten wir als Kinder immer das Haus aufräumen?",
    NL: "Waarom moesten we als kind altijd het huis opruimen?",
    PT: "Porque é que tínhamos de estar sempre a arrumar a casa quando éramos crianças?",
    FR: "Pourquoi devions-nous toujours nettoyer la maison quand nous étions enfants ?",
  },
  {
    ID: 91,
    MAIN_EN: "I wanted to be a teacher when I was 12.",
    DE: "Ich wollte mit 12 Jahren eine Lehrerin werden.",
    NL: "Ik wilde leraar worden toen ik 12 was.",
    PT: "Eu queria ser professora quando tinha 12 anos.",
    FR: "A douze ans, je voulais devenir enseignante.",
  },
  {
    ID: 92,
    MAIN_EN: "You weren't allowed to be so arrogant at the interview!",
    DE: "Beim Kennenlerngespräch durftest du nicht so arrogant ein!",
    NL: "Je mocht niet zo arrogant zijn tijdens het sollicitatiegesprek!",
    PT: "Não era permitido ser tão arrogante na entrevista!",
    FR: "Lors de l'entretien d'embauche, il ne fallait pas être si arrogant !",
  },
  {
    ID: 93,
    MAIN_EN: "The little kids were supposed to make the decorations.",
    DE: "Die kleinen Kinder sollten die Dekorationen basteln.",
    NL: "De kleine kinderen moesten de versieringen maken.",
    PT: "Era suposto os miúdos fazerem as decorações.",
    FR: "Les petits enfants devaient bricoler les décorations.",
  },
  {
    ID: 94,
    MAIN_EN: "I didn't want you to worry.",
    DE: "Ich wollte nicht, dass du dir Sorgen machst.",
    NL: "Ik wilde niet dat je je zorgen zou maken.",
    PT: "Não queria que te preocupasses.",
    FR: "Je ne voulais pas que tu t'inquiètes.",
  },
  {
    ID: 95,
    MAIN_EN: "She had to repeat a class because she was lazy.",
    DE: "Sie musste eine Klasse wiederholen, weil sie faul war.",
    NL: "Ze moest een klas overdoen omdat ze lui was.",
    PT: "Ela teve de repetir uma aula porque era preguiçosa.",
    FR: "Elle a dû redoubler une classe parce qu'elle était paresseuse.",
  },
  {
    ID: 96,
    MAIN_EN: "He was never allowed to touch the thing on the shelf.",
    DE: "Er durfte das Dings auf dem Regal nie anfassen.",
    NL: "Hij mocht dat ding op de plank nooit aanraken.",
    PT: "Nunca lhe foi permitido tocar na coisa que estava na prateleira.",
    FR: "Il n'avait jamais le droit de toucher le truc sur l'étagère.",
  },
  {
    ID: 97,
    MAIN_EN:
      "He couldn't lose weight even though he went jogging all the time.",
    DE: "Er konnte nicht abnehmen, obwohl er ständig joggen ging.",
    NL: "Hij kon niet afvallen ook al ging hij de hele tijd joggen.",
    PT: "Ele não conseguia perder peso, apesar de estar sempre a fazer jogging.",
    FR: "Il n'arrivait pas à perdre du poids alors qu'il faisait toujours du jogging.",
  },
  {
    ID: 98,
    MAIN_EN: "You shouldn't always be angry with him!",
    DE: "Du solltest nicht immer wütend auf ihn sein!",
    NL: "Je moet niet altijd boos op hem zijn!",
    PT: "Não devias estar sempre zangado com ele!",
    FR: "Tu ne devrais pas toujours être en colère contre lui !",
  },
  {
    ID: 99,
    MAIN_EN: "In the end, no one could give him any advice.",
    DE: "Am Ende konnte ihm niemand einen Rat geben.",
    NL: "Uiteindelijk kon niemand hem advies geven.",
    PT: "No final, ninguém lhe podia dar nenhum conselho.",
    FR: "A la fin, personne ne pouvait lui donner de conseils.",
  },
  {
    ID: 100,
    MAIN_EN: "Someone always told her what to do.",
    DE: "Jemand hat ihr immer gesagt, was sie tun musste.",
    NL: "Iemand vertelde haar altijd wat ze moest doen.",
    PT: "Havia sempre alguém que lhe dizia o que fazer.",
    FR: "Quelqu'un lui disait toujours ce qu'il fallait faire.",
  },
  {
    ID: 101,
    MAIN_EN: "I know they're always served with other vegetables.",
    DE: "Ich weiß, dass sie immer mit anderen Gemüsesorten serviert werden.",
    NL: "Ik weet dat ze altijd met andere groenten geserveerd worden.",
    PT: "Sei que são sempre servidos com outros legumes.",
    FR: "Je sais qu'ils sont toujours servis avec d'autres légumes.",
  },
  {
    ID: 102,
    MAIN_EN: "I read the other day that tomatoes are a type of fruit.",
    DE: "Neulich habe ich gelesen, dass Tomaten eine Obstsorte sind.",
    NL: "Ik las laatst dat tomaten een fruitsoort zijn.",
    PT: "Li no outro dia que o tomate é um tipo de fruta.",
    FR: "L'autre jour, j'ai lu que les tomates étaient une sorte de fruit.",
  },
  {
    ID: 103,
    MAIN_EN: "My classmate says he knew that.",
    DE: "Mein Mitschüler sagt, dass er das gewusst hat.",
    NL: "Mijn klasgenoot zegt dat hij dat wist.",
    PT: "O meu colega de turma diz que sabia isso.",
    FR: "Mon camarade de classe dit qu'il le savait.",
  },
  {
    ID: 104,
    MAIN_EN: "I don't think that's true.",
    DE: "Ich glaube nicht, dass das wahr ist.",
    NL: "Ik denk niet dat dat waar is.",
    PT: "Não me parece que seja verdade.",
    FR: "Je ne crois pas que ce soit vrai.",
  },
  {
    ID: 105,
    MAIN_EN: "Everyone knows he lies all the time.",
    DE: "Alle wissen, dass er ständig lügt.",
    NL: "Iedereen weet dat hij de hele tijd liegt.",
    PT: "Toda a gente sabe que ele está sempre a mentir.",
    FR: "Tout le monde sait qu'il ment tout le temps.",
  },
  {
    ID: 106,
    MAIN_EN: "It's sad that nobody wants to talk to him.",
    DE: "Es ist traurig, dass niemand mit ihm reden will.",
    NL: "Het is triest dat niemand met hem wil praten.",
    PT: "É triste que ninguém queira falar com ele.",
    FR: "C'est triste que personne ne veuille lui parler.",
  },
  {
    ID: 107,
    MAIN_EN: "I'm sure he'll change one day.",
    DE: "Ich bin mir sicher, dass er sich eines Tages verändern wird.",
    NL: "Ik weet zeker dat hij op een dag zal veranderen.",
    PT: "Tenho a certeza que um dia ele vai mudar.",
    FR: "Je suis sûr qu'un jour, il changera.",
  },
  {
    ID: 108,
    MAIN_EN: "I think we'll become friends then.",
    DE: "Ich denke, dass wir dann Freunde werden.",
    NL: "Ik denk dat we dan vrienden worden.",
    PT: "Acho que nessa altura nos tornaremos amigos.",
    FR: "Je pense que nous deviendrons alors amis.",
  },
  {
    ID: 109,
    MAIN_EN: "I had to go to the canteen because it was raining outside.",
    DE: "Ich musste in die Kantine gehen, weil es draußen geregnet hat.",
    NL: "Ik moest naar de kantine omdat het buiten regende.",
    PT: "Tive de ir à cantina porque estava a chover lá fora.",
    FR: "J'ai dû aller à la cantine parce qu'il pleuvait dehors.",
  },
  {
    ID: 110,
    MAIN_EN: "When would you have time to meet him?",
    DE: "Wann hätten Sie Zeit für ein Kennenlerngespräch?",
    NL: "Wanneer zou je tijd hebben om hem te ontmoeten?",
    PT: "Quando é que tens tempo para te encontrares com ele?",
    FR: "Quand auriez-vous le temps de faire connaissance ?",
  },
  {
    ID: 111,
    MAIN_EN: "He should be punctual and polite to his employees.",
    DE: "Er sollte pünktlich und höflich zu seinen Mitarbeitern sein.",
    NL: "Hij moet punctueel en beleefd zijn tegen zijn werknemers.",
    PT: "Ele deve ser pontual e educado com os seus empregados.",
    FR: "Il devrait être ponctuel et poli avec ses collaborateurs.",
  },
  {
    ID: 112,
    MAIN_EN:
      "The school was able to reopen because they had raised enough money.",
    DE: "Die Schule konnte wieder geöffnet werden, denn sie hatten genug Geld gesammelt.",
    NL: "De school kon weer open omdat ze genoeg geld hadden ingezameld.",
    PT: "A escola pôde reabrir porque angariaram dinheiro suficiente.",
    FR: "L'école a pu rouvrir, car ils avaient collecté suffisamment d'argent.",
  },
  {
    ID: 113,
    MAIN_EN: "Does he go to a secondary school or a grammar school?",
    DE: "Besucht er eine Realschule oder ein Gymnasium?",
    NL: "Gaat hij naar een middelbare school of een gymnasium?",
    PT: "Ele anda num liceu ou numa escola secundária?",
    FR: "Fréquente-t-il une école secondaire ou un lycée ?",
  },
  {
    ID: 114,
    MAIN_EN: "Her flatmate was angry because she kept hearing loud music.",
    DE: "Ihre Mitbewohnerin war wütend, weil sie ständig laute Musik gehört hat.",
    NL: "Je huisgenoot was boos omdat ze steeds harde muziek hoorde.",
    PT: "A colega de casa estava zangada porque estava sempre a ouvir música alta.",
    FR: "Sa colocataire était en colère parce qu'elle écoutait tout le temps de la musique à fond.",
  },
  {
    ID: 115,
    MAIN_EN: "If you've done your homework, then you can visit your friends.",
    DE: "Wenn du deine Hausaufgaben gemacht hast, dann kannst du deine Freunde besuchen.",
    NL: "Als je je huiswerk hebt gemaakt, kun je je vrienden bezoeken.",
    PT: "Se já fizeste os trabalhos de casa, podes ir visitar os teus amigos.",
    FR: "Si tu as fait tes devoirs, tu peux aller voir tes amis.",
  },
  {
    ID: 116,
    MAIN_EN: "You should exercise a lot and eat less unhealthy food.",
    DE: "Du solltest viel Sport treiben und weniger ungesund essen.",
    NL: "Je moet veel sporten en minder ongezond eten.",
    PT: "Devias praticar muito desporto e comer menos alimentos pouco saudáveis.",
    FR: "Tu devrais faire beaucoup de sport et manger moins malsain.",
  },
  {
    ID: 117,
    MAIN_EN: "When you're not working, you can relax at home.",
    DE: "Wenn du nicht arbeitest, kannst du dich zu Hause entspannen.",
    NL: "Als je niet werkt, kun je thuis ontspannen.",
    PT: "Quando não estiveres a trabalhar, podes relaxar em casa.",
    FR: "Si tu ne travailles pas, tu peux te détendre à la maison.",
  },
  {
    ID: 118,
    MAIN_EN: "I'm sure the neighbours are nice.",
    DE: "Ich bin sicher, dass die Nachbarn nett sind.",
    NL: "Ik weet zeker dat de buren aardig zijn.",
    PT: "De certeza que os vizinhos são simpáticos.",
    FR: "Je suis sûr que les voisins sont gentils.",
  },
  {
    ID: 119,
    MAIN_EN: "Eduardo's lifestyle isn't easy, but it's still possible.",
    DE: "Eduardo’s Lebensstil ist nicht leicht, trotzdem möglich.",
    NL: "Eduardo's levensstijl is niet gemakkelijk, maar het is nog steeds mogelijk.",
    PT: "O estilo de vida do Eduardo não é fácil, mas é possível.",
    FR: "Le style de vie d'Eduardo n'est pas facile, mais néanmoins possible.",
  },
  {
    ID: 120,
    MAIN_EN:
      "Smoking is forbidden in the flat share, but Tony has done it a couple of times.",
    DE: "Rauchen ist in der WG verboten, trotzdem hat Tony es ein Paar mal gemacht.",
    NL: "Roken is verboden in de flat, maar Tony heeft het toch een paar keer gedaan.",
    PT: "É proibido fumar no apartamento partilhado, mas o Tony já o fez algumas vezes.",
    FR: "Il est interdit de fumer dans la colocation, mais Tony l'a quand même fait quelques fois.",
  },
  {
    ID: 121,
    MAIN_EN: "Annika had a fever last week, but she went to work anyway.",
    DE: "Annika hatte Fieber letzte Woche, doch sie ging zur Arbeit trotzdem.",
    NL: "Annika had vorige week koorts, maar ging toch werken.",
    PT: "A Annika teve febre na semana passada, mas foi trabalhar na mesma.",
    FR: "Annika avait de la fièvre la semaine dernière, mais elle est quand même allée travailler.",
  },
  {
    ID: 122,
    MAIN_EN:
      "The four residents live together, but they all have their own room.",
    DE: "Die vier Bewohner leben zusammen, trotzdem haben sie alle ihr eigenes Zimmer.",
    NL: "De vier bewoners wonen samen, maar ze hebben allemaal hun eigen kamer.",
    PT: "Os quatro residentes vivem juntos, mas cada um tem o seu próprio quarto.",
    FR: "Les quatre habitants vivent ensemble, mais ils ont chacun leur propre chambre.",
  },
  {
    ID: 123,
    MAIN_EN:
      "Annika works in a primary school and yet she teaches twelve and thirteen-year-old pupils.",
    DE: "Annika arbeitet in der Grundschule und trotzdem unterrichtet sie zwölf- und dreizehnjährige Schüler.",
    NL: "Annika werkt op de basisschool en geeft les aan twaalf- en dertienjarige leerlingen.",
    PT: "Annika trabalha na escola primária, mas dá aulas a alunos de doze e treze anos.",
    FR: "Annika travaille à l'école primaire, mais elle enseigne quand même à des élèves de douze et treize ans.",
  },
  {
    ID: 124,
    MAIN_EN:
      "Annika only plays badminton once a week, but she is still very good.",
    DE: "Annika spielt nur einmal pro Woche Badminton, trotzdem ist sie sehr gut.",
    NL: "Annika speelt maar één keer per week badminton, maar ze is nog steeds erg goed.",
    PT: "Annika só joga badminton uma vez por semana, mas continua a ser muito boa.",
    FR: "Annika ne joue au badminton qu'une fois par semaine, mais elle est très douée.",
  },
  {
    ID: 125,
    MAIN_EN:
      "Eduardo is a department manager in Lidl, but he plays football in the third division anyway.",
    DE: "Eduardo ist ein Abteilungsleiter in Lidl, aber er spielt Fußball in der dritten Liga trotzdem.",
    NL: "Eduardo is afdelingsmanager bij Lidl, maar hij voetbalt toch in de derde divisie.",
    PT: "Eduardo é diretor de departamento no Lidl, mas joga futebol na terceira divisão.",
    FR: "Eduardo est chef de rayon chez Lidl, mais il joue quand même au football en troisième division.",
  },
  {
    ID: 126,
    MAIN_EN:
      "Tina's workplace is 5 kilometres away, but she still goes to work by bike.",
    DE: "Tina’s Arbeitsstelle ist 5 km entfernt, aber sie geht trotzdem mit dem Fahrrad zur Arbeit.",
    NL: "Tina's werkplek is 5 kilometer verderop, maar ze fietst toch naar haar werk.",
    PT: "O local de trabalho da Tina fica a 5 quilómetros de distância, mas ela continua a ir de bicicleta para o trabalho.",
    FR: "Le lieu de travail de Tina est à 5 km, mais elle va quand même au travail à vélo.",
  },
  {
    ID: 127,
    MAIN_EN:
      "Tina's workplace is the furthest away, but she still cycles to work.",
    DE: "Tinas Arbeitsplatz ist am weitesten, trotzdem fährt sie mit dem Fahrrad zur Arbeit.",
    NL: "Tina's werkplek is het verst weg, maar ze fietst nog steeds naar haar werk.",
    PT: "O local de trabalho da Tina é o mais afastado, mas ela continua a ir de bicicleta para o trabalho.",
    FR: "Le lieu de travail de Tina est le plus éloigné, mais elle va quand même au travail à vélo.",
  },
  {
    ID: 128,
    MAIN_EN:
      "There are two men and two women in the flat share, but they still get along well.",
    DE: "In der WG sind zwei Männer und zwei Frauen, trotzdem kommen sie gut zurecht.",
    NL: "Er wonen twee mannen en twee vrouwen in een gedeelde flat, maar ze kunnen het nog steeds goed met elkaar vinden.",
    PT: "Há dois homens e duas mulheres no apartamento partilhado, mas eles dão-se bem.",
    FR: "Dans la colocation, il y a deux hommes et deux femmes, mais ils s'entendent bien.",
  },
  {
    ID: 129,
    MAIN_EN:
      "Tony doesn't have to cycle to work, but he still keeps in touch with his co-worker.",
    DE: "Tony muss nicht zur Arbeitsstelle fahren, doch trotzdem bleibt er mit seinem Mitarbeiter in Kontakt.",
    NL: "Tony hoeft niet op de fiets naar zijn werk, maar hij houdt wel contact met zijn collega.",
    PT: "O Tony não tem de ir de bicicleta para o trabalho, mas mantém-se em contacto com o seu colega de trabalho.",
    FR: "Tony n'a pas besoin de se rendre sur son lieu de travail, mais il reste tout de même en contact avec son collègue.",
  },
  {
    ID: 130,
    MAIN_EN:
      "Tony's salary is lower because of working from home, but he still flies to London to see his family every two months.",
    DE: "Tonys Lohn ist geringer wegen der Arbeit von zuhause, trotzdem fliegt er nach London zu seiner Familie jede zwei Monate.",
    NL: "Tony's salaris is lager omdat hij van thuis uit werkt, maar hij vliegt nog steeds elke twee maanden naar Londen om zijn familie te zien.",
    PT: "O salário do Tony é mais baixo por trabalhar a partir de casa, mas ele continua a viajar para Londres para ver a família de dois em dois meses.",
    FR: "Le salaire de Tony est moins élevé à cause du travail à domicile, mais il prend tout de même l'avion pour rejoindre sa famille à Londres tous les deux mois.",
  },
  {
    ID: 131,
    MAIN_EN: "Tina is not a sportswoman, but she goes jogging anyway.",
    DE: "Tina ist keine Sportlerin, aber sie geht joggen trotzdem.",
    NL: "Tina is geen sportvrouw, maar ze gaat toch joggen.",
    PT: "Tina não é uma desportista, mas faz jogging na mesma.",
    FR: "Tina n'est pas une sportive, mais elle fait quand même son jogging.",
  },
  {
    ID: 132,
    MAIN_EN: "It's raining outside, but Eduardo still does sport.",
    DE: "Es regnet draußen, trotzdem treibt Eduardo Sport.",
    NL: "Het regent buiten, maar Eduardo sport toch.",
    PT: "Está a chover lá fora, mas o Eduardo faz desporto na mesma.",
    FR: "Il pleut dehors, mais Eduardo fait quand même du sport.",
  },
  {
    ID: 133,
    MAIN_EN: "Eduardo has a dynamic lifestyle, but his room is always tidy.",
    DE: "Eduardo hat einen dynamischen Lebensstil, aber sein Zimmer ist trotzdem immer aufgeräumt.",
    NL: "Eduardo heeft een dynamische levensstijl, maar zijn kamer is altijd opgeruimd.",
    PT: "Eduardo tem um estilo de vida dinâmico, mas o seu quarto está sempre arrumado.",
    FR: "Eduardo a un style de vie dynamique, mais sa chambre est toujours bien rangée.",
  },
  {
    ID: 134,
    MAIN_EN: "Annika has little free time, but she still travels a lot.",
    DE: "Annika hat wenig Freizeit, trotzdem reist sie oft.",
    NL: "Annika heeft weinig vrije tijd, maar ze reist toch veel.",
    PT: "Annika tem pouco tempo livre, mas mesmo assim viaja muito.",
    FR: "Annika a peu de temps libre, mais elle voyage souvent.",
  },
  {
    ID: 135,
    MAIN_EN: "Could you please wipe the dishes after washing them?",
    DE: "Könntest du bitte das Geschirr nach dem Waschen auch abwischen?",
    NL: "Kunt u alstublieft de afwas doen na het wassen?",
    PT: "Pode limpar os pratos depois de os lavar?",
    FR: "Pourrais-tu aussi essuyer la vaisselle après l'avoir lavée, s'il te plaît ?",
  },
  {
    ID: 136,
    MAIN_EN: "Would you please help me clean the windows tomorrow?",
    DE: "Würdest du mir bitte morgen mit dem Fensterputzen helfen?",
    NL: "Wil je me morgen helpen de ramen schoon te maken?",
    PT: "Ajudas-me a limpar as janelas amanhã?",
    FR: "Pourrais-tu m'aider à nettoyer les vitres demain, s'il te plaît ?",
  },
  {
    ID: 137,
    MAIN_EN: "Could you tidy up your things in the living room?",
    DE: "Könntet ihr eure Sachen im Wohnzimmer aufräumen?",
    NL: "Zou je je spullen in de woonkamer willen opruimen?",
    PT: "Podes arrumar as tuas coisas na sala de estar?",
    FR: "Pourriez-vous ranger vos affaires dans le salon ?",
  },
  {
    ID: 138,
    MAIN_EN: "Would you please not leave your bike in the hallway?",
    DE: "Würdest du bitte dein Fahrrad nicht im Flur abstellen?",
    NL: "Wil je alsjeblieft je fiets niet in de gang zetten?",
    PT: "Podes não deixar a tua bicicleta no corredor?",
    FR: "Pourrais-tu éviter de laisser ton vélo dans le couloir ?",
  },
  {
    ID: 139,
    MAIN_EN: "Would it be OK for you to water the plants on Mondays?",
    DE: "Wäre es OK, dass du montags die Pflanzen gießt?",
    NL: "Vind je het goed om op maandag de planten water te geven?",
    PT: "Podes regar as plantas à segunda-feira?",
    FR: "Est-ce que tu serais d'accord d'arroser les plantes le lundi ?",
  },
  {
    ID: 140,
    MAIN_EN:
      "Would you both like to go to the shop with me? We need to buy some cleaning products.",
    DE: "Hättet ihr beide Lust mit mir ins Geschäft zu gehen? Wir müssen Putzmittel kaufen.",
    NL: "Willen jullie allebei mee naar de winkel? We moeten wat schoonmaakmiddelen kopen.",
    PT: "Gostariam de ir comigo à loja? Precisamos de comprar alguns produtos de limpeza.",
    FR: "Aimeriez-vous tous les deux aller au magasin avec moi ? Nous devons acheter des produits de nettoyage.",
  },
  {
    ID: 141,
    MAIN_EN:
      "Would it be possible for you not to listen to music so loudly in the evening?",
    DE: "Wäre es möglich, dass du nicht so laut Musik am Abend hörst?",
    NL: "Zou je 's avonds niet zo hard naar muziek kunnen luisteren?",
    PT: "Será possível não ouvirem música tão alto à noite?",
    FR: "Serait-il possible que tu n'écoutes pas la musique trop fort le soir ?",
  },
  {
    ID: 142,
    MAIN_EN: "Would you have time to clean the bathroom at the weekend?",
    DE: "Hättest du am Wochenende Zeit das Badezimmer zu reinigen?",
    NL: "Zou je in het weekend tijd hebben om de badkamer schoon te maken?",
    PT: "Teria tempo para limpar a casa de banho no fim de semana?",
    FR: "Aurais-tu le temps de nettoyer la salle de bains le week-end ?",
  },
  {
    ID: 143,
    MAIN_EN: "Would you like to eat fish next Saturday?",
    DE: "Würdet ihr nächsten Samstag Fisch essen?",
    NL: "Wil je volgende week zaterdag vis eten?",
    PT: "Queres comer peixe no próximo sábado?",
    FR: "Aimeriez-vous manger du poisson samedi prochain ?",
  },
  {
    ID: 144,
    MAIN_EN: "Would you like to have fish next Saturday?",
    DE: "Hättet ihr gerne Fisch nächsten Samstag?",
    NL: "Wil je volgende week zaterdag vis eten?",
    PT: "Gostarias de comer peixe no próximo sábado?",
    FR: "Aimeriez-vous avoir du poisson samedi prochain ?",
  },
  {
    ID: 145,
    MAIN_EN: "Would you be kind enough to buy bread tomorrow morning?",
    DE: "Wärest du so lieb, morgen früh Brot zu kaufen?",
    NL: "Zou je zo vriendelijk willen zijn om morgenochtend brood te kopen?",
    PT: "Fazes a gentileza de comprar pão amanhã de manhã?",
    FR: "Serais-tu assez aimable pour aller acheter du pain demain matin ?",
  },
  {
    ID: 146,
    MAIN_EN: "Would you like to go jogging with me on Friday?",
    DE: "Hättest du Lust, am Freitag mit mir joggen zu gehen?",
    NL: "Wil je vrijdag met me gaan joggen?",
    PT: "Queres ir correr comigo na sexta-feira?",
    FR: "Voudrais-tu faire un jogging avec moi vendredi ?",
  },
  {
    ID: 147,
    MAIN_EN: "We could play cards again.",
    DE: "Wir könnten mal wieder Karten spielen.",
    NL: "We kunnen weer gaan kaarten.",
    PT: "Podíamos voltar a jogar às cartas.",
    FR: "Nous pourrions jouer aux cartes ensemble.",
  },
  {
    ID: 148,
    MAIN_EN: "Could I speak to you in private, please?",
    DE: "Könnte ich bitte mit dir unter vier Augen sprechen?",
    NL: "Kan ik u even onder vier ogen spreken?",
    PT: "Posso falar consigo em privado, por favor?",
    FR: "Pourrais-je te parler en privé, s'il te plaît ?",
  },
  {
    ID: 149,
    MAIN_EN: "Would you please open the window?",
    DE: "Würdest du bitte das Fenster öffnen?",
    NL: "Wilt u alstublieft het raam open doen?",
    PT: "Podes abrir a janela, por favor?",
    FR: "Tu veux bien ouvrir la fenêtre ?",
  },
  {
    ID: 150,
    MAIN_EN:
      "Would you like to come with me? - Thanks for the invitation, but unfortunately that's not possible.",
    DE: "Würdet ihr gerne mitkommen? - Danke für die Einladung, aber das geht leider nicht.",
    NL: "Wilt u met mij meekomen? - Bedankt voor de uitnodiging, maar dat gaat helaas niet.",
    PT: "Gostaria de vir comigo? - Obrigado pelo convite, mas infelizmente não é possível.",
    FR: "Ça vous dirait de venir ? - Merci pour l'invitation, mais ce n'est malheureusement pas possible.",
  },
  {
    ID: 151,
    MAIN_EN:
      "Could you go to Lake Constance with us at the weekend? - Then unfortunately we can't. But we're free next weekend!",
    DE: "Könntet ihr mit uns am Wochenende zum Bodensee gehen? - Dann können wir leider nicht. Aber am nächsten Wochenende sind wir frei!",
    NL: "Zou je in het weekend met ons naar de Bodensee kunnen gaan? - Dan kunnen we helaas niet. Maar volgend weekend zijn we vrij!",
    PT: "Poderia ir connosco ao Lago de Constança no fim de semana? - Então, infelizmente, não podemos. Mas no próximo fim de semana estamos livres!",
    FR: "Pourriez-vous venir avec nous au lac de Constance ce week-end ? - Alors nous ne pouvons malheureusement pas. Mais le week-end prochain, nous serons libres !",
  },
  {
    ID: 152,
    MAIN_EN:
      "Would you play cards with me? - I'd love to, but I don't know the rules.",
    DE: "Würdest du mit mir Karten spielen? - Ich würde gern, aber ich kenne die Regeln nicht.",
    NL: "Wil je met me kaarten? - Graag, maar ik ken de regels niet.",
    PT: "Queres jogar às cartas comigo? - Gostava muito, mas não conheço as regras.",
    FR: "Voudrais-tu jouer aux cartes avec moi ? - J'aimerais bien, mais je ne connais pas les règles.",
  },
  {
    ID: 153,
    MAIN_EN:
      "Would you play cards with me? - I'd actually prefer to play Playstation.",
    DE: "Würdest du mit mir Karten spielen? - Ich würde eigentlich lieber Playstation spielen.",
    NL: "Wil je met mij kaarten? - Ik speel eigenlijk liever Playstation.",
    PT: "Queres jogar às cartas comigo? - Na verdade, preferia jogar Playstation.",
    FR: "Est-ce que tu jouerais aux cartes avec moi ? - En fait, je préférerais jouer à la Playstation.",
  },
  {
    ID: 154,
    MAIN_EN:
      "We could eat fish again. - Agreed! Then we'll have fish for dinner tonight!",
    DE: "Wir könnten mal wieder Fisch essen. - Einverstanden! Dann haben wir heute zum Abendessen Fisch!",
    NL: "We kunnen weer vis eten. - Afgesproken! Dan eten we vanavond vis!",
    PT: "Podíamos voltar a comer peixe. - Concordo! Então vamos ter peixe ao jantar esta noite!",
    FR: "On pourrait manger du poisson un jour. - C'est d'accord ! Alors nous aurons du poisson pour le dîner ce soir !",
  },
  {
    ID: 155,
    MAIN_EN: "Annika likes the lamp at the flea market.",
    DE: "Annika findet die Lampe auf dem Flohmarkt schön.",
    NL: "Annika vindt de lamp op de rommelmarkt mooi.",
    PT: "A Annika gosta do candeeiro da feira da ladra.",
    FR: "Annika trouve la lampe du marché aux puces très belle.",
  },
  {
    ID: 156,
    MAIN_EN: "The table that Sara sells at the flea market is very small. ",
    DE: "Der Tisch, den Sara auf dem Flohmarkt verkauft, ist sehr klein. ",
    NL: "De tafel die Sara op de rommelmarkt verkoopt is erg klein. ",
    PT: "A mesa que a Sara vende na feira da ladra é muito pequena. ",
    FR: "La table que Sara vend au marché aux puces est très petite. ",
  },
  {
    ID: 157,
    MAIN_EN:
      "Sandra goes to the flea market to buy books that are interesting.",
    DE: "Sandra geht auf dem Flohmarkt, um Bücher zu kaufen, die interessant sind.",
    NL: "Sandra gaat naar de rommelmarkt om interessante boeken te kopen.",
    PT: "A Sandra vai à feira da ladra para comprar livros interessantes.",
    FR: "Sandra va au marché aux puces pour acheter des livres qui sont intéressants.",
  },
  {
    ID: 158,
    MAIN_EN: "The apple is smaller than the melon. ",
    DE: "Der Apfel ist kleiner als die Melone. ",
    NL: "De appel is kleiner dan de meloen. ",
    PT: "A maçã é mais pequena do que o melão. ",
    FR: "La pomme est plus petite que le melon. ",
  },
  {
    ID: 159,
    MAIN_EN:
      "Tina has bought a new bike. It is faster than her previous bike. ",
    DE: "Tina hat ein neues Fahrrad gekauft. Es ist schneller als ihr vorheriges Fahrrad. ",
    NL: "Tina heeft een nieuwe fiets gekocht. Hij is sneller dan haar vorige fiets. ",
    PT: "A Tina comprou uma bicicleta nova. É mais rápida do que a anterior. ",
    FR: "Tina a acheté un nouveau vélo. Il est plus rapide que son précédent vélo. ",
  },
  {
    ID: 160,
    MAIN_EN: "Tamara sells XXL clothes for a higher price.",
    DE: "Tamara verkauft XXL Kleidung für einen höheren Preis.",
    NL: "Tamara verkoopt XXL-kleding voor een hogere prijs.",
    PT: "A Tamara vende roupa XXL por um preço mais elevado.",
    FR: "Tamara vend des vêtements XXL à un prix plus élevé.",
  },
  {
    ID: 161,
    MAIN_EN: "The watermelon is the biggest vegetable.",
    DE: "Die Wassermelone ist das größte Gemüse.",
    NL: "De watermeloen is de grootste groente.",
    PT: "A melancia é o maior legume.",
    FR: "La pastèque est le plus gros légume.",
  },
  {
    ID: 162,
    MAIN_EN: "Annika buys the cheapest apples.",
    DE: "Annika kauft die billigsten Äpfel.",
    NL: "Annika koopt de goedkoopste appels.",
    PT: "A Annika compra as maçãs mais baratas.",
    FR: "Annika achète les pommes les moins chères.",
  },
  {
    ID: 163,
    MAIN_EN:
      "Eduardo has bought the latest shoes. They are the model of the year 2022.",
    DE: "Eduardo hat sich die neusten Schuhe gekauft. Sie sind das Modell des Jahres 2022.",
    NL: "Eduardo heeft de nieuwste schoenen gekocht. Ze zijn het model van het jaar 2022",
    PT: "Eduardo comprou os sapatos mais recentes. São o modelo do ano 2022",
    FR: "Eduardo a acheté les chaussures les plus récentes. Elles sont le modèle de l'année 2022.",
  },
  {
    ID: 164,
    MAIN_EN: "Sara goes to the flea market with Tina to buy new clothes.",
    DE: "Sara geht mit Tina auf dem Flohmarkt, um sich neue Kleidung zu kaufen.",
    NL: "Sara gaat met Tina naar de rommelmarkt om nieuwe kleren te kopen.",
    PT: "Sara vai à feira da ladra com Tina para comprar roupa nova.",
    FR: "Sara va au marché aux puces avec Tina pour s'acheter de nouveaux vêtements.",
  },
  {
    ID: 165,
    MAIN_EN:
      "Sara goes to the flea market with Tina in Sara's car because it's quicker than travelling by bus.",
    DE: "Sara geht mit Tina auf dem Flohmarkt mit Saras Fahrzeug, weil es schneller ist, als mit dem Bus zu fahren.",
    NL: "Sara gaat met Tina in Sara's auto naar de rommelmarkt omdat dat sneller is dan reizen met de bus.",
    PT: "Sara vai à feira da ladra com Tina no carro de Sara porque é mais rápido do que viajar de autocarro.",
    FR: "Sara se rend au marché aux puces avec Tina dans le véhicule de Sara, car c'est plus rapide que de prendre le bus.",
  },
  {
    ID: 166,
    MAIN_EN:
      "You seem slimmer in black and it will be better to wear lighter clothes in the hot summer months.",
    DE: "In schwarz scheint man schlanker zu sein und es wird besser in den heißen Sommermonaten leichtere Klamotten zu tragen.",
    NL: "In het zwart lijk je slanker en in de warme zomermaanden kun je beter lichtere kleren dragen.",
    PT: "Parece mais magra de preto e será melhor usar roupas mais leves nos meses quentes de verão.",
    FR: "En noir, on semble plus mince et il devient préférable de porter des vêtements plus légers pendant les chauds mois d'été.",
  },
  {
    ID: 167,
    MAIN_EN: "There are no cheap imitations.",
    DE: "Keine billigen Imitationen sind vorhanden.",
    NL: "Er zijn geen goedkope imitaties.",
    PT: "Não há imitações baratas.",
    FR: "Aucune imitation bon marché n'est disponible.",
  },
  {
    ID: 168,
    MAIN_EN: "No fast sports cars are sold at the flea market.",
    DE: "Kein schneller Sportwagen wird auf dem Flohmarkt verkauft.",
    NL: "Op de rommelmarkt worden geen snelle sportwagens verkocht.",
    PT: "Não se vendem carros desportivos rápidos na feira da ladra.",
    FR: "Aucune voiture de sport rapide n'est vendue sur le marché aux puces.",
  },
  {
    ID: 169,
    MAIN_EN: "No exotic animals are sold at the flea market.",
    DE: "Kein exotisches Tier wird auf dem Flohmarkt verkauft.",
    NL: "Er worden geen exotische dieren verkocht op de vlooienmarkt.",
    PT: "Não se vendem animais exóticos na feira da ladra.",
    FR: "Aucun animal exotique n'est vendu sur le marché aux puces.",
  },
  {
    ID: 170,
    MAIN_EN: "Svenja visits the big flea market in the Olympic Park in Munich.",
    DE: "Svenja besucht den großen Flohmarkt im Olympiapark in München.",
    NL: "Svenja bezoekt de grote vlooienmarkt in het Olympisch Park in München.",
    PT: "Svenja visita a grande feira da ladra no Parque Olímpico de Munique.",
    FR: "Svenja se rend au grand marché aux puces du parc olympique de Munich.",
  },
  {
    ID: 171,
    MAIN_EN: "Thomas can't find a cheap car at the flea market.",
    DE: "Thomas findet keinen billigen Wagen auf dem Flohmarkt.",
    NL: "Thomas kan op de vlooienmarkt geen goedkope auto vinden.",
    PT: "Thomas não consegue encontrar um carro barato na feira da ladra.",
    FR: "Thomas ne trouve pas de voiture bon marché sur le marché aux puces.",
  },
  {
    ID: 172,
    MAIN_EN: "The seller has already sold the most expensive watches.",
    DE: "Der Verkäufer hat die teuersten Uhren schon verkauft.",
    NL: "De verkoper heeft de duurste horloges al verkocht.",
    PT: "O vendedor já vendeu os relógios mais caros.",
    FR: "Le vendeur a déjà vendu les montres les plus chères.",
  },
  {
    ID: 173,
    MAIN_EN: "Annika needs new handlebars for her bike.",
    DE: "Annika braucht einen neuen Lenker für ihr Fahrrad.",
    NL: "Annika heeft een nieuw stuur nodig voor haar fiets.",
    PT: "Annika precisa de um guiador novo para a sua bicicleta.",
    FR: "Annika a besoin d'un nouveau guidon pour son vélo.",
  },
  {
    ID: 174,
    MAIN_EN: "Tina buys pictures from a nice seller at the flea market.",
    DE: "Tina kauft Bilder auf dem Flohmarkt bei einem netten Verkäufer.",
    NL: "Tina koopt foto's van een leuke verkoper op de rommelmarkt.",
    PT: "Tina compra fotografias a um vendedor simpático na feira da ladra.",
    FR: "Tina achète des tableaux sur le marché aux puces à un vendeur sympa.",
  },
  {
    ID: 175,
    MAIN_EN: "My dear and older sister likes the wine glasses.",
    DE: "Die Weingläser gefallen meiner lieben und älteren Schwester.",
    NL: "Mijn lieve en oudere zus vindt de wijnglazen mooi.",
    PT: "A minha querida e mais velha irmã gosta dos copos de vinho.",
    FR: "Les verres à vin plaisent à ma chère sœur aînée.",
  },
  {
    ID: 176,
    MAIN_EN: "Svenja approaches the beautiful, colourful picture.",
    DE: "Svenja nähert sich dem schönen, bunten Bild.",
    NL: "Svenja komt af op de mooie, kleurrijke foto.",
    PT: "Svenja aproxima-se do quadro bonito e colorido.",
    FR: "Svenja s'approche du beau tableau coloré.",
  },
  {
    ID: 177,
    MAIN_EN:
      "Thomas buys new chairs because he's not happy with the old, wobbly ones.",
    DE: "Thomas kauft neue Stühle, da er mit den alten, wackligen Stühlen nicht zufrieden ist.",
    NL: "Thomas koopt nieuwe stoelen omdat hij niet blij is met de oude, wiebelende stoelen.",
    PT: "O Tomás compra cadeiras novas porque não está satisfeito com as velhas e instáveis.",
    FR: "Thomas achète de nouvelles chaises, car il n'est pas satisfait des vieilles chaises branlantes.",
  },
  {
    ID: 178,
    MAIN_EN:
      "I think it's important to learn a new language because it helps you understand other cultures better.",
    DE: "Ich finde es wichtig, eine neue Sprache zu lernen, weil man dadurch andere Kulturen besser verstehen kann.",
    NL: "Ik denk dat het belangrijk is om een nieuwe taal te leren omdat het je helpt om andere culturen beter te begrijpen.",
    PT: "Acho que é importante aprender uma nova língua porque ajuda a compreender melhor as outras culturas.",
    FR: "Je trouve qu'il est important d'apprendre une nouvelle langue, car cela permet de mieux comprendre les autres cultures.",
  },
  {
    ID: 179,
    MAIN_EN:
      "Last weekend I went to the park with my family and we had a picnic.",
    DE: "Letztes Wochenende war ich mit meiner Familie im Park, und wir haben ein Picknick gemacht.",
    NL: "Vorig weekend ben ik met mijn familie naar het park geweest en hebben we gepicknickt.",
    PT: "No fim de semana passado fui ao parque com a minha família e fizemos um piquenique.",
    FR: "Le week-end dernier, je suis allé au parc avec ma famille et nous avons fait un pique-nique.",
  },
  {
    ID: 180,
    MAIN_EN: "Could you please tell me where the nearest bus stop is?",
    DE: "Könnten Sie mir bitte sagen, wo die nächste Bushaltestelle ist?",
    NL: "Kunt u mij vertellen waar de dichtstbijzijnde bushalte is?",
    PT: "Pode dizer-me, por favor, onde fica a paragem de autocarro mais próxima?",
    FR: "Pourriez-vous m'indiquer où se trouve l'arrêt de bus le plus proche ?",
  },
  {
    ID: 181,
    MAIN_EN:
      "My favourite hobby is reading, especially novels and historical stories.",
    DE: "Mein Lieblingshobby ist das Lesen, besonders Romane und historische Geschichten.",
    NL: "Mijn favoriete hobby is lezen, vooral romans en historische verhalen.",
    PT: "O meu passatempo preferido é ler, especialmente romances e histórias históricas.",
    FR: "Mon passe-temps favori est la lecture, surtout les romans et les histoires historiques.",
  },
  {
    ID: 182,
    MAIN_EN:
      "I've never been to Germany, but I'd like to visit Berlin and Munich one day.",
    DE: "Ich war noch nie in Deutschland, aber ich würde gerne eines Tages Berlin und München besuchen.",
    NL: "Ik ben nog nooit in Duitsland geweest, maar ik zou Berlijn en München wel eens willen bezoeken.",
    PT: "Nunca estive na Alemanha, mas gostaria de visitar Berlim e Munique um dia.",
    FR: "Je ne suis jamais allée en Allemagne, mais j'aimerais bien visiter Berlin et Munich un jour.",
  },
  {
    ID: 183,
    MAIN_EN:
      "When I was a kid, I used to play outside with my friends every afternoon.",
    DE: "Als ich ein Kind war, habe ich jeden Nachmittag draußen mit meinen Freunden gespielt.",
    NL: "Als kind speelde ik elke middag buiten met mijn vrienden.",
    PT: "Quando era miúdo, costumava brincar ao ar livre com os meus amigos todas as tardes.",
    FR: "Quand j'étais enfant, je jouais dehors tous les après-midi avec mes amis.",
  },
  {
    ID: 184,
    MAIN_EN:
      "Can you recommend a good restaurant in this city? I would like to try local food.",
    DE: "Können Sie ein gutes Restaurant in dieser Stadt empfehlen? Ich möchte lokales Essen probieren.",
    NL: "Kun je een goed restaurant in deze stad aanbevelen? Ik wil graag lokaal eten proberen.",
    PT: "Pode recomendar-me um bom restaurante nesta cidade? Gostava de experimentar a comida local.",
    FR: "Pouvez-vous recommander un bon restaurant dans cette ville ? J'aimerais goûter à la nourriture locale.",
  },
  {
    ID: 185,
    MAIN_EN:
      "Yesterday I had a very busy day at work, but I was happy because I finished all my tasks.",
    DE: "Gestern hatte ich einen sehr anstrengenden Tag bei der Arbeit, aber ich war glücklich, weil ich alle meine Aufgaben erledigt habe.",
    NL: "Gisteren had ik een erg drukke dag op het werk, maar ik was blij omdat ik al mijn taken afkreeg.",
    PT: "Ontem tive um dia muito atarefado no trabalho, mas fiquei contente porque consegui fazer todas as minhas tarefas.",
    FR: "Hier, j'ai eu une journée très fatigante au travail, mais j'étais heureuse parce que j'ai accompli toutes mes tâches.",
  },
  {
    ID: 186,
    MAIN_EN:
      "I like watching films, but I prefer to go to the cinema rather than watch them at home.",
    DE: "Ich schaue gerne Filme, aber ich gehe lieber ins Kino, als sie zu Hause zu sehen.",
    NL: "Ik kijk graag films, maar ik ga liever naar de bioscoop dan dat ik ze thuis kijk.",
    PT: "Gosto de ver filmes, mas prefiro ir ao cinema do que vê-los em casa.",
    FR: "J'aime regarder des films, mais je préfère aller au cinéma plutôt que de les regarder à la maison.",
  },
  {
    ID: 187,
    MAIN_EN: "What do you usually do in your free time?",
    DE: "Was machst du normalerweise in deiner Freizeit?",
    NL: "Wat doe je meestal in je vrije tijd?",
    PT: "O que costumas fazer nos teus tempos livres?",
    FR: "Que fais-tu habituellement pendant ton temps libre ?",
  },
];
