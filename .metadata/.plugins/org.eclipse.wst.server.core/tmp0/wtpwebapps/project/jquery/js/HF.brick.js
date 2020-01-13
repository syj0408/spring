/**
 *
 * @module HF.brick
 * @example
 *
 *
 * <div class="hfb" data-type="categorySlide" data-value="recommended"></div>
 *
 *
 */

(function(global){
    'use strict';

    var HF = global.HF;
    var brick = global.HF.brick = {


        /**
         * 초기화
         * @param userInfo
         */
        init : function(userInfo){

        },

        categorySlideList : function($el, parentId){
            var template = $.templates(templates.categorySlideList);
            var list;

            $el = $($el);

            ApiRequest.get('/class/category/'+parentId, { 'isContainProducts' : 'Y' })
                .then(function(res){
                    list = res.data;
                })
                .then(function(r){

                    // 렌더링
                    $el.html(template.render({
                        list : list
                    }));

                    // 스와이프 및 트래커 활성화
                    _.forEach(list, function(categoryItem, i){
                        var slideEl = $el.find('.hfb-categorySlideList')[i];
                        var $slideEl = $(slideEl);

                        var swiperItem = new Swiper(slideEl, {
                            navigation: {
                                nextEl: '.i-next',
                                prevEl: '.i-prev',
                            },
                            slidesPerView : 5,
                            spaceBetween: 18,
                            breakpoints: {
                                330 : {
                                    slidesPerView: 1.2
                                },
                                440: {
                                    slidesPerView: 1.5
                                },
                                600: {
                                    slidesPerView: 1.8
                                },
                                750: {
                                    slidesPerView: 2.2
                                },
                                970: {
                                    slidesPerView: 3.2
                                },
                                1200: {
                                    slidesPerView: 3
                                },
                                2000: {
                                    slidesPerView: 4
                                }
                            }
                        });

                        _.each(categoryItem.products, function(item, i){
                            HF.tracker.setItemDataToElement($slideEl, item.code, {
                                id : item.code,
                                name : item.name,
                                category : item.genre_name,
                                brand : item.seller_name,
                                dimension1 : item.subtype,
                                dimension2 : item.uid
                            });
                        });
                        HF.tracker.sendViewingItemsByGroup($slideEl);

                        swiperItem.on('slideChange', function() {
                            HF.tracker.sendViewingItemsByGroup($slideEl);
                        });

                    });

                })
            ;
        }


    };




    var templates = {
        categorySlideList : [
            '{{for list}}',
            '<section class="hfb-categorySlideList hf-tracker-group {{if description}}s-hasdesc{{/if}}" data-tracker-type="impression" data-tracker-id="/list/{{:full_path}}">',
            '   <header><a href="/list/{{:full_path}}"><h4>{{:name}}</h4><span class="i-desc">{{:description}}</span></a></header>',
            '   <button type="button" class="f-nav i-prev">이전</button>',
            '   <button type="button" class="f-nav i-next">다음</button>',
            '       <ul class="swiper-wrapper">',
            '           {{for products}}',
            '           <li class="swiper-slide hf-tracker-item" data-tracker-id="{{:code}}">',
            '               <a href="/product/{{:uid}}">',
            '                   <p class="i-img"><img src="{{*:HF.DATA.s3.uri}}/class/thumbs/{{:thumbnail}}" alt=""></p>',
            '                   <p class="i-desc"><span class="i-type">{{code:"productSubType" subtype}}</span> <span class="i-seller">by {{:seller_name}}</span></p>',
            '                   <p class="i-name">{{:name}}</p>',
            '               </a>',
            '           </li>',
            '           {{/for}}',
            '       </ul>',
            '</section>',
            '{{/for}}'
        ].join('')
    };
})(window);