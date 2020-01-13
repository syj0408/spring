/**
 * Created by Nalrarang on 2017. 3. 21
 */
/**
Main화면 Script File
@namespace Main
@author nalrarang@gmail.com
@logs 20170321:Nalrarang update
@logs 20170321:Nalrarang Banner
@logs 20170322:Nalrarang Class, Magazine, Instagram

*/

var Main = (function(){
    'user strict';
    var _elem = {
        'mainBanner' : $('ul.img-slide-cont'),
        'planBanner' : $('div.recommend-list')
    }    
    var IMG_URL = null; //'https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/';
    var mainSwiper = {};
    var hobbySwiper = {};
    var magazineSwiper = {};


    /* Banner */
    var getBannerList = function(){
        ApiRequest.get('/env/banners', {}, function(res){
            drawSlideBanner(res.slide);
        }, function(err){
            console.log(err);
        });
    };

    var drawProductSlideList = function(){
        HF.brick.categorySlideList('#recommendSlideList', 3);
    };
    
    var drawSlideBanner = function(data){
        var template = $.templates('#mainSlideTemplate');

        $('#mainSlideContent').html(template.render({
            list : _.map(data, function(item){
                var temp = item.hb_textstyle.split('_');

                item.display = {
                    // 타입
                    // IMAGE, TEXT
                    bgScale : item.hb_bgscale.toLowerCase(),

                    // 텍스트정렬
                    textStyle : temp[0].toLowerCase(),

                    // 버튼노출유무
                    isUseButton : (temp[1] === 'BUTTON')
                };

                item.img_url_pc = IMG_URL + 'banners/' + item.hb_image;
                item.img_url_mobile = IMG_URL + 'banners/' + (item.hb_image_mobile || item.hb_image);

                return item;
            })
        }));

        mainSwiper = new Swiper('#mainSlide', {
            slidesPerView: 'auto',
            centeredSlides: true,
            // slidesPerView: 1,
            loop : true,
            navigation: {
                nextEl: '.paging-btn-next',
                prevEl: '.paging-btn-prev',
            },
            pagination: {
                el: '.paging-cont',
                bulletClass : 'paging-btn',
                bulletActiveClass : 'active'
            },
            autoplay: {
                delay: 4000
            },

            breakpoints: {
                // // when window width is <= 320px
                // 380: {
                //     slidesPerView: 1
                //     // spaceBetween: 10
                // },
                970: {
                    // slidesPerView: 3
                    // spaceBetween: 10
                },
                // // when window width is <= 480px
                // 480: {
                //     slidesPerView: 2,
                //     spaceBetween: 20
                // },
                // // when window width is <= 640px
                // 640: {
                //     slidesPerView: 3,
                //     spaceBetween: 30
                // }
            }
        });

        var $trackerGroup = $('#mainSlide');
        _.each(data, function(item, i){
            HF.tracker.setItemDataToElement($trackerGroup, item.hb_idx, {
                name : item.hb_title
            });
        });
        HF.tracker.sendViewingItemsByGroup($trackerGroup);

        mainSwiper.on('slideChange', function() {
            HF.tracker.sendViewingItemsByGroup($trackerGroup);
        });
    };

    var getKitClass= function(){
        ApiRequest.get("/class/kit", {}, function(res){
            //console.log(res);
            drawPlanBanner(res.list);
        }, function(err){
            console.log(err);
        });      
    }


    var drawPlanBanner = function(data){
        _elem.planBanner.empty();
        var template = '';
        $.each(data, function(idx){
            template += '<li class="recommend"><a href="package-class.html?id='+ this.kit_idx +'" title=""><img src="' + IMG_URL + 'class/kit/' + this.kit_image +'" alt="'+ this.kit_title +'" class="img-recommend" /></a></li>';
            if(idx == 1) {
                return false;
            }
        });
        _elem.planBanner.append(template);
    }

    var setServiceBanner = function(){
        $('.hf-info-wrap').empty();
        var html = '';
        if(!User.isLoginCheck()){
            html += '<div class="hf-info-cont s-guest">';
            html += '<div class="hf-info-txt">';
            html += '안녕하세요!<br/>';
            html += '일상에서 취미를 만나는 가장 쉬운 방법 하비풀!<br/>';
            html += '지금 함께 알아볼까요?';
            html += '</div>';
            html += '<a href=view-magazine.html?id=1" class="btn-hf-info" title="서비스 이용안내">서비스 이용안내</a>';
            html += '</div>';

            $('.hf-info-wrap').append(html);
        } else {
            ApiRequest.get("/myclass", {}, function(res){

                var userInfo = User.getUserInfo();
                var profile_img;
                if(userInfo.user_profileimage){
                    profile_img = IMG_URL + 'profile/' + userInfo.user_profileimage.replace('-small.','-thumb1.')+'?'+Math.random();
                } else {
                    profile_img = '../static/img/bg-add-thumb.png';
                }

                //console.log(res);
                var html = '';                
                html += '<div class="hf-info-cont">';
                html += '<div class="hf-info-txt">';
                html += '<a href="/mypage.html"><div class="photo-thumb block">';
                html += '<img src="' +profile_img+ '" onError="this.src=\'../static/img/ico-profile.svg\'" />';
                html += '</div></a>';
                if(res.list.length == 0){
                    html += '안녕하세요 <a class="bold underline" style="color: #f1645d" href="/mypage.html" >'+ userInfo.user_nickname +'</a>님,<br/>';
                    html += '아직 구독중인 취미가 없으시군요!<br/>';
                    html += '하비풀과 함께 원하는 취미를 찾아보세요.';
                    html += '</div>';
                    html += '<a href="/class.html" class="btn-hf-info" title="취미 클래스 둘러보기">취미 클래스 둘러보기</a>';
                    html += '</div>';   
                    
                    $('.hf-info-wrap').append(html);                  
                } else {
                    var isComplete = true;
                    $.each(res.list, function(){
                        if(this.playble == 0) {
                            isComplete = false;
                        }
                    });
                    if(isComplete){
                        html += '안녕하세요 <a class="bold underline"  style="color: #f1645d" href="/mypage.html">'+ userInfo.user_nickname +'</a>님,<br/>';
                        html += '새로운 취미를 시작하기 딱 좋은 타이밍!<br/>';
                        html += '어떤 취미가 있는지 둘러보시겠어요?';
                        html += '</div>';
                        html += '<a href="/class.html" class="btn-hf-info" title="취미 클래스 둘러보기">취미 클래스 둘러보기</a>';
                        html += '</div>';   
                    } else {
                        html += '안녕하세요 <a class="bold underline"  style="color: #f1645d" href="/mypage.html">'+ userInfo.user_nickname +'</a>님,<br/>';
                        html += '재미있게 만들고 계신가요?<br/>';
                        html += '오늘도 하비풀과 함께 취미로운 일상을 만나보세요!';
                        html += '</div>';
                        html += '<a href="/myclass.html" class="btn-hf-info" title="내 클래스 바로가기">내 클래스 바로가기</a>';
                        html += '</div>';   
                    }
                    $('.hf-info-wrap').append(html);                    
                }
            }, function(err){
                var html = '';
                html += '<div class="hf-info-cont s-guest">';
                html += '<div class="hf-info-txt">';
                html += '안녕하세요!<br/>';
                html += '일상에서 취미를 만나는 가장 쉬운 방법 하비풀!<br/>';
                html += '지금 함께 알아볼까요?';
                html += '</div>';
                html += '<a href="/service.html" class="btn-hf-info" title="서비스 이용 안내">서비스 이용 안내</a>';
                html += '</div>';

                $('.hf-info-wrap').append(html);
            });
        }
    };


    var setDeliveryDay = function(){
        var dayObj = Utils.bizCal.getAllSetDate(new Date(), new Date());
        var dayDiff = Math.ceil(dayObj.diff(new Date(), 'days', true));
        $('.delivery-info-tit').text(
            (dayObj.month()+1)
            + '월 '
            + (dayObj.date())
            +'일('
            + (dayDiff ? 'D-'+dayDiff : '오늘')
            +')'
        );
    };

    /* 추천 취미 클래스 리스트 가져오기 */
    var getClassList = function(){
        ApiRequest.get('/class/content', {
             "recommend": "Y",
             "categoryGroup": "class",
             "amount": 30,
             "orderby" : 'LAUNCH'
        }, function(res){
            drawClassList(res);
        }, function(err){
            console.log(err);
        });
    };



    /* 추천 취미 클래스 영역 그리기 */
    var drawClassList = function(data){
        return;
        $('.recommend-hobby-class').empty();
        var template = '';
        template += '<div class="swiper-wrapper">';
        $.each(data.list, function(idx){
            template += '<div class="swiper-slide thumb-hobby hf-tracker-item" data-tracker-id="' +this.class_code+ '">';
            template += '<a href="/product/'+ this.class_uid +'" class="thumb-slide-link" title="'+ this.class_name +'">';
            template += '<img src="'+ IMG_URL + 'class/thumbs/'+ this.class_thumbnail.replace('-resize', '-square') +'" class="thumb-slide-img class-slide-img" alt="'+ this.class_name +'" />';
            template += '<span class="thumb-slide-link-txt">'+ this.class_name +'</span>';
            template += '</a>';
            template += '</div>';
        });
        template += '</div>';
        $('.recommend-hobby-class').append(template);

        /* Slider 기능 */
        hobbySwiper = new Swiper ('.recommend-hobby-class', {
            slidesPerView: 5,
            slidesOffsetBefore : 0,
            slidesOffsetAfter : 0,
            breakpoints: {
                440: {
                    loop : true,
                    centeredSlides: true,
                    spaceBetween: 20,
                    slidesPerView: 2
                },
                650:{
                    loop : true,
                    centeredSlides: true,
                    spaceBetween: 20,
                    slidesPerView: 2.5
                },
                750:{
                    slidesOffsetBefore : 40,
                    slidesOffsetAfter : 40,
                    centeredSlides: false,
                    spaceBetween: 20,
                    slidesPerView: 3
                },
                970:{
                    slidesOffsetBefore : 40,
                    slidesOffsetAfter : 40,
                    centeredSlides: false,
                    spaceBetween: 20,
                    slidesPerView: 4
                },
                1200:{
                    centeredSlides: false,
                    spaceBetween: 50,
                    slidesPerView: 3
                },
                1700:{
                    centeredSlides: false,
                    spaceBetween: 50,
                    slidesPerView: 4
                }
                // 480: { slidesPerView: 1 },
                // 620: { slidesPerView: 2 },
                // 1200: { slidesPerView: 4 },
                // 1500: { slidesPerView: 4 },
                // 1600: { slidesPerView: 4 },
                // 1920: { slidesPerView: 4 }
            },
        });  
        $('.hobby-btn-prev').off('click').on('click', function(){
            hobbySwiper.slidePrev();
        });
        $('.hobby-btn-next').off('click').on('click', function(){
            hobbySwiper.slideNext();
        });


        var $trackerGroup = $('#recommendClassSlide');
        _.each(data.list, function(item, i){
            HF.tracker.setItemDataToElement($trackerGroup, item.class_code, {
                id : item.class_code,
                name : item.class_name,
                // category : data.genre,
                brand : item.lecturer_name,
                // dimension1 : data.type,
                dimension2 : item.class_uid
            });
        });
        HF.tracker.sendViewingItemsByGroup($trackerGroup);

        mainSwiper.on('slideChange', function() {
            HF.tracker.sendViewingItemsByGroup($trackerGroup);
        });

    }
    /* Magazine */
    var getMagazineList = function(){
        ApiRequest.get('/magazine/content', {
            // "recommend": "Y"            
            amount:40
        }, function(res){
            drawMagazineList(res);
        }, function(err){
            console.log(err);
        });
    };

    var drawMagazineList = function(data){
        $('.recommend-magazine-class').empty();
        var template = '';
        template += '<div class="swiper-wrapper">';        
        $.each(data.list, function(){
            if(this.mz_video != '' && this.mz_video != "undefined"){
                template += '<li class="swiper-slide thumb-slide play-on">';
            } else {
                template += '<li class="swiper-slide thumb-slide">';
            }
            template += '<a href="view-magazine.html?id='+ this.mz_idx +'" class="thumb-slide-link" title="'+ this.mz_title +'">';
            template += '<img src="'+ IMG_URL + 'magazine/' + this.mz_thumbnail +'" class="thumb-slide-img" alt="'+ this.mz_title +'" />';
            template += '<span class="thumb-slide-play">재생</span>';
            template += '</a>';
            template += '<span class="thumb-slide-link-type">'+ this.mz_title2 +'</span>';
            template += '<span class="thumb-slide-link-tit">'+ this.mz_title +'</span>';
            template += '</li>';
        });

        template += '</div>';             

        $('.recommend-magazine-class').append(template);
        
        /* 추천 매거진 Slider */
       magazineSwiper = new Swiper ('.recommend-magazine-class', {
            slidesPerView: 4,
            spaceBetween: 15,
            breakpoints: {
                440: {
                    slidesOffsetBefore : 0,
                    slidesOffsetAfter : 0,
                    centeredSlides: true,
                    spaceBetween: 10,
                    slidesPerView: 1.3
                },
                650:{
                    slidesOffsetBefore : 40,
                    slidesOffsetAfter : 40,
                    centeredSlides: false,
                    spaceBetween: 10,
                    slidesPerView: 1.7
                },
                750:{
                    slidesOffsetBefore : 40,
                    slidesOffsetAfter : 40,
                    centeredSlides: false,
                    spaceBetween: 10,
                    slidesPerView: 2.4
                },
                970:{
                    slidesOffsetBefore : 40,
                    slidesOffsetAfter : 40,
                    centeredSlides: false,
                    spaceBetween: 10,
                    slidesPerView: 3.5
                },
                1400:{
                    centeredSlides: false,
                    spaceBetween: 10,
                    slidesPerView: 3.5
                },
                1700:{
                    centeredSlides: false,
                    spaceBetween: 50,
                    slidesPerView: 4
                }
                // 320: { slidesPerView: 1 },
                // 480: { slidesPerView: 1 },
                // 620: { slidesPerView: 2 },
                // 970: { slidesPerView: 3, spaceBetween: 15},
                // 1120: { slidesPerView: 3 },
                // 1400: { slidesPerView: 4, spaceBetween: 15 },
                // 1600: { slidesPerView: 4, spaceBetween: 30 }
            },
        });     

        $('.magazine-btn-prev').off('click').on('click', function(){
            magazineSwiper.slidePrev();
        });
        $('.magazine-btn-next').off('click').on('click', function(){
            magazineSwiper.slideNext();
        });

    };

    var getAwardList = function(){
        /* 임시 */
        $('.banner-award-wrap').hide();
        //return false;
        ApiRequest.get("/award", {}, function(res){

            drawAwardList(res);
        }, function(err){
            console.log(err);
        });
    };
    var drawAwardList = function(res){
        if(!res|| !res.list.length) return;

        var remainTime = moment(res.list[0].award_pollenddate).utcOffset("+09:00").diff(moment(), 'minutes')
        var award_status = '';
        if(remainTime <= 0){
            award_status = 'end';        
        }

        $('.banner-award-wrap').empty();
        $('.banner-award-wrap').css({'background': 'url(' + IMG_URL + 'award/cover/' + res.list[0].award_cover +') no-repeat', 'background-size' : 'cover'});
        var html = '';
        // $.each(res.list, function(){
//	        console.log(res.list[0].award_number)
        html += '<div class="banner-award-tit">#나의하비풀한순간</div>';
        if(award_status == 'end'){
            html += '<div class="banner-award-txt"><span class="banner-award-br">'+res.list[0].award_number+'월 취미 어워드 수상자를 확인하세요!</div>';
            html += '<a href="/award.html" title="결과보러가기" class="btn-vote">결과보러가기</a>';
        } else {
            html += '<div class="banner-award-txt"><span class="banner-award-br">'+res.list[0].award_number+'월 취미 어워드 투표에 참여해주세요!</div>';
            html += '<a href="/award.html" title="투표하러가기" class="btn-vote">투표하러가기</a>';
        }
        // });
        $('.banner-award-wrap').append(html);
    };


    /* Instagram */
    var getInstagramList = function(){
        ApiRequest.get('/env/instaimage', {}, function(res){
            $('.hf-thumb-list').empty();
            var html = '';
            if(res.list.length%2 > 0){
                res.list.pop();
            }
            $.each(res.list, function(){
                this.thumbnail_src = this.thumbnail_src.replace('.jpg_nc_ht=', '.jpg?_nc_ht=');
                html += '<li class="hf-thumb"><a href="https://www.instagram.com/p/'+ this.code +'" target="_blank" class="thumb-link" title=""><img src="'+ this.thumbnail_src +'" class="thumb-img" alt="'+ this.caption +'" /></a></li>';
            });
            $('.hf-thumb-list').append(html);
        }, function(err){
            console.log(err);
        });
    };



    return {
        init: function(){
            IMG_URL = HF.DATA.s3.uri + '/';

            getBannerList();
            getKitClass();
            setServiceBanner();
            setDeliveryDay();
            getClassList();
            getMagazineList();
            // getAwardList();
            getInstagramList();
            Popup.notice();
            drawProductSlideList();
        }
    }
})();

HF.ready(function() {
    Main.init();
});