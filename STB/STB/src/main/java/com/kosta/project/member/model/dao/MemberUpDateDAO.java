package com.kosta.project.member.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.kosta.project.member.vo.Member;
import com.kosta.project.util.DBUtil;

public class MemberUpDateDAO {
	static final String SQL_UDATEMEMBER ="UPDATE MEMBER SET PHONE = ? WHERE MEMBER_ID = ?";
	Connection conn;
	PreparedStatement st;
	ResultSet rs;
	int result;


	public int updateMember(Member member) {
		int result = 0;
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement( SQL_UDATEMEMBER);
			st.setString(1,member.getPhone());
			st.setString(2,member.getUserId());
			int rs= st.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(st);
		}
		return result;
	}

	


}
