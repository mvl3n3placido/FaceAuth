import { Inject, Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { Constants } from './../constants/constants';

@Injectable()
export class ServiceRequest {
    constructor(private http: Http) {

    }
    /** post data */
    postData(url, body, token) {
        const options = this.setRequestOptions(token);
        return this.http.post(url, body, options).pipe(map((response: any) => response.json()));
    }
    /** get data */
    getData(url, token) {
        const options = this.setRequestOptions(token);
        return this.http.get(url, options).pipe(map((response: any) => response.json()));
    }
    /** update data */
    putData(url, body, token) {
        const options = this.setRequestOptions(token);
        return this.http.put(url, body, options).pipe(map((response: any) => response.json()));
    }
    /** set request Options */
    setRequestOptions(token: string): RequestOptions {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        const options = new RequestOptions({ headers: headers });
        return options;
    }

    sendImageToImgur(image: string) {
        const auth = `Client-ID ${Constants.IMGUR_CLIENT_ID}`;
        const headers = new Headers({
            'Authorization': auth
        });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(Constants.IMGUR_ENDPOINT, image, options).pipe(map((response: any) => response.json()));
    }
    analyzeFaceViaAzure(link: string, serializedFaceParameters: any) {
        const url = `${Constants.AZURE_ENDPOINT}/detect?${serializedFaceParameters}`;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': Constants.AZURE_API_KEY
        });
        const options = new RequestOptions({ headers: headers });
        const payload =  JSON.stringify({ 'url': link });
        return this.http.post(url, payload, options).pipe(map((response: any) => response.json()));
    }

    verifyFaceViaAzure(faceId1: string, faceId2: string) {
        const url = `${Constants.AZURE_ENDPOINT}/verify`;
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': Constants.AZURE_API_KEY
        });
        const options = new RequestOptions({ headers: headers });
        const payload = {
            'faceId1': faceId1,
            'faceId2': faceId2
        };
        return this.http.post(url, payload, options).pipe(map((response: any) => response.json()));
    }
}
