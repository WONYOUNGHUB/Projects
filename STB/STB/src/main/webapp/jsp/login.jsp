<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="java.net.URLEncoder"%>
<%@ page import="java.security.SecureRandom"%>
<%@ page import="java.math.BigInteger"%>
<c:set var="path" value="${pageContext.request.contextPath }"/>
<!DOCTYPE html>
<html>
<head>
<title>공동구매 플랫폼, N분의1</title>
<script type="text/javascript"
	src="https://static.nid.naver.com/js/naverLogin_implicit-1.0.3.js"></script>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link
	href="https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap"
	rel="stylesheet">
<link rel=stylesheet href="../css/reset.css">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>

h1, a, p, li, em, input {
	text-align: center;
	font-family: 'Nanum Gothic', sans-serif;
	color: black;
	letter-spacing: -1px;
}

body {
	background-color: #ffea00;
}

#wrap {
	padding-top: 300px;
	width: 100%;
	margin: 0 auto;
}

h1 {
	font-size: 42px;
	font-weight: 900;
	margin-bottom: 15px;
}

p {
	font-size: 16px;
	margin-bottom: 30px;
}

.input_login {
	font-size: 16px;
	padding-left: 18px;
	text-align: left;
	letter-spacing: -1px;
	display: block;
	width: 331px;
	height: 45px;
	background-color: white;
	border-radius: 15px;
	border: none;
	margin: 0 auto;
	margin-bottom: 10px;
}

.btn_login {
	font-size: 16px;
	letter-spacing: -1px;
	display: block;
	width: 350px;
	height: 45px;
	background-color: white;
	border-radius: 15px;
	border: none;
	margin: 0 auto;
	margin-bottom: 10px;
	background-color: black;
	color: white;
}

a {
	display: inline-block;
	text-decoration: none;
	color: black;
}

#link {
	text-align: center;
}
#link a:hover {
	text-decoration: underline;
}
/* #link a:last-of-type {
	margin-left: 150px;
} */
#look_box {
	align-cotent: left;
	display: inline-block;
	margin-right: 100px;
}

#naver_id_login{
	display: block;
	border-radius: 15px;
	margin-bottom: 10px;

}
</style>

</head>
<body>



	<script type="text/javascript">
		$(function() {
			var msg = "${msg}";
			if (msg != "")
				alert(msg);
		})
	</script>
	<!--여기까지.네이버  -->
	<div id="wrap">
		<p id="logo">
			<img src="${path}/img/header/logo.png" alt="N분의1">
		</p>
		<p>
			함께하면 가벼운 소비,<br>세상의 모든 소비를 나눠보세요.
		</p>

		<form method="post" action="${path}/member/login">
			<input class="input_login" type="text" name="userId" id="user_Id"
				placeholder="이메일주소를 입력하세요."> <input class="input_login"
				type="password" name="password" id="password"
				placeholder="비밀번호를 입력하세요.">
			<input class="btn_login" type="submit" value="로그인">
		</form>
		<div id="link">
			<div id="look_box">
				<a href="#">아이디</a> <a href="${path}/FindePwViewController">/비밀번호찾기</a>
			</div>
			<a href="${path}/member/memberEnroll"> 회원가입</a>
		</div>
	</div>
</body>
</html>