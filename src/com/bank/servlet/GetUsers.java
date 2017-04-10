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

import net.sf.json.JSONArray;

/**
 * Servlet implementation class GetUsers
 */
@WebServlet("/GetUsers.do")
public class GetUsers extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetUsers() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//String con_no=request.getParameter("conNo");
		//if(con_no!=null&&con_no!=""){
			UserData userd=new UserData();
			List<User> users=userd.get("","");
			System.out.println(users);
			JSONArray jArray = JSONArray.fromObject(users);
			
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			if(users.size()==0){out.write("");}else{
			//out.write(jArray.toString());}
			out.print(jArray);}
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
