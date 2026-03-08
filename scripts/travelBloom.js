// Define the API URL. We're using a JSON file to simulate an API call.
const API_URL = "./data.json";

// Get references to the important elements on the page
const searchInput = document.getElementById("searchKeywords");
const searchButton = document.getElementById("searchBtn");
const clearSearchButton = document.getElementById("clearBtn");
const searchResultContainer = document.getElementById(
  "search-result-container",
);
const heroElement = document.getElementById("hero-element");
const container = document.getElementById("container");

/**
 * Hide the hero container and display the search results
 */
function displaySearchResults(results) {
  heroElement.classList.add("hidden");

  // Clear the HTML from the search result container and then display it
  searchResultContainer.innerHTML = "";
  searchResultContainer.classList.remove("hidden");

  // Display a no search results found message, if the length of the results array is 0
  if (results.length === 0) {
    const errorMessageCard = document.createElement("div");
    errorMessageCard.classList.add("card", "glass");
    const errorMessageTitle = document.createElement("h1");
    errorMessageTitle.innerText = "No results found!";
    errorMessageCard.appendChild(errorMessageTitle);
    searchResultContainer.appendChild(errorMessageCard);
  }

  // Iterate through the results, create the elements and append then to the searchResultContainer
  results.forEach((result) => {
    // Create the card
    const searchResultCard = document.createElement("div");
    searchResultCard.classList.add("card", "glass");

    // Create the elements of the card
    const searchResultCardImage = document.createElement("img");
    searchResultCardImage.src = result.imageUrl;
    searchResultCardImage.alt = `Image of ${result.name}`;
    const searchResultCardTitle = document.createElement("h2");
    searchResultCardTitle.innerText = result.name;
    const searchResultCardDescription = document.createElement("p");
    searchResultCardDescription.innerText = `${result.description}`;

    // Append each element to the card
    searchResultCard.appendChild(searchResultCardImage);
    searchResultCard.appendChild(searchResultCardTitle);
    searchResultCard.appendChild(searchResultCardDescription);

    // Append the card to the container
    searchResultContainer.appendChild(searchResultCard);
  });
}

/**
 * Performs a generic search
 */
function genericSearch(data, searchTerm) {
  // Flatten all locations into one array
  const allLocations = [
    ...data.countries.flatMap((country) => country.cities),
    ...data.temples,
    ...data.beaches,
  ];

  // Search the signle array for the search term and return the result
  return allLocations.filter((location) => {
    return (
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
}

/**
 * Fetches the JSON data
 */
function fetchSearchResults() {
  const searchQuery = searchInput.value;
  if (searchQuery === "") return;

  // Use fetch to retrieve the data from the JSON file
  fetch(API_URL, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      let results;
      switch (searchQuery.toLowerCase().trim()) {
        case "country":
        case "countries":
          // Flatten the cities into a single array
          results = data.countries.flatMap((country) => country.cities);
          break;

        case "temple":
        case "temples":
          results = data.temples;
          break;

        case "beach":
        case "beaches":
          results = data.beaches;
          break;

        // Default to a generic search function
        default:
          results = genericSearch(data, searchQuery);
      }

      displaySearchResults(results);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}

/**
 * Hide the search results, clear the search input and show the hero element again
 */
function clearSearchResults() {
  searchInput.value = "";
  heroElement.classList.remove("hidden");
  searchResultContainer.innerHTML = "";
  searchResultContainer.classList.add("hidden");
}

// Add click listener to the search and clear buttons
searchButton.addEventListener("click", fetchSearchResults);
clearSearchButton.addEventListener("click", clearSearchResults);

// Add enter keydown event for the seach input
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") fetchSearchResults();
});
