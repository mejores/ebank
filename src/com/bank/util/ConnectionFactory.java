package com.bank.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class ConnectionFactory {
	 private static String driver;
	 private static String dburl;
	 private static String user;
	 private static String password;
	 private static final ConnectionFactory factory=new ConnectionFactory();
	 private Connection conn;
	 static{
		 Properties prop=new Properties();
		 try {
			 //获取当前类的类加载器，然后读取属性文件中的内容
			InputStream in=ConnectionFactory.class.getClassLoader()
					.getResourceAsStream("dbConfig.properties");
			prop.load(in);
		} catch (Exception e) {
			System.out.println("读取配置文件出错！");
		}
		 driver=prop.getProperty("driver");
		 dburl=prop.getProperty("dburl");
		 user=prop.getProperty("user");
		 password=prop.getProperty("password");
	 }
	 //添加private构造函数以实现不能通过new关键字实例化对象！
	 private ConnectionFactory(){
		 
	 }
	 public static ConnectionFactory getStance(){
		 	
		return factory;
	 }
	 public Connection makeConnection(){
		 try {
			Class.forName(driver);
			conn=DriverManager.getConnection(dburl,user,password);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 return conn;
	 }
}
