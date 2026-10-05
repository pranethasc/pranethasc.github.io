/**
 * PROTOSEM Week 0 Blog - Interactive Logic
 * Features: ScrollSpy, Progress Bar, Theme Toggle, Lightbox Modal,
 * Interactive Reflection Quiz, Font Resize, Share & Copy Link.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Reading Progress Bar & ScrollSpy
  const progressBar = document.getElementById('progressBar');
  const sections = document.querySelectorAll('section[id]');
  const tocLinks = document.querySelectorAll('.toc-link');
  const timelineBtns = document.querySelectorAll('.timeline-btn');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (winScroll > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // ScrollSpy
    let currentId = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });

      timelineBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('href') === `#${currentId}`) {
          btn.classList.add('active');
        }
      });
    }
  });

  // 2. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 3. Dark / Light Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('protosem_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('protosem_theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }

  // 4. Lightbox Modal for Images
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const zoomableImages = document.querySelectorAll('.image-container img, .zoomable-img');

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || 'PROTOSEM Image';
      
      const captionText = img.closest('.image-showcase')?.querySelector('.image-caption')?.innerText 
        || img.getAttribute('data-caption') 
        || img.alt;
      
      if (lightboxCaption) {
        lightboxCaption.innerText = captionText;
      }

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 5. Share & Copy Article Link
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      const title = document.title;
      const url = window.location.href;

      if (navigator.share) {
        try {
          await navigator.share({ title, url });
        } catch (err) {
          console.log('Share canceled or failed:', err);
        }
      } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(url).then(() => {
          const original = shareBtn.innerHTML;
          shareBtn.innerHTML = '✅ Copied!';
          setTimeout(() => {
            shareBtn.innerHTML = original;
          }, 2000);
        });
      }
    });
  }

  // 6. Font Size Toggle (Standard / Large)
  const fontToggle = document.getElementById('fontToggle');
  if (fontToggle) {
    let isLargeFont = false;
    fontToggle.addEventListener('click', () => {
      isLargeFont = !isLargeFont;
      document.body.style.fontSize = isLargeFont ? '18px' : '16px';
      fontToggle.style.color = isLargeFont ? 'var(--brand-secondary)' : '';
    });
  }
});
