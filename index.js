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
    $("#revealBtn").text("REVEAL");
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
    MAIN_EN: "She was excited to visit her grandmother after so many months.",
    DE: "Sie freute sich darauf, ihre Großmutter nach so vielen Monaten zu besuchen.",
    NL: "Ze was enthousiast om haar oma na zoveel maanden weer te bezoeken.",
    PT: "Ela estava animada para visitar a avó depois de tantos meses.",
    FR: "Elle était excitée de rendre visite à sa grand-mère après tant de mois.",
    ES: "Estaba emocionada de visitar a su abuela después de tantos meses.",
    IT: "Era entusiasta di visitare sua nonna dopo tanti mesi.",
  },
  {
    ID: 2,
    MAIN_EN: "I forgot my umbrella, so I got wet in the rain.",
    DE: "Ich habe meinen Regenschirm vergessen, also wurde ich nass im Regen.",
    NL: "Ik vergat mijn paraplu, dus ik werd nat in de regen.",
    PT: "Esqueci meu guarda-chuva, então me molhei na chuva.",
    FR: "J'ai oublié mon parapluie, alors j'ai été mouillé par la pluie.",
    ES: "Olvidé mi paraguas, así que me mojé bajo la lluvia.",
    IT: "Ho dimenticato l'ombrello, quindi mi sono bagnato sotto la pioggia.",
  },
  {
    ID: 3,
    MAIN_EN: "He didn’t understand the instructions, so he asked for help.",
    DE: "Er verstand die Anweisungen nicht, also bat er um Hilfe.",
    NL: "Hij begreep de instructies niet, dus hij vroeg om hulp.",
    PT: "Ele não entendeu as instruções, então pediu ajuda.",
    FR: "Il n’a pas compris les instructions, alors il a demandé de l’aide.",
    ES: "No entendió las instrucciones, así que pidió ayuda.",
    IT: "Non ha capito le istruzioni, quindi ha chiesto aiuto.",
  },
  {
    ID: 4,
    MAIN_EN: "We have been waiting for the bus for over twenty minutes.",
    DE: "Wir warten seit über zwanzig Minuten auf den Bus.",
    NL: "We wachten al meer dan twintig minuten op de bus.",
    PT: "Estamos esperando o ônibus há mais de vinte minutos.",
    FR: "Nous attendons le bus depuis plus de vingt minutes.",
    ES: "Llevamos esperando el autobús por más de veinte minutos.",
    IT: "Stiamo aspettando l'autobus da più di venti minuti.",
  },
  {
    ID: 5,
    MAIN_EN: "If you study hard, you will pass the exam easily.",
    DE: "Wenn du fleißig lernst, wirst du die Prüfung leicht bestehen.",
    NL: "Als je hard studeert, zul je het examen makkelijk halen.",
    PT: "Se você estudar bastante, passará na prova com facilidade.",
    FR: "Si tu étudies bien, tu réussiras facilement l'examen.",
    ES: "Si estudias mucho, aprobarás el examen fácilmente.",
    IT: "Se studi bene, supererai l'esame facilmente.",
  },
  {
    ID: 6,
    MAIN_EN: "The weather was perfect for a picnic in the park.",
    DE: "Das Wetter war perfekt für ein Picknick im Park.",
    NL: "Het weer was perfect voor een picknick in het park.",
    PT: "O tempo estava perfeito para um piquenique no parque.",
    FR: "Le temps était parfait pour un pique-nique dans le parc.",
    ES: "El clima era perfecto para un picnic en el parque.",
    IT: "Il tempo era perfetto per un picnic nel parco.",
  },
  {
    ID: 7,
    MAIN_EN: "She has never traveled outside her country before.",
    DE: "Sie ist noch nie außerhalb ihres Landes gereist.",
    NL: "Ze heeft nog nooit buiten haar land gereisd.",
    PT: "Ela nunca viajou para fora do seu país antes.",
    FR: "Elle n'a jamais voyagé en dehors de son pays auparavant.",
    ES: "Nunca ha viajado fuera de su país antes.",
    IT: "Non ha mai viaggiato fuori dal suo paese prima.",
  },
  {
    ID: 8,
    MAIN_EN: "My phone battery died because I forgot to charge it.",
    DE: "Mein Handyakku war leer, weil ich vergessen hatte, es aufzuladen.",
    NL: "De batterij van mijn telefoon was leeg omdat ik vergat hem op te laden.",
    PT: "A bateria do meu celular acabou porque esqueci de carregá-lo.",
    FR: "La batterie de mon téléphone est morte parce que j'ai oublié de le charger.",
    ES: "La batería de mi teléfono se agotó porque olvidé cargarlo.",
    IT: "La batteria del mio telefono si è scaricata perché ho dimenticato di ricaricarlo.",
  },
  {
    ID: 9,
    MAIN_EN: "The hotel had a beautiful view of the ocean.",
    DE: "Das Hotel hatte eine wunderschöne Aussicht auf das Meer.",
    NL: "Het hotel had een prachtig uitzicht op de oceaan.",
    PT: "O hotel tinha uma vista linda para o oceano.",
    FR: "L'hôtel avait une belle vue sur l'océan.",
    ES: "El hotel tenía una vista hermosa del océano.",
    IT: "L'hotel aveva una bellissima vista sull’oceano.",
  },
  {
    ID: 10,
    MAIN_EN: "He apologized for being late to the meeting.",
    DE: "Er entschuldigte sich dafür, dass er zu spät zum Treffen kam.",
    NL: "Hij verontschuldigde zich omdat hij te laat was voor de vergadering.",
    PT: "Ele pediu desculpas por chegar atrasado à reunião.",
    FR: "Il s'est excusé d’être arrivé en retard à la réunion.",
    ES: "Se disculpó por llegar tarde a la reunión.",
    IT: "Si è scusato per essere arrivato in ritardo alla riunione.",
  },
  {
    ID: 11,
    MAIN_EN: "This restaurant serves the best pasta in town.",
    DE: "Dieses Restaurant serviert die beste Pasta in der Stadt.",
    NL: "Dit restaurant serveert de beste pasta van de stad.",
    PT: "Este restaurante serve a melhor massa da cidade.",
    FR: "Ce restaurant sert les meilleures pâtes de la ville.",
    ES: "Este restaurante sirve la mejor pasta de la ciudad.",
    IT: "Questo ristorante serve la migliore pasta della città.",
  },
  {
    ID: 12,
    MAIN_EN: "They moved to a new apartment last weekend.",
    DE: "Sie sind letztes Wochenende in eine neue Wohnung gezogen.",
    NL: "Ze zijn vorig weekend naar een nieuw appartement verhuisd.",
    PT: "Eles se mudaram para um novo apartamento no último fim de semana.",
    FR: "Ils ont déménagé dans un nouvel appartement le week-end dernier.",
    ES: "Se mudaron a un nuevo apartamento el fin de semana pasado.",
    IT: "Si sono trasferiti in un nuovo appartamento lo scorso fine settimana.",
  },
  {
    ID: 13,
    MAIN_EN: "She is learning French because she wants to work in Paris.",
    DE: "Sie lernt Französisch, weil sie in Paris arbeiten möchte.",
    NL: "Ze leert Frans omdat ze in Parijs wil werken.",
    PT: "Ela está aprendendo francês porque quer trabalhar em Paris.",
    FR: "Elle apprend le français parce qu'elle veut travailler à Paris.",
    ES: "Está aprendiendo francés porque quiere trabajar en París.",
    IT: "Sta imparando il francese perché vuole lavorare a Parigi.",
  },
  {
    ID: 14,
    MAIN_EN: "The movie was interesting, but the ending was disappointing.",
    DE: "Der Film war interessant, aber das Ende war enttäuschend.",
    NL: "De film was interessant, maar het einde was teleurstellend.",
    PT: "O filme foi interessante, mas o final foi decepcionante.",
    FR: "Le film était intéressant, mais la fin était décevante.",
    ES: "La película fue interesante, pero el final fue decepcionante.",
    IT: "Il film era interessante, ma il finale è stato deludente.",
  },
  {
    ID: 15,
    MAIN_EN: "I usually go for a walk after dinner to relax.",
    DE: "Ich mache normalerweise nach dem Abendessen einen Spaziergang, um mich zu entspannen.",
    NL: "Ik maak meestal een wandeling na het avondeten om te ontspannen.",
    PT: "Eu geralmente dou uma caminhada depois do jantar para relaxar.",
    FR: "Je fais généralement une promenade après le dîner pour me détendre.",
    ES: "Suelo dar un paseo después de cenar para relajarme.",
    IT: "Di solito faccio una passeggiata dopo cena per rilassarmi.",
  },
  {
    ID: 16,
    MAIN_EN: "He was too tired to continue driving, so he stopped for a break.",
    DE: "Er war zu müde, um weiterzufahren, also machte er eine Pause.",
    NL: "Hij was te moe om verder te rijden, dus hij stopte voor een pauze.",
    PT: "Ele estava muito cansado para continuar dirigindo, então parou para descansar.",
    FR: "Il était trop fatigué pour continuer à conduire, alors il s'est arrêté pour faire une pause.",
    ES: "Estaba demasiado cansado para seguir conduciendo, así que se detuvo a descansar.",
    IT: "Era troppo stanco per continuare a guidare, quindi si è fermato per una pausa.",
  },
  {
    ID: 17,
    MAIN_EN: "We need to buy some vegetables for tonight’s dinner.",
    DE: "Wir müssen noch Gemüse für das Abendessen heute Abend kaufen.",
    NL: "We moeten wat groenten kopen voor het avondeten vanavond.",
    PT: "Precisamos comprar alguns vegetais para o jantar de hoje à noite.",
    FR: "Nous devons acheter des légumes pour le dîner de ce soir.",
    ES: "Necesitamos comprar algunas verduras para la cena de esta noche.",
    IT: "Dobbiamo comprare delle verdure per la cena di stasera.",
  },
  {
    ID: 18,
    MAIN_EN: "She was surprised when she received a letter from an old friend.",
    DE: "Sie war überrascht, als sie einen Brief von einer alten Freundin bekam.",
    NL: "Ze was verrast toen ze een brief kreeg van een oude vriendin.",
    PT: "Ela ficou surpresa quando recebeu uma carta de uma velha amiga.",
    FR: "Elle a été surprise de recevoir une lettre d’une vieille amie.",
    ES: "Se sorprendió cuando recibió una carta de una vieja amiga.",
    IT: "È rimasta sorpresa quando ha ricevuto una lettera da una vecchia amica.",
  },
  {
    ID: 19,
    MAIN_EN: "The teacher asked us to complete the assignment by Friday.",
    DE: "Der Lehrer bat uns, die Aufgabe bis Freitag zu erledigen.",
    NL: "De leraar vroeg ons om de opdracht voor vrijdag af te maken.",
    PT: "O professor pediu que terminássemos a tarefa até sexta-feira.",
    FR: "Le professeur nous a demandé de terminer le devoir avant vendredi.",
    ES: "El profesor nos pidió que termináramos la tarea para el viernes.",
    IT: "L'insegnante ci ha chiesto di completare il compito entro venerdì.",
  },
  {
    ID: 20,
    MAIN_EN:
      "They decided to go hiking even though the weather forecast was bad.",
    DE: "Sie beschlossen, wandern zu gehen, obwohl die Wettervorhersage schlecht war.",
    NL: "Ze besloten te gaan wandelen, hoewel de weersvoorspelling slecht was.",
    PT: "Eles decidiram fazer uma trilha, apesar da previsão do tempo ruim.",
    FR: "Ils ont décidé de faire une randonnée malgré la mauvaise météo.",
    ES: "Decidieron ir de excursión a pesar de que la previsión del tiempo era mala.",
    IT: "Hanno deciso di fare un'escursione nonostante le previsioni del tempo fossero pessime.",
  },
  {
    ID: 21,
    MAIN_EN: "I woke up early this morning to go for a run.",
    DE: "Ich bin früh aufgestanden, um joggen zu gehen.",
    NL: "Ik werd vanmorgen vroeg wakker om te gaan hardlopen.",
    PT: "Acordei cedo esta manhã para correr.",
    FR: "Je me suis réveillé tôt ce matin pour aller courir.",
    ES: "Me desperté temprano esta mañana para salir a correr.",
    IT: "Mi sono svegliato presto stamattina per andare a correre.",
  },
  {
    ID: 22,
    MAIN_EN: "She was nervous before her job interview but tried to stay calm.",
    DE: "Sie war nervös vor ihrem Vorstellungsgespräch, aber sie versuchte, ruhig zu bleiben.",
    NL: "Ze was nerveus voor haar sollicitatiegesprek, maar probeerde kalm te blijven.",
    PT: "Ela estava nervosa antes da entrevista de emprego, mas tentou manter a calma.",
    FR: "Elle était nerveuse avant son entretien d'embauche, mais elle a essayé de rester calme.",
    ES: "Estaba nerviosa antes de su entrevista de trabajo, pero intentó mantenerse tranquila.",
    IT: "Era nervosa prima del colloquio di lavoro, ma ha cercato di restare calma.",
  },
  {
    ID: 23,
    MAIN_EN: "The train was delayed, so we had to wait at the station.",
    DE: "Der Zug hatte Verspätung, also mussten wir am Bahnhof warten.",
    NL: "De trein had vertraging, dus we moesten op het station wachten.",
    PT: "O trem atrasou, então tivemos que esperar na estação.",
    FR: "Le train a été retardé, alors nous avons dû attendre à la gare.",
    ES: "El tren se retrasó, así que tuvimos que esperar en la estación.",
    IT: "Il treno era in ritardo, quindi abbiamo dovuto aspettare in stazione.",
  },
  {
    ID: 24,
    MAIN_EN: "He has been working at the same company for five years.",
    DE: "Er arbeitet seit fünf Jahren in derselben Firma.",
    NL: "Hij werkt al vijf jaar bij hetzelfde bedrijf.",
    PT: "Ele trabalha na mesma empresa há cinco anos.",
    FR: "Il travaille dans la même entreprise depuis cinq ans.",
    ES: "Lleva cinco años trabajando en la misma empresa.",
    IT: "Lavora nella stessa azienda da cinque anni.",
  },
  {
    ID: 25,
    MAIN_EN: "They decided to spend their summer holiday in Spain.",
    DE: "Sie entschieden sich, ihren Sommerurlaub in Spanien zu verbringen.",
    NL: "Ze besloten hun zomervakantie in Spanje door te brengen.",
    PT: "Eles decidiram passar as férias de verão na Espanha.",
    FR: "Ils ont décidé de passer leurs vacances d'été en Espagne.",
    ES: "Decidieron pasar sus vacaciones de verano en España.",
    IT: "Hanno deciso di trascorrere le vacanze estive in Spagna.",
  },
  {
    ID: 26,
    MAIN_EN: "I don’t like coffee, but I love the smell of it.",
    DE: "Ich mag keinen Kaffee, aber ich liebe seinen Geruch.",
    NL: "Ik hou niet van koffie, maar ik hou wel van de geur ervan.",
    PT: "Eu não gosto de café, mas adoro o cheiro dele.",
    FR: "Je n'aime pas le café, mais j'adore son odeur.",
    ES: "No me gusta el café, pero me encanta su aroma.",
    IT: "Non mi piace il caffè, ma adoro il suo profumo.",
  },
  {
    ID: 27,
    MAIN_EN:
      "She borrowed a book from the library and promised to return it on time.",
    DE: "Sie lieh sich ein Buch aus der Bibliothek und versprach, es pünktlich zurückzugeben.",
    NL: "Ze leende een boek uit de bibliotheek en beloofde het op tijd terug te brengen.",
    PT: "Ela pegou um livro na biblioteca e prometeu devolvê-lo no prazo.",
    FR: "Elle a emprunté un livre à la bibliothèque et a promis de le rendre à temps.",
    ES: "Pidió prestado un libro de la biblioteca y prometió devolverlo a tiempo.",
    IT: "Ha preso in prestito un libro dalla biblioteca e ha promesso di restituirlo in tempo.",
  },
  {
    ID: 28,
    MAIN_EN: "He was so hungry that he ordered two large pizzas.",
    DE: "Er war so hungrig, dass er zwei große Pizzen bestellte.",
    NL: "Hij had zo'n honger dat hij twee grote pizza’s bestelde.",
    PT: "Ele estava com tanta fome que pediu duas pizzas grandes.",
    FR: "Il avait tellement faim qu'il a commandé deux grandes pizzas.",
    ES: "Tenía tanta hambre que pidió dos pizzas grandes.",
    IT: "Aveva così tanta fame che ha ordinato due pizze grandi.",
  },
  {
    ID: 29,
    MAIN_EN:
      "The teacher explained the topic again because some students didn’t understand it.",
    DE: "Der Lehrer erklärte das Thema noch einmal, weil einige Schüler es nicht verstanden hatten.",
    NL: "De leraar legde het onderwerp nog een keer uit omdat sommige studenten het niet begrepen.",
    PT: "O professor explicou o tema novamente porque alguns alunos não entenderam.",
    FR: "Le professeur a expliqué le sujet à nouveau car certains étudiants ne l'avaient pas compris.",
    ES: "El profesor explicó el tema otra vez porque algunos estudiantes no lo entendieron.",
    IT: "L'insegnante ha spiegato di nuovo l'argomento perché alcuni studenti non lo avevano capito.",
  },
  {
    ID: 30,
    MAIN_EN: "We went to the supermarket to buy some ingredients for dinner.",
    DE: "Wir gingen in den Supermarkt, um einige Zutaten für das Abendessen zu kaufen.",
    NL: "We gingen naar de supermarkt om wat ingrediënten voor het avondeten te kopen.",
    PT: "Fomos ao supermercado comprar alguns ingredientes para o jantar.",
    FR: "Nous sommes allés au supermarché pour acheter des ingrédients pour le dîner.",
    ES: "Fuimos al supermercado a comprar algunos ingredientes para la cena.",
    IT: "Siamo andati al supermercato a comprare alcuni ingredienti per la cena.",
  },
  {
    ID: 31,
    MAIN_EN: "I have never seen such a beautiful sunset before.",
    DE: "Ich habe noch nie einen so schönen Sonnenuntergang gesehen.",
    NL: "Ik heb nog nooit zo'n mooie zonsondergang gezien.",
    PT: "Nunca vi um pôr do sol tão bonito antes.",
    FR: "Je n'ai jamais vu un coucher de soleil aussi beau.",
    ES: "Nunca he visto un atardecer tan hermoso.",
    IT: "Non ho mai visto un tramonto così bello prima d'ora.",
  },
  {
    ID: 32,
    MAIN_EN: "She is saving money because she wants to buy a new laptop.",
    DE: "Sie spart Geld, weil sie sich einen neuen Laptop kaufen möchte.",
    NL: "Ze spaart geld omdat ze een nieuwe laptop wil kopen.",
    PT: "Ela está economizando dinheiro porque quer comprar um novo laptop.",
    FR: "Elle économise de l'argent parce qu'elle veut acheter un nouvel ordinateur portable.",
    ES: "Está ahorrando dinero porque quiere comprarse un ordenador portátil nuevo.",
    IT: "Sta risparmiando denaro perché vuole comprare un nuovo laptop.",
  },
  {
    ID: 33,
    MAIN_EN:
      "The concert was amazing, and the band played all of their best songs.",
    DE: "Das Konzert war großartig, und die Band spielte alle ihre besten Lieder.",
    NL: "Het concert was geweldig en de band speelde al hun beste nummers.",
    PT: "O show foi incrível e a banda tocou todas as suas melhores músicas.",
    FR: "Le concert était incroyable et le groupe a joué toutes ses meilleures chansons.",
    ES: "El concierto fue increíble y la banda tocó todas sus mejores canciones.",
    IT: "Il concerto è stato incredibile e la band ha suonato tutte le sue canzoni migliori.",
  },
  {
    ID: 34,
    MAIN_EN: "He forgot his keys at home and had to wait for his roommate.",
    DE: "Er vergaß seine Schlüssel zu Hause und musste auf seinen Mitbewohner warten.",
    NL: "Hij vergat zijn sleutels thuis en moest op zijn huisgenoot wachten.",
    PT: "Ele esqueceu as chaves em casa e teve que esperar pelo colega de quarto.",
    FR: "Il a oublié ses clés à la maison et a dû attendre son colocataire.",
    ES: "Olvidó sus llaves en casa y tuvo que esperar a su compañero de piso.",
    IT: "Ha dimenticato le chiavi a casa e ha dovuto aspettare il suo coinquilino.",
  },
  {
    ID: 35,
    MAIN_EN: "My sister loves painting, and she is really talented.",
    DE: "Meine Schwester liebt das Malen, und sie ist wirklich talentiert.",
    NL: "Mijn zus houdt van schilderen en ze is echt getalenteerd.",
    PT: "Minha irmã adora pintar e é muito talentosa.",
    FR: "Ma sœur adore la peinture et elle est très talentueuse.",
    ES: "A mi hermana le encanta pintar y es muy talentosa.",
    IT: "Mia sorella ama dipingere ed è davvero talentuosa.",
  },
  {
    ID: 36,
    MAIN_EN: "We need to leave early to avoid the traffic.",
    DE: "Wir müssen früh losfahren, um den Verkehr zu vermeiden.",
    NL: "We moeten vroeg vertrekken om de drukte te vermijden.",
    PT: "Precisamos sair cedo para evitar o trânsito.",
    FR: "Nous devons partir tôt pour éviter les embouteillages.",
    ES: "Necesitamos salir temprano para evitar el tráfico.",
    IT: "Dobbiamo partire presto per evitare il traffico.",
  },
  {
    ID: 37,
    MAIN_EN: "He didn’t like the movie, but I thought it was really good.",
    DE: "Er mochte den Film nicht, aber ich fand ihn wirklich gut.",
    NL: "Hij vond de film niet leuk, maar ik vond hem echt goed.",
    PT: "Ele não gostou do filme, mas eu achei muito bom.",
    FR: "Il n'a pas aimé le film, mais moi, je l'ai trouvé très bon.",
    ES: "A él no le gustó la película, pero a mí me pareció muy buena.",
    IT: "A lui non è piaciuto il film, ma io l'ho trovato molto bello.",
  },
  {
    ID: 38,
    MAIN_EN: "She always listens to music while studying.",
    DE: "Sie hört immer Musik, während sie lernt.",
    NL: "Ze luistert altijd naar muziek terwijl ze studeert.",
    PT: "Ela sempre ouve música enquanto estuda.",
    FR: "Elle écoute toujours de la musique en étudiant.",
    ES: "Siempre escucha música mientras estudia.",
    IT: "Ascolta sempre la musica mentre studia.",
  },
  {
    ID: 39,
    MAIN_EN: "We spent the whole afternoon at the beach, enjoying the sun.",
    DE: "Wir verbrachten den ganzen Nachmittag am Strand und genossen die Sonne.",
    NL: "We brachten de hele middag op het strand door en genoten van de zon.",
    PT: "Passamos a tarde inteira na praia, aproveitando o sol.",
    FR: "Nous avons passé tout l'après-midi à la plage, profitant du soleil.",
    ES: "Pasamos toda la tarde en la playa disfrutando del sol.",
    IT: "Abbiamo passato tutto il pomeriggio in spiaggia, godendoci il sole.",
  },
  {
    ID: 40,
    MAIN_EN: "I was surprised to receive a message from an old friend.",
    DE: "Ich war überrascht, eine Nachricht von einem alten Freund zu bekommen.",
    NL: "Ik was verrast om een bericht van een oude vriend te ontvangen.",
    PT: "Fiquei surpreso ao receber uma mensagem de um velho amigo.",
    FR: "J'ai été surpris de recevoir un message d'un vieil ami.",
    ES: "Me sorprendió recibir un mensaje de un viejo amigo.",
    IT: "Sono rimasto sorpreso nel ricevere un messaggio da un vecchio amico.",
  },
  {
    ID: 41,
    MAIN_EN: "He wants to learn how to play the guitar.",
    DE: "Er möchte lernen, wie man Gitarre spielt.",
    NL: "Hij wil leren hoe hij gitaar moet spelen.",
    PT: "Ele quer aprender a tocar violão.",
    FR: "Il veut apprendre à jouer de la guitare.",
    ES: "Quiere aprender a tocar la guitarra.",
    IT: "Vuole imparare a suonare la chitarra.",
  },
  {
    ID: 42,
    MAIN_EN:
      "The restaurant was too crowded, so we decided to eat somewhere else.",
    DE: "Das Restaurant war zu voll, also entschieden wir uns, woanders zu essen.",
    NL: "Het restaurant was te druk, dus besloten we ergens anders te eten.",
    PT: "O restaurante estava muito cheio, então decidimos comer em outro lugar.",
    FR: "Le restaurant était trop bondé, alors nous avons décidé d'aller ailleurs.",
    ES: "El restaurante estaba demasiado lleno, así que decidimos comer en otro lugar.",
    IT: "Il ristorante era troppo affollato, quindi abbiamo deciso di mangiare da un'altra parte.",
  },
  {
    ID: 43,
    MAIN_EN: "She was tired, but she kept working until she finished.",
    DE: "Sie war müde, aber sie arbeitete weiter, bis sie fertig war.",
    NL: "Ze was moe, maar ze werkte door tot ze klaar was.",
    PT: "Ela estava cansada, mas continuou trabalhando até terminar.",
    FR: "Elle était fatiguée, mais elle a continué à travailler jusqu'à avoir fini.",
    ES: "Estaba cansada, pero siguió trabajando hasta terminar.",
    IT: "Era stanca, ma ha continuato a lavorare fino a quando non ha finito.",
  },
  {
    ID: 44,
    MAIN_EN:
      "I have to finish my homework before I can go out with my friends.",
    DE: "Ich muss meine Hausaufgaben fertig machen, bevor ich mit meinen Freunden ausgehen kann.",
    NL: "Ik moet mijn huiswerk afmaken voordat ik met mijn vrienden uit kan gaan.",
    PT: "Tenho que terminar minha lição de casa antes de sair com meus amigos.",
    FR: "Je dois finir mes devoirs avant de sortir avec mes amis.",
    ES: "Tengo que terminar mis deberes antes de salir con mis amigos.",
    IT: "Devo finire i compiti prima di poter uscire con i miei amici.",
  },
  {
    ID: 45,
    MAIN_EN: "They were excited to visit the new museum in the city.",
    DE: "Sie waren begeistert, das neue Museum in der Stadt zu besuchen.",
    NL: "Ze waren enthousiast om het nieuwe museum in de stad te bezoeken.",
    PT: "Eles estavam animados para visitar o novo museu da cidade.",
    FR: "Ils étaient ravis de visiter le nouveau musée de la ville.",
    ES: "Estaban emocionados por visitar el nuevo museo de la ciudad.",
    IT: "Erano entusiasti di visitare il nuovo museo della città.",
  },
  {
    ID: 46,
    MAIN_EN: "It started to rain just as we were leaving the house.",
    DE: "Es fing genau in dem Moment an zu regnen, als wir das Haus verließen.",
    NL: "Het begon te regenen net toen we het huis verlieten.",
    PT: "Começou a chover exatamente quando saímos de casa.",
    FR: "Il a commencé à pleuvoir juste au moment où nous quittions la maison.",
    ES: "Empezó a llover justo cuando salíamos de casa.",
    IT: "Ha iniziato a piovere proprio mentre stavamo uscendo di casa.",
  },
  {
    ID: 47,
    MAIN_EN: "He took a lot of pictures during his trip to Italy.",
    DE: "Er machte viele Fotos während seiner Reise nach Italien.",
    NL: "Hij maakte veel foto’s tijdens zijn reis naar Italië.",
    PT: "Ele tirou muitas fotos durante sua viagem à Itália.",
    FR: "Il a pris beaucoup de photos pendant son voyage en Italie.",
    ES: "Sacó muchas fotos durante su viaje a Italia.",
    IT: "Ha scattato molte foto durante il suo viaggio in Italia.",
  },
  {
    ID: 48,
    MAIN_EN: "The bus was so full that we had to wait for the next one.",
    DE: "Der Bus war so voll, dass wir auf den nächsten warten mussten.",
    NL: "De bus was zo vol dat we op de volgende moesten wachten.",
    PT: "O ônibus estava tão cheio que tivemos que esperar pelo próximo.",
    FR: "Le bus était tellement plein que nous avons dû attendre le prochain.",
    ES: "El autobús estaba tan lleno que tuvimos que esperar el siguiente.",
    IT: "L'autobus era così pieno che abbiamo dovuto aspettare il prossimo.",
  },
  {
    ID: 49,
    MAIN_EN: "She is looking for a new apartment closer to her office.",
    DE: "Sie sucht eine neue Wohnung, die näher an ihrem Büro liegt.",
    NL: "Ze is op zoek naar een nieuw appartement dichter bij haar werk.",
    PT: "Ela está procurando um novo apartamento mais perto do trabalho.",
    FR: "Elle cherche un nouvel appartement plus proche de son travail.",
    ES: "Está buscando un nuevo apartamento más cerca de su trabajo.",
    IT: "Sta cercando un nuovo appartamento più vicino al suo ufficio.",
  },
  {
    ID: 50,
    MAIN_EN: "I couldn’t sleep last night because it was too noisy outside.",
    DE: "Ich konnte letzte Nacht nicht schlafen, weil es draußen zu laut war.",
    NL: "Ik kon gisteravond niet slapen omdat het buiten te lawaaierig was.",
    PT: "Não consegui dormir ontem à noite porque estava muito barulhento lá fora.",
    FR: "Je n'ai pas pu dormir la nuit dernière car il y avait trop de bruit dehors.",
    ES: "No pude dormir anoche porque había demasiado ruido afuera.",
    IT: "Non sono riuscito a dormire la scorsa notte perché c'era troppo rumore fuori.",
  },
  {
    ID: 51,
    MAIN_EN:
      "I'm trying to improve my cooking skills by following online recipes.",
    DE: "Ich versuche, meine Kochkünste zu verbessern, indem ich Online-Rezepte befolge.",
    NL: "Ik probeer mijn kookkunsten te verbeteren door online recepten te volgen.",
    PT: "Estou a tentar melhorar as minhas capacidades culinárias seguindo receitas online.",
    FR: "J'essaie d'améliorer mes compétences culinaires en suivant des recettes en ligne.",
    ES: "Estoy intentando mejorar mis habilidades culinarias siguiendo recetas en línea.",
    IT: "Sto cercando di migliorare le mie abilità culinarie seguendo ricette online.",
  },
  {
    ID: 52,
    MAIN_EN: "She decided to take a break from social media to reduce stress.",
    DE: "Sie hat beschlossen, eine Pause von den sozialen Medien einzulegen, um Stress abzubauen.",
    NL: "Ze besloot een pauze te nemen van sociale media om stress te verminderen.",
    PT: "Ela decidiu fazer uma pausa das redes sociais para reduzir o stress.",
    FR: "Elle a décidé de faire une pause des réseaux sociaux pour réduire le stress.",
    ES: "Ella decidió tomarse un descanso de las redes sociales para reducir el estrés.",
    IT: "Lei ha deciso di prendersi una pausa dai social media per ridurre lo stress.",
  },
  {
    ID: 53,
    MAIN_EN:
      "Even though it was raining, we still went for a walk in the park.",
    DE: "Obwohl es regnete, gingen wir trotzdem im Park spazieren.",
    NL: "Hoewel het regende, gingen we toch wandelen in het park.",
    PT: "Apesar de estar a chover, fomos mesmo assim dar um passeio no parque.",
    FR: "Même s'il pleuvait, nous sommes quand même allés nous promener dans le parc.",
    ES: "Aunque estaba lloviendo, aún fuimos a dar un paseo por el parque.",
    IT: "Anche se pioveva, siamo comunque andati a fare una passeggiata nel parco.",
  },
  {
    ID: 54,
    MAIN_EN: "If you need help with your project, don't hesitate to ask me.",
    DE: "Wenn du Hilfe bei deinem Projekt brauchst, zögere nicht, mich zu fragen.",
    NL: "Als je hulp nodig hebt met je project, aarzel dan niet om het me te vragen.",
    PT: "Se precisares de ajuda com o teu projeto, não hesites em perguntar-me.",
    FR: "Si tu as besoin d'aide pour ton projet, n'hésite pas à me le demander.",
    ES: "Si necesitas ayuda con tu proyecto, no dudes en preguntarme.",
    IT: "Se hai bisogno di aiuto con il tuo progetto, non esitare a chiedermelo.",
  },
  {
    ID: 55,
    MAIN_EN:
      "They're planning to visit their grandparents during the summer holidays.",
    DE: "Sie planen, ihre Großeltern während der Sommerferien zu besuchen.",
    NL: "Ze zijn van plan om hun grootouders te bezoeken tijdens de zomervakantie.",
    PT: "Eles estão a planear visitar os avós durante as férias de verão.",
    FR: "Ils prévoient de rendre visite à leurs grands-parents pendant les vacances d'été.",
    ES: "Están planeando visitar a sus abuelos durante las vacaciones de verano.",
    IT: "Stanno pianificando di visitare i loro nonni durante le vacanze estive.",
  },
  {
    ID: 56,
    MAIN_EN: "I've been learning a new language for the past six months.",
    DE: "Ich lerne seit sechs Monaten eine neue Sprache.",
    NL: "Ik leer al zes maanden een nieuwe taal.",
    PT: "Tenho estado a aprender uma nova língua nos últimos seis meses.",
    FR: "J'apprends une nouvelle langue depuis six mois.",
    ES: "He estado aprendiendo un nuevo idioma durante los últimos seis meses.",
    IT: "Sto imparando una nuova lingua da sei mesi.",
  },
  {
    ID: 57,
    MAIN_EN: "He explained the situation clearly, so everyone understood.",
    DE: "Er erklärte die Situation klar, sodass jeder sie verstand.",
    NL: "Hij legde de situatie duidelijk uit, zodat iedereen het begreep.",
    PT: "Ele explicou a situação claramente, por isso todos compreenderam.",
    FR: "Il a expliqué la situation clairement, donc tout le monde a compris.",
    ES: "Él explicó la situación claramente, así que todos entendieron.",
    IT: "Lui ha spiegato la situazione chiaramente, così tutti hanno capito.",
  },
  {
    ID: 58,
    MAIN_EN:
      "It's important to recycle paper and plastic to protect the environment.",
    DE: "Es ist wichtig, Papier und Plastik zu recyceln, um die Umwelt zu schützen.",
    NL: "Het is belangrijk om papier en plastic te recyclen om het milieu te beschermen.",
    PT: "É importante reciclar papel e plástico para proteger o ambiente.",
    FR: "Il est important de recycler le papier et le plastique pour protéger l'environnement.",
    ES: "Es importante reciclar papel y plástico para proteger el medio ambiente.",
    IT: "È importante riciclare carta e plastica per proteggere l'ambiente.",
  },
  {
    ID: 59,
    MAIN_EN:
      "We're looking forward to seeing the new art exhibition at the museum.",
    DE: "Wir freuen uns darauf, die neue Kunstausstellung im Museum zu sehen.",
    NL: "We kijken ernaar uit om de nieuwe kunsttentoonstelling in het museum te zien.",
    PT: "Estamos ansiosos por ver a nova exposição de arte no museu.",
    FR: "Nous avons hâte de voir la nouvelle exposition d'art au musée.",
    ES: "Estamos deseando ver la nueva exposición de arte en el museo.",
    IT: "Non vediamo l'ora di vedere la nuova mostra d'arte al museo.",
  },
  {
    ID: 60,
    MAIN_EN: "I often listen to podcasts while commuting to work.",
    DE: "Ich höre oft Podcasts, während ich zur Arbeit pendle.",
    NL: "Ik luister vaak naar podcasts tijdens het pendelen naar mijn werk.",
    PT: "Ouço frequentemente podcasts enquanto me desloco para o trabalho.",
    FR: "J'écoute souvent des podcasts pendant mon trajet pour aller au travail.",
    ES: "A menudo escucho podcasts mientras voy al trabajo.",
    IT: "Ascolto spesso podcast mentre vado al lavoro.",
  },
  {
    ID: 61,
    MAIN_EN:
      "In my opinion, reading books is more enjoyable than watching television.",
    DE: "Meiner Meinung nach ist das Lesen von Büchern angenehmer als das Fernsehen.",
    NL: "Naar mijn mening is het lezen van boeken aangenamer dan televisie kijken.",
    PT: "Na minha opinião, ler livros é mais agradável do que ver televisão.",
    FR: "À mon avis, lire des livres est plus agréable que de regarder la télévision.",
    ES: "En mi opinión, leer libros es más agradable que ver televisión.",
    IT: "Secondo me, leggere libri è più piacevole che guardare la televisione.",
  },
  {
    ID: 62,
    MAIN_EN: "I prefer coffee to tea, especially in the morning.",
    DE: "Ich bevorzuge Kaffee gegenüber Tee, besonders am Morgen.",
    NL: "Ik geef de voorkeur aan koffie boven thee, vooral 's ochtends.",
    PT: "Prefiro café a chá, especialmente de manhã.",
    FR: "Je préfère le café au thé, surtout le matin.",
    ES: "Prefiero el café al té, especialmente por la mañana.",
    IT: "Preferisco il caffè al tè, soprattutto al mattino.",
  },
  {
    ID: 63,
    MAIN_EN:
      "She thinks that learning a musical instrument is a valuable skill.",
    DE: "Sie denkt, dass das Erlernen eines Musikinstruments eine wertvolle Fähigkeit ist.",
    NL: "Ze vindt dat het leren van een muziekinstrument een waardevolle vaardigheid is.",
    PT: "Ela acha que aprender um instrumento musical é uma competência valiosa.",
    FR: "Elle pense qu'apprendre un instrument de musique est une compétence précieuse.",
    ES: "Ella piensa que aprender un instrumento musical es una habilidad valiosa.",
    IT: "Lei pensa che imparare uno strumento musicale sia un'abilità preziosa.",
  },
  {
    ID: 64,
    MAIN_EN: "He believes that travelling broadens your perspective.",
    DE: "Er glaubt, dass Reisen den Horizont erweitert.",
    NL: "Hij gelooft dat reizen je horizon verbreedt.",
    PT: "Ele acredita que viajar alarga a nossa perspetiva.",
    FR: "Il croit que voyager élargit les horizons.",
    ES: "Él cree que viajar amplía tu perspectiva.",
    IT: "Lui crede che viaggiare allarghi i propri orizzonti.",
  },
  {
    ID: 65,
    MAIN_EN: "I find it difficult to concentrate when there's a lot of noise.",
    DE: "Ich finde es schwierig, mich zu konzentrieren, wenn es viel Lärm gibt.",
    NL: "Ik vind het moeilijk me te concentreren als er veel lawaai is.",
    PT: "Acho difícil concentrar-me quando há muito barulho.",
    FR: "J'ai du mal à me concentrer quand il y a beaucoup de bruit.",
    ES: "Me resulta difícil concentrarme cuando hay mucho ruido.",
    IT: "Trovo difficile concentrarmi quando c'è molto rumore.",
  },
  {
    ID: 66,
    MAIN_EN: "They consider it essential to maintain a healthy lifestyle.",
    DE: "Sie halten es für wesentlich, einen gesunden Lebensstil zu pflegen.",
    NL: "Ze vinden het essentieel om een gezonde levensstijl te onderhouden.",
    PT: "Eles consideram essencial manter um estilo de vida saudável.",
    FR: "Ils considèrent qu'il est essentiel de maintenir un mode de vie sain.",
    ES: "Consideran esencial mantener un estilo de vida saludable.",
    IT: "Loro considerano essenziale mantenere uno stile di vita sano.",
  },
  {
    ID: 67,
    MAIN_EN:
      "It seems to me that the weather is becoming increasingly unpredictable.",
    DE: "Mir scheint, dass das Wetter immer unvorhersehbarer wird.",
    NL: "Het lijkt mij dat het weer steeds onvoorspelbaarder wordt.",
    PT: "Parece-me que o tempo está a tornar-se cada vez mais imprevisível.",
    FR: "Il me semble que le temps devient de plus en plus imprévisible.",
    ES: "Me parece que el clima se está volviendo cada vez más impredecible.",
    IT: "Mi sembra che il tempo stia diventando sempre più imprevedibile.",
  },
  {
    ID: 68,
    MAIN_EN:
      "I'm convinced that technology has both advantages and disadvantages.",
    DE: "Ich bin überzeugt, dass Technologie sowohl Vorteile als auch Nachteile hat.",
    NL: "Ik ben ervan overtuigd dat technologie zowel voordelen als nadelen heeft.",
    PT: "Estou convencido de que a tecnologia tem vantagens e desvantagens.",
    FR: "Je suis convaincu que la technologie a à la fois des avantages et des inconvénients.",
    ES: "Estoy convencido de que la tecnología tiene ventajas y desventajas.",
    IT: "Sono convinto che la tecnologia abbia sia vantaggi che svantaggi.",
  },
  {
    ID: 69,
    MAIN_EN:
      "She's of the opinion that volunteering is a rewarding experience.",
    DE: "Sie ist der Meinung, dass ehrenamtliche Arbeit eine lohnende Erfahrung ist.",
    NL: "Ze is van mening dat vrijwilligerswerk een lonende ervaring is.",
    PT: "Ela é da opinião de que o voluntariado é uma experiência gratificante.",
    FR: "Elle est d'avis que le bénévolat est une expérience enrichissante.",
    ES: "Ella opina que el voluntariado es una experiencia gratificante.",
    IT: "Lei è dell'opinione che il volontariato sia un'esperienza gratificante.",
  },
  {
    ID: 70,
    MAIN_EN: "I tend to agree with the idea that practice makes perfect.",
    DE: "Ich neige dazu, der Idee zuzustimmen, dass Übung den Meister macht.",
    NL: "Ik ben het meestal eens met het idee dat oefening kunst baart.",
    PT: "Tendo a concordar com a ideia de que a prática leva à perfeição.",
    FR: "J'ai tendance à être d'accord avec l'idée que la pratique rend parfait.",
    ES: "Tiendo a estar de acuerdo con la idea de que la práctica hace al maestro.",
    IT: "Tendo a concordare con l'idea che la pratica rende perfetti.",
  },
  {
    ID: 71,
    MAIN_EN: "If I had more time, I would learn to play the guitar.",
    DE: "Wenn ich mehr Zeit hätte, würde ich Gitarre spielen lernen.",
    NL: "Als ik meer tijd had, zou ik gitaar leren spelen.",
    PT: "Se eu tivesse mais tempo, aprenderia a tocar guitarra.",
    FR: "Si j'avais plus de temps, j'apprendrais à jouer de la guitare.",
    ES: "Si tuviera más tiempo, aprendería a tocar la guitarra.",
    IT: "Se avessi più tempo, imparerei a suonare la chitarra.",
  },
  {
    ID: 72,
    MAIN_EN: "She would travel around the world if she won the lottery.",
    DE: "Sie würde um die Welt reisen, wenn sie im Lotto gewinnen würde.",
    NL: "Ze zou de wereld rondreizen als ze de loterij zou winnen.",
    PT: "Ela viajaria pelo mundo se ganhasse a lotaria.",
    FR: "Elle ferait le tour du monde si elle gagnait à la loterie.",
    ES: "Ella viajaría por el mundo si ganara la lotería.",
    IT: "Lei viaggerebbe in tutto il mondo se vincesse alla lotteria.",
  },
  {
    ID: 73,
    MAIN_EN: "Had they known about the traffic, they would have left earlier.",
    DE: "Hätten sie von dem Verkehr gewusst, wären sie früher losgefahren.",
    NL: "Hadden ze geweten van het verkeer, dan waren ze eerder vertrokken.",
    PT: "Se eles soubessem do trânsito, teriam saído mais cedo.",
    FR: "S'ils avaient su pour le trafic, ils seraient partis plus tôt.",
    ES: "Si hubieran sabido del tráfico, habrían salido antes.",
    IT: "Se avessero saputo del traffico, sarebbero partiti prima.",
  },
  {
    ID: 74,
    MAIN_EN: "Unless it rains, we'll have a picnic in the garden.",
    DE: "Sofern es nicht regnet, werden wir ein Picknick im Garten machen.",
    NL: "Tenzij het regent, houden we een picknick in de tuin.",
    PT: "A menos que chova, faremos um piquenique no jardim.",
    FR: "À moins qu'il ne pleuve, nous ferons un pique-nique dans le jardin.",
    ES: "A menos que llueva, haremos un picnic en el jardín.",
    IT: "A meno che non piova, faremo un picnic in giardino.",
  },
  {
    ID: 75,
    MAIN_EN: "Provided that you finish your homework, you can watch a movie.",
    DE: "Vorausgesetzt, du machst deine Hausaufgaben fertig, kannst du einen Film schauen.",
    NL: "Mits je je huiswerk afmaakt, mag je een film kijken.",
    PT: "Desde que acabes os teus trabalhos de casa, podes ver um filme.",
    FR: "À condition que tu finisses tes devoirs, tu pourras regarder un film.",
    ES: "Siempre que termines tu tarea, puedes ver una película.",
    IT: "A condizione che tu finisca i tuoi compiti, puoi guardare un film.",
  },
  {
    ID: 76,
    MAIN_EN: "If you were to choose, which career would you pursue?",
    DE: "Wenn du wählen würdest, welchen Beruf würdest du verfolgen?",
    NL: "Als je zou kiezen, welke carrière zou je dan nastreven?",
    PT: "Se tivesses de escolher, que carreira seguirias?",
    FR: "Si tu devais choisir, quelle carrière poursuivrais-tu ?",
    ES: "Si tuvieras que elegir, ¿qué carrera seguirías?",
    IT: "Se dovessi scegliere, quale carriera seguiresti?",
  },
  {
    ID: 77,
    MAIN_EN: "Should you need any assistance, please contact our office.",
    DE: "Sollten Sie Hilfe benötigen, kontaktieren Sie bitte unser Büro.",
    NL: "Mocht u hulp nodig hebben, neem dan contact op met ons kantoor.",
    PT: "Caso necessite de ajuda, por favor contacte o nosso escritório.",
    FR: "Si vous avez besoin d'aide, veuillez contacter notre bureau.",
    ES: "Si necesita ayuda, por favor contacte con nuestra oficina.",
    IT: "Se hai bisogno di assistenza, contatta il nostro ufficio.",
  },
  {
    ID: 78,
    MAIN_EN: "I wouldn't have made that mistake if I had paid more attention.",
    DE: "Ich hätte diesen Fehler nicht gemacht, wenn ich mehr aufgepasst hätte.",
    NL: "Ik zou die fout niet hebben gemaakt als ik beter had opgelet.",
    PT: "Eu não teria cometido esse erro se tivesse prestado mais atenção.",
    FR: "Je n'aurais pas fait cette erreur si j'avais été plus attentif.",
    ES: "No habría cometido ese error si hubiera prestado más atención.",
    IT: "Non avrei commesso quell'errore se avessi prestato più attenzione.",
  },
  {
    ID: 79,
    MAIN_EN: "If he had studied harder, he might have passed the exam.",
    DE: "Wenn er fleißiger gelernt hätte, hätte er die Prüfung vielleicht bestanden.",
    NL: "Als hij harder had gestudeerd, had hij het examen misschien gehaald.",
    PT: "Se ele tivesse estudado mais, talvez tivesse passado no exame.",
    FR: "S'il avait étudié plus dur, il aurait peut-être réussi l'examen.",
    ES: "Si hubiera estudiado más, podría haber aprobado el examen.",
    IT: "Se avesse studiato di più, avrebbe potuto superare l'esame.",
  },
  {
    ID: 80,
    MAIN_EN:
      "Were it not for the heavy traffic, we would have arrived on time.",
    DE: "Wäre der starke Verkehr nicht gewesen, wären wir pünktlich angekommen.",
    NL: "Ware het niet voor de zware verkeersdrukte, dan waren we op tijd aangekomen.",
    PT: "Se não fosse o trânsito intenso, teríamos chegado a tempo.",
    FR: "Sans les embouteillages, nous serions arrivés à l'heure.",
    ES: "Si no fuera por el tráfico pesado, habríamos llegado a tiempo.",
    IT: "Se non fosse stato per il traffico intenso, saremmo arrivati in tempo.",
  },
  {
    ID: 81,
    MAIN_EN:
      "The old house, which is located on the hill, has a beautiful view.",
    DE: "Das alte Haus, das sich auf dem Hügel befindet, hat eine schöne Aussicht.",
    NL: "Het oude huis, dat op de heuvel staat, heeft een prachtig uitzicht.",
    PT: "A casa antiga, que se situa na colina, tem uma bela vista.",
    FR: "La vieille maison, située sur la colline, a une belle vue.",
    ES: "La casa antigua, que se encuentra en la colina, tiene una hermosa vista.",
    IT: "La vecchia casa, che si trova sulla collina, ha una bella vista.",
  },
  {
    ID: 82,
    MAIN_EN: "The reason why he was late was due to the train delay.",
    DE: "Der Grund, warum er zu spät kam, war die Zugverspätung.",
    NL: "De reden waarom hij te laat was, was de treinvertraging.",
    PT: "A razão pela qual ele se atrasou foi o atraso do comboio.",
    FR: "La raison pour laquelle il était en retard était le retard du train.",
    ES: "La razón por la que llegó tarde fue el retraso del tren.",
    IT: "Il motivo per cui era in ritardo era il ritardo del treno.",
  },
  {
    ID: 83,
    MAIN_EN:
      "The book, which I borrowed from the library, is very interesting.",
    DE: "Das Buch, das ich von der Bibliothek ausgeliehen habe, ist sehr interessant.",
    NL: "Het boek dat ik in de bibliotheek heb geleend, is erg interessant.",
    PT: "O livro que pedi emprestado à biblioteca é muito interessante.",
    FR: "Le livre que j'ai emprunté à la bibliothèque est très intéressant.",
    ES: "El libro que tomé prestado de la biblioteca es muy interesante.",
    IT: "Il libro che ho preso in prestito dalla biblioteca è molto interessante.",
  },
  {
    ID: 84,
    MAIN_EN:
      "She described the incident in detail, so we understood what happened.",
    DE: "Sie beschrieb den Vorfall detailliert, sodass wir verstanden, was passiert war.",
    NL: "Ze beschreef het incident in detail, zodat we begrepen wat er was gebeurd.",
    PT: "Ela descreveu o incidente em detalhe, para que entendêssemos o que aconteceu.",
    FR: "Elle a décrit l'incident en détail, afin que nous comprenions ce qui s'était passé.",
    ES: "Ella describió el incidente en detalle, para que entendiéramos lo que sucedió.",
    IT: "Lei ha descritto l'incidente in dettaglio, così abbiamo capito cosa è successo.",
  },
  {
    ID: 85,
    MAIN_EN:
      "The city, known for its historical buildings, attracts many tourists.",
    DE: "Die Stadt, die für ihre historischen Gebäude bekannt ist, zieht viele Touristen an.",
    NL: "De stad, bekend om haar historische gebouwen, trekt veel toeristen aan.",
    PT: "A cidade, conhecida pelos seus edifícios históricos, atrai muitos turistas.",
    FR: "La ville, connue pour ses bâtiments historiques, attire de nombreux touristes.",
    ES: "La ciudad, conocida por sus edificios históricos, atrae a muchos turistas.",
    IT: "La città, nota per i suoi edifici storici, attrae molti turisti.",
  },
  {
    ID: 86,
    MAIN_EN: "He explained the process step by step, making it easy to follow.",
    DE: "Er erklärte den Prozess Schritt für Schritt, was ihn leicht verständlich machte.",
    NL: "Hij legde het proces stap voor stap uit, waardoor het gemakkelijk te volgen was.",
    PT: "Ele explicou o processo passo a passo, tornando-o fácil de seguir.",
    FR: "Il a expliqué le processus étape par étape, ce qui le rend facile à suivre.",
    ES: "Él explicó el proceso paso a paso, lo que facilitó su comprensión.",
    IT: "Lui ha spiegato il processo passo dopo passo, rendendolo facile da seguire.",
  },
  {
    ID: 87,
    MAIN_EN:
      "The problem, which had been overlooked, caused further complications.",
    DE: "Das Problem, das übersehen worden war, verursachte weitere Komplikationen.",
    NL: "Het probleem dat over het hoofd was gezien, veroorzaakte verdere complicaties.",
    PT: "O problema, que tinha sido negligenciado, causou mais complicações.",
    FR: "Le problème, qui avait été négligé, a causé d'autres complications.",
    ES: "El problema, que había sido pasado por alto, causó más complicaciones.",
    IT: "Il problema, che era stato trascurato, ha causato ulteriori complicazioni.",
  },
  {
    ID: 88,
    MAIN_EN: "The restaurant, famous for its seafood, is always crowded.",
    DE: "Das Restaurant, das für seine Meeresfrüchte berühmt ist, ist immer voll.",
    NL: "Het restaurant, beroemd om zijn zeevruchten, is altijd druk.",
    PT: "O restaurante, famoso pelos seus mariscos, está sempre cheio.",
    FR: "Le restaurant, célèbre pour ses fruits de mer, est toujours bondé.",
    ES: "El restaurante, famoso por sus mariscos, siempre está lleno.",
    IT: "Il ristorante, famoso per i suoi frutti di mare, è sempre affollato.",
  },
  {
    ID: 89,
    MAIN_EN: "She outlined the plan, highlighting the key points.",
    DE: "Sie skizzierte den Plan und hob die wichtigsten Punkte hervor.",
    NL: "Ze schetste het plan en benadrukte de belangrijkste punten.",
    PT: "Ela delineou o plano, destacando os pontos principais.",
    FR: "Elle a esquissé le plan, en soulignant les points clés.",
    ES: "Ella esbozó el plan, destacando los puntos clave.",
    IT: "Lei ha delineato il piano, evidenziando i punti chiave.",
  },
  {
    ID: 90,
    MAIN_EN: "The film, which won several awards, is highly recommended.",
    DE: "Der Film, der mehrere Preise gewonnen hat, ist sehr empfehlenswert.",
    NL: "De film, die verschillende prijzen heeft gewonnen, is zeer aan te bevelen.",
    PT: "O filme, que ganhou vários prémios, é altamente recomendado.",
    FR: "Le film, qui a remporté plusieurs prix, est fortement recommandé.",
    ES: "La película, que ganó varios premios, es muy recomendable.",
    IT: "Il film, che ha vinto diversi premi, è altamente raccomandato.",
  },
  {
    ID: 91,
    MAIN_EN: "It's possible that the meeting will be postponed.",
    DE: "Es ist möglich, dass das Treffen verschoben wird.",
    NL: "Het is mogelijk dat de vergadering wordt uitgesteld.",
    PT: "É possível que a reunião seja adiada.",
    FR: "Il est possible que la réunion soit reportée.",
    ES: "Es posible que la reunión se posponga.",
    IT: "È possibile che la riunione venga posticipata.",
  },
  {
    ID: 92,
    MAIN_EN: "He might have forgotten to bring his keys.",
    DE: "Er könnte vergessen haben, seine Schlüssel mitzubringen.",
    NL: "Hij is misschien vergeten zijn sleutels mee te nemen.",
    PT: "Ele pode ter-se esquecido de trazer as chaves.",
    FR: "Il a peut-être oublié d'apporter ses clés.",
    ES: "Podría haber olvidado traer sus llaves.",
    IT: "Potrebbe aver dimenticato di portare le chiavi.",
  },
  {
    ID: 93,
    MAIN_EN: "There's a chance that the weather will improve later today.",
    DE: "Es besteht die Chance, dass sich das Wetter später heute bessert.",
    NL: "Er is een kans dat het weer later vandaag beter wordt.",
    PT: "Há uma hipótese de o tempo melhorar mais tarde hoje.",
    FR: "Il y a une chance que le temps s'améliore plus tard aujourd'hui.",
    ES: "Existe la posibilidad de que el clima mejore más tarde hoy.",
    IT: "C'è la possibilità che il tempo migliori più tardi oggi.",
  },
  {
    ID: 94,
    MAIN_EN: "She could be working late at the office.",
    DE: "Sie könnte spät im Büro arbeiten.",
    NL: "Ze zou laat op kantoor kunnen werken.",
    PT: "Ela pode estar a trabalhar até tarde no escritório.",
    FR: "Elle pourrait travailler tard au bureau.",
    ES: "Ella podría estar trabajando tarde en la oficina.",
    IT: "Lei potrebbe lavorare fino a tardi in ufficio.",
  },
  {
    ID: 95,
    MAIN_EN: "It's likely that they will arrive before us.",
    DE: "Es ist wahrscheinlich, dass sie vor uns ankommen werden.",
    NL: "Het is waarschijnlijk dat ze voor ons zullen aankomen.",
    PT: "É provável que eles cheguem antes de nós.",
    FR: "Il est probable qu'ils arriveront avant nous.",
    ES: "Es probable que lleguen antes que nosotros.",
    IT: "È probabile che arrivino prima di noi.",
  },
  {
    ID: 96,
    MAIN_EN: "They may have already left for the airport.",
    DE: "Sie könnten bereits zum Flughafen gefahren sein.",
    NL: "Ze zijn misschien al naar de luchthaven vertrokken.",
    PT: "Eles podem já ter partido para o aeroporto.",
    FR: "Ils sont peut-être déjà partis pour l'aéroport.",
    ES: "Es posible que ya hayan salido para el aeropuerto.",
    IT: "Potrebbero essere già partiti per l'aeroporto.",
  },
  {
    ID: 97,
    MAIN_EN: "It's uncertain whether the project will be completed on time.",
    DE: "Es ist ungewiss, ob das Projekt rechtzeitig abgeschlossen wird.",
    NL: "Het is onzeker of het project op tijd zal worden voltooid.",
    PT: "É incerto se o projeto será concluído a tempo.",
    FR: "Il est incertain que le projet soit terminé à temps.",
    ES: "Es incierto si el proyecto se completará a tiempo.",
    IT: "È incerto se il progetto sarà completato in tempo.",
  },
  {
    ID: 98,
    MAIN_EN: "He could have taken the wrong train.",
    DE: "Er könnte den falschen Zug genommen haben.",
    NL: "Hij zou de verkeerde trein kunnen hebben genomen.",
    PT: "Ele pode ter apanhado o comboio errado.",
    FR: "Il a peut-être pris le mauvais train.",
    ES: "Podría haber tomado el tren equivocado.",
    IT: "Potrebbe aver preso il treno sbagliato.",
  },
  {
    ID: 99,
    MAIN_EN: "It's probable that she will accept the invitation.",
    DE: "Es ist wahrscheinlich, dass sie die Einladung annehmen wird.",
    NL: "Het is waarschijnlijk dat ze de uitnodiging zal accepteren.",
    PT: "É provável que ela aceite o convite.",
    FR: "Il est probable qu'elle acceptera l'invitation.",
    ES: "Es probable que ella acepte la invitación.",
    IT: "È probabile che lei accetti l'invito.",
  },
  {
    ID: 100,
    MAIN_EN: "There's a possibility of rain tomorrow afternoon.",
    DE: "Es besteht die Möglichkeit, dass es morgen Nachmittag regnet.",
    NL: "Er is een kans op regen morgenmiddag.",
    PT: "Há uma possibilidade de chuva amanhã à tarde.",
    FR: "Il y a une possibilité de pluie demain après-midi.",
    ES: "Existe la posibilidad de lluvia mañana por la tarde.",
    IT: "C'è la possibilità di pioggia domani pomeriggio.",
  },
];
