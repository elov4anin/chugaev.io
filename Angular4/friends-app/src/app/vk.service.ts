import { Injectable } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {environment} from "../environments/environment";

import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Router} from "@angular/router";

@Injectable()
export class VkService {

    constructor(private http: Http, private router: Router) {
    }
    authVK() {
        this.router.navigate('https://oauth.vk.com/authorize?client_id='+ environment.client_id +'&display=page'+'&redirect_uri='+environment.redirect_uri+'&scope: wall&response_type=token&v=5.63&state=123456')

    }

    getUsers() {
        return this.http.get(
            environment.vkUrl + 'friends.get?user_id=14373841&fields=nickname, domain, sex, bdate, city, photo_50, has_mobile')
            .map(res => {
                    return res.json().response;
                }
            )
            .catch(this.handleError);
    }

/*
    params[owner_id]=16409798&params[friends_only]=0&params[from_group]=0&params[message]=Держи%20леща!!!%0AAPI.console.&params[services]=twitter&params[signed]=0&params[mark_as_ads]=0&params[ads_promoted_stealth]=0&params[v]=5.63
*/

    postOnWall(owner: number) {
        console.log('В сервисе');
        let body = {
            owner_id: owner,
            message: 'Держи%20леща. test API'
        };
        return this.http.post(
            environment.vkUrl + `wall.post`, body)
            .map(res => {
                    console.log('Obj', res.json());
                    return res.json();
                }
            )
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.log('Ошибка', error);
        return Observable.throw(error.message || error);
    }
}
