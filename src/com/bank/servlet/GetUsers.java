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

import com.bank.data.UserData;
import com.bank.entity.User;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

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
			JSONArray jArray = JSONArray.fromObject(users);
			HttpSession session=request.getSession();
			String mname="";
			String type="";
			if(session.getAttribute("username")!=null){
				 mname=session.getAttribute("username").toString();
				 }
			if(session.getAttribute("type")!=null){
				type=session.getAttribute("type").toString();
			}
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			//
			if(type.equals("管理员")){
			if(users.size()==0){
				JSONObject outData = new JSONObject();
				outData.put("url", "login.html");
				out.print(outData);
				}else{
			//out.write(jArray.toString());}
			out.print(jArray);}
			}else{
				JSONObject outData = new JSONObject();
				outData.put("url", "login.html");
				out.print(outData);
			}
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
