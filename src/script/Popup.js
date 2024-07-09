class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.setEventListeners();

    this._popupSaveButton = this._popup.querySelector(".popup__window-form-button");
    this._popupCloseButton = this._popup.querySelector(".popup__close");
  }

  // Método público para abrir el popup
  open() {
    this._popup.classList.add('popup__enabled');
    this._popup.querySelector(".popup__overlay").addEventListener("click", this._closeModal);
    this._popupSaveButton.disabled = true;
    document.addEventListener('keydown', this._handleEscClose);
  }

  // Método público para cerrar el popup
  close() {
    this._popup.classList.remove('popup__enabled');
    this._popup.querySelector(".popup__overlay").removeEventListener("click", this._closeModal);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  // Método privado para cerrar el popup al hacer clic en el overlay
  _closeModal() {
    this.close();
  }

  // Método privado para manejar el cierre del popup al pulsar la tecla Esc
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Método público para agregar los event listeners
  setEventListeners() {
    // Event listener para el icono de cerrar
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    // Event listener para el área sombreada del popup
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup')) {
        this.close();
      }
    });
  }
}

export default Popup;
