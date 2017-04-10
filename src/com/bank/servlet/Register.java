package com.bank.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bank.data.UserData;
import com.bank.entity.Message;
import com.bank.entity.User;

/**
 * Servlet implementation class Register
 */
@WebServlet("/Register.do")
public class Register extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Register() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username=request.getParameter("username");
		String password=request.getParameter("username");
		String msg="fail";
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		if(username!=null&&password!=null){
			UserData userd=new UserData();
			User user=new User();
			user.setUsername(username);
			user.setPassword(password);
			user.setUsertype("1");
			user.setStatu(2);
			userd.save(user);
			
			msg="success";
			
		}
		out.print(msg);
		out.flush();
		out.close();

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
