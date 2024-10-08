import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {postsReducers} from "./post-list/store/posts.reducers";
import { EffectsModule } from '@ngrx/effects';
import {PostsEffects} from "./post-list/store/posts.effects";
import {HttpClientModule} from "@angular/common/http";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {PostListComponent} from "./post-list/component/post-list.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {provideRouter} from "@angular/router";
import {appRoutes} from "./app.routes";
import {CommentsComponent} from "./comments/component/comments.component";
import {commentsReducers} from "./comments/store/comments.reducers";
import {CommentsEffects} from "./comments/store/comments.effects";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    CommentsComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({
            postList: postsReducers,
            commentList: commentsReducers,
        }),
        EffectsModule.forRoot([PostsEffects, CommentsEffects]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            maxOpened: 1
        }),
        InfiniteScrollModule,
        FormsModule
    ],
  providers: [provideRouter(appRoutes)],
  bootstrap: [AppComponent]
})
export class AppModule { }
