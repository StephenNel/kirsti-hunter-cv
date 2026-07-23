/* The Hunter Herald — builds newspaper pages from ARTICLES and runs the flipbook */
(function () {
  'use strict';

  const PAPER_NAME = 'The Hunter Herald';
  const FOLIO = 'VOL. I, NO. 1 · POTCHEFSTROOM & THE GARDEN ROUTE · PORTFOLIO EDITION · PRICE R2,50';

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  /* ---------- front page (hard cover) ---------- */
  function buildCover() {
    const page = el('div', 'page page--cover');
    page.dataset.density = 'hard';
    const inner = el('div', 'page-inner cover-inner');

    // ears + masthead
    const mastRow = el('div', 'mast-row');
    const earL = el('div', 'ear');
    earL.append(el('span', '', 'EST. 2024'), el('span', '', 'POTCHEFSTROOM'));
    const earR = el('div', 'ear');
    earR.append(el('span', '', 'GARDEN ROUTE'), el('span', '', 'SUN & DEADLINES'));
    const mast = el('h1', 'masthead', PAPER_NAME);
    mastRow.append(earL, mast, earR);
    inner.append(mastRow);

    const folio = el('div', 'folio-line', FOLIO);
    inner.append(folio);

    // lead story
    const lead = el('div', 'cover-lead');
    lead.append(el('p', 'kicker', 'SPECIAL EDITION · THE JOURNALIST HERSELF'));
    lead.append(el('h2', 'cover-headline', 'A Reporter in the Making'));
    lead.append(el('p', 'cover-subhead', 'Kirsti Hunter — student journalist, storyteller, and stubborn believer in the well-asked question'));

    const feature = el('div', 'cover-feature');

    const figure = el('figure', 'cover-figure');
    const img = document.createElement('img');
    img.src = 'assets/kirsti.jpg';
    img.alt = 'Kirsti Hunter';
    figure.append(img, el('figcaption', '', 'Miss K. Hunter, correspondent. — Staff photograph'));
    feature.append(figure);

    const story = el('div', 'cover-story');
    [
      'POTCHEFSTROOM — Third-year Bachelor of Arts in Communication student at North-West University, Kirsti Hunter is passionate about journalism and is seeking hands-on experience in writing, reporting and media production.',
      'Her training ground has been the Dinki day-residence newsletter, where she has written since 2024, and the newsroom of the Mossel Bay Advertiser, where she job-shadowed through the summer of 2025–26 and returns in June.',
      'Skilled in research, communication and digital tools — from Adobe InDesign to the notebook in her back pocket — she brings a strong academic foundation in mass media and a warm, unhurried eye for the stories people actually live.',
    ].forEach((t, i) => {
      const p = el('p', i === 0 ? 'lede' : '', t);
      story.append(p);
    });
    feature.append(story);
    lead.append(feature);
    inner.append(lead);

    // index box
    const index = el('div', 'index-box');
    index.append(el('p', 'index-title', 'IN THIS EDITION'));
    const list = el('ul', 'index-list');
    ARTICLES.forEach((a, i) => {
      const li = el('li');
      li.append(el('span', 'idx-cat', a.category), el('span', 'idx-head', a.headline), el('span', 'idx-page', String(i + 2)));
      list.append(li);
    });
    index.append(list);
    inner.append(index);

    page.append(inner);
    return page;
  }

  /* ---------- article page ---------- */
  function buildArticlePage(a, i) {
    const pageNo = i + 2;
    const side = (i % 2 === 0) ? 'page--left' : 'page--right';
    const page = el('div', 'page page--article ' + side);
    const inner = el('div', 'page-inner');

    // running head
    const rh = el('div', 'running-head');
    rh.append(
      el('span', '', a.date),
      el('span', 'rh-paper', PAPER_NAME.toUpperCase()),
      el('span', '', 'PAGE ' + pageNo)
    );
    inner.append(rh);

    inner.append(el('p', 'kicker', a.category.toUpperCase() + ' · ' + a.dateline));

    const hl = el('h2', 'headline', a.headline);
    if (a.headline.length > 42) hl.classList.add('headline--long');
    inner.append(hl);

    inner.append(el('p', 'subhead', a.subhead));

    const byline = el('p', 'byline');
    byline.append(el('span', 'by-name', 'By Kirsti Hunter'));
    byline.append(el('span', 'by-credit', ' · ' + a.credit));
    inner.append(byline);

    const body = el('div', 'article-body');
    const wordCount = a.body.join(' ').split(/\s+/).length;
    if (wordCount > 360) body.classList.add('article-body--dense');
    a.body.forEach((para, pi) => {
      if (pi === 0) {
        const p = el('p', 'para para-first');
        p.append(el('span', 'dateline-lead', a.dateline + ' — '));
        p.append(document.createTextNode(para));
        body.append(p);
      } else {
        body.append(el('p', 'para', para));
      }
      // pull-quote after the second paragraph
      if (pi === 1 && a.pullquote) {
        const pq = el('aside', 'pullquote');
        pq.append(el('p', '', '“' + a.pullquote + '”'));
        body.append(pq);
      }
    });
    const last = body.lastElementChild;
    if (last) last.append(el('span', 'endmark', ' ■'));
    inner.append(body);

    page.append(inner);
    return page;
  }

  /* ---------- back page (hard cover) ---------- */
  function buildBack() {
    const page = el('div', 'page page--back');
    page.dataset.density = 'hard';
    const inner = el('div', 'page-inner back-inner');

    inner.append(el('h2', 'back-mast', PAPER_NAME));
    inner.append(el('p', 'back-rule', '— COLOPHON —'));

    const col = el('div', 'colophon');
    [
      'This edition collects the writing and portfolio work of Kirsti Hunter: student journalist at North-West University, writer for the Dinki day-residence newsletter, and job-shadow alumna of the Mossel Bay Advertiser.',
      'Set in Playfair Display and Old Standard on warm newsprint. Edited, laid out and worried over by the author herself.',
    ].forEach(t => col.append(el('p', '', t)));
    inner.append(col);

    const contact = el('div', 'back-contact');
    contact.append(el('p', 'bc-title', 'LETTERS TO THE EDITOR'));
    const mkLine = (label, href, text) => {
      const p = el('p', 'bc-line');
      p.append(el('span', 'bc-label', label + '  '));
      const aEl = el('a', '', text);
      aEl.href = href;
      if (href.startsWith('http')) { aEl.target = '_blank'; aEl.rel = 'noopener'; }
      p.append(aEl);
      return p;
    };
    contact.append(
      mkLine('TEL', 'tel:+27662363233', '066 236 3233'),
      mkLine('POST', 'mailto:kirstihunter15@gmail.com', 'kirstihunter15@gmail.com'),
      mkLine('WIRE', 'https://www.linkedin.com/in/kirstihunter-journalism', 'linkedin.com/in/kirstihunter-journalism')
    );
    inner.append(contact);

    inner.append(el('p', 'back-signoff', '“Truth, warmly told.”'));

    const backBtn = el('a', 'back-to-desk', '← Return to the newsroom desk');
    backBtn.href = 'index.html';
    inner.append(backBtn);

    page.append(inner);
    return page;
  }

  /* ---------- build & mount ---------- */
  const book = document.getElementById('book');
  const frag = document.createDocumentFragment();
  frag.append(buildCover());
  ARTICLES.forEach((a, i) => frag.append(buildArticlePage(a, i)));
  frag.append(buildBack());
  book.append(frag);

  const startPage = Math.max(0, parseInt(new URLSearchParams(location.search).get('page'), 10) - 1 || 0);

  const pageFlip = new St.PageFlip(book, {
    startPage: startPage,
    width: 550,
    height: 730,
    size: 'stretch',
    minWidth: 230,
    maxWidth: 620,
    minHeight: 305,
    maxHeight: 823,
    maxShadowOpacity: 0.55,
    showCover: true,
    drawShadow: true,
    flippingTime: 900,
    usePortrait: true,
    autoSize: true,
    mobileScrollSupport: false,
    showPageCorners: true,
    swipeDistance: 24,
  });

  pageFlip.loadFromHTML(document.querySelectorAll('#book .page'));

  /* ---------- controls ---------- */
  const indicator = document.getElementById('pageIndicator');
  const total = pageFlip.getPageCount();

  function updateIndicator() {
    const idx = pageFlip.getCurrentPageIndex();
    if (idx === 0) indicator.textContent = 'Front page';
    else if (idx >= total - 1) indicator.textContent = 'Back page';
    else indicator.textContent = 'Page ' + (idx + 1) + ' of ' + total;
  }
  updateIndicator();

  pageFlip.on('flip', () => updateIndicator());

  document.getElementById('prevBtn').addEventListener('click', () => pageFlip.flipPrev('bottom'));
  document.getElementById('nextBtn').addEventListener('click', () => pageFlip.flipNext('bottom'));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') pageFlip.flipNext('bottom');
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') pageFlip.flipPrev('bottom');
  });
})();
