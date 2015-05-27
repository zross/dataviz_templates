var BATCH_SAMPLE_POST_KVP = HOST_URL + '/geocoding/v1/batch?key=YOUR_KEY_HERE&callback=renderBatch';
var BATCH_SAMPLE_POST_KVP_FAIL = HOST_URL + '/geocoding/v1/batch?key=YOUR_KEY_HERE&callback=renderBatch';
var BATCH_SAMPLE_POST_JSON = HOST_URL + '/geocoding/v1/batch?key=YOUR_KEY_HERE&callback=renderBatch';
var BATCH_SAMPLE_POST_XML = HOST_URL + '/geocoding/v1/batch?key=YOUR_KEY_HERE&callback=renderBatch';
var batch_safe = '';
var batchOptions = '';
http://open.mapquestapi.com/geocoding/v1/address?key=YOUR_KEY_HERE&303 Fairmount Ave, Ithaca NY
function showBatchURL() { 
    batchOptions = '';
    var arrLocations = new Array();
    if (document.getElementById('location1').value != "") {
        arrLocations.push(document.getElementById('location1').value);
    }  
    if (document.getElementById('location2').value != "") {
        arrLocations.push(document.getElementById('location2').value);
    }  
    if (document.getElementById('location3').value != "") {
        arrLocations.push(document.getElementById('location3').value);
    }  
    if (document.getElementById('location4').value != "") {
        arrLocations.push(document.getElementById('location4').value);
    }  
    
    var thumbMaps = document.getElementById('batchThumbMaps').value;
    var maxResults = document.getElementById('batchMaxResults').value;
    var batchFormat = document.getElementById('batchInFormat').value;
    var batchOutFormat = document.getElementById('batchOutFormat').value;
    var batchDelimiter = document.getElementById('batchDelimiter').value;
    
    switch (batchFormat) {
        case "kvp":
            batch_safe = BATCH_SAMPLE_POST_KVP;
            if (arrLocations.length > 0) {
                for (var i=0; i<arrLocations.length;i++) {
                    batch_safe += '&location=' + arrLocations[i];
                }
            }
            if (thumbMaps == "false") {
                batch_safe += '&thumbMaps=' + thumbMaps;
            }
            if (maxResults != "") {
                batch_safe += '&maxResults=' + maxResults;
            }
            if (document.getElementById('batchBoundingBox').selectedIndex == 1) {
                batch_safe += '&boundingBox=39.715056,-75.811158,39.5098,-75.491781';
            }
            if (document.getElementById('batchOutFormat').value == 'file' && batchDelimiter != '') {
            batch_safe += '&outFormat=csv&delimiter=' + batchDelimiter;
            }
            break;
        case "json":
            batch_safe = BATCH_SAMPLE_POST_JSON;
			if (document.getElementById('batchOutFormat').value == "file" && batchDelimiter != "") {
                    batch_safe += '&outFormat=csv';
            }
            batch_safe += '&json={';
            if (arrLocations.length > 0) {
                batch_safe += 'locations:[{street:"' + arrLocations[0] + '"}';
                for (var i=1; i<arrLocations.length;i++) {
                    batch_safe += ',{street:"' + arrLocations[i] + '"}';
                }
                batch_safe += ']';
            }
            if (thumbMaps == "false" || maxResults != "" || document.getElementById('batchBoundingBox').selectedIndex == 1 || (batchOutFormat == "file" && batchDelimiter != "")) {
                batchOptions += ',options:{';
                if (thumbMaps == "false") {
                    batchOptions += 'thumbMaps:' + thumbMaps;    
                }
                if (maxResults != "" && batchOptions != ',options:{') {
                    batchOptions += ',maxResults:' + maxResults;
                }
                else if (maxResults != "") {
                    batchOptions += 'maxResults:' + maxResults;
                }
                if (document.getElementById('batchBoundingBox').selectedIndex == 1 && batchOptions != ',options:{') {
                    batchOptions += ',boundingBox:{ul:{lat:39.715056,lng:-75.811158},lr:{lat:39.5098,lng:-75.491781}}';
                }
                else if (document.getElementById('batchBoundingBox').selectedIndex == 1) {
                    batchOptions += 'boundingBox:{ul:{lat:39.715056,lng:-75.811158},lr:{lat:39.5098,lng:-75.491781}}';
                }
                if (document.getElementById('batchOutFormat').value == "file" && batchDelimiter != "" && batchOptions != ',options:{') {
                    batchOptions += ',delimiter:"' + batchDelimiter + '"';
                }
				else if (document.getElementById('batchOutFormat').value == "file" && batchDelimiter != "") {
                    batchOptions += 'delimiter:"' + batchDelimiter + '"';
                }
                batchOptions += '}';
                batch_safe += batchOptions;
            }
            batch_safe += '}';
            break;
        case "xml":
            batch_safe = BATCH_SAMPLE_POST_XML;
			if (document.getElementById('batchOutFormat').value == 'file' && batchDelimiter != '') {
                    batch_safe += '&outFormat=csv';
            }
            batch_safe += '&xml=<batch>';
            if (arrLocations.length > 0) {
                batch_safe += '<locations>';
                for (var i=0; i<arrLocations.length;i++) {
                    batch_safe += '<location><street>' + arrLocations[i] + '</street></location>';
                }
                batch_safe += '</locations>';
            }
            if (thumbMaps == "false" || maxResults != "" || document.getElementById('batchBoundingBox').selectedIndex == 1 || (batchOutFormat == "file" && batchDelimiter != "")) {
                batch_safe += '<options>';
                if (thumbMaps == "false") {
                    batch_safe += '<thumbMaps>' + thumbMaps + '</thumbMaps>';    
                }
                if (maxResults != "") {
                    batch_safe += '<maxResults>' + maxResults + '</maxResults>';
                }
                if (document.getElementById('batchBoundingBox').selectedIndex == 1) {
                    batch_safe += '<boundingBox><ul><latLng><lat>39.715056</lat><lng>-75.811158</lng></latLng></ul><lr><latLng><lat>39.5098</lat><lng>-75.491781</lng></latLng></lr></boundingBox>';
                }
                if (document.getElementById('batchOutFormat').value == 'file' && batchDelimiter != '') {
                    batch_safe += '<delimiter>' + batchDelimiter + '</delimiter>';
                }
                batch_safe += '</options>'
            }
            batch_safe += '</batch>';
            break;
    }

    document.getElementById('batchSampleUrl').innerHTML = batch_safe.replace(/</g, '&lt;').replace(/>/g, '&gt;');;
};

function doBatch() {
	document.getElementById('batchNarrative').innerHTML = '';
	var script = document.createElement('script');
    script.type = 'text/javascript';
    showBatchURL();
    var newURL = batch_safe.replace('YOUR_KEY_HERE', APP_KEY);
    script.src = newURL;
    document.body.appendChild(script);
};

function renderBatch(response) {
    var html = '';
    var i = 0;
    var j = 0;

    if (response.results.length > 0 && response.results[0].locations.length > 0) { // Location ambiguities!
        html = "<p>Locations:</p><table>";
        for (i = 0; i < response.results.length; i++) {
            html += '<tr><td colspan="2"><b>Location ' + (i+1) + '</b></td></tr>';
            for (j=0; j<response.results[i].locations.length; j++) {
                var location = response.results[i].locations[j];
                
                html += '<tr><td>';
                html += ' ' + (location.street || ' ');
                html += ' ' + (location.adminArea5 || ' ');
                html += ' ' + (location.adminArea4 || ' ');
                html += ' ' + (location.adminArea3 || ' ');
                html += ' ' + (location.adminArea2 || ' ');
                html += ' ' + (location.postalCode || ' ');
                html += ' ' + (location.adminArea1 || ' ');
                html += '</td>';
                    
                if (location.mapUrl) {
                    html += '<td>';
                    html += '<img src="' + location.mapUrl + '"/>';
                    html += '</td>';
                }
                html += '</tr>';
            }        
        }
        html += '</table>';
        document.getElementById('batchNarrative').innerHTML = html;
        return;
    }
        
    if (response.info.messages) {
        html += '<br><b>Errors:</b><br>';
        for (i=0;i<response.info.messages.length;i++) {
            html += response.info.messages[i] + '<br>';
        }
    }
  
    document.getElementById('batchNarrative').innerHTML = html;
}