// Function to fetch quotes from a JSON file
async function fetchQuotesFromJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch quotes');
      }
      const data = await response.json();
      return data.quotes;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  
  // Function to get a random quote from an array
  function getRandomQuote(quotes) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }
  
  // Function to update the quote text and author in the HTML
  function displayQuote() {
    const quote = getRandomQuote(quotes);
    const quoteTextElement = document.getElementById('text');
    const quoteAuthorElement = document.getElementById('author');
    quoteTextElement.textContent = quote.quote;
    quoteAuthorElement.textContent = quote.author;
  }
  
  // Event listener for the "New Quote" button
  document.getElementById('new-quote').addEventListener('click', displayQuote);
  
  // URL of the JSON file containing quotes
  const jsonUrl = 'quotes.json';
  
  // Fetch quotes from the JSON file and display a random quote
  let quotes = [];
  fetchQuotesFromJSON(jsonUrl)
    .then(data => {
      quotes = data;
      displayQuote();
    })
    .catch(error => console.error(error));

// Function to share the quote
function shareQuote() {
    const quoteText = document.getElementById('text').textContent;
    const quoteAuthor = document.getElementById('author').textContent;
  
    const shareMessage = `Check out this quote:\n\n"${quoteText}"\n- ${quoteAuthor}`;
  
    if (navigator.share && navigator.canShare) {
      // Check if the Web Share API is supported
      navigator.share({
        title: 'Quote',
        text: shareMessage
      })
        .catch(error => {
          console.error('Error sharing quote:', error);
        });
    } else {
      // Fallback to prompt if Web Share API is not supported
      prompt('Share this quote:', shareMessage);
    }
  }
  
// Event listener for the "Share Quote" button
document.getElementById('share-quote').addEventListener('click', shareQuote);