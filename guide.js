(() => {
  const input = document.querySelector('#guide-search-input');
  const clearButton = document.querySelector('#guide-search-clear');
  const status = document.querySelector('#guide-search-status');
  const tableOfContents = document.querySelector('.guide-toc');
  const guidePage = document.querySelector('.guide-page');
  const items = [...document.querySelectorAll('[data-guide-item]')];
  if (!input || !status || items.length === 0) return;

  const sections = [...document.querySelectorAll('.guide-section')];
  const emptyState = document.createElement('p');
  emptyState.className = 'guide-no-results';
  emptyState.textContent = '找不到符合的功能。試試「座標」、「路線」或「連線」。';
  emptyState.setAttribute('role', 'status');
  document.querySelector('.guide-search')?.after(emptyState);

  const update = () => {
    const query = input.value.trim().toLocaleLowerCase('zh-Hant');
    let visible = 0;
    items.forEach((item) => {
      const haystack = `${item.dataset.search || ''} ${item.textContent}`.toLocaleLowerCase('zh-Hant');
      const matches = !query || haystack.includes(query);
      item.hidden = !matches;
      if (matches) visible += 1;
    });
    sections.forEach((section) => {
      const sectionItems = [...section.querySelectorAll('[data-guide-item]')];
      section.hidden = Boolean(query) && (sectionItems.length === 0 || !sectionItems.some((item) => !item.hidden));
    });
    if (tableOfContents) tableOfContents.hidden = Boolean(query);
    guidePage?.classList.toggle('is-searching', Boolean(query));
    emptyState.classList.toggle('is-visible', Boolean(query) && visible === 0);
    status.textContent = query ? `找到 ${visible} 項功能說明` : `共 ${visible} 項功能說明`;
    if (clearButton) clearButton.hidden = !query;
  };

  input.addEventListener('input', update);
  clearButton?.addEventListener('click', () => {
    input.value = '';
    update();
    input.focus();
  });
  update();
})();
