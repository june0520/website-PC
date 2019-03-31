$(function(){
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

    // 与我联系中的 提交表单
    let submitForm = $('.dingyueForm')
    let page5Btn = $('.page5Btn')

    let baseUrl = 'https://bondedsite.vmh5.com/front/'
    let params = {
        surname: '', // 姓
        name: '',  // 名   
        email: '',  
        mobile: '',
        tel: '', 
        demand: '', // 需求
        instruction: '', // 报名说明会
        relation: '', //  国家选择
        source: 1  // 1-联系我们   2-订阅
    }
    page5Btn.click(function(){
        let checkedArr = []
        let arrChk=$("input[name='dy']:checked"); 
       let i=0;
       $(arrChk).each(function(){ 
            checkedArr.push(this.value);
            i++;
        });
        console.log(checkedArr.join(',').toString())
        params.surname = submitForm.children().eq(0).val()
        params.name = submitForm.children().eq(1).val()
        params.email = submitForm.children().eq(2).val()
        params.mobile = submitForm.children().eq(3).val()
        params.tel = submitForm.children().eq(4).val()
        params.demand = $('.section1').children().eq(0).val()
        params.instruction = $('.section1').children().eq(1).val()
        params.relation = checkedArr.join(',')? checkedArr.join(',').toString():'0';
        console.log(params)
        $.ajax({
            type: 'POST',
            url: baseUrl+'form',
            headers:{
                "Accept-Language":window.lang,
                "Content-Type":"application/x-www-form-urlencoded"
            },
            data:params,
            success: function(data, status, xhr){
               if(data.error == 0) {
                   alert('提交成功。Success')
               }
            },
            error: function(xhr, type){
                alert('提交失败，请重新尝试。 Fail')
            }
        })
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