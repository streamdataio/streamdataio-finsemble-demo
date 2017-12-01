

FSBL.addEventListener('onReady', function () {

	FSBL.Clients.RouterClient.transmit("whenReadyChannel", "iAmReady");

	//listener for first data snapshot
	FSBL.Clients.RouterClient.addListener("FirstDataSnapshotChannel", function (error, response) {
		if (error) {
			document.getElementById("displayLogData").innerHTML = '';
			console.log("FirstDataSnapshotChannel: " + JSON.stringify(error));
		} else {

			currencySymbol = response.data[0].Symbol;
			document.getElementById("displayLogData").appendChild(document.createElement('h3')).innerHTML = "INITIAL DATA SNAPSHOT";
			console.log("FirstDataSnapshotChannel : " + response);
			var firstDataSnapshot = response.data[0];
			output(syntaxHighlight(JSON.stringify(firstDataSnapshot)));
		}
	});

	//listener for patchs
	FSBL.Clients.RouterClient.addListener("PatchChannel", function (error, response) {
		if (error) {
			document.getElementById("displayLogData").innerHTML = '';
			console.log("PatchChannel: " + JSON.stringify(error));
		} else {
			document.getElementById("displayLogData").appendChild(document.createElement('h3')).innerHTML = "PATCH";
			console.log("PatchChannel: " + response);
			var patch = response.data;
			output(syntaxHighlight(JSON.stringify(patch)));
			window.scrollTo(0, document.body.scrollHeight);
		}
	});

	//listener for errors 
	FSBL.Clients.RouterClient.addListener("ErrorMessageChannel", function (error, response) {
		if (error) {
			document.getElementById("displayLogData").innerHTML = '';
			console.log("ErrorMessageChannel: " + JSON.stringify(error));
		} else {
			document.getElementById("displayLogData").appendChild(document.createElement('h3')).innerHTML = "  ERROR ";
			var errormssg = response.data;
			output(syntaxHighlight(JSON.stringify(errormssg)));
			window.scrollTo(0, document.body.scrollHeight);
		}
	});

	/* 
    For closing this window after closing the main window
    */
	FSBL.Clients.RouterClient.addListener("closeMainWindowChannel", function (error, response) {
		if (error) {
			console.log("closeMainWindowChannel error: " + JSON.stringify(error));
		} else {
			console.log("closeMainWindowChannel: " + JSON.stringify(response));
			console.log("Closing windiow");
			window.close();
		}
	});
});

//For displaying in the UI
function output(data) {
	document.getElementById("displayLogData").appendChild(document.createElement('p')).innerHTML = data;
}

//For a better display
function syntaxHighlight(json) {
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		//cls is an abbreviation of the keyword class
		var cls = 'number';
		if (/^"/.test(match)) {
			if (/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if (/true|false/.test(match)) {
			cls = 'boolean';
		} else if (/null/.test(match)) {
			cls = 'null';
		}
		return '<span class="' + cls + '">' + match + '</span>';
	});
}
