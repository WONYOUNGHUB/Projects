package com.kosta.project.member.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import com.kosta.project.member.vo.Member;
import com.kosta.project.util.DBUtil;

public class MemberDAO {
	static final String SQL_SELECT_BYID = "select * from tbl_user where user_id = ?";
	static final String SQL_INSERT_MEMBER = "insert into tbl_user values(?,?,?,?,sysdate,?,'user')";
	static final String SQL_UDATEMEMBER ="UPDATE TBL_USER SET PHONE = ? WHERE USER_ID = ?";
	static final String SQL_SELECT_NICK = "select * from tbl_user where nickname=?";
	static final String SQL_DELETEMEMBER = "delete from tbl_user where user_id=?";
	static final String SQL_UPDATEPASSWORD = "update tbl_user set user_pw=? where user_id=?";
	static final String SQL_UDATECLEAR =  "update tbl_user set user_pw = ? where user_id = ?";
	Connection conn;
	Statement st;
	PreparedStatement pst;
	ResultSet rs;
	int result;
	
	
	public Member selectByNick(String nickName) {
		Member member = null;
		conn = DBUtil.getConnection();
		System.out.println("conn :" + conn);
		try {
			pst = conn.prepareStatement(SQL_SELECT_NICK);
			pst.setString(1, nickName);
			System.out.println("�г���" + nickName);
			rs = pst.executeQuery();
			while (rs.next()) {
				member = makeEmp(rs);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}
		return member;

	};

	public Member selectOneMember(String userId) {
		Member member = null;
		conn = DBUtil.getConnection();
		
		try {
		
			pst = conn.prepareStatement(SQL_SELECT_BYID);
			System.out.println("selectOneMember:" + userId);
			pst.setString(1, userId);
			rs = pst.executeQuery();
			while (rs.next()) {
				member = makeEmp(rs);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}

		return member;
	}

	public int insertMember(Member member) {
		int result = 0;
		conn = DBUtil.getConnection();
		try {
			pst = conn.prepareStatement(SQL_INSERT_MEMBER);
			pst.setString(1, member.getUserId());
			pst.setString(2, member.getUserName());
			pst.setString(3, member.getUserPassword());
			pst.setString(4, member.getNickName());
			pst.setString(5, member.getPhone());

			result = pst.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}

		return result;
	}

	private Member makeEmp(ResultSet rs) throws SQLException {

		Member emp = new Member();
		emp.setUserId(rs.getString("user_Id"));
		emp.setUserName(rs.getString("user_name"));
		emp.setUserPassword(rs.getString("user_pw"));
		emp.setNickName(rs.getString("nickname"));
		emp.setSignDate(rs.getDate("sign_date"));
		emp.setPhone(rs.getString("Phone"));
		emp.setUserRole(rs.getString("user_role"));

		return emp;
	}
	public int updateMember(Member member) {
		int result = 0;
		conn = DBUtil.getConnection();
		try {
			pst = conn.prepareStatement( SQL_UDATEMEMBER);
			pst.setString(1,member.getPhone());
			pst.setString(2,member.getUserId());
			int rs= pst.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(st);
		}
		return result;
	}
	public int delete(String userId) {
		conn = DBUtil.getConnection();
		try {
			pst = conn.prepareStatement(SQL_DELETEMEMBER);
            pst.setString(1, userId);
			result = pst.executeUpdate();			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}		
		return result;
	}

	public int updatePassword(Member member) {
		conn = DBUtil.getConnection();
		
		try {
			// �̿ϼ� ������ ��ü����
			pst = conn.prepareStatement(SQL_UPDATEPASSWORD);
			pst.setString(1, member.getUserPassword());
			pst.setString(2, member.getUserId());
			result = pst.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(pst);
		}
		return result;
	}

	public Member selectMember( String memberId) {
		ResultSet rset = null;
		Member member = null;
		conn = DBUtil.getConnection();
		try {
			pst = conn.prepareStatement(SQL_SELECT_BYID);
			pst.setString(1,memberId);
			rs = pst.executeQuery();

			while (rs.next()) {
				member = makeEmp(rs);
				
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}

		return member;
	}

	public int insertPassword(Member member) {
		int result = 0;
		conn = DBUtil.getConnection();
		try {
			pst = conn.prepareStatement(SQL_UDATECLEAR);
			pst.setString(1, member.getUserPassword());
			pst.setString(2, member.getUserId());

			result = pst.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, pst, conn);
		}

		return result;
	}
	

}

	

