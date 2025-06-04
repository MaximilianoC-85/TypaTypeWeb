// Variables de botones y paneles (Filtro)
const btnFiltrar = document.querySelector('.btn-filtrar');
const btnFiltrarActivo = document.querySelector('.btn-filtrar-activo');
const filtroPanel = document.querySelector('.filtro-panel');
const panelContenido = document.querySelector('aside.panel');

// Funciones de abrir y cerrar filtro
function abrirFiltro() {
  if (!filtroPanel || !btnFiltrarActivo || !btnFiltrar || !panelContenido) return;
  filtroPanel.classList.remove('oculto');
  btnFiltrarActivo.classList.add('visible');
  btnFiltrar.classList.add('menu-activo');
  panelContenido.classList.add('opaco');
}

function cerrarFiltro() {
  if (!filtroPanel || !btnFiltrarActivo || !btnFiltrar || !panelContenido) return;
  filtroPanel.classList.add('oculto');
  btnFiltrarActivo.classList.remove('visible');
  btnFiltrar.classList.remove('menu-activo');
  panelContenido.classList.remove('opaco');
}

// Listeners filtro
if (btnFiltrar) btnFiltrar.addEventListener('click', abrirFiltro);
if (btnFiltrarActivo) btnFiltrarActivo.addEventListener('click', cerrarFiltro);

// Cerrar filtro al hacer clic fuera (sin afectar paneles color)
document.addEventListener('click', function (event) {
  if (!filtroPanel || !btnFiltrarActivo || !btnFiltrar) return;

  const clickDentroFiltro = filtroPanel.contains(event.target);
  const clickEnBtnActivo = btnFiltrarActivo.contains(event.target);
  const clickEnBtnBlanco = btnFiltrar.contains(event.target);

  if (!clickDentroFiltro && !clickEnBtnActivo && !clickEnBtnBlanco) {
    if (!filtroPanel.classList.contains('oculto')) {
      cerrarFiltro();
    }
  }
});
/*--------------------------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------*/
// Variables de botones y paneles (Muestra)
document.querySelectorAll('.muestra').forEach(muestra => {
  const texto = muestra.querySelector('.selector-texto');
  const slider = muestra.querySelector('.slider-tamano');
  const input = muestra.querySelector('.input-tamano');
  const panelTexto = muestra.querySelector('.color-panel-texto');
  const panelFondo = muestra.querySelector('.color-panel-fondo');
  const btnTexto = muestra.querySelector('.btn-color-texto');
  const btnFondo = muestra.querySelector('.btn-color-fondo');
  const cuerpoLink = muestra.querySelector('.toggle-cuerpo');
  const panelCuerpo = muestra.querySelector('.panel-cuerpo');
  const btnparrafo = muestra.querySelector('.btn1');
  const panelAlineacion = muestra.querySelector('.panel-alineacion');

  // Editar texto
  texto.addEventListener('click', function () {
    this.setAttribute('contenteditable', 'true');
    this.focus();
  });

  texto.addEventListener('input', function () {
    const maxChars = this.dataset.state === 'largo' ? 1500 : 300;
    if (this.textContent.length > maxChars) {
      this.textContent = this.textContent.slice(0, maxChars);
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(this);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  texto.addEventListener('blur', function () {
    this.removeAttribute('contenteditable');
  });

  // Cambiar entre texto corto/largo
  if (btnparrafo) {
    btnparrafo.addEventListener('click', function () {
      const textoLargo = `La tipografía no es solo una cuestión estética: es una herramienta fundamental para comunicar con claridad, intención y personalidad. Cada elección tipográfica transmite un tono distinto, ya sea a través del grosor del trazo, la altura de las x, el contraste entre astas o la forma de sus remates. Una buena tipografía puede reforzar el mensaje, guiar la lectura y generar una experiencia visual armónica. Entre serif y sans serif, romanas, geométricas, humanistas o grotescas, hay un mundo de decisiones posibles, cada una con sus matices. El interletrado, la interlínea y el ancho del párrafo también influyen en la legibilidad, tanto en papel como en pantalla. Por eso, conocer las propiedades de una tipografía permite usarla de forma consciente, alineada al contexto y al contenido. En definitiva, elegir una tipografía no es decorar: es diseñar el tono con el que las palabras se presentan al mundo`;
      const textoCorto = 'Sempiterno crepúsculo donde todo termina, pero nada desaparece';

      if (texto.dataset.state === 'largo') {
        panelAlineacion?.classList.add('oculto');
        texto.textContent = textoCorto.slice(0, 300);
        texto.dataset.state = 'corto';
        texto.style.textAlign = 'left';
        texto.style.padding = '0';
      } else {
        panelAlineacion?.classList.remove('oculto');
        texto.textContent = textoLargo.slice(0, 1500);
        texto.dataset.state = 'largo';
        texto.style.padding = '2rem';
        ocultarOtrosPaneles(panelAlineacion, true);
      }
    });
  }

  // Función para actualizar tamaño
  function actualizarTamanio(valor) {
    let v = Number(valor);
    if (isNaN(v)) return;
    v = Math.max(6, Math.min(72, v));
    texto.style.fontSize = v + 'pt';
    if (slider) slider.value = v;
    if (input) input.value = v;
  }

  if (slider) slider.addEventListener('input', e => actualizarTamanio(e.target.value));
  if (input) input.addEventListener('input', e => actualizarTamanio(e.target.value));

  // Mostrar/ocultar paneles
  function ocultarOtrosPaneles(panelActivo, forzarMostrar = false) {
    const yaVisible = !panelActivo.classList.contains('oculto');
    document.querySelectorAll('.color-panel-texto, .color-panel-fondo, .panel-cuerpo, .panel-alineacion')
      .forEach(panel => {
        if (panel !== panelActivo) panel.classList.add('oculto');
      });

    if (forzarMostrar || !yaVisible) {
      panelActivo.classList.remove('oculto');
    } else {
      panelActivo.classList.add('oculto');
    }
  }

  if (btnTexto) {
    btnTexto.addEventListener('click', e => {
      e.preventDefault();
      ocultarOtrosPaneles(panelTexto);
    });
  }

  if (btnFondo) {
    btnFondo.addEventListener('click', e => {
      e.preventDefault();
      ocultarOtrosPaneles(panelFondo);
    });
  }

  if (cuerpoLink) {
    cuerpoLink.addEventListener('click', e => {
      e.preventDefault();
      ocultarOtrosPaneles(panelCuerpo);
    });
  }

  // Aplicar color de texto
  panelTexto?.querySelectorAll('.color__btn').forEach(op => {
    op.addEventListener('click', () => {
      texto.style.color = op.style.backgroundColor;
    });
  });

  // Aplicar color de fondo
  panelFondo?.querySelectorAll('.color__btn').forEach(op => {
    op.addEventListener('click', () => {
      texto.style.backgroundColor = op.style.backgroundColor;
    });
  });

  // Peso y estilo inicial
  const weight = muestra.dataset.weight;
  const style = muestra.dataset.style;
  const label = muestra.querySelector('.peso-texto');
  texto.style.fontWeight = weight;
  texto.style.fontStyle = style;
  if (label) {
    label.style.fontWeight = weight;
    label.style.fontStyle = style;
  }
});

// Alineación
document.querySelectorAll('.panel-alineacion .alinear').forEach(btn => {
  btn.addEventListener('click', function () {
    const muestra = this.closest('.muestra');
    const texto = muestra.querySelector('.selector-texto');
    const align = this.dataset.align;
    texto.style.textAlign = align;
  });
});
/*--------------------------------------------------------------------------------------*/
// Variables de navegación 
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".fonts-links a");

  // Activa link en clic
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Activa link en scroll
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
});


const modalCarrito = document.getElementById('modal-carrito');
const btnAbrirCarrito = document.getElementById('boton-carrito');
const btnCerrarCarrito = document.getElementById('cerrar-modal');
// Suponiendo que estos elementos ya existen en tu HTML:
const listaCarrito = document.getElementById('listaCarrito');  // <ul> o <ol> donde mostrar el carrito
const totalCarrito = document.getElementById('totalCarrito');  // elemento donde mostrar el total

// Cargar carrito desde localStorage o inicializar vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarCarrito() {
  // Verificar que listaCarrito y totalCarrito existan en el DOM
  if (!listaCarrito || !totalCarrito) {
    console.warn('No se encontró el elemento para mostrar el carrito o el total.');
    return; // Salir para evitar errores
  }

  listaCarrito.innerHTML = ''; // limpiar la lista visible
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.titulo}</span>
      <span>
        $${item.precio.toFixed(2)}
        <span class="eliminar-item" onclick="eliminarDelCarrito(${index})" style="cursor:pointer;">❌</span>
      </span>
    `;
    listaCarrito.appendChild(li);
    total += item.precio;
  });

  totalCarrito.textContent = `$${total.toFixed(2)}`;

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
}


// Función para eliminar un ítem del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Función para agregar un producto al carrito (ejemplo)
function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
}

// Actualizar carrito al cargar la página para mostrar lo que está guardado
actualizarCarrito();

// Eventos para abrir/cerrar modal
btnAbrirCarrito.addEventListener('click', () => {
  modalCarrito.classList.remove('oculto');
});
btnCerrarCarrito.addEventListener('click', () => {
  modalCarrito.classList.add('oculto');
});

