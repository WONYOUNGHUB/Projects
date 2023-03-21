package com.kosta.project.product;

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
import com.kosta.project.reply.Reply;
import com.kosta.project.reply.ReplyService;


@WebServlet("*.do")
public class ProductController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	ProductService productService;
	Product product;
	Reply reply;
	ReplyService replyService;
	ImageService imageService;
	
	public void init() throws ServletException{
		productService = new ProductService();
		replyService = new ReplyService();
		imageService = new ImageService();
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		doHandle(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		doHandle(request, response);
	}
	
	private void doHandle(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		String nextPage = "";
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=utf-8");
		String action = request.getServletPath();
		System.out.println("action:" + action);
		
		
		HttpSession session = request.getSession();
		Member member = (Member)session.getAttribute("loginMember");
		
		
		try {
			List<Product> productList = new ArrayList<Product>();
			if(action == null) {
//				productList = productService.listProduct();
//				request.setAttribute("productList", productList);
//				nextPage= "/jsp/board/boardList.jsp";
				System.out.println("하이");
//			} else if(action.equals("/listProduct.do")) {
//				productList = productService.listProduct();
//				request.setAttribute("productList", productList);
//				nextPage= "/jsp/board/boardList.jsp";
			} else if(action.equals("/product/view.do")) {
				System.out.println("view호출");
				int productId = Integer.parseInt(request.getParameter("productId"));
				
				System.out.println(productId);
				
				List<Reply> replylist = replyService.replyList(productId);
				product = productService.view(productId, member.getUserId());
				request.setAttribute("memberSession", member);
				request.setAttribute("imageList", imageService.getImageList(productId));
				request.setAttribute("productView", product);
				request.setAttribute("replyList", replylist);
				nextPage = "/jsp/board/boardDetail.jsp";
				
			} else if (action.equals("/writeReply.do")) {
				/*
				 * String jsonInfo = request.getParameter("jsonInfo"); try { JSONParser
				 * jsonParser = new JSONParser(); JSONObject jsonObject = jsonObject =
				 * (JSONObject) jsonParser.parse(jsonInfo);
				 * System.out.println(jsonObject.get("userId"));
				 * 
				 * } catch(Exception e) { e.printStackTrace(); }
				 */
				String userId = member.getUserId();
				int productId = Integer.parseInt(request.getParameter("boardId"));
				String content = request.getParameter("content");
				int secret = Integer.parseInt(request.getParameter("secret"));

				System.out.println(userId);
				reply = new Reply(productId, userId, content, secret);
				replyService.create(reply);

				PrintWriter out = response.getWriter();
				out.print("OK");
				return;
			} 
			
			RequestDispatcher dispatch = request.getRequestDispatcher(nextPage);
			dispatch.forward(request, response);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
