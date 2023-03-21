package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import util.DBUtil;
import vo.Member;
import vo.Seat;



public class MemberDAO {
	static final String SQL_INSERT = "INSERT INTO member values( ?, ?, ?, ?)";
	static final String SQL_DELETE = "delete from member where memberid = ? and password= ? ";
	static final String SQL_LOGIN_CHECK =  "select * from member where memberid = ? and password = ? ";
	static final String SQL_UPDATEYN = "update seat set reserveyn = 'n' where seatcode = ? " ;
	
	
	Connection conn;
	PreparedStatement st;
	ResultSet rs;
	int result;
	
	public int updateYN(Seat seat) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_UPDATEYN);
            st.setString(1, seat.getSeatcode());
            System.out.println(seat.getSeatcode());
			result = st.executeUpdate();			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}		
		return result;
	}
	public int resisterMember(Member member) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_INSERT);
            st.setString(1, member.getMemberid());
            st.setString(2, member.getPassword());
            st.setString(3, member.getName());
            st.setString(4, member.getEmail());
			result = st.executeUpdate();			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			System.out.println("3-----------------------------------");
			DBUtil.dbClose(rs, st, conn);
		}		
		return result;
	}
	
	public Member loginMember(Member member ) {
		 
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_LOGIN_CHECK);
			st.setString(1,member.getMemberid() );
			st.setString(2,member.getPassword() );
			rs = st.executeQuery();
			while(rs.next()) {
				member = makeMember(rs, member);
			}				
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}		
		return member;
	}

	private Member makeMember(ResultSet rs, Member member ) throws SQLException {
		 
		member.setEmail(rs.getString("email"));
		member.setName(rs.getString("name"));
		return member;
	}

}
