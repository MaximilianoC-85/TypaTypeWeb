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

  document.querySelectorAll('.selector-texto').forEach(texto => {
  texto.addEventListener('click', function () {
    this.setAttribute('contenteditable', 'true');
    this.focus();
  });

  texto.addEventListener('input', function () {
    const maxChars = this.dataset.state === 'largo' ? 1500 : 300;
    if (this.textContent.length > maxChars) {
      this.textContent = this.textContent.slice(0, maxChars);
      // Mover cursor al final
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
});

document.querySelectorAll('.btn1').forEach(btn => {
  btn.addEventListener('click', function () {
    const texto = this.closest('.muestra').querySelector('.selector-texto');
    const panelAlineacion = this.closest('.muestra').querySelector('.panel-alineacion');

    const textoLargo = `La tipografía no es solo una cuestión estética: es una herramienta fundamental para comunicar con claridad, intención y personalidad. Cada elección tipográfica transmite un tono distinto, ya sea a través del grosor del trazo, la altura de las x, el contraste entre astas o la forma de sus remates. Una buena tipografía puede reforzar el mensaje, guiar la lectura y generar una experiencia visual armónica. Entre serif y sans serif, romanas, geométricas, humanistas o grotescas, hay un mundo de decisiones posibles, cada una con sus matices. El interletrado, la interlínea y el ancho del párrafo también influyen en la legibilidad, tanto en papel como en pantalla. Por eso, conocer las propiedades de una tipografía permite usarla de forma consciente, alineada al contexto y al contenido. En definitiva, elegir una tipografía no es decorar: es diseñar el tono con el que las palabras se presentan al mundo`;
    const textoCorto = 'Sempiterno crepúsculo donde todo termina, pero nada desaparece';

    if (texto.dataset.state === 'largo') {
      panelAlineacion.classList.add('oculto');
      texto.textContent = textoCorto.slice(0, 300);
      texto.dataset.state = 'corto';
        texto.style.textAlign = 'left'; // ⬅️ Alineación reseteada
          texto.style.padding = '0'; // O el valor que prefieras
    } else {
      panelAlineacion.classList.remove('oculto');
      texto.textContent = textoLargo.slice(0, 1500);
      texto.dataset.state = 'largo';
  texto.style.padding = '2rem'; // O el valor que prefieras
        // Ocultar otros paneles y mostrar el de alineación
      ocultarOtrosPaneles(panelAlineacion);
    }
  });
});

  // Función para actualizar tamaño
  function actualizarTamanio(valor) {
    let v = Number(valor);
    if (isNaN(v)) return;
    v = Math.max(6, Math.min(72, v));
    texto.style.fontSize = v + 'pt';
    slider.value = v;
    input.value = v;
  }

  slider.addEventListener('input', e => actualizarTamanio(e.target.value));
  input.addEventListener('input', e => actualizarTamanio(e.target.value));

function ocultarOtrosPaneles(panelActivo) {
  document.querySelectorAll('.color-panel-texto, .color-panel-fondo, .panel-cuerpo, .panel-alineacion')
    .forEach(panel => {
      if (panel !== panelActivo) panel.classList.add('oculto');
    });
  
  // ⚠️ Verificamos si el panel ya está visible antes de alternar
  if (panelActivo.classList.contains('oculto')) {
    panelActivo.classList.remove('oculto');
  }
}


  btnTexto.addEventListener('click', e => {
    e.preventDefault();
    ocultarOtrosPaneles(panelTexto);
  });

  btnFondo.addEventListener('click', e => {
    e.preventDefault();
    ocultarOtrosPaneles(panelFondo);
  });

  cuerpoLink.addEventListener('click', e => {
    e.preventDefault();
    ocultarOtrosPaneles(panelCuerpo);
  });


  // Aplicar color de texto (sin cerrar el panel)
  panelTexto.querySelectorAll('.color-option').forEach(op => {
    op.addEventListener('click', () => {
      texto.style.color = op.style.background;
    });
  });

  // Aplicar color de fondo (sin cerrar el panel)
  panelFondo.querySelectorAll('.color-option').forEach(op => {
    op.addEventListener('click', () => {
      texto.style.backgroundColor = op.style.background;
    });
  });
});


document.querySelectorAll('.panel-alineacion .alinear').forEach(btn => {
  btn.addEventListener('click', function () {
    const muestra = this.closest('.muestra');
    const texto = muestra.querySelector('.selector-texto');
    const align = this.dataset.align;
    texto.style.textAlign = align;
  });
});

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
      const sectionTop = section.offsetTop - 160; // Compensá navbar
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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
