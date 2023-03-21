package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import util.DBUtil;
import vo.Reserve;
import vo.Seat;

public class ReserveDAO {
	static final String SQL_INSERTRESERVE = "insert into reserve values(?, ?, ?, ?)";
	static final String SQL_UPDATEYN = "update seat set reserveyn = 'y' where seatcode = ? ";
	static final String SQL_CHECKRESERVE = "select * from reserve where seatcode= ?";
	static final String SQL_SELECT_ALLBYId = "select * from reserve where memberid = ?";
	static final String SQL_DELETE = "delete reserve where memberid =?";
	static final String SQL_UPDATEN = "update seat set reserveyn = 'n' where seatcode = ?";
	Connection conn;
	PreparedStatement st;
	ResultSet rs;
	int result;

//	public int CheckReserve(Seat seat) {
//		conn = DBUtil.getConnection();
//		
//	}

	public int delete(String memberid) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_DELETE);
			st.setString(1, memberid);
			result = st.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}
		return result;
	}

	public Reserve selectAllbyId(String memberid) {
		Reserve reserve = null;
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_SELECT_ALLBYId);
			st.setString(1, memberid);
			rs = st.executeQuery();
			while (rs.next()) {
				reserve = makeBoard(rs);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}
		return reserve;
	}

	private Reserve makeBoard(ResultSet rs) throws SQLException {
		Reserve reserve = new Reserve();
		reserve.setSeatcode(rs.getString(1));
		reserve.setMoviecode(rs.getInt(2));
		reserve.setMemberid(rs.getString(3));
		reserve.setReservedate(rs.getDate(4));
		return reserve;
	}

	public int updateYN(Seat seat) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_UPDATEYN);
			st.setString(1, seat.getSeatcode());
			result = st.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}
		return result;
	}
	public int updateN(Seat seat) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_UPDATEN);
			st.setString(1, seat.getSeatcode());
			result = st.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}
		return result;
	}

	public int Reserveinsert(Reserve reserve) {
		conn = DBUtil.getConnection();
		try {
			st = conn.prepareStatement(SQL_INSERTRESERVE);
			st.setString(1, reserve.getSeatcode());
			st.setInt(2, reserve.getMoviecode());
			st.setString(3, reserve.getMemberid());
			st.setDate(4, reserve.getReservedate());
			result = st.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}
		return result;
	}

}
