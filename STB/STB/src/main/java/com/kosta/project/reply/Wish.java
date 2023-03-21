package com.kosta.project.reply;

import java.sql.Date;

//title추가
public class Wish {
	private int wish_ID;
	private Date wish_DATE;
	private int product_ID;
	private String user_ID;
	private int wish_CHECK;
	private String title;
	
	
	
	
	public Wish() {
		super();
	}
	
	public Wish(int wish_ID, Date wish_DATE, int product_ID, String user_ID, int wish_CHECK, String title) {
		super();
		this.wish_ID = wish_ID;
		this.wish_DATE = wish_DATE;
		this.product_ID = product_ID;
		this.user_ID = user_ID;
		this.wish_CHECK = wish_CHECK;
		this.title = title;
	}

	public int getWish_ID() {
		return wish_ID;
	}
	public void setWish_ID(int wish_ID) {
		this.wish_ID = wish_ID;
	}
	public Date getWish_DATE() {
		return wish_DATE;
	}
	public void setWish_DATE(Date wish_DATE) {
		this.wish_DATE = wish_DATE;
	}
	public int getProduct_ID() {
		return product_ID;
	}
	public void setProduct_ID(int product_ID) {
		this.product_ID = product_ID;
	}
	public String getUser_ID() {
		return user_ID;
	}
	public void setUser_ID(String user_ID) {
		this.user_ID = user_ID;
	}
	public int getWish_CHECK() {
		return wish_CHECK;
	}
	public void setWish_CHECK(int wish_CHECK) {
		this.wish_CHECK = wish_CHECK;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	@Override
	public String toString() {
		return "Wish [wish_ID=" + wish_ID + ", wish_DATE=" + wish_DATE + ", product_ID=" + product_ID + ", user_ID="
				+ user_ID + ", wish_CHECK=" + wish_CHECK + ", title=" + title + "]";
	}

	

}
