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
import com.kosta.project.product.ProductService;

/**
 * Servlet implementation class MemberLoginController
 */
@WebServlet("/member/login")
public class MemberLoginController extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private MemberService memberService = new MemberService();
    
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.getRequestDispatcher("/jsp/login.jsp").forward(request, response);
	}
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		request.setCharacterEncoding("utf-8");

		String userId = request.getParameter("userId");
		String password = request.getParameter("password");

		Member member = memberService.selectOneMember(userId);
		System.out.println("userId = " + userId + ", password = " + password);

		HttpSession session = request.getSession();

		session.setAttribute("loginMember", member);
		session.setMaxInactiveInterval(10 * 1800);

		if (member != null && password.equals(member.getUserPassword())) {
			session.removeAttribute("msg");

		//System.out.println("ш린李 : " + member);
		//session.setAttribute("msg", "濡洹몄몃듬.");			
		//Member loginMember = (Member) session.getAttribute("loginMember");
		//request.getRequestDispatcher("/jsp/index.jsp").forward(request, response);
			
		    response.sendRedirect("../index");

		}
           //    /jsp/index.jsp     /jsp/productsearch.jsp
		else if (member == null || !password.equals(member.getUserPassword())) {

			session.setAttribute("msg", "아이디 또는 비밀번호가 맞지 않습니다.");
		
			 
			response.sendRedirect("login");
			
		}

              

	}
//	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//        
//        String referer = request.getHeader("referer");
//        
//        request.setAttribute("referer", referer);
//        
//
//        request.getRequestDispatcher("/WEB-INF/jsp/common.jsp")
//        .forward(request, response);
//    }



}
