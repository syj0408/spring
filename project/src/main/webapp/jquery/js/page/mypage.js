/**
 * Created by Nalrarang on 2017. 4. 4
 */
/**
 Mypage화면 Script File
 @namespace Mypage
 @author nalrarang@gmail.com
 @logs 20170404:Nalrarang update

 */

var Mypage = (function () {
    var MyProfile = {};
    var IMG_URL = null; //'https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/';
    var myMenu = '';
    var addressParam = {};
    var orderReplace = {
        '1': '첫번째',
        '2': '두번째',
        '3': '세번째',
        '4': '네번째',
        '5': '다섯번째',
        '6': '여섯번째'
    };

    var orderDetailClass = {};
    var orderDetailData = {};

    var subScriptDataList = {};

    var addressData = {};
    var rate = 0;

    var star = 0;
    var files = [];

    var reviewData = [];
    var cri_list = [];
    var reviewFileLength = 0;

    var photoIdx = 0;
    var img_list = [];


    var orderPage = 1;
    var orderAmount = 6;
    var orderTotal = 0;
    var subScriptPage = 1;
    var subScriptAmount = 3;
    var subScriptTotal = 0;
    var addressPage = 1;
    var addressAmount = 5;
    var addressTotal = 0;
    var commentPage = 1;
    var commentAmount = 6;
    var commentTotal = 0;
    var reviewPage = 1;
    var reviewAmount = 6;
    var reviewTotal = 0;
    var qnaPage = 1;
    var qnaAmount = 6;
    var qnaTotal = 0;
    var mileagePage = 1;
    var mileageAmount = 6;
    var mileageTotal = 0;
    var couponPage = 1;
    var couponAmount = 6;
    var couponTotal = 0;
    var favoritePage = 1;
    var favoriteAmount = 6;
    var favoriteTotal = 0;

    var deliveryPage = 1;
    var deliveryAmount = 3;
    var deliveryTotal = 0;

    var phoneNum = '';
    var isAuth = '';

    var router = function(isLogHistory, param){
        param = param || {};

        if(!param.m || !param.s) {
            console.error('메뉴값 누락');
            return;
        }

        if(isLogHistory) {
            if(window.history.pushState) {
                window.history.pushState({isRouter: true}, null, '?' + $.param(param));
            } else {
                // location.href = '?' + $.param(param);
            }
        }

        $('.btn-mymenu').removeClass('btn-mymenu-on');
        $('.btn-mymenu-sub').removeClass('btn-mymenu-sub-on');
        $('.mymenu-sub').hide();

        $('.btn-mymenu[data-submenu="mymenu-' +param.m+ '"]').addClass('btn-mymenu-on');
        $('.btn-mymenu-sub.mymenu-'+param.m+'[data-submenu="' +param.s+ '"]').addClass('btn-mymenu-sub-on');
        $('.btn-mymenu-sub.mymenu-'+param.m).parent().show();

        $('.mymenu-sub-list').removeClass('submenu-slide');

        $('.mymenu-content').empty();
        $('.reply-info-wrap').empty();
        $('.reply-info-wrap').removeClass('reply-info-on');
        $('.mymenu-sub-tab-wrap').removeClass('block').empty();

        orderPage = 1;
        orderAmount = 6;
        subScriptPage = 1;
        subScriptAmount = 3;
        addressPage = 1;
        addressAmount = 5;
        commentPage = 1;
        commentAmount = 6;
        qnaPage = 1;
        qnaAmount = 6;
        mileagePage = 1;
        mileageAmount = 6;
        couponPage = 1;
        couponAmount = 6;
        favoritePage = 1;
        favoriteAmount = 6;

        var pages = {
            'order' : {
                '_init' : function() {
                    var html = '';
                    html += '<div class="order-list-wrap"></div>';
                    html += '<div class="order-detail-wrap"></div>';
                    $('.mymenu-content').append(html);
                },
                'order': function () {
                    $('.order-list-wrap').show();
                    $('.order-detail-wrap').hide();

                    orderPage = param.page || 1;
                    getOrderList();
                },
                'orderDetail': function () {
                    getDetailOrder(param.order_id);
                },
                'cancel': function () {
                    $('.order-list-wrap').show();
                    $('.order-detail-wrap').hide();
                    getCancelList();
                }
            },
            'subscript' : {
                '_init': function () {
                    var html = '';
                    html += '<div class="standing-order-wrap"></div>';
                    html += '<div class="standing-order-edit-wrap"></div>';
                    html += '<div class="edit-payment-wrap"></div>';
                    $('.mymenu-content').append(html);
                },
                'subscript': function () {
                    $('.standing-order-wrap').show();
                    $('.standing-order-edit-wrap').hide();
                    $('.edit-payment-wrap').hide();
                    getSubscriptList();
                },
                'payment': function () {
                    $('.standing-order-wrap').hide();
                    $('.standing-order-edit-wrap').hide();
                    $('.edit-payment-wrap').show();
                    getEditPayment();
                },
            },
            'address' : {
                '_init' : function() {
                    var html = '';
                    html += '<div class="delivery-list-wrap"></div>';
                    html += '<div class="edit-delivery-wrap"></div>';
                    $('.mymenu-content').append(html);
                },
                'addresslist' : function(){
                    getDeliveryList();
                },
                'newaddress' : function(){
                    setEditDelivery();
                },
            },
            'action-history' : {
                '_init' : function() {
                    var html = '';
                    html += '<div class="view-reply-wrap"></div>';
                    html += '<div class="reply-class-wrap"></div>';
                    html += '<div class="reply-class-list-wrap"></div>';
                    html += '<div class="direct-ask-wrap"></div>';
                    html += '<div class="write-ask-wrap"></div>';
                    html += '<div class="mileage-wrap"></div>';
                    html += '<div class="coupon-wrap"></div>';
                    $('.mymenu-content').append(html);
                },
                'comment' : function(){
                    $('.mymenu-action-history').parent().show();
                    $('.view-reply-wrap').show();
                    $('.reply-class-wrap').hide();
                    $('.reply-class-list-wrap').hide();
                    $('.direct-ask-wrap').hide();
                    $('.write-ask-wrap').hide();
                    $('.mileage-wrap').hide();
                    $('.coupon-wrap').hide();

                    $('.mymenu-sub-tab-wrap').addClass('block').empty();

                    $('.reply-info-wrap').empty();
                    $('.reply-info-wrap').removeClass('reply-info-on');

                    setMyCommentListTab(param.type || 'magazine');
                },
                'review' : function(){
                    $('.mymenu-action-history').parent().show();
                    $('.sub-menu-review').addClass('btn-mymenu-sub-on');
                    $('.view-reply-wrap').hide();
                    $('.reply-class-wrap').show();
                    $('.reply-class-list-wrap').show();
                    $('.direct-ask-wrap').hide();
                    $('.write-ask-wrap').hide();
                    $('.mileage-wrap').hide();
                    $('.coupon-wrap').hide();
                    $('.mymenu-sub-tab-wrap').addClass('block');

                    $('.reply-info-wrap').empty();

                    setMyClassReviewTab(param.type || 'writer');
                },
                'qna' : function(){
                    $('.mymenu-action-history').parent().show();
                    $('.sub-menu-qna').addClass('btn-mymenu-sub-on');
                    $('.view-reply-wrap').hide();
                    $('.reply-class-wrap').hide();
                    $('.reply-class-list-wrap').hide();
                    $('.direct-ask-wrap').show();
                    $('.write-ask-wrap').hide();
                    $('.mileage-wrap').hide();
                    $('.coupon-wrap').hide();

                    $('.mymenu-sub-tab-wrap').empty();
                    $('.reply-info-wrap').empty();

                    if(param.action === 'write') {
                        drawWriteQnaForm();
                    } else {
                        setQnaList();
                    }

                    // if action is write setTimeout(drawWriteQnaForm, 300);
                },
                'mileage' : function(){
                    $('.mymenu-action-history').parent().show();
                    $('.sub-menu-mileage').addClass('btn-mymenu-sub-on');
                    $('.view-reply-wrap').hide();
                    $('.reply-class-wrap').hide();
                    $('.reply-class-list-wrap').hide();
                    $('.direct-ask-wrap').hide();
                    $('.write-ask-wrap').hide();
                    $('.mileage-wrap').show();
                    $('.coupon-wrap').hide();


                    $('.mymenu-sub-tab-wrap').empty();
                    $('.reply-info-wrap').empty();

                    getMileage();
                },
                'coupon' : function(){
                    $('.mymenu-action-history').parent().show();
                    $('.sub-menu-coupon').addClass('btn-mymenu-sub-on');
                    $('.view-reply-wrap').hide();
                    $('.reply-class-wrap').hide();
                    $('.reply-class-list-wrap').hide();
                    $('.direct-ask-wrap').hide();
                    $('.write-ask-wrap').hide();
                    $('.mileage-wrap').hide();
                    $('.coupon-wrap').show();


                    $('.mymenu-sub-tab-wrap').empty();
                    $('.reply-info-wrap').empty();

                    getCoupon();
                }
            },
            'myinfo' : {
                '_init' : function() {
                    var html = '';
                    html += '<div class="edit-membership-wrap"></div>';
                    html += '<div class="change-pw-wrap"></div>';
                    html += '<div class="quit-membership-wrap"></div>';
                    $('.mymenu-content').append(html);
                    $('.mymenu-sub-list').removeClass('submenu-slide');
                },
                'profile' : function(){
                    $('.edit-membership-wrap').show();
                    $('.change-pw-wrap').hide();
                    $('.quit-membership-wrap').hide();

                    setProfileEdit();
                },
                'password' : function(){
                    $('.edit-membership-wrap').hide();
                    $('.change-pw-wrap').show();
                    $('.quit-membership-wrap').hide();

                    $('.change-pw-wrap').empty();

                    setChangePassword();
                },
                'exit' : function(){
                    $('.edit-membership-wrap').hide();
                    $('.change-pw-wrap').hide();
                    $('.quit-membership-wrap').show();

                    $('.quit-membership-wrap').empty();

                    setExitUser();
                }
            },
            'favorite' : {
                '_init' : function() {
                    $('.mymenu-content').empty();
                    $('.reply-info-wrap').empty();
                    $('.mymenu-sub-tab-wrap').empty();

                    var html = '';
                    html += '<div class="favorite-wrap"></div>';
                    $('.mymenu-content').append(html);

                },
                'class' : function(){
                    drawFavoriteHobbyClass();
                },
                'magazine' : function(){
                    drawFavoriteMagazine();
                }
            }
        };

        if(!pages[param.m] || !pages[param.m][param.s]) {
            console.log('페이지 이름 인맞음');
            return;
        }

        pages[param.m]._init();
        pages[param.m][param.s]();
    };

    var getBasicInfo = function () {
        rate = HF.DATA.saleRates;
        getMyProfile();
        getMyInfo();
    };

    var getMyProfile = function () {
        User.getUserInfo(true).then(function(userInfo){
            MyProfile = { userinfo : HF.DATA.user };
            phoneNum = MyProfile.userinfo.user_phone;
            isAuth = MyProfile.userinfo.user_phone_verify;
            setMyProfile();
        });
    };
    var getMyInfo = function () {
        ApiRequest.get('/user/counter', {}, function (res) {
            console.log(res);
            $('.my-level').text(HF.CODE.userLevel[res.level]);
            $('.my-class').text(res.myclass);
            $('.my-coupon').text(res.coupon);
            $('.my-point').text(Utils.numberWithCommas(parseInt(res.mileage)) + 'p');
        }, function (err) {
            console.log(err);
        });
    };

    var setMyProfile = function () {
        $('.profile-name').text(MyProfile.userinfo.user_nickname + '님');
        var profile_img = '';
        if (MyProfile.userinfo.user_profileimage) {
            profile_img = IMG_URL + 'profile/' + MyProfile.userinfo.user_profileimage.replace('-small.', '-thumb1.') + '?' + Math.random();
        } else {
            profile_img = '../static/img/bg-add-thumb.png';
        }
        $('.thumb-profile').attr('src', profile_img);
    };


    var getOrderList = function () {
        ApiRequest.get('/order', {
            "amount": orderAmount,
            "page": orderPage,
            "tree": 'Y'
        }, function (res) {
            console.log(res);
            orderTotal = res.count;
            drawOrderList(res);
        }, function (err) {

        });
    };
    var drawOrderList = function(res){
        res.list = _.map(res.list, function(item){
            item.disp_order_regdate = moment(item.order_regdate).format('YYYY. M. D');

            item.classList.map = _.map(item.classList, function(classItem) {
                classItem.disp_class_thumbnail = Utils.getImageUrl('class', classItem.class_thumbnail, 'square');
                return classItem;
            });
            return item;
        });

        res.totalPage = (orderTotal / orderAmount);
        res.orderPage = orderPage;
        res.stateCode = HF.CODE.orderState;

        $('.order-list-wrap').html($("#orderListTemplate").render(res));
    };

    var adrawOrderList = function (res) {
        $('.order-list-wrap').empty();
        $('.order-list-wrap').removeClass('return-list-wrap');

        var html = '';
        if (res.list.length == 0) {
            html += '<div class="no-view-wrap">';
            html += '<div class="no-view-tit">아직 주문하신 클래스가 없습니다.</div>';
            html += '<div class="no-view-txt">';
            html += '새로운 클래스를 구독해주세요.';
            html += '</div>';
            html += '<a href="/class.html" title="클래스 보러가기" class="btn-no-view">클래스 보러가기</a>';
            html += '</div>';
        } else {
            $.each(res.list, function () {
                html += '<div class="order-list-cont">';
                html += '<div class="order-list-area">';
                html += '<div class="order-list-thumb">';
                html += '<img src="' + IMG_URL + 'class/thumbs/' + this.thumbnail_image.replace('-resize', '-square') + '" alt="" class="thumb-order-list" />';
                html += '</div>';
                // html += '<div class="order-list-date">';
                // html += '<div class="order-list-tit">주문일자</div>';
                // html += '<div class="order-list-txt">'+ moment(this.order_regdate).format("YYYY-MM-DD") +'</div>';
                // html += '</div>';
                // html += '<div class="order-list-num -m">';
                // html += '<div class="order-list-tit">주문번호</div>';
                // html += '<div class="order-list-txt">' + this.order_idx + '-' + this.oc_idx + '</div>';
                html += '</div>';
                html += '<div class="order-list-name">';
                html += '<div class="order-list-tit">클래스명</div>';
                html += '<a href="/product/' + this.class_uid + '">';
                html += '<div class="order-list-txt">' + this.class_name + '</div>';
                html += '<span class="i-option">'+ this.class_option_name +'</span>';
                html += '</a>';
                html += '</div>';
                html += '<div class="order-list-price -m">';
                html += '<div class="order-list-tit">결제 금액</div>';
                var discount = this.order_discount;
                var priceIdx = _.findIndex(rate, function (o) {
                    return o.dr_rate == discount;
                });
                if (priceIdx < 0) priceIdx = 0;
                var amount = rate[priceIdx].dr_amount;

                html += '<div class="order-list-txt">' + Utils.numberWithCommas(parseInt(this.oc_price) + parseInt(this.order_shippingprice)) + '원</div>';
                // html += '<div class="order-list-txt-point">(정기구독할인 ' + this.order_discount + '%)</div>';
                html += '</div>';
                html += '<div class="order-list-state">';
                html += '<div class="order-list-tit">주문상태</div>';
                html += '<div class="order-list-txt">' + HF.CODE.orderState[this.oc_status] + '</div>';
                if (this.oc_status === 'STANBY') {
                    html += '<div class="order-list-txt-point">(결제일 : ' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format('YYYY.MM.DD') + ')</div>';
                }
                html += '</div>';
                html += '<div class="order-list-btn">';
                if (this.oc_status == "ONSHIPPING") {
                    html += '<a href="http://nexs.cjgls.com/web/info.jsp?slipno=' + this.oc_shippingnumber + '" target="_blank" title="배송조회" class="btn-order-list btn-order-on2 btn-search-delivery btn-order-delivery">배송조회</a>';
                } else if (this.oc_status == "COMPLETE") {
                    html += '<a href="/mypage.shop?m=action-history&s=review" title="구매후기" class="btn-order-list btn-order-on2 btn-search-delivery btn-buy-review">구매후기</a>';
                } else if (this.oc_status == "SHIPPED") {
                    html += '<a href="/mypage.shop?m=action-history&s=review" title="구매후기" class="btn-order-list btn-order-on2 btn-search-delivery btn-buy-review">구매후기</a>';
                    // html += '<a href="#link" title="구매확정" data-order-id="'+ this.oc_idx +'" class="btn-order-list btn-order-on2 btn-search-delivery btn-buy-complete">구매확정</a>';                                 
                } else if (this.oc_status == "PREPARESHIPPING" || this.oc_status == "STANBY" || this.oc_status == "PAYED") {
                    html += '<a href="#link" title="배송조회" class="btn-order-list btn-search-delivery">배송조회</a>';
                }
                html += '<a href="/mypage.shop?m=order&s=orderDetail&order_id=' +this.order_idx+ '" title="상세내역" data-order-id="' + this.order_idx + '" class="btn-order-list btn-search-delivery btn-order-on btn-order-detail">상세내역</a>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            });
            /* Paging */
            var totalPage = Math.ceil(orderTotal / orderAmount);
            html += '<div class="paging-num-wrap">';
            for (var i = 1; i <= totalPage; i++) {
                if (orderPage == i) {
                    html += '<a href="/mypage.shop?m=order&s=order&page=' +i+ '" title="' + i + '" data-page="' + i + '" class="order-page-btn btn-num btn-num-on">' + i + '</a>';
                } else {
                    html += '<a href="/mypage.shop?m=order&s=order&page=' +i+ '" title="' + i + '" data-page="' + i + '" class="order-page-btn btn-num">' + i + '</a>';
                }
            }
            html += '</div>';
        }
        $('.order-list-wrap').append(html);

        $('.order-page-btn').off('click').on('click', function () {
            orderPage = parseInt($(this).attr('data-page'));
            getOrderList();
        });
        $('.btn-order-delivery').off('click').on('click', function () {

        });
        $('.btn-buy-complete').off('click').on('click', function () {
            var order_idx = $(this).attr('data-order-id');

            ApiRequest.put("/order/" + order_idx + "/status", {
                "status": "COMPLETE"
            }, function (res) {
                console.log(res);
                Popup.alert("구매확정 완료", "배송받으신 상품이 구매확정 되었습니다.", "확인", function () {
                    Popup.hide();
                    getOrderList();
                });
            }, function (err) {
                console.log(err);
            });
        });

    };

    var getDetailOrder = function (order_id) {
        ApiRequest.get("/subscript/" + order_id, {}, function (res) {
            console.log(res);
            drawOrderDetail(res);
        }, function (err) {
            console.log(err);
        });
    };

    var drawOrderDetail = function (res) {
        orderDetailClass = res.class;
        orderDetailData = res.order;
        var isShippingChange = true;
        $('.order-detail-wrap').empty();
        var html = '';

        html += '<div class="order-detail-tit">주문 상세 내역</div>';
        html += '<div class="order-detail-tit-sub">';
        html += '<span>주문번호</span><span class="order-num">' + res.order[0].order_id + '</span>';

        html += '</div>';
        html += '<div class="order-detail-cont">';
        html += '<div class="order-detail-area">';

        $.each(res.class, function (idx) {
            html += '<div class="order-detail-info">';
            if (idx == 0) {
                html += '<div class="order-detail-info-tit">주문 내역</div>';
            } else {
                html += '<div class="order-detail-info-tit" style="display:none;"></div>';
            }
            html += '<div class="order-detail-info-btn s-' +this.oc_status+ '">';
            if (this.oc_status == "ONSHIPPING" || this.oc_status == "SHIPPED") {
                html += '<a href="#link" title="교환신청" data-class-idx="' + this.class_idx + '" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" data-arr-idx="' + idx + '" class="btn-order-detail-info order-change-btn">교환신청</a>';
                html += '<a href="#link" title="반품신청" data-class-idx="' + this.class_idx + '" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" data-arr-idx="' + idx + '" class="btn-order-detail-info order-return-btn">반품신청</a>';
                isShippingChange = false;
            } else if (idx == 0 && (this.oc_status == "STANBY" || this.oc_status == "PAYED")) {
                html += '<a href="#link" data-class-idx="' + this.class_idx + '" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" data-arr-idx="' + idx + '"';
                html += 'title=전체 주문취소" class="btn-order-detail-info order-cancel-btn">전체 주문취소</a>';
            } else {
            }
            html += '</div>';
            html += '<div class="order-detail-thumb">';
            html += '<img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" class="thumb-order-detail" alt="" />';
            html += '</div>';
            html += '<div class="order-detail-info-cont">';
            html += '<table summary="주문내역 테이블" class="table-order-detail-info">';
            html += '<colgroup>';
            html += '<col class="order-detail-th-width" />';
            html += '<col class="order-detail-td-width" />';
            html += '</colgroup>';
            html += '<tbody>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">클래스명</th>';
            html += '<td class="td-order-detail-info">' + this.class_name + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">옵션</th>';
            html += '<td class="td-order-detail-info">' + this.class_option_name + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문수량</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(this.oc_quantity) + '개</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문일시</th>';
            html += '<td class="td-order-detail-info">' + moment(this.oc_regdate).format("YYYY.MM.DD. HH:mm") + '</td>';
            html += '</tr>';
            // html += '<tr>';
            // html += '<th class="th-order-detail-info">주문번호</th>';
            // html += '<td class="td-order-detail-info">' + this.order_idx + '-' + this.oc_idx + '</td>';
            // html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문상태</th>';
            html += '<td class="td-order-detail-info">' + HF.CODE.orderState[this.oc_status] + '</td>';
            html += '</tr>';

            if(!/(REFUND|EXCHANGE|CANCEL)/.test(this.oc_status)) {
                html += '<tr>';
                html += '<th class="th-order-detail-info">' + (this.oc_paymentdate ? '결제일' : '결제 예정일') + '</th>';
                html += '<td class="td-order-detail-info">' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format('YYYY.MM.DD') + '</td>';
                html += '</tr>';
                html += '<tr>';
                html += '<th class="th-order-detail-info">' + (this.oc_shippingdate ? '배송일' : '배송 예정일') + '</th>';
                html += '<td class="td-order-detail-info">' + moment(this.oc_shippingdate || this.oc_shippingdate_tobe).format('YYYY.MM.DD') + '</td>';
                html += '</tr>';
            }

            html += '<tr>';
            html += '<th class="th-order-detail-info">정가</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(this.oc_originprice) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">할인액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(this.oc_orderdiscount+this.oc_productdiscount) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">구매가</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(this.oc_paymentamount) + '원</td>';
            html += '</tr>';

            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';
        });
        html += '</div>';

        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">결제 정보</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="결제정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tfoot>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">결제 금액</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(res.order[0].order_paymentamount) + '원</td>';
        html += '</tr>';
        html += '</tfoot>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">결제방법</th>';
        html += '<td class="td-order-detail-info">';
        if(res.order[0].order_paymentamount) {
            html += '신용카드';
        } else if(res.order[0].order_mileage) {
            html += '마일리지';
        } else {
            html += '이벤트';
        }
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주문일</th>';
        html += '<td class="td-order-detail-info">' + moment(res.order[0].order_regdate).format("YYYY.MM.DD. HH:mm") + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">신청한 금액 합계</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.order[0].order_originprice)) + '원</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">구매 할인</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas((res.order[0].order_originprice - res.order[0].order_price) * -1) + '원</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">마일리지 할인</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.order[0].order_mileage) * -1) + 'p</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">배송비</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.order[0].order_shippingprice)) + '원</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">최종 금액</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(res.order[0].order_paymentamount) + '원</td>';

        html += '</tr>';

        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">배송지 정보</div>';
        if (isShippingChange) {
            html += '<div class="order-detail-info-btn">';
            html += '<a href="#changeaddress" data-order-idx="' + res.order[0].order_idx + '" title="배송지 변경" class="btn-order-detail-info change-address">배송지 변경</a>';
            html += '</div>';
        }
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">받는사람</th>';
        html += '<td class="td-order-detail-info order-address-receivename">' + res.order[0].order_receivename + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">휴대폰번호</th>';
        html += '<td class="td-order-detail-info order-address-receivephone">' + res.order[0].order_receivephone + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주소</th>';
        html += '<td class="td-order-detail-info order-address-receiveaddress">' + res.order[0].order_receiveaddress + ' ' + res.order[0].order_receiveaddressdetail + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">배송 요청사항</th>';
        if (res.order[0].order_receivecomment == null) {
            res.order[0].order_receivecomment = "";
        }
        html += '<td class="td-order-detail-info">' + res.order[0].order_receivecomment + '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="order-detail-btn">';
        html += '<a href="#link" title="주문 확인서 인쇄하기" class="btn-back-list btn-print-order">주문 확인서 인쇄하기</a>';
        html += '<a href="/mypage.shop?m=order&s=order" class="btn-back-list btn-back-order-list">주문 목록으로 돌아가기</a>';
        html += '</div>';
        $('.order-detail-wrap').append(html);

        $('.order-list-wrap').hide();
        $('.order-detail-wrap').show();

        $('.btn-print-order').off('click').on('click', function () {
            $('.order-detail-wrap').printThis({
                debug: false,
                importCSS: true,
                printContainer: true,
                pageTitle: "",
                removeInline: false
            });
        });

        $('.order-cancel-btn').off('click').on('click', function () {
            var class_idx = $(this).attr('data-class-idx');
            var order_idx = $(this).attr('data-order-idx');
            var oc_idx = $(this).attr('data-oc-idx');
            var arr_idx = parseInt($(this).attr('data-arr-idx'));

            var msg;

            if(orderDetailData[0].order_type === 'SUBSCRIPTION') {
                msg = "정말로 주문 취소하시겠습니까?<br>이미 발송된 제품을 제외한 나머지는 일괄 취소됩니다.";
            } else {
                msg = "정말로 주문을 취소하시겠습니까?"
            }

            Popup.confirm("주문 취소", msg,
                "취소", "주문 취소하기",
                function () {
                    Popup.hide();
                }, function () {
                    Popup.hide();

                    ApiRequest.get("/order/" + oc_idx + "/status/cancel", {}, function (res) {
                        drawOrderCancelPopup(orderDetailClass, orderDetailData[0], arr_idx, res);
                    });
                });
        });
        $('.order-change-btn').off('click').on('click', function () {
            var class_idx = $(this).attr('data-class-idx');
            var order_idx = $(this).attr('data-order-idx');
            var oc_idx = $(this).attr('data-oc-idx');
            var arr_idx = parseInt($(this).attr('data-arr-idx'));


            Popup.confirm("교환 신청", "교환 신청하시겠습니까?<br>교환은 접수된 내용을 확인 후 진행됩니다.",
                "취소", "교환 신청하기",
                function () {
                    Popup.hide();
                }, function () {
                    Popup.hide();
                    drawOrderChangePopup(orderDetailClass, orderDetailData[0], arr_idx);
                });
        });

        $('.order-return-btn').off('click').on('click', function () {
            var class_idx = $(this).attr('data-class-idx');
            var order_idx = $(this).attr('data-order-idx');
            var oc_idx = $(this).attr('data-oc-idx');
            var arr_idx = parseInt($(this).attr('data-arr-idx'));

            Popup.confirm("반품 신청", "정말로 반품 신청하시겠습니까?<br>반품 처리는 접수된 내용을 확인 후 진행됩니다.",
                "취소", "반품 신청하기",
                function () {
                    Popup.hide();
                }, function () {
                    Popup.hide();
                    ApiRequest.get("/order/" + oc_idx + "/status/refund", {}, function (res) {
                        drawOrderReturnPopup(res, arr_idx, oc_idx);
                    });
                });
        });

        $('.change-address').off('click').on('click', function () {
            /*deliveryAmount = 3; deliveryPage = 1;
            var order_idx = $(this).attr('data-order-idx');
            getAddressList(order_idx);
            */
            Popup.confirm("배송지 정보 변경", "배송지 변경이 필요하세요?<br>1:1 문의를 남겨주세요.", "취소", "확인", function () {
                Popup.hide();
            }, function () {
                Popup.hide();
                router(true, {
                    'm' : 'action-history',
                    's' : 'qna',
                    'action' : 'write'
                });
            });
        });
    };

    /* 주문취소 팝업 */
    var drawOrderCancelPopup = function (classList, order, arr_idx, data) {
        $('#cancel-wrap').remove();
        var returnPrice = 0;
        var returnNum = 0;

        var html = '';

        html += '<div class="layer-wrap cancel-wrap" id="cancel-wrap">';
        html += '<div class="bg-layer-wrap" onclick="hideCancel();"></div>';
        html += '<div class="cancel-cont">';
        html += '<h2 class="layer-tit">주문 취소 신청</h2>';
        html += '<div class="cancel-summary">';
        html += '<span class="cancel-date">주문일시 <strong class="bold">' + moment(classList[arr_idx].oc_regdate).format("YYYY.MM.DD") + '</strong></span>';
        html += '<span class="cancel-num">주문번호 <strong class="bold">' + order.order_id + '</strong></span>';
        html += '</div>';
        html += '<div class="cancel-class-wrap">';
        html += '<div class="order-detail-info-tit">취소 신청 클래스</div>';
        $.each(classList, function (idx) {
            if (this.oc_status == "STANBY" || this.oc_status == "PAYED") {
                html += '<div class="cancel-class-cont">';
                html += '<div class="cancel-class-thumb"><img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" class="thumb-cancel-class" alt="' + this.class_name + '" /></div>';
                html += '<div class="cancel-class-tit">';
                html += '<div class="cancel-class-tit01">클래스명</div>';
                html += '<div class="cancel-class-tit02">결제 금액</div>';
                html += '<div class="cancel-class-tit03">결제일</div>';
                html += '</div>';
                html += '<div class="cancel-class-txt">';
                html += '<div class="cancel-class-txt01 underline cut-txt">' + this.class_name + '</div>';
                html += '<div class="cancel-class-txt02"><span class="before-price">' + Utils.numberWithCommas(parseInt(this.oc_originprice) ) + '원</span> ' + Utils.numberWithCommas(parseInt(this.oc_price)) + '원</div>';
                html += '<div class="cancel-class-txt03">' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format("YYYY.MM.DD") + '</div>';
                html += '</div>';
                html += '</div>';
                if (this.oc_status == "PAYED") {
                    returnPrice += this.oc_price;
                }
                returnNum++;
            }
        });

        html += '</div>';
        html += '<div class="cancel-class-info">';
        html += '<div class="cancel-class-info-tit">&lt;결제 후 주문 취소 안내&gt;</div>';
        html += '<div class="cancel-class-info-txt">';
        html += '• 카드주문 승인취소 : 결제 접수일로부터 5일 (영업일 기준) 이내 카드 사 홈페이지에서 취소내역이 확인됩니다<br/>';
        html += '• 주문취소는 해당 클래스의 배송상태가 [결제전, 결제완료]일 때 가능합니다.';
        html += '</div>';
        html += '</div>';
        if(order.order_type === 'SUBSCRIPTION') {
            html += '<div class="cancel-class-info">';
            html += '<div class="cancel-class-info-tit">&lt;정기구독 취소 안내&gt;</div>';
            html += '<div class="cancel-class-info-txt">';
            html += '• 주문 취소한 클래스가 포함된 모든 정기구독신청이 해지됩니다.<br/>';
            html += '• 주문 취소시 정기구독 할인에 대한 별도의 페널티는 없습니다.';
            html += '</div>';
            html += '</div>';
        }
        html += '<div class="return-info-wrap">';
        html += '<div class="order-detail-info-tit">취소 정보</div>';
        html += '<div class="float-wrap">';
        html += '<div class="return-info-cont">';
        html += '<div class="return-info-area">';
        html += '<div class="return-info-tit">주문일시</div>';
        html += '<div class="return-info-txt">' + moment(order.order_regdate).format("YYYY.MM.DD HH:mm") + '</div>';
        html += '</div>';
        html += '<div class="return-info-area">';
        html += '<div class="return-info-tit">결제방법</div>';
        html += '<div class="return-info-txt">';
        if(order.order_paymentamount) {
            html += '신용카드';
        } else if(order.order_mileage) {
            html += '마일리지';
        } else {
            html += '이벤트';
        }
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="return-info-cont">';
        html += '<div class="return-info-area">';
        html += '<div class="return-info-tit">취소 금액</div>';
        html += '<div class="return-info-txt">' + Utils.numberWithCommas(parseInt(order.order_paymentamount)) + '원</div>';
        html += '</div>';
        html += '<div class="return-info-area">';
        html += '<div class="return-info-tit">취소 마일리지</div>';
        html += '<div class="return-info-txt">' + Utils.numberWithCommas(parseInt(order.order_mileage)) + 'p</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="cancel-class-btn">';
        html += '<a href="javascript:hideCancel();" title="닫기" class="btn-cancel-class btn-close-cancel">닫기</a>';
        html += '<a href="#link" title="주문 취소하기" data-order-idx="' + order.order_idx + '" data-oc-idx="' + classList[arr_idx].oc_idx + '" class="btn-cancel-class btn-order-cancel cancel-order">주문 취소하기</a>';
        html += '</div>';
        html += '<a href="javascript:hideCancel();" title="닫기" class="btn-layer-close">닫기</a>';
        html += '</div>';
        html += '</div>';

        $('.footer-wrap').before(html);
        $('#wrap').addClass('layer-on cancel-on');

        $('.cancel-order').off('click').on('click', function () {
            var oc_idx = $(this).attr('data-oc-idx');
            ApiRequest.put("/order/" + oc_idx + "/status", {
                "status": "REQUESTCANCEL"
            }, function (res) {

                HF.tracker.dataLayerPush({
                    event: 'eec.refund',
                    ecommerce: {
                        refund: {
                            actionField: {
                                id: order.order_id
                            },
                            products: _.map(classList, function(item){
                                return {
                                    id: item.class_code,
                                    quantity: item.oc_quantity
                                }
                            })
                        }
                    }
                });

                Popup.alert("주문 취소", "주문이 취소되었습니다.", "확인", function () {
                    Popup.hide();
                    $('#wrap').removeClass('layer-on cancel-on');
                    router(false, Utils.parseQuery());
                });
            }, function (err) {
                console.log(err);
                if (err.responseJSON.message == "Can`t change orders now") {
                    Popup.alert("주문 취소 실패", "구독 상품의 주문을 취소할수 없습니다.", "확인", function () {
                        Popup.hide();
                    });
                }
                Popup.alert("주문 취소 실패", "구독 상품의 주문을 취소할수 없습니다.", "확인", function () {
                    Popup.hide();
                });
            });
        });

    };
    /* 교환신청 팝업 */
    var drawOrderChangePopup = function (classList, order, arr_idx) {
        $('#change-wrap').remove();
        $('#return-wrap').remove();
        var returnPrice = 0;
        var returnNum = 0;

        var html = '';

        html += '<div class="layer-wrap change-wrap" id="change-wrap">';
        html += '<div class="bg-layer-wrap" onclick="hideChange();"></div>';
        html += '<div class="change-cont">';
        html += '<h2 class="layer-tit">교환 신청</h2>';
        html += '<div class="cancel-summary">';
        html += '<span class="cancel-date">주문일시 <strong class="bold">' + moment(classList[arr_idx].oc_regdate).format("YYYY.MM.DD") + '</strong></span>';
        html += '<span class="cancel-num">주문번호 <strong class="bold">' + order.order_id + '</strong></span>';
        html += '</div>';
        html += '<div class="cancel-class-wrap">';
        html += '<div class="order-detail-info-tit">교환 신청 클래스</div>';

        $.each(classList, function (idx) {
            if (idx == arr_idx) {
                html += '<div class="cancel-class-cont">';
                html += '<div class="cancel-class-thumb"><img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" class="thumb-cancel-class" alt="' + this.class_name + '" /></div>';
                html += '<div class="cancel-class-tit">';
                html += '<div class="cancel-class-tit01">상품명</div>';
                html += '<div class="cancel-class-tit02">결제 금액</div>';
                html += '<div class="cancel-class-tit03">결제일</div>';
                html += '</div>';
                html += '<div class="cancel-class-txt">';
                html += '<div class="cancel-class-txt01 underline cut-txt">' + this.class_name + '</div>';
                html += '<div class="cancel-class-txt02"><span class="before-price">' + Utils.numberWithCommas(parseInt(this.oc_originprice) + parseInt(this.oc_shippingprice)) + '원</span> ' + Utils.numberWithCommas(parseInt(this.oc_price) + parseInt(this.oc_shippingprice)) + '원</div>';
                html += '<div class="cancel-class-txt03">' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format("YYYY.MM.DD") + '</div>';
                html += '</div>';
                html += '</div>';
            }
        });
        html += '</div>';
        html += '<div class="cancel-class-info">';
        html += '<div class="cancel-class-info-tit">&lt;교환 신청 안내&gt;</div>';
        html += '<div class="cancel-class-info-txt">';
        html += '• 배송완료일 기준으로 7일 이내에만 교환/반품이 가능합니다.<br/>';
        html += '• 상품 포장이 훼손된 경우 교환/반품이 불가합니다.<br/>';
        html += '• 신청 접수된 교환/반품 서비스는 [주문/배송조회 > 취소/교환/반품 조회]에서 처리 상태를 확인할 수 있습니다.<br/>';
        html += '• 동일 가격의 다른 클래스로 교환을 원하시면, 교환하려는 클래스의 이름을 교환사유에 작성해주세요.';
        html += '</div>';
        html += '</div>';
        html += '<div class="cancel-class-info">';
        html += '<div class="cancel-class-info-tit">&lt;교환/반품 주소지&gt;</div>';
        html += '<div class="cancel-class-info-txt">';
        html += '• (12246) 경기도 남양주시 양정로319번길 15-18 두손컴퍼니';
        html += '</div>';
        html += '</div>';
        html += '<div class="float-wrap">';
        html += '<div class="change-area">';
        html += '<div class="order-detail-info-tit">교환 사유</div>';
        html += '<div class="change-reason-wrap">';
        html += '<div class="change-reason-tit">';
        html += '<div class="select-wrap">';
        html += '<select class="select-box">';
        html += '<option class="select-box-list-tit" selected="selected">교환 사유를 선택해 주세요.</option>';
        html += '<option class="select-box-list">단순 변심</option>';
        html += '<option class="select-box-list">상품 하자</option>';
        html += '<option class="select-box-list">배송 오류</option>';
        html += '<option class="select-box-list">기타</option>';
        html += '</select>';
        html += '<div class="select-cont">';
        html += '<a href="#link" title="교환 사유를 선택해 주세요." class="btn-select-tit" onclick="toggleSelectList();">';
        html += '<span class="btn-select-txt">교환 사유를 선택해 주세요.</span>';
        html += '</a>';
        html += '<div class="select-list-wrap" id="select-list-wrap">';
        html += '<ul class="select-list">';
        html += '<li class="select">';
        html += '<a href="#link" title="단순 변심" data-reason="단순 변심" class="btn-select change-select-reason">단순 변심</a>';
        html += '</li>';
        html += '<li class="select">';
        html += '<a href="#link" title="상품 하자" data-reason="상품 하자" class="btn-select change-select-reason">상품 하자</a>';
        html += '</li>';
        html += '<li class="select">';
        html += '<a href="#link" title="배송 오류" data-reason="배송 오류" class="btn-select change-select-reason">배송 오류</a>';
        html += '</li>';
        html += '<li class="select">';
        html += '<a href="#link" title="기타" data-reason="기타" class="btn-select change-select-reason">기타</a>';
        html += '</li>';
        html += '</ul>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="change-reason-cont">';
        html += '<textarea class="change-reason-txt input-change-reason" rows="" cols="" placeholder="자세한 사유를 입력해주세요." maxlength="300" ></textarea>';
        html += '<span class="change-reason-txt-count">0/300</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="change-area">';
        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">교환 상품 배송지</div>';
        html += '<div class="order-detail-info-btn">';
        html += '<a href="#link" data-order-idx="' + order.order_idx + '" title="배송지 변경" class="btn-order-detail-info change-address">배송지 변경</a>';
        html += '</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">받는사람</th>';
        html += '<td class="td-order-detail-info order-address-receivename">' + order.order_receivename + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">휴대폰번호</th>';
        html += '<td class="td-order-detail-info order-address-receivephone">' + order.order_receivephone + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주소</th>';
        html += '<td class="td-order-detail-info order-address-receiveaddress">(' + order.order_receivezipcode + ')' + order.order_receiveaddress + ' ' + order.order_receiveaddressdetail + '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="cancel-class-btn">';
        html += '<a href="#link" title="닫기" class="btn-cancel-class btn-close-cancel" onclick="hideChange();">닫기</a>';
        html += '<a href="#link" title="교환 신청하기" data-order-idx="' + order.order_idx + '" data-oc-idx="' + classList[arr_idx].oc_idx + '" class="btn-cancel-class btn-order-cancel change-order">교환 신청하기</a>';
        html += '</div>';
        html += '<a href="#link" title="닫기" class="btn-layer-close" onclick="hideChange();">닫기</a>';
        html += '</div>';
        html += '</div>';

        $('.footer-wrap').before(html);
        $('#wrap').addClass('layer-on change-on');

        $('.change-select-reason').off('click').on('click', function () {
            var reason = $(this).attr('data-reason');
            $('.btn-select-txt').text(reason);
            document.getElementById('select-list-wrap').className = 'select-list-wrap';
        });
        $('.input-change-reason').off('keyup').on('keyup', function (event) {
            var currentString = $(".input-change-reason").val();
            $('.change-reason-txt-count').html(currentString.length + "/300");
            if (currentString.length <= 300) {  /*or whatever your number is*/
                //do some css with your div
            } else {
                //do some different stuff with your div
            }
        });
        $('.change-address').off('click').on('click', function () {
            deliveryAmount = 3;
            deliveryPage = 1;
            var order_idx = $(this).attr('data-order-idx');
            getAddressList(order_idx);
        });

        $('.change-order').off('click').on('click', function () {
            var reasonDetail = $('.input-change-reason').val();
            var oc_idx = $(this).attr('data-oc-idx');
            var order_idx = $(this).attr('data-order-idx');

            var reasontype = '';
            if ($(window).width() < 970) {
                reasontype = $('.select-box option:selected').val();
            } else {
                reasontype = $('.btn-select-txt').text();
            }

            if ($(".input-change-reason").val() == "" || reasontype == "교환 사유를 선택해 주세요.") {
                Popup.alert("교환 신청 실패", "교환 사유 선택 및 작성해 주세요.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            ApiRequest.put("/order/" + oc_idx + "/status", {
                "status": "REQUESTEXCHANGE",
                "requesttype": reasontype,
                "requestdesc": $(".input-change-reason").val()
            }, function (res) {
                console.log(res);
                Popup.alert("교환 신청", "교환 신청이 접수 되었습니다.<br>담당자 확인 후 교환이 진행되며,<br>교환 진행시 이메일/문자 메세지로 안내드립니다.", "확인", function () {
                    Popup.hide();
                    $('#wrap').removeClass('layer-on change-on');
                    router(false, Utils.parseQuery());
                });
            }, function (err) {
                console.log(err);
                if (err.responseJSON.message == "Can`t change orders now") {
                    Popup.alert("교환 신청 실패", "현재 상품은 교환 신청을 할 수 없습니다.", "확인", function () {
                        Popup.hide();
                    });
                }
                Popup.alert("교환 신청 실패", "현재 상품은 교환 신청을 할 수 없습니다.", "확인", function () {
                    Popup.hide();
                });

            });
        });

    };


    var getAddressList = function (order_idx) {
        ApiRequest.get("/user/address", {
            "amount": deliveryAmount,
            "page": deliveryPage
        }, function (res) {
            console.log(res);
            deliveryTotal = res.count;
            addressData = res.list;
            drawAddressList(res, order_idx);
        }, function (err) {
            onsole.log(err);
        });
    };

    var drawAddressList = function (res, order_idx) {
        $('#address-wrap').remove();
        var html = '';

        html += '<div class="layer-wrap address-wrap" id="address-wrap">';
        html += '<div class="bg-layer-wrap" onclick="Mypage.hideAddressPopup();"></div>';
        html += '<div class="layer-wrap-contents address-cont">';
        html += '<h2 class="layer-tit">주소록 선택</h2>';
        html += '<div class="delivery-list-wrap">';

        $.each(res.list, function (idx) {
            html += '<div class="order-detail-info">';
            html += '<div class="order-detail-info-tit">' + this.address_title;
            if (this.default == "Y") {
                html += '<span class="txt-color-r">[기본]</span>';
            }
            html += '</div>';
            html += '<div class="order-detail-info-btn select-address-btn">';
            html += '<a href="#link" title="선택" data-order-idx="' + order_idx + '" data-idx="' + idx + '" class="btn-order-detail-info select-address">선택</a>';
            html += '</div>';
            html += '<div class="order-detail-info-cont" style="border-bottom:none;">';
            html += '<table summary="주문내역 테이블" class="table-order-detail-info">';
            html += '<colgroup>';
            html += '<col class="order-detail-th-width">';
            html += '<col class="order-detail-td-width">';
            html += '</colgroup>';
            html += '<tbody>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">수령인</th>';
            html += '<td class="td-order-detail-info">' + this.address_receivename + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">휴대폰 번호</th>';
            html += '<td class="td-order-detail-info">' + this.address_receivephone + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주소지</th>';
            html += '<td class="td-order-detail-info">(' + this.zonecode + ') ' + this.address + ' ' + this.address_detail + '</td>';
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';

        });
        html += '</div>';
        html += '<a href="#link" title="닫기" class="btn-layer-close" onclick="Mypage.hideAddressPopup();">닫기</a>';
        html += '</div>';


        /* Paging */
        var totalPage = Math.ceil(deliveryTotal / deliveryAmount);
        html += '<div class="paging-num-wrap">';
        for (var i = 1; i <= totalPage; i++) {
            if (deliveryPage == i) {
                html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="delivery-page-btn btn-num btn-num-on">' + i + '</a>';
            } else {
                html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="delivery-page-btn btn-num">' + i + '</a>';
            }
        }
        html += '</div>';

        html += '</div>';


        $('.footer-wrap').before(html);
        $('#wrap').addClass("layer-on address-on");

        $('.select-address').off('click').on('click', function () {
            $('#wrap').removeClass('address-on');
            var addressIdx = parseInt($(this).attr('data-idx'));
            var order_idx = $(this).attr('data-order-idx');
            var d = addressData[addressIdx];
            ApiRequest.put("/subscript/" + order_idx + "/changeaddress", {
                address_idx: d.address_idx,
            }, function (res) {
                console.log(res);
                Popup.alert("배송지 변경 완료", "선택하신 배송지로 변경되었습니다.", "확인", function () {
                    Popup.hide();
                    $('.order-address-receivename').text(d.address_receivename);
                    $('.order-address-receivephone').text(d.address_receivephone);
                    $('.order-address-receiveaddress').text('(' + d.zonecode + ') ' + d.address + ' ' + d.address_detail);
                });
            }, function (err) {
                console.log(err);
                Popup.alert("배송지 변경 실패", "상품이 현재 배송 중이거나 교환/반품 기한이 지나 배송지 수정이 불가능합니다.", "확인", function () {
                    Popup.hide();
                });
            });
        });

        $('.delivery-page-btn').off('click').on('click', function () {
            deliveryPage = parseInt($(this).attr('data-page'));
            getAddressList();
        });
    };

    /* 반품신청 팝업 */
    var drawOrderReturnPopup = function (res, arr_idx, oc_idx) {
        $('#change-wrap').remove();
        $('#return-wrap').remove();
        var returnPrice = 0;
        var returnNum = 0;


        var html = '';

        html += '<div class="layer-wrap return-wrap" id="return-wrap">';
        html += '<div class="bg-layer-wrap" onclick="hideChange();"></div>';
        html += '<div class="return-cont">';
        html += '<h2 class="layer-tit">반품 신청</h2>';
        html += '<div class="cancel-summary">';
        html += '<span class="cancel-date">주문일시 <strong class="bold">' + moment(res.orders[arr_idx].oc_regdate).format("YYYY.MM.DD") + '</strong></span>';
        html += '<span class="cancel-num">주문번호 <strong class="bold">' + res.subscript.order_id + '</strong></span>';
        html += '</div>';
        html += '<div class="cancel-class-wrap">';
        html += '<div class="order-detail-info-tit">반품 신청 클래스</div>';

        $.each(res.orders, function (idx) {
            if (this.oc_status != "COMPLETE" && this.oc_idx == oc_idx) {
                html += '<div class="cancel-class-cont">';
                html += '<div class="cancel-class-thumb"><img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" class="thumb-cancel-class" alt="' + this.class_name + '" /></div>';
                html += '<div class="cancel-class-tit">';
                html += '<div class="cancel-class-tit01">상품명</div>';
                html += '<div class="cancel-class-tit02">결제 금액</div>';
                html += '<div class="cancel-class-tit03">결제일</div>';
                html += '</div>';
                html += '<div class="cancel-class-txt">';
                html += '<div class="cancel-class-txt01 underline cut-txt">' + this.class_name + '</div>';
                html += '<div class="cancel-class-txt02"><span class="before-price">' + Utils.numberWithCommas(parseInt(this.oc_originprice) + parseInt(this.oc_shippingprice)) + '원</span> ' + Utils.numberWithCommas(parseInt(this.oc_price) + parseInt(this.oc_shippingprice)) + '원</div>';
                html += '<div class="cancel-class-txt03">' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format("YYYY.MM.DD") + '</div>';
                html += '</div>';
                html += '</div>';
                if (this.oc_status == "PAYED") {
                    returnPrice += this.oc_price;
                }
                returnNum++;
            }
        });

        html += '</div>';
        html += '<div class="cancel-class-info">';
        html += '<div class="cancel-class-info-tit">&lt;반품 신청 안내&gt;</div>';
        html += '<div class="cancel-class-info-txt">';
        html += '• 배송완료일 기준으로 7일 이내에만 교환/반품이 가능합니다.<br/>';
        html += '• 상품 포장이 훼손된 경우 교환/반품이 불가합니다.<br/>';
        html += '• 신청 접수된 교환/반품 서비스는 [주문/배송조회 > 취소/교환/반품 조회]에서 처리 상태를 확인할 수 있습니다.';
        html += '</div>';
        html += '</div>';
        html += '<div class="cancel-class-info">';
        html += '<div class="cancel-class-info-tit">&lt;교환/반품 주소지&gt;</div>';
        html += '<div class="cancel-class-info-txt">';
        html += '• (12246) 경기도 남양주시 양정로319번길 15-18 두손컴퍼니';
        html += '</div>';
        html += '</div>';
        html += '<div class="float-wrap">';
        html += '<div class="change-area">';
        html += '<div class="order-detail-info-tit">반품 사유</div>';
        html += '<div class="change-reason-wrap">';
        html += '<div class="change-reason-tit">';
        html += '<div class="select-wrap">';
        html += '<select class="select-box">';
        html += '<option class="select-box-list-tit" selected="selected">반품 사유를 선택해 주세요.</option>';
        html += '<option class="select-box-list">단순 변심</option>';
        html += '<option class="select-box-list">상품 하자</option>';
        html += '<option class="select-box-list">배송 오류</option>';
        html += '<option class="select-box-list">기타</option>';
        html += '</select>';
        html += '<div class="select-cont">';
        html += '<a href="#link" title="반품 사유를 선택해 주세요." class="btn-select-tit" onclick="toggleSelectList();">';
        html += '<span class="btn-select-txt">반품 사유를 선택해 주세요.</span>';
        html += '</a>';
        html += '<div class="select-list-wrap" id="select-list-wrap">';
        html += '<ul class="select-list">';
        html += '<li class="select">';
        html += '<a href="#link" title="단순 변심" data-reason="단순 변심" class="btn-select change-select-reason">단순 변심</a>';
        html += '</li>';
        html += '<li class="select">';
        html += '<a href="#link" title="상품 하자" data-reason="상품 하자" class="btn-select change-select-reason">상품 하자</a>';
        html += '</li>';
        html += '<li class="select">';
        html += '<a href="#link" title="배송 오류" data-reason="배송 오류" class="btn-select change-select-reason">배송 오류</a>';
        html += '</li>';
        html += '<li class="select">';
        html += '<a href="#link" title="기타" data-reason="기타" class="btn-select change-select-reason">기타</a>';
        html += '</li>';
        html += '</ul>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="change-reason-cont">';
        html += '<textarea class="change-reason-txt input-change-reason" rows="" cols="" placeholder="자세한 사유를 입력해주세요." maxlength="300" ></textarea>';
        html += '<span class="change-reason-txt-count">0/300</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        // html += '<div class="change-area">';
        // html += '<div class="order-detail-area">';
        // html += '<div class="order-detail-info">';
        // html += '<div class="order-detail-info-tit">취소 정보</div>';
        // // html += '<div class="order-detail-info-btn">';
        // // html += '<a href="#link" data-order-idx="'+ order.order_idx +'" title="배송지 변경" class="btn-order-detail-info change-address">배송지 변경</a>';
        // // html += '</div>';
        // html += '<div class="order-detail-info-cont">';
        // html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
        // html += '<colgroup>';
        // html += '<col class="order-detail-th-width" />';
        // html += '<col class="order-detail-td-width" />';
        // html += '</colgroup>';
        // html += '<tbody>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">주문일시</th>';
        // html += '<td class="td-order-detail-info order-address-receivename">' + moment(res.subscript.order_regdate).format("YYYY.MM.DD HH:mm") + '</td>';
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">결제 방법</th>';
        // html += '<td class="td-order-detail-info order-address-receivephone">';
        // if(res.subscript.order_paymentamount) {
        //     html += '신용카드';
        // } else if(res.subscript.order_mileage) {
        //     html += '마일리지';
        // } else {
        //     html += '이벤트';
        // }
        // html += '</td>';
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">환불 금액</th>';
        // html += '<td class="td-order-detail-info order-address-receiveaddress">' + Utils.numberWithCommas(parseInt(res.refundamount)) + '</td>';
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">환불 마일리지</th>';
        // html += '<td class="td-order-detail-info order-address-receiveaddress">' + Utils.numberWithCommas(parseInt(res.refundmileageamount)) + 'p</td>';
        // html += '</tr>';
        //
        // html += '</tbody>';
        // html += '</table>';
        // html += '</div>';
        // html += '</div>';
        // html += '</div>';
        // html += '</div>';
        html += '</div>';
        html += '<div class="cancel-class-btn">';
        html += '<a href="#link" title="닫기" class="btn-cancel-class btn-close-cancel" onclick="hideReturn();">닫기</a>';
        html += '<a href="#link" title="반품 신청하기"  data-order-idx="' + res.subscript.order_idx + '" data-oc-idx="' + res.orders[arr_idx].oc_idx + '" class="btn-cancel-class btn-order-cancel return-order">반품 신청하기</a>';
        html += '</div>';
        html += '<a href="#link" title="닫기" class="btn-layer-close" onclick="hideReturn();">닫기</a>';
        html += '</div>';
        html += '</div>';

        $('.footer-wrap').before(html);
        $('#wrap').addClass('layer-on return-on');

        $('.change-select-reason').off('click').on('click', function () {
            var reason = $(this).attr('data-reason');
            $('.btn-select-txt').text(reason);
            document.getElementById('select-list-wrap').className = 'select-list-wrap';
        });
        $('.input-change-reason').off('keyup').on('keyup', function (event) {
            var currentString = $(".input-change-reason").val();
            $('.change-reason-txt-count').html(currentString.length + "/300");
            if (currentString.length <= 300) {  /*or whatever your number is*/
                //do some css with your div
            } else {
                //do some different stuff with your div
            }
        });
        $('.change-address').off('click').on('click', function () {
            deliveryAmount = 3;
            deliveryPage = 1;
            var order_idx = $(this).attr('data-order-idx');
            getAddressList(order_idx);
        });

        $('.return-order').off('click').on('click', function () {
            var reasonDetail = $('.input-change-reason').val();
            var oc_idx = $(this).attr('data-oc-idx');
            var order_idx = $(this).attr('data-order-idx');

            var reasontype = '';
            if ($(window).width() < 970) {
                reasontype = $('.select-box option:selected').val();
            } else {
                reasontype = $('.btn-select-txt').text();
            }

            if ($(".input-change-reason").val() == "" || reasontype == "반품 사유를 선택해 주세요.") {
                Popup.alert("반품 신청 실패", "반품 사유 선택 및 작성해 주세요.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            ApiRequest.put("/order/" + oc_idx + "/status", {
                "status": "REQUESTREFUND",
                "requesttype": reasontype,
                "requestdesc": $(".input-change-reason").val()
            }, function (res) {
                console.log(res);
                Popup.alert("반품 신청 완료", "반품 신청이 접수 되었습니다.<br>반품 처리 후 결제 취소 및 환불이 진행됩니다.", "확인", function () {
                    Popup.hide();
                    $('#wrap').removeClass('layer-on return-on');
                    router(false, Utils.parseQuery());
                });
            }, function (err) {
                console.log(err);
                if (err.responseJSON.message == "Can`t change orders now") {
                    Popup.alert("반품 신청 실패", "현재 상품은 반품 신청을 할 수 없습니다.", "확인", function () {
                        Popup.hide();
                    });
                }
                Popup.alert("반품 신청 실패", "현재 상품은 반품 신청을 할 수 없습니다.", "확인", function () {
                    Popup.hide();
                });
            });
        });

    };

    var getCancelList = function () {
        ApiRequest.get('/order', {
            "amount": orderAmount,
            "page": orderPage,
            "state": "CANCEL,EXCHANGE,REFUND,REQUESTREFUND,REQUESTEXCHANGE,REQUESTCANCEL"
        }, function (res) {
            console.log(res);
            orderTotal = res.count;
            drawCancelList(res);
        }, function (err) {
            console.log(err);
        });
    };

    var drawCancelList = function (res) {
        $('.order-list-wrap').empty();
        $('.order-list-wrap').addClass('return-list-wrap');
        var html = '';
        if (res.list.length == 0) {
            html += '<div class="no-view-wrap">';
            html += '<div class="no-view-tit">취소/교환/반품된 클래스가 없습니다.</div>';
            html += '<div class="no-view-txt">';
            html += '취소/교환/반품된 클래스가 없습니다.';
            html += '</div>';
            html += '<a href="/class.html" title="클래스 보러가기" class="btn-no-view">클래스 보러가기</a>';
            html += '</div>';
        } else {
            $.each(res.list, function () {
                html += '<div class="order-list-cont">';
                html += '<div class="order-list-area">';
                html += '<div class="order-list-thumb">';
                html += '<img src="' + IMG_URL + 'class/thumbs/' + this.thumbnail_image.replace('-resize', '-square') + '" alt="" class="thumb-order-list" />';
                html += '</div>';
                html += '<div class="order-list-date">';
                html += '<div class="order-list-tit">주문일자</div>';
                html += '<span class="mark-state-txt"><em class="ico-mark-state">[</em>' + HF.CODE.orderState[this.oc_status] + '<em class="ico-mark-state">]</em></span>';
                html += '<div class="order-list-txt">' + moment(this.order_regdate).format("YYYY.MM.DD") + '</div>';
                html += '</div>';
                // html += '<div class="order-list-num -m">';
                // html += '<div class="order-list-tit">주문번호</div>';
                // html += '<div class="order-list-txt">' + this.order_idx + '-' + this.oc_idx + '</div>';
                // html += '</div>';
                html += '<div class="order-list-name">';
                html += '<div class="order-list-tit">클래스명</div>';
                html += '<a href="/product/' + this.class_uid + '">';
                html += '<div class="order-list-txt">' + this.class_name + '</div>';
                html += '</a>';
                html += '</div>';
                html += '<div class="order-list-price -m">';
                html += '<div class="order-list-tit">결제 금액</div>';
                var discount = this.order_discount;
                var priceIdx = _.findIndex(rate, function (o) {
                    return o.dr_rate == discount;
                });
                if (priceIdx < 0) priceIdx = 0;
                var amount = rate[priceIdx].dr_amount;

                html += '<div class="order-list-txt">' + Utils.numberWithCommas(parseInt(this.oc_price) + parseInt(this.order_shippingprice)) + '원</div>';
                // html += '<div class="order-list-txt-point">(정기구독할인 ' + this.order_discount + '%)</div>';
                html += '</div>';
                html += '<div class="order-list-btn">';
                if (this.oc_status == "REQUESTREFUND" || this.oc_status == "REQUESTEXCHANGE" || this.oc_status == "REQUESTCANCEL") {
                    html += '<a href="#link" title="확인전" class="btn-order-list2">확인전</a>';
                } else {
                    html += '<a href="#link" title="처리완료" class="btn-order-list2 txt-color-r">처리완료</a>';
                }

                if (this.oc_status == "REQUESTEXCHANGE" || this.oc_status == "EXCHANGE") {
                    html += '<a href="/mypage.shop?m=order&s=orderDetail&order_id=' +this.order_idx+ '" title="상세내역" data-oc-idx="' + this.oc_idx + '" data-order-idx="' + this.order_idx + '" class="btn-order-list btn-search-delivery btn-order-on btn-cancel-exchange-detail">상세내역</a>';
                } else if (this.oc_status == "REQUESTREFUND" || this.oc_status == "REFUND") {
                    html += '<a href="/mypage.shop?m=order&s=orderDetail&order_id=' +this.order_idx+ '" title="상세내역" data-oc-idx="' + this.oc_idx + '" data-order-idx="' + this.order_idx + '" class="btn-order-list btn-search-delivery btn-order-on btn-cancel-refund-detail">상세내역</a>';
                } else {
                    html += '<a href="/mypage.shop?m=order&s=orderDetail&order_id=' +this.order_idx+ '" title="상세내역" data-oc-idx="' + this.oc_idx + '" data-order-idx="' + this.order_idx + '" class="btn-order-list btn-search-delivery btn-order-on btn-cancel-order-detail">상세내역</a>';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>';
            });
            /* Paging */
            var totalPage = Math.ceil(orderTotal / orderAmount);
            html += '<div class="paging-num-wrap">';
            for (var i = 1; i <= totalPage; i++) {
                if (orderPage == i) {
                    html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="order-page-btn btn-num btn-num-on">' + i + '</a>';
                } else {
                    html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="order-page-btn btn-num">' + i + '</a>';
                }
            }
            html += '</div>';
        }
        $('.order-list-wrap').append(html);
        $('.order-page-btn').off('click').on('click', function () {
            orderPage = parseInt($(this).attr('data-page'));
            getCancelList();
        });
        $('.btn-cancel-order-detail').off('click').on('click', function () {
            var order_idx = $(this).attr('data-order-idx');
            var oc_idx = $(this).attr('data-oc-idx');
            getCancelDetailOrder(order_idx, oc_idx);
        });
        $('.btn-cancel-exchange-detail').off('click').on('click', function () {
            var order_idx = $(this).attr('data-order-idx');
            var oc_idx = $(this).attr('data-oc-idx');
            getExchangeDetailOrder(order_idx, oc_idx);
        });
        $('.btn-cancel-refund-detail').off('click').on('click', function () {
            var order_idx = $(this).attr('data-order-idx');
            var oc_idx = $(this).attr('data-oc-idx');
            getRefundDetailOrder(order_idx, oc_idx);
        });

    }
    var getCancelDetailOrder = function (order_id, oc_idx) {
        ApiRequest.get("/order/" + oc_idx + "/status/cancel", {}, function (res) {
            console.log(res);
            var classData = {};
            var classType = '';
            $.each(res.orders, function () {
                if (this.oc_idx == oc_idx) {
                    classData = this;
                    classType = this.oc_status;
                    return false;
                }
            });
            drawCancelOrderDetail(res, classData, classType);
        }, function (err) {
            console.log(err);
        });
    };
    var getExchangeDetailOrder = function (order_id, oc_idx) {
        ApiRequest.get("/order/" + oc_idx + "/status/cancel", {}, function (res) {
            console.log(res);
            var classData = {};
            var classType = res.orders[0].oc_status;
            drawReturnOrderDetail(res, classType);
        }, function (err) {
            console.log(err);
        });
    };
    var getRefundDetailOrder = function (order_id, oc_idx) {
        ApiRequest.get("/order/" + oc_idx + "/status/refund", {}, function (res) {
            console.log(res);
            var classData = {};
            $.each(res.orders, function (idx) {
                if (oc_idx == this.oc_idx) {
                    classData = this;
                }
            });
            res.orders[0] = classData;
            var classType = res.orders[0].oc_status;
            ;
            drawRefundOrderDetail(res, classType);
        }, function (err) {
            console.log(err);
        });
    };

    var drawCancelOrderDetail = function (res, classData, type) {
        var title_text = "";
        var refundPrice = 0;
        if (type == "CANCEL") {
            title_text = "취소";
        } else if (type == "REQUESTCANCEL") {
            title_text = "취소 요청";
        }
        $('.order-detail-wrap').empty();
        var html = '';

        html += '<div class="order-detail-tit">' + title_text + ' 상세 내역</div>';
        html += '<div class="order-detail-tit-sub">';
        html += '<span>구독번호</span><span class="order-num">' + res.subscript.order_id + '</span>';
        html += '</div>';
        html += '<div class="order-detail-cont">';
        html += '<div class="order-detail-area">';

        $.each(res.orders, function (idx) {
            html += '<div class="order-detail-info">';
            if (idx == 0) {
                html += '<div class="order-detail-info-tit">' + title_text + ' 클래스</div>';
            } else {
                html += '<div class="order-detail-info-tit"></div>';
            }
            html += '<div class="order-detail-thumb">';
            html += '<img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" class="thumb-order-detail" alt="" />';
            html += '</div>';
            html += '<div class="order-detail-info-cont">';
            html += '<table summary="주문내역 테이블" class="table-order-detail-info">';
            html += '<colgroup>';
            html += '<col class="order-detail-th-width" />';
            html += '<col class="order-detail-td-width" />';
            html += '</colgroup>';
            html += '<tbody>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문일시</th>';
            html += '<td class="td-order-detail-info">' + moment(this.oc_regdate).format("YYYY.MM.DD HH:mm") + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">클래스명</th>';
            html += '<td class="td-order-detail-info underline">' + this.class_name + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">결제 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(this.oc_price) + parseInt(this.oc_shippingprice)) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">결제일</th>';
            html += '<td class="td-order-detail-info">' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format('YYYY.MM.DD') + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문상태</th>';
            html += '<td class="td-order-detail-info">' + HF.CODE.orderState[this.oc_status] + '</td>';

            html += '</tr>';

            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';
        });
        html += '</div>';

        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">' + title_text + ' 상세</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">취소 접수일</th>';
        html += '<td class="td-order-detail-info">' + moment(res.subscript.order_requestdate).format("YYYY.MM.DD HH:mm") + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">취소 접수번호</th>';
        html += '<td class="td-order-detail-info">' + res.subscript.order_requestnumber + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">취소 완료일</th>';
        if (res.subscript.order_requestcompletedate != null) {
            html += '<td class="td-order-detail-info">' + moment(res.subscript.order_requestcompletedate).format("YYYY.MM.DD HH:mm") + '</td>';
        } else {
            html += '<td class="td-order-detail-info"> - </td>';
        }
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">처리 상태</th>';
        html += '<td class="td-order-detail-info">처리완료</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">취소 정보</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="결제정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tfoot>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">취소 금액</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.refundamount)) + '원</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info" style="border-top:none;">취소 마일리지</th>';
        html += '<td class="td-order-detail-info" style="border-top:none;">' + Utils.numberWithCommas(parseInt(res.refundmileageamount)) + '원</td>';
        html += '<tr>';
        html += '</tfoot>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">결제방법</th>';

        html += '<td class="td-order-detail-info">';
        if(res.subscript.order_paymentamount) {
            html += '신용카드';
        } else if(res.subscript.order_mileage) {
            html += '마일리지';
        } else {
            html += '이벤트';
        }
        html += '</td>';

        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주문 일시</th>';
        html += '<td class="td-order-detail-info">' + moment(res.subscript.order_regdate).format("YYYY.MM.DD HH:mm") + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">신청한 금액 합계</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_originprice)) + '원</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">할인금액</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(res.subscript.order_originprice - res.subscript.order_price) + '원</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">마일리지 할인</th>';
        html += '<td class="td-order-detail-info">' + parseInt(res.subscript.order_mileage) * -1 + 'p</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">배송비</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_shippingprice)) + '원</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">최종 금액</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_price) + (parseInt(res.subscript.order_shippingprice) * res.orders.length)) + '원</td>';

        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';


        html += '<div class="order-detail-btn">';
        html += '<a href="/mypage.shop?m=order&s=order" title="목록으로 돌아가기" class="btn-back-list btn-back-cancel-order-list">목록으로 돌아가기</a>';
        html += '</div>';
        $('.order-detail-wrap').append(html);

        $('.btn-back-cancel-order-list').off('click').on('click', function () {
            getCancelList();
        });

        $('.order-list-wrap').hide();
        $('.order-detail-wrap').show();
    };


    var drawRefundOrderDetail = function (res, type) {
        // orderDetailClass = res.class;
        // orderDetailData = res.order;
        var title_text = "";
        if (type == "EXCHANGE") {
            title_text = "교환";
        } else if (type == "REFUND") {
            title_text = "반품";
        } else if (type == "REQUESTEXCHANGE") {
            title_text = "교환 신청";
        } else if (type == "REQUESTREFUND") {
            title_text = "반품 신청";
        }
        $('.order-detail-wrap').empty();
        var html = '';

        var html = '';

        html += '<div class="order-detail-wrap return-detail-wrap block">';
        html += '<div class="order-detail-tit">' + title_text + ' 상세 내역</div>';
        // html += '<div class="order-detail-tit-sub">';
        // html += '<span>주문번호</span><span class="order-num">' + res.subscript.order_idx + '-' + res.orders[0].oc_idx + '</span>';
        // html += '</div>';
        html += '<div class="order-detail-cont">';
        html += '<div class="order-detail-area">';
        $.each(res.orders, function (idx) {
            html += '<div class="order-detail-info">';
            if (idx == 0) {
                html += '<div class="order-detail-info-tit">' + title_text + ' 클래스</div>';
            } else {
                html += '<div class="order-detail-info-tit"></div>';
            }
            html += '<div class="order-detail-thumb">';
            html += '<img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" class="thumb-order-detail" alt="" />';
            html += '</div>';
            html += '<div class="order-detail-info-cont">';
            html += '<table summary="주문내역 테이블" class="table-order-detail-info">';
            html += '<colgroup>';
            html += '<col class="order-detail-th-width" />';
            html += '<col class="order-detail-td-width" />';
            html += '</colgroup>';
            html += '<tbody>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문일시</th>';
            html += '<td class="td-order-detail-info">' + moment(this.oc_regdate).format("YYYY.MM.DD HH:mm") + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">클래스명</th>';
            html += '<td class="td-order-detail-info underline">' + this.class_name + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">결제 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(this.oc_price) + parseInt(this.oc_shippingprice)) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">결제일</th>';
            html += '<td class="td-order-detail-info">' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format('YYYY.MM.DD') + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문상태</th>';
            html += '<td class="td-order-detail-info">' + HF.CODE.orderState[this.oc_status] + '</td>';

            html += '</tr>';

            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';
        });
        html += '</div>';

        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">' + title_text + ' 접수 상세</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="주문내역 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">' + title_text + ' 접수일</th>';
        html += '<td class="td-order-detail-info">' + moment(res.orders[0].oc_requestdate).format("YYYY.MM.DD HH:mm") + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">' + title_text + ' 접수번호</th>';
        html += '<td class="td-order-detail-info">' + res.subscript.order_requestnumber + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">' + title_text + ' 완료일</th>';
        if (type == "REQUESTEXCHANGE" || type == "REQUESTREFUND") {
            html += '<td class="td-order-detail-info"></td>';
        } else {
            html += '<td class="td-order-detail-info">' + moment(res.orders[0].oc_requestcompletedate).format("YYYY.MM.DD HH:mm") + '</td>';
        }
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">처리상태</th>';
        if (type == "REQUESTEXCHANGE" || type == "REQUESTREFUND") {
            html += '<td class="td-order-detail-info">처리전</td>';
        } else {
            html += '<td class="td-order-detail-info">처리 완료</td>';
        }
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        if (type == "REQUESTREFUND" || type == "REFUND") {
            html += '<div class="order-detail-area">';
            html += '<div class="order-detail-info">';
            html += '<div class="order-detail-info-tit">환불 정보</div>';
            html += '<div class="order-detail-info-cont">';
            html += '<table summary="결제정보 테이블" class="table-order-detail-info">';
            html += '<colgroup>';
            html += '<col class="order-detail-th-width" />';
            html += '<col class="order-detail-td-width" />';
            html += '</colgroup>';
            html += '<tfoot>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">환불 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.refundamount)) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info" style="border-top:none;">환불 마일리지</th>';
            html += '<td class="td-order-detail-info" style="border-top:none;">' + Utils.numberWithCommas(parseInt(res.refundmileageamount)) + '원</td>';
            html += '<tr>';
            html += '</tfoot>';
            html += '<tbody>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">결제방법</th>';

            html += '<td class="td-order-detail-info">';
            if(res.subscript.order_paymentamount) {
                html += '신용카드';
            } else if(res.subscript.order_mileage) {
                html += '마일리지';
            } else {
                html += '이벤트';
            }
            html += '</td>';

            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문 일시</th>';
            html += '<td class="td-order-detail-info">' + moment(res.subscript.order_regdate).format("YYYY.MM.DD HH:mm") + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">결제 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_price)) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">할인금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(res.subscript.order_originprice - res.subscript.order_price) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">마일리지 할인</th>';
            html += '<td class="td-order-detail-info">' + parseInt(res.subscript.order_mileage) * -1 + 'p</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">배송비</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_shippingprice)) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">최종 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_price) + (parseInt(res.subscript.order_shippingprice) * res.orders.length)) + '원</td>';

            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

        }

        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">교환/반품 주소지</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">받는사람</th>';
        html += '<td class="td-order-detail-info">하비풀</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">휴대폰번호</th>';
        html += '<td class="td-order-detail-info">02-6948-9385</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주소</th>';
        html += '<td class="td-order-detail-info">(12246) 경기도 남양주시 양정로319번길 15-18 두손컴퍼니</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';


        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">' + title_text + ' 사유</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="결제정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">사유</th>';
        html += '<td class="td-order-detail-info">' + res.orders[0].oc_requesttype + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">내용</th>';
        html += '<td class="td-order-detail-info">' + res.orders[0].oc_requestdesc + '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';


        if (type == "REQUESTEXCHANGE" || type == "EXCHANGE") {
            html += '<div class="order-detail-area">';
            html += '<div class="order-detail-info">';
            html += '<div class="order-detail-info-tit">' + title_text + ' 상품 배송지</div>';
            html += '<div class="order-detail-info-cont">';
            html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
            html += '<colgroup>';
            html += '<col class="order-detail-th-width" />';
            html += '<col class="order-detail-td-width" />';
            html += '</colgroup>';
            html += '<tbody>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">받는사람</th>';
            html += '<td class="td-order-detail-info">' + res.subscript.order_receivename + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">휴대폰번호</th>';
            html += '<td class="td-order-detail-info">' + res.subscript.order_receivephone + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주소</th>';
            html += '<td class="td-order-detail-info">(' + res.subscript.order_receivezipcode + ') ' + res.subscript.order_receiveaddress + ' ' + res.subscript.order_receiveaddressdetail + '</td>';
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }

        html += '</div>';
        html += '<div class="order-detail-btn">';
        html += '<a href="/mypage.shop?m=order&s=order" title="목록으로 돌아가기" class="btn-back-list btn-back-return-order-list">목록으로 돌아가기</a>';
        html += '</div>';
        html += '</div>';

        $('.order-detail-wrap').append(html);

        $('.btn-back-return-order-list').off('click').on('click', function () {
            getCancelList();
        });

        $('.order-list-wrap').hide();
        $('.order-detail-wrap').show();
    };


    var drawReturnOrderDetail = function (res, type) {
        // orderDetailClass = res.class;
        // orderDetailData = res.order;
        var title_text = "";
        if (type == "EXCHANGE") {
            title_text = "교환";
        } else if (type == "REFUND") {
            title_text = "반품";
        } else if (type == "REQUESTEXCHANGE") {
            title_text = "교환 신청";
        } else if (type == "REQUESTREFUND") {
            title_text = "반품 신청";
        }
        $('.order-detail-wrap').empty();
        var html = '';

        var html = '';

        html += '<div class="order-detail-wrap return-detail-wrap block">';
        html += '<div class="order-detail-tit">' + title_text + ' 상세 내역</div>';
        // html += '<div class="order-detail-tit-sub">';
        // html += '<span>주문번호</span><span class="order-num">' + res.subscript.order_idx + '-' + res.orders[0].oc_idx + '</span>';
        // html += '</div>';
        html += '<div class="order-detail-cont">';

        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">' + title_text + ' 클래스</div>';
        html += '<div class="order-detail-thumb">';
        html += '<img src="' + IMG_URL + 'class/thumbs/' + res.orders[0].class_thumbnail.replace('-resize', '-square') + '" class="thumb-order-detail" alt="" />';
        html += '</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="주문내역 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주문일시</th>';
        html += '<td class="td-order-detail-info">' + moment(res.orders[0].oc_regdate).format("YYYY.MM.DD HH:mm") + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">클래스명</th>';
        html += '<td class="td-order-detail-info underline">' + res.orders[0].class_name + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">결제 금액</th>';
        html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.orders[0].oc_price) + parseInt(res.orders[0].oc_shippingprice)) + '원</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">결제일</th>';
        html += '<td class="td-order-detail-info"></td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주문상태</th>';
        html += '<td class="td-order-detail-info">' + HF.CODE.orderState[res.orders[0].oc_status] + '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">' + title_text + ' 접수 상세</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="주문내역 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">' + title_text + ' 접수일</th>';
        html += '<td class="td-order-detail-info">' + moment(res.orders[0].oc_requestdate).format("YYYY.MM.DD HH:mm") + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">' + title_text + ' 접수번호</th>';
        html += '<td class="td-order-detail-info">' + res.subscript.order_requestnumber + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">' + title_text + ' 완료일</th>';
        if (type == "REQUESTEXCHANGE" || type == "REQUESTREFUND") {
            html += '<td class="td-order-detail-info"></td>';
        } else {
            html += '<td class="td-order-detail-info">' + moment(res.orders[0].oc_requestcompletedate).format("YYYY.MM.DD HH:mm") + '</td>';
        }
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">처리상태</th>';
        if (type == "REQUESTEXCHANGE" || type == "REQUESTREFUND") {
            html += '<td class="td-order-detail-info">처리전</td>';
        } else {
            html += '<td class="td-order-detail-info">처리 완료</td>';
        }
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        if (type == "REQUESTREFUND" || type == "REFUND") {
            html += '<div class="order-detail-area">';
            html += '<div class="order-detail-info">';
            html += '<div class="order-detail-info-tit">환불 정보</div>';
            html += '<div class="order-detail-info-cont">';
            html += '<table summary="결제정보 테이블" class="table-order-detail-info">';
            html += '<colgroup>';
            html += '<col class="order-detail-th-width" />';
            html += '<col class="order-detail-td-width" />';
            html += '</colgroup>';
            html += '<tfoot>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">환불 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.refundamount)) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info" style="border-top:none;">환불 마일리지</th>';
            html += '<td class="td-order-detail-info" style="border-top:none;">' + Utils.numberWithCommas(parseInt(res.refundmileageamount)) + '원</td>';
            html += '<tr>';
            html += '</tfoot>';
            html += '<tbody>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">결제방법</th>';

            html += '<td class="td-order-detail-info">';
            if(res.subscript.order_paymentamount) {
                html += '신용카드';
            } else if(res.subscript.order_mileage) {
                html += '마일리지';
            } else {
                html += '이벤트';
            }
            html += '</td>';

            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주문 일시</th>';
            html += '<td class="td-order-detail-info">' + moment(res.subscript.order_regdate).format("YYYY.MM.DD HH:mm") + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">결제 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_price) + parseInt(res.subscript.order_shippingprice)) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">할인 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(res.subscript.order_originprice - res.subscript.order_price) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">마일리지 할인</th>';
            html += '<td class="td-order-detail-info">' + parseInt(res.subscript.order_mileage) * -1 + 'p</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">배송비</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_shippingprice)) + '원</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">최종 금액</th>';
            html += '<td class="td-order-detail-info">' + Utils.numberWithCommas(parseInt(res.subscript.order_price) + (parseInt(res.subscript.order_shippingprice) * res.orders.length)) + '원</td>';

            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';
            html += '</div>';

        }

        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">교환/반품 주소지</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">받는사람</th>';
        html += '<td class="td-order-detail-info">하비풀</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">휴대폰번호</th>';
        html += '<td class="td-order-detail-info">02-6948-9385</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주소</th>';
        html += '<td class="td-order-detail-info">(12246) 경기도 남양주시 양정로319번길 15-18 두손컴퍼니</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';


        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">' + title_text + ' 사유</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="결제정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">사유</th>';
        html += '<td class="td-order-detail-info">' + res.orders[0].oc_requesttype + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">내용</th>';
        html += '<td class="td-order-detail-info">' + res.orders[0].oc_requestdesc + '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';


        if (type == "REQUESTEXCHANGE" || type == "EXCHANGE") {
            html += '<div class="order-detail-area">';
            html += '<div class="order-detail-info">';
            html += '<div class="order-detail-info-tit">' + title_text + ' 상품 배송지</div>';
            html += '<div class="order-detail-info-cont">';
            html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
            html += '<colgroup>';
            html += '<col class="order-detail-th-width" />';
            html += '<col class="order-detail-td-width" />';
            html += '</colgroup>';
            html += '<tbody>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">받는사람</th>';
            html += '<td class="td-order-detail-info">' + res.subscript.order_receivename + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">휴대폰번호</th>';
            html += '<td class="td-order-detail-info">' + res.subscript.order_receivephone + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '<th class="th-order-detail-info">주소</th>';
            html += '<td class="td-order-detail-info">(' + res.subscript.order_receivezipcode + ') ' + res.subscript.order_receiveaddress + ' ' + res.subscript.order_receiveaddressdetail + '</td>';
            html += '</tr>';
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }

        html += '</div>';
        html += '<div class="order-detail-btn">';
        html += '<a href="/mypage.shop?m=order&s=order" title="목록으로 돌아가기" class="btn-back-list btn-back-return-order-list">목록으로 돌아가기</a>';
        html += '</div>';
        html += '</div>';

        $('.order-detail-wrap').append(html);

        $('.btn-back-return-order-list').off('click').on('click', function () {
            getCancelList();
        });

        $('.order-list-wrap').hide();
        $('.order-detail-wrap').show();
    };

    var getSubscriptList = function () {
        /* Ajax Data */
        ApiRequest.get('/subscript', {
            "amount": subScriptAmount,
            "page": subScriptPage
        }, function (res) {
            console.log(res);
            subScriptTotal = res.count;
            subScriptDataList = res.list;
            drawSubscriptList(res);
        }, function (err) {
            console.log(err);
        });
    };

    var drawSubscriptList = function (res) {
        $('.standing-order-wrap').empty();

        html = '';
        html += '<div class="reply-info-wrap">';
        html += '<div class="reply-info-cont">';
        html += '<div class="reply-info-area reply-info-area-type02">';
        html += '<p style="color:red; font-weight:bold; margin-bottom:5px; ">[알림] 정기구독 서비스는 2019년 7월 17일 이후로 중단되었습니다. 이전에 구매하신 주문은 계속 이용하실 수 있습니다.</p>';
        html += '1. 아직 상품준비가 시작되지 않은 클래스는 [구독편집]에 서 배송 순서를 변경하실 수 있습니다.<br/>';
        html += '2. 정기구독 신청일에 따라 매월 배송이 시작됩니다.';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        $.each(res.list, function (idx) {
            var _this = this;

            html += '<div class="standing-order-list">';
            html += '<div class="standing-order-tit">';
            html += '<div class="standing-order-txt">' + this.classlist.length + '개월 취미 구독 (' + rate[this.classlist.length - 1].dr_rate + '% 할인), 매월 ' + moment(this.oc_shippingdate_base).format('D') + '일 취미 배송 시작</div>';
            html += '<div class="standing-order-date">취미구독 신청일 : ' + moment(this.order_regdate).format("YYYY.MM.DD") + '</div>';
            html += '</div>';
            html += '<div data-order-idx="' + this.order_idx + '" class="standing-order-cont">';
            $.each(this.classlist, function (idx) {
                var step = 'standing-step02';
                if (idx == 0 && _this.classlist.length > 1) {
                    step = 'standing-step01';
                } else if (idx == _this.classlist.length - 1 && _this.classlist.length > 1) {
                    step = 'standing-step03';
                } else if (_this.classlist.length == 1) {
                    step = 'standing-step04';
                }
                var step_on = '';
                if (this.oc_status == "STANBY" || this.oc_status == "PAYED") {
                    step_on = '';
                } else {
                    step_on = ' standing-step-on';
                }
                html += '<div class="standing-order-step ' + step + step_on + '">';
                html += '<div class="ico-standing-step">';
                html += '<div class="standing-step-line-up"></div>';
                html += '<div class="standing-step-circle">';
                html += '<div class="standing-step-circle-inner"></div>';
                html += '</div>';
                html += '<div class="standing-step-line-down"></div>';
                html += '</div>';
                html += '<div class="standing-order-step-tit">';
                html += orderReplace[(idx + 1 + '')] + ' 배송 시작';
                html += '<div class="standing-order-step-date">' + moment(this.oc_shippingdate_tobe).format("M월 D일") + '</div>';
                html += '</div>';
                html += '<div data-oc-idx="' + this.oc_idx + '" class="standing-order-step-info">';
                html += '<div class="ico-arrow-l"></div>';
                html += '<div class="standing-thumb">';
                html += '<img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" class="thumb-standing" alt="" />';
                html += '</div>';
                html += '<div class="standing-info standing-product">';
                html += '<div class="standing-info-tit">클래스명</div>';
                html += '<div class="standing-info-txt">' + this.class_name + '</div>';
                html += '</div>';
                html += '<div class="standing-info standing-ea">';
                html += '<div class="standing-info-tit">결제일</div>';
                html += '<div class="standing-info-txt">' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format("YYYY.MM.DD") + '</div>';
                html += '</div>';
                html += '<div class="standing-info standing-price">';
                html += '<div class="standing-info-tit">결제 금액</div>';
                html += '<div class="standing-info-txt">';
                html += '<span class="before-price">' + Utils.numberWithCommas(parseInt(this.oc_originprice) + parseInt(this.oc_shippingprice)) + '원</span>';
                html += Utils.numberWithCommas(parseInt(this.oc_price) + parseInt(this.oc_shippingprice)) + '원';
                html += '</div>';
                html += '</div>';
                html += '<div class="standing-info standing-edit-btn">';
                if (this.oc_status == "STANBY" || this.oc_status == "PREPARESHIPPING") {
                    if (idx == 0) {
                        html += '<a href="#link" title="이전" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" class="btn-edit-standing btn-edit-prev btn-edit-off">이전</a>';
                    } else if (idx > 0 && (_this.classlist[idx - 1].oc_status == "STANBY" || _this.classlist[idx - 1].oc_status == "PREPARESHIPPING")) {
                        html += '<a href="#link" title="이전" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" class="btn-edit-standing btn-edit-prev">이전</a>';
                    } else {
                        html += '<a href="#link" title="이전" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" class="btn-edit-standing btn-edit-prev btn-edit-off">이전</a>';
                    }

                    if (idx == _this.classlist.length - 1) {
                        html += '<a href="#link" title="다음" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" class="btn-edit-standing btn-edit-next btn-edit-off">다음</a>';
                    } else if (idx < _this.classlist.length - 1 && (_this.classlist[idx + 1].oc_status == "STANBY" || _this.classlist[idx + 1].oc_status == "PREPARESHIPPING")) {
                        html += '<a href="#link" title="다음" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" class="btn-edit-standing btn-edit-next">다음</a>';
                    } else {
                        html += '<a href="#link" title="다음" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" class="btn-edit-standing btn-edit-next btn-edit-off">다음</a>';
                    }
                } else {
                    html += '<a href="#link" title="이전" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" class="btn-edit-standing btn-edit-prev btn-edit-off">이전</a>';
                    html += '<a href="#link" title="다음" data-order-idx="' + this.order_idx + '" data-oc-idx="' + this.oc_idx + '" class="btn-edit-standing btn-edit-next btn-edit-off">다음</a>';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>';
            });
            html += '</div>';
            html += '<div class="standing-order-btn">';
            html += '<a href="#link" title="정기구독 편집" class="btn-standing-order edit-subscript-btn">정기구독 편집</a>';
            html += '<a href="#show-standing-order" data-subscript-idx="' + idx + '" title="구독 신청서 보기" class="btn-standing-order show-standing-order">구독 신청서 보기</a>';
            html += '</div>';
            html += '</div>';
        });

        /* Paging */
        var totalPage = Math.ceil(subScriptTotal / subScriptAmount);
        html += '<div class="paging-num-wrap">';
        for (var i = 1; i <= totalPage; i++) {
            if (subScriptPage == i) {
                html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="subscript-page-btn btn-num btn-num-on">' + i + '</a>';
            } else {
                html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="subscript-page-btn btn-num">' + i + '</a>';
            }
        }
        html += '</div>';

        $('.standing-order-wrap').append(html);
        $('.edit-subscript-btn').off('click').on('click', function (e) {
            // var html = $(this).parent().parent();
            // html = html.html();
            // drawEditSubscript(html);

            Popup.alert("정기구독 편집", "배송 순서 및 날짜 변경을 희망하시는 경우 1:1 문의를 남겨주세요.", "확인", function () {
                Popup.hide();
                getSubscriptList();
            });

        });
        $('.subscript-page-btn').off('click').on('click', function () {
            subScriptPage = parseInt($(this).attr('data-page'));
            getSubscriptList();
        });
        $('.show-standing-order').off('click').on('click', function () {
            var sub_idx = $(this).attr('data-subscript-idx');
            showRegularOrder(subScriptDataList[sub_idx]);
        });

    };

    var showRegularOrder = function (orderData) {
        $('.layer-standing-order-wrap').remove();
        var totalOrderPrice = 0;
        var html = '';

        html += '<div class="layer-wrap layer-standing-order-wrap" id="layer-standing-order-wrap">';
        html += '<div class="bg-layer-wrap" onclick="hideStandingOrder();"></div>';
        html += '<div class="layer-standing-order-cont">';
        html += '<h2 class="layer-tit">취미구독 신청서</h2>';
        html += '<div class="cancel-summary">';
        html += '<span class="cancel-date">구독일시 <strong class="bold">' + moment(orderData.order_regdate).format("YYYY.MM.DD") + '</strong></span>';
        html += '<span class="cancel-num">구독번호 <strong class="bold">' + orderData.order_id + '</strong></span>';
        html += '</div>';
        html += '<div class="cancel-class-wrap">';
        html += '<div class="order-detail-info-tit">신청한 취미 클래스 내역</div>';

        $.each(orderData.classlist, function (idx) {
            html += '<div class="cancel-class-cont">';
            html += '<div class="cancel-class-thumb"><img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" class="thumb-cancel-class" alt="" /></div>';
            html += '<div class="cancel-class-tit">';
            html += '<div class="cancel-class-tit01">클래스명</div>';
            html += '<div class="cancel-class-tit03">결제 금액</div>';
            html += '<div class="cancel-class-tit02">결제일</div>';
            html += '<div class="cancel-class-tit02">배송일</div>';
            html += '</div>';
            html += '<div class="cancel-class-txt">';
            html += '<div class="cancel-class-txt01 underline cut-txt">' + this.class_name + '</div>';
            html += '<div class="cancel-class-txt03"><span class="before-price">' + Utils.numberWithCommas(parseInt(this.oc_originprice) + parseInt(this.oc_shippingprice)) + '원</span> ' + Utils.numberWithCommas(parseInt(this.oc_price) + parseInt(this.oc_shippingprice)) + '원</div>';
            html += '<div class="cancel-class-txt02">' + Utils.calPayday(this.oc_paymentdate, this.oc_shippingdate_tobe).format("YYYY.MM.DD") + '</div>';
            html += '<div class="cancel-class-txt02">' + moment(this.oc_shippingdate_tobe).format("YYYY.MM.DD") + '</div>';
            html += '</div>';
            html += '</div>';

            totalOrderPrice += parseInt(this.oc_originprice);
        });


        html += '<div class="float-wrap">';
        // html += '<div class="order-detail-area">';
        // html += '<div class="order-detail-info">';
        // html += '<div class="order-detail-info-tit">자동 결제 수단 정보</div>';
        // html += '<div class="order-detail-info-cont">';
        // html += '<table summary="결제정보 테이블" class="table-order-detail-info">';
        // html += '<colgroup>';
        // html += '<col class="order-detail-th-width" />';
        // html += '<col class="order-detail-td-width" />';
        // html += '</colgroup>';
        // html += '<tfoot>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">월 결제 예정 금액</th>';
        // html += '<td class="td-order-detail-info">'+ Utils.numberWithCommas(parseInt(orderData.classlist[0].oc_price) + parseInt(orderData.classlist[0].oc_shippingprice)) +'원</td>';
        // html += '</tr>';
        // html += '</tfoot>';
        // html += '<tbody>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">결제방법</th>';
        // html += '<td class="td-order-detail-info">신용카드 - 일시불</td>';
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">주문일</th>';
        // html += '<td class="td-order-detail-info">'+ moment(orderData.order_regdate).format("YYYY.MM.DD HH:mm") +'</td>';
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">총 클래스 가격</th>';
        // html += '<td class="td-order-detail-info">'+ Utils.numberWithCommas(parseInt(orderData.order_originprice)) +'원</td>';
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">정기구독 할인</th>';
        // if(orderData.order_discount > 0){
        //     html += '<td class="td-order-detail-info">'+ Utils.numberWithCommas(parseInt(orderData.order_originprice * (orderData.order_discount/100)) * -1) +'원('+ orderData.order_discount +'%)</td>';
        // } else {
        //     html += '<td class="td-order-detail-info">0원</td>';            
        // }
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">마일리지 할인</th>';
        // html += '<td class="td-order-detail-info">'+ Utils.numberWithCommas(parseInt(orderData.order_mileage) * -1) +'p</td>';
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">배송비</th>';
        // html += '<td class="td-order-detail-info">'+ Utils.numberWithCommas(parseInt(orderData.order_shippingprice)) + '원</td>';
        // html += '</tr>';
        // html += '<tr>';
        // html += '<th class="th-order-detail-info">정기구독 최종금액</th>';
        // html += '<td class="td-order-detail-info">'+ Utils.numberWithCommas(parseInt(orderData.order_price)+(parseInt(orderData.order_shippingprice)*orderData.classlist.length)) + '원</td>';
        // html += '</tr>'; 
        // html += '</tbody>';
        // html += '</table>';
        // html += '</div>';
        // html += '</div>';
        // html += '</div>';
        html += '<div class="order-detail-area">';
        html += '<div class="order-detail-info">';
        html += '<div class="order-detail-info-tit">배송지 정보</div>';
        html += '<div class="order-detail-info-cont">';
        html += '<table summary="배송지 정보 테이블" class="table-order-detail-info">';
        html += '<colgroup>';
        html += '<col class="order-detail-th-width" />';
        html += '<col class="order-detail-td-width" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">받는사람</th>';
        html += '<td class="td-order-detail-info">' + orderData.order_receivename + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">휴대폰번호</th>';
        html += '<td class="td-order-detail-info">' + orderData.order_receivephone + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">주소</th>';
        html += '<td class="td-order-detail-info">(' + orderData.order_receivezipcode + ') ' + orderData.order_receiveaddress + ' ' + orderData.order_receiveaddressdetail + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-order-detail-info">배송 요청사항</th>';
        if (orderData.order_receivecomment == null) {
            orderData.order_receivecomment = "";
        }
        html += '<td class="td-order-detail-info">' + orderData.order_receivecomment + '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="cancel-class-btn">';
        html += '<a href="#link" title="취미구독 신청서 인쇄하기" class="btn-cancel-class regular-print-btn">취미구독 신청서 인쇄하기</a>';
        html += '<a href="#link" title="확인" class="btn-cancel-class btn-order-cancel" onclick="hideStandingOrder();">확인</a>';
        html += '</div>';
        html += '<a href="#link" title="닫기" class="btn-layer-close" onclick="hideStandingOrder();">닫기</a>';
        html += '</div>';
        html += '</div>';

        $('.footer-wrap').before(html);
        $('#wrap').addClass("layer-on layer-standing-order-on");

        $('.regular-print-btn').off('click').on('click', function () {
            $('.layer-standing-order-cont').printThis({
                debug: false,
                importCSS: true,
                printContainer: true,
                pageTitle: "",
                removeInline: false
            });
        });
    };

    var drawEditSubscript = function (html) {
        $('.standing-order-wrap').hide();
        $('.standing-order-edit-wrap').show();

        $('.standing-order-edit-wrap').empty().append(html);
        $('.standing-order-edit-wrap').find('.standing-order-cont').addClass('standing-edit-on');
        $('.standing-order-edit-wrap').find('.standing-order-btn').remove();
        var html = '';
        html += '<div class="standing-edit-btn-wrap">';
        // html += '<a href="#link" title="정기구독 취소" class="btn-edit-standing-order cancel-standing-order-btn">정기구독 취소</a>';
        html += '<a href="#link" title="순서 변경 적용" class="btn-edit-standing-order apply-standing-order-btn">순서 변경 적용</a>';
        html += '</div>';

        $('.standing-order-edit-wrap').append(html);

        changeSubscriptListener();

        $('.cancel-standing-order-btn').off('click').on('click', function () {
            Popup.confirm("정기구독 해지", "정말로 해지하시겠습니까?<br>지금 해지하시면 다시 복구할 수 없으며<br>배송이 시작되지 않은 클래스는 결제가 진행되지 않습니다.", "취소", "해지",
                function () {
                    Popup.hide();
                }, function () {
                    Popup.hide();
                    var order_idx = $('.standing-order-edit-wrap').find('.standing-order-cont').attr('data-order-idx');
                    ApiRequest.delete("/subscript/" + order_idx, {}, function (res) {
                        console.log(res);
                        Popup.alert("정기구독 해지", "정기구독이 해지되었습니다.", "확인", function () {
                            Popup.hide();
                            getSubscriptList();
                        });
                    }, function (err) {
                        console.log(err);
                        Popup.alert("정기구독 해지 실패", "이미 배송이 되었거나 진행중인 정기구독입니다.", "확인", function () {
                            Popup.hide();
                            getSubscriptList();
                        });
                    });
                });
        });
        $('.apply-standing-order-btn').off('click').on('click', function () {
            Popup.alert("정기구독 일정 변경 완료", "정기구독 일정이 변경 되었습니다.<br>이후의 결제 및 배송은 변경된 순서대로 진행되오니<br>이점 착오 없으시기 바랍니다.", "확인",
                function () {
                    Popup.hide();
                    getSubscriptList();
                });
        });
    };

    function changeSubscriptListener() {
        $('.standing-order-edit-wrap .btn-edit-prev').off('click').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('btn-edit-off')) {
                return false;
            }
            var order_idx = $(this).attr('data-order-idx');
            var oc_idx = $(this).attr('data-oc-idx');
            var standing_order = $(this).parent().parent().parent();
            ApiRequest.put('/subscript/' + order_idx + '/order/' + oc_idx, {
                "order": "increase"
            }, function (res) {
                console.log(res);
                moveUp(standing_order);
            }, function (err) {
                console.log(err);
                Popup.alert("편집 실패", "해당 구독건은 편집이 불가능합니다.", "확인", function () {
                    Popup.hide();
                });
            });
        });

        $('.standing-order-edit-wrap .btn-edit-next').off('click').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('btn-edit-off')) {
                return false;
            }
            var order_idx = $(this).attr('data-order-idx');
            var oc_idx = $(this).attr('data-oc-idx');
            var standing_order = $(this).parent().parent().parent();
            ApiRequest.put('/subscript/' + order_idx + '/order/' + oc_idx, {
                "order": "decrease"
            }, function (res) {
                console.log(res);
                moveDown(standing_order);
            }, function (err) {
                console.log(err);
                Popup.alert("편집 실패", "해당 구독건은 편집이 불가능합니다.", "확인", function () {
                    Popup.hide();
                });
            });
        });
    }

    function moveUp(item) {
        var prev = item.prev();
        if (prev.length == 0)
            return;

        var prev_elem = prev.find('.standing-order-step-info').html();
        var prev_btn = prev.find('.standing-edit-btn').html();
        var prev_oc_idx = prev.find('.standing-edit-btn > .btn-edit-prev').attr('data-oc-idx');
        var item_elem = item.find('.standing-order-step-info').html();
        var item_btn = item.find('.standing-edit-btn').html();
        var item_oc_idx = item.find('.standing-edit-btn > .btn-edit-prev').attr('data-oc-idx');

        prev.find('.standing-order-step-info').html(item_elem);
        item.find('.standing-order-step-info').html(prev_elem);

        item.find('.standing-edit-btn').html(item_btn);
        prev.find('.standing-edit-btn').html(prev_btn);

        prev.find('.standing-edit-btn > .btn-edit-prev').attr('data-oc-idx', item_oc_idx);
        prev.find('.standing-edit-btn > .btn-edit-next').attr('data-oc-idx', item_oc_idx);
        item.find('.standing-edit-btn > .btn-edit-prev').attr('data-oc-idx', prev_oc_idx);
        item.find('.standing-edit-btn > .btn-edit-next').attr('data-oc-idx', prev_oc_idx);

        changeSubscriptListener();
    }

    function moveDown(item) {
        var next = item.next();
        if (next.length == 0)
            return;

        var next_elem = next.find('.standing-order-step-info').html();
        var next_btn = next.find('.standing-edit-btn').html();
        var next_oc_idx = next.find('.standing-edit-btn > .btn-edit-next').attr('data-oc-idx');
        var item_elem = item.find('.standing-order-step-info').html();
        var item_btn = item.find('.standing-edit-btn').html();
        var item_oc_idx = item.find('.standing-edit-btn > .btn-edit-next').attr('data-oc-idx');


        next.find('.standing-order-step-info').html(item_elem);
        item.find('.standing-order-step-info').html(next_elem);

        next.find('.standing-edit-btn').html(next_btn);
        item.find('.standing-edit-btn').html(item_btn);

        next.find('.standing-edit-btn > .btn-edit-prev').attr('data-oc-idx', item_oc_idx);
        next.find('.standing-edit-btn > .btn-edit-next').attr('data-oc-idx', item_oc_idx);
        item.find('.standing-edit-btn > .btn-edit-prev').attr('data-oc-idx', next_oc_idx);
        item.find('.standing-edit-btn > .btn-edit-next').attr('data-oc-idx', next_oc_idx);


        changeSubscriptListener();
    }

    var getEditPayment = function () {
        ApiRequest.get("/user/card", {}, function (res) {
            console.log(res);
            drawEditPayment(res);
        }, function (err) {
            console.log(err);
            var res = {"message": ""};
            drawEditPayment(res);
        });
    };
    var drawEditPayment = function (res) {
        $('.edit-payment-wrap').empty();
        var html = '';

        if (res.message) {
            html += '<div class="edit-payment-cont">';
            html += '<div class="order-detail-info-tit">결제수단 정보변경</div>';
            html += '<div class="edit-payment-area">';
            html += '<div class="edit-payment-type-wrap">';
            html += '<input type="radio" name="edit-payment" class="edit-payment-radio" checked id="edit-payment-credit" />';
            html += '<label for="edit-payment-credit" class="edit-payment-type edit-payment-credit">';
            html += '<div class="tit-credit"> ' + res.message.card_name + ' </div>';
            html += '<div class="num-credit">**** **** **** ' + (res.message.customer_name || 'XXXX') + '</div>';
            html += '</label>';
            html += '</div>';
            html += '<div class="edit-payment-info">';
            html += '<div class="edit-payment-info-tit">';
            html += '<span class="txt-color-r">신용카드</span> 및 <span class="txt-color-r">체크카드</span>로 정기 구독 결제를 진행합니다.';
            html += '</div>';
            html += '등록/변경된 카드로 이후의 모든 정기 구독 클래스가 정해진 결제일에 맞춰 자동으로 결제됩니다.<br/>';
            html += '만약 잘못된 정보 또는 잔액부족 등의 이유로 결제가 진행되지 않았을 경우, 정기구독 신청이 자동 취소되오니 카드정보 입력시 주의하시기 바랍니다.';
            html += '</div>';
            html += '<div class="payment-edit-btn">';
            html += '<a href="#payment" title="카드 정보 변경" class="btn-payment-edit edit-payment-card">카드 정보 변경</a>';
            html += '<a href="#payment" title="삭제" class="btn-payment-edit del-payment-card">삭제</a>';
            html += '</div>';
            html += '</div>';
            /*html += '<div class="edit-payment-area edit-payment-area-phone edit-payment-off">';
            html += '<div class="edit-payment-type-wrap">';
            html += '<input type="radio" name="edit-payment" class="edit-payment-radio" id="edit-payment-phone" disabled />';
            html += '<label for="edit-payment-phone" class="edit-payment-type edit-payment-phone">';
            html += '<div class="tit-phone">010-****-1234</div>';
            html += '</label>';
            html += '</div>';
            html += '<div class="edit-payment-info">';
            html += '<div class="edit-payment-info-tit">';
            html += '<span class="txt-color-r">휴대폰 소액 결제</span>로 정기 구독을 결제를 진행합니다. ';
            html += '</div>';
            html += '등록/변경된 휴대폰 요금으로 이후의 모든 정기 구독 클래스가 정해진 결제일에 맞춰 자동으로 결제됩니다.<br/>';
            html += '만약 잘못된 정보 또는 한도 초과 등의 이유로 결제가 진행되지 않았을 경우, 정기구독 신청이 자동 취소되오니 한도 금액을 확인해주시기 바랍니다.';
            html += '</div>';
            html += '<div class="payment-edit-btn">';
            html += '<a href="#payment" title="결제 수단 등록" class="btn-payment-edit register-payment-phone">결제 수단 등록</a>';
            html += '</div>';
            html += '</div>';*/
            html += '<div class="edit-payment-btn">';
            html += '<a href="#payment" title="결제 수단 적용" class="btn-edit-payment apply-payment-btn">결제 수단 적용</a>';
            html += '</div>';
            html += '</div>';
        } else {
            html += '<div class="edit-payment-cont">';
            html += '<div class="order-detail-info-tit">결제수단 정보변경</div>';
            html += '<div class="edit-payment-area edit-payment-off">';
            html += '<div class="edit-payment-type-wrap">';
            html += '<input type="radio" name="edit-payment" class="edit-payment-radio" id="edit-payment-credit" />';
            html += '<label for="edit-payment-credit" class="edit-payment-type edit-payment-credit">';
            html += '<div class="tit-credit">신용카드</div>';
            html += '<div class="num-credit">**** **** **** 0000</div>';
            html += '</label>';
            html += '</div>';
            html += '<div class="edit-payment-info">';
            html += '<div class="edit-payment-info-tit">';
            html += '<span class="txt-color-r">신용카드</span> 및 <span class="txt-color-r">체크카드</span>로 정기 구독 결제를 진행합니다.';
            html += '</div>';
            html += '등록/변경된 카드로 이후의 모든 정기 구독 클래스가 정해진 결제일에 맞춰 자동으로 결제됩니다.<br/>';
            html += '만약 잘못된 정보 또는 잔액부족 등의 이유로 결제가 진행되지 않았을 경우, 정기구독 신청이 자동 취소되오니 카드정보 입력시 주의하시기 바랍니다.';
            html += '</div>';
            html += '<div class="payment-edit-btn">';
            html += '<a href="#payment" title="결제 수단 등록" class="btn-payment-edit register-payment-card">결제 수단 등록</a>';
            html += '</div>';
            html += '</div>';
            /*html += '<div class="edit-payment-area edit-payment-area-phone edit-payment-off">';
            html += '<div class="edit-payment-type-wrap">';
            html += '<input type="radio" name="edit-payment" class="edit-payment-radio" id="edit-payment-phone" disabled />';
            html += '<label for="edit-payment-phone" class="edit-payment-type edit-payment-phone">';
            html += '<div class="tit-phone">010-****-1234</div>';
            html += '</label>';
            html += '</div>';
            html += '<div class="edit-payment-info">';
            html += '<div class="edit-payment-info-tit">';
            html += '<span class="txt-color-r">휴대폰 소액 결제</span>로 정기 구독을 결제를 진행합니다. ';
            html += '</div>';
            html += '등록/변경된 휴대폰 요금으로 이후의 모든 정기 구독 클래스가 정해진 결제일에 맞춰 자동으로 결제됩니다.<br/>';
            html += '만약 잘못된 정보 또는 한도 초과 등의 이유로 결제가 진행되지 않았을 경우, 정기구독 신청이 자동 취소되오니 카드정보 입력시 주의하시기 바랍니다.';
            html += '</div>';
            html += '<div class="payment-edit-btn">';
            html += '<a href="#payment" title="결제 수단 등록" class="btn-payment-edit register-payment-phone">결제 수단 등록</a>';
            html += '</div>';
            html += '</div>';*/
            html += '<div class="edit-payment-btn">';
            html += '<a href="#payment" title="결제 수단 적용" class="btn-edit-payment apply-payment-btn">결제 수단 적용</a>';
            html += '</div>';
            html += '</div>';
        }
        $('.edit-payment-wrap').append(html);
        paymentListener();
    };
    var paymentListener = function () {
        $('.register-payment-phone').off('click').on('click', function () {
            Popup.alert("결제 정보 등록", "모바일 결제는 준비중입니다.", "확인", function () {
                Popup.hide();
            });
        });

        $('.register-payment-card').off('click').on('click', function () {
            Popup.regPayment({
                success: getEditPayment
            });
        });
        $('.edit-payment-card').off('click').on('click', function () {
            Popup.confirm("결제카드 정보 변경", "결제 카드 정보를 변경합니다.<br>변경하시겠습니까?", "취소", "변경", function () {
                Popup.hide();
            }, function () {
                Popup.hide();

                Popup.regPayment({
                    success: getEditPayment
                });
            });
        });
        $('.del-payment-card').off('click').on('click', function () {
            ApiRequest.get("/order", {
                "amount": 999,
                "page": 1
            }, function (res) {
                console.log(res);
                var isDelete = true;
                $.each(res.list, function () {
                    if (this.oc_status == "STANBY" || this.oc_status == "PAYED" || this.oc_status == "PREPARESHIPPING" || this.oc_status == "SHIPPED") {
                        isDelete = false;
                    }
                });
                if (isDelete) {
                    ApiRequest.delete("/user/card", {}, function (res) {
                        console.log(res);
                        getEditPayment();
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    Popup.alert("결제카드 정보 삭제", "결제 카드 정보를 삭제하시려면<br>다른 결제 수단을 등록(선택)하거나<br>진행중인 정기구독을 해지해 주세요.", "확인", function () {
                        Popup.hide();
                    });
                }
            }, function (err) {
                console.log(err);
                Popup.alert("결제카드 정보 삭제", "결제 카드 정보를 삭제하시려면<br>다른 결제 수단을 등록(선택)하거나<br>진행중인 정기구독을 해지해 주세요.", "확인", function () {
                    Popup.hide();
                });
            });
        });

        $('.apply-payment-btn').off('click').on('click', function () {
            Popup.alert("결제수단 변경 완료", "정기구독 결제수단이 변경되었습니다.<br>이후의 구독일정에 따라 진행되는 결제는<br>변경된 결제 수단으로 진행됩니다.", "확인", function () {
                Popup.hide();
                getEditPayment();
            });
        });
    };

    var deliveryList = [];
    var deliveryData = {};
    var getDeliveryList = function () {
        ApiRequest.get('/user/address', {
            "amount": addressAmount,
            "page": addressPage
        }, function (res) {
            console.log(res);
            $('.mymenu-address').parent().show();
            $('.sub-menu-newaddress').removeClass('btn-mymenu-sub-on');
            $('.sub-menu-addresslist').addClass('btn-mymenu-sub-on');
            $('.delivery-list-wrap').show();
            $('.edit-delivery-wrap').hide();
            drawDeliveryList(res);
            deliveryList = res.list;
        }, function (err) {
            console.log(err);
        });
    };
    var drawDeliveryList = function (res) {
        $('.delivery-list-wrap').empty();
        var html = '';

        if (res.list.length == 0) {
            html += '<div class="no-view-wrap">';
            html += '<div class="no-view-tit">아직 등록된 배송지가 없습니다.</div>';
            html += '<div class="no-view-txt">배송지를 등록해주세요.</div>';
            html += '<a href="#delevery" title="배송지 등록하기" class="btn-no-view register-new-address">배송지 등록하기</a>';
            html += '</div>';
        } else {
            $.each(res.list, function (idx) {
                html += '<div class="delivery-list-cont">';
                html += '<div class="delivery-list-title">';
                html += this.address_title;
                if (this.default == "Y") {
                    html += '<span class="txt-color-r">[기본]</span>';
                }
                html += '</div>';
                html += '<div class="delivery-list-area delivery-list-name">';
                html += '<div class="delivery-list-tit">수령인</div>';
                html += '<div class="delivery-list-txt">' + this.address_receivename + '</div>';
                html += '</div>';
                html += '<div class="delivery-list-area delivery-list-phone">';
                html += '<div class="delivery-list-tit">휴대폰번호</div>';
                html += '<div class="delivery-list-txt">' + this.address_receivephone + '</div>';
                html += '</div>';
                html += '<div class="delivery-list-area delivery-list-address">';
                html += '<div class="delivery-list-tit">주소지</div>';
                html += '<div class="delivery-list-txt">(' + this.zonecode + ') ' + this.address + ' ' + this.address_detail + '</div>';
                html += '</div>';
                html += '<div class="delivery-list-btn">';
                html += '<a href="#link" title="수정" data-arr-idx="' + idx + '" class="btn-delivery-list edit-address-btn">수정</a>';
                html += '<a href="#link" title="삭제" data-address-id="' + this.address_idx + '" class="btn-delivery-list delete-address-btn">삭제</a>';
                html += '</div>';
                html += '</div>';

            });

            html += '<div class="paging-num-wrap">';
            html += '<a href="#link" title="1" class="btn-num btn-num-on">1</a>';
            html += '</div>';
        }

        $('.delivery-list-wrap').append(html);
        $('.register-new-address').off('click').on('click', function () {
            setEditDelivery('new');
        });
        $('.edit-address-btn').off('click').on('click', function () {
            var arr_idx = parseInt($(this).attr('data-arr-idx'));
            deliveryData = deliveryList[arr_idx];
            setEditDelivery('edit');
        });

        $('.delete-address-btn').off('click').on('click', function () {
            var address_idx = $(this).attr('data-address-id');
            Popup.confirm("배송지 삭제", "선택하신 배송지를 삭제하시겠습니까?", "취소", "삭제", function () {
                Popup.hide();
            }, function () {
                Popup.hide();
                ApiRequest.delete('/user/address/' + address_idx, {}, function (res) {
                    console.log(res);
                    Popup.alert("배송지 삭제 완료", "배송지가 삭제되었습니다.", "확인", function () {
                        Popup.hide();
                        getDeliveryList();
                    });
                }, function (err) {
                    console.log(err);
                });
            });
        });
    };

    var setEditDelivery = function (type) {
        addressParam = {};
        if (type == "edit") {
            addressParam = deliveryData;
        }
        $('.mymenu-address').parent().show();
        if (type == 'new') {
            $('.sub-menu-addresslist').removeClass('btn-mymenu-sub-on');
            $('.sub-menu-newaddress').addClass('btn-mymenu-sub-on');
        }
        $('.delivery-list-wrap').hide();
        $('.edit-delivery-wrap').show().empty();
        var html = '';

        html += '<div class="edit-delivery-cont">';
        html += '<table class="edit-delivery-table" summary="배송지 입력 테이블">';
        html += '<colgroup>';
        html += '<col class="th-edit-delivery" />';
        html += '<col class="td-edit-delivery" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="th-edit-delivery">배송지명</th>';
        html += '<td class="td-edit-delivery">';
        html += '<div class="edit-delivery-area">';
        html += '<span class="input-wrap input-type02">';
        if (type == "edit") {
            html += '<input type="text" class="input delivery address-name" value="' + deliveryData.address_title + '" />';
        } else {
            html += '<input type="text" class="input delivery address-name" value="" />';
        }
        html += '</span>';
        html += '</div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-edit-delivery">수령자명</th>';
        html += '<td class="td-edit-delivery">';
        html += '<div class="edit-delivery-area">';
        html += '<span class="input-wrap input-type02">';
        if (type == "edit") {
            html += '<input type="text" class="input receive-name" value="' + deliveryData.address_receivename + '" />';
        } else {
            html += '<input type="text" class="input receive-name" value="" />';
        }
        html += '</span>';
        html += '</div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-edit-delivery">휴대전화</th>';
        html += '<td class="td-edit-delivery">';
        html += '<div class="edit-delivery-area">';
        html += '<span class="input-wrap input-type03">';
        if (type == "edit") {
            html += '<input type="text" class="input phone-first" value="' + deliveryData.address_receivephone.substring(0, 3) + '" />';
        } else {
            html += '<input type="text" class="input phone-first" value="" />';
        }
        html += '</span>';
        html += '<span class="input-wrap input-type03">';
        if (type == "edit") {
            html += '<input type="text" class="input phone-middle" value="' + deliveryData.address_receivephone.substring(3, 7) + '" />';
        } else {
            html += '<input type="text" class="input phone-middle" value="" />';
        }
        html += '</span>';
        html += '<span class="input-wrap input-type03">';
        if (type == "edit") {
            html += '<input type="text" class="input phone-last" value="' + deliveryData.address_receivephone.substring(7, 11) + '" />';
        } else {
            html += '<input type="text" class="input phone-last" value="" />';
        }
        html += '</span>';
        html += '</div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-edit-delivery">추가번호<div class="txt-sub">(선택)</div></th>';
        html += '<td class="td-edit-delivery">';
        html += '<div class="edit-delivery-area">';
        html += '<span class="input-wrap input-type03">';
        if (type == "edit") {
            html += '<input type="text" class="input phone2-first" value="' + deliveryData.address_receivephone2.substring(0, 3) + '" />';
        } else {
            html += '<input type="text" class="input phone2-first" value="" />';
        }
        html += '</span>';
        html += '<span class="input-wrap input-type03">';
        if (type == "edit") {
            html += '<input type="text" class="input phone2-middle" value="' + deliveryData.address_receivephone2.substring(3, 7) + '" />';
        } else {
            html += '<input type="text" class="input phone2-middle" value="" />';
        }
        html += '</span>';
        html += '<span class="input-wrap input-type03">';
        if (type == "edit") {
            html += '<input type="text" class="input phone2-last" value="' + deliveryData.address_receivephone2.substring(7, 11) + '" />';
        } else {
            html += '<input type="text" class="input phone2-last" value="" />';
        }
        html += '</span>';
        html += '</div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="th-edit-delivery">주소</th>';
        html += '<td class="td-edit-delivery">';
        html += '<div class="edit-delivery-area">';
        html += '<span class="input-wrap input-type04">';
        if (type == "edit") {
            html += '<input type="text" class="input new-address-zipcode" value="' + deliveryData.zonecode + '" />';
        } else {
            html += '<input type="text" class="input new-address-zipcode" value="" />';
        }
        html += '</span>';
        html += '<a href="#link" title="우편번호" class="btn-post-num get-zipcode">우편번호</a>';
        html += '</div>';
        html += '<div class="edit-delivery-area inline-45">';
        html += '<span class="input-wrap">';
        if (type == "edit") {
            html += '<input type="text" class="input new-address" value="' + deliveryData.address + '" />';
        } else {
            html += '<input type="text" class="input new-address" value="" />';
        }
        html += '</span>';
        html += '</div>';
        html += '<div class="edit-delivery-area inline-45">';
        html += '<span class="input-wrap">';
        if (type == "edit") {
            html += '<input type="text" class="input new-address-detail" value="' + deliveryData.address_detail + '" />';
        } else {
            html += '<input type="text" class="input new-address-detail" value="" />';
        }
        html += '</span>';
        html += '</div>';
        html += '<div class="edit-delivery-area">';
        if (type == "edit" && deliveryData.default == "Y") {
            html += '<input type="checkbox" id="basic-delivery" class="btn-join-agree" checked />';
        } else {
            html += '<input type="checkbox" id="basic-delivery" class="btn-join-agree" />';
        }
        html += '<label for="basic-delivery" class="label-basic-delivery join-agree-label">기본 배송지로 저장</label>';
        html += '</div>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '<div class="edit-delivery-btn">';
        if (type == 'edit') {
            html += '<a href="#link" data-address-idx="' + deliveryData.address_idx + '" title="배송지 수정하기" class="btn-edit-delivery edit-address">배송지 수정하기</a>';
        } else {
            html += '<a href="#link" title="배송지 추가하기" class="btn-edit-delivery register-address">배송지 추가하기</a>';
        }
        html += '</div>';
        html += '</div>';

        $('.edit-delivery-wrap').append(html);

        $('.get-zipcode').off('click').on('click', function (e) {
            e.preventDefault();
            new Popup.FindPostCode({
                isAutoResize: true
            }).open()
                .then(function (data) {
                    console.log(data);
                    $('.order_receivezipcode').val(data.zonecode);
                    $('.order_receiveaddress').val(data.address);
                    $('.order_receiveaddressdetail').focus();
                    getShippingPrice();
                })
                .catch(function (data) {
                })
            ;
        });

        $('.edit-address').off('click').on('click', function () {
            var address_idx = $(this).attr('data-address-idx');
            var address_name = $('.address-name').val();
            if (address_name == '') {
                Popup.alert("배송지 수정 실패", "배송지 명을 입력해주세요.", "확인", function () {
                    Popup.hide();
                })
                return false;
            }
            var receive_name = $('.receive-name').val();
            if (receive_name == '') {
                Popup.alert("배송지 수정 실패", "수령자 명을 입력해주세요.", "확인", function () {
                    Popup.hide();
                })
                return false;
            }

            var phone = $('.phone-first').val() + $('.phone-middle').val() + $('.phone-last').val();
            var phone2 = $('.phone2-first').val() + $('.phone2-middle').val() + $('.phone2-last').val();
            var zipcode = $('.new-address-zipcode').val();
            var address = $('.new-address').val();
            if (zipcode == '' || address == '') {
                Popup.alert("배송지 수정 실패", "정확한 주소를 입력해 주세요.", "확인", function () {
                    Popup.hide();
                })
                return false;
            }
            var address_detail = $('.new-address-detail').val();
            var basic_address = $('#basic-delivery').is(":checked");
            addressParam['address_title'] = address_name;
            addressParam['address_receivename'] = receive_name;
            addressParam['address_receivephone'] = phone;
            addressParam['address_receivephone2'] = phone2;
            addressParam['address_detail'] = address_detail;
            addressParam['zonecode'] = zipcode;
            if (basic_address) {
                addressParam['default'] = "Y";
            } else {
                addressParam['default'] = "N";
            }

            ApiRequest.put("/user/address/" + address_idx, addressParam, function (res) {
                console.log(res);
                Popup.alert("배송지 변경", "배송지 정보가 변경 되었습니다.<br><br>!!주의!!<br>현재 주문에는 적용되지 않습니다.<br>정기구독의 주소 수정은 1:1 문의를 이용 바랍니다.", "확인", function () {
                    Popup.hide();
                    getDeliveryList();
                });
            }, function (err) {
                console.log(err);
            });
        });


        $('.register-address').off('click').on('click', function () {
            var address_name = $('.address-name').val();
            if (address_name == '') {
                Popup.alert("배송지 등록 실패", "배송지 명을 입력해주세요.", "확인", function () {
                    Popup.hide();
                })
                return false;
            }
            var receive_name = $('.receive-name').val();
            if (receive_name == '') {
                Popup.alert("배송지 등록 실패", "수령자 명을 입력해주세요.", "확인", function () {
                    Popup.hide();
                })
                return false;
            }

            var phone = $('.phone-first').val() + $('.phone-middle').val() + $('.phone-last').val();
            var phone2 = $('.phone2-first').val() + $('.phone2-middle').val() + $('.phone2-last').val();
            var zipcode = $('.new-address-zipcode').val();
            var address = $('.new-address').val();
            if (zipcode == '' || address == '') {
                Popup.alert("배송지 등록 실패", "정확한 주소를 입력해 주세요.", "확인", function () {
                    Popup.hide();
                })
                return false;
            }
            var address_detail = $('.new-address-detail').val();
            var basic_address = $('#basic-delivery').is(":checked");
            addressParam['address_title'] = address_name;
            addressParam['address_receivename'] = receive_name;
            addressParam['address_receivephone'] = phone;
            addressParam['address_receivephone2'] = phone2;
            addressParam['address_detail'] = address_detail;
            if (basic_address) {
                addressParam['default'] = "Y";
            } else {
                addressParam['default'] = "N";
            }

            ApiRequest.post("/user/address", addressParam, function (res) {
                console.log(res);
                Popup.alert("배송지 추가", "새로운 배송지가 등록 되었습니다.", "확인", function () {
                    Popup.hide();
                    getDeliveryList();
                });
            }, function (err) {
                console.log(err);
            });
        });
    };


    var setMyCommentListTab = function (type) {
        var html = '';
        html += '<ul class="mymenu-sub-tab-list">';
        if (type === 'award') {
            html += '<li class="mymenu-sub-tab"><a href="/mypage.shop?m=action-history&s=comment&type=magazine" title="매거진 댓글 보기" data-tabtype="magazine" class="btn-sub-tab btn-comment-tab">매거진 댓글 보기</a></li>';
            html += '<li class="mymenu-sub-tab"><a href="/mypage.shop?m=action-history&s=comment&type=award" title="어워드 댓글 보기" data-tabtype="award" class="btn-sub-tab btn-comment-tab btn-sub-on">어워드 댓글 보기</a></li>';
        } else {
            html += '<li class="mymenu-sub-tab"><a href="/mypage.shop?m=action-history&s=comment&type=magazine" title="매거진 댓글 보기" data-tabtype="magazine" class="btn-sub-tab btn-comment-tab btn-sub-on">매거진 댓글 보기</a></li>';
            html += '<li class="mymenu-sub-tab"><a href="/mypage.shop?m=action-history&s=comment&type=award" title="어워드 댓글 보기" data-tabtype="award" class="btn-sub-tab btn-comment-tab">어워드 댓글 보기</a></li>';
        }
        html += '</ul>';
        $('.mymenu-sub-tab-wrap').append(html);
        getMyCommentList(type);
    };

    var getMyCommentList = function (type) {
        if (type == "magazine") {
            ApiRequest.get('/user/magazine/comment', {
                "amount": commentAmount,
                "page": commentPage
            }, function (res) {
                console.log(res);
                commentTotal = res.count;
                drawMyCommentList(type, res);
            }, function (err) {
                console.log(err);
            });
        } else {
            ApiRequest.get('/user/award/comment', {
                "amount": commentAmount,
                "page": commentPage
            }, function (res) {
                console.log(res);
                commentTotal = res.count;
                drawMyCommentList(type, res);
            }, function (err) {
                console.log(err);
            });
        }
    };
    var drawMyCommentList = function (type, res) {
        $('.view-reply-wrap').empty();
        var html = '';
        if (type == "magazine") {
            if (res.list.length == 0) {
                html += '<div class="no-view-wrap">';
                html += '<div class="no-view-tit">아직 작성하신 댓글이 없어요.</div>';
                html += '<div class="no-view-txt">첫 번째 댓글을 남겨 보세요!</div>';
                html += '<a href="/magazine.html" title="매거진 둘러보기" class="btn-no-view">매거진 둘러보기</a>';
                html += '</div>';
            }
            $.each(res.list, function () {
                html += '<div class="magazine-list-wrap">';
                html += '<ul class="magazine-list">';
                html += '<li class="magazine-list-cont">';
                html += '<div class="magazine-list-area">';
                html += '<div class="magazine-list-thumb">';
                html += '<img src="' + IMG_URL + 'magazine/' + this.mz_thumbnail + '" class="thumb-magazine-list" alt="" />';
                html += '<span class="thumb-slide-play">재생</span>';
                html += '</div>';
                html += '<a href="view-magazine.html?id=' + this.mz_idx + '#commentGroup-' + this.mct_group + '" title="' + this.mz_title + '">';
                html += '<div class="magazine-list-info">';
                html += '<span class="magazine-list-tit cut-txt">' + this.mc_title + '</span>';
                html += '<strong class="magazine-list-txt">' + this.mz_title + '</strong>';
                html += '</div>';
                html += '</a>';
                html += '</div>';
                html += '<div class="magazine-reply-wrap">';
                html += '<div class="magazine-reply-tit">';
                html += '<div class="magazine-reply-nick">' + this.user_nickname + (this.mct_sub === 'Y' ? ' (대댓글)' : '') + '</div>';
                html += '<div class="magazine-reply-info">';
                html += '<span class="magazine-reply-date">';
                html += moment(this.mct_regdate).utcOffset("+09:00").format("YYYY.MM.DD ");
                var hour = moment(this.mct_regdate).utcOffset("+09:00").format("H");
                var am = '오전 ';
                if (hour > 12) {
                    hour = hour - 12;
                    am = '오후 ';
                }
                html += am + hour + '시' + moment(this.mct_regdate).utcOffset("+09:00").format("mm분");

                html += '</span>';
                html += '<a href="#link" title="삭제" data-mz-idx="' + this.mz_idx + '" data-mct-idx="' + this.mct_idx + '" class="btn-del-reply btn-del-magazine-comment">삭제</a>';
                html += '</div>';
                html += '</div>';
                html += '<div class="magazine-reply-cont">';
                html += Utils.escapeHtml(this.mct_contents).replace(/\n/g,'<br>');
                html += '</div>';
                html += '</div>';
                html += '</li>';
                html += '</ul>';
                html += '</div>';
            });
        } else {
            if (res.list.length == 0) {
                html += '<div class="no-view-wrap">';
                html += '<div class="no-view-tit">아직 작성하신 댓글이 없어요.</div>';
                html += '<div class="no-view-txt">첫 번째 댓글을 남겨 보세요!</div>';
                html += '<a href="#link" title="어워드 보기" class="btn-no-view">어워드 보기</a>';
                html += '</div>';
            }

            $.each(res.list, function () {
                html += '<div class="magazine-list-wrap">';
                html += '<ul class="magazine-list">';
                html += '<li class="magazine-list-cont">';
                html += '<div class="magazine-list-area">';
                html += '<div class="magazine-list-thumb">';
                html += '<img src="' + IMG_URL + 'award/contents/' + this.ac_image + '" class="thumb-magazine-list" alt="" />';
                html += '<span class="thumb-slide-play">재생</span>';
                html += '</div>';
                html += '<a href="/award.html?award_id=' + this.award_idx + '" title="' + this.ac_title + '">';
                html += '<div class="magazine-list-info">';
                html += '<span class="magazine-list-tit cut-txt">' + this.award_title + '</span>';
                html += '<strong class="magazine-list-txt">' + this.ac_title + '</strong>';
                html += '</div>';
                html += '</a>';
                html += '</div>';
                html += '<div class="magazine-reply-wrap">';
                html += '<div class="magazine-reply-tit">';
                html += '<div class="magazine-reply-nick">' + this.user_nickname + '</div>';
                html += '<div class="magazine-reply-info">';
                html += '<span class="magazine-reply-date">';
                html += moment(this.act_regdate).utcOffset("+09:00").format("YYYY.MM.DD ");
                var hour = moment(this.act_regdate).utcOffset("+09:00").format("H");
                var am = '오전 ';
                if (hour > 12) {
                    hour = hour - 12;
                    am = '오후 ';
                }
                html += am + hour + '시' + moment(this.act_regdate).utcOffset("+09:00").format("mm분");
                html += '</span>';
                html += '<a href="#link" title="삭제" data-award-idx="' + this.award_idx + '" data-ac-idx="' + this.ac_idx + '" data-act-idx="' + this.act_idx + '" class="btn-del-reply btn-del-award-comment">삭제</a>';
                html += '</div>';
                html += '</div>';
                html += '<div class="magazine-reply-cont">';
                html += Utils.escapeHtml(this.act_contents).replace(/\n/g, '<br>');
                html += '</div>';
                html += '</div>';
                html += '</li>';
                html += '</ul>';
                html += '</div>';
            });
        }

        /* Paging */
        var totalPage = Math.ceil(commentTotal / commentAmount);
        html += '<div class="paging-num-wrap">';
        for (var i = 1; i <= totalPage; i++) {
            if (commentPage == i) {
                html += '<a href="#link" title="' + i + '" data-type="' + type + '" data-page="' + i + '" class="comment-page-btn btn-num btn-num-on">' + i + '</a>';
            } else {
                html += '<a href="#link" title="' + i + '" data-type="' + type + '" data-page="' + i + '" class="comment-page-btn btn-num">' + i + '</a>';
            }
        }
        html += '</div>';

        $('.view-reply-wrap').append(html);

        $('.comment-page-btn').off('click').on('click', function () {
            commentPage = parseInt($(this).attr('data-page'));
            var commentType = $(this).attr('data-type');
            getMyCommentList(commentType);
        });

        $('.btn-del-magazine-comment').off('click').on('click', function (e) {
            e.preventDefault();
            var mz_idx = $(this).attr('data-mz-idx');
            var mct_idx = $(this).attr('data-mct-idx');
            Popup.confirm("삭제", "정말로 삭제하시겠습니까?<br>삭제된 글은 복구하실 수 없습니다.", "취소", "삭제", function () {
                Popup.hide();
            }, function () {
                Popup.hide();
                ApiRequest.delete("/magazine/content/" + mz_idx + "/comment/" + mct_idx, {}, function (res) {
                    console.log(res);
                    Popup.alert("삭제", "코멘트가 삭제되었습니다.", "확인", function () {
                        Popup.hide();
                        getMyCommentList('magazine');
                    });
                }, function (err) {
                    console.log(err);
                    Popup.hide();
                });
            });

        });

        $('.btn-del-award-comment').off('click').on('click', function (e) {
            e.preventDefault();
            var award_idx = $(this).attr('data-award-idx');
            var ac_idx = $(this).attr('data-ac-idx');
            var act_idx = $(this).attr('data-act-idx');

            Popup.confirm("삭제", "정말로 삭제하시겠습니까?<br>삭제된 글은 복구하실 수 없습니다.", "취소", "삭제", function () {
                Popup.hide();
            }, function () {
                Popup.hide();
                ApiRequest.delete("/award/" + award_idx + "/contents/" + ac_idx + "/comment/" + act_idx, {}, function (res) {
                    Popup.alert("삭제", "코멘트가 삭제되었습니다.", "확인", function () {
                        Popup.hide();
                        getMyCommentList('award');
                    });
                }, function (err) {
                    console.log(err);
                    Popup.hide();
                });
            });
        });
    };


    var setMyClassReviewTab = function (type) {
        var html = '';
        html += '<div class="reply-info-cont">';
        html += '<div class="reply-info-area">';
        html += '1. 구매한 취미 클래스의 후기를 작성해 주세요. 구매 후기를 등록하시는 분들께 감사의 마일리지를 드립니다.';
        html += '<p class="reply-info-point">';
        html += '• 사진없이 글만 작성한 경우 : 200p<br/>';
        html += '• 사진을 함께 첨부한 경우 : 1,000p<br/>';
        html += '</p>';
        html += '2. 마일리지는 처음 작성된 후기를 기준으로 지급됩니다.<br/>';
        html += '3.	구매 후기는 배송이 완료된 이후부터 작성할 수 있습니다.<br/>';
        html += '4. 작성한 구매 후기를 삭제하는 경우 지급한 마일리지는 반환됩니다.<br/>';
        html += '5. 구매 취소/반품 할 경우에는 지급된 마일리지가 반환됩니다.';
        html += '</div>';
        html += '<a href="#link" title="구매 후기 작성 혜택 보기" class="btn-view-reply-info btn-show-reply-info">구매 후기 작성 혜택 보기</a>';
        html += '<a href="#link" title="구매 후기 작성 혜택 닫기" class="btn-view-reply-info btn-hide-reply-info">구매 후기 작성 혜택 닫기</a>';
        html += '</div>';
        $('.reply-info-wrap').append(html);

        $('.mymenu-sub-tab-wrap').empty();
        var html = '';
        html += '<ul class="mymenu-sub-tab-list">';
        if (type == 'writer') {
            html += '<li class="mymenu-sub-tab"><a href="/mypage.shop?m=action-history&s=review&type=writer" title="구매 후기 작성" data-tabtype="writer" class="btn-sub-tab btn-review-tab btn-sub-on">구매 후기 작성</a></li>';
            html += '<li class="mymenu-sub-tab"><a href="/mypage.shop?m=action-history&s=review&type=history" title="클래수 후기 목록" data-tabtype="history" class="btn-sub-tab btn-review-tab">구매 후기 목록</a></li>';
        } else {
            html += '<li class="mymenu-sub-tab"><a href="/mypage.shop?m=action-history&s=review&type=writer" title="구매 후기 작성" data-tabtype="writer" class="btn-sub-tab btn-review-tab">구매 후기 작성</a></li>';
            html += '<li class="mymenu-sub-tab"><a href="/mypage.shop?m=action-history&s=review&type=history" title="클래수 후기 목록" data-tabtype="history" class="btn-sub-tab btn-review-tab btn-sub-on">구매 후기 목록</a></li>';
        }
        html += '</ul>';
        $('.mymenu-sub-tab-wrap').append(html);

        $('.btn-show-reply-info').off('click').on('click', function () {
            $('.reply-info-wrap').addClass('reply-info-on');
        });
        $('.btn-hide-reply-info').off('click').on('click', function () {
            $('.reply-info-wrap').removeClass('reply-info-on');
        });

        getMyClassReview(type);
    };
    var getMyClassReview = function (type) {
        if (type == 'writer') {
            ApiRequest.get("/user/class/review", {
                "amount": reviewAmount,
                "page": reviewPage,
                "reviewed": "N"
            }, function (res) {
                console.log(res);
                reviewTotal = res.count;
                drawMyClassReviewWriter(res);
            }, function (err) {
                console.log(err);
            });
        } else {
            ApiRequest.get("/user/class/review", {
                "amount": reviewAmount,
                "page": reviewPage,
                "reviewed": "Y"
            }, function (res) {
                console.log(res);
                reviewTotal = res.count;
                reviewData = res;
                drawMyClassReviewHistory(res);
            }, function (err) {
                console.log(err);
            });
        }
    };
    var drawMyClassReviewWriter = function (res) {
        $('.reply-class-wrap').empty();
        $('.reply-class-list-wrap').empty();
        var html = '';

        if (res.list.length == 0) {
            html += '<div class="no-view-wrap">';
            html += '<div class="no-view-tit">후기를 작성할 수 있는 클래스가 아직 없습니다.</div>';
            html += '<div class="no-view-txt">';
            html += '구매 후기는 배송완료 후에 작성하실 수 있습니다.';
            html += '</div>';
            html += '<a href="/mypage.shop?m=order&s=order" title="주문/배송 조회로 이동" class="btn-no-view">주문/배송 조회로 이동</a>';
            html += '</div>';
        } else {
            $.each(res.list, function () {
                html += '<div class="order-list-cont">';
                html += '<div class="order-list-area">';
                html += '<div class="order-list-thumb">';
                html += '<img src="' + IMG_URL + 'class/thumbs/' + this.thumbnail_image.replace('-resize', '-square') + '" alt="" class="thumb-order-list">';
                html += '</div>';
                html += '<div class="order-list-date">';
                html += '<div class="order-list-tit">주문일자</div>';
                html += '<div class="order-list-txt">' + moment(this.order_regdate).format("YYYY.MM.DD") + '</div>';
                html += '</div>';
                html += '<div class="order-list-name">';
                html += '<div class="order-list-tit">클래스명</div>';
                html += '<div class="order-list-txt cut-txt">' + this.class_name + '</div>';
                html += '</div>';
                html += '<div class="order-list-btn">';
                html += '<a href="#reiew" title="후기작성" data-class-idx="' + this.class_idx + '" class="btn-order-list btn-order-on class-reply-write">후기작성</a>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
            });
            /* Paging */
            var totalPage = Math.ceil(reviewTotal / reviewAmount);
            html += '<div class="paging-num-wrap">';
            for (var i = 1; i <= totalPage; i++) {
                if (reviewPage == i) {
                    html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="review-page-btn btn-num btn-num-on">' + i + '</a>';
                } else {
                    html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="review-page-btn btn-num">' + i + '</a>';
                }
            }
            html += '</div>';
        }

        $('.reply-class-wrap').append(html);

        $('.review-page-btn').off('click').on('click', function () {
            reviewPage = parseInt($(this).attr('data-page'));
            getMyClassReview('writer');
        });

        $('.class-reply-write').off('click').on('click', function (e) {
            var class_idx = $(this).attr('data-class-idx');
            Popup.confirm("구매 후기 혜택 안내", "구매 후기 등록시<br>다음과 같이 마일리지를 드립니다.<br><br><b>• 사진 없이 글만 작성한 경우 : 200p</b><br><b>• 사진을 함께 첨부한 경우 : 1,000p</b><br>",
                "취소", "작성하기", function () {
                    Popup.hide();
                }, function () {
                    Popup.hide();
                    showWriteClassReview(class_idx);
                });
        });
    };

    var showWriteClassReview = function (class_idx, type, idx) {
        $('.write-reply-wrap').remove();
        $('.write-ask-wrap').empty();
        var html = '';
        if (type == "edit") {
            star = reviewData.list[idx].cr_star;
            files = [];
            reviewFileLength = 0;
            cri_list = [];

            html += '<div class="layer-wrap write-reply-wrap" id="write-reply-wrap">';
            html += '<div class="bg-layer-wrap" onclick="Mypage.hideWriteReply();"></div>';
            html += '<div class="write-reply-cont">';
            html += '<h2 class="layer-tit">구매 후기 수정</h2>';
            html += '<div class="write-reply-area">';
            html += '<div class="write-reply">';
            html += '<div class="write-reply-tit">작성자</div>';
            html += '<div class="write-reply-input">';
            html += '<div class="input-wrap">';
            html += '<input type="text" class="input reply-writer" placeholder="" value="' + MyProfile.userinfo.user_nickname + '" />';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="write-reply">';
            html += '<div class="write-reply-tit">별점</div>';
            html += '<div class="write-reply-input">';
            html += '<div class="input-star-wrap input-star-on' + star + '" id="input-star-wrap">';
            html += '<a href="#link" class="input-star10 input-star" data-star="10" title="10점">10점</a>';
            html += '<a href="#link" class="input-star9 input-star" data-star="9" title="9점">9점</a>';
            html += '<a href="#link" class="input-star8 input-star" data-star="8" title="8점">8점</a>';
            html += '<a href="#link" class="input-star7 input-star" data-star="7" title="7점">7점</a>';
            html += '<a href="#link" class="input-star6 input-star" data-star="6" title="6점">6점</a>';
            html += '<a href="#link" class="input-star5 input-star" data-star="5" title="5점">5점</a>';
            html += '<a href="#link" class="input-star4 input-star" data-star="4" title="4점">4점</a>';
            html += '<a href="#link" class="input-star3 input-star" data-star="3" title="3점">3점</a>';
            html += '<a href="#link" class="input-star2 input-star" data-star="2" title="2점">2점</a>';
            html += '<a href="#link" class="input-star1 input-star" data-star="1" title="1점">1점</a>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="write-reply reply-textarea">';
            html += '<div class="write-reply-tit">후기내용</div>';
            html += '<div class="write-reply-input">';
            html += '<div class="input-wrap">';
            html += '<textarea class="textarea input-reply" rows="" cols="" placeholder="후기를 남겨주세요." maxlength="300" >' + reviewData.list[idx].cr_contents + '</textarea>';
            html += '<span class="change-reason-txt-count">' + reviewData.list[idx].cr_contents.length + '/300</span>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="write-reply reply-thumb">';
            html += '<div class="write-reply-tit">사진첨부</div>';
            html += '<div class="write-reply-input">';
            html += '<div class="write-reply-thumb-wrap">';
            html += '<ul class="write-reply-thumb-list">';
            $.each(reviewData.list[idx].images, function () {
                html += '<li data-cri-idx="' + this.cri_idx + '" class="write-reply-thumb reply-thumb-photo remain-photo">';
                html += '<img src="' + IMG_URL + 'class/review/' + this.cri_filename + '" alt="" class="thumb-write" />';
                html += '<a href="#link" title="삭제" class="del-thumb edit-del-thumb">삭제</a>';
                html += '</li>';
                reviewFileLength += 1;
            });

            html += '<li class="write-reply-thumb add-photo-wrap">';
            html += '<div class="thumb-add">';
            html += '<label for="add-thumb" class="label-add-thumb">사진첨부하기</label>';
            html += '<input type="file" class="input-add-thumb" id="add-thumb" multiple accept="image/*" />';
            html += '</div>';
            html += '</li>';
            html += '</ul>';
            html += '</div>';
            html += '<div class="write-reply-thumb-info">';
            html += '• 이미지는 1장에 최대 5Mbyte의 용량 제한이 있습니다.<br/>';
            html += '• 파일명은 영문만 가능합니다.<br/>';
            html += '• 첨부 사진은 3장까지만 등록이 가능합니다.';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="write-reply-btn">';
            html += '<a href="#link" title="후기 수정" data-cr-idx="' + reviewData.list[idx].cr_idx + '" data-class-idx="' + class_idx + '" class="btn-write-reply btn-write-edit-reply">후기 등록</a>';
            html += '</div>';
            html += '<a href="#link" title="닫기" class="btn-layer-close" onclick="Mypage.hideWriteReply();">닫기</a>';
            html += '</div>';
            html += '</div>';

        } else {
            star = 0;
            files = [];
            reviewFileLength = 0;

            html += '<div class="layer-wrap write-reply-wrap" id="write-reply-wrap">';
            html += '<div class="bg-layer-wrap" onclick="Mypage.hideWriteReply();"></div>';
            html += '<div class="write-reply-cont">';
            html += '<h2 class="layer-tit">구매 후기 작성</h2>';
            html += '<div class="write-reply-area">';
            html += '<div class="write-reply">';
            html += '<div class="write-reply-tit">작성자</div>';
            html += '<div class="write-reply-input">';
            html += '<div class="input-wrap">';
            html += '<input type="text" class="input reply-writer" placeholder="" value="' + MyProfile.userinfo.user_nickname + '" />';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="write-reply">';
            html += '<div class="write-reply-tit">별점</div>';
            html += '<div class="write-reply-input">';
            html += '<div class="input-star-wrap" id="input-star-wrap">';
            html += '<a href="#link" class="input-star10 input-star" data-star="10" title="10점">10점</a>';
            html += '<a href="#link" class="input-star9 input-star" data-star="9" title="9점">9점</a>';
            html += '<a href="#link" class="input-star8 input-star" data-star="8" title="8점">8점</a>';
            html += '<a href="#link" class="input-star7 input-star" data-star="7" title="7점">7점</a>';
            html += '<a href="#link" class="input-star6 input-star" data-star="6" title="6점">6점</a>';
            html += '<a href="#link" class="input-star5 input-star" data-star="5" title="5점">5점</a>';
            html += '<a href="#link" class="input-star4 input-star" data-star="4" title="4점">4점</a>';
            html += '<a href="#link" class="input-star3 input-star" data-star="3" title="3점">3점</a>';
            html += '<a href="#link" class="input-star2 input-star" data-star="2" title="2점">2점</a>';
            html += '<a href="#link" class="input-star1 input-star" data-star="1" title="1점">1점</a>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="write-reply reply-textarea">';
            html += '<div class="write-reply-tit">후기내용</div>';
            html += '<div class="write-reply-input">';
            html += '<div class="input-wrap">';
            html += '<textarea class="textarea input-reply" rows="" cols="" placeholder="후기를 남겨주세요." maxlength="300" ></textarea>';
            html += '<span class="change-reason-txt-count">0/300</span>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="write-reply reply-thumb">';
            html += '<div class="write-reply-tit">사진첨부</div>';
            html += '<div class="write-reply-input">';
            html += '<div class="write-reply-thumb-wrap">';
            html += '<ul class="write-reply-thumb-list">';
            html += '<li class="write-reply-thumb add-photo-wrap">';
            html += '<div class="thumb-add">';
            html += '<label for="add-thumb" class="label-add-thumb">사진첨부하기</label>';
            html += '<input type="file" class="input-add-thumb" id="add-thumb" multiple accept="image/*" />';
            html += '</div>';
            html += '</li>';
            html += '</ul>';
            html += '</div>';
            html += '<div class="write-reply-thumb-info">';
            html += '• 이미지는 1장에 최대 5Mbyte의 용량 제한이 있습니다.<br/>';
            html += '• 파일명은 영문만 가능합니다.<br/>';
            html += '• 첨부 사진은 3장까지만 등록이 가능합니다.';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '</div>';
            html += '<div class="write-reply-btn">';
            html += '<a href="#link" title="후기 등록" data-class-idx="' + class_idx + '" class="btn-write-reply">후기 등록</a>';
            html += '</div>';
            html += '<a href="#link" title="닫기" class="btn-layer-close" onclick="Mypage.hideWriteReply();">닫기</a>';
            html += '</div>';
            html += '</div>';
        }

        $('.footer-wrap').before(html);

        if (reviewFileLength == 3) {
            $('.add-photo-wrap').hide();
        } else {
            $('.add-photo-wrap').show();
        }

        $('#wrap').addClass('layer-on write-reply-on');
        $('body').addClass('on-popup');


        $('.btn-write-reply').off('click').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('btn-write-edit-reply')) {
                var cr_idx = parseInt($(this).attr('data-cr-idx'));
                editReply(cr_idx, class_idx);
            } else {
                submitReply(class_idx);
            }
        });
        $(".input-add-thumb").change(function () {
            readURL(this);
        });
        $('.input-reply').off('keyup').on('keyup', function (event) {
            var currentString = $(".input-reply").val();
            $('.change-reason-txt-count').html(currentString.length + "/300");
            if (currentString.length <= 300) {  /*or whatever your number is*/
                //do some css with your div
            } else {
                //do some different stuff with your div
            }
        });
        $('.input-star').off('click').on('click', function (e) {
            e.preventDefault();
            star = $(this).attr('data-star');
            $('#input-star-wrap').removeClass("input-star-on1 input-star-on2 input-star-on3 input-star-on4 input-star-on5 input-star-on6 input-star-on7 input-star-on8 input-star-on9 input-star-on10");
            $('#input-star-wrap').addClass("input-star-on" + star);
        });


    };
    var submitReply = function (class_idx) {
        var formData = new FormData();
        formData.append("cr_star", star);
        var contents = $('.input-reply').val();
        if (contents == "") {
            Popup.alert("구매 후기 등록 실패", "후기 내용을 입력해 주세요.", "확인", function () {
                Popup.hide();
            });
            return false;
        }

        formData.append("cr_contents", contents);
        $.each(files, function () {
            formData.append("files[]", this);
        });

        ApiRequest.postFile('/class/content/' + class_idx + '/review', formData, function (res) {
            console.log(res);
            Popup.alert("구매 후기 등록", "구매 후기 등록이 완료되었습니다.<br>회원님의 소중한 후기 감사드리며,<br>처음 등록한 후기를 기준으로 마일리지가 지급됩니다.", "확인", function () {
                Popup.hide();
                Mypage.hideWriteReply();
                getMyClassReview('history');
            });
        }, function (err) {
            console.log(err);
            Popup.alert("구매 후기 등록 실패", "구매 후기 등록에 실패했습니다.", "확인", function () {
                Popup.hide();
            });
        });
    };

    var editReply = function (cr_idx, class_idx) {
        var formData = new FormData();
        formData.append("cr_star", star);
        var contents = $('.input-reply').val();
        if (contents == "") {
            Popup.alert("구매 후기 수정 실패", "후기 내용을 입력해 주세요.", "확인", function () {
                Popup.hide();
            });
            return false;
        }

        formData.append("cr_contents", contents);
        $.each(files, function () {
            formData.append("files[]", this);
        });
        var deletefiles = cri_list.toString();
        formData.append("deletefiles", deletefiles);

        ApiRequest.putFile('/class/content/' + class_idx + '/review/' + cr_idx, formData, function (res) {
            console.log(res);
            Popup.alert("구매 후기 수정", "구매 후기 수정이 완료되었습니다.", "확인", function () {
                Popup.hide();
                Mypage.hideWriteReply();
                getMyClassReview('history');
            });
        }, function (err) {
            console.log(err);
            Popup.alert("구매 후기 수정 실패", "구매 후기 수정에 실패했습니다.", "확인", function () {
                Popup.hide();
            });
        });
    };


    var drawMyClassReviewHistory = function (res) {
        $('.reply-class-wrap').empty();
        $('.reply-class-list-wrap').empty();

        var html = '';
        if (res.list.length == 0) {
            html += '<div class="no-view-wrap">';
            html += '<div class="no-view-tit">아직 작성하신 구매 후기가 없어요.</div>';
            html += '<div class="no-view-txt">';
            html += '취미 클래스에 대한 후기를 남겨 주세요!<br/>';
            html += '소중한 후기를 남겨주신 분들께<br/>';
            html += '마일리지를 선물로 드립니다.';
            html += '</div>';
            html += '<a href="#link" title="구매 후기 작성" class="btn-no-view class-review-write">구매 후기 작성</a>';
            html += '</div>';
        } else {
            $.each(res.list, function (idx) {
                html += '<div class="reply-class-list-wrap">';
                html += '<div class="order-list-cont">';
                html += '<div class="order-list-area">';
                html += '<div class="order-list-thumb">';
                html += '<img src="' + IMG_URL + 'class/thumbs/' + this.thumbnail_image.replace('-resize', '-square') + '" alt="" class="thumb-order-list">';
                html += '</div>';
                html += '<div class="order-list-date">';
                html += '<div class="order-list-tit">주문일자</div>';
                html += '<div class="order-list-txt">' + moment(this.order_regdate).format("YYYY.MM.DD") + '</div>';
                html += '</div>';
                html += '<div class="order-list-name">';
                html += '<div class="order-list-tit">클래스명</div>';
                html += '<div class="order-list-txt cut-txt">' + this.class_name + '</div>';
                html += '</div>';
                html += '</div>';
                html += '<div class="reply-list-wrap">';
                html += '<div class="magazine-reply-wrap">';
                html += '<div class="magazine-reply-tit">';
                html += '<div class="magazine-reply-star">';
                html += '<div class="reply-star-on reply-star-on' + this.cr_star + '">' + this.cr_star + '별</div>';
                html += '</div>';
                html += '<div class="magazine-reply-info">';
                html += '<span class="reply-date">';
                html += moment(this.cr_regdate).format("YYYY.MM.DD");
                html += '</span>';
                html += '<a href="#link" data-arr-idx="' + idx + '" data-class-idx="' + this.class_idx + '" title="수정" class="btn-edit-reply">수정</a>';
                html += '<em>|</em>';
                html += '<a href="#link" title="삭제" data-class-idx="' + this.class_idx + '" data-cr-id="' + this.cr_idx + '" class="btn-del-reply">삭제</a>';
                html += '</div>';
                html += '</div>';
                html += '<div class="magazine-reply-cont">';
                html += Utils.escapeHtml(this.cr_contents).replace(/\n/g, '<br>');
                html += '</div>';
                html += '<ul class="reply-thumb-list">';
                $.each(this.images, function () {
                    html += '<li class="reply-thumb2"><a href="#link" title="" data-idx="' + idx + '" class="show-photo-btn"><img src="' + IMG_URL + 'class/review/' + this.cri_filename + '" alt="" class="thumb-reply2"></a></li>';
                })
                html += '</ul>';

                if (this.cr_answer) {
                    html += [
                        '<div class="class-review-answer">',
                        '<p class="i-author">from 하비풀</p>',
                        '<p class="i-content">', Utils.escapeHtml(this.cr_answer).replace(/\n/g, '<br>'), '</p>',
                        '</div>'
                    ].join('')
                }

                html += '</div>';
                html += '</div>';
                html += '</div>';

                html += '</div>';
                html += '</div>';
            });
            var totalPage = Math.ceil(reviewTotal / reviewAmount);
            html += '<div class="paging-num-wrap">';
            for (var i = 1; i <= totalPage; i++) {
                if (reviewPage == i) {
                    html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="review-page-btn btn-num btn-num-on">' + i + '</a>';
                } else {
                    html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="review-page-btn btn-num">' + i + '</a>';
                }
            }
            html += '</div>';
        }

        $('.reply-class-wrap').append(html);

        $('.review-page-btn').off('click').on('click', function () {
            reviewPage = parseInt($(this).attr('data-page'));
            getMyClassReview('history');
        });

        $('.show-photo-btn').off('click').on('click', function (e) {
            e.preventDefault();
            var idx = $(this).attr('data-idx');
            showPhotoPopup($(this), idx);
        });

        $('.btn-del-reply').off('click').on('click', function (e) {
            e.preventDefault();
            var class_idx = $(this).attr("data-class-idx");
            var cr_idx = $(this).attr("data-cr-id");
            Popup.confirm("구매 후기 삭제", "정말로 삭제하시겠습니까?<br>삭제된 후기 글은 복구하실 수 없으며,<br>작성시 지급된 마일리지는 소멸됩니다.", "취소", "삭제", function () {
                Popup.hide();
            }, function () {
                Popup.hide();
                ApiRequest.delete('/class/content/' + class_idx + '/review/' + cr_idx, {}, function (res) {
                    console.log(res);
                    getMyClassReview('history');
                }, function (err) {
                    console.log(err);
                });
            });
        });
        $('.btn-edit-reply').off('click').on('click', function (e) {
            e.preventDefault();
            var idx = parseInt($(this).attr('data-arr-idx'));
            var class_idx = $(this).attr('data-class-idx');
            Popup.confirm("구매 후기 수정 안내", "구매 후기를 수정하시겠습니까?<br>구매 후기를 수정시 지급된 마일리지는<br>변경되지 않습니다.", "취소", "수정하기", function () {
                Popup.hide();
            }, function () {
                Popup.hide();
                $('body').scrollTop(0);
                showWriteClassReview(class_idx, 'edit', idx);
                $('#wrap').addClass('layer-on write-reply-on');
                /* 수정 시나리오 */
            });
        });


        $('.class-review-write').off('click').on('click', function () {
            $('.btn-review-tab').eq(0).trigger('click');
        });
    };


    var showPhotoPopup = function (elem, idx) {
        $('#view-img-wrap').remove();

        var _elem = elem.parent().parent().children('.reply-thumb2');
        photoIdx = parseInt(idx);
        img_list = [];
        $.each(_elem, function () {
            img_list.push($(this).find('img').attr('src'));
        });
        var html = '';
        html += '<div class="layer-wrap view-img-wrap" id="view-img-wrap">';
        html += '<div class="bg-layer-wrap" onclick="hideViewImg();"></div>';
        html += '<div class="view-img-cont">';
        html += '<div class="view-img-area">';
        html += '<img src="' + img_list[photoIdx] + '" alt="" class="img-view" />';
        html += '</div>';
        html += '<a href="#link" title="이전" class="btn-view-img btn-view-img-prev">이전</a>';
        html += '<a href="#link" title="다음" class="btn-view-img btn-view-img-next">다음</a>';
        html += '<a href="#link" title="닫기" class="btn-layer-close" onclick="hideViewImg();">닫기</a>';
        html += '</div>';
        html += '</div>';

        $('.footer-wrap').before(html);
        $('#wrap').addClass('layer-on view-img-on');
        $('body').addClass('on-popup');

        $('.btn-view-img-prev').off('click').on('click', function () {
            photoIdx--;
            if (photoIdx < 0) {
                photoIdx = 0;
                return false;
            }
            $('.img-view').attr('src', img_list[photoIdx]);
        });
        $('.btn-view-img-next').off('click').on('click', function () {
            photoIdx++;
            if (photoIdx > img_list.length - 1) {
                photoIdx = img_list.length - 1;
                return false;
            }
            $('.img-view').attr('src', img_list[photoIdx]);
        });
    }

    var setQnaList = function () {
        var html = '';

        html += '<div class="reply-info-cont">';
        html += '<div class="reply-info-area reply-info-area-type02">';
        html += '<div class="reply-info-tit">[상담 안내]</div>';
        html += '<span class="reply-info-txt">• 1:1 문의를 주시면 담당자가 빠르게 답변 드리도록 하겠습니다.</span>';
        html += '</div>';
        html += '</div>';
        $('.reply-info-wrap').append(html);

        getQnaList();
    };

    var getQnaList = function () {
        ApiRequest.get("/customer/helpdesk", {
            "amount": qnaAmount,
            "page": qnaPage
        }, function (res) {
            console.log(res);
            qnaTotal = res.count;
            drawQnaList(res);
        }, function (err) {
            console.log(err);
        });
    };

    var drawQnaList = function (res) {
        $('.direct-ask-wrap').show();
        $('.write-ask-wrap').hide();

        $('.direct-ask-wrap').empty();
        var html = '';

        html += '<div class="direct-ask-tit">';
        html += '1:1 문의내역';
        html += '<a href="/mypage.shop?m=action-history&s=qna&action=write" class="btn-write-direct btn-write-qna">1:1 문의 작성하기</a>';
        html += '</div>';
        if (res.list.length == 0) {
            html += '<div class="no-view-wrap">';
            html += '<div class="no-view-tit">궁금하신 내용이 있으시면 1:1 문의를 신청해보세요.</div>';
            html += '<div class="no-view-txt">';
            html += '하비풀 서비스 이용시 궁금하신 내용이 있으시면 1:1 문의를 이용해보세요.<br/>';
            html += '친절하고 빠르게 문제 해결을 도와드리겠습니다.';
            html += '</div>';
            html += '<!--a href="/mypage.shop?m=action-history&s=qna&action=write" title="1:1 문의 신청하기" class="btn-no-view no-view-write-qna">1:1 문의 신청하기</a-->';
            html += '</div>';
        } else {
            $.each(res.list, function () {
                html += '<div class="direct-ask-cont direct-ask-on">';
                html += '<div class="direct-ask-list">';
                html += '<div class="direct-ask-list-tit">';
                html += '<span class="mark-ask">' + this.hd_type + '</span>';
                html += '<a href="#link" title="' + this.hd_title + '" class="link-direct-ask" onclick="toggleAsk(this);">' + this.hd_title + '</a>';
                html += '<div class="magazine-reply-info">';
                if (this.hd_answer) {
                    html += '<span class="mark-ask2 txt-color-r">답변완료</span>';
                } else {
                    html += '<span class="mark-ask2">답변대기</span>';
                }
                html += '<span class="reply-date">';
                html += moment(this.hd_regdate).format("YYYY.MM.DD");
                html += '</span>';
                html += '<a href="#link" title="삭제" data-hd-idx="' + this.hd_idx + '" class="btn-del-reply btn-qna-delete">삭제</a>';
                html += '</div>';
                html += '</div>';
                html += '<div class="direct-ask">';
                html += '<div class="direct-ask-area direct-ask-question">';
                html += '<span class="tit q">Q</span>';
                html += this.hd_contents;
                html += '<ul class="thumb-list-wrap">';
                $.each(this.images, function () {
                    html += '<li class="thumb-list"><img src="' + IMG_URL + 'helpdesk/' + this.hi_filename + '" alt="" class="thumb" /></li>';
                });
                html += '</ul>';
                html += '</div>';
                if (this.hd_answer) {
                    html += '<div class="direct-ask-area direct-ask-answer">';
                    html += '<span class="tit a">A</span>';
                    html += this.hd_answer;
                    html += '</div>';
                }
                html += '</div>';
                html += '</div>';
                html += '</div>';
            });
            var totalPage = Math.ceil(qnaTotal / qnaAmount);
            html += '<div class="paging-num-wrap">';
            for (var i = 1; i <= totalPage; i++) {
                if (qnaPage == i) {
                    html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="qna-page-btn btn-num btn-num-on">' + i + '</a>';
                } else {
                    html += '<a href="#link" title="' + i + '" data-page="' + i + '" class="qna-page-btn btn-num">' + i + '</a>';
                }
            }
            html += '</div>';
        }

        $('.direct-ask-wrap').append(html);

        $('.qna-page-btn').off('click').on('click', function () {
            qnaPage = parseInt($(this).attr('data-page'));
            getQnaList();
        });

        $('.btn-qna-delete').off('click').on('click', function () {
            var hd_idx = $(this).attr('data-hd-idx');
            Popup.confirm("1:1 문의 내역 삭제", "선택하신 문의 내역을 삭제하시겠습니까?", "취소", "삭제", function () {
                Popup.hide();
            }, function () {
                Popup.hide();
                ApiRequest.delete('/customer/helpdesk/' + hd_idx, {}, function (res) {
                    console.log(res);
                    Popup.alert("1:1 문의 내역 삭제", "문의 내역이 삭제되었습니다.", "확인", function () {
                        Popup.hide();
                        getQnaList();
                    });
                }, function (err) {
                    console.log(err);
                });
            });
        });

    };

    var drawWriteQnaForm = function () {
        $('.direct-ask-wrap').hide();
        $('.write-ask-wrap').show();
        $('.write-ask-wrap').empty();

        $('.write-reply-wrap').remove();
        files = [];
        reviewFileLength = 0;
        var html = '';
        html += '<div class="direct-ask-tit">';
        html += '1:1 문의 작성하기';
        html += '</div>';
        html += '<div class="write-ask-cont">';
        html += '<div class="write-reply-area">';
        html += '<div class="write-reply">';
        html += '<div class="write-reply-tit">문의구분</div>';
        html += '<div class="write-reply-input">';
        html += '<span class="ask-category">';
        html += '<input type="radio" class="check-ask" data-ask="배송문의" id="ask-delivery" name="ask-category" checked />';
        html += '<label class="label-ask" for="ask-delivery">배송문의</label>';
        html += '</span>';
        html += '<span class="ask-category">';
        html += '<input type="radio" class="check-ask" data-ask="사이트이용" id="ask-site" name="ask-category" />';
        html += '<label class="label-ask" for="ask-site">사이트이용</label>';
        html += '</span>';
        html += '<span class="ask-category">';
        html += '<input type="radio" class="check-ask" data-ask="클래스문의" id="ask-class" name="ask-category" />';
        html += '<label class="label-ask" for="ask-class">클래스문의</label>';
        html += '</span>';
        html += '<span class="ask-category">';
        html += '<input type="radio" class="check-ask" data-ask="구매문의" id="ask-buy" name="ask-category" />';
        html += '<label class="label-ask" for="ask-buy">구매문의</label>';
        html += '</span>';
        html += '<span class="ask-category">';
        html += '<input type="radio" class="check-ask" data-ask="기타문의" id="ask-etc" name="ask-category" />';
        html += '<label class="label-ask" for="ask-etc">기타문의</label>';
        html += '</span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="write-reply">';
        html += '<div class="write-reply-tit">이름</div>';
        html += '<div class="write-reply-input">';
        html += '<div class="input-wrap">';
        html += '<input type="text" class="input input_qna_name" placeholder="이름" value="' + MyProfile.userinfo.user_name + '" />';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="write-reply">';
        html += '<div class="write-reply-tit">이메일</div>';
        html += '<div class="write-reply-input">';
        html += '<div class="input-wrap">';
        html += '<input type="email" class="input input_qna_email" placeholder="master@hobbyful.co.kr" value="' + MyProfile.userinfo.user_id + '" />';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="write-reply">';
        html += '<div class="write-reply-tit">문의제목</div>';
        html += '<div class="write-reply-input">';
        html += '<div class="input-wrap">';
        html += '<input type="text" class="input input-qna-title" placeholder="" />';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="write-reply">';
        html += '<div class="write-reply-tit">문의내용</div>';
        html += '<div class="write-reply-input">';
        html += '<div class="input-wrap">';
        html += '<textarea class="textarea input-qna-contents" rows="" cols="" placeholder="문의 내용을 입력해주세요." maxlength="300" ></textarea>';
        html += '<span class="change-reason-txt-count">0/300</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="write-reply reply-thumb">';
        html += '<div class="write-reply-tit">사진첨부</div>';
        html += '<div class="write-reply-input">';
        html += '<div class="write-reply-thumb-wrap">';
        html += '<ul class="write-reply-thumb-list">';
        html += '<li class="write-reply-thumb add-photo-wrap">';
        html += '<div class="thumb-add">';
        html += '<label for="add-thumb" class="label-add-thumb">사진첨부하기</label>';
        html += '<input type="file" class="input-add-thumb" id="add-thumb" accept="image/*" />';
        html += '</div>';
        html += '</li>';
        html += '</ul>';
        html += '</div>';
        html += '<div class="write-reply-thumb-info">';
        html += '• 이미지는 1장에 최대 5Mbyte의 용량 제한이 있습니다.<br>';
        html += '• 파일명은 영문만 가능합니다.<br>';
        html += '• 첨부 사진은 3장까지만 등록이 가능합니다.';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="write-reply-btn">';
        html += '<a href="#link" title="1:1 문의 등록" class="btn-write-ask">1:1 문의 작성하기</a>';
        html += '</div>';

        $('.write-ask-wrap').append(html);
        var onloading = false;
        $('.btn-write-ask').off('click').on('click', function () {
            if (onloading) return;

            var hd_type = $(':radio[name="ask-category"]:checked').attr('data-ask');
            var hd_name = $('.input_qna_name').val();
            var hd_email = $('.input_qna_email').val();
            var hd_title = $('.input-qna-title').val();
            var hd_contents = $('.input-qna-contents').val();

            if (hd_title == "") {
                Popup.alert("1:1 문의 접수 실패", "문의 제목을 입력해주세요.", "확인", function () {
                    Popup.hide();
                });
                onloading = false;
                return false;
            }
            if (hd_contents == "") {
                Popup.alert("1:1 문의 접수 실패", "문의 내용을 입력해주세요.", "확인", function () {
                    Popup.hide();
                });
                onloading = false;
                return false;
            }

            var formData = new FormData();
            formData.append("hd_type", hd_type);
            formData.append("hd_name", hd_name);
            formData.append("hd_email", hd_email);
            formData.append("hd_title", hd_title);
            formData.append("hd_contents", hd_contents);
            formData.append("hd_useragent", window.navigator.userAgent);
            $.each(files, function () {
                formData.append("files[]", this);
            });
            onloading = true;
            ApiRequest.postFile('/customer/helpdesk', formData, function (res) {
                //console.log(res);
                Popup.alert("1:1 문의 접수 완료", "1:1 문의가 접수되었습니다.<br>빠른 시일내에 답변 드리겠습니다.<br>감사합니다.", "확인", function () {
                    Popup.hide();
                    files = [];
                    getQnaList();
                });
                onloading = false;
            }, function (err) {
                onloading = false;
                console.log(err);
            });
        });

        $(".input-add-thumb").off('change').on('change', function () {
            readURL(this);
        });

        $('.input-qna-contents').off('keyup').on('keyup', function (event) {
            var currentString = $(".input-qna-contents").val();
            $('.change-reason-txt-count').html(currentString.length + "/300");
            if (currentString.length <= 300) {  /*or whatever your number is*/
                //do some css with your div
            } else {
                //do some different stuff with your div
            }
        });

    };

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                if (input.files[0].size > 5100000) {
                    alert('파일이 너무 큽니다');
                    return;
                }
                var fileTypes = ['jpg', 'jpeg', 'png', 'what', 'ever', 'you', 'want'];  //acceptable file types
                var extension = input.files[0].name.split('.').pop().toLowerCase(),  //file extension from input file
                    isSuccess = fileTypes.indexOf(extension) > -1;  //is extension in acceptable types
                if (!isSuccess) {
                    alert('이미지 파일만 사용할 수 있습니다.');
                    return;
                }


                var html = '';
                html += '<li class="write-reply-thumb reply-thumb-photo">';
                html += '<img src="' + e.target.result + '" alt="" class="thumb-write" />';
                html += '<a href="javascript:;" title="삭제" class="del-thumb">삭제</a>';
                html += '</li>';
                $('.write-reply-thumb-list').prepend(html);
                files.unshift(input.files[0]);
                reviewFileLength += 1;
                if (reviewFileLength == 3) {
                    $('.add-photo-wrap').hide();
                }
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    var getMileage = function () {
        ApiRequest.get("/user/mileage/counter", {}, function (res) {
            console.log(res);
            setMileageCounter(res);
        }, function (err) {
            console.log(err);
        });
    };

    var setMileageCounter = function (res) {
        $('.mileage-wrap').empty();

        var html = '';

        html += '<div class="reply-info-cont">';
        html += '<div class="reply-info-area reply-info-area-type02">';
        html += '<div class="mileage-info">';
        html += '<div class="mileage-info-tit">현재 마일리지</div>';
        html += '<div class="mileage-info-p">' + Utils.numberWithCommas(parseInt(res.mileage)) + 'P</div>';
        html += '</div>';
        html += '<div class="mileage-info">';
        html += '<div class="mileage-info-tit">총 적립 마일리지</div>';
        html += '<div class="mileage-info-p">' + Utils.numberWithCommas(parseInt(res.mileageTotal)) + 'P</div>';
        html += '</div>';
        html += '<div class="mileage-info">';
        html += '<div class="mileage-info-tit">사용한 마일리지</div>';
        html += '<div class="mileage-info-p">' + Utils.numberWithCommas(parseInt(res.mileageUsed)) + 'P</div>';
        html += '</div>';
        html += '<div class="mileage-info">';
        html += '<div class="mileage-info-tit">이번 달 소멸 예정 마일리지</div>';
        html += '<div class="mileage-info-p">' + Utils.numberWithCommas(parseInt(res.mileageExpireSoon)) + 'P</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="mileage-info-txt">';
        html += '•  마일리지는 적립(충전)된 달로부터 12개월 이내에 사용하셔야 합니다.<br/>';
        html += '</div>';
        html += '<div class="mileage-cont">';
        html += '<div class="mileage-tit">마일리지 적립/사용 내역</div>';
        html += '<div class="mileage-table">';
        html += '<table summary="마일리지 적립/사용 내역 테이블">';
        html += '<colgroup>';
        html += '<col class="col-mileage01" />';
        html += '<col class="col-mileage02" />';
        html += '<col class="col-mileage03" />';
        html += '<col class="col-mileage04" />';
        html += '</colgroup>';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="mileage-th">적립날짜</th>';
        html += '<th class="mileage-th">내역</th>';
        html += '<th class="mileage-th">마일리지</th>';
        html += '<th class="mileage-th">소멸예정</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody class="mileage_list_wrap">';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';

        $('.mileage-wrap').append(html);

        getMileageList();
    }

    var getMileageList = function () {
        ApiRequest.get("/user/mileage/", {
            "amount": mileageAmount,
            "page": mileagePage
        }, function (res) {
            console.log(res);
            mileageTotal = res.count;
            drawMileageList(res);
        }, function (err) {
            console.log(err);
        });
    };

    var drawMileageList = function (res) {
        $('.mileage-wrap .paging-num-wrap').remove();
        $('.mileage_list_wrap').empty();
        var html = '';
        $.each(res.list, function () {
            html += '<tr>';
            html += '<td class="mileage-td">' + moment(this.ph_regdate).format("YYYY.MM.DD") + '</td>';
            html += '<td class="mileage-td">' + this.ph_desc + '</td>';
            var plus = '';
            if (this.ph_type == "increase") {
                plus = '+';
                html += '<td class="mileage-td txt-color-r">' + plus + Utils.numberWithCommas(this.ph_amount) + 'p</td>';
            } else {
                plus = '';
                html += '<td class="mileage-td">' + plus + Utils.numberWithCommas(this.ph_amount) + 'p</td>';
            }

            var dat = new Date(this.ph_regdate);
            dat.setDate(dat.getDate() + 365);


            html += '<td class="mileage-td">' + moment(dat).format("YYYY.MM.DD") + '</td>';
            html += '</tr>';
        });
        $('.mileage_list_wrap').append(html);
        var pageHtml = '';

        /* Paging */
        var totalPage = Math.ceil(mileageTotal / mileageAmount);
        pageHtml += '<div class="paging-num-wrap">';
        for (var i = 1; i <= totalPage; i++) {
            if (mileagePage == i) {
                pageHtml += '<a href="#link" title="' + i + '" data-page="' + i + '" class="mileage-page-btn btn-num btn-num-on">' + i + '</a>';
            } else {
                pageHtml += '<a href="#link" title="' + i + '" data-page="' + i + '" class="mileage-page-btn btn-num">' + i + '</a>';
            }
        }
        pageHtml += '</div>';

        $('.mileage-wrap').append(pageHtml);

        $('.mileage-page-btn').off('click').on('click', function () {
            mileagePage = parseInt($(this).attr('data-page'));
            getMileageList();
        });


    }


    var getCoupon = function () {

        ApiRequest.get("/user/coupon/counter", {}, function (res) {

            drawCoupon(res);
        }, function (err) {
            console.log(err);
        });
    };

    var drawCoupon = function (res) {
        $('.coupon-wrap').empty();

        var html = '';

        html += '<div class="reply-info-cont">';
        html += '<div class="reply-info-area reply-info-area-type02">';
        html += '<div class="mileage-info">';
        html += '<div class="mileage-info-tit">충전 가능 쿠폰</div>';
        html += '<div class="mileage-info-p">' + res.unused + '개</div>';
        html += '</div>';
        html += '<div class="mileage-info">';
        html += '<div class="mileage-info-tit">충전 완료 쿠폰</div>';
        html += '<div class="mileage-info-p">' + res.used + '개</div>';
        html += '</div>';
        html += '<div class="mileage-info">';
        html += '<div class="mileage-info-tit">기간만료 임박</div>';
        html += '<div class="mileage-info-p">' + res.closetoexpire + '개</div>';
        html += '</div>';
        html += '<div class="mileage-info">';
        html += '<div class="mileage-info-tit">기간만료</div>';
        html += '<div class="mileage-info-p">' + res.expired + '개</div>';
        html += '</div>';
        html += '<div class="mileage-info-summary">';
        html += '<div class="mileage-info-tit">충전 마일리지</div>';
        html += '<div class="mileage-info-p">' + Utils.numberWithCommas(parseInt(res.allmileageamount)) + 'p</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="mileage-info-txt">';
        html += '•  쿠폰으로 충전된 마일리지는 충전일로부터 12개월 이내에 사용하셔야 합니다.';
        html += '</div>';
        html += '<div class="coupon-cont">';
        html += '<div class="mileage-tit">쿠폰 등록</div>';
        html += '<div class="coupon-input-wrap">';
        html += '<div class="coupon-input-tit">쿠폰번호</div>';
        html += '<div class="coupon-input">';
        html += '<div class="input-wrap">';
        html += '<input type="text" class="input input-coupon input-coupon1" />';
        html += '</div>';
        html += '<div class="input-wrap -m">';
        html += '<input type="text" class="input input-coupon input-coupon2" />';
        html += '</div>';
        html += '<div class="input-wrap -m">';
        html += '<input type="text" class="input input-coupon input-coupon3" />';
        html += '</div>';
        html += '<div class="input-wrap -m">';
        html += '<input type="text" class="input input-coupon input-coupon4" />';
        html += '</div>';
        html += '</div>';
        html += '<a href="#link" title="등록" class="btn-coupon-input register-coupon">등록</a>';
        html += '</div>';
        html += '<div class="coupon-input-info">';
        html += '•  쿠폰번호 등록은 1인당 1회 가능합니다.<br/>';
        html += '•  쿠폰은 유효기간 내에 등록하셔야 사용하실 수 있습니다.<br/>';
        html += '•  마일리지 쿠폰은 등록시 즉시 충전되며, 구독 신청 시 사용하실 수 있습니다.';
        html += '</div>';
        html += '<div class="mileage-tit">쿠폰 내역</div>';
        html += '<div class="mileage-table">';
        html += '<table summary="쿠폰 내역 테이블">';
        html += '<colgroup>';
        html += '<col class="col-mileage01" />';
        html += '<col class="col-mileage02" />';
        html += '<col class="col-mileage03" />';
        html += '<col class="col-mileage04" />';
        html += '<col class="col-mileage05" />';
        html += '</colgroup>';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="mileage-th">사용날짜</th>';
        html += '<th class="mileage-th">쿠폰종류</th>';
        html += '<th class="mileage-th">쿠폰명</th>';
        html += '<th class="mileage-th">상세정보</th>';
        html += '<th class="mileage-th">기간만료</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody class="coupon-list-wrap">';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '</div>';

        $('.coupon-wrap').append(html);
        getCouponList();


        $('.register-coupon').off('click').on('click', function () {
            var couponNum = (function () {
                var arr = [];
                $('.input-coupon').each(function (i, el) {
                    arr.push(el.value);
                });

                return arr.join('');
            })();

            if (couponNum.length < 16) {
                Popup.alert("쿠폰 등록 실패", "쿠폰 번호를 정확히 입력해주세요.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            ApiRequest.put("/user/coupon", {
                "code": couponNum
            }, function (res) {

                Popup.alert("쿠폰 등록 완료", '<b>' + res.coupon.name + "</b><br><br>쿠폰 등록이 완료되었습니다.", "확인", function () {
                    Popup.hide();
                    getMyInfo();
                    getCoupon();
                });

            }, function (err) {
                var msg = '';
                var data = err.responseJSON;
                if (data.error === 'Incorrect code') msg = '쿠폰번호를 잘못 입력하셨습니다.<br>확인 후 다시 입력해 주세요.';
                else if (data.error === 'Used code' && data.data.type === 'CLASS_VIDEO') msg = '이미 등록하신 쿠폰번호 입니다.<br>내 클래스 메뉴에 등록된 동영상을 즐겨주세요.';
                else if (data.error === 'Used code') msg = '이미 등록하신 쿠폰번호 입니다.';
                else if (data.error === 'Over limit') msg = '사용횟수가 마감된 쿠폰번호 입니다.<br>쿠폰 사용가능 횟수를 확인해 주세요.';
                else if (data.error === 'Expired code') msg = '기간이 만료된 쿠폰번호 입니다.<br>쿠폰 유효기간을 확인해 주세요.';
                else msg = '쿠폰등록 오류입니다. 고객센터에서 문의 부탁드립니다.';

                Popup.alert("쿠폰 등록 실패", msg, "확인", function () {
                    Popup.hide();
                });
            });
        });
    };

    var getCouponList = function () {
        ApiRequest.get("/user/coupon", {
            "amount": couponAmount,
            "page": couponPage
        }, function (res) {
            console.log(res);
            couponTotal = res.count
            drawCouponList(res);
        }, function (err) {
            console.log(err);
        });
    };

    var couponTypeStr = {
        'POINT': '마일리지 적립',
        'CLASS_VIDEO': '클래스 영상',
        'DISCOUNT': '할인'
    };

    var drawCouponList = function (res) {
        $('.coupon-wrap .paging-num-wrap').remove();
        $('.coupon-list-wrap').empty();
        var html = '';
        $.each(res.list, function () {
            html += '<tr>';
            html += '<td class="mileage-td">' + moment(this.uc_usedate).format("YYYY.MM.DD") + '</td>';
            html += '<td class="mileage-td">' + couponTypeStr[this.cp_type] + '</td>';
            html += '<td class="mileage-td">' + this.cp_title + '</td>';

            if (this.cp_type === 'CLASS_VIDEO') {
                html += '<td class="mileage-td txt-color-r">';
                html += '<a href="/myclass.html" class="mark-coupon">영상 시청</a></td>';
                html += '<td class="mileage-td">무제한</td>';
            } else if (this.cp_type === 'POINT') {
                var isExpire = moment().diff(this.cp_expiredate);
                if (this.uc_use == "N" && isExpire < 0) {
                    html += '<td class="mileage-td txt-color-r use-coupon-btn" data-coupon-idx="' + this.uc_idx + '" ><a href="#link">';
                    html += '<span class="mark-point txt-color-r">+' + Utils.numberWithCommas(parseInt(this.cp_value)) + 'p</span><a href="#link" title="충전" class="mark-coupon">충전</a></td>';
                } else {
                    html += '<td class="mileage-td">';
                    html += '<span class="mark-point">+' + Utils.numberWithCommas(parseInt(this.cp_value)) + 'p</span><!--a href="javascript:;" title="충전완료" class="mark-coupon">충전완료</a--></td>';
                }
                html += '<td class="mileage-td">' + moment(this.cp_expiredate).format("YYYY.MM.DD") + '</td>';
            }
            html += '</tr>';
        });
        $('.coupon-list-wrap').append(html);
        var pageHtml = '';

        /* Paging */
        var totalPage = Math.ceil(couponTotal / couponAmount);
        pageHtml += '<div class="paging-num-wrap">';
        for (var i = 1; i <= totalPage; i++) {
            if (couponPage == i) {
                pageHtml += '<a href="#link" title="' + i + '" data-page="' + i + '" class="coupon-page-btn btn-num btn-num-on">' + i + '</a>';
            } else {
                pageHtml += '<a href="#link" title="' + i + '" data-page="' + i + '" class="coupon-page-btn btn-num">' + i + '</a>';
            }
        }
        pageHtml += '</div>';

        $('.coupon-wrap').append(pageHtml);

        $('.coupon-page-btn').off('click').on('click', function () {
            couponPage = parseInt($(this).attr('data-page'));
            getCouponList();
        });

        $('.use-coupon-btn').off('click').on('click', function () {
            var uc_idx = $(this).attr('data-coupon-idx');
            ApiRequest.put("/user/coupon/" + uc_idx, {}, function (res) {
                //console.log(res);
                Popup.alert("쿠폰 등록", "쿠폰이 등록되었습니다.", "확인", function () {
                    Popup.hide();
                    getMyInfo();
                    getCoupon();
                });
            }, function (err) {
                console.log(err);
                Popup.alert("쿠폰 등록 실패", "쿠폰이 만료되거나 등록할 수 없습니다.", "확인", function () {
                    Popup.hide();
                    getMyInfo();
                    getCoupon();
                });
            });
        });
    };


    var setProfileEdit = function () {

        // if(MyProfile.userinfo.user_fbid || MyProfile.userinfo.user_naid || MyProfile.userinfo.user_kaid){
        drawProfileEdit();
        return false;
        // }

        $('.edit-membership-wrap').empty();
        var html = '';

        html += '<div class="edit-membership-tit">';
        html += '회원 정보 확인';
        html += '<div class="edit-membership-sub">회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인합니다.</div>';
        html += '</div>';
        html += '<div class="edit-membership-cont" id="edit-membership-form">';
        html += '<div class="edit-membership-pw">';
        html += '<table class="table-edit-membership-pw">';
        html += '<colgroup>';
        html += '<col class="col-membership01" />';
        html += '<col class="col-membership02" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="edit-membership-th">닉네임</th>';
        html += '<td class="edit-membership-td">' + MyProfile.userinfo.user_nickname + '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="edit-membership-th">비밀번호</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="input-wrap"><input type="password" class="input input-check-pwd" /></div>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '<div class="edit-membership-btn">';
        html += '<a href="#link" title="확인" class="btn-edit-membership btn-profile-edit-confirm">확인</a>';
        html += '</div>';
        html += '</div>';

        $('.edit-membership-wrap').append(html);
    };

    var drawProfileEdit = function () {
        $('.edit-membership-wrap').empty();
        var html = '';

        // html += '<div class="edit-membership-wrap">';
        html += '<div class="edit-membership-tit">';
        html += '회원 정보 수정';
        html += '</div>';
        html += '<div class="edit-membership-cont">';
        html += '<div class="edit-membership">';
        html += '<table class="table-edit-membership">';
        html += '<colgroup>';
        html += '<col class="col-membership01" />';
        html += '<col class="col-membership02" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="edit-membership-th">닉네임</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="input-wrap"><input type="text" class="input edit-nickname" value="' + MyProfile.userinfo.user_nickname + '" /></div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="edit-membership-th">간편로그인 연동</th>';
        html += '<td class="edit-membership-td">';
        if (MyProfile.userinfo.user_fbid) {
            html += '<span class="btn-quick-login btn-quick-facebook btn-quick-facebook-on">페이스북</span>';
        } else {
            html += '<a href="#link" title="페이스북" class="btn-quick-login btn-quick-facebook" id="fb_add_btn">페이스북</a>';
        }

        if (MyProfile.userinfo.user_naid) {
            html += '<span href="javascript:;" title="네이버" class="btn-quick-login btn-quick-naver btn-quick-naver-on">네이버</span>';
        } else {
            html += '<a href="#link" title="네이버" class="btn-quick-login btn-quick-naver" id="na_add_btn">네이버</a>';
        }

        if (MyProfile.userinfo.user_kaid) {
            html += '<span href="javascript:;" title="카카오톡" class="btn-quick-login btn-quick-kakaotalk btn-quick-kakaotalk-on">카카오톡</span>';
        } else {
            html += '<a href="#link" title="카카오톡" class="btn-quick-login btn-quick-kakaotalk" id="ka_add_btn">카카오톡</a>';
        }

        html += '<div class="edit-membership-input-info">연동된 SNS계정으로 간편 로그인이 가능합니다.</div>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '<div class="edit-membership">';
        html += '<table class="table-edit-membership">';
        html += '<colgroup>';
        html += '<col class="col-membership01" />';
        html += '<col class="col-membership02" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="edit-membership-th2">이메일</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="input-wrap"><input type="email" value="' + MyProfile.userinfo.user_id + '" class="input edit-email" readonly /></div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="edit-membership-th2">휴대폰번호</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="edit-membership-phone">';
        html += '<div class="input-wrap">';
        html += '<input type="tel" class="input edit-prifle-phone1" value="' + MyProfile.userinfo.user_phone.substring(0, 3) + '" maxlength="3" />';
        html += '</div>';
        html += '<div class="input-wrap">';
        html += '<input type="tel" class="input edit-prifle-phone2" value="' + MyProfile.userinfo.user_phone.substring(3, 7) + '" maxlength="4" />';
        html += '</div>';
        html += '<div class="input-wrap">';
        html += '<input type="tel" class="input edit-prifle-phone3" value="' + MyProfile.userinfo.user_phone.substring(7, 11) + '" maxlength="4" />';
        html += '</div>';
        if (MyProfile.userinfo.user_phone_verify == "Y") {
            html += '<a href="#link" title="인증" class="btn-edit-membership-phone phone-auth-btn">인증 완료</a>';
            html += '</div>';
            html += '<div class="edit-membership-confirm" style="display:none;">';
            html += '<div class="input-wrap">';
            html += '<input type="text" class="input auth-number" />';
            html += '</div>';
            html += '<a href="#link" title="확인" class="btn-edit-membership-confirm" style="vertical-align:middle;">확인</a>';
            html += '<span class="confirm-time auth-time"></span>';
            html += '<div class="table-txt txt-color-r auth-error-msg"></div>';
            html += '</div>';
        } else {
            html += '<a href="#link" title="인증" class="btn-edit-membership-phone phone-auth-btn">인증</a>';
            html += '</div>';
            html += '<div class="edit-membership-confirm">';
            html += '<div class="input-wrap">';
            html += '<input type="text" class="input auth-number" />';
            html += '</div>';
            html += '<a href="#link" title="확인" class="btn-edit-membership-confirm" style="vertical-align:middle; background:#3d4248;">확인</a>';
            html += '<span class="confirm-time auth-time"></span>';
            html += '<div class="table-txt txt-color-r auth-error-msg"></div>';
            html += '</div>';
        }

        html += '<div class="edit-membership-input-info">';
        html += '입력하신 이메일/ 휴대폰 번호로 비밀번호 찾기 및 재설정을 하실 수 있습니다.';
        html += '</div>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '<div class="edit-membership">';
        html += '<table class="table-edit-membership">';
        html += '<colgroup>';
        html += '<col class="col-membership01" />';
        html += '<col class="col-membership02" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="edit-membership-th2">이메일/SMS 수신동의</th>';
        html += '<td class="edit-membership-td">';
        html += '<span class="tit">하비풀의 다양한 소식들을 받아 보시겠습니까?</span>';
        html += '<div class="edit-membership-input-info">이벤트정보, 기타 다양한 정보를 빠르게 만나실 수 있습니다. (주문, 배송내역은 수신여부와 상관 없이 기본 발송됩니다)</div>';
        html += '<div class="edit-membership-agree">';
        if (MyProfile.userinfo.user_emailagree == "Y") {
            html += '<input type="checkbox" class="btn-join-agree" name="agree-email" id="agree-email" checked /><label class="join-agree-label" for="agree-email" >이메일로 받아볼래요</label>';
        } else {
            html += '<input type="checkbox" class="btn-join-agree" name="agree-email" id="agree-email" /><label class="join-agree-label" for="agree-email" >이메일로 받아볼래요</label>';
        }
        html += '</div>';
        html += '<div class="edit-membership-agree">';
        if (MyProfile.userinfo.user_smsagree == "Y") {
            html += '<input type="checkbox" class="btn-join-agree" name="agree-sms" id="agree-sms" checked /><label class="join-agree-label" for="agree-sms">문자로 받아볼래요</label>';
        } else {
            html += '<input type="checkbox" class="btn-join-agree" name="agree-sms" id="agree-sms" /><label class="join-agree-label" for="agree-sms">문자로 받아볼래요</label>';
        }
        html += '</div>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '<div class="edit-membership edit-membership-border">';
        html += '<table class="table-edit-membership">';
        html += '<colgroup>';
        html += '<col class="col-membership01" />';
        html += '<col class="col-membership02" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="edit-membership-th2">이름</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="input-wrap">';
        html += '<input type="text" class="input edit-profile-name" value="' + MyProfile.userinfo.user_name + '" />';
        html += '</div>';
        html += '<div class="edit-membership-input-info">한글 2~5자 사이로 입력해 주세요.</div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="edit-membership-th2">생년월일</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="edit-membership-bitrhday">';
        html += '<div class="input-wrap"><input type="text" class="input edit-birth-year" value="' + MyProfile.userinfo.user_birthday.substring(0, 4) + '" /></div>년';
        html += '<div class="input-wrap"><input type="text" class="input edit-birth-month" value="' + MyProfile.userinfo.user_birthday.substring(5, 7) + '" /></div>월';
        html += '<div class="input-wrap"><input type="text" class="input edit-birth-day" value="' + MyProfile.userinfo.user_birthday.substring(8, 10) + '" /></div>일';
        html += '</div>';
        html += '<div class="edit-membeship-radio">';
        html += '<input type="radio" class="radio" id="solar" name="birthday" checked />';
        html += '<label for="solar" class="label-edit-membership-radio">양력</label>';
        html += '<input type="radio" class="radio" id="lunar" name="birthday" />';
        html += '<label for="lunar" class="label-edit-membership-radio">음력</label>';
        html += '</div>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '<div class="edit-membership-btn">';
        html += '<a href="#link" title="수정완료" class="btn-edit-membership edit-profile-btn">수정완료</a>';
        html += '</div>';
        html += '</div>';
        // html += '</div>';

        $('.edit-membership-wrap').append(html);

        $('.phone-auth-btn').off('click').on('click', function () {
            if ($(this).text() == "인증 완료") {
                return false;
            }
            ApiRequest.get("/sms/verify/phone", {
                phonenumber: phoneNum
            }, function (res) {
                console.log(res);

                var d = new Date();
                var today = [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');

                if (res.result.result_code === -901 && today === '2018-1-26') {
                    alert('문자 발송 서버 점검 중으로, 오후에 다시 이용 부탁드립니다. 불편을 드려 죄송합니다.');
                } else if (res.result.result_code < 0) {
                    alert('문자발송 서버 점검중 입니다. 빠른 시일내에 개선 예정입니다. 불편을 드려 죄송합니다.')
                } else {
                    $('.auth-time').text("3:00");
                    setAuthTime = 180;
                    clearInterval(authTimeInterval);
                    startAuthTime();
                }
            });
        });

        $('.btn-edit-membership-confirm').off('click').on('click', function () {
            var num = $('.auth-number').val();
            ApiRequest.put("/sms/verify/phone", {
                code: num
            }, function (res) {
                if (res.message == "verified") {
                    clearInterval(authTimeInterval);
                    $('.phone-auth-btn').text("인증 완료").prop('disabled', true);
                    $('.edit-membership-confirm').hide();
                    Popup.alert("인증 완료", "인증이 완료 되었습니다.", "확인", function () {
                        $('.auth-number').val("");
                        $('.auth-time').text("");
                        Popup.hide();
                    });
                }
            }, function (err) {
                console.log(err);
                $('.edit-membership-confirm').show();
                Popup.alert("인증 실패", "휴대폰 인증에 실패했습니다.<br>다시 시도해주시기 바랍니다.", "확인", function () {
                    clearInterval(authTimeInterval);
                    $('.auth-number').val("");
                    $('.auth-time').text("");
                    Popup.hide();
                });
            });
        });

        $('.edit-prifle-phone1').change(function () {
            var phone = $('.edit-prifle-phone1').val() + $('.edit-prifle-phone2').val() + $('.edit-prifle-phone3').val();
            if (phone == phoneNum && isAuth == "Y") {
                $('.phone-auth-btn').text("인증 완료").prop('disabled', true);
                $('.edit-membership-confirm').hide();
            } else {
                phoneNum = phone;
                $('.phone-auth-btn').text("인증").prop('disabled', false);
                $('.auth-number').val("");
                $('.auth-time').text("");
                $('.edit-membership-confirm').show();
            }
        });
        $('.edit-prifle-phone2').change(function () {
            var phone = $('.edit-prifle-phone1').val() + $('.edit-prifle-phone2').val() + $('.edit-prifle-phone3').val();
            if (phone == phoneNum && isAuth == "Y") {
                $('.phone-auth-btn').text("인증 완료").prop('disabled', true);
                $('.edit-membership-confirm').hide();
            } else {
                phoneNum = phone;
                $('.phone-auth-btn').text("인증").prop('disabled', false);
                $('.auth-number').val("");
                $('.auth-time').text("");
                $('.edit-membership-confirm').show();
            }
        });
        $('.edit-prifle-phone3').change(function () {
            var phone = $('.edit-prifle-phone1').val() + $('.edit-prifle-phone2').val() + $('.edit-prifle-phone3').val();
            if (phone == phoneNum && isAuth == "Y") {
                $('.phone-auth-btn').text("인증 완료").prop('disabled', true);
                $('.edit-membership-confirm').hide();
            } else {
                phoneNum = phone;
                $('.phone-auth-btn').text("인증").prop('disabled', false);
                $('.auth-number').val("");
                $('.auth-time').text("");
                $('.edit-membership-confirm').show();
            }
        });

        $('.edit-profile-btn').off('click').on('click', function () {
            var profileParam = {}

            profileParam.nickname = $('.edit-nickname').val();
            var nic = profileParam.nickname.search(/[`~!#$%^&*|₩₩₩'₩";:₩/?]/gi);

            if (profileParam.nickname.length > 12 || profileParam.nickname.length < 2 || nic >= 0) {
                Popup.alert("회원 정보 수정 오류", "닉네임은 한글,영문,숫자로 2~12글자로 입력해야 됩니다.<br>(특수 기호는 @,-,_,.만 사용가능합니다.)", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            profileParam.userid = $('.edit-email').val();
            profileParam.userphone = $('.edit-prifle-phone1').val() + $('.edit-prifle-phone2').val() + $('.edit-prifle-phone3').val();

            profileParam.useremailagree = $('.edit-membership-cont [name=agree-email]').is(':checked') ? 'Y' : 'N';
            profileParam.usersmsagree = $('.edit-membership-cont [name=agree-sms]').is(':checked') ? 'Y' : 'N';
            profileParam.username = $('.edit-profile-name').val();

            var re = /[~!@\#$%^&*\()\-=+_']/gi;
            if (re.test(profileParam.username) || profileParam.username == '') {
                Popup.alert("회원 정보 수정 오류", "이름은 한글과 영문 대 소문자만 입력이 가능합니다.(특수기호, 공백 사용 불가)", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            profileParam.userbirthday = $('.edit-birth-year').val() + "-" + $('.edit-birth-month').val() + "-" + $('.edit-birth-day').val();
            var birthdays = $('.edit-birth-year').val() + $('.edit-birth-month').val() + $('.edit-birth-day').val();

            if (birthdays == '' || $('.edit-birth-year').val() == '' || $('.edit-birth-month').val() == '' || $('.edit-birth-day').val() == '' || parseInt($('.edit-birth-month').val()) > 12 || parseInt($('.edit-birth-day')) > 31 || birthdays.length != 8) {
                Popup.alert("회원 정보 수정 오류", "생년월일을 다시 확인해주세요.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            if ($(':radio[name="birthday"]:checked').attr("id") == "solar") {
                profileParam.userbirthdaytype = "SUN";
            } else {
                profileParam.userbirthdaytype = "MOON";
            }

            ApiRequest.put("/user", profileParam, function (res) {
                console.log(res);
                User.getUserInfo(true);
                Popup.alert("회원정보 수정", "회원정보가 수정되었습니다.", "확인", function () {
                    Popup.hide();
                    location.reload();
                });
            }, function (err) {
                console.log(err);
                Popup.alert("회원정보 수정 실패", "회원정보 수정에 실패했습니다.<br>프로필 내용을 확인해주세요.", "확인", function () {
                    Popup.hide();
                });
            });

        });

        $('#fb_add_btn').off('click').on('click', function () {
            FB.login(function (response) {
                accessToken = response.authResponse.accessToken;
                console.log(response.authResponse)
                ApiRequest.put("/user/fb", {
                    "accessToken": accessToken
                }, function (res) {
                    location.reload();
                }, function (err) {
                    //                console.log(err);
                    Popup.alert("ERROR", "이미 등록되었거나 잘못된 소셜계정입니다.", "확인", function () {
                        Popup.hide();
                    });
                });


            }, {scope: 'public_profile,email'});
        });

        $('#na_add_btn').off('click').on('click', function () {
            location.href = User.snsAuth.naver.add.generateAuthorizeUrl();
        });

        $('#ka_add_btn').off('click').on('click', function () {
            Kakao.Auth.login({
                success: function (authObj) {
                    ApiRequest.put("/user/ka", {
                        "accessToken": authObj.access_token
                    }, function (res) {
                        location.reload();
                    }, function (err) {
                        //                console.log(err);
                        Popup.alert("ERROR", "이미 등록되었거나 잘못된 소셜계정입니다.", "확인", function () {
                            Popup.hide();
                        });
                    });


                },
                fail: function (err) {
                    //alert(JSON.stringify(err));
                    Popup.alert("연동 실패", "계정 연동에 실패하였습니다.", "확인", function () {
                        Popup.hide();
                    });
                }
            });
        });


    };

    var authTimeInterval = {};
    var setAuthTime = 180;
    var startAuthTime = function () {
        $('.auth-error-msg').text("");
        authTimeInterval = setInterval(function () {
            setAuthTime--;
            var mintue = parseInt(setAuthTime / 60);
            var second = setAuthTime % 60;
            $('.auth-time').text(mintue + ":" + second);
            if (setAuthTime <= 0) {
                $('.auth-error-msg').text("입력시간이 초과 되었습니다. 인증번호를 다시 받아주세요.");
                clearInterval(authTimeInterval);
            }
        }, 1000);
    };

    var setChangePassword = function () {


        var html = '';

        html += '<div class="edit-membership-tit">';
        html += '비밀번호 변경';
        html += '</div>';
        html += '<div class="edit-membership-cont">';
        html += '<div class="edit-membership edit-membership-border">';
        html += '<table class="table-edit-membership">';
        html += '<colgroup>';
        html += '<col class="col-membership01" />';
        html += '<col class="col-membership02" />';
        html += '</colgroup>';
        html += '<tbody>';
        html += '<tr>';
        html += '<th class="edit-membership-th2">현재 비밀번호</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="input-wrap"><input type="password" class="input cur-password" /></div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="edit-membership-th2">새 비밀번호</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="input-wrap"><input type="password" class="input new-password" /></div>';
        html += '<div class="change-pw-info">비밀번호는 6~16자 영문 (대/소문자), 숫자, 특수문자를 사용해주세요.</div>';
        html += '</td>';
        html += '</tr>';
        html += '<tr>';
        html += '<th class="edit-membership-th2">새 비밀번호 확인</th>';
        html += '<td class="edit-membership-td">';
        html += '<div class="input-wrap"><input type="password" class="input confirm-password" /></div>';
        html += '<div class="change-pw-info">비밀번호 확인을 위해 새 비밀번호를 다시 한번 더 입력해주세요.</div>';
        html += '</td>';
        html += '</tr>';
        html += '</tbody>';
        html += '</table>';
        html += '</div>';
        html += '<div class="edit-membership-btn">';
        html += '<a href="#link" title="변경완료" class="btn-edit-membership change-pass-btn">변경완료</a>';
        html += '</div>';
        html += '</div>';

        $('.change-pw-wrap').append(html);
        $('.change-pass-btn').off('click').on('click', function () {
            var oldpass = $('.cur-password').val();
            var newpass = $('.new-password').val();
            var confirmpass = $('.confirm-password').val();

            var num = newpass.search(/[0-9]/g);
            var eng = newpass.search(/[a-z]/ig);
            var spe = newpass.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

            if (newpass.length < 6 || newpass.length > 16) {
                Popup.alert("비밀번호 변경 실패", "비밀번호는 6~16자 영문(대/소문자), 숫자, 특수문자를 사용해주세요.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            if (num < 0 || eng < 0 || spe < 0) {
                Popup.alert("비밀번호 변경 실패", "비밀번호는 6~16자 영문(대/소문자), 숫자, 특수문자를 사용해주세요.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            if (confirmpass != newpass) {
                Popup.alert("비밀번호 변경 실패", "입력하신 비밀번호와 다릅니다.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }
            ApiRequest.put("/user/changePassword", {
                "oldpass": oldpass,
                "newpass": newpass
            }, function (res) {
                console.log(res);
                if (res.result) {
                    $('.cur-password').val('');
                    $('.new-password').val('');
                    $('.confirm-password').val('');

                    Popup.alert("비밀번호 변경", "비밀번호가 변경되었습니다.", "확인", function () {
                        Popup.hide();
                    });
                } else {
                    Popup.alert("비밀번호 변경 실패", "현재 비밀번호를 확인해주세요.", "확인", function () {
                        Popup.hide();
                    });
                }
            }, function (err) {
                console.log(err);
                if (err.message == "Same password") {
                    Popup.alert("비밀번호 변경 실패", "같은 비밀번호 입니다.", "확인", function () {
                        Popup.hide();
                    });
                } else if (err.message == "password not match") {
                    Popup.alert("비밀번호 변경 실패", "현재 비밀번호가 맞지 않습니다.", "확인", function () {
                        Popup.hide();
                    });
                } else {
                    Popup.alert("비밀번호 변경 실패", "비밀번호 변경에 실패했습니다.", "확인", function () {
                        Popup.hide();
                    });
                }
            });
        });
    };

    var setExitUser = function () {
        var html = '';

        html += '<div class="quit-membership-tit">';
        html += '<div class="quit-tit">그 동안 하비풀을 이용해주셔서 감사합니다.</div>';
        html += '<div class="quit-txt">';
        html += '고객님께서 회원 탈퇴를 원하신다니 저희 서비스가 많이 부족하고 미흡했나 봅니다.<br/>';
        html += '불편하셨던 점이나 불만사항을 알려주시면 적극 반영해서 고객님의 불편함을 해결해 드리도록 노력하겠습니다.';
        html += '</div>';
        html += '</div>';
        html += '<div class="quit-membership-cont">';
        html += '<div class="edit-membership-tit">';
        html += '회원탈퇴 안내';
        html += '</div>';
        html += '<div class="info-quit-membership">';
        html += '• 회원 탈퇴 시 고객님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에 의거한 hobbyful 고객정보 보호정책에 따라 관리 됩니다.<br/>';
        html += '• 탈퇴 시 보유하고있던 마일리지, 쿠폰은 모두 영구 삭제됩니다.<br/>';
        html += '• 정기구독이 진행 중인 경우에는 탈퇴가 불가능하며, 취소/반품이 완료된 이후 가능합니다.<br/>';
        html += '• 탈퇴 후 24시간 동안 기존에 사용하신 이메일과 휴대폰 번호로는 재가입이 불가능합니다.';
        html += '</div>';
        html += '<div class="reply-info-cont align-center">';
        html += '현재 고객님의 사용 가능 마일리지는 <br class="-w" / >';
        html += '<span class="bold txt-color-r">' + parseInt(MyProfile.userinfo.user_point) + ' p</span>입니다';
        html += '</div>';
        html += '</div>';
        html += '<div class="quit-membership-cont">';
        html += '<div class="edit-membership-tit">';
        html += '탈퇴 사유 확인';
        html += '</div>';
        html += '<div class="write-reply-area">';
        html += '<div class="write-reply">';
        html += '<div class="write-reply-tit">사유선택</div>';
        html += '<div class="write-reply-input">';
        html += '<span class="ask-category ask-category-on">';
        html += '<input type="radio" class="check-ask" id="quit-product" name="quit-category" checked>';
        html += '<label class="label-ask" for="quit-product">상품 품질 불만</label>';
        html += '</span>';
        html += '<span class="ask-category ask-category-on">';
        html += '<input type="radio" class="check-ask" id="quit-use" name="quit-category">';
        html += '<label class="label-ask" for="quit-use">이용빈도 낮음</label>';
        html += '</span>';
        html += '<span class="ask-category ask-category-on">';
        html += '<input type="radio" class="check-ask" id="quit-delivery" name="quit-category">';
        html += '<label class="label-ask" for="quit-delivery">배송불만</label>';
        html += '</span>';
        html += '<span class="ask-category ask-category-on">';
        html += '<input type="radio" class="check-ask" id="quit-return" name="quit-category">';
        html += '<label class="label-ask" for="quit-return">교환/환불 불만</label>';
        html += '</span><br class="-m" />';
        html += '<span class="ask-category ask-category-on">';
        html += '<input type="radio" class="check-ask" id="quit-as" name="quit-category">';
        html += '<label class="label-ask" for="quit-as">A/S 불만</label>';
        html += '</span>';
        html += '<span class="ask-category ask-category-on">';
        html += '<input type="radio" class="check-ask" id="quit-nofun" name="quit-category">';
        html += '<label class="label-ask" for="quit-nofun">재미없음</label>';
        html += '</span>';
        html += '<span class="ask-category ask-category-on">';
        html += '<input type="radio" class="check-ask" id="quit-etc" name="quit-category">';
        html += '<label class="label-ask" for="quit-etc">기타</label>';
        html += '</span>';
        html += '</div>';
        html += '</div>';
        html += '<div class="write-reply write-textarea">';
        html += '<div class="write-reply-tit">기타(선택)</div>';
        html += '<div class="write-reply-input">';
        html += '<div class="input-wrap">';
        html += '<textarea class="textarea exit-reason" rows="" cols="" placeholder="기타 사유를 입력해 주세요." maxlength="300" ></textarea>';
        html += '<span class="change-reason-txt-count">0/300</span>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="write-reply">';
        html += '<div class="write-reply-tit">비밀번호</div>';
        html += '<div class="write-reply-input">';
        html += '<div class="input-wrap">';
        html += '<input type="password" class="input exit-password" />';
        html += '</div> <div class="change-pw-info">간편로그인으로 가입하신 경우, <a href="#" onclick="User.showFindPassword(); return false;">비밀번호 찾기</a>를 통해 임시비밀번호를 발급받은 후 입력해 주세요.</div>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<div class="edit-membership-btn">';
        html += '<a href="#link" title="탈퇴하기" class="btn-edit-membership exit-user-btn">탈퇴하기</a>';
        html += '</div>';
        html += '</div>';

        $('.quit-membership-wrap').append(html);

        $('.exit-user-btn').off('click').on('click', function () {
            var user_leavetype = $(':radio[name=quit-category]:checked').parent().children('label').text();
            var user_leavemessage = '';
            if (user_leavetype == "기타") {
                user_leavemessage = $('.exit-reason').val();
            }
            if (user_leavetype == "기타" && user_leavemessage == '') {
                Popup.alert("회원 탈퇴 오류", "기타 사유를 입력해주세요.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            var user_password = $('.exit-password').val();
            if (user_password == '') {
                Popup.alert("회원 탈퇴 오류", "비밀번호를 입력해 주세요.", "확인", function () {
                    Popup.hide();
                });
                return false;
            }

            Popup.confirm("회원 탈퇴", "정말 탈퇴하시겠습니까?<br>탈퇴 즉시 마일리지와 쿠폰은 소멸되며,<br>24시간 내 재가입이 불가능합니다", "취소", "회원탈퇴", function () {
                Popup.hide();
            }, function () {
                Popup.hide();
                ApiRequest.delete("/user", {
                    "user_leavetype": user_leavetype,
                    "user_leavemessage": user_leavemessage,
                    "user_password": user_password
                }, function (res) {
                    console.log(res);
                    Popup.alert("회원 탈퇴", "회원 탈퇴 되었습니다.<br>그 동안 하비풀을 이용해주셔서 감사합니다.", "확인", function () {
                        Popup.hide();
                        User.logout();
                    });
                }, function (err) {
                    console.log(err);
                    Popup.alert("회원 탈퇴 오류", "입력하신 비밀번호가 다릅니다.<br>비밀번호를 다시 한번 확인해주세요.", "확인", function () {
                        Popup.hide();
                    });
                });
            });
        });
    };


    var drawFavoriteHobbyClass = function () {
        ApiRequest.get("/class/book", {
            "amount": favoriteAmount,
            "page": favoritePage
        }, function (res) {
            console.log(res);
            favoriteTotal = res.count;
            $('.favorite-wrap').empty();
            var html = '';
            html += '<ul class="class-list-wrap">';
            $.each(res.list, function () {
                html += '<li class="class-list">';
                html += '<a href="/product/' + this.class_uid + '" title="' + this.class_name + '">';
                html += '<div class="class-list-thumb">';
                html += '<img src="' + IMG_URL + 'class/thumbs/' + this.class_thumbnail.replace('-resize', '-square') + '" alt="" class="thumb-class-list" />';
                // html += '<div class="class-list-btn-wrap">';
                // html += '<div class="class-list-btn">';
                // html += '<a href="#link" title="취미바구니에 담기" class="btn-class-list" onclick="showRegularBox();">취미바구니에 담기</a>';
                // html += '<a href="view-class.html" title="자세히 보기" class="btn-class-list">자세히 보기</a>';
                // html += '</div>';
                // html += '</div>';
                html += '</div>';
                html += '<div class="class-list-cont">';
                html += '<p class="class-list-txt">' + this.class_name2 + '</p>';
                html += '<p class="class-list-info">' + this.class_name + '</p>';
                html += '</div>';
                html += '</a>';
                html += '</li>';
            });
            html += '</ul>';

            $('.favorite-wrap').append(html);

            var pageHtml = '';

            /* Paging */
            var totalPage = Math.ceil(favoriteTotal / favoriteAmount);
            pageHtml += '<div class="paging-num-wrap">';
            for (var i = 1; i <= totalPage; i++) {
                if (favoritePage == i) {
                    pageHtml += '<a href="#link" title="' + i + '" data-page="' + i + '" class="favorite-page-btn btn-num btn-num-on">' + i + '</a>';
                } else {
                    pageHtml += '<a href="#link" title="' + i + '" data-page="' + i + '" class="favorite-page-btn btn-num">' + i + '</a>';
                }
            }
            pageHtml += '</div>';

            $('.favorite-wrap').append(pageHtml);

            $('.favorite-page-btn').off('click').on('click', function () {
                favoritePage = parseInt($(this).attr('data-page'));
                drawFavoriteHobbyClass();
            });

        }, function (err) {
            console.log(err);
        });
    };

    var drawFavoriteMagazine = function () {
        ApiRequest.get("/magazine/book", {
            "amount": favoriteAmount,
            "page": favoritePage
        }, function (res) {
            console.log(res);
            favoriteTotal = res.count;
            $('.favorite-wrap').empty();
            var html = '';

            html += '<ul class="class-list-wrap2">';
            $.each(res.list, function () {
                html += '<li class="class-list">';
                html += '<a href="view-magazine.html?id=' + this.mz_idx + '" title="' + this.mz_title + '">';
                html += '<div class="class-list-thumb">';
                html += '<img src="' + IMG_URL + 'magazine/' + this.mz_thumbnail + '" alt="' + this.mz_title + '" alt="" class="thumb-class-list" />';
                html += '<span class="thumb-slide-play">재생</span>';
                html += '</div>';
                html += '<div class="class-list-cont">';
                html += '<p class="class-list-tit">' + this.mz_title2 + '</p>';
                html += '<p class="class-list-txt">' + this.mz_title + '</p>';
                html += '<p class="class-list-info">' + moment(this.mz_regdate).format("YYYY.MM.DD ") + HF.CODE.weekday[moment(this.mz_regdate).format("dddd")] + ' <span class="thumb-slide-link-nick"></span></p>';
                html += '</div>';
                html += '</a>';
                html += '</li>';
            });
            html += '</ul>';

            $('.favorite-wrap').append(html);
            var pageHtml = '';

            /* Paging */
            var totalPage = Math.ceil(favoriteTotal / favoriteAmount);
            pageHtml += '<div class="paging-num-wrap">';
            for (var i = 1; i <= totalPage; i++) {
                if (favoritePage == i) {
                    pageHtml += '<a href="#link" title="' + i + '" data-page="' + i + '" class="favorite-page-btn btn-num btn-num-on">' + i + '</a>';
                } else {
                    pageHtml += '<a href="#link" title="' + i + '" data-page="' + i + '" class="favorite-page-btn btn-num">' + i + '</a>';
                }
            }
            pageHtml += '</div>';
            $('.favorite-wrap').append(pageHtml);

            $('.favorite-page-btn').off('click').on('click', function () {
                favoritePage = parseInt($(this).attr('data-page'));
                drawFavoriteMagazine();
            });

        }, function (err) {
            console.log(err);
        });

    };

    var listener = function () {
        $('body').on('click', 'a[href^="/mypage.shop?m="]', function(e){
            var search = $(this).attr('href').split('?')[1];
            var q = Utils.parseQuery(search);

            if(search === location.search) return;

            e.preventDefault();
            router(true, q);
        });

        window.onpopstate = function(event) {
            if(event.state && event.state.isRouter) {
                console.log('aaa', event);
                router(false, Utils.parseQuery());
            }
        };

        $('body').on('click', 'a[href="#link"]', function(e){
            e.preventDefault();
        });

        $('body').on('click', '.btn-profile-edit-confirm', function () {
            var password = $('.input-check-pwd').val();
            ApiRequest.put('/user/checkpw', {
                'userpass': password
            }, function (res) {
                console.log(res);
                if (res.result) {
                    drawProfileEdit();
                } else {
                    Popup.alert("비밀번호 확인 실패", "비밀번호가 다릅니다.", "확인", function () {
                        Popup.hide();
                    });
                }
            }, function (err) {
                console.log(err);
                Popup.alert("비밀번호 확인 실패", "비밀번호가 다릅니다.", "확인", function () {
                    Popup.hide();
                });
            });
        });

        $(document).on('click', '.del-thumb', function (e) {
            e.preventDefault();
            if ($(this).hasClass('edit-del-thumb')) {
                var cri_idx = $(this).parent().attr('data-cri-idx');
                cri_list.push(cri_idx);
                $(this).parent().remove();
                reviewFileLength -= 1;
                if (reviewFileLength < 3) {
                    $('.add-photo-wrap').show();
                } else {
                    $('.add-photo-wrap').hide();
                }
            } else {
                var thumb_idx = $(this).parent().index();
                $('.reply-thumb-photo').eq(thumb_idx).remove();
                files.splice(thumb_idx, 1);
                reviewFileLength -= 1;
                if (reviewFileLength < 3) {
                    $('.add-photo-wrap').show();
                } else {
                    $('.add-photo-wrap').hide();
                }
            }
        });

        /*
                $('.btn-profile-thumb').off('click').on('click', function(){
                    // $('#wrap').addClass('layer-on photo-on');
                    $('.profile-upload').trigger('click');
                });
        */
        $(".profile-upload").change(function () {
            profileReadURL(this);
        });
    };

    function profileReadURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var formData = new FormData();
                formData.append("files", $(".profile-upload")[0].files[0]);

                ApiRequest.putFile("/user/changeprofile", formData, function (res) {
                    console.log(res);
                    if (res.message == "Success") {
                        Popup.alert("프로필 이미지 변경 완료", "프로필 이미지가 변경되었습니다.", "확인", function () {
                            $('#wrap').removeClass("layer-on photo-on")
                            getMyProfile();
                            Popup.hide();
                        });
                    }
                }, function (err) {
                    console.log(err);
                    Popup.alert("프로필 이미지 변경 실패", "프로필 이미지 변경에 실패했습니다.", "확인", function () {
                        $('#wrap').removeClass("layer-on photo-on")
                        Popup.hide();
                    });
                });

            }
            reader.readAsDataURL(input.files[0]);
        }
    };

    return {
        init: function () {
            IMG_URL = HF.DATA.s3.uri + '/';

            if (!User.isLoginCheck()) {
                window.isBlockLoginClose = true;
                User.showLogin();
                // location.href = "/";
                return false;
            }

            if(HF.DATA.user.user_paytype !== 'CARD') {
                $('.mymenu-wrap .mymenu.i-subscript').hide();
            }

            getBasicInfo();
            listener();

            var q = Utils.parseQuery();
            q.m = q.m || 'order';
            q.s = q.s || 'order';
            router(false, q);
        },
        hideWriteReply: function () {
            document.getElementById('wrap').className = 'wrap';
            document.getElementById('write-reply-wrap').className = 'layer-wrap write-reply-wrap';
            $('body').removeClass('on-popup');
        },
        hideAddressPopup: function () {
            document.getElementById('wrap').className = 'wrap';
        }
    }
})();

HF.ready(function () {
    Mypage.init();
});