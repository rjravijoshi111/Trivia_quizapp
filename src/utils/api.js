import React from 'react';
import { Alert, AsyncStorage } from 'react-native';
import * as APILIST from '../globals/appContsants';
export const API = {

    //Triva Quiz API

    getQuetions: (onResponse, data, isHeaderRequired) => {
        request(onResponse, {}, 'GET', "JSON", isHeaderRequired, APILIST.BASE_URL + APILIST.GET_QUIZ, buildHeader());
    },
}

export const buildHeader = (headerParams = {}) => {
    var header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    Object.assign(header, headerParams);
    return header;
    
}

async function request(onResponse, data, type, returnType, isHeaderRequired, featureURL, secureRequest) {
    let response = '';
    let responseJSON;
    console.log("featureURL >>> " + featureURL);
    console.log("secureRequest " + JSON.stringify(secureRequest));
    console.log("data >>> " + JSON.stringify(data));
    console.log("returnType " + returnType);
    console.log("isHeaderRequired " + isHeaderRequired);
    console.log("type " + type);

    try {
        if (type === 'GET') {
            if (isHeaderRequired) {
                console.log("Request Call get with Header");
                response = await fetch(featureURL, {
                    method: type,
                    headers: secureRequest
                });
            }
            else {
                console.log("Request Call get without header");
                response = await fetch(featureURL, {
                    method: type,
                });
            }
        }
        else {
            console.log("Request Call post with header");
            response = await fetch(featureURL, {
                method: type,
                headers: secureRequest,
                body: JSON.stringify(data)
            });
        }
        console.log("response " + JSON.stringify(response));
        console.log("response status " + response.status);
        if (returnType === 'TEXT') {
            responseJSON = await response.text();
        }
        else {
            responseJSON = await response.json();
        }
        console.log("responseJSON " + JSON.stringify(responseJSON));

        if (response.status == 200) {
            console.log("onResponse success ");
            onResponse.success(responseJSON);
        } else {
            console.log("onResponse error");
            onResponse.error(responseJSON);
        }
        // if (onResponse.complete) {
        //     console.log("onResponse complete");
        //     onResponse.complete();
        // }
    } catch (error) {
        console.log("onResponse catch error " + error);
        // if (onResponse.complete) {
        //     console.log("onResponse catch complete");
        //     onResponse.complete();
        // }
    }
}
