const player1 = {
NOME : "MARIO",
VELOCIDADE : 4,
MANOBRABILIDADE : 3,
PODER : 3,
PONTOS : 0,
};

const player2 = {
    NOME : "LUIGI",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}


async function powerExtra() {
    return Math.floor(Math.random()*2);
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);

}

async function playRaceEngine(character1, character2) {
for (let round = 1 ; round <= 5; round ++) {
    console.log(`🏁 Rodada ${round}`);
    let block = await getRandomBlock();
    console.log(`Bloco: ${block} `);

let diceResult1 = await rollDice();
let diceResult2 = await rollDice();
let powerp1 = await powerExtra();
let powerp2 = await powerExtra();


let totalTestSkill1 = 0;
let totalTestSkill2 = 0;

if (block === "Reta") {
    totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
    totalTestSkill2 = diceResult2 + character2.VELOCIDADE;
    await logRollResult(character1.NOME, "Velocidade", diceResult1, character1.VELOCIDADE);
    await logRollResult(character2.NOME, "Velocidade", diceResult2, character2.VELOCIDADE);
}

if (block === "Curva") {
    totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
    totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;
    await logRollResult(character1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRABILIDADE);
    await logRollResult(character2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRABILIDADE);
}

if (block === "Confronto") {
    let powerResult1 = diceResult1 + character1.PODER;
    let powerResult2 = diceResult2 + character2.PODER;
    let powerResult3 = powerp1;
    let powerResult4 = powerp2;

    console.log(`${character1.NOME} Confrontou com ${character2.NOME}! 🥊`);

    await logRollResult(character1.NOME, "Poder", diceResult1, character1.PODER);
    await logRollResult(character2.NOME, "Poder", diceResult2, character2.PODER);

    if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        console.log(`${character1.NOME} Venceu o Confronto! ${character2.NOME} Perdeu um Ponto 🍄`);
        character2.PONTOS --;
    }

    if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        console.log(`${character2.NOME} Venceu o Confronto! ${character1.NOME} Perdeu um Ponto 🍄`);
        character1.PONTOS --;
    }

    if (powerResult3 > powerResult4) {
        console.log(`${character1.NOME} Recebeu um ponto Extra ♥`);
        character1.PONTOS ++;
    }

    if (powerResult4 > powerResult3) {
        console.log(`${character2.NOME} Recebeu um ponto Extra ♥`);
        character2.PONTOS ++;
    }

    if (powerResult4 === powerResult3) {
        console.log("Nenhum jogador recebeu pontos extras!");
    }

   // character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0;
   // character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0;
    console.log(powerResult1 === powerResult2 ? "Empate: Nenhum Ponto foi Perdido!" :  "");

}

if (totalTestSkill1 > totalTestSkill2) {
    console.log(`${character1.NOME} Marcou um Ponto!`);
    character1.PONTOS ++;
} else if (totalTestSkill2 > totalTestSkill1) {
    console.log(`${character2.NOME} Marcou um Ponto!`);
    character2.PONTOS ++;
} else {
   // console.log(`${character1.NOME} e ${character1.NOME} Empatou!`);
}

console.log("_________________________________________");
}


}

async function getRandomBlock() {
   let random = Math.random();
   let result 
   switch (true) {
   case random < 0.33 :
    result = "Reta";
    break;
   case random < 0.66 :
    result = "Curva";
    break;
    default :
    result = "Confronto";
   }
   return result;
}

async function declareWinner(character1, character2) {
    console.log("Resultado Final: \n");
    console.log(`${character1.NOME} : ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME} : ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n ${character1.NOME} Venceu a Corrida! Parabéns🥇`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n ${character2.NOME} Venceu a Corrida! Parabéns🥇`);
    } else {
        console.log("A corrida terminou empatada!");
    }
}

(async function main() {
    console.log(`🏁 🚗 Começou a Corrida entre ${player1.NOME}  e ${player2.NOME} \n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);

})();

