(function () {
  const quotesContainer = document.querySelector(".quotes");
  const loader = document.querySelector(".loader");

  const hideLoader = () => {
    loader.classList.remove("show");
  };

  const showLoader = () => {
    loader.classList.add("show");
  };

  // GET QUOTES FROM APIs
  const getQuotes = async (page, limit) => {
    const API_URL = `https://api.javascripttutorial.net/v1/quotes/?page=${page}&limit=${limit}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
    const quotes = await response.json();
    return quotes;
  };

  const bindQuotes = (quotes) => {
    quotes.forEach((quote) => {
      const blockquote = document.createElement("blockquote");
      blockquote.classList.add("quote");
      blockquote.innerHTML = `
      <div>
        <span>${quote.id}</span>
        ${quote.quote}</div>
        <footer>${quote.author}</footer>
      `;
      quotesContainer.appendChild(blockquote);
    });
  };

  const loadQuotes = async (page, limit) => {
    showLoader();
    setTimeout(async () => {
      try {
        if (hasMoreQuotes(page, limit, total)) {
          const response = await getQuotes(page, limit);
          bindQuotes(response.data);
          total = response.total;
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 1000);
  };

  const hasMoreQuotes = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log(scrollTop + clientHeight, scrollHeight);

    if (scrollTop + clientHeight >= scrollHeight) {
      currentPage++;
      loadQuotes(currentPage, limit);
    }
  });

  // configuration for fetching quotes
  let currentPage = 1;
  const limit = 10;
  let total = 0;

  // initialize the application
  loadQuotes(currentPage, limit);
})();
