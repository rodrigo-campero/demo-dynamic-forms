import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-year-form',
  templateUrl: './year-form.component.html',
  styleUrls: ['./year-form.component.scss']
})
export class YearFormComponent implements OnInit {

  submitted: boolean;
  mainForm: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    console.log(this.getLastMonths(3));
    this.mainForm = this.fb.group({
      items: this.fb.array([])
    });
    var months = this.getLastMonths(3);
    for (let index = 0; index < months.length; index++) {
      const element = months[index];
      this.addItem(element.year, element.month, '');

    }
    console.log(this.mainForm);
  }

  createItem(year: string, month: string, value: string): FormGroup {
    return this.fb.group({
      year: [year, Validators.required],
      month: [month, Validators.required],
      value: [value, Validators.required]
    });
  }

  addItem(year: string, month: string, value: string): void {
    this.items.push(this.createItem(year, month, value));
  }

  get items() {
    return this.mainForm.get('items') as FormArray;
  }

  getLastMonths(numberOfMonths: number) {

    var monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    var today = new Date();
    var lastMonths = [];
    for (let i = 0; i < numberOfMonths; i++) {
      lastMonths.push({ year: today.getFullYear(), month: monthNames[today.getMonth()] });
      console.log(today.getMonth());
      today.setMonth(today.getMonth() - 1);
    }
    return lastMonths;
  }
}
