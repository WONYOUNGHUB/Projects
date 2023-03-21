package com.kosta.project.reply;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

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

@WebServlet("/like/likeUpdate.do")

public class ReplyController extends HttpServlet {
	private static final long serialVersionUID = 1L;

	ProductService productService;
	Product product;
	Reply reply;
	ReplyService replyService;
	WishService wishService;

	public void init() throws ServletException {
		productService = new ProductService();
		replyService = new ReplyService();
		wishService = new WishService();
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		HttpSession session = request.getSession();
		Member member = (Member) session.getAttribute("loginMember");
		int productId = Integer.parseInt(request.getParameter("boardId"));
		String like01 = request.getParameter("like01");
		
		wishService.like(productId, member.getUserId(), like01);
		
		//String nextPage = "view.do?productId=" + productId;
		//response.sendRedirect(nextPage);
		PrintWriter out = response.getWriter();
		out.print("OK");

	}

}
