(function () {
  const counterNode = document.getElementById("visitorCount");

  if (!counterNode) {
    return;
  }

  const namespace = "tgiftsn100.github.io";
  const key = "deo2-site-total-visits";
  const sessionKey = "deo2-site-visit-recorded";
  const cacheKey = "deo2-site-count-cache";
  const hitUrl = `https://api.countapi.xyz/hit/${namespace}/${key}`;
  const getUrl = `https://api.countapi.xyz/get/${namespace}/${key}`;

  function formatCount(value) {
    return Number(value || 0).toLocaleString();
  }

  function renderCount(value) {
    counterNode.textContent = formatCount(value);
  }

  function renderUnavailable() {
    counterNode.textContent = "Unavailable";
  }

  function readCachedCount() {
    const cachedValue = localStorage.getItem(cacheKey);
    const parsedValue = Number(cachedValue);

    return Number.isFinite(parsedValue) ? parsedValue : null;
  }

  function writeCachedCount(value) {
    localStorage.setItem(cacheKey, String(value));
  }

  async function fetchCount(url) {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Could not fetch visitor count");
    }

    const data = await response.json();
    return data.value;
  }

  async function syncVisitorCount() {
    try {
      const hasRecordedSession = sessionStorage.getItem(sessionKey) === "1";
      const cachedCount = readCachedCount();

      if (cachedCount !== null) {
        renderCount(hasRecordedSession ? cachedCount : cachedCount + 1);
      }

      const count = hasRecordedSession
        ? await fetchCount(getUrl)
        : await fetchCount(hitUrl);

      if (!hasRecordedSession) {
        sessionStorage.setItem(sessionKey, "1");
      }

      writeCachedCount(count);
      renderCount(count);
    } catch (error) {
      console.error("Visitor counter error:", error);

      const cachedCount = readCachedCount();

      if (cachedCount !== null) {
        renderCount(cachedCount);
        return;
      }

      renderUnavailable();
    }
  }

  syncVisitorCount();
})();
