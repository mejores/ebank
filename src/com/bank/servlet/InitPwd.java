package com.bank.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.attribute.UserPrincipalLookupService;
import java.util.List;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.bank.data.MessageData;
import com.bank.data.UserData;
import com.bank.entity.Message;
import com.bank.entity.User;

/**
 * Servlet implementation class InitPwd
 */
@WebServlet("/initPwd.do")
public class InitPwd extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public InitPwd() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userid=request.getParameter("userid");
		HttpSession session=request.getSession();
		String sName="";
		if(session.getAttribute("username")!=null){
		  sName=session.getAttribute("username").toString();}
		
		PrintWriter pw=response.getWriter();
		String msg="fail";
		if(userid!=null){
			String password=getPwd(6);
			UserData userd=new UserData();
			List<User> users = userd.get(userid, "id");
			if(users.size()>0){
				User user=users.get(0);
				user.setPassword(password);
				userd.update(user);
				Message message=new Message();
				message.setFrom(sName);
				message.setTo(user.getUsername());
				message.setContent("重置了您的密码");
				message.setIsReaded("否");
				new MessageData().save(message);
				msg=password;
			}
			
		}
		pw.println(msg);
		pw.flush();
		pw.close();
		
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	
	private String getPwd(int length){
		String base="abcdefghijklmnopqrstuvwxyz0123456789";
		Random random=new Random();
		StringBuffer sb=new StringBuffer();
		for(int i=0;i<length;i++){
			int number=random.nextInt(base.length());
			sb.append(base.charAt(number));
		}
		return sb.toString();
}

}
