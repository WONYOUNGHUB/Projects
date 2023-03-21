package com.kosta.project.member.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kosta.project.member.model.service.MemberService;
import com.kosta.project.member.vo.Member;


/**
 * Servlet implementation class UpdatePasswordServlet
 */
@WebServlet("/member/updatePassword")
public class UpdatePasswordController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private MemberService service = new MemberService();

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request
			.getRequestDispatcher("/jsp/updatePassword.jsp")
			.forward(request, response);
	}

	/**
	 * 비밀번호 변경처리
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String location = request.getContextPath();
		String msg = null;
		int result = 0;
		
		String oldPassword = request.getParameter("oldPassword");
		String newPassword = request.getParameter("newPassword");
		
		HttpSession session = request.getSession();
		Member loginMember = (Member) session.getAttribute("loginMember");
		
		// 입력 비밀번호 일치여부
		if(oldPassword.equals(loginMember.getUserPassword())) {
			
			// 기존비밀번호가 일치한 경우만 신규비밀번호로 업데이트
			loginMember.setUserPassword(newPassword);
			result = service.updatePassword(loginMember);
			msg = (result > 0) ? 
					"비밀번호를 성공적으로 변경했습니다." : "비밀번호를 변경에 실패했습니다.";
			location += "/jsp/index.jsp";
		}
		else {
			msg = "비밀번호가 일치하지 않습니다.";				
			location += "/jsp/updatePassword";
		}
		// 사용자 경고창
		session.setAttribute("msg", msg);
		response.sendRedirect(location);
	}

}


