package com.kosta.project.request;

import java.util.Date;

public class RequestVO {
	private int request_id;
	private char request_status;
	private Date request_date;
	private String user_id;
	private int product_id;
	
	public RequestVO() {
		super();
	}
	public RequestVO(int request_id, char request_status, Date request_date, String user_id, int product_id) {
		super();
		this.request_id = request_id;
		this.request_status = request_status;
		this.request_date = request_date;
		this.user_id = user_id;
		this.product_id = product_id;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("RequestVO [request_id=").append(request_id).append(", request_status=").append(request_status)
				.append(", request_date=").append(request_date).append(", user_id=").append(user_id)
				.append(", product_id=").append(product_id).append("]");
		return builder.toString();
	}
	public int getRequest_id() {
		return request_id;
	}
	public void setRequest_id(int request_id) {
		this.request_id = request_id;
	}
	public char getRequest_status() {
		return request_status;
	}
	public void setRequest_status(char request_status) {
		this.request_status = request_status;
	}
	public Date getRequest_date() {
		return request_date;
	}
	public void setRequest_date(Date request_date) {
		this.request_date = request_date;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public int getProduct_id() {
		return product_id;
	}
	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}
}
