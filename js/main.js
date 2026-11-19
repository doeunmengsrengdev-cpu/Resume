(function () {
      'use strict';

      /* -------------------------------------------------------
         1. THEME MANAGEMENT (Dark Default + Light Toggle)
      ------------------------------------------------------- */
      const htmlEl = document.documentElement;
      const themeToggle = document.getElementById('themeToggle');

      try {
        const savedTheme = localStorage.getItem('dm-theme');
        if (savedTheme === 'light') {
          htmlEl.classList.remove('dark');
        } else {
          htmlEl.classList.add('dark');
        }
      } catch (e) {
        htmlEl.classList.add('dark');
      }

      themeToggle.addEventListener('click', () => {
        const isDark = htmlEl.classList.toggle('dark');
        try {
          localStorage.setItem('dm-theme', isDark ? 'dark' : 'light');
        } catch (e) {}
      });

      /* -------------------------------------------------------
         2. MOBILE NAVIGATION DRAWER
      ------------------------------------------------------- */
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileDrawer = document.getElementById('mobileDrawer');
      const menuIconOpen = document.getElementById('menuIconOpen');
      const menuIconClose = document.getElementById('menuIconClose');

      function toggleMobileMenu(forceClose = false) {
        const isHidden = forceClose ? false : mobileDrawer.classList.contains('hidden');
        if (isHidden) {
          mobileDrawer.classList.remove('hidden');
          menuIconOpen.classList.add('hidden');
          menuIconClose.classList.remove('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
          mobileDrawer.classList.add('hidden');
          menuIconOpen.classList.remove('hidden');
          menuIconClose.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }

      mobileMenuBtn.addEventListener('click', () => toggleMobileMenu());
      document.querySelectorAll('.mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => toggleMobileMenu(true));
      });

      /* -------------------------------------------------------
         3. NAVBAR ACTIVE UNDERLINE (SCROLL-SPY & CLICK)
      ------------------------------------------------------- */
      const navLinks = document.querySelectorAll('#desktopNav .nav-link');
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
      const trackedSections = document.querySelectorAll('main > section[id]');

      function updateActiveNav() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        let currentId = '';

        trackedSections.forEach((section) => {
          const top = section.offsetTop - 140;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentId = section.getAttribute('id');
          }
        });

        navLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === '#' + currentId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        mobileNavLinks.forEach((link) => {
          const href = link.getAttribute('href');
          if (href === '#' + currentId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }

      window.addEventListener('scroll', updateActiveNav, { passive: true });
      updateActiveNav();

      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          navLinks.forEach((l) => l.classList.remove('active'));
          link.classList.add('active');
        });
      });

      /* -------------------------------------------------------
         4. HERO INTERACTIVE PERSPECTIVE SWITCHER
      ------------------------------------------------------- */
      const btnViewPreview = document.getElementById('btnViewPreview');
      const btnViewCode = document.getElementById('btnViewCode');
      const panelPreview = document.getElementById('panelPreview');
      const panelCode = document.getElementById('panelCode');

      function setPerspective(mode) {
        const isPreview = mode === 'preview';
        panelPreview.classList.toggle('hidden', !isPreview);
        panelCode.classList.toggle('hidden', isPreview);

        btnViewPreview.setAttribute('aria-selected', String(isPreview));
        btnViewCode.setAttribute('aria-selected', String(!isPreview));

        const activeClasses = ['bg-white', 'dark:bg-zinc-800', 'text-zinc-900', 'dark:text-white', 'shadow-sm'];
        const inactiveClasses = ['text-zinc-600', 'dark:text-zinc-400', 'hover:text-zinc-900', 'dark:hover:text-zinc-200'];

        if (isPreview) {
          btnViewPreview.classList.add(...activeClasses);
          btnViewPreview.classList.remove(...inactiveClasses);
          btnViewCode.classList.remove(...activeClasses);
          btnViewCode.classList.add(...inactiveClasses);
        } else {
          btnViewCode.classList.add(...activeClasses);
          btnViewCode.classList.remove(...inactiveClasses);
          btnViewPreview.classList.remove(...activeClasses);
          btnViewPreview.classList.add(...inactiveClasses);
        }
      }

      btnViewPreview.addEventListener('click', () => setPerspective('preview'));
      btnViewCode.addEventListener('click', () => setPerspective('code'));

      // Code Sub-Tabs inside Full-Stack Code View
      const codeTabs = document.querySelectorAll('.code-tab-btn');
      const codeBlocks = {
        tsx: document.getElementById('codeBlockTsx'),
        api: document.getElementById('codeBlockApi'),
        docker: document.getElementById('codeBlockDocker'),
      };
      let activeCodeKey = 'tsx';

      codeTabs.forEach((btn) => {
        btn.addEventListener('click', () => {
          activeCodeKey = btn.dataset.codetab;
          codeTabs.forEach((t) => {
            const active = t.dataset.codetab === activeCodeKey;
            t.className = active
              ? 'code-tab-btn px-2.5 py-1 rounded-md text-[11px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
              : 'code-tab-btn px-2.5 py-1 rounded-md text-[11px] font-mono text-zinc-400 hover:text-zinc-200 border border-transparent';
          });
          Object.keys(codeBlocks).forEach((k) => {
            codeBlocks[k].classList.toggle('hidden', k !== activeCodeKey);
          });
        });
      });

      // Copy Code Snippet
      document.getElementById('copyCodeBtn').addEventListener('click', () => {
        const text = codeBlocks[activeCodeKey].innerText;
        copyTextToClipboard(text, 'Code snippet copied!');
      });

      /* -------------------------------------------------------
         5. WORKFLOW INTERACTIVE STEPPER (PURE ENGINEERING)
      ------------------------------------------------------- */
      const workflowData = [
        {
          badge: 'Phase 01 • Architecture',
          title: 'Architecture & System Planning',
          desc: 'Every build starts by defining clear API contracts, data models, and system constraints—ensuring that downstream code is modular, type-safe, and ready for high concurrency.',
          deliverables: [
            'Relational & NoSQL database schema design',
            'REST & GraphQL API endpoint specifications',
            'State management & frontend architecture brief',
          ],
        },
        {
          badge: 'Phase 02 • Frontend',
          title: 'Frontend Engineering & State',
          desc: 'Translating product specifications into fast, responsive, and type-safe user interfaces with clean reusable components and predictable application state.',
          deliverables: [
            'Next.js & React component hierarchy',
            'Tailwind CSS design token implementation',
            'Optimistic UI mutations & responsive layouts',
          ],
        },
        {
          badge: 'Phase 03 • Backend',
          title: 'Backend Services & Database Integration',
          desc: 'Building high-throughput Node.js microservices and database queries protected with validation, authentication, and comprehensive API tests.',
          deliverables: [
            'Node.js REST & GraphQL API microservices',
            'Database migrations & Prisma ORM queries',
            'Postman API test collections & validation',
          ],
        },
        {
          badge: 'Phase 04 • Production',
          title: 'Containerize & Deploy',
          desc: 'Packaging applications into reproducible multi-stage Docker containers with automated CI/CD pipelines, edge caching, and health telemetry.',
          deliverables: [
            'Multi-stage Dockerfiles & Docker Compose setup',
            'Automated GitHub Actions CI/CD workflows',
            'Vercel edge deployment & uptime telemetry',
          ],
        },
      ];

      const processStepBtns = document.querySelectorAll('.process-step');

      function setWorkflowStep(index) {
        const data = workflowData[index];
        document.getElementById('procBadge').textContent = data.badge;
        document.getElementById('procTitle').textContent = data.title;
        document.getElementById('procDesc').textContent = data.desc;
        document.getElementById('procDeliverables').innerHTML = data.deliverables
          .map(
            (item) => `
          <li class="flex items-start gap-2.5">
            <svg class="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>${item}</span>
          </li>
        `
          )
          .join('');

        processStepBtns.forEach((btn, idx) => {
          const isActive = idx === index;
          const dot = btn.querySelector('.step-dot');
          const num = btn.querySelector('span.font-mono');
          if (isActive) {
            btn.className = 'process-step text-left p-5 rounded-2xl border-2 border-indigo-500 bg-white dark:bg-surface shadow-sm transition-all';
            dot.className = 'w-2 h-2 rounded-full bg-indigo-500 step-dot';
            num.className = 'font-mono text-xs font-semibold text-indigo-500';
          } else {
            btn.className = 'process-step text-left p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-surface/60 hover:border-indigo-500/50 transition-all';
            dot.className = 'w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 step-dot';
            num.className = 'font-mono text-xs font-semibold text-zinc-400';
          }
        });
      }

      processStepBtns.forEach((btn) => {
        const idx = Number(btn.dataset.step);
        btn.addEventListener('click', () => setWorkflowStep(idx));
        btn.addEventListener('mouseenter', () => setWorkflowStep(idx));
      });
      setWorkflowStep(0);

      /* -------------------------------------------------------
         6. CONTACT FORM, PROJECT TYPE & QUICK-COPY EMAIL
      ------------------------------------------------------- */
      let selectedProjectType = 'Full-Stack';
      const typeBtns = document.querySelectorAll('.type-btn');

      typeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          selectedProjectType = btn.dataset.type;
          typeBtns.forEach((b) => {
            const active = b.dataset.type === selectedProjectType;
            b.className = active
              ? 'type-btn active py-2.5 px-3 rounded-xl text-xs font-medium border-2 border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 transition-all'
              : 'type-btn py-2.5 px-3 rounded-xl text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500/50 transition-all';
          });
        });
      });

      // Contact Form Validation & Direct Email Submission
      const contactForm = document.getElementById('contactForm');
      const submitInquiryBtn = document.getElementById('submitInquiryBtn');
      const submitBtnText = document.getElementById('submitBtnText');
      const submitBtnIcon = document.getElementById('submitBtnIcon');

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('inputName');
        const emailInput = document.getElementById('inputEmail');
        const msgInput = document.getElementById('inputMessage');

        const errName = document.getElementById('errName');
        const errEmail = document.getElementById('errEmail');
        const errMessage = document.getElementById('errMessage');

        let valid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nameInput.value.trim().length < 2) {
          errName.classList.remove('hidden');
          valid = false;
        } else {
          errName.classList.add('hidden');
        }

        if (!emailRegex.test(emailInput.value.trim())) {
          errEmail.classList.remove('hidden');
          valid = false;
        } else {
          errEmail.classList.add('hidden');
        }

        if (msgInput.value.trim().length < 10) {
          errMessage.classList.remove('hidden');
          valid = false;
        } else {
          errMessage.classList.add('hidden');
        }

        if (!valid) return;

        const nameVal = nameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const msgVal = msgInput.value.trim();
        const recipientEmail = 'doeunmengsrengdev@gmail.com';

        // Set Sending State on Button
        if (submitInquiryBtn) {
          submitInquiryBtn.disabled = true;
          if (submitBtnText) submitBtnText.textContent = 'Sending...';
          if (submitBtnIcon) {
            submitBtnIcon.classList.add('animate-spin');
            submitBtnIcon.innerHTML = '<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>';
          }
        }

        try {
          // Attempt direct email delivery via FormSubmit AJAX endpoint
          const res = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              name: nameVal,
              email: emailVal,
              project_type: selectedProjectType,
              message: msgVal,
              _subject: `Portfolio Inquiry [${selectedProjectType}] from ${nameVal}`
            })
          });

          const data = await res.json();
          if (res.ok && data.success !== 'false') {
            showToast(`Thank you ${nameVal}! Your inquiry has been sent to ${recipientEmail}`);
            contactForm.reset();
          } else {
            throw new Error('API dispatch failed');
          }
        } catch (err) {
          // Fallback directly to mailto so the user's message is never lost
          const mailSubject = encodeURIComponent(`[Portfolio Inquiry - ${selectedProjectType}] from ${nameVal}`);
          const mailBody = encodeURIComponent(
            `Hi Doeun,\n\nI would like to inquire about a ${selectedProjectType} project.\n\nProject Brief:\n${msgVal}\n\n---\nFrom: ${nameVal}\nEmail: ${emailVal}\nProject Type: ${selectedProjectType}`
          );
          window.location.href = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
          showToast(`Opening your email client to send inquiry to ${recipientEmail}...`);
          contactForm.reset();
        } finally {
          // Restore Button State
          if (submitInquiryBtn) {
            submitInquiryBtn.disabled = false;
            if (submitBtnText) submitBtnText.textContent = 'Send Inquiry';
            if (submitBtnIcon) {
              submitBtnIcon.classList.remove('animate-spin');
              submitBtnIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />';
            }
          }
        }
      });

      // Quick-copy Email button
      const copyEmailBtn = document.getElementById('copyEmailBtn');
      const copyEmailLabel = document.getElementById('copyEmailLabel');

      if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
          const email = document.getElementById('emailText').textContent.trim();
          copyTextToClipboard(email, 'Email copied to clipboard!');
          if (copyEmailLabel) copyEmailLabel.textContent = 'Copied!';
          setTimeout(() => {
            if (copyEmailLabel) copyEmailLabel.textContent = 'Copy';
          }, 2000);
        });
      }

      // Quick-copy Telegram Username button
      const copyTelegramBtn = document.getElementById('copyTelegramBtn');
      const copyTelegramLabel = document.getElementById('copyTelegramLabel');

      function copyTelegramUsername() {
        const usernameEl = document.getElementById('telegramText');
        const username = usernameEl ? usernameEl.textContent.trim() : '@majesty_fury';
        copyTextToClipboard(username, 'Telegram handle ' + username + ' copied!');
        if (copyTelegramLabel) copyTelegramLabel.textContent = 'Copied!';
        setTimeout(() => {
          if (copyTelegramLabel) copyTelegramLabel.textContent = 'Copy';
        }, 2000);
      }

      if (copyTelegramBtn) {
        copyTelegramBtn.addEventListener('click', copyTelegramUsername);
      }

      // Modal copy Telegram handle button
      const modalCopyTelegramBtn = document.getElementById('modalCopyTelegramBtn');
      if (modalCopyTelegramBtn) {
        modalCopyTelegramBtn.addEventListener('click', () => {
          copyTelegramUsername();
          modalCopyTelegramBtn.textContent = 'Copied!';
          setTimeout(() => {
            modalCopyTelegramBtn.textContent = 'Copy';
          }, 2000);
        });
      }

      // Telegram QR Code Modal
      const telegramQrModal = document.getElementById('telegramQrModal');
      const openTelegramQrBtn = document.getElementById('openTelegramQrBtn');
      const closeTelegramQrBtn = document.getElementById('closeTelegramQrBtn');

      function openTelegramQr() {
        if (!telegramQrModal) return;
        telegramQrModal.classList.add('active');
        document.body.classList.add('overflow-hidden');
      }

      function closeTelegramQr() {
        if (!telegramQrModal) return;
        telegramQrModal.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      }

      if (openTelegramQrBtn) {
        openTelegramQrBtn.addEventListener('click', (e) => {
          e.preventDefault();
          openTelegramQr();
        });
      }

      if (closeTelegramQrBtn) {
        closeTelegramQrBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closeTelegramQr();
        });
      }

      if (telegramQrModal) {
        telegramQrModal.addEventListener('click', (e) => {
          if (e.target === telegramQrModal || e.target.classList.contains('modal-backdrop')) {
            closeTelegramQr();
          }
        });
      }

      // Close Telegram QR Modal on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && telegramQrModal && telegramQrModal.classList.contains('active')) {
          closeTelegramQr();
        }
      });

      // Unified Clipboard Copy helper
      function copyTextToClipboard(text, toastMsg) {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(text).then(() => {
            showToast(toastMsg);
          }).catch(() => {
            fallbackCopy(text, toastMsg);
          });
        } else {
          fallbackCopy(text, toastMsg);
        }
      }

      function fallbackCopy(text, toastMsg) {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          showToast(toastMsg);
        } catch (err) {
          showToast('Failed to copy to clipboard.');
        }
      }

      /* -------------------------------------------------------
         7. TOAST HELPER & SCROLL REVEAL OBSERVER
      ------------------------------------------------------- */
      let toastTimer = null;
      const toastEl = document.getElementById('toast');
      const toastMessage = document.getElementById('toastMessage');

      function showToast(msg) {
        toastMessage.textContent = msg;
        toastEl.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
        toastEl.classList.add('translate-y-0', 'opacity-100');

        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toastEl.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
          toastEl.classList.remove('translate-y-0', 'opacity-100');
        }, 3200);
      }

      // Intersection Observer for smooth scroll reveals
      const revealEls = document.querySelectorAll('.reveal');
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 }
        );
        revealEls.forEach((el) => observer.observe(el));
      } else {
        revealEls.forEach((el) => el.classList.add('revealed'));
      }

      /* -------------------------------------------------------
         8. IMAGE LIGHTBOX MODAL (SCALE & CENTER VIEWPORT WITH GRAY BACKDROP)
      ------------------------------------------------------- */
      const imageModal = document.getElementById('imageModal');
      const imageModalImg = document.getElementById('imageModalImg');
      const imageModalCaption = document.getElementById('imageModalCaption');
      const brandAvatarBtn = document.getElementById('brandAvatarBtn');

      function openImageModal(src, alt) {
        if (!imageModal || !imageModalImg || !src) return;
        imageModalImg.src = src;
        imageModalImg.alt = alt || 'Preview';

        if (imageModalCaption) {
          const cleanAlt = (alt || '').trim();
          if (cleanAlt && cleanAlt.toLowerCase() !== 'profile' && cleanAlt.toLowerCase() !== 'image') {
            imageModalCaption.textContent = cleanAlt;
            imageModalCaption.classList.remove('hidden');
          } else {
            imageModalCaption.classList.add('hidden');
          }
        }

        imageModal.classList.add('active');
        document.body.classList.add('overflow-hidden');
      }

      function closeImageModal() {
        if (!imageModal) return;
        imageModal.classList.remove('active');
        document.body.classList.remove('overflow-hidden');
      }

      // Click anywhere to close (gray background, image, hint pill, anywhere on viewport)
      if (imageModal) {
        imageModal.addEventListener('click', () => {
          closeImageModal();
        });
      }

      // Close on Escape key press
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
          closeImageModal();
        }
      });

      // Brand avatar button click
      if (brandAvatarBtn) {
        brandAvatarBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const img = brandAvatarBtn.querySelector('img');
          if (img && img.src) {
            openImageModal(img.src, img.alt);
          }
        });
      }

      // Attach click-to-zoom on all content images (excluding image inside modals)
      document.querySelectorAll('img:not(#imageModalImg):not(#telegramQrImage):not(.no-lightbox)').forEach((img) => {
        img.classList.add('cursor-zoom-in');
        img.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          openImageModal(img.src, img.alt);
        });
      });
    })();
