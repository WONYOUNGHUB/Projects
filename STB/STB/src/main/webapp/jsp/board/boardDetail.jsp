<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="path" value="${pageContext.request.contextPath}" />
<script src="https://code.jquery.com/jquery-3.5.1.min.js"
	crossorigin="anonymous"></script>
<link rel=stylesheet href="${path}/css/reset.css">
<link rel=stylesheet href="${path}/css/boardDetail.css">
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
	integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
	crossorigin="anonymous">
<script
	src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
	integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
	crossorigin="anonymous"></script>
<link rel=stylesheet href="${path}/css/boardDetail.css">
<div class=board-wrapper>
	<div class=category></div>
	<div class=title-wrapper>
		<div id=item-img>
			<ul class="cnt" id="img-bag">
				<c:forEach var="imgList" items="${imageList}">
					<li><img src="${path}/uploads/${imgList.file_name}" />
				</c:forEach>
			</ul>

			<div class="btn">
				<button type="button" class="prev">
					<img src="${path}/img/testimg/chevron-back-outline.svg">
				</button>
				<button type="button" class="next">
					<img src="${path}/img/testimg/chevron-forward-outline.svg">
				</button>
			</div>
			<div class="auto">
				<button type="button" class="stop">stop</button>
				<button type="button" class="play">play</button>
			</div>

		</div>
		<div id="item-info">
			<div id="item-title">
				<span>${productView.productTitle}</span> <span id="item-date">${productView.userId}</span>
				<div>
					<span id="item-price">${productView.price}</span> <span
						id="join-number">/${productView.joinNumber}</span>
				</div>
			</div>
			<div id="item-ect">
				<span class="item-ect-class"> <img
					src="${path}/img/testimg/eye-outline.svg" alt="조회수">${productView.viewCount}
				</span> <span class="item-ect-class"> <img
					src="${path}/img/testimg/heart-outline.svg" alt="찜">${productView.wishCount}
				</span>
			</div>
			<div id="item-sssss">${productView.productContent}</div>
			<div id="item-buy">
				<input type="hidden" id="like_check" value="like.like_check">

				<c:if test="${productView.wish_check == 1 }">
					<button id="heart" class="heart" data-like="-1">
						<img src="${path}/img/testimg/heart.svg" alt="좋아요버튼"
							class="likeimg">${productView.wishCount}
					</button>
				</c:if>

				<c:if test="${productView.wish_check == 0 }">
					<button id="heart2" class="heart" data-like="+1">
						<img src="${path}/img/testimg/heart.svg" alt="좋아요버튼"
							class="likeimg">${productView.wishCount}
					</button>
				</c:if>
				<button id=buy class="askRequest"
					data-productid="${productView.productId}"
					data-currentNumber="${productView.currentNumber}"
					data-joinNumber="${productView.joinNumber}"
					data-productStatus="${productView.productStatus}">조인요청 (${productView.currentNumber}/${productView.joinNumber})</button>
			</div>

		</div>

	</div>

	<div class="board-contents"></div>


	<div class="card">
		<form>
			<input type="hidden" id="userId" value="${loginMember.userId}" /> 
			<input type="hidden" id="boardId" value="${productView.productId}" />
			<div class="card-body">
				<textarea style="width: 90%; display: inline-block;" 
				id="reply-content" class="form-control" rows="1"></textarea>
				<button type="button" style="float: right;" id="btn-reply"
					class="btn btn-primary">댓글등록
				</button>
				<div>
					비밀글<input type="checkbox" id="btn-secret" value="1">
				</div>
			</div>
		</form>

	</div>

	<div class="board-reply-wrapper">
		<div class="card">
			<div class="card-header">댓글 리스트</div>
			<ul id="reply--box" class="list-group">
				<c:forEach var="reply" items="${replyList}">
					<li id="reply-${reply.reply_ID}"
						class="list-group-item d-flex justify-content-between"><input
						type="hidden" id="replyId" value="${reply.reply_ID}" /> <c:choose>
							<c:when
								test="${reply.reply_SECRET == 1 && productView.userId == loginMember.userId}">
								<div>${reply.reply_CONTENT}<img class="keyimg"
										style="width: 30px;" src="${path}/img/testimg/key-outline.svg">
								</div>
								<div class="d-flex">
									<div class="font-italic">
										작성자 : ${reply.user_ID} <br /> ${reply.reply_DATE} &nbsp;
									</div>

									<c:if test="${loginMember.userId == reply.user_ID}">
										<button class="btn btn-warning badge" id="btn-replyDelete">삭제</button>
									</c:if>
								</div>
							</c:when>
							<c:when
								test="${reply.reply_SECRET == 1 && reply.user_ID !=loginMember.userId}">
								<div>
									비밀글입니다. <img class="keyimg" style="width: 30px;"
										src="${path}/img/testimg/key-outline.svg">
								</div>
								<div class="d-flex">
									<div class="font-italic">
										작성자 : ${reply.user_ID} <br /> ${reply.reply_DATE} &nbsp;
									</div>

									<c:if test="${loginMember.userId == reply.user_ID}">
										<button class="btn btn-warning badge" id="btn-replyDelete">삭제</button>
									</c:if>
								</div>
							</c:when>

							<c:when
								test="${reply.reply_SECRET == 0 && reply.user_ID !=loginMember.userId}">
								<div>${reply.reply_CONTENT}</div>
								<div class="d-flex">
									<div class="font-italic">
										작성자 : ${reply.user_ID} <br /> ${reply.reply_DATE} &nbsp;
									</div>

									<c:if test="${loginMember.userId == reply.user_ID}">
										<button class="btn btn-warning badge" id="btn-replyDelete">삭제</button>
									</c:if>
								</div>
							</c:when>
							<c:when
								test="${reply.reply_SECRET == 1 && reply.user_ID ==loginMember.userId}">
								<div>${reply.reply_CONTENT}<img class="keyimg"
										style="width: 30px;" src="${path}/img/testimg/key-outline.svg">
								</div>
								<div class="d-flex">
									<div class="font-italic">
										작성자 : ${reply.user_ID} <br /> ${reply.reply_DATE} &nbsp;
									</div>

									<c:if test="${loginMember.userId == reply.user_ID}">
										<button class="btn btn-warning badge" id="btn-replyDelete">삭제</button>
									</c:if>
								</div>
							</c:when>

							<c:otherwise>
								<div>${reply.reply_CONTENT}</div>
								<div class="d-flex">
									<div class="font-italic">
										작성자 : ${reply.user_ID} <br /> ${reply.reply_DATE} &nbsp;
									</div>

									<c:if test="${loginMember.userId == reply.user_ID}">
										<button class="btn btn-warning badge" id="btn-replyDelete">삭제</button>
									</c:if>
								</div>
							</c:otherwise>
						</c:choose></li>
				</c:forEach>
			</ul>
		</div>
	</div>
</div>

<!-- 	<script src="../../js/board.js"></script>
 -->
<script>
	$(function() {
		$(".askRequest").click(
				function() {

					var response = confirm("조인을 요청하시겠습니까?\n승인 후 조인이 완료됩니다.");
					var productId = $(this).attr("data-productid");
					var currentNumber = $(this).attr("data-currentNumber");
					var joinNumber = $(this).attr("data-joinNumber");
					var productStatus = $(this).attr("data-productStatus");

					if (productStatus == "모집완료") {

						alert("이미 모집이 완료된 조인입니다.");

					} else if (productStatus == "모집중") {

						if (response == true) {

							alert("조인 요청이 완료되었습니다.");
							location.href = "${path}/askRequest.do?product_id="
									+ productId;

						}
						if (response == false) {

							alert("조인 요청을 취소하였습니다.");

						}
					}
				});

	});

	$(document)
			.ready(
					function() {
						var MOVEING_PX = 4, AUTO_TIME = 2000, slide = document
								.getElementById("item-img"), indi = document
								.createElement("ul"), slideCnt = slide
								.getElementsByClassName("cnt"), slideCntItem = slideCnt[0]
								.getElementsByTagName("li"), prevBtn = slide
								.getElementsByClassName("prev"), nextBtn = slide
								.getElementsByClassName("next"), playBtn = slide
								.getElementsByClassName("play"), stopBtn = slide
								.getElementsByClassName("stop"), playSet = null, before = 0, after = 0, moveIng = false;

						// init
						slideCntItem[0].style.left = 0;
						playBtn[0].style.display = "block";
						var indi = document.createElement("ul");
						for (var i = 0; i < slideCntItem.length; i++) {
							indi.innerHTML += "<li></li>";
						}
						indi.classList.add("indi");
						indi.children[0].classList.add("on");
						slide.append(indi);

						for (var j = 0; j < indi.children.length; j++) {
							indiClick(j);
						}

						// initEvnet
						nextBtn[0].addEventListener("click", function(e) {
							if (!moveIng) {
								after++;
								if (after >= slideCntItem.length) {
									after = 0;
								}
								move(after, before, "next");
								before = after;
							}
						});

						prevBtn[0].addEventListener("click", function(e) {
							if (!moveIng) {
								after--;
								if (after < 0) {
									after = slideCntItem.length - 1;
								}
								move(after, before);
								before = after;
							}
						});

						playBtn[0].addEventListener("click", function() {
							playBtn[0].style.display = "none";
							stopBtn[0].style.display = "block";
							playSet = setInterval(function() {
								if (!moveIng) {
									after++;
									if (after >= slideCntItem.length) {
										after = 0;
									}
									move(after, before, "next");
									before = after;
								}
							}, AUTO_TIME);
						});

						stopBtn[0].addEventListener("click", function() {
							playBtn[0].style.display = "block";
							stopBtn[0].style.display = "none";
							clearInterval(playSet);
						});

						function indiClick(target) {
							indi.children[target].addEventListener("click",
									function() {
										if (!moveIng) {
											after = target;
											if (after > before) {
												move(after, before, "next");
											} else if (after < before) {
												move(after, before);
											}
											before = after;
										}
									});
						}

						function move(after, before, type) {
							var nextX = type === "next" ? slide.offsetWidth
									: slide.offsetWidth * -1, prevX = 0, set = null;
							set = setInterval(function() {
								moveIng = true;
								if (type === "next") {
									nextX -= MOVEING_PX;
									slideCntItem[after].style.left = nextX
											+ "px";
									if (nextX <= 0) {
										clearInterval(set);
										nextX = slide.offsetWidth;
										moveIng = false;
									}
									prevX -= MOVEING_PX;
								} else {
									nextX += MOVEING_PX;
									slideCntItem[after].style.left = nextX
											+ "px";
									if (nextX >= 0) {
										clearInterval(set);
										nextX = slide.offsetWidth * -1;
										moveIng = false;
									}
									prevX += MOVEING_PX;
								}
								slideCntItem[before].style.left = prevX + "px";
							});
							indi.children[before].classList.remove("on");
							indi.children[after].classList.add("on");
						}

					});

	$("#heart2").on('click', function() {
				var like = $(this).attr("data-like");
				console.log($("#boardId").val() + like)
				$.ajax({
					url : '${path}/like/likeUpdate.do',
					type : 'POST',
					data : {
						boardId : $("#boardId").val(),
						"like01" : like},
					success : function(responseData) {
						alert(responseData);
						location.href = "${path}/product/view.do?productId="
								+ $("#boardId").val();},
				})
			});
	$("#heart").on('click',function() {
				var like = $(this).attr("data-like");
				$.ajax({
					url : '${path}/like/likeDelete.do',
					type : 'POST',
					data : {
						boardId : $("#boardId").val(),
						"like01" : like
					},
					success : function(responseData) {
						alert(responseData);
						location.href = "${path}/product/view.do?productId="
								+ $("#boardId").val();
					},
				})
			});

	$("#btn-reply").on('click', function() {
				if ($("#btn-secret").is(":checked") == true) {
					var secretData = 1;
				} else {
					var secretData = 0;
				}

				let data = {
					userId : $("#userId").val(),
					boardId : $("#boardId").val(),
					content : $("#reply-content").val(),
					secret : secretData
				};
				if ($("#reply-content").val().trim() === "") {
					alert("댓글을 입력하세요.");
					$("#reply-content").val("").focus();
				} else {
					console.log(data);
					$.ajax({
						type : "POST",
						url : "${path}/writeReply.do",
						data : data,
						// contentType:"application/json; charset=utf-8",
						// dataType:"json",
						success : function(data, textStatus) {
							alert("댓글이 작성되었습니다.");
							var nextPage = "${path}/product/view.do?productId="
									+ $("#boardId").val();
							location.href = nextPage;
							/*
							alert("댓글이 작성되었습니다.");
							<!-- GO PRODUCT DETAIL -->				
							function ajax_product_detail(boardId) {
								$.ajax({
										url : "${path}/product/view.do?productId="+ boardId,
										success : function(responseData) {
												$("#section_here").html(responseData);
										}
									});
							 }					
							 */
						},
						error : function(data, textStatus) {
							console.log(data)
							alert("에러발생");
						}

					});
				}
			});

	$("#btn-replyDelete").on(
			'click',
			function() {
				let data = {
					userId : $("#userId").val(),
					boardId : $("#boardId").val(),
					replyId : $("#replyId").val()

				};
				$.ajax({
					type : "POST",
					url : "${path}/deleteReply.do",
					data : data,
					// contentType:"application/json; charset=utf-8",
					// dataType:"json",
					success : function(data, textStatus) {
						alert(data);
						var nextPage = "${path}/product/view.do?productId="
								+ $("#boardId").val();
						location.href = nextPage;

					},
					error : function(data, textStatus) {
						alert("에러발생");
					}

				});

			});
</script>


