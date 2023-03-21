<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"
    isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="path" value="${pageContext.request.contextPath}"/>
<link rel=stylesheet href="${path}/css/productInsert.css">
<script>
	/* 총액, 인원 입력하면 자동으로 1/n 계산해서 보여주기 */
	$(function(){
			$("#price, #join_number").change(function(){
				var price = $("#price").val();
				var join_number = $("#join_number").val();
				if(price=="") price=0;
				if(join_number=="") join_number=0;
				if(join_number==0) 
					$("#divide_price").html("")
				else 
					$("#divide_price").html(Math.floor(price/join_number)+"원");
			});
	});
</script>
		<section id="productInsert">
			<h1>조인 만들기</h1>
			<form action="${path}/jsp/productInsert.do" method="post" enctype="multipart/form-data">
				<div class="form_group">
					<label>카테고리</label>
					<select name="category_id">
						<c:forEach items="${clist}" var="category">
			   				<option value="${category.category_id}">${category.category_name}</option>
			 			</c:forEach>
					</select>
				</div>
				<div class="form_group">
					<label>제목</label>
					<input type="text" name="title" maxlength="50" class="input_typing">
				</div>
				<div class="form_group">
					<label>총액</label>
					<input type="number" name="price" id="price" class="input_typing">
				</div>
				<div class="form_group">
					<label>조인인원</label>
					<input type="number" name="join_number"  id="join_number" class="input_typing">
				</div>
				<div class="form_group">
					<label id="divide_label">1/N 가격</label>
					<p id="divide_price"></p>
				</div>
				<div class="form_group">
					<label>사진1</label>
					<input type="file" name="photos" accept="image/*" class="input_file">
				</div>
				<div class="form_group">
					<label>사진2</label>
					<input type="file" name="photos" accept="image/*" class="input_file">
				</div>
				<div class="form_group">
					<label>사진3</label>
					<input type="file" name="photos" accept="image/*" class="input_file">
				</div>
				<div class="form_group">
					<label>사진4</label>
					<input type="file" name="photos" accept="image/*" class="input_file">
				</div>
				<div class="form_group">
					<label>사진5</label>
					<input type="file" name="photos" accept="image/*" class="input_file">
				</div>
				<div class="form_group">
					<label>내용</label>
					<textarea name="content" class="form_content" maxlength="1000"></textarea>
				</div>
				<div class="insert_btn">
					<input type="submit" value="등록">
					<input class="btn btn-secondary" type="reset" value="취소">	
				</div>
				
			</form>
			
		</section>
