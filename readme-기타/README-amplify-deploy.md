# AWS Amplify React App Deploy Example

**This Works Great!!!!**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Deploy Process
https://aws.amazon.com/ko/getting-started/tutorials/deploy-react-app-cicd-amplify/

### Create App
```bash
$ npx create-react-app appname
$ cd appname
$ npm start # see the app works properly
```

### Create Github repo

### Git commands examples

```bash
## initialize
$ git init
# delete/remove git
$ rm -r .git

## config
$ git config --global user.email "mailid@example.com"
$ git config --global user.name "my name"

## set/remove remote origin
$ git remote add origin https://github.com/<username>/<reponame>.git
$ git remote remove origin

## add, commit, push
$ git add .
$ git comit -m <message>
$ git push origin master

## clone, pull
$ git clone <repo url>
$ git pull <repo link>
```

### Setting AWS Amplify Console
1. Click getStarted under Deploy
1. Select Github as a git provider
1. Authenticate Github
1. Select Repo, master branch
1. Accept the build settings
1. Save and Deploy
1. Deployed URL: https://branchname.appid.amplifyapp.com
1. Change and git commit invokes "rebuild" automatically. **working OK**

***

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
