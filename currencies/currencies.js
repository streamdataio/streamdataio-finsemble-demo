var token = "9823544350EB4C5A05745D39CD4FCF3E413366E9964FC382D8D223E0A2849A39A0B3E88843425ABE03F47D25D3D197C78E58A39E";

var tokenUserId = "59277";

var eventSource;

//event source is open for the first time after a click on a currency 
var isEventSourceOpen = false;
//To check if components are ready or not
var isComponentReady = false;
//Number of ready componets
var nbrReadyComponents = 0;

var currencies = [
	["EUR/USD", "eurusd", "eu", "us"],
	["GBP/USD", "gbpusd", "gb", "us"],
	["USD/RUB", "usdrub", "us", "ru"],
	["USD/CHF", "usdchf", "us", "ch"],
	["AUD/USD", "audusd", "au", "us"],
	["EUR/AUD", "euraud", "eu", "au"],
	["USD/CAD", "usdcad", "us", "ca"],
	["NZD/USD", "nzdusd", "nz", "us"],
	["EUR/JPY", "eurjpy", "eu", "jp"],
	["GBP/JPY", "gbpjpy", "gb", "jp"]
];

/* 
Handle a click on a currency
 */
function clickCurrency(event) {

	console.log("Spawning currency detail window");
	launchDetailCUrrencyUI(event.data);

	console.log("Spawning console UI window");
	launchConsoleUI(event.data);

	console.log("symbole assosiated to clicked row");
	console.log(event.data);


	if (!isComponentReady) {

		FSBL.Clients.RouterClient.addListener("whenReadyChannel", function (error, response) {
			if (error) {
				console.log("whenReadyChannel Error: " + JSON.stringify(error));
			} else {

				nbrReadyComponents++;

				if (nbrReadyComponents === 2) {
					console.log("whenReadyChannel Response: " + JSON.stringify(response));
					console.log("When the components are ready");
					startEventSource(event.data);
					isComponentReady = true;
				}
			}
		});

	} else {
		console.log("Starting event source on a symbol");
		startEventSource(event.data);
	}
}


/*
Start event source on a symbole injected in param
 */
function startEventSource(symbol) {

	if (typeof (EventSource) !== "undefined") {

		console.log("Your browser support SSE");

		//for closing the event source
		if (isEventSourceOpen) {
			console.log("Connection close");
			eventSource.close();
		}

		var url = "https://stream.xignite.com/xGlobalCurrencies.json/GetRealTimeRates?symbols=" + symbol + "&_token_userid=" + tokenUserId + "&_token=" + token;

		eventSource = new EventSource(url);

		eventSource.addEventListener("open", function (e) {
			console.log("Connection open");
			isEventSourceOpen = true;
		}, false);

		//Event listener for first data snapshot
		console.log("Event listener on first data snapshot");
		eventSource.addEventListener("data", function (e) {
			console.log("First data snapshot:");
			var firstDataSnapshot = JSON.parse(e.data);
			FSBL.Clients.RouterClient.transmit("FirstDataSnapshotChannel", firstDataSnapshot);
			console.log(firstDataSnapshot);
		}, false);

		//Event listener for patchs  
		console.log("Event listener on patchs");
		eventSource.addEventListener("patch", function (e) {
			console.log("Patch:");
			var patch = JSON.parse(e.data);
			FSBL.Clients.RouterClient.transmit("PatchChannel", patch);
			console.log(patch);
		}, false);

		//Event listener for errors from data source
		console.log("Event listener on error");
		eventSource.addEventListener("error", function (e) {
			console.log("Error message :");
			var errorData = JSON.parse(e.data);
			FSBL.Clients.RouterClient.transmit("ErrorMessageChannel", errorData);
			console.log(errorData);
		}, false);

	} else {
		console.log("browser does not support SSE");
		document.getElementById("errormsg").innerHTML = "Sorry, your browser does not support server-sent events...";
	}
}
/* 
Render the main page and create a row of data for each currency in our array currencies
 */
function renderPage() {

	var template = $("template")[0];

	for (let currency of currencies) {

		var row = $(document.importNode(template.content, true));
		row.find("name").text(currency[0]);
		row.find("flag-left").append("<span class=" + "'flag-icon flag-icon-" + currency[2] + "'" + "></span>");
		row.find("flag-right").append("<span class=" + "'flag-icon flag-icon-" + currency[3] + "'" + "></span>");
		row.find("name").parent().click(currency[1], clickCurrency);
		$("#currencies").append(row);

	}
}

/*
For spawning  detail currency window
 */
function launchDetailCUrrencyUI(selectedAccountNumber) {

	advancedIsRunning = true;

	// A windowIdentifier describes a component window. We create a unique windowName by using our current window's name and appending.
	// showWindow() will show this windowName if it's found. If not, then it will launch a new accountDetail coponent, and give it this name.
	var windowIdentifier = {
		componentType: "currencyDetails",
		windowName: FSBL.Clients.WindowClient.options.name + ".currencyDetails"
	};

	FSBL.Clients.LauncherClient.showWindow(windowIdentifier,
		{
			addToWorkspace: true,
			top: "aligned",
			left: "adjacent",
			spawnIfNotFound: true,
		}, function (err, response) {
			console.log("spawn() returns information about the new component", response);
			accountDetailSpawnResponse = response;
		}
	);
}

/*
For spawning console ui
 */
function launchConsoleUI(selectedAccountNumber) {

	advancedIsRunning = true;

	// A windowIdentifier describes a component window. We create a unique windowName by using our current window's name and appending.
	// showWindow() will show this windowName if it's found. If not, then it will launch a new accountDetail coponent, and give it this name.
	var windowIdentifier = {
		componentType: "consoleUI",
		windowName: FSBL.Clients.WindowClient.options.name + ".consoleUI"
	};

	FSBL.Clients.LauncherClient.showWindow(windowIdentifier,
		{
			addToWorkspace: true,
			left: "aligned",
			top: "adjacent",
			spawnIfNotFound: true,
		}, function (err, response) {
			console.log("spawn() returns information about the new component", response);
			accountDetailSpawnResponse = response;
		}
	);
}

/*
This event is fired when all registered clients have completed their initialization 
(When OpenFin and Finsemble are both ready to be used)
*/

FSBL.addEventListener('onReady', function () {

	FSBL.Clients.WindowClient.setWindowTitle("Currencies");
	renderPage();
	/*
	For closing the other windows
	*/
	$(window).unload(function () {
		FSBL.Clients.RouterClient.transmit("closeMainWindowChannel", "closeWindow");
	});
});



