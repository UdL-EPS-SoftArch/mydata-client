import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldService } from '../field.service';
import { Field } from '../field';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {FieldOwnerService} from '../../user/field-owner.service';

@Component({
  selector: 'app-field-details',
  templateUrl: './field-details.component.html',
  styleUrls: ['./field-details.component.css']
})
export class FieldDetailsComponent implements OnInit {
  public field: Field = new Field();
  public errorMessage: string;
  public isOwner: boolean;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private fieldService: FieldService,
              private authenticationService: AuthenticationBasicService,
              private fieldOwnerService: FieldOwnerService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/fields/${id}`;
        this.fieldService.getField(uri).subscribe(
          field => {
            this.field = field;
            if (this.field._links != null) {
              this.fieldOwnerService.getFieldOwner(this.field._links.owner.href).subscribe(
                owner => {
                  this.isOwner = this.authenticationService.getCurrentUser().username === owner.getUserName();
                });
            }
          },
          error => this.errorMessage = <any>error.message
        );
      });
  }

  onDelete(field) {
    this.fieldService.deleteField(field).subscribe(
      response => { this.router.navigate(['/fields']); },
      error => this.errorMessage = <any>error.message,
    );
  }
}
