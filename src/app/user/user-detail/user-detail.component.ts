import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';
import {Dataset} from '../../dataset/dataset';
import {Schema} from '../../schema/schema';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: User = new User();
  public datasets: Dataset[] = [];
  public schemas: Schema[] = [];
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/dataOwners/${id}`;
        const uri2 = `/dataUsers/${id}`;
        this.userService.getUser(uri).subscribe(
          user => {
            this.user = user;
            this.getUserInfo(this.user);
          },
          error => {
            this.userService.getUser(uri2).subscribe(
              user => {
                this.user = user;
                this.getUserInfo(this.user);
              },
              error2 => {
                this.errorMessage = <any>error2.message;
              }
            );
          }
        );
      });
  }

  getUserInfo (user: User): void {
    console.log(user.authorities[0].authority);
    console.log(user._links.sharedDatasets.href);
    console.log(user._links.ownsDatasets.href);
    console.log(user._links.ownsSchemas.href);
    console.log(user._links.ownsLicenses.href);
    this.userService.getUserDatasets(user.uri + '/ownsDatasets').subscribe(
      datasets => {
        this.datasets = datasets;
      });

    this.userService.getUserSchemas(user.uri + '/ownsSchemas').subscribe(
      schemas => {
        this.schemas = schemas;
      });
  }
}
