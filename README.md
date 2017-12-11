# Demo finsemble 

This application shows how to use streamdata.io proxy and Finsemble framework to get currency market data in multi-window mode.

Finsemble is a framework for building seamless HTML5 desktop applications. Read more here: http://documentation.chartiq.com/finsemble

# Step by step setup

Installation :

1. Install Finsemble framework by following Finsembles getting started: http://documentation.chartiq.com/finsemble/tutorial-gettingStarted.html

2. Download this Github repository.

3. Copy `currencies`, `currencyDetails`, `consoleUI` folders to: `Finsemble-seed/src/components/`.

4. Edit the file `Finsemble-seed/configs/application/components.json` and copy the content of `streamdata-components.json` into it:

```json 
{
    "components": {
           "Finsemble Documentation": {
			"window": {
				"url": "http://documentation.chartiq.com/finsemble",
				"left": "center",
				"top": "center",
				"height": 800,
				"width": 1000
			},
			"component": {},
			"foreign": {
				"services": {
					"dockingService": {
						"isArrangable": true
					}
				},
				"components": {
					"App Launcher": {
						"launchableByUser": false
					},
					"Window Manager": {
						"persistWindowState": false,
						"FSBLHeader": true,
						"showLinker": false
					}
				}
			}
		}, //Insert comma 
		// COPY THE CONTENT HERE
    }
}    
```

5. Edit the `Finsemble-seed/src/components/currenices/currencies.js` 
and replace: var token = "<YOUR STREAMDATA TOKEN>"; 
with your Xignite token you can get at http://www.xignite.com 

6. Run finsemble using: `npm run dev`.

7. Click on a currency pair to see it's market data details in real time.

Enjoy!

## Project dependencies

The application dependencies are available on GitHub:

JSON Patch : https://github.com/fge/json-patch


## Further help

If you have any questions or feedback, feel free to ask: support@streamdata.io
