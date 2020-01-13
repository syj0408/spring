<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}" />

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>늘:솜씨 - 취미를만나일상이아름다워지다</title>
</head>
<body>

<div class="container">
	<div class="class-wrap">
		<div class="layout-wrap">
		</div>
		
		<div class="layout-wrap">
			<!-- 광고 슬라이드 3개 -->
			<div class="img-slide-wrap img-slide-wrap01" id="img-slide-wrap">
				
				<!-- 좌우 버튼 or 하단 페이징 버튼 클릭 시 img-slide-wrap01 ~ img-slide-wrap03 클레스 추가&변경 -->
				<ul class="img-slide-cont hf-tracker-group" data-tracker-type="promotion"
															data-tracker-id="Product list Top banner"
															style="transform: translate3d(-200%, 0px, 0px);">
					<!-- 1번 광고 -->
					<li class="img-slide img-slide01 hf-tracker-item" data-tracker-id="19">
						<a href="https://hobbyful.co.kr/view-magazine.html?id=178" title="하비풀만의 특별한 스티커맵" class="btn-img-slide">
							<span class="img-slide-img" style="background-image:url(https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/classbanner/6134d530-d369-11e9-beb7-c79511ad1cb5-resize.jpg);"></span>
							<div class="img-slide-area2 img-slide-type02">
								<strong class="img-slide-tit">ONLY HOBBYFUL</strong>
								<span class="img-slide-txt">정규 클래스에서 누리는 소소한 재미<span class="bold">하비풀만의 특별한 스티커맵</span></span>
								<!-- <button type="button" class="btn-slide-go">자세히 보기</button> -->
							</div>
						</a>
					</li>
					<!-- 2번 광고 -->
					<li class="img-slide img-slide02 hf-tracker-item" data-tracker-id="18">
						<a href="https://hobbyful.co.kr/view-magazine.html?id=191" title="#뿌듯챌린지 2차 오픈" class="btn-img-slide">
							<span class="img-slide-img" style="background-image:url(https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/classbanner/5c2d36b0-d367-11e9-beb7-c79511ad1cb5-resize.jpg);"></span>
							<div class="img-slide-area2 img-slide-type02">
								<strong class="img-slide-tit">완성하고뿌듯, 환급받고 뿌듯</strong>
								<span class="img-slide-txt">매주 5명 클래스 100% 환급<span class="bold">#뿌듯챌린지 2차 오픈</span></span>
								<button type="button" class="btn-slide-go">자세히 보기</button>
							</div>
						</a>
					</li>
					<!-- 3번 광고 -->	
					<li class="img-slide img-slide03 hf-tracker-item" data-tracker-id="10">
						<a href="https://hobbyful.co.kr/view-magazine.html?id=164" title="기업/단체 신청하고 할인받자!" class="btn-img-slide">
							<span class="img-slide-img" style="background-image:url(https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/classbanner/f6ef3180-4154-11e9-8c9b-07247cd7ad1a-resize.jpg);"></span>
							<div class="img-slide-area2 img-slide-type02">
								<strong class="img-slide-tit">단체주문 할인 신청</strong>
								<span class="img-slide-txt">함께하면 더 즐거운 취미<span class="bold">기업/단체 신청하고 할인받자!</span></span>
								<button type="button" class="btn-slide-go">자세히 보기</button>
							</div>
						</a>
					</li>
				</ul>
			
				<div class="paging-wrap">
					<!-- <button type="button" class="paging-btn-prev" style="left:0; display:none;">이전</button> -->
					<div class="class-paging paging-cont">
						<button type="button" class="paging-btn paging-btn00">0</button>
						<button type="button" class="paging-btn paging-btn01">1</button>
						<button type="button" class="paging-btn paging-btn02 active">2</button>
					</div>
					<!-- <button type="button" class="paging-btn-next" style="right:0; display:none;">다음</button> -->
				</div>
			</div>
		</div>
		
		<!-- 작은 navigation -->
		<div class="layout-wrap">
			<ul class="tab-class-list">
				<li class="tab-class">
					<a href="/list/class" data-path="class" data-fullpath="class" title="전체" class="btn-tab-class btn-tab-on">
						전체
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/regular" data-path="regular" data-fullpath="class/regular" class="btn-tab-class">
						전체 정규클래스
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/macrame" data-path="macrame" data-fullpath="class/macrame" class="btn-tab-class">
						마크라메
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/french-embroidery" data-path="french-embroidery" data-fullpath="class/french-embroidery" class="btn-tab-class">
						프랑스자수
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/drawing" data-path="drawing" data-fullpath="class/drawing" class="btn-tab-class">
						수채화/드로잉
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/knitting" data-path="knitting" data-fullpath="class/knitting" class="btn-tab-class">
						뜨개질/위빙
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/leather" data-path="leather" data-fullpath="class/leather" class="btn-tab-class">
						가죽공예
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/soap-candle" data-path="soap-candle" data-fullpath="class/soap-candle" class="btn-tab-class">
						비누/캔들
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/jewelry-neonsign" data-path="jewelry-neonsign" data-fullpath="class/jewelry-neonsign" class="btn-tab-class">
						쥬얼리/네온사인
					</a>
				</li>
				<li class="tab-class">
					<a href="/list/class/etc" data-path="etc" data-fullpath="class/etc" class="btn-tab-class">
						다양한 취미
					</a>
				</li>
			</ul>
		</div>
		<!-- 작은 navigation The end -->
		
		<!-- 클래스 list -->
		<div class="layout-wrap">
			<ul id="allList" class="class-list-wrap hf-tracker-group" data-tracker-type="impression" data-tracker-id="/list/">
				
				<!-- 정규 클래스 -->
				<li class="class-list hf-tracker-item" data-tracker-id="DW-R-0005">
					<a href="/product/traveldigital">
						<div class="class-list-thumb">
							<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/42649440-218b-11ea-9cb3-c70fccd5674e-resize.jpg" alt="" class="thumb-class-list">
						</div>
						<div class="class-list-cont">
							<p class="class-list-lecturer-name">[정규 클래스] 유수빈</p>
							<p class="class-list-name" style="padding:0 150px 0 0;">유수빈의 올인원 여행 디지털 드로잉 클래스</p>
							<p class="class-list-discount">
								<span class="i-percent">10%</span>
								<span class="i-regular">180,000원</span>
							</p>
							<p class="class-list-price">
								<span class="i-won">월</span>36,000<span class="i-won">원</span>
								<span class="i-installment">X 5개월</span>
							</p>
						</div>
					</a>
				</li>
				
				<!-- 원데이 클래스  -->
				<li class="class-list hf-tracker-item" data-tracker-id="SE-K-0001">
					<a href="/product/Bo2uDp6tLZ">
						<div class="class-list-thumb">
							<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c0605900-1be2-11ea-add4-09214dce28ac-resize.jpg" alt="" class="thumb-class-list">
						</div>
						<div class="class-list-cont">
							<p class="class-list-lecturer-name">[원데이 클래스] 하비풀</p>
							<p class="class-list-name" style="padding:0 100px 0 0;">반곰이의 추억여행 스킬자수 카펫매트 클래스</p>
							<p class="class-list-discount">
								<span class="i-percent">10%</span>
								<span class="i-regular"><s>38,000원</s></span>
							</p>
							<p class="class-list-price">34,200<span class="i-won">원</span></p>
						</div>
					</a>
				</li>
				
				<!-- 원데이 클래스  -->
				<li class="class-list hf-tracker-item" data-tracker-id="NOK0001000S1">
					<a href="/product/2ca6faa382">
						<div class="class-list-thumb">
							<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/36107460-efc3-11e9-ac24-737b6e1628bf-resize.jpg" alt="" class="thumb-class-list">
						</div>
						<div class="class-list-cont">
							<p class="class-list-lecturer-name">[원데이 클래스] 더베러라이프</p>
							<p class="class-list-name" style="padding:0 100px 0 0;">밤바다 고래의 꿈 네온사인 클래스</p>
							<p class="class-list-discount">
								<span class="i-percent">10%</span>
								<span class="i-regular"><s>43,500원</s></span>
							</p>
							<p class="class-list-price">39,150<span class="i-won">원</span></p>
						</div>
					</a>
				</li>
				
				<!-- 품절 -->
				<li class="class-list hf-tracker-item" data-tracker-id="NS-K-0001">
					<a href="/product/9fb76748cf">
						<div class="class-list-thumb">
							<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/5a605ae0-55b0-11e9-9509-fd4eca7b3294-resize.jpg" alt="" class="thumb-class-list">
							<p class="i-soldout"><span>일시 품절</span></p>
						</div>
						<div class="class-list-cont">
							<p class="class-list-lecturer-name">[원데이 클래스] 콩페티</p>
							<p class="class-list-name" style="padding:0 100px 0 0;">숲속 산책 비누 클래스</p>
							<p class="class-list-discount">
								<span class="i-percent">10%</span>
								<span class="i-regular"><s>34,000원</s></span>
							</p>
							<p class="class-list-price">30,600<span class="i-won">원</span></p>
						</div>
					</a>
				</li>
				
				<li class="class-list hf-tracker-item" data-tracker-id="LT-K-0006">
					<a href="/product/53ea1a6b8b">
						<div class="class-list-thumb">
						<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/6179e8f0-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list">
						</div>
						<div class="class-list-cont">
							<p class="class-list-lecturer-name">[원데이 클래스] 트리비아</p>
							<p class="class-list-name" style="padding:0 100px 0 0;">가죽 미니 버킷백 만들기 클래스</p>
							<p class="class-list-discount">
								<span class="i-percent">10%</span>
								<span class="i-regular"><s>62,000원</s></span>
							</p>
							<p class="class-list-price">55,800<span class="i-won">원</span></p>
						</div>
					</a>
				</li>
							
				<li class="class-list hf-tracker-item" data-tracker-id="CA-K-0001">
					<a href="/product/sIFR8YyVhz">
						<div class="class-list-thumb">
							<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/64cd5070-fb85-11e9-bce7-bb5409fe61d5-resize.jpg" alt="" class="thumb-class-list">
						</div>
						<div class="class-list-cont">
							<p class="class-list-lecturer-name">[원데이 클래스] 오브유</p>
							<p class="class-list-name" style="padding:0 100px 0 0;">컬러오브유 커플머그 도자 클래스</p>
							<p class="class-list-discount">
								<span class="i-percent">10%</span>
								<span class="i-regular"><s>50,000원</s></span>
							</p>
							<p class="class-list-price">45,000<span class="i-won">원</span></p>
						</div>
					</a>
				</li>
				
<!-- 				<li class="class-list hf-tracker-item" data-tracker-id="JC-K-0005"><a href="/product/7090fe57ec"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c3988ac0-cd2c-11e9-a6c1-1379508efc05-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 프롬루</p><p class="class-list-name" style="padding:0 100px 0 0;">매일이 반짝이는 썬캐쳐 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>28,000원</s></span></p><p class="class-list-price">25,200<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="DW-K-0001"><a href="/product/129b60a3fc"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/019aefd0-0f21-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 바이냉</p><p class="class-list-name" style="padding:0 100px 0 0;">책상 위 나만의 공간 색연필 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>45,000원</s></span></p><p class="class-list-price">40,500<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="KT-K-0005"><a href="/product/0dd6abd41b"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/632c1830-55b0-11e9-9509-fd4eca7b3294-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 모리</p><p class="class-list-name" style="padding:0 100px 0 0;">아기 돼지 삼형제 인형 뜨개질 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>38,500원</s></span></p><p class="class-list-price">34,650<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="CD-K-0001"><a href="/product/98d05b83f2"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/e04150c0-feb6-11e8-b1bc-afe65c7c2522-resize.png" alt="" class="thumb-class-list"><p class="i-soldout"><span>일시 품절</span></p></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 아띠랑스</p><p class="class-list-name" style="padding:0 100px 0 0;">꽃잎 가득 캔들 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>18,500원</s></span></p><p class="class-list-price">16,650<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="LT-K-0005"><a href="/product/95e222eae7"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/daf7e650-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 트리비아</p><p class="class-list-name" style="padding:0 100px 0 0;">천연 가죽필통 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>34,000원</s></span></p><p class="class-list-price">30,600<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="SW-R-0001"><a href="/product/yjK3fHoLPQ"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/07ee8120-1256-11ea-931a-2fe27e77a6ff-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 스티치랩</p><p class="class-list-name" style="padding:0 150px 0 0;">스티치랩의 재봉틀 입문 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">189,000원</span></p><p class="class-list-price"><span class="i-won">월</span>37,800<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MR-K-0008"><a href="/product/6858685378"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/0ae12a40-bfc2-11e9-a6c1-1379508efc05-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 슈에뜨마망</p><p class="class-list-name" style="padding:0 100px 0 0;">비온뒤맑음 마크라메 월행잉 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>35,000원</s></span></p><p class="class-list-price">31,500<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="RT-K-0001"><a href="/product/150ed0993f"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/e8544160-bfc1-11e9-a6c1-1379508efc05-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 노플랜 프로젝트</p><p class="class-list-name" style="padding:0 100px 0 0;">우리집 피크닉 라탄 바구니 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>40,000원</s></span></p><p class="class-list-price">36,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="WC-K-0005"><a href="/product/6952faf709"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/ee981ad0-0f1f-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 시나 아뜰리에</p><p class="class-list-name" style="padding:0 100px 0 0;">나의 달콤한 카페 수채화 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>38,000원</s></span></p><p class="class-list-price">34,200<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="JC-C-0001"><a href="/product/b4e7984ac9"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/f410e360-0e54-11e9-b0f6-2be61b0868d8-resize.png" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 하비풀</p><p class="class-list-name" style="padding:0 100px 0 0;">걸어서 30분 지구와 달 팔찌 만들기(골드)</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>17,500원</s></span></p><p class="class-list-price">15,750<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="KT-K-0004"><a href="/product/12cdf245f0"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/d7424e70-feb6-11e8-b1bc-afe65c7c2522-resize.png" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 에이니트 스튜디오, 김원</p><p class="class-list-name" style="padding:0 100px 0 0;">반려동물 장난감 뜨개질 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="LT-K-0004"><a href="/product/942d0bdcc2"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c64bffc0-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 트리비아</p><p class="class-list-name" style="padding:0 100px 0 0;">가죽 여권케이스 만들기 클래스(크림)</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="DW-R-0003"><a href="/product/6cc18bfd02"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/b7a315b0-0f20-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 라미</p><p class="class-list-name" style="padding:0 150px 0 0;">라미의 사계절 오일파스텔 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">189,000원</span></p><p class="class-list-price"><span class="i-won">월</span>37,800<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FA-K-0001"><a href="/product/91bc016d70"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/4e9b7580-8118-11e9-8aaa-8f0c98b2ea55-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 셀레네</p><p class="class-list-name" style="padding:0 100px 0 0;">셀프 웨딩 플라워 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>37,000원</s></span></p><p class="class-list-price">33,300<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0010"><a href="/product/543dc1eff1"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/8ff8c480-8e4a-11e9-aa4a-2318dc53c1a7-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 베란다자수</p><p class="class-list-name" style="padding:0 100px 0 0;">따뜻한 한마디 일러스트 글자수 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MR-K-0007"><a href="/product/e9e5b2add0"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/42888c80-8e4a-11e9-aa4a-2318dc53c1a7-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 드로우앤드</p><p class="class-list-name" style="padding:0 100px 0 0;">감성 리빙 마크라메 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>37,500원</s></span></p><p class="class-list-price">33,750<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="WC-K-0004"><a href="/product/64b1eeeb1c"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/dd005210-0f1f-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 이그림</p><p class="class-list-name" style="padding:0 100px 0 0;">꽃피우는 날 수채화 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>32,500원</s></span></p><p class="class-list-price">29,250<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="JC-C-0002"><a href="/product/7cdad812ff"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/ef0bf210-0e54-11e9-b0f6-2be61b0868d8-resize.png" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 하비풀</p><p class="class-list-name" style="padding:0 100px 0 0;">걸어서 30분 지구와 달 팔찌 만들기(실버)</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>17,500원</s></span></p><p class="class-list-price">15,750<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="WV-L-0004"><a href="/product/4c08d7bb10"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/a65fcc60-5ab4-11e9-9833-1763037171fc-resize.jpg" alt="" class="thumb-class-list"><p class="i-soldout"><span>일시 품절</span></p></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 탁틸리티 스튜디오, 이송이</p><p class="class-list-name" style="padding:0 100px 0 0;">위빙 태슬 코스터 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>29,000원</s></span></p><p class="class-list-price">26,100<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="LT-K-0003"><a href="/product/828db6bf01"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/bf038710-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 트리비아</p><p class="class-list-name" style="padding:0 100px 0 0;">가죽 여권케이스 만들기 클래스(베이지)</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="DW-R-0002"><a href="/product/906965c18d"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/a7468c10-0f20-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 메리진</p><p class="class-list-name" style="padding:0 150px 0 0;">메리진의 스마트폰 드로잉 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">121,500원</span></p><p class="class-list-price"><span class="i-won">월</span>24,300<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MR-K-0006"><a href="/product/8649dd6fd0"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/7ec32c70-6c7e-11e9-9ea2-f5fe6edf878d-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 이현주</p><p class="class-list-name" style="padding:0 100px 0 0;">초록잎 선캐쳐 마크라메 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>38,500원</s></span></p><p class="class-list-price">34,650<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0009"><a href="/product/b6808bad61"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/d52f34c0-09b6-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 제니스리</p><p class="class-list-name" style="padding:0 100px 0 0;">꽃 소풍 프랑스자수 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>35,000원</s></span></p><p class="class-list-price">31,500<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="WC-K-0003"><a href="/product/d82af9ae28"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c3f29800-0f1f-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 지니그림</p><p class="class-list-name" style="padding:0 100px 0 0;">세상의 모든 강아지 수채화 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>38,000원</s></span></p><p class="class-list-price">34,200<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="KT-K-0003"><a href="/product/2fa69c3ddd"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/7828f280-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 엘빈</p><p class="class-list-name" style="padding:0 100px 0 0;">원형 수납바구니 뜨개질 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="LT-K-0001"><a href="/product/3c6eef54f9"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/b837b870-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 트리비아</p><p class="class-list-name" style="padding:0 100px 0 0;">가죽 카드지갑 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-R-0003"><a href="/product/QMeAha5VgU"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/852ae460-09b6-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 메리데이</p><p class="class-list-name" style="padding:0 150px 0 0;">메리데이의 채색 자수 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">166,500원</span></p><p class="class-list-price"><span class="i-won">월</span>33,300<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0008"><a href="/product/cebae12430"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/37272980-09b7-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 실버스노우</p><p class="class-list-name" style="padding:0 100px 0 0;">풀꽃 양말 프랑스자수 클래스</p><p class="class-list-discount"><span class="i-percent">6%</span> <span class="i-regular"><s>35,000원</s></span></p><p class="class-list-price">31,500<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MR-K-0005"><a href="/product/9465775f61"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/6a03a6a0-55b0-11e9-9509-fd4eca7b3294-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 탁틸리티 스튜디오, 이송이</p><p class="class-list-name" style="padding:0 100px 0 0;">수납 포켓 월행잉 마크라메 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>38,500원</s></span></p><p class="class-list-price">34,650<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="WC-K-0002"><a href="/product/c25a784cff"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/afc668c0-0f1f-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 이그림</p><p class="class-list-name" style="padding:0 100px 0 0;">꽃다발 스탠드 수채화 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>27,000원</s></span></p><p class="class-list-price">24,300<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="WV-K-0001"><a href="/product/022c0bd4dd"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/84880fc0-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"><p class="i-soldout"><span>일시 품절</span></p></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 탁틸리티 스튜디오, 이송이</p><p class="class-list-name" style="padding:0 100px 0 0;">위빙 드림캐처 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="LT-K-0002"><a href="/product/accd8d1eb4"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/95b15f40-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 트리비아</p><p class="class-list-name" style="padding:0 100px 0 0;">가죽팔찌 3종 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="DWR0001000S1"><a href="/product/4569ad44d7"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/e6cc4be0-0f20-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 배성규</p><p class="class-list-name" style="padding:0 150px 0 0;">배성규의 마카&amp;색연필 드로잉 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">198,000원</span></p><p class="class-list-price"><span class="i-won">월</span>39,600<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0007"><a href="/product/8a51e9c3c1"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/4a794c70-09b7-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 아뜰리에 올라</p><p class="class-list-name" style="padding:0 100px 0 0;">커피&amp;프레즐 키링 프랑스자수 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>22,500원</s></span></p><p class="class-list-price">20,250<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MR-K-0004"><a href="/product/7f87b7cc01"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/1e351c90-2ac2-11e9-9a2f-d1edd71f3c43-resize.png" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 하비풀</p><p class="class-list-name" style="padding:0 100px 0 0;">목화 리스 마크라메 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>28,500원</s></span></p><p class="class-list-price">25,650<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="WC-K-0001"><a href="/product/d8b5571186"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/7394dd00-0f1f-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 머머링</p><p class="class-list-name" style="padding:0 100px 0 0;">제주 바다 가랜드 수채화 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>28,000원</s></span></p><p class="class-list-price">25,200<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="KT-K-0002"><a href="/product/5ef88007b4"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/b11cdf70-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 엘빈</p><p class="class-list-name" style="padding:0 100px 0 0;">사각 티 코스터 뜨개질 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="DW-R-0004"><a href="/product/kJd9eCLrOE"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/563b2bf0-0f20-11ea-83c9-99a92107598f-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 유수지</p><p class="class-list-name" style="padding:0 150px 0 0;">유수지의 초록낙원 아크릴화 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">198,000원</span></p><p class="class-list-price"><span class="i-won">월</span>39,600<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0006"><a href="/product/697a390b06"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/aac36a20-09b7-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 메리데이</p><p class="class-list-name" style="padding:0 100px 0 0;">프랑스자수 밤의 숲 수놓기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>19,500원</s></span></p><p class="class-list-price">17,550<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MR-K-0002"><a href="/product/2dc5b7f1a4"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/68e1d080-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 이현주</p><p class="class-list-name" style="padding:0 100px 0 0;">마크라메 네트백 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="KT-K-0001"><a href="/product/9071c5c74a"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/2fd0e5b0-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 시은맘</p><p class="class-list-name" style="padding:0 100px 0 0;">토끼인형 뜨개질 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-R-0001"><a href="/product/e0524b36eb"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c84849e0-09b6-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 멘티자수</p><p class="class-list-name" style="padding:0 150px 0 0;">멘티의 귀여운 패션 자수 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">148,500원</span></p><p class="class-list-price"><span class="i-won">월</span>29,700<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="PA-K-0001"><a href="/product/0bc21b1db7"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/fea21e70-0e54-11e9-b0f6-2be61b0868d8-resize.png" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 프롬일랑</p><p class="class-list-name" style="padding:0 100px 0 0;">페이퍼 자이언트로즈 조명 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>35,000원</s></span></p><p class="class-list-price">31,500<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0005"><a href="/product/9b87795b93"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/b0e9d100-09b7-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 아뜰리에 올라</p><p class="class-list-name" style="padding:0 100px 0 0;">프랑스자수 수제버거 파우치 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MR-K-0001"><a href="/product/724629eb6c"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/53b632a0-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 탁틸리티 스튜디오, 이송이</p><p class="class-list-name" style="padding:0 100px 0 0;">마크라메 라그라스 월행잉 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">7%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="CGR0001000S1"><a href="/product/a75fcbc5e7"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/97204cc0-f8bb-11e9-9c82-5978e3ec6dff-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 리제</p><p class="class-list-name" style="padding:0 150px 0 0;">리제의 컬러 딥펜 캘리그라피 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">193,500원</span></p><p class="class-list-price"><span class="i-won">월</span>38,700<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="PK-K-0001"><a href="/product/0b562bd113"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/d140fbc0-feb6-11e8-b1bc-afe65c7c2522-resize.png" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 원하라</p><p class="class-list-name" style="padding:0 100px 0 0;">펀치니들 크로스백 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>38,000원</s></span></p><p class="class-list-price">34,200<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="KT-R-0001"><a href="/product/gS7QqqeD6Y"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/54bedce0-04f3-11ea-a7c7-8769acbff2c1-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 슬로우모먼츠</p><p class="class-list-name" style="padding:0 150px 0 0;">슬로우모먼츠의 태교 뜨개질 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">202,500원</span></p><p class="class-list-price"><span class="i-won">월</span>40,500<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MA-C-0001"><a href="/product/864ede0292"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/5a610bc0-39a4-11e9-9148-65480c11ba0a-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 하비풀</p><p class="class-list-name" style="padding:0 100px 0 0;">유미의 세포들 출출이 미니어처 만들기 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0004"><a href="/product/6628bd2b91"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/b7368490-09b7-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 메리데이</p><p class="class-list-name" style="padding:0 100px 0 0;">프랑스자수 꽃 향수 액자 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="MRR0001000S1"><a href="/product/749969ed3b"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/d856ca90-de74-11e9-8fd9-7d4b59dd5b69-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 노티드레이스</p><p class="class-list-name" style="padding:0 150px 0 0;">노티드레이스의 홈스타일링 마크라메 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">151,200원</span></p><p class="class-list-price"><span class="i-won">월</span>30,240<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0003"><a href="/product/69622351a2"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/bcf59e20-09b7-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 메리데이</p><p class="class-list-name" style="padding:0 100px 0 0;">프랑스자수 식물 인테리어 액자 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="HCR0001000S1"><a href="/product/ce4bb58eb0"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/191e5e30-1183-11ea-bd96-3930f0afcb68-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[정규 클래스] 에이미 테이블</p><p class="class-list-name" style="padding:0 150px 0 0;">에이미테이블의 데일리 홈카페 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular">139,500원</span></p><p class="class-list-price"><span class="i-won">월</span>27,900<span class="i-won">원</span> <span class="i-installment">X 5개월</span></p></div></a></li>
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0002"><a href="/product/5924da7010"><div class="class-list-thumb"><img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/d4df71a0-09b7-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list"></div><div class="class-list-cont"><p class="class-list-lecturer-name">[원데이 클래스] 후아유</p><p class="class-list-name" style="padding:0 100px 0 0;">프랑스자수 마리몬드 목련 파우치 클래스</p><p class="class-list-discount"><span class="i-percent">10%</span> <span class="i-regular"><s>30,000원</s></span></p><p class="class-list-price">27,000<span class="i-won">원</span></p></div></a></li>  -->
				
				<!-- 정규 클래스 -->
				<li class="class-list hf-tracker-item" data-tracker-id="FE-R-0002">
					<a href="/product/3d6fc1a6a2">
						<div class="class-list-thumb">
							<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/b9183250-09b6-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list">
						</div>
						<div class="class-list-cont">
							<p class="class-list-lecturer-name">[정규 클래스] 실버스노우</p>
							<p class="class-list-name" style="padding:0 150px 0 0;">실버스노우의 프랑스자수 기초 산책 클래스</p>
							<p class="class-list-discount">
								<span class="i-percent">10%</span>
								<span class="i-regular">138,600원</span>
							</p>
							<p class="class-list-price">
								<span class="i-won">월</span>27,720<span class="i-won">원</span>
								<span class="i-installment">X 5개월</span>
							</p>
						</div>
					</a>
				</li>
				
				<!-- 원데이 클래스 -->
				<li class="class-list hf-tracker-item" data-tracker-id="FE-K-0001">
					<a href="/product/c2c2658b0f">
						<div class="class-list-thumb">
							<img src="https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/class/thumbs/c4f0ec10-09b7-11ea-952c-efccbb50f547-resize.jpg" alt="" class="thumb-class-list">
						</div>
						<div class="class-list-cont">
							<p class="class-list-lecturer-name">[원데이 클래스] 꽃보다 자수, 안성희</p>
							<p class="class-list-name" style="padding:0 100px 0 0;">프랑스자수 카페 에코백 클래스</p>
							<p class="class-list-discount">
								<span class="i-percent">10%</span>
								<span class="i-regular"><s>30,000원</s></span>
							</p>
							<p class="class-list-price">27,000<span class="i-won">원</span></p>
						</div>
					</a>
				</li>
			</ul>
		</div>
		
		<div class="class-list-more-btn">
			<a href="javascript:;" title="more" class="btn-more" style="display: none;">more</a>
		</div>
	</div>
</div>

<div class="layer-wrap popup-wrap" id="popup-wrap"><div class="bg-layer-wrap" onclick="Popup.hide();"></div></div></div>

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

<script type="text/javascript" src="${path}/jquery/js/slider.js"></script>
<script type="text/javascript" src="${path}/jquery/js/page/class.js"></script> -->

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
<script type="text/javascript" id="">(function(c,a,d,e,g,b,f,h,k){a.className+=" "+d;b.end=f=function(){a.className=a.className.replace(RegExp(" ?"+d),"")};(c[e]=c[e]||[]).hide=b;setTimeout(function(){f();b.end=null},g)})(window,document.documentElement,"async-hide","dataLayer",4E3,{"GTM-KJXG8SF":!0});</script><div style="display: none; visibility: hidden;">
<script>!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version="2.0",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");fbq("init","299353887143885");fbq("set","agent","tmgoogletagmanager","299353887143885");fbq("track","PageView");</script>
<noscript></noscript>
</div><script type="text/javascript" id="" src="https://wcs.naver.net/wcslog.js"></script> 
<script type="text/javascript" id="" src="//wcs.naver.net/wcslog.js"></script><script type="text/javascript" id="" charset="UTF-8" src="//t1.daumcdn.net/adfit/static/kp.js"></script>
<div id="wp_tg_cts" style="display:none;"><script id="wp_id_script_1577960835117" src="//altg.widerplanet.com/delivery/wp.js"></script><script id="wp_tag_script_1577960835317" src="https://astg.widerplanet.com/delivery/wpc.php?v=1&amp;ver=4.0&amp;r=1&amp;md=bs&amp;ga=1f0jdac-12eem6g-3-1&amp;eid=4-c0ddd7761b856f425b45f768009eaed9e1ee3dc47cfe34126f2838cdee1f556517cec466282959ba995b9118bf491ebbab7fc76170dda909f9b452265d96d9f57fc92cc71dd9ca451d050d8581fb2884&amp;ty=Home&amp;ti=45752&amp;device=web&amp;charset=UTF-8&amp;tc=1577960835317&amp;ref=https%3A%2F%2Fhobbyful.co.kr%2F&amp;loc=https%3A%2F%2Fhobbyful.co.kr%2Flist%2Fclass"></script></div>
<script type="text/javascript" id="">var wptg_tagscript_vars=wptg_tagscript_vars||[];wptg_tagscript_vars.push(function(){return{wp_hcuid:"",ti:"45752",ty:"Home",device:"web"}});</script>
<script type="text/javascript" id="" src="//cdn-aitg.widerplanet.com/js/wp_astg_4.0.js"></script>
<script type="text/javascript" id="">if(!wcs_add)var wcs_add={};wcs_add.wa="6bf8dd6c3518c8";wcs_do();</script> 
<script type="text/javascript" id="">if(!wcs_add)var wcs_add={};wcs_add.wa="s_3dfbd0909345";if(!_nasa)var _nasa={};wcs.inflow();wcs_do(_nasa);</script>

<script type="text/javascript" id="">kakaoPixel("3085303044582687524").pageView();</script>
<div id="fb-root" class=" fb_reset"><div style="position: absolute; top: -10000px; width: 0px; height: 0px;"><div><iframe name="fb_xdm_frame_https" id="fb_xdm_frame_https" aria-hidden="true" title="Facebook Cross Domain Communication Frame" tabindex="-1" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" src="https://staticxx.facebook.com/connect/xd_arbiter.php?version=45#channel=f24f9f65ab3afe8&amp;origin=https%3A%2F%2Fhobbyful.co.kr" style="border: none;"></iframe></div><div></div></div></div><iframe src="https://bid.g.doubleclick.net/xbbe/pixel?d=KAE" style="display: none;"></iframe><div id="ch-plugin"><div id="ch-plugin-script" style="display:none"><iframe id="ch-plugin-script-iframe" style="position:relative!important;height:100%!important;width:100%!important;border:none!important;"></iframe></div><div id="ch-plugin-core"><style data-styled="" data-styled-version="4.3.2"></style><style data-styled="" data-styled-version="4.3.2"></style><div hidden="" class="sc-erNlkL hhoMbs sc-RbTVP hrWefY"><div class="sc-eNNmBn cXBieY"><div name="push-exit" width="45" height="45" size="24" class="sc-dnqmqq sc-cBrjTV iByMcc"></div><div class="sc-jUpvKA ccOxya"><div size="34" class="sc-kGXeez kGMzSU"></div><div class="sc-fkyLDJ epSaPl">(알 수 없음)</div><div class="sc-iCwjlJ hRSOFL">9:00am</div></div><div class="sc-eopZyb bYeAnX"><div class="sc-jRuhRL coGTKb"><span class=""></span></div></div></div></div><div hidden="" class="sc-kEmuub LrWLn sc-RbTVP hrWefY"><div class="sc-eNNmBn cXBieY"><div name="push-exit" width="45" height="45" size="24" class="sc-dnqmqq sc-cBrjTV iByMcc"></div><div class="sc-jUpvKA ccOxya"><div size="34" class="sc-kGXeez kGMzSU"></div><div class="sc-fkyLDJ epSaPl">(알 수 없음)</div><div class="sc-iCwjlJ hRSOFL">9:00am</div></div><div class="sc-eopZyb bYeAnX"><div class="sc-jRuhRL coGTKb"><span class=""></span></div></div></div></div><style data-styled="" data-styled-version="4.3.2"></style><div size="300" class="sc-bwzfXH hMnCjf"></div><div class="sc-bxivhb fdmBti"><div class="sc-ifAKCX ccgoiG"><div class="textLauncherContent sc-EHOje iuJdHe">채팅 문의하기</div><div class="textLauncherIcon sc-bZQynM ebmtqw"><div hidden="" class="sc-htpNat sc-htoDjs jiXddj">0</div></div></div></div></div></div><style data-styled="" data-styled-version="4.3.2"></style></body>
</body>
</html>