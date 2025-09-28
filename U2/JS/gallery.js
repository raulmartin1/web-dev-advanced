function Gallery(gallery) {
  // verifica si la galería existe, si no, lanza un error
  if (!gallery) {
    throw new Error('No gallery found!');
  }
  // selecciona los elementos del DOM que el código JS necesitará
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  // maneja clics fuera del modal
  function handleClickOutside(e) {
    // e.target -> elemento donde el usuario hizo clic
    // e.currentTarget -> elemento al que está ligado el listener
    // currentTarget es el elemento "modal" (tiene el listener).
    // la forma del "modal" es TODA LA PANTALLA.
    // dentro del "modal" hay "button", "p", "img"...
    // si se hace clic en esos elementos, serán el "e.target".
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  // maneja eventos de teclado
  function handleKeyUp(e) {
    if (e.key === 'Escape') return closeModal();
    if (e.key === 'ArrowRight') return showNextImage();
    if (e.key === 'ArrowLeft') return showPrevImage();
    // nota: usamos return antes de la llamada a la función como un break
  }

  // abre el modal
  function openModal() {
    console.info('abriendo modal');
    // primero verifica si el modal ya está abierto
    if (modal.matches('.open')) {
      console.info('modal ya abierto');
      return; // detiene la ejecución de la función
    }
    // agrega el estilo CSS "open" que da "opacity: 1"
    // -> el modal "aparece" en la pantalla
    modal.classList.add('open');
    // listeners de eventos que se activan al abrir el modal
    modal.addEventListener('click', handleClickOutside);
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  // cierra el modal
  function closeModal() {
    // elimina el estilo CSS que da "opacity: 1"
    modal.classList.remove('open');
    // elimina los listeners de eventos cuando el modal se cierra
    modal.removeEventListener('click', handleClickOutside);
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  // muestra una imagen en el modal
  function showImage(image) {
    if (!image) {
      console.info('no hay imagen para mostrar');
      return;
    }
    // actualiza el modal con la imagen seleccionada
    // todos los datos están en el elemento "gallery" del HTML
    modal.querySelector('img').src = image.src;
    modal.querySelector('h2').textContent = image.title;
    // uso de atributos de datos -> cualquier elemento cuyo nombre de atributo
    // comience con "data-" es un atributo de datos -> "data-description"
    modal.querySelector('figure p').textContent = image.dataset.description;
    currentImage = image;
    openModal();
  }

  // muestra la siguiente imagen
  function showNextImage() {
    // los DOMs están organizados jerárquicamente. usamos el método
    // "nextElementSibling" para obtener el elemento DOM hermano del
    // elemento DOM almacenado en "currentImage"
    // si no existe, usamos "firstElementChild" para obtener
    // el primer elemento hijo del elemento DOM "gallery"
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  // muestra la imagen anterior
  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  // agrega listeners a todas las imágenes
  images.forEach(image => image.addEventListener('click', e => {
    showImage(e.currentTarget);
  }));

  images.forEach(image => image.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
      showImage(e.currentTarget);
    }
  }));
}

// ejecuta el código JS
const gallery = Gallery(document.querySelector('.gallery'));