/**
 * Created by Nalrarang on 2017. 2. 22
 */
/**
API Type별 Request 스크립트
@namespace ApiRequest
@author nalrarang@gmail.com
@logs 20170222:Nalrarang update
*/

var ApiRequest = (function(){
    'user strict';

    var API_URL = '/v1/client';
    var GET_CACHE_LIST = {
        /* 필수 */
        '/env/basic' : 20*60000,
        '/env/holidays' : 60*60000,
        // '/user' : 5*60000,

        /* 카테고리 */
        '/class/genre' : 10*60000,
        '/magazine/category' : 10*60000,

        /* 메인 */
        '/env/instaimage' : 5*60000,
        '/class/kit' : 5*60000,
        // '/env/banners' : 5*60000,
        // '/class/content?recommend=Y' : 5*60000,
        // '/magazine/content?amount=4' : 5*60000,
        '/award' : 5*60000,

        /* 서브 */
        '/class/banners' : 5*60*1000
    };
    var CACHE_STORAGE_LIST = {}; // 세션스토리지에서 가져온 데이터 저장

    $.ajaxSetup({cache:false});

    var ajax = function(url, data, type, successCallback, errorCallback, option) {
        successCallback = successCallback || function(){};

        var _ajaxOptions = {
                url: API_URL + url,
                data: data,
                success: successCallback,
                error: errorCallback,
                type: type
        };
        _ajaxOptions = $.extend({
            dataType: 'json'
        }, _ajaxOptions);

        // 캐시되어도 되는 api는 캐시데이터 리턴하고 끝내기
        if(HF.DATA.environment === 'production' && type === 'GET' && GET_CACHE_LIST[url]){
            if(!CACHE_STORAGE_LIST[url]) {
                CACHE_STORAGE_LIST[url] = new Utils.SessionStorage('hf-req-cache-'+url, null, GET_CACHE_LIST[url], {
                    lifetimeUpdateBy : 'update'
                });
            }

            var cacheData = CACHE_STORAGE_LIST[url].get('data');
            if(cacheData){
                var dfd = $.Deferred();
                successCallback(cacheData);
                dfd.resolve([cacheData, 'success', { readyState : 4, status : 200 }]);

                return dfd.promise();
            } else {
                _ajaxOptions.success = function (response) {
                    CACHE_STORAGE_LIST[url].set('data', response);
                    successCallback(response);
                };
            }
        }


        if(option === "file"){
            _ajaxOptions = $.extend({
                processData: false, 
                contentType: false
            }, _ajaxOptions);            
        }
        else if(option === "sync"){
            _ajaxOptions = $.extend({
                async: false 
            }, _ajaxOptions);
        }

        var authTokens = User.getAuthToken();

        if(authTokens.accessToken){
            _ajaxOptions = $.extend({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", authTokens.tokenType + " " + authTokens.accessToken);
                    if(option !== "file"){
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    }
                }
            }, _ajaxOptions);
        } 

        return $.ajax(_ajaxOptions);
    };
    return {
        get: function(url, data, success, error){
            return ajax(url, data, 'GET', success, error);
        },
        post: function(url, data, success, error){
            return ajax(url, data, 'POST', success, error);
        },
        postFile: function(url, data, success, error){
            return ajax(url, data, 'POST', success, error, "file");
        },
        postSync: function(url, data, success, error){
            return ajax(url, data, 'POST', success, error, "sync");
        },        
        patch: function(url, data, success, error){
            return ajax(url, data, 'PATCH', success, error);
        },
        delete: function(url, data, success, error){
            return ajax(url, data, 'DELETE', success, error);
        },
        put: function(url, data, success, error){
            return ajax(url, data, 'PUT', success, error);
        },
        putFile: function(url, data, success, error){
            return ajax(url, data, 'PUT', success, error, "file");
        }
    }
})();
