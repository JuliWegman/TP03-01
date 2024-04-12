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


  }
}

export class ProvinciaService3 {
  patchProvincia(id,name,full_name,latitude,longitude,display_orderzzzx ) {
    var query = `update provinces SET`;
    //arreglalo huevo
    //ida base datos

    const eventsInBD = [
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
      collection: eventsInBD,
      pageSize: pageSize,
      page: reqPage,
      nextPage: reqPage + 1,
    };
  }
}
