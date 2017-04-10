package com.bank.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bank.data.UserData;
import com.bank.entity.User;


/**
 * Servlet implementation class ChangePassword
 */
@WebServlet("/ChangePassword.do")
public class ChangePassword extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangePassword() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	   String username= request.getParameter("username");
	   String oldpassword= request.getParameter("oldpass");
	   String newpassword= request.getParameter("newpass");
	   String msg="success";
	   UserData userd=new UserData();
	   List<User> users=userd.get(username,"username");
	   if(users.size()>0){
		   if(oldpassword.equals(users.get(0).getPassword())){
			   User user=users.get(0);
			   user.setPassword(newpassword);
			   userd.update(user);
			   
		   }else{msg="cre";}
	   }else{msg="cre";}
		PrintWriter pw = response.getWriter();  
        pw.print(msg);  
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

}
