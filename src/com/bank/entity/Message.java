package com.bank.entity;

import java.util.Date;

public class Message {
private int id;
private String from;
private String to;
private String type;
private Date mesDate;
private String content;
private String isReaded;
private String info;

public Message() {
	super();
}
public Message(String from, String to, String type, Date mesDate, String content, String isReaded) {
	super();
	this.from = from;
	this.to = to;
	this.type = type;
	this.mesDate = mesDate;
	this.content = content;
	this.isReaded = isReaded;
}
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getFrom() {
	return from;
}
public void setFrom(String from) {
	this.from = from;
}
public String getTo() {
	return to;
}
public void setTo(String to) {
	this.to = to;
}
public String getType() {
	return type;
}
public void setType(String type) {
	this.type = type;
}
public Date getMesDate() {
	return mesDate;
}
public void setMesDate(Date mesDate) {
	this.mesDate = mesDate;
}
public String getContent() {
	return content;
}
public void setContent(String content) {
	this.content = content;
}
public String getIsReaded() {
	return isReaded;
}
public void setIsReaded(String isReaded) {
	this.isReaded = isReaded;
}
public String getInfo() {
	return info;
}
public void setInfo(String info) {
	this.info = info;
}


}
