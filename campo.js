const TAMANHO = 4; 
const TOTAL_BOMBAS = 5; 

let mapaOriginal = [];
let acertos = 0;
let jogoAtivo = true;
const totalNecessario = (TAMANHO * TAMANHO) - TOTAL_BOMBAS; 

const container = document.getElementById('tabuleiro');
const msgDisplay = document.getElementById('mensagem');
const contadorDisplay = document.getElementById('contador');
const btnReiniciar = document.getElementById('btn-reiniciar');


container.style.gridTemplateColumns = `repeat(${TAMANHO}, 60px)`;

function gerarMapaAleatorio() {
    mapaOriginal = [];
    
    for (let i = 0; i < TAMANHO; i++) {
        mapaOriginal[i] = new Array(TAMANHO).fill(0);
    }

    let bombasColocadas = 0;
    while (bombasColocadas < TOTAL_BOMBAS) {
        let linha = Math.floor(Math.random() * TAMANHO);
        let coluna = Math.floor(Math.random() * TAMANHO);

        if (mapaOriginal[linha][coluna] === 0) {
            mapaOriginal[linha][coluna] = 1;
            bombasColocadas++;
        }
    }
}


function criarTabuleiro() {
    gerarMapaAleatorio();
    container.innerHTML = '';
    
    for (let i = 0; i < TAMANHO; i++) {
        for (let j = 0; j < TAMANHO; j++) {
            const div = document.createElement('div');
            div.classList.add('celula');
            div.onclick = () => clicarCelula(div, i, j);
            container.appendChild(div);
        }
    }
    contadorDisplay.innerText = totalNecessario;
}

function clicarCelula(elemento, linha, coluna) {
    if (!jogoAtivo || elemento.classList.contains('revelada')) return;

    if (mapaOriginal[linha][coluna] === 1) {
        revelarBombas();
        msgDisplay.innerText = "CABOOM! Game Over!";
        msgDisplay.style.color = "red";
        jogoAtivo = false;
    } else {
        elemento.classList.add('revelada');
        elemento.innerHTML = '✔️';
        acertos++;
        
        let restantes = totalNecessario - acertos;
        contadorDisplay.innerText = restantes;

        if (acertos === totalNecessario) {
            msgDisplay.innerText = "Mestre do Campo Minado! Você venceu!";
            msgDisplay.style.color = "green";
            jogoAtivo = false;
        }
    }
}

function revelarBombas() {
    const celulas = document.querySelectorAll('.celula');
    let index = 0;
    for (let i = 0; i < TAMANHO; i++) {
        for (let j = 0; j < TAMANHO; j++) {
            if (mapaOriginal[i][j] === 1) {
                celulas[index].innerHTML = '💣';
                celulas[index].classList.add('bomba');
            }
            index++;
        }
    }
}

function reiniciar() {
    acertos = 0;
    jogoAtivo = true;
    msgDisplay.innerText = "";
    criarTabuleiro();
}

btnReiniciar.addEventListener('click', reiniciar);
criarTabuleiro();