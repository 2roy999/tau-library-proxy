chrome.runtime.onInstalled.addListener(() => {
  fetch(chrome.runtime.getURL('configs/tau.json'))
    .then(response => response.json())
    .then(json => {
      const mappings = json.mappings
      Object.entries(mappings).forEach(([from, to]) => {
        chrome.webRequest.onBeforeRequest.addListener((details) => {
          const url = new URL(details.url)
          url.host = to
          return { redirectUrl: url.toString() }
        },
          { urls: [`*://${from}/*`] },
          ['blocking'])
      })
    })
})
