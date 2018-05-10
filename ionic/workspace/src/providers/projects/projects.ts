import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BaseApi} from "../../shared/base-api";
import {Observable} from "rxjs/Observable";
import {IProjects} from "../../sync-interfaces/projects";
import IProject = IProjects.IProject;

/*
  Generated class for the ProjectsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectsProvider extends BaseApi{
    body: string = "";

    constructor (public http: HttpClient) {
        super(http);
    }

    getProjects(): Observable<IProject[]> {
        return this.post('projects/get', this.body);
    }

    getProjectById(id:number): Observable<IProject> {
        return this.post(`projects/${id}`);
    }

    addProject(project:IProject):Observable<IProject> {
        return this.post('projects/create', project);
    }

    updateProject(project: IProject): Observable<IProject> {
        return this.post(`projects/update`, project);
    }

    delProject(project: IProject): Observable<IProject> {
        return this.post(`projects/delete`, project);
    }

}
