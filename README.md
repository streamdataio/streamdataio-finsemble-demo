# Demo finsemble 

This application shows how to use streamdata.io proxy and Finsemble framework to get currency market data in multi-window mode.
Finsemble is a framework for building seamless HTML5 desktop applications. 
The documentation is available here : http://documentation.chartiq.com/finsemble

# Step by step setup

Installation :

1. Install Finsemble framework by following the getting started: http://documentation.chartiq.com/finsemble/tutorial-gettingStarted.html

2. Clone this Github repository.

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

5. Edit the file `Finsemble-seed/src/components/currencies/currencies.js` with your Xignite token you can get at <http://www.xignite.com>
    ```json
    var token = "<YOUR XIGNITE TOKEN>";
    ```  

6. Run finsemble using: `npm run dev`.

7. Click on a currency pair to see the market data details in real time.

Enjoy!

## Project dependencies

This demo uses the following dependencies :

- JSON Patch : https://github.com/fge/json-patch


## Further help

If you have any questions or feedback, feel free to contact support@streamdata.io
