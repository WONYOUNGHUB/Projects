package com.kosta.project.product;

public class Image {
	private int image_id;
	private String file_name;
	private int product_id;
	
	public Image(int image_id, String file_name, int product_id) {
		super();
		this.image_id = image_id;
		this.file_name = file_name;
		this.product_id = product_id;
	}
	
	public Image() {
		super();
	}


	public int getImage_id() {
		return image_id;
	}
	public void setImage_id(int image_id) {
		this.image_id = image_id;
	}
	public String getFile_name() {
		return file_name;
	}
	public void setFile_name(String file_name) {
		this.file_name = file_name;
	}
	public int getProduct_id() {
		return product_id;
	}
	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	@Override
	public String toString() {
		return "Image [image_id=" + image_id + ", file_name=" + file_name + ", product_id=" + product_id + "]";
	}
	
	
	
	
	
}
