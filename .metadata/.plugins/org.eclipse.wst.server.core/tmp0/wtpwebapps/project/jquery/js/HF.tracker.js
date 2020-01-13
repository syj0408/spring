/**
 *
 * @module HF.tracker
 * @example
 *   css 클래스 및 data attr 작성 예
 *
 *   hf-tracker-group
 *    - data-tracker-type = impression
 *    - data-tracker-id = /list/class
 *
 *   hf-tracker-item
 *    - data-tracker-id KT-K-00001
 *
 *   hf-tracker-group
 *    - data-tracker-type = promotion
 *    - data-tracker-id = 메인배너
 *
 *   hf-tracker-item
 *    - data-tracker-id = 12
 */

(function(){
    if(!window.LogRocket) {
        var l = {};

        l.init = l.init = l.identify = l.log = l.track = l.reduxMiddleware = l.getSessionURL = l.captureException
            = l.captureMessage = l.version = function (arg) {
            if (typeof arg === 'function') arg();
            console.log('[LogRocket]', arguments);
        };

        window.LogRocket = l;
    }
})();

(function(global){
    'use strict';

    var dataLayer = global.dataLayer = (global.dataLayer || []);
    var HF = global.HF;
    var tracker = global.HF.tracker = {


        /**
         * 초기화
         * @param userInfo
         */
        init : function(userInfo){
            initTrackers(userInfo);
            attachEventListener();
        },

        dataLayerPush : function(obj, callback){
            if(callback) {
                var dimmer = new Utils.LoadingDimmer('dataLayerPush');

                obj = _.extend({
                    eventCallback : function(){
                        dimmer.clear();
                        dimmer = null;
                        callback();
                    },
                    eventTimeout : 1000
                }, obj);

                // gtm 응답이 늦어 0.5초가 지나 페이지 이동이 지연되면 로딩 모달 띄움
                setTimeout(function(){
                    if(dimmer) dimmer.render();
                }, 500);
            }

            dataLayer.push(obj);

            if(HF.DATA.environment !== 'production') {
                console.info('[dataLayer] push', obj);
            }
            return dataLayer;
        },

        sendAllViewingItems : function(){
            var self = this;
            getGroupElementsInViewport().each(function(){
                self.sendViewingItemsByGroup($(this));
            });
        },


        sendViewingItemsByGroup : function($group){
            var groupId = $group.data('tracker-id');
            var type = $group.data('tracker-type');
            var $showingItem = getItemElementsInGroupElement($group);

            var list = $showingItem.filter(function(){
                var $el = $(this);
                if($el.data('tracker-used') || !$el.data('tracker-data')) {
                    return false;
                } else {
                    $el.data('tracker-used', true);
                    return true;
                }
            }).map(function(){
                var $el = $(this);
                return $el.data('tracker-data');
            });

            if(!list.length) return;

            if(type === 'impression') {
                tracker.dataLayerPush({
                    event: 'eec.impressionView',
                    ecommerce: {
                        impressions: list
                    }
                });
            } else if(type === 'promotion') {
                tracker.dataLayerPush({
                    event: 'eec.promotionView',
                    ecommerce: {
                        promoView: {
                            promotions: list
                        }
                    }
                });
            }
        },

        //
        // /**
        //  * 현재 화면에 노출되고 있는 목록들이 무언지 추출
        //  */
        // getViewportGroupElements : function(){
        //     return getGroupElementsInViewport();
        // },
        //
        // /**
        //  * 특정 목록에서 현재 화면에 무엇이 출력되고 있는지 추출
        //  */
        // getViewportElementsByGroupId : function(groupId){
        //     // $('.')
        // },

        setItemDataToElement : setItemDataToElement
    };

    function setItemDataToElement ($group, itemId, data){
        var type = $group.data('tracker-type');
        var groupId = $group.data('tracker-id');
        var $item = $group.find('[data-tracker-id="' +itemId+ '"]');

        data.id = data.id || $item.data('tracker-id');
        data.position = $item.index() + 1;
        data.dimension3 = HF.DATA.user && HF.DATA.user.user_idx;

        if(type === 'promotion') {
            data.creative = groupId;
        } else if(type === 'impression') {
            data.list = groupId;
        }

        return $item.data('tracker-data', data);
    }

    /**
     * 화면 출력 영역 수치 정리
     * @returns {{endY: *, endX: *, width: *, startY: *, scrollLeft: *, startX: *, scrollTop: *, height: *}}
     */
    function getViewportProps(){
        var $window = $(window);
        var scrollTop = $window.scrollTop();
        var scrollLeft = $window.scrollLeft();
        var height = $window.height();
        var width = $window.width();

        return {
            scrollTop : scrollTop,
            scrollLeft : scrollLeft,
            height : height,
            width : width,
            startX : scrollLeft,
            startY : scrollTop,
            endX : scrollLeft + width,
            endY : scrollTop + height
        };
    }

    /**
     * 엘리먼트가 뷰포트 안에 있는지 여부
     * @param $el
     * @param wrapperProp.startX
     * @param wrapperProp.startY
     * @param wrapperProp.endX
     * @param wrapperProp.endY
     * @param margin
     * @returns {boolean}
     */
    function isElementInViewport($el, wrapperProp, margin){
        margin = margin || 20;

        var viewport = getViewportProps();

        wrapperProp = (function(){
            if(!wrapperProp) return viewport;
            else return {
                startX : Math.max(viewport.startX, wrapperProp.startX),
                startY : Math.max(viewport.startY, wrapperProp.startY),
                endX : Math.min(viewport.endX, wrapperProp.endX),
                endY : Math.min(viewport.endY, wrapperProp.endY)
            };
        })();

        var width = $el.outerWidth();
        var height = $el.outerHeight();
        var offset = $el.offset();
        var startX = offset.left;
        var startY = offset.top;
        var endX = offset.left + width;
        var endY = offset.top + height;

        // console.log(
        //     [startX - margin, wrapperProp.startX],
        //     [startY - margin, wrapperProp.startY],
        //     [endX + margin, wrapperProp.endX],
        //     [endY + margin, wrapperProp.endY],
        //     startX - margin > wrapperProp.startX,
        //     startY - margin > wrapperProp.startY,
        //     endX + margin < wrapperProp.endX,
        //     endY + margin < wrapperProp.endY,
        //
        //     startX - margin < wrapperProp.endX,
        //     startY - margin < wrapperProp.endY,
        //     endX + margin > wrapperProp.startX,
        //     endY + margin > wrapperProp.startY
        // )
        //
        // console.log(
        //     '!!!!!!!!!!',
        //     [startX - margin , wrapperProp.endX],
        //     [startY - margin , wrapperProp.endY],
        //     [endX - margin , wrapperProp.startX],
        //     [endY - margin , wrapperProp.startY],
        //     startX - margin < wrapperProp.endX,
        //     startY - margin < wrapperProp.endY,
        //     endX - margin > wrapperProp.startX,
        //     endY - margin > wrapperProp.startY,
        //     $el
        // )

        return (
            startX - margin < wrapperProp.endX &&
            startY - margin < wrapperProp.endY &&
            endX - margin > wrapperProp.startX &&
            endY - margin > wrapperProp.startY
        );
    }

    /**
     * 뷰포트 안에 있는 그룹 수집
     * @returns {*|jQuery}
     */
    function getGroupElementsInViewport(){
        return $('.hf-tracker-group').filter(function(i){
            return isElementInViewport($(this));
        });
    }

    function getItemElementsInGroupElement($groupElement){
        var groupDisplayProps = {
            offset : $groupElement.offset()
        };

        groupDisplayProps.startX = groupDisplayProps.offset.left;
        groupDisplayProps.startY = groupDisplayProps.offset.top;
        groupDisplayProps.endX = groupDisplayProps.startX + $groupElement.width();
        groupDisplayProps.endY = groupDisplayProps.startY + $groupElement.height();

        return $groupElement.find('.hf-tracker-item').filter(function(i){
            // console.log('aaa', $(this), isElementInViewport($(this), groupDisplayProps), 40);
            return isElementInViewport($(this), groupDisplayProps, 40);
        });
    }

    /**
     * 트래커들 초기화
     * @param userInfo
     */
    function initTrackers(){
        // localStorage['hf-unique'] = localStorage['hf-unique'] || new Date().getTime() +'_'+ Math.ceil(Math.random() * 1000000);
        // LogRocket.log('hf-unique', localStorage['hf-unique']);
        var userInfo = HF.DATA.user;

        // LogRocket
        if(userInfo && userInfo.user_idx) {
            LogRocket.identify(userInfo.user_idx, {
                name: userInfo.user_name,
                email: userInfo.user_id,

                // Add your own custom user variables here, ie:
                level: userInfo.user_level,
                login_naver: userInfo.user_naid !== '' ? 'Y' : 'N',
                login_kakao: userInfo.user_kaid !== '' ? 'Y' : 'N',
                login_facebook: userInfo.user_fbid !== '' ? 'Y' : 'N',
                phone: userInfo.user_phone.substr(-4, 4)
                // unique: localStorage['hf-unique']
            });
        }

        // channel.io
        if(HF.DATA.apiKeys.channel_io) {
            var setting = {
                pluginKey: HF.DATA.apiKeys.channel_io,
                profile: {
                    logrocket: LogRocket ? LogRocket.sessionURL : null
                }
            };

            if (userInfo) {
                setting = _.extend(setting, {
                    userId: userInfo.user_idx,
                    profile: {
                        name: userInfo.user_nickname,
                        realName: userInfo.user_name,
                        mobileNumber: userInfo.user_phone,
                        email: userInfo.user_id,
                        avatarUrl: HF.DATA.s3.uri + '/profile/' + userInfo.user_profileimage,
                        level: userInfo.user_level,
                        logrocket: location.origin + '/v1/client/track/lr/user/' + userInfo.user_idx,
                        sns_login: (function(){
                            var o = [];

                            if (userInfo.user_naid) o.push('네이버');
                            if (userInfo.user_kaid) o.push('카카오톡');
                            if (userInfo.user_fbid) o.push('페이스북');

                            return o.join(' / ') || null;
                        })()
                        // unique: localStorage['hf-unique']
                    }
                });
            }

            HF.DATA.channelPluginSettings = setting;
        }
    }

    /**
     * 이벤트 리스너
     */
    function attachEventListener(){
        var lastScrollTimestamp = 0;
        $(window).on('scroll', function(){
            setTimeout(function(){
                if(lastScrollTimestamp + 200 > new Date().getTime()) return;
                tracker.sendAllViewingItems();
            }, 200);

            lastScrollTimestamp = new Date().getTime();
        });

        $(document).on('click', '.hf-tracker-item a', function(e){
            e.preventDefault();
            var $el = $(this);
            var $item = $el.closest('.hf-tracker-item');
            var $group = $item.closest('.hf-tracker-group');

            var type = $group.data('tracker-type');
            var groupId = $group.data('tracker-id');
            var id = $item.data('tracker-id');
            var data = $item.data('tracker-data');

            var callback = function(){
                HF.history.setCurrentState('trackerClick', {
                    type : type,
                    id : data.id,
                    groupId : groupId,
                    position : data.position
                });

                location.href = $el.attr('href');
            };

            switch (type) {
                case 'promotion':
                    tracker.dataLayerPush({
                        event: 'eec.promotionClick',
                        ecommerce: {
                            promoClick: {
                                promotions: [data]
                            }
                        }
                    }, callback);

                    break;
                case 'impression':
                    tracker.dataLayerPush({
                        event: 'eec.impressionClick',
                        ecommerce: {
                            click: {
                                actionField: {
                                    list: groupId
                                },
                                products: [data]
                            }
                        }
                    }, callback);

                    break;
                default:
                    alert('???');
                    return;
            }

        });
    }

})(window);