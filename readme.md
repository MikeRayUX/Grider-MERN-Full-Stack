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

- Commit codebase with git & deploy to heroku

```
git add .
git commit -m "Message"
git push heroku master
```

---

### Authentication with Google OAuth

Use a helper library `passport` and usinging a `passport strategy` which will

passport strategy: google-oauth20

workflow: put passport and the google-oauth20 strategy inside index.js to contain all of the code in a file, then refactor

```javascript
// commonjs modules becuase node itself does not support import
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();
```

Tell passport to create a new GoogleStrategy:

```javascript
// commonjs modules becuase node itself does not support import
const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();
// tells passport to create a new instance of google passport strategy.
passport.use(new GoogleStrategy());
```

Then go through the terrible process of signing up on console.developers.google.com and creating an application and gettting the client a client id and client secret.

- Client ID: Public token we can share this with the public
- ClientSecret: Private token - we don't want anyone to see this!

---

### Hide private keys and files guide from git

**Simplified way (less secure)**

1. Create a config directory and `keys.js` file.
2. Use a module.exports object to import into index

```javascript
// /config/keys.js
module.exports = {
  googleClientID: "clientid",
  googleClientSecret: "clientSecret"
};
```

3. Add keys.js to `.gitignore`

```javascript
//.gitignore
node_modules;
keys.js;
```
