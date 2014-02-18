var express = require('express');
var app = express();
var mongoose = require('mongoose');

// connect to mongoDB database on modulus.io
mongoose.connect('mongodb://localhost/todolistr');

app.configure(function() {
  app.use(express.static(__dirname + '/public'));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
});

var Task = mongoose.model('Task', {
    text : String
  });

app.listen(8080);
console.log("App listening on port 8080");

// --- Routes -----------------------------------------------------------------

  // GET all tasks
  app.get('/api/tasks', function(req, res) {
    Task.find(function(err, tasks) {
      if (err) { res.send(err); }
      res.json(tasks);
    });
  });

  // POST new task
  app.post('/api/tasks', function(req, res) {
    Task.create({
      text : req.body.text,
      done : false
    }, function(err, todo) {
      if (err) { res.send(err); }
      Task.find(function(err, tasks) {
        if (err) { res.send(err); }
        res.json(tasks);
      });
    });

  });

  // DELETE task
  app.delete('/api/tasks/:id', function(req, res) {
    Task.remove({
      _id : req.params.id
    }, function(err, todo) {
      if (err) { res.send(err); }
      Task.find(function(err, tasks) {
        if (err) { res.send(err) }
        res.json(tasks);
      });
    });
  });
