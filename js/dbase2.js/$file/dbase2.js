/*
 AUTHOR : Richard van den Hurk
 DATE : 02/09/2009
 Adapted for DocBase from original author below
 */
/*
 /*
 ORIGINAL AUTHOR : Patrick Kwinten (patrick.kwinten@sandvik.com)
 DATE : 2007/02/19
 */
/*
 ==========================================
 GLOBAL VARIABLES
 ==========================================
 */
var arl = "";
var doc = document.forms[0];

/*
 ============================================
 VALIDATION FUNCTIONS
 USED TO VALIDATE FIELDS ON DOCBASE WEB FORMS
 ============================================
 */
function validateYoungDriver(form){

    if (form.Centre.value == "") {
        alert("Please enter a value in the Centre field")
        form.Centre.focus();
        return false
    }
    
    if (form.CRN.value == "") {
        alert("Please enter a value in the CRN field");
        form.CRN.focus();
        return false
    }
	
	if (isNumeric(document.getElementById('CRN'), 'CRN consists of Numbers Only')){
		
	}else {
		return false
	}

    
    if (form.AppName.value == "") {
        alert("Please enter a value in the Applicants Name field");
        form.AppName.focus()
        return false
    }
    
    if (form.ExemptType.value == "") {
        alert("Please enter a value in the Exemption Type field");
        form.ExemptType.focus();
        return false
    }
    
    return true;
    
}

function validateRecallStationary(form){


    if (form.Requester.value == "") {
        alert("Please enter a value in the Name of Requester field")
        form.Requester.focus();
        return false
    }
    
    if (form.Request.value == "") {
        alert("Please enter a value in the Recall Request field")
        form.Request.focus();
        return false
    }
    
    return true;
    
}

function validateFeedback(form){


    if (form.FeedbackComments.value == "") {
        alert("Please enter a value in the Comments/Feedback field")
        form.FeedbackComments.focus();
        return false
    }
    
    if (form.Email.value == "") {
        alert("Please enter a value in the Email field")
        form.Email.focus();
        return false
    }
    
    return true;
    
}


function checkTextField(fieldName, fieldLabel, defValue, errmsg, errFormat){
    // Validates a plain text field
    // Parameters list:
    // fieldName - The name of the field to validate on the form
    // fildLabel - The user visible name of the field
    // defValue - The default value of teh field (or a value to check for equality) specify an empty string to check for a null value
    // errmsg - the string that will be passed back with the error message
    // errFormat - The format for the error message.  Use either the value -list- or the value -str- to specify the return value type
    //'AppName', 'Applicants name', '', 'Please enter a value in the applicant name field', 'str')
    var dVal = getTextValue(fieldName);
    var tempErr = "";
    var tempErrMsgtxt = errmsg;
    
    // check the value against the default value
    if (dVal == defValue) {
        //tempErr = "Please fill in the field " + fieldLabel;
        
        // Check for what format to return the error message in
        if (errFormat == "list") {
            tempErrMsgtxt = buildErrorList(errmsg, tempErr);
        }
        else {
            tempErrMsgtxt = errmsg //+ "/n" + tempErr;
        }
        
        // Add a highlight class to the field
        addErrorHighlight(fieldName);
        alert(tempErrMsgtxt);
        return false
    }
    else {
        return true;
    }
}

// If the element's string matches the regular expression it is all numbers
function isNumeric(elem, helperMsg){
    var numericExpression = /^[0-9]+$/;
    if (elem.value.match(numericExpression)) {
        return true;
    }
    else {
        alert(helperMsg);
        elem.focus();
        return false;
    }
}


function validateSearch(form){


    if (form.Query.value == "") {
        alert("Please enter a value in the search field")
        form.Query.focus();
        return false
    }
    
    return checkSpecialChars('Query')
    
}

function validateMiniSearch(form){


    if (form.MiniQuery.value == "") {
        alert("Please enter a value in the search field")
        form.MiniQuery.focus();
        return false
    }
    
    return checkSpecialChars('MiniQuery')
    
}

function checkSpecialChars(fieldName){

    var dVal = getTextValue(fieldName);
    var tempErr = "";
    
    // check to make sure there are no special characters
    //var iChars = "!@#$%^&*()+=-[]\';,./{}|\":<>?";
    var iChars = "!@#%^&*()=[]\';,/{}|\":<>?";
    for (var i = 0; i < dVal.length; i++) {
        if (iChars.indexOf(dVal.charAt(i)) != -1) {
            tempErrMsgtxt = "This field contains special characters. \n These are not allowed in this instance. \n Please remove them and try again.";
            alert(tempErrMsgtxt);
            return false;
        }
    }
    return true;
}

function getTextValue(fieldName){
    // Just returns the value for a selected text field
    // Parameters list:
    // fieldName - The name of the field to validate on the form
    
    var dElement = document.getElementById(fieldName);
    return dElement.value;
    
}

function addErrorHighlight(fieldName){
    // Adds a highlight class to the fields so that fields that generated an input error are given a higher focus to the user
    
    // Parameters
    // fieldName - The field on the form to add a highlight class to
    
    var hField = document.getElementById(fieldName);
    //hField.setAttribute('class', 'errorHighlight');
    hField.focus();
    
}

/*
 ==========================================
 GLOBAL GENERAL FUNCTIONS
 FUNCTIONS NOT SPECIFIC TO APPLICATION
 ==========================================
 */
/*
 ##########################################
 FUNCTIONS WITH @LEFT SIMILARITY
 ##########################################
 */
function Left(str, n){
    if (n <= 0) 
        return ""
    else 
        if (n > String(str).length) 
            return str
        else 
            return String(str).substring(0, n)
}

/*
 ##########################################
 @Left FUNCTION
 ##########################################
 */
function strLeft(sourceStr, keyStr){
    return (sourceStr.indexOf(keyStr) == -1 | keyStr == '') ? '' : sourceStr.split(keyStr)[0]
}

/*
 ##########################################
 FUNCTIONS WITH @RIGHT SIMILARITY
 ##########################################
 */
function Right(str, n){
    if (n <= 0) 
        return ""
    else 
        if (n > String(str).length) 
            return str
        else {
            var iLen = String(str).length
            return String(str).substring(iLen, iLen - n)
        }
}


function strRight(sourceStr, keyStr){
    idx = sourceStr.indexOf(keyStr)
    return (idx == -1 | keyStr == '') ? '' : sourceStr.substr(idx + keyStr.length)
}


/*
 ##########################################
 FUNCTION WITH @REPLACESUBSTRING SIMILARITY
 goes through the inputString
 and replaces every occurrence of
 fromString with toString
 ##########################################
 */
function replaceSubstring(inputString, fromString, toString){
    var temp = inputString
    if (fromString == "") {
        return inputString
    }
    if (toString.indexOf(fromString) == -1) {
        // if the string being replaced is not a part of the replacement string (normal situation)
        while (temp.indexOf(fromString) != -1) {
            var toTheLeft = temp.substring(0, temp.indexOf(fromString))
            var toTheRight = temp.substring(temp.indexOf(fromString) + fromString.length, temp.length)
            temp = toTheLeft + toString + toTheRight
        }
    }
    else {
        // string being replaced is part of replacement string (like "+" being replaced with "++") - prevent an infinite loop
        var midStrings = new Array("~", "`", "_", "^", "#")
        var midStringLen = 1
        var midString = ""
        // Find a string that doesn't exist in the inputString to be used as an "inbetween" string
        while (midString == "") {
            for (var i = 0; i < midStrings.length; i++) {
                var tempMidString = ""
                for (var j = 0; j < midStringLen; j++) {
                    tempMidString += midStrings[i]
                }
                if (fromString.indexOf(tempMidString) == -1) {
                    midString = tempMidString
                    i = midStrings.length + 1
                }
            }
        }
        // keep on going until we build an "inbetween" string that doesn't exist
        // now go through and do two replaces - first, replace the "fromString" with the "inbetween" string
        while (temp.indexOf(fromString) != -1) {
            var toTheLeft = temp.substring(0, temp.indexOf(fromString))
            var toTheRight = temp.substring(temp.indexOf(fromString) + fromString.length, temp.length)
            temp = toTheLeft + midString + toTheRight
        }
        // next, replace the "inbetween" string with the "toString"
        while (temp.indexOf(midString) != -1) {
            var toTheLeft = temp.substring(0, temp.indexOf(midString))
            var toTheRight = temp.substring(temp.indexOf(midString) + midString.length, temp.length)
            temp = toTheLeft + toString + toTheRight
        }
    }
    // ends the check to see if the string being replaced is part of the replacement string or not
    return temp;
    // send the updated string back to the user
}


/*
 ==========================================
 AJAX RELATED FUNCTIONS
 ==========================================
 */
/*
 ##########################################
 FUNCTION TO INITIATE AN AJAX REQUEST
 INPUT = XML SOURCE
 OUTPOT = DESIRED FUNCTION FOR FOLLOW UP
 ##########################################
 */
function createAJAXRequest(retrievalURL, responseFunction, synchronous){
    // based upon the browser-type we create a new XMLHTTP object
    try {
            // try to create an object for later versions of IE.  This used to be in the first catch statement below, but was moved here when IE8 became SOE.
            ajaxReq = new ActiveXObject('MSXML2.XMLHTTP')
    } 
    catch (e) {
        try {
        // try to create an object for Firefox, Safari, IE7 [30], etcetera 
        ajaxReq = new XMLHttpRequest()
        } 
        catch (e) {
            try {
                // try to create an object for early versions of IE
                ajaxReq = new ActiveXObject('Microsoft.XMLHTTP')
            } 
            catch (e) {
                // No possible to create a XMLHttpRequest object
                alert("Operation failed, you must be using a very old-browser")
                return false
            }
        }
    }
    // make a call to the system we retrieve information from
    ajaxReq.open("GET.html", retrievalURL, 0)
    // tell the system what to do when the request is ready / returns
    ajaxReq.onreadystatechange = eval(responseFunction)
    ajaxReq.send(null)
}

function ajaxRequestAsync(retrievalURL, callback){
    // based upon the browser-type we create a new XMLHTTP object
	try {
		if (document.documentMode <= 11) {
			//Work with IE in low document mode
			ajaxReq = new ActiveXObject('MSXML2.XMLHTTP')
			ajaxReq.open("GET.html", retrievalURL)
		} else {
			// try to create an object for Firefox, Safari, IE7 [30], etcetera 
			ajaxReq = new XMLHttpRequest()
			ajaxReq.open("GET.html", retrievalURL)
		}
	} catch (e) {
		try {
			// try to create an object for early versions of IE
			ajaxReq = new ActiveXObject('Microsoft.XMLHTTP')
			ajaxReq.open("GET.html", retrievalURL, 0)
		} catch (e) {
			// No possible to create a XMLHttpRequest object
			alert("Operation failed, you must be using a very old-browser")
			return false
		}
	}
    // tell the system what to do when the request is ready / returns
    ajaxReq.onreadystatechange = function() {
        if(ajaxReq.readyState==4 && ajaxReq.status==200) {
			callback(ajaxReq);
        }
    }
    ajaxReq.send()
}

/*
 ##########################################
 FUNCTION TO CHECK THE STATUS OF THE
 AJAX REQUEST
 readyState has 5 possible states:
 0 = uninitialized
 1 = loading
 2 = loaded
 3 = interactive
 4 = complete
 there are many HTTP status codes:
 100 = continue
 400 = bad request
 401 = unauthorized
 200 means simply OK, a succesfull return
 ##########################################
 */
function processReturnValue(){
    if (ajaxReq.readyState == 4) {
        if (ajaxReq.status == 200) {
            getCategory(ajaxReq.responseXML)
        }
    }
}

/*
 ##########################################
 FUNCTIONS TO COLLECT THE INFO FROM
 THE XML VIEW
 ##########################################
 */
function getCategory(xmlViewData){
    var viewRows = xmlViewData.getElementsByTagName("viewentry")
    varCat = getViewRowValues(viewRows[0])[0]
}

function getViewRowValues(row){
    colValsArray = new Array()
    getColumnValues(row)
    return colValsArray
}

function getColumnValues(rowOrCol){
    // take the first column in the row
    var node = rowOrCol.firstChild
    while (node != null) {
        // check if the column / node is of type 3 (text) or 4 (CData = character data)
        if ((node.nodeType == 3 || node.nodeType == 4) && node.nodeValue != "\n") {
            colValsArray[colValsArray.length] = node.nodeValue
        }
        else 
            if (node.nodeType == 1) {
                getColumnValues(node)
            }
        // take the next column in the row
        node = node.nextSibling
    }
}


function processReturnLU(){
    if (ajaxReq.readyState == 4) {
        if (ajaxReq.status == 200) {
            if (ajaxReq.documentElement == undefined) {
                return ("")
            }
            nodes = ajaxReq.documentElement.childNodes;
            temp = new Array(nodes.length);
            var j = 0;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes.item(i).childNodes.item(0).text == key) {
                    temp[j] = nodes.item(i).childNodes.item(column).text;
                    j++;
                }
                else {
                    break;
                }
            }
            
            var results = ""
            for (var i = 0; i < j; i++) {
                if (i == 0) {
                    results = temp[i];
                }
                else {
                    results = results + ", " + temp[i];
                }
            }
            return (results)
        }
    }
}

function processReturnCOL(){
    if (ajaxReq.readyState == 4) {
        if (ajaxReq.status == 200) {
            return (ajaxReq)
        }
    }
}


function setDataHTML(ajaxReq){
    document.getElementById('mainContent').innerHTML = ajaxReq.responseText
}


/*
 ##########################################
 LEVEL: NAVIGATION DISPLAY
 FUNCTION THAT SHOWS / HIDES DIV'S IN
 THE NAVIGATION MENU
 ##########################################
 */
function toggleSection(obj, bSync){

    //var browser = new BrowserDetectLite();
    //alert(obj.outerHTML)
    //objCont = objLink.nextSibling
    //if (browser.isIE) {//alert("cp1")
	if (document.documentMode <= 11) {
        objLink = obj.nextSibling
       
        objCont = objLink.nextSibling
        if (objCont.style.display == 'block' && !bSync) {
            objCont.style.display = 'none';
            obj.innerHTML = '<a href="javascript:void(0)"><img src="../img/navigation_plus.gif" alt="Expand Category" border="0">' + obj.innerText + '</a>'
        }
        else {
            objCont.style.display = 'block';
            obj.innerHTML = '<a href="javascript:void(0)"><img src="../img/navigation_minus.gif" alt="Collapse Category" border="0">' + obj.innerText + '</a>'
        }
        
        // var nexturl = objLink.getAttribute("nextentrysrc");
        
        //getHtmlFromXml(nexturl, objCont)
        //}	
    
        /*-------------------------------------------------------------------------------------------------------------------------------------------
         //var objUpper = obj.parentNode
         //alert(objUpper.innerHTML)
         objLink = obj.nextSibling
         //alert(objLink.outerHTML)
         objCont = objLink.nextSibling
         
         //var objCont = obj.firstChild
         //while (objCont.nodeType === 3)
         //objCont = objCont.nextChild;
         //alert(objCont.outerHTML)
         
         //var objText = node.innerText
         
         if (objCont.style.display == 'block' && !bSync) {
         objCont.style.display = 'none';
         //obj.innerHTML = '<a href="javascript:void(0)"><img src="../navigation_plus.gif" alt="Expand Category" border="0">' + obj.innerText + '</a>'
         obj.innerHTML = '<img src="../img/navigation_plus.gif" alt="Expand Category" border="0">'
         }
         else {
         objCont.style.display = 'block';
         //obj.innerHTML = '<a href="javascript:void(0)"><img src="../navigation_minus.gif" alt="Collapse Category" border="0">' + obj.innerText + '</a>'
         obj.innerHTML = '<img src="../img/navigation_minus.gif" alt="Collapse Category" border="0">'
         }
         //alert("cp3")
         var nexturl = objLink.getAttribute("nextentrysrc");
         //getHtmlFromXml(nexturl, objCont)
         //alert("cp5")
         //}
         */
    }
    else {
        objLink = obj.nextSibling
        objCont = objLink.nextSibling
        if (objCont.style.display == 'block' && !bSync) {
            objCont.style.display = 'none';
            obj.innerHTML = '<a href="javascript:void(0)"><img src="../img/navigation_plus.gif" alt="Expand Category" border="0">' + obj.innerText + '</a>'
        }
        else {
            objCont.style.display = 'block';
            obj.innerHTML = '<a href="javascript:void(0)"><img src="../img/navigation_minus.gif" alt="Collapse Category" border="0">' + obj.innerText + '</a>'
        }
        
        // var nexturl = objLink.getAttribute("nextentrysrc");
        
         //getHtmlFromXml(nexturl, objCont)
        //}	
    
    
    }
    
}

/*
 ##########################################
 LEVEL: NAVIGATION DISPLAY
 FUNCTION THAT LOADS THE PRODUCTS AS XML
 AND APPLIES A XLST STYLESHEET IN ORDER
 TO DISPLAY THE LIST AS HTML
 ##########################################
 */
function loadMenu(varURL, varXLS){
    /* 
     transformation script for Firefox browser
     */
    //if (document.implementation && document.implementation.createDocument) {
	if (document.documentMode <= 11) {
	        xml = new ActiveXObject("MSXML2.DOMDocument")
            xml.async = false
            xml.load(ExtDBName + "/" + varURL + UserOrg)
            // load XSL
            oXsl = new ActiveXObject("MSXML2.DOMDocument")
            oXsl.async = false
            oXsl.load("/" + DBName + "/" + varXLS)
            // transform XML & XSL to HTML
            document.getElementById("menuTree").innerHTML = xml.transformNode(oXsl)
        //document.getElementById("Sitemap").innerHTML = xml.transformNode(oXsl)	
		
	} else {
	if (!(window.ActiveXObject || "ActiveXObject" in window)) {
        var XSLT = new XSLTProcessor
        // load XML
        var $xml = new XMLHttpRequest
        $xml.open('GET.html', ExtDBName + '/' + XMLSource + UserOrg, false)
        $xml.overrideMimeType('text/xml')
        $xml.send(null)
        var xml = $xml.responseXML
        // load XSL
        var $xsl = new XMLHttpRequest
        $xsl.open('GET.html', "/" + DBName + "/" + varXLS, false)
        $xsl.overrideMimeType('text/xml')
        $xsl.send(null)
        var xsl = $xsl.responseXML
        XSLT.importStylesheet(xsl)
        // transform XML & XSL to HTML
        el = document.getElementById("menuTree")
        while (el.hasChildNodes()) 
            el.removeChild(el.lastChild)
        el.appendChild(XSLT.transformToFragment(xml, document))
    }
    
    /* 
     transformation script for IE browser
     */
    else 
        if (window.ActiveXObject) {
            // load XML
			//var xml = new ActiveXObject("Msxml2.XSLTemplate");
            xml = new ActiveXObject("MSXML2.DOMDocument")
            xml.async = false
            xml.load(ExtDBName + "/" + varURL + UserOrg)
            // load XSL
            oXsl = new ActiveXObject("MSXML2.DOMDocument")
            oXsl.async = false
            oXsl.load("/" + DBName + "/" + varXLS)
            // transform XML & XSL to HTML
            document.getElementById("menuTree").innerHTML = xml.transformNode(oXsl)
        //document.getElementById("Sitemap").innerHTML = xml.transformNode(oXsl)
        }
        
        /*
     enter here script for Unknown browser
     */
        else {
            alert("Browser type unknown, the view navigation will not be supported. Please use a IE or Mozilla based browser.");
        }
	}
    // Determine if a document. If it is open the menu to the the correct menu link otherwise keep collapsed
    var menuPos = document.getElementById("MenuPos").value
    
    if (menuPos !== "") {
        doSync(menuPos);
        var docUNID = document.getElementById("docUNID").value;
        var currentLink = document.getElementById(docUNID);

        //currentLink.innerHTML = '<span style="font-size: 90%; display: block; font-weight: bold;"><img border="0" src="/icons/doclink.gif" alt="Document Link"/>&nbsp' + document.getElementById("docTitle").value + '</span>'
        if (currentLink)
        {
        	var curLinkText = currentLink.getElementsByTagName('a');
        	if (curLinkText)
        	{
        		var curLinkChildren = curLinkText[0].childNodes;
        		var i, linkText;
        		for (i=0; i<curLinkChildren.length; i++)
        		{

        			if (curLinkChildren[i].nodeValue != null)
        			{
					// It's the text copy it
        				linkText = curLinkChildren[i].nodeValue;
        			}
        		}
        		
        		if (linkText.slice(1, linkText.length) == document.getElementById("docTitle").value)
        		{
        			// Replace the link only if it's actually found the right page.
        			currentLink.innerHTML = '<span style="font-size: 90%; display: block; font-weight: bold;"><img border="0" src="/icons/doclink.gif" alt="Document Link"/>&nbsp' + document.getElementById("docTitle").value + '</span>'
        		}
        	}
        }
    }
}

function loadSitemap(varURL, varXLS){
    /* 
     transformation script for Firefox browser
     */
    if (document.implementation && document.implementation.createDocument) {
        var XSLT = new XSLTProcessor
        // load XML
        var $xml = new XMLHttpRequest
        //$xml.open('GET', ExtDBName + '/' + XMLSource + UserOrg, false)
        $xml.open('GET.html', ExtDBName + '/' + varURL + UserOrg, false)
        $xml.overrideMimeType('text/xml')
        $xml.send(null)
        var xml = $xml.responseXML
        // load XSL
        var $xsl = new XMLHttpRequest
        $xsl.open('GET.html', "/" + DBName + "/" + varXLS, false)
        $xsl.overrideMimeType('text/xml')
        $xsl.send(null)
        var xsl = $xsl.responseXML
        XSLT.importStylesheet(xsl)
        // transform XML & XSL to HTML
        el = document.getElementById("Sitemap")
        while (el.hasChildNodes()) 
            el.removeChild(el.lastChild)
        el.appendChild(XSLT.transformToFragment(xml, document))
    }
    
    /* 
     transformation script for IE browser
     */
    else {
        //var t = window.setTimeout(activate(varURL, varXLS), 10000);
        activate(varURL, varXLS);
        
    }
    
    /*
    
     enter here script for Unknown browser
    
     */
    
    //else {
    //alert("Browser type unknown, the view navigation will not be supported. Please use a IE or Mozilla based browser.");
    // }
    // Determine if a document. If it is open the menu to the the correct menu link otherwise keep collapsed
    /*
    
     var menuPos = document.getElementById("MenuPos").value
    
     
    
     if (menuPos !== "") {
    
     doSync(menuPos);
    
     var docUNID = document.getElementById("docUNID").value;
    
     var currentLink = document.getElementById(docUNID);
    
     currentLink.innerHTML = '<span style="font-size: 90%; display: block; font-weight: bold;"><img border="0" src="/icons/doclink.gif" alt="Document Link"/>&nbsp' + document.getElementById("docTitle").value + '</span>'
    
     
    
     }
    
     */
    
}

function activate(varURL, varXLS){
    if (window.ActiveXObject) {
        // load XML
        xml = new ActiveXObject("MSXML2.DOMDocument")
        
        xml.async = false
        xml.load(ExtDBName + "/" + varURL + UserOrg)
        // load XSL
        
        oXsl = new ActiveXObject("MSXML2.DOMDocument")
        
        oXsl.async = false
        oXsl.load("/" + DBName + "/" + varXLS)
        
        // transform XML & XSL to HTML
        
        document.getElementById("Sitemap").innerHTML = xml.transformNode(oXsl)
        
    }
}

/*
 ##########################################
 LEVEL: NAVIGATION DISPLAY
 FUNCTION THAT NAVIGATES THROUGH THE MENU
 AND SEARCHES IF THERE ARE CATEGORIES
 BENEATH AVAILABLE OR NOT
 ##########################################
 */
function getHtmlFromXml(xmlsrc, objCont){
    /* 
     transformation script for Firefox browser
     */
    //if (document.implementation && document.implementation.createDocument) {
	if (document.documentMode <= 11) {
		xml = new ActiveXObject("MSXML2.DOMDocument");
		xml.async = false
		xml.load(xmlsrc)
		// load XSL
		xsl = new ActiveXObject("MSXML2.DOMDocument");
		xsl.async = false
		xsl.load(oXsl)
		strRet = xml.transformNode(xsl)
		objCont.innerHTML = strRet
	//document.getElementById("Sitemap").innerHTML = xml.transformNode(oXsl)	
	} else {
	if (!(window.ActiveXObject || "ActiveXObject" in window)) {
        var XSLT = new XSLTProcessor
        // load XML
        
        var $xml = new XMLHttpRequest
        $xml.open('GET.html', xmlsrc, false)
        $xml.overrideMimeType('text/xml')
        $xml.send(null)
        var xml = $xml.responseXML
        // load XSL
        var $xsl = new XMLHttpRequest
        //$xsl.open('GET', "/" + DBName + XSLSource, false)
        $xsl.open('GET.html', "/" + DBName + "/prodlist.xsl", false)
        $xsl.overrideMimeType('text/xml')
        $xsl.send(null)
        var xsl = $xsl.responseXML
        XSLT.importStylesheet(xsl)
        
        // transform XML & XSL to HTML
        // previous code, no exclusive <div> available
        objCont.innerHTML = ""
        objCont.appendChild(XSLT.transformToFragment(xml, document));
    }
    /* 
     transformation script for IE browser
     */
    else 
        if (window.ActiveXObject) {
            // load XML
            xml = new ActiveXObject("MSXML2.DOMDocument");
            xml.async = false
            xml.load(xmlsrc)
            // load XSL
            xsl = new ActiveXObject("MSXML2.DOMDocument");
            xsl.async = false
            xsl.load(oXsl)
            strRet = xml.transformNode(xsl)
            objCont.innerHTML = strRet
        }
        /*
     enter here script for Unknown browser
     */
        else {
            alert("Browser is unknown, could not perform the action.");
        }
	}
}

/*
 ##########################################
 LEVEL: NAVIGATION DISPLAY
 FUNCTION THAT COLLECTS A LIST OF ALL
 THE CATEGORIES A PRODUCTS HAS. THIS
 FUNCTIONS WORKS UNDER A ONCLICK EVENT
 ##########################################
 */
function collectCategory(obj){
    //alert(obj)
    varPosSelect = obj.getAttribute('catpos')
    //varPosSelect = obj.CatPos
    //alert(varPosSelect)
    varPosSelectSplit = varPosSelect.split(".")
    var varPosLevels = new Array()
    var varPosCat = new Array()
    for (i = 0; i < varPosSelectSplit.length; i++) {
        varPosLevels[i] = varPosSelectSplit[i]
    }
    n = 0
    varCat = ""
    for (i = 0; i < varPosLevels.length; i++) {
        // for each level we are going to perform a AJAXRequest
        switch (i + 1) {
            // check which position we want to search in te view
            case 1:
                searchPos = eval(varPosLevels[0]);
                break
            case 2:
                searchPos = eval(varPosLevels[0]) + "." + eval(varPosLevels[1]);
                break
            case 3:
                searchPos = eval(varPosLevels[0]) + "." + eval(varPosLevels[1]) + "." + eval(varPosLevels[2]);
                break
            case 4:
                searchPos = eval(varPosLevels[0]) + "." + eval(varPosLevels[1]) + "." + eval(varPosLevels[2]) + "." + eval(varPosLevels[3]);
                break
            default:
                result = 'unknown'
        }
        varURL = ExtDBName + "/" + XMLCategories + UserOrg + "&start=" + searchPos;
        createAJAXRequest(varURL, "processReturnValue")
        varPosCat[n] = varCat
        n++
        
    }
    varPosCatString = varPosCat.join("||")
    // function to collect the requested restricttocategory information
    // tempvarURL = url with restricted category

    //parent.main.location.href = ExtDBName + "/BE_OrgProdSingleCatFr?OpenView&RestrictToCategory=" + UserOrg + "||" + varPosCatString + "&Count=12"
    //varURL= ExtDBName + "/" + XMLCatResult + UserOrg + "||" +varPosCatString;
    //createAJAXRequest(varURL,"processRestricted")
}

/*
 ##########################################
 LEVEL: NAVIGATION DISPLAY
 FUNCTION THAT COLLECTS WHICH POSITION /
 CATEGORY IN THE VIEW WE CLICK ON
 ##########################################
 */
function processRestricted(){
    if (ajaxReq.readyState == 4) {
        if (ajaxReq.status == 200) {
            getProducts(ajaxReq.responseXML)
        }
    }
}

/*
 ##########################################
 LEVEL: PRODUCTS DISPLAY
 FUNCTION THAT TRANSFORMS THE COLLECTED
 RESULTS (PRODUCTS) INTO A HTML TABLE
 ##########################################
 
 function getProducts(xmlViewData){
 // ** handle all the rows in the view
 var viewRows = xmlViewData.getElementsByTagName("viewentry")
 var prodList = "<table><tr>"
 // numberOfColumns could be a cookie value
 var numberOfColumns = 3
 for (i = 0; (i < viewRows.length); i++) {
 if (((i) % numberOfColumns) == 0) {
 prodList += "</tr><tr><td>"
 prodList += getViewRowValues(viewRows[i])[0]
 prodList += "</td>	"
 }
 else {
 prodList += "<td>"
 prodList += getViewRowValues(viewRows[i])[0]
 prodList += "</td>	"
 }
 }
 prodList = prodList + "</tr></table>"
 document.getElementById("mainContent").innerHTML = prodList
 }
 */
/*
 =========================================================
 FUNCTIONS TO SYNC THE NAVIGATOR TO CURRENT OPEN DOCUMENT
 =========================================================
 */
function doSync(strPos){
    ar = strPos.split(".");
    temp = ""
    for (i = 0; i < ar.length - 1; i++) 
    {
        temp = temp + ar[i];
        if (ar[i] != "x")
        {
        	obj = document.getElementById(temp);
        	if (obj)
        	{
        		toggleSection(obj.children[0], true);
        		temp = temp + ".";
        	}
        }else{
        	// Makes sure that if the sytem can't find the level, it returns a null
        	return;
        }
    }
    //obj.scrollIntoView()
}

/*
 ==========================================
 @DBLookup and @DBColumn Functions
 ==========================================
 */
function dbLookup(server, path, view, key, column){

    var pos = 0;
    currURL = (document.location.href).toLowerCase();
    if (trim(server) == "") {
        pos = currURL.indexOf('://');
        if (pos < 0) 
            server = "http://11.22.33.44/" // PUT YOUR SERVERNAME HERE
        else {
            pos += 3;
            pos = currURL.indexOf('http://szpant:SenaMedal1965%40@puma/', pos);
            server = currURL.substring(0, pos)
        }
    }
    
    if (trim(path) == "") {
        if (pos > 0) {
            newPos = currURL.indexOf('.nsf', pos);
            if (newPos > 0) {
                path = currURL.substring(pos + 1, newPos + 4)
            }
        }
    }
    
    //Javascript index starts at 0, so need to decrement the column by -1
    if (!isNaN(column)) 
        column -= 1;
    
    vurl = trim(server) + "/" + trim(path) + "/" + view + "?readviewentries&count=9999&startkey=" + key;
    
    results = createAJAXRequest(vurl, "processReturnLU")
    //xmlDoc.load(vurl);    
    
    return (results);
} //End of dbLookup
function dbColumn(server, path, view, column){

    var pos = 0;
    currURL = (document.location.href).toLowerCase();
    if (trim(server) == "") {
        pos = currURL.indexOf('://');
        if (pos < 0) 
            server = "http://11.22.33.44/" // PUT YOUR SERVERNAME HERE
        else {
            pos += 3;
            pos = currURL.indexOf('http://szpant:SenaMedal1965%40@puma/', pos);
            server = currURL.substring(0, pos)
        }
    }
    
    if (trim(path) == "") {
        if (pos > 0) {
            newPos = currURL.indexOf('.nsf', pos);
            if (newPos > 0) {
                path = currURL.substring(pos + 1, newPos + 4)
            }
        }
    }
    
    if (!isNaN(column)) 
        column -= 1;
    
    vurl = trim(server) + "/" + trim(path) + "/" + view + "?readviewentries&count=9999";
    
    createAJAXRequest(vurl, "processReturnCOL")
    if (this.ajaxReq.responseXML.documentElement == undefined) {
        return ("")
    }
    else {
            nodes = ajaxReq.responseXML.documentElement.childNodes;
            temp = new Array(nodes.length);
            var j = 0;
            for (var i = 0; i < nodes.length; i++) {
                temp[j] = nodes.item(i).childNodes.item(column).text;
                j++;
            }
        
            results = new Array(j);
            for (var i = 0; i < j; i++) {
                results[i] = temp[i];
            }
        }
    return (results);
} //End of dbColumn

function dbColumnCallback(server, path, view, column, callback){
   var pos = 0;
    currURL = (document.location.href).toLowerCase();
    if (trim(server) == "") {
        pos = currURL.indexOf('://');
        if (pos < 0) 
            server = "http://11.22.33.44/" // PUT YOUR SERVERNAME HERE
        else {
            pos += 3;
            pos = currURL.indexOf('http://szpant:SenaMedal1965%40@puma/', pos);
            server = currURL.substring(0, pos)
        }
    }
    
    if (trim(path) == "") {
        if (pos > 0) {
            newPos = currURL.indexOf('.nsf', pos);
            if (newPos > 0) {
                path = currURL.substring(pos + 1, newPos + 4)
            }
        }
    }
    
    if (!isNaN(column)) 
        column -= 1;
    
    vurl = trim(server) + "/" + trim(path) + "/" + view + "?readviewentries&count=9999";
    ajaxRequestAsync(vurl, function(result) {
		var content = result.responseText;
		if(content != '' && (content)) {
			if (result.responseXML.documentElement == undefined) {
				callback(false)
			} else {
				var viewEntries = result.responseXML.getElementsByTagName("viewentry");
				var tempArray = new Array(viewEntries.length);
				
				for (var i=0; i<viewEntries.length; i++) {
					var rowData = viewEntries[i].getElementsByTagName("entrydata");
					if (column < rowData.length) {
						var columnValue = rowData[column];
						tempArray[i] = getAllSubChildTextNodes(columnValue, ",");
					}
				}
				callback(tempArray)
			}
		} else {
			callback(false)
		}
	});
} //End of dbColumnCallback

function getAllSubChildTextNodes(parentNodeObj, separatorChar){
	
	var result = "";
	var tmpResult = "";
	if (parentNodeObj.nodeType == 3) {
		tmpResult = parentNodeObj.nodeValue.replace(/[\n\r]+/g, "");
		if (tmpResult != "") {
			if (result != ""){
				result = result.concat(separatorChar, tmpResult)
			} else {
				result = parentNodeObj.nodeValue
			}
		}
	} else {
		for (var i=0; i<(parentNodeObj.childNodes.length); i++) {
			var node = parentNodeObj.childNodes[i];
			tmpResult = getAllSubChildTextNodes(node, separatorChar);
			if (tmpResult != "") {
				if (result != ""){
					result = result.concat(separatorChar, tmpResult)
				} else {
					result = tmpResult
				}
			}
		}
	}

	return result
}

function trim(sStr){
    var iI = 0;
    var iJ = 0;
    var iTam = 0;
    var sAux = "";
    
    iTam = sStr.length;
    if (iTam == 0) 
        return (sStr);
    
    for (iI = 0; iI < iTam; iI++) 
        if (sStr.charAt(iI) != ' ') 
            break;
    
    if (iI >= iTam) 
        return ("");
    
    for (iJ = iTam - 1; iJ >= 0; iJ--) 
        if (sStr.charAt(iJ) != ' ') 
            break;
    
    return (sStr.substring(iI, iJ + 1));
} //End of trim
function BrowserDetectLite(){
    var ua = navigator.userAgent.toLowerCase();
    this.ua = ua;
    
    // browser name
    this.isGecko = (ua.indexOf('gecko') != -1);
    this.isMozilla = (this.isGecko && ua.indexOf("gecko/index.html") + 14 == ua.length);
    this.isNS = ((this.isGecko) ? (ua.indexOf('netscape') != -1) : ((ua.indexOf('mozilla') != -1) && (ua.indexOf('spoofer') == -1) && (ua.indexOf('compatible') == -1) && (ua.indexOf('opera') == -1) && (ua.indexOf('webtv') == -1) && (ua.indexOf('hotjava') == -1)));
    this.isIE = ((ua.indexOf("msie") != -1) && (ua.indexOf("opera") == -1) && (ua.indexOf("webtv") == -1));
    this.isOpera = (ua.indexOf("opera") != -1);
    this.isKonqueror = (ua.indexOf("konqueror") != -1);
    this.isIcab = (ua.indexOf("icab") != -1);
    this.isAol = (ua.indexOf("aol") != -1);
    this.isWebtv = (ua.indexOf("webtv") != -1);
    this.isOmniweb = (ua.indexOf("omniweb") != -1);
    this.isDreamcast = (ua.indexOf("dreamcast") != -1);
    
    // spoofing and compatible browsers
    this.isIECompatible = ((ua.indexOf("msie") != -1) && !this.isIE);
    this.isNSCompatible = ((ua.indexOf("mozilla") != -1) && !this.isNS && !this.isMozilla);
    
    // browser version
    this.versionMinor = parseFloat(navigator.appVersion);
    
    // correct version number for NS6+ 
    if (this.isNS && this.isGecko) {
        this.versionMinor = parseFloat(ua.substring(ua.lastIndexOf('http://szpant:SenaMedal1965%40@puma/') + 1));
    }
    
    // correct version number for IE4+ 
    else 
        if (this.isIE && this.versionMinor >= 4) {
            this.versionMinor = parseFloat(ua.substring(ua.indexOf('msie ') + 5));
        }
        
        // correct version number for Opera 
        else 
            if (this.isOpera) {
                if (ua.indexOf('opera/index.html') != -1) {
                    this.versionMinor = parseFloat(ua.substring(ua.indexOf('opera/index.html') + 6));
                }
                else {
                    this.versionMinor = parseFloat(ua.substring(ua.indexOf('opera ') + 6));
                }
            }
            
            // correct version number for Konqueror
            else 
                if (this.isKonqueror) {
                    this.versionMinor = parseFloat(ua.substring(ua.indexOf('konqueror/index.html') + 10));
                }
                
                // correct version number for iCab 
                else 
                    if (this.isIcab) {
                        if (ua.indexOf('icab/index.html') != -1) {
                            this.versionMinor = parseFloat(ua.substring(ua.indexOf('icab/index.html') + 6));
                        }
                        else {
                            this.versionMinor = parseFloat(ua.substring(ua.indexOf('icab ') + 6));
                        }
                    }
                    
                    // correct version number for WebTV
                    else 
                        if (this.isWebtv) {
                            this.versionMinor = parseFloat(ua.substring(ua.indexOf('webtv/index.html') + 6));
                        }
    
    this.versionMajor = parseInt(this.versionMinor);
    this.geckoVersion = ((this.isGecko) ? ua.substring((ua.lastIndexOf('gecko/index.html') + 6), (ua.lastIndexOf('gecko/index.html') + 14)) : -1);
    
    // platform
    this.isWin = (ua.indexOf('win') != -1);
    this.isWin32 = (this.isWin && (ua.indexOf('95') != -1 || ua.indexOf('98') != -1 || ua.indexOf('nt') != -1 || ua.indexOf('win32') != -1 || ua.indexOf('32bit') != -1));
    this.isMac = (ua.indexOf('mac') != -1);
    this.isUnix = (ua.indexOf('unix') != -1 || ua.indexOf('linux') != -1 || ua.indexOf('sunos') != -1 || ua.indexOf('bsd') != -1 || ua.indexOf('x11') != -1)
    
    // specific browser shortcuts
    this.isNS4x = (this.isNS && this.versionMajor == 4);
    this.isNS40x = (this.isNS4x && this.versionMinor < 4.5);
    this.isNS47x = (this.isNS4x && this.versionMinor >= 4.7);
    this.isNS4up = (this.isNS && this.versionMinor >= 4);
    this.isNS6x = (this.isNS && this.versionMajor == 6);
    this.isNS6up = (this.isNS && this.versionMajor >= 6);
    
    this.isIE4x = (this.isIE && this.versionMajor == 4);
    this.isIE4up = (this.isIE && this.versionMajor >= 4);
    this.isIE5x = (this.isIE && this.versionMajor == 5);
    this.isIE55 = (this.isIE && this.versionMinor == 5.5);
    this.isIE5up = (this.isIE && this.versionMajor >= 5);
    this.isIE6x = (this.isIE && this.versionMajor == 6);
    this.isIE6up = (this.isIE && this.versionMajor >= 6);
    
    this.isIE4xMac = (this.isIE4x && this.isMac);
}

/*
 ##########################################
 HOMEPAGE FUNCTIONS
 ##########################################
 */

function hackHomepage()
{
	// This function is used when the database is opened to the nsf level, and not directly to the hompage
	// It adds in the extra path information to all images and links on the page so that they hopefully work correctly.
	
	var loc = document.location.href;
	var dTitle = document.getElementById('docTitle');
	
	if (loc.indexOf('http://szpant:SenaMedal1965%40@puma/index/') == -1)
  	{
  		// There is no index in the href value, make sure that it's just the database level
  		if (dTitle)
  		{
  			if ((dTitle.value.toLowerCase() == "home") || (dTitle.value.toLowerCase() == "docbase3 - home"))
  			{
  				document.location.href = loc + "/index/home";
  			}
  		}
  	}
}