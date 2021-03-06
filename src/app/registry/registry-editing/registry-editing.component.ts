import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/category/category.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Category } from 'src/app/core/model/category';
import { PersonSummary } from 'src/app/core/model/person';
import { RegistryDTOInsert } from 'src/app/core/model/registry';
import { PersonService } from 'src/app/person/person.service';
import { RegistryService } from '../registry.service';

@Component({
  selector: 'app-registry-editing',
  templateUrl: './registry-editing.component.html',
  styleUrls: ['./registry-editing.component.css']
})
export class RegistryEditingComponent implements OnInit {

  saving = false;
  uploading = false;
  registerFiles: any = []
  categories: any[] = [];
  persons: any[] = [];
  types = [{ name: 'RECEITA', code: 'INCOME' }, { name: 'DESPESA', code: 'EXPENSE' }];

  registry: RegistryDTOInsert = {
    description: "",
    type: 'EXPENSE',
    value: 0,
    category: { code: '' },
    person: { code: '' }
  };

  editingCode: string | undefined;

  constructor(
    private categoryService: CategoryService,
    private personService: PersonService,
    private messageService: MessageService,
    private service: RegistryService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title) { }

  ngOnInit(): void {
    this.fetchCategories()
    this.fetchPersons()

    this.editingCode = this.route.snapshot.params['code'];
    if (this.editingCode) {
      this.fetchRegister(this.editingCode)
    } else {
      this.updateTitle()
    }
  }

  private setDefaultRegistry(): void {
    this.registry = {
      description: "",
      type: 'EXPENSE',
      value: 0,
      category: { code: '' },
      person: { code: '' }
    }
  }

  async fetchRegister(code: string) {
    const res = await this.service.fetchByCode(code);

    if (res.userDetail) {
      this.errorHandler.handle(res.userDetail)
    } else {
      this.updateLocalRegistryWith(res)
      this.updateTitle()
    }
  }

  async fetchCategories() {
    try {
      const res = await this.categoryService.fetchAll();
      this.categories = res.map((cat: Category) => ({ label: cat.name, value: cat.code }))
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  async fetchPersons() {
    try {
      const res = await this.personService.fetchAll();
      this.persons = res.map((p: PersonSummary) => ({ label: p.name, value: p.code }))
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  get temporaryFileUploadURL(): string {
    return this.service.temporaryFileUploadURL;
  }

  get uploadHeaders() {
    return this.service.uploadHeaders;
  }

  onBeforeUpload() {
    this.uploading = true
  }

  onUploadError(event: any) {
    this.errorHandler.handle("N??o foi poss??vel fazer o upload do arquivo")
    this.uploading = false
  }

  onUpload(event: any) {
    const temporaryFile = event.originalEvent.body;
    const temporaryFileWithOriginalFileName =
    {
      ...temporaryFile,
      originalFileName: temporaryFile.fileName.substring(temporaryFile.fileName.indexOf("_") + 1, temporaryFile.fileName.length),
      temporary: true
    }

    this.registerFiles.push(temporaryFileWithOriginalFileName)
    this.uploading = false
  }

  async showFile(fileName: any) {
    try {
      const res = await this.service.fetchRegisterFile(this.editingCode!, fileName);
      if (this.isFileProtocol(res.url)) {
        const blobRes = await this.service.fetchRegisterFileBlob(this.editingCode!, fileName);
        const url = window.URL.createObjectURL(blobRes);
        window.open(url);
      } else {
        window.open(res.url);
      }
    }
    catch (err) {
      this.errorHandler.handle('N??o foi poss??vel fazer o download do arquivo')
      console.log(err)
    }
  }

  isFileProtocol(url: string) {
    return url.startsWith('file:///')
  }

  removeFile(index: number) {
    this.registerFiles.splice(index, 1);
  }

  save(form: NgForm) {
    this.saving = true
    if (!this.editingCode) {
      this.saveNew()
    } else {
      this.update(this.editingCode)
    }
    this.saving = false
  }

  async saveNew() {
    try {
      const toSaveRegistry: any = { ...this.registry }
      this.updateRegisterFilesToSaveNew(toSaveRegistry)
      const res = await this.service.save(toSaveRegistry)
      this.messageService.add({ severity: 'success', summary: 'Lan??amento', detail: 'Lan??amento adicionado com sucesso' })
      this.router.navigate(['/registers/editing', res.code])
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  async update(code: string) {
    try {
      const toUpdateRegistry: any = { ...this.registry }
      this.updateRegisterFilesToUpdate(toUpdateRegistry)
      const res = await this.service.update(toUpdateRegistry, code)
      this.updateLocalRegistryWith(res)
      this.updateTitle()
      this.messageService.add({ severity: 'success', summary: 'Lan??amento', detail: 'Lan??amento editado com sucesso' })
    } catch (err) {
      this.errorHandler.handle(err)
      console.log(err)
    }
  }

  updateRegisterFilesToUpdate(register: any) {
    if (this.registerFiles.length != 0) {
      register.files = this.registerFiles.map((file: any) => {
        if (!file.code) {
          return {
            contentType: file.contentType,
            fileName: file.fileName,
            size: file.size
          }
        } else {
          return {
            code: file.code,
            contentType: file.contentType,
            fileName: file.fileName,
            size: file.size
          }
        }
      })
    } else {
      register.files = []
    }
  }

  updateRegisterFilesToSaveNew(register: any) {
    if (this.registerFiles.length != 0) {
      const names: any[] = []

      for (const file of this.registerFiles) {
        names.push(file.fileName)
      }

      register.files = names;
    } else {
      register.files = []
    }
  }

  new(form: NgForm) {
    form.reset()
    setTimeout(this.setDefaultRegistry.bind(this), 1);
    this.router.navigate(['/registers/editing'])
  }

  private updateLocalRegistryWith(registry: any) {
    this.registry.category.code = registry.category.code
    this.registry.person.code = registry.person.code
    this.registry.dueDate = registry.dueDate
    this.registry.paymentDate = registry.paymentDate
    this.registry.obs = registry.obs
    this.registry.description = registry.description
    this.registry.type = registry.type
    this.registry.value = registry.value

    const offset = new Date().getTimezoneOffset() * 60000
    this.registry.dueDate = new Date(new Date(registry.dueDate).getTime() + offset)
    if (registry.paymentDate)
      this.registry.paymentDate = new Date(new Date(registry.paymentDate).getTime() + offset)

    if (registry.files) {
      this.registerFiles = registry.files;
    } else {
      this.registerFiles = []
    }
  }

  private updateTitle() {
    this.title.setTitle(this.editingCode ? `Editando Registro: ${this.registry.description}` : "Novo Registro");
  }
}
