// require Express, the framework we'll use for building
// node based web apps.
const express = require('express');

// Remember node doesn't give us the body data from a POST request
// we must use middleware for that, this package does that for us
const parser = require('body-parser');

// create a new app
const app = express();

app.use(express.static('public'));

// Tell our app we want to use the 'ejs' template rendering engine
app.set('view engine', 'ejs');

// store some article data we'll pass to our template
// eventually we'll use an external data source like a Database
const blog = {
  articles: [
    {
        title: 'About Shaun',
        author: 'Shaun',
        image: 'https://unsplash.it/960/504',
        description: `Sed ut unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam<p>eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        link: '/about',
        body: `
            <p>Sed ut unde omnis iste natus error sit voluptatem 
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Sed ut unde omnis iste natus error sit voluptatem 
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Sed ut unde omnis iste natus error sit voluptatem 
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `,
    },
    {
        title: 'My Schedule',
        author: 'Shaun',
        image: 'https://unsplash.it/960/503',
        description: `Sed ut unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam<p>eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        link: '/schedule',
        body: `
            <p>Sed ut unde omnis iste natus error sit voluptatem 
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Sed ut unde omnis iste natus error sit voluptatem 
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
            <p>Sed ut unde omnis iste natus error sit voluptatem 
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae 
            ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        `
    }
  ]
}

app.use(parser.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.render('index', blog) ;
});

blog.articles.forEach((article) => {
    app.get(article.link, (request, response) => {
        response.render('blog-detail', {
            article: article, 
            links: blog.articles.map((article) => {
                return { 
                    title: article.title, 
                    link: article.link
                }
            })
        });
    });
})

const server = app.listen(8080, () => {
    console.log('started')
});