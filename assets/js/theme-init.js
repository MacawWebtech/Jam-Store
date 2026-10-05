/* Apply saved preferences before the first paint. */
(() => {
  try {
    const theme = localStorage.getItem('orchard-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = theme || (systemDark ? 'dark' : 'light');
    document.documentElement.dir = localStorage.getItem('orchard-direction') || 'ltr';
  } catch {
    document.documentElement.dataset.theme = 'light';
  }
})();
