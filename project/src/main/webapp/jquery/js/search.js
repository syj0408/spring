/**
 * Created by Nalrarang on 2017. 4. 6
 */
/**
공통 Search Script
@namespace Menu
@author nalrarang@gmail.com
@logs 20170406:Nalrarang update
*/

var Search = (function(){
    var IMG_URL = null; //'https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/';
    var weekdayList = {
        'Monday': '월요일',
        'Tuesday': '화요일',
        'Wednesday': '수요일',
        'Thursday': '목요일',
        'Friday': '금요일',
        'Saturday': '토요일',
        'Sunday': '일요일'
    };

    var getRecommendKeyword = function(){
        ApiRequest.get("/search/recommandkeyword", {}, function(res){
            console.log(res);
            drawRecommendKeyword(res);
        }, function(err){
            console.log(err);
        });
    };

    var drawRecommendKeyword = function(res){
        $('.search-recommend-list').empty();
        var html = '';
        html += '<li class="search-keyword">이런 검색어는 어때요?</li>'
        $.each(res.keyword, function(){
            html += '<li class="search-keyword"><a href="#;" title="'+ this +'" class="search-keyword-link">'+ this +'</a></li>';
        });
        $('.search-recommend-list').append(html);


        document.getElementById('wrap').className='wrap search-on';
        document.getElementById('bg-menu-wrap').className = 'bg-menu-wrap bg-menu-on';
        $('body').addClass('on-regularbox-popup');
    };

    var searchKeyword = function(keyword){
        $('#search-cont').addClass('search-result-on');
        
        $('.search-keyword-text').empty();
        var keywordList = keyword.split(" ");
        var html = '';
        $.each(keywordList, function(){
            html += '<li class="search-txt">';
            html += '<a href="#search" title="'+ this +'" class="search-txt-link">'+ this +'</a><button type="button" class="btn-search-del">삭제</button>';        
            html += '</li>';            
        });
        $('.search-keyword-text').append(html);

        ApiRequest.get("/search", {
            "keyword" : keyword,
            "amount": 10,
            "page": 1
        }, function(res){
            console.log(res);
            var html = '';
            $('.search-result-tab-wrap').empty();
            html += '<a href="#search" title="클래스('+ res.class_amount +')" data-list="class" class="search-result-tab search-result-tab-on">클래스<span class="search-tab-ea">('+ res.class_amount +')</span></a>';
            html += '<a href="#search" title="매거진('+ res.magazine_amount +')" data-list="magazine" class="search-result-tab">매거진<span class="search-tab-ea">('+ res.magazine_amount +')</span></a>';
            $('.search-result-tab-wrap').append(html);
            
            html = '';
            $('.search-magazine-list').empty();
            $.each(res.magazine, function(){
                if(this.mz_video != ''){
                    html += '<li class="thumb-slide">';
                } else {
                    html += '<li class="thumb-slide">';
                }
                html += '<a href="view-magazine.html?id='+ this.mz_idx +'" class="thumb-slide-link" title="'+ this.mz_title +'">';
                html += '<img src="'+ IMG_URL + 'magazine/' + this.mz_thumbnail +'" class="thumb-slide-img" alt="'+ this.mz_title +'" />';
                html += '<span class="thumb-slide-play">재생</span>';
                html += '</a>';
                html += '<span class="thumb-slide-link-type">'+ this.mz_title2 +'</span>';
                html += '<span class="thumb-slide-link-tit">'+ this.mz_title +'</span>';
                html += '<span class="thumb-slide-link-info">';
                html += moment(this.mz_regdate).format("YYYY.MM.DD ") + weekdayList[moment(this.mz_regdate).format("dddd")] + ' ';
                html += '<em class="thumb-slide-link-nick">by hobbyful</em>';
                html += '</span>';
                html += '</li>';
            });
            $('.search-magazine-list').append(html).hide();

            html = '';
            $('.search-class-list').empty();
            
            $.each(res.class, function(){
                html += '<li class="class-list">';
                html += '<a href="/product/'+ this.class_uid +'" title="'+ this.class_name +'">';
                html += '<div class="class-list-thumb">';
                html += '<img src="'+ IMG_URL + 'class/thumbs/' + this.class_thumbnail + '" alt="" class="thumb-class-list" />';
                html += '</div>';
                html += '<div class="class-list-cont">';
                html += '<p class="class-list-txt">'+ this.class_name2 +'</p>';
                html += '<p class="class-list-info">'+ this.class_name +'</p>';
                html += '</div>';
                html += '</a>';
                html += '</li>';
            });
            $('.search-class-list').append(html);


            $('.search-result-tab').off('click').on('click', function(){
                $('.search-result-tab').removeClass('search-result-tab-on');
                $(this).addClass('search-result-tab-on');

                if($(this).attr('data-list') == "magazine"){
                    $('.search-magazine-list').show();
                    $('.search-class-list').hide();
                } else {
                    $('.search-magazine-list').hide();
                    $('.search-class-list').show();                    
                }
            });

        }, function(err){
            console.log(err);
        })
    }


    var setSearchView = function(){
        var html = '';

        html += '<div class="search-cont" id="search-cont">';
        html += '<h2 class="search-tit">검색</h2>';
        html += '<div class="search-area">';
        html += '<button type="button" class="btn-search2">검색</button>';
        html += '<div class="search-input-wrap">';
        html += '<input type="text" placeholder="클래스와 매거진을 검색해 보세요!" class="search-input" />';
        html += '<ul class="search-txt-list search-keyword-text">';
        html += '</ul>';
        html += '</div>';
        html += '<button type="button" class="btn-search-close" onclick="hideSearch();">닫기</button>';
        html += '</div>';
        html += '<div class="search-keyword-wrap">';
        html += '<div class="search-keyword-tit">이런 검색어는 어때요?</div>';
        html += '<ul class="search-keyword-list search-recommend-list">';
        html += '</ul>';
        html += '</div>';
        html += '<div class="search-result-wrap">';
        html += '<div class="search-result-tab-wrap">';
        html += '</div>';
        html += '<div class="search-result-cont thumb-slide-type02">						';
        html += '<ul class="thumb-slide-list search-magazine-list">';
        html += '</ul>';
        html += '</div>';
        html += '<div class="search-result-cont">';
        html += '<ul class="class-list-wrap search-class-list">';
        html += '</ul>';
        html += '</div>';
        html += '</div>';
        html += '</div>';

        $('.header-wrap').append(html);
    };

    var listener = function(){
        $('.btn-search').off('click').on('click', function(){
            if($(window).width() < 970) {
                var keyword = $('.input-search').val();
                if(keyword != ''){
                    Search.showSearchView();
                    searchKeyword(keyword);
                }
            } else {
                Search.showSearchView();
            }       
        });
        $('.btn-search2').off('click').on('click', function(){
            if($('#search-cont').hasClass('search-result-on')){
                $('#search-cont').removeClass('search-result-on');
            } else {
                var keyword = $('.search-input').val();
                if(keyword != ''){
                    searchKeyword(keyword);
                }                
            }        
        });
        $('.search-input').off('keypress').on('keypress', function(e){
            if (e.which == 13) {/* 13 == enter key@ascii */
                var keyword = $('.search-input').val();
                if(keyword != ''){
                    searchKeyword(keyword);
                }
            }
        });        
        $(document).on('click', '.search-keyword-link', function(e){
            e.preventDefault();
            var keyword = $(this).text();
            searchKeyword(keyword);
        });
        $(document).on('click', '.btn-search-del', function(){
            $(this).parent().remove();
            var keyword = '';
            if($('.search-txt-link').length == 0){
                $('#search-cont').removeClass('search-result-on');
            } else {
                $.each($('.search-txt-link'), function(){ 
                    keyword += $(this).text() + ' ';
                });
                searchKeyword(keyword.trim());
            }
        });



    };

    return {
        init: function(){
            IMG_URL = HF.DATA.s3.uri + '/';

            setSearchView();
            listener();

            return $.Deferred().resolve().promise();
        },
        showSearchView : function(){
	        history.pushState(null, null, "#;");
			history.pushState(null, null, "#search");
            getRecommendKeyword();
        },
    }
})();