'use strict';

//CRIA O CANVAS
//canvas é como se fosse um quadro
//substituio o flash
//o canvas tem um contexto CTX, pode ser 2d, 3d
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//IMAGEM DE FUNDO
var bgReady = false;
var bgImage = new Image();
//GERANDO O EVENTO ONLOAD - QUANDO CARREGAR - CARREGOU
//EXECUTA A FUNCAO QUE CARREGA A IMAGEM QUANDO TRUE
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = 'images/background.png';

//IMAGEM DO HEROI
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src = 'images/hero.png';

// IMAGEM DO MONSTRO
var monsterReady = false;
var monsterImage = new Image();

monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src = 'images/monster.png';

//OBJETOS DO JOGO
var hero = {
  speed: 256 // movimento em pixels por segundo
};
//const nao vai alterar valor
var monster = {};
//let vai alterar valor
var monsterCaught = 0;

//CONTROLE DO TECLADO
var keysDown = {};
//window é o escopo global, a ultima instancia, janela inteira
window.addEventListener('keydown', function (e) {
  keysDown[e.KeyCode] = true; //recebendo comando
}, false); //nao recebendo comando

window.addEventListener('keyup', function (e) {
  delete keysDown[e.KeyCode];
}, false);

//RESETA QUANDO O JOGADOR PEGA O MONSTRO
//Y vertical
//X horizontal
var reset = function reset() {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  //Posiciona o monstro randomicamente na tela
  monster.x = 32 + Math.random() * (canvas.width - 64);
  monster.y = 32 + Math.random() * (canvas.height - 64);
};

//ATUALIZA OS OBJETOS DO JOGO
var update = function update(modifier) {
  if (38 in keysDown) {
    //pressionando a seta pra cima
    hero.y -= hero.speed * modifier;
  }
  if (40 in keysDown) {
    //pressionando a seta pra baixo
    hero.y += hero.speed * modifier;
  }
  if (37 in keysDown) {
    //pressionando a seta pra esquerda
    hero.x -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    //pressionando a seta pra direita
    hero.x += hero.speed * modifier;
  }
  //os personagens se enconstaram?
  if (hero.x <= monster.x + 32 && monster.x <= hero.x + 32 && hero.y <= monster.y + 32 && monster.y <= hero.y + 32) {
    ++monsterCaught;
    reset();
  }
};
//RENDERIZA TUDO
var render = function render() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImage, monster.x, monster.y);
  }
  //Pontuação
  ctx.fillStyle = 'rgb(250, 250, 250)';
  ctx.font = '24px Helvetica';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText('Monstros pegos: ' + monsterCaught, 32, 32);
};
//Controla o loop do jogo
var main = function main() {
  var now = Date.now();
  var delta = now - then;

  update(delta / 1000);
  render();

  then = now;

  //EXECUTA ISSO O MAIS BREVE POSSIVEL
  requestAnimationFrame(main);
};
var w = window;
var requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now(); //300000
reset();
main();
