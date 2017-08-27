# Intro To Express

## Installation   

### S3 and .env   
You should have a local `.env` file with at least these keys:

```yaml
DATABASE_URL=postgres://DBUSER:DBPASSWORD@localhost:5432/blog
S3_BUCKET=YOUR_S3_BUCKET_NAME
AWS_SECRET_ACCESS_KEY=YOUR_S3_SECRET_KEY
AWS_ACCESS_KEY_ID=YOUR_S2_ACCESS_KEY
```

### Clone this repo locally

In order to run this application locally, clone it to your projects directory and then follow the installation instructions below.   

```
> cd /path/to/your/projects/folder
> git clone https://github.com/kodosenshi/express-test-app.git
```   

For instance all my projects are in a **projects** directory in my home folder so I would do this:

```
> cd ~/projects
> git clone https://github.com/kodosenshi/express-test-app.git
```

Once you have cloned this app locally you can `cd` into this project and complete the instructions below.   

```
> cd /path/to/your/projects/folder/express-test-app
```

So I would do this:    

```
> cd ~/projects   
> git clone https://github.com/kodosenshi/express-test-app.git   
> cd express-test-app
```   

- - -

### Install Nodemon (You only need to do this ONCE)
* install Nodemon globally: This package will restart your server whenever there is a code change. So you don't need to kill the server and then start it again. Just code and voilà, automatic restarts. Note you only need to install Nodemon once since youa are installing it globally!!!! If you have it installed skip any part of the instruction where you install it again.

```
> npm install -g nodemon
```   

You use nodemon wherever you would use node so for instance if you wanted to do:   

```js

> node index.js

```

You would do this instead:   

```js
nodemon index.js
```

Now whenever you make a change to your file nodemon will restart the app for you.

### Install other packages

```
> npm install
```

## Start Web Server   

```
> nodemon index.js
```

So my complete instructions would be:

```
> cd ~/projects  
> git clone https://github.com/kodosenshi/express-test-app.git   
> cd express-test-app
> npm install -g nodemon
> npm install
> nodemon index.js

```   

## View Site  

Open your browser and go to: [http://localhost:8080](http://localhost:8080)   

## Update To See Changes 

``` 
> git pull origin master
> npm install  
```

## To Checkout A Branch: For instance MVC-Sequelize  
* `git fetch` to get all the latest branches
* `git branch` to see all branches   
* `git checkout branchname`

To checkout `mvc` branch: 

```
> git fetch --all
> git checkout mvc-sequelize
> npm install  
> nodemon
```
