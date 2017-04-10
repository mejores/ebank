package com.bank.data;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.bank.entity.Message;
import com.bank.util.ConnectionFactory;

public class MessageData {
	Connection conn=null;
	public MessageData(){
		try {
			conn=ConnectionFactory.getStance().makeConnection();
		}  catch (Exception e) {
			
			e.printStackTrace();
		}
	}
	public void save(Message mess){
		PreparedStatement ps = null;
		try{
			ps = conn.prepareCall("insert into messages (m_from,m_to,m_type,m_date,m_content,m_is_readed)VALUES(?,?,?,?,?,?)");
		
			ps.setString(1, mess.getFrom());
			ps.setString(2, mess.getTo());
			ps.setString(3, mess.getType());
			ps.setTimestamp(4, new Timestamp(new java.util.Date().getTime()));
			ps.setString(5, mess.getContent());
			ps.setString(6, mess.getIsReaded());
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
	public boolean delete(int mid) {
		PreparedStatement ps=null;
		try{
		ps = conn.prepareCall("delete from messages where m_id=?");
		
		ps.setInt(1, mid);
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
		public void update(String statu,int m_id) {
			PreparedStatement ps = null;
			try{
				
				ps = conn.prepareCall("update messages set m_is_readed= ? where m_id=?" );
				ps.setString(1, statu);
				ps.setInt(2, m_id);
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
		public List<Message> get(String m_to,String type){
			PreparedStatement ps=null;
			ResultSet ret=null;
			Message mess=null;
			List <Message> messlist=new ArrayList<Message>();
			try{
				if(type!=null){
			ps=conn.prepareStatement("SELECT m_id,m_from,m_to,t_name as 'm_type',m_date,m_content,m_is_readed,m_info FROM messages  LEFT JOIN type on type.id=messages.m_type WHERE m_to=?&&m_is_readed='否'");
			}else{
				ps=conn.prepareStatement("SELECT m_id,m_from,m_to,t_name as 'm_type',m_date,m_content,m_is_readed,m_info FROM messages  LEFT JOIN type on type.id=messages.m_type WHERE m_to=?");
			}
				ps.setString(1, m_to);
			ret= ps.executeQuery();
			while(ret.next()){
			    mess = new Message(ret.getString("m_from"),ret.getString("m_to"),ret.getString("m_type"),ret.getTimestamp("m_date"),ret.getString("m_content"),ret.getString("m_is_readed"));
			    mess.setId(ret.getInt("m_id"));
			    mess.setInfo(ret.getString("m_info"));
			    messlist.add(mess);
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
			return messlist;
		}
}
