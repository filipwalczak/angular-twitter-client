import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-social-list',
  templateUrl: './social-list.component.html',
  styleUrls: ['./social-list.component.css']
})
export class SocialListComponent implements OnInit {

  @Input() users: User[];
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
