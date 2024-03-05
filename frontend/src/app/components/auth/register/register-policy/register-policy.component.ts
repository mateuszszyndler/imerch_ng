import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-register-policy',
  templateUrl: './register-policy.component.html',
  styleUrls: ['./register-policy.component.scss']
})
export class RegisterPolicyComponent implements OnInit {
  @Output() policyAgreed: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onAgree() {
    this.policyAgreed.emit(true);
  }
}
