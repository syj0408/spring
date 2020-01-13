(function(HF){
    'use strict';

    // ApiRequest access_token 주입
    User.applyLoginState();

    // 필수 공용 API 선 로드 후 실행
    var promise = $.when(
        ApiRequest.get("/env/basic"),
        ApiRequest.get("/env/holidays", { isDateOnly : 'TRUE' }),
        User.getUserInfo(true, true)
    ).done(function(basic, holidays, login){
        HF.DATA = _.extend(HF.DATA, {
            config : basic[0].config,
            saleRates : basic[0].rate,
            holidays : holidays[0],
            user : login,
            s3 : basic[0].s3,
            host : basic[0].host,
            apiKeys : basic[0].apiKeys
        });

        // TODO 모듈 네임스페이스 HF 아래로 정리
        // TODO 모듈로더 제작

        if(HF.DATA.environment !== 'production') {
            document.title = '[테:' +HF.DATA.environment+ ']' +document.title;

            $('body').css('padding-bottom', '50px');
            $('<div />', {
                css : {
                    position : 'fixed',
                    bottom : 0,
                    left : 0,
                    right : 0,
                    background : '#FF0000',
                    color : '#fff',
                    height: '50px',
                    padding: '11px 0 10px 0',
                    textAlign: 'center',
                    zIndex : 10,
                    fontSize : '20px'
                },
                html : '<b>테스트 서버</b> : '+ HF.DATA.environment
            }).appendTo('body')
            ;
        }

        var r = [];

        HF.history.init();
        HF.tracker.init();

        if(window.Utils) r.push(Utils.init());
        if(window.User) r.push(User.init());
        if(window.Popup) r.push(Popup.init());
        if(window.Menu) r.push(Menu.init());
        if(window.Search) r.push(Search.init());
        if(window.cart) r.push(cart.init());

        return $.when.apply(null, r).then(function(rtn){ detectHashAction(); });
    });

    function detectHashAction(){
        var actionValue = Utils.getHashUrlParameter('action');
        if(actionValue) location.hash = '';

        if(actionValue === 'user.snsjoin.naver'){
            User.sns('naver').join();
        } else if(actionValue === 'user.findId'){
            User.showFindUserId();
        } else if(actionValue === 'user.findPw'){
            User.showFindPassword();
        } else if(actionValue === 'user.joinType'){
            User.openJoinType();
        }
    }

    // 서비스페이지용
    // ex) HF.ready(function(){ ... });
    HF.ready = promise.done;
})(HF);