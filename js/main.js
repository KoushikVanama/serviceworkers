
// maker sure sw are supported for a given browser
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      // .register('../sw_cached_site.js')
      .then(reg => {
        console.log('sw registered:', reg);
      })
      .catch(err => console.log(`sw Error:`, err));
  });
}