var express = require('express');
var router = express.Router();
var request = require('request');
var keyword_extractor = require('keyword-extractor');


// Session open and check
var session = require('express-session');

// Route index page
 router.get('/', function (req, res) {
 res.redirect('index')  
 });


//THE BIG RESET FUNCTION!
router.get('/index', function (req, res) {
  //resetAll();
  req.session.destroy();
  console.log("reset");
  res.render('index');

});



// Start, passing country through url

router.get('/enquiry-start', function (req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }

var viewData = {
  'country_display' : req.session.country, 
  'post_display' : req.session.post
}

console.dir (req.session.country)
console.dir (req.session.post)

res.render ('enquiry-start', viewData)

});


// Route for enquiry results page

router.get('/enquiry-results', function (req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


  var enquirytext_display = req.session.enquirytext

// See https://www.npmjs.com/package/keyword-extractor for this module and its options
  var enquirycleaned = keyword_extractor.extract(enquirytext_display,{
    language:'english',
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: false,
    return_chained_words:  true
  })

// Don't add anything in if the user has edited the query
if (req.session.searchQueryEdited) { 
var enquiry = enquirycleaned
}

// Add the country in by default if this is a first search
else { 
  var enquiry = enquirycleaned+' '+req.session.country
}


   
  var date = new Date()

  request('https://www.gov.uk/api/search.json?count=5&q='+enquiry, function(error, response, body){

  var results = JSON.parse(body).results

  console.dir(results)



// Intercept section: pull out keywords and set intercept data

if (enquiry.indexOf('passport') > -1) { 
    var intercept = "Yes";
    var interceptTitle = "Help with passports";
    var interceptDescription = "British Embassies can no longer deal with enquiries about renewing a passport.";
    var interceptLink1Text = "Apply for a standard passport online.";
    var interceptLink1 = 'https://www.gov.uk/apply-renew-passport';
    var interceptLinkBridge = "If you need to travel urgently "; 
    var interceptLink2Text = "apply for an emergency travel document.";
    var interceptLink2 = 'https://www.gov.uk/emergency-travel-document';
}

else if (enquiry.indexOf('visa') > -1) { 
    var intercept = "Yes";
    var interceptTitle = "Help with visas";
    var interceptDescription = "British Embassies can no longer deal with enquiries regarding visas.";
    var interceptLink1Text = "Contact UK Visas and Immigration for help.";
    var interceptLink1 = 'https://www.gov.uk/check-uk-visa';
}

else if ((enquiry.indexOf('assault') > -1) || (enquiry.indexOf('urgent') > -1)  || (enquiry.indexOf('emergency') > -1)) { 
    var intercept = "Yes";
    var interceptTitle = "Get help urgently";
    var interceptDescription = "If you need immediate help call the embassy on 012345 678901. It's best to call us if you need help because of an assault, accident or arrest.";
}

// end intercept section

    var viewData = {

      // these have been set as variables
      results: results,
      enquiry: enquiry,
      intercept: intercept,
      interceptTitle: interceptTitle,
      interceptDescription: interceptDescription,
      interceptLink1Text: interceptLink1Text,
      interceptLink1: interceptLink1,
      interceptLinkBridge: interceptLinkBridge,
      interceptLink2Text: interceptLink2Text,
      interceptLink2: interceptLink2,

      // these have not been set as variables, just grabbing from session, so different syntax with single quotes
      'contact_name_display': req.session.contact_name,
      'enquirytext_display': req.session.enquirytext,
      'contact_email_display': req.session.contact_email,
      'country_display': req.session.country,
      'post_display': req.session.post,
      'resultsdescriptions' : req.session.resultsdescriptions,
      'interceptStyle' : req.session.interceptStyle,
      'formOnly' : req.session.formOnly
    }


    res.render('enquiry-results', viewData );

  });


});


// Travel advice page

router.get('/travel-advice', function (req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }

var viewData = {
  'country_display' : req.session.country, 
  'post_display' : req.session.post,
  'enquirytext_display' : req.session.enquirytext
}


res.render ('travel-advice', viewData)

});



// Enquiry submission confirmation page


router.get('/enquiry-confirmation', function (req, res, next){
  for (var propName in req.query) {
    if (req.query.hasOwnProperty(propName)) {
      req.session[propName] = req.query[propName];
    }
  }


var reference_number = "ENQW00186"

var viewData = {
  reference_number : reference_number,
  'contact_name_display' : req.session.contactname,
  'contact_email_display' : req.session.contactemail, 
  'enquirytext_display' : req.session.enquirytext, 
  'enquirydetail_display' : req.session.enquirydetail,
  'country_display' : req.session.country, 
  'post_display' : req.session.post
}


res.render('enquiry-confirmation', viewData)
});







module.exports = router;
