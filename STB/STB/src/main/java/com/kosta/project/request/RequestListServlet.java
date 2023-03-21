package com.kosta.project.request;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kosta.project.member.vo.Member;
import com.kosta.project.product.Product;
import com.kosta.project.product.ProductService;
import com.kosta.project.product.vo.CategoryVO;
import com.kosta.project.util.UploadFileHelper;

/**
 * Servlet implementation class ProductInsertController
 */
@WebServlet("/requestList.do")
public class RequestListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		RequestService requestService = new RequestService();
		 
		HttpSession session = request.getSession();
		Member member = (Member)session.getAttribute("loginMember");
		
		//Member member = new Member();
		//member.setUserId("admin");
		
		List<Product> myrequestList = requestService.selectMyRequest(member.getUserId());
		System.out.println(myrequestList);
		request.setAttribute("myrequestList", myrequestList);	
		request.setAttribute("myjoinList", requestService.selectMyJoin(member.getUserId()));	
		//request.setAttribute("applicantList", requestService.selectMyJoin());
		
		
		RequestDispatcher rd;
		rd = request.getRequestDispatcher("/jsp/request.jsp");
		rd.forward(request, response);
	}
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf-8"); //한글 인코딩

	
	}
	

}
