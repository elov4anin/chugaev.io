import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {IProjects} from "../../sync-interfaces/projects";
import IProject = IProjects.IProject;
import {ProjectsProvider} from "../../providers/projects/projects";
import {ModalProjectsPage} from "../modal-projects/modal-projects";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
    project: IProject;
    projects: IProject[];

  constructor(
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      private projectService: ProjectsProvider) {

  }

  ngOnInit() {
      this.projectService.getProjects().subscribe((projects) => {
          this.projects = projects;
      });
  }
  add() {
      let modal = this.modalCtrl.create(ModalProjectsPage , {selectedProject: {}, newProject: true} );
      modal.present();
  }

    presentModal(selectedProject: IProject) {
        let modal = this.modalCtrl.create(ModalProjectsPage , {selectedProject: selectedProject, newProject: false});
        modal.present();
    }

}