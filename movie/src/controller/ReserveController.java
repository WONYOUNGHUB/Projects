package controller;

import java.sql.Date;

import model.ReserveService;
import model.SeatDAO;
import vo.Reserve;
import vo.Seat;

public class ReserveController {
	static ReserveService service = new ReserveService();
	 
	static MemberController ct = new MemberController();

	public static int updateYN(String seatSelect) {
		Seat seat = new Seat(seatSelect, null, null);
		 int ret = service.updateYN(seat);
		return ret;
	}

	public static int updateN(String seatSelect) {
		Seat seat = new Seat(seatSelect, null, null);
		return service.updateN(seat);
	}

	public static void insertReserve(String seatcode, int moviecode, String memberid, Date date) {
		Reserve reserve = new Reserve(seatcode, moviecode, memberid, date);
		int ret = service.insertReserve(reserve);
	}
}
