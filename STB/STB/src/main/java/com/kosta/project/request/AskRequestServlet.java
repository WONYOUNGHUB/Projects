package com.kosta.project.request;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kosta.project.member.vo.Member;

/**
 * Servlet implementation class AskRequestServlet
 */
@WebServlet("/askRequest.do")
public class AskRequestServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		HttpSession session = request.getSession();
		Member member = (Member)session.getAttribute("loginMember");
		
		int product_id = Integer.parseInt(request.getParameter("product_id"));
		RequestVO askRequest = new RequestVO();
		RequestService service = new RequestService();
		
		askRequest.setUser_id(member.getUserId());
		askRequest.setProduct_id(product_id);
		
		service.askRequest(askRequest);
		response.sendRedirect("index");
		
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		
		
	}

}
