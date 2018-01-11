import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'wfm-histoty-chart',
  templateUrl: './histoty-chart.component.html',
  styleUrls: ['./histoty-chart.component.scss']
})
export class HistotyChartComponent {
  @Input() data;


  constructor() { }

  ngOnInit() {
  }

}
