package com.zea.geverytime.customer.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.zea.geverytime.common.MvcUtilsCustomer;
import com.zea.geverytime.customer.model.service.QnaBoardService;
import com.zea.geverytime.customer.model.vo.FaqBoard;

/**
 * Servlet implementation class QaqBoardListServlet
 */
@WebServlet("/customer/faqBoardList")
public class FaqBoardListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private QnaBoardService qnaBoardService = new QnaBoardService();

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			 request.setCharacterEncoding("utf-8");
			 final int numPerPage = 8;
				int cPage = 1;
				try {
					cPage = Integer.parseInt(request.getParameter("cPage"));
				} catch (NumberFormatException e) {}
				int start = (cPage - 1) * numPerPage + 1; 
				int end = cPage * numPerPage;
				Map<String, Integer> param = new HashMap<>();
				param.put("start", start);
				param.put("end", end);
			
			// content영역 : 페이징쿼리
//			List<QnaBoard> list = qnaBoardService.selectAllQnaBoard(param);
			List<FaqBoard> list = qnaBoardService.selectAllFaqBoard(param);
			
			//pagebar영역 : MvcUtilsCustomer.getPagebar 호출
			//totalContent
			int totalContent = qnaBoardService.selectTotalFaqBoardCount();
			System.out.println("[QnaBoardService] totalContent="+ totalContent);
			//url
			String url = request.getRequestURI(); 
			String pagebar = MvcUtilsCustomer.getPagebar(cPage, numPerPage, totalContent, url);
			System.out.println("pagebar@servlet = "  + pagebar);
			
			request.setAttribute("list", list);
			request.setAttribute("pagebar", pagebar);
			request
				.getRequestDispatcher("/WEB-INF/views/customer/faqBoardList.jsp")
				.forward(request, response);
			
			
		} catch (Exception e) {
			e.printStackTrace();//로깅
			throw e; //WAS에게 예외를 전달해서 예외페이지로 이동하도록 함
		}

	}
}
