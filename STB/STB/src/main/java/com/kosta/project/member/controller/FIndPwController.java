package com.kosta.project.member.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Properties;
import java.util.Random;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.kosta.project.member.model.service.MemberService;
import com.kosta.project.member.vo.Member;

@WebServlet("/member/FindPwServlet")
public class FIndPwController extends HttpServlet {
	private static final long serialVersionUID = 1L;	
	MemberService memberService = new MemberService();
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException  {
		request.setCharacterEncoding("utf-8");
		
		String memberId = request.getParameter("email");
        String userName = request.getParameter("username");
       
        //먼저 아이디로 회원정보를 받아오고 가져온 데이터에서 email값을 비교하여 존재하지 않으면 인증메일 보내지 못함
        Member m = new MemberService().memberCall(memberId);
        	
        if(m == null || !m.getUserId().equals(memberId) || !m.getUserName().equals(userName))
        {	
        	HttpSession session = request.getSession();
        	request.getRequestDispatcher("/jsp/msg.jsp")
             .forward(request, response);

             return;
	
        }		
		/*
		 * String location = request.getContextPath() + "/";
		 * response.sendRedirect(location);
		 */
        		//mail server 설정
                String host = "smtp.naver.com";
                String user = ""; //자신의 네이버 계정
                String password ="";//자신의 네이버 패스워드
                
                int port = 465;
                //메일 받을 주소
                String to_email = m.getUserId();
                
                //SMTP 서버 정보를 설정한다.
                Properties props = new Properties();
                props.put("mail.smtp.host", host);
                props.put("mail.smtp.port", port);
                props.put("mail.smtp.auth", "true");
                props.put("mail.smtp.ssl.enable", "true");
                props.put("mail.smtp.ssl.trust", host);
                //인증 번호 생성기
                StringBuffer temp =new StringBuffer();
                Random rnd = new Random();
                for(int i=0;i<10;i++)
                {
                    int rIndex = rnd.nextInt(3);
                    switch (rIndex) {
                    case 0:
                        // a-z
                        temp.append((char) ((int) (rnd.nextInt(26)) + 97));
                        break;
                    case 1:
                        // A-Z
                        temp.append((char) ((int) (rnd.nextInt(26)) + 65));
                        break;
                    case 2:
                        // 0-9
                        temp.append((rnd.nextInt(10)));
                        break;
                    }
                }
                String AuthenticationKey = temp.toString();
                
                
                if(m.getUserId().equals(memberId)) {
                m.setUserPassword(temp.toString());
             
                int member =  memberService.insertPassword(m);
                String message = member > 0 ? "초기화성공!" : "초기화실패!";
                
                
                Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
                	 String un=user;
                     String pw=password;
                     
                	protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(un,pw);
                	}
                });
              
                session.setDebug(true); //for debug
                //email 전송
                try {
                    MimeMessage msg = new MimeMessage(session);
                    msg.setFrom(new InternetAddress("wonyoung2309@naver.com"));
                    msg.setRecipient(Message.RecipientType.TO, new InternetAddress(to_email));
                    
                    //메일 제목
                    msg.setSubject("안녕하세요 1/n 인증 메일입니다.");
                    //메일 내용
                    msg.setText("임시 비밀번호는 :"+temp+"입니다. 로그인후 변경하세요!");
                    
                    Transport.send(msg);
                  
                
                }catch (Exception e) {
                    e.printStackTrace();// TODO: handle exception
                   
                }
                HttpSession saveKey = request.getSession();
                saveKey.setAttribute("AuthenticationKey", AuthenticationKey);
              
                //request.setAttribute("id", memberId);
				/*
				 * String local = request.getContextPath() + "/jsp/redirect.jsp";
				 * System.out.println(local);
				 */
				/*
				 * RequestDispatcher rd = request.getRequestDispatcher("/jsp/redirect.jsp");
				 * rd.include(request, response);
				 */
                
                String location = request.getContextPath() + "/jsp/login.jsp";
				/*
				 * response.sendRedirect(location); return;
				 */
                response.setContentType("text/html; charset=UTF-8");
                PrintWriter writer = response.getWriter();
                writer.println("<script>alert('메일이발송되었습니다.'); location.href='"+location+"';</script>"); 
                writer.close();
                }
				    
	}
}