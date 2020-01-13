<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html class=""><head lang="ko" id="hobbyful">
<title>하비풀 - 취미를 만나 일상이 아름다워지다.</title>
<!-- 
<script src="https://connect.facebook.net/en_US/sdk.js?hash=74dcbcc2704d622295a23269b1b69bee&amp;ua=modern_es6" async crossorigin="anonymous"></script>
<script src="https://connect.facebook.net/signals/config/299353887143885?v=2.9.15&amp;r=stable" async></script><script async src="https://connect.facebook.net/en_US/fbevents.js"></script><script type="text/javascript" async src="https://www.google-analytics.com/analytics.js"></script><script type="text/javascript" async src="https://www.google-analytics.com/gtm/js?id=GTM-NLKP5J5&amp;t=gtm2&amp;cid=2139233057.1577061431"></script>
<script type="text/javascript" async src="https://cdn.channel.io/plugin/ch-plugin-web.js" charset="UTF-8"></script>
<script id="facebook-jssdk" src="https://connect.facebook.net/en_US/sdk.js"></script><script type="text/javascript" async src="https://www.google-analytics.com/plugins/ua/ec.js"></script><script type="text/javascript" async src="//www.googleadservices.com/pagead/conversion_async.js"></script><script type="text/javascript" async src="//www.googleadservices.com/pagead/conversion_async.js"></script>
 -->

<body>
<div class="wrap" id="wrap">
	<div class="container">
		<div class="my-summary-wrap">
		<div class="profile-wrap">
		<div class="profile-thumb-wrap">
		<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/profile/basic.png?0.6160473008019505" onerror="this.src='../static/img/bg-add-thumb.png'" class="thumb-profile" alt="프로필사진">
		</div>
		<div class="profile-info-wrap">
		안녕하세요.
		<div class="profile-name cut-txt">서현-님</div>
		<!--a href="javascript:;" title="프로필 사진 편집" class="btn-profile-thumb">프로필 사진 편집</a-->
		<label for="upload" class="btn-profile-thumb">프로필 사진 편집</label>
		</div>
		</div>
		<div class="my-info-wrap">
		<ul class="my-info-list">
		<li class="my-info">
		<span class="my-info-tit">회원등급<a href="#usergrade" title="보기" class="view-grade" onclick="showPopup2();">?</a></span>
		<strong class="my-info-txt my-level">thanksful</strong>
		</li>
		<li class="my-info">
		<span class="my-info-tit">내 클래스</span>
		<a href="/myclass.html"><strong class="my-info-txt my-class">0</strong></a>
		</li>
		<li class="my-info">
		<span class="my-info-tit">마일리지</span>
		<a href="javascript:;"><strong class="my-info-txt cut-txt my-point" onclick="$('.btn-mymenu-action-history').trigger('click');  $('.sub-menu-mileage').trigger('click')">1,000p</strong></a>
		</li>
		<li class="my-info">
		<span class="my-info-tit">할인쿠폰</span>
		<a href="javascript:;"><strong class="my-info-txt my-coupon" onclick="$('.btn-mymenu-action-history').trigger('click');  $('.sub-menu-coupon').trigger('click')">0</strong></a>
		</li>
		</ul>
		</div>
		</div>
		<!-- MyMenu -->
		<div class="mymenu-wrap">
		<div class="mymenu-cont">
		<ul class="mymenu-list">
			<li class="mymenu"><a href="${path}/user/mypage.shop?m=order&amp;s=order" title="주문/배송관리" data-submenu="mymenu-order" class="btn-mymenu btn-mymenu-on">주문/배송관리</a></li>
			<li class="mymenu i-subscript" style="display: none;"><a href="${path}/user/mypage.shop?m=subscript&amp;s=subscript" title="정기구독 관리" data-submenu="mymenu-subscript" class="btn-mymenu">정기구독 관리</a></li>
			<!--			<li class="mymenu"><a href="/mypage.shop?m=address&s=addresslist" title="배송지 관리" data-submenu="mymenu-address" class="btn-mymenu">배송지 관리</a></li>-->
			<li class="mymenu"><a href="${path}/user/mypage.shop?m=action-history&amp;s=comment" title="나의 활동 내역" data-submenu="mymenu-action-history" class="btn-mymenu btn-mymenu-action-history">나의 활동 내역</a></li>
			<li class="mymenu"><a href="${path}/user/mypage.shop?m=myinfo&amp;s=profile" title="내 정보 관리" data-submenu="mymenu-myinfo" class="btn-mymenu">내 정보 관리</a></li>
		</ul>
		</div>
		<a href="${path}/user/mypage.shop?m=favorite&amp;s=class" title="취미 보관함" class="btn-favorite">취미 보관함</a>
		</div>
		<!-- MyMenuSubMenu -->
		<div class="mymenu-sub-wrap">
		<div class="mymenu-sub-cont">
		<ul class="mymenu-sub-list">
			<li class="mymenu-sub" style="display: list-item;">
				<a href="${path}/user/mypage.shop?m=order&amp;s=order" title="주문/배송 조회" data-submenu="order" class="btn-mymenu-sub mymenu-order sub-menu-order btn-mymenu-sub-on">주문/배송 조회</a>
			</li>
			<!--			<li class="mymenu-sub">-->
			<!--				<a href="/mypage.shop?m=order&s=cancel" title="취소/교환/반품 조회" data-submenu="cancel" class="btn-mymenu-sub mymenu-order sub-menu-cancel">취소/교환/반품 조회</a>-->
			<!--			</li>-->
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=subscript&amp;s=subscript" title="정기구독 일정 확인" data-submenu="subscript" class="btn-mymenu-sub mymenu-subscript sub-menu-subscript">정기구독 일정 확인</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=subscript&amp;s=payment" title="결제수단 정보 변경" data-submenu="payment" class="btn-mymenu-sub mymenu-subscript sub-menu-payment">결제수단 정보 변경</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=address&amp;s=addresslist" title="배송지 목록" data-submenu="addresslist" class="btn-mymenu-sub mymenu-address sub-menu-addresslist">배송지 목록</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=address&amp;s=newaddress" title="새 배송지 추가" data-submenu="newaddress" class="btn-mymenu-sub mymenu-address sub-menu-newaddress">새 배송지 추가</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=action-history&amp;s=comment" title="내가 쓴 댓글" data-submenu="comment" class="btn-mymenu-sub mymenu-action-history sub-menu-comment">내가 쓴 댓글</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=action-history&amp;s=review" title="구매 후기" data-submenu="review" class="btn-mymenu-sub mymenu-action-history sub-menu-review">구매 후기</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=action-history&amp;s=qna" title="1:1 문의내역" data-submenu="qna" class="btn-mymenu-sub mymenu-action-history sub-menu-qna">1:1 문의내역</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=action-history&amp;s=mileage" title="마일리지 현황" data-submenu="mileage" class="btn-mymenu-sub mymenu-action-history sub-menu-mileage">마일리지 현황</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=action-history&amp;s=coupon" title="쿠폰 현황" data-submenu="coupon" class="btn-mymenu-sub mymenu-action-history sub-menu-coupon">쿠폰 현황</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=myinfo&amp;s=profile" title="회원정보 수정" data-submenu="profile" class="btn-mymenu-sub mymenu-myinfo sub-menu-profile">회원정보 수정</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=myinfo&amp;s=password" title="비밀번호 변경" data-submenu="password" class="btn-mymenu-sub mymenu-myinfo sub-menu-password">비밀번호 변경</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=myinfo&amp;s=exit" title="회원탈퇴" data-submenu="exit" class="btn-mymenu-sub mymenu-myinfo sub-menu-exit">회원탈퇴</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=favorite&amp;s=class" title="취미 클래스" data-submenu="class" class="btn-mymenu-sub mymenu-favorite sub-menu-class">취미 클래스</a>
			</li>
			<li class="mymenu-sub" style="display: none;">
				<a href="${path}/user/mypage.shop?m=favorite&amp;s=magazine" title="매거진" data-submenu="magazine" class="btn-mymenu-sub mymenu-favorite sub-menu-magazine">매거진</a>
			</li>
		</ul>
		</div>
		<div class="reply-info-wrap"></div>
		<div class="mymenu-sub-tab-wrap"></div>
		</div>
		<!-- MyMenu Content -->
		<article class="mymenu-content"><div class="order-list-wrap">
		
		<div class="no-view-wrap">
		<div class="no-view-tit">아직 주문하신 클래스가 없습니다.</div>
		<div class="no-view-txt">하비풀에서 새로운 취미를 가져보세요!</div>
		<a href="/class.html" title="클래스 보러가기" class="btn-no-view">클래스 보러가기</a>
		</div>
		
		</div><div class="order-detail-wrap" style="display: none;"></div></article>
		<div class="layer-wrap photo-wrap" id="photo-wrap">
		<div class="bg-layer-wrap" onclick="hideProfile();"></div>
		<div class="popup-cont">
		<h2 class="layer-tit">프로필 사진 바꾸기</h2>
		<div class="popup-btn">
		<a href="javascript:;" title="사진 업로드" class="btn-popup">
		<input type="file" class="btn-upload profile-upload" id="upload" accept="image/*">
		<label for="upload" class="label-upload">사진 업로드</label>
		</a>
		<a href="javascript:;" title="취소" class="btn-popup" onclick="hideProfile();">취소</a>
		</div>
		</div>
		</div>
		<div class="layer-wrap popup2-wrap" id="popup2-wrap" style="z-index:100;" onclick="hidePopup2();"><!-- popup2-wrap은 불러올때 popup2-on 클래스만 추가 -->
		<div class="bg-layer-wrap -w" onclick="hidePopup2();"></div>
		<div class="popup3-cont">
		<h2 class="popup3-tit">회원등급안내</h2>
		<div class="popup3-area">
		<ul class="popup3-list-wrap">
		<li class="popup3-list popup3-list01">
		<div class="popup3-grade">
		<strong>thanksful</strong>
		함께해줘서 고마워요!
		</div>
		<div class="popup3-txt">
		<p>구매횟수</p>
		<p>0</p>
		</div>
		<div class="popup3-txt">
		<p>마일리지 적립</p>
		<p>0</p>
		</div>
		</li>
		<li class="popup3-list popup3-list02">
		<div class="popup3-grade">
		<strong>wonderful</strong>
		첫 취미 시작, 멋져요!
		</div>
		<div class="popup3-txt">
		<p>구매횟수</p>
		<p>1</p>
		</div>
		<div class="popup3-txt">
		<p>마일리지 적립</p>
		<p>1,000</p>
		</div>
		</li>
		<li class="popup3-list popup3-list03">
		<div class="popup3-grade">
		<strong>joyful</strong>
		즐거운 취미생활 중!
		</div>
		<div class="popup3-txt">
		<p>구매횟수</p>
		<p>3</p>
		</div>
		<div class="popup3-txt">
		<p>마일리지 적립</p>
		<p>2,500</p>
		</div>
		</li>
		<li class="popup3-list popup3-list04">
		<div class="popup3-grade">
		<strong>colorful</strong>
		다양한 취미에 도전하셨군요!
		</div>
		<div class="popup3-txt">
		<p>구매횟수</p>
		<p>6</p>
		</div>
		<div class="popup3-txt">
		<p>마일리지 적립</p>
		<p>5,000</p>
		</div>
		</li>
		<li class="popup3-list popup3-list05">
		<div class="popup3-grade">
		<strong>beautiful</strong>
		일상이 아름다워져요!
		</div>
		<div class="popup3-txt">
		<p>구매횟수</p>
		<p>9</p>
		</div>
		<div class="popup3-txt">
		<p>마일리지 적립</p>
		<p>7,500</p>
		</div>
		</li>
		<li class="popup3-list popup3-list06">
		<div class="popup3-grade">
		<strong>hobbyful</strong>
		진정한 하비풀 매니아!
		</div>
		<div class="popup3-txt">
		<p>구매횟수</p>
		<p>12</p>
		</div>
		<div class="popup3-txt">
		<p>마일리지 적립</p>
		<p>10,000</p>
		</div>
		</li>
		</ul>
		</div>
		<p class="popup3-info">• 마일리지는 발급일로부터 12개월 뒤에 자동 소멸됩니다.</p>
		<p class="popup3-info">• 회원등급은 매월 말일에 업데이트 됩니다.</p>
		<button class="btn-popup3-info-close">닫기</button>
		<span class="cock -w"></span>
		</div>
		</div>
	</div>
</div>

<script>
HF.DATA.params = {};
</script>
<script type="text/javascript" src="/static/js/module/HF._init.js?bid=bHasJk4dKL"></script>
<!-- Page Load -->
<script id="orderListTemplate" type="text/x-jsrender" data-jsv-tmpl="jsvTmpl">
{{if !list.length}}
<div class="no-view-wrap">
<div class="no-view-tit">아직 주문하신 클래스가 없습니다.</div>
<div class="no-view-txt">하비풀에서 새로운 취미를 가져보세요!</div>
<a href="/class.html" title="클래스 보러가기" class="btn-no-view">클래스 보러가기</a>
</div>
{{else}}
<section class="order-list">
{{for list}}
<article>
<header>
<ul>
<li><span class="i-title">주문번호</span> <span class="i-value">{{:order_id}}</span></li>
<li><span class="i-title">신청일</span> <span class="i-value">{{:disp_order_regdate}}</span></li>
<li class="a-btn"><a href="${path}/user/mypage.shop?m=order&s=orderDetail&order_id={{:order_idx}}">주문상세보기</a></li>
</ul>
</header>
<div class="area-content">
<ul>
{{for classList}}
<li class="i-product">
<ul>
<li class="i-thumbnail">
<img src="{{:disp_class_thumbnail}}" alt="">
</li>
<li class="i-name">
{{:class_name}}
</li>
<li class="i-option">
{{:class_option_name}}
</li>
<li class="i-status">
{{:~root.stateCode[oc_status]}}
</li>
<li class="i-qty">
수량 : {{:oc_quantity}}
</li>
</ul>
</li>
{{/for}}
</ul>
</div>
</article>
{{/for}}
</section>
<div class="paging-num-wrap">
{{for start=1 end=totalPage itemVar="~i"}}
{{if ~i == ~root.orderPage}}
<a href="${path}/user/mypage.shop?m=order&s=order&page={{:}}" title="{{:}}" data-page="{{:}}" class="order-page-btn btn-num btn-num-on">{{:}}</a>
{{else}}
<a href="${path}/user/mypage.shop?m=order&s=order&page={{:}}" title="{{:}}" data-page="{{:}}" class="order-page-btn btn-num">{{:}}</a>
{{/if}}
{{/for}}
</div>
{{/if}}
</script>
<script src="https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js"></script><script charset="UTF-8" type="text/javascript" src="https://t1.daumcdn.net/postcode/api/core/191007/1570443254160/191007.js"></script>

<script type="text/javascript" src="/bower_components/printThis/printThis.js"></script>
<script type="text/javascript" src="${path}/js/page/mypage.js"></script>

 
<noscript></noscript>

<div id="fb-root" class=" fb_reset"><div style="position: absolute; top: -10000px; width: 0px; height: 0px;"><div><iframe name="fb_xdm_frame_https" id="fb_xdm_frame_https" aria-hidden="true" title="Facebook Cross Domain Communication Frame" tabindex="-1" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://staticxx.facebook.com/connect/xd_arbiter.php?version=45#channel=f3aae2a4d907ebc&amp;origin=https%3A%2F%2Fhobbyful.co.kr" style="border: none;"></iframe></div><div></div></div>
</div>
</body>
</html>