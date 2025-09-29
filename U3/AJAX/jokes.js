const jokeButton = document.querySelector('.getJoke');
// selecciona el botón para obtener chistes

const jokeHolder = document.querySelector('.joke p');
// selecciona el elemento donde se muestra el chiste

const jokeButtonSpan = jokeButton.querySelector('.jokeText');
// selecciona el texto dentro del botón

const loader = document.querySelector('.lds-dual-ring');
// selecciona el indicador de carga

const buttonText = [
 'Ugh.',
 'omg dad.',
 'seriously',
 'stop it.',
 'please stop',
 'that was the worst one',
];
// array con textos para el botón

function randomItemFromArray(arr, not) {
 const item = arr[Math.floor(Math.random() * arr.length)];
 // elige un elemento aleatorio del array
 if (item === not) {
  console.log('we used that one last time, look again');
  return randomItemFromArray(arr, item); // recursividad si es el mismo elemento
 }
 return item;
}

async function fetchJoke() {
 const response = await fetch('https://icanhazdadjoke.com/', {
  headers: {
   Accept: 'application/json',
  },
 });
 // pide un chiste a la api en formato json
 const joke = await response.json();
 // convierte la respuesta a objeto json
 console.log(joke);
 return joke;
}

async function handleClick() {
 loader.classList.remove('hidden'); // muestra el indicador de carga
 const { joke } = await fetchJoke();
 // obtiene solo el campo "joke" del objeto
 loader.classList.add('hidden'); // oculta el indicador de carga
 jokeHolder.textContent = joke;
 // muestra el chiste en el elemento
 jokeButtonSpan.textContent = randomItemFromArray(buttonText, jokeButtonSpan.textContent);
 // cambia el texto del botón aleatoriamente
}

jokeButton.addEventListener('click', handleClick);
// agrega un listener al botón para ejecutar handleClick al hacer clic