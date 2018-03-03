class BaseDAO{

  constructor(){
  }

  sendQueries(conn, queries=[], callback){

    conn.connect();
    conn.query('BEGIN', (err, res)=>{

      var i = -1;
      while(++i < queries.length)
      {
        const isLast = (i == queries.length-1);
        const command = queries[i];
        if (isLast)
          this.sendQuery(conn, command, callback);
        else
          this.sendQuery(conn, command);
      }
    });
  }

  sendQuery(conn, command, callback=null){
    
    conn.query(command.command, command.params,
      (err, res, command) => {
        if (callback)
        {
          if (err)
            conn.query('ROLLBACK');
          else
            conn.query('COMMIT');
          callback(err, res);        
        }
    });
  }
}

module.exports = function() {
  return BaseDAO;
};