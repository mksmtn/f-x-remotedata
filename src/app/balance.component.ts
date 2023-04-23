import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RemoteData, RemoteDataModule, notAsked } from "ngx-remotedata";

@Component({
  standalone: true,
  selector: "app-balance",
  template: `
    <div *ngIf="balance | isInProgress">Баланс загружается...</div>
    <div *ngIf="balance | isSuccess">
      <div *ngIf="balance | successValue as blnc; else emptyBalanceTemplate">
        {{ blnc | number }} руб.
      </div>
      <ng-template #emptyBalanceTemplate>
        Время пополнить счёт, баланс 0 руб.
      </ng-template>
    </div>
    <div *ngIf="balance | isFailure">
      {{ balance | failureError }}
    </div>
  `,
  imports: [CommonModule, RemoteDataModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BalanceComponent {
  @Input()
  balance: RemoteData<number> = notAsked();
}
