package com.bank.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bank.data.MessageData;
import com.bank.data.UserData;
import com.bank.entity.Message;
import com.bank.entity.User;
import com.sun.org.apache.xalan.internal.xsltc.compiler.util.Type;

/**
 * Servlet implementation class Transfer
 */
@WebServlet("/Transfer.do")
public class Transfer extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Transfer() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userid=request.getParameter("userid");
		String toUsername=request.getParameter("toUsername");
		String sum=request.getParameter("sum");
		//取出还是存入
		String ttype=request.getParameter("ttype");
		String msg="fail";
		if(userid!=null){
			UserData userd=new UserData();
			List<User> users=userd.get(userid,"id");
			if(users.size()>0){
				User user=users.get(0);
				BigDecimal bigd=new BigDecimal(sum);
					if(user.getBalance().compareTo(bigd)>=0){
						if(toUsername!=null&&ttype.equals("dual")){
							user.setBalance(user.getBalance().subtract(bigd));
							userd.update(user);
							User toUser=userd.get(toUsername,"username").get(0);
							toUser.setBalance(toUser.getBalance().add(bigd));
							userd.update(toUser);
							Message message=new Message(user.getUsername(), toUser.getUsername(),
									"1", new java.util.Date(), user.getUsername()+"向您转了"+sum+"元", "否");
							new MessageData().save(message);
							
						}else{
							user.setBalance(user.getBalance().subtract(bigd));
							userd.update(user);
							
						}
						
						msg="success";
					}else{
						msg="notEnough";}
			}
			

		}
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
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
