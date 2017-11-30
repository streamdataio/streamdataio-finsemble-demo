# Demo finsemble 

This application shows how to use the streamdata.io proxy in Finsemble to get currency market data in multi-window mode.

Finsemble is a framework for building seamless HTML5 desktop applications. see more : http://documentation.chartiq.com/finsemble

# Step by step setup

installation :

1- Install node.js version 6.11.X

2- Clone  this GitHub repository.

3- In order to install the Finsemble framework, you will need access to Finsemble private NPM repository by asking to schedule a demonstration by emailing info@chartiq.com.

4- Once you have access to the private repository, open a command prompt or Bash and change to the directory in which you have cloned this repository. Then run: `npm login`

5- You will be prompted for the username and password.

6- Add your Token  :

  Open the file : `Finsemble-seed / src / components / currencies / currencies.js`
  modify the following line : let token = "YOUR TOKEN HERE";

7- Build and launch the application using the following command: `npm run dev`

6- When Finsemble is started, click on "App" on the top left of the screen, choose "currencies" to lunch the app

7- Click on a currency to get correspondig market data in real time

Project dependencies

The application dependencies are available on GitHub

JSON Patch : https://github.com/fge/json-patch


## Further help

If you have any questions or feedback, feel free to ask: support@streamdata.io

Enjoy!

*Note: if there is no application shown in the after clicking on "App", please reset finsemble, to get it correctly*