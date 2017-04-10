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
 * Servlet implementation class Login
 */
@WebServlet("/login.do")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Login() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
		//response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String username= request.getParameter("username");
		String password=request.getParameter("password");
		String msg="fail";
		PrintWriter pw = response.getWriter(); 
		UserData userd=new UserData();
		if(username!=""&&username!=null){
			List<User> users=userd.get(username,"username");
			User user=null;
			if(users.size()>0){
				user=users.get(0);
				if(password.equals(user.getPassword())){
					if(user.getStatu()==1){
					request.getSession().setAttribute("username", username);
					request.getSession().setAttribute("password", password);
					msg="success";
					}else if(user.getStatu()==2){
						//等待审核
						msg="verifying";
					}else if(user.getStatu()==3){
						//审核未通过
						msg="unpassed";
					}else if(user.getStatu()==4){
						//账户已被冻结
						msg="freezed";
					}

				}
			 
			
			}
		}
		//JSONObject outData = new JSONObject();
		//outData.put("msg", msg);
		 pw.print(msg);  
	        pw.flush();  
	        pw.close();
		
	}

}
