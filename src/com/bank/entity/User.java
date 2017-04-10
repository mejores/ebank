package com.bank.entity;

import java.math.BigDecimal;

public class User {
private int eid;
private String username;
private String password;
private String usertype;
private BigDecimal balance;
private int statu;
public User() {
	super();
}
public User(String username, String password, String usertype, BigDecimal balance,int statu) {
	super();
	this.username = username;
	this.password = password;
	this.usertype = usertype;
	this.balance = balance;
	this.statu = statu;
}

public int getEid() {
	return eid;
}
public void setEid(int eid) {
	this.eid = eid;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}
public String getPassword() {
	return password;
}
public void setPassword(String password) {
	this.password = password;
}
public String getUsertype() {
	return usertype;
}
public void setUsertype(String usertype) {
	this.usertype = usertype;
}
public BigDecimal getBalance() {
	return balance;
}
public void setBalance(BigDecimal balance) {
	this.balance = balance;
}
public int getStatu() {
	return statu;
}
public void setStatu(int statu) {
	this.statu = statu;
}


}
