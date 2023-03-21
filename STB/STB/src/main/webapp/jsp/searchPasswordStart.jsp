<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
 <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<title>Insert title here</title>
	<style>
		*{
			text-align : center;
		}
	</style>
</head>
<body>
	<center>
	
	
	<div id="div1">
	<h3>비밀번호 찾기</h3>
		
		<form action="${path}/member/FindPwServlet" id="authform" method="post">
		<table class ="table" style="margin:0 auto;width:700px;">
			<tr>
				<td><input type="text" name="username" id="username" class="form-control" placeholder="이름을 입력하세요" required></td>
			</tr>
			<tr>
				<td><input type="text" name="email" id="email" class="form-control" placeholder="이메일아이디를 입력하세요" required>
				</td>
			</tr>
			
			<tr></tr>
			<tr></tr>
			<tr></tr>
	
			<tr>
			
				<td><button type="submit" id="searchPwBtn" class="w3-button w3-yellow" >확인</button></td>
			</tr>
		
		</table>
		</form>
	
	
	</div>	
</center>
	

</body>
</html>