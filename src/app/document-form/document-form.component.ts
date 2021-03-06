import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {

  submitted: boolean;
  mainForm: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.mainForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
    console.log(this.mainForm);
  }

  onSubmit(form: FormGroup): void {
    this.submitted = true;
    console.log(form.value);
    let perc = form.value.items.reduce((sum, item) => {
      return sum + item.percentage;
    }, 0)
    let majority = form.value.items.filter((item) => {
      return item.percentage > 50;
    }).length > 0
    console.log(perc);
    console.log(majority);
    // console.log(this.mainForm.controls.items.controls[0].controls.fileRg.hasError('required'));
    console.log('Valid?', form.valid);
  }

  createItem(): FormGroup {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.max(100)]],
      fileNameRg: ['', Validators.required],
      fileRg: [''],
      fileNameCpf: ['',  Validators.required],
      fileCpf: ['']
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onFileChangeRg(index: number, event: { target: { files: string | any[]; }; }) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.items.controls[index].get('fileNameRg').setValue(file.name);
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.items.controls[index].get('fileRg').setValue(reader.result);
      };
    }
  }

  onFileChangeCpf(index: number, event: { target: { files: string | any[]; }; }) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.items.controls[index].get('fileNameCpf').setValue(file.name);
      reader.readAsDataURL(file);

      reader.onload = () => {        
        this.items.controls[index].get('fileCpf').setValue(reader.result);
      };
    }
  }

  get items() {
    return this.mainForm.get('items') as FormArray;
  }
}
