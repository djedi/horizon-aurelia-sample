# Horizon + Aurelia Sample

This is the common [Horizon](http://horizon.io) chat app ported to [Aurelia](http://aurelia.io).

## Prerequisites

Make sure you have [RethinkDB installed](https://www.rethinkdb.com/docs/install/).

Install horizon

```shell
npm install -g horizon
```

Install aurelia-cli

```shell
npm install -g  aurelia-cli
```

## Running the app

Install dependencies by running the `npm install` from the project root.

Run the following command to start Horizon & Aurelia in dev mode:

```shell
npm start
```
You should get a url in the console with the localhost URL to run the app.

## Starting your own Horizon + Aurelia app

The following steps will help you get a project set up to start using Horizon & Aurelia together.

Create a new aurelia app. (We'll assume it is named `app`)

```shell
au new
```

Create a new horizon project

```shell
hz init hztemp
```

Move the `.hz` directory into aurelia's app folder.

```shell
mv hztemp/.hz app
```

You may also want to edit `.hz/config.toml` to change the name of your horizon app. Also, copy the contents of `hztemp/.gitignore` into your aurelia's `.gitignore`

Go to the aurelia root directory.

```shell
cd app
```

Install [concurrently](https://www.npmjs.com/package/concurrently)

```shell
npm install concurrently --save-dev
```

Edit `package.json` and add the start script.

```json
"scripts": {
  "start": "concurrently \"hz serve --dev\" \"au run --watch\" "
}
```

Install `@horizon/server`

```shell
npm install @horizon/server --save
```

Add the horizon client to your vendor bundle in `aurelia_project/aurelia.json`

```json
"prepend": [
  "node_modules/bluebird/js/browser/bluebird.core.js",
  "node_modules/@horizon/client/dist/horizon.js",
  "scripts/require.js"
],
```

Now you can start Horizon and Aurelia

```shell
npm start
```

Inspect the source of this project to see how horizon is used as a service.
