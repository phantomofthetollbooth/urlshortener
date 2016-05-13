module.exports = function(app, db) {
var validUrl = require('valid-url');
  app.get('/:url',retreive);

  app.get('/add/:url*', create);

  function retreive(req, res) {
    var url = process.env.BASE_URL + req.params.url;
      retURL(url, db, res);
    }
  

  function create(req, res) {
    console.log("this is the "+req.url);
	var url = req.url.slice(5);
	
    var urlObj = {};
    if (validUrl.isUri(url)) {
      urlObj = {
        "original_url": url,
        "short_url": process.env.BASE_URL + suffix()
      };
      res.send(urlObj);
      save(urlObj, db);
    } else {
      urlObj = {
        "error": "The url you have entered is not valid."
      };
      res.send(urlObj);
    }
  }

  function suffix() {

    var num = Math.floor(1000+Math.random() * 1001);
    return num.toString();
  }

  function save(obj, db) {
    // Save object into db.
    var links = db.collection('links');
    links.save(obj, function(err, result) {
      if (err) throw err;
      console.log('Saved ' + result);
    });
  }

  function retURL(link, db, res) {
    var links = db.collection('links');
    links.findOne({
      "short_url": link
    }, function(err, result) {
      if (err) throw err;
      if (result) {
        console.log('Found ' + result);
        console.log('Redirecting to: ' + result.original_url);
        res.redirect(result.original_url);
      } else {
        res.send({
        "error": "The url entered is not in the database."
      });
      }
    });
  }

 

};