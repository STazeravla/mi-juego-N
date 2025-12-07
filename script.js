// Cambia entre pantallas
const btnIniciar = document.getElementById("btnIniciar");
const pantalla1 = document.getElementById("pantalla1");
const pantalla2 = document.getElementById("pantalla2");

btnIniciar.addEventListener("click", () => {
  pantalla1.classList.remove("activa");
  pantalla2.classList.add("activa");
});

document.getElementById("btnIniciar").addEventListener("click", function() {
  const p1 = document.getElementById("pantalla1");
  const p2 = document.getElementById("pantalla2");

  p1.classList.remove("activa");
  p2.classList.add("activa");

  // Reinicia animación de las flores
  const flores = document.querySelectorAll(".flor");
  flores.forEach(flor => {
    flor.style.animation = "none";
    flor.offsetHeight; // fuerza reinicio
    flor.style.animation = "";
  });
});

const frase = "";
const p = document.getElementById("frase-escrita");

let i = 0;

function escribir() {
  // activar fade-in al iniciar
  p.style.opacity = 1;

  if (i < frase.length) {
    p.textContent += frase[i];
    i++;
    setTimeout(escribir, 50); // velocidad de escritura
  }
}

// esperar un momento antes de empezar
setTimeout(escribir, 500);



function crearPetalo() {
  const petalo = document.createElement("div");
  petalo.classList.add("petalo");
  petalo.textContent = "❀"; // pétalo
  petalo.style.left = Math.random() * 100 + "vw";
  petalo.style.animationDuration = 4 + Math.random() * 4 + "s";
  
  document.body.appendChild(petalo);

  setTimeout(() => petalo.remove(), 8000);
}

setInterval(crearPetalo, 1600); // uno cada 2 segundos

const btnCarta = document.getElementById("btnCarta");
const pantalla3 = document.getElementById("pantalla3");

btnCarta.addEventListener("click", () => {
  pantalla2.classList.remove("activa");
  pantalla3.classList.add("activa");
});


// --- Modal: comportamiento para abrir Santi o la galería de Nicole ---
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('img-modal');
  if (!modal) return;

  const gallery = modal.querySelector('.img-modal-gallery');
  const closeBtn = modal.querySelector('.img-modal-close');
  const backdrop = modal.querySelector('.img-modal-backdrop');
  let lastFocused = null;

  function addImgToGallery(src, alt) {
    const img = document.createElement('img');
    img.className = 'img-modal-item';
    img.src = src;
    img.alt = alt || '';
    img.addEventListener('error', () => { img.src = 'imagenes/placeholder.png'; });
    gallery.appendChild(img);
  }

  function buildGalleryFor(triggerEl) {
    gallery.innerHTML = '';
    let activeIndex = 0; // índice de la imagen que debe mostrarse primero
    
    if (!triggerEl) {
      // fallback: mostrar las imágenes de Nicole si existen
      const nicole1 = document.querySelector('.foto-nicole');
      const nicole2 = document.querySelector('.foto-nicole-pc');
      if (nicole1 && nicole1.src) addImgToGallery(nicole1.src, nicole1.alt);
      if (nicole2 && nicole2.src) addImgToGallery(nicole2.src, nicole2.alt);
    } else if (triggerEl.classList.contains('foto-santi-izq')) {
      // Si el trigger es Santi izq, mostrar Santi izq primero y Santi azul
      if (triggerEl.src) addImgToGallery(triggerEl.src, triggerEl.alt);
      activeIndex = 0; // Santi izq es la primera
      // incluir foto-santi-azul si existe en el DOM
      const santiAzul = document.querySelector('.foto-santi-azul');
      if (santiAzul && santiAzul.src) addImgToGallery(santiAzul.src, santiAzul.alt);
    } else if (triggerEl.classList.contains('foto-santi-azul')) {
      // Si el trigger es Santi azul, mostrar Santi azul primero
      const santiIzq = document.querySelector('.foto-santi-izq');
      if (santiIzq && santiIzq.src) addImgToGallery(santiIzq.src, santiIzq.alt);
      activeIndex = 1; // Santi azul es la segunda
      if (triggerEl.src) addImgToGallery(triggerEl.src, triggerEl.alt);
    } else if (triggerEl.classList.contains('foto-nicole') || triggerEl.classList.contains('foto-nicole-pc')) {
      // Si el trigger es una de las fotos de Nicole, mostrar ambas si existen
      const nicole1 = document.querySelector('.foto-nicole');
      const nicole2 = document.querySelector('.foto-nicole-pc');
      if (triggerEl.classList.contains('foto-nicole')) {
        activeIndex = 0;
      } else {
        activeIndex = 1;
      }
      if (nicole1 && nicole1.src) addImgToGallery(nicole1.src, nicole1.alt);
      if (nicole2 && nicole2.src) addImgToGallery(nicole2.src, nicole2.alt);
    } else {
      // default: nothing
    }

    // marcar la imagen activa (según activeIndex) y ajustar clase single
    const items = gallery.querySelectorAll('.img-modal-item');
    if (items.length > 0) {
      items.forEach(it => it.classList.remove('active'));
      if (activeIndex < items.length) {
        items[activeIndex].classList.add('active');
      } else {
        items[0].classList.add('active');
      }
      gallery.classList.toggle('single', items.length === 1);
    } else {
      const p = document.createElement('p');
      p.textContent = 'No hay imágenes disponibles.';
      p.style.color = '#fff';
      gallery.appendChild(p);
      gallery.classList.remove('single');
    }
  }

  function openModal(triggerEl) {
    buildGalleryFor(triggerEl);
    lastFocused = document.activeElement;
    // cancelar cualquier cierre en progreso
    modal.classList.remove('closing');
    modal.setAttribute('aria-hidden', 'false');
    // focus en el botón cerrar para accesibilidad
    closeBtn.focus();
  }

  function closeModal() {
    // animación de salida: añadimos clase y esperamos a animationend
    modal.classList.add('closing');
    const onAnimEnd = (e) => {
      if (e.target !== modal) return;
      modal.setAttribute('aria-hidden', 'true');
      modal.classList.remove('closing');
      gallery.innerHTML = '';
      if (lastFocused) lastFocused.focus();
      modal.removeEventListener('animationend', onAnimEnd);
    };
    modal.addEventListener('animationend', onAnimEnd);
    // fallback por si no hay animationend
    setTimeout(() => {
      if (modal.getAttribute('aria-hidden') !== 'true') {
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('closing');
        gallery.innerHTML = '';
        if (lastFocused) lastFocused.focus();
      }
    }, 400);
  }

  // listeners: Santi y las fotos de Nicole
  const santi = document.querySelector('.foto-santi-izq');
  if (santi) santi.addEventListener('click', (e) => { e.preventDefault(); openModal(santi); });

  const santiAzul = document.querySelector('.foto-santi-azul');
  if (santiAzul) santiAzul.addEventListener('click', (e) => { e.preventDefault(); openModal(santiAzul); });

  const nicoleImgs = document.querySelectorAll('.foto-nicole, .foto-nicole-pc');
  nicoleImgs.forEach(img => img.addEventListener('click', (e) => { e.preventDefault(); openModal(img); }));

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(); });

  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
});

// --- Controles prev/next para el modal (carrusel simple) ---
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('img-modal');
  if (!modal) return;
  const gallery = modal.querySelector('.img-modal-gallery');
  const prev = modal.querySelector('.img-modal-prev');
  const next = modal.querySelector('.img-modal-next');

  function showIndex(i) {
    const items = Array.from(gallery.querySelectorAll('.img-modal-item'));
    if (!items.length) return;
    items.forEach((it, idx) => {
      it.classList.toggle('active', idx === i);
    });
  }

  function indexOfActive() {
    const items = Array.from(gallery.querySelectorAll('.img-modal-item'));
    return items.findIndex(it => it.classList.contains('active'));
  }

  if (prev && next) {
    prev.addEventListener('click', () => {
      const items = Array.from(gallery.querySelectorAll('.img-modal-item'));
      if (!items.length) return;
      let idx = indexOfActive();
      if (idx <= 0) idx = items.length - 1; else idx--;
      showIndex(idx);
    });

    next.addEventListener('click', () => {
      const items = Array.from(gallery.querySelectorAll('.img-modal-item'));
      if (!items.length) return;
      let idx = indexOfActive();
      if (idx >= items.length - 1) idx = 0; else idx++;
      showIndex(idx);
    });
  }
});
