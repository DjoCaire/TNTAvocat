// Variables Contentful
const SPACE_ID = 'fv2r7ftwppem';
const ACCESS_TOKEN = 'mNY3WIyRfz1pLRioJPTOCrQjOmz5V8gzfHa9Q_ppsjg';
const API_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?access_token=${ACCESS_TOKEN}&content_type=article`;

// Conteneur des articles
const newsContainer = document.getElementById('news-container');

// Fonction pour récupérer les articles depuis Contentful
async function fetchContentfulArticles() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`);
        }

        const data = await response.json();
        displayArticles(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        newsContainer.innerHTML = '<p>Impossible de charger les articles pour le moment.</p>';
    }
}

// Fonction pour afficher les articles
function displayArticles(data) {
    const articles = data.items;

    articles.sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date));

    const recentArticles = articles.slice(0, 2);

    newsContainer.innerHTML = '';

    const articlesContainer = document.getElementById('news-container');
    articlesContainer.innerHTML = '';

    const assets = data.includes.Asset; // Contient les assets (images)
    recentArticles.forEach((item) => {
        const fields = item.fields;

        
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        // Titre
        const titleElement = document.createElement('h2');
        titleElement.textContent = fields.titre;
        titleElement.classList.add('article-title');

        // Image
        if (fields.image && fields.image.sys.id) {
            const imageId = fields.image.sys.id;
            const asset = assets.find((asset) => asset.sys.id === imageId);
            if (asset) {
                const imgElement = document.createElement('img');
                imgElement.src = asset.fields.file.url;
                imgElement.alt = fields.titre;
                imgElement.classList.add('article-image');
                articleElement.appendChild(imgElement);
            }
        }


        // Description
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = fields.description;
        descriptionElement.classList.add('article-description');

        // Lien
        const linkElement = document.createElement('a');
        linkElement.href = fields.lien || '#';
        linkElement.target = '_blank';
        linkElement.textContent = 'Lire la suite...';
        linkElement.classList.add('article-link');

        const articleContent = document.createElement('div');

        articleContent.appendChild(titleElement);

        // Date
        if (fields.date) {
            const dateElement = document.createElement('p');
            const date = new Date(fields.date); // Convertir la date en objet Date
            dateElement.textContent = `Publié le : ${date.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}`;
            dateElement.classList.add('article-date');
            articleContent.appendChild(dateElement);
        }

        articleContent.appendChild(descriptionElement);
        articleContent.appendChild(linkElement);

        articleElement.appendChild(articleContent);

        newsContainer.appendChild(articleElement);
    });
}


fetchContentfulArticles();
