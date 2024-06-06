class Card {
    constructor(texto, enlaceImagen, enlaceIconoEliminar, selectorPlantilla) {
      this.texto = texto;
      this.enlaceImagen = enlaceImagen;
      this.enlaceIconoEliminar = enlaceIconoEliminar;
      this.plantilla = document.querySelector(selectorPlantilla).content.cloneNode(true);
      this._elementoCard = this.plantilla.querySelector('.content__grid-card');
      this._inicializarCard();
    }

    // Método privado para inicializar la tarjeta con los datos proporcionados
    _inicializarCard() {
      this._agregarDatos();
      this._agregarEventListeners();
    }

    // Método privado para agregar los datos a la tarjeta
    _agregarDatos() {
      this._elementoCard.querySelector('.content__grid-card-name').textContent = this.texto;
      this._elementoCard.querySelector('.content__grid-image').src = this.enlaceImagen;
      this._elementoCard.querySelector('.content__grid-image-delete').src = this.enlaceIconoEliminar;

    }

    // Método privado para agregar detectores de eventos
    _agregarEventListeners() {
      const botonLike = this._elementoCard.querySelector('.content__grid-like');
      botonLike.addEventListener('click', this._handleLikeClick.bind(this));

      const iconoEliminar = this._elementoCard.querySelector('.content__grid-image-delete');
      iconoEliminar.addEventListener('click', this._handleDeleteClick.bind(this));

      const imagen = this._elementoCard.querySelector('.content__grid-image');
      imagen.addEventListener('click', this._handleClickImage.bind(this));
    }

    // Método privado para manejar el evento de click en el botón de like
    _handleLikeClick(evt) {
      evt.target.classList.toggle('content__grid-like-active');
    }

    // Metodo privado para manejar el evento de click en el icono de eliminar
    _handleDeleteClick(evt){
        const elemento = evt.currentTarget.parentNode;
        elemento.remove();
    }

    // Metodo privado para mostrar la imagen como poster
    _handleClickImage(evt){

      const gridContainer = document.querySelector('.grid');
      const posterContainer = document.querySelector('.content__grid-poster');
      const posterButton = posterContainer.querySelector('.content__grid-poster-close');

      posterButton.addEventListener('click', function(){
        posterContainer.classList.remove('content__grid-poster-enabled');
      });
      const image = evt.target.getAttribute('src');
      const name = evt.target.parentElement.querySelector('.content__grid-card-name').textContent;
      const posterImageElement = gridContainer.querySelector('.content__grid-poster-image');
      const posterNameElement = gridContainer.querySelector('.content__grid-poster-name');
      posterImageElement.src = image;
      posterImageElement.alt = name;
      posterNameElement.textContent = name;
      posterContainer.classList.add('content__grid-poster-enabled');
      //posterContainer.querySelector('.content__grid-poster-overlay').addEventListener('click',closeModal);

    }

    // Método público que devuelve el elemento card completamente funcional y lleno de datos
    obtenerElementoCard() {
      return this._elementoCard;
    }
  }

export default Card;