/**
 * Created by Nalrarang on 2017. 4. 10
 */
/**
Class Page Script
@namespace classList
@author nalrarang@gmail.com
@logs 20170410:Nalrarang update
*/

var classList = (function(){
    var IMG_URL = null; //'https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/';
    var classSlider = {};
    var listTotal = 0;
    var classSliderInterval = '';
    var page = 1;
    var amount = 100;

    var getClassBannerList = function(){

        if(HF.DATA.params.categoryDepth1 === 'class') {
            ApiRequest.get('/class/banners', {
            }, function(res){
                drawClassBanner(res);
            }, function(err){
                console.log(err);
            });
        } else if(HF.DATA.params.categoryDepth1 === 'diystore') {
            drawClassBanner({
                list : [
                    {
                        cb_content1: "도안, DIY키트부터 재료와 도구까지",
                        cb_content2: "혼자서도 잘해요! 하비풀 DIY 스토어",
                        cb_enddate: "2021-02-05T15:00:00.000Z",
                        cb_idx: 19,
                        cb_image: "bn_store.jpg",
                        cb_link: "https://hobbyful.co.kr/view-magazine.html?id=206",
                        cb_ordernum: 1,
                        cb_regdate: "2019-09-10T00:53:07.000Z",
                        cb_startdate: "2019-09-09T15:00:00.000Z",
                        cb_title: "NEW SERVICE",
                        cb_type: "LEFT",
                    }
                ]
            });
        } else {
            $('#img-slide-wrap').hide();
        }
    };

    var drawClassBanner = function(res){
        $('.img-slide-cont').empty();
        var html = '';
        $.each(res.list, function(idx){
            var slide_type = 'img-slide-type02';
            if(this.cb_type == "LEFT") {
                slide_type = 'img-slide-type02';
            } else if(this.cb_type == "CENTER") {
                slide_type = 'img-slide-type01';                
            } else {
                slide_type = 'img-slide-type03';                
            }

            html += '<li class="img-slide img-slide0'+ (idx+1) +' hf-tracker-item" data-tracker-id="' +this.cb_idx+ '">';
            html += '<a href="'+ this.cb_link +'" title="'+ this.cb_content2 +'" class="btn-img-slide">';
            html += '<span class="img-slide-img" style="background-image:url('+ IMG_URL + 'classbanner/' + this.cb_image +');"></span>';
            html += '<div class="img-slide-area2 '+ slide_type +'">';
            html += '<strong class="img-slide-tit">'+ this.cb_title +'</strong>';
            html += '<span class="img-slide-txt">';
            html += this.cb_content1;
            html += '<span class="bold">'+ this.cb_content2 +'</span>';
            html += '</span>';
            html += '<button type="button" class="btn-slide-go">자세히 보기</button>';
            html += '</div>';
            html += '</a>';
            html += '</li>';
        });
        $('.img-slide-cont').append(html);
        classSlderControl(res.list.length-1);


        var $trackerGroup = $('.img-slide-cont');
        _.each(res.list, function(item, i){
            HF.tracker.setItemDataToElement($trackerGroup, item.cb_idx, {
                name : item.cb_title
            });
        });
        HF.tracker.sendViewingItemsByGroup($trackerGroup);
        
    };

    var classSlderControl = function(count){
        classSlider = new Slider();
        classSlider.init($('ul.img-slide-cont'), count);

        var sliderAutoRepeat = function(sec){
            sec = sec || 4000;
            clearInterval(classSliderInterval);
            classSliderInterval = setInterval(function(){
                classSlider.next();
                afterMove();
            }, sec)
        };

        var afterMove = function(){
            var index = classSlider.index;
            $('.paging-btn').removeClass('active');
            $('.paging-btn0' + index).addClass('active');
            HF.tracker.sendViewingItemsByGroup($('.img-slide-cont'));
        };

        $('.paging-cont').empty();
        var html = '';
        for(var i=0; i<=count; i++){
            if(i == 0){
                html += '<button type="button" class="paging-btn paging-btn0'+ i +' active">'+ i +'</button>';            
            } else {
                html += '<button type="button" class="paging-btn paging-btn0'+ i +'">'+ i +'</button>';
            }
        }
        $('.paging-cont').append(html);

        $('.paging-btn-prev').on('click', function(){
            classSlider.prev();
            afterMove();
            sliderAutoRepeat();
        });
        $('.paging-btn-next').on('click', function(){
            classSlider.next();
            afterMove();
            sliderAutoRepeat();
        });
        $('.paging-btn').on('click', function(){
            classSlider.move($(this).index());
            afterMove();
            sliderAutoRepeat();
        });

        sliderAutoRepeat();
    };
    
    var drawClassCategoryList = function(parentPath, callback){
        ApiRequest.get('/class/category/'+parentPath)
            .then(function(res){
                var template = $.templates([
                    '<li class="tab-class"><a href="/list/',parentPath,'" data-path="' ,parentPath, '" data-fullpath="' ,parentPath, '" title="전체" class="btn-tab-class btn-tab-on">전체</a></li>',
                    '{{for list}}',
                    '   <li class="tab-class"><a href="/list/{{:full_path}}" data-path="{{:path}}" data-fullpath="{{:full_path}}" class="btn-tab-class">{{:name}}</a></li>',
                    '{{/for}}'
                ].join(''));

                var $el = $('.tab-class-list').html(
                    template.render({
                        list : res.data
                    })
                );

                if(callback) callback(res, $el);
                return [res, $el];
            })
            .catch(function(err){
                console.log(err);
            })
        ;
    };

    var getClassList = function(categoryPath){
        var param = {
            "amount": amount,
            "page": page,
            "categoryPath" : categoryPath
        };

        ApiRequest.get('/class/list', param, function(res){
            listTotal = res.count;
            drawClassList(res);
        }, function(err){
            console.log(err);
        });
    };

    var drawClassList = function(res){
        var $listWrap = $('#allList');

        if(page == 1){
            var trackerGroupId = ['/list', HF.DATA.params.categoryGroup, HF.DATA.params.categoryUid||''].join('/').replace(/\/$/,'');
            $listWrap.attr('data-tracker-id', trackerGroupId).empty();
        }
        var html = '';
        $.each(res.list, function(){
            var regularPrice = Utils.numberWithCommas(parseInt(this.price_regular));
            var price = Utils.numberWithCommas(parseInt(this.price));

            html += '<li class="class-list hf-tracker-item" data-tracker-id="' +this.code+ '">';
            html += '<a href="/product/'+ this.uid +'">';
            html += '<div class="class-list-thumb">';
            html += '<img src="'+ IMG_URL + 'class/thumbs/' + this.thumbnail +'" alt="" class="thumb-class-list" />';

            if(this.is_soldout === 'Y') {
                html += '<p class="i-soldout"><span>일시 품절</span></p>';
            }

            html += '</div>';
            html += '<div class="class-list-cont">';
            // html += '<p class="class-list-lecturer-img"><img src="' +IMG_URL+ 'lecturer/' +this.lecturer_picture+ '" alt=""></p>';
            html += '<p class="class-list-lecturer-name">[' +HF.CODE.productSubType[this.subtype]+ '] ' +this.seller_name+ '</p>';
            if(this.installment_month > 1) {
                html += '<p class="class-list-name" style="padding:0 150px 0 0;">'+ this.name +'</p>';
                html += '<p class="class-list-discount">';
                if(this.discount_rate) {html += '<span class="i-percent">' + this.discount_rate + '%</span> ';}
                html += '<span class="i-regular">' + price + '원</span>';
                html += '</p>';
                html += '<p class="class-list-price"><span class="i-won">월</span>'+ Utils.numberWithCommas(Math.floor(this.price / this.installment_month)) +'<span class="i-won">원</span> <span class="i-installment">X '+ this.installment_month +'개월</span></p>';
            } else {
                html += '<p class="class-list-name" style="padding:0 100px 0 0;">'+ this.name +'</p>';
                if(this.discount_rate) {
                    html += '<p class="class-list-discount">' +
                        '<span class="i-percent">' + this.discount_rate + '%</span> ' +
                        '<span class="i-regular"><s>' + regularPrice + '원</s></span>' +
                        '</p>'
                    ;
                }
                html += '<p class="class-list-price">'+ price +'<span class="i-won">원</span></p>';
            }
            html += '</div>';
            html += '</a>';
            html += '</li>';
        });
        $listWrap.append(html);
        if(listTotal <= page*amount) {
            $('.btn-more').hide();
        } else {
            $('.btn-more').show();
        }



        var $trackerGroup = $listWrap;
        _.each(res.list, function(item, i){
            HF.tracker.setItemDataToElement($trackerGroup, item.code, {
                id : item.code,
                name : item.name,
                category : item.genre_name,
                brand : item.seller_name,
                dimension1 : item.subtype,
                dimension2 : item.class_uid
            });
        });
        HF.tracker.sendViewingItemsByGroup($trackerGroup);

    };

    var activateCategoryList = function(parentPath){
        parentPath = parentPath || HF.DATA.params.categoryDepth1;

        drawClassCategoryList(parentPath, function(data, $list){

            var selectCategory = function(categoryPath){
                var $el = $list.find('.btn-tab-class[data-fullpath="' +(categoryPath)+ '"]');

                $list.find('.btn-tab-class').removeClass('btn-tab-on');
                $el.addClass('btn-tab-on');

                page = 1;
                amount = 100;

                HF.DATA.params.categoryPath = categoryPath;
                HF.DATA.params.categoryDepth1 = categoryPath.split('/')[0];
                HF.DATA.params.categoryDepth2 = categoryPath.split('/')[1];
                getClassList(HF.DATA.params.categoryPath);
            };

            $list.on('click', '.btn-tab-class', function(e){
                e.preventDefault();

                var $this = $(this);
                var categoryPath = $this.data('fullpath');

                selectCategory(categoryPath);

                window.history.pushState({
                    categoryPath : categoryPath
                }, null, '/list/'+categoryPath);
            });

            window.history.replaceState({
                categoryPath : HF.DATA.params.categoryPath
            }, null);

            selectCategory(HF.DATA.params.categoryPath);

            window.onpopstate = function(event) {
                selectCategory(event.state.categoryPath);
            };

        });
    };

    var listener = function(){
        // $('.btn-more').off('click').on('click', function(e){
        //     e.preventDefault();
        //     page++;
        //     getClassList(product_genre_id);
        // });
    };

    return {
        init: function(){
            IMG_URL = HF.DATA.s3.uri + '/';


            if(['class','diystore'].indexOf(HF.DATA.params.categoryDepth1) > -1) {
                $('#classListHeader').remove();
                getClassBannerList();
                activateCategoryList();
            } else {
                $('#img-slide-wrap').remove();

                var path = HF.DATA.params.categoryPath.replace(/\//g, '|');
                ApiRequest.get('/class/category/'+path+'/props').then(function(res){
                    $('#classListHeader').html('<h2>' +res.data.name+ '</h2><span>' +(res.data.description||'')+ '</span>');
                });

                getClassList(HF.DATA.params.categoryPath);
            }

            listener();
        }
    }
})();

HF.ready(function(){
    classList.init();
});