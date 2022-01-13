import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-register-reports',
  templateUrl: './register-reports.component.html',
  styleUrls: ['./register-reports.component.css']
})
export class RegisterReportsComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private service: ReportsService) { }

  ngOnInit(): void {
    this.title.setTitle("Relatório de Registros");
    this.configForm()
  }

  configForm() {
    this.form = this.formBuilder.group({
      due: this.formBuilder.group(
        {
          dueDateFrom: [undefined],
          dueDateUntil: [undefined],
        },
        {
          validators: this.isValidDateRange
        }
      ),
    });
  }

  isValidDateRange(group: AbstractControl) {
    const dueDateFrom = group.get('dueDateFrom')?.value;
    const dueDateUntil = group.get('dueDateUntil')?.value;

    const dueDateFromAsDate = dueDateFrom ? new Date(dueDateFrom) : undefined
    const dueDateUntilAsDate = dueDateUntil ? new Date(dueDateUntil) : undefined

    const errorObject = { invalidRange: true }
    if (!dueDateFromAsDate || !dueDateUntilAsDate)
      return errorObject

    const isValid = (dueDateFromAsDate <= dueDateUntilAsDate ? undefined : errorObject)
    return isValid
  }

  async fetchReport() {
    const res = await this.service.fetchReport(this.form.value);
    const url = window.URL.createObjectURL(res);
    window.open(url);
  }
}
