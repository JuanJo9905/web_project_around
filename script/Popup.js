class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.setEventListeners();
  }

  // Método público para abrir el popup
  open() {
    this._popup.classList.add('popup_enabled');
    document.addEventListener('keydown', this._handleEscClose);

    const popupWindow = this._popup.querySelector(".popup__window");
    const popupButton = this._popup.querySelector(".popup__close");
    popupWindow.classList.add("popup__window-enabled");
    popupButton.classList.add("popup__close-enabled");
  }

  // Método público para cerrar el popup
  close() {
    this._popup.classList.remove('popup_enabled');
    document.removeEventListener('keydown', this._handleEscClose);

    const popupWindow = this._popup.querySelector(".popup__window");
    const popupButton = this._popup.querySelector(".popup__close");
    popupWindow.classList.remove("popup__window-enabled");
    popupButton.classList.remove("popup__close-enabled");
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
