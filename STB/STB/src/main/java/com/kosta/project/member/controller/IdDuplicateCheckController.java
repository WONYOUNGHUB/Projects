package com.kosta.project.member.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kosta.project.member.model.service.MemberService;
import com.kosta.project.member.vo.Member;

/**
 * Servlet implementation class IdFIndCheckController
 */
@WebServlet("/member/IdFindCheck")
public class IdDuplicateCheckController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		

//		String nickname = request.getParameter("nickName");
//       //System.out.println("emp_Id:" + nickname);

		String userId = request.getParameter("userId");
		String emailId = "@" + request.getParameter("emailId");
		String Id = userId.concat(emailId);
		System.out.println(Id);
		MemberService service = new MemberService();
        Member member = service.selectOneMember(Id);
        PrintWriter out = response.getWriter();
        out.print(member==null?0:1);
	}


	

	
	
	
}
