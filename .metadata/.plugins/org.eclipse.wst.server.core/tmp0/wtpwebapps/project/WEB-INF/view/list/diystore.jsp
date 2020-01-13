<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<html>
<head lang="ko" id="hobbyful">
<title>늘:솜씨</title>
</head>
<body class="">
	<div class="container">
		<div class="class-wrap">
			<div class="layout-wrap">
				<div class="img-slide-wrap img-slide-wrap01" id="img-slide-wrap">
					<!-- 좌우 버튼 or 하단 페이징 버튼 클릭 시 img-slide-wrap01 ~ img-slide-wrap03 클레스 추가&변경 -->
					<ul class="img-slide-cont hf-tracker-group"
						data-tracker-type="promotion"
						data-tracker-id="Product list Top banner"
						style="transform: translate3d(0%, 0px, 0px);">
						<li class="img-slide img-slide01 hf-tracker-item"
							data-tracker-id="19"><a
							href="https://hobbyful.co.kr/view-magazine.html?id=206"
							title="혼자서도 잘해요! 하비풀 DIY 스토어" class="btn-img-slide"> <span
								class="img-slide-img"
								style="background-image: url(https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/classbanner/bn_store.jpg);"></span>
								<div class="img-slide-area2 img-slide-type02">
									<strong class="img-slide-tit">NEW SERVICE</strong><span
										class="img-slide-txt">도안, DIY키트부터 재료와 도구까지<span
										class="bold">혼자서도 잘해요! 하비풀 DIY 스토어</span></span>
									<button type="button" class="btn-slide-go">자세히 보기</button>
								</div></a></li>
					</ul>
					<div class="paging-wrap">
						<button type="button" class="paging-btn-prev"
							style="left: 0; display: none;">이전</button>
						<div class="class-paging paging-cont">
							<button type="button" class="paging-btn paging-btn00 active">0</button>
						</div>
						<button type="button" class="paging-btn-next"
							style="right: 0; display: none;">다음</button>
					</div>
				</div>
			</div>
			<div class="layout-wrap">
				<ul class="tab-class-list">
					<li class="tab-class"><a href="/list/diystore"
						data-path="diystore" data-fullpath="diystore" title="전체"
						class="btn-tab-class btn-tab-on">전체</a></li>
					<li class="tab-class"><a
						href="/list/diystore/french-embroidery"
						data-path="french-embroidery"
						data-fullpath="diystore/french-embroidery" class="btn-tab-class">프랑스자수</a></li>
					<li class="tab-class"><a href="/list/diystore/knitting"
						data-path="knitting" data-fullpath="diystore/knitting"
						class="btn-tab-class">뜨개질</a></li>
					<li class="tab-class"><a href="/list/diystore/kids"
						data-path="kids" data-fullpath="diystore/kids"
						class="btn-tab-class">키즈</a></li>
					<li class="tab-class"><a href="/list/diystore/drawing"
						data-path="drawing" data-fullpath="diystore/drawing"
						class="btn-tab-class">수채화/드로잉</a></li>
					<li class="tab-class"><a href="/list/diystore/hobbysampler"
						data-path="hobbysampler" data-fullpath="diystore/hobbysampler"
						class="btn-tab-class">취미 샘플러</a></li>
					<li class="tab-class"><a href="/list/diystore/soap-candle"
						data-path="soap-candle" data-fullpath="diystore/soap-candle"
						class="btn-tab-class">캔들/비누</a></li>
				</ul>
			</div>
			<div class="layout-wrap">
				<ul id="allList" class="class-list-wrap hf-tracker-group"
					data-tracker-type="impression" data-tracker-id="/list/">
					<li class="class-list hf-tracker-item" data-tracker-id="FE-M-0006"><a
						href="/product/h9VewXf18y"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/490b45e0-2213-11ea-9cb3-c70fccd5674e-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 림자수공방</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">장미정원
									자수 끈파우치 만들기</p>
								<p class="class-list-price">
									28,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="부쉬아로마01"><a
						href="/product/92LvaquM5a"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/d914c600-1b12-11ea-add4-09214dce28ac-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 부쉬아로마</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">하트
									곰돌이비누 DIY 키트</p>
								<p class="class-list-price">
									32,900<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="SE-M-0001"><a
						href="/product/pwuyo66RGm"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/9a4671a0-1728-11ea-add4-09214dce28ac-resize.jpg"
									alt="" class="thumb-class-list">
								<p class="i-soldout">
									<span>일시 품절</span>
								</p>
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 하비풀</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">빽투더초딩
									스킬자수 체험 키트</p>
								<p class="class-list-price">
									7,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="rm140"><a
						href="/product/6Emnd9TPtz"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/bd75dcf0-051d-11ea-a7c7-8769acbff2c1-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[도구] 하비풀</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">스테들러
									고체 수채물감</p>
								<p class="class-list-price">
									7,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090849"><a href="/product/8VutR6QWLc"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/4c3e0100-eb25-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">나의
									첫 마크라메 플랜트행어 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">10%</span> <span class="i-regular"><s>14,300원</s></span>
								</p>
								<p class="class-list-price">
									13,120<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="AP-M-0002"><a
						href="/product/c290910853"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c7d7b560-df93-11e9-8fd9-7d4b59dd5b69-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 아토이</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">마티스
									할아버지의 선물 미술놀이 키트</p>
								<p class="class-list-price">
									11,000<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="코코유리소01"><a
						href="/product/ZsKULDSL45"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c3ca1cc0-1593-11ea-add4-09214dce28ac-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 코코유리소</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">유리조각
									캔들홀더 키트</p>
								<p class="class-list-price">
									18,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="SB-M-0001"><a
						href="/product/7GV3Cx2n5V"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/e2e1c400-127d-11ea-931a-2fe27e77a6ff-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 하비풀</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">내맘대로
									눈 내리는 스노우볼 DIY 키트</p>
								<p class="class-list-price">
									27,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090467"><a href="/product/qkTfrTCs9E"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/9604d4e0-0b36-11ea-952c-efccbb50f547-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">나의
									첫 별자리 자수 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">10%</span> <span class="i-regular"><s>12,300원</s></span>
								</p>
								<p class="class-list-price">
									11,070<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="rm430"><a
						href="/product/Sry67XjDWX"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/16c4d0e0-0519-11ea-a7c7-8769acbff2c1-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[도구] 하비풀</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">문교
									고체 수채물감</p>
								<p class="class-list-price">
									12,000<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461091136"><a href="/product/mCDNaNvO3Z"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/19ded9b0-eb10-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">나의
									첫 스누피 에어팟케이스 뜨개질 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">10%</span> <span class="i-regular"><s>19,000원</s></span>
								</p>
								<p class="class-list-price">
									17,350<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="AP-M-0001"><a
						href="/product/dcc357c993"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/bc60ee90-df8e-11e9-8fd9-7d4b59dd5b69-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 아토이</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">아이와
									만드는 정글동화 미술놀이 키트</p>
								<p class="class-list-price">
									27,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="림자수01"><a
						href="/product/0hkBQ4hgrj"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/00b01220-0211-11ea-a7c7-8769acbff2c1-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 림자수공방</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">낭만가득
									자수 프레임&nbsp;파우치</p>
								<p class="class-list-price">
									33,000<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461091129"><a href="/product/lVPaOnXnOk"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/2d336da0-eb10-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">나의
									첫 스누피 카드케이스 뜨개질 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">10%</span> <span class="i-regular"><s>19,000원</s></span>
								</p>
								<p class="class-list-price">
									17,350<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="FE-S-0001"><a
						href="/product/Uft1JmLhNG"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/5fa6ce20-efe4-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[도구] 하비풀</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">프랑스자수
									스타터키트</p>
								<p class="class-list-price">
									8,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="KT-M-0001"><a
						href="/product/8b8b0b5056"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/e9857800-dec6-11e9-8fd9-7d4b59dd5b69-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 슬로우모먼츠</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">버블클러치
									뜨개질 키트</p>
								<p class="class-list-price">
									23,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="LT-S-0001"><a
						href="/product/3bNyUiohqT"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/2096ec60-eef9-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[도구] 하비풀</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">하비풀
									가죽공예 스타터키트</p>
								<p class="class-list-price">
									10,000<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="KT-M-0002"><a
						href="/product/b53e40372a"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/97f35bb0-dec6-11e9-8fd9-7d4b59dd5b69-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 슬로우모먼츠</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">로맨틱코스터
									뜨개질 키트</p>
								<p class="class-list-price">
									20,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="FE-M-0004"><a
						href="/product/N9krdsRc3R"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/010f34b0-efdf-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 실버스노우</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">진주조개
									티코스터 프랑스자수 키트</p>
								<p class="class-list-price">
									24,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="FE-M-0005"><a
						href="/product/2U8lWSqLvm"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/003c37a0-efbb-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 실버스노우</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">블루밍
									클래식 액자 프랑스자수 키트</p>
								<p class="class-list-price">
									26,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="FE-M-0003"><a
						href="/product/FTFFV5W7SV"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/3b47b4f0-eb10-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 실버스노우</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">프랑스자수
									달력 키트(2020년)</p>
								<p class="class-list-price">
									33,000<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090924"><a href="/product/CByPbo7Rmv"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/220667c0-eb10-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">포근포근
									스웨터 프랑스자수 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">10%</span> <span class="i-regular"><s>27,300원</s></span>
								</p>
								<p class="class-list-price">
									24,820<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090818"><a href="/product/WSCngj2pJI"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/10574670-eb10-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">몬스테라가
									있는 오후 프랑스자수 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">10%</span> <span class="i-regular"><s>27,300원</s></span>
								</p>
								<p class="class-list-price">
									24,820<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090603"><a href="/product/Qsiqhfe8uw"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/065775f0-eb10-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">자수의
									기본 비기닝 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">30%</span> <span class="i-regular"><s>20,500원</s></span>
								</p>
								<p class="class-list-price">
									15,100<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090443"><a href="/product/WdRnlbtDNm"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/fcf45aa0-eb0f-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
								<p class="i-soldout">
									<span>일시 품절</span>
								</p>
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">프랑스자수
									스티치 200 비기닝 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">30%</span> <span class="i-regular"><s>40,500원</s></span>
								</p>
								<p class="class-list-price">
									29,100<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090429"><a href="/product/UcjLFMFAyc"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/f12e2200-eb0f-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">나의
									달콤한 프랑스자수 비기닝 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">30%</span> <span class="i-regular"><s>40,500원</s></span>
								</p>
								<p class="class-list-price">
									29,100<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461091174"><a href="/product/dZS3OFmpbk"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/e73a8680-eb0f-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">나의
									첫 스누피 향기 프랑스자수 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">10%</span> <span class="i-regular"><s>17,300원</s></span>
								</p>
								<p class="class-list-price">
									15,820<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090979"><a href="/product/a9obeh1olt"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/5618bd50-eb25-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">나의
									첫 스누피 프랑스자수 키트(3종)</p>
								<p class="class-list-discount">
									<span class="i-percent">10%</span> <span class="i-regular"><s>13,700원</s></span>
								</p>
								<p class="class-list-price">
									12,580<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item"
						data-tracker-id="8809461090702"><a href="/product/ucDLFCGwJq"><div
								class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/d4546bd0-eb0f-11e9-ac24-737b6e1628bf-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 솜씨</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">나의
									첫 카네이션 프랑스자수 키트</p>
								<p class="class-list-discount">
									<span class="i-percent">30%</span> <span class="i-regular"><s>17,300원</s></span>
								</p>
								<p class="class-list-price">
									12,860<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="FE-M-0002"><a
						href="/product/ba20c42792"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c84d9990-e431-11e9-8946-f7c44655dc1e-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 멘티</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">도도냥이
									에코백 프랑스자수 키트</p>
								<p class="class-list-price">
									28,500<span class="i-won">원</span>
								</p>
							</div></a></li>
					<li class="class-list hf-tracker-item" data-tracker-id="FE-M-0001"><a
						href="/product/94d952f641"><div class="class-list-thumb">
								<img
									src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/d1e7f180-e431-11e9-8946-f7c44655dc1e-resize.jpg"
									alt="" class="thumb-class-list">
							</div>
							<div class="class-list-cont">
								<p class="class-list-lecturer-name">[DIY 키트] 멘티</p>
								<p class="class-list-name" style="padding: 0 100px 0 0;">레옹베어
									파우치 프랑스자수 키트</p>
								<p class="class-list-price">
									24,500<span class="i-won">원</span>
								</p>
							</div></a></li>
				</ul>
			</div>
			<div class="class-list-more-btn">
				<a href="javascript:;" title="more" class="btn-more"
					style="display: none;">more</a>
			</div>
		</div>
	</div>
	<script>
		HF.DATA.params = { "categoryPath" : "diystore", "categoryDepth1" : "diystore" };
	</script>
</body>
</html>