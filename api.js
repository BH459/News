const BASEURL = "https://saurav.tech/NewsAPI/top-headlines/category";
const dropdown1 = document.querySelector("#country");
const dropdown2 = document.querySelector("#category");
const btn = document.querySelector(".search-btn");
const darkbtn = document.getElementById("darkbtn");

const countryList = {
  India: "in",
  USA: "us",
  Australia: "au",
  Russia: "ru",
  France: "fr",
  "United Kingdom": "gb",
};

const categoryList = {
  Business: "business",
  Entertainment: "entertainment",
  General: "general",
  Health: "health",
  Science: "science",
  Sports: "sports",
  Technology: "technology",
};

// Populate the country dropdown
Object.entries(countryList).forEach(([countryName, countryCode]) => {
  let newOption = document.createElement("option");
  newOption.value = countryCode;
  newOption.textContent = countryName;
  dropdown1.appendChild(newOption);
});

Object.entries(categoryList).forEach(([categoryName, categoryCode]) => {
  let newOption1 = document.createElement("option");
  newOption1.value = categoryCode;
  newOption1.textContent = categoryName;
  dropdown2.appendChild(newOption1);
});

btn.addEventListener("click", async () => {
  const countryselect = dropdown1.value;
  const categoryselect = dropdown2.value;
  const URL = `${BASEURL}/${categoryselect}/${countryselect}.json`;
  const newsfeed = document.querySelector(".news-feed");

  try {
    newsfeed.innerHTML = ""; // Clear previous news items
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch news: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsfeed.innerHTML = "<p>No news articles found for the selected options.</p>";
      return;
    }

    data.articles.forEach((article) => {
      const newsItem = document.createElement("div");
      newsItem.classList.add("news-item");
      newsItem.innerHTML = `
        <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="https://via.placeholder.com/150">
        <div>
          <h3>${article.title || 'No Title Available'}</h3>
          <p>${article.description || 'No Description Available'}</p>
          <a href="${article.url}" target="_blank" class="articles">Read More</a>
        </div>
      `;
      newsfeed.appendChild(newsItem);
    });
  } catch (err) {
    console.error(err.message);
    newsfeed.innerHTML = `<p style="color: red;">Error: ${err.message}</p>`;
  }
});

darkbtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});