import { query } from "express";

export class ProvinciaService1 {
  getProvincias(pageSize, reqPage) {
    var query = `select * from Provincias limit ${pageSize} offset ${reqPage}`;
    //arreglalo huevo
    //ida base datos

    const provsInBD = [
      {
        id: 1,
        name: "tierra fuego",
        full_name: "Tierra del fuego",
        latitude: "21446",
        longitude: "21446",
        display_order:3
      },
      { id: 2,
        name: "tierra fuego",
        full_name: "Tierra del fuego",
        latitude: "21446",
        longitude: "21446",
        display_order:3}
    ];

    return {
      collection: provsInBD,
      pageSize: pageSize,
      page: reqPage,
      nextPage: reqPage + 1,
    };
  }
}
export class ProvinciaService2 {
  InsertProvincia(name, full_name, latitude, longitude, display_order) {
    const query=`Insert into users(name,full_name,latitude,longitude,display_order) values ("${name}","${full_name}",${latitude},${longitude},${display_order})`;
    
    //query.execute();

    return "Agregado con éxito";

  }
}

export class ProvinciaService3 {
  patchProvincia(id,name,full_name,latitude,longitude,display_order ) {
    var query = `update provinces SET`;
    //arreglalo huevo
    //ida base datos
    if (name != null) {
      query += ` name=${name},`;
    }
    if (full_name != null) {
      query += ` full_Name=${full_name},`;
    }
    if (latitude != null) {
      query += ` latitude=${latitude},`;
    }
    if (longitude != null) {
      query += ` longitude=${longitude},`;
    }
    if (display_order != null) {
      query += ` display_order=${display_order},`;
    }
    if (query.endsWith(",")) {
      query = query.slice(0, -1);
    }
    
    if (query.endsWith("SET")) {
      return "no mandaste ningun valor para updatear";
    }else{
      query+=` where id=${id}`;
          //query.execute();
    return "Updateado correctamente!"
      
    ;
  }
 }
}

export class ProvinciaService4 {
  DeleteProvincia(id) {
    const query=`Delete from provinces Where id=${id}`;
    
    //query.execute();

    return "Eliminado con éxito";
  }
}
