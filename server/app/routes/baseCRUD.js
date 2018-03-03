
class BaseCRUD
{
  responseQuery(httpReq, httpRes, err, result){
    if (result && result.rows)
      httpRes.json(result.rows);
    else
      httpRes.json({errors : err, result:result});
  }
}


module.exports = new BaseCRUD;