/**
 * Created by Nalrarang on 2017. 3. 7
 */
/**
Image File Uploader.
@namespace Upload
@author nalrarang@gmail.com
@logs 20170307:Nalrarang update
*/

var Popup = (function(){

    var ModalClass = function(options){
        options = _.extend({
            title : '',
            isFullInMobile : true,
            isShowCloseButton : true,
            isShowDimmer : true,
            isHideOverlay : true,
            className : '',
            lifecycleEvents : {
                beforeRender : function(){}, // function(data, $container, instance){},
                afterRender : function(){}, // function(data, $container, instance){},
                beforeClose : function(){}, // function(data, $container, instance){},
                afterClose : function(){} // function(data, $container, instance){}
            }
        }, options);

        this._id = 'hf-modal-' + Utils.uniqueNumber();
        this._dimmer = new Utils.Dimmer(this._id, 'hfc-dimmer-modal');

        this._options = options;

        this.$modal = null;
        this.$container = null;
        this.$footer = null;

        return this;
    };

    ModalClass.prototype = {
        _modalTemplate : function(){
            return $.templates([
                '<div class="hfc-modal s-big"><!-- s-small -->',
                '    <div class="hfe-bg"></div>',
                '    <div class="hfe-container">',
                '        {{if title}}<header>',
                '            <h3>{{:title}}</h3>',
                '            {{if isShowCloseButton}}<button class="hfe-header-close a-close">창닫기</button>{{/if}}',
                '        </header>{{/if}}',
                '        <section class="hfe-content"></section>',
                '        <footer></footer>',
                '    </div>',
                '</div>'
            ].join(''));
        },
        showDimmer : function(){
            this._dimmer.show();
        },
        hideDimmer : function(){
            this._dimmer.hide();
        },
        render : function(){
            if(!this._options.lifecycleEvents.beforeRender() === false) return;
            this._dimmer.render(null, !this._options.isShowDimmer);

            this.$modal = $(this._modalTemplate().render({
                title : this._options.title,
                isShowCloseButton: this._options.isShowCloseButton
            })).appendTo('body');

            this.$modal.find('.a-close, .hfe-bg').click($.proxy(function(){
                this.clear();
            }, this));
            this._dimmer.on('click', $.proxy(function(){
                this.clear();
            }, this));

            this.$container = this.$modal.find('.hfe-content');
            this.$footer = this.$modal.find('footer');

            this._options.lifecycleEvents.afterRender();

            if(this._options.isHideOverlay) {
                // 채널톡 숨김
                $('#ch-plugin').hide();
            }

            Utils.lockWindowScroll(true);
        },
        clear : function(){
            if(!this._options.lifecycleEvents.beforeClose() === false) return;
            this._dimmer.clear();

            this.$modal.remove();
            this._options.lifecycleEvents.afterClose();

            if(this._options.isHideOverlay) {
                // 채널톡 보임
                $('#ch-plugin').show();
            }

            Utils.lockWindowScroll(false);
        }
    };

    var buyProduct = function(class_uid){
        var contentTemplate = $.templates([
            '<div class="hfe-option">',
            // '    <article class="s-default">',
            // '        <header>',
            // '            <h4>클래스 기본 구성</h4>',
            // '        </header>',
            // '        <div class="option-item">',
            // '            <h5>클래스 수강권 + 준비물 패키지</h5>',
            // '            <p class="prices">' +
            // '                <span class="discount-rate">10%</span>',
            // '                <span class="regular"><s>150,000원</s></span>',
            // '                <span class="sale"> 145,000원</span>',
            // '            </p>',
            // '        </div>',
            // '    </article>',
            '    <article class="s-select">',
            '        <header>',
            '            <h4>{{if class.class_type === "CLASS"}}클래스{{else}}상품{{/if}} 옵션</h4>',
            '            {{if list && list.length > 1}}<p class="desc">1개 필수선택</p>{{/if}}',
            '        </header>',
            '        <ul class="option-list">',
            '           {{for list}}',
            '            <li>',
            '                <label>',
            '                    <input type="radio" name="listIndex" value="{{:#getIndex()}}">',
            '                    <div class="option-item">',
            '                        <h5>{{:name}}</h5>',
            '                        <p class="prices">',
            '                            {{if discount_rate}}<span class="discount-rate">{{:discount_rate}}%</span>{{/if}}',
            '                            {{if price_regular != price_sale}}<span class="regular"><s>{{addComma:price_regular}}원</s></span>{{/if}}',
            '                            {{if price_sale}}<span class="sale">{{addComma:price_sale}}원</span>{{/if}}',
            '                        </p>',
            '                        {{if description}}<span class="desc">{{:description}}</span>{{/if}}',
            '                        {{if thumbnail_file}}<img src="{{*:HF.DATA.s3.uri}}/{{:thumbnail_file}}" alt="">{{/if}}',
            '                        {{if components}}<span class="components-desc">{{:components}}</span>{{/if}}',
            '                    </div>',
            '                </label>',
            '           {{/for}}',
            '            </li>',
            '        </ul>',
            '    </article>',
            '</div>'].join(''))
        ;
        var footerTemplate = $.templates([
            '{{if data}}',
            '   <div class="hfe-orderinfo {{if installmentMonth}}s-installment{{/if}}">',
            '       <div class="i-names">',
            '           {{:data.name}}',
            '       </div>',
            '       <div class="i-quantity"></div>',
            '       {{if !installmentMonth}}',
            '       {{if data.price_sale !== data.price_regular}}<div class="i-price-regular"><s>{{addComma:data.price_regular*quantity}}원</s></div>{{/if}}',
            '       <div class="i-price-sale">',
            '           <span class="i-label">{{if class.class_type === "CLASS"}}클래스{{else}}상품{{/if}} 금액</span>',
            '           <span class="i-num">{{addComma:data.price_sale*quantity}}원</span>',
            '       </div>',
            '       {{else}}',
            '       <div class="i-price-regular">{{if data.price_sale !== data.price_regular}}<s>{{addComma:data.price_regular*quantity}}원</s>{{/if}} <span class="i-sale">{{addComma:data.price_sale*quantity}}원</span></div>',
            '       <div class="i-price-sale">',
            '           <span class="i-label">{{if class.class_type === "CLASS"}}클래스{{else}}상품{{/if}} 금액</span>',
            '           <span class="i-price-installment">',
            '               <span class="i-txt">월</span>',
            '               <span class="i-num">{{addComma:installmentPayment*quantity}}</span>',
            '               <span class="i-txt">원</span>',
            '               <span class="i-installment">X {{:installmentMonth}}개월</span>',
            '           </span>',
            '       </div>',
            '       {{/if}}',
            '    </div>',
            '{{/if}}',
            '<div class="hfe-btn-group s-twin">',
            '    <button class="hfe-btn s-w5 a-cart">장바구니 담기</button>',
            '    <button class="hfe-btn s-w5 a-buy s-active">바로 신청하기</button>',
            '</div>'].join(''))
        ;

        var loadingDimmer = new Utils.LoadingDimmer('product');
        loadingDimmer.render();
        loadingDimmer.hide();

        setTimeout(function(){
            loadingDimmer.show();
        },100);


        var classData;
        var optionData;
        ApiRequest.get("/class/content/" +class_uid)
            .then(function(res){
                classData = res;
                return ApiRequest.get("/class/content/" +res.data.class_idx+ "/option").then(function(res){
                    optionData = res;
                });
            })
            .always(function(){
                loadingDimmer.clear();
            })
            .then(function(){
                var installmentMonth = classData.data.class_installment_month;
                var list = optionData.list;
                var selectedValue = {
                    listIndex : null,
                    data : null,
                    quantity : 1
                };

                var renderContent = function(){
                    modal.$container.html(contentTemplate.render({
                        class : classData.data,
                        list : list
                    }));
                };

                var renderFooter = function(){
                    modal.$footer.html(footerTemplate.render({
                        class : classData.data,
                        quantity : selectedValue.quantity,
                        data : selectedValue.data,
                        listIndex : selectedValue.listIndex,
                        installmentMonth : installmentMonth,
                        installmentPayment : selectedValue.data ? Math.floor(selectedValue.data.price_sale/installmentMonth) : 0
                    }));

                    modal.$footer.find('.i-quantity').spinner({
                        firstValue : selectedValue.quantity,
                        min : 1,
                        max : 99,
                        inputName : null,
                        onChange : function(num){
                            selectedValue.quantity = num;
                            renderFooter();
                        }
                    });
                };

                var addCart = function(isDirectBuy){
                    return cart.addItem({
                        cart_quantity : selectedValue.quantity,
                        cart_directbuy : isDirectBuy ? 'Y' : 'N',

                        class_idx : classData.data.class_idx,
                        class_thumbnail : classData.data.class_thumbnail,
                        class_name : classData.data.class_name,
                        class_price_regular : classData.data.class_price_regular,
                        class_price : classData.data.class_price,

                        class_option_id : selectedValue.data.id,
                        class_option_name : selectedValue.data.name,
                        class_option_price_regular : selectedValue.data.price_regular,
                        class_option_price_sale : selectedValue.data.price_sale
                    }, { isDirectBuy : isDirectBuy })
                        .then(function(){

                            HF.tracker.dataLayerPush({
                                event: 'eec.add',
                                ecommerce: {
                                    add: {
                                        actionField: {
                                            list: '장바구니'
                                        },
                                        products: [{
                                            id: classData.data.class_code,
                                            name: classData.data.class_name,
                                            // category: 'guides/google-tag-manager/enhanced-ecommerce',
                                            variant: selectedValue.data.code,
                                            brand: classData.data.lecturer_name,
                                            quantity: selectedValue.quantity,
                                            price: selectedValue.data.price_sale,
                                            // dimension1: '상품 타입(정규 클래스, 원데이 클래스, DIY 키트, 재료/도구)',
                                            dimension2: classData.data.class_uid,
                                            dimension3: HF.DATA.user && HF.DATA.user.user_idx
                                        }]
                                    }
                                }
                            })
                        ;

                    });
                };

                var modal = new ModalClass({
                    title : (classData.data.class_type === 'CLASS' ? '클래스' : '상품') + ' 옵션을 선택하세요',
                    isFullInMobile : true,
                    isShowCloseButton : true,
                    isShowDimmer : true,
                    isHideOverlay : true,
                    lifecycleEvents : {
                        beforeRender : function(){}, // function(data, $container, instance){},
                        afterRender : function(){
                            renderContent();
                            renderFooter();
                        },
                        beforeClose : function(){}, // function(data, $container, instance){},
                        afterClose : function(){} // function(data, $container, instance){}
                    }
                });
                modal.render();

                modal.$container
                    .on('change', '[name=listIndex]', function(e){
                        var listIndex = $(this).val();

                        selectedValue.listIndex = listIndex;
                        selectedValue.data = list[listIndex];

                        renderFooter();

                        var scrollTo = $(this).closest('li').offset().top - modal.$container.offset().top + modal.$container.scrollTop();
                        modal.$container.stop().animate({scrollTop:scrollTo - 100}, 200, 'swing');
                    })
                ;
                modal.$footer
                    .on('click', '.a-cart', function(e){
                        e.preventDefault();

                        if(!selectedValue.data) {
                            Popup.alert('알림', '원하는 구성품을 먼저 선택해 주세요.');
                            return;
                        }

                        addCart(false).then(function(){
                            modal.clear();
                        });
                    })
                    .on('click', '.a-buy', function(e){
                        e.preventDefault();

                        if(!selectedValue.data) {
                            Popup.alert('알림', '원하는 구성품을 먼저 선택해 주세요.');
                            return;
                        }

                        addCart(true).then(function(){
                            modal.clear();
                        });
                    })
                ;

                if(list.length === 1) {
                    modal.$container.find('[name=listIndex]:eq(0)').trigger("click");
                }

            })
            .catch(function(e){
                console.error(e)
            })
        ;
    };


    var drawPopupLayout = function(){
        var html = '';
        html += '<div class="layer-wrap popup-wrap" id="popup-wrap">';
        html += '<div class="bg-layer-wrap" onclick="Popup.hide();"></div>';
        html += '</div>';

        $('#wrap').append(html);
    };
    var showAlert = function(title, text, button_1, callback_1){
        $('#popup-wrap').empty();
        var html = '';        
        html += '<div class="popup-layer" ></div>';
        html += '<div class="popup-cont" style="top:50%; margin-top:-137px;">';
        html += '<h2 class="layer-tit">'+ title +'</h2>';
        html += '<div class="popup-txt" style="min-height:78px; width:100%; text-align:center; display:table;">';
        html += '<span style="display:table-cell; vertical-align:middle;">' + text + '</span>';
        html += '</div>';
        html += '<div class="popup-btn">';
        html += '<button class="btn-popup alert_btn_1">'+ button_1 +'</button>';
        // html += '<a href="javascript:;" title="'+ button_1 +'" class="btn-popup alert_btn_1">'+ button_1 +'</a>';
        html += '</div>';
        html += '</div>';
        html += '<a href="javascript:;" title="닫기" class="btn-layer-close" onclick="Popup.hide();">닫기</a>';

        $('#popup-wrap').append(html);

        $('.alert_btn_1').off('click').on('click', function(e){
            e.preventDefault();
            callback_1();
        });

        setTimeout(function(){
            $('.alert_btn_1').focus();
        }, 10);
        
        $('#wrap').addClass('layer-on2 popup-on');
    }
	var showRegPayment = function( callback_1){
		$('#popup-wrap').empty();
        var html = '';
        html += '<div class="popup-layer" onclick="Popup.hide();"></div>';
        html += '<div class="popup-cont new-payment" style="top:50%; margin-top:-232px;">';
        html += '<h2 class="layer-tit">신용/체크 카드 등록</h2>';
        html += '<div class="popup-txt" style="min-height:78px; width:100%; text-align:center; display:table;">';
        
        html+= '<table class="new-payment-table" summary="카드정보테이블">';
        html+= '<colgroup>';
        html+= '<col class="th-new-payment" />';
        html+= '<col class="td-new-payment" />';
        html+= '<col class="td-new-payment" />';
        html+= '</colgroup>';
        html+= '<tbody>';
        
        html+= '<tr>';
        html+= '<th>종류</th>';
        html+= '<td colspan="4" class="no-grid">';
        html+= '<label><input type="radio" name="type" value="personal" checked="checked" /> 개인카드 </label>';
        html+= '<label><input type="radio" name="type" value="company" /> 법인카드 </label>';
        html+= '</td></tr>';

        html+= '<tr>';
        html+= '<th>카드번호</th>';
        html+= '<td><input type="tel" maxlength="4" class="new-payment-card1"></td>';
        html+= '<td><input type="tel" maxlength="4" class="new-payment-card2"></td>';
        html+= '<td><input type="password" maxlength="4" class="new-payment-card3"></td>';
        html+= '<td><input type="tel" maxlength="4" class="new-payment-card4"></td>';
        html+= '</tr>';
        
        html+= '<tr>';
        html+= '<th>유효기간</th>';
        html+= '<td colspan="2"><select class="new-payment-mdate">';
        html+= '<option value="">월</option>';
        html+= (function(){
            var list = [];
            var i, tmp;
            for(i=1; i<=12; i++){
                tmp = ('0'+i).slice(-2);
                list.push(['<option value="', tmp,'">', tmp,'</option>'].join(''));
            }
            return list.join('');
        })();
        html+= '</select></td>';
        html+= '<td colspan="2"><select class="new-payment-ydate">';
        html+= (function(){
            var currentYear = parseInt(moment().format('YYYY'));
            var lastYear = currentYear + 20;
            var i, list = [];
            for(i=currentYear; i<=lastYear; i++){
                list.push(['<option value="', i,'">', i,'</option>'].join(''));
            }
            return list.join('');
        })();
        html+= '</select></td>';
        html+= '</tr>';
        
        html+= '<tr class="g-personal">';
        html+= '<th>생년월일</th>';
        html+= '<td colspan="2"><input type="tel" placeholder="YYMMDD" maxlength="6" class="new-payment-birth"></td>';
        html+= '</tr>';

        html+= '<tr class="g-company">';
        html+= '<th>사업자번호</th>';
        html+= '<td colspan="2"><input type="tel" placeholder="10자리 입력" maxlength="10" class="new-payment-companynumber"></td>';
        html+= '</tr>';
        
        html+= '<tr>';
        html+= '<th>카드 비밀번호</th>';
        html+= '<td><input type="password" placeholder="2자리" maxlength="2" class="new-payment-password"></td>';
        html+= '<td>**</td>';
        
        html+= '</tr>';
        
        
		html+= '</tbody>';
		html+= '</table>';


        html += '</div>';
        html += '<div class="popup-payment-text">•  카드 정보는 나이스 정보통신을 통해 안전하게 관리됩니다.</div>';
        html += '<div class="popup-btn">';
        html += '<a href="javascript:;" title="등록하기" class="btn-popup confirm_btn_1" >등록하기</a>';
        html += '</div>';
        html += '</div>';
        html += '<a href="javascript:;" title="닫기" class="btn-layer-close" onclick="Popup.hide();">닫기</a>';        

        $('#popup-wrap').append(html);

        var chkCardType = function(){
            var type = $(".new-payment input[name='type']:checked").val();
            $('.new-payment').removeClass('type-company type-personal').addClass('type-'+type);
            return type;
        };

        $('.new-payment input[name="type"]').on('change', chkCardType);
        chkCardType();

        $('.confirm_btn_1').off('click').on('click', function(e){
            e.preventDefault();
            var isCompanyCard = ($(".new-payment input[name='type']:checked").val() === 'company');

            var newPaymentInfo = {
	            card1 : $(".new-payment .new-payment-card1").val(),
	            card2 : $(".new-payment .new-payment-card2").val(),
	            card3 : $(".new-payment .new-payment-card3").val(),
	            card4 : $(".new-payment .new-payment-card4").val(),
	            mdate : $(".new-payment .new-payment-mdate").val(),
				ydate : $(".new-payment .new-payment-ydate").val(),
				password : $(".new-payment .new-payment-password").val(),
                birth : (function(){
                    if(isCompanyCard)
                        return $(".new-payment .new-payment-companynumber").val();
                    else
                        return $(".new-payment .new-payment-birth").val();
                })()
			};

			if(!newPaymentInfo.card1 ||
				!newPaymentInfo.card2 ||
				!newPaymentInfo.card3 ||
				!newPaymentInfo.card4 ||
				!newPaymentInfo.mdate ||
				!newPaymentInfo.ydate ||
				!newPaymentInfo.birth ||
				(!newPaymentInfo.password && !isCompanyCard)
			) {
				alert('모든 정보를 채워주서야 합니다.');
				return;
			}
			
            callback_1(newPaymentInfo);
        });
       
        $('#wrap').addClass('layer-on2 popup-on');
	}
    var showConfirm = function(title, text, button_1, button_2, callback_1, callback_2, options){
        options = $.extend({
            className : '',
            buttonGainMatrix : [true,true]
        }, options);

        var btnClass1 = options.buttonGainMatrix[0] ? 'on' : '';
        var btnClass2 = options.buttonGainMatrix[1] ? 'on' : '';

        $('#popup-wrap').empty();
        var html = '';
        html += '<div class="popup-layer"></div>';
        html += '<div class="popup-cont i-confirm '+ options.className +'" style="top:50%; margin-top:-137px;">';
        html += '<h2 class="layer-tit">'+ title +'</h2>';
        html += '<div class="popup-txt">';
        html += '<span>' + text + '</span>';
        html += '</div>';
        html += '<div class="popup-btn popup-btn-2">';
        html += '<a href="#showconfirm" title="'+ button_1 +'" class="btn-popup confirm_btn_1 '+btnClass1+'">'+ button_1 +'</a>';
        html += '<a href="#showconfirm" title="'+ button_2 +'" class="btn-popup confirm_btn_2 '+btnClass2+'">'+ button_2 +'</a>';
        html += '</div>';
        html += '</div>';
        html += '<a href="javascript:;" title="닫기" class="btn-layer-close" onclick="Popup.hide();">닫기</a>';        

        $('#popup-wrap').append(html);

        $('.confirm_btn_1').off('click').on('click', function(e){
            e.preventDefault();
            callback_1();
        });
        $('.confirm_btn_2').off('click').on('click', function(e){
            e.preventDefault();            
            callback_2();
        });
        $('#wrap').addClass('layer-on2 popup-on');
    };

    var showReport = function(res, type, report_id){
        $('#popup-wrap').empty();
        var html = '';
        html += '<div class="popup-layer"></div>';
        html += '<div class="popup-cont" style="top:50%; margin-top:-255.5px;">';
        html += '<h2 class="layer-tit">신고 내용 선택</h2>';
        html += '<div class="popup-txt">';
        html += '이 게시물의 문제점을 알려주세요.';
        html += '</div>';
        html += '<div class="pick-list-wrap">';
        html += '<ul class="pick-list">';
        $.each(res.message, function(idx){
            html += '<li data-rc-idx="' + this.rc_idx + '" class="pick">';
            html += '<input type="radio" id="selectReport'+ idx +'" name="report" />';
            html += '<label for="selectReport'+ idx +'">'+ this.rc_title +'</label>';
            html += '</li>';
        });
        html += '<li class="input-wrap">';
        html += '<textarea rows="" cols="" class="textarea report-text" placeholder="자세한 내용을 작성해 주시면 큰 도움이 됩니다."></textarea>';
        html += '</li>';
        html += '</ul>';
        html += '</div>';
        html += '<div class="popup-btn popup-btn-2">';
        html += '<a href="javascript:;" title="취소" class="report_btn_1 btn-popup">취소</a>';
        html += '<a href="javascript:;" title="완료" data-type="'+ type +'" data-report-id="'+ report_id +'" class="report_btn_2 btn-popup">완료</a>';
        html += '</div>';
        html += '</div>';
        html += '<a href="javascript:;" title="닫기" class="btn-layer-close" onclick="hidePopup();">닫기</a>';

        $('#popup-wrap').append(html);
        $('.report_btn_1').off('click').on('click', function(e){
            e.preventDefault();
            Popup.hide();
        });
        $('.report_btn_2').off('click').on('click', function(e){
            e.preventDefault();            
            /* 신고 API 작성 */
            Popup.hide();
            var rc_idx = $(':radio[name=report]:checked').parent().attr('data-rc-idx');
            var type = $(this).attr('data-type');
            var report_id = $(this).attr('data-report-id');
            var report_text = $('.report-text').val();

            ApiRequest.post("/report", {
                "report_type": type,
                "rc_idx": rc_idx,
                "report_idxnum": report_id,
                "report_text": report_text
            }, function(res){
                console.log(res);
                Popup.alert("신고완료", "신고가 성공적으로 접수되었습니다.", "확인", function(){
                    Popup.hide();
                });
            }, function(err){
                console.log(err);
                if(err.responseJSON.message == "Duplicate entry"){
                    Popup.alert("신고", "이미 신고하신 게시물입니다.", "확인", function(){
                        Popup.hide();
                    });
                }
            });            
        });
        // $('.pick').off('click').on('click', function(e){
        //     e.preventDefault();                        
        //     $('.pick').removeClass('pick-on');
        //     $(this).addClass('pick-on');
            
        //     $(this).children('input[type=radio]').prop('checked', true);

        // });
        $('#wrap').addClass('layer-on2 popup-on');        
    };

    var prompt = function(options){
        options = _.extend({
            title : '대댓글 달기',
            placeholder : '내용을 입력해 주세요',
            minTextLength : 5
        }, options);

        var dfd = $.Deferred();
        var html = [
            '<div class="popup-prompt">',
                '<div class="popup-layer a-close"></div>',
                '<div class="popup-cont">',
                '<h2 class="layer-tit">', options.title ,'</h2>',
                '<div class="popup-txt"><textarea class="i-text textarea report-text" placeholder="' ,options.placeholder, '"></textarea></div>',
                '<div class="popup-btn popup-btn-2">',
                    '<button title="취소" class="a-close btn-popup s-default">취소</button>',
                    '<button title="입력" class="a-submit btn-popup">입력</button>',
                '</div>',
                '<button title="닫기" class="a-close btn-layer-close"">닫기</button>',
            '</div>'
        ].join('');

        $('#popup-wrap').empty();
        var $el = $(html).appendTo('#popup-wrap');
        var close = function(){
            $('#popup-wrap').empty();
            $el.remove();
            $('#wrap').removeClass('layer-on2 popup-on');
        };

        $('#wrap').addClass('layer-on2 popup-on');

        $el.find('.i-text').focus();

        $el
            .on('click', '.a-submit', function(){
                var value = $el.find('.i-text').val();

                if(value.length < options.minTextLength) {
                    alert(options.minTextLength+'자 이상으로 작성해 주세요.');
                    $el.find('.i-text').focus();
                } else {
                    dfd.resolve(value);
                    close();
                }
            })
            .on('click', '.a-close', function(){
                dfd.reject('close');
                close();
            })
        ;

        return dfd.promise();
    };
    
    
    var drawNotice = function(title , image , link , idx){
        if(Cookies.get("hf-noticepopup-disallow-"+idx)) return;

        var $el = $([
            '<div class="popup-layer"></div>',
            '<div class="popup-cont notice-popup" style="top:50%; margin-top:-255.5px;">',
            '	<div class="popup-txt popup-btn-3-content">',
            '		<a href="' ,((link)?link:"#nolink"), '"><img src="' ,HF.DATA.s3.uri, '/popup/' ,image, '"></a>',
            '	</div>',
            '	<div class="popup-btn popup-btn-3">',
            '		<div class="popup-btn-3-left e-disallow"><input type="checkbox" class="btn-join-agree"><label for="noticepopupbox" class="join-agree-label">더이상 보지 않기</label></div>',
            '		<a href="#close" class="a-close popup-btn-3-right">닫기</a>',
            '	</div>',
            '</div>'
        ].join(''));

        var close = function(isDisallowOpen){
            if(isDisallowOpen) Cookies.set("hf-noticepopup-disallow-"+idx, true, { expires: 90 });

            $('#wrap').removeClass('layer-on2 popup-on');
            $('#popup-wrap').empty();
        };

        $el
            .on('click', '.e-disallow', function(){
                close(true);
            }).on('click', '.a-close', function(e){
                e.preventDefault();
                close();
            }).on('click', '[href="#nolink"], [href="undefined"]', function(e){
                e.preventDefault();
            })
        ;

        $('#popup-wrap').empty().append($el);
        $('#wrap').addClass('layer-on2 popup-on');

        return $el;
    };


    var FindPostCode = function(options){
        this._options = $.extend({
            isAutoResize : false
        }, options);

        this._daumPost = null;
        this._$el = null;
        this._currentScroll = 0;

        return this;
    };

    FindPostCode.prototype = {
        open : function(){
            var self = this;
            var dfd = $.Deferred();
            var html = [
                '<div class="layer-wrap s-postcode" style="display:block;">',
                    '<div class="bg-layer-wrap"></div>',
                    '<div class="layer-wrap-contents">',
                        '<div class="layer-tit">우편번호 검색</div>',
                        '<div class="layer-contents"></div>',
                        '<button class="btn-layer-close">닫기</button>',
                    '</div>',
                '</div>'
            ].join('');

            $('#wrap').addClass('layer-on');
            this._currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
            this._$el = $(html).appendTo('body');

            this._$el.find('.btn-layer-close, .bg-layer-wrap').click(function(){
                dfd.reject();

                document.body.scrollTop = self._currentScroll;
                self.destroy();
            });

            this._daumPost = new daum.Postcode({
                oncomplete: function(data) {
                    dfd.resolve(data);

                    document.body.scrollTop = self._currentScroll;
                    self.destroy();
                },
                // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
                onresize : function(size) {
                    if(self._options.isAutoResize) {
                        self._$el.find('.layer-contents')[0].style.height = (size.height+5) + 'px';
                    }
                },
                width : '100%',
                height : '100%'
            }).embed(this._$el.find('.layer-contents')[0], {
                autoClose: false
            });

            return dfd.promise();
        },
        destroy : function(){
            this._$el.remove();
            this._daumPost = null;
            $('#wrap').removeClass('layer-on');
        }
    };


    return {
        init: function(){
            drawPopupLayout();

            return $.Deferred().resolve().promise();
        },
        hide: function(){
			//history.pushState(null, null, "javascript:;"); 
			$('#wrap').removeClass('layer-on2 popup-on');
        },
        alert: function(title, text, button_1, callback_1){
            title = title || '경고';
            button_1 = button_1 || '확인';
            callback_1 = callback_1 || Popup.hide;

            showAlert(title, text, button_1, callback_1);
            history.pushState(null, null, "#;");
            setTimeout(function(){
                history.pushState(null, null, "#showAlert");
            },500) 
        },
        confirm: function(title, text, button_1, button_2, callback_1, callback_2, options){
            
            showConfirm(title, text, button_1, button_2, callback_1, callback_2, options);
            history.pushState(null, null, "#;"); 
            setTimeout(function(){
                history.pushState(null, null, "#showconfirm");
            },300) 
        },
        report: function(type, report_id){
            ApiRequest.get("/report/category", {}, function(res){
                showReport(res, type, report_id);
            }, function(err){
                console.log(err);
            });
        },
        notice: function(){
			ApiRequest.get("/popup", {}, function(res){
                for(var i in res.list){
                    drawNotice(res.list[i].popup_title, res.list[i].popup_image , res.list[i].popup_link , res.list[i].popup_idx);
                }
            }, function(err){
				console.log(err);
            });
        },
        prompt : prompt,
        /**
         * @method Popup.regPayment
         * @param [options.success]
         * @param [options.fail]
         */
        regPayment: function(options){
            options = $.extend({
                success : function(){},
                fail : function(){}
            }, options);
            
            showRegPayment(function(formData){
                var dimmer = new Utils.LoadingDimmer('registCard');
                dimmer.render();

                ApiRequest.post("/user/card", {
                    card_number : [formData.card1, formData.card2, formData.card3, formData.card4].join('-'),
                    expiry      : [formData.ydate, formData.mdate].join('-'),
                    birth       : formData.birth,
                    pwd_2digit  : formData.password
                } , function(res){
                    dimmer.clear();
                    Popup.alert("결제카드 등록완료", "등록되었습니다.", "확인", function(){
                        Popup.hide();
                        options.success(res);
                    });
                }, function(err){
                    if(err.responseJSON && err.responseJSON.error){
                        alert(err.responseJSON.error + "\n\n" + err.responseJSON.data.message);
                    } else {
                        alert("시스템 오류\n\n문제가 지속되면 관리자에게 문의 부탁드립니다.");
                    }
                    dimmer.clear();
                    options.fail(err);
                });
            });

            history.pushState(null, null, "#;"); 
            setTimeout(function(){
                history.pushState(null, null, "#showregpayment");
            },300) 
        },

        FindPostCode : FindPostCode,

        buyProduct : buyProduct
    }
})();