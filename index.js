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


function handleDrop(event) {
    event.preventDefault(); // Evita el comportamiento por defecto del navegador [30]

    // Lógica para limpiar la previsualización (ver Cap. 11)

    if (sourceContainer && draggedElement) {
        // 1. Eliminar el elemento del contenedor original
        sourceContainer.removeChild(draggedElement);

        // 2. Recuperar el source de la imagen transferida
        const source = event.dataTransfer.getData('text/plain');

        // 3. Crear el nuevo elemento en la posición de destino
        const imageElement = createItem(source);

        // 4. Añadirlo al contenedor actual (donde se soltó)
        event.currentTarget.appendChild(imageElement);
    }
}


function handleDragOver(event) {
    event.preventDefault(); // Esencial para que Drop funcione [27]
    const currentTarget = event.currentTarget;

    // Evita el evento si arrastramos dentro del mismo contenedor de origen
    if (sourceContainer === currentTarget) {
        return;
    }

    // Añadir la clase de estilo
    currentTarget.classList.add('drag-over');
    // ... Lógica de previsualización (ver Cap. 11) ...

    // Dentro de handleDragOver(event):
    const dragPreview = midQuery('.drag-preview'); // Busca si ya existe una preview [35]

    if (draggedElement && !dragPreview) {
        // Si estamos arrastrando un elemento y no hay preview, la creamos
        const previewElement = draggedElement.cloneNode(true);
        previewElement.classList.add('drag-preview');
        currentTarget.appendChild(previewElement);
    }

    // Lógica de Eliminación (dentro de handleDragLeave y handleDrop):
    if (dragPreview) {
        dragPreview.remove();
    }
}

function handleDragLeave(event) {
    // Remover la clase de estilo
    event.currentTarget.classList.remove('drag-over');
    // ... Lógica para remover la previsualización (ver Cap. 11) ...
}


// Función reutilizable para crear ítems a partir de una lista de archivos
function useFilesToCreateItems(files) {
    // Array.from transforma el FileList (que no es un Array real) en un Array iterable [38]
    Array.from(files).forEach(file => {
        // ... (Lógica de FileReader y creación de item del Cap. 6) ...
    });
}

// Se llama a esta función desde el listener del input 'change'
imageInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        useFilesToCreateItems(files);
    }
});


const resetTierButton = midQuery('.reset-tier-button');

resetTierButton.addEventListener('click', () => {
    // Selecciona todas las imágenes que están en los niveles (items ya colocados)
    const placedItems = midQuery('.tier .item-image', true); [40]

    placedItems.forEach(item => {
        // 1. Eliminar del nivel actual
        item.remove(); [41]
        
        // 2. Volver a añadir a la sección de items (contenedor inicial)
        selectorItemsSection.appendChild(item); [41]
    });
});