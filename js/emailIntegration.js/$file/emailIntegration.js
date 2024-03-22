// ************************************************************************
//		Email address validation and selection functions
//		For the DocBase system
//		version: 1.0
//		Last updated:  25/05/2010
// ************************************************************************

// ***********************  EMAIL ADDRESS CHECK ***************************

function checkValidEmailAdr(emVal)
{
	// Checks to see if the email field is nothing, then if not, validates the email address to be a valid address
	
	// Parameters
	// emVal - The value of the email field to check
	
	if (emVal == "")
	{
		alert('Please fill in the email address field');
		return false;
	}
	
	
	// There are two different types of email addresses acceptable.
	// Firstly is the FirstName.MiddleInitial.LastName@department.qld.gov.au
	// The second is FirstName MiddleInitial LastName/certifier/qdot/au
			
	eVal = emVal
						
	//Trim out all of the spaces
	eVal = trim(eVal);
			
	// Check for the first type of email address first
	rCheck = /\w+[.]\w{1}(\w?[']\w)|\w+[@]\w+[.qld.gov.au]/;
			
	if (eVal.match(rCheck) == null)
	{
		// Check for the other type of email address
		rCheck = /\w+[/]\w+[/qdot/au]/;
		// rCheck = /\w+\w{1}[ ]{1}\w+/;
		if (eVal.match(rCheck) == null)
		{
			alert('Please enter in your internet email address or full Lotus Notes user name for the contact email.');
			return false;
		}
	}
	return true;
}


// ***********************  HELP FUNCTION ***************************
// These functions are used to display and hide the help fields

function hideFieldHelp(helpId)
{
	// Hides the help field visually
	
	// Parameters
	// helpId - The id of the help section on the form
	
	var helpEl = document.getElementById(helpId);
	
	if (helpEl)
	{
		helpEl.className = "hideVisually";
	}
}

function unhideFieldHelp(helpId)
{
	// Unhides the help field/section to display it
	
	// Parameters
	// helpId - The id of the help section on the page.
	
	var helpEl = document.getElementById(helpId);
	
	if (helpEl)
	{
		helpEl.className = "fieldHelp";
	}
}

// ***********************  AJAX FUNCTIONS ***************************

function GetXmlHttpObject()
{
	var xmlHttp=null;
	try
	{
  		// Firefox, Opera 8.0+, Safari
  		xmlHttp=new XMLHttpRequest();
  	}
	catch (e)
  	{
  		// Internet Explorer
  		try
    		{
    			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    		}
  		catch (e)
    		{
    			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
    		}
  	}
	return xmlHttp;
}

// ***********************  NAME SELECT (ajax) FUNCTIONS ***************************

function loadContent(loadWhat, loadWhere)
{
	// Loads some content into the element specified
	
	// Parameters
	// loadWhat - the content to load
	// loadWhere - Object - the element to load the content into
	
	loadWhere.innerHTML = loadWhat;
	
	// Try to get the initial field to focus in
	var intFild = document.getElementById('searchName');
	
	if (intFild)
	{
		intFild.focus();
	}
}

function displayLoaderImage(displayWhere)
{
	// Loads the ajax loading animated gif into the specified section
	
	// Parameters
	// displayWhere - the id of the element to be the parent for the new window
	
	var parEl = document.getElementById(displayWhere);
	var imgEl = document.createElement('img');
	imgEl.setAttribute('alt', 'Loading page, please wait');
	imgEl.setAttribute('id', 'loadingImage');
	imgEl.setAttribute('src', '../ajax-loader.gif');
	
	parEl.appendChild(imgEl);
}

function getPersonAddress(baseUrl, wherePut)
{
	// Creates an Ajax request to pull back the person search page html to display
	// Parameters
	// baseUrl - The url to go to to retrieve the content
	// wherePut - The id of the section to place the returned content into
	
	var xmlHttp=GetXmlHttpObject();
	var whereEl = document.getElementById(wherePut);
	
	if (whereEl)
	{
		// No point in doing this if the section can't be found.
		if (xmlHttp != null)
		{
			xmlHttp.onreadystatechange=function()
			{
				if (xmlHttp.readyState == 4)
				{
					// write the content of the page here
					loadContent(xmlHttp.responseText, whereEl);
				}
			}
			xmlHttp.open("GET.html",baseUrl,true);
			xmlHttp.send(null);
		}
	}	
}

function closeSelectionPopup(parentContainer)
{
	// Closes the pop up window
	
	// Parameters
	// parentContainer - the containing element
	
	var parEl = document.getElementById(parentContainer);
	parEl.innerHTML = "";
}

function detectEscKey(e)
{
	// Key press detection for the esc key to close the lightbox
	
	// Parameters
	// contEl - The id of the container element so it can be closed

	var keynum;

  	if(window.event) // IE
	{
		keynum = e.keyCode;
	}
	else if(e.which) // Netscape/Firefox/Opera
	{
		keynum = e.which;
	}

	if (keynum == 27)
	{
		closeSelectionPopup('searchContainer');
	}
}

function createSelectionPopup(parentContainer, inputField)
{
	// Creates the two pop up windows to contain the ajax pop up window, then loads the content
	
	// Parameters
	// parentContainer - The id of the parent element to contain everything
	// inputField - The id of the field to input the result into
	
	// Declare a constant to say where to locate the search form
	var searchLoc = "../webPersonSearch?OpenPage&aParameter=stuff";
	
	var textEl, functEvent, fToAdd;
	var parEl = document.getElementById(parentContainer);
	
	// Create the grey out screen
	var greyout = document.createElement('div');
	greyout.setAttribute('id', 'greyout');
	
	// Create the pop-up element
	var popup = document.createElement('div');
	popup.setAttribute('id', 'popupScreen');
	//fToAdd = "detectEscKey('" + parentContainer + "', event);";
	
	// Create the content container element for the pop up window
	var popupContent = document.createElement('div');
	popupContent.setAttribute('id', 'popupScreenContent');
	
	// Create the close section link on the page
	var closeEl = document.createElement('a');
	closeEl.setAttribute('href', '#');
	closeEl.setAttribute('id', 'popupClose');
	textEl = document.createTextNode('Close');
	closeEl.appendChild(textEl);
	fToAdd = "closeSelectionPopup('" + parentContainer + "');";
	functEvent = new Function (fToAdd);
	closeEl.onclick = functEvent;
	
	// Append the children to the pop up element
	popup.appendChild(closeEl);
	popup.appendChild(popupContent);
	
	parEl.appendChild(greyout);
	parEl.appendChild(popup);
	
	// Populate the pop up window with the loading image
	displayLoaderImage('popupScreenContent');
	
	// Now go and try to get the content of the loading window.
	getPersonAddress(searchLoc, 'popupScreenContent');
	
	// move the focus to the parent element
	//parEl.focus();
}

function nameCheck()
{
	// Checks for mandatory fields on submission of the name search form
	
	if (!document.getElementById && !document.createElement && !document.createTextNode)
	{
		// No browser support, let the server do the validation - how did the popup get there?
		return true;
	}
	var errmsg, temp;
	var dEl = document.getElementById('searchName');
	var inEl = document.getElementById('enterName');
	var dVal = dEl.value;
	var inVal = inEl.value;
	var tempErr = "";
	
	// check the value against the default value
	if ((dVal == "") && (inVal == ""))
	{
		alert('Please enter either a name to search for, or your email address');
		return false;
	}
	
	// Submit the search to the backend browser - first add the wait message
	closeSelectionPopup('popupScreenContent');
	
	if (inVal == "")
	{
		displayLoaderImage('popupScreenContent');
	
		// Now submit the request to the backend agent
		temp = "../personSearch?OpenAgent&subsite="+ escape(dVal);
		getPersonAddress(temp, 'popupScreenContent');
	}else{
		// The person typed in an email address, use that
		setSendTo(inVal);
	}
}

function setSendTo(nameSet)
{
	// Takes the click result for the unordered list of search results and sets the parent field
	
	// Parameters
	// nameSet - the value to set the field to
	var nField, ynam;
	
	if (document.title == "feedback")
	{
		nField = document.getElementById('Email');
		ynam = document.getElementById('FeedbackComments');
	}
	
	if (document.title == "recall stationery")
	{
		nField = document.getElementById('Requester');
		ynam = document.getElementById('Request');
	}
	
	if (document.title == "biid request")
	{
		nField = document.getElementById('Requester');
		ynam = document.getElementById('Requester');
	}
	
	if (document.title == "young driver")
	{
		nField = document.getElementById('Email');
		ynam = document.getElementById('Centre');
	}
	
	// And get rid of teh pop up window
	closeSelectionPopup('searchContainer');
	
	if (nField)
	{
		nField.value = nameSet;
		// Then, just to be nice, put the cursor into the top editable field
		ynam.focus();
	}
}

// ***********************  FEEDBACK INITIALISATION FUNCTIONS ***************************

function loadFeedbackCategories(feedCats, whereEl)
{
	var i;
	var feedCatAr = feedCats.split("~");
	
	//whereEl.length = feedCatAr.length;
	
	for (i=0; i<feedCatAr.length; i++)
	{
		if (feedCatAr[i] != "")
		{
			whereEl.length++;
			whereEl.options[i].value = feedCatAr[i];
			whereEl.options[i].text = feedCatAr[i];
		}
	}
}

function getFeedbackCategories(baseUrl, wherePut)
{
	// Creates an Ajax request to pull back the feedback categories
	// Parameters
	// baseUrl - The url to go to to retrieve the content
	// wherePut - Object - the field to place the returned content into
	
	var xmlHttp=GetXmlHttpObject();
	
	if (wherePut)
	{
		// No point in doing this if the section can't be found.
		if (xmlHttp != null)
		{
			xmlHttp.onreadystatechange=function()
			{
				if (xmlHttp.readyState == 4)
				{
					// write the content of the page here
					loadFeedbackCategories(xmlHttp.responseText, wherePut);
				}
			}
			xmlHttp.open("GET.html",baseUrl,true);
			xmlHttp.send(null);
		}
	}	
}


function feedbackSetup()
{
	// Performs the feedback form setup functions
	
	var refPage = document.getElementById('HTTP_Referer').value;
	var feedOn = document.getElementById('FeedbackonPage');
	var feedSelect = document.getElementById('FeedbackCat');
	var feedCatsFrom = "../feedCatLoo?OpenPage&someparameter=something";
	
	// get the referring page
	if (refPage == "")
	{
		// The domino server wasn't able to pick up the referer reference, pull it from javascript object
		if (document.referrer != "")
		{
			feedOn.value = document.referrer;
		}
	}else{
		feedOn.value = refPage;
	}
	
	// Load in the feedback categories
	getFeedbackCategories(feedCatsFrom, feedSelect);
	
}

// ***********************  FEEDBACK SUBMIT FUNCTIONS ***************************

function newValidateFeedback()
{
	// Performs the validation of the feedback form
	
	// Get a handle on all of the mandatory fields
	var feedComm = document.getElementById('FeedbackComments');
	var feedEmail = document.getElementById('Email');
	
	// Check the mandatory values
	if (feedComm.value == "")
	{
		alert('Please enter a value in the Comments/Feedback field');
		return false;
	}
	
	return checkValidEmailAdr(feedEmail.value);
}

// ***********************  RECALL SUBMIT FUNCTIONS ***************************

function newValidateRecallStationary()
{
	// Performs the validation of the recall stationery form
	
	// Get a handle on all of the mandatory fields
	var reqFrom = document.getElementById('Requester');
	return checkValidEmailAdr(reqFrom.value);
	
}

// ***********************  YOUNG DRIVER INITIALISATION FUNCTIONS ***************************

function youngDrivSetup()
{
	// Performs the young drivers form setup functions
	
	var exTypes = document.getElementById('ExemptType');
	var exTypesFrom = "../ydLooWeb?OpenPage&someparameter=something";
	
	// Load in the feedback categories
	getFeedbackCategories(exTypesFrom, exTypes);
	
}

// ***********************  YOUNG DRIVER SUBMIT FUNCTIONS ***************************

function getDropDownValue(fieldName)
{
	// Just returns the value for a selection (drop down) field field
	// Parameters list:
	// fieldName - The name of the field to return the value for
	
	var dElement = document.getElementById(fieldName);
	var selInd = dElement.selectedIndex;
	return dElement.options[selInd].text;
}

function newValidateYoungDriver()
{
	// Performs the validation of the recall stationery form
	
	// Get a handle on all of the mandatory fields
	
	var cent = document.getElementById('Centre');
	var opEm = document.getElementById('Email');
	var crn = document.getElementById('CRN');
	var appnm = document.getElementById('AppName');
	var exTyp = getDropDownValue('ExemptType');
	
	if (cent.value == "")
	{
		alert('Please enter in the Centre.');
		cent.focus();
		return false;
	}
	
	if (opEm.value == "")
	{
		alert('Please enter in the Operator email address');
		opEm.focus();
		return false;
	}	
	
	if (crn.value == "")
	{
		alert('Please enter in the CRN');
		crn.focus();
		return false;
	}
	
	if (appnm.value == "")
	{
		alert('Please enter in the Applicants Name');
		appnm.focus();
		return false;
	}
	
	if (exTyp == "")
	{
		alert('Please select the Exemption type');
		return false;
	}
	
	return checkValidEmailAdr(opEm.value);
	
}


function newBiidIssueRequest() {
	//Perform validation on the BIID Issue Request
             
	// Get a handle on all of the mandatory fields
	var reqFrom = document.getElementById('Requester');
	if (checkValidEmailAdr(reqFrom.value)){
		//Email is OK, continue
	} else {
		return false
	}

	//Get value of radio button for PreviousIssue field
	var previousIssueItems = document.getElementsByName('PreviousIssue');
	var previousIssue = "";
	if(previousIssueItems){
		var previousIssueItemsLength = previousIssueItems.length;
		if(previousIssueItemsLength == undefined)
			if(previousIssueItems.checked) previousIssue = previousIssueItems.value;
		for(var i = 0; i < previousIssueItemsLength; i++) {
			if(previousIssueItems[i].checked) {
				previousIssue = previousIssueItems[i].value;
			}
		}
	}

	//Get the value of radio button for ImpactCost field
	var impactCostItems = document.getElementsByName('ImpactCost');
	var impactCost = "";
	if(impactCostItems){
		var impactCostItemsLength = impactCostItems.length;
		if(impactCostItemsLength == undefined)
			if(impactCostItems.checked) impactCost = impactCostItems.value;
		for(var i = 0; i < impactCostItemsLength; i++) {
			if(impactCostItems[i].checked) {
				impactCost = impactCostItems[i].value;
			}
		}
	}

	var requester = document.getElementById('Requester');
	var previousIssueRef = document.getElementById('PreviousIssueRef');
	var issueDetail = document.getElementById('IssueDetail');
	var docBaseRef = document.getElementById('DocBaseRef');
	var impactOccurrence = document.getElementById('ImpactOccurrence');
	var impactScope = document.getElementById('ImpactScope');
	var impactOnPolicy = document.getElementById('ImpactOnPolicy');
	var impactCostDetail = document.getElementById('ImpactCostDetail');
	var resolutionAction = document.getElementById('ResolutionAction');
	var resolutionWorkaround = document.getElementById('ResolutionWorkaround');
	var otherInformation = document.getElementById('OtherInformation');

	if (previousIssue == ""){
		alert('Please select whether the issue has been raised previously.');
		return false;
	}

	if (previousIssue == "Yes" && previousIssueRef.value == ""){
		alert('Please enter a reference for the previous issue.');
		previousIssueRef.focus();
		return false;
	}

	if (issueDetail.value == ""){
		alert('Please enter a description of the issue.');
		issueDetail.focus();
		return false;
	}

	if (impactCost == "Yes" && impactCostDetail.value == ""){
		alert('Please enter details of the cost impacts.');
		impactCostDetail.focus();
		return false;
	}


	//Get value of mandatory radio button for ApprovalInformation field ===========================================================
	//var approvalInfoItems = document.getElementsByName('ApprovalInformation');
	//var approvalInfo = "";
	//if(approvalInfoItems){
	//	var approvalInfoItemsLength = approvalInfoItems.length;
	//	if(approvalInfoItemsLength == undefined)
	//		if(approvalInfoItems.checked) approvalInfo = approvalInfoItems.value;
	//	for(var i = 0; i < approvalInfoItemsLength; i++) {
	//		if(approvalInfoItems[i].checked) {
	//			approvalInfo = approvalInfoItems[i].value;
	//		}
	//	}
	//}

	//if (approvalInfo == ""){
	//	alert('Please indicate whether you received approval to forward this request from your SA(SM)/Manager.');
	//	return false;
	//}


	//Get value of mandatory text for ManagerDetails field 
	//var managerDetails = document.getElementById('ManagerDetails');

	//if (managerDetails.value == ""){
	//	alert('Please provide your SA(SM)/Manager\'s details.');
	//	managerDetails.focus();
	//	return false;
	//}

             //=========================================================================================================

	//Confirm the user intended to submit the request
	var response=confirm("Do you want to submit/send this request?");
	if (response==false) return false;

}
