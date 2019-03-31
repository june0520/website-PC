$(function(){
    var system ={
		win : false,
		mac : false,
		xll : false
		};
	//检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    console.log(p, system)
    //跳转语句，如果是手机访问就自动跳转到手机端wap页面
    if(system.win||system.mac||system.xll){
    }else{
        window.location.href="https://june0520.github.io/website-mobile-preview/#/index";//手机端网址
        return
    }

    let next = $('.right-arrow')
    let prev = $('.left-arrow')
    let pic = $('.page1Slogan')
    let baoming = $('.r_div')
    let imgActive = 1
    // 首页图片切换
    next.click(changePic1)
    function changePic1(){
        // pic.css({'background-image':'url(../images/pic9_03.jpg)'})
        pic.toggleClass('next')
        imgActive = 2
        console.log(imgActive)
        $('.pic1_word').css('display','none')
        $('.pic2_word').css('display','block')
    }
    prev.click(changePic2)
    function changePic2(){
        // pic.css({'background-image':'url(../images/page-01-1_03.jpg)'})
        pic.toggleClass('prev')

        imgActive = 1
        console.log(imgActive)
        $('.pic2_word').css('display','none')
        $('.pic1_word').css('display','block')
    }
    function loop(){
        // console.log('changePPPPic')
        // setTimeout(()=>{
        //     if(imgActive == 1) {
        //         changePic1()
        //     } else {
        //         changePic2()
        //     }
        //     loop()
        // }, 4000)
    }
    loop()
    // 点击 图片跳转
    pic.click(function(){
        if (imgActive == 1) {
            location.href = './contactUS.html'
        }
        if (imgActive == 2) {
            location.href = './newActivity.html'
        }
    })

    // 选择语言
    let language = $('.language')
    let commonlanguage = $('.commonlanguage')
    language.find('div').click(choseLan)
    commonlanguage.find('div').click(choseLan)
    function choseLan(){
        $('.langList').toggle()
    }

    // 切换 联系我们页面的 与我联系和订阅中心
    let contactLeft = $('.contactLeft')
    
    let contactUs = $('.contactUs')
    let section1 =  $('.section1')
    let section2 =  $('.section2')

    contactUs.addClass('contactActive')
    contactUs.children().addClass('showZhizhen')
    section1.css('display', 'block')  // 与我联系
    section2.css('display', 'none') // 订阅中心
    contactLeft.click(function(e){
        if ( e.target.className.toLowerCase() == 'contactus') {
            $(e.target).addClass('contactActive')  
            $(e.target).children().addClass('showZhizhen')
            
            $('.subscription').removeClass('contactActive')
            $('.subscription').children().removeClass('showZhizhen')

            section1.css('display', 'block')
            section2.css('display', 'none')
            // $('.contactRithtText').text('如果您需要进一步的海外房产信息、相关服务及最新活动，请您告知联系 方式，我们会推送给您相关的额讯息。')
            $('.pick1').css('display','block')
            $('.pick2').css('display','none')

            params.source = 1
        }
        if ( e.target.className.toLowerCase() == 'subscription') {
            $(e.target).addClass('contactActive')
            $(e.target).children().addClass('showZhizhen')

            contactUs.removeClass('contactActive')
            contactUs.children().removeClass('showZhizhen')

            section2.css('display', 'block')
            section1.css('display', 'none')

            // $('.contactRithtText').text('如果您需要取得进一步的信息 、 或咨询海外房产及相关服务，请您告知 联系方式，我们会尽快与您联系。')
            $('.pick1').css('display','none')
            $('.pick2').css('display','block')
            params.source = 2
        }
    })

    $('.goTop').click(function(){
        console.log("点击回到顶部")
        window.scrollTo(0,0)
    })

    console.log('当前语言', window.lang)
    let actArr = []
    $.ajax({
        type: 'GET',
        url: baseUrl+'act?page=1',
        headers:{
            "Accept-Language":window.lang,
            "Content-Type":"application/x-www-form-urlencoded"
        },
        // data:params,
        success: function(data, status, xhr){
           if(data.error == 0) {
                actArr = data.data.data
                console.log(actArr)
                addAct(actArr)
           }
        },
        error: function(xhr, type){
        }
    })

    let act_wrap = $('.act_wrap')

    function addAct(arr) {
        if(arr.length>0) {
            arr.forEach((ele, index) => {
                let n = index%3+1;
                let $div = `<section class="rowsCon`+n+` clearfix">
                    <div class="rows1BlackRect"></div>
                    <div class="w clearfix row`+n+`DetailCon">
                        <div class="rowDetail ${n%2==0?'fr':'fl'}" row`+n+`>
                            <h3 ${n%3==0?'class="row3-title"':''}>`+ele.title +`</h3>
                            <span class="title-underline"></span>
                            <p class="rowDetailText ${n%3==0?'row3Text':''}">
                                `+ele.content+`
                            </p>
                        </div>
                        <img src="`+ele.url_id_arr[0].url+`" alt="房子" class="${n%2==0?'fl':'fr'} rowDetailPic">
                    </div>
                </section>`
                act_wrap.append($div)
                console.log(ele.url_id_arr[0].url)
            })
        }
    }








}) 