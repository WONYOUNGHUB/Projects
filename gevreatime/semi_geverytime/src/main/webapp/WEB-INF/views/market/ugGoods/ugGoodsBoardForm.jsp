<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/header.jsp" %>	
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>중고 거래글 작성</title>
<link rel="stylesheet" href="<%= request.getContextPath() %>/css/market/ugGoods/ugBoardForm.css" />
</head>
<body>
	<!-- summernote editor -->
	<script>
	  $(document).ready(function() {
	        $('#summernote').summernote({
	              height: 300,                 // 에디터 높이
	              minHeight: null,             // 최소 높이
	              maxHeight: null,             // 최대 높이
	              focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
	              lang: "ko-KR",                    // 한글 설정
	              placeholder: '예쁜말만 써요',    //placeholder 설정
	              disableResizeEditor: true,
	              height: 310,
	              width: 700
	        });
	    });
	 </script>
	<div id="form-area">
	<form action="<%= request.getContextPath() %>/ugGoods/boardEnroll" enctype="multipart/form-data" method="POST">
		<table id="ugBoardTable">
			<tr>
				<th>제목</th>
				<td><input type="text" name="title" id="title" /></td>
			</tr>
			<tr>
				<th>작성자</th>
				<td><input type="text" name="writer" id="writer" value="<%= loginMember.getMemberId() %>" readonly /></td>
			</tr>
			<tr>
				<th>상품가격</th>
				<td><input type="text" name="price" id="price" /></td>
			</tr>
			<tr>
				<th>사진 이미지 등록<br>(최대 4장)</th>
				<td>
					<input type="file" name="pdtImage1" required/><span id="notiReq">최소 1장은 반드시 등록하셔야 합니다.</span><br />
					<input type="file" name="pdtImage2"/><br />
					<input type="file" name="pdtImage3"/><br />
					<input type="file" name="pdtImage4"/><br />
				</td>
			</tr>
			<tr>
				<th>내용</th>
				<td><textarea name="summernote" id="summernote" class="summernote"></textarea></td>
			</tr>
		</table>
		<button id="submit-btn">제출하기</button>
	</form>
	</div>
</body>
</html>
<%@ include file="/WEB-INF/views/common/footer.jsp" %> 