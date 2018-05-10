import {Component, OnInit} from '@angular/core';
import {NavParams, Platform, ViewController} from 'ionic-angular';
import {IProjects} from "../../sync-interfaces/projects";
import IProject = IProjects.IProject;
import Account = IProjects.Account;
import {IVirtualMachines} from "../../sync-interfaces/virtual-machines";
import IVirtualMachine = IVirtualMachines.IVirtualMachine;
import {VmsProvider} from "../../providers/vms/vms";
import {ProjectsProvider} from "../../providers/projects/projects";



@Component({
  selector: 'page-modal-projects',
  templateUrl: 'modal-projects.html',
})
export class ModalProjectsPage implements OnInit{
    project: IProject;
    accounts: Account[] =[];
    vm: IVirtualMachine;
    vms:IVirtualMachine[];
    vmSelect: string;
    isNewProject: boolean = false;

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        private vmService: VmsProvider,
        private projectService: ProjectsProvider
    ) {
        this.project = this.params.get('selectedProject');

        this.isNewProject = this.params.get('newProject');
        if (this.isNewProject) {
            this.accounts = [];
        } else {
            this.accounts = this.project.accounts;
        }

    }

    ngOnInit() {
        this.vmService.getVms().subscribe(vms => {
            this.vms = vms;

            vms.forEach((vm:IVirtualMachine) => {
                    if (vm.id == this.project.virtual_machine_id) {
                        this.vmSelect = vm.id;
                    }
                }
            );


        });

    }

    save() {


        if (this.isNewProject) {
            this.project.accounts = this.accounts;

           this.projectService.addProject(this.project).subscribe();
        } else {
            this.projectService.updateProject(this.project).subscribe();
        }

        this.viewCtrl.dismiss();
    }

    close() {
        this.viewCtrl.dismiss();
    }

    addAccount() {

        this.accounts.push({login: " ", password: " "});
    }

    deleteAcc(acc:Account) {
        let idx = this.accounts.indexOf(acc);
        this.accounts.splice(idx, 1);
        this.project.accounts = this.accounts;
    }

    onChangeVm() {
        //this.selectedProject.virtual_machine_id = this.vmSelect.id;

        this.project.virtual_machine_id = this.vmSelect
    }

}
