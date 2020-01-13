(function(global){
    'use strict';

    /**
     * event list
     * based on $(document)
     *
     * cartCountLoad
     * cartLoad
     * cartAdd
     * cartSave
     * cartAddFail
     * cartDelete
     * cartMoveSeq
     *
     * example)
     * $(document).on('cartLoad', function(cartData){
     *     console.log(cartData.list);
     * });
     *
     */

    var config = {
        // imgPath : 'https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/',
        // saleRates : [],
        // shippingConfig : {},
        // prePaymentDay : null
    };

    var isCached = false;
    var cartData = {
        // list : [],
        // saleRate : 0,
        // totalPrice : 0,
        // totalDiscount : 0,
        // totalSalePrice : 0
    };
    var cartCount = 0;

    var ssInstance = new Utils.SessionStorage('hf-cart', {
        list : [],
        saleRate : 0,
        totalPrice : 0,
        totalDiscount : 0,
        totalSalePrice : 0
    });

    var calSaleRate = function(count){
        return 0;
        return count ?
            _.reduce(config.saleRates, function(result, item, i){
                if(config.saleRates[i].dr_amount <= count){
                    result = config.saleRates[i].dr_rate;
                }
                return result;
            }, 0)
            : 0
        ;
    };

    var requestValue = {
        mileage : 0,
        shippingFee : 0,
        directbuy : 'N'
    };

    // cartData 변수에 추가정보를 더 첨부한 뒤 캐싱
    var storeCartData = function(data){
        var listForCalc = _.map(data.list, function(item) {
            return {
                price : item.class_option_price_regular,
                salePrice : item.class_option_price_sale,
                quantity : item.cart_quantity,
                discounts : {
                    percent : 0, // TODO 각 할인정보는 cart에서 가져옴
                    amount : 0
                }
            }
        });

        var priceInfo = calcPrice(listForCalc, {
            havingMileage : data.havingMileage || 0,
            mileage : data.usedMileage || 0,
            shippingFee : data.shippingFee || 0
        });

        priceInfo.list = _.map(data.list, function(item, i){
            item.thumbnailUrl = Utils.getImageUrl('class', item.class_thumbnail, 'square');
            item.priceInfo = priceInfo.list[i];
            return item;
        });

        isCached = true;

        global.cart.count = cartCount = priceInfo.list.length;
        return global.cart.data = cartData = priceInfo;
    };

    function calcPrice(list, options){
        options = _.extend({
            havingMileage : 0,
            mileage : 0,
            shippingFee : 0,
            // discountRate : 0,
            // discountAmount : 0,
        }, options);

        var totalRegularPrice = 0,
            totalSalePrice = 0,
            totalPaymentPrice = 0,
            totalProductDiscount = 0,
            totalOrderDiscount = 0,
            usedMileage = 0,
            leftMileage = options.havingMileage;

        var newList = _.map(list, function(item) {
            item.optionPrice = item.optionPrice || 0;

            var price = item.price + item.optionPrice;
            var salePrice = item.salePrice + item.optionPrice;
            var discountValues = _.extend({
                percent : 0,
                amount : 0
            }, item.discounts);
            var addDiscount = Math.ceil(salePrice / 100 * discountValues.percent) + discountValues.amount;

            var unit = {
                quantity : item.quantity,
                price : price,
                salePrice : salePrice,
                productDiscount : price - salePrice,
                orderDiscount : addDiscount,
                paymentPrice : salePrice - addDiscount
            };

            var result = {
                unit : unit,
                price : unit.price * item.quantity,
                salePrice : unit.salePrice * item.quantity,
                productDiscount : unit.productDiscount * item.quantity,
                orderDiscount : unit.orderDiscount * item.quantity,
                paymentPrice : unit.paymentPrice * item.quantity
            };

            totalRegularPrice += result.price;
            totalSalePrice += result.salePrice;
            totalProductDiscount += result.productDiscount;
            totalOrderDiscount += result.orderDiscount;
            totalPaymentPrice += result.paymentPrice;

            return result;
        });

        totalPaymentPrice += options.shippingFee;

        usedMileage = Math.min(leftMileage, options.mileage, totalPaymentPrice);
        leftMileage -= usedMileage;

        totalPaymentPrice -= usedMileage;

        return {
            price : totalRegularPrice,          // 정가 (상품정가)
            salePrice : totalSalePrice,         // 판매가 (상품판매가 - 할인액)
            shippingFee : options.shippingFee,  // 배송료 (1회분만 발생, 추후 필요시 발송횟수에 따른 곱하기 적용)
            productDiscount : totalProductDiscount,  // 상품 할인액 (정가 - 판매가)
            orderDiscount : totalOrderDiscount,      // 주문 할인액 (판매가 - 쿠폰(퍼센트,금액) 가격할인)
            havingMileage : options.mileage,          // 사용된 마일리지
            usedMileage : usedMileage,          // 사용된 마일리지
            leftMileage : leftMileage,          // 사용 후 남은 마일리지
            paymentPrice : totalPaymentPrice,   // 결제가 (상품판매가 - 할인액 - 마일리지 + 배송료)
            list : newList
        }
    }

    var loadList = function(isIgnoreCache){
        var dfd = $.Deferred();
        if(isCached && !isIgnoreCache) {
            dfd.resolve(cartData);
        } else {
            if(User.isLoginCheck()) {
                ApiRequest.get('/cart', requestValue, function(res){
                    storeCartData(res);
                    $(document).trigger('cartLoad', [cartData]);
                    dfd.resolve(cartData);
                }, function(err){
                    dfd.reject(err);
                });
            } else {
                var filteredList = _.filter(ssInstance.get().list, function(item){
                    return item.cart_directbuy === requestValue.directbuy;
                });

                storeCartData({ list : filteredList});
                $(document).trigger('cartLoad', [cartData]);
                dfd.resolve(cartData);
            }
        }
        return dfd.promise();
    };

    var changeQuantity = function(cartIdx, quantity){
        var dfd = $.Deferred();

        var applyCartList = function(list){
            cartData.list = _.map(list, function(item){
                if(item.cart_idx === cartIdx){
                    item.cart_quantity = quantity;
                }

                return item;
            });

            storeCartData(cartData);
            $(document).trigger('cartChangeQuantity', [cartData]);
            dfd.resolve(cartData);

            return list;
        };

        if(User.isLoginCheck()) {
            ApiRequest.put('/cart/'+cartIdx+'/quantity', {
                "quantity" : quantity
            }, function(res){
                applyCartList(cartData.list);
            }, function(err){
                dfd.reject(err);
            });
        } else {
            cartData.list = applyCartList(ssInstance.get('list'));
            ssInstance.set('list', cartData.list);
        }

        return dfd.promise();
    };

    var changeSeq = function(cartIdx, direction){
        var dfd = $.Deferred();

        var currentItem = _.find(cartData.list, ['cart_idx', cartIdx]);
        if(
            !currentItem ||
            cartData.list.length === 1 ||
            (direction === 'forward' && currentItem.order === 1) ||
            (direction === 'backward' && currentItem.order === cartData.list.length)
        ){
            dfd.reject('카트 시퀀스를 움직일 수 없는 상황');
        }

        var changeCollectionSeq = function(list, cartIdx, direction){
            var plusIdx, minusIdx;
            if(direction === 'forward'){
                plusIdx  = _.findIndex(list, ['cart_idx', cartIdx])-1;
                minusIdx = _.findIndex(list, ['cart_idx', cartIdx]);
            } else if(direction === 'backward'){
                plusIdx  = _.findIndex(list, ['cart_idx', cartIdx]);
                minusIdx = _.findIndex(list, ['cart_idx', cartIdx])+1;
            }
            list[plusIdx].cart_order++;
            list[minusIdx].cart_order--;

            list = _.sortBy(list, ['cart_order']);

            return list;
        };

        if(User.isLoginCheck()) {
            ApiRequest.put('/cart/'+cartIdx, {
                "order" : { 'forward' : 'increase', 'backward' : 'decrease'}[direction]
            }, function(res){
                cartData.list = changeCollectionSeq(cartData.list, cartIdx, direction);
                storeCartData(cartData);
                $(document).trigger('cartChangeSeq', [cartData]);
                dfd.resolve(cartData);
            }, function(err){
                dfd.reject(err);
            });
        } else {
            var ssList = ssInstance.get('list');
            ssList = changeCollectionSeq(ssList, cartIdx, direction);
            ssInstance.set('list', ssList);

            cartData.list = changeCollectionSeq(cartData.list, cartIdx, direction);
            storeCartData(cartData);
            $(document).trigger('cartChangeSeq', [cartData]);
            dfd.resolve(cartData);
        }
        return dfd.promise();
    };

    var addItem = function(data, options){
        options = _.extend({
            isRunInSS : false,
            isAutoReload : true,
            isDirectBuy : false
        }, options);

        var dfd = $.Deferred();

        if(User.isLoginCheck() && !options.isRunInSS) {
            ApiRequest.post('/cart', {
                "class_idx": data.class_idx,
                "class_option_id": data.class_option_id,
                'quantity' : data.cart_quantity,
                'directbuy' : data.cart_directbuy
            }, function(res){
                if(options.isAutoReload) loadList(true);
                dfd.resolve(data);
            }, function(err){
                // err.responseJSON.error 텍스트 목록
                // 'Validation failed'
                // 'full of cart' > 6개 이상 못 담음
                // 'duplicated'
                // 'class not found'

                dfd.reject( (err.responseJSON && err.responseJSON.error) || err );
            });
        } else {
            var ssList = ssInstance.get('list');

            if(options.isDirectBuy) {
                // 기존 즉시구매 항목 제거
                _.remove(ssList, function(item){
                    return item.cart_directbuy === 'Y';
                });
            }

            if(!options.isDirectBuy && _.find(ssList, function(o){
                return o.class_idx === data.class_idx && o.class_option_id === data.class_option_id && o.cart_directbuy === 'N';
            })){
                dfd.reject('duplicated');
            } else {
                data = _.extend(data, {
                    cart_idx : new Date().getTime(),
                    cart_order : ssList.length+1,
                    cart_directbuy : options.isDirectBuy ? 'Y' : 'N'
                });
                ssList.push(data);

                ssInstance.set('list', ssList);
                if(options.isAutoReload) {
                    loadList(true);
                }
                dfd.resolve(data);
            }
        }

        return dfd.promise();
    };

    var addItems = function(list, options){
        var dfd = $.Deferred();

        if(options.orderByCartOrder && list.length && list[0].cart_order !== undefined) { // asc or desc
            list = _.sortBy(list, ['cart_order'], [options.orderByCartOrder]);
        }

        var deferredList = _.map(list, function(obj){
            return addItem(obj, _.extend({}, options, {
                isAutoReload : false
            }));
        });

        $.when.apply(null, deferredList)
            // 중복저장, 갯수초과 등등의 이유로 오류가 리턴될 수 있어, 그냥 모든 상황 ok라고 간주
            // TODO 카트 개수제한을 풀거나 별개의 응답값을 주어 해결
            .always(function(a){
                if(options.isAutoReload){
                    loadList(true).done(function(cartData){
                        dfd.resolve(cartData, arguments);
                    });
                } else {
                    dfd.resolve();
                }
            })
        ;

        return dfd.promise();
    };

    var deleteItem = function(cartIdx){
        var dfd = $.Deferred();

        if(User.isLoginCheck()) {
            ApiRequest.delete('/cart/' + cartIdx, {}, function(){
                return loadList(true)
                    .done(function(data){
                        $(document).trigger('cartDelete', [cartData]);
                        dfd.resolve();
                    });
            }, function(err){
                dfd.reject(err);
            });
        } else {
            var ssList = ssInstance.get('list');

            _.remove(ssList, function(obj){
                return obj.cart_idx === cartIdx;
            });

            // order 재정렬
            _.map(ssList, function(obj, i){
                obj.order = i + 1;
                return obj;
            });

            ssInstance.set('list', ssList);
            storeCartData(ssInstance.get());
            $(document).trigger('cartDelete', [cartData]);
            $(document).trigger('cartLoad', [cartData]);
            dfd.resolve();
        }

        return dfd.promise();
    };

    var saveToAccount = function(){
        return addItems(ssInstance.get('list'), {
            isRunInSS : false,
            isAutoReload : false,
            orderByCartOrder : 'desc'
        }).done(function(cartData){
            ssInstance.reset();
        });
    };

    global.cart = {
        /**
         * @method cart.init
         */
        init : function() {
            // var dfd = $.Deferred();

            config = {
                imgPath : HF.DATA.s3.uri + '/class/thumbs/',
                saleRates : HF.DATA.saleRates,
                shippingConfig : HF.DATA.config.config_shippingdate,
                prePaymentDay : parseInt(HF.DATA.config.config_prepaymentday)
            };

            return this.getCount();
        },

        /**
         * @method cart.refresh
         * @return Deferred.promise
         */
        refresh : function(){
            return loadList(true);
        },

        data : cartData,

        count : cartCount,

        setOptions : function(options){
            requestValue = options;
        },

        /**
         * @method cart.getCount
         * @return Deferred.promise
         */
        getCount : function(){
            return (function(){
                if(User.isLoginCheck()) {
                    return ApiRequest.get('/cart/count').then(function(r){ return r.count; });
                } else {
                    return loadList(true).then(function(r){ return r.list.length; });
                }
            })().then(function(r){
                global.cart.count = cartCount = r;
                $(document).trigger('cartCountLoad', r);
                return r;
            });
        },

        /**
         * @method cart.addItem
         * @param data
         * @param data.cart_quantity 필수
         * @param data.class_idx 필수
         * @param [data.class_thumbnail] 미로그인시 필수
         * @param [data.class_name] 미로그인시 필수
         * @param [data.class_price_regular] 미로그인시 필수
         * @param [data.class_price] 미로그인시 필수
         * @param [data.class_option_id] 미로그인시 필수
         * @param [data.class_option_name] 미로그인시 필수
         * @param [data.isDirectBuy] 미로그인시 필수
         * @return Deferred.promise
         */
        addItem : function(data, options){
            return addItem(data, options).done(function (res) {
                if(options.isDirectBuy)
                    $(document).trigger('cartBuyAdd', res);
                else
                    $(document).trigger('cartAdd', res);
            }).fail(function (res) {
                $(document).trigger('cartAddFail', res);
            });
        },

        /**
         *
         * @param {Array} list
         * @param {Object} options
         */
        addItems : function(list, options){
            options = _.extend({
                isAutoReload : true,
                isTrigEvent : true
            }, options);

            return addItems(list, options).done(function (res) {
                if(options.isTrigEvent) $(document).trigger('cartAdd', res);
            }).fail(function (res) {
                if(options.isTrigEvent) $(document).trigger('cartAddFail', res);
            });
        },

        /**
         * @method cart.getList
         */
        getList : function (options) {
            options = options || {};
            return loadList(options.isIgnoreCache, options);
        },

        /**
         * @method cart.delItem
         * @param cartIdx
         * @return Deferred.promise
         */
        deleteItem : deleteItem,

        /**
         * @method cart.getCount
         * @param cartIdx
         * @param direction forward, backward
         * @return Deferred.promise
         */
        changeSeq : changeSeq,

        /**
         * @method cart.changeQuantity
         * @param cartIdx
         * @param direction forward, backward
         * @return Deferred.promise
         */
        changeQuantity : changeQuantity,

        /**
         * 세션스토리지의 데이터를 로그인계정으로 저장한다
         * @method cart.saveToAccount
         * @return Deferred.promise
         */
        saveToAccount : function(){
            return saveToAccount().done(function(res){
                $(document).trigger('cartSave', res);
            });
        }
    };
})(window);