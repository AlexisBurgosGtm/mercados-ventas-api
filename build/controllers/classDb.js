const DbName = "mercadosefectivosoffline";

var tblProductos = {
    name: 'productos',
    columns: {
        ID:{ primaryKey: true, autoIncrement: true },
        CODSUCURSAL:{dataType: "string"},
        CODPROD:{dataType: "string"},
        DESPROD:{dataType: "string"},
        CODMEDIDA:{dataType: "string"},
        EQUIVALE:{dataType: "number"},
        COSTO:{dataType: "number"},
        PRECIO:{dataType: "number"},
        PRECIOA:{dataType: "number"},
        PRECIOB:{dataType: "number"},
        PRECIOC:{dataType: "number"},
        DESMARCA:{dataType: "string"},
        EXENTO:{dataType: "number"},
        EXISTENCIA:{dataType: "number"}
    }
};

var tblTempventas = {
    name: 'tempventa',
    columns: {
        ID:{ primaryKey: true, autoIncrement: true },
        CODSUCURSAL:{dataType: "string"},
        EMPNIT:{dataType: "string"},
        CODDOC:{dataType: "string"},
        CODPROD:{dataType: "string"},
        DESPROD:{dataType: "string"},
        CODMEDIDA:{dataType: "string"},
        EQUIVALE:{dataType: "number"},
        CANTIDAD:{dataType: "number"},
        TOTALUNIDADES:{dataType: "number"},
        COSTO:{dataType: "number"},
        PRECIO:{dataType: "number"},
        TOTALCOSTO:{dataType: "number"},
        TOTALPRECIO:{dataType: "number"},       
        EXENTO:{dataType: "number"},
        USUARIO:{dataType: "string"},
        TIPOPRECIO:{dataType: "string"}
    }
}

var database = {
    name: DbName,
    tables: [tblProductos,tblTempventas]
};
 
// initiate jsstore connection
var connection = new JsStore.Connection();

async function connectDb(){
   
        var isDbCreated = await connection.initDb(database);
        // isDbCreated will be true when database will be initiated for first time
        if(isDbCreated){
            //alert('Db Created & connection is opened');
           
        }
        else{
            //alert('Connection is opened');
          
        }
    
}
//inicia la conexión a la db
connectDb();