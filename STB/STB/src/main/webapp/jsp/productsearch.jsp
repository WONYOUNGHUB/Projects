<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">
<title>productsearch STB/listProduct.do</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
	rel="stylesheet">
<link rel=stylesheet href="../css/reset.css">
<link rel=stylesheet href="../css/common.css">
<link rel=stylesheet href="../css/boardList.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<style>
body {
	background-color: #f9f9f9;
}
</style>

</head>
<body>
	<div id="wrap">
		<%-- <%@ include file = "../header.jsp" %> --%>
<%-- 		<jsp:include page="header.jsp"></jsp:include> --%>
		<section>
			<div class="container">

				<div class="form_group">
					<label>카테고리</label> <select name="category_id" id="category_id">
						<option>전체</option>
						<c:forEach items="${clist}" var="category">
							<option value="${category.category_id}">${category.category_name}</option>
						</c:forEach>
					</select> <input type="search" name="keyword" id="keyword">

					<!-- SORT: -->
					<fieldset style="display: inline;">
						<input type="radio" name="productSort" value="desc" checked="checked">최신순 
							<input type="radio" name="productSort" value="asc">과거순
					</fieldset>

					<button id="btnSearch">검색</button>
					<br> <br>


				</div>
				<div id="here">
					<%-- productsearch2.jsp 수행결과가 온다. --%>

				</div>
			</div>


			<script>
				$(function() {
					$('#btnSearch').click(
							function() {
								//
								var category_id = $("#category_id").val();
								var keyword = $("#keyword").val();
								var sort = $(
										"input[name='productSort']:checked")
										.val();
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

										$("#here").html(responseData);
									}
								});
							});
				});
			</script>
			<!-- ------------------------------------------------------------------   -->
			<%--  안붙음 include--%>
			<%-- <%@ include file = "../footer.jsp" %> --%>

			<%-- 솔이씨 include--%>
		</section>
<%-- 		<jsp:include page="footer.jsp"></jsp:include> --%>
	</div>
</body>
</html>