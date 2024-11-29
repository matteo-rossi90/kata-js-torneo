const fighters = [
    {
        name: 'Freezer',
        power: 8000
    },
    {
        name: 'Vegeta',
        power: 8500
    },
    {
        name: 'Crilin',
        power: 500
    },
    {
        name: 'Mr Satan',
        power: 50
    },
    {
        name: 'Junior',
        power: 6000
    },
    {
        name: 'Goku',
        power: 9001
    },
    {
        name: 'Tensing',
        power: 450
    },
    {
        name: 'Videl',
        power: 300
    },
    {
        name: 'Bulma',
        power: 20
    },
    {
        name: 'C-18',
        power: 7800
    },
    {
        name: 'Gohan',
        power: 8900
    },
    {
        name: 'Trunks',
        power: 1250
    }
];

const weapons = [
    {
        name: "Ventaglio della Musa",
        power: 15
    },
    {
        name: "Scouter",
        power: 30
    },
    {
        name: "Bastone Roshi",
        power: 60
    },
    {
        name: "Fagioli Magici",
        power: 70
    },
    {
        name: "Katana di Yajirobei",
        power: 85
    },
    {
        name: "Spada del Dragone Azzurro",
        power: 115
    },
    {
        name: "Armatura Saiyan",
        power: 145
    },
    {
        name: "Cannone da braccio",
        power: 170
    },
    {
        name: "Nuvola d'oro",
        power: 200
    },
    {
        name: "Bastone Nyoi",
        power: 220
    },
    {
        name: "Spada Z",
        power: 235
    },
    {
        name: "Orecchini Potara",
        power: 250
    }
];

/*
Milestone 1 - ogni combattente sceglierà casualmente un'arma dalla relativa lista.
Una volta scelta, un'arma non sarà più disponibile per i successivi combattenti.
*/

/*
Milestone 2 - ogni combattente si sottoporrà ad un allenamento che incrementerà (o forse no) la sua potenza, 
moltiplicandola per un numero casuale tra 1 e 100.
*/

/*
Milestone 3 - escludiamo dal torneo chi, dopo l'allenamento non è riuscito a raggiungere una potenza di almeno 2000.
*/

/*
Milestone 4 - i combattimenti si svolgeranno tra un partecipante e il successivo dell'elenco, assicurandosi che ognuno combatta una sola volta. 

In ogni scontro vincerà il combattente con la potenza più alta. In caso di parità vincerà chi "gioca in casa", ossia chi viene prima nell'elenco.
*/

// stabilire un array vuoto che conterrà i guerrieri e l'arma scelta
const armedFighters = []
const weaponsList = []

// inizializzare un ciclo for per inserire ogni guerriero nel nuovo array
for(let i = 0; i < fighters.length; i++){
    armedFighters.push(fighters[i])
}

for(let i = 0; i < weapons.length; i++){
    weaponsList.push(weapons[i])
}

// associare al guerriero una nuova proprietà chiamata "weapon" e corrispondente all'arma scelta presente nel secondo array
armedFighters.forEach(fighter => {
    const randomIndex = getRandomIndex(weaponsList); // funzione richiamata per generare un indice casuale per ogni arma
    const training = getNumber(1, 100) // genera un numero casuale tra 1 e 100
    fighter.weapon = weaponsList[randomIndex]; // inserimento della nuova proprietà "weapon"
    fighter.training = training // aggiungere il risultato dell'allenamento
    fighter.power = fighter.power * training;  // incremento del potere grazie all'allenamento
    weaponsList.splice(randomIndex, 1); // rimozione dell'arma una volta associata
});

console.log('Armi:', weapons)
console.log('Armi scelte:', weaponsList)
console.log('Guerrieri con armi:', armedFighters)

// includere solo gli eroi che con l'allenamento hanno raggiunto una forza superiore a 2000
let qualified = armedFighters.filter(f => f.power >= 2000)

if(qualified.length % 2 === 1){
    qualified.push({
        name: 'Robot',
        power: 4000
    })
}

console.log('Si qualificano: ', qualified)

//stabilire il successo degli scontri in base alla potenza
let nextRound = [];

for(let i = 0; i < qualified.length; i+=2){
    let fighter1 = qualified[i]
    let fighter2 = qualified[i + 1]    
    
    if (fighter2) {
        const result = compareFighters(fighter1, fighter2);
        if (result.winner) {
            console.log(`Vince il turno: ${result.winner.name}, sconfiggendo ${result.loser.name}`);
            nextRound.push(result.winner);
            console.log(result)
        } else {
            console.log(`${fighter1.name} e ${fighter2.name} sono pari!`);
            nextRound.push(fighter1, fighter2)
        }
    } 
      
}
qualified = nextRound;
console.log(nextRound)

/////////////////// FUNZIONI ///////////////////////////

//funzione che permette di generare un numero indice casuale in base alla lunghezza dell'array
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
} 

//funzione che genera un numero random da un minimo a un massimo
function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function compareFighters(fighter1, fighter2) {
    if (!fighter1 || !fighter2) return null; 

    if (fighter1.power > fighter2.power) {
        return { winner: fighter1, loser: fighter2, isDraw: false };
    } else if (fighter1.power < fighter2.power) {
        return { winner: fighter2, loser: fighter1, isDraw: false };
    } else {
        return { winner: null, loser: null, isDraw: true };
    }
}
