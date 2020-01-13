window.history.pushState = window.history.pushState || function(){};
window.history.replaceState = window.history.replaceState || function(){};
window.onpopstate = window.onpopstate || function(){};

var HF = {
	DATA : {
        environment : window.HF_ENV || 'production',
		auth : null,
		user : null,
		config : null,
		saleRates : null,
		holidays : null,
		s3 : null,
		host : null,
		apiKeys : null
	},
	CODE : {
		orderState : {
			PAYED : '결제완료',
			PREPARESHIPPING : '배송준비중',
			ONSHIPPING : '배송중',
			SHIPPED : '배송완료',
			COMPLETE : '구매확정완료',
			REQUESTREFUND : '반품요청',
			REFUND : '반품',
			REQUESTEXCHANGE : '교환요청',
			EXCHANGE : '교환',
			REQUESTCANCEL : '취소요청',
			CANCEL : '취소',
			STANBY : '결제대기'
		},
		productType : {
			CLASS : '클래스',
			GENERAL : '상품'
		},
		productSubType : {
			ONEDAY : '원데이 클래스',
			REGULAR : '정규 클래스',
			DIYKIT : 'DIY 키트',
			TOOL : '도구'
		},
		weekday : {
			'Monday': '월요일',
			'Tuesday': '화요일',
			'Wednesday': '수요일',
			'Thursday': '목요일',
			'Friday': '금요일',
			'Saturday': '토요일',
			'Sunday': '일요일'
		},
		userLevel : {
			1: "thanksful",
			2: "wonderful",
			3: "joyful",
			4: "colorful",
			5: "beautiful",
			6: "hobbyful"
		},
		category : {
			class : '취미 클래스',
			store : '스토어',
			recommend : '추천 상품'
		}
	}
};


/**
 * @module HF.history
 */
HF.history = {
	page : [
		// {
		//     path : '/product/asdasg34h',
		//     data : {
		//
		//     }
		// }
	],

	beforeState : {
		// page : '/product/asdasg34h',
		// data : {
		//
		// }
	},

	setCurrentState : function(name, data){
		var state = JSON.parse(sessionStorage.hf_pagestate || '{}');
		state['_path'] = location.pathname;
		state[name] = data;

		sessionStorage.hf_pagestate = JSON.stringify(state);
		return state;
	},

	init : function(){
		if(sessionStorage.hf_pagestate) {
			var beforeState = JSON.parse(sessionStorage.hf_pagestate);

			// 레퍼러와 일치하는 기록만 저장
			if(document.referrer.indexOf(beforeState._path) > -1) {
				this.beforeState = beforeState;
			}

			delete sessionStorage.hf_pagestate;
		}
	}
};

// legacy

$(document).ajaxError(function(event, jqXHR, ajaxOptions, thrownError){

	if(jqXHR.status < 500) return; 	// 500 아래 사소한 에러는 무시한다

	var obj = {
        tags: {},
        extra: {
            url: ajaxOptions.url
        }
	};

	if(User.getUserInfo().user_idx) {
        obj.tags.user_idx = User.getUserInfo().user_idx;
	}

    LogRocket.captureException(new Error('Ajax Error '+thrownError), obj);
});

if($.views) {
	$.views.settings.allowCode(true);

	$.views.converters("code", function (type, str) {
		return HF.CODE[type][str];
	});

	$.views.converters("blank", function (str) {
		return str || '없음';
	});

	$.views.converters("addComma", function (int) {
		return Utils.numberWithCommas(int);
	});

	$.views.converters("addCommaMinus", function (int) {
		if(int) int = int*-1;
		return Utils.numberWithCommas(int);
	});

	$.views.converters("addCommaWon", function (int) {
		return int ? Utils.numberWithCommas(int) + '원' : '무료';
	});

	$.views.converters("dateDisplay", function (date) {
		return moment(date).format('YYYY.MM.DD');
	});

	$.views.converters("phoneNumber", function (str) {
		var output;
		if(str.length === 10) {
			output = [
				str.substr(0, 3),
				str.substr(3, 3),
				str.substr(6, 4)
			];
		} else if(str.length === 11) {
			output = [
				str.substr(0, 3),
				str.substr(3, 4),
				str.substr(7, 4)
			];
		} else {
			output = [str];
		}
		return output.join('-');
	});
}

if($.validator) {
	$.validator.addMethod("PASSWORD", function (value, element) {
		return this.optional(element) || /^.*(?=.*[a-zA-Z])(?=.*[!@#$%^&+=\d]).*$/.test(value);
	}, '알파벳 그리고 특수문자 혹은 숫자를 함께 넣어주세요');
	$.validator.addMethod("EMAIL", function(value, element) {
		return this.optional(element) || /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i.test(value);
	}, '유효하지 않은 E-Mail주소입니다.');
	$.validator.addMethod("HANGUL", function(value, element) {
		return this.optional(element) || /^[가-힣]+$/.test(value);
	}, '한글로 입력해 주세요.');
	$.validator.addMethod("MOBILE_NUMBER", function(value, element) {
		return this.optional(element) || /^01(\d{1})(\d{3,4})(\d{4})$/.test(value);
	}, '휴대폰번호를 입력해 주세요 (예:01012341234)');
	$.validator.addMethod(
		"regex",
		function(value, element, regexp) {
			if (regexp.constructor !== RegExp)
				regexp = new RegExp(regexp);
			else if (regexp.global)
				regexp.lastIndex = 0;
			return this.optional(element) || regexp.test(value);
		},
		"Please check your input."
	);
}

// 스피너 플러그인 구현
// <div class="hfc-spinner">
// 	<button class="hfc-i-down">줄이기</button>
// 	<input type="number" class="hfc-i-num" value="1" min="1" max="99">
// 	<button class="hfc-i-up">늘리기</button>
// </div>
$.fn.spinner = function(options){
	options = $.extend({
		firstValue : 1,
		min : 1,
		max : 99,
		inputName : null,
		onChange : function(){}
	}, options);

	var $el = $(this);

	$el.html(
		'<div class="hfc-spinner">'
			+'<button class="hfc-i-down">줄이기</button>'
			+'<input type="number" class="hfc-i-num">'
			+'<button class="hfc-i-up">늘리기</button>'
		+'</div>'
	);

	var $input = $el.find('.hfc-i-num');
	var abs = function(val){
		val = val || 0;
		if(typeof val === 'string') {
			val = parseInt(val.replace(/[^0-9]/g, ''))||0;
		}
		return Math.max(Math.min(val, options.max), options.min);
	};
	var setValue = function(val){
		val = abs(val);
		$input.val(val);

		if(currentValue === val) return;
		currentValue = val;
		setDisplay();
		options.onChange(val);
	};
	var currentValue = abs(options.firstValue);

	var setDisplay = function(){
		$el.find('button.hfc-i-down').attr('disabled', (currentValue <= options.min));
		$el.find('button.hfc-i-up').attr('disabled', (currentValue >= options.max));
	};

	$input.attr('min', options.min);
	$input.attr('max', options.max);
	$input.attr('value', options.firstValue);
	$input.attr('name', options.inputName);

	$el
		.on('click', '.hfc-i-up', function(){ setValue(currentValue+1); })
		.on('click', '.hfc-i-down', function(){ setValue(currentValue-1); })
		.on('change', '.hfc-i-num', function(){ setValue($input.val()); })
	;

	setDisplay();

	return this;
};



$('.c-quantity').eq(1).spinner({
	onChange : function(v){
		console.log(v);
	}
});


function showMenu() {
	history.pushState(null, null, "#;");
	$('#header-wrap').attr('class', 'header-wrap menu-on');
	$('body').addClass('on-popup');
	$('body').addClass('on-regularbox-popup');
	history.pushState(null, null, "#openmenu");

	// 채널톡 숨김
	$('#ch-plugin').hide();
}

function hideMenu() {
	$('#header-wrap').attr('class', 'header-wrap');
	$('#bg-menu-wrap').attr('class', 'bg-menu-wrap');
	$('#wrap').attr('class', 'wrap');
	$('#search-cont').attr('class', 'search-cont');
	
	$('body').removeClass('on-popup');
	$('body').removeClass('on-regularbox-popup');

	// 채널톡 보임
	$('#ch-plugin').show();
}

function hideSearch() {
	$('#wrap').attr('class', 'wrap');
	$('#bg-menu-wrap').attr('class', 'bg-menu-wrap');
	$('#search-cont').attr('class', 'search-cont');
	$('body').removeClass('on-regularbox-popup');
}


function toggleAsk(obj){
	if ( obj.parentNode.parentNode.parentNode.className === 'direct-ask-cont' )
	{
		obj.parentNode.parentNode.parentNode.className = 'direct-ask-cont direct-ask-on';
	}
	else {
		obj.parentNode.parentNode.parentNode.className = 'direct-ask-cont';	
	}
}

function hideCancel() {
	$('#wrap').attr('class', 'wrap');
	$('#cancel-wrap').attr('class', 'layer-wrap cancel-wrap');
}

function hideStandingOrder() {
	$('#wrap').attr('class', 'wrap');
	$('#layer-standing-order-wrap').attr('class', 'layer-wrap layer-standing-order-wrap');
}

function hideChange() {
	$('#wrap').attr('class', 'wrap');
	$('#change-wrap').attr('class', 'layer-wrap change-wrap');
}


function hideAwardDetail() {
	$('#wrap').attr('class', 'wrap');
	$('#award-detail-wrap').attr('class', 'layer-wrap award-detail-wrap');
}


function hideWriteReply() {
	$('#wrap').attr('class', 'wrap');
	$('#write-reply-wrap').attr('class', 'layer-wrap write-reply-wrap');
}


function hideViewImg() {
	$('#wrap').attr('class', 'wrap');
	if($('#view-img-wrap')) $('#view-img-wrap').attr('class', 'layer-wrap view-img-wrap');
	
	$('body').removeClass('on-popup');
}


function hideReturn() {
	$('#wrap').attr('class', 'wrap');
	$('#return-wrap').attr('class', 'layer-wrap return-wrap');
}


function hidePopup() {
	$('#wrap').attr('class', 'wrap');
	$('#popup-wrap').attr('class', 'layer-wrap popup-wrap');
}

function showPopup2() {
	history.pushState(null, null, "#;");
	history.pushState(null, null, "#showPopup2");
	$('#wrap').attr('class', 'wrap popup2-on');
}

function hidePopup2() {
	$('#wrap').attr('class', 'wrap');
	$('#popup2-wrap').attr('class', 'layer-wrap popup2-wrap');
}


function toggleSelectList(obj) {
	if ( $('#select-list-wrap').attr('class') === 'select-list-wrap' ){
		$('#select-list-wrap').attr('class', 'select-list-wrap select-on');
	}
	else {
		$('#select-list-wrap').attr('class', 'select-list-wrap');
	}
}

function logout() {
	alert('로그아웃 되었습니다.');
	$('#wrap').attr('class', 'wrap');
}


function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}