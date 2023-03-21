<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="ko">
<head>
<link rel=stylesheet href="../css/reset.css">
<link rel=stylesheet href="../css/common.css?after">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>N분의1 - 회원가입</title>

<!-- Bootstrap CSS -->
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
	integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
	crossorigin="anonymous">

<style>
body {
	min-height: 100vh;
	background: -webkit-gradient(linear, left bottom, right top, from(#92b5db),
		to(#1d466c));
	background: -webkit-linear-gradient(bottom left, #FFFFF0 0%, #FFFACD 100%);
	background: -moz-linear-gradient(bottom left, #FFFFF0 0%, #FFFACD 100%);
	background: -o-linear-gradient(bottom left, #FFFFF0 0%, #FFFACD 100%);
	background: linear-gradient(to top right, #FFFFF0 0%, #FFFACD 100%);
}

.input-form {
	max-width: 680px;
	margin-top: 80px;
	padding: 32px;
	background: #FFF;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	-webkit-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
	-moz-box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
	box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15)
}

#phone {
	hr-sect: after;
}

#message {
	color: red;
	font-size: 10px;
}

#message2 {
	color: red;
	font-size: 10px;
}

.button {
	border: 1x solid #ff0080; /*---테두리 정의---*/
	background-Color: #FFFACD; /*--백그라운드 정의---*/
	font: 12px 굴림; /*--폰트 정의---*/
	font-weight: bold; /*--폰트 굵기---*/
	color: #ff0080; /*--폰트 색깔---*/
	width: 130;
	height: 30; /*--버튼 크기---*/
}
</style>

<script type="text/javascript"
	src="http://code.jquery.com/jquery-latest.min.js"></script>



</head>

<body>
	<section>
		<div id="here">
			<div class="container">
				<form class="validation-form" id="validation-form" method="post"
					action="${path}/member/memberEnroll" novalidate>
					<div class="input-form-backgroud row">
						<div class="input-form col-md-12 mx-auto">

							<h4 class="mb-3">회원가입</h4>




							<div class="mb-3">
								<label for="email">아이디</label> <input type="button"
									class="button" style="padding: 1px 1px; font-size: 15px;"
									id="checkIdDuplicate" value="중복체크"> <span id="message2"></span>
								<table>
									<tr>
										<td><input type="text" class="form-control" id="userId"
											name="userId" placeholder="이메일형식"
											style="width: 150px; height: 30px;" required></td>
										<td>@</td>
										<td><select class="form-control" id="emailId"
											name="emailId" style="width: 150px; height: 30px;">
												<option value="" disabled selected>E-Mail 선택</option>
												<option>naver.com</option>
												<option>hanmail.net</option>
												<option>gmail.com</option>
												<option>nate.com</option>
												<option value="directly">직접 입력하기</option>
										</select></td>
									</tr>
								</table>
								<div class="invalid-feedback">이메일을 입력해주세요.</div>
							</div>

							<div class="row" style="display: block;">
								<div class="col-md-6 mb-3">
									<label for="name">이름</label> <input type="text"
										class="form-control" id="userName" name="userName"
										style="width: 150px; height: 30px;" placeholder="" value=""
										required>
									<div class="invalid-feedback">이름을 입력해주세요.</div>
								</div>


								<div class="col-md-6 mb-3">
									<label for="nickname">별명</label> <input type="button"
										class="button" style="padding: 1px 1px; font-size: 15px;"
										id="duplicateCheckBtn" value="중복체크"> <span
										id="message"></span> <input type="text" class="form-control"
										id="nickName" name="nickName" placeholder="" value=""
										style="width: 150px; height: 30px;" maxlength="5" required>
									<div class="invalid-feedback">별명을 입력해주세요.</div>
								</div>
							</div>



							<div class="mb-3" style="position: block">
								<label for="password">비밀번호</label> <input type="password"
									class="form-control" id="userPassword" name="userPassword"
									style="width: 150px; height: 30px;" maxlength="13" required>
								<label for="password">비밀번호확인</label> <input type="password"
									class="form-control" id="passwordCheck" name="passwordCheck"
									style="width: 150px; height: 30px;" maxlength="13"
									placeholder="한번더 입력 하세요.;" required>

								<div class="invalid-feedback"></div>
							</div>

							<div>
								<label for="phone">휴대폰번호 :</label> <input type="text" id="phone"
									name="phone1" value="010" class="form-control"
									style="width: 75px; height: 20px; font-size: 15px; display: inline-block; margin-left: 10px; margin-top: 20px;"
									readonly> <input type="text" id="phone" name="phone2"
									class="form-control"
									style="width: 75px; height: 20px; font-size: 15px; display: inline-block; margin-left: 10px; margin-top: 20px;"
									maxlength="4"> <input type="text" id="phone"
									name="phone3" class="form-control"
									style="width: 75px; height: 20px; font-size: 15px; display: inline-block; margin-left: 10px; margin-top: 20px;"
									maxlength="4">
							</div>
							<!-- div class="mb-3">
            <label for="address2">비밀번호 확인<span class="text-muted">&nbsp;(필수 아님)</span></label>
            <input type="text" class="form-control" id="address2" placeholder="상세주소를 입력해주세요.">
          </div -->
						</div>
					</div>
					<div style="width: 680px; margin: 0 auto 100px auto;">

						<hr class="mb-4">
						<div class="custom-control custom-checkbox">
							<input type="checkbox" class="custom-control-input"
								id="aggrement" required> <label
								class="custom-control-label" for="aggrement">개인정보 수집 및
								이용에 동의합니다.</label>
						</div>
						<div class="mb-4"></div>
						<button class="btn btn-lg btn-block"
							style="color: black; background-color: #ffea00" type="submit">가입
							완료</button>
					</div>
				</form>

			</div>
		</div>
		<!--  <footer class="my-3 text-center text-small">
      <p class="mb-1">&copy; 2021 YD</p>
    </footer>
     -->
	</section>
	<jsp:include page="footer.jsp"></jsp:include>



	<script>

    $(function() {
        $('#select').change(function() {
            if ($('#select').val() == 'directly') {
                $('#textEmail').attr("disabled", false);
                $('#textEmail').val("");
                $('#textEmail').focus();
            } else {
                $('#textEmail').val($('#select').val());
            }
        })
    });
</script>
	<script>
    window.addEventListener('load', () => {
      const forms = document.getElementsByClassName('validation-form');

      Array.prototype.filter.call(forms, (form) => {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  
    
    $(function (){
    	$("#duplicateCheckBtn").click(function(){
    		var nickName = $("#nickName").val();
    		alert(nickName);
    		if(nickName==""||nickName==null){
    			alert("별명은 필수입력입니다.");
    			$("#nickName").focus();
    			return;
    		}
    		$.ajax({
    			url:"nickname",
    			data:{"nickname":$("#nickName").val()  },
    			type:"get",
    			success: function(responseData){
    				//중복:1, 중복안됨:0
    				$("#message").html(responseData==1?"이미 존재하는 별명입니다.":"사용가능합니다.");
    			},
    			fail:function(){}
    		});
    	});
    });
    var checkIdDuplicateFlag = 0;
    $(function (){
    	
    	$("#checkIdDuplicate").click(function(){
    		var userId = $("#userId").val();
			var emailId =  $("#emailId").val();
    		if(userId==""||userId==null){
    			alert("아이디는 필수입력입니다.");
    			$("#userId").focus();
    			return;
    		}
    		//alert($(emailId));
    		$.ajax({
    			url:"IdFindCheck",
    			data:{"userId":userId,"emailId":emailId},
    			type:"get",
    			success: function(responseData){
    				//중복:1, 중복안됨:0
    				var result = responseData==1?"이미 존재하는 아이디입니다.":"사용가능합니다.";
    				$("#message2").html(result);
    				if(responseData!=1) checkIdDuplicateFlag=1;
    			},
    			fail:function(){}
    		});
    	});
    });
    

    $("#validation-form").submit((e) => {
  
    	if(checkIdDuplicateFlag==0){
    		alert("아이디중복체크를 하세요!");
    		return false;
    	}
    
    	//password
    	const $password = $("#userPassword");
    	const $passwordCheck = $("#passwordCheck");
        const $emailId =  $("#emailId").val();
    	const $checkIdDuplicate = $("#checkIdDuplicate").val();
    	if(!/^[a-zA-Z0-9!@#$]{4,}$/.test($password.val())){
    		alert("유효한 패스워드를 입력하세요.");
    		return false;
    	}
    	if($password.val() != $passwordCheck.val()){
    		alert("패스워드가 일치하지 않습니다.");
    		return false;
    	}
    	
    	 if($emailId == ""||$emailId=="directly"||$emailId == null ){
    	   alert("이메일을 선택하세요");
    	 	return false;   	
    	 } 
    	 if(checkIdDuplicate)
    	return true;
    
    	    
    });
   
    
  </script>
</body>

</html>
