    (function() {
      // Smooth scroll with offset
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const targetId = this.getAttribute('href');
          if (targetId === "#" || targetId === "") return;
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            e.preventDefault();
            const offset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
          }
        });
      });

      // Scroll reveal
      const revealElements = document.querySelectorAll('.reveal');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });
      revealElements.forEach(el => observer.observe(el));

      // Click micro-animations
      const clickables = document.querySelectorAll('.btn, .project-card, .skill-tag, .social-icon, .copy-btn, nav a, .seminar-card');
      clickables.forEach(el => {
        el.addEventListener('mousedown', function() {
          this.style.transition = 'transform 0.08s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
          this.style.transform = 'scale(0.97)';
          setTimeout(() => { this.style.transform = ''; }, 120);
        });
        el.addEventListener('mouseup', () => { if(el.style.transform) el.style.transform = ''; });
        el.addEventListener('mouseleave', () => { if(el.style.transform) el.style.transform = ''; });
      });

      // Copy email
      const copyBtn = document.querySelector('.copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const email = copyBtn.getAttribute('data-clip');
          navigator.clipboard.writeText(email).then(() => {
            const original = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.classList.add('copied-feedback');
            setTimeout(() => {
              copyBtn.innerHTML = original;
              copyBtn.classList.remove('copied-feedback');
            }, 1200);
          });
        });
      }

      // Navbar shadow on scroll
      const navbar = document.querySelector('.navbar');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 20) navbar.classList.add('navbar-scrolled');
        else navbar.classList.remove('navbar-scrolled');
      });

      // Subtle mouse parallax for floating shapes
      const hero = document.querySelector('.hero');
      if(hero){
        document.addEventListener('mousemove', (e) => {
          const xAxis = (window.innerWidth / 2 - e.pageX) / 45;
          const yAxis = (window.innerHeight / 2 - e.pageY) / 45;
          const shapes = document.querySelectorAll('.floating-shape');
          shapes.forEach((shape, idx) => {
            const speed = idx === 0 ? 12 : 20;
            shape.style.transform = `translate(${xAxis / speed}px, ${yAxis / speed}px)`;
          });
        });
      }
    })();