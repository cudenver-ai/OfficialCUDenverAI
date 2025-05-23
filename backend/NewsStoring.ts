/**
 * This script allows us to store news events about AI from the newsapi in our SQL database for easy retrieval and avoiding API limits
 */


const { connectToDB , connection } = require('./DatabaseConnection.ts');
const axios = require('axios');
require('dotenv').config();
const mysql = require('mysql2/promise');
const { v4: uuidv4 } = require('uuid');

//hidhfkjafh
// Function to fetch and store papers
async function fetchAndStoreNews() {
    try {
        let connection = await connectToDB(process.env.DB_USERNAME, process.env.DB_PASSWORD)

        // NewsAPI
        const response = await axios.get(`https://newsapi.org/v2/everything?q=Artificial Intelligence&apiKey=${process.env.NEWS_ID}`);

        // Extract the data and insert it into the database
        console.log(response.data)
        const news = response.data.articles;
        for (const n of news) {
            console.log(n)
            const id = parseInt(uuidv4().replace(/-/g, '').slice(0, 8), 16);;
            const title = n.title || 'Unknown Title';
            const author = n.author || 'Unknown Authors';
            const content = n.content || 'No Content';
            const description = n.description|| 'No Description';
            const publishedAt = n.publishedAt.replace('T', ' ').replace('Z', '') || null;
            const url = n.url || 'No URL';
            const urlToImage = n.urlToImage || 'No Image';
        
            // We don't want to display news without images and most of them are errors
            if (urlToImage == 'No Image') {
                continue;
            }

                    
            // Check if the news article already exists based on its URL
            const [existingNews] = await connection.execute(
                'SELECT id FROM NEWS WHERE url = ? LIMIT 1',
                [url]
            );

            if (existingNews.length === 0) {
                // Insert into the database only if the news does not exist
                await connection.execute(
                    'INSERT INTO NEWS (id, title, author, content, description, publishedAt, url, urlToImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                    [id, title, author, content, description, publishedAt, url, urlToImage]
                );
                console.log(`Inserted news: ${title}`);
            } else {
                console.log(`News already exists: ${title}`);
            }
        }
        // Close the database connection
        await connection.end();
    
        console.log('News fetched and stored successfully!');
        } catch (error) {
        console.error('Error fetching data or inserting into the database:', error);
        }
    }


fetchAndStoreNews()
