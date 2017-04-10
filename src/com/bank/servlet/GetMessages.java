package com.bank.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.bank.data.MessageData;
import com.bank.entity.Message;

import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Servlet implementation class GetMessages
 */
@WebServlet("/getMessages")
public class GetMessages extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetMessages() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("UTF-8");
		HttpSession session=request.getSession();
		String mid="";
		String type=request.getParameter("type");
		if(session.getAttribute("username")!=null){
		 mid=session.getAttribute("username").toString();}

		PrintWriter out = response.getWriter();
		if(mid!=""){
			MessageData mesd=new MessageData();
			JSONArray json=JSONArray.fromObject(mesd.get(mid,type));
			//Object obj=mesd.get(1).toString();
			out.print(json);
			
			
		}else{
			//response.sendRedirect("login.html");
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
