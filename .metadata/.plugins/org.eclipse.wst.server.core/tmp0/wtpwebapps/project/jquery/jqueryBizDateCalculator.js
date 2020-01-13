/**
 * 하비풀 날짜계산기
 * @class BizDateCalculator
 */

;(function(def){def('BizDateCalculator', ['moment', ['lodash','_']], function(moment, _){ 'use strict';

    /**
     * 일을 초과입력해도 다음달이나 날짜로 넘어가는게 아닌, 해당 범위 안의 날짜범위를 지정한 moment 객체 리천
     *
     * @param {Number|Date|String|Array|Moment} year 문자열일 경우, 'YYYY-MM-DD'. 배열일 경우, [1999,10,2] 같은 형식으로 입력
     * @param {Number} [month]
     * @param {Number} [day]
     * @returns {Moment}
     */
    var safeDate = function(year, month, day){
        var mm, maxDays;

        if(year._isAMomentObject || year instanceof Date) {
            return moment(year).startOf('date');
        } else if(year instanceof Array){
            day = year[2];
            month = year[1];
            year = year[0];
        } else if(typeof year === 'string'){
            var temp = year.split('-');
            year = parseInt(temp[0]);
            month = parseInt(temp[1]);
            day = parseInt(temp[2]);
        }

        month = Math.min(11, month-1);
        mm = moment([year, month, 1]);
        maxDays = mm.add(1, 'months').date(0).get('date');

        return mm.date(Math.min(maxDays, day));
    };

    var dateRangeEach = function(startDate, endDate, callback){
        var model = safeDate(startDate);
        var durationDays = safeDate(endDate).diff(model, 'days');
        var addDay = 0 > durationDays ? -1 : 1;
        durationDays = Math.abs(durationDays);

        for(var i=0; i<durationDays; i++){
            callback(model);
            model.add(addDay, 'day');
        }
    };

    /**
     * @constructor
     * @param options
     */
    var BizDateCalculator = function(options){
        this.EXCEPT_DATES       = null;
        this.EXCEPT_WEEKDAYS    = null;
        this.MONTH_DAYS         = null;
        this.MONTH_DAY_MARGIN   = null;
        this.CLOSING_TIME       = null;

        if(options)
            this.setOptions(options);

        return this;
    };

    BizDateCalculator.prototype = {

        setOptions : function(options){
            options = _.extend({
                exceptDates     : ['2010-03-01'], // 제외할 날짜
                exceptWeekdays  : [0,6],     // 제외할 요일 리스트
                monthDays       : [7, 17, 27],    // 매달마다 정렬시킬 날짜, 만약 빈 배열이면 사용하지 않는걸로 간주
                monthDayMargin  : 3,          // 정한 일수만큼 앞으로 여유있는 날짜 안에서 선택됨.  예) monthDays [7,17,27]이 있는데 해당일이 16일, 설정값이 3일 경우 16+3=19. 17을 넘겼으므로 27일이 선택됨.
                closingTime     : '23:59:59'     // 영업종료 시간. 이 시간이 지나면 다음날로 선택됨
            }, options);

            this.EXCEPT_DATES       = options.exceptDates;
            this.EXCEPT_WEEKDAYS    = options.exceptWeekdays;
            this.MONTH_DAYS         = options.monthDays;
            this.MONTH_DAY_MARGIN   = options.monthDayMargin;
            this.CLOSING_TIME       = options.closingTime;
        },

        setExceptDates : function(val){
            this.EXCEPT_DATES = val;
        },

        setExceptWeekdays : function(val){
            this.EXCEPT_WEEKDAYS = val;
        },

        setMonthDays : function(val) {
            this.MONTH_DAYS = val;
        },

        /**
         *
         * @param {Moment|Date|Array|String} baseDateTime 기준이 될 날짜 및 시간. 주문을 안했을 때는 지금시간이 기준이 될 것이고, 기주문은 주문일시가 기준이 될 것임.
         * @param {Moment|Date|Array|String} date 적정일로 조정받을 날짜시간
         */
        getAllSetDate : function(baseDateTime, date){
            baseDateTime = moment(baseDateTime);
            date = safeDate(date);

            var self = this;

            if(self.MONTH_DAY_MARGIN === 0 && !this.isInBusinessTime(date, { baseDateTime : baseDateTime })){
                baseDateTime.add(1, 'days');
            }

            var align = function(isSeekByReverse){
                return self.seekAvailableDate(
                    self.alignByMonthDay(
                        self.dayMargin(date, { baseDateTime : baseDateTime })
                    ), {
                        isSeekByReverse : isSeekByReverse
                    }
                );
            };
            var alignedDate = align(true);

            // 탐색하고 보니 기준일보다 이전일로 탐색되면 반대방향으로 다시 탐색
            if(baseDateTime.isAfter(alignedDate, 'day')){
                alignedDate = align(false);
            }
            return alignedDate;
        },


        /**
         * 배송가능한 날인지 판단
         * @param {String|Array|Moment} date
         * @param [options]
         * @returns {boolean}
         */
        isAvailableDate : function(date, options){
            options = _.extend({
                exceptDates : this.EXCEPT_DATES,
                exceptWeekdays :this.EXCEPT_WEEKDAYS
            }, options);

            var model = safeDate(date);

            return !(
                options.exceptWeekdays.indexOf(model.day()) > -1 ||
                options.exceptDates.indexOf(model.format('YYYY-MM-DD')) > -1
            );
        },


        /**
         * 영업 가능한 날짜 탐색
         * @param {String|Array|Moment} date
         * @param options
         * @returns {*}
         */
        seekAvailableDate : function(date, options){
            options = _.extend({
                exceptDates : this.EXCEPT_DATES,
                exceptWeekdays :this.EXCEPT_WEEKDAYS,
                isSeekByReverse : true, // 역방향 탐색, 휴일 앞날을 찾고 싶다면 역방향으로 해야 한다.
            }, options);

            date = safeDate(date);

            var availableDate;
            while(!availableDate){
                if(this.isAvailableDate(date, {
                    exceptDates : options.exceptDates,
                    exceptWeekdays : options.exceptWeekdays,
                    isSeekByReverse : options.isSeekByReverse
                })){
                    availableDate = date;
                } else {
                    date.add(options.isSeekByReverse ? -1 : 1, 'days');
                }
            }
            return availableDate;
        },

        /**
         * 월 내에서 가장 가까운 구독일 탐색
         * @param {Moment} date
         * @param options
         * @returns {*}
         */
        alignByMonthDay : function(date, options){
            options = _.extend({
                monthDays : this.MONTH_DAYS
            }, options);

            date = safeDate(date);
            var model = moment(date);

            for(var i=0; i<options.monthDays.length; i++){
                model.set('date', options.monthDays[i]);

                if(date.isSameOrBefore(model)){
                    date.set('date', options.monthDays[i]);
                    break;
                }
                else if(i === options.monthDays.length-1) {
                    // 모든 monthDays보다도 해당 날짜가 크면, 다음달 첫날걸로 셋팅하고 종료
                    date.add(1, 'months').set('date', options.monthDays[0]);
                }
            }

            return date;
        },

        dayMargin : function(date, options){
            options = _.extend({
                dayMargin : this.MONTH_DAY_MARGIN,
                baseDateTime : new Date()
            }, options);

            date = safeDate(date);
            var baseDateTime = moment(options.baseDateTime).startOf('date');
            var addDay = Math.max(0, baseDateTime.diff(date, 'days')+options.dayMargin);

            return date.add(addDay, 'days');
        },

        /**
         * 오늘 날짜인데 설정한 현재 영업시간을 초과하면 다음날로 넘김
         * @param date
         * @param options
         * @returns {moment.Moment | *}
         */
        businessHours : function(date, options){
            options = _.extend({
                closingTime : this.CLOSING_TIME,
                baseDateTime : new Date()
            }, options);

            if(!this.isInBusinessTime(date, options)){
                date = moment(options.baseDateTime).add(1,'days');
            }

            return date.startOf('date');
        },

        /**
         * 지금이 영업시간 안쪽인지 검사
         * @param date
         * @param options
         * @returns {moment.Moment | *}
         */
        isInBusinessTime : function(date, options){
            options = _.extend({
                closingTime : this.CLOSING_TIME,
                baseDateTime : new Date()
            }, options);

            var baseDateTime = moment(options.baseDateTime);

            date = safeDate(date);
            date.add(moment.duration(options.closingTime));

            return !baseDateTime.isAfter(date);
        }

    };

    return BizDateCalculator;


});
}(function(name, deps, factory){
    var i, dependencyNames = [], literalNames = [];
    for(i=0; i<deps.length; i++){
        if(typeof deps[i] === 'string'){
            deps[i] = [deps[i], deps[i]];
        }
        dependencyNames.push(deps[i][0]);
        literalNames.push(deps[i][1]);
    }

    // AMD
    if(typeof define === 'function' && define.amd) {
        define(dependencyNames, factory);
    }
    // CommonJS
    else if(typeof require === 'function' && typeof module !== 'undefined' && module.exports){
        module.exports = factory.apply(this, dependencyNames.map(require));
    }
    // 브라우저 script 엘리먼트
    else {
        var d, global = this, old = global[name], mod;
        i = 0;
        while(d = literalNames[i]){
            literalNames[i++] = this[d];
        }
        global[name] = mod = factory.apply(global, literalNames);
        global[name] = mod;
        mod.noConflict = function(){
            global[name] = old;
            return mod;
        };
    }
}));