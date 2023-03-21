<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap" rel="stylesheet">
<link rel=stylesheet href="${path}/css/reset.css">
<link rel=stylesheet href="${path}/css/common.css?after">
<link rel=stylesheet href="${path}/css/boardList.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js" charset="utf-8"></script>

 <script type="text/javascript">

  var naver_id_login = new naver_id_login("eqagp0fQve1EtqpGZsux");
  // 접근 토큰 값 출력
  //alert(naver_id_login.oauthParams.access_token);
  // 네이버 사용자 프로필 조회
  if(naver_id_login.is_callback == true){
	naver_id_login.get_naver_userprofile("callbackFunction()");
	}

  // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
  function naverSignInCallback() {
	email = naver_id_login.getProfileData('email');
    //alert(naver_id_login.getProfileData('email'));
    //alert(naver_id_login.getProfileData('nickname'));
  	window.close();
  	
    top.opener.location.href="http://localhost:9090/STB/index";

  }
</script>
<script>
	$(function(){
		/* TOP버튼 */
		$("#tothetop").click(function(){
			$('body, html').animate({scrollTop:0}, 400);
			return false;
		});
		
        /*category hover*/      
        $(".dropdown").mouseenter(function(){
  		  $(this).children(".dropdown-content").stop().slideDown(400);
  		});
  		$(".dropdown").mouseleave(function(){
  		  $(this).children(".dropdown-content").stop().slideUp(100);
  		});
  		
  		/*header 내 검색*/  		
  		$("#input_search").on("keydown", function(event){
			  
			  if(event.keyCode == 13) {  
					 $.ajax({
						 url:"${path}/listProduct.do",
						 data:{"category_id":"%",
								"keyword":$(this).val(), "sort":"desc"},
						 type:"post",
						 success:function(responseData){
							 
							 $("#here").html(responseData);
						 }
					 });
			  }
		  });

  		$("#btn_search").on("click", function(event){
			  
			 $.ajax({
				 url:"${path}/listProduct.do",
				 data:{"category_id":"%",
						"keyword":$("#input_search").val(), "sort":"desc"},
				 type:"post",
				 success:function(responseData){
					 
					 $("#here").html(responseData);
				 }
			 });
		
		  });
  		
	});
	/* section 내 검색 */
	function call(category_id){
		 $.ajax({
			 url:"${path}/listProduct.do",
			 data:{"category_id":category_id,
					"keyword":"%", "sort":"desc"},
			 type:"post",
			 success:function(responseData){
				 $("#here").html(responseData);
			 }
		 });
	}
	
	
</script>
	
	<!-- TOP버튼 -->
	<span id="tothetop"><img src="${path}/img/header/top.png" alt="top"></span>
	<!-- 글 작성 버튼 -->
	
	<span id="insertBtn"><a href="${path}/jsp/productInsert.do"><img src="${path}/img/header/insertBtn.png" alt="insert"></a></span>
	<!-- HEADER -->
		<header>
			<div id="header_wrap">
				<div id="header_left">
					<div class="dropdown">
						<p class="dropbtn" id="btn_menu"><img src="${path}/img/header/btn_menu.png"
						alt="menu"></p>
						<div class="dropdown-content" id="category" class="skip">
							<ul>
								<li><a href="javascript:call('1')">OTT구독</a></li>
								<li><a href="javascript:call('2')">여행상품</a></li>
								<li><a href="javascript:call('3')">생활용품</a></li>
								<li><a href="javascript:call('4')">식품</a></li>
								<li><a href="javascript:call('5')">여성의류</a></li>
								<li><a href="javascript:call('6')">남성의류</a></li>
							</ul>
						</div>
					</div>
					<a href="${path}/index" id="logo"><img src="${path}/img/header/logo.png" alt="logo"></a>
				</div>
				<div id="header_center">
					<div id="search">
						<input type="text" placeholder="검색어를 입력하세요." id="input_search">
						<a href="#" id="btn_search"><img src="${path}/img/header/search.png" alt="search"></a>
					</div>
				</div>
				<div id="header_right">
					<c:if test="${loginMember != null}">
					<a id="btn_mypage" href="${path}/jsp/mypage.jsp"><img src="${path}/img/header/mypage.png" alt="mypage">마이페이지</a> 
					<a href="${path}/member/logout" id="btn_logout"><img src="${path}/img/header/logout.png" alt="logout">로그아웃</a>
				   </c:if>
				</div>
			</div>
		</header>
		
