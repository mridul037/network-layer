import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrebootModule } from 'preboot';
import { CoreModule } from './@core/core.module';
import { CategoryPageModule } from './category-page/category-page.module';

@NgModule({
    declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    PrebootModule.withConfig({ appRoot: 'app-root' }),
    CoreModule,
    BrowserAnimationsModule,
    CategoryPageModule,
  ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
