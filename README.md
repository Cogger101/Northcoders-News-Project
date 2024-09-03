# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

Website - https://cogger101ncnews.netlify.app/

Endpoints can be found via endpoints.json

Files to add when connecting the databases:

- create .env.test & .env.development
- For .env.test PGDATABASE=nc_news_test
- For .env.development PGDATABASE=nc_news
  These files need to be added to a .gitignore file

Installations(to ensure you get the right packages):
npm install or npm i

This is an SQL database for a News website, storing news articles allowing get and patch requests from users able to view, comment and vote on these articles.
