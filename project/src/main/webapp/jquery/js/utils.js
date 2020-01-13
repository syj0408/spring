/**
 * Created by Nalrarang on 2017. 3. 7
 */
/**
공용으로 자주 사용될 기능들 모음
@namespace Utils
@author nalrarang@gmail.com
@logs 20170307:Nalrarang update
@logs 20180511:성훈, Utils.Dimmer 추가
@logs 20180805:성훈, Utils.calDueDays 추가
@logs 20180923:성훈, Utils.SessionStorage 추가
*/

var watchHashList = {};

var Utils = (function() {


    function Popup(data) {
        var mywindow = window.open('', 'my div', 'height=400,width=600');
        mywindow.document.write('<html><head><title>my div</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write(data);
        mywindow.document.write('</body></html>');
        mywindow.document.close(); // IE >= 10에 필요
        mywindow.focus(); // necessary for IE >= 10
        mywindow.print();
        mywindow.close();
        return true;
    }

    return {
        init: function () {
            var config = HF.DATA.config.config_shippingdate;

            if (this.bizCal) {
                this.bizCal.setOptions({
                    exceptDates: _.map(HF.DATA.holidays, function (date) {
                        return moment(date).format('YYYY-MM-DD');
                    }),
                    exceptWeekdays: [0, 6],     // 제외할 요일 리스트
                    monthDays: config.isShippingEveryDay ? [] : config.shippingDays,    // 매달마다 정렬시킬 날짜, 만약 빈 배열이면 사용하지 않는걸로 간주
                    monthDayMargin: config.orderDateDiff,
                    closingTime: config.orderTimeLimit
                });
            }

            return $.Deferred().resolve().promise();
        },
        bizCal: window.BizDateCalculator ? new BizDateCalculator() : null,

        defineHashListner: function (obj) {
            var self = this;

            _.map(obj, function (v, k) {
                var currentParam = self.getHashUrlParameter(k);

                watchHashList[k] = currentParam;
                v(currentParam);
            });

            $(window).on('hashchange', function () {
                _.map(obj, function (v, k) {
                    var currentParam = self.getHashUrlParameter(k);

                    if (watchHashList[k] !== currentParam) {
                        v(currentParam);
                        watchHashList[k] = currentParam;
                    }
                });
            })
        },

        getSearchParameter: function (string, sParam) {
            var sPageURL = string,
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');

                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                }
            }
        },

        getHashUrlParameter: function (sParam) {
            if (location.hash.indexOf('#?') !== 0) {
                return undefined;
            } else {
                return this.getSearchParameter(location.hash.substring(2), sParam);
            }
        },

        getUrlParameter: function (sParam) {
            return this.getSearchParameter(window.location.search.substring(1), sParam);
        },

        parseQuery: function (queryString) {
            queryString = queryString || window.location.search.substring(1);
            var query = {};
            var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split('=');
                query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
            }
            return query;
        },

        /**
         * 브라우저의 기본 세션스토리지는 창마다 독립적으로 저장되기 때문에 장바구니 데이터가 서로 공유 불가능하므로,
         * 대신 로컬스토리지를 세션스토리지처럼 이용가능하도록 유효기간 기능을 추가한 클래스
         *
         * @class SessionStorage
         * @param id
         * @param [defaultValue={}]
         * @param [lifetime=48 * 60 * 60 * 1000] -1일 경우, 기존 생성된 값 기준으로 로드
         * @param [options.lifetimeUpdateBy='always'] always, init, update
         * @constructor
         */
        SessionStorage: (function () {
            function CustomStorage(id, defaultValue, lifetime, options) {
                options = _.extend({
                    isLifetimeReset : true,
                    lifetimeUpdateBy: 'always'   //
                }, options || {});

                if (!window.localStorage) {
                    var o = {};
                    o.set = o.delete = o.reset = o.clear = o.get = function () {
                    };
                    return o;
                }

                lifetime = lifetime || 48 * 60 * 60 * 1000; // 2일
                this._options = options;
                this._storage = window.localStorage;
                this._defaultValue = JSON.stringify(defaultValue || {});
                this._id = id || Utils.uniqueNumber();
                this._storage[this._id] = this._storage[this._id] || this._defaultValue;

                // 로컬스토리지는 유효기간이 없다
                // 직접 지정한 유효기간이 지나면 초기화 한다
                if (Date.now() > (this.get('__ts__') || 0) + lifetime) {
                    this.reset();
                }
                if (/(always|init)/.test(this._options.lifetimeUpdateBy)) {
                    this.refreshTimestamp();
                }
            }

            CustomStorage.prototype = {
                _merge : function(obj) {
                    this._storage[this._id] = JSON.stringify( _.extend(this.get(), obj) );
                },

                refreshTimestamp: function () {
                    this._merge({ '__ts__' :  Date.now() });
                },

                /**
                 * @method SessionStorage.get
                 * @param key
                 * @returns {*}
                 */
                get: function (key) {
                    if (!key) {
                        return JSON.parse(this._storage[this._id] || '{}');
                    } else {
                        return this.get()[key];
                    }
                },

                /**
                 * @method SessionStorage.set
                 * @param [key]
                 * @param data
                 */
                set: function (key, data) {
                    if(typeof key === 'object') {
                        this._merge(key);
                    }
                    else if (arguments.length === 1)
                        this._merge({
                            data : key
                        });
                    else {
                        const obj = {};
                        obj[key] = data;

                        this._merge(obj);
                    }

                    if (/(always|update)/.test(this._options.lifetimeUpdateBy)) {
                        this.refreshTimestamp();
                    }
                },
                /**
                 * @method SessionStorage.delete
                 * @param key
                 */
                delete: function (key) {
                    var obj = this.get();
                    delete obj[key];
                    this._storage[this._id] = JSON.stringify(obj);
                },

                reset: function () {
                    this._storage[this._id] = this._defaultValue;
                },

                /**
                 * @method SessionStorage.clear
                 */
                clear: function () {
                    this._storage.removeItem(this._id);
                }
            };

            return CustomStorage;
        })(),

        /**
         *
         * 기본 스타일
         *  .hfc-dimmer-loading
         * 준비된 스타일
         *  .hfc-dimmer-loading
         *
         * @param id
         * @param className
         * @returns {{render: render, clear: clear}}
         * @constructor
         */
        Dimmer: function (id, className) {
            className = className || '';

            var $el;
            var elId = 'dimmer-' + (id || Utils.uniqueNumber());
            var focusedElement;

            return {
                isRendered: false,
                changeClassName: function (className) {
                    $el.attr('class', 'hfc-dimmer ' + className);
                },
                render: function (addCss, isHide) {
                    if ($('#' + elId).length && this.isRendered) return;

                    // 커서가 엉뚱한데 가지 못하도록 잠근다
                    focusedElement = $(document.activeElement);
                    focusedElement.blur();

                    $el = $('<div />', {
                        id: elId,
                        class: 'hfc-dimmer ' + className,
                        css: addCss || {},
                    });

                    if (isHide) $el.hide();
                    $el.appendTo('body');

                    this.isRendered = true;
                },
                clear: function () {
                    // 포커스를 돌려준다
                    if (focusedElement) {
                        focusedElement.focus();
                        focusedElement = null;
                    }
                    if ($el) {
                        $el.remove();
                    }
                },
                show: function () {
                    $el.show();
                },
                hide: function () {
                    $el.hide();
                },
                on: function (eventName, callback) {
                    return $el.on(eventName, callback);
                }
            };
        },

        /**
         *
         * @param id
         * @returns {Utils.Dimmer}
         * @constructor
         */
        LoadingDimmer: function (id) {
            return new Utils.Dimmer(id, 'hfc-dimmer-loading');
        },

        uniqueNumber: function () {
            return new Date().getTime() + '' + Math.ceil(Math.random() * 10000);
        },

        calPayday: function (paymentDate, shippingDate) {
            return paymentDate ?
                moment(paymentDate) :
                moment.max(moment(), moment(shippingDate).subtract(HF.DATA.config.config_prepaymentday, 'days'))
                ;
        },

        /**
         * 특정 조건 제외한 일자 목록 뽑기. 보통은 영업일 뽑는데 쓴다.
         * @param year
         * @param month
         * @param options
         * @returns {Array} YYYY-MM-DD 형식의 String을 담은 1차원 배열
         */
        getAvailableDates: function (year, month, options) {
            options = _.extend({
                exceptDates: ['2010-03-01'], // 제외할 날짜
                exceptWeekdays: [0, 6],     // 제외할 요일 리스트
                addBeforeMonth: 1,
                addAfterMonth: 0,
                callback: function () {
                }
            }, options);

            var dates = [];
            var makeList = function (year, month) {
                var model = moment([year, month + 1, 1]);
                var lastDay = model.add('months', 1).date(0).get('date');
                var output = [];

                for (var i = 1, tempDate; i <= lastDay; i++) {
                    model.date(i);
                    tempDate = model.format('YYYY-MM-DD');

                    // 지정한 요일인지 검사
                    // 제외할 날짜에 포함되는지 검사
                    if (
                        options.exceptWeekdays.indexOf(model.day()) > -1 ||
                        options.exceptDates.indexOf(tempDate) > -1
                    ) {
                        continue;
                    }
                    output.push(tempDate);
                }
                return output;
            };

            var i;
            for (i = options.addBeforeMonth; i > 0; i--) {
                dates = dates.concat(makeList(year, month - i));
            }

            dates = dates.concat(makeList(year, month));

            for (i = 1; i <= options.addAfterMonth; i++) {
                dates = dates.concat(makeList(year, month + i));
            }

            return dates;
        },

        numberWithCommas: function (x) {
            return (x || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

        getImageUrl: function (type, imgName, sizeRatio) {
            var typeMatch = {
                'class': '/class/thumbs/'
            };

            if (sizeRatio) {
                /*
                    resize
                    square
                 */
                imgName = imgName.replace('-resize', '-' + sizeRatio)
            }

            return HF.DATA.s3.uri + typeMatch[type] + imgName;
        },
        lockWindowScroll: function (isEnable) {
            if (isEnable) {
                $('body').addClass('lock-scroll');
            } else {
                $('body').removeClass('lock-scroll');
            }
        },

        escapeHtml : function(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    }


})();