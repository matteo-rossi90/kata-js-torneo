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

/*
tra tutti i vincitori degli scontri, saliranno sul podio i 3 combattenti con la potenza più alta, in ordine decrescente.

**Bonus:**

Il torneo non finisce qui! Dopo il primo girone di scontri, non passiamo subito alla premiazione, ma facciamo in modo che i vincitori si scontrino ancora e ancora, finchè non ne resterà solo uno!*/

console.log('Fase 1 - Assegnazione arma')
// fare una copia degli oggetti originali
const armedFighters = fighters.map(fighter => ({ ...fighter })); 
const weaponsList = weapons.slice(); 

// assegnare le armi ai combattenti
armedFighters.forEach(fighter => {
    const randomIndex = getRandomIndex(weaponsList); // creare un indice casuale
    fighter.weapon = weaponsList[randomIndex]; // assegnare l'arma
    weaponsList.splice(randomIndex, 1); // rimuovere l'arma dall'elenco
});

console.log("Guerrieri armati:", armedFighters);

console.log('Fase 2 - Allenamento')

// allenare i combattenti
const trainedFighters = armedFighters.map(fighter => {
    const training = getNumber(1, 100); // genera il numero casuale che corrispone al livello di allenamento
    return {
        ...fighter, // copia tutte le proprietà da armedFighters
        training, // nuova proprietà
        power: fighter.power * training // aggiorna la potenza in base al valore dell'allenamento
    };
});

console.log("Guerrieri allenati:", trainedFighters);

console.log('Fase 3 - Qualificazione: ')

// includere solo gli eroi che con l'allenamento hanno raggiunto una forza superiore a 2000
let qualified = trainedFighters.filter(f => f.power >= 2000)

//se la lista dei qualificati è un numero dispari, genera un nuovo combattente
if(qualified.length % 2 === 1){
    qualified.push(createFighter('Robot', 4000))
}

console.log('Si qualificano: ', qualified)

console.log('Fase 4 - Combattimento')

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
        }
    
    } 
      
}

//se la lista dei vincitori è un numero dispari, genera un nuovo combattente
if(nextRound.length % 2 === 1){
    nextRound.push(createFighter('Robot', 4000))
 }

 console.log('Passano il round:', nextRound)

 console.log('Fase 5 - Premiazione')

 //stabilire i primi tre vincitori in base alla potenza
 const podium = nextRound.sort((a, b) => b.power - a.power).slice(0, 3)

 console.log('I tre vincitori del torneo sono:', podium)

 console.log('Bonus - Il torneo continua')

 // usare un array per gestire i combattenti del round corrente
 let currentFighters = nextRound.slice();
 
 while (currentFighters.length > 1) {
     console.log("Inizio del nuovo round con:", currentFighters);
 
     const nextRoundFighters = [];
 
     // se il numero dei combattenti è dispari, aggiungere un altro combattente
     if (currentFighters.length % 2 === 1) {
         currentFighters.push(createFighter('Robot', 4000));
     }
 
     // combattimenti a coppie
     for (let i = 0; i < currentFighters.length; i += 2) {
         const fighter1 = currentFighters[i];
         const fighter2 = currentFighters[i + 1];
 
         const result = compareFighters(fighter1, fighter2);
         console.log(
             `Scontro: ${fighter1.name} (potenza: ${fighter1.power}) vs ${fighter2.name} (potenza: ${fighter2.power})`
         );
 
         // aggiungere il vincitore al prossimo round
         if (result.winner) {
             console.log(`Vince: ${result.winner.name}`);
             nextRoundFighters.push(result.winner);
         }
     }
 
     // aggiornare i combattenti correnti con i vincitori
     currentFighters = nextRoundFighters;
 }
 
 // vincitore finale
 const ultimateWinner = currentFighters[0];
 console.log(`Il vincitore finale è ${ultimateWinner.name} con una potenza di ${ultimateWinner.power}!`);
 

/////////////////// FUNZIONI ///////////////////////////

//funzione che permette di generare un numero indice casuale in base alla lunghezza dell'array
function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
} 

//funzione che genera un numero random da un minimo a un massimo
function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//funzione che permette di stabilire il vincitore in base alla forza 
function compareFighters(fighter1, fighter2) {

    if (fighter1.power > fighter2.power) {
        return { 
            winner: fighter1, 
            loser: fighter2 
        };
    } else if (fighter1.power < fighter2.power) {
        return { 
            winner: fighter2,
            loser: fighter1 
        };
    } else {
        const winner = Math.random() > 0.5 ? fighter1 : fighter2;
        return { 
            winner, loser: winner === fighter1 ? fighter2 : fighter1 
        };
        
    }
}

//funzione che crea un personaggio da inserire
function createFighter(name, basePower) {
    return {
        name,
        power: basePower,
        training: 1
    };
}
