const btnFiltrar = document.querySelector('.btn-filtrar');
const btnFiltrarActivo = document.querySelector('.btn-filtrar-activo');
const filtroPanel = document.querySelector('.filtro-panel');
const panelContenido = document.querySelector('aside.panel');

function abrirFiltro() {
  filtroPanel.classList.remove('oculto');
  btnFiltrarActivo.classList.add('visible');
  btnFiltrar.classList.add('menu-activo'); // bloquea botón blanco
  panelContenido.classList.add('opaco');   // panel translúcido
}

function cerrarFiltro() {
  filtroPanel.classList.add('oculto');
  btnFiltrarActivo.classList.remove('visible');
  btnFiltrar.classList.remove('menu-activo');
  panelContenido.classList.remove('opaco');
}

btnFiltrar.addEventListener('click', abrirFiltro);
btnFiltrarActivo.addEventListener('click', cerrarFiltro);

// Cerrar filtro al hacer clic fuera del panel y del botón activo
document.addEventListener('click', function(event) {
  const clickDentroFiltro = filtroPanel.contains(event.target);
  const clickEnBtnActivo = btnFiltrarActivo.contains(event.target);
  const clickEnBtnBlanco = btnFiltrar.contains(event.target);

  if (!clickDentroFiltro && !clickEnBtnActivo && !clickEnBtnBlanco) {
    // Solo cerrar si el filtro está abierto
    if (!filtroPanel.classList.contains('oculto')) {
      cerrarFiltro();
    }
  }
});
