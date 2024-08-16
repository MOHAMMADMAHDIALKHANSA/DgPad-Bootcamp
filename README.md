## README: Article Scraping Project

### Overview

This project is designed to scrape articles from a specified website using its sitemap. It retrieves article URLs from monthly sitemaps, scrapes detailed information from each article, and saves the data into JSON files. The project is built with Python and uses several libraries to handle HTTP requests, HTML parsing, and JSON serialization.

### Prerequisites

Ensure you have the following Python libraries installed:

- `requests`: For making HTTP requests to fetch the sitemap and article content.
- `beautifulsoup4`: For parsing the HTML content of the articles.
- `lxml`: For efficient parsing of the HTML and XML.
- `tenacity`: For adding retry logic to HTTP requests.

You can install the required libraries using pip:

```bash
pip install requests beautifulsoup4 lxml tenacity
```

### Project Structure

- **Article Data Class**: A data class to represent the structure of the article data, including attributes like URL, post ID, title, keywords, thumbnail, publication date, last updated date, author, content, video duration, and word count.

- **SitemapParser Class**: Handles fetching and parsing the sitemap index and monthly sitemaps to extract article URLs.

- **ArticleScraper Class**: Scrapes individual articles, extracting metadata, full text, video duration, and calculating the word count.

- **FileUtility Class**: Handles saving the scraped article data into JSON files, organized by year and month.

- **Main Function**: Orchestrates the entire process of retrieving sitemaps, scraping articles, and saving the data.

### Usage

1. **Set the Sitemap URL**: 
   - The project starts by defining the sitemap index URL (in this case, `https://www.almayadeen.net/sitemaps/all.xml`).

2. **Run the Script**:
   - Execute the script by running the `main()` function. The script will:
     - Fetch the sitemap index.
     - Iterate through each monthly sitemap to retrieve article URLs.
     - Scrape each article for detailed information.
     - Save the scraped data to a JSON file named `articles_YEAR_MONTH.json`.

3. **Output**:
   - The JSON files will be saved in the `json_files7` directory on your desktop (`C:\Users\MHMD MAHDI\OneDrive\Desktop\dgpad\Task One\json_files7`). Each file will contain data for all articles scraped from a particular month.

### Customization

- **Maximum Articles**: The script is configured to scrape a maximum of 10,000 articles. You can adjust the `max_articles` variable in the `main()` function if you need to change this limit.

- **Directory for Saving Files**: The directory where JSON files are saved can be changed by modifying the `directory` variable in the `FileUtility.save_to_json` method.

- **Retry Logic**: The `tenacity` library is used to handle retrying failed HTTP requests. You can customize the retry behavior by adjusting the `stop_after_attempt` and `wait_exponential` settings.

### Error Handling

- The script is designed to handle network-related errors with retries using the `tenacity` library. In case of failures after the maximum retry attempts, the script will log the error and continue processing the next sitemap or article.

### License

This project is licensed under the MIT License.

### Contact

For any inquiries or support, please contact [Your Name] at [Your Email Address].

---

This README file should provide you with all the necessary information to understand, use, and modify the article scraping project. Happy scraping!
