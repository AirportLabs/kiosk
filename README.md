Setup dev environment:  
> $ npm install

Launch dev server:  
> $ grunt serve

Deploy to GitHub Pages (cgk.io/kiosk):  
> $ grunt deploy

---

Three columns
- pick your airline
- pick your flight
- see your flight details

DB

---

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ git add .
$ git commit -m "Commit Message Goes Here"
$ git push heroku master
$ heroku open
```

## View Logs

  heroku logs --tail

Press `Control+C` to stop streaming the logs.

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
