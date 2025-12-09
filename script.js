document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".download-multi").forEach(button => {
    button.addEventListener("click", () => {

      const video = button.getAttribute("data-video");
      const file = button.getAttribute("data-file");

      const startDownload = (url) => {
        if (!url) return;
        const a = document.createElement("a");
        a.href = url;
        a.download = url.split("/").pop();
        document.body.appendChild(a);
        a.click();
        a.remove();
      };

      startDownload(video);
      startDownload(file);

    });
  });

});


document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
});


document.addEventListener('DOMContentLoaded', () => {

  // Prevent double-init if script accidentally loaded twice
  if (window.__servicioReadInit) return;
  window.__servicioReadInit = true;

  const cards = document.querySelectorAll('.servicio-card');

  cards.forEach(card => {
    const toggle = card.querySelector('.read-toggle');
    const fullArea = card.querySelector('.full-content-area');
    const preview = card.querySelector('.preview-text');

    if (!toggle || !fullArea) return;

    // Ensure preview exists; if empty, auto-generate
    if (!preview || !preview.textContent.trim()) {
      const txt = fullArea.textContent.trim();
      card.querySelector('.preview-text').textContent = txt.length > 100 ? txt.slice(0,100) + '... ' : txt + ' ';
    }

    // Make sure fullArea has no initial inline height (so scrollHeight works)
    fullArea.style.height = '0px';
    fullArea.style.visibility = 'hidden';

    const openCard = () => {
      // set height to scrollHeight then after transition set to auto
      fullArea.style.visibility = 'visible';
      const fullH = fullArea.scrollHeight;
      fullArea.style.height = fullH + 'px';
      card.classList.add('open');
      toggle.textContent = 'leer menos';

      // after transition, set height:auto so content reflows on resize
      const onEnd = () => {
        if (card.classList.contains('open')) {
          fullArea.style.height = 'auto';
        }
        fullArea.removeEventListener('transitionend', onEnd);
      };
      fullArea.addEventListener('transitionend', onEnd);
    };

    const closeCard = () => {
      // if height currently 'auto', set it to scrollHeight first so we can animate to 0
      if (fullArea.style.height === 'auto' || fullArea.style.height === '') {
        fullArea.style.height = fullArea.scrollHeight + 'px';
      }
      // force reflow to ensure transition
      void fullArea.offsetHeight;
      fullArea.style.height = '0px';
      fullArea.style.visibility = 'hidden';
      card.classList.remove('open');
      toggle.textContent = 'Read More';
    };

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (card.classList.contains('open')) closeCard(); else openCard();
    });

    // keyboard accessibility
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });

    // Optional: collapse the card when window resizes (to recalc height)
    window.addEventListener('resize', () => {
      if (card.classList.contains('open')) {
        // temporarily set height to auto to recalc
        fullArea.style.height = 'auto';
        const newH = fullArea.scrollHeight;
        fullArea.style.height = newH + 'px';
      }
    });

  });

});


    document.addEventListener('DOMContentLoaded', function () {

      // Init AOS
      if (window.AOS) {
        AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
      }

      // Select all cards once (used in auto-close logic)
      const allCards = document.querySelectorAll('.service-card');

      // Read More: dynamic max-height animation
      allCards.forEach(card => {
        const btn = card.querySelector('.read-more-btn');
        const desc = card.querySelector('.description-inner');

        if (!btn || !desc) return;

        btn.addEventListener('click', function (e) {
          e.preventDefault();

          const isExpanded = desc.classList.contains('expanded');

          // ðŸ”¥ AUTO-CLOSE OTHER CARDS
          if (!isExpanded) {
            allCards.forEach(otherCard => {
              if (otherCard !== card) {
                const otherDesc = otherCard.querySelector('.description-inner');
                const otherBtn = otherCard.querySelector('.read-more-btn');

                if (otherDesc && otherDesc.classList.contains('expanded')) {
                  otherDesc.style.maxHeight = '4.5em';
                  otherDesc.classList.remove('expanded');
                  if (otherBtn) otherBtn.textContent = 'Ver más';
                }
              }
            });
          }

          // EXPAND
          if (!isExpanded) {
            desc.style.maxHeight = desc.scrollHeight + 'px';
            desc.classList.add('expanded');
            btn.textContent = 'leer menos';

            setTimeout(() => {
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 200);

          } else {
            // COLLAPSE
            desc.style.maxHeight = '4.5em';
            desc.classList.remove('expanded');
            btn.textContent = 'Ver más';
          }
        });

        // Update maxHeight on window resize
        window.addEventListener('resize', () => {
          if (desc.classList.contains('expanded')) {
            desc.style.maxHeight = desc.scrollHeight + 'px';
          }
        });
      });

    });


    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const grid = btn.closest('.grid-item');

        // Close any other open grid
        document.querySelectorAll('.grid-item.open').forEach(openGrid => {
          if (openGrid !== grid) {
            openGrid.classList.remove('open');
            const openBtn = openGrid.querySelector('.toggle-btn');
            openBtn.classList.remove('read-less');
            openBtn.classList.add('read-more');
          }
        });

        // Toggle current grid
        grid.classList.toggle('open');
        btn.classList.toggle('read-more');
        btn.classList.toggle('read-less');
      });
    });

    // Wait for DOM
    document.addEventListener('DOMContentLoaded', function () {
      const offcanvasEl = document.getElementById('offcanvasMenu');
      if (!offcanvasEl) return;

      // Use event delegation on the offcanvas for nav-link clicks
      offcanvasEl.addEventListener('click', function (e) {
        const link = e.target.closest('.nav-link');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return; // only handle hash links

        // Prevent default immediate jump
        e.preventDefault();

        // Get Bootstrap Offcanvas instance (create if not already)
        let bsOff = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (!bsOff) bsOff = new bootstrap.Offcanvas(offcanvasEl);

        // Hide offcanvas, then scroll when fully hidden
        bsOff.hide();

        // Handler runs once per hide
        const onHidden = function () {
          offcanvasEl.removeEventListener('hidden.bs.offcanvas', onHidden);

          // Scroll to target smoothly
          const target = document.querySelector(href);
          if (target) {
            // If you have a fixed header, adjust this offset (e.g. header height)
            const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 10; // -10 for small gap

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            // Update URL hash without jumping
            history.replaceState(null, '', href);
          }
        };

        offcanvasEl.addEventListener('hidden.bs.offcanvas', onHidden);
      });
    });



document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop page refresh

    const form = this;
    const formData = new FormData(form);

    fetch("sendmail.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        if (result.trim() === "success") {
            document.getElementById("formMessage").style.display = "block";
            form.reset(); // Clear form
        } else {
            alert("Error sending email. Try again.");
        }
    })
    .catch(() => {
        alert("Server error. Try again later.");
    });
});


