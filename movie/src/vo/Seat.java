package vo;

import java.sql.Date;

import oracle.sql.CHAR;

public class Seat {
	private String seatcode;
	private Date reservedate;
	private String reserveyn;
	
	
	public Seat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Seat(String seatcode, Date reservedate, String reserveyn) {
		super();
		this.seatcode = seatcode;
		this.reservedate = reservedate;
		this.reserveyn = reserveyn;
	}

	public String getSeatcode() {
		return seatcode;
	}

	public void setSeatcode(String seatcode) {
		this.seatcode = seatcode;
	}

	public Date getReservedate() {
		return reservedate;
	}

	public void setReservedate(Date reservedate) {
		this.reservedate = reservedate;
	}

	public String getReserveyn() {
		return reserveyn;
	}

	public void setReserveyn(String reserveyn) {
		this.reserveyn = reserveyn;
	}

	@Override
	public String toString() {
		return "[seatcode=" + seatcode + "]";
	}
	
}
