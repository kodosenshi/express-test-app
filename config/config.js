module.exports = {
  "development": {
    "username": "shauncollins",
    "password": null,
    "database": "blog",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "shauncollins",
    "password": null,
    "database": "blog",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
}
