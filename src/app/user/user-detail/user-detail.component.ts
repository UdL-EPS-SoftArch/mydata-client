import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user: User = new User();
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
  ) { }

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((id) => {
        const uri = `/users/${id}`;
        this.userService.getUser(uri).subscribe(
          user => {
            this.user = user;
          },
          error => this.errorMessage = <any>error.message
        );
      });
  }

}
