
var eventSource;

//event source is open for the first time after a click on a currency 
var isEventSourceOpen = false;
//To check if components are ready or not
var isComponentReady = false;
//Number of ready componnets
var NbrReadyComponnents = 0;

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

				NbrReadyComponnents++;

				if (NbrReadyComponnents === 2) {
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

	//for closing the event source
	if (isEventSourceOpen) {
		eventSource.close();
	}

	if (typeof (EventSource) !== "undefined") {

		console.log("Your browser support SSE");

		let token = "9823544350EB4C5A05745D39CD4FCF3E413366E9964FC382D8D223E0A2849A39A0B3E88843425ABD7C5786B3AAB0D6E590E4CB79";
		let token_user_id = "59277";
		let url = "https://stream.xignite.com/xGlobalCurrencies.json/GetRealTimeRates?symbols=" + symbol + "&_token_userid=" + token_user_id + "&_token=" + token;

		eventSource = new EventSource(url);

		//Event listner for first data snapshot
		console.log("Event listner on first data snapshot");
		eventSource.addEventListener("data", function (e) {
			console.log("First data snapshot :");
			var firstDataSnapshot = JSON.parse(e.data);
			FSBL.Clients.RouterClient.transmit("FirstDataSnapshotChannel", firstDataSnapshot);
			console.log(firstDataSnapshot);
			isEventSourceOpen = true;
		}, false);

		//Event listner for patchs  
		console.log("Event listner on patchs");
		eventSource.addEventListener("patch", function (e) {
			console.log("Patchs :");
			var patch = JSON.parse(e.data);
			FSBL.Clients.RouterClient.transmit("PatchChannel", patch);
			console.log(patch);
		}, false);

		//Event listner for errors from data source
		console.log("Event listner on error");
		eventSource.addEventListener("error", function (e) {
			console.log("Error message :");
			var firstDataSnapshot3 = JSON.parse(e.data);
			FSBL.Clients.RouterClient.transmit("ErrorMessageChannel", firstDataSnapshot3);
			console.log(firstDataSnapshot3);
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
		row.find("flag1").append("<span class=" + "'flag-icon flag-icon-" + currency[2] + "'" + "></span>");
		row.find("flag2").append("<span class=" + "'flag-icon flag-icon-" + currency[3] + "'" + "></span>");
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
			console.log("PPZZ spawn() returns information about the new component", response);
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

	FSBL.Clients.RouterClient.addListener("closeWindowChannel", function (error, response) {
		if (error) {
			console.log("closeWindowChannel Error: " + JSON.stringify(error));
		} else {
			console.log("closeWindowChannel Response: " + JSON.stringify(response));
	
			NbrReadyComponnents--;
		}
	});
});



