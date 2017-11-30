var myData; //global variable that will persist the data to display

/*
    function that returns the correct color to display
    green in the case of an increase in value, otherwise it turns red
 */

function stateChange(currentValue, newValue) {
    if (currentValue > newValue)
        return "badge badge-danger badge-pill";
    return "badge badge-success badge-pill";
}

/*
    function that updates the data retrieved
 */

function update(dataReceived) {

    var text = document.getElementById("Text");
    text.innerHTML = dataReceived[0].Text;

    /*var basecurrency=document.getElementById("BaseCurrency");
    basecurrency.innerHTML=dataReceived[0].BaseCurrency;

    var quoteCurrency=document.getElementById("QuoteCurrency");
    quoteCurrency.innerHTML=dataReceived[0].QuoteCurrency;
    */
    var symbol = document.getElementById("Symbol");
    symbol.innerHTML = dataReceived[0].Symbol;


    var bid = document.getElementById("Bid");
    bid.className = stateChange(bid.innerHTML, dataReceived[0].Bid);
    bid.innerHTML = dataReceived[0].Bid;

    var mid = document.getElementById("Mid");
    mid.className = stateChange(mid.innerHTML, dataReceived[0].Mid);
    mid.innerHTML = dataReceived[0].Mid;

    var ask = document.getElementById("Ask");
    ask.className = stateChange(ask.innerHTML, dataReceived[0].Ask);
    ask.innerHTML = dataReceived[0].Ask;


    var date = document.getElementById("Date");
    date.innerHTML = dataReceived[0].Date;

    var time = document.getElementById("Time");
    time.innerHTML = dataReceived[0].Time;

}

FSBL.addEventListener('onReady', function () {

    FSBL.Clients.RouterClient.transmit("whenReadyChannel", "iAmReady");
    
    var data;
    
    FSBL.Clients.RouterClient.addListener("FirstDataSnapshotChannel", function (error, response) {
        if (!error) {
            data = response.data;
            var paragraph = document.createElement("p");
            paragraph.innerHTML = JSON.stringify(data);
            // FINALLY ADD THE NEWLY CREATED ELEMENT WITH JSON DATA TO A CONTAINER.
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            //divContainer.appendChild(paragraph);
            myData = data;
            update(myData);
        } else {
            console.log("FirstDataSnapshotChannel Error: " + JSON.stringify(error));
        }
    });

    FSBL.Clients.RouterClient.addListener("PatchChannel", function (error, response) {
        if (!error) {
            data = response.data;
            myData = jsonpatch.applyPatch(myData, data).newDocument;
            var paragraphChanger = document.createElement("p");
            paragraphChanger.innerHTML = JSON.stringify(myData);
            var divContainer = document.getElementById("showData");
            divContainer.innerHTML = "";
            //divContainer.appendChild(paragraphChanger);
            update(myData);
        } else {
            console.log("PatchChannel Error: " + JSON.stringify(error));
        }
    });

    /* 
    For closing this window after closing the source window
    */
    FSBL.Clients.RouterClient.addListener("closeMainWindowChannel", function (error, response) {
        if (error) {
            console.log("closeMainWindowChannel Error: " + JSON.stringify(error));
        } else {
            console.log("closeMainWindowChannel Response: " + JSON.stringify(response));
            console.log("Closing windiow");
            window.close();
        }
    });
});




