# Stephen Grider Express Workflow

Intialize an index.js to the project to create a brand new express application

```javascript
const express = require("express");
const app = express();
```

Create a route handler

```javascript
// commonjs modules becuase node itself does not support import
const express = require("express");
const app = express();

// create a route handler
app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

app.listen(5000);
```

### Heroku Pre-Deployment compliant checklist

1. **Dynamic Port Binding**: Heroke tells us which port our app will use, so we need to make sure we listen to the port they tell us to.

```javascript
//index.js
// Bind port for Heroku
const PORT = process.env.PORT || 5000;
```

2. **Specify Node Environment**: We want to use a specific version of node, so we need to tell Heroku which version we want

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  //add the engines and specify versions
  "engines": {
    "node": "8.8.1",
    "npm": "5.0.3"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4"
  }
}
```

3. **Specify a start script**: Instruct Heroku what command to run to start our server running.

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "engines": {
    "node": "8.8.1",
    "npm": "5.0.3"
  },
  // specify a start script
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.4"
  }
}
```

4. **create a .gitignore file**

```
// .gitignore
node_modules
```

### Heorku first time deploy steps

1. Create Heroku Account
2. Commit our codebase to git
3. Install Herokyu CLI and Create App
check with `heroku -v`

4. Deploy app with git
`git push heroku master`
Now you can view the app directly by useing the command
`heroku open`

5. Heroku deploys the project

### Subsequent Heroku deploys

1. Commit codebase with git
2. Deploy App with Git
