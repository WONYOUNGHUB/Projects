package com.zea.geverytime.member.controller;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


import com.zea.geverytime.member.model.service.BusinessService;
import com.zea.geverytime.member.model.service.MemberService;
import com.zea.geverytime.member.model.vo.Business;
import com.zea.geverytime.member.model.vo.Member;
@WebServlet("/member/login")
public class MemberLoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private MemberService memberService = new MemberService();
    private BusinessService businessService = new BusinessService();
    /**
     *  @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
    	request.setCharacterEncoding("utf-8");
       
    	String memberId = request.getParameter("memberId");
        String password =request.getParameter("password");
        System.out.println("memberId = " + memberId + ", password = " + password);
    
        
        Member member = memberService.selectOneMember(memberId);
        
        
        System.out.println("member@MemberLoginServlet.doPost = " + member);
        
        HttpSession session = request.getSession(true); 
      
        
        session.setMaxInactiveInterval(10*1800);
    
                if(member != null && password.equals(member.getPassword())) {
                   
                    session.setAttribute("loginMember", member);
                    session.setAttribute("msg", "아이디또는비밀번호가다릅니다.");
                    Member loginMember = (Member) session.getAttribute("loginMember"); 
                   
                    
                    String businessId = loginMember.getMemberId();
                    Business business = businessService.selectOneMember(businessId);
                    System.out.println("member@MemberLoginServlet.doPost = " + businessId);
                    session.setAttribute("businessMember", business);
                    System.out.println("businessMember :"  + business);            
                }
                
                else if(member  ==  null || !password.equals(member.getPassword())){
                	
                    session.setAttribute("msg", "아이디또는 비밀번호가 다릅니다.!");
                    
                }
                
               String location = request.getContextPath() + "/";
                response.sendRedirect(location);
                

            

//
//                String referer = request.getParameter("referer");
//
//                response.sendRedirect(referer);
                               
			    
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        
        String referer = request.getHeader("referer");
        
        request.setAttribute("referer", referer);
        

        request.getRequestDispatcher("/WEB-INF/views/member/login.jsp")
        .forward(request, response);
    }

}
