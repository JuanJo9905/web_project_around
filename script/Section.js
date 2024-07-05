class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    // Método para renderizar todos los elementos en la página
    renderItems() {
      this._items.forEach(item => {
        this._renderer(item, this._container);
      });
    }
  
    // Método para añadir un nuevo elemento al contenedor
    addItem(element) {
      this._container.appendChild(element);
    }
  }
  
  // Ejemplo de uso
  
  // Función renderer de ejemplo
  function createCard(item, container) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = item;
    container.appendChild(card);
  }
  
  // Datos de ejemplo
  const items = ['Item 1', 'Item 2', 'Item 3'];
  
  // Inicialización de la clase Section
  const section = new Section({ items, renderer: createCard }, '.card-container');
  
  // Renderizar todos los elementos
  section.renderItems();
  
  // Añadir un nuevo elemento de ejemplo
  const newItem = document.createElement('div');
  newItem.classList.add('card');
  newItem.textContent = 'New Item';
  section.addItem(newItem);
  