// inicializa indexDb
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!window.indexedDB) {window.alert("Lo siento pero su Teléfono no soporta el guardado de Datos");}

    if (navigator.storage && navigator.storage.persist)
        navigator.storage.persist()
        .then(function(persistent){
            if (persistent){
                console.log("Storage will not be cleared except by explicit user action");
            }else{
              console.log("Storage may be cleared by the UA under storage pressure");
          }});
              
var DbConnection;
window.onload = function () {
    console.log('inicializando db local...')
    initiateDb();
};
//nombre de la base de datos
const DbName = "mercadosefectivosv2.1";

function initiateDb() {
    
    JsStore.isDbExist(DbName, function (isExist) {
        if (isExist) {
            DbConnection = new JsStore.Instance(DbName);
            console.log('se ha inicializado la db')
        } else {

            var tbl = getTbl();
            DbConnection = new JsStore.Instance().createDb(tbl);
            console.log('db local instalada exitosamente...')
        }
    });
};

// define las tablas de la base de datos
function getTbl() {
    //TABLA DATOS USUARIO
    var tblUsuario = {
        Name: "usuario",
        Columns: [
            { Name: "Id", PrimaryKey: true, AutoIncrement: true},
            { Name: "codsucursal", DataType: "string" },
            { Name: "coddoc", DataType: "string" },
            { Name: "codusuario", DataType: "string" },
            { Name: "nomusuario", DataType: "string" }
        ]
    };

    //TABLA VENTAS TEMPORAL
    var TblTemp = {
        Name: "tempVentas",
        Columns: [{ Name: "Id", PrimaryKey: true, AutoIncrement: true},
            { Name: "empnit", DataType: "string" },
            { Name: "coddoc", DataType: "string" },
            { Name: "correlativo" },
            { Name: "codprod", NotNull: true, DataType: "string" },
            { Name: "desprod", NotNull: true, DataType: "string" },
            { Name: "codmedida", NotNull: true, DataType: "string"},
            { Name: "cantidad", NotNull: true, DataType: "number" },
            { Name: "equivale",NotNull: true, DataType: "number"  },
            { Name: "totalunidades", NotNull: true, DataType: "number"},
            { Name: "precio", NotNull: true },
            { Name: "subtotal",  NotNull: true, DataType: "number" },
            { Name: "costo", NotNull: true },
            { Name: "totalcosto", NotNull: true }
        ]
    }
        //TABLA CENSO
    var TblCenso = {
            Name: "censo",
            Columns: [
                {Name: "Id",PrimaryKey: true,AutoIncrement: true},
                { Name: "empnit"},
                { Name: "codven"},
                { Name: "codruta"},
                { Name: "negocio", DataType: "string" },
                { Name: "nomcliente"},
                { Name: "dircliente"},
                { Name: "codmun" },
                { Name: "coddep" },
                { Name: "telefono"},
                { Name: "latitud"},
                { Name: "longitud"},
                { Name: "obs", DataType: "string" },
                { Name: "concre", DataType: "string" },
                { Name: "giro", DataType: "string" },
                { Name: "token", DataType: "string" },
           ]
    }

    var DataBase = {
        Name: DbName,
        Tables: [tblUsuario,TblTemp,TblCenso]
    }

    return DataBase;
};



