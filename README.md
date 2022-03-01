# RubyGarage front-end boilerplate

## How to run the project
## Install NVM

To install or update nvm, you can use the install script using cURL:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh | bash
```

More detail in [NVM Readme](https://github.com/creationix/nvm#install-script)

Then install Node:

```bash
$ nvm install v11.12
$ nvm use v11.12
```

If you want to automatically change Node version when you go to the project directory, follow [this instruction](https://github.com/creationix/nvm#zsh)

## Install Node modules

First, you need to install `yarn`. For more details visit [official guide](https://yarnpkg.com/en/docs/install).

Then go to the project directory and run the following commands:

```bash
$ yarn install
$ yarn dev
```

Visit `http://localhost:4000`

## Run styleguidist

Execute the following command in project directory:

```bash
$ yarn styleguidist
```

Visit `http://localhost:6060/`

## Environment

Creat file `.env.local` like `.env`

For more details [Exposing Environment Variables to the Browser](https://nextjs.org/docs/basic-features/environment-variables)

## Run tests

Execute the following command in project directory:

```bash
$ yarn test
```

You should test the following things:
- Action Creators
- Reducers
- Middlewares
- Components and Containers (both including snapshot-tests)
- Utils

## Run feature tests

Run your backend, then run your app:

```bash
$ yarn dev
```

Start cypress runner:

```bash
$ yarn cypress:open
```

## Docs

- [ES6 Features](https://github.com/lukehoban/es6features)
- [React](https://facebook.github.io/react)
- [React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
- [Re-Ducks modular approach](https://github.com/alexnm/re-ducks)
- [Next.js](https://nextjs.org/)
- [Redux](http://redux.js.org/)
- [Redux Logic](https://github.com/jeffbski/redux-logic)
- [Formik](https://jaredpalmer.com/formik/)
- [Normalizer](https://github.com/yury-dymov/json-api-normalizer)
- [Redux Object](https://github.com/yury-dymov/redux-object)

### Testing

- [Jest API](https://facebook.github.io/jest/docs/api.html#content)
- [Enzyme API](http://airbnb.io/enzyme/docs/api/index.html)
- [Cypress](https://docs.cypress.io/)

### DevTools

- [Redux Devtools](https://github.com/gaearon/redux-devtools)
- [Redux Devtools (browser extension)](https://github.com/zalmoxisus/redux-devtools-extension)
- [React Devtools (browser extension)](https://github.com/facebook/react-devtools)
