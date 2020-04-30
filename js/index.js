$(function(){
	var cMenu=vNum=rNum=thNum=cLang=voIdx=rwBtn=0;
	var ttActive=ttNext=ttPrev=ttPrevNum=null;

	//Top Banner
	$('#topBanner .close').on({
		click:function(){
			$('#topBanner').hide();
		}
	});

	//전체 메뉴
	$('.btn_all').on({
		click: function(){
			if(cMenu==0){
				$('.btn_all').css('background-position','0 -41px');
				$('.subNavAll').show();
				cMenu=1;
			}else{
				$('.btn_all').css('background-position','0 0');
				$('.subNavAll').hide();
				cMenu=0;
			}
			
		}
	});

	//Main Visual
	setInterval(visualAuto,5000);
	function visualAuto(){
		var mvIdx=$('.mainVisual li>a.active').parent().index();
		if(mvIdx!==$('.mainVisual li').length-1){mvIdx++;}
		else{mvIdx=0;}
		visualOn($('.mainVisual li').eq(mvIdx).children('a'),mvIdx);
	}


	//Ticket Open
	setInterval(ticketOpenAuto,3000);
	function ticketOpenAuto(){
		$('.ticketOpen>div>ul').stop().animate({top:'-38px'},500,function(){
			$('.ticketOpen>div>ul').append($('.ticketOpen>div>ul>li').eq(0));
			$('.ticketOpen>div>ul').append($('.ticketOpen>div>ul>li').eq(0));
			$('.ticketOpen>div>ul').css('top','0');
		});
	}

	//Banner Video
	var vaInt = setInterval(videoAuto,4000);
	function videoAuto(){
		var vaIdx=$('.videoTab>ul>li.active').index();
		if(vaIdx!==$('.videoTab>ul>li').length-1){vaIdx++;}
		else{vaIdx=0;}
		videoOn($('.videoTab>ul>li').eq(vaIdx).children('a'),vaIdx);
	}


	//랭킹
	$('.rankingTitle>ul>li>a').each(function(ridx){
		$(this).on({
			click:function(){
				$('.rankingTitle>ul>li>a').removeClass('active');
				$(this).addClass('active');

				$('.rankingSub').hide();
				$(this).next('.rankingSub').show();
			}
		});
	});

	//티켓투데이
	$('.ticketTodayEach>.next').on({
		click: function(){
			ttActive=$(this).siblings('.active');

			if(ttActive.next().hasClass('eachArray')){
				ttNext=ttActive.next();
			}else{
				ttNext=$(this).siblings('.eachArray').eq(0);
			}
			ttFn(ttNext);
		}
	});

	$('.ticketTodayEach>.prev').on({
		click: function(){
			ttActive=$(this).siblings('.active');
			ttPrevNum=$(this).siblings('.eachArray').length;

			if(ttActive.prev().hasClass('eachArray')){
				ttPrev=ttActive.prev();
			}else{
				ttPrev=$(this).siblings('.eachArray').eq(ttPrevNum-1);
			}
			ttFn(ttPrev);
		}
	});

	function ttFn(ttChange){
		ttChange.addClass('tempTop').fadeIn(500,function(){
			ttActive.removeClass('active').hide();
			ttChange.addClass('active').removeClass('tempTop');
		});
	}

	//Theme 자동 전환
	var thInt = setInterval(themeAuto,5000);

	function themeAuto(){
		var thIdx=$('.themeNav>ul>li.active').index();

		if(thIdx!==$('.themeCate').length-1){
			thIdx++;
		}else{
			thIdx=0;
		}

		themeOn($('.themeCate').eq(thIdx).children('a'),thIdx);
	}

	$('.themeBody').on({
		mouseenter: function(){
			clearInterval(thInt);
		},
		mouseleave: function(){
			thInt = setInterval(themeAuto,5000);
		}
	});

	//전국공연
	$('.showTitle>ul>li>a').on({
		click:function(){
			$('.showTitle>ul>li').removeClass('active');
			$('.showContent>div').hide();
			$(this).parent().addClass('active');
			if($(this).hasClass('aRegion')){
				$('.showRegion').show();
			}else{
				$('.showPlace').show();
			}
		}
	});

	$('.showRegion>.showTab>ul>li>div>a').click(function(){
	 	$('.showRegion>.showTab>ul>li').removeClass('active');
	 	$(this).parent().parent().addClass('active');
	 	$('.showRegion>.showBody>ul').hide();
	 	var srIdx=$(this).parent().parent().index();
	 	$('.showRegion>.showBody>ul').eq(srIdx).show();
	});

	$('.showPlace>.showTab>ul>li>div>a').click(function(){
	 	$('.showPlace>.showTab>ul>li').removeClass('active');
	 	$(this).parent().parent().addClass('active');
	 	$('.showPlace>.showBody>ul').hide();
	 	var spIdx=$(this).parent().parent().index();
	 	$('.showPlace>.showBody>ul').eq(spIdx).show();
	});

	//footer language
	$('.language>div>a').click(function(){
		if(cLang==0){
			$('.language>ul').show();
			$('.language>div>a').css('background-position','93% -5px');
			cLang=1;
		}else{
			$('.language>ul').hide();
			$('.language>div>a').css('background-position','93% 12px');
			cLang=0;
		}
	});

	//Side Left
	$(window).scroll(function(){
		if($(window).scrollTop()<730){
			$('#sideLeft').css('top','730px');
		}else{
			$('#sideLeft').stop().animate({top:$(window).scrollTop()},100);
		}
	});

	//Side Right
	$('#sideRight>.small').mouseenter(function(){
		$('#sideRight>.small').hide();
		$('#sideRight>.big').css('display','block');
	});
	$('#sideRight>.big>.close').click(function(){
		$('#sideRight>.big>.close').hide();
		$('#sideRight>.big').stop().animate({width:'200px',right:'100px',opacity:0},function(){
			$('#sideRight>.big').hide().css({width:'750px',right:'650px',opacity:1});
			$('#sideRight>.big>.close').show();
			$('#sideRight>.small').show();
		});
	});
	$(window).scroll(function(){
		if($(window).scrollTop()<667){
			$('#sideRight').css({'position':'absolute','top':'730px'});
		}else{
			$('#sideRight').css({'position':'fixed','top':'63px'});
		}
	});

	//오늘 그만보기
	function setCookie(cName,cValue){
		var midnight = new Date();
		midnight.setHours(23,59,59,0);
		document.cookie=cName+'='+cValue+';expires='+midnight+';path=/';
	}
	function getCookie(cName){
		var name=cName+'=';
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i=0;i<ca.length;i++){
			var c=ca[i];
			while(c.charAt(0)==' '){
				c=c.substring(1);//첫번째가 빈칸이면 두번째꺼 소환
			}
			if(c.indexOf(name)==0){
				return c.substring(name.length,c.length);
			}
		}
		return '';
	}

	//버튼 눌렀을때
	$('.popClose').click(function(){
		if($('#popupNotToday').prop('checked')){
			setCookie('popCheck','notToday');
		}
		$('#popup').hide();
	});

	//항상
	var ntCookie = getCookie('popCheck');
	if(ntCookie!='notToday'){
		$('#popup').show();
	}

	//Right Wing
	$('#rightWing>a').click(function(){
		if(rwBtn==0){
			$('#rightWing').css('right','-110px');
			$('#rightWing>a').css('background','url(img/sidemenu/rightWing_open.gif) no-repeat');
			rwBtn=1;
		}else{
			$('#rightWing').css('right','0');
			$('#rightWing>a').css('background','url(img/sidemenu/rightWing_close.gif) no-repeat');
			rwBtn=0;
		}
	});


});//index.js

function visualOn(obj,idx){
	$('.mainVisual li>a').removeClass('active');
	obj.addClass('active');
	vNum=idx+1;
	if(vNum<10){
		$('.mainVisual').css('background','url(img/mainvisual/0'+vNum+'.jpg) center 0 no-repeat');
		$('.mainVisual>div>a').attr('href','#link0'+vNum);
	}else{
		$('.mainVisual').css('background','url(img/mainvisual/'+vNum+'.jpg) center 0 no-repeat');
		$('.mainVisual>div>a').attr('href','#link'+vNum);
	}
}

function videoOn(obj,idx){
	$('.videoTab>ul>li').removeClass('active');
	obj.parent().addClass('active');
	voIdx=idx+1
	$('.videoThumb>img').attr('src','img/bannervideo/1-'+voIdx+'.jpg')
	$('.videoThumb').attr('href','#link'+voIdx);
	$('.playBtn').attr('href','#link'+voIdx);
}

function themeOn(obj,idx){
	$('.themeCate').removeClass('active');
	$('.themeContent').hide();
	obj.parent().addClass('active');
	$('.themeContent').eq(idx).show();
}


