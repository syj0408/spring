/**
 * Created by Nalrarang on 2017. 4. 6
 */
/**
공통 Header Menu Script
@namespace Menu
@author nalrarang@gmail.com
@logs 20170406:Nalrarang update
*/

var Menu = (function(){
    var basicInfo = null;
    var cartCacheSession = new Utils.SessionStorage('hf-cart-cache');

    var renderTopNotice = function(){
        var dayObj = Utils.bizCal.getAllSetDate(new Date(), new Date());
        var dayDiff = Math.ceil(dayObj.diff(new Date(), 'days', true));

        $('.gnb-info').text(
        	'지금 주문하시면 '
			+ (dayObj.month()+1)
			+'월 '
			+ dayObj.date()
			+'일('
			+ (dayDiff ? 'D-'+dayDiff : '오늘')
			+')부터 취미 배송이 시작됩니다.'
		);
	};

    var renderCartCount = function(count){
        if(count) {
            $('.ico-menu').addClass('ico-menu-new');
            $('.txt-cart-count').text(count);
            $('.hf-func').removeClass('s-empty');
        } else {
            $('.ico-menu').removeClass('ico-menu-new');
            $('.hf-func').addClass('s-empty');
        }
	};

    var attach = function(){
		$(document).on('cartLoad cartCountLoad', function(e){
			cartCacheSession.set('count', cart.count);
			renderCartCount(cart.count);
		});

		$(document).on('cartBuyAdd', function(e, res){
			if(!User.isLoginCheck()) {
				User.setLoginRedirectUri('/write-order.html?directbuy=Y');
				User.showLogin();
			} else {
				location.href = '/write-order.html?directbuy=Y';
			}
		});

        $(document).on('cartAdd', function(e, res){
            Popup.confirm(
                '취미바구니에 클래스가 담겼습니다.',
                '주문을 진행하시려면 취미바구니로 이동해주세요.',
                '취미 더 고르기',
                '취미바구니 보러가기',
                function(){
                    Popup.hide();
                    // location.replace('/class.html');
                },
                function(){
                    location.replace('/cart.html');
                },
                {
                    className : 'popup-colored',
                    buttonGainMatrix : [true, false]
                }
            );
        });

        $(document).on('cartAddFail', function(e, res){
            var msgMatch = {
                'Validation failed' : '알 수 없는 오류가 발생하였습니다(오류코드 : CA0001)',
                'full of cart' : '취미바구니에는 최대 6개까지만 클래스를 담을 수 있습니다.',
                'duplicated' : '이미 취미바구니에 담긴 클래스입니다.',
                'class not found' : '존재하지 않는 클래스(오류코드 : CA0004)'
            };
            var msg;

            if(_.isString(res) && msgMatch[res]){
                msg = msgMatch[res];
            } else {
                msg = '알 수 없는 오류가 발생하였습니다(오류코드 : CA9000)';
            }

            if(res === 'duplicated') {
				Popup.confirm(
					'이미 취미바구니에 담긴 클래스입니다.',
					'취미바구니를 확인하시겠습니까?',
					'취미 더 고르기',
					'취미바구니 보러가기',
					function () {
						Popup.hide();
						// location.replace('/class.html');
					},
					function () {
						location.replace('/cart.html');
					},
					{
						className: 'popup-colored',
						buttonGainMatrix: [true, false]
					}
				);
			} else {
				Popup.alert("취미바구니 담기 오류", msg, "확인", function () {
					Popup.hide();
				});
			}
        });

    };

    var renderFooter = function(){
    	var config = HF.DATA.config;
		$(".f-info-title").text(config.config_title);
		$(".f-info-address").text(config.config_address);
		$(".f-info-CEOname").text(config.config_CEOname);
		$(".f-info-companynumber").text(config.config_companynumber);
		$(".f-info-salenumber").text(config.config_salenumber);
		$(".f-info-contact").text(config.config_contact);
		$(".f-info-opentime").text(config.config_opentime);
		$(".f-info-email").text(config.config_email);
	};
    
    return {
        init: function(){
            basicInfo = HF.DATA;

            renderCartCount(cartCacheSession.get('count'));
            renderTopNotice();
			renderFooter();
            attach();
        },
        getInfo: function(){
            return basicInfo;
        }
    }
})();



window.onhashchange = function(e) {
    if(!e.oldURL) return;

	var oldURL = e.oldURL.split('#')[1];
	var newURL = e.newURL.split('#')[1];
	//console.log(oldURL,newURL)

	if(!newURL || newURL === ";"){
		switch(oldURL){
			case "RegularBox":
				
				e.preventDefault();
			break;
			case "openmenu":
				
				e.preventDefault();
			break;
			case "award":
				
				e.preventDefault();
			break;
			case "login":
				
				e.preventDefault();
			break;
			case "join":
				
				e.preventDefault();
			break;
			case "logout":
				
				e.preventDefault();
			break;
			default:
				
			break;
		}
		hideMenu();
		User.hideLogin();
		User.hideFindUserId();
		User.hideFindPassword();
		Popup.hide();
		hideViewImg();
				
	}else if( newURL === "openmenu"){
		switch(oldURL){
			case "myclass":
				User.hideLogin();
				e.preventDefault();
			break;
			case "login":
				User.hideLogin();
				e.preventDefault();
			break;
			case "join":
				e.preventDefault();
			break;
			case "logout":
				$('.confirm_btn_1').trigger('click');
				e.preventDefault();
			break;
			default:
				
			break;
		}
	}
	
	if(oldURL === "showAlert"  ){
		$('.alert_btn_1').trigger('click')
	}
	
	if(oldURL === "award" ){
		$('.alert_btn_1').trigger('click')
	}
	
	if(oldURL === "openagree"){
		hideAgree();
	}
};