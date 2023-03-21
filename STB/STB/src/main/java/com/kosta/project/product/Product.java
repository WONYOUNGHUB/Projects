package com.kosta.project.product;

import java.sql.Date;

public class Product {
	private int productId;
	private String productTitle;
	private String productContent;
	private int wishCount;
	private int viewCount;
	private int price;
	private Date reg_date;
	private String productStatus;
	private int joinNumber;
	private int currentNumber;
	private String userId;
	private int category;
	private String nickname;
	private Date request_date;
	private String request_status;
	private int request_id;
	private String file_name;
	private int wish_check;
	
	public String getFile_name() {
		return file_name;
	}


	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}


	public int getRequest_id() {
		return request_id;
	}


	public void setRequest_id(int request_id) {
		this.request_id = request_id;
	}


	public String getRequest_status() {
		return request_status;
	}


	public void setRequest_status(String request_status) {
		this.request_status = request_status;
	}


	public Date getRequest_date() {
		return request_date;
	}


	public void setRequest_date(Date request_date) {
		this.request_date = request_date;
	}


	public String getNickname() {
		return nickname;
	}


	public void setNickname(String nickname) {
		this.nickname = nickname;
	}


	public Product() {
		
	}
	

	public Product(int productId, String productTitle, String productContent, int wishCount,
			       int viewCount, int price, Date reg_date,
			String productStatus, int joinNumber,int currentNumber, String userId, int category) {
		super();
		this.productId = productId;
		this.productTitle = productTitle;
		this.productContent = productContent;
		this.viewCount = viewCount;
		this.wishCount = wishCount;
		this.price = price;
		this.reg_date = reg_date;
		this.productStatus = productStatus;
		this.joinNumber = joinNumber;
		this.currentNumber = currentNumber;
		this.userId = userId;
		this.category = category;
	}
	public int getproductId() {
		return productId;
	}
	public void setproductId(int productId) {
		this.productId = productId;
	}
	public String getproductTitle() {
		return productTitle;
	}
	public void setproductTitle(String productTitle) {
		this.productTitle = productTitle;
	}
	public String getproductContent() {
		return productContent;
	}
	public void setproductContent(String productContent) {
		this.productContent = productContent;
	}
	public int getWishCount() {
		return wishCount;
	}
	public void setWishCount(int wishCount) {
		this.wishCount = wishCount;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public Date getReg_date() {
		return reg_date;
	}
	public void setReg_date(Date reg_date) {
		this.reg_date = reg_date;
	}
	public String getproductStatus() {
		return productStatus;
	}
	public void setproductStatus(String productStatus) {
		this.productStatus = productStatus;
	}
	public int getJoinNumber() {
		return joinNumber;
	}
	public void setJoinNumber(int joinNumber) {
		this.joinNumber = joinNumber;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	
	
	public int getProductId() {
		return productId;
	}


	public void setProductId(int productId) {
		this.productId = productId;
	}


	public String getProductTitle() {
		return productTitle;
	}


	public void setProductTitle(String productTitle) {
		this.productTitle = productTitle;
	}


	public String getProductContent() {
		return productContent;
	}


	public void setProductContent(String productContent) {
		this.productContent = productContent;
	}


	public String getProductStatus() {
		return productStatus;
	}


	public void setProductStatus(String productStatus) {
		this.productStatus = productStatus;
	}


	public int getCurrentNumber() {
		return currentNumber;
	}


	public void setCurrentNumber(int currentNumber) {
		this.currentNumber = currentNumber;
	}


	public int getViewCount() {
		return viewCount;
	}


	public void setViewCount(int viewCount) {
		this.viewCount = viewCount;
	}


	public int getWish_check() {
		return wish_check;
	}


	public void setWish_check(int wish_check) {
		this.wish_check = wish_check;
	}


	@Override
	public String toString() {

		return "product [ productId = " + productId + ", productTitle=" + productTitle + ", productContent=" + productContent
				+ ", wishCount=" + wishCount + ", price=" + price + ", reg_date=" + reg_date + ", productStatus="
				+ productStatus + ", joinNumber=" + joinNumber + ", userId=" + userId + ", category=" + category + "]";
	}
	
	
	
	
}
