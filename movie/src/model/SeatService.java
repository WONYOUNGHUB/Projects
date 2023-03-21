package model;

import java.util.List;

import vo.Seat;

public class SeatService {
	SeatDAO dao = new SeatDAO();

	
	public  List<Seat> selectAll() {
		//dao 모든 시트 데이터 가져옴.
		return dao.selectAll();
	}
	
	public Seat checkReserveYN(String seatSelect) {
		return dao.checkReserveYN(seatSelect);
	}
//	public List<Seat> seatSelect() {
//		return dao.seatSelect();
//	}
	
	

}
