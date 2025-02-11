# NL Portal Configuration Panel - Frontend

This frontend provides a user interface to configure the NL Portal application.

The resulting configuration is stored in a database where the NL Portal can retrieve it.

## Development

To contribute to this repository first [clone](https://git-scm.com/docs/git-clone) to your device.
Make sure to [install pnpm](https://pnpmpkg.com/getting-started/install).

This is a React application runninng on Vite

### Installing dependencies:

Install dependencies by running the command `pnpm install` from the frontend folder.

### Configure the application

The default configuration added is based on usage of the project [nl-portal-docker-compose](https://github.com/nl-portal/nl-portal-docker-compose).

When you want to use a different configuration you can adjust the [config.js](public/config.js)
or set up the environment variables used on the [config-template](public/config.template.js).

### Starting the application

After installing the dependencies and making sure the configuration is correct, start the project with `pnpm dev` from the frontend folder.

