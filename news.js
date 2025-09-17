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

        return await response.json();
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        newsContainer.innerHTML = '<p>Impossible de charger les articles pour le moment.</p>';
    }
}

// Fonction pour afficher les articles
function displayArticles(entries, containerSelector, limit = null) {
    const container = document.querySelector(containerSelector);
    if (!container) {
        console.error("Le conteneur spécifié n'existe pas.");
        return;
    }

    container.innerHTML = "";

    const articles = entries.items;
    articles.sort((a, b) => new Date(b.fields.date) - new Date(a.fields.date));

    const articlesToDisplay = limit ? articles.slice(0, limit) : articles;
    const assets = entries.includes.Asset;

    articlesToDisplay.forEach((item) => {
        const fields = item.fields;

        // Carte principale
        const articleElement = document.createElement("div");
        articleElement.classList.add("article-card");

        // Image
        if (fields.image && fields.image.sys.id) {
            const imageId = fields.image.sys.id;
            const asset = assets.find((asset) => asset.sys.id === imageId);
            if (asset) {
                const imgElement = document.createElement("img");
                imgElement.src = asset.fields.file.url;
                imgElement.alt = fields.titre;
                imgElement.classList.add("article-image");
                articleElement.appendChild(imgElement);
            }
        }

        // Contenu texte
        const articleContent = document.createElement("div");
        articleContent.classList.add("article-content");

        // Titre
        const titleElement = document.createElement("h2");
        titleElement.textContent = fields.titre;
        titleElement.classList.add("article-title");

        // Date
        const dateElement = document.createElement("p");
        const date = new Date(fields.date);
        dateElement.textContent = `Publié le : ${date.toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })}`;
        dateElement.classList.add("article-date");

        // Description
        const descriptionElement = document.createElement("p");
        const maxLength = 150;
        const descriptionText = fields.description || "";
        const shortDescription = descriptionText.length > maxLength ? descriptionText.substring(0, maxLength).trim() + "..." : descriptionText;
        descriptionElement.textContent = shortDescription;
        descriptionElement.classList.add("article-description");

        // Lien
        const linkElement = document.createElement("a");
        linkElement.href = `article.html?id=${item.sys.id}`;
        linkElement.target = "_blank";
        linkElement.textContent = "Lire la suite...";
        linkElement.classList.add("article-link");

        // Construction
        articleContent.appendChild(titleElement);
        articleContent.appendChild(dateElement);
        articleContent.appendChild(descriptionElement);
        articleContent.appendChild(linkElement);

        articleElement.appendChild(articleContent);
        container.appendChild(articleElement);
    });
}

function displaySingleArticle(article, assets) {
  const container = document.getElementById("article-container");
  container.innerHTML = ""; // Vide le conteneur

  const fields = article.fields;

  const articleElement = document.createElement("div");
  articleElement.classList.add("single-article");

  // Titre
  const titleElement = document.createElement("h1");
  titleElement.textContent = fields.titre;

  // Date
  const dateElement = document.createElement("p");
  const date = new Date(fields.date);
  dateElement.textContent = `Publié le : ${date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })}`;

  // Image
  let imgElement = null;
  if (fields.image && fields.image.sys.id) {
    const asset = assets.find(asset => asset.sys.id === fields.image.sys.id);
    if (asset) {
      imgElement = document.createElement("img");
      imgElement.src = asset.fields.file.url;
      imgElement.alt = fields.titre;
      imgElement.classList.add("article-image");
    }
  }

  // Description
  const descriptionElement = document.createElement("p");
  const contentText = fields.description;

  const urlPattern = /^https?:\/\/.+/;

if (urlPattern.test(contentText)) {
  const linkElement = document.createElement("a");
  linkElement.href = contentText;
  linkElement.textContent = contentText;
  linkElement.classList.add("article-link");
  linkElement.target = "_blank";
  descriptionElement.appendChild(linkElement);
} else {
  descriptionElement.textContent = contentText;
}

  articleElement.appendChild(titleElement);
  articleElement.appendChild(dateElement);
  if (imgElement) articleElement.appendChild(imgElement);
  articleElement.appendChild(descriptionElement);

  container.appendChild(articleElement);

    const backLink = document.createElement("a");
    backLink.href = "actualite.html";
    backLink.textContent = "← Retour aux articles";
    backLink.classList.add("back-button");

    container.appendChild(backLink);
}
