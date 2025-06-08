// galeria.js

fetch('assets/data/imagenes.json')
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById("galeria-wrapper");

    data.forEach((imagenes, index) => {
      const swiperId = `swiper-${index}`;

      const swiperHTML = `
        <div class="swiper-container swiper" id="${swiperId}" >
          <div class="swiper-wrapper">
            ${imagenes.map(src => `
              <div class="swiper-slide">
                <img src="${src}" alt="Imagen de galería"  />
              </div>
            `).join('')}
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      `;

      contenedor.insertAdjacentHTML("beforeend", swiperHTML);
    });

    setTimeout(() => {
      document.querySelectorAll('.swiper').forEach(swiperElement => {
        new Swiper(swiperElement, {
          loop: true,
          spaceBetween: 20,
          slidesPerView: 1,
          pagination: {
            el: swiperElement.querySelector('.swiper-pagination'),
            clickable: true,
          },
          navigation: {
            nextEl: swiperElement.querySelector('.swiper-button-next'),
            prevEl: swiperElement.querySelector('.swiper-button-prev'),
          },
        });
      });
    }, 100);
  })
  .catch(error => {
    console.error("Error al cargar las imágenes:", error);
  });
