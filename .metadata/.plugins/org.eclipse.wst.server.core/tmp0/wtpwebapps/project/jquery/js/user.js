/**
 * Created by Nalrarang on 2017. 3. 27
 */
/**
유저 관련 Script
@namespace User
@author nalrarang@gmail.com
@logs 20170327:Nalrarang update
*/

var User = (function(){
    var storage = {
        // 1일
        // string accessToken
        // string tokenType
        auth : new Utils.SessionStorage('hf-auth', null, 24 * 60 * 60 * 1000, {
            lifetimeUpdateBy : 'update'
        }),

        // 14일
        // boolean isUse
        // string refreshToken
        autoLogin : new Utils.SessionStorage('hf-auth-autoLogin', null, 14 * 24 * 60 * 60 * 1000, {
            lifetimeUpdateBy : 'update'
        }),

        // 1시간
        user : new Utils.SessionStorage('hf-user', null, 60 * 60 * 1000, {
            lifetimeUpdateBy : 'update'
        }),

        clear : function(){
            this.auth.clear();
            this.autoLogin.clear();
            this.user.clear();
        }
    };

    function makerandomid(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        length = length || 10;

        for( var i=0; i < length; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    var loginRedirectUri = null;

    /* Login Modal Popup */
    var drawLoginModal = function(){
        var html = '';

        html += '<div class="layer-wrap login-wrap" id="login-wrap">';
        html += '<div class="bg-layer-wrap a-close"></div>';
        html += '<div class="join-cont">';
        html += '<h2 class="layer-tit">로그인 하기</h2>';
        html += '<div class="join-type-wrap">';
        html += '<div class="float-wrap">';
        html += '<div class="join-type-cont">';
        html += '<button title="페이스북으로 로그인" class="btn-join-type btn-join-facebook"><span class="ico-join-type ico-join-facebook"></span>페이스북으로 로그인</button>';
        html += '<button title="네이버로 로그인" class="btn-join-type btn-join-naver"><span class="ico-join-type ico-join-naver"></span>네이버로 로그인</button>';
        html += '<button title="카카오톡으로 로그인" class="btn-join-type btn-join-kakaotalk"><span class="ico-join-type ico-join-kakaotalk"></span>카카오톡으로 로그인</button>';
        html += '</div>';
        html += '<div class="join-type-txt-wrap"><span class="join-type-txt">또는</span></div>';
        html += '<div class="join-type-cont">';
        html += '<ul class="login-email-wrap">';
        html += '<li class="login-email">';
        html += '<input type="email" id="login-txt-email" class="login-input" placeholder="아이디 (이메일)" />';
        html += '<div class="join-txt-warning login-email-warning"></div>';
        html += '</li>';
        html += '<li class="login-email">';
        html += '<input type="password" id="login-txt-pass" class="login-input" placeholder="비밀번호" />';
        html += '<div class="join-txt-warning login-password-warning"></div>';
        html += '</li>';
        html += '<li class="login-keep">';
        html += '<div class="keep-login">';
        html += '<input type="checkbox" class="btn-join-agree check-keep-login" id="keep-login" />';
        html += '<label for="keep-login" class="join-agree-label">로그인 유지하기</label>';
        html += '</div>';
        html += '<a href="#gologin" title="로그인" class="btn-login login_user">로그인</a>';
        html += '</li>';
        html += '</ul>';
        html += '</div>';
        html += '</div>';
        html += '<div class="float-wrap">';
        html += '<div class="login-find-wrap">';
        html += '<ul class="login-find-list">';
        html += '<li class="login-find"><a href="#findid" title="아이디 찾기" class="btn-login-find btn-find-id">아이디 찾기</a></li>';
        html += '<li class="login-find"><a href="#findpassword" title="비밀번호 찾기" class="btn-login-find btn-find-pw">비밀번호 찾기</a></li>';
        html += '</ul>';
        html += '</div>';
        html += '<div class="login-bottom-wrap">';
        html += '아직 하비풀 회원이 아니신가요?';
        html += '<a href="#join" title="회원가입" class="link-join a-join">회원가입</a>';
        html += '</div>';
        html += '</div>';
        html += '</div>';
        html += '<a href="#close" title="닫기" class="btn-layer-close a-close">닫기</a>';
        html += '</div>';
        html += '</div>';

        $('#wrap').append(html)
            .on('click', '.a-close', function(){
                if(window.isBlockLoginClose) {
                    location.replace('/');
                } else {
                    loginRedirectUri = null;
                    User.hideLogin();
                }
            })
            .on('click', '.a-join', function(){
                if(window.isBlockLoginClose) {
                    location.replace('/#?action=user.joinType');
                } else {
                    User.hideLogin();
                    openJoinType();
                }
            })
            .on('click', '.btn-join-facebook', function(){
                User.hideLogin();
                sns('facebook').startLogin();
            })
            .on('click', '.btn-join-naver', function(){
                User.hideLogin();
                sns('naver').startLogin();
            })
            .on('click', '.btn-join-kakaotalk', function(){
                User.hideLogin();
                sns('kakao').startLogin();
            })
            .on('click', '.btn-find-id', function(e){
                e.preventDefault();

                if(window.isBlockLoginClose) {
                    location.replace('/#?action=user.findId');
                } else {
                    User.hideLogin();
                    User.showFindUserId();
                }
            })
            .on('click', '.btn-find-pw', function(e){
                e.preventDefault();

                if(window.isBlockLoginClose) {
                    location.replace('/#?action=user.findPw');
                } else {
                    User.hideLogin();
                    User.showFindPassword();
                }
            })
        ;
    };

    var openJoinType = function(){
        var $el;
        var close = function(){
            $('#wrap').removeClass('layer-on');
            $el.remove();
        };

        var html = [
            '<div class="layer-wrap join-wrap">',
            '    <div class="bg-layer-wrap a-close"></div>',
            '    <div class="join-cont join-select">',
            '        <h2 class="layer-tit">회원가입</h2>',
            '        <div class="join-type-wrap">',
            '            <div class="join-type-cont">',
            '                <button title="페이스북으로 가입" class="a-facebook btn-join-type btn-join-facebook"><span class="ico-join-type ico-join-facebook"></span>페이스북으로 가입</button>',
            '                <button title="네이버로 가입" class="a-naver btn-join-type btn-join-naver"><span class="ico-join-type ico-join-naver"></span>네이버로 가입</button>',
            '                <button title="카카오톡으로 가입" class="a-kakao btn-join-type btn-join-kakaotalk"><span class="ico-join-type ico-join-kakaotalk"></span>카카오톡으로 가입</button>',
            '            </div>',
            '            <div class="join-type-txt-wrap"><span class="join-type-txt">또는</span></div>',
            '            <div class="join-type-cont">',
            '                <button title="이메일로 가입" class="a-email btn-join-type btn-join-email"><span class="ico-join-type ico-join-email"></span>이메일로 가입</button>',
            '                <div class="join-info">',
            '                    본인은 만 14세 이상이며, 회원 가입하면 하비풀의 <a href="/term-provision.html" title="서비스 이용약관" class="link-info" target="_blank">서비스 이용약관</a>, <a href="/term-privacy.html" title="개인정보 취급방침" class="link-info" target="_blank">개인정보 취급방침</a>에 동의하는 것입니다.',
            '                </div>',
            '            </div>',
            '            <div class="join-login">',
            '                이미 회원이신가요? <a href="#login" title="로그인" class="link-login a-login">로그인</a>',
            '            </div>',
            '        </div>',
            '        <button title="닫기" class="btn-layer-close a-close">닫기</button>',
            '    </div>',
            '</div>'
        ].join('');

        $el = $(html)
            .on('click', '.a-close', function(){
                loginRedirectUri = null;
                close();
            })
            .on('click', '.a-naver', function(){
                close();
                sns('naver').startLogin();
            })
            .on('click', '.a-kakao', function(){
                close();
                sns('kakao').startLogin();
            })
            .on('click', '.a-facebook', function(){
                close();
                sns('facebook').startLogin();
            })
            .on('click', '.a-email', function(){
                close();
                openJoinForm({
                    type : 'email'
                });
            })
            .on('click', '.a-login', function(){
                close();
                User.showLogin();
            })
            .appendTo('#wrap')
            .show()
        ;
        $('#wrap').addClass('layer-on');

        return {
            close : close
        }
    };

    var createJoinFormModal = function(options){
        options = $.extend({
            sns : {
                // provider : 'facebook',
                // id : '000000'
            },
            preValue : {
                email : '',
                username : '',
                nickname : '',
                birthday : '', //YYYYMMDD'
                phonenumber : '' //01000000000
            },
            type : 'email',// email, sns
            onCreate : function(){},
            onSubmit : function(){},
            onCancel : function(){},
            onClose : function(){}
        }, options);

        var $el;

        var close = function(){
            $('#wrap').removeClass('layer-on');
            $el.remove();
            options.onCancel();
            options.onClose();
        };

        var html = '<form>' +
            '<div class="layer-wrap join-wrap">' +
            '    <div class="bg-layer-wrap a-close"></div>' +
            '    <div class="join-cont">' +
            '        <h2 class="layer-tit">회원가입</h2>' +
            '        <div class="join-thumb-wrap">' +
            '            {{if preValue.profileimage_url}}' +
            '            <div class="join-thumb" style="background-image:url({{:preValue.profileimage_url}})">' +
            '            {{else}}' +
            '            <div class="join-thumb">' +
            '            {{/if}}' +
            '                <label for="btn-add-thumb" class="label-add-thumb2"></label>' +
            '                <input name="profileimage" type="file" class="btn-add-thumb" id="btn-add-thumb" accept="file_extension|audio/*|video/*|image/*|media_type">' +
            '            </div>' +
            '        </div>' +
            '        <div class="join-type-email">' +
            '            <div class="join-txt-wrap">' +
            '                <div class="join-txt-cont mb10">' +
            '                    <label class="join-txt-label" for="join-txt-email">이메일</label>' +
            '                    <input name="userid" type="email" value="{{:preValue.email}}" placeholder="이메일 주소를 입력해 주세요." class="join-txt-input email-join-txt-input" id="join-txt-email" autocomplete="off" />' +
            '                    <ul class="auto-complete-list">' +
            '                    </ul>' +
            '                </div>' +
            '            </div>' +
            '        {{if type === "email"}}' +
            '            <div class="join-txt-wrap join-txt-wrap-password">' +
            '                <div class="join-txt-cont">' +
            '                    <label class="join-txt-label" for="join-txt-pw">비밀번호</label>' +
            '                    <input name="userpass" required type="password" placeholder="비밀번호는 6~16자 영문, 숫자를 사용해주세요." class="join-txt-input" id="join-txt-pw">' +
            '                </div>' +
            '                <div class="join-txt-cont">' +
            '                    <label class="join-txt-label" for="join-txt-confirm">비밀번호 확인</label>' +
            '                    <input name="userpasscheck" required type="password" placeholder="비밀번호는 6~16자 영문, 숫자를 사용해주세요." class="join-txt-input">' +
            '                </div>' +
            '            </div>' +
            '        {{/if}}' +
            '            <div class="join-txt-wrap">' +
            '                <div class="join-txt-cont join-name-input">' +
            '                    <label class="join-txt-label" for="join-txt-name">이름</label>' +
            '                    <input name="username" value="{{:preValue.username}}" required type="text" placeholder="이름을 입력해 주세요." maxlength="5" class="join-txt-input">' +
            '                </div>' +
            '            </div>' +
            '            <div class="join-txt-wrap">' +
            '                <div class="join-txt-cont">' +
            '                    <label class="join-txt-label" for="join-txt-nick">닉네임</label>' +
            '                    <input name="nickname" required type="text" value="{{:preValue.nickname}}" placeholder="닉네임은 2~12글자로 입력해주세요." maxlength="12" class="join-txt-input">' +
            '                </div>' +
            '            </div>' +
            '            <div class="join-txt-wrap">' +
            '                <div class="join-txt-cont">' +
            '                    <label class="join-txt-label" for="join-txt-birth">생년월일</label>' +
            '                    <input name="userbirthday" type="text" value="{{:preValue.birthday}}" placeholder="예) 19840411" class="join-txt-input" maxlength="8">' +
            '                    <div class="join-txt-warning join-birth-warning">생년월일을 다시 확인해주세요.</div>' +
            '                </div>' +
            '                <div class="join-txt-info">* 생년월일을 입력해주시면 생일 쿠폰을 보내드립니다.</div>' +
            '            </div>' +
            '            <div class="join-txt-wrap">' +
            '                <div class="join-txt-cont">' +
            '                    <label class="join-txt-label" for="join-txt-phone">휴대폰번호</label>' +
            '                    <input name="userphone" type="tel" value="{{:preValue.phonenumber}}" placeholder="예) 01099849078" class="join-txt-input" maxlength="11">' +
            '                </div>' +
            '                <div class="join-txt-info">* 휴대폰 번호로 비밀번호 찾기 및 재설정을 하실 수 있습니다.</div>' +
            '            </div>' +
            '            <div class="join-agree-wrap">' +
            '                <div class="join-agree-txt">하비풀에서 보내드리는 다양한 취미 소식을 받아보시겠어요?</div>' +
            '                <ul class="join-agree-btn-list">' +
            '                    <li class="join-agree-btn">' +
            '                        <input type="checkbox" id="agree-email" class="btn-join-agree" name="usermailagree" value="Y">' +
            '                        <label for="agree-email" class="join-agree-label">이메일로 받아볼래요</label>' +
            '                    </li>' +
            '                    <li class="btn-agree-btn">' +
            '                        <input type="checkbox" id="agree-sms" class="btn-join-agree" name="usersmsagree" value="Y">' +
            '                        <label for="agree-sms" class="join-agree-label">문자로 받아볼래요</label>' +
            '                    </li>' +
            '                </ul>' +
            '            </div>' +
            '        </div>' +
            '        <div class="join-btn-wrap">' +
            '           <button title="가입하기" class="btn-join a-submit">가입하기</button>' +
            '        </div>' +
            '        <button title="닫기" class="btn-layer-close a-close">닫기</button>' +
            '    </div>' +
            '</div>' +
            '</form>';

        var verifyForm = function(onValid, onFail){
            $el.validate({
                rules : {
                    userid : { required : true, EMAIL : true },
                    userpass : { PASSWORD : true, required : true, rangelength : [6,16] },
                    userpasscheck : { equalTo : '#join-txt-pw' },
                    username : { HANGUL : true, rangelength : [2,5] },
                    nickname : { rangelength : [2,10] },
                    userphone : { MOBILE_NUMBER : true, digits : true, rangelength : [10,11] },
                    userbirthday : { digits : true, rangelength : [8,8] }
                },
                messages : {
                    userid : { },
                    userpass : {
                        PASSWORD : '알파벳과 숫자를 함께 넣어주세요',
                        rangelength : $.validator.format("{0}에서 {1}자 까지만 입력 가능합니다"),
                    },
                    username : {
                        rangelength : $.validator.format("{0}에서 {1}자 까지만 입력 가능합니다"),
                    },
                    nickname : {
                        rangelength : $.validator.format("{0}에서 {1}자 까지만 입력 가능합니다"),
                    },
                    userphone : {
                        rangelength : $.validator.format("{0}에서 {1}자 까지만 입력 가능합니다"),
                    },
                    userbirthday : {
                        rangelength : $.validator.format("연월일 형식으로(예: 19980614) 입력해 주세요"),
                    }
                },
                submitHandler : function(){
                    onValid();
                },
                invalidHandler : function(){
                    onFail();
                },
                errorElement: "em"
            });
        };

        $el = $($.templates(html).render({
            type : options.type,
            preValue : options.preValue
        }))
            .on('change', 'input[name=profileimage]', function(){
                var input = this;
                var reader = new FileReader();

                if (!input.files || !input.files[0]) return;

                reader.onload = function (e) {
                    $('.join-thumb').css({
                        'background': 'url(' + e.target.result + ')',
                        'background-size': '100% 100%',
                        'background-repeat': 'no-repeat',
                        'border-radius' : '999px'
                    });
                };
                reader.readAsDataURL(input.files[0]);
            })
            .on('click', '.a-close', function(){
                close();
            })
            .on('click', '.a-submit', function(){
                $el.find('input[type=email], input[type=text], input[type=tel]').each(function(){
                    // 인풋 텍스트 trim 처리
                    this.value = this.value.replace(/(^\s+|\s+$)/,'');
                });

                var failCount = 0;
                verifyForm(function(){
                    var formData = new FormData();
                    var password = $el.find('[name=userpass]').val();
                    var formAdd = function(name, boolArr){
                        if(Array.isArray(name)) {
                            _.forEach(name, function(item){
                                if((Array.isArray(item))){
                                    formAdd(item[0], item[1]);
                                } else {
                                    formAdd(item);
                                }
                            });
                            return;
                        }

                        var $i = $el.find('input[name='+ name +']');
                        if($i.length) {
                            if($i.attr('type') === 'file' && $i[0].files[0]) {
                                formData.append(name, $i[0].files[0]);
                            } else if($i.attr('type') === 'checkbox') {
                                formData.append(name, $i.is(':checked') ? boolArr[0] : boolArr[1]);
                            } else {
                                formData.append(name, $i[0].value);
                            }
                        }
                    };

                    formAdd([
                        'profileimage',
                        'userid',
                        'userpass',
                        'userpasscheck',
                        'username',
                        'nickname',
                        'userbirthday',
                        'userphone',
                        ['usermailagree', ['Y', 'N']],
                        ['usersmsagree', ['Y', 'N']]
                    ]);


                    if(options.type === 'sns'){
                        var snsId = {
                            naver : 'naid',
                            kakao : 'kaid',
                            facebook : 'fbid'
                        }[options.sns.provider];

                        password = makerandomid();

                        formData.append('userpass', password);
                        formData.append('userpasscheck', password);
                        formData.append(snsId, options.sns.id);

                        // 프로필이미지 URL을 서버로 넘기고 서버에서 수집한다
                        if((!$el.find('[name=profileimage]')[0].value) && options.preValue.profileimage_url) {
                            formData.append( 'profileimage_url', options.preValue.profileimage_url);
                        }
                    }

                    options.onSubmit(formData, {
                        userid : $el.find('[name=userid]').val(),
                        userpass : password
                    }, {
                        failCount : failCount
                    });
                }, function(){
                    failCount++;
                });
            })
            .on('click', '.a-login', function(){
                close();
                User.showLogin();
            })
            .appendTo('#wrap')
        ;

        $el.children('.layer-wrap').show();
        $('#wrap').addClass('layer-on');

        // 자동완성
        new Awesomplete($el.find('input[name=userid]')[0], {
            list: ["naver.com","hanmail.net","daum.net","gmail.com","nate.com","yahoo.com"],
            data: function (text, input) {
                return input.slice(0, input.indexOf("@")) + "@" + text;
            },
            filter: Awesomplete.FILTER_STARTSWITH
        });

        options.onCreate();

        return {
            close : close
        }
    };

    var createWelcomeModal = function(onClose){
        var html = '<div class="layer-wrap join-wrap">'+
            '<div class="bg-layer-wrap a-close"></div>' +
            '<div class="join-complete">'+
            '   <div class="join-complete-img"><img src="../img/ex.jpg" class="img-join-complete" alt="" /></div>'+
            '   <div class="join-complete-txt">You\'re hobbyful!</div>'+
            '   <div class="join-complete-info">'+
            '       <strong class="join-complete-tit">환영합니다 {{:userName}} 님!</strong>'+
            '       하비풀에서 다양한 취미 클래스를 둘러보고<br/>'+
            '       내 방에서 편하게 취미를 즐기세요!'+
            '   </div>'+
            '   <ul class="join-complete-btn-list">'+
            '       <li class="join-complete-btn"><a href="/view-magazine.html?id=1" title="서비스 이용방법 알아보기" class="btn-complete btn-register-payment">서비스 이용방법 알아보기</a></li>'+
            '       <li class="join-complete-btn"><button title="닫기" class="a-close btn-complete btn-later"">닫기</button></li>'+
            '   </ul>'+
            '</div>'+
            '</div>';

        var $el;
        var close = function(){
            $('#wrap').removeClass('layer-on');
            $el.remove();
            (onClose||function(){})();
        };

        User.getUserInfo(true).then(function(res){
            $el = $($.templates(html).render({
                userName : res.user_name
            })).appendTo('#wrap')
                .show()
                .on('click', '.a-close', function(){
                    close();
                })
            ;
            $('#wrap').addClass('layer-on');

        }).catch(function(err){
            console.log('로그인정보 수신 실패', err)
        });

        return {
            close : close
        };
    };

    var openJoinForm = function(options){
        // options.type : 'sns',
        //     options.sns : {
        //     provider : provider,
        //         id : info.id
        // },


        options = _.extend({
            onSubmit : function(formData, userAuth, etc){
                var dimmer = new Utils.LoadingDimmer('login');
                dimmer.render();

                sendUserJoin(formData)
                    .then(function(){
                        return userLogin(userAuth.userid, userAuth.userpass, false)
                    })
                    .always(dimmer.clear)
                    .then(function(){
                        HF.tracker.dataLayerPush({
                            event: 'registrationComplete',
                            type : options.type === 'email' ? 'email' : options.sns.provider,
                            failCount : etc.failCount
                        });

                        modal.close();
                        createWelcomeModal(function(){
                            if(loginRedirectUri) {
                                location.href = loginRedirectUri;
                            } else {
                                location.reload();
                            }
                        });
                    })
                ;
            }
        }, options);

        var modal = createJoinFormModal(options);

        return modal;
    };

    /**
     *
     * auth
     * getInfo
     * login
     */
    var sns = (function(provider){
        //
        var func = {
            'naver' : {
                auth : function(){
                    // 네이버는 promise를 리턴하지 않고 네이버 로그인 페이지로 리다이렉트 시킴
                    // /naver_callback 페이지에서 가입유무를 판단하고 가입 혹은 로그인 url로 포워딩함
                    sessionStorage.hf_UrlBeforeLogin = loginRedirectUri || location.href.split('#')[0];
                    location.href = User.snsAuth.naver.join.generateAuthorizeUrl();
                },
                getInfo : function(){
                    var dfd = $.Deferred();

                    User.initSnsAuth('naver').then(function(loginList){
                        var naverLogin = loginList.login;

                        // 이 함수를 호출해야만 사용자정보 불어오기 가능
                        naverLogin.getLoginStatus(function(isLogin) {
                            if(!isLogin){
                                dfd.reject();
                                return;
                            }

                            var loginStatus = naverLogin.loginStatus;
                            var userInfo = loginStatus.naverUser;

                            dfd.resolve({
                                accessToken : loginStatus.accessToken.accessToken,
                                id : userInfo.id,
                                email : userInfo.email,
                                name : userInfo.name,
                                nickname : userInfo.nickname,
                                profile_image : userInfo.profile_image === 'https://ssl.pstatic.net/static/pwe/address/img_profile.png' ? null : userInfo.profile_image
                            });
                        });
                    });

                    return dfd.promise();
                }
            },
            'kakao' : {
                auth : function(){
                    var dfd = $.Deferred();

                    Kakao.Auth.login({
                        success : function(authObj){ dfd.resolve(authObj); },
                        fail: function(err) { dfd.reject(err); }
                    });
                    return dfd.promise();
                },
                getInfo : function(){
                    var dfd = $.Deferred();

                    // 이 함수를 호출해야만 사용자정보 불어오기 가능
                    Kakao.Auth.getStatus(function(res){
                        if(res.status !== 'connected') {
                            dfd.reject();
                            return;
                        }

                        dfd.resolve({
                            accessToken : Kakao.Auth.getAccessToken(),
                            id : res.user.id,
                            email : res.user.kaccount_email,
                            name : res.user.properties.name,
                            nickname : res.user.properties.nickname,
                            birthday : null,
                            profile_image : res.user.properties.profile_image
                        });
                    });

                    return dfd.promise();
                }
            },

            'facebook' : {
                auth : function(){
                    var dfd = $.Deferred();

                    FB.login(function(response) {
                        if(response) {
                            dfd.resolve(response.authResponse.accessToken, response);
                        } else {
                            dfd.reject();
                        }
                    }, {scope: 'public_profile,email'});

                    return dfd.promise();
                },
                getInfo : function(){
                    var dfd = $.Deferred();

                    // 페이스북 함수가 오류나면 아예 동작하지 않는 경우가 있어서 타임아웃 구현
                    var failTimer = setTimeout(function(){
                        dfd.reject('timeout');
                    }, 6000);

                    // 이 함수를 호출해야만 사용자정보 불어오기 가능
                    FB.getLoginStatus(function(loginResponse) {
                        clearTimeout(failTimer);

                        if (!loginResponse || loginResponse.status !== 'connected') {
                            dfd.reject((loginResponse || {}).error);
                            return;
                        }

                        FB.api('/me?fields=email,first_name,last_name,name,picture', 'get', function(profileResponse){
                            if(profileResponse.error) {
                                dfd.reject(profileResponse.error);
                                return;
                            }

                            dfd.resolve({
                                accessToken : loginResponse.authResponse.accessToken,
                                id : profileResponse.id,
                                email : profileResponse.email,
                                name : profileResponse.name,
                                nickname : profileResponse.name,
                                birthday : null,
                                profile_image : profileResponse.picture.data.url
                            });
                        });
                    });

                    return dfd.promise();
                }
            }
        }[provider];

        var loginProc = function(accessToken){
            return ApiRequest.post({
                'naver': '/user/na/login',
                'kakao': '/user/ka/login',
                'facebook': '/user/fb/login'
            }[provider], {
                accessToken : accessToken
            }).then(function(res){
                return storeAuthInfo({
                    authObj: {
                        accessToken: res.accessToken.accessToken,
                        tokenType: 'Bearer',
                        refreshToken: res.accessToken.refreshToken,
                        expiresIn: res.accessToken.expiresIn
                    }
                });
            });

            // return ApiRequest.post('/user/na/login', {
            //     accessToken : access_token
            // }).then(function(res){
            //     return storeAuthInfo({
            //         authObj : {
            //             accessToken : res.accessToken.accessToken,
            //             tokenType : 'Bearer',
            //             refreshToken : res.accessToken.refreshToken,
            //             expiresIn : res.accessToken.expiresIn
            //         }
            //     });
            // });
        };

        // 하비풀 로그인
        var login = function(){
            var dimmer = new Utils.LoadingDimmer('login');
            dimmer.render();

			// sns로그인여부 확인
            return (function() {
				var isIOS = /(iPhone; CPU iPhone OS|iPad; CPU OS)/.test(navigator.userAgent);

				// iOS에서 기존 데이터로 로그인 불러오는 부분에 문제가 있는 듯 하여 무조건 로그인 띄움
				if(isIOS && provider !== 'naver'){
                    dimmer.clear();
					return func.auth().then(function(){
						return func.getInfo();
					});
                } else {
					return func.getInfo()
					// sns로그인이 안되어 있다?
						.catch(function(){
							dimmer.clear();
							// sns로그인 부터 시작
							return func.auth().then(function(){
								return func.getInfo();
							});
						})
                    ;
                }
            }())
                .then(function(info){
                    // sns로그인 후 하비풀 로그인
                    return loginProc(info.accessToken)
                        .always(dimmer.clear)
                        .catch(function(res){
                            var output = (res||{});
                            output.authInfo = info;

                            return output;
                        })
                })
            ;
        };

        var loginSet = function(){
            return login()
                .then(function(){

                    HF.tracker.dataLayerPush({
                        event: 'signInComplete',
                        type : provider
                    }, function() {
                        if(loginRedirectUri) {
                            location.href = loginRedirectUri;
                        } else {
                            location.reload();
                        }
                    });

                })
                .catch(function(res){
                    switch(res.responseJSON.error){
                        case 'Block User':
                            Popup.alert("회원 인증 실패", '차단된 회원입니다.', "확인", function(){
                                Popup.hide();
                            });
                            break;
                        case 'Invalid naver ID':
                        case 'Invalid facebook ID':
                        case 'Invalid kakao ID':
                            Popup.alert("회원 인증 실패", '등록되지 않은 SNS로그인 일련번호 입니다. 다시 시도해 주세요.', "확인", function(){
                                Popup.hide();
                            });
                            break;
                        case 'User not found':
                            join(res.authInfo);
                            break;
                        default:
                            var add = res.responseJSON.error ? '<br>('+res.responseJSON.error+')' : '';
                            console.error(res.responseJSON.error);
                            Popup.alert("회원 인증 실패", '시스템 오류'+add, "확인", function(){
                                Popup.hide();
                            });
                    }
                })
            ;
        };

        var join = function(info){
            var dimmer = new Utils.LoadingDimmer('join');
            dimmer.render();

            return (
                    info ?
                    $.Deferred().resolve(info).promise() :
                    func.getInfo().catch(function(err){
                        dimmer.clear();
                        return func.auth().then(function(){
                            return func.getInfo();
                        });
                    })
                )
                .then(function(info){
                    var modal = openJoinForm({
                        type : 'sns',
                        sns : {
                            provider : provider,
                            id : info.id
                        },
                        preValue : {
                            email : info.email,
                            username : info.name,
                            nickname : info.nickname,
                            birthday : info.birthday,
                            phonenumber : info.phonenumber,
                            profileimage_url : info.profile_image
                        },
                        onCreate : function(){
                            dimmer.clear();
                        }
                    });
                })
                .catch(function(){
                    dimmer.clear();
                })
            ;
        };

        return {
            startLogin : loginSet,
            hfLogin : loginProc,
            snsLogin : login,
            login : login,
            join : join,
            auth : func.auth,
            getInfo : func.getInfo
        };
    });

    /* 회원가입 API 호출 */
    var sendUserJoin = function(formData, onSuccess){
        onSuccess = onSuccess || function(){};

       // console.log(formData);
        return $.ajax({
            url: '/v1/client/user',
            type: 'POST',
            processData: false,
            contentType: false,
            data : formData,
            success: function(res){
                onSuccess(res, formData);
            },
            error: function(err){
                var msgMatch = {
                    'user_id Duplicated' : '이미 가입된 이메일 입니다.',
                    'user_phone Duplicated' : '이미 등록된 전화번호 입니다.',
                    'expired id' : '회원탈퇴후 24시간이 지나지 않은 아이디입니다.',
                    'user_nickname Duplicated' : '다른 사람이 사용 중인 닉네임 입니다.<br>새로운 닉네임을 입력해주세요.'
                };

                if(err.responseJSON.error === "Cannot read property 'path' of undefined") {
                    // completeJoin(joinParam.userid, joinParam.userpass);
                } else {
                    var msg = msgMatch[err.responseJSON.error] || '회원 가입에 실패했습니다.';
                    Popup.alert("회원 가입 실패", msg, "확인", function(){
                        Popup.hide();
                    });

                    // 겹치는 닉네임이 있으면 뒤에 3자리 숫자를 붙여버림
                    if(err.responseJSON.error === 'user_nickname Duplicated') {
                        var nicknameInput = $('.join-cont [name=nickname]');
                        nicknameInput.val(nicknameInput.val() + Math.ceil(Math.random() * 1000));
                    }
                }
            }
        });
    };

    // var completeJoin = function(id, pass){
    //     ApiRequest.post('/auth/token', {
    //         'grant_type': 'password',
    //         'username': id,
    //         'password': pass,
    //         'client_id': 'client',
    //         'client_secret': 'zmffkdldjsxmtlzmflt'
    //     } , function(res){
    //         storeAuthInfo({
    //             authObj : {
    //                 accessToken : res.access_token,
    //                 tokenType : res.token_type,
    //                 refreshToken : res.refresh_token,
    //                 expiresIn : res.expires_in
    //             }
    //         }, function(){
    //             showWelcomeModal();
    //         });
    //     }, function(err){
    //         Popup.alert("로그인 실패", "회원 가입 후 로그인에 실패했습니다.", "확인", function(){
    //             Popup.hide();
    //         });
    //         console.log(err);
    //     });
    // };


    var isLoginCheck = function(){
        // 기간이 만료되어 hf-rt 값이 사라지면, 세션 연장이 불가능해 초기화
        if(!storage.auth.get('accessToken') && !storage.autoLogin.get('isUse')) {
            _userLogout();
            return false;
        }
        return true;
    };

    /* 로그인 체크 */
    var applyLoginState = function(){
        if(!isLoginCheck()) {
            $('.gnb-login').show();
            $('.gnb-join').show();
            $('.gnb-logout').hide();
            $('.gnb-favorite').hide();
            return false;
        } else {
            $('.gnb-login').hide();
            $('.gnb-join').hide();
            $('.gnb-logout').show();
            $('.gnb-favorite').show();
            return true;
        }
    };

    /* 로그인 Form 인증 */
    var loginVaildation = function(){
        var loginParam = {};
        loginParam.userId = $('#login-txt-email').val();
        loginParam.userPass = $('#login-txt-pass').val();

        if(loginParam.userId == ""){
            $('.login-email-warning').text("이메일을 입력해주세요.").show();
            return false;
        } else {
            $('.login-email-warning').hide();
        }

        if(loginParam.userId.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/i) == null){
            $('.login-email-warning').text("이메일을 다시 확인해주세요.").show();
            return false;
        } else {
            $('.login-email-warning').hide();
        }
        if(loginParam.userPass == ""){
            $('.login-password-warning').text("비밀번호는 6~16자 영문, 숫자, 특수문자를 사용해주세요.").show();
            return false;
        } else {
            $('.login-password-warning').hide();
        }

        return loginParam;
    };

    var storeAuthInfo = function(options, callback){
        options = $.extend({
            authObj : null,
            isAutoLogin : false
        }, options);

        callback = callback || function(){};

        storage.auth.set({
            accessToken : options.authObj.accessToken,
            tokenType : options.authObj.tokenType,
        });

        if(options.isAutoLogin) {
            storage.autoLogin.set({
                isUse: true,
                refreshToken: options.authObj.refreshToken,
            });
        }

        // 장바구니 옮기기
        return cart.saveToAccount().done(function(){
            callback();
        });
    };

    /* 로그인 API 호출 */
    var userLogin = function(_id, _password, isAutoLogin){
        return ApiRequest.post('/auth/token', {
            'grant_type': 'password',
            'username': _id,
            'password': _password,
            'client_id': 'client',
            'client_secret': 'zmffkdldjsxmtlzmflt'
        })
            .then(function(res){
                return storeAuthInfo({
                    authObj : {
                        accessToken : res.access_token,
                        tokenType : res.token_type,
                        refreshToken : res.refresh_token,
                        expiresIn : res.expires_in
                    },
                    isAutoLogin : isAutoLogin
                });
            })
        ;
    };

    /* 자동 로그인일 경우 Refresh_Token 갱신 */
    var refreshLogin = function(refreshToken){
        refreshToken = refreshToken || storage.autoLogin.get('refreshToken');

        return ApiRequest.post('/auth/token', {
            'grant_type': 'refresh_token',
            'refresh_token': refreshToken,
            'client_id': 'client',
            'client_secret': 'zmffkdldjsxmtlzmflt'
        })
            .then(function(res){
                storage.auth.set({
                    accessToken : res.access_token,
                    tokenType : res.token_type
                });

                storage.autoLogin.set({
                    refreshToken : res.refresh_token
                });

                /* Login 완료 후 Process */
                applyLoginState();
            })
            .catch(function(err){
                console.err(err);
            })
        ;
    };

    /*  로그아웃  */
    var _userLogout = function(callback){
        storage.clear();
        if(callback) callback();
    };

    var userLogout = function(){
        _userLogout(function(){
            applyLoginState();
            location.href="/";
        });
    };

    var drawFindUserId = function(){
        $('#find-userid-wrap').remove();
        var html = '';

        html += '<div class="layer-wrap find-userid-wrap" id="find-userid-wrap">';
        html += '<div class="bg-layer-wrap" onclick="User.hideFindUserId();"></div>';
        html += '<div class="find-wrap block" style="position:absolute; top:90px;">';
        html += '<div class="find-tit">아이디 찾기</div>';
        html += '<div class="find-cont">';
        html += '<div class="find-txt">';
        html += '이메일이 기억나지 않으세요?<br/>';
        html += '회원님의 회원 정보에 등록된 휴대폰번호를 통해서 찾으실 수 있습니다.';
        html += '</div>';
        html += '<ul class="find-input-list">';
        html += '<li class="find-input-cont">';
        html += '<span class="find-input-area">';
        html += '<input type="tel" class="find-input find-input-tel" placeholder="휴대폰 번호를 입력해 주세요." />';
        html += '<span class="find-warning find-info-txt">';
        html += '인증번호를 발송했습니다.<br/>';
        html += '인증번호가 오지 않으면 입력하신 휴대폰 번호가 정확한지 확인해 주세요.';
        html += '</span>';
        html += '</span>';
        html += '<button type="button" class="btn-submit find-tel-auth-btn">인증</button>';
        html += '</li>';
        html += '<li class="find-input-cont">';
        html += '<span class="find-input-area find-input-time">';
        html += '<input type="text" class="find-input find-input-auth" placeholder="인증번호" />';
        html += '<span class="find-time"></span>';
        html += '<span class="find-warning">인증번호를 다시 확인해주세요.</span>';
        html += '</span>';
        html += '<button type="button" class="btn-submit find-tel-confirm-btn">확인</button>';
        html += '</li>';
        html += '</ul>';
        html += '</div>';
        html += '<div class="find-footer">';
        html += '만약 회원정보에 등록된 이메일, 휴대폰 번호 모두가 기억나지 않으시면,<br class="-m" />';
        html += '<strong class="bold">help@hobbyful.co.kr</strong>로 메일을 보내주세요.';
        html += '</div>';
        html += '<a href="javascript:;" title="닫기" class="btn-close-find" onclick="User.hideFindUserId();">닫기</a>';
        html += '</div>';
        html += '</div>';

        $('#wrap').append(html);

        $('.find-tel-auth-btn').off('click').on('click', function(){
            var phone = $('.find-input-tel').val();
            var rgEx = /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;
            if(phone.length != 11 || !rgEx.test(phone)) {
                $('.find-info-txt').html("휴대폰 번호를 다시 확인해주세요.").show();
                return false;
            }
            ApiRequest.put("/user/findmyid", {
                "phonenumber" : phone,
            }, function(res){
                //console.log(res);
                if(res.result === 'SUCCESS') {
                    startAuthTime();
                    $('.find-info-txt').html("인증번호를 발송했습니다.<br/>인증번호가 오지 않으면 입력하신 휴대폰 번호가 정확한지 확인해 주세요.").show();
                } else {
                    $('.find-info-txt').html("문자발송 시스템 오류").show();
                }
            }, function(err){
                console.log(err);
                $('.find-info-txt').html("존재하지 않는 휴대폰 번호입니다. 다시 확인해주세요.").show();
            });
        });

        $('.find-tel-confirm-btn').off('click').on('click', function(){
            var num = $('.find-input-auth').val();
            var phone = $('.find-input-tel').val();
            ApiRequest.put("/user/findmyidconfirm",{
                phonenumber: phone,
                code: num
            }, function(res){
                //console.log(res);
                clearInterval(authTimeInterval);
                User.hideFindUserId();
                Popup.alert("아이디 찾기 완료", "사용자의 아이디는 <br /><b>" + res.user_info.user_id + "</b><br /> 입니다.", "확인", function(){
                    Popup.hide();
                });
            }, function(err){
                console.log(err);
                $('.find-warning').show();
            });
      });
    };

    var authTimeInterval = {};
    var setAuthTime = 180;
    var startAuthTime = function(){
        $('.find-info-txt').text("");
        authTimeInterval = setInterval(function(){
            setAuthTime--;
            var mintue = parseInt(setAuthTime/60);
            var second = setAuthTime%60;
            $('.find-time').text(mintue + ":" + second);
            if(setAuthTime <= 0){
                $('.find-info-txt').text("입력시간이 초과 되었습니다. 인증번호를 다시 받아주세요.");
                clearInterval(authTimeInterval);
            }
        },1000);
    };


    var drawFindUserPassword = function(){
        $('#find-password-wrap').remove();

        var dimmer = new Utils.LoadingDimmer('findpw');

        var html = '';
        html += '<div class="layer-wrap find-password-wrap" id="find-password-wrap">';
        html += '<div class="bg-layer-wrap" onclick="User.hideFindPassword();"></div>';
        html += '<div class="find-wrap find-password-main block" style="position:absolute; top:90px;">';
        html += '<div class="find-tit">비밀번호 찾기</div>';
        html += '<div class="find-cont find-password-main">';
        html += '<div class="find-txt">';
        html += '비밀번호가 기억나지 않으세요?<br/>';
        html += '<span class="underline">회원님의 회원 정보에 등록된</span> 이메일 또는<br class="-w" />';
        html += '휴대폰 번호를 통해서 임시 비밀번호를<br class="-w" />';
        html += '발급 받으실 수 있습니다.';
        html += '</div>';
        html += '<ul class="btn-find-list">';
        html += '<li class="btn-find-area"><a href="javascript:;" title="이메일로 받기" class="btn-find find-email-btn">이메일로 받기</a></li>';
        html += '<li class="btn-find-area"><a href="javascript:;" title="휴대폰번호로 받기" class="btn-find find-phone-btn">휴대폰번호로 받기</a></li>';
        html += '</ul>';
        html += '</div>';
        html += '<div class="find-footer">';
        html += '만약 회원정보에 등록된 이메일, 휴대폰 번호 모두 기억나지 않으시면,<br class="-m" />';
        html += '<strong class="bold">help@hobbyful.co.kr</strong>로 메일을 보내주세요.';
        html += '</div>';
        html += '<a href="javascript:;" title="닫기" class="btn-close-find" onclick="User.hideFindPassword();">닫기</a>';
        html += '</div>';

        html += '<div class="find-wrap find-password-email" style="position:absolute; top:90px;">';
        html += '<div class="find-tit">비밀번호 찾기</div>';
        html += '<div class="find-cont">';
        html += '<div class="find-txt">';
        html += '회원님의 회원 정보에 등록된 이메일을 입력하시면, 해당 이메일로 임시 비밀번호를 발급해 드립니다. 임시 비밀번호는 사용후 반드시 변경해 주세요.';
        html += '</div>';
        html += '<div class="find-id-input">';
        html += '<input type="email" class="find-email input-find-pass-email" placeholder="이메일을 입력해 주세요." />';
        html += '<span class="find-warning find-warning-email">존재하지 않는 이메일입니다. 다시 확인해주세요.</span>';
        html += '</div>';
        html += '<div class="btn-find-wrap"><a href="javascript:;" title="임시 비밀번호 받기" class="btn-find find-pass-email-btn">임시 비밀번호 받기</a></div>';
        html += '</div>';
        html += '<div class="find-footer">';
        html += '휴대폰번호로 받으시겠어요? <a href="javascript:;" title="휴대폰 번호로 받기" class="bold underline change-pass-phone">휴대폰 번호로 받기</a>';
        html += '</div>';
        html += '<a href="javascript:;" title="닫기" class="btn-close-find" onclick="User.hideFindPassword();">닫기</a>';
        html += '</div>';

        html += '<div class="find-wrap find-password-phone" style="position:absolute; top:90px;">';
        html += '<div class="find-tit">비밀번호 찾기</div>';
        html += '<div class="find-cont">';
        html += '<div class="find-txt">';
        html += '회원님의 회원 정보에 등록된 휴대폰번호를 입력하시면, 해당 번호로 임시 비밀번호를 발급해 드립니다. 임시 비밀번호는 사용후 반드시 변경해 주세요.';
        html += '</div>';
        html += '<div class="find-id-input">';
        html += '<input type="tel" class="find-email input-find-pass-phone" placeholder="전화번호를 입력해 주세요." />';
        html += '<span class="find-warning find-warning-phone">존재하지 않는 휴대폰 번호입니다. 다시 확인해주세요.</span>';
        html += '</div>';
        html += '<div class="btn-find-wrap"><a href="javascript:;" title="임시 비밀번호 받기" class="btn-find find-pass-phone-btn">임시 비밀번호 받기</a></div>';
        html += '</div>';
        html += '<div class="find-footer">';
        html += '이메일로 받으시겠어요? <a href="javascript:;" title="이메일로 받기" class="bold underline change-email-phone">이메일로 받기</a>';
        html += '</div>';
        html += '<a href="javascript:;" title="닫기" class="btn-close-find" onclick="User.hideFindPassword();">닫기</a>';
        html += '</div>';
        html += '</div>';

        $('#wrap').append(html);

        $('.find-email-btn, .change-email-phone').off('click').on('click', function(){
            $(".find-password-main").hide();
            $(".find-password-phone").hide();
            $(".find-password-email").show();
        });
        $('.find-phone-btn, .change-pass-phone').off('click').on('click', function(){
            $(".find-password-main").hide();
            $(".find-password-phone").show();
            $(".find-password-email").hide();
        });

        $('.find-pass-phone-btn').off('click').on('click', function(){
            var phone = $('.input-find-pass-phone').val();
            var rgEx = /^(01[016789]{1}|070|02|0[3-9]{1}[0-9]{1})[0-9]{3,4}[0-9]{4}$/;
            if(phone.length != 11 || !rgEx.test(phone)) {
                $('.find-warning-phone').html("휴대폰 번호를 다시 확인해주세요.").show();
                return false;
            }

            dimmer.render();

            ApiRequest.put("/user/findmypassword", {
                "type" : "phone",
                "value" : phone
            }, function(res){
                //console.log(res);
                dimmer.clear();
                User.hideFindPassword();
                Popup.alert("비밀번호 찾기 완료", "입력하신 전화번호로 임시 비밀번호<br/>발급 문자메세지를 보냈습니다.", "확인", function(){
                    Popup.hide();
                });
            }, function(err){
                dimmer.clear();
                console.log(err);
                $('.find-warning-phone').html("존재하지 않는 휴대폰 번호입니다. 다시 확인해주세요.").show();
            });
        });
        $('.find-pass-email-btn').off('click').on('click', function(){
            var email = $('.input-find-pass-email').val();

            if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i.test(email)){
                $('.find-warning-email').html("잘못된 형식의 이메일 주소입니다.").show();
                return false;
            }

            dimmer.render();

            ApiRequest.put("/user/findmypassword", {
                "type" : 'email',
                "value" : email
            }, function(res){
                //console.log(res);
                dimmer.clear();
                User.hideFindPassword();
                Popup.alert("비밀번호 찾기 완료", "입력하신 이메일 주소로 임시 비밀번호<br/>발급 이메일을 보냈습니다.", "확인", function(){
                    Popup.hide();
                });
            }, function(err){
                dimmer.clear();
                console.log(err);
                $('.find-warning-email').html("존재하지 않는 이메일입니다. 다시 확인해주세요.").show();
            });
        });


    };


    var listener = function(){

        var onLogin = function(e){
            var loginParam = loginVaildation();
            if(loginParam == false){
                e.preventDefault();
                return false;
            }

            userLogin(loginParam.userId, loginParam.userPass, $('.check-keep-login').is(':checked'))
                .then(function(){

                    HF.tracker.dataLayerPush({
                        event: 'signInComplete',
                        type : 'email'
                    }, function() {
                        if(loginRedirectUri) {
                            location.href = loginRedirectUri;
                        } else {
                            location.reload();
                        }
                    });

                })
                .catch(function(err){
                    console.log(err);
                    Popup.alert("로그인 실패", "아이디/비밀번호를 확인해주세요.", "확인", function(){
                        Popup.hide();
                    });
                })
            ;
        };

        $(document)
            /* 로그인 버튼 */
            .on('click', '.login_user', onLogin)

            /* 로그인 엔터 키 입력 이벤트 */
            .on('keypress', '.login-input', function(e){
                if (e.which == 13) {/* 13 == enter key@ascii */
                    return onLogin(e);
                }
            })

            /* 헤더 로그인 버튼 클릭 */
            .on('click', '.header_login', function(){
                hideMenu();
                User.showLogin();
            })

            /* 헤더 회원가입 버튼 클릭 */
            .on('click', '.header_join', function(){
                hideMenu();
                // User.showJoin();
                User.openJoinType();
            })

            /* 헤더 로그아웃 버튼 클릭 */
            .on('click', '.header_logout', function(){
                Popup.confirm("로그아웃","로그아웃 하시겠습니까?", "취소", "로그아웃", function(){
                    Popup.hide();
                }, function(){
                    userLogout();
                });
            })

            /* 헤더 마이 페이지 버튼 클릭 */
            .on('click', '.header_mypage', function(){
                var isLogin = applyLoginState();

                if(isLogin) {
                    location.href="/mypage.html";
                } else {
                    User.showLogin();
                }
            })

            /* 헤더 취미 보관함 버튼 클릭 */
            .on('click', '.header_myfavorite', function(){
                var isLogin = applyLoginState();
                if(isLogin) {
                    location.href="/mypage.html";
                } else {
                    $('.header_login').trigger('click');
                }
            })

            .on('click', '.func-myclass', function(){
                var isLogin = applyLoginState();
                if(isLogin) {
                    location.href="/myclass.html";
                } else {
                    $('.header_login').trigger('click');
                }
            })

        ;
    };

    function getUserInfo() {
        return ApiRequest.get("/user", {}).then(function(res){
            res.userinfo.user_point = parseInt(res.userinfo.user_point);
            return res;
        });
    }


    return {
        init: function(){
            listener();

            if(window.naver) User.initSnsAuth('naver');
            applyLoginState();

            // 로그인이 만료되었는데 자동로그인 토큰이 남아있으면 재로그인 시도
            if(!storage.auth.get('accessToken') && storage.autoLogin.get('isUse')){
                return refreshLogin();
            } else {
                return $.Deferred().resolve().promise();
            }
        },

        getAuthToken : function(){
            return {
                accessToken : storage.auth.get('accessToken'),
                tokenType : storage.auth.get('tokenType'),
                refreshToken : storage.autoLogin.get('refreshToken')
            }
        },

        isLoginCheck : function(){
            return isLoginCheck();
        },
        applyLoginState: function(){
            return applyLoginState();
        },
        getUserInfo: function(isPromise, isUseCache){
            if(isPromise) {
                // jQuery의 Promise는 catch를 미리 받아도 $.when에서 실패로 간주되므로, 무조건 성공으로 처리하기 위해 랩핑
                var dfd = $.Deferred();

                if(isLoginCheck()) {

                    if(isUseCache && storage.user.get('user_id')) {
                        dfd.resolve(storage.user.get());
                    } else {
                        getUserInfo()
                            .then(function(res){
                                dfd.resolve(res.userinfo);
                            })
                            .catch(function(res) {
                                dfd.resolve({});
                            })
                        ;
                    }
                } else {
                    dfd.resolve({});
                }
                return dfd.promise().then(function(userInfo){
                    HF.DATA.user = userInfo;
                    storage.user.set(userInfo);

                    return userInfo;
                });
            }
            return HF.DATA.user = HF.DATA.user || storage.user.get();
        },
        getMileage : function(){
            var dfd = $.Deferred();

            if(isLoginCheck()) {
                return ApiRequest.get("/user/mileage/counter")
                    .then(function(){
                        if(HF.DATA.user) {
                            HF.DATA.user.user_point = parseInt(res.mileage);
                            storage.user.set('user_point', HF.DATA.user.user_point);
                        }
                        return HF.DATA.user.user_point;
                    })
                ;
            } else {
                dfd.resolve(0);
            }
            return dfd.promise();
        },
        _isLoginModalInitialized : false,
        showLogin: function(){
            if(!this._isLoginModalInitialized) {
                drawLoginModal();
                this._isLoginModalInitialized = true;
            }

            // 로그인 시도한 사람에 한해 로그로캣 기록 시작
            Cookies.set("hf-lr-enable", '1', { expires: 5 });

	        history.pushState(null, null, "#;");
            $('#wrap').removeClass('layer-on join-on');
            $('#wrap').addClass('layer-on login-on');
            $('body').addClass('on-popup');
        },
        hideLogin: function(){
            $('#wrap').removeClass('layer-on login-on');
            $('body').removeClass('on-popup');
        },

        showFindPassword: function(){
	        history.pushState(null, null, "#;");
            drawFindUserPassword();
            $('#wrap').removeClass('layer-on login-on');
            $('#wrap').addClass('layer-on find-password-on');
            $('body').addClass('on-popup');
        },
        hideFindPassword: function(){
            $('#wrap').removeClass('layer-on find-password-on');
            $('body').removeClass('on-popup');

            $(".find-password-main").show();
            $(".find-password-phone").hide();
            $(".find-password-email").hide();
        },
        showFindUserId: function(){
	        history.pushState(null, null, "#;");
            drawFindUserId();
            $('#wrap').removeClass('layer-on login-on');
            $('#wrap').addClass('layer-on find-userid-on');
            $('body').addClass('on-popup');
        },
        hideFindUserId: function(){
            $('#wrap').removeClass('layer-on find-userid-on');
            $('body').removeClass('on-popup');
        },

        naverLoginCallback : function(access_token){
            return sns('naver').hfLogin(access_token);
            // return ApiRequest.post('/user/na/login', {
            //     accessToken : access_token
            // }).then(function(res){
            //     return storeAuthInfo({
            //         authObj : {
            //             accessToken : res.accessToken.accessToken,
            //             tokenType : 'Bearer',
            //             refreshToken : res.accessToken.refreshToken,
            //             expiresIn : res.accessToken.expiresIn
            //         }
            //     });
            // });
        },

        snsAuth : {},

        initSnsAuth : function(provider, action){
            var host = window.location.origin || location.protocol + '//' + location.host + (location.port ? ':'+location.port : '');
            var dfd = $.Deferred();

            $(function() {
                var funcs = {
                    'naver' : function(){
                        var createLogin = function(callbackPath){
                            return new naver.LoginWithNaverId({
                                clientId: HF.DATA.apiKeys.naver,
                                callbackUrl: host + callbackPath,
                                isPopup: false
                            });
                        };

                        var output = {
                            login : createLogin("/v1/client/auth/sns/naver/login"),
                            join : createLogin("/v1/client/auth/sns/naver/join"),
                            add : createLogin("/v1/client/auth/sns/naver/add")
                        };

                        output.login.init();
                        output.join.init();
                        output.add.init();

                        return User.snsAuth.naver = output;
                    }
                };

                dfd.resolve( User.snsAuth[provider] || funcs[provider]() );
            });

            return dfd.promise();
        },

        // createJoinModal : createJoinModal,
        createJoinFormModal : createJoinFormModal,
        createWelcomeModal : createWelcomeModal,
        openJoinType : function(){
            // 로그인 시도한 사람에 한해 로그로캣 기록 시작
            Cookies.set("hf-lr-enable", '1', { expires: 5 });
            openJoinType();
        },
        sns : sns,
        setLoginRedirectUri : function(url){
            loginRedirectUri = url;
        },
        logout : userLogout

    }
})();