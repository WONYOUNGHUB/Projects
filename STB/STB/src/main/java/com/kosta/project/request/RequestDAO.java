package com.kosta.project.request;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.kosta.project.product.Product;
import com.kosta.project.util.DBUtil;

public class RequestDAO {
	static final String SQL_SELECT_MYJOIN = "SELECT TBL_PRODUCT.PRODUCT_ID, TBL_PRODUCT.TITLE, TBL_PRODUCT.CURRENT_NUMBER, TBL_PRODUCT.JOIN_NUMBER, TBL_PRODUCT.PRODUCT_STATUS , TBL_PRODUCT.REG_DATE, TBL_USER.NICKNAME, TBL_REQUEST.REQUEST_ID, TBL_REQUEST.REQUEST_STATUS, TBL_REQUEST.REQUEST_DATE "
			+ "FROM TBL_PRODUCT LEFT OUTER JOIN TBL_REQUEST ON (TBL_PRODUCT.PRODUCT_ID = TBL_REQUEST.PRODUCT_ID)\r\n"
			+ "LEFT OUTER JOIN TBL_USER ON (TBL_REQUEST.USER_ID = TBL_USER.USER_ID)\r\n"
			+ "WHERE TBL_PRODUCT.USER_ID = ? order by tbl_product.reg_date desc, tbl_request.request_date desc";
	static final String SQL_SELECT_MYREQUEST = "SELECT PRODUCT_ID, TBL_PRODUCT.TITLE, TBL_PRODUCT.CURRENT_NUMBER, TBL_PRODUCT.JOIN_NUMBER, TBL_PRODUCT.REG_DATE, TBL_REQUEST.REQUEST_DATE, TBL_PRODUCT.PRODUCT_STATUS, TBL_REQUEST.REQUEST_ID, TBL_REQUEST.REQUEST_STATUS\r\n"
			+ "FROM TBL_PRODUCT JOIN TBL_REQUEST USING (PRODUCT_ID) WHERE TBL_REQUEST.USER_ID = ? order by tbl_request.request_date desc";
	static final String SQL_ACCEPT_REQUEST = "UPDATE TBL_REQUEST SET REQUEST_STATUS = 'y' WHERE REQUEST_ID = ?";
	static final String SQL_REFUSE_REQUEST = "UPDATE TBL_REQUEST SET REQUEST_STATUS = 'n' WHERE REQUEST_ID = ?";
	static final String SQL_CANCEL_REQUEST = "DELETE FROM TBL_REQUEST WHERE REQUEST_ID = ?";
	static final String SQL_ASK_REQUEST = "INSERT INTO TBL_REQUEST VALUES (REQUEST_SEQ.NEXTVAL, 'n', SYSDATE, ?, ?)";
	static final String SQL_INCREASE_CURRENT_NUMBER = "update tbl_product set current_number=current_number+1 where product_id = ?";
	static final String SQL_DECREASE_CURRENT_NUMBER = "update tbl_product set current_number=current_number-1 where product_id = ?";
	static final String SQL_CLOSE_JOIN = "UPDATE TBL_PRODUCT SET PRODUCT_STATUS = '모집완료' WHERE PRODUCT_ID = ?";
	static final String SQL_OPEN_JOIN = "UPDATE TBL_PRODUCT SET PRODUCT_STATUS = '모집중' WHERE PRODUCT_ID = ?";

	
	Connection conn;
	Statement st;
	PreparedStatement pst;
	ResultSet rs;
	int result;
	
	//만든 JOIN 조회(MYJOIN)
	public List<Product> selectMyJoin(String user_id){
		List<Product> requestList = new ArrayList<>();
		conn = DBUtil.getConnection();
		try {
			String query = SQL_SELECT_MYJOIN;
			pst = conn.prepareStatement(query);
			pst.setString(1, user_id);
			rs = pst.executeQuery();
			//BL_PRODUCT.TITLE, TBL_PRODUCT.CURRENT_NUMBER, TBL_PRODUCT.JOIN_NUMBER, TBL_PRODUCT.PRODUCT_STATUS
			while(rs.next()) {
				Product product = new Product();
				product.setproductTitle(rs.getString("title"));
				product.setCurrentNumber(rs.getInt("current_number"));
				product.setJoinNumber(rs.getInt("join_number"));
				product.setJoinNumber(rs.getInt("join_number"));
				product.setProductStatus(rs.getString("product_status"));
				product.setReg_date(rs.getDate("reg_date"));
				product.setNickname(rs.getString("nickname"));
				product.setRequest_status(rs.getString("request_status"));
				product.setRequest_id(rs.getInt("request_id"));
				product.setproductId(rs.getInt("product_id"));
				product.setRequest_date(rs.getDate("request_date"));

				requestList.add(product);
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(rs != null) rs.close();
				if(pst != null) pst.close();
				if(conn != null) conn.close();
			} catch(Exception e2) {
				e2.printStackTrace();
			}
		}
		return requestList;
	}
	
	//신청한 JOIN 조회(MYREQUEST)
	public List<Product> selectMyRequest(String user_id){
		List<Product> requestList = new ArrayList<>();
		conn = DBUtil.getConnection();
		try {
			String query = SQL_SELECT_MYREQUEST;
			pst = conn.prepareStatement(query);
			pst.setString(1, user_id);
			rs = pst.executeQuery();
			//BL_PRODUCT.TITLE, TBL_PRODUCT.CURRENT_NUMBER, TBL_PRODUCT.JOIN_NUMBER, TBL_PRODUCT.PRODUCT_STATUS
			while(rs.next()) {
				Product product = new Product();
				product.setproductTitle(rs.getString("title"));
				product.setCurrentNumber(rs.getInt("current_number"));
				product.setJoinNumber(rs.getInt("join_number"));
				product.setProductStatus(rs.getString("product_status"));
				product.setReg_date(rs.getDate("reg_date"));
				product.setRequest_date(rs.getDate("request_date"));
				product.setRequest_status(rs.getString("request_status"));
				product.setRequest_id(rs.getInt("request_id"));
				product.setproductId(rs.getInt("product_id"));
				requestList.add(product);
			}
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if(rs != null) rs.close();
				if(pst != null) pst.close();
				if(conn != null) conn.close();
			} catch(Exception e2) {
				e2.printStackTrace();
			}
		}
		return requestList;
	}
	
	
	//ACCEPT REQUEST -> request_status Y로 바꾸기
	public int acceptRequest(int request_id) {
		int result = 0;
		conn = DBUtil.getConnection();
		try {
			pst = conn.prepareStatement(SQL_ACCEPT_REQUEST);
			pst.setInt(1, request_id);
			result = pst.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}
		return result;
	}
	
	//REFUSE REQUEST -> request_status N으로 바꾸기
		public int refuseRequest(int request_id) {
			int result = 0;
			conn = DBUtil.getConnection();
			try {
				pst = conn.prepareStatement(SQL_REFUSE_REQUEST);
				pst.setInt(1, request_id);
				result = pst.executeUpdate();

			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DBUtil.dbClose(rs, pst, conn);
			}
			return result;
		}
		
	//CANCEL REQUEST
		public int cancelRequest(int request_id) {
			int result = 0;
			conn = DBUtil.getConnection();
			try {
				pst = conn.prepareStatement(SQL_CANCEL_REQUEST);
				pst.setInt(1, request_id);
				result = pst.executeUpdate();

			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DBUtil.dbClose(rs, pst, conn);
			}
			return result;
		}
	
	// ASK REQUEST
		public int askRequest(RequestVO request) {
			int result = 0;
			conn = DBUtil.getConnection();
			try {
				pst = conn.prepareStatement(SQL_ASK_REQUEST);
				pst.setString(1, request.getUser_id());
				pst.setInt(2, request.getProduct_id());
				
				result = pst.executeUpdate();

			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DBUtil.dbClose(rs, pst, conn);
			}
			return result;
		}
		
		
	//INCREASE CURRENT NUMBER
			public int increaseCurrentNumber(int product_id) {
				int result = 0;
				conn = DBUtil.getConnection();
				try {
					pst = conn.prepareStatement(SQL_INCREASE_CURRENT_NUMBER);
					pst.setInt(1, product_id);
					result = pst.executeUpdate();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					DBUtil.dbClose(rs, pst, conn);
				}
				return result;
			}	
		
		
	//DECREASE CURRENT NUMBER
		public int decreaseCurrentNumber(int product_id) {
			int result = 0;
			conn = DBUtil.getConnection();
			try {
				pst = conn.prepareStatement(SQL_DECREASE_CURRENT_NUMBER);
				pst.setInt(1, product_id);
				result = pst.executeUpdate();

			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DBUtil.dbClose(rs, pst, conn);
			}
			return result;
		}
	
	//CLOSE JOIN (PRODUCT_STATUS -> 모집완료)
		public int closeJoin(int product_id) {
			int result = 0;
			conn = DBUtil.getConnection();
			try {
				pst = conn.prepareStatement(SQL_CLOSE_JOIN);
				pst.setInt(1, product_id);
				result = pst.executeUpdate();
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DBUtil.dbClose(rs, pst, conn);
			}
			return result;
		}
		
	//CLOSE JOIN (PRODUCT_STATUS -> 모집중)
			public int openJoin(int product_id) {
				int result = 0;
				conn = DBUtil.getConnection();
				try {
					pst = conn.prepareStatement(SQL_OPEN_JOIN);
					pst.setInt(1, product_id);
					result = pst.executeUpdate();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					DBUtil.dbClose(rs, pst, conn);
				}
				return result;
			}
}
