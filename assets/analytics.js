(() => {
  const key = 'lth-analytics-excluded';
  const status = document.getElementById('analytics-status');
  const isExcluded = () => localStorage.getItem(key) === '1';

  if (status) {
    const render = () => {
      try {
        status.textContent = isExcluded()
          ? '현재 이 브라우저의 방문은 집계에서 제외됩니다.'
          : '현재 이 브라우저의 방문은 집계에 포함됩니다.';
      } catch {
        status.textContent = '브라우저 저장소를 사용할 수 없습니다. 사이트 데이터 저장을 허용한 뒤 다시 설정해 주세요.';
      }
    };
    document.querySelectorAll('[data-analytics-exclude]').forEach(button => {
      button.addEventListener('click', () => {
        try {
          if (button.dataset.analyticsExclude === '1') localStorage.setItem(key, '1');
          else localStorage.removeItem(key);
          render();
        } catch {
          status.textContent = '설정을 저장하지 못했습니다. 사이트 데이터 저장을 허용한 뒤 다시 시도해 주세요.';
        }
      });
    });
    window.addEventListener('storage', render);
    render();
    return; // The settings page itself never sends analytics.
  }

  try {
    if (isExcluded()) return;
  } catch {
    return; // Do not track when the browser preference cannot be read.
  }
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  const script = document.createElement('script');
  script.src = '/_vercel/insights/script.js';
  script.defer = true;
  document.head.appendChild(script);
  // Apply changes to any portfolio tabs that were already open.
  window.addEventListener('storage', event => {
    if (event.key === key || event.key === null) location.reload();
  });
})();
