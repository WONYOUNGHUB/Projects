package com.kosta.project.member.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kosta.project.member.model.service.MemberService;
import com.kosta.project.member.model.service.MemberUpdateService;
import com.kosta.project.member.vo.Member;

/**
 * Servlet implementation class MemberUpdateController
 */
@WebServlet("/member/MemberUpdate")
public class MemberUpdateController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private MemberService memberService = new MemberService();
    private MemberUpdateService updateService =  new MemberUpdateService();
	
    
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getRequestDispatcher("/jsp/mypage.jsp").forward(request, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		request.setCharacterEncoding("utf-8");
		
		String phone = request.getParameter("phone");
		String userId = request.getParameter("userId");
	
		Member member = new Member(userId,phone);
		System.out.println("memberUpdateServlet " + member);
		
		int result = memberService.updateMember(member);
		String msg = (result > 0) ? "회원정보 수정 성공" : "회원정보 수정 실패";
	
		if(result > 0) {
			Member updateMember = memberService.selectOneMember(userId);
			session.setAttribute("loginMember", updateMember);
		}
		
		
		String location = request.getContextPath() + "/jsp/mypage.jsp";
		response.sendRedirect(location);
	}

	}


