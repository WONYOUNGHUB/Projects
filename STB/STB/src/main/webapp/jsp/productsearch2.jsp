<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="f" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!-- 
깃허브 테스트 view2
 -->
	<c:if test="${empty productList}">
		<p class="nonelistresults">해당 검색결과가 없습니다.</p>
	</c:if>
	<c:if test="${not empty productList}">
		<div class="row">
			<ul class="list-wrapper">
				<c:forEach items="${productList}" var="productList">
					<li class="ajax_product_detail"
						onclick="ajax_product_detail(${productList.productId});"
						data-product-id="${productList.productId}">
						<div id="product-img">
							<div id="product-status">${productList.productStatus}</div>
							<div id="product-mainImage"><img src="${contextPath}/uploads/${productList.file_name}"/></div>
						</div>
						
						<div id="product-info">
							<p id="title">${productList.productTitle}</p>
							<span id="price">${productList.price}원</span>
							<span id="price">
								<c:set var="dividePrice" value="${productList.price/productList.joinNumber}"/>
								1/N :
								<f:formatNumber type="number" pattern="###,###,###,###,###,###" value="${dividePrice}"/>원</span>
							<span id="date">${productList.reg_date}</span>
						</div>
					</li>
				</c:forEach>
			</ul>
		</div>
	</c:if>
