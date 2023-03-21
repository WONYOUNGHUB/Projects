<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
   <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var= "path" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
<link rel=stylesheet href="../css/reset.css">
<link rel=stylesheet href="../css/common.css?after">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>
<body>
	<div id="wrap">
		<%-- <%@ include file="/jsp/header.jsp"%> --%>
	<%-- 	<jsp:include page="header.jsp"></jsp:include> --%>
<section id=enroll-container>
<div id="here">
			
	<h2>비밀번호 변경</h2>
	<form name="updatePwdFrm"
		action="${path}/member/updatePassword"
		method="POST">
		<table>
			<tr>
				<th>현재 비밀번호</th>
					<td>
						<input type="password" name="oldPassword" id="oldPassword" required>
					</td>
			</tr>
			<tr>
				<th>변경할 비밀번호</th>
					<td>
						<input type="password" name="newPassword" id="newPassword" required>
					</td>
			</tr>
			<tr>
				<th>비밀번호 확인</th>
					<td>
						<input type="password" id="newPasswordCheck" required><br>
					</td>
			</tr>
			<tr>
				<td colspan="2" style="text-align: center;">
					<input type="submit" value="변경" />
			</td>
			</tr>
		</table>
	</form>
	</div>
</section>
	<%-- 	<jsp:include page="footer.jsp"></jsp:include> --%>
	</div>
<script>
$("[name=updatePwdFrm]").submit(function(){
	var $oldPassword = $("#oldPassword");
	var $newPassword = $("#newPassword");
	
	if(!passwordValidate()){
		return false;
	}
	
	if($oldPassword.val() == $newPassword.val()){
		alert("기존비밀번호와 신규비밀번호가 같습니다.");
		$oldPassword.select();
		return false;
	}
	return true;
});

$("#newPasswordCheck").blur(passwordValidate);
// 신규비밀번호 일치검사
function passwordValidate(){
	var $newPassword = $("#newPassword");
	var $newPasswordCheck = $("#newPasswordCheck");
	if($newPassword.val() != $newPasswordCheck.val()){
		alert("입력한 비밀번호가 일치하지 않습니다.");
		$newPassword.select();
		return false;
	}
	return true;	
};
</script>
</body>
</html>