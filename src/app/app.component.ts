import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from "@angular/core";
import { BalanceComponent } from "./balance.component";
import {
  RemoteData,
  RemoteDataModule,
  failure,
  inProgress,
  notAsked,
  success,
} from "ngx-remotedata";
import { BehaviorSubject } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: "app-root",
  template: `
    <div *ngIf="balance$ | async as balance">
      <button *ngIf="balance | isSuccess" (click)="fail()">Fail</button>
      <button *ngIf="balance | isFailure" (click)="loadBalance()">Retry</button>
    </div>
    <br />
    <app-balance
      *ngIf="balance$ | async as balance"
      [balance]="balance"
    ></app-balance>
  `,
  imports: [BalanceComponent, RemoteDataModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  protected readonly balance$ = new BehaviorSubject<RemoteData<number>>(
    notAsked()
  );

  ngOnInit(): void {
    this.loadBalance();
  }

  protected fail(): void {
    this.balance$.next(failure("Connection error"));
  }

  protected loadBalance(): void {
    this.balance$.next(inProgress());
    setTimeout(() => {
      this.balance$.next(success(50));
    }, 500);
  }
}
