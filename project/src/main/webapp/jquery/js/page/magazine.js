/**
 * Created by Nalrarang on 2017. 4. 10
 */
/**
 * Magazine Page Script
 * 
 * @namespace Magazine
 * @author nalrarang@gmail.com
 * @logs 20170410:Nalrarang update
 */

var Magazine = (function() {
   var IMG_URL = null; // 'https://s3.ap-northeast-2.amazonaws.com/staticdev.hobbyful.co.kr/';
   var listTotal = 0;
   var page = 1;
   var amount = 30;
   var mc_idx = "all";
   var weekdayList = {
      'Monday' : '월요일',
      'Tuesday' : '화요일',
      'Wednesday' : '수요일',
      'Thursday' : '목요일',
      'Friday' : '금요일',
      'Saturday' : '토요일',
      'Sunday' : '일요일'
   };

   var getMagazineCategoryList = function() {
      ApiRequest.get('/magazine/category', {}, function(res) {
         console.log(res);
         drawMagazineCategory(res);
      }, function(err) {
         console.log(err);
      });
   };

   var drawMagazineCategory = function(res) {
      $('.tab-class-list').empty();
      var html = '';
      html += '<li class="tab-class"><a href="#;" data-mc-idx="all" title="전체" class="btn-tab-class btn-tab-on">전체</a></li>';
      $.each(res.list, function() {
         html += '<li class="tab-class"><a href="#;" data-mc-idx="'
               + this.mc_idx + '" title="' + this.mc_title
               + '" class="btn-tab-class">' + this.mc_title + '</a></li>';
      });
      $('.tab-class-list').append(html);

      $('.btn-tab-class').off('click').on('click', function(e) {
         e.preventDefault();
         $('.btn-tab-class').removeClass('btn-tab-on');
         $(this).addClass('btn-tab-on');

         mc_idx = $(this).attr('data-mc-idx');
         page = 1;
         amount = 12;
         getMagazineList(mc_idx);
      });
   };

   var getMagazineList = function(mc_idx) {
      var param = {
         "amount" : amount,
         "page" : page
      };
      if (mc_idx != "all") {
         param['category'] = mc_idx;
      }

      ApiRequest.get('/magazine/content', param, function(res) {
         console.log(res);
         listTotal = res.count;
         drawMagazineList(res);
      }, function(err) {
         console.log(err);
      });
   };

   var drawMagazineList = function(res) {
      if (page == 1) {
         $('.class-list-wrap2').empty();
      }
      var html = '';

      $.each(res.list, function() {
         if (this.mz_video != '' && this.mz_video != "undefined") {
            html += '<li class="class-list play-on">';
         } else {
            html += '<li class="class-list">';
         }
         html += '<a href="view-magazine.html?id=' + this.mz_idx
               + '" title="' + this.mz_title + '">';
         html += '<div class="class-list-thumb">';
         html += '<img src="' + IMG_URL + 'magazine/' + this.mz_thumbnail
               + '" alt="' + this.mz_title
               + '" class="thumb-class-list" style="height:100%;">';
         html += '<span class="thumb-slide-play">재생</span>';
         html += '</div>';
         html += '<div class="class-list-cont">';
         html += '<p class="class-list-tit">' + this.mz_title2 + '</p>';
         html += '<p class="class-list-txt">' + this.mz_title + '</p>';
         html += '<p class="class-list-info">'
               + moment(this.mz_displaydate).format("YYYY.MM.DD ")
               + weekdayList[moment(this.mz_displaydate).format("dddd")]
               + ' <span class="thumb-slide-link-nick"></span></p>';
         html += '</div>';
         html += '</a>';
         html += '</li>';
      });

      $('.class-list-wrap2').append(html);
      if (listTotal <= page * amount) {
         $('.btn-more').hide();
      } else {
         $('.btn-more').show();
      }
   };
   var listener = function() {
      $('.btn-more').off('click').on('click', function(e) {
         e.preventDefault();
         page++;
         getMagazineList(mc_idx);
      });
   }

   return {
      init : function() {
         IMG_URL = HF.DATA.s3.uri + '/';

         getMagazineCategoryList();
         getMagazineList(mc_idx);
         listener();
      }
   }
})();

HF.ready(function() {
   Magazine.init();
});