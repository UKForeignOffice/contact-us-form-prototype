var express = require('express');
var router = express.Router();
var request = require('request');
var keyword_extractor = require('keyword-extractor');

// Routing home page

router.get('/', function (req, res) {
  
res.redirect('copy-forms-4')  

});

// Branching

router.get('/copy-forms',function (req, res){

res.redirect('copy-forms-4');

});


// Passing country through url

router.get('/copy-forms-5', function (req, res){

var country_display = req.query.country
var id = req.query.id
var viewData = {country_display:country_display, id:id}

console.dir (country_display)
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
