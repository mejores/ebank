package com.bank.data;

import java.math.BigDecimal;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.bank.entity.User;
import com.bank.util.ConnectionFactory;



public class UserData {
	Connection conn=null;
	public UserData(){
		try {
			conn=ConnectionFactory.getStance().makeConnection();
		}  catch (Exception e) {
			
			e.printStackTrace();
		}
	}
	
	//添加数据
	public void save(User user) {
		PreparedStatement ps = null;
		try{
			ps = conn.prepareCall("insert into users (username,password,usertype,balance)VALUES(?,?,?,?)");
		
			ps.setString(1, user.getUsername());
			ps.setString(2, user.getPassword());
			ps.setShort(3, new Short(user.getUsertype()));
			ps.setBigDecimal(4, new BigDecimal("0"));
			ps.execute();
		}catch(SQLException sqle){
			System.out.println("插入数据出错");
			sqle.printStackTrace();
		}finally{
			try{
				ps.close();
				conn.close();
				
			}catch(SQLException sqle2){
				System.out.println("关闭链接出错！");
			}
		}
		
	}
	
	//删除数据
	public boolean delete(int eid) {
		PreparedStatement ps=null;
		try{
		ps = conn.prepareCall("delete from users where eid=?");
		
		ps.setInt(1, eid);
		ps.execute();
		
		}catch(SQLException sqle){
			System.out.println("删除数据出错");
			sqle.printStackTrace();
			return false;
		}finally{
			try{
				ps.close();
			}catch(SQLException sqle2){
				System.out.println("关闭resultsate出错！");
			}
		}
		return true;
	}
	
	//修改数据
	public void update(User user) {
		PreparedStatement ps = null;
		try{
			ps = conn.prepareCall("update users set password=?,usertype=?,balance= ?,statu= ? where eid=?" );
			ps.setString(1, user.getPassword());
			ps.setShort(2, (short) (user.getUsertype()=="管理员"?2:1));
			System.out.println("这里"+user.getBalance());
			ps.setBigDecimal(3, user.getBalance());
			ps.setInt(4, user.getStatu());
			ps.setInt(5, user.getEid());
			ps.execute();	
		}catch(SQLException sqle){
			System.out.println("修改数据出错");
			sqle.printStackTrace();
		}finally{
			try{
				ps.close();
				
			}catch(SQLException sqle2){
				System.out.println("关闭resultsate出错！");
			}
		}
	}
	
	//通过id查询数据
	public List<User> get(String uParam,String type){
		PreparedStatement ps=null;
		ResultSet ret=null;
		User user=null;
		List <User> userlist=new ArrayList<User>();
		try{
			if(uParam!=""){
				if(type.equals("id")){
					ps=conn.prepareStatement("select * from users where eid=?");
					ps.setInt(1, Integer.parseInt(uParam));
					}else if(type.equals("username")){
						ps=conn.prepareStatement("select * from users where username=?");
						ps.setString(1, uParam);
					}
				}else{
					ps=conn.prepareStatement("select * from users ORDER BY statu=2 DESC");
		}
		ret= ps.executeQuery();
		while(ret.next()){
		    user = new User();
		    user.setEid(ret.getInt("eid"));
		    user.setUsername(ret.getString("username"));
		    user.setPassword(ret.getString("password"));
		    user.setUsertype((ret.getShort("usertype")==1?"普通用户":"管理员"));
		    user.setBalance(ret.getBigDecimal("balance"));
		    user.setStatu(ret.getInt("statu"));
		    
		    userlist.add(user);
		}
		}catch(SQLException sqle){
			System.out.println("查询数据出错");
			sqle.printStackTrace();
		}finally{
			try{
				ret.close();
				ps.close();
			}catch(SQLException sqle2){
				System.out.println("关闭resultsate出错！");
			}
		}
		return userlist;
	}
	


}
