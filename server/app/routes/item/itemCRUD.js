const dbFac = global.rootRequire('app/infra/db/dbFactory');
const { check, validationResult } = require('express-validator/check');
const ItemDAO = global.rootRequire('app/infra/item/itemDAO')();
const BaseCRUD = global.rootRequire('app/routes/baseCRUD');

const util = require('util');

function ItemCRUD(app)
{
  app.get("/create", function(req, res){
    console.log("david");
    res.json({david:1});
  });

  app.post("/item/create", function(req, res){
    var itemDAO = new ItemDAO();
    itemDAO.save(req.body, function(err, result){
      if (err)
        res.json({errors:[{msg: err.message}]});
      else  
        res.json(result.rows);
    });
  });

  app.post("/item/change", function(req, res){
    var itemDAO = new ItemDAO();
    itemDAO.save(req.body, function(err, result){
      if (err)
        res.json({errors:[{msg: err.message}]});
      else  
        res.json(result.rows);
    });
  });

  app.post("/item/load", function(req, res){
    var itemDAO = new ItemDAO();
    itemDAO.load(req.query.id, function(error, result){
      base.responseQuery(req, res, error, result);
    })
  });
}

module.exports = ItemCRUD;
