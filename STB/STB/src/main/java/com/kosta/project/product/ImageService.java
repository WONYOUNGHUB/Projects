package com.kosta.project.product;

import java.util.List;

public class ImageService {

	public List<Image> getImageList(int productId){
		ImageDAO imageDAO = new ImageDAO();
		
		return imageDAO.getImageList(productId);
	}
}
