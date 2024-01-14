import type { Database } from '@cloudflare/d1'
//
interface Env {
    DB: Database
}
const retObj = {ret: "NG", data: [], message: "Error, Internal Server Error"};

const Router = {
    /**
     * route
     * @param
     *
     * @return
     */ 
    test1: async function(c, DB)
    {
        try{    
            const result = await DB.prepare(`SELECT * FROM todos ORDER BY id DESC`).all();
    console.log(result.results);
            if(result.results.length < 1) {
              console.error("Error, results.length < 1");
              return [];
            }
            return result.results;
        } catch (e) {
            console.error(e);
            return Response.json(retObj);
        } 
    },
    getList: async function(c, DB)
    {
        try{    
          //const result = await c.env.DB.prepare(`SELECT * FROM todos ORDER BY id DESC`).all();
            const result = await DB.prepare(`SELECT * FROM todos ORDER BY id DESC`).all();
    console.log(result.results);
            if(result.results.length < 1) {
              console.error("Error, results.length < 1");
              return [];
            }
            return result.results;
        } catch (e) {
            console.error(e);
            return Response.json(retObj);
        } 
    },
    /**
     * 
     * @param
     *
     * @return
     */    
      create: async function(body, DB)
      {
          try{    
  console.log(body);
              if (body) {
                  const sql = `
                  INSERT INTO todos ( title, content)
                  VALUES('${body.title}', '${body.content}');
                  `;
                  //console.log(sql);
                  await DB.prepare(sql).run();
              }
              return {ret: "OK", data: body};
          } catch (e) {
              console.error(e);
              return [];
          } 
      },
      /**
       *
       * @param
       *
       * @return
       */    
      get: async function(body, c, DB)
      {
          //console.log("#get");
          try{    
              const sql = `SELECT * FROM todos WHERE id = ${body.id}`;            
              const result = await DB.prepare(sql).all();
              //console.log(result.results);
              if(result.results.length < 1) {
                  console.error("Error, results.length < 1");
                  return {};
              }
              return result.results[0];
          } catch (e) {
              console.error(e);
              return {};
          } 
      },  
    /**
     *
     * @param
     *
     * @return
     */ 
    delete: async function(body, DB): any
    {
    console.log(body);
        const retObj = {ret: "NG", data: [], message: ''}
        try{
          if (body) {
            const sql = `
            DELETE FROM todos WHERE id = ${body.id}
            `;
    console.log(sql);
            const resulte = await DB.prepare(sql).run();
    //console.log(resulte);
            if(resulte.success !== true) {
              console.error("Error, delete");
              throw new Error('Error , delete');
            }      
          }
          return {ret: "OK", data: body};
        } catch (e) {
          console.error(e);
          return Response.json(retObj);
        } 
      },  
  /**
  *
  * @param
  *
  * @return
  */ 
  update: async function (body, DB)
  {
  //    console.log("#test.update");
    const retObj = {ret: "NG", data: [], message: ''}
    try{
      if (body) {
        const sql = `
        UPDATE todos 
        SET title = '${body.title}', content='${body.content}'
        WHERE id = ${body.id}
        `;
console.log(sql);
        await DB.prepare(sql).run();
      }                
      return {ret: "OK", data: body};
    } catch (e) {
      console.error(e);
      return retObj;
    } 
  },
}
export default Router;