import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewReceiptComponent } from './new-receipt/new-receipt.component';
import { Router, RouterModule } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReportComponent } from './report/report.component';
import { DatePipe } from './pipes/date.pipe';
import { NewUserComponent } from './new-user/new-user.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { SuccessfulPostDirective } from './directives/successful-post.directive';

const appRoutes = [
  { path: '', component: AuthComponent },
  {
    path: 'newreceipt',
    component: NewReceiptComponent,
    canActivate: [AuthGuard],
  },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard] },
  { path: 'additem', component: AddItemComponent, canActivate: [AuthGuard] },
  { path: 'newuser', component: NewUserComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: AuthComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewReceiptComponent,
    ReportComponent,
    AddItemComponent,
    ReportComponent,
    DatePipe,
    NewUserComponent,
    AuthComponent,
    SuccessfulPostDirective,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
