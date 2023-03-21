<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>함께하면 가벼운 소비, N분의1</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
	rel="stylesheet">
<link rel=stylesheet href="${path}/css/reset.css">
<link rel=stylesheet href="${path}/css/common.css">
<link rel=stylesheet href="${path}/css/boardList.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
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
  		
  		/*header내 검색*/  		
  		$("#input_search").on("keydown", function(event){
			  
			  if(event.keyCode == 13) {  
					 $.ajax({
						 url:"${path}/listProduct.do",
						 data:{"category_id":"%",
								"keyword":$(this).val(), "sort":"desc"},
						 type:"post",
						 success:function(responseData){
							 
							 $("#ajax_result").html(responseData);
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
					 
					 $("#ajax_result").html(responseData);
				 }
			 });
		
		  });
  		
	});
	/* section내 검색 */
	function call(category_id){
		 $.ajax({
			 url:"${path}/listProduct.do",
			 data:{"category_id":category_id,
					"keyword":"%", "sort":"desc"},
			 type:"post",
			 success:function(responseData){
				 $("#ajax_result").html(responseData);
			 }
		 });
	}
	
</script>
<body>
	<!-- TOP버튼 -->
	<span id="tothetop"><img src="${path}/img/header/top.png"
		alt="top"></span>
	<!-- 글 작성 버튼 -->
	<span id="insertBtn"><img src="${path}/img/header/insertBtn.png"
		alt="insert"></span>
	<!-- WRAP -->
	<div id="wrap">
		<!-- HEADER -->
		<header>
			<div id="header_wrap">
				<div id="header_left">
					<div class="dropdown">
						<p class="dropbtn" id="btn_menu">
							<img src="${path}/img/header/btn_menu.png" alt="menu">
						</p>
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
					<a href="${path}/index" id="logo"><img
						src="${path}/img/header/logo.png" alt="logo"></a>
				</div>
				<div id="header_center">
					<div id="search">
						<input type="text" placeholder="검색어를 입력하세요." id="input_search">
						<a href="#" id="btn_search"><img
							src="${path}/img/header/search.png" alt="search"></a>
					</div>
				</div>
				<div id="header_right">
					<c:if test="${loginMember != null}">
						<p id="btn_mypage">
							<img src="${path}/img/header/mypage.png" alt="mypage">마이페이지
						</p>
						<a href="${path}/member/logout" id="btn_logout"><img
							src="${path}/img/header/logout.png" alt="logout">로그아웃</a>
					</c:if>
				</div>
			</div>
		</header>

		<!-- SECTION -->

		<section id="section_wrap">
			<div class="container" id="section_here">
				<!-- AJAX 내용 삽입 -->
				<div class="form_group">
					<div id="search_category" style="float: left">
						<select name="category_id" id="category_id">
							<option>전체</option>
							<c:forEach items="${clist}" var="category">
								<option value="${category.category_id}">${category.category_name}</option>
							</c:forEach>
						</select> <input type="search" name="keyword" id="keyword">
						<button id="btnSearch">검색</button>
					</div>

					<div id="search_sort" style="float: right">
						<!-- SORT: -->
						<fieldset style="display: inline;">
							<input type="radio" name="productSort" value="desc"	checked="checked">최신순
							<input type="radio"	name="productSort" value="asc">과거순
						</fieldset>
					</div>

				</div>
				<div id="ajax_result">
					<%-- productsearch2.jsp 수행결과가 온다. --%>
				</div>
				<!-- AJAX 내용 끝 -->
			</div>
		</section>

		<!-- FOOTER -->
		<footer>
			<div id="footer_wrap">
				<div id="footer_top">
					<ul>
						<li><a href="#">회사소개</a></li>
						<li><a href="#">자주 묻는 질문</a></li>
						<li><a href="#"><em>고객센터</em></a></li>
						<li><a href="#"><em>이용약관</em></a></li>
						<li><a href="#"><em>개인정보처리방침</em></a></li>
						<li><a href="#">이메일무단수집거부</a></li>
						<li><a href="#">제휴/제안</a></li>
					</ul>
				</div>
				<div id="footer_bottom">
					<a href="index"><img src="${path}/img/header/logo.png"
						alt="N분의1"></a>
					<p>서울사업본부 : 서울특별시 금천구 가산동 가산디지털1로 70 (TEL. 02-6000-1111)</p>
					<p>Copyright&copy;N분의1 All rights reserved.</p>
				</div>
			</div>
		</footer>

	</div>
	<script>
		$(function() {
			$.ajax({
				url : "${path}/listProduct.do",
				data : {
					"category_id" : "%",
					"keyword" : "%",
					"sort" : "desc"
				},
				type : "post",
				success : function(responseData) {

					$("#ajax_result").html(responseData);
				}
			});
			
			
			$('#btnSearch').click(function() {
				//
				var category_id = $("#category_id").val();
				var keyword = $("#keyword").val();
				var sort = $("input[name='productSort']:checked").val();
				//alert(category_id + ":" + keyword + ":" + sort);
				$.ajax({
					url : "listProduct.do",
					data : {
						"category_id" : category_id,
						"keyword" : keyword,
						"sort" : sort
					},
					type : "post",
					success : function(responseData) {

						$("#ajax_result").html(responseData);
					}
				});
			});
			

<!-- GO INSERT -->			

			$('#insertBtn').click(function() {
				$.ajax({
						url : "${path}/jsp/productInsert.do",
						success : function(responseData) {
								$("#section_here").html(responseData);
						}
					});
			});
			
<!-- GO MYPAGE -->			
			$('#btn_mypage').click(function() {
				$.ajax({
						url : "${path}/jsp/mypage.jsp",
						success : function(responseData) {
								$("#section_here").html(responseData);
						}
					});
			});

	});
		
		
<!-- GO PRODUCT DETAIL -->				
	function ajax_product_detail(pid) {
		$.ajax({
				url : "${path}/product/view.do?productId="+ pid,
				success : function(responseData) {
						$("#section_here").html(responseData);
				}
			});
	 }
	</script>
</body>
</html>