import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {postsReducers} from "./store/posts.reducers";
import { EffectsModule } from '@ngrx/effects';
import {PostsEffects} from "./store/posts.effects";
import {HttpClientModule} from "@angular/common/http";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {PostListComponent} from "./post-list/post-list.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      postList: postsReducers
    }),
    EffectsModule.forRoot([PostsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      maxOpened: 1
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
