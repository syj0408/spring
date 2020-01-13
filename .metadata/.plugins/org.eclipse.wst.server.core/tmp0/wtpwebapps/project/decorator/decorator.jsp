<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="decorator" uri="http://www.opensymphony.com/sitemesh/decorator" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
	<meta name="description" content="취미로운 일상을 제안하는 온라인 취미 클래스. 취미 배달, 취미 정기구독">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="format-detection" content="telephone=no">
	<!-- 970px 미만에서만 적용-->
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, target-densitydpi=medium-dpi, user-scalable=no, minimal-ui">
	
	<link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:400,500,700|Roboto+Slab:400,700|Lato:400,700,900" rel="stylesheet" media="all" onload="this.media='all';">
	<link rel="stylesheet" type="text/css" href="${path}/css/swiper.min.css">
	<link rel="stylesheet" type="text/css" href="${path}/awesomplete/awesomplete.css">
	<link type="text/css" rel="stylesheet" href="${path}/css/style_base.css">
	<link type="text/css" rel="stylesheet" href="${path}/css/style.css">
	<link type="text/css" rel="stylesheet" href="${path}/css/style_effect.css">
	<link type="text/css" rel="stylesheet" href="${path}/css/style_responsible.css">
	<link type="text/css" rel="stylesheet" href="${path}/css/style_nalrarang.css">
	<meta name="naver-site-verification" content="naver9a1242e74229715560a0c5c0e9c18eca">
	<meta property="og:url" content="https://hobbyful.co.kr">
	<meta property="og:title" content="하비풀 - 취미를 만나 일상이 아름다워지다.">
	<meta property="og:description" content="취미로운 일상을 제안하는 온라인 취미 클래스. 하비풀은 당신과 취미를 만나게 합니다.">
	<meta property="og:image" content="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/hobbyful_concept01.jpg">
	<!-- css3-mediaqueries.js for IE less than 9 -->
	<!--[if lt IE 9]>
	<script src="//css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
	<![endif]-->
	<link rel="shortcut icon" href="${path}/img/favicon.png">
	<link rel="apple-touch-icon" href="${path}/img/m_favicon.png">
	
	
	<!-- Log Rocket -->
	
	<script type="text/javascript" async src="https://cdn.channel.io/plugin/ch-plugin-web.js" charset="UTF-8"></script>
	<script type="text/javascript" async src="https://www.google-analytics.com/analytics.js"></script>
	<script type="text/javascript" async src="https://www.google-analytics.com/gtm/js?id=GTM-NLKP5J5&amp;t=gtm15&amp;cid=670013715.1576581638"></script>
	<script type="text/javascript" async src="https://www.google-analytics.com/plugins/ua/ec.js"></script>
	<script src="https://connect.facebook.net/signals/config/299353887143885?v=2.9.15&amp;r=stable" async></script>
	<script async src="https://connect.facebook.net/en_US/fbevents.js"></script>
	<script type="text/javascript" async src="//www.googleadservices.com/pagead/conversion_async.js"></script>
	<script type="text/javascript" async src="//www.googleadservices.com/pagead/conversion_async.js"></script>
	<script type="text/javascript" async src="https://www.google-analytics.com/analytics.js"></script>
	<script src="https://connect.facebook.net/en_US/sdk.js?hash=927b38b25c16e73f6a875ac2cb4403d5&amp;ua=modern_es6" async crossorigin="anonymous"></script>
	<script id="facebook-jssdk" src="https://connect.facebook.net/en_US/sdk.js"></script>
	<script async src="https://www.googletagmanager.com/gtm.js?id=GTM-KJXG8SF"></script>
	<script src="https://cdn.logrocket.io/LogRocket.min.js" crossorigin="anonymous"></script>
	<script src="https://cdn.logrocket.io/logger.min.js" async></script>
	<script>
		window.LogRocket && window.LogRocket.init('1xyhws/hobbyful');
	</script>
	
	<!-- End of Log Rocket -->
	
	<!-- Google Tag Manager -->
	<script>
		(function(w,d,s,l,i){
			w[l]=w[l]||[];w[l].push({
				'gtm.start':new Date().getTime(),
				event:'gtm.js'
			});
			var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),
			dl=l!='dataLayer'?'&l='+l:'';
			j.async=true;
			j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
		})(window,document,'script','dataLayer','GTM-KJXG8SF');</script>
	<!-- End Google Tag Manager -->
	
	<script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/698770618/?random=1577448270773&amp;cv=9&amp;fst=1577448270773&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=864&amp;u_w=1536&amp;u_ah=824&amp;u_aw=1536&amp;u_cd=24&amp;u_his=23&amp;u_tz=540&amp;u_java=false&amp;u_nplug=3&amp;u_nmime=4&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Fhobbyful.co.kr%2F&amp;ref=https%3A%2F%2Fhobbyful.co.kr%2Fwrite-order.html%3Fdirectbuy%3DY&amp;tiba=%ED%95%98%EB%B9%84%ED%92%80%20-%20%EC%B7%A8%EB%AF%B8%EB%A5%BC%20%EB%A7%8C%EB%82%98%20%EC%9D%BC%EC%83%81%EC%9D%B4%20%EC%95%84%EB%A6%84%EB%8B%A4%EC%9B%8C%EC%A7%80%EB%8B%A4.&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script>
	<script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/854065095/?random=1577448270781&amp;cv=9&amp;fst=1577448270781&amp;num=1&amp;guid=ON&amp;resp=GooglemKTybQhCsO&amp;u_h=864&amp;u_w=1536&amp;u_ah=824&amp;u_aw=1536&amp;u_cd=24&amp;u_his=23&amp;u_tz=540&amp;u_java=false&amp;u_nplug=3&amp;u_nmime=4&amp;gtm=2wgc61&amp;sendb=1&amp;ig=1&amp;frm=0&amp;url=https%3A%2F%2Fhobbyful.co.kr%2F&amp;ref=https%3A%2F%2Fhobbyful.co.kr%2Fwrite-order.html%3Fdirectbuy%3DY&amp;tiba=%ED%95%98%EB%B9%84%ED%92%80%20-%20%EC%B7%A8%EB%AF%B8%EB%A5%BC%20%EB%A7%8C%EB%82%98%20%EC%9D%BC%EC%83%81%EC%9D%B4%20%EC%95%84%EB%A6%84%EB%8B%A4%EC%9B%8C%EC%A7%80%EB%8B%A4.&amp;hn=www.googleadservices.com&amp;async=1&amp;rfmt=3&amp;fmt=4"></script>
	<style type="text/css">
		.fb_hidden{position:absolute;top:-10000px;z-index:10001}
		.fb_reposition{overflow:hidden;position:relative}
		.fb_invisible{display:none}
		.fb_reset{
			background:none;border:0;border-spacing:0;
			color:#000;cursor:auto;direction:ltr;
			font-family:"lucida grande", tahoma, verdana, arial, sans-serif;
			font-size:11px;font-style:normal;font-variant:normal;
			font-weight:normal;letter-spacing:normal;line-height:1;
			margin:0;overflow:visible;padding:0;text-align:left;text-decoration:none;
			text-indent:0;text-shadow:none;text-transform:none;visibility:visible;
			white-space:normal;word-spacing:normal
		}
		.fb_reset>div{overflow:hidden}
		@keyframes fb_transform{from{opacity:0;transform:scale(.95)}
		to{opacity:1;transform:scale(1)}}
		.fb_animate{animation:fb_transform .3s forwards}
		.fb_dialog{background:rgba(82, 82, 82, .7);
		position:absolute;top:-10000px;z-index:10001}
		.fb_dialog_advanced{border-radius:8px;padding:10px}
		.fb_dialog_content{background:#fff;color:#373737}
		.fb_dialog_close_icon{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 0 transparent;cursor:pointer;display:block;height:15px;position:absolute;right:18px;top:17px;width:15px}
		.fb_dialog_mobile .fb_dialog_close_icon{left:5px;right:auto;top:5px}
		.fb_dialog_padding{background-color:transparent;position:absolute;width:1px;z-index:-1}
		.fb_dialog_close_icon:hover{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -15px transparent}
		.fb_dialog_close_icon:active{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/IE9JII6Z1Ys.png) no-repeat scroll 0 -30px transparent}.fb_dialog_iframe{line-height:0}.fb_dialog_content .dialog_title{background:#6d84b4;border:1px solid #365899;color:#fff;font-size:14px;font-weight:bold;margin:0}.fb_dialog_content .dialog_title>span{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/Cou7n-nqK52.gif) no-repeat 5px 50%;float:left;padding:5px 0 7px 26px}body.fb_hidden{height:100%;left:0;margin:0;overflow:visible;position:absolute;top:-10000px;transform:none;width:100%}.fb_dialog.fb_dialog_mobile.loading{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/3rhSv5V8j3o.gif) white no-repeat 50% 50%;min-height:100%;min-width:100%;overflow:hidden;position:absolute;top:0;z-index:10001}.fb_dialog.fb_dialog_mobile.loading.centered{background:none;height:auto;min-height:initial;min-width:initial;width:auto}.fb_dialog.fb_dialog_mobile.loading.centered #fb_dialog_loader_spinner{width:100%}.fb_dialog.fb_dialog_mobile.loading.centered .fb_dialog_content{background:none}.loading.centered #fb_dialog_loader_close{clear:both;color:#fff;display:block;font-size:18px;padding-top:20px}#fb-root #fb_dialog_ipad_overlay{background:rgba(0, 0, 0, .4);bottom:0;left:0;min-height:100%;position:absolute;right:0;top:0;width:100%;z-index:10000}#fb-root #fb_dialog_ipad_overlay.hidden{display:none}.fb_dialog.fb_dialog_mobile.loading iframe{visibility:hidden}.fb_dialog_mobile .fb_dialog_iframe{position:sticky;top:0}.fb_dialog_content .dialog_header{background:linear-gradient(from(#738aba), to(#2c4987));border-bottom:1px solid;border-color:#043b87;box-shadow:white 0 1px 1px -1px inset;color:#fff;font:bold 14px Helvetica, sans-serif;text-overflow:ellipsis;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0;vertical-align:middle;white-space:nowrap}.fb_dialog_content .dialog_header table{height:43px;width:100%}.fb_dialog_content .dialog_header td.header_left{font-size:12px;padding-left:5px;vertical-align:middle;width:60px}.fb_dialog_content .dialog_header td.header_right{font-size:12px;padding-right:5px;vertical-align:middle;width:60px}.fb_dialog_content .touchable_button{background:linear-gradient(from(#4267B2), to(#2a4887));background-clip:padding-box;border:1px solid #29487d;border-radius:3px;display:inline-block;line-height:18px;margin-top:3px;max-width:85px;padding:4px 12px;position:relative}.fb_dialog_content .dialog_header .touchable_button input{background:none;border:none;color:#fff;font:bold 12px Helvetica, sans-serif;margin:2px -12px;padding:2px 6px 3px 6px;text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog_content .dialog_header .header_center{color:#fff;font-size:16px;font-weight:bold;line-height:18px;text-align:center;vertical-align:middle}.fb_dialog_content .dialog_content{background:url(https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/jKEcVPZFk-2.gif) no-repeat 50% 50%;border:1px solid #4a4a4a;border-bottom:0;border-top:0;height:150px}.fb_dialog_content .dialog_footer{background:#f5f6f7;border:1px solid #4a4a4a;border-top-color:#ccc;height:40px}#fb_dialog_loader_close{float:left}.fb_dialog.fb_dialog_mobile .fb_dialog_close_button{text-shadow:rgba(0, 30, 84, .296875) 0 -1px 0}.fb_dialog.fb_dialog_mobile .fb_dialog_close_icon{visibility:hidden}#fb_dialog_loader_spinner{animation:rotateSpinner 1.2s linear infinite;background-color:transparent;background-image:url(https://static.xx.fbcdn.net/rsrc.php/v3/yD/r/t-wz8gw1xG1.png);background-position:50% 50%;background-repeat:no-repeat;height:24px;width:24px}@keyframes rotateSpinner{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
		.fb_iframe_widget{display:inline-block;position:relative}.fb_iframe_widget span{display:inline-block;position:relative;text-align:justify}.fb_iframe_widget iframe{position:absolute}.fb_iframe_widget_fluid_desktop,.fb_iframe_widget_fluid_desktop span,.fb_iframe_widget_fluid_desktop iframe{max-width:100%}.fb_iframe_widget_fluid_desktop iframe{min-width:220px;position:relative}.fb_iframe_widget_lift{z-index:1}.fb_iframe_widget_fluid{display:inline}.fb_iframe_widget_fluid span{width:100%}
	</style>
<title><decorator:title/></title>
<decorator:head />
</head>
<body class="">
<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KJXG8SF" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
<div class="wrap" id="wrap">
	<header class="header-wrap" id="header-wrap"><!-- 햄버거 버튼 클릭 시 menu-on 클래스 추가 -->
		<h1 class="logo-h1">
			<a href="${path}/user/main.shop" title="hobbyful" class="logo-hobbyful">Hability</a>
		</h1>
		<a href="#openmenu" class="ico-menu -w" type="button" onclick="showMenu();"><!-- 새 소식 있을 경우 btn-menu-new 클래스 추가 -->
			<em class="ico-new">New</em>
		</a>
		<div class="bg-menu-wrap" id="bg-menu-wrap" onclick="hideMenu();"></div>
		
		<div class="menu-wrap">
			<div class="search-wrap">
				<button type="button" class="btn-search">검색</button>
				<span class="input-search-wrap">
					<input type="text" class="input-search" placeholder="관심있는 취미 키워드를 검색해보세요.">
				</span>
			</div>
				<div class="menu-cont">
					<div class="hf-func-wrap">
						<ul class="hf-func-list">
							<li class="hf-func s-empty">
								<span class="i-count txt-cart-count"></span>
								<a href="/cart.html" title="취미바구니" class="btn-func func-box">취미바구니</a>
								<div class="txt-func02">취미바구니</div>
							</li>
							<li class="hf-func s-empty">
								<a href="#myclass" title="내 클래스" class="btn-func func-myclass">내 클래스</a>
								<div class="txt-func03">내 클래스</div>
							</li>
						</ul>
					</div>
					<ul class="menu-list">
						<li class="menu">
							<a href="${path}/list/class.shop" class="btn-menu menu-class">취미 클래스<em class="menu-txt -w">CLASS</em></a>
						</li>
						<li class="menu">
							<a href="${path}/list/diystore.shop" class="btn-menu menu-class">DIY 스토어<em class="menu-txt -w">DIY STORE</em></a>
						</li>
						<li class="menu">
							<a href="${path}/user/magazine.shop" class="btn-menu menu-magazine">매거진<em class="menu-txt -w">MAGAZINE</em></a>
						</li>
						<!--<li class="menu">-->
						<!--<a href="/award.html" class="btn-menu menu-award">취미 어워드<em class="menu-txt -w">AWARD</em></a>-->
						<!--</li>-->
						<li class="menu">
							<a href="${path}/user/service.shop" class="btn-menu menu-service">하비풀 소개<em class="menu-txt -w">ABOUT</em></a>
						</li>
					</ul>
				</div>
				<div class="gnb-wrap">
					<div class="gnb-info -m">지금 주문하시면 12월 30일(D-3)부터 취미 배송이 시작됩니다.</div>
					<ul class="gnb-list">
						<li class="gnb gnb-login" style="display: none;">
							<a href="#login" title="로그인" class="btn-gnb header_login">로그인</a>
						</li>
						<li class="gnb gnb-join" style="display: none;">
							<a href="#join" title="회원가입" class="btn-gnb header_join">회원가입</a>
						</li>
						<li class="gnb gnb-logout" style="display: list-item;">
							<a href="#logout" title="로그아웃" class="btn-gnb header_logout">로그아웃</a>
						</li>
						<li class="gnb gnb-favorite" style="display: list-item;">
							<a href="/mypage.html?m=favorite&amp;s=class" title="취미 보관함" class="btn-gnb header_favorite">취미 보관함</a>
						</li>
						<!-- #login 모달창 찾기!!!!!!!!!!!!! -->
						<li class="gnb gnb-mypage">
							<a href="${path}/user/mypage.shop" title="마이페이지" class="btn-gnb header_mypage">마이페이지</a>
						</li>
						<li class="gnb gnb-customer">
							<a href="/customer.html" title="고객센터" class="btn-gnb">고객센터</a>
						</li>
					</ul>
					<div class="hobbyful-txt -w">You're hobbyfull!</div>
				</div>
				<a href="javascript:;" title="닫기" class="btn-menu-close -w" onclick="hideMenu();">닫기</a>
		</div>
		
		<div class="search-cont" id="search-cont">
			<h2 class="search-tit">검색</h2>
			<div class="search-area">
				<button type="button" class="btn-search2">검색</button>
				<div class="search-input-wrap">
					<input type="text" placeholder="클래스와 매거진을 검색해 보세요!" class="search-input">
					<ul class="search-txt-list search-keyword-text"></ul>
				</div>
				<button type="button" class="btn-search-close" onclick="hideSearch();">닫기</button>
			</div>
			<div class="search-keyword-wrap">
				<div class="search-keyword-tit">이런 검색어는 어때요?</div>
				<ul class="search-keyword-list search-recommend-list"></ul>
			</div>
			<div class="search-result-wrap">
				<div class="search-result-tab-wrap"></div>
				<div class="search-result-cont thumb-slide-type02">
					<ul class="thumb-slide-list search-magazine-list"></ul>
				</div>
				<div class="search-result-cont">
					<ul class="class-list-wrap search-class-list"></ul>
				</div>
			</div>
		</div>
	</header>

	<decorator:body />

	<footer class="footer-wrap">
		<div class="f-menu-wrap">
			<ul class="f-menu">
				<li><a href="/term-provision.html">서비스 이용약관</a></li>
				<li><a href="/term-privacy.html">개인정보취급방침</a></li>
				<!--<li><a href="/view-magazine.html?id=139">작가 지원하기</a></li>-->
			</ul>
		</div>
		<div class="f-info-wrap f-info-customer-wrap">
			<ul class="f-sns-wrap">
				<li class="f-sns"><a href="https://www.facebook.com/hobbyful" target="_blank" title="facebook" class="btn-facebook">facebook</a></li>
				<li class="f-sns"><a href="https://www.instagram.com/hobbyful" target="_blank" title="instargram" class="btn-instagram">instargram</a></li>
				<li class="f-sns"><a href="http://post.naver.com/hobbyful" target="_blank" title="naver" class="btn-naver">naver</a></li>
			</ul>
		</div>
		<div class="f-info-wrap">
			<div class="logo-hobbyful">hobbyful</div>
			<div class="f-info-cont">
				<p class="f-info "><strong class="f-info-tit f-info-title">㈜하비풀</strong></p>
				<p class="f-info f-info-address">서울특별시 강남구 테헤란로84길 16 세풍빌딩 10층</p>
				<p class="f-info">대표자: <span class="f-info-CEOname">양순모</span>ㅣ사업자등록증번호:<span class="f-info-companynumber">717-88-00289</span></p>
				<p class="f-info ">통신판매 신고번호: <span class="f-info-salenumber">2017-서울성동-0584호</span></p>
				<p class="f-info ">호스팅서비스: <span class="f-info-hostingby">(주)하비풀</span></p>
				<p class="f-info "><span class="f-info-contact">02-6214-0529</span> (문의시간 : <span class="f-info-opentime">10:00 ~ 17:00 / 점심시간 : 13:00 ~ 14:00</span>) </p>
				<p class="f-info f-info-email">help@hobbyful.co.kr</p>
				<p class="f-copyright">© hobbyful Inc. 2018 All Rights Reserved.</p>
			</div>
		</div>
	</footer>
	<div class="layer-wrap popup-wrap" id="popup-wrap">
		<div class="bg-layer-wrap" onclick="Popup.hide();"></div>
	</div>
	<div class="layer-wrap login-wrap" id="login-wrap">
		<div class="bg-layer-wrap a-close"></div>
		<!-- 로그인 모달창 -->
	</div>
</div>

	<!-- Javascript Library Load -->
	<script>
	if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
	(function () {
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = 'https://cdn.polyfill.io/v2/polyfill.min.js?features=HTMLPictureElement';
	var x = document.getElementsByTagName('script')[0];
	x.parentNode.insertBefore(s, x);
	})();
	}
	</script>
	<script type="text/javascript" src="${path}/jquery/dist/jquery.min.js"></script>
	<script type="text/javascript" src="${path}/jsrender/jsrender.min.js"></script>
	<script type="text/javascript" src="${path}/jquery/dist/lodash.min.js"></script>
	<script type="text/javascript" src="${path}/jquery/moment/moment.min.js"></script>
	<script type="text/javascript" src="${path}/jquery/src/js.cookie.js"></script>
	<script type="text/javascript" src="${path}/awesomplete/awesomplete.min.js"></script>
	
	<script type="text/javascript" src="${path}/jquery/swiper.min.js"></script>
	<script type="text/javascript" src="${path}/jquery/jquery.validate.min.js"></script>
	<script type="text/javascript" src="${path}/jquery/messages_ko.js"></script>
	<!--<script type="text/javascript" src="/bower_components/mobile-detect/mobile-detect.min.js"></script>-->
	<script type="text/javascript" src="${path}/jquery/jqueryBizDateCalculator.js"></script>
	<!-- 공통 Module Load -->
	<script type="text/javascript" src="${path}/jquery/js/jqueryHF.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/HF.tracker.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/HF.brick.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/utils.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/request.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/popup.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/user.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/menu.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/search.js"></script>
	<script type="text/javascript" src="${path}/jquery/js/cart.js"></script>
	<script>
	HF.DATA.params = {};
	</script>
	<script type="text/javascript" src="${path}/jquery/js/HF._init.js"></script>
	
	<script>
	window.fbAsyncInit = function() {
	FB.init({
	appId      : '388145468250973',
	xfbml      : true,
	version    : 'v3.2'
	});
	FB.AppEvents.logPageView();
	};
	(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	</script>
	
	
	<script src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
	<script type="text/javascript">
	//<![CDATA[
	// 사용할 앱의 JavaScript 키를 설정해 주세요.
	Kakao.init('b3ee6434ce06e64bc905b50b4d9190ca');
	//]]>
	</script>
	
	
	<script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js"></script>
	
	
	<script>
	HF.ready(function() {
	window.channelPluginSettings = HF.DATA.channelPluginSettings;
	var w = window;
	if (w.ChannelIO) {
	return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
	}
	var d = window.document;
	var ch = function() {
	ch.c(arguments);
	};
	ch.q = [];
	ch.c = function(args) {
	ch.q.push(args);
	};
	w.ChannelIO = ch;
	function l() {
	if (w.ChannelIOInitialized) {
	return;
	}
	w.ChannelIOInitialized = true;
	var s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
	s.charset = 'UTF-8';
	var x = document.getElementsByTagName('script')[0];
	x.parentNode.insertBefore(s, x);
	}
	if (document.readyState === 'complete') {
	l();
	} else if (window.attachEvent) {
	window.attachEvent('onload', l);
	} else {
	window.addEventListener('DOMContentLoaded', l, false);
	window.addEventListener('load', l, false);
	}
	});
	</script>
	
	<script type="text/javascript" src="https://s3.ap-northeast-2.amazonaws.com/adpick.co.kr/apis/apTracker.v3.js"></script>
	
	
	<style>.async-hide { opacity: 0 !important} </style>
	<script type="text/javascript" id>(function(c,a,d,e,g,b,f,h,k){a.className+=" "+d;b.end=f=function(){a.className=a.className.replace(RegExp(" ?"+d),"")};(c[e]=c[e]||[]).hide=b;setTimeout(function(){f();b.end=null},g)})(window,document.documentElement,"async-hide","dataLayer",4E3,{"GTM-KJXG8SF":!0});</script><div style="display: none; visibility: hidden;">
	<script>!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version="2.0",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","299353887143885");fbq("set","agent","tmgoogletagmanager","299353887143885");fbq("track","PageView");</script>
	<noscript></noscript>
	</div><script type="text/javascript" id src="https://wcs.naver.net/wcslog.js"></script> 
	<script type="text/javascript" id src="//wcs.naver.net/wcslog.js"></script>
	<script type="text/javascript" id charset="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
	
	<div id="wp_tg_cts" style="display:none;">
	<script id="wp_id_script_1577448271230" src="//altg.widerplanet.com/delivery/wp.js"></script>
	<script id="wp_tag_script_1577448271665" src="https://astg.widerplanet.com/delivery/wpc.php?v=1&amp;ver=4.0&amp;r=1&amp;md=bs&amp;ga=1evheg6-juv68j-3-1&amp;eid=4-9aabed0fe57727741be1d13b7b055fd886e0376cd2a27af580273af4b573462dff9d7530aa73fcfac2f1ae0fd08d480fab7fc76170dda909f9b452265d96d9f57fc92cc71dd9ca451d050d8581fb2884&amp;ty=Home&amp;ti=45752&amp;device=web&amp;charset=UTF-8&amp;tc=1577448271665&amp;ref=https%3A%2F%2Fhobbyful.co.kr%2Fwrite-order.html%3Fdirectbuy%3DY&amp;loc=https%3A%2F%2Fhobbyful.co.kr%2F"></script></div>
	<script type="text/javascript" id>
		var wptg_tagscript_vars=wptg_tagscript_vars||[];
		wptg_tagscript_vars.push(function(){
			return{
				wp_hcuid:"",ti:"45752",ty:"Home",device:"web"
			}
		});
	</script>
	<script type="text/javascript" id src="//cdn-aitg.widerplanet.com/js/wp_astg_4.0.js"></script>
	<div id="fb-root" class=" fb_reset">
		<div style="position: absolute; top: -10000px; width: 0px; height: 0px;">
		<div>
			<iframe name="fb_xdm_frame_https" id="fb_xdm_frame_https" aria-hidden="true" title="Facebook Cross Domain Communication Frame" tabindex="-1" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://staticxx.facebook.com/connect/xd_arbiter.php?version=44#channel=f24c7061dddcdd&amp;origin=https%3A%2F%2Fhobbyful.co.kr" style="border: none;"></iframe>
		</div>
		<div></div>
		</div>
	</div>
	<script type="text/javascript" id>
		if(!wcs_add)
			var wcs_add={};
		wcs_add.wa="6bf8dd6c3518c8";
		wcs_do();
	</script> 
	<script type="text/javascript" id>
		if(!wcs_add)
			var wcs_add={};
		wcs_add.wa="s_3dfbd0909345";
		if(!_nasa)
			var _nasa={};
		wcs.inflow();
		wcs_do(_nasa);
	</script>
	<script type="text/javascript" id>kakaoPixel("3085303044582687524").pageView();</script>
	<div id="ch-plugin">
		<div id="ch-plugin-script" style="display: none">
			<iframe id="ch-plugin-script-iframe"
				style="position: relative !important; height: 100% !important; width: 100% !important; border: none !important;"></iframe>
		</div>
		<div id="ch-plugin-core">
		<style data-styled="" data-styled-version="4.3.2"></style>
		<style data-styled="" data-styled-version="4.3.2"></style>
		<div hidden="" class="sc-erNlkL hhoMbs sc-RbTVP hrWefY">
		<div class="sc-eNNmBn cXBieY">
			<div name="push-exit" width="45" height="45" size="24" class="sc-dnqmqq sc-cBrjTV iByMcc"></div>
			<div class="sc-jUpvKA ccOxya">
				<div size="34" class="sc-kGXeez kGMzSU"></div>
				<div class="sc-fkyLDJ epSaPl">(알 수 없음)</div>
				<div class="sc-iCwjlJ hRSOFL">9:00am</div>
			</div>
			<div class="sc-eopZyb bYeAnX">
				<div class="sc-jRuhRL coGTKb">
					<span class=""></span>
				</div>
			</div>
		</div>
		</div>
		<div hidden="" class="sc-kEmuub LrWLn sc-RbTVP hrWefY">
		<div class="sc-eNNmBn cXBieY">
		<div name="push-exit" width="45" height="45" size="24" class="sc-dnqmqq sc-cBrjTV iByMcc"></div>
		<div class="sc-jUpvKA ccOxya"><div size="34" class="sc-kGXeez kGMzSU"></div>
		<div class="sc-fkyLDJ epSaPl">(알 수 없음)</div>
		<div class="sc-iCwjlJ hRSOFL">9:00am</div>
		</div>
		<div class="sc-eopZyb bYeAnX">
		<div class="sc-jRuhRL coGTKb">
		<span class=""></span>
		</div>
		</div></div></div>
		<%--
		<style data-styled="" data-styled-version="4.3.2"></style>
		<div size="300" class="sc-bwzfXH hMnCjf"></div><div class="sc-bxivhb fdmBti">
		<div class="sc-ifAKCX ccgoiG">
		<div class="textLauncherContent sc-EHOje iuJdHe">채팅 문의하기</div>
		<div class="textLauncherIcon sc-bZQynM ebmtqw">
		<div hidden="" class="sc-htpNat sc-htoDjs jiXddj">0</div></div></div></div></div></div>
		<style data-styled="" data-styled-version="4.3.2"></style>
		 --%>
</div>
</body>
</html>