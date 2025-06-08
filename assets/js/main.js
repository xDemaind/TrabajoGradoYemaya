document.addEventListener("DOMContentLoaded", () => {
  // === INICIALIZAR SWIPER ===
  const swiper = new Swiper(".swiper", {
    loop: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    }
  });

  // === CARGA Y MOSTRADO DE NOTICIAS ===
  const noticiasContainer = document.getElementById("contenedor-noticias");
  const btnVerMas = document.getElementById("verMasNoticias");
  const modal = document.getElementById("modalNoticia");
  const modalTitulo = document.getElementById("modalTitulo");
  const modalContenido = document.getElementById("modalContenido");
  const modalClose = document.querySelector(".modal-close");

  let noticias = [];
  let noticiasMostradas = 0;
  const noticiasPorCarga = 4;

  // Renderizar un lote de noticias
  function renderNoticias(cantidad) {
    const fragment = document.createDocumentFragment();

    for (let i = noticiasMostradas; i < noticiasMostradas + cantidad && i < noticias.length; i++) {
      const noticia = noticias[i];

      const div = document.createElement("div");
      div.className = "noticia";
      div.setAttribute("data-aos", "fade-up");

      const h3 = document.createElement("h3");
      h3.textContent = noticia.titulo;

      const p = document.createElement("p");
      p.textContent = noticia.contenido.length > 150
        ? noticia.contenido.slice(0, 150) + "..."
        : noticia.contenido;

      div.appendChild(h3);
      div.appendChild(p);

      div.addEventListener("click", () => {
        modalTitulo.textContent = noticia.titulo;
        modalContenido.textContent = noticia.contenido;
        modal.style.display = "block";
      });

      fragment.appendChild(div);
    }

    noticiasMostradas += cantidad;
    noticiasContainer.appendChild(fragment);

    if (noticiasMostradas >= noticias.length) {
      btnVerMas.style.display = "none";
    }
  }

  // Fetch del JSON
  fetch("assets/data/noticias.json")
    .then(response => response.json())
    .then(data => {
      noticias = data;
      renderNoticias(6); // 3 filas x 2 columnas
    })
    .catch(err => console.error("Error cargando noticias:", err));

  // Botón ver más
  btnVerMas.addEventListener("click", () => renderNoticias(noticiasPorCarga));

  // Cerrar modal
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
