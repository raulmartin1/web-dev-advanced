// obtener los elementos del dom que serán usados por el código js
const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');
// necesitamos un array para almacenar nuestro estado
let items = [];
// función que se activa cuando el usuario agrega un elemento al carrito
function handleSubmit(e) {
 // los formularios envían datos a urls.
 // nuestro js manejará todo, por lo que deshabilitamos el envío del formulario
 e.preventDefault();

 // e.currentTarget -> el elemento al que está vinculado el evento
 // uso del atributo "name=item" en el formulario:
 // el atributo name se usa para referenciar elementos
 // en js o para referenciar datos del formulario después de enviarlo
 const name = e.currentTarget.item.value;

 // si está vacío, no lo envíes
 if(!name) return;

 // objeto item que se almacenará en el carrito de compras
 const item = {
     name: name,
     id: Date.now(), // usa date para crear un id único
     complete: false
 };
 // agregar el elemento al estado
 items.push(item);
 console.log(`ahora hay ${items.length} en tu estado`);
 // limpiar el formulario
 e.currentTarget.reset();
 // disparar un evento personalizado que informará a quien le interese
 // que los elementos han sido actualizados
 list.dispatchEvent(new CustomEvent('itemsUpdated', {bubbles: true}));
}
// función que se activa para repintar todos los elementos en el carrito
function displayItems() {
 const html = items.map(item => { 
     return `<li class="shopping-item">
 <input
     type="checkbox"
     id="${item.id}"
     ${item.complete ? 'checked' : ''}
 >
 <span class="itemName">${item.name}</span>
 <button
     aria-label="eliminar ${item.name}"
     id="${item.id}"
     >&times;
 </button>
 </li>`
 }).join(''); // map devuelve un array, necesitamos un string

 console.log(html);
 list.innerHTML = html;
}
// agregar un listener para manejar cuando el usuario agrega un elemento
shoppingForm.addEventListener('submit', handleSubmit);
// agregar un listener para capturar el evento personalizado y repintar el carrito
list.addEventListener('itemsUpdated', displayItems);

function deleteItem(id) {
 console.log('eliminando elemento', id);
 // filter() -> los elementos que devuelven true van a "newItems"
 const newItems = items.filter(item => {
 return item.id !== parseInt(id);
 });
 items = newItems;
 list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
function markAsComplete(id) {
 console.log('marcando como completo', parseInt(id));
 // find() -> encuentra el elemento marcado por su id
 const itemRef = items.find(item => {
 return item.id === parseInt(id);
 });
 itemRef.complete = !itemRef.complete; // niega el valor booleano actual
 list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// agregar un listener al elemento del dom "ul" donde se renderizan los elementos
list.addEventListener('click', e => {
 // e.target -> el elemento en el que el usuario hizo clic
 // e.currentTarget -> el elemento al que está vinculado el listener
 if(e.target.matches('button')) {
 deleteItem(e.target.id);
 }
 if(e.target.matches('input[type="checkbox"]')) {
 markAsComplete(e.target.id);
 }
});

function mirrorToLocalStorage() {
 localStorage.setItem('items', JSON.stringify(items));
}
function restoreFromLocalStorage() {
 const lsItems = JSON.parse(localStorage.getItem('items'));
 if (lsItems && lsItems.length) {
 lsItems.forEach(item => items.push(item));
 list.dispatchEvent(new CustomEvent('itemsUpdated'));
 }
}

// agregar un listener para capturar el evento personalizado y almacenar los nuevos datos
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// recuperar los datos almacenados en local storage
restoreFromLocalStorage();