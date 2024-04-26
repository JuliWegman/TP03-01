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
        display_order: 3,
      },
      {
        id: 2,
        name: "tierra fuego",
        full_name: "Tierra del fuego",
        latitude: "21446",
        longitude: "21446",
        display_order: 3,
      },
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
  InsertProvincia(Provincia) {
    const query = `Insert into provinces(name,full_name,latitude,longitude,display_order) values ("${Provincia.name}","${Provincia.full_name}",${Provincia.latitude},${Provincia.longitude},${Provincia.display_order})`;

    //query.execute();

    return "Agregado con éxito";
  }
}

export class ProvinciaService3 {
  patchProvincia(Provincia) {
    var query = `update provinces SET`;
    //arreglalo huevo
    //ida base datos
    if (Provincia.name != null) {
      query += ` name=${Provincia.name},`;
    }
    if (Provincia.full_name != null) {
      query += ` full_Name=${Provincia.full_name},`;
    }
    if (Provincia.latitude != null) {
      query += ` latitude=${Provincia.latitude},`;
    }
    if (Provincia.longitude != null) {
      query += ` longitude=${Provincia.longitude},`;
    }
    if (Provincia.display_order != null) {
      query += ` display_order=${Provincia.display_order},`;
    }
    if (query.endsWith(",")) {
      query = query.slice(0, -1);
    }

    if (query.endsWith("SET")) {
      return "no mandaste ningun valor para updatear";
    } else {
      query += ` where id=${Provincia.id}`;
      //query.execute();
      return "Updateado correctamente!";
    }
  }
}

export class ProvinciaService4 {
  DeleteProvincia(id) {
    const query = `Delete from provinces Where id=${id}`;

    //query.execute();

    return "Eliminado con éxito";
  }
}
