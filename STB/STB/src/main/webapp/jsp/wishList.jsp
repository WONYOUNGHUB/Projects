<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>REQUEST PAGE</title>
<style>
/*.request_sub_list {display: none; cursor: pointer;}*/
.request_list>table {border:1px solid gray;}
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<style type="text/css">

    table, th, td {
        border: 1px solid #bcbcbc;
     
      }
	thead{
	 height:30px;
	 background-color: #FFFF00;
	}
	tbody{
	background-color:#FFFFE0;
	height : 15px;
	text-align : center;
	}  
	
	h1{s
	height : 50px;
		
	}
	hr{
	margin-bottom:10px;
	
	}
	
</style>


</head>
<body>
	
	<section>
		<div id="request_wrap">
			<h1>나의 찜목록</h1>
			<hr>
			<ul id="request_content">
					<table class="request_sub_list"  width ="300" ;  height="100"; align = "center"; border-right : 1px solid #ececec; >
						<c:if test="${empty myWishList}">
						<p class="nonelistresults">해당 검색결과가 없습니다.</p>
						</c:if>
						<c:if test="${not empty myWishList}">
					<thead>
						<tr>
							<th>제목</th>
							<th>날짜</th>
					   </tr>
					</thead>			
					  <c:forEach items="${myWishList}" var="myWishList" varStatus="status">
					     	<c:set var="myWishList" value="${myWishList}"/>
							<tbody>			
	   					     <tr>
							    <td><a href="${path}/product/view.do?productId=${myWishList.product_ID}">${myWishList.title}</a></td>
							    <td>${myWishList.wish_DATE}</td>
							</tr>	
							</tbody> 
					</c:forEach>					
					</c:if>
					</table>
			</ul>
		</div>
	</section>
</body>
</html>