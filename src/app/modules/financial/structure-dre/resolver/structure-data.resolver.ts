import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {StructureDataService} from "../../service/structure.data.service";

export const structureDataResolver: ResolveFn<boolean> = (route) => {

    const structureDataService = inject(StructureDataService);

  const {queryParams, params} = route;
  const {id} = params;


  return structureDataService.loadAllData(id);
};
