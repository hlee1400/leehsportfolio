// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Add reveal class to elements
  const revealSelectors = [
    '.hero__text',
    '.hero__image',
    '.hero__services',
    '.about__content',
    '.works__hero',
    '.works__intro',
    '.works__card',
    '.skills__item',
    '.footer__body',
    '.footer__copyright',
  ];

  revealSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      el.classList.add('reveal');
    });
  });

  // Intersection Observer for scroll reveal
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });

  // ============================================
  // SMOOTH SCROLL FOR NAV LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 100) {
      header.style.background = 'rgba(0, 0, 0, 0.9)';
      header.style.backdropFilter = 'blur(10px)';
    } else {
      header.style.background = 'var(--black)';
      header.style.backdropFilter = 'none';
    }

    lastScroll = currentScroll;
  });

  // ============================================
  // CAROUSEL DOTS (decorative cycling)
  // ============================================
  const dots = document.querySelectorAll('.dot');
  let activeDot = 0;

  if (dots.length > 0) {
    dots[activeDot].classList.add('active');

    setInterval(() => {
      dots.forEach((dot) => dot.classList.remove('active'));
      activeDot = (activeDot + 1) % dots.length;
      dots[activeDot].classList.add('active');
    }, 3000);
  }

  // ============================================
  // EXPERIENCE TABS (click + auto-rotate)
  // ============================================
  const experienceTabs = document.querySelectorAll('.experience__tab');
  const experienceTables = document.querySelectorAll('.experience__table');
  const experienceWrapper = document.querySelector('.experience__tables');

  let activeExperienceIndex = 0;
  let experienceIntervalId = null;

  const updateExperienceWrapperHeight = () => {
    if (!experienceWrapper || !experienceTables.length) return;

    let maxHeight = 0;

    experienceTables.forEach((table) => {
      const computedDisplay = getComputedStyle(table).display;
      const wasHidden = computedDisplay === 'none';

      const prevDisplay = table.style.display;
      const prevPosition = table.style.position;
      const prevVisibility = table.style.visibility;

      if (wasHidden) {
        table.style.display = 'block';
        table.style.position = 'absolute';
        table.style.visibility = 'hidden';
      }

      const height = table.offsetHeight;
      if (height > maxHeight) maxHeight = height;

      if (wasHidden) {
        table.style.display = prevDisplay;
        table.style.position = prevPosition;
        table.style.visibility = prevVisibility;
      }
    });

    if (maxHeight > 0) {
      experienceWrapper.style.height = `${maxHeight}px`;
    }
  };

  const setActiveExperienceTab = (index) => {
    if (!experienceTabs.length || !experienceTables.length) return;

    activeExperienceIndex = index;

    experienceTabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });

    experienceTables.forEach((table, i) => {
      table.classList.toggle('active', i === index);
    });
  };

  const startExperienceAutoRotate = () => {
    if (experienceIntervalId !== null || !experienceTabs.length) return;
    experienceIntervalId = setInterval(() => {
      const nextIndex = (activeExperienceIndex + 1) % experienceTabs.length;
      setActiveExperienceTab(nextIndex);
    }, 2000);
  };

  const stopExperienceAutoRotate = () => {
    if (experienceIntervalId !== null) {
      clearInterval(experienceIntervalId);
      experienceIntervalId = null;
    }
  };

  if (experienceTabs.length && experienceTables.length) {
    // Ensure initial state matches the first tab
    setActiveExperienceTab(0);
    updateExperienceWrapperHeight();

    experienceTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        setActiveExperienceTab(index);
        // Once the user clicks, stop auto-rotation so it stays on this tab
        stopExperienceAutoRotate();
        updateExperienceWrapperHeight();
      });
    });

    startExperienceAutoRotate();
  }

  if (experienceTabs.length && experienceTables.length && experienceWrapper) {
    window.addEventListener('resize', updateExperienceWrapperHeight);
  }
});
