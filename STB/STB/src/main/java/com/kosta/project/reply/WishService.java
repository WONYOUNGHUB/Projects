package com.kosta.project.reply;

import java.util.List;

public class WishService {
	
	WishDAO wishDAO = new WishDAO();
	
	
	public int like(int productId, String userId, String like01) {
		int ret = 0;
		if(wishDAO.wishInsert(productId, userId)>0)
		    ret = wishDAO.likePlus(productId, like01);
		
		return ret;
	}
	//추가한부분 서원영
	public List<Wish> getWishData(String userId) {
		return wishDAO.getWishData(userId);
		
	
	}

	public int wishDelete(String userId, int wishId, String like01, int productId) {
		int ret = 0;
		if(wishDAO.wishDelete(userId, productId)>0) {
			System.out.println("1");
		    ret = wishDAO.likePlus(productId, like01);
		}
		System.out.println("2");
		return ret;
	}
	
	public int getWishId(int product_id, String user_id) {
		int wish_id = wishDAO.selectByWishID(product_id, user_id).getWish_ID();
		return wish_id;
	}


}
