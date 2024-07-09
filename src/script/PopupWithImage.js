class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup_opened')) {
        this.close();
      }
    });
  }
}

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.popup__image');
    this._captionElement = this._popupElement.querySelector('.popup__caption');
  }

  open(link, name) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._captionElement.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
