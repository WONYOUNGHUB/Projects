package com.kosta.project.product;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.kosta.project.util.DBUtil;

public class ImageDAO {
	
	  
	Connection conn;
	Statement st;
	PreparedStatement pst;
	ResultSet rs;
	int result;
	
	public List<Image> getImageList(int productId) {

		conn = null;
		pst = null;
		rs = null;
		
		String query =  "select * " 
				 +"From TBL_PRODUCT_IMAGES "
				 +"WHERE PRODUCT_ID = ?";

		ArrayList<Image> imageList = new ArrayList<Image>();

		
		try {
			conn = DBUtil.getConnection();
			pst = conn.prepareStatement(query);
			pst.setInt(1, productId);
			rs = pst.executeQuery();
			
			
			while (rs.next()) {
				int IMAGE_ID = rs.getInt("IMAGE_ID");
				String FILE_NAME = rs.getString("FILE_NAME");
				int PRODUCT_ID = productId;


				Image image = new Image();
				image.setImage_id(IMAGE_ID);
				image.setFile_name(FILE_NAME);
				image.setProduct_id(PRODUCT_ID);
				System.out.println(image.toString());
				imageList.add(image);
			}

			
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
				DBUtil.dbClose(rs, pst, conn);
			
		}
		return imageList;
	}
}
