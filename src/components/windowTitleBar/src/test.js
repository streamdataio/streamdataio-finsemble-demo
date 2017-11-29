var chai = require("chai");
var assert = chai.assert;
var should = chai.should;
var expect = chai.expect;
var RouterClient = FSBL.Clients.RouterClient;
var LauncherClient = FSBL.Clients.LauncherClient;

FSBL.addEventListener("onReady", function () {

	const TESTRUNNER_CHANNEL_NAME = `TestRunner.${fin.desktop.Window.getCurrent().name}.windowTitleBar`;

	function clickLinker() {
		return new Promise(function (resolve, reject) {
			document.querySelector(".fsbl-linker").click();
			setTimeout(resolve, 1000);
		});
	}

	function getLinkerGroupClasses() {
		return new Promise(function (resolve, reject) {
			resolve(Array.from(document.querySelectorAll(".linker-group")).map((el)=>el.className));
		});
	}
	RouterClient.addResponder(TESTRUNNER_CHANNEL_NAME, function (err, message) {
		function sendSuccess(data) {
			message.sendQueryResponse(null, data || "Success");
		}
		function sendError(error) {
			let err = {};
			err.message = error;
			if (error.message) {
				err.message = error.message;
			}
			message.sendQueryResponse(err, null);
		}
		//second responder added.
		if (err) {
			return;
		}
		let data = message.data;
		switch (data.test) {
		case "clickLinker":
			clickLinker()
					.then(sendSuccess)
					.catch(sendError);

			break;
		case "getLinkerGroupClasses":
			getLinkerGroupClasses()
					.then(sendSuccess)
					.catch(sendError);
			break;
		}
	});

});