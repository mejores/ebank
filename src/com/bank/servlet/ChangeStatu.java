package com.bank.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

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
 * Servlet implementation class ChangeStatu
 */
@WebServlet("/changeStatu.do")
public class ChangeStatu extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ChangeStatu() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		String statu=request.getParameter("statu");
		String userid=request.getParameter("userid");
		HttpSession session=request.getSession();
		String mname="";
		String msg="fail";
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		if(session.getAttribute("username")!=null){
		 mname=session.getAttribute("username").toString();}
		if(userid!=null){
			UserData userd=new UserData();
			List<User> users=userd.get(userid,"id");
			if(users.size()>0){
				User user=users.get(0);
				Message message=new Message();
				if(statu.equals("1to4")){
					user.setStatu(4);
					message.setContent("冻结了您的账户");
				}else if(statu.equals("4to1")){
					user.setStatu(1);
					message.setContent("解冻了您的账户");
				}else if(statu.equals("2to1")){
					user.setStatu(1);
					message.setContent("通过了您的开户申请");
				}
					message.setFrom(mname);
					message.setTo(user.getUsername());
					message.setIsReaded("否");
					message.setType("2");
				
				
				new UserData().update(user);
				new MessageData().save(message);
				msg="success";
			}
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
