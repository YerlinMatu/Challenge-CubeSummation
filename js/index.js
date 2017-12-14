/*
  Author: Yerlinson Maturana 
  Github : Yerlin Matu
*/

let app = new Vue({
    el: 'main', 
    data: {
      info: '',
      logo: 'https://ubidots.com/img/logo.png',
      sound: 'http://soundbible.com/mp3/Pop%20Cork-SoundBible.com-151671390.mp3',
      pop_sound: undefined
    },
    methods: {
      DeleteData() {
        pop_sound = new Audio();
        pop_sound.src = this.sound;
        pop_sound.load();
        pop_sound.play();
        this.info = '';
        $('#output, #error').html('');    
      },
      Run() {
        Setup(this.info);
      }
   }
});


function Setup(input) {
  try {
    if (document) $('#output').innerText += '';
    let inputArray = input.split('\n');
    if (inputArray.length < 3) throw new Error('Estás instrucciones no son validas.');
    let lineUpdate = 0;
    let occurrences = parseInt(inputArray[lineUpdate++]);

    for (let occurrence = 0; occurrence < occurrences; occurrence++) {
      let info_Ocurrence = inputArray[lineUpdate++].split(' ').map((n) => parseInt(n));
      let size = info_Ocurrence[0];
      let operaciones = info_Ocurrence[1];
      let matriz = makeMatriz(size);
      for (let operation = 0; operation < operaciones; operation++) {
        let operation = inputArray[lineUpdate++];
        RunOperaction(operation, matriz);
      }
    }
  } catch(err) {
    console.error(err);
    if (document) $('#error').html(err);
  }
}

function makeMatriz(size) {
  let matriz = [];
  for (let i = 0; i < size; i++) {
    matriz[i] = [];
    for (let j = 0; j < size; j++) {
      matriz[i][j] = [];
      for (let k = 0; k < size; k++) {
        matriz[i][j][k] = 0;
      }
    }
  }
  return matriz
}

function  RunOperaction(operation, matriz) {
  let operacionArray = operation.split(' ');
  let typeQuest = operacionArray[0];
  if (typeQuest === 'UPDATE') {
    RunUpdate(operacionArray, matriz);
  } else if (typeQuest === 'QUERY') {
    runQuery(operacionArray, matriz);
  } else {
    throw new Error('No se puede ejecutar esta operación. :(');
  }
}

function RunUpdate(values, matriz) {
  const coord = {
    x: parseInt(values[1]) - 1,
    y: parseInt(values[2]) - 1,
    z: parseInt(values[3]) - 1
  }
  const value_result = parseInt(values[4]);
  matriz[coord.x][coord.y][coord.z] = value_result;
}

function View(info_text) {
  if (document) document.querySelector('#output').innerText += info_text + '\n';
}

function runQuery (values, matriz) {
  const coorBegin = {
    x: parseInt(values[1]) - 1,
    y: parseInt(values[2]) - 1,
    z: parseInt(values[3]) - 1
  }
  const coordEnd = {
    x: parseInt(values[4]) - 1,
    y: parseInt(values[5]) - 1,
    z: parseInt(values[6]) - 1
  }
  let sum = 0;
  for (let x = coorBegin.x; x <= coordEnd.x; x++) {
    for (let y = coorBegin.y; y <= coordEnd.y; y++) {
      for (let z = coorBegin.z; z <= coordEnd.z; z++) {
        sum += matriz[x][y][z];
      }
    }
  }
  View(sum);
}
