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
  
  var enquiry1 = keyword_extractor.extract(enquirytext_display,{
    language:'english',
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: false
  })
  var enquiry = enquiry1+' '+req.session.country
    
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

else if (enquiry.indexOf('assault') > -1) { 
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



// Enquiry submission confirmation page

router.get('/enquiry-confirmation',function (req, res){

var contact_name_display = req.query.contactname
var contact_email_display = req.query.contactemail
var enquirytext_display = req.query.enquirytext
var enquirydetail_display = req.query.enquirydetail
var country_display = req.query.country_display
var post_display = req.query.post_display
var reference_number = "ENQW00186"

var viewData = {
  'contact_name_display' : contact_name_display,
  'contact_email_display' : contact_email_display, 
  'enquirytext_display' : enquirytext_display, 
  'country_display' : country_display, 
  'enquirydetail_display' : enquirydetail_display,
  'post_display' : post_display,
  'reference_number' : reference_number
}


console.dir(req.query.enquirytext)
console.dir(enquirytext_display)

res.render('enquiry-confirmation', viewData)
});











// CRUFT BELOW :-) *****************************************************

// Passing country through url

router.get('/copy-forms-5', function (req, res){

var country_display = req.query.country
var post_display = req.query.post
var id = req.query.id
var viewData = {country_display:country_display, post_display:post_display, id:id}

console.dir (country_display)
console.dir (post_display)
console.dir (id)

res.render ('copy-forms-5', viewData)

});


// Pages

router.get('/copy-check-your-answers-page',function (req, res){

  var contact_name_display = req.query.contactname
  var contact_email_display = req.query.contactemail
  var enquirytext_display = req.query.enquirytext
  var country_display = req.query.Country
  var enquiry1 = keyword_extractor.extract(enquirytext_display,{
    language:'english',
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: false
  })
  var enquiry = enquiry1+'+'+country_display
  var passport = "But please note, British Embassies can no longer deal with enquiries regarding replacing or renewing a passport. Click here to get, renew or replace a passport."
  var passport_link = 'https://www.gov.uk/apply-renew-passport'
  var visa = "But please note, British Embassies can no longer deal with enquiries regarding visas. Please contact UK Visas and Immigration."
  var visa_link = 'https://www.gov.uk/check-uk-visa'
  var assault = "If you have been assaulted and require assistance from embassy staff, please call us directly."
  
    console.dir(enquirytext_display)
    console.dir(enquiry)

  request('https://www.gov.uk/api/search.json?count=3&q='+enquiry, function(error, response, body){

    var results = JSON.parse(body).results

    console.dir(results)

if (enquiry.indexOf('passport') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      passport: passport,
      passport_link: passport_link
    }

}

else if (enquiry.indexOf('visa') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      visa: visa,
      visa_link: visa_link
    }

}

else if (enquiry.indexOf('assault') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      assault: assault 
    }

}

else
    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry
    }

  // if (enquirytext_display.includes (passport) == true) {

  // console.dir(passport)

    res.render('copy-check-your-answers-page', viewData);

  });


});

// Route for Check your answers page 2

router.get('/copy-check-your-answers-page-2',function (req, res){

  var contact_name_display = req.query.contactname
  var contact_email_display = req.query.contactemail
  var enquirytext_display = req.query.enquirytext
  var country_display = req.query.Country
  var enquiry1 = keyword_extractor.extract(enquirytext_display,{
    language:'english',
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: false
  })
  var enquiry = enquiry1+'+'+country_display
  var passport = "But please note, British Embassies can no longer deal with enquiries regarding replacing or renewing a passport. Click here to get, renew or replace a passport."
  var passport_link = 'https://www.gov.uk/apply-renew-passport'
  var visa = "But please note, British Embassies can no longer deal with enquiries regarding visas. Please contact UK Visas and Immigration."
  var visa_link = 'https://www.gov.uk/check-uk-visa'
  var assault = "If you have been assaulted and require assistance from embassy staff, please call us directly."
  

    console.dir(enquirytext_display)
    console.dir(enquiry)

  request('https://www.gov.uk/api/search.json?count=3&q='+enquiry, function(error, response, body){

    var results = JSON.parse(body).results

    console.dir(results)

if (enquiry.indexOf('passport') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      passport: passport,
      passport_link: passport_link,
      interceptTitle: interceptTitle
    }

}

else if (enquiry.indexOf('visa') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      visa: visa,
      visa_link: visa_link
    }

}

else if (enquiry.indexOf('assault') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      assault: assault 
    }

}

else
    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry
    }

  // if (enquirytext_display.includes (passport) == true) {

  // console.dir(passport)

    res.render('copy-check-your-answers-page-2', viewData);

  });


});

// Route for Check your answers page 3

router.get('/copy-check-your-answers-page-3',function (req, res){

  var contact_name_display = req.query.contactname
  var contact_email_display = req.query.contactemail
  var enquirytext_display = req.query.enquirytext
  var country_display = req.query.Country
  var enquiry1 = keyword_extractor.extract(enquirytext_display,{
    language:'english',
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: false
  })
  var enquiry = enquiry1+'+'+country_display
  var passport = "But please note, British Embassies can no longer deal with enquiries regarding replacing or renewing a passport. Click here to get, renew or replace a passport."
  var passport_link = 'https://www.gov.uk/apply-renew-passport'
  var visa = "But please note, British Embassies can no longer deal with enquiries regarding visas. Please contact UK Visas and Immigration."
  var visa_link = 'https://www.gov.uk/check-uk-visa'
  var assault = "If you have been assaulted and require assistance from embassy staff, please call us directly."
  
    console.dir(enquirytext_display)
    console.dir(enquiry)

  request('https://www.gov.uk/api/search.json?count=3&q='+enquiry, function(error, response, body){

    var results = JSON.parse(body).results

    console.dir(results)

if (enquiry.indexOf('passport') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      passport: passport,
      passport_link: passport_link
    }

}

else if (enquiry.indexOf('visa') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      visa: visa,
      visa_link: visa_link
    }

}

else if (enquiry.indexOf('assault') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      assault: assault 
    }

}

else
    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry
    }

  // if (enquirytext_display.includes (passport) == true) {

  // console.dir(passport)

    res.render('copy-check-your-answers-page-3', viewData);

  });


});


// Route for Check your answers page 5

router.get('/copy-check-your-answers-page-5',function (req, res){

  var contact_name_display = req.query.contactname
  var contact_email_display = req.query.contactemail
  var enquirytext_display = req.query.enquirytext
  var country_display = req.query.country_display
  var post_display = req.query.post_display
  var reference_number = req.query.ref
  var enquiry1 = keyword_extractor.extract(enquirytext_display,{
    language:'english',
    remove_digits: true,
    return_changed_case:true,
    remove_duplicates: false
  })
  var enquiry = enquiry1+' '+country_display
  var passport = "But please note, British Embassies can no longer deal with enquiries regarding replacing or renewing a passport. Click here to get, renew or replace a passport."
  var passport_link = 'https://www.gov.uk/apply-renew-passport'
  var visa = "But please note, British Embassies can no longer deal with enquiries regarding visas. Please contact UK Visas and Immigration."
  var visa_link = 'https://www.gov.uk/check-uk-visa'
  var assault = "If you have been assaulted and require assistance from embassy staff, please call us directly."
  
  var date = new Date()

    console.dir(enquirytext_display)
    console.dir(enquiry)
    console.dir(date)

  request('https://www.gov.uk/api/search.json?count=3&q='+enquiry, function(error, response, body){

    var results = JSON.parse(body).results

    console.dir(results)

if (enquiry.indexOf('passport') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      passport: passport,
      passport_link: passport_link
    }

}

else if (enquiry.indexOf('visa') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      visa: visa,
      visa_link: visa_link
    }

}

else if (enquiry.indexOf('assault') > -1) { 

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      enquiry: enquiry,
      assault: assault 
    }

}

else
    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display,
      post_display: post_display,
      enquiry: enquiry,
      reference_number: reference_number
    }

  // if (enquirytext_display.includes (passport) == true) {

  // console.dir(passport)

    res.render('copy-check-your-answers-page-5', viewData);

  });


});

// Route for confirmation page

router.get('/confirmation-page',function (req, res){

// get the answer from the query string (?fullnamename=john) and set it as a variable so you can use it  

var contact_email_display = req.query.contactemail
var enquirytext_display = req.query.enquirytext
var country_display = req.query.country

res.render('confirmation-page', {'contact_email_display' : contact_email_display, 'enquirytext_display' : enquirytext_display, "country_display" : country_display }) 

});

// Route for confirmation page 2

router.get('/confirmation-page-2',function (req, res){

// get the answer from the query string (?fullnamename=john) and set it as a variable so you can use it  

var contact_email_display = req.query.contactemail
var enquirytext_display = req.query.enquirytext
var country_display = req.query.country

console.dir(req.query.enquirytext)
console.dir(enquirytext_display)

res.render('confirmation-page-2', {'contact_email_display' : contact_email_display, 'enquirytext_display' : enquirytext_display, "country_display" : country_display }) 

});

// Route for confirmation page 3

router.get('/confirmation-page-3',function (req, res){

// get the answer from the query string (?fullnamename=john) and set it as a variable so you can use it  

var contact_email_display = req.query.contactemail
var enquirytext_display = req.query.enquirytext
var country_display = req.query.country

console.dir(req.query.enquirytext)
console.dir(enquirytext_display)

res.render('confirmation-page-3', {'contact_email_display' : contact_email_display, 'enquirytext_display' : enquirytext_display, "country_display" : country_display }) 

});

router.get('/confirmation-page-5',function (req, res){

// get the answer from the query string (?fullnamename=john) and set it as a variable so you can use it  

var contact_name_display = req.query.contactname
var contact_email_display = req.query.contactemail
var enquirytext_display = req.query.enquirytext
var enquirydetail_display = req.query.enquirydetail
var country_display = req.query.country_display
var post_display = req.query.post_display
var reference_number = "ENQ-0001-001"

var viewData = {
  'contact_name_display' : contact_name_display,
  'contact_email_display' : contact_email_display, 
  'enquirytext_display' : enquirytext_display, 
  'country_display' : country_display, 
  'enquirydetail_display' : enquirydetail_display,
  'post_display' : post_display,
  'reference_number' : reference_number
}


console.dir(req.query.enquirytext)
console.dir(enquirytext_display)

res.render('confirmation-page-5', viewData)
});

// Passing data into a page, dynamic version
// this is going from fullname (input name in form_post_data) -> fullname_form (captured as variable here) -> fullname_display (the variable in form_show_data html source)
// router.get('/copy-check-your-answers-page',function (req, res){

// get the answer from the query string (?fullnamename=john) and set it as a variable so you can use it  

// var contact_name_display = req.query.contactname
// var contact_email_display = req.query.contactemail
// var enquirytext_display = req.query.enquirytext
// var country_display = req.query.Country

// now send that variable to the page which has variable tags for fullname_display etc

// res.render('copy-check-your-answers-page', {'country_display' : country_display,'contact_name_display' : contact_name_display, 'contact_email_display' : contact_email_display, 'enquirytext_display' : enquirytext_display }) 

// })

router.get('/suggested-articles-page',function (req, res){

// get the answer from the query string (?fullnamename=john) and set it as a variable so you can use it  


  var contact_name_display = req.query.contactname
  var contact_email_display = req.query.contactemail
  var enquirytext_display = req.query.enquirytext
  var country_display = req.query.Country

  request('https://www.gov.uk/api/search.json?count=5&q='+enquirytext_display, function(error, response, body){

    var results = JSON.parse(body).results

    console.dir(enquirytext_display)
    console.dir(results)

    var viewData = {
      results: results,
      contact_name_display: contact_name_display,
      enquirytext_display: enquirytext_display,
      contact_email_display: contact_email_display,
      country_display: country_display
    }

    res.render('suggested-articles-page', viewData);

  });


});

router.get('/reply-page',function (req, res){

// get the answer from the query string (?fullnamename=john) and set it as a variable so you can use it  

var title_display = req.query.title
var link_display = req.query.link
var enquirytext_display = req.query.enquirytext
var country_display = req.query.Country

res.render('reply-page', {'title_display': title_display, 'link_display' : link_display})

  

});

router.get('/reply-page2',function (req, res){

// get the answer from the query string (?fullnamename=john) and set it as a variable so you can use it  

var title_display = req.query.title
var link_display = req.query.link
var replytext_display = req.query.replytext
var country_display = req.query.Country

res.render('reply-page2', {'replytext_display': replytext_display, 'link_display' : link_display})

  

});


module.exports = router;
