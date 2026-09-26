const copyButton = document.querySelector('#copyLine');
const copyStatus = document.querySelector('#copyStatus');

copyButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('@689whbkl');
    copyStatus.textContent = '已複製 LINE ID';
  } catch {
    copyStatus.textContent = '請手動複製：@689whbkl';
  }
});
