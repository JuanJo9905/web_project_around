import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);  // Llamada al constructor de la clase padre Popup
    this._handleFormSubmit = handleFormSubmit;  // Guardar el callback de envío del formulario
    this._form = this._popup.querySelector('.popup__form');  // Seleccionar el formulario dentro del popup
    this._inputList = this._form ? this._form.querySelectorAll('.popup__input') : [];  // Seleccionar todos los inputs del formulario
  }
  // Método para obtener los valores de los inputs del formulario
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  // Método para añadir event listeners
  setEventListeners() {
    super.setEventListeners();
    if (this._form) {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
      });
    } else {
      console.log('Form element is not found.');
    }
  }

  // Método para cerrar el popup y resetear el formulario
  close() {
    super.close();
    if (this._form) {
      this._form.reset();
    }
  }
}

export default PopupWithForm;
