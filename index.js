const midQuery = (selector, all = false) => {
    return all
        ? document.querySelectorAll(selector)
        : document.querySelector(selector);
};

// Función que crea el elemento de imagen
const createItem = (source) => {
    const imageElement = document.createElement('img');
    imageElement.src = source;
    imageElement.className = 'item-image';
    imageElement.draggable = true; // Habilitado para Drag and Drop [20]
    // ... Se añaden listeners de dragStart y dragEnd (ver Cap. 7) ...
    return imageElement;
};

// Listener para el input de archivos (para cargar imágenes)
imageInput.addEventListener('change', (event) => {
    const files = event.target.files;
    // ... Lógica para usar los archivos y crear items (ver Cap. 12) ...
});

// Lógica de lectura de archivo (dentro del manejo del archivo individual)
const reader = new FileReader();
reader.readAsDataURL(file); // Lee el archivo como una URL de datos binarios [17]
reader.onload = (eventReader) => {
    const source = eventReader.target.result;
    const imageElement = createItem(source);
    selectorItemsSection.appendChild(imageElement); // Añade la imagen a la sección [18]
};