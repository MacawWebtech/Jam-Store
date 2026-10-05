/* ==================================================
   Orchard & Jar — shared frontend behaviours
   No accounts, enquiries, payments or emails are sent.
   Only theme and direction preferences are persisted.
   ================================================== */
'use strict';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const params = new URLSearchParams(window.location.search);

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Preferences still work for this visit if storage is disabled.
  }
}

function initPreferences() {
  const themeButton = $('#theme-toggle');
  const directionButton = $('#direction-toggle');
  const root = document.documentElement;

  function updateButtons() {
    const dark = root.dataset.theme === 'dark';
    const rtl = root.dir === 'rtl';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.innerHTML = `<i class="bi bi-${dark ? 'sun' : 'moon'}" aria-hidden="true"></i>`;
    directionButton.textContent = rtl ? 'LTR' : 'RTL';
    directionButton.setAttribute('aria-label', `Switch to ${rtl ? 'left-to-right' : 'right-to-left'} layout`);
  }

  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    savePreference('orchard-theme', root.dataset.theme);
    updateButtons();
  });

  directionButton.addEventListener('click', () => {
    root.dir = root.dir === 'rtl' ? 'ltr' : 'rtl';
    savePreference('orchard-direction', root.dir);
    updateButtons();
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    try {
      if (!localStorage.getItem('orchard-theme')) {
        root.dataset.theme = event.matches ? 'dark' : 'light';
        updateButtons();
      }
    } catch {
      // Manual switching stays available without browser storage.
    }
  });

  updateButtons();
}

function initNavigation() {
  const toggle = $('#menu-toggle');
  const nav = $('#main-nav');
  const dropdown = $('.nav-dropdown');

  function closeMenu() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    toggle.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i>';
  }

  toggle.addEventListener('click', (event) => {
    // Keep the original icon click from bubbling after its SVG/font node is replaced.
    event.stopPropagation();
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    toggle.innerHTML = `<i class="bi bi-${open ? 'x-lg' : 'list'}" aria-hidden="true"></i>`;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (nav.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
      if (dropdown.open) {
        dropdown.open = false;
        $('summary', dropdown).focus();
      }
    }
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) {
      closeMenu();
      dropdown.open = false;
    }
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeMenu();
    }
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', closeMenu);
}

function initProductFilters() {
  const search = $('#product-search');
  if (!search) return;

  const fruit = $('#fruit-filter');
  const collection = $('#collection-filter');
  const price = $('#price-filter');
  const products = $$('.product-card');

  if ($$('option', fruit).some((option) => option.value === params.get('fruit'))) {
    fruit.value = params.get('fruit');
  }
  if (params.get('collection') === 'seasonal') collection.value = 'seasonal';

  function applyFilters() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    products.forEach((product) => {
      const match = product.dataset.name.includes(query)
        && (fruit.value === 'all' || product.dataset.fruit === fruit.value)
        && (collection.value !== 'seasonal' || product.dataset.seasonal === 'true')
        && (price.value === 'all' || Number(product.dataset.price) <= Number(price.value));
      product.hidden = !match;
      if (match) visible += 1;
    });
    $('#product-count').textContent = `${visible} preserve${visible === 1 ? '' : 's'} to explore`;
    $('#product-empty').hidden = visible > 0;
  }

  [search, fruit, collection, price].forEach((control) => {
    control.addEventListener('input', applyFilters);
  });
  $('#reset-products').addEventListener('click', () => {
    search.value = '';
    fruit.value = 'all';
    collection.value = 'all';
    price.value = 'all';
    applyFilters();
    search.focus();
  });
  applyFilters();
}

function initProductDetails() {
  const details = $$('.product-detail');
  if (!details.length) return;

  const selected = details.find((product) => product.dataset.product === params.get('product')) || details[0];
  details.forEach((product) => {
    product.hidden = product !== selected;
  });
  const productName = $('h1', selected).textContent.trim().replace(/\s+/g, ' ');
  $('#product-breadcrumb').textContent = productName;
  document.title = `${productName} | Orchard & Jar`;
  $('meta[name="description"]').content = `${productName}: explore ingredients, flavour notes, serving ideas and jar sizes.`;
  $('meta[property="og:title"]').content = document.title;
  $('meta[property="og:description"]').content = $('meta[name="description"]').content;
  const canonical = $('link[rel="canonical"]');
  const canonicalUrl = new URL(canonical.href);
  canonicalUrl.searchParams.set('product', selected.dataset.product);
  canonical.href = canonicalUrl.href;
  $('meta[property="og:url"]').content = canonicalUrl.href;
  const schema = $('script[type="application/ld+json"]');
  const data = JSON.parse(schema.textContent);
  data.name = `${productName}`;
  data.description = $('h1 + p', selected).textContent.trim();
  schema.textContent = JSON.stringify(data, null, 2);

  $$('.gallery-thumb', selected).forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      const image = $('.gallery-main img', selected);
      image.src = thumbnail.dataset.src;
      image.alt = $('img', thumbnail).alt;
      $$('.gallery-thumb', selected).forEach((button) => {
        const active = button === thumbnail;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    });
  });

  $('.size-select', selected).addEventListener('change', (event) => {
    const amount = $('[data-base-price]', selected);
    amount.textContent = Math.round(Number(amount.dataset.basePrice) * Number(event.target.value));
  });

  const quantity = $('.quantity-stepper input', selected);
  $$('[data-quantity]', selected).forEach((button) => {
    button.addEventListener('click', () => {
      quantity.value = Math.max(1, Math.min(99, (Number(quantity.value) || 1) + Number(button.dataset.quantity)));
    });
  });
  quantity.addEventListener('change', () => {
    quantity.value = Math.max(1, Math.min(99, Math.round(Number(quantity.value) || 1)));
  });

  $('.product-enquiry', selected).addEventListener('click', () => {
    const size = $('.size-select option:checked', selected).textContent.trim();
    const subject = `${productName} — ${quantity.value} × ${size}`;
    window.location.href = `contact.html?type=Product+question&subject=${encodeURIComponent(subject)}#enquiry`;
  });
}

function initJournalFilters() {
  const search = $('#journal-search');
  if (!search) return;

  const category = $('#journal-category');
  const stories = $$('.journal-card');
  const pageButtons = $$('[data-blog-page]');
  const pageSize = 3;
  let currentPage = 1;
  search.value = params.get('search') || '';
  if ($$('option', category).some((option) => option.value === params.get('category'))) {
    category.value = params.get('category');
  }

  function renderStories() {
    const matches = stories.filter((story) => story.dataset.title.includes(search.value.trim().toLowerCase())
      && (category.value === 'all' || story.dataset.category === category.value));
    const pageCount = Math.ceil(matches.length / pageSize);
    currentPage = Math.max(1, Math.min(currentPage, pageCount || 1));
    stories.forEach((story) => {
      const index = matches.indexOf(story);
      story.hidden = index < (currentPage - 1) * pageSize || index >= currentPage * pageSize;
    });
    $('#journal-count').textContent = `${matches.length} stor${matches.length === 1 ? 'y' : 'ies'} found · page ${currentPage} of ${pageCount || 1}`;
    $('#journal-empty').hidden = matches.length > 0;
    pageButtons.forEach((button) => {
      const page = Number(button.dataset.blogPage);
      button.hidden = page > pageCount;
      if (page === currentPage) {
        button.setAttribute('aria-current', 'page');
      } else {
        button.removeAttribute('aria-current');
      }
    });
  }

  [search, category].forEach((control) => {
    control.addEventListener('input', () => {
      currentPage = 1;
      renderStories();
    });
  });
  pageButtons.forEach((button) => {
    button.addEventListener('click', () => {
      currentPage = Number(button.dataset.blogPage);
      renderStories();
    });
  });
  renderStories();
}

function initArticles() {
  const articles = $$('.article-body');
  if (!articles.length) return;

  const selected = articles.find((article) => article.dataset.article === params.get('article')) || articles[0];
  articles.forEach((article) => {
    article.hidden = article !== selected;
  });
  const headline = $('h1', selected).textContent.trim();
  document.title = `${headline} | Orchard & Jar`;
  const description = $('.article-lead', selected).textContent.trim();
  $('meta[name="description"]').content = description;
  $('meta[property="og:title"]').content = document.title;
  $('meta[property="og:description"]').content = description;
  const canonical = $('link[rel="canonical"]');
  const url = new URL(canonical.href);
  url.searchParams.set('article', selected.dataset.article);
  canonical.href = url.href;
  $('meta[property="og:url"]').content = url.href;
  const schema = $('script[type="application/ld+json"]');
  const data = JSON.parse(schema.textContent);
  data.headline = headline;
  data.description = description;
  const articleDates = {
    strawberry: '2026-09-08',
    harvest: '2026-09-18',
    gifting: '2026-09-25',
    marmalade: '2026-10-02',
    baking: '2026-10-06',
    'small-batch': '2026-10-10'
  };
  data.datePublished = articleDates[selected.dataset.article];
  schema.textContent = JSON.stringify(data, null, 2);
  $('time', selected).dateTime = data.datePublished;

  $('.share-article', selected).addEventListener('click', async () => {
    const status = $('.share-status', selected);
    try {
      if (navigator.share) {
        await navigator.share({ title: headline, url: window.location.href });
        status.textContent = 'Sharing opened.';
      } else if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(window.location.href);
        status.textContent = 'Story link copied.';
      } else {
        status.textContent = `Copy this link: ${window.location.href}`;
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        status.textContent = `Copy this link: ${window.location.href}`;
      }
    }
  });
}

function validateForm(form) {
  let firstInvalid = null;
  $$('input, select, textarea', form).forEach((input) => {
    input.setCustomValidity('');
    if (input.name === 'confirm-password' && input.value !== $('[name="password"]', form).value) {
      input.setCustomValidity('Passwords must match.');
    }
    if (input.type === 'number' && input.name === 'quantity' && Number(input.value) < 1) {
      input.setCustomValidity('Enter a quantity of at least 1.');
    }
    const valid = input.checkValidity();
    input.setAttribute('aria-invalid', String(!valid));
    const field = input.closest('.form-field');
    const error = field ? $('.field-error', field) : null;
    if (error) {
      error.textContent = valid ? '' : input.validationMessage;
      if (!error.id) error.id = `${input.id}-error`;
      input.setAttribute('aria-describedby', error.id);
    }
    if (!valid && !firstInvalid) firstInvalid = input;
  });
  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }
  return true;
}

function initForms() {
  const type = $('#field-type');
  const subject = $('#field-subject');
  if (type && $$('option', type).some((option) => option.value === params.get('type'))) {
    type.value = params.get('type');
  }
  if (subject && params.get('subject')) subject.value = params.get('subject');

  $$('.demo-form').forEach((form) => {
    form.noValidate = true;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = $('.form-status', form);
      status.classList.remove('error');
      if (!validateForm(form)) {
        status.textContent = 'Please review the highlighted fields. Nothing has been sent.';
        status.classList.add('error');
        return;
      }
      const messages = {
        newsletter: 'Signup is currently unavailable. Your email has not been sent or saved.',
        enquiry: 'Your enquiry has been checked. Online enquiries are unavailable; nothing has been sent or saved.',
        login: 'Account access is currently unavailable. Your credentials have not been sent or saved.',
        register: 'Registration is currently unavailable. No account was created and your password has not been saved.',
        reset: 'Password reset is currently unavailable. No reset email has been sent.'
      };
      status.textContent = messages[form.dataset.kind];
      if (['login', 'register'].includes(form.dataset.kind)) {
        $$('input[name="password"], input[name="confirm-password"]', form).forEach((input) => {
          input.value = '';
        });
      }
    });
  });

  $$('.password-toggle').forEach((button) => {
    button.addEventListener('click', () => {
      const input = document.getElementById(button.getAttribute('aria-controls'));
      const visible = input.type === 'password';
      input.type = visible ? 'text' : 'password';
      button.setAttribute('aria-label', `${visible ? 'Hide' : 'Show'} password`);
      button.innerHTML = `<i class="bi bi-${visible ? 'eye-slash' : 'eye'}" aria-hidden="true"></i>`;
    });
  });

  const giftForm = $('#gift-builder');
  if (giftForm) {
    giftForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const selected = $$('input[name="flavour"]:checked', giftForm);
      const status = $('.form-status', giftForm);
      status.classList.toggle('error', selected.length === 0 || selected.length > 3);
      if (selected.length === 0 || selected.length > 3) {
        status.textContent = 'Please choose between 1 and 3 flavours for your gift box.';
        $('input[name="flavour"]', giftForm).focus();
        return;
      }
      const note = $('#field-gift-note').value.trim();
      status.textContent = `Your gift combination: ${selected.map((input) => input.value).join(', ')}.${note ? ` Message: “${note}”.` : ''} No order placed. Explore the contact page for gifting information.`;
    });
  }
}

function initSmallDetails() {
  $$('[data-year]').forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  // Only below-the-fold content gets a reveal, so page titles and controls
  // are immediately usable. Each element enters once, without constant motion.
  const selector = [
    '.section-heading',
    '.editorial',
    '.featured-product',
    '.product-card',
    '.journal-card',
    '.testimonial',
    '.gift-card',
    '.pricing-card',
    '.maker-grid article',
    '.values-grid article',
    '.supply-grid article',
    '.format-grid article',
    '.process-list li',
    '.timeline li',
    '.newsletter',
    '.cta-copy',
    '.season-calendar article',
    '.pairing-layout',
    '.taste-guide > a',
    '.pantry-care',
    '.harvest-steps li'
  ].join(', ');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.04,
    rootMargin: '0px 0px 32px 0px'
  });

  $$(selector).forEach((element) => {
    if (element.getBoundingClientRect().top > window.innerHeight + 16) {
      element.classList.add('motion-reveal');
      observer.observe(element);
    }
  });

  // Follow operating-system changes during the visit as well.
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (event) => {
    if (event.matches) {
      observer.disconnect();
      $$('.motion-reveal').forEach((element) => {
        element.classList.add('is-visible');
      });
    }
  });
}

initPreferences();
initNavigation();
initProductFilters();
initProductDetails();
initJournalFilters();
initArticles();
initForms();
initSmallDetails();
