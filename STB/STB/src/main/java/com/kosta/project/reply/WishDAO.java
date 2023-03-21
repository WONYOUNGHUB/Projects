package com.kosta.project.reply;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.kosta.project.util.DBUtil;

public class WishDAO {
	
	static final String ReplyGet = "UPDATE TBL_USER_WISH "
			+ "SET WISH_CHECK = WISH_CHECK + 1"
			+ "WHERE USER_ID ='admin'"
			+ "AND PRODUCT_ID =1";
	static final String SQL_SelectByID = "SELECT * FROM TBL_USER_WISH UW "
			+ "WHERE PRODUCT_ID = ? AND USER_ID = ?";

	
	static final String SQL_GET_WISHLIST = "SELECT * FROM TBL_USER_WISH JOIN TBL_PRODUCT USING (PRODUCT_ID) WHERE TBL_USER_WISH.USER_ID = ?";
	
	static final String SQL_WISH_INSERT = "INSERT INTO TBL_USER_WISH VALUES (WISH_seq.nextVal, sysdate, ?, ?, 1)"
			+ "";

	static final String SQL_WISH_DELETE = "	DELETE FROM TBL_USER_WISH  WHERE USER_ID=? AND WISH_ID = ?";

	Connection conn;
	Statement st;
	PreparedStatement pst;
	ResultSet rs;
	int result;

	
	public int likePlus(int product, String like01) {
 
		 String SQL_LIKE_COUNT_PLUS = "UPDATE TBL_PRODUCT SET WISH_COUNT = nvl(WISH_COUNT,0) " + like01
					+ "WHERE PRODUCT_ID = ?";
		 
		try {
			conn = DBUtil.getConnection();
			pst = conn.prepareStatement(SQL_LIKE_COUNT_PLUS);
			pst.setInt(1, product);
			result = pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}
		
		return result;
	}
	
	public int wishInsert(int productId, String userId) {
		 
		try {
			conn = DBUtil.getConnection();
			pst = conn.prepareStatement(SQL_WISH_INSERT);
			pst.setInt(1, productId);
			pst.setString(2, userId);

			result = pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}
		
		return result;
	}
	//추가한부분 서원영
	public List<Wish> getWishData(String userId) {
		List<Wish> wishList = new ArrayList<>();
		conn = DBUtil.getConnection();
		try {
			String query = SQL_GET_WISHLIST;
			pst = conn.prepareStatement(query);
			pst.setString(1, userId);
			rs = pst.executeQuery();
			while(rs.next()) {
				Wish wish = new Wish();
				wish.setWish_ID(rs.getInt("wish_id"));
				wish.setWish_DATE(rs.getDate("createdate"));
				wish.setProduct_ID(rs.getInt("product_id"));
				wish.setUser_ID(rs.getString("user_id"));
				wish.setWish_CHECK(rs.getInt("wish_check"));
				wish.setTitle(rs.getString("title"));
				System.out.println(wish.getTitle());
				wishList.add(wish);
			 } 
		   }catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DBUtil.dbClose(rs, pst, conn);
			}
			return wishList;

		}
	public int wishDelete(String user_id, int product_id) {
		Wish wish = selectByWishID(product_id, user_id);
		int wishId = wish.getWish_ID();
		try {
			conn = DBUtil.getConnection();
			pst = conn.prepareStatement(SQL_WISH_DELETE);
			pst.setString(1, user_id);
			pst.setInt(2, wishId);

			result = pst.executeUpdate();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}
		
		return result;
	}
	
	public Wish selectByWishID(int product_ID, String user_ID){
		Wish wish = new Wish();
		Connection connection = null;
		pst = null;
		rs = null;
		try {
			connection = DBUtil.getConnection();
			String query = SQL_SelectByID;
			pst = connection.prepareStatement(query);
			pst.setInt(1, product_ID);
			pst.setString(2, user_ID);
			rs = pst.executeQuery();
			
			rs.next();
				int wish_ID = rs.getInt("wish_ID");
				Date wish_DATE = rs.getDate("CREATEDATE");
				int product_id = rs.getInt("PRODUCT_ID");
				String user_id = rs.getString("USER_ID");
				int wish_Check = rs.getInt("wish_Check");
				
				wish.setWish_ID(wish_ID);
				wish.setWish_DATE(wish_DATE);
				wish.setProduct_ID(product_id);
				wish.setUser_ID(user_id);
				wish.setWish_CHECK(wish_Check);
				System.out.println(wish.toString());
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			try {
				DBUtil.dbClose(rs, pst, conn);
			} catch(Exception e2) {
				e2.printStackTrace();
			}
		}
		return wish;
	}






}


