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


let draggedElement = null; // Elemento que se está moviendo [20]
let sourceContainer = null; // Contenedor original del elemento [20]

// Se asignan los listeners dentro de la función createItem:
// imageElement.addEventListener('dragstart', handleDragStart); [20]
// imageElement.addEventListener('dragend', handleDragEnd); [20]

function handleDragStart(event) {
    draggedElement = event.target; // El elemento arrastrado [21]
    sourceContainer = draggedElement.parentElement; // El padre original [21]
    
    // Transferir datos: el source de la imagen
    event.dataTransfer.setData('text/plain', draggedElement.src); // Guarda el source para el Drop [22, 23]
}

function handleDragEnd() {
    // Limpiar variables al terminar el arrastre
    draggedElement = null;
    sourceContainer = null;
    // ... Lógica para limpiar el 'drag-preview' (ver Cap. 11) ...
}


const rows = midQuery('.row', true);
const containers = [...rows, selectorItemsSection]; // Incluye las filas y la sección de items [26]

containers.forEach(container => {
    container.addEventListener('drop', handleDrop); // Cuando se suelta el elemento [25]
    container.addEventListener('dragover', handleDragOver); // Cuando se pasa por encima [25]
    container.addEventListener('dragleave', handleDragLeave); // Cuando se sale [25]
});