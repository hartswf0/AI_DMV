// Function to clean and normalize an article object
function cleanArticle(article) {
    const defaultValues = {
        Title: "Untitled",
        Authors: "Unknown Authors",
        ID: "N/A",
        Main_Findings: {},
        Arguments: [],
        Quotes_and_Concepts: [],
        Game_Theory_Dynamics: {
            Decision_Making: {
                Description: "No information provided.",
                Strategies: []
            },
            Incentive_Structures: {
                Incentives_to_Disclose: [],
                Incentives_to_Conceal: []
            }
        },
        Methodology: {
            Approach: "No methodology provided.",
            Criticism: "No criticism provided."
        },
        Future_Improvements: []
    };

    return {
        Title: article.Title || defaultValues.Title,
        Authors: article.Authors || defaultValues.Authors,
        ID: article.ID || defaultValues.ID,
        Main_Findings: article.Main_Findings || defaultValues.Main_Findings,
        Arguments: article.Arguments || defaultValues.Arguments,
        Quotes_and_Concepts: article.Quotes_and_Concepts || defaultValues.Quotes_and_Concepts,
        Game_Theory_Dynamics: {
            Decision_Making: article.Game_Theory_Dynamics?.Decision_Making || defaultValues.Game_Theory_Dynamics.Decision_Making,
            Incentive_Structures: article.Game_Theory_Dynamics?.Incentive_Structures || defaultValues.Game_Theory_Dynamics.Incentive_Structures
        },
        Methodology: article.Methodology || defaultValues.Methodology,
        Future_Improvements: article.Future_Improvements || defaultValues.Future_Improvements
    };
}

// Function to render an article as HTML
function renderArticle(article, index) {
    const cleanedArticle = cleanArticle(article.Article_Analysis);

    let articleHtml = `<section class="article" id="article${index + 1}">`;
    articleHtml += `<h2>${index + 1}. ${cleanedArticle.Title}</h2>`;

    if (cleanedArticle.Authors) {
        articleHtml += `<p><strong>Authors:</strong> ${cleanedArticle.Authors}</p>`;
    }

    if (cleanedArticle.ID) {
        articleHtml += `<p><strong>ID:</strong> ${cleanedArticle.ID}</p>`;
    }

    if (Object.keys(cleanedArticle.Main_Findings).length) {
        articleHtml += `<h3>Main Findings</h3><ul>`;
        for (let key in cleanedArticle.Main_Findings) {
            if (cleanedArticle.Main_Findings[key]) {
                articleHtml += `<li><strong>${key}:</strong> ${cleanedArticle.Main_Findings[key]}</li>`;
            }
        }
        articleHtml += `</ul>`;
    }

    if (cleanedArticle.Arguments.length) {
        articleHtml += `<h3>Arguments</h3><ul>`;
        cleanedArticle.Arguments.forEach(argument => {
            if (argument.Concept && argument.Description) {
                articleHtml += `
                    <li>
                        <strong>Concept:</strong> ${argument.Concept}<br/>
                        <em>${argument.Description}</em>
                    </li>`;
            }
        });
        articleHtml += `</ul>`;
    }

    if (cleanedArticle.Quotes_and_Concepts.length) {
        cleanedArticle.Quotes_and_Concepts.forEach(quote => {
            if (quote.Topic && quote.Quote) {
                articleHtml += `
                    <blockquote>
                        ${quote.Quote}<br/>
                        <strong>- ${quote.Topic}</strong>
                    </blockquote>`;
            }
        });
    }

    if (cleanedArticle.Game_Theory_Dynamics.Decision_Making.Description || cleanedArticle.Game_Theory_Dynamics.Decision_Making.Strategies.length) {
        articleHtml += `<h3>Game Theory Dynamics</h3>`;
        if (cleanedArticle.Game_Theory_Dynamics.Decision_Making.Description) {
            articleHtml += `<p><strong>Decision Making:</strong> ${cleanedArticle.Game_Theory_Dynamics.Decision_Making.Description}</p>`;
        }
        if (cleanedArticle.Game_Theory_Dynamics.Decision_Making.Strategies.length) {
            articleHtml += `<ul>`;
            cleanedArticle.Game_Theory_Dynamics.Decision_Making.Strategies.forEach(strategy => {
                articleHtml += `<li>${strategy}</li>`;
            });
            articleHtml += `</ul>`;
        }
    }

    if (cleanedArticle.Methodology.Approach || cleanedArticle.Methodology.Criticism) {
        articleHtml += `<h3>Methodology</h3>`;
        if (cleanedArticle.Methodology.Approach) {
            articleHtml += `<p><strong>Approach:</strong> ${cleanedArticle.Methodology.Approach}</p>`;
        }
        if (cleanedArticle.Methodology.Criticism) {
            articleHtml += `<p><strong>Criticism:</strong> ${cleanedArticle.Methodology.Criticism}</p>`;
        }
    }

    if (cleanedArticle.Future_Improvements.length) {
        articleHtml += `<h3>Future Improvements</h3><ul>`;
        cleanedArticle.Future_Improvements.forEach(improvement => {
            if (improvement.Design) {
                articleHtml += `<li>${improvement.Design}</li>`;
            }
        });
        articleHtml += `</ul>`;
    }

    articleHtml += `<div class="divider"></div></section>`;
    document.getElementById('content').innerHTML += articleHtml;

    // Also add to the side menu
    let articleLink = document.createElement("li");
    articleLink.innerHTML = `<a href="#article${index + 1}">${cleanedArticle.Title}</a>`;
    document.getElementById('articleList').appendChild(articleLink);
}

// Load JSON data and render it
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach((article, index) => {
            renderArticle(article, index);
        });
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });
