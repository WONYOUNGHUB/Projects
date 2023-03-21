package com.zea.geverytime.member.controller;

import java.io.IOException;
import java.util.Properties;
import java.util.Random;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.zea.geverytime.member.model.service.MemberService;
import com.zea.geverytime.member.model.vo.Member;

/**
 * Servlet implementation class FIndPwSevletView
 */
@WebServlet("/member/FindPwServletView")
public class FIndPwServletView extends HttpServlet {
	private static final long serialVersionUID = 1L;	
	MemberService memberService = new MemberService();
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException  {
		request.setCharacterEncoding("utf-8");
		
		String memberId = request.getParameter("memberId");
		System.out.println(memberId);
        String email = request.getParameter("email");
        System.out.println(email);
        //癒쇱� �븘�씠�뵒濡� �쉶�썝�젙蹂대�� 諛쏆븘�삤怨� 媛��졇�삩 �뜲�씠�꽣�뿉�꽌 email媛믪쓣 鍮꾧탳�븯�뿬 議댁옱�븯吏� �븡�쑝硫� �씤利앸찓�씪 蹂대궡吏� 紐삵븿
        Member m = new MemberService().memberCallPw(memberId);
       
        System.out.println(m);
        	
        if(m == null ||  !m.getEmail().equals(email) || !m.getMemberId().equals(memberId))
        {	
             request.getRequestDispatcher("/WEB-INF/views/member/msg.jsp")
             .forward(request, response);
    
         	return;
	
        }		
		        String location = request.getContextPath() + "/";
		        response.sendRedirect(location);
        		//mail server �꽕�젙
                String host = "smtp.naver.com";
                String user = "wonyoung2309"; //�옄�떊�쓽 �꽕�씠踰� 怨꾩젙
                String password = "";//�옄�떊�쓽 �꽕�씠踰� �뙣�뒪�썙�뱶
                int port = 465;
                //硫붿씪 諛쏆쓣 二쇱냼
                String to_email = m.getEmail();
                System.out.println(to_email);
                
                
                //SMTP �꽌踰� �젙蹂대�� �꽕�젙�븳�떎.
                Properties props = new Properties();
                props.put("mail.smtp.host", host);
                props.put("mail.smtp.port", port);
                props.put("mail.smtp.auth", "true");
                props.put("mail.smtp.ssl.enable", "true");
                props.put("mail.smtp.ssl.trust", host);
                //�씤利� 踰덊샇 �깮�꽦湲�
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
                System.out.println(AuthenticationKey);
                
                if(m.getMemberId().equals(memberId)) {
                m.setPassword(temp.toString());
             
                int member =  memberService.insertPassword(m);
                String message = member > 0 ? "珥덇린�솕�꽦怨�!" : "珥덇린�솕�떎�뙣!";
                
                
                Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
                	 String un=user;
                     String pw=password;
                	protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(un,pw);
                    }
                });
              
                session.setDebug(true); //for debug
                //email �쟾�넚
                try {
                    MimeMessage msg = new MimeMessage(session);
                    msg.setFrom(new InternetAddress("wonyoung2309@naver.com"));
                    msg.setRecipient(Message.RecipientType.TO, new InternetAddress(to_email));
                    
                    //硫붿씪 �젣紐�
                    msg.setSubject("�븞�뀞�븯�꽭�슂 Geverytime �씤利� 硫붿씪�엯�땲�떎.");
                    //硫붿씪 �궡�슜
                    msg.setText("�엫�떆 鍮꾨�踰덊샇�뒗 :"+temp);
                    
                    Transport.send(msg);
                    System.out.println("�씠硫붿씪 �쟾�넚");
                
                }catch (Exception e) {
                    e.printStackTrace();// TODO: handle exception
                   
                }
                HttpSession saveKey = request.getSession();
                saveKey.setAttribute("AuthenticationKey", AuthenticationKey);
              
                request.setAttribute("id", memberId);
                RequestDispatcher rd =  request.getRequestDispatcher("/WEB-INF/views/member/redirect.jsp");
                rd.include(request, response);
                }
				    
	}
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	HttpSession session = request.getSession();
			RequestDispatcher rd = request.getRequestDispatcher("/WEB-INF/views/member/searchPasswordStart.jsp");
			rd.forward(request, response);
			}

}
