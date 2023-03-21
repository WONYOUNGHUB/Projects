package model;

import java.sql.ResultSet;
import java.util.List;

import vo.Reserve;
import vo.Seat;

public class ReserveService {
	ReserveDAO dao = new ReserveDAO();

	public int updateYN(Seat seat) {
		return dao.updateYN(seat);
	}
	public int updateN(Seat seat) {
		return dao.updateN(seat);
	}

	public int insertReserve(Reserve reserve) {
		return dao.Reserveinsert(reserve);

	}

	public Reserve selectAllbyId(String memberid) {
		return dao.selectAllbyId(memberid);
	}

	public int delete(String memberid) {
		return dao.delete(memberid);
	}

}
