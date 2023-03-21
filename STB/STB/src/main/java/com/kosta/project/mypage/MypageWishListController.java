package com.kosta.project.mypage;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kosta.project.member.vo.Member;
import com.kosta.project.product.ProductService;
import com.kosta.project.reply.Wish;
import com.kosta.project.reply.WishService;

/**
 * Servlet implementation class mypageWishListController
 */
@WebServlet("/MypageWishList.do")
public class MypageWishListController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		WishService wishServcie = new WishService();
		ProductService pService = new ProductService();
		
		
		HttpSession session = request.getSession();
		Member member = (Member)session.getAttribute("loginMember");
		System.out.println("멤버:" + member);
		
		
		List<Wish> myWishList = wishServcie.getWishData(member.getUserId());
		request.setAttribute("myWishList", myWishList);	
	
		
		RequestDispatcher rd;
		rd = request.getRequestDispatcher("/jsp/wishList.jsp");
		rd.forward(request, response);
	}


	

}
