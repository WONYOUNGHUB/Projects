package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import util.DBUtil;
import vo.Seat;

public class SeatDAO {
	static final String SQL_SEATSELECT = "select seatcode from seat";
	static final String SQL_RESERVEYNSELECT = "select reserveyn from seat where seatcode = ?";
	static final String SQL_SELECTALL = " select * from seat";

	Connection conn;
	PreparedStatement st;
	ResultSet rs;
	int result;

	public  List<Seat> selectAll() {
			List<Seat> seatList = new ArrayList<>();
			conn = DBUtil.getConnection();
			try {
			st = conn.prepareStatement(SQL_SELECTALL);
			rs = st.executeQuery();
		  
			while (rs.next()) {
				Seat seat =   getDateSeat(rs);
				seatList.add(seat);
			}
					
			} catch (SQLException e) {
				e.printStackTrace();
			} finally {
				DBUtil.dbClose(rs, st, conn);
			}		
			return seatList;
		}

	public Seat checkReserveYN(String seatSelect) {
		Seat seatYN = null;
		conn = DBUtil.getConnection();

		try {
			st = conn.prepareStatement(SQL_RESERVEYNSELECT);
			st.setString(1, seatSelect);
			rs = st.executeQuery();
			while (rs.next()) {
				seatYN = makeSeat(rs);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBUtil.dbClose(rs, st, conn);
		}
		return seatYN;
	}

//	public List<Seat> seatSelect() {
//		List<Seat> seatlist = new ArrayList<>();
//		Seat seat = null;
//		System.out.println(seat);
//		conn = DBUtil.getConnection();
//		try {
//			st = conn.prepareStatement(SQL_SEATSELECT);
//			rs = st.executeQuery();
//			while(rs.next()) {
//				seat = seatListResult(rs);
//				seatlist.add(seat);
//			}				
//		} catch (SQLException e) {
//			e.printStackTrace();
//		} finally {
//			DBUtil.dbClose(rs, st, conn);
//		}		
//		return seatlist;
//	}

//	private Seat seatListResult(ResultSet rs) throws SQLException {
//		 Seat seat = new Seat();
//		seat.setSeatcode(rs.getString("seatcode"));
//		return seat;
//	}
	private Seat makeSeat(ResultSet rs) throws SQLException {
		Seat seat = new Seat();
		seat.setReserveyn(rs.getString(1));
//		seat.setSeatcode(rs.getString(1));
//		seat.setReservedate(rs.getDate(2));
		return seat;
	}

	private Seat getDateSeat(ResultSet rs) throws SQLException {
		Seat seat = new Seat();
		seat.setReserveyn(rs.getString("reserveyn"));
		seat.setSeatcode(rs.getString("seatcode"));
		seat.setReservedate(rs.getDate("Reservedate"));
		return seat;
	}
		
	

}
