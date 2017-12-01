# Demo finsemble 

This application shows how to use the streamdata.io proxy in Finsemble to get currency market data in multi-window mode.

Finsemble is a framework for building seamless HTML5 desktop applications. for more details: http://documentation.chartiq.com/finsemble

# Step by step setup

installation :

1. Install Finsemble framework by following the Finsemble getting started: http://documentation.chartiq.com/finsemble/tutorial-gettingStarted.html

2. Download this Github repository.

3. Copy `currencies`, `currencyDetails`, `consoleUI` folders to: `Finsemble-seed/src/components/`

4. Edit the file `Finsemble-seed/configs/application/components.json` and copy the content of `streamdata-components.json` into it

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
		},
		// COPY THE CONTENT HERE
    }
    ...
}    
```

5. Run finsemble using: `npm run dev`

6. Click on `App` button on the top left of the screen

7. Click on `currencies`

8. Click on a currency pair to see it's market data details in real time


Enjoy!

## Project dependencies

The application dependencies are available on GitHub

JSON Patch : https://github.com/fge/json-patch


## Further help

If you have any questions or feedback, feel free to ask: support@streamdata.io


*Note: if there is no application shown in the after clicking on "App", please reset finsemble, to get it correctly*